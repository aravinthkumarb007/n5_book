import { MockExamQuestion, MockExamResult } from '@/types/mockExam';

const STORAGE_KEYS = {
  EXAM_RESULTS: 'n5_mock_exam_results_v1',
  GENERATED_CACHE: 'n5_mock_generated_cache_v1',
  QUESTION_HISTORY: 'n5_mock_question_history_v1'
};

const DEFAULT_USER_ID = '00000000-0000-0000-0000-000000000001';

export function getExamHistory(): MockExamResult[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EXAM_RESULTS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.warn('Error reading mock exam history:', err);
    return [];
  }
}

export function getLatestExamResult(): MockExamResult | null {
  const history = getExamHistory();
  return history.length > 0 ? history[0] : null;
}

export function saveExamResult(result: MockExamResult): MockExamResult[] {
  if (typeof window === 'undefined') return [result];
  try {
    const history = getExamHistory();
    const updated = [result, ...history.filter(r => r.id !== result.id)].slice(0, 50); // Keep last 50
    localStorage.setItem(STORAGE_KEYS.EXAM_RESULTS, JSON.stringify(updated));

    // Also record question fingerprints to prevent repetition in subsequent exams
    const fingerprints = getPastQuestionFingerprints();
    result.questionReview.forEach(item => {
      if (item.question.prompt) {
        fingerprints.add(item.question.prompt.trim());
      }
    });
    localStorage.setItem(STORAGE_KEYS.QUESTION_HISTORY, JSON.stringify(Array.from(fingerprints).slice(-500)));

    // Optional background sync to Supabase if configured
    syncExamResultToSupabase(result).catch(() => {});

    return updated;
  } catch (err) {
    console.error('Error saving mock exam result:', err);
    return [result];
  }
}

export function clearExamHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEYS.EXAM_RESULTS);
  } catch {}
}

export function getPastQuestionFingerprints(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QUESTION_HISTORY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

export function getGeneratedExamCache(key: string): MockExamQuestion[] | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(`${STORAGE_KEYS.GENERATED_CACHE}_${key}`);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveGeneratedExamCache(key: string, questions: MockExamQuestion[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${STORAGE_KEYS.GENERATED_CACHE}_${key}`, JSON.stringify(questions));
  } catch {}
}

// Background sync to Supabase
async function syncExamResultToSupabase(result: MockExamResult): Promise<void> {
  try {
    await fetch('/api/supabase/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mockExamResult: {
          id: result.id,
          user_id: DEFAULT_USER_ID,
          exam_title: result.examTitle,
          mode: result.mode,
          score_percent: result.percentage,
          total_raw_marks: result.totalRawMarks,
          max_raw_marks: result.maxRawMarks,
          jlpt_scaled_score: result.jlptScaledScore,
          estimated_pass: result.estimatedPass,
          time_spent_seconds: result.timeSpentSeconds,
          section_results: result.sectionResults,
          strong_topics: result.strongTopics,
          weak_topics: result.weakTopics,
          recommended_topics: result.recommendedTopics,
          completed_at: result.completedAt
        }
      })
    });
  } catch {}
}

