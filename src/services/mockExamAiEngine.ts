import { 
  MockExamConfig, 
  MockExamQuestion, 
  MockExamSectionResult, 
  MockExamResult,
  MockExamMode 
} from '@/types/mockExam';

// ============================================================================
// Official JLPT N5 Examination Blueprint & Timings
// ============================================================================

export const OFFICIAL_N5_EXAM_CONFIGS: Record<MockExamMode, MockExamConfig> = {
  full: {
    id: 'n5-full-mock',
    mode: 'full',
    title: 'JLPT N5 Complete Official Full-Length Mock Examination',
    totalTimeMinutes: 90, // 20m + 40m + 30m
    sections: [
      {
        section: 'vocabulary',
        titleJa: '文字・語彙',
        titleEn: 'Vocabulary (Characters & Words)',
        timeLimitMinutes: 20,
        questionCount: 15,
        maxMarks: 15,
        categories: [
          { id: 'kanji_reading', nameJa: '漢字読み (Kanji Reading)', nameEn: 'Kanji Reading', count: 4 },
          { id: 'orthography', nameJa: '表記 (Orthography / Writing)', nameEn: 'Orthography', count: 4 },
          { id: 'context_expressions', nameJa: '文脈規定 (Contextual Usage)', nameEn: 'Contextual Usage', count: 4 },
          { id: 'paraphrases', nameJa: '言い換え類義 (Paraphrases)', nameEn: 'Paraphrases', count: 3 }
        ]
      },
      {
        section: 'grammar_reading',
        titleJa: '文法・読解',
        titleEn: 'Grammar & Reading Comprehension',
        timeLimitMinutes: 40,
        questionCount: 16,
        maxMarks: 20,
        categories: [
          { id: 'correct_grammar', nameJa: '文の文法1 (Grammar Form Selection)', nameEn: 'Grammar Form', count: 5 },
          { id: 'sentence_composition', nameJa: '文の文法2 (Sentence Composition ★)', nameEn: 'Sentence Composition', count: 4 },
          { id: 'text_grammar', nameJa: '文章の文法 (Text Grammar)', nameEn: 'Text Grammar', count: 2 },
          { id: 'short_passage', nameJa: '内容理解・短文 (Short Reading)', nameEn: 'Short Reading', count: 2 },
          { id: 'mid_passage', nameJa: '内容理解・中文 (Mid-size Reading)', nameEn: 'Mid-size Reading', count: 2 },
          { id: 'information_retrieval', nameJa: '情報検索 (Information Retrieval)', nameEn: 'Information Retrieval', count: 1 }
        ]
      },
      {
        section: 'listening',
        titleJa: '聴解',
        titleEn: 'Listening Comprehension',
        timeLimitMinutes: 30,
        questionCount: 12,
        maxMarks: 15,
        categories: [
          { id: 'task_comprehension', nameJa: '課題理解 (Task-based Comprehension)', nameEn: 'Task-based Comprehension', count: 3 },
          { id: 'point_comprehension', nameJa: 'ポイント理解 (Key Point Comprehension)', nameEn: 'Point Comprehension', count: 3 },
          { id: 'verbal_expressions', nameJa: '発話表現 (Verbal Expressions)', nameEn: 'Verbal Expressions', count: 3 },
          { id: 'quick_response', nameJa: '即時応答 (Quick Response)', nameEn: 'Quick Response', count: 3 }
        ]
      }
    ]
  },
  vocabulary: {
    id: 'n5-vocab-section',
    mode: 'vocabulary',
    title: 'JLPT N5 Section Practice: Vocabulary (文字・語彙)',
    totalTimeMinutes: 20,
    sections: [
      {
        section: 'vocabulary',
        titleJa: '文字・語彙',
        titleEn: 'Vocabulary (Characters & Words)',
        timeLimitMinutes: 20,
        questionCount: 15,
        maxMarks: 15,
        categories: [
          { id: 'kanji_reading', nameJa: '漢字読み (Kanji Reading)', nameEn: 'Kanji Reading', count: 4 },
          { id: 'orthography', nameJa: '表記 (Orthography / Writing)', nameEn: 'Orthography', count: 4 },
          { id: 'context_expressions', nameJa: '文脈規定 (Contextual Usage)', nameEn: 'Contextual Usage', count: 4 },
          { id: 'paraphrases', nameJa: '言い換え類義 (Paraphrases)', nameEn: 'Paraphrases', count: 3 }
        ]
      }
    ]
  },
  grammar_reading: {
    id: 'n5-grammar-reading-section',
    mode: 'grammar_reading',
    title: 'JLPT N5 Section Practice: Grammar & Reading (文法・読解)',
    totalTimeMinutes: 40,
    sections: [
      {
        section: 'grammar_reading',
        titleJa: '文法・読解',
        titleEn: 'Grammar & Reading Comprehension',
        timeLimitMinutes: 40,
        questionCount: 16,
        maxMarks: 20,
        categories: [
          { id: 'correct_grammar', nameJa: '文の文法1 (Grammar Form Selection)', nameEn: 'Grammar Form', count: 5 },
          { id: 'sentence_composition', nameJa: '文の文法2 (Sentence Composition ★)', nameEn: 'Sentence Composition', count: 4 },
          { id: 'text_grammar', nameJa: '文章の文法 (Text Grammar)', nameEn: 'Text Grammar', count: 2 },
          { id: 'short_passage', nameJa: '内容理解・短文 (Short Reading)', nameEn: 'Short Reading', count: 2 },
          { id: 'mid_passage', nameJa: '内容理解・中文 (Mid-size Reading)', nameEn: 'Mid-size Reading', count: 2 },
          { id: 'information_retrieval', nameJa: '情報検索 (Information Retrieval)', nameEn: 'Information Retrieval', count: 1 }
        ]
      }
    ]
  },
  listening: {
    id: 'n5-listening-section',
    mode: 'listening',
    title: 'JLPT N5 Section Practice: Listening (聴解)',
    totalTimeMinutes: 30,
    sections: [
      {
        section: 'listening',
        titleJa: '聴解',
        titleEn: 'Listening Comprehension',
        timeLimitMinutes: 30,
        questionCount: 12,
        maxMarks: 15,
        categories: [
          { id: 'task_comprehension', nameJa: '課題理解 (Task-based Comprehension)', nameEn: 'Task-based Comprehension', count: 3 },
          { id: 'point_comprehension', nameJa: 'ポイント理解 (Key Point Comprehension)', nameEn: 'Point Comprehension', count: 3 },
          { id: 'verbal_expressions', nameJa: '発話表現 (Verbal Expressions)', nameEn: 'Verbal Expressions', count: 3 },
          { id: 'quick_response', nameJa: '即時応答 (Quick Response)', nameEn: 'Quick Response', count: 3 }
        ]
      }
    ]
  }
};

