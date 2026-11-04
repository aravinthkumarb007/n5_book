import { UserKanjiProgress, LearningStatus } from '@/types/kanji';
import { ALL_120_KANJI, LEVEL_METADATA } from '@/data/kanjiDatabase';
import { storage, evaluateLevelProgressions } from './storage';
import { loadMinnaProgress, saveMinnaProgress } from './minnaStorage';
import { getExamHistory, saveExamResult } from './mockExamStorage';
import { getCountersQuizHistory, saveCountersQuizResult } from './countersStorage';
import { getStoredVocabStatuses, syncVocabStatusesFromBackend } from './vocabStorage';

export interface SyncResult {
  success: boolean;
  error?: string;
  syncedProgressCount?: number;
  syncedQuizzesCount?: number;
  syncedMinnaCount?: number;
  timestamp?: string;
}

const SYNC_STORAGE_KEYS = {
  LAST_SYNC: 'n5_last_successful_sync_timestamp',
  PENDING_RETRY: 'n5_pending_sync_retry'
};

const STATUS_PRIORITY: Record<LearningStatus, number> = {
  learned: 4,
  needs_revision: 3,
  learning: 2,
  available: 1,
  locked: 0
};

/**
 * Deterministic Smart Merge for Kanji Progress:
 * Guarantees that any completed/learned progress is NEVER downgraded or overwritten by older data.
 */
export function mergeKanjiProgress(
  localList: UserKanjiProgress[],
  cloudList: any[]
): { merged: UserKanjiProgress[]; learnedCount: number } {
  const localMap = new Map<number, UserKanjiProgress>(localList.map(p => [p.kanji_id, p]));
  const cloudMap = new Map<number, any>(cloudList.map((p: any) => [p.kanji_id, p]));

  const merged: UserKanjiProgress[] = ALL_120_KANJI.map(kanji => {
    const local = localMap.get(kanji.id);
    const cloud = cloudMap.get(kanji.id);

    if (!local && !cloud) {
      return {
        kanji_id: kanji.id,
        learning_status: (kanji.level === 1 ? 'available' : 'locked') as LearningStatus,
        learned_at: null,
        meaning_accuracy: 0,
        onyomi_accuracy: 0,
        kunyomi_accuracy: 0,
        vocabulary_accuracy: 0,
        revision_count: 0,
        mistake_count: 0,
        last_studied_at: null,
        next_review_at: null,
        srs_interval: 1,
        srs_repetitions: 0,
        srs_ease_factor: 2.5,
        incorrect_history: []
      };
    }

    if (!cloud) return local!;
    if (!local) {
      return {
        kanji_id: kanji.id,
        learning_status: cloud.learning_status || 'available',
        learned_at: cloud.learned_at || null,
        meaning_accuracy: cloud.meaning_accuracy || 0,
        onyomi_accuracy: cloud.onyomi_accuracy || 0,
        kunyomi_accuracy: cloud.kunyomi_accuracy || 0,
        vocabulary_accuracy: cloud.vocabulary_accuracy || 0,
        revision_count: cloud.revision_count || 0,
        mistake_count: cloud.mistake_count || 0,
        last_studied_at: cloud.last_studied_at || null,
        next_review_at: cloud.next_review_at || null,
        srs_interval: cloud.srs_interval || 1,
        srs_repetitions: cloud.srs_repetitions || 0,
        srs_ease_factor: cloud.srs_ease_factor || 2.5,
        incorrect_history: cloud.incorrect_history || []
      };
    }

    // Both exist: pick the highest status priority
    const localPriority = STATUS_PRIORITY[local.learning_status] ?? 0;
    const cloudPriority = STATUS_PRIORITY[cloud.learning_status as LearningStatus] ?? 0;

    let finalStatus: LearningStatus = local.learning_status;
    let finalLearnedAt = local.learned_at;

    if (cloudPriority > localPriority) {
      finalStatus = cloud.learning_status;
      finalLearnedAt = cloud.learned_at || local.learned_at;
    } else if (localPriority > cloudPriority) {
      finalStatus = local.learning_status;
      finalLearnedAt = local.learned_at || cloud.learned_at;
    } else {
      finalStatus = local.learning_status;
      finalLearnedAt = local.learned_at || cloud.learned_at;
    }

    return {
      kanji_id: kanji.id,
      learning_status: finalStatus,
      learned_at: finalLearnedAt,
      meaning_accuracy: Math.max(local.meaning_accuracy || 0, cloud.meaning_accuracy || 0),
      onyomi_accuracy: Math.max(local.onyomi_accuracy || 0, cloud.onyomi_accuracy || 0),
      kunyomi_accuracy: Math.max(local.kunyomi_accuracy || 0, cloud.kunyomi_accuracy || 0),
      vocabulary_accuracy: Math.max(local.vocabulary_accuracy || 0, cloud.vocabulary_accuracy || 0),
      revision_count: Math.max(local.revision_count || 0, cloud.revision_count || 0),
      mistake_count: Math.min(local.mistake_count || 0, cloud.mistake_count || 0),
      last_studied_at: local.last_studied_at || cloud.last_studied_at || null,
      next_review_at: local.next_review_at || cloud.next_review_at || null,
      srs_interval: Math.max(local.srs_interval || 1, cloud.srs_interval || 1),
      srs_repetitions: Math.max(local.srs_repetitions || 0, cloud.srs_repetitions || 0),
      srs_ease_factor: Math.max(local.srs_ease_factor || 2.5, cloud.srs_ease_factor || 2.5),
      incorrect_history: local.incorrect_history || cloud.incorrect_history || []
    };
  });

  // Re-evaluate level progression unlocks based on learned items
  const withUnlocks = evaluateLevelProgressions(merged);
  const learnedCount = withUnlocks.filter(p => p.learning_status === 'learned').length;

  return { merged: withUnlocks, learnedCount };
}

