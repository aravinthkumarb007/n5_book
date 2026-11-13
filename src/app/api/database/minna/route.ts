import { NextResponse } from 'next/server';
import { cloudAuthorized, getDatabase, OWNER_ID } from '@/services/serverDatabase';

export async function POST(request: Request) {
  if (!cloudAuthorized(request)) return NextResponse.json({ error: 'Unlock cloud access in Settings.' }, { status: 401 });
  const body = await request.json().catch(() => null);
  if (!body || !['progress', 'lesson', 'deleteLesson', 'exam'].includes(body.action)) {
    return NextResponse.json({ error: 'Invalid Minna sync operation.' }, { status: 400 });
  }

  const db = getDatabase();
  const row = (value: Record<string, unknown>, columns: string[]) => ({
    ...Object.fromEntries(columns.filter(column => Object.hasOwn(value, column)).map(column => [column, value[column]])),
    user_id: OWNER_ID,
  });
  try {
    const value = body.value;
    let operation;
    switch (body.action) {
      case 'progress':
        if (!Array.isArray(value)) return new Response(null, { status: 400 });
        operation = db.from('minna_user_progress').upsert(value.map(item => row(item, [
          'lesson_number', 'status', 'learned_vocab_ids', 'understood_grammar_ids', 'best_score',
          'total_attempts', 'weak_vocab_ids', 'weak_grammar_ids', 'last_studied_at', 'updated_at',
        ])), { onConflict: 'user_id,lesson_number' });
        break;
      case 'lesson':
        operation = db.from('custom_lessons').upsert(row(value, [
          'id', 'title', 'description', 'level', 'tags', 'vocabulary', 'grammar', 'is_user_created', 'updated_at',
        ]), { onConflict: 'id' });
        break;
      case 'deleteLesson':
        if (typeof value !== 'string') return new Response(null, { status: 400 });
        operation = db.from('custom_lessons').delete().eq('id', value).eq('user_id', OWNER_ID);
        break;
      default:
        operation = db.from('minna_exam_results').upsert(row(value, [
          'id', 'exam_title', 'score_percent', 'correct_count', 'total_questions', 'time_spent_seconds',
          'lesson_numbers', 'answers', 'weak_lessons', 'weak_grammar_topics', 'weak_vocab', 'ai_diagnostic',
        ]), { onConflict: 'id' });
    }
    const { error } = await operation;
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Minna sync failed.' }, { status: 500 });
  }
}
