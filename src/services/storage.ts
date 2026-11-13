import {
  KanjiRecord,
  LearningStatus,
  QuizResultRecord,
  StudySessionRecord,
  UserKanjiProgress,
  UserSettings,
  KanjiLevelTestResult
} from '../types/kanji';
import { ALL_120_KANJI, LEVEL_METADATA } from '../data/kanjiDatabase';

const STORAGE_KEYS = {
  PROGRESS: 'n5_kanji_progress_v2',
  SETTINGS: 'n5_kanji_settings_v2',
  QUIZ_HISTORY: 'n5_kanji_quiz_history_v2',
  SESSIONS: 'n5_kanji_sessions_v2',
  AI_CACHE: 'n5_kanji_ai_cache_v2',
  LEVEL_TESTS: 'n5_kanji_level_test_results_v2'
};

export const DEFAULT_SETTINGS: UserSettings = {
  user_id: 'user_default',
  user_name: 'Office Kanji Master',
  daily_target: 5,
  preferred_session_duration: 10,
  theme: 'light',
  sound_enabled: true,
  audio_speed: 1.0,
  daily_streak: 1,
  last_active_date: new Date().toISOString().split('T')[0],
  study_dates: [new Date().toISOString().split('T')[0]],
};

export const getInitialProgress = (): UserKanjiProgress[] => {
  return ALL_120_KANJI.map(kanji => ({
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
  }));
};

export const isLevelUnlocked = (level: number, progressList: UserKanjiProgress[]): boolean => {
  if (level === 1) return true;
  const previousLevelMeta = LEVEL_METADATA.find(l => l.level === level - 1);
  if (!previousLevelMeta) return false;

  const previousLevelProgress = progressList.filter(p => previousLevelMeta.kanjiIds.includes(p.kanji_id));
  if (previousLevelProgress.length !== 10) return false;

  return previousLevelProgress.every(p => p.learning_status === 'learned' || p.learning_status === 'needs_revision');
};

export const evaluateLevelProgressions = (progressList: UserKanjiProgress[]): UserKanjiProgress[] => {
  let updated = [...progressList];
  
  for (let lvl = 2; lvl <= 12; lvl++) {
    const unlocked = isLevelUnlocked(lvl, updated);
    const lvlMeta = LEVEL_METADATA.find(l => l.level === lvl);
    if (lvlMeta && unlocked) {
      updated = updated.map(p => {
        if (lvlMeta.kanjiIds.includes(p.kanji_id) && p.learning_status === 'locked') {
          return { ...p, learning_status: 'available' };
        }
        return p;
      });
    }
  }

  return updated;
};

let autoSyncTimer: any = null;

export function triggerAutoCloudSync() {
  if (typeof window === 'undefined') return;
  if (autoSyncTimer) clearTimeout(autoSyncTimer);

  autoSyncTimer = setTimeout(async () => {
    try {
      const { syncFullProjectToCloud } = await import('./cloudSyncService');
      await syncFullProjectToCloud();
    } catch (e) {
      console.warn('Auto cloud sync failed:', e);
    }
  }, 1000);
}

class StorageService {
  private isClient(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  getProgress(): UserKanjiProgress[] {
    if (!this.isClient()) return getInitialProgress();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
      if (!data) {
        const init = getInitialProgress();
        this.saveProgress(init);
        return init;
      }
      const parsed: UserKanjiProgress[] = JSON.parse(data);
      if (parsed.length !== 120) {
        const fullMap = new Map(parsed.map(p => [p.kanji_id, p]));
        const complete = getInitialProgress().map(item => fullMap.get(item.kanji_id) || item);
        this.saveProgress(complete);
        return complete;
      }
      return parsed;
    } catch {
      return getInitialProgress();
    }
  }

  saveProgress(progress: UserKanjiProgress[]) {
    if (!this.isClient()) return;
    try {
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
      triggerAutoCloudSync();
    } catch (e) {
      console.error('Error saving progress:', e);
    }
  }

  updateSingleKanjiProgress(kanjiId: number, update: Partial<UserKanjiProgress>): UserKanjiProgress[] {
    const list = this.getProgress();
    const index = list.findIndex(p => p.kanji_id === kanjiId);
    if (index === -1) return list;

    list[index] = { ...list[index], ...update };
    const withUnlocks = evaluateLevelProgressions(list);
    this.saveProgress(withUnlocks);

    // If kanji was marked as learned, verify if this completed its level
    if (update.learning_status === 'learned') {
      const kanjiMeta = ALL_120_KANJI.find(k => k.id === kanjiId);
      if (kanjiMeta) {
        const lvlMeta = LEVEL_METADATA.find(l => l.level === kanjiMeta.level);
        if (lvlMeta) {
          const allLearned = lvlMeta.kanjiIds.every(id => {
            const item = withUnlocks.find(p => p.kanji_id === id);
            return item && item.learning_status === 'learned';
          });
          if (allLearned && typeof window !== 'undefined') {
            import('./cloudSyncService').then(({ verifyAndSaveLevelCompletion }) => {
              verifyAndSaveLevelCompletion(kanjiMeta.level, withUnlocks);
            }).catch(() => {});
          }
        }
      }
    }

    return withUnlocks;
  }

