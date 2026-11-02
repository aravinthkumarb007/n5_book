import { NextResponse } from 'next/server';
import { ALL_120_KANJI, LEVEL_METADATA, getKanjiById, getKanjiByLevel, searchKanji } from '@/data/kanjiDatabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const level = searchParams.get('level');
  const query = searchParams.get('q');

  if (id) {
    const kanji = getKanjiById(Number(id));
    if (!kanji) {
      return NextResponse.json({ error: 'Kanji not found' }, { status: 404 });
    }
    return NextResponse.json({ kanji });
  }

  if (level) {
    const list = getKanjiByLevel(Number(level));
    const meta = LEVEL_METADATA.find(l => l.level === Number(level));
    return NextResponse.json({ level: Number(level), metadata: meta, kanji: list });
  }

  if (query) {
    const results = searchKanji(query);
    return NextResponse.json({ total: results.length, kanji: results });
  }

  // Return full 120 kanji summary and levels
  return NextResponse.json({
    total: ALL_120_KANJI.length,
    levels: LEVEL_METADATA,
    kanji: ALL_120_KANJI
  });
}
