import { NextResponse } from 'next/server';
import { callUnifiedAi, resolveEffectiveProvider, getAiLanguageInstructions } from '@/services/aiRouter';
import { QuizEngine } from '@/services/quizEngine';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      eligibleKanjiPool,
      count = 5,
      testType = 'kanji_to_english',
      difficulty = 'medium',
      topic = 'All Learned Kanji',
      provider,
      pastQuestionFingerprints = []
    } = body;

    if (!eligibleKanjiPool || !Array.isArray(eligibleKanjiPool) || eligibleKanjiPool.length === 0) {
      return NextResponse.json({
        error: 'Eligible kanji pool is empty. Only learned kanji are permitted in test question generation.'
      }, { status: 400 });
    }

    const effectiveProvider = resolveEffectiveProvider(provider);
    const langInstruction = getAiLanguageInstructions(effectiveProvider, 'exam');

    const questionCount = Math.min(25, Math.max(3, Number(count) || 5));
    const cleanDifficulty: 'easy' | 'medium' | 'hard' =
      ['easy', 'medium', 'hard'].includes(difficulty) ? difficulty : 'medium';

    // Extract characters of eligible kanji to strictly validate against
    const eligibleChars = new Set(eligibleKanjiPool.map((k: any) => k.character));
    const eligibleIds = new Map(eligibleKanjiPool.map((k: any) => [k.character, k.id]));

    const promptContext = eligibleKanjiPool.map((k: any) => ({
      id: k.id,
      character: k.character,
      meaning: k.meaning,
      onyomi: k.onyomi_readings,
      kunyomi: k.kunyomi_readings,
      stroke_count: k.stroke_count,
      radicals: k.radicals
    }));

    // Define explicit pedagogical difficulty criteria
    const difficultyGuidelines = {
      easy: `DIFFICULTY: EASY (Fundamental Recall & Basic Knowledge)
- Target: Basic recognition and single-step identification.
- Focus: Ask for the direct English meaning, primary Onyomi / Kunyomi reading, or matching the standalone Kanji.
- Distractors: Pick 3 plausible but clearly distinct items from the pool. Do NOT use tricky look-alike characters or homophone traps.
- Context: Simple, straightforward questions suitable for absolute beginners.`,

      medium: `DIFFICULTY: MEDIUM (Application & Contextual Discrimination)
- Target: Practical application in context and compound words (熟語).
- Focus: Test Kanji in realistic Japanese sentences or multi-kanji words. Test discrimination between Onyomi vs Kunyomi in context.
- Distractors: Select 3 distractors from the pool that share similar grammatical categories, semantic domains, or related readings.
- Context: Include natural short context sentences or vocabulary compound examples.`,

      hard: `DIFFICULTY: HARD (Advanced Discernment & Multi-Step Reasoning)
- Target: Deep linguistic understanding, nuanced discrimination, and analytical problem-solving.
- STRICT RULE FOR HARD: DO NOT generate simple recall or trivia questions! Every question must require critical thinking.
- Focus Areas (Choose among these):
  1. Visually Look-Alike Kanji Discrimination: Contrast characters with similar radicals, shapes, or strokes from the pool (e.g., 日 vs 目 vs 白; 木 vs 本; 大 vs 犬; 土 vs 士; 右 vs 左; 力 vs 刀; 九 vs 丸).
  2. Homophone Traps: Test words or compounds that sound identical or share phonetic readings, requiring the student to analyze the sentence context to determine the correct character.
  3. Okurigana & Contextual Reading Exceptions: Test subtle Okurigana boundaries or irregular N5 readings (e.g. 今日[きょう], 一日[ついたち], 二十日[はつか], 一人[ひとり], 二人[ふたり]).
  4. Compound Word Analysis: Multi-kanji compounds where subtle differences in meaning or reading alter the entire sentence nuance.
- Distractors: High-quality, subtle near-misses that directly test common student confusions and pitfalls.
- Explanations: Must explicitly break down WHY the correct answer is right and WHY the distractors are wrong.`
    };

    const typeDescriptions: Record<string, string> = {
      kanji_to_english: 'Given a Kanji character or compound, select the exact English meaning.',
      english_to_kanji: 'Given an English meaning/scenario, select the correct Kanji character.',
      kanji_to_onyomi: 'Test the correct Chinese-derived Onyomi reading (in Katakana or Hiragana).',
      kanji_to_kunyomi: 'Test the correct native Japanese Kunyomi reading (in Hiragana).',
      hiragana_to_kanji: 'Given a sentence or word in Hiragana, select the correct Kanji.',
      vocab_recognition: 'Test vocabulary compound words (熟語) formed with the learned kanji.',
      sentence_completion: 'Fill in a blank (______ ) inside a complete Japanese sentence with the correct Kanji or reading.',
      timed_challenge: 'Rapid-fire question testing quick, accurate identification under pressure.',
      kanji_recognition: 'Discriminate the correct Kanji from visual or contextual description.'
    };

    const systemPrompt = `You are the Master Japanese Language Examination Authority for JLPT N5 Kanji Mastery.
Your objective is to synthesize authentic, high-quality, educationally rigorous test questions.

PEDAGOGICAL SPECIFICATIONS:
1. STRICT KANJI RESTRICTION:
   You must ONLY generate questions, options, and context sentences using characters from the provided ELIGIBLE KANJI POOL.
   CRITICAL: Never introduce ANY Kanji character outside this pool! (Standard Hiragana and Katakana are allowed for grammar and Okurigana).
2. DIFFICULTY ENFORCEMENT:
${difficultyGuidelines[cleanDifficulty]}
3. QUESTION FORMAT:
   Format: "${testType}" - ${typeDescriptions[testType] || 'Multiple-choice test question'}.
4. FURIGANA REQUIREMENT:
   Every Japanese Kanji in "prompt", "secondaryPrompt", "contextSentence", "options", and "correctAnswer" MUST be annotated with bracket furigana:
   Format: 漢字[かんじ]
   Examples:
   - "これ[これ]は 私[わたし]の 本[ほん]です。"
   - "日曜日[にちようび]に 行[い]きます。"
5. OPTIONS SPECIFICATION:
   Exactly FOUR (4) multiple-choice options.
   Exactly ONE completely correct option.
   The other THREE must be plausible, meaningful distractors drawn strictly from the learned pool.
6. DUPLICATE PREVENTION:
   Generate novel questions. Do not repeat prompts from the provided historical exclusion list.

${langInstruction}

OUTPUT SCHEMA (Return strictly JSON):
{
  "questions": [
    {
      "kanjiId": number,
      "kanjiCharacter": "single character from pool",
      "type": "${testType}",
      "difficulty": "${cleanDifficulty}",
      "prompt": "The primary question prompt with bracket furigana 漢字[かんじ]",
      "secondaryPrompt": "Clear instructions for the learner in English",
      "contextSentence": "Natural context sentence if applicable",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Exact string of correct option",
      "explanation": "Educational explanation breaking down reading, meaning, and why distractors are incorrect"
    }
  ]
}`;

    const exclusionList = Array.isArray(pastQuestionFingerprints) && pastQuestionFingerprints.length > 0
      ? `DO NOT generate questions similar or identical to these recent prompts:\n${JSON.stringify(pastQuestionFingerprints.slice(-15))}`
      : '';

    const userPrompt = `TOPIC: ${topic}
TARGET DIFFICULTY: ${cleanDifficulty.toUpperCase()}
QUESTION TYPE: ${testType}
COUNT REQUESTED: ${questionCount} questions

ELIGIBLE KANJI POOL (${eligibleKanjiPool.length} characters available):
${JSON.stringify(promptContext)}

${exclusionList}

Generate exactly ${questionCount} diverse, educationally rich, non-repetitive questions strictly adhering to ${cleanDifficulty.toUpperCase()} difficulty guidelines.`;

    const aiResult = await callUnifiedAi({
      provider: effectiveProvider,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: cleanDifficulty === 'hard' ? 0.35 : 0.2,
      max_tokens: 2400,
      jsonMode: true,
      timeoutMs: 25000,
      allowFallback: false
    });

    let validatedQuestions: any[] = [];
    const kanjiRegex = /[\u4E00-\u9FAF]/g;

    const hasUnlearnedKanji = (str: string) => {
      if (!str) return false;
      const found = str.match(kanjiRegex);
      if (!found) return false;
      return found.some(char => !eligibleChars.has(char));
    };

    if (aiResult.success) {
      try {
        const parsed = JSON.parse(aiResult.content);
        const rawQuestions: any[] = parsed.questions || [];

        const seenPrompts = new Set<string>();

        for (const q of rawQuestions) {
          if (!q.prompt || !q.options || !Array.isArray(q.options) || q.options.length !== 4) continue;
          if (!q.correctAnswer || !q.options.includes(q.correctAnswer)) continue;

          // Reject questions with unlearned Kanji in character, prompt, or options
          if (q.kanjiCharacter && !eligibleChars.has(q.kanjiCharacter)) continue;
          if (hasUnlearnedKanji(q.prompt)) continue;
          if (hasUnlearnedKanji(q.secondaryPrompt)) continue;
          if (hasUnlearnedKanji(q.contextSentence)) continue;
          if (q.options.some((opt: string) => hasUnlearnedKanji(opt))) continue;

          // Deduplicate within the batch
          const normalizedPrompt = q.prompt.replace(/\s+/g, '').toLowerCase();
          if (seenPrompts.has(normalizedPrompt)) continue;
          seenPrompts.add(normalizedPrompt);

          // Find or fallback kanjiId
          const matchedId = q.kanjiCharacter ? eligibleIds.get(q.kanjiCharacter) : undefined;
          const finalId = matchedId || q.kanjiId || eligibleKanjiPool[0].id;

          validatedQuestions.push({
            id: `ai_q_${Date.now()}_${validatedQuestions.length + 1}`,
            kanjiId: finalId,
            kanjiCharacter: q.kanjiCharacter || eligibleKanjiPool[0].character,
            type: q.type || testType,
            difficulty: cleanDifficulty,
            prompt: q.prompt,
            secondaryPrompt: q.secondaryPrompt || 'Select the correct answer',
            contextSentence: q.contextSentence,
            englishMeaning: q.englishMeaning,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation || 'Answer validated by N5 Kanji Master engine.'
          });
        }
      } catch (parseErr) {
        console.warn('[Generate Quiz] AI JSON Parse error, falling back to local engine:', parseErr);
      }
    }

    // If AI failed, timed out, or produced insufficient validated questions, fill remaining with local engine
    if (validatedQuestions.length < questionCount) {
      const localEngine = new QuizEngine();
      const needed = questionCount - validatedQuestions.length;
      const localResult = localEngine.generateQuiz(testType as any, needed, eligibleKanjiPool);

      for (const lq of localResult.questions) {
        validatedQuestions.push({
          ...lq,
          difficulty: cleanDifficulty
        });
      }
    }

    const finalQuestions = validatedQuestions.slice(0, questionCount);

    return NextResponse.json({
      success: true,
      questions: finalQuestions,
      source: aiResult.success ? aiResult.providerUsed : 'smart_local_engine',
      providerUsed: aiResult.providerUsed,
      modelUsed: aiResult.modelUsed,
      fallbackOccurred: aiResult.fallbackOccurred,
      difficulty: cleanDifficulty,
      topic
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Server error during dynamic quiz generation.'
    }, { status: 500 });
  }
}
