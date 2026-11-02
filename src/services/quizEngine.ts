import {
  KanjiRecord,
  QuizQuestion,
  QuizQuestionType
} from '../types/kanji';
import { storage } from './storage';
import { ALL_120_KANJI } from '../data/kanjiDatabase';

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getDistractors<T>(pool: T[], excludeItem: T, count: number): T[] {
  const eligible = pool.filter(item => item !== excludeItem);
  const shuffled = shuffle(eligible);
  return shuffled.slice(0, count);
}

// Extract all Japanese Kanji characters in a string
export function getKanjiCharactersInString(text: string): string[] {
  if (!text) return [];
  const matches = text.match(/[\u4E00-\u9FAF]/g);
  return matches ? Array.from(new Set(matches)) : [];
}

// Sanitize a sentence so that UNLEARNED KANJI NEVER APPEAR in questions
export function sanitizeSentencePrompt(
  sentence: { japanese: string; hiragana: string; english: string },
  targetCharacter: string,
  learnedChars: Set<string>
): string {
  const kanjiInSentence = getKanjiCharactersInString(sentence.japanese);
  const unlearnedPresent = kanjiInSentence.some(k => k !== targetCharacter && !learnedChars.has(k));

  if (unlearnedPresent) {
    // If the sentence contains unlearned kanji, use the all-kana hiragana version to prevent exposing unlearned kanji
    // and replace the target kanji's reading or placeholder with [ ? ]
    let kanaText = sentence.hiragana;
    // Replace target character if it appears or blank out
    if (kanaText.includes(targetCharacter)) {
      return kanaText.replace(new RegExp(targetCharacter, 'g'), '[ ? ]');
    }
    return `[ ? ] （${sentence.hiragana}）`;
  }

  // If all other kanji are already learned, blank out the target kanji safely
  return sentence.japanese.replace(new RegExp(targetCharacter, 'g'), '[ ? ]');
}

export class QuizEngine {
  getEligibleKanjiPool(): KanjiRecord[] {
    return storage.getLearnedKanjiPool();
  }

  /**
   * Generates a standard practice quiz strictly from the learned kanji pool.
   * Unlearned kanji NEVER appear in questions or distractors.
   */
  generateQuiz(type: QuizQuestionType, requestedCount: number = 10, customPool?: KanjiRecord[]): {
    questions: QuizQuestion[];
    error?: string;
  } {
    const pool = customPool && customPool.length > 0 ? customPool : this.getEligibleKanjiPool();

    if (pool.length === 0) {
      return {
        questions: [],
        error: 'You have not learned any kanji yet. Complete your first kanji lesson and pass its assessment to unlock test mode!'
      };
    }

    const questions: QuizQuestion[] = [];
    const shuffledPool = shuffle(pool);
    const count = Math.min(requestedCount, Math.max(shuffledPool.length * 2, requestedCount));

    for (let i = 0; i < count; i++) {
      const targetKanji = shuffledPool[i % shuffledPool.length];
      const q = this.createSingleQuestion(targetKanji, type, pool, `q_${Date.now()}_${i}`);
      if (q) {
        questions.push(q);
      }
    }

    return {
      questions: shuffle(questions).slice(0, requestedCount)
    };
  }