/**
 * Complete Project Synchronization
 * Synchronizes: Kanji Progress, Unlocked Levels, Settings, Streaks, Minna Lessons, Quiz Logs, Mock Exams, and Counters
 */
export async function syncFullProjectToCloud(): Promise<SyncResult> {
  if (typeof window === 'undefined') {
    return { success: false, error: 'Cannot sync in server environment' };
  }

  try {
    window.dispatchEvent(new CustomEvent('cloud-sync-status', { detail: { status: 'syncing' } }));

    const progressList = storage.getProgress();
    const settings = storage.getSettings();
    const quizHistory = storage.getQuizHistory();
    const minnaProgress = loadMinnaProgress();
    const mockExamResults = getExamHistory();
    const countersQuizResults = getCountersQuizHistory();
    const vocabStatuses = getStoredVocabStatuses();
    const vocabUpdates = Object.values(vocabStatuses).map(s => ({
      vocabId: s.vocabId,
      lessonNumber: s.lessonNumber,
      status: s.status
    }));

    const payload = {
      progressList,
      settings,
      quizHistory,
      minnaProgress,
      mockExamResults,
      countersQuizResults,
      vocabUpdates
    };

    const res = await fetch('/api/supabase/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      const errMsg = data.error || `Server responded with status ${res.status}`;
      window.dispatchEvent(new CustomEvent('cloud-sync-status', { detail: { status: 'offline', error: errMsg } }));
      localStorage.setItem(SYNC_STORAGE_KEYS.PENDING_RETRY, 'true');
      return { success: false, error: errMsg };
    }

    localStorage.removeItem(SYNC_STORAGE_KEYS.PENDING_RETRY);
    localStorage.setItem(SYNC_STORAGE_KEYS.LAST_SYNC, new Date().toISOString());

    window.dispatchEvent(new CustomEvent('cloud-sync-status', { 
      detail: { 
        status: 'saved', 
        timestamp: Date.now(),
        summary: data 
      } 
    }));

    return {
      success: true,
      syncedProgressCount: data.syncedProgressCount,
      syncedQuizzesCount: data.syncedQuizzesCount,
      syncedMinnaCount: data.syncedMinnaCount,
      timestamp: data.timestamp
    };
  } catch (err: any) {
    const errorMsg = err.message || 'Network disconnected or database request timed out';
    window.dispatchEvent(new CustomEvent('cloud-sync-status', { detail: { status: 'offline', error: errorMsg } }));
    localStorage.setItem(SYNC_STORAGE_KEYS.PENDING_RETRY, 'true');
    return { success: false, error: errorMsg };
  }
}

/**
 * Verifies and saves completion of a Level to both local storage and the database.
 * If cloud sync fails, progress is preserved locally and a retry prompt is returned.
 */
export async function verifyAndSaveLevelCompletion(
  level: number,
  updatedProgressList: UserKanjiProgress[]
): Promise<{ success: boolean; error?: string; savedLocally: boolean }> {
  // 1. Ensure progressions/unlocks are evaluated
  const withUnlocks = evaluateLevelProgressions(updatedProgressList);

  // 2. Persist locally first (guarantees no local data loss!)
  storage.saveProgress(withUnlocks);

  // 3. Immediately verify with database
  const syncResult = await syncFullProjectToCloud();

  if (!syncResult.success) {
    window.dispatchEvent(new CustomEvent('level-completion-sync-warning', {
      detail: {
        level,
        error: syncResult.error || 'Database sync failed. Your level completion is saved locally.'
      }
    }));

    return {
      success: false,
      error: syncResult.error,
      savedLocally: true
    };
  }

  window.dispatchEvent(new CustomEvent('level-completion-verified', {
    detail: { level }
  }));

  return {
    success: true,
    savedLocally: true
  };
}

