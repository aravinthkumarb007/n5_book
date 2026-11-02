import {
  CustomExamConfig,
  ExamAnswerLog,
  ExamQuestion,
  ExamResultRecord,
  MinnaGrammarPoint,
  MinnaLesson,
  MinnaPracticeExercise,
  MinnaQuestionType,
  MinnaVocabularyItem
} from '@/types/minna';
import { ALL_MINNA_LESSONS, getMinnaLesson } from '@/data/minnaNoNihongo';

// Shuffle helper
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ---------------------------------------------------------------------------
// Smart Local Test Generator
// ---------------------------------------------------------------------------

export function generateLocalExam(
  config: CustomExamConfig,
  extraVocab: MinnaVocabularyItem[] = [],
  extraGrammar: MinnaGrammarPoint[] = []
): ExamQuestion[] {
  // Collect lessons in range
  const targetLessons: MinnaLesson[] = ALL_MINNA_LESSONS.filter(l =>
    config.lessonRange.includes(l.lessonNumber)
  );

  // If no lessons selected, default to lesson 1
  const lessonsToUse = targetLessons.length > 0
    ? targetLessons
    : [ALL_MINNA_LESSONS[0]];

  // Aggregate pool of vocab, grammar, and pre-built exercises
  const vocabPool: MinnaVocabularyItem[] = [
    ...lessonsToUse.flatMap(l => l.vocabulary),
    ...extraVocab
  ];
  const grammarPool: MinnaGrammarPoint[] = [
    ...lessonsToUse.flatMap(l => l.grammar),
    ...extraGrammar
  ];
  const prebuiltExercises: MinnaPracticeExercise[] = lessonsToUse.flatMap(l => l.exercises);

  const allowedTypes: MinnaQuestionType[] = config.questionTypes.length > 0
    ? config.questionTypes
    : ['mcq', 'fill_blank', 'sentence_formation', 'translation_ja_en', 'translation_en_ja'];

  const generatedQuestions: ExamQuestion[] = [];
  const countNeeded = Math.max(3, Math.min(config.questionCount || 10, 30));

  // Helper to get random lesson number
  const getRandomLessonNum = () => {
    const l = lessonsToUse[Math.floor(Math.random() * lessonsToUse.length)];
    return l.lessonNumber;
  };

  // 1. First, pull from existing validated lesson exercises if matching type
  const matchingExercises = prebuiltExercises.filter(ex => allowedTypes.includes(ex.type));
  for (const ex of shuffle(matchingExercises)) {
    if (generatedQuestions.length >= countNeeded) break;
    generatedQuestions.push({
      id: `ex_${ex.id}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      lessonNumber: ex.lessonNumber,
      type: ex.type,
      category: ex.category,
      prompt: ex.prompt,
      contextText: ex.contextSentence,
      options: ex.options ? shuffle([...ex.options]) : undefined,
      wordTiles: ex.wordTiles ? shuffle([...ex.wordTiles]) : undefined,
      correctAnswer: ex.correctAnswer,
      explanation: ex.explanation
    });
  }

  // 2. Synthesize dynamic questions to reach target count
  let attempts = 0;
  while (generatedQuestions.length < countNeeded && attempts < 100) {
    attempts++;
    const chosenType = allowedTypes[Math.floor(Math.random() * allowedTypes.length)];

    switch (chosenType) {
      case 'mcq': {
        const q = generateMcqQuestion(vocabPool, grammarPool, getRandomLessonNum());
        if (q) generatedQuestions.push(q);
        break;
      }
      case 'fill_blank': {
        const q = generateFillBlankQuestion(vocabPool, grammarPool, getRandomLessonNum());
        if (q) generatedQuestions.push(q);
        break;
      }
      case 'sentence_formation': {
        const q = generateSentenceFormationQuestion(vocabPool, grammarPool, getRandomLessonNum());
        if (q) generatedQuestions.push(q);
        break;
      }
      case 'translation_ja_en': {
        const q = generateTranslationJaEnQuestion(vocabPool, grammarPool, getRandomLessonNum());
        if (q) generatedQuestions.push(q);
        break;
      }
      case 'translation_en_ja': {
        const q = generateTranslationEnJaQuestion(vocabPool, grammarPool, getRandomLessonNum());
        if (q) generatedQuestions.push(q);
        break;
      }
      case 'grammar_correction': {
        const q = generateGrammarCorrectionQuestion(grammarPool, getRandomLessonNum());
        if (q) generatedQuestions.push(q);
        break;
      }
      case 'matching': {
        const q = generateMatchingQuestion(vocabPool, getRandomLessonNum());
        if (q) generatedQuestions.push(q);
        break;
      }
      case 'reading': {
        const q = generateReadingQuestion(lessonsToUse);
        if (q) generatedQuestions.push(q);
        break;
      }
    }
  }

  return shuffle(generatedQuestions).slice(0, countNeeded);
}

// ---------------------------------------------------------------------------
// Dynamic Generators for Each Question Format
// ---------------------------------------------------------------------------

function generateMcqQuestion(
  vocabPool: MinnaVocabularyItem[],
  grammarPool: MinnaGrammarPoint[],
  lessonNum: number
): ExamQuestion | null {
  if (vocabPool.length < 4) return null;
  const target = vocabPool[Math.floor(Math.random() * vocabPool.length)];
  const distractors = shuffle(vocabPool.filter(v => v.id !== target.id)).slice(0, 3);
  if (distractors.length < 3) return null;

  const isKanjiPrompt = target.kanji && target.kanji !== target.hiragana && Math.random() > 0.5;

  if (isKanjiPrompt) {
    const options = shuffle([target.hiragana, ...distractors.map(d => d.hiragana)]);
    return {
      id: `mcq_reading_${target.id}_${Date.now()}`,
      lessonNumber: target.lessonNumber || lessonNum,
      type: 'mcq',
      category: 'vocabulary',
      prompt: `What is the correct reading of the word「${target.kanji}」?`,
      options,
      correctAnswer: target.hiragana,
      explanation: `「${target.kanji}」is read as「${target.hiragana}」(${target.romaji}) meaning "${target.english}".`,
      vocabId: target.id
    };
  } else {
    const options = shuffle([target.english, ...distractors.map(d => d.english)]);
    return {
      id: `mcq_meaning_${target.id}_${Date.now()}`,
      lessonNumber: target.lessonNumber || lessonNum,
      type: 'mcq',
      category: 'vocabulary',
      prompt: `What is the English meaning of「${target.kanji || target.hiragana}」(${target.romaji})?`,
      options,
      correctAnswer: target.english,
      explanation: `「${target.kanji || target.hiragana}」means "${target.english}".`,
      vocabId: target.id
    };
  }
}

function generateFillBlankQuestion(
  vocabPool: MinnaVocabularyItem[],
  grammarPool: MinnaGrammarPoint[],
  lessonNum: number
): ExamQuestion | null {
  // Look for grammar example sentence with particles
  const pointsWithExamples = grammarPool.filter(g => g.examples && g.examples.length > 0);
  if (pointsWithExamples.length === 0) return null;

  const targetPoint = pointsWithExamples[Math.floor(Math.random() * pointsWithExamples.length)];
  const eg = targetPoint.examples[Math.floor(Math.random() * targetPoint.examples.length)];

  // Common Japanese particles to test
  const particles = ['は', 'が', 'を', 'に', 'へ', 'で', 'と', 'から', 'まで', 'も'];
  for (const p of particles) {
    if (eg.japanese.includes(p)) {
      const blanked = eg.japanese.replace(p, '（　　）');
      const otherParticles = shuffle(particles.filter(item => item !== p)).slice(0, 3);
      const options = shuffle([p, ...otherParticles]);

      return {
        id: `fill_${targetPoint.id}_${Date.now()}`,
        lessonNumber: targetPoint.lessonNumber || lessonNum,
        type: 'fill_blank',
        category: 'grammar',
        prompt: 'Choose the correct particle to complete the sentence:',
        contextText: `${blanked}\nMeaning: "${eg.english}"`,
        options,
        correctAnswer: p,
        explanation: `Particle「${p}」is correct here according to the pattern: ${targetPoint.structure}.`,
        grammarPointId: targetPoint.id
      };
    }
  }

  return null;
}

function generateSentenceFormationQuestion(
  vocabPool: MinnaVocabularyItem[],
  grammarPool: MinnaGrammarPoint[],
  lessonNum: number
): ExamQuestion | null {
  const pointsWithExamples = grammarPool.filter(g => g.examples && g.examples.length > 0);
  if (pointsWithExamples.length === 0) return null;

  const point = pointsWithExamples[Math.floor(Math.random() * pointsWithExamples.length)];
  const eg = point.examples[Math.floor(Math.random() * point.examples.length)];

  // Split hiragana by spaces or particle boundaries
  let tiles = eg.hiragana.split(' ').map(s => s.trim().replace(/[。、]/g, '')).filter(Boolean);
  if (tiles.length < 3) {
    tiles = eg.japanese.split('').filter(c => !/[。、 ]/.test(c));
  }
  if (tiles.length < 3 || tiles.length > 8) return null;

  return {
    id: `tile_${point.id}_${Date.now()}`,
    lessonNumber: point.lessonNumber || lessonNum,
    type: 'sentence_formation',
    category: 'grammar',
    prompt: `Tap or arrange the word tiles to form the sentence meaning: "${eg.english}"`,
    wordTiles: shuffle([...tiles]),
    correctAnswer: tiles.join(' '),
    explanation: `The correct Japanese sentence is:「${eg.japanese}」(${eg.hiragana}).`,
    grammarPointId: point.id
  };
}

function generateTranslationJaEnQuestion(
  vocabPool: MinnaVocabularyItem[],
  grammarPool: MinnaGrammarPoint[],
  lessonNum: number
): ExamQuestion | null {
  const pointsWithExamples = grammarPool.filter(g => g.examples && g.examples.length > 0);
  if (pointsWithExamples.length < 2) return null;

  const targetPoint = pointsWithExamples[Math.floor(Math.random() * pointsWithExamples.length)];
  const eg = targetPoint.examples[Math.floor(Math.random() * targetPoint.examples.length)];

  const otherExamples = pointsWithExamples
    .flatMap(g => g.examples)
    .filter(e => e.english !== eg.english);

  if (otherExamples.length < 3) return null;
  const distractors = shuffle(otherExamples).slice(0, 3).map(e => e.english);
  const options = shuffle([eg.english, ...distractors]);

  return {
    id: `trans_ja_en_${Date.now()}`,
    lessonNumber: targetPoint.lessonNumber || lessonNum,
    type: 'translation_ja_en',
    category: 'grammar',
    prompt: 'Select the most accurate English translation for:',
    contextText: `「${eg.japanese}」\n(${eg.hiragana})`,
    options,
    correctAnswer: eg.english,
    explanation: `「${eg.japanese}」translates to: "${eg.english}". Grammar focus: ${targetPoint.title}.`,
    grammarPointId: targetPoint.id
  };
}

function generateTranslationEnJaQuestion(
  vocabPool: MinnaVocabularyItem[],
  grammarPool: MinnaGrammarPoint[],
  lessonNum: number
): ExamQuestion | null {
  const pointsWithExamples = grammarPool.filter(g => g.examples && g.examples.length > 0);
  if (pointsWithExamples.length < 2) return null;

  const targetPoint = pointsWithExamples[Math.floor(Math.random() * pointsWithExamples.length)];
  const eg = targetPoint.examples[Math.floor(Math.random() * targetPoint.examples.length)];

  const otherExamples = pointsWithExamples
    .flatMap(g => g.examples)
    .filter(e => e.japanese !== eg.japanese);

  if (otherExamples.length < 3) return null;
  const distractors = shuffle(otherExamples).slice(0, 3).map(e => e.japanese);
  const options = shuffle([eg.japanese, ...distractors]);

  return {
    id: `trans_en_ja_${Date.now()}`,
    lessonNumber: targetPoint.lessonNumber || lessonNum,
    type: 'translation_en_ja',
    category: 'grammar',
    prompt: `Translate into Japanese: "${eg.english}"`,
    options,
    correctAnswer: eg.japanese,
    explanation: `The accurate Japanese expression is:「${eg.japanese}」(${eg.romaji}).`,
    grammarPointId: targetPoint.id
  };
}

function generateGrammarCorrectionQuestion(
  grammarPool: MinnaGrammarPoint[],
  lessonNum: number
): ExamQuestion | null {
  const pointsWithMistakes = grammarPool.filter(g => g.commonMistakes && g.commonMistakes.length > 0);
  if (pointsWithMistakes.length === 0) return null;

  const point = pointsWithMistakes[Math.floor(Math.random() * pointsWithMistakes.length)];
  const mistakeNote = point.commonMistakes![0];

  return {
    id: `correct_${point.id}_${Date.now()}`,
    lessonNumber: point.lessonNumber || lessonNum,
    type: 'grammar_correction',
    category: 'grammar',
    prompt: `Review the rule for「${point.title}」: Which of the following statements explains the key grammatical rule?`,
    options: shuffle([
      mistakeNote,
      'Verbs in this pattern must always end in past negative form.',
      'Particles は and が can never be used in any circumstances.',
      'The adjective always precedes without any conjugation.'
    ]),
    correctAnswer: mistakeNote,
    explanation: `Grammar Rule: ${point.explanation}`,
    grammarPointId: point.id
  };
}

function generateMatchingQuestion(
  vocabPool: MinnaVocabularyItem[],
  lessonNum: number
): ExamQuestion | null {
  if (vocabPool.length < 4) return null;
  const selected = shuffle(vocabPool).slice(0, 4);

  const pairs = selected.map(v => ({
    left: v.kanji || v.hiragana,
    right: v.english
  }));

  const correctJoined = pairs.map(p => `${p.left} = ${p.right}`).join('; ');
  const distractor1 = shuffle([...pairs]).map((p, i, arr) => `${p.left} = ${arr[(i + 1) % arr.length].right}`).join('; ');
  const distractor2 = shuffle([...pairs]).map((p, i, arr) => `${p.left} = ${arr[(i + 2) % arr.length].right}`).join('; ');

  return {
    id: `match_${Date.now()}`,
    lessonNumber: lessonNum,
    type: 'matching',
    category: 'vocabulary',
    prompt: 'Match the Japanese words with their corresponding English definitions:',
    matchingPairs: pairs,
    options: shuffle([correctJoined, distractor1, distractor2]),
    correctAnswer: correctJoined,
    explanation: `Correct matches: ${correctJoined}`
  };
}

function generateReadingQuestion(lessons: MinnaLesson[]): ExamQuestion | null {
  const lessonsWithDialogue = lessons.filter(l => l.dialogue && l.dialogue.lines.length >= 2);
  if (lessonsWithDialogue.length === 0) return null;

  const lesson = lessonsWithDialogue[Math.floor(Math.random() * lessonsWithDialogue.length)];
  const dialogue = lesson.dialogue!;

  const contextText = dialogue.lines.map(l => `${l.speaker}：${l.japanese}`).join('\n');
  const firstLine = dialogue.lines[0];

  return {
    id: `reading_${lesson.id}_${Date.now()}`,
    lessonNumber: lesson.lessonNumber,
    type: 'reading',
    category: 'reading',
    prompt: `Read the conversation excerpt from ${dialogue.title} and answer: What did ${firstLine.speaker} ask or say?`,
    contextText: `【状況：${dialogue.situation}】\n\n${contextText}`,
    options: shuffle([
      firstLine.english,
      'They discussed traveling to Hokkaido next winter.',
      'They decided not to go to work today due to illness.',
      'They asked to borrow a car to go to the supermarket.'
    ]),
    correctAnswer: firstLine.english,
    explanation: `${firstLine.speaker} said: "${firstLine.english}" (${firstLine.japanese}).`
  };
}

// ---------------------------------------------------------------------------
// Diagnostic Evaluator & Feedback Generator
// ---------------------------------------------------------------------------

export function evaluateExamResults(
  examTitle: string,
  lessonNumbers: number[],
  answers: ExamAnswerLog[],
  timeSpentSeconds: number
): ExamResultRecord {
  const totalQuestions = answers.length;
  const correctCount = answers.filter(a => a.isCorrect).length;
  const scorePercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Identify weak lessons
  const lessonStats = new Map<number, { total: number; incorrect: number }>();
  for (const a of answers) {
    const stat = lessonStats.get(a.lessonNumber) || { total: 0, incorrect: 0 };
    stat.total++;
    if (!a.isCorrect) stat.incorrect++;
    lessonStats.set(a.lessonNumber, stat);
  }

  const weakLessons: number[] = [];
  lessonStats.forEach((stat, lNum) => {
    if (stat.incorrect > 0 && stat.incorrect / stat.total >= 0.4) {
      weakLessons.push(lNum);
    }
  });

  // Identify weak vocab and grammar
  const weakVocab: string[] = [];
  const weakGrammarTopics: string[] = [];

  for (const a of answers.filter(ans => !ans.isCorrect)) {
    if (a.category === 'vocabulary' && !weakVocab.includes(a.prompt)) {
      weakVocab.push(a.prompt.slice(0, 45));
    }
    if (a.category === 'grammar' && !weakGrammarTopics.includes(a.prompt)) {
      weakGrammarTopics.push(a.prompt.slice(0, 45));
    }
  }

  // Diagnostic strengths and recommendations
  const strengths: string[] = [];
  const areasToImprove: string[] = [];
  const recommendations: string[] = [];

  if (scorePercent >= 80) {
    strengths.push('Excellent mastery of Japanese sentence structures and vocabulary.');
    strengths.push('Strong reading comprehension and prompt understanding.');
  } else if (scorePercent >= 60) {
    strengths.push('Good foundational understanding of standard N5 patterns.');
  } else {
    strengths.push('Active learning engagement — reviewing mistakes will rapidly boost recall.');
  }

  if (weakGrammarTopics.length > 0) {
    areasToImprove.push(`Conjugation and particle usage in ${weakGrammarTopics.length} questions.`);
    recommendations.push('Review the grammar rules and sentence formulas in the Lesson Grammar tab.');
  }
  if (weakVocab.length > 0) {
    areasToImprove.push(`Vocabulary recall for ${weakVocab.length} words.`);
    recommendations.push('Practice daily with the Vocabulary cards and audio pronunciation.');
  }
  if (weakLessons.length > 0) {
    recommendations.push(`Re-take targeted quizzes for Lessons ${weakLessons.join(', ')}.`);
  }

  const summary = scorePercent >= 80
    ? `Outstanding performance! You achieved ${scorePercent}% on ${examTitle}.`
    : scorePercent >= 60
    ? `Solid effort! You scored ${scorePercent}%. Focus on your weak points to reach 80%+ mastery.`
    : `Keep practicing! You scored ${scorePercent}%. Review the recommended lessons and try again.`;

  return {
    id: `exam_res_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    examTitle,
    date: new Date().toISOString(),
    totalQuestions,
    correctCount,
    scorePercent,
    timeSpentSeconds,
    lessonNumbers,
    answers,
    weakLessons,
    weakGrammarTopics: weakGrammarTopics.slice(0, 5),
    weakVocab: weakVocab.slice(0, 5),
    aiDiagnostic: {
      summary,
      strengths,
      areasToImprove: areasToImprove.length > 0 ? areasToImprove : ['No critical weak areas detected!'],
      recommendations: recommendations.length > 0 ? recommendations : ['Proceed to the next advanced lesson!']
    }
  };
}