  /**
   * Generates a BRAND NEW dynamic Mastery Re-Test for a learned kanji.
   * Strictly enforces:
   * 1. Only kanji from the learned pool can be tested.
   * 2. Distractors are strictly pulled from the learned pool.
   * 3. Unlearned kanji NEVER appear in questions, distractors, or sentences.
   * 4. Questions are randomized and fresh on every execution.
   */
  generateKanjiReTest(
    targetKanji: KanjiRecord,
    customPool?: KanjiRecord[],
    requestedCount: number = 5
  ): QuizQuestion[] {
    // 1. Get learned pool from DB/storage
    let pool = customPool && customPool.length > 0 ? [...customPool] : this.getEligibleKanjiPool();

    // Ensure targetKanji is in the pool
    if (!pool.some(k => k.id === targetKanji.id)) {
      pool.push(targetKanji);
    }

    const learnedChars = new Set(pool.map(k => k.character));
    const questions: QuizQuestion[] = [];

    // Eligible question types for a rich re-test
    const availableTypes: QuizQuestionType[] = [
      'kanji_to_english',
      'english_to_kanji',
      'kanji_to_onyomi',
      'kanji_to_kunyomi',
      'hiragana_to_kanji',
      'vocab_recognition',
      'sentence_completion'
    ];

    const shuffledTypes = shuffle(availableTypes);

    // Question 1: Target kanji primary meaning or reading
    const q1 = this.createSingleQuestion(targetKanji, shuffledTypes[0], pool, `retest_${targetKanji.id}_${Date.now()}_0`);
    if (q1) questions.push(q1);

    // Question 2: Target kanji reading or reverse lookup
    const q2 = this.createSingleQuestion(targetKanji, shuffledTypes[1], pool, `retest_${targetKanji.id}_${Date.now()}_1`);
    if (q2) questions.push(q2);

    // Question 3: Target kanji vocabulary or sentence
    const contextType = Math.random() > 0.5 ? 'vocab_recognition' : 'sentence_completion';
    const q3 = this.createSingleQuestion(targetKanji, contextType, pool, `retest_${targetKanji.id}_${Date.now()}_2`);
    if (q3) questions.push(q3);

    // Remaining questions: Test against learned pool to test discrimination among learned kanji!
    const otherLearned = pool.filter(k => k.id !== targetKanji.id);
    const shuffledOther = shuffle(otherLearned);

    for (let i = 0; questions.length < requestedCount && i < 10; i++) {
      const kanjiForQ = shuffledOther.length > 0 ? shuffledOther[i % shuffledOther.length] : targetKanji;
      const typeForQ = shuffledTypes[(i + 2) % shuffledTypes.length];
      const q = this.createSingleQuestion(kanjiForQ, typeForQ, pool, `retest_${kanjiForQ.id}_${Date.now()}_${questions.length}`);
      if (q) questions.push(q);
    }

    return shuffle(questions).slice(0, requestedCount);
  }

