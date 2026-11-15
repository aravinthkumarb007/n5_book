import { KanjiRecord } from '@/types/kanji';
import { ALL_120_KANJI, LEVEL_METADATA } from '@/data/kanjiDatabase';

export type JlptQuestionType =
  | 'reading_identification'
  | 'kanji_selection'
  | 'vocab_meaning'
  | 'contextual_usage'
  | 'sentence_fill';

export const JLPT_QUESTION_TYPE_META: Record<JlptQuestionType, { label: string; japaneseLabel: string; description: string }> = {
  reading_identification: {
    label: 'Kanji Reading Identification',
    japaneseLabel: '漢字の読み',
    description: 'Select the correct reading for the specified Kanji in context'
  },
  kanji_selection: {
    label: 'Hiragana to Kanji Selection',
    japaneseLabel: '表記・漢字選択',
    description: 'Select the correct Kanji character corresponding to the Hiragana word'
  },
  vocab_meaning: {
    label: 'Kanji Vocabulary Meaning',
    japaneseLabel: '語彙の意味',
    description: 'Identify the accurate English meaning of compound words (熟語)'
  },
  contextual_usage: {
    label: 'Contextual Vocabulary Usage',
    japaneseLabel: '文脈規定・使い方',
    description: 'Determine the most appropriate word or Kanji for the real-world situation'
  },
  sentence_fill: {
    label: 'Sentence-Based Kanji Application',
    japaneseLabel: '文中漢字選択',
    description: 'Choose the appropriate Kanji to complete a Japanese sentence'
  }
};

export interface AiLevelQuestion {
  id: string;
  kanjiId: number;
  kanjiCharacter: string;
  kanjiLevel: number;
  isCurrentLevel: boolean;
  questionType: JlptQuestionType;
  questionTypeLabel: string;
  prompt: string;
  subPrompt?: string;
  contextSentence?: string;
  options: string[]; // exactly 4 choices
  correctAnswer: string;
  explanation: string;
  audioTarget?: string;
}

export interface AiLevelExamEvaluation {
  score: number;
  totalQuestions: number;
  accuracyPercent: number;
  isPassed: boolean;
  timeSpentSeconds: number;
  currentLevel: number;
  currentLevelStats: {
    correct: number;
    total: number;
    pct: number;
  };
  previousLevelsStats: {
    correct: number;
    total: number;
    pct: number;
  };
  typeBreakdown: {
    type: JlptQuestionType;
    label: string;
    correct: number;
    total: number;
    pct: number;
  }[];
  strengths: string[];
  weakAreas: string[];
  incorrectKanji: {
    kanji: KanjiRecord;
    questionPrompt: string;
    selectedAnswer: string;
    correctAnswer: string;
    explanation: string;
  }[];
  examReadinessRating: 'Exam Ready' | 'Proficient' | 'Developing' | 'Needs Practice';
  recommendations: string[];
}

/**
 * Builds the cumulative learned Kanji pool for a given level.
 * Level 1: Learned Level 1 Kanji
 * Level 2: Learned Level 1 + Level 2 Kanji
 * Level 3: Learned Levels 1, 2, 3 Kanji
 * ...and so on.
 */
export function getCumulativeLearnedKanjiPool(
  targetLevel: number,
  learnedKanjiIds: number[]
): {
  cumulativePool: KanjiRecord[];
  currentLevelLearned: KanjiRecord[];
  previousLevelsLearned: KanjiRecord[];
} {
  const learnedSet = new Set(learnedKanjiIds);

  // Current level learned kanji
  let currentLevelLearned = ALL_120_KANJI.filter(
    k => k.level === targetLevel && learnedSet.has(k.id)
  );

  // If user is testing Level 1 and hasn't marked any as learned yet,
  // allow all Level 1 Kanji so they are never blocked from their first test!
  if (targetLevel === 1 && currentLevelLearned.length === 0) {
    currentLevelLearned = ALL_120_KANJI.filter(k => k.level === 1);
  }

  // Previous levels (1 to targetLevel - 1) learned kanji
  let previousLevelsLearned = ALL_120_KANJI.filter(
    k => k.level < targetLevel && learnedSet.has(k.id)
  );

  // If testing Level > 1 and previous levels haven't been marked learned,
  // include foundational Level 1 kanji as base retention pool
  if (targetLevel > 1 && previousLevelsLearned.length === 0) {
    previousLevelsLearned = ALL_120_KANJI.filter(k => k.level < targetLevel);
  }

  const cumulativePool = [...previousLevelsLearned, ...currentLevelLearned];

  return {
    cumulativePool,
    currentLevelLearned,
    previousLevelsLearned
  };
}

/**
 * Evaluates the results of an AI Level Assessment exam.
 */
