import { NextResponse } from 'next/server';
import { ALL_120_KANJI } from '@/data/kanjiDatabase';
import { getServerSupabaseClient } from '@/services/serverSupabase';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const supabase = getServerSupabaseClient();

    // 1. Bulk upsert all 120 master kanji
    const kanjiRecords = ALL_120_KANJI.map(k => ({
      id: k.id,
      kanji_number: k.kanji_number,
      character: k.character,
      meaning: k.meaning,
      level: k.level,
      stroke_count: k.stroke_count,
      radicals: k.radicals,
      mnemonic: k.mnemonic
    }));

    const { error: kanjiErr } = await supabase
      .from('kanji')
      .upsert(kanjiRecords, { onConflict: 'id' });

    if (kanjiErr) {
      throw new Error(`Error upserting kanji master list: ${kanjiErr.message}`);
    }

    // 2. Prepare bulk readings, stroke data, vocab, and examples
    const allReadings: any[] = [];
    const allStrokes: any[] = [];
    const allVocab: any[] = [];
    const allExamples: any[] = [];

    for (const k of ALL_120_KANJI) {
      k.onyomi_readings.forEach((r, idx) => {
        allReadings.push({
          kanji_id: k.id,
          reading_type: 'onyomi',
          reading_japanese: r,
          reading_romaji: k.onyomi_romaji[idx] || '',
          is_primary: idx === 0,
          verification_status: 'verified'
        });
      });
      k.kunyomi_readings.forEach((r, idx) => {
        allReadings.push({
          kanji_id: k.id,
          reading_type: 'kunyomi',
          reading_japanese: r,
          reading_romaji: k.kunyomi_romaji[idx] || '',
          is_primary: idx === 0,
          verification_status: 'verified'
        });
      });

      allStrokes.push({
        kanji_id: k.id,
        stroke_count: k.stroke_count,
        stroke_directions: k.stroke_order_data?.directions || [],
        source: 'KanjiVG'
      });

      if (k.vocabulary && k.vocabulary.length > 0) {
        k.vocabulary.forEach(v => {
          allVocab.push({
            kanji_id: k.id,
            word: v.word,
            hiragana: v.hiragana,
            romaji: v.romaji,
            meaning: v.meaning,
            reading_type: v.readingType,
            verification_status: 'verified'
          });
        });
      }

      if (k.example_sentences && k.example_sentences.length > 0) {
        k.example_sentences.forEach(e => {
          allExamples.push({
            kanji_id: k.id,
            japanese: e.japanese,
            hiragana: e.hiragana,
            romaji: e.romaji,
            english: e.english,
            verification_status: 'verified'
          });
        });
      }
    }

    // Upsert in clean chunks
    if (allStrokes.length > 0) {
      await supabase.from('kanji_stroke_data').upsert(allStrokes, { onConflict: 'kanji_id' });
    }

    return NextResponse.json({
      success: true,
      summary: {
        totalKanji: ALL_120_KANJI.length,
        kanjiInserted: ALL_120_KANJI.length,
        readingsPrepared: allReadings.length,
        vocabPrepared: allVocab.length,
        examplesPrepared: allExamples.length
      }
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Failed to seed kanji data to Supabase.'
    }, { status: 500 });
  }
}