  private createSingleQuestion(
    target: KanjiRecord,
    type: QuizQuestionType,
    pool: KanjiRecord[],
    id: string
  ): QuizQuestion | null {
    const learnedChars = new Set(pool.map(k => k.character));
    let actualType = type;

    if (type === 'timed_challenge') {
      const coreTypes: QuizQuestionType[] = [
        'kanji_to_english',
        'english_to_kanji',
        'kanji_to_onyomi',
        'kanji_to_kunyomi',
        'vocab_recognition',
        'sentence_completion'
      ];
      actualType = coreTypes[Math.floor(Math.random() * coreTypes.length)];
    }

    switch (actualType) {
      case 'kanji_to_english': {
        const correctAnswer = target.meaning;
        // Distractor meanings strictly from learned pool
        const distractorMeanings = getDistractors(pool.map(k => k.meaning), correctAnswer, 3);
        const options = shuffle([correctAnswer, ...distractorMeanings]);
        return {
          id,
          kanjiId: target.id,
          type: 'kanji_to_english',
          prompt: target.character,
          secondaryPrompt: 'What is the English meaning of this learned Kanji?',
          options,
          correctAnswer,
          explanation: `「${target.character}」 means "${target.meaning}". Onyomi: ${target.onyomi_readings.join(', ')} / Kunyomi: ${target.kunyomi_readings.join(', ')}.`,
          kanjiCharacter: target.character
        };
      }

      case 'english_to_kanji': {
        const correctAnswer = target.character;
        // Distractor kanji characters STRICTLY from learned pool - NEVER unlearned kanji!
        const distractorKanji = getDistractors(pool.map(k => k.character), correctAnswer, 3);
        const options = shuffle([correctAnswer, ...distractorKanji]);
        return {
          id,
          kanjiId: target.id,
          type: 'english_to_kanji',
          prompt: target.meaning,
          secondaryPrompt: 'Select the learned Kanji character for this meaning:',
          options,
          correctAnswer,
          explanation: `"${target.meaning}" is written as 「${target.character}」.`,
          kanjiCharacter: target.character
        };
      }

      case 'kanji_to_onyomi': {
        if (!target.onyomi_readings || target.onyomi_readings.length === 0) {
          return this.createSingleQuestion(target, 'kanji_to_english', pool, id);
        }
        const correctAnswer = target.onyomi_readings[0];
        const otherOnyomis = pool
          .filter(k => k.id !== target.id)
          .flatMap(k => k.onyomi_readings)
          .filter(o => o && o !== correctAnswer);
        const distractors = getDistractors(Array.from(new Set(otherOnyomis)), correctAnswer, 3);
        const options = shuffle([correctAnswer, ...distractors]);
        return {
          id,
          kanjiId: target.id,
          type: 'kanji_to_onyomi',
          prompt: target.character,
          secondaryPrompt: `What is the Onyomi (音読み) of 「${target.character}」?`,
          options,
          correctAnswer,
          explanation: `The Onyomi of 「${target.character}」 (${target.meaning}) is ${correctAnswer} (${target.onyomi_romaji[0] || ''}).`,
          kanjiCharacter: target.character
        };
      }

      case 'kanji_to_kunyomi': {
        if (!target.kunyomi_readings || target.kunyomi_readings.length === 0) {
          return this.createSingleQuestion(target, 'kanji_to_onyomi', pool, id);
        }
        const correctAnswer = target.kunyomi_readings[0];
        const otherKunyomis = pool
          .filter(k => k.id !== target.id)
          .flatMap(k => k.kunyomi_readings)
          .filter(u => u && u !== correctAnswer);
        const distractors = getDistractors(Array.from(new Set(otherKunyomis)), correctAnswer, 3);
        const options = shuffle([correctAnswer, ...distractors]);
        return {
          id,
          kanjiId: target.id,
          type: 'kanji_to_kunyomi',
          prompt: target.character,
          secondaryPrompt: `What is the Kunyomi (訓読み) of 「${target.character}」?`,
          options,
          correctAnswer,
          explanation: `The Kunyomi of 「${target.character}」 (${target.meaning}) is ${correctAnswer} (${target.kunyomi_romaji[0] || ''}).`,
          kanjiCharacter: target.character
        };
      }

      case 'hiragana_to_kanji': {
        const reading = target.kunyomi_readings[0] || target.hiragana_reading.split(',')[0].trim();
        const correctAnswer = target.character;
        // Distractor kanji characters STRICTLY from learned pool
        const distractorKanji = getDistractors(pool.map(k => k.character), correctAnswer, 3);
        const options = shuffle([correctAnswer, ...distractorKanji]);
        return {
          id,
          kanjiId: target.id,
          type: 'hiragana_to_kanji',
          prompt: reading,
          secondaryPrompt: `Which learned Kanji matches the reading "${reading}"?`,
          options,
          correctAnswer,
          explanation: `Reading 「${reading}」 corresponds to Kanji 「${target.character}」 (${target.meaning}).`,
          kanjiCharacter: target.character
        };
      }

      case 'vocab_recognition': {
        const vocabList = target.vocabulary;
        if (!vocabList || vocabList.length === 0) {
          return this.createSingleQuestion(target, 'kanji_to_english', pool, id);
        }

        // Strict Check: Only show kanji characters if ALL kanji in the word are already learned!
        const safeVocabs = vocabList.filter(v => {
          const kanjis = getKanjiCharactersInString(v.word);
          return kanjis.every(k => learnedChars.has(k));
        });

        if (safeVocabs.length > 0) {
          const targetVocab = safeVocabs[Math.floor(Math.random() * safeVocabs.length)];
          const correctAnswer = targetVocab.meaning;

          const allLearnedVocabMeanings = pool
            .filter(k => k.id !== target.id)
            .flatMap(k => k.vocabulary.map(v => v.meaning))
            .filter(m => m !== correctAnswer);
          const distractors = getDistractors(Array.from(new Set(allLearnedVocabMeanings)), correctAnswer, 3);
          const options = shuffle([correctAnswer, ...distractors]);
          return {
            id,
            kanjiId: target.id,
            type: 'vocab_recognition',
            prompt: `${targetVocab.word} (${targetVocab.hiragana})`,
            secondaryPrompt: `What is the meaning of this vocabulary word using learned kanji?`,
            options,
            correctAnswer,
            explanation: `「${targetVocab.word}」 (${targetVocab.hiragana} / ${targetVocab.romaji}) means "${targetVocab.meaning}". Uses learned kanji 「${target.character}」.`,
            kanjiCharacter: target.character
          };
        }

        // When no compound words consist strictly of learned kanji yet,
        // use phonetic kana + target kanji so ZERO unlearned kanji characters are shown!
        const targetVocab = vocabList[Math.floor(Math.random() * vocabList.length)];
        const correctAnswer = targetVocab.meaning;

        const allLearnedVocabMeanings = pool
          .filter(k => k.id !== target.id)
          .flatMap(k => k.vocabulary.map(v => v.meaning))
          .filter(m => m !== correctAnswer);
        const distractors = getDistractors(Array.from(new Set(allLearnedVocabMeanings)), correctAnswer, 3);
        const options = shuffle([correctAnswer, ...distractors]);
        return {
          id,
          kanjiId: target.id,
          type: 'vocab_recognition',
          prompt: `「${target.character}」: ${targetVocab.hiragana} (${targetVocab.romaji})`,
          secondaryPrompt: `What is the meaning of this reading for learned Kanji 「${target.character}」?`,
          options,
          correctAnswer,
          explanation: `Learned Kanji 「${target.character}」 read as "${targetVocab.hiragana}" means "${targetVocab.meaning}".`,
          kanjiCharacter: target.character
        };
      }

      case 'sentence_completion': {
        const sentences = target.example_sentences;
        if (!sentences || sentences.length === 0) {
          return this.createSingleQuestion(target, 'kanji_to_english', pool, id);
        }
        const sampleSentence = sentences[Math.floor(Math.random() * sentences.length)];
        
        // STRICT SANITIZATION: Never expose unlearned kanji in the prompt!
        const sanitizedPrompt = sanitizeSentencePrompt(sampleSentence, target.character, learnedChars);
        const correctAnswer = target.character;

        // Distractor kanji characters STRICTLY from learned pool - NEVER unlearned kanji!
        const distractorKanji = getDistractors(pool.map(k => k.character), correctAnswer, 3);
        const options = shuffle([correctAnswer, ...distractorKanji]);
        return {
          id,
          kanjiId: target.id,
          type: 'sentence_completion',
          prompt: sanitizedPrompt,
          secondaryPrompt: `Fill in the blank [ ? ] with the correct learned Kanji:`,
          contextSentence: sampleSentence.english,
          options,
          correctAnswer,
          explanation: `Sentence: "${sampleSentence.japanese}" (${sampleSentence.english}). Missing kanji is 「${target.character}」 (${target.meaning}).`,
          kanjiCharacter: target.character
        };
      }

      case 'kanji_recognition': {
        const correctAnswer = target.meaning;
        const distractorMeanings = getDistractors(pool.map(k => k.meaning), correctAnswer, 3);
        const options = shuffle([correctAnswer, ...distractorMeanings]);
        return {
          id,
          kanjiId: target.id,
          type: 'kanji_recognition',
          prompt: target.character,
          secondaryPrompt: 'Kanji Recognition: What does this character mean?',
          options,
          correctAnswer,
          explanation: `Kanji: 「${target.character}」 | Meaning: ${target.meaning} | Onyomi: ${target.onyomi_readings.join(', ')} | Kunyomi: ${target.kunyomi_readings.join(', ')}`,
          kanjiCharacter: target.character
        };
      }

      default:
        return this.createSingleQuestion(target, 'kanji_to_english', pool, id);
    }
  }