export function evaluateAiLevelExam(
  questions: AiLevelQuestion[],
  answers: Record<string, string>,
  targetLevel: number,
  timeSpentSeconds: number
): AiLevelExamEvaluation {
  let score = 0;
  let currentLevelCorrect = 0;
  let currentLevelTotal = 0;
  let previousLevelsCorrect = 0;
  let previousLevelsTotal = 0;

  const typeStats: Record<JlptQuestionType, { correct: number; total: number }> = {
    reading_identification: { correct: 0, total: 0 },
    kanji_selection: { correct: 0, total: 0 },
    vocab_meaning: { correct: 0, total: 0 },
    contextual_usage: { correct: 0, total: 0 },
    sentence_fill: { correct: 0, total: 0 }
  };

  const incorrectKanji: {
    kanji: KanjiRecord;
    questionPrompt: string;
    selectedAnswer: string;
    correctAnswer: string;
    explanation: string;
  }[] = [];

  for (const q of questions) {
    const selectedAnswer = answers[q.id] || '';
    const isCorrect = selectedAnswer === q.correctAnswer;

    if (isCorrect) score++;

    // Track current level vs previous level retention
    if (q.kanjiLevel === targetLevel) {
      currentLevelTotal++;
      if (isCorrect) currentLevelCorrect++;
    } else {
      previousLevelsTotal++;
      if (isCorrect) previousLevelsCorrect++;
    }

    // Track question type
    if (typeStats[q.questionType]) {
      typeStats[q.questionType].total++;
      if (isCorrect) typeStats[q.questionType].correct++;
    }

    if (!isCorrect) {
      const kanjiRecord = ALL_120_KANJI.find(k => k.id === q.kanjiId) || {
        id: q.kanjiId,
        kanji_number: q.kanjiId,
        character: q.kanjiCharacter,
        meaning: 'Kanji Concept',
        level: q.kanjiLevel,
        onyomi_readings: [],
        kunyomi_readings: [],
        onyomi_romaji: [],
        kunyomi_romaji: [],
        hiragana_reading: '',
        stroke_count: 0,
        radicals: '',
        stroke_order_data: { count: 0 },
        mnemonic: 'Focus on character structure and readings',
        vocabulary: [],
        example_sentences: []
      };

      incorrectKanji.push({
        kanji: kanjiRecord,
        questionPrompt: q.prompt,
        selectedAnswer: selectedAnswer || '(Unanswered)',
        correctAnswer: q.correctAnswer,
        explanation: q.explanation
      });
    }
  }

  const totalQuestions = questions.length;
  const accuracyPercent = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const isPassed = accuracyPercent >= 80;

  const currentLevelPct = currentLevelTotal > 0
    ? Math.round((currentLevelCorrect / currentLevelTotal) * 100)
    : 100;

  const previousLevelsPct = previousLevelsTotal > 0
    ? Math.round((previousLevelsCorrect / previousLevelsTotal) * 100)
    : 100;

  // Breakdown by question type
  const typeBreakdown = (Object.keys(typeStats) as JlptQuestionType[]).map(type => {
    const st = typeStats[type];
    const pct = st.total > 0 ? Math.round((st.correct / st.total) * 100) : 100;
    return {
      type,
      label: JLPT_QUESTION_TYPE_META[type].label,
      correct: st.correct,
      total: st.total,
      pct
    };
  }).filter(t => t.total > 0);

  // Strengths and weak areas
  const strengths: string[] = [];
  const weakAreas: string[] = [];

  if (currentLevelPct >= 80) {
    strengths.push(`Level ${targetLevel} Kanji Mastery (${currentLevelPct}%)`);
  } else {
    weakAreas.push(`Level ${targetLevel} New Kanji Recall (${currentLevelPct}%)`);
  }

  if (previousLevelsTotal > 0) {
    if (previousLevelsPct >= 80) {
      strengths.push(`Cumulative Retention (Levels 1–${targetLevel - 1}): ${previousLevelsPct}%`);
    } else {
      weakAreas.push(`Cumulative Retention (Levels 1–${targetLevel - 1}): ${previousLevelsPct}%`);
    }
  }

  typeBreakdown.forEach(tb => {
    if (tb.pct >= 80) {
      strengths.push(`${tb.label} (${tb.pct}%)`);
    } else if (tb.pct < 70) {
      weakAreas.push(`${tb.label} (${tb.pct}%)`);
    }
  });

  // Exam readiness rating
  let examReadinessRating: 'Exam Ready' | 'Proficient' | 'Developing' | 'Needs Practice' = 'Needs Practice';
  if (accuracyPercent >= 90) {
    examReadinessRating = 'Exam Ready';
  } else if (accuracyPercent >= 80) {
    examReadinessRating = 'Proficient';
  } else if (accuracyPercent >= 60) {
    examReadinessRating = 'Developing';
  }

  // Recommendations
  const recommendations: string[] = [];
  if (incorrectKanji.length > 0) {
    const missedChars = Array.from(new Set(incorrectKanji.map(i => `「${i.kanji.character}」`))).join(', ');
    recommendations.push(`Revise missed Kanji ${missedChars} focusing on readings and common compounds.`);
  }
  if (previousLevelsTotal > 0 && previousLevelsPct < 80) {
    recommendations.push(`Revisit earlier levels (1 through ${targetLevel - 1}) to consolidate long-term retention before the official exam.`);
  }
  if (accuracyPercent >= 80) {
    recommendations.push(`Excellent performance! You are well-prepared for Level ${targetLevel} questions under JLPT and NAT-TEST examination conditions.`);
  } else {
    recommendations.push(`Retake this AI assessment after reviewing missed characters to cement retention.`);
  }

  return {
    score,
    totalQuestions,
    accuracyPercent,
    isPassed,
    timeSpentSeconds,
    currentLevel: targetLevel,
    currentLevelStats: {
      correct: currentLevelCorrect,
      total: currentLevelTotal,
      pct: currentLevelPct
    },
    previousLevelsStats: {
      correct: previousLevelsCorrect,
      total: previousLevelsTotal,
      pct: previousLevelsPct
    },
    typeBreakdown,
    strengths: strengths.length > 0 ? strengths : ['Exam Foundation in Progress'],
    weakAreas: weakAreas.length > 0 ? weakAreas : ['None! Flawless execution across all examination sections!'],
    incorrectKanji,
    examReadinessRating,
    recommendations
  };
}
