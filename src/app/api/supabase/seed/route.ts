import { NextResponse } from 'next/server';
import { ALL_120_KANJI } from '@/data/kanjiDatabase';
import { getServerSupabaseClient } from '@/services/serverSupabase';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const supabase = getServerSupabaseClient();

    let kanjiInserted = 0;
    let readingsInserted = 0;
    let vocabInserted = 0;
    let examplesInserted = 0;

    for (const k of ALL_120_KANJI) {
      // 1. Upsert master kanji record
      const { data: kanjiData, error: kanjiErr } = await supabase
        .from('kanji')
        .upsert({
          id: k.id,
          kanji_number: k.kanji_number,
          character: k.character,
          meaning: k.meaning,
          level: k.level,
          stroke_count: k.stroke_count,
          radicals: k.radicals,
          mnemonic: k.mnemonic
        }, { onConflict: 'id' })
        .select()
        .single();

      if (kanjiErr) {
        console.error(`Error inserting kanji ${k.character}:`, kanjiErr);
        continue;
      }
      kanjiInserted++;

      // 2. Insert readings
      const readingsToInsert: any[] = [];
      k.onyomi_readings.forEach((r, idx) => {
        readingsToInsert.push({
          kanji_id: k.id,
          reading_type: 'onyomi',
          reading_japanese: r,
          reading_romaji: k.onyomi_romaji[idx] || '',
          is_primary: idx === 0,
          verification_status: 'verified'
        });
      });
      k.kunyomi_readings.forEach((r, idx) => {
        readingsToInsert.push({
          kanji_id: k.id,
          reading_type: 'kunyomi',
          reading_japanese: r,
          reading_romaji: k.kunyomi_romaji[idx] || '',
          is_primary: idx === 0,
          verification_status: 'verified'
        });
      });

      if (readingsToInsert.length > 0) {
        const { error: rErr } = await supabase.from('kanji_readings').insert(readingsToInsert);
        if (!rErr) readingsInserted += readingsToInsert.length;
      }

      // 3. Upsert stroke order data
      await supabase.from('kanji_stroke_data').upsert({
        kanji_id: k.id,
        stroke_count: k.stroke_count,
        stroke_directions: k.stroke_order_data?.directions || [],
        source: 'KanjiVG'
      }, { onConflict: 'kanji_id' });

      // 4. Insert vocabulary items
      if (k.vocabulary && k.vocabulary.length > 0) {
        const vocabItems = k.vocabulary.map(v => ({
          kanji_id: k.id,
          word: v.word,
          hiragana: v.hiragana,
          romaji: v.romaji,
          meaning: v.meaning,
          reading_type: v.readingType,
          verification_status: 'verified'
        }));
        const { error: vErr } = await supabase.from('kanji_vocabulary').insert(vocabItems);
        if (!vErr) vocabInserted += vocabItems.length;
      }

      // 5. Insert example sentences
      if (k.example_sentences && k.example_sentences.length > 0) {
        const exItems = k.example_sentences.map(e => ({
          kanji_id: k.id,
          japanese: e.japanese,
          hiragana: e.hiragana,
          romaji: e.romaji,
          english: e.english,
          verification_status: 'verified'
        }));
        const { error: eErr } = await supabase.from('kanji_examples').insert(exItems);
        if (!eErr) examplesInserted += exItems.length;
      }
    }

    return NextResponse.json({
      success: true,
      summary: {
        totalKanji: ALL_120_KANJI.length,
        kanjiInserted,
        readingsInserted,
        vocabInserted,
        examplesInserted
      }
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Failed to seed kanji data to Supabase.'
    }, { status: 500 });
  }
}
