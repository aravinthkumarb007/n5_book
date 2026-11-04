import { CountersTestResult } from '@/types/counters';

const COUNTERS_STORAGE_KEYS = {
  QUIZ_RESULTS: 'n5_counters_quiz_results_v1',
  STUDIED_ITEMS: 'n5_counters_studied_items_v1',
  QUESTION_HISTORY: 'n5_counters_question_history_v1'
};

const DEFAULT_USER_ID = '00000000-0000-0000-0000-000000000001';

export function getCountersQuizHistory(): CountersTestResult[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(COUNTERS_STORAGE_KEYS.QUIZ_RESULTS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function getLatestCountersQuizResult(): CountersTestResult | null {
  const history = getCountersQuizHistory();
  return history.length > 0 ? history[0] : null;
}

export function saveCountersQuizResult(result: CountersTestResult): CountersTestResult[] {
  if (typeof window === 'undefined') return [result];
  try {
    const history = getCountersQuizHistory();
    const updated = [result, ...history.filter(r => r.id !== result.id)].slice(0, 50);
    localStorage.setItem(COUNTERS_STORAGE_KEYS.QUIZ_RESULTS, JSON.stringify(updated));

    // Record question fingerprints
    const fingerprints = getPastCountersQuestionFingerprints();
    result.answers.forEach(a => {
      if (a.question.prompt) {
        fingerprints.add(a.question.prompt.trim());
      }
    });
    localStorage.setItem(COUNTERS_STORAGE_KEYS.QUESTION_HISTORY, JSON.stringify(Array.from(fingerprints).slice(-500)));

    // Optional background sync
    syncCountersResultToSupabase(result).catch(() => {});

    return updated;
  } catch (err) {
    console.error('Error saving counters quiz result:', err);
    return [result];
  }
}

export function getStudiedItemIds(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(COUNTERS_STORAGE_KEYS.STUDIED_ITEMS);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

export function markItemStudied(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const set = getStudiedItemIds();
    set.add(id);
    localStorage.setItem(COUNTERS_STORAGE_KEYS.STUDIED_ITEMS, JSON.stringify(Array.from(set)));
  } catch {}
}

export function getPastCountersQuestionFingerprints(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(COUNTERS_STORAGE_KEYS.QUESTION_HISTORY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

// Background sync to Supabase
async function syncCountersResultToSupabase(result: CountersTestResult): Promise<void> {
  try {
    await fetch('/api/supabase/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        countersQuizResult: {
          id: result.id,
          user_id: DEFAULT_USER_ID,
          category: result.category,
          category_title: result.categoryTitle,
          score_percent: result.percentage,
          total_questions: result.totalQuestions,
          correct_count: result.correctCount,
          time_spent_seconds: result.timeSpentSeconds,
          topic_performance: result.topicPerformance,
          strong_areas: result.strongAreas,
          weak_areas: result.weakAreas,
          completed_at: result.completedAt
        }
      })
    });
  } catch {}
}

