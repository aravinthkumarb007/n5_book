import { NextResponse } from 'next/server';
import { getServerSupabaseClient } from '@/services/serverSupabase';
import { ALL_120_KANJI } from '@/data/kanjiDatabase';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const supabase = getServerSupabaseClient();
    const body = await request.json();
    const { 
      progressList, 
      settings, 
      quizHistory, 
      sessions, 
      minnaProgress,
      customLessons,
      minnaExamResults,
      mockExamResult, 
      mockExamResults,
      countersQuizResult,
      countersQuizResults,
      vocabUpdates,
      userId = '00000000-0000-0000-0000-000000000001' 
    } = body;

    let syncedProgressCount = 0;
    let syncedQuizzesCount = 0;
    let syncedMinnaCount = 0;
    let syncedMockExam = false;
    let syncedCountersQuiz = false;

    // 1. Sync User Kanji Progress
    if (progressList && Array.isArray(progressList) && progressList.length > 0) {
      // Ensure master kanji exist first to guarantee foreign key constraint never fails
      const { count: masterCount } = await supabase
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
        await supabase.from('kanji').upsert(kanjiRecords, { onConflict: 'id' });
      }

      const records = progressList.map((p: any) => ({
        user_id: userId,
        kanji_id: p.kanji_id,
        learning_status: p.learning_status,
        learned_at: p.learned_at,
        last_studied_at: p.last_studied_at,
        next_review_at: p.next_review_at,
        meaning_accuracy: p.meaning_accuracy || 0,
        onyomi_accuracy: p.onyomi_accuracy || 0,
        kunyomi_accuracy: p.kunyomi_accuracy || 0,
        vocabulary_accuracy: p.vocabulary_accuracy || 0,
        revision_count: p.revision_count || 0,
        mistake_count: p.mistake_count || 0,
        srs_interval: p.srs_interval || 1,
        srs_repetitions: p.srs_repetitions || 0,
        srs_ease_factor: p.srs_ease_factor || 2.5,
        incorrect_history: p.incorrect_history || [],
        updated_at: new Date().toISOString()
      }));

      const { error: pErr } = await supabase
        .from('user_kanji_progress')
        .upsert(records, { onConflict: 'user_id,kanji_id' });

      if (pErr) {
        console.error('user_kanji_progress sync error:', pErr);
        return NextResponse.json({
          success: false,
          error: `Database error saving kanji progress: ${pErr.message}`
        }, { status: 500 });
      }

      syncedProgressCount = records.length;
    }

    // 2. Sync User Settings & Streaks
    if (settings) {
      const settingsRecord = {
        user_id: userId,
        user_name: settings.user_name || 'Kanji Scholar',
        daily_target: settings.daily_target || 5,
        preferred_session_duration: settings.preferred_session_duration || 10,
        theme: settings.theme || 'light',
        sound_enabled: settings.sound_enabled ?? true,
        audio_speed: settings.audio_speed || 1.0,
        daily_streak: settings.daily_streak || 1,
        last_active_date: settings.last_active_date || new Date().toISOString().split('T')[0],
        study_dates: settings.study_dates || [],
        updated_at: new Date().toISOString()
      };

      const { error: sErr } = await supabase
        .from('user_settings')
        .upsert(settingsRecord, { onConflict: 'user_id' });

      if (sErr) {
        console.warn('user_settings sync warning:', sErr.message);
      }
    }

    // 3. Sync Quiz History
    if (quizHistory && Array.isArray(quizHistory) && quizHistory.length > 0) {
      const quizRecords = quizHistory.slice(-50).map((q: any) => ({
        user_id: userId,
        kanji_id: q.kanji_id,
        question_type: q.question_type,
        selected_answer: q.selected_answer,
        correct_answer: q.correct_answer,
        is_correct: q.is_correct,
        time_taken_seconds: q.time_taken_seconds || 5,
        created_at: q.date || new Date().toISOString()
      }));

      const { error: qErr } = await supabase.from('quiz_history').insert(quizRecords);
      if (!qErr) syncedQuizzesCount = quizRecords.length;
    }

    // 4. Sync Minna Lesson Progress
    if (minnaProgress && Array.isArray(minnaProgress) && minnaProgress.length > 0) {
      const minnaRecords = minnaProgress.map((m: any) => ({
        user_id: userId,
        lesson_number: m.lessonNumber || m.lesson_number,
        status: m.status || 'not_started',
        learned_vocab_ids: m.learnedVocabIds || m.learned_vocab_ids || [],
        understood_grammar_ids: m.understoodGrammarIds || m.understood_grammar_ids || [],
        best_score: m.bestScore ?? m.best_score ?? 0,
        total_attempts: m.totalAttempts ?? m.total_attempts ?? 0,
        weak_vocab_ids: m.weakVocabIds || m.weak_vocab_ids || [],
        weak_grammar_ids: m.weakGrammarIds || m.weak_grammar_ids || [],
        last_studied_at: m.lastStudiedAt || m.last_studied_at || new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));

      const { error: mErr } = await supabase
        .from('minna_user_progress')
        .upsert(minnaRecords, { onConflict: 'user_id,lesson_number' });

      if (!mErr) syncedMinnaCount = minnaRecords.length;
    }

    // 5. Sync Mock Exam Results (single or batch)
    const mockList = Array.isArray(mockExamResults) 
      ? mockExamResults 
      : mockExamResult 
      ? [mockExamResult] 
      : [];

    if (mockList.length > 0) {
      const { error: meErr } = await supabase
        .from('mock_exam_results')
        .upsert(mockList, { onConflict: 'id' });
      if (!meErr) syncedMockExam = true;
    }

    // 6. Sync Counters Quiz Results (single or batch)
    const countersList = Array.isArray(countersQuizResults) 
      ? countersQuizResults 
      : countersQuizResult 
      ? [countersQuizResult] 
      : [];

    if (countersList.length > 0) {
      const { error: cqErr } = await supabase
        .from('counters_quiz_results')
        .upsert(countersList, { onConflict: 'id' });
      if (!cqErr) syncedCountersQuiz = true;
    }

    // 7. Sync Vocabulary Learning Statuses
    let syncedVocabCount = 0;
    if (vocabUpdates && Array.isArray(vocabUpdates) && vocabUpdates.length > 0) {
      const updatedAt = new Date().toISOString();
      const cacheRows = vocabUpdates.filter((v: any) => v && v.vocabId && v.status).map((v: any) => ({
        cache_key: `vocab_status_${userId}_${v.vocabId}`,
        content_type: 'vocabulary_status',
        payload: {
          vocabId: v.vocabId,
          lessonNumber: Number(v.lessonNumber) || 0,
          status: v.status,
          updatedAt,
          userId
        },
        updated_at: updatedAt
      }));

      if (cacheRows.length > 0) {
        const { error: vErr } = await supabase
          .from('content_cache')
          .upsert(cacheRows, { onConflict: 'cache_key' });
        if (!vErr) syncedVocabCount = cacheRows.length;
      }
    }

    return NextResponse.json({
      success: true,
      syncedProgressCount,
      syncedQuizzesCount,
      syncedMinnaCount,
      syncedMockExam,
      syncedCountersQuiz,
      syncedVocabCount,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Failed to sync progress to Supabase.'
    }, { status: 500 });
  }
}

