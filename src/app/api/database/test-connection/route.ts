import { NextResponse } from 'next/server';
import { cloudAuthorized, getDatabase } from '@/services/serverDatabase';

export async function POST(request: Request) {
  if (!cloudAuthorized(request)) return NextResponse.json({ success: false, error: 'Unlock cloud access in Settings.' }, { status: 401 });
  const start = Date.now();
  try {
    const db = getDatabase();
    const checks = await Promise.all([
      db.from('kanji').select('id').limit(1),
      db.from('user_kanji_progress').select('id').limit(1),
      db.from('kanji_level_test_results').select('id').limit(1),
    ]);
    if (checks.some(check => check.error)) throw new Error('Required tables unavailable');
    return NextResponse.json({ success: true, tablesReady: true, message: "Connected to Neon.", latencyMs: Date.now() - start });
  } catch {
    return NextResponse.json({ success: false, error: 'Neon is unavailable or required tables are missing.' }, { status: 503 });
  }
}