  getSettings(): UserSettings {
    if (!this.isClient()) return DEFAULT_SETTINGS;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!data) {
        this.saveSettings(DEFAULT_SETTINGS);
        return DEFAULT_SETTINGS;
      }
      return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  saveSettings(settings: UserSettings) {
    if (!this.isClient()) return;
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      triggerAutoCloudSync();
    } catch (e) {
      console.error('Error saving settings:', e);
    }
  }

  recordActivityToday() {
    const settings = this.getSettings();
    const today = new Date().toISOString().split('T')[0];
    const studyDates = new Set(settings.study_dates || []);
    studyDates.add(today);

    let streak = settings.daily_streak || 1;
    if (settings.last_active_date !== today) {
      const last = new Date(settings.last_active_date);
      const curr = new Date(today);
      const diffDays = Math.round((curr.getTime() - last.getTime()) / (1000 * 3600 * 24));
      if (diffDays === 1) {
        streak += 1;
      } else if (diffDays > 1) {
        streak = 1;
      }
    }

    const updated: UserSettings = {
      ...settings,
      last_active_date: today,
      study_dates: Array.from(studyDates),
      daily_streak: streak
    };
    this.saveSettings(updated);
    return updated;
  }

  getQuizHistory(): QuizResultRecord[] {
    if (!this.isClient()) return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.QUIZ_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  addQuizResults(results: QuizResultRecord[]) {
    if (!this.isClient()) return;
    try {
      const existing = this.getQuizHistory();
      const updated = [...results, ...existing].slice(0, 500);
      localStorage.setItem(STORAGE_KEYS.QUIZ_HISTORY, JSON.stringify(updated));
      triggerAutoCloudSync();
    } catch (e) {
      console.error('Error recording quiz history:', e);
    }
  }

  getStudySessions(): StudySessionRecord[] {
    if (!this.isClient()) return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SESSIONS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  addStudySession(session: StudySessionRecord) {
    if (!this.isClient()) return;
    try {
      const existing = this.getStudySessions();
      const updated = [session, ...existing].slice(0, 200);
      localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(updated));
      this.recordActivityToday();
    } catch (e) {
      console.error('Error saving session:', e);
    }
  }

  getLearnedKanjiPool(): KanjiRecord[] {
    const progress = this.getProgress();
    const learnedIds = new Set(
      progress
        .filter(p => p.learning_status === 'learned' || p.learning_status === 'needs_revision')
        .map(p => p.kanji_id)
    );
    return ALL_120_KANJI.filter(k => learnedIds.has(k.id));
  }

  /**
   * Retrieves all Kanji that the user has either learned or unlocked.
   * Locked Kanji are strictly excluded.
   */
  getLearnedOrUnlockedKanjiPool(): KanjiRecord[] {
    const progress = this.getProgress();
    const eligibleIds = new Set(
      progress
        .filter(p => p.learning_status !== 'locked')
        .map(p => p.kanji_id)
    );
    return ALL_120_KANJI.filter(k => eligibleIds.has(k.id));
  }

  getKanjiLevelTestResults(): KanjiLevelTestResult[] {
    if (!this.isClient()) return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LEVEL_TESTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  recordKanjiLevelTestResult(result: KanjiLevelTestResult) {
    if (!this.isClient()) return;
    try {
      const existing = this.getKanjiLevelTestResults();
      const updated = [result, ...existing].slice(0, 100);
      localStorage.setItem(STORAGE_KEYS.LEVEL_TESTS, JSON.stringify(updated));
      triggerAutoCloudSync();
    } catch (e) {
      console.error('Error saving level test result:', e);
    }
  }

  getWeakKanjiRecords(): { kanji: KanjiRecord; progress: UserKanjiProgress }[] {
    const progress = this.getProgress();
    const list: { kanji: KanjiRecord; progress: UserKanjiProgress }[] = [];
    for (const p of progress) {
      if (p.learning_status === 'needs_revision' || p.mistake_count > 0) {
        const kanji = ALL_120_KANJI.find(k => k.id === p.kanji_id);
        if (kanji) {
          list.push({ kanji, progress: p });
        }
      }
    }
    return list.sort((a, b) => b.progress.mistake_count - a.progress.mistake_count);
  }

  getCachedAiContent(kanjiId: number): any | null {
    if (!this.isClient()) return null;
    try {
      const raw = localStorage.getItem(`${STORAGE_KEYS.AI_CACHE}_${kanjiId}`);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  setCachedAiContent(kanjiId: number, content: any) {
    if (!this.isClient()) return;
    try {
      localStorage.setItem(`${STORAGE_KEYS.AI_CACHE}_${kanjiId}`, JSON.stringify(content));
    } catch {}
  }

  exportData(): string {
    return JSON.stringify({
      version: '2.0',
      exportedAt: new Date().toISOString(),
      progress: this.getProgress(),
      settings: this.getSettings(),
      quizHistory: this.getQuizHistory(),
      sessions: this.getStudySessions()
    }, null, 2);
  }

  importData(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.progress && Array.isArray(parsed.progress)) {
        this.saveProgress(parsed.progress);
      }
      if (parsed.settings) {
        this.saveSettings(parsed.settings);
      }
      if (parsed.quizHistory) {
        localStorage.setItem(STORAGE_KEYS.QUIZ_HISTORY, JSON.stringify(parsed.quizHistory));
      }
      if (parsed.sessions) {
        localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(parsed.sessions));
      }
      return true;
    } catch (e) {
      console.error('Failed to import backup:', e);
      return false;
    }
  }

  resetAllProgress() {
    if (!this.isClient()) return;
    const init = getInitialProgress();
    this.saveProgress(init);
    this.saveSettings(DEFAULT_SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.QUIZ_HISTORY);
    localStorage.removeItem(STORAGE_KEYS.SESSIONS);
  }

  seedScenario(scenario: 'new_user' | 'first_5' | 'first_10_level2' | 'all_mastered') {
    const init = getInitialProgress();
    const now = new Date().toISOString();

    if (scenario === 'new_user') {
      this.saveProgress(init);
    } else if (scenario === 'first_5') {
      const modified = init.map(p => {
        if (p.kanji_id >= 1 && p.kanji_id <= 5) {
          return {
            ...p,
            learning_status: 'learned' as LearningStatus,
            learned_at: now,
            meaning_accuracy: 100,
            onyomi_accuracy: 100,
            kunyomi_accuracy: 100,
            vocabulary_accuracy: 100,
            revision_count: 1
          };
        }
        return p;
      });
      this.saveProgress(modified);
    } else if (scenario === 'first_10_level2') {
      const modified = init.map(p => {
        if (p.kanji_id >= 1 && p.kanji_id <= 10) {
          return {
            ...p,
            learning_status: 'learned' as LearningStatus,
            learned_at: now,
            meaning_accuracy: 100,
            onyomi_accuracy: 100,
            kunyomi_accuracy: 100,
            vocabulary_accuracy: 100,
            revision_count: 2
          };
        }
        return p;
      });
      const withUnlocks = evaluateLevelProgressions(modified);
      this.saveProgress(withUnlocks);
    } else if (scenario === 'all_mastered') {
      const modified = init.map(p => ({
        ...p,
        learning_status: 'learned' as LearningStatus,
        learned_at: now,
        meaning_accuracy: 96,
        onyomi_accuracy: 94,
        kunyomi_accuracy: 95,
        vocabulary_accuracy: 98,
        revision_count: 5
      }));
      this.saveProgress(modified);
    }
  }

  getProgressMap(): Record<number, UserKanjiProgress> {
    const list = this.getProgress();
    const map: Record<number, UserKanjiProgress> = {};
    list.forEach(p => {
      map[p.kanji_id] = p;
    });
    return map;
  }

  saveProgressMap(map: Record<number, UserKanjiProgress>) {
    const current = this.getProgress();
    const updated = current.map(p => map[p.kanji_id] || p);
    const withUnlocks = evaluateLevelProgressions(updated);
    this.saveProgress(withUnlocks);
  }

  updateKanjiProgress(kanjiId: number, update: Partial<UserKanjiProgress>): UserKanjiProgress[] {
    return this.updateSingleKanjiProgress(kanjiId, update);
  }

  recordQuizResult(result: any) {
    const rec: QuizResultRecord = {
      id: result.id || `quiz_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      date: result.date || new Date().toISOString(),
      kanji_id: result.kanji_id,
      question_type: result.question_type,
      selected_answer: result.selected_answer,
      correct_answer: result.correct_answer,
      is_correct: result.is_correct,
      time_taken_seconds: result.time_taken_seconds || 5
    };
    this.addQuizResults([rec]);
  }

  getQuizResults(): QuizResultRecord[] {
    return this.getQuizHistory();
  }

  recordSession(session: any) {
    const rec: StudySessionRecord = {
      id: session.id || `session_${Date.now()}`,
      user_id: session.user_id || 'user_default',
      completed_at: session.completed_at || new Date().toISOString(),
      session_duration: session.session_duration || 10,
      kanji_studied: session.kanji_studied || [],
      quiz_score: session.quiz_score || 0,
      mode: session.mode || 'regular_lesson'
    };
    this.addStudySession(rec);
  }

  resetAllData() {
    this.resetAllProgress();
  }
}

export const storage = new StorageService();