// GET endpoint to restore/pull progress from Supabase on application startup
export async function GET(request: Request) {
  try {
    const supabase = getServerSupabaseClient();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || '00000000-0000-0000-0000-000000000001';

    // 1. Fetch user kanji progress
    const { data: progress, error: pErr } = await supabase
      .from('user_kanji_progress')
      .select('*')
      .eq('user_id', userId)
      .order('kanji_id', { ascending: true });

    if (pErr) throw pErr;

    // 2. Fetch user settings & streaks
    const { data: settingsData } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    // 3. Fetch Minna lesson progress
    const { data: minnaData } = await supabase
      .from('minna_user_progress')
      .select('*')
      .eq('user_id', userId)
      .order('lesson_number', { ascending: true });

    // 4. Fetch Mock Exam results
    const { data: mockExamData } = await supabase
      .from('mock_exam_results')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(20);

    // 5. Fetch Counters quiz results
    const { data: countersData } = await supabase
      .from('counters_quiz_results')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(20);

    const hasLearnedKanji = Boolean(
      progress && progress.some((p: any) => p.learning_status === 'learned' || p.learning_status === 'needs_revision')
    );

    return NextResponse.json({
      success: true,
      progress: progress || [],
      settings: settingsData || null,
      minnaProgress: minnaData || [],
      mockExams: mockExamData || [],
      countersResults: countersData || [],
      hasCloudData: Boolean(progress && progress.length > 0),
      hasLearnedKanji
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Failed to fetch progress from Supabase.',
      progress: [],
      hasCloudData: false,
      hasLearnedKanji: false
    }, { status: 200 });
  }
}