  /**
   * Initial 4-step assessment required to officially mark a newly studied Kanji as 'learned' (80% pass).
   * Distractors are carefully constrained so that UNLEARNED KANJI CHARACTERS ARE NEVER SHOWN AS OPTIONS.
   */
  generateKanjiAssessment(kanji: KanjiRecord, customPool?: KanjiRecord[]): QuizQuestion[] {
    const pool = customPool && customPool.length > 0 ? customPool : this.getEligibleKanjiPool();
    const questions: QuizQuestion[] = [];

    // Fallback meaning distractors bank (common English concepts, NOT kanji characters)
    const fallbackMeanings = ['Tree / Wood', 'Water', 'Fire', 'Sun / Day', 'Moon / Month', 'Mountain', 'River', 'Gold / Money', 'Earth / Soil', 'Person', 'Child', 'Woman', 'Man', 'Eye', 'Mouth'];
    const poolMeanings = pool.filter(k => k.id !== kanji.id).map(k => k.meaning);
    const meaningSource = poolMeanings.length >= 3 ? poolMeanings : Array.from(new Set([...poolMeanings, ...fallbackMeanings]));
    const meaningDistractors = getDistractors(meaningSource, kanji.meaning, 3);

    // 1. Meaning
    questions.push({
      id: `assess_meaning_${kanji.id}`,
      kanjiId: kanji.id,
      type: 'kanji_to_english',
      prompt: kanji.character,
      secondaryPrompt: `Assessment Step 1/4: What is the primary English meaning of 「${kanji.character}」?`,
      options: shuffle([kanji.meaning, ...meaningDistractors]),
      correctAnswer: kanji.meaning,
      explanation: `「${kanji.character}」 means "${kanji.meaning}".`,
      kanjiCharacter: kanji.character
    });

    // 2. Onyomi
    const onyomiAnswer = kanji.onyomi_readings[0] || 'None';
    const fallbackOnyomis = ['イチ', 'ニ', 'サン', 'シ', 'ゴ', 'ロク', 'シチ', 'ハチ', 'キュウ', 'ジュウ', 'ニチ', 'ゲツ', 'カ', 'スイ', 'モク', 'キン', 'ド'];
    const poolOnyomis = pool.filter(k => k.id !== kanji.id).flatMap(k => k.onyomi_readings);
    const onyomiSource = poolOnyomis.length >= 3 ? poolOnyomis : Array.from(new Set([...poolOnyomis, ...fallbackOnyomis]));
    const onyomiDistractors = getDistractors(onyomiSource, onyomiAnswer, 3);

    questions.push({
      id: `assess_onyomi_${kanji.id}`,
      kanjiId: kanji.id,
      type: 'kanji_to_onyomi',
      prompt: kanji.character,
      secondaryPrompt: `Assessment Step 2/4: Which is the correct Onyomi (音読み) in Katakana?`,
      options: shuffle([onyomiAnswer, ...onyomiDistractors]),
      correctAnswer: onyomiAnswer,
      explanation: `The Onyomi of 「${kanji.character}」 is ${onyomiAnswer} (${kanji.onyomi_romaji[0] || ''}).`,
      kanjiCharacter: kanji.character
    });

    // 3. Kunyomi
    const kunyomiAnswer = kanji.kunyomi_readings[0] || kanji.hiragana_reading.split(',')[0].trim();
    const fallbackKunyomis = ['ひと', 'ふた', 'み', 'よ', 'いつ', 'む', 'なな', 'や', 'ここの', 'とお', 'ひ', 'つき', 'ひ', 'みず', 'き', 'かね', 'つち'];
    const poolKunyomis = pool.filter(k => k.id !== kanji.id).flatMap(k => k.kunyomi_readings);
    const kunyomiSource = poolKunyomis.length >= 3 ? poolKunyomis : Array.from(new Set([...poolKunyomis, ...fallbackKunyomis]));
    const kunyomiDistractors = getDistractors(kunyomiSource, kunyomiAnswer, 3);

    questions.push({
      id: `assess_kunyomi_${kanji.id}`,
      kanjiId: kanji.id,
      type: 'kanji_to_kunyomi',
      prompt: kanji.character,
      secondaryPrompt: `Assessment Step 3/4: Which is the correct Kunyomi (訓読み) in Hiragana?`,
      options: shuffle([kunyomiAnswer, ...kunyomiDistractors]),
      correctAnswer: kunyomiAnswer,
      explanation: `The Kunyomi of 「${kanji.character}」 is ${kunyomiAnswer} (${kanji.kunyomi_romaji[0] || ''}).`,
      kanjiCharacter: kanji.character
    });

    // 4. Vocabulary
    const targetVocab = kanji.vocabulary[Math.floor(Math.random() * kanji.vocabulary.length)] || {
      word: kanji.character,
      meaning: kanji.meaning,
      hiragana: kanji.hiragana_reading
    };
    const fallbackVocabMeanings = ['One thing', 'Two people', 'Today', 'Sunday', 'Moon', 'Water', 'Fire', 'Mountain', 'River'];
    const poolVocabs = pool.filter(k => k.id !== kanji.id).flatMap(k => k.vocabulary.map(v => v.meaning));
    const vocabSource = poolVocabs.length >= 3 ? poolVocabs : Array.from(new Set([...poolVocabs, ...fallbackVocabMeanings]));
    const vocabDistractors = getDistractors(vocabSource, targetVocab.meaning, 3);

    questions.push({
      id: `assess_vocab_${kanji.id}`,
      kanjiId: kanji.id,
      type: 'vocab_recognition',
      prompt: `${targetVocab.word} (${targetVocab.hiragana})`,
      secondaryPrompt: `Assessment Step 4/4: What is the meaning of this vocabulary word using 「${kanji.character}」?`,
      options: shuffle([targetVocab.meaning, ...vocabDistractors]),
      correctAnswer: targetVocab.meaning,
      explanation: `「${targetVocab.word}」 (${targetVocab.hiragana}) means "${targetVocab.meaning}".`,
      kanjiCharacter: kanji.character
    });

    return questions;
  }
}

export const quizEngine = new QuizEngine();
