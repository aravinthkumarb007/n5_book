import { FlashcardRating, UserKanjiProgress } from '../types/kanji';

export interface SrsCalculationResult {
  nextInterval: number; // in days
  nextRepetitions: number;
  nextEaseFactor: number;
  nextReviewAt: string; // ISO date
  newStatus: 'learned' | 'needs_revision';
}

/**
 * SuperMemo SM-2 Spaced Repetition Algorithm
 */
export function calculateSrsNextReview(
  current: UserKanjiProgress,
  rating: FlashcardRating
): SrsCalculationResult {
  let interval = current.srs_interval || 1;
  let repetitions = current.srs_repetitions || 0;
  let easeFactor = current.srs_ease_factor || 2.5;
  let status = current.learning_status;

  if (rating === 'again') {
    repetitions = 0;
    interval = 1;
    easeFactor = Math.max(1.3, easeFactor - 0.2);
    status = 'needs_revision';
  } else if (rating === 'hard') {
    interval = Math.max(1, Math.round(interval * 1.2));
    easeFactor = Math.max(1.3, easeFactor - 0.15);
  } else if (rating === 'good') {
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 3;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
    if (status === 'needs_revision' && repetitions >= 2) {
      status = 'learned';
    }
  } else if (rating === 'easy') {
    if (repetitions === 0) {
      interval = 2;
    } else if (repetitions === 1) {
      interval = 5;
    } else {
      interval = Math.round(interval * easeFactor * 1.3);
    }
    repetitions += 1;
    easeFactor = Math.min(3.0, easeFactor + 0.15);
    status = 'learned';
  }

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + interval);

  return {
    nextInterval: interval,
    nextRepetitions: repetitions,
    nextEaseFactor: Number(easeFactor.toFixed(2)),
    nextReviewAt: nextDate.toISOString(),
    newStatus: (status === 'needs_revision' ? 'needs_revision' : 'learned')
  };
}

export function isKanjiDueForReview(progress: UserKanjiProgress): boolean {
  if (progress.learning_status !== 'learned' && progress.learning_status !== 'needs_revision') {
    return false;
  }
  if (!progress.next_review_at) {
    return true;
  }
  const dueDate = new Date(progress.next_review_at);
  const now = new Date();
  return dueDate <= now;
}

export function updateAccuracy(currentAcc: number, isCorrect: boolean, weight: number = 0.25): number {
  const sample = isCorrect ? 100 : 0;
  if (currentAcc === 0) return sample;
  return Math.round(currentAcc * (1 - weight) + sample * weight);
}

export const srsEngine = {
  calculateNextReview(grade: number, repetitions: number, easeFactor: number, interval: number) {
    let newInterval = interval || 1;
    let newRepetitions = repetitions || 0;
    let newEaseFactor = easeFactor || 2.5;

    if (grade < 3) {
      newRepetitions = 0;
      newInterval = 1;
    } else {
      if (newRepetitions === 0) {
        newInterval = 1;
      } else if (newRepetitions === 1) {
        newInterval = 6;
      } else {
        newInterval = Math.round(newInterval * newEaseFactor);
      }
      newRepetitions += 1;
    }

    newEaseFactor = newEaseFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
    if (newEaseFactor < 1.3) newEaseFactor = 1.3;

    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + newInterval);

    return {
      interval: newInterval,
      repetitions: newRepetitions,
      easeFactor: Number(newEaseFactor.toFixed(2)),
      nextReviewDate
    };
  }
};
