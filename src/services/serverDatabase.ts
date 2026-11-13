import 'server-only';
import { neon } from '@neondatabase/serverless';
import { createHmac, timingSafeEqual } from 'node:crypto';

export const OWNER_ID = '00000000-0000-0000-0000-000000000001';
const cookieName = 'jp_book_cloud';
const sessionSeconds = 60 * 60 * 24 * 7;

function matches(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

function signature(expiry: string, key: string) {
  return createHmac('sha256', key).update('jp-book-cloud:' + expiry).digest('hex');
}

export function cloudSession(request: Request, supplied: unknown) {
  const key = process.env.CLOUD_ACCESS_KEY;
  if (!key || typeof supplied !== 'string' || !matches(supplied, key)) return null;
  const expiry = String(Math.floor(Date.now() / 1000) + sessionSeconds);
  const secure = new URL(request.url).protocol === 'https:' || process.env.NODE_ENV === 'production' && !['localhost', '127.0.0.1'].includes(new URL(request.url).hostname);
  return cookieName + '=' + expiry + '.' + signature(expiry, key) + '; Path=/; HttpOnly; SameSite=Strict; Max-Age=' + sessionSeconds + (secure ? '; Secure' : '');
}

export function cloudAuthorized(request: Request) {
  const key = process.env.CLOUD_ACCESS_KEY;
  const origin = request.headers.get('origin');
  if (!key || (origin && new URL(request.url).origin !== origin)) return false;
  const token = request.headers.get('cookie')?.split(/;\s*/).find(part => part.startsWith(cookieName + '='))?.slice(cookieName.length + 1);
  const [expiry, proof] = token?.split('.') || [];
  return Boolean(expiry && proof && Number(expiry) > Date.now() / 1000 && matches(proof, signature(expiry, key)));
}

export function databaseConfigured() {
  return Boolean(process.env.DATABASE_URL && process.env.CLOUD_ACCESS_KEY);
}

const tables = [
  'kanji', 'kanji_stroke_data', 'user_kanji_progress', 'user_settings', 'quiz_history',
  'minna_user_progress', 'custom_lessons', 'minna_exam_results', 'mock_exam_results',
  'counters_quiz_results', 'kanji_level_test_results', 'content_cache', 'vocabulary_learning_status',
] as const;
type Table = typeof tables[number];
type Row = Record<string, unknown>;
type Result = { data: any; count?: number; error: Error | null };

function identifier(value: string) {
  if (!/^[a-z_][a-z_0-9]*$/.test(value)) throw new Error('Invalid database identifier');
  return '"' + value + '"';
}

class DatabaseQuery implements PromiseLike<Result> {
  private action: 'select' | 'insert' | 'upsert' | 'update' | 'delete' = 'select';
  private projection = '*';
  private head = false;
  private filters: string[] = [];
  private parameters: unknown[] = [];
  private rows: Row[] = [];
  private conflict = '';
  private ordering = '';
  private maximum?: number;
  private single = false;

  constructor(private readonly sql: ReturnType<typeof neon>, private readonly table: Table) {}

  select(columns: string, options?: { count: 'exact'; head: boolean }) {
    this.projection = columns === '*' ? '*' : columns.split(',').map(column => identifier(column.trim())).join(', ');
    this.head = options?.head ?? false;
    return this;
  }

  private bind(value: unknown) {
    this.parameters.push(value);
    return '$' + this.parameters.length;
  }

  eq(column: string, value: unknown) {
    this.filters.push(identifier(column) + ' = ' + this.bind(value));
    return this;
  }

  in(column: string, values: unknown[]) {
    this.filters.push(identifier(column) + ' = ANY(' + this.bind(values) + ')');
    return this;
  }

  ilike(column: string, value: string) {
    // The callers use a literal cache-key prefix followed by a wildcard.
    const prefix = value.slice(0, -1).replace(/[\\_%]/g, '\\$&');
    this.filters.push(identifier(column) + ' ILIKE ' + this.bind(prefix + '%'));
    return this;
  }

  order(column: string, options: { ascending: boolean }) {
    this.ordering = ' ORDER BY ' + identifier(column) + (options.ascending ? ' ASC' : ' DESC');
    return this;
  }

  limit(value: number) {
    this.maximum = value;
    return this;
  }

  maybeSingle() {
    this.single = true;
    return this.limit(2);
  }

  insert(values: Row | Row[]) {
    this.action = 'insert';
    this.rows = Array.isArray(values) ? values : [values];
    return this;
  }

  upsert(values: Row | Row[], options: { onConflict: string }) {
    this.insert(values);
    this.action = 'upsert';
    this.conflict = options.onConflict;
    return this;
  }

  update(values: Row) {
    this.action = 'update';
    this.rows = [values];
    return this;
  }

  delete() {
    this.action = 'delete';
    return this;
  }

  private async execute(): Promise<Result> {
    try {
      const table = 'public.' + identifier(this.table);
      const where = this.filters.length ? ' WHERE ' + this.filters.join(' AND ') : '';
      if (this.action === 'select') {
        const limit = this.maximum === undefined ? '' : ' LIMIT ' + this.bind(this.maximum);
        const projection = this.head ? 'count(*)::integer AS count' : this.projection;
        const rows = await this.sql.query('SELECT ' + projection + ' FROM ' + table + where + this.ordering + limit, this.parameters) as Row[];
        if (this.head) return { data: null, count: Number(rows[0].count), error: null };
        if (this.single && rows.length > 1) throw new Error('Expected at most one row');
        return { data: this.single ? rows[0] ?? null : rows, error: null };
      }
      if (this.action === 'update' || this.action === 'delete') {
        if (!where) throw new Error('A write filter is required');
        const assignments = this.action === 'update'
          ? Object.keys(this.rows[0]).map(column => identifier(column) + ' = input.' + identifier(column)).join(', ')
          : '';
        const statement = this.action === 'delete'
          ? 'DELETE FROM ' + table + where
          : 'UPDATE ' + table + ' SET ' + assignments + ' FROM jsonb_populate_record(NULL::' + table + ', ' + this.bind(JSON.stringify(this.rows[0])) + '::jsonb) AS input' + where.replace(/"([a-z_0-9]+)" =/g, table + '."$1" =');
        await this.sql.query(statement, this.parameters);
        return { data: null, error: null };
      }

      if (!this.rows.length) return { data: null, error: null };
      const columns = [...new Set(this.rows.flatMap(row => Object.keys(row)))];
      const names = columns.map(identifier).join(', ');
      const keys = this.conflict.split(',').filter(Boolean);
      const updates = columns.filter(column => !keys.includes(column) && column !== 'user_id');
      const ownership = columns.includes('user_id') ? ' WHERE target.user_id = excluded.user_id' : '';
      const conflict = this.action === 'insert' ? '' : ' ON CONFLICT (' + keys.map(identifier).join(', ') + ') ' +
        (updates.length ? 'DO UPDATE SET ' + updates.map(column => identifier(column) + ' = excluded.' + identifier(column)).join(', ') + ownership : 'DO NOTHING');
      await this.sql.query('INSERT INTO ' + table + ' AS target (' + names + ') SELECT ' + names +
        ' FROM jsonb_populate_recordset(NULL::' + table + ', $1::jsonb)' + conflict, [JSON.stringify(this.rows)]);
      return { data: null, error: null };
    } catch (error) {
      console.error('Neon query failed', this.table, this.action, (error as { code?: string }).code);
      return { data: null, error: new Error('Database operation failed') };
    }
  }

  then<TResult1 = Result, TResult2 = never>(
    fulfilled?: ((value: Result) => TResult1 | PromiseLike<TResult1>) | null,
    rejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ) {
    return this.execute().then(fulfilled, rejected);
  }
}

export function getDatabase() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('Neon database is not configured');
  const sql = neon(url);
  return { from: (table: Table) => new DatabaseQuery(sql, table) };
}
