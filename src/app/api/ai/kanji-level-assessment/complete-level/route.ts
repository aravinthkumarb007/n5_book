import { NextResponse } from 'next/server';
import { getDatabase, OWNER_ID } from '@/services/serverDatabase';
import { ALL_120_KANJI, LEVEL_METADATA } from '@/data/kanjiDatabase';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      level,
      scorePercent,
      totalQuestions,
      correctCount,
      timeSpentSeconds = 0,
      kanjiIdsTested = [],
      answers = []
    } = body;

    const targetLevel = Number(level);
    if (!targetLevel || targetLevel < 1 || targetLevel > 12) {
      return NextResponse.json({ success: false, error: 'Invalid level specified.' }, { status: 400 });
    }

    const tQuestions = Number(totalQuestions) || 0;
    const cCount = Number(correctCount) || 0;
    const calculatedScore = tQuestions > 0 ? Math.round((cCount / tQuestions) * 100) : 0;
    const effectiveScore = Number(scorePercent) || calculatedScore;

    // Backend validation: passing threshold must be >= 80%
    if (effectiveScore < 80) {
      return NextResponse.json({
        success: false,
        passed: false,
        error: `Assessment score of ${effectiveScore}% does not meet the 80% passing threshold.`
      }, { status: 400 });
    }

    const lvlMeta = LEVEL_METADATA.find(l => l.level === targetLevel);
    if (!lvlMeta) {
      return NextResponse.json({ success: false, error: `Level ${targetLevel} metadata not found.` }, { status: 400 });
    }

    const db = getDatabase();
    const userId = OWNER_ID;
    const now = new Date().toISOString();

    // 1. Ensure master kanji exist in DB
    const { count: masterCount } = await db
      .from('kanji')
      .select('*', { count: 'exact', head: true });

    if (!masterCount || masterCount < ALL_120_KANJI.length) {
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
      await db.from('kanji').upsert(kanjiRecords, { onConflict: 'id' });
    }

    // 2. Mark all Kanji in target level as learned in user_kanji_progress
    const levelKanjiProgressRows = lvlMeta.kanjiIds.map(kanjiId => ({
      user_id: userId,
      kanji_id: kanjiId,
      learning_status: 'learned',
      learned_at: now,
      last_studied_at: now,
      meaning_accuracy: Math.max(100, effectiveScore),
      onyomi_accuracy: Math.max(100, effectiveScore),
      kunyomi_accuracy: Math.max(100, effectiveScore),
      vocabulary_accuracy: Math.max(100, effectiveScore),
      revision_count: 1,
      mistake_count: 0,
      srs_interval: 1,
      srs_repetitions: 1,
      srs_ease_factor: 2.5,
      incorrect_history: [],
      updated_at: now
    }));

    const { error: pErr } = await db
      .from('user_kanji_progress')
      .upsert(levelKanjiProgressRows, { onConflict: 'user_id,kanji_id' });

    if (pErr) {
      console.error('Database error updating level kanji progress:', pErr);
      return NextResponse.json({ success: false, error: pErr.message }, { status: 500 });
    }

    // 3. If next level <= 12, unlock next level's kanji as 'available'
    const nextLevel = targetLevel + 1;
    if (nextLevel <= 12) {
      const nextLvlMeta = LEVEL_METADATA.find(l => l.level === nextLevel);
      if (nextLvlMeta) {
        const nextRows = nextLvlMeta.kanjiIds.map(kid => ({
          user_id: userId,
          kanji_id: kid,
          learning_status: 'available',
          updated_at: now
        }));
        await db.from('user_kanji_progress').upsert(nextRows, { onConflict: 'user_id,kanji_id' });
      }
    }

    // 4. Save assessment test result history
    const testResultRow = {
      id: `ai_exam_${Date.now()}`,
      user_id: userId,
      test_type: 'level_ai',
      level: targetLevel,
      title: `Level ${targetLevel} AI Cumulative Assessment`,
      score_percent: effectiveScore,
      total_questions: tQuestions,
      correct_count: cCount,
      incorrect_count: tQuestions - cCount,
      is_passed: true,
      generation_mode: '100% Pure AI (Cumulative Learned Pool)',
      kanji_ids_tested: kanjiIdsTested.length > 0 ? kanjiIdsTested : lvlMeta.kanjiIds,
      answers: answers,
      time_spent_seconds: Number(timeSpentSeconds) || 0,
      created_at: now
    };

    await db.from('kanji_level_test_results').upsert([testResultRow], { onConflict: 'id' });

    return NextResponse.json({
      success: true,
      passed: true,
      level: targetLevel,
      nextLevelUnlocked: Math.min(12, nextLevel),
      message: `Level ${targetLevel} officially passed with ${effectiveScore}%. All ${lvlMeta.kanjiIds.length} Kanji marked as Learned. Level ${Math.min(12, nextLevel)} unlocked.`
    });
  } catch (err: any) {
    console.error('Error in complete-level route:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
