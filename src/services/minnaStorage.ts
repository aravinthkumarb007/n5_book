import { CustomLesson, ExamResultRecord, MinnaUserLessonProgress } from '@/types/minna';
import { ALL_MINNA_LESSONS } from '@/data/minnaNoNihongo';
async function syncMinna(action: string, value: unknown) {
  if (typeof window === 'undefined') return;
  const response = await fetch('/api/database/minna', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, value }),
  });
  if (!response.ok && response.status !== 401) throw new Error('Minna cloud sync failed');
}

const MINNA_STORAGE_KEYS = {
  PROGRESS: 'minna_user_progress_v1',
  CUSTOM_LESSONS: 'minna_custom_lessons_v1',
  EXAM_RESULTS: 'minna_exam_results_v1'
};

const DEFAULT_USER_ID = '00000000-0000-0000-0000-000000000001';

// Initial progress for all 25 lessons (Lesson 1 is in_progress by default)
export function getInitialMinnaProgress(): MinnaUserLessonProgress[] {
  return ALL_MINNA_LESSONS.map((lesson, index) => ({
    lessonNumber: lesson.lessonNumber,
    status: index === 0 ? 'in_progress' : 'not_started',
    learnedVocabIds: [],
    understoodGrammarIds: [],
    bestScore: 0,
    totalAttempts: 0,
    lastStudiedAt: index === 0 ? new Date().toISOString() : null,
    weakVocabIds: [],
    weakGrammarIds: []
  }));
}

// ---------------------------------------------------------------------------
// Lesson Progress Storage
// ---------------------------------------------------------------------------

export function loadMinnaProgress(): MinnaUserLessonProgress[] {
  if (typeof window === 'undefined') return getInitialMinnaProgress();

  try {
    const raw = localStorage.getItem(MINNA_STORAGE_KEYS.PROGRESS);
    if (!raw) {
      const initial = getInitialMinnaProgress();
      saveMinnaProgress(initial);
      return initial;
    }
    const parsed: MinnaUserLessonProgress[] = JSON.parse(raw);
    
    // Ensure all 25 lessons exist even if local cache was older
    const initial = getInitialMinnaProgress();
    const map = new Map<number, MinnaUserLessonProgress>();
    for (const item of parsed) {
      map.set(item.lessonNumber, item);
    }

    const merged = initial.map(init => map.get(init.lessonNumber) || init);
    return merged;
  } catch (err) {
    console.error('Error loading minna progress from localStorage:', err);
    return getInitialMinnaProgress();
  }
}

export function saveMinnaProgress(progress: MinnaUserLessonProgress[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(MINNA_STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  } catch (err) {
    console.error('Error saving minna progress to localStorage:', err);
  }

  // Asynchronous background sync to Neon if configured
  if (typeof window !== 'undefined') {
    syncMinnaProgressToNeon(progress).catch(err => {
      console.warn('Neon minna progress sync background error:', err);
    });
  }
}

async function syncMinnaProgressToNeon(progress: MinnaUserLessonProgress[]): Promise<void> {
  try {
    const rows = progress.map(p => ({
      user_id: DEFAULT_USER_ID,
      lesson_number: p.lessonNumber,
      status: p.status,
      learned_vocab_ids: p.learnedVocabIds,
      understood_grammar_ids: p.understoodGrammarIds,
      best_score: p.bestScore,
      total_attempts: p.totalAttempts,
      weak_vocab_ids: p.weakVocabIds,
      weak_grammar_ids: p.weakGrammarIds,
      last_studied_at: p.lastStudiedAt || new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));

    await syncMinna('progress', rows);
  } catch (e) {
    // Graceful fallback for offline / unauthenticated states
  }
}

export function updateLessonProgress(
  lessonNumber: number,
  updates: Partial<MinnaUserLessonProgress>
): MinnaUserLessonProgress[] {
  const current = loadMinnaProgress();
  const next = current.map(item => {
    if (item.lessonNumber === lessonNumber) {
      const updated = {
        ...item,
        ...updates,
        lastStudiedAt: new Date().toISOString()
      };
      // Check auto completion
      const lesson = ALL_MINNA_LESSONS.find(l => l.lessonNumber === lessonNumber);
      if (lesson) {
        const allVocabLearned = lesson.vocabulary.length > 0 &&
          lesson.vocabulary.every(v => updated.learnedVocabIds.includes(v.id));
        const allGrammarDone = lesson.grammar.length > 0 &&
          lesson.grammar.every(g => updated.understoodGrammarIds.includes(g.id));

        if (allVocabLearned && allGrammarDone && updated.bestScore >= 80) {
          updated.status = 'mastered';
        } else if ((allVocabLearned || allGrammarDone) && updated.status === 'not_started') {
          updated.status = 'in_progress';
        }
      }
      return updated;
    }
    return item;
  });

  saveMinnaProgress(next);
  return next;
}

export function toggleVocabLearned(lessonNumber: number, vocabId: string): MinnaUserLessonProgress[] {
  const current = loadMinnaProgress();
  const item = current.find(p => p.lessonNumber === lessonNumber);
  if (!item) return current;

  const exists = item.learnedVocabIds.includes(vocabId);
  const nextVocab = exists
    ? item.learnedVocabIds.filter(id => id !== vocabId)
    : [...item.learnedVocabIds, vocabId];

  return updateLessonProgress(lessonNumber, {
    learnedVocabIds: nextVocab,
    status: item.status === 'not_started' ? 'in_progress' : item.status
  });
}

export function toggleGrammarUnderstood(lessonNumber: number, grammarId: string): MinnaUserLessonProgress[] {
  const current = loadMinnaProgress();
  const item = current.find(p => p.lessonNumber === lessonNumber);
  if (!item) return current;

  const exists = item.understoodGrammarIds.includes(grammarId);
  const nextGrammar = exists
    ? item.understoodGrammarIds.filter(id => id !== grammarId)
    : [...item.understoodGrammarIds, grammarId];

  return updateLessonProgress(lessonNumber, {
    understoodGrammarIds: nextGrammar,
    status: item.status === 'not_started' ? 'in_progress' : item.status
  });
}

// ---------------------------------------------------------------------------
// Custom Lessons Storage
// ---------------------------------------------------------------------------

export function loadCustomLessons(): CustomLesson[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(MINNA_STORAGE_KEYS.CUSTOM_LESSONS);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error loading custom lessons:', err);
    return [];
  }
}

export function saveCustomLesson(lesson: CustomLesson): CustomLesson[] {
  const all = loadCustomLessons();
  const existingIdx = all.findIndex(l => l.id === lesson.id);
  let next: CustomLesson[];

  if (existingIdx >= 0) {
    next = [...all];
    next[existingIdx] = { ...lesson, updatedAt: new Date().toISOString() };
  } else {
    next = [lesson, ...all];
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(MINNA_STORAGE_KEYS.CUSTOM_LESSONS, JSON.stringify(next));
  }

  // Sync to Neon
  if (typeof window !== 'undefined') {
    Promise.resolve(
      syncMinna('lesson', {
        id: lesson.id,
        user_id: DEFAULT_USER_ID,
        title: lesson.title,
        description: lesson.description,
        level: lesson.level,
        tags: lesson.tags,
        vocabulary: lesson.vocabulary,
        grammar: lesson.grammar,
        is_user_created: lesson.isUserCreated,
        updated_at: new Date().toISOString()
      })
    ).catch(e => console.warn('Neon custom lesson sync error:', e));
  }

  return next;
}

export function deleteCustomLesson(id: string): CustomLesson[] {
  const all = loadCustomLessons();
  const next = all.filter(l => l.id !== id);
  if (typeof window !== 'undefined') {
    localStorage.setItem(MINNA_STORAGE_KEYS.CUSTOM_LESSONS, JSON.stringify(next));
  }
  if (typeof window !== 'undefined') {
    Promise.resolve(
      syncMinna('deleteLesson', id)
    ).catch(e => console.warn(e));
  }
  return next;
}

// ---------------------------------------------------------------------------
// Custom Exam Results History
// ---------------------------------------------------------------------------

export function loadExamResults(): ExamResultRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(MINNA_STORAGE_KEYS.EXAM_RESULTS);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error loading exam results:', err);
    return [];
  }
}