/**
 * Restores project progress from Supabase Cloud on application startup.
 * Uses smart non-destructive merging to ensure no local progress is ever lost.
 */
export async function restoreAndMergeCloudData(): Promise<{
  restored: boolean;
  hasLearnedKanji: boolean;
  learnedCount: number;
  message?: string;
}> {
  if (typeof window === 'undefined') {
    return { restored: false, hasLearnedKanji: false, learnedCount: 0 };
  }

  try {
    window.dispatchEvent(new CustomEvent('cloud-sync-status', { detail: { status: 'syncing' } }));
    const res = await fetch('/api/supabase/sync');
    const data = await res.json();

    if (!res.ok || !data.success) {
      window.dispatchEvent(new CustomEvent('cloud-sync-status', { detail: { status: 'offline' } }));
      return { restored: false, hasLearnedKanji: false, learnedCount: 0, message: data.error };
    }

    // Sync vocabulary learning statuses from backend
    await syncVocabStatusesFromBackend();

    const currentLocal = storage.getProgress();

    if (data.progress && Array.isArray(data.progress) && data.progress.length > 0) {
      // Perform safe merge
      const { merged, learnedCount } = mergeKanjiProgress(currentLocal, data.progress);
      
      // Save merged progress locally
      localStorage.setItem('n5_kanji_progress_v2', JSON.stringify(merged));

      // Restore settings if available
      if (data.settings) {
        const localSettings = storage.getSettings();
        const mergedSettings = {
          ...localSettings,
          ...data.settings,
          daily_streak: Math.max(localSettings.daily_streak || 1, data.settings.daily_streak || 1),
          study_dates: Array.from(new Set([...(localSettings.study_dates || []), ...(data.settings.study_dates || [])]))
        };
        storage.saveSettings(mergedSettings);
      }

      // Check if local had newer items not yet in cloud
      const cloudLearnedCount = data.progress.filter((p: any) => p.learning_status === 'learned').length;
      if (learnedCount > cloudLearnedCount) {
        // Push merged state to cloud
        await syncFullProjectToCloud();
      } else {
        window.dispatchEvent(new CustomEvent('cloud-sync-status', { detail: { status: 'saved', timestamp: Date.now() } }));
      }

      window.dispatchEvent(new CustomEvent('project-data-refreshed'));

      return {
        restored: true,
        hasLearnedKanji: learnedCount > 0,
        learnedCount
      };
    } else {
      // Cloud has no kanji progress yet; push local progress up to initialize cloud
      const localLearned = currentLocal.filter(p => p.learning_status === 'learned').length;
      if (localLearned > 0) {
        await syncFullProjectToCloud();
      } else {
        window.dispatchEvent(new CustomEvent('cloud-sync-status', { detail: { status: 'saved' } }));
      }

      return {
        restored: true,
        hasLearnedKanji: localLearned > 0,
        learnedCount: localLearned
      };
    }
  } catch (err: any) {
    window.dispatchEvent(new CustomEvent('cloud-sync-status', { detail: { status: 'offline' } }));
    return { restored: false, hasLearnedKanji: false, learnedCount: 0, message: err.message };
  }
}

/**
 * 1-Click Recovery for Kanji Level 1 (Kanji #1 to #10):
 * Restores Level 1 kanji as learned, unlocks Level 2, saves locally, and immediately verifies with Supabase.
 */
export async function recoverCompletedLevel1(): Promise<{ success: boolean; progress: UserKanjiProgress[]; error?: string }> {
  const current = storage.getProgress();
  const now = new Date().toISOString();

  const recovered = current.map(p => {
    if (p.kanji_id >= 1 && p.kanji_id <= 10) {
      return {
        ...p,
        learning_status: 'learned' as LearningStatus,
        learned_at: p.learned_at || now,
        meaning_accuracy: 100,
        onyomi_accuracy: 100,
        kunyomi_accuracy: 100,
        vocabulary_accuracy: 100,
        revision_count: Math.max(p.revision_count || 0, 1),
        last_studied_at: now
      };
    }
    return p;
  });

  const withUnlocks = evaluateLevelProgressions(recovered);
  storage.saveProgress(withUnlocks);

  const syncRes = await syncFullProjectToCloud();
  window.dispatchEvent(new CustomEvent('project-data-refreshed'));

  return {
    success: syncRes.success,
    progress: withUnlocks,
    error: syncRes.error
  };
}
