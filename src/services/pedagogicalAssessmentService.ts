import { KanjiRecord, QuizQuestionType } from '@/types/kanji';
import { ALL_120_KANJI, LEVEL_METADATA } from '@/data/kanjiDatabase';

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
 * Deterministically generates high-quality pedagogical assessment questions
 * strictly restricted to the Kanji taught in the specified lesson (level).
 */
export function generateLocalPedagogicalAssessment(
  targetKanji: KanjiRecord,
  lessonKanji: KanjiRecord[],
  totalQuestions: number = 8,
  initialDifficulty: AssessmentDifficulty = 'medium'
): PedagogicalQuestion[] {
  const safeLessonKanji = lessonKanji.length > 0 ? lessonKanji : [targetKanji];
  const peerKanji = safeLessonKanji.filter(k => k.id !== targetKanji.id);
  
  const questions: PedagogicalQuestion[] = [];
  let questionCounter = 1;

  // Helper to shuffle an array
  const shuffle = <T>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

  // Helper to get 3 unique distractors from lesson peers
  const getDistractorKanji = (excludeId: number, count: number = 3): KanjiRecord[] => {
    const candidates = safeLessonKanji.filter(k => k.id !== excludeId);
    const shuffled = shuffle(candidates);
    if (shuffled.length >= count) return shuffled.slice(0, count);
    
    // If not enough unique peers, cycle through
    const result: KanjiRecord[] = [];
    while (result.length < count && candidates.length > 0) {
      for (const k of shuffled) {
        if (result.length < count && !result.some(r => r.id === k.id)) {
          result.push(k);
        }
      }
      break;
    }
    return result;
  };

  // 1. Target Kanji - Kanji Recognition Question
  const distKanji1 = getDistractorKanji(targetKanji.id, 3);
  const recogOptions = shuffle([
    targetKanji.character,
    ...distKanji1.map(d => d.character)
  ]);
  // Ensure exactly 4 options
  while (recogOptions.length < 4 && safeLessonKanji.length > recogOptions.length) {
    const extra = safeLessonKanji.find(k => !recogOptions.includes(k.character));
    if (extra) recogOptions.push(extra.character);
    else break;
  }

  questions.push({
    id: `ped_local_${Date.now()}_${questionCounter++}`,
    kanjiId: targetKanji.id,
    kanjiCharacter: targetKanji.character,
    category: 'kanji_recognition',
    categoryLabel: CATEGORY_META.kanji_recognition.label,
    difficulty: initialDifficulty === 'hard' ? 'hard' : 'easy',
    prompt: `Which Kanji character represents the English meaning "${targetKanji.meaning}"?`,
    secondaryPrompt: `Select the correct Kanji taught in Lesson ${targetKanji.level}.`,
    options: recogOptions.slice(0, 4),
    correctAnswer: targetKanji.character,
    explanation: `「${targetKanji.character}」 means "${targetKanji.meaning}". Stroke count: ${targetKanji.stroke_count}. Reading: ${targetKanji.hiragana_reading}.`,
    audioTarget: targetKanji.character,
    mnemonicHint: targetKanji.mnemonic
  });

  // 2. Target Kanji - English Meaning Question
  const distKanji2 = getDistractorKanji(targetKanji.id, 3);
  const meaningOptions = shuffle([
    targetKanji.meaning,
    ...distKanji2.map(d => d.meaning)
  ]);

  questions.push({
    id: `ped_local_${Date.now()}_${questionCounter++}`,
    kanjiId: targetKanji.id,
    kanjiCharacter: targetKanji.character,
    category: 'english_meaning',
    categoryLabel: CATEGORY_META.english_meaning.label,
    difficulty: 'easy',
    prompt: `What is the English meaning of the Kanji 「${targetKanji.character}」?`,
    secondaryPrompt: `Primary definition in Lesson ${targetKanji.level}.`,
    options: meaningOptions.slice(0, 4),
    correctAnswer: targetKanji.meaning,
    explanation: `The character 「${targetKanji.character}」 primarily translates to "${targetKanji.meaning}". Mnemonic hint: ${targetKanji.mnemonic}`,
    audioTarget: targetKanji.character,
    mnemonicHint: targetKanji.mnemonic
  });

  // 3. Onyomi / Kunyomi Reading Question for Target Kanji
  const hasOnyomi = targetKanji.onyomi_readings.length > 0 && targetKanji.onyomi_readings[0] !== '-';
  const hasKunyomi = targetKanji.kunyomi_readings.length > 0 && targetKanji.kunyomi_readings[0] !== '-';

  if (hasKunyomi || hasOnyomi) {
    const isTestingKunyomi = hasKunyomi && (Math.random() > 0.5 || !hasOnyomi);
    const readingTypeLabel = isTestingKunyomi ? 'KUNYOMI (訓読み / native Japanese)' : 'ONYOMI (音読み / Chinese origin)';
    const correctReading = isTestingKunyomi
      ? targetKanji.kunyomi_readings.join(', ')
      : targetKanji.onyomi_readings.join(', ');

    // Collect distractor readings from lesson peers
    const distReadings: string[] = [];
    for (const peer of shuffle(peerKanji)) {
      const peerReading = isTestingKunyomi
        ? (peer.kunyomi_readings.length > 0 && peer.kunyomi_readings[0] !== '-' ? peer.kunyomi_readings.join(', ') : null)
        : (peer.onyomi_readings.length > 0 && peer.onyomi_readings[0] !== '-' ? peer.onyomi_readings.join(', ') : null);
      if (peerReading && peerReading !== correctReading && !distReadings.includes(peerReading)) {
        distReadings.push(peerReading);
      }
      if (distReadings.length >= 3) break;
    }

    // Fallback distractor readings if peers don't have enough
    const genericKunyomi = ['ひと', 'ひ', 'いち', 'みず', 'き', 'やま', 'ほん', 'こ'];
    const genericOnyomi = ['ジン, ニン', 'ニチ, ジツ', 'イチ', 'スイ', 'モク', 'サン', 'ホン', 'シ'];
    const fallbackPool = isTestingKunyomi ? genericKunyomi : genericOnyomi;
    for (const fb of fallbackPool) {
      if (distReadings.length >= 3) break;
      if (fb !== correctReading && !distReadings.includes(fb)) {
        distReadings.push(fb);
      }
    }

    const readingOptions = shuffle([correctReading, ...distReadings.slice(0, 3)]);

    questions.push({
      id: `ped_local_${Date.now()}_${questionCounter++}`,
      kanjiId: targetKanji.id,
      kanjiCharacter: targetKanji.character,
      category: 'onyomi_kunyomi',
      categoryLabel: CATEGORY_META.onyomi_kunyomi.label,
      difficulty: 'medium',
      prompt: `What is the correct ${readingTypeLabel} reading for 「${targetKanji.character}」 (${targetKanji.meaning})?`,
      secondaryPrompt: `Identify the accurate reading taught in Lesson ${targetKanji.level}.`,
      options: readingOptions.slice(0, 4),
      correctAnswer: correctReading,
      explanation: isTestingKunyomi
        ? `The Kunyomi reading for 「${targetKanji.character}」 is 「${correctReading}」. Onyomi is 「${targetKanji.onyomi_readings.join(', ') || 'N/A'}」.`
        : `The Onyomi reading for 「${targetKanji.character}」 is 「${correctReading}」. Kunyomi is 「${targetKanji.kunyomi_readings.join(', ') || 'N/A'}」.`,
      audioTarget: targetKanji.character,
      mnemonicHint: targetKanji.mnemonic
    });
  }

  // 4. Vocabulary Usage Question
  const targetVocab = targetKanji.vocabulary && targetKanji.vocabulary.length > 0
    ? targetKanji.vocabulary[0]
    : null;

  if (targetVocab && targetVocab.word.includes(targetKanji.character)) {
    // Blank out the target kanji character
    const blankedWord = targetVocab.word.replace(targetKanji.character, '___');
    const vocabDistractors = getDistractorKanji(targetKanji.id, 3).map(k => k.character);
    const vocabOptions = shuffle([targetKanji.character, ...vocabDistractors]);

    questions.push({
      id: `ped_local_${Date.now()}_${questionCounter++}`,
      kanjiId: targetKanji.id,
      kanjiCharacter: targetKanji.character,
      category: 'vocab_usage',
      categoryLabel: CATEGORY_META.vocab_usage.label,
      difficulty: 'medium',
      prompt: `Which Kanji completes the vocabulary compound: 「${blankedWord}」 (${targetVocab.hiragana})?`,
      secondaryPrompt: `English Meaning: "${targetVocab.meaning}" (${targetVocab.romaji}).`,
      options: vocabOptions.slice(0, 4),
      correctAnswer: targetKanji.character,
      explanation: `「${targetVocab.word}」 (${targetVocab.hiragana}) means "${targetVocab.meaning}". It is formed using 「${targetKanji.character}」 (${targetKanji.meaning}).`,
      audioTarget: targetVocab.word,
      mnemonicHint: targetKanji.mnemonic
    });
  }

  // 5. Sentence-Based Practical Application Question
  const targetSentence = targetKanji.example_sentences && targetKanji.example_sentences.length > 0
    ? targetKanji.example_sentences[0]
    : null;

  if (targetSentence && targetSentence.japanese.includes(targetKanji.character)) {
    const blankedSentence = targetSentence.japanese.replace(targetKanji.character, ' [ ___ ] ');
    const sentenceDistractors = getDistractorKanji(targetKanji.id, 3).map(k => k.character);
    const sentenceOptions = shuffle([targetKanji.character, ...sentenceDistractors]);

    questions.push({
      id: `ped_local_${Date.now()}_${questionCounter++}`,
      kanjiId: targetKanji.id,
      kanjiCharacter: targetKanji.character,
      category: 'sentence_based',
      categoryLabel: CATEGORY_META.sentence_based.label,
      difficulty: 'hard',
      prompt: `Fill in the blank with the appropriate Lesson ${targetKanji.level} Kanji:`,
      secondaryPrompt: `Context: "${targetSentence.english}" (${targetSentence.romaji})`,
      contextSentence: blankedSentence,
      options: sentenceOptions.slice(0, 4),
      correctAnswer: targetKanji.character,
      explanation: `Full sentence: 「${targetSentence.japanese}」. Meaning: "${targetSentence.english}". The blank requires 「${targetKanji.character}」 (${targetKanji.meaning}).`,
      audioTarget: targetSentence.japanese,
      mnemonicHint: targetKanji.mnemonic
    });
  }

  // 6. Additional questions drawn from Lesson Peers to test comprehensive Lesson Mastery
  for (const peer of shuffle(peerKanji)) {
    if (questions.length >= totalQuestions) break;

    // Alternate between Recognition, Meaning, and Vocabulary for peers
    const subType = questions.length % 3;

    if (subType === 0) {
      // Peer recognition
      const pDist = getDistractorKanji(peer.id, 3).map(k => k.character);
      const pOpts = shuffle([peer.character, ...pDist]);
      questions.push({
        id: `ped_local_${Date.now()}_${questionCounter++}`,
        kanjiId: peer.id,
        kanjiCharacter: peer.character,
        category: 'kanji_recognition',
        categoryLabel: CATEGORY_META.kanji_recognition.label,
        difficulty: 'medium',
        prompt: `Which Lesson ${peer.level} Kanji represents the meaning "${peer.meaning}"?`,
        secondaryPrompt: `Taught in the same lesson alongside 「${targetKanji.character}」.`,
        options: pOpts.slice(0, 4),
        correctAnswer: peer.character,
        explanation: `「${peer.character}」 means "${peer.meaning}". Reading: ${peer.hiragana_reading}. Stroke count: ${peer.stroke_count}.`,
        audioTarget: peer.character,
        mnemonicHint: peer.mnemonic
      });
    } else if (subType === 1) {
      // Peer reading
      const pOnyomi = peer.onyomi_readings.length > 0 && peer.onyomi_readings[0] !== '-' ? peer.onyomi_readings.join(', ') : null;
      const pKunyomi = peer.kunyomi_readings.length > 0 && peer.kunyomi_readings[0] !== '-' ? peer.kunyomi_readings.join(', ') : null;
      const testReading = pKunyomi || pOnyomi || peer.hiragana_reading;
      const isKun = Boolean(pKunyomi);

      const rDist: string[] = [];
      for (const other of shuffle(safeLessonKanji)) {
        if (other.id === peer.id) continue;
        const oReading = isKun
          ? (other.kunyomi_readings[0] !== '-' ? other.kunyomi_readings.join(', ') : other.hiragana_reading)
          : (other.onyomi_readings[0] !== '-' ? other.onyomi_readings.join(', ') : other.hiragana_reading);
        if (oReading && oReading !== testReading && !rDist.includes(oReading)) {
          rDist.push(oReading);
        }
        if (rDist.length >= 3) break;
      }
      while (rDist.length < 3) {
        rDist.push(`dummy_${rDist.length}`);
      }

      const rOpts = shuffle([testReading, ...rDist.slice(0, 3)]);
      questions.push({
        id: `ped_local_${Date.now()}_${questionCounter++}`,
        kanjiId: peer.id,
        kanjiCharacter: peer.character,
        category: 'onyomi_kunyomi',
        categoryLabel: CATEGORY_META.onyomi_kunyomi.label,
        difficulty: 'medium',
        prompt: `What is the primary ${isKun ? 'Kunyomi' : 'Onyomi'} reading for Lesson ${peer.level} Kanji 「${peer.character}」 (${peer.meaning})?`,
        secondaryPrompt: `Select the correct reading.`,
        options: rOpts.slice(0, 4),
        correctAnswer: testReading,
        explanation: `「${peer.character}」 (${peer.meaning}) reading is 「${testReading}」.`,
        audioTarget: peer.character,
        mnemonicHint: peer.mnemonic
      });
    } else {
      // Peer vocabulary or English meaning
      const pVocab = peer.vocabulary && peer.vocabulary.length > 0 ? peer.vocabulary[0] : null;
      if (pVocab && pVocab.word.includes(peer.character)) {
        const blanked = pVocab.word.replace(peer.character, '___');
        const vDist = getDistractorKanji(peer.id, 3).map(k => k.character);
        const vOpts = shuffle([peer.character, ...vDist]);
        questions.push({
          id: `ped_local_${Date.now()}_${questionCounter++}`,
          kanjiId: peer.id,
          kanjiCharacter: peer.character,
          category: 'vocab_usage',
          categoryLabel: CATEGORY_META.vocab_usage.label,
          difficulty: 'hard',
          prompt: `Which Kanji completes the word: 「${blanked}」 (${pVocab.hiragana} / "${pVocab.meaning}")?`,
          secondaryPrompt: `Context word from Lesson ${peer.level}.`,
          options: vOpts.slice(0, 4),
          correctAnswer: peer.character,
          explanation: `「${pVocab.word}」 (${pVocab.hiragana}) means "${pVocab.meaning}". It contains 「${peer.character}」 (${peer.meaning}).`,
          audioTarget: pVocab.word,
          mnemonicHint: peer.mnemonic
        });
      } else {
        const mDist = getDistractorKanji(peer.id, 3).map(k => k.meaning);
        const mOpts = shuffle([peer.meaning, ...mDist]);
        questions.push({
          id: `ped_local_${Date.now()}_${questionCounter++}`,
          kanjiId: peer.id,
          kanjiCharacter: peer.character,
          category: 'english_meaning',
          categoryLabel: CATEGORY_META.english_meaning.label,
          difficulty: 'easy',
          prompt: `What is the English meaning of 「${peer.character}」?`,
          secondaryPrompt: `Lesson ${peer.level} core definition.`,
          options: mOpts.slice(0, 4),
          correctAnswer: peer.meaning,
          explanation: `「${peer.character}」 translates to "${peer.meaning}". Mnemonic: ${peer.mnemonic}`,
          audioTarget: peer.character,
          mnemonicHint: peer.mnemonic
        });
      }
    }
  }

  return questions.slice(0, totalQuestions);
}

/**
 * Calculates detailed performance metrics, category breakdown, strengths,
 * weaknesses, and personalized review recommendations.
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