export function saveExamResult(result: ExamResultRecord): ExamResultRecord[] {
  const all = loadExamResults();
  const next = [result, ...all].slice(0, 50); // Keep latest 50 tests

  if (typeof window !== 'undefined') {
    localStorage.setItem(MINNA_STORAGE_KEYS.EXAM_RESULTS, JSON.stringify(next));
  }

  // Update bestScore on affected lessons
  for (const lNum of result.lessonNumbers) {
    const current = loadMinnaProgress();
    const lProg = current.find(p => p.lessonNumber === lNum);
    if (lProg) {
      const newBest = Math.max(lProg.bestScore, result.scorePercent);
      const newAttempts = lProg.totalAttempts + 1;
      updateLessonProgress(lNum, {
        bestScore: newBest,
        totalAttempts: newAttempts,
        status: newBest >= 80 ? (lProg.status === 'not_started' ? 'completed' : lProg.status) : 'in_progress'
      });
    }
  }

  // Sync to Neon
  if (typeof window !== 'undefined') {
    Promise.resolve(
      syncMinna('exam', {
        id: result.id,
        user_id: DEFAULT_USER_ID,
        exam_title: result.examTitle,
        score_percent: result.scorePercent,
        correct_count: result.correctCount,
        total_questions: result.totalQuestions,
        time_spent_seconds: result.timeSpentSeconds,
        lesson_numbers: result.lessonNumbers,
        answers: result.answers,
        weak_lessons: result.weakLessons,
        weak_grammar_topics: result.weakGrammarTopics,
        weak_vocab: result.weakVocab,
        ai_diagnostic: result.aiDiagnostic || {}
      })
    ).catch(e => console.warn('Neon exam result sync error:', e));
  }

  return next;
}

// ---------------------------------------------------------------------------
// Dashboard Statistics Aggregator
// ---------------------------------------------------------------------------

export function getMinnaDashboardStats() {
  const progressList = loadMinnaProgress();
  const examResults = loadExamResults();

  let completedLessons = 0;
  let masteredLessons = 0;
  let totalLearnedVocab = 0;
  let totalUnderstoodGrammar = 0;

  for (const p of progressList) {
    if (p.status === 'completed') completedLessons++;
    if (p.status === 'mastered') {
      completedLessons++;
      masteredLessons++;
    }
    totalLearnedVocab += p.learnedVocabIds?.length || 0;
    totalUnderstoodGrammar += p.understoodGrammarIds?.length || 0;
  }

  const avgExamScore = examResults.length > 0
    ? Math.round(examResults.reduce((acc, r) => acc + r.scorePercent, 0) / examResults.length)
    : 0;

  return {
    totalLessons: ALL_MINNA_LESSONS.length,
    completedLessons,
    masteredLessons,
    totalLearnedVocab,
    totalUnderstoodGrammar,
    totalExamsTaken: examResults.length,
    avgExamScore
  };
}