// ============================================================================
// Single Sample N5 Question (strictly for development & offline demo only)
// User rule: "For development and demonstration purposes, only one sample N5 question may be hardcoded. All other mock exam questions must be AI-generated."
// ============================================================================

export const SAMPLE_DEV_N5_QUESTION: MockExamQuestion = {
  id: 'dev_sample_q1',
  section: 'vocabulary',
  category: 'kanji_reading',
  categoryNameJa: '漢字読み',
  categoryNameEn: 'Kanji Reading',
  prompt: '毎朝[まいあさ]、**新聞[しんぶん]**を 読[よ]みます。',
  subPrompt: 'Choose the correct reading for the underlined kanji word.',
  options: ['しんぶん', 'しんもん', 'きんぶん', 'きんもん'],
  correctAnswer: 'しんぶん',
  explanation: '「新聞」 is read as 「しんぶん」 (newspaper). 「新」 is しん (new) and 「聞」 is ぶん (hear).',
  marks: 1
};

// ============================================================================
// JLPT N5 Official Scoring Assessment Engine
// ============================================================================

/**
 * Calculates estimated JLPT N5 scaled scores (0-180), section thresholds, and pass/fail evaluation.
 * Official N5 reference thresholds:
 * - Overall: 80 / 180 (approx 44.4%)
 * - Language Knowledge & Reading: 38 / 120 (minimum sectional qualifying mark)
 * - Listening: 19 / 60 (minimum sectional qualifying mark)
 */
