import { KanjiRecord } from '@/types/kanji';
import { ALL_120_KANJI } from '@/data/kanjiDatabase';

export type PedagogicalCategory =
  | 'kanji_recognition'
  | 'onyomi_kunyomi'
  | 'english_meaning'
  | 'vocab_usage'
  | 'sentence_based';

export type AssessmentDifficulty = 'easy' | 'medium' | 'hard';

export interface PedagogicalQuestion {
  id: string;
  kanjiId: number;
  kanjiCharacter: string;
  category: PedagogicalCategory;
  categoryLabel: string;
  difficulty: AssessmentDifficulty;
  prompt: string;
  secondaryPrompt: string;
  contextSentence?: string;
  options: string[]; // exactly 4 options
  correctAnswer: string;
  explanation: string;
  audioTarget?: string;
  mnemonicHint?: string;
  readingHint?: string;
}

export interface CategoryPerformance {
  category: PedagogicalCategory;
  label: string;
  correct: number;
  total: number;
  accuracy: number;
}

export interface IncorrectKanjiFeedback {
  kanji: KanjiRecord;
  questionPrompt: string;
  selectedAnswer: string;
  correctAnswer: string;
  explanation: string;
  recommendation: string;
  mnemonic: string;
}

export interface PedagogicalAssessmentSummary {
  score: number;
  totalQuestions: number;
  accuracyPercent: number;
  isPassed: boolean;
  timeSpentSeconds: number;
  categoryStats: CategoryPerformance[];
  strengths: string[];
  weaknesses: string[];
  incorrectItems: IncorrectKanjiFeedback[];
  difficultyPath: AssessmentDifficulty[];
}

export const CATEGORY_META: Record<PedagogicalCategory, { label: string; icon: string; description: string }> = {
  kanji_recognition: {
    label: 'Kanji Recognition',
    icon: '🈁',
    description: 'Visual character identification & radical discrimination'
  },
  onyomi_kunyomi: {
    label: 'Onyomi & Kunyomi Readings',
    icon: '🗣️',
    description: 'Chinese-derived Onyomi vs native Japanese Kunyomi reading discrimination'
  },
  english_meaning: {
    label: 'English Meanings',
    icon: '🔤',
    description: 'Semantic understanding and core translation recall'
  },
  vocab_usage: {
    label: 'Vocabulary Usage',
    icon: '📚',
    description: 'Real-world compound words (熟語) and practical vocabulary'
  },
  sentence_based: {
    label: 'Sentence Application',
    icon: '📝',
    description: 'Contextual Japanese sentence completion and reading application'
  }
};

/**
 * Calculates detailed performance metrics, category breakdown, strengths,
 * weaknesses, and personalized review recommendations for AI-generated assessments.
 */
export function evaluatePedagogicalAssessment(
  questions: PedagogicalQuestion[],
  answers: { questionId: string; selectedAnswer: string; isCorrect: boolean }[],
  timeSpentSeconds: number
): PedagogicalAssessmentSummary {
  const answerMap = new Map(answers.map(a => [a.questionId, a]));
  let correctCount = 0;

  // Category trackers
  const categoryMap: Record<PedagogicalCategory, { correct: number; total: number }> = {
    kanji_recognition: { correct: 0, total: 0 },
    onyomi_kunyomi: { correct: 0, total: 0 },
    english_meaning: { correct: 0, total: 0 },
    vocab_usage: { correct: 0, total: 0 },
    sentence_based: { correct: 0, total: 0 }
  };

  const incorrectItems: IncorrectKanjiFeedback[] = [];
  const difficultyPath: AssessmentDifficulty[] = [];

  for (const q of questions) {
    const ans = answerMap.get(q.id);
    const isCorrect = ans ? ans.isCorrect : false;
    if (isCorrect) correctCount++;

    difficultyPath.push(q.difficulty);

    if (categoryMap[q.category]) {
      categoryMap[q.category].total++;
      if (isCorrect) {
        categoryMap[q.category].correct++;
      }
    }

    if (!isCorrect) {
      const kanjiRecord = ALL_120_KANJI.find(k => k.id === q.kanjiId) || {
        id: q.kanjiId,
        kanji_number: q.kanjiId,
        character: q.kanjiCharacter,
        meaning: 'Kanji Concept',
        level: 1,
        onyomi_readings: [],
        kunyomi_readings: [],
        onyomi_romaji: [],
        kunyomi_romaji: [],
        hiragana_reading: '',
        stroke_count: 0,
        radicals: '',
        stroke_order_data: { count: 0 },
        mnemonic: q.mnemonicHint || 'Focus on radical structure',
        vocabulary: [],
        example_sentences: []
      };

      let recommendation = `Review the core shape and stroke order of 「${q.kanjiCharacter}」. Remember: "${kanjiRecord.meaning}".`;
      if (q.category === 'onyomi_kunyomi') {
        recommendation = `Review readings for 「${q.kanjiCharacter}」: Onyomi [${kanjiRecord.onyomi_readings.join(', ') || 'N/A'}] vs Kunyomi [${kanjiRecord.kunyomi_readings.join(', ') || 'N/A'}].`;
      } else if (q.category === 'vocab_usage') {
        recommendation = `Study compound words containing 「${q.kanjiCharacter}」 (${kanjiRecord.meaning}) to build contextual vocabulary connections.`;
      } else if (q.category === 'sentence_based') {
        recommendation = `Practice reading full Japanese sentences containing 「${q.kanjiCharacter}」 to solidify grammatical comprehension.`;
      }

      incorrectItems.push({
        kanji: kanjiRecord,
        questionPrompt: q.prompt,
        selectedAnswer: ans ? ans.selectedAnswer : 'No answer',
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        recommendation,
        mnemonic: kanjiRecord.mnemonic
      });
    }
  }

  const totalQuestions = questions.length;
  const accuracyPercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const isPassed = accuracyPercent >= 80;

  // Build category stats array
  const categoryStats: CategoryPerformance[] = (
    Object.keys(categoryMap) as PedagogicalCategory[]
  ).map(cat => {
    const data = categoryMap[cat];
    const accuracy = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 100;
    return {
      category: cat,
      label: CATEGORY_META[cat].label,
      correct: data.correct,
      total: data.total,
      accuracy
    };
  }).filter(c => c.total > 0);

  // Identify Strengths and Weaknesses
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  categoryStats.forEach(stat => {
    if (stat.accuracy >= 80) {
      strengths.push(`${stat.label} (${stat.accuracy}% mastery)`);
    } else {
      weaknesses.push(`${stat.label} (${stat.accuracy}% - targeted review advised)`);
    }
  });

  return {
    score: correctCount,
    totalQuestions,
    accuracyPercent,
    isPassed,
    timeSpentSeconds,
    categoryStats,
    strengths: strengths.length > 0 ? strengths : ['Foundation Building in Progress'],
    weaknesses: weaknesses.length > 0 ? weaknesses : ['None! Perfect performance across all categories!'],
    incorrectItems,
    difficultyPath
  };
}
