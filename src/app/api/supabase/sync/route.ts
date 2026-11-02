import { NextResponse } from 'next/server';
import { getServerSupabaseClient } from '@/services/serverSupabase';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const supabase = getServerSupabaseClient();
    const body = await request.json();
    const { progressList, settings, quizHistory, sessions, userId = '00000000-0000-0000-0000-000000000001' } = body;

    let syncedProgressCount = 0;
    let syncedQuizzesCount = 0;

    // 1. Sync User Kanji Progress
    if (progressList && Array.isArray(progressList)) {
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

      if (!pErr) {
        syncedProgressCount = records.length;
      } else {
        console.warn('user_kanji_progress sync warning (run schema.sql if table missing):', pErr.message);
      }
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
      const quizRecords = quizHistory.slice(-20).map((q: any) => ({
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

    return NextResponse.json({
      success: true,
      syncedProgressCount,
      syncedQuizzesCount,
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

    return NextResponse.json({
      success: true,
      progress: progress || [],
      settings: settingsData || null,
      hasCloudData: Boolean(progress && progress.length > 0)
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Failed to fetch progress from Supabase.',
      progress: [],
      hasCloudData: false
    }, { status: 200 }); // return 200 with graceful empty array so app doesn't break
  }
}