export function evaluateMockExamSubmission(
  questions: MockExamQuestion[],
  answers: Record<string, string>,
  timeSpentSeconds: number,
  mode: MockExamMode,
  examTitle: string
): MockExamResult {
  let totalRawMarks = 0;
  let maxRawMarks = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  const sectionMap: Record<string, {
    sectionId: any;
    sectionName: string;
    totalQuestions: number;
    correct: number;
    incorrect: number;
    unanswered: number;
    rawMarks: number;
    maxMarks: number;
  }> = {};

  const topicMap: Record<string, { correct: number; total: number }> = {};

  const questionReview = questions.map(q => {
    const userAns = answers[q.id];
    const isAnswered = Boolean(userAns && userAns.trim());
    const isCorrect = isAnswered && userAns.trim() === q.correctAnswer.trim();

    maxRawMarks += q.marks;

    if (!isAnswered) {
      unansweredCount++;
    } else if (isCorrect) {
      correctCount++;
      totalRawMarks += q.marks;
    } else {
      incorrectCount++;
    }

    // Section accumulation
    if (!sectionMap[q.section]) {
      const secName = q.section === 'vocabulary' 
        ? 'Language Knowledge (Vocabulary)' 
        : q.section === 'grammar_reading' 
        ? 'Language Knowledge (Grammar) & Reading' 
        : 'Listening';

      sectionMap[q.section] = {
        sectionId: q.section,
        sectionName: secName,
        totalQuestions: 0,
        correct: 0,
        incorrect: 0,
        unanswered: 0,
        rawMarks: 0,
        maxMarks: 0
      };
    }

    const sec = sectionMap[q.section];
    sec.totalQuestions++;
    sec.maxMarks += q.marks;
    if (!isAnswered) sec.unanswered++;
    else if (isCorrect) {
      sec.correct++;
      sec.rawMarks += q.marks;
    } else sec.incorrect++;

    // Topic accumulation
    const topicKey = q.categoryNameEn || q.category;
    if (!topicMap[topicKey]) topicMap[topicKey] = { correct: 0, total: 0 };
    topicMap[topicKey].total++;
    if (isCorrect) topicMap[topicKey].correct++;

    return {
      question: q,
      userAnswer: userAns || undefined,
      isCorrect
    };
  });

  const percentage = maxRawMarks > 0 ? Math.round((totalRawMarks / maxRawMarks) * 100) : 0;

  const sectionResults: MockExamSectionResult[] = Object.values(sectionMap).map(s => ({
    ...s,
    percentage: s.maxMarks > 0 ? Math.round((s.rawMarks / s.maxMarks) * 100) : 0
  }));

  // JLPT N5 Official Scaled Score Approximation
  // Lang Knowledge (Vocab/Grammar) & Reading: max 120 points
  // Listening: max 60 points
  // Total: max 180 points
  let langReadRaw = 0;
  let langReadMax = 0;
  let listenRaw = 0;
  let listenMax = 0;

  sectionResults.forEach(s => {
    if (s.sectionId === 'vocabulary' || s.sectionId === 'grammar_reading') {
      langReadRaw += s.rawMarks;
      langReadMax += s.maxMarks;
    } else if (s.sectionId === 'listening') {
      listenRaw += s.rawMarks;
      listenMax += s.maxMarks;
    }
  });

  const scaledLangRead = langReadMax > 0 
    ? Math.min(120, Math.round((langReadRaw / langReadMax) * 120)) 
    : (mode === 'listening' ? 0 : Math.round((percentage / 100) * 120));

  const scaledListening = listenMax > 0 
    ? Math.min(60, Math.round((listenRaw / listenMax) * 60)) 
    : (mode === 'listening' ? Math.round((percentage / 100) * 60) : 0);

  const scaledTotal = mode === 'full' 
    ? (scaledLangRead + scaledListening) 
    : (mode === 'listening' ? Math.round((scaledListening / 60) * 180) : Math.round((scaledLangRead / 120) * 180));

  // Official Passing Criteria:
  // Overall: >= 80/180
  // Language Knowledge & Reading: >= 38/120
  // Listening: >= 19/60
  const langReadPass = scaledLangRead >= 38;
  const listeningPass = mode === 'vocabulary' || mode === 'grammar_reading' ? true : scaledListening >= 19;
  const overallPass = scaledTotal >= 80;
  const estimatedPass = mode === 'full' 
    ? (overallPass && langReadPass && listeningPass) 
    : (mode === 'listening' ? listeningPass : langReadPass);

  // Strong & Weak Areas
  const strongTopics: string[] = [];
  const weakTopics: string[] = [];
  const recommendedTopics: string[] = [];

  Object.entries(topicMap).forEach(([topic, stats]) => {
    const pct = stats.total > 0 ? (stats.correct / stats.total) * 100 : 0;
    if (pct >= 75) {
      strongTopics.push(`${topic} (${stats.correct}/${stats.total} - ${Math.round(pct)}%)`);
    } else {
      weakTopics.push(`${topic} (${stats.correct}/${stats.total} - ${Math.round(pct)}%)`);
      recommendedTopics.push(`Review N5 ${topic} practice problems & key patterns`);
    }
  });

  if (recommendedTopics.length === 0) {
    recommendedTopics.push('Outstanding performance! Keep reinforcing retention with full-syllabus mock papers.');
  }

  return {
    id: `exam_res_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    examTitle,
    mode,
    completedAt: new Date().toISOString(),
    timeSpentSeconds,
    totalQuestions: questions.length,
    correctCount,
    incorrectCount,
    unansweredCount,
    totalRawMarks,
    maxRawMarks,
    percentage,
    jlptScaledScore: {
      languageKnowledgeAndReading: scaledLangRead,
      listening: scaledListening,
      total: scaledTotal
    },
    estimatedPass,
    passBreakdown: {
      overallPass,
      langReadPass,
      listeningPass
    },
    sectionResults,
    strongTopics,
    weakTopics,
    recommendedTopics,
    questionReview
  };
}

