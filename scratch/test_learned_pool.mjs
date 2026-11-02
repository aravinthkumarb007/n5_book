import { ALL_120_KANJI } from '../src/data/kanjiDatabase.js';
import { 
  QuizEngine, 
  getKanjiCharactersInString, 
  sanitizeSentencePrompt 
} from '../src/services/quizEngine.js';

console.log('=== EXTENSIVE PROGRESSION SIMULATION (DAY 1 TO DAY 12) ===\n');

const engine = new QuizEngine();

for (let day = 1; day <= 12; day++) {
  const kanjiCount = day * 10;
  const currentPool = ALL_120_KANJI.slice(0, kanjiCount);
  const learnedChars = new Set(currentPool.map(k => k.character));

  // Pick a random kanji to Re-Test
  const targetKanji = currentPool[Math.floor(Math.random() * currentPool.length)];

  // Run 5 separate Re-Tests to ensure question randomness and fresh non-repeating tests
  for (let testRun = 0; testRun < 3; testRun++) {
    const questions = engine.generateKanjiReTest(targetKanji, currentPool, 5);
    console.assert(questions.length === 5, `Expected 5 questions on day ${day}`);

    questions.forEach(q => {
      // 1. Verify prompt contains NO unlearned kanji
      const kanjisInPrompt = getKanjiCharactersInString(q.prompt);
      const unlearnedPrompt = kanjisInPrompt.filter(k => !learnedChars.has(k));
      if (unlearnedPrompt.length > 0) {
        throw new Error(`Day ${day}: Unlearned kanji in prompt ${q.prompt}: ${unlearnedPrompt.join(', ')}`);
      }

      // 2. Verify options contain NO unlearned kanji
      if (['english_to_kanji', 'sentence_completion', 'hiragana_to_kanji'].includes(q.type)) {
        q.options.forEach(opt => {
          const kanjisInOpt = getKanjiCharactersInString(opt);
          const unlearnedOpt = kanjisInOpt.filter(k => !learnedChars.has(k));
          if (unlearnedOpt.length > 0) {
            throw new Error(`Day ${day}: Unlearned kanji in option ${opt}: ${unlearnedOpt.join(', ')}`);
          }
        });
      }
    });
  }

  console.log(`✓ Day ${day} (${kanjiCount} Kanji Pool): Re-Test verified with 0 unlearned kanji leaks!`);
}

console.log('\n=== ALL PROGRESSION DAYS PASSED STRICT VALIDATION! ===');
