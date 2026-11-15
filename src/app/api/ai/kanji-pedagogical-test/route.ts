import { NextResponse } from 'next/server';
import { callUnifiedAi, resolveEffectiveProvider, getAiLanguageInstructions } from '@/services/aiRouter';
import { ALL_120_KANJI } from '@/data/kanjiDatabase';
import {
  PedagogicalQuestion,
  generateLocalPedagogicalAssessment,
  CATEGORY_META,
  AssessmentDifficulty,
  PedagogicalCategory
} from '@/services/pedagogicalAssessmentService';

export const dynamic = 'force-dynamic';

function robustParseJson(raw: string): any {
  if (!raw || typeof raw !== 'string') return null;
  let text = raw.trim();

  // Strip markdown code fences
  if (text.startsWith('```')) {
    text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
  }

  // Find outer JSON object boundaries
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    text = text.substring(firstBrace, lastBrace + 1).trim();
  }

  try {
    return JSON.parse(text);
  } catch (initialErr) {
    // Clean trailing commas before closing braces
    const cleaned = text.replace(/,\s*([}\]])/g, '$1');
    try {
      return JSON.parse(cleaned);
    } catch {
      return null;
    }
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      kanjiId,
      level,
      count = 8,
      difficulty = 'medium',
      focusKanjiOnly = false,
      provider
    } = body;

    const requestedLevel = Number(level) || 1;
    const requestedCount = Math.min(15, Math.max(4, Number(count) || 8));
    const cleanDifficulty: AssessmentDifficulty =
      ['easy', 'medium', 'hard'].includes(difficulty) ? difficulty : 'medium';

    // 1. Retrieve the target kanji and all kanji for the current lesson/level
    const targetKanji = ALL_120_KANJI.find(k => k.id === Number(kanjiId)) || ALL_120_KANJI[0];
    const lessonKanji = ALL_120_KANJI.filter(k => k.level === (targetKanji ? targetKanji.level : requestedLevel));
    
    if (lessonKanji.length === 0) {
      return NextResponse.json({
        error: `No Kanji found for lesson level ${requestedLevel}.`
      }, { status: 400 });
    }

    const eligibleChars = new Set(lessonKanji.map(k => k.character));
    const effectiveProvider = resolveEffectiveProvider(provider);
    const langInstruction = getAiLanguageInstructions(effectiveProvider, 'exam');

    // 2. Prepare structured context for AI
    const promptContext = lessonKanji.map(k => ({
      id: k.id,
      character: k.character,
      meaning: k.meaning,
      onyomi: k.onyomi_readings,
      kunyomi: k.kunyomi_readings,
      stroke_count: k.stroke_count,
      vocabulary: (k.vocabulary || []).slice(0, 3).map(v => ({
        word: v.word,
        hiragana: v.hiragana,
        meaning: v.meaning
      })),
      example_sentences: (k.example_sentences || []).slice(0, 2).map(s => ({
        japanese: s.japanese,
        english: s.english
      }))
    }));

    const systemPrompt = `You are the Master JLPT N5 Kanji Pedagogical Assessment Architect.
Your task is to generate an interactive, educationally rigorous "Test My Knowledge" assessment for Lesson ${targetKanji.level}.

CRITICAL MANDATORY RULES:
1. STRICT LESSON RESTRICTION:
   You must ONLY generate questions, multiple-choice options, vocabulary, and context sentences using characters from the provided CURRENT LESSON KANJI POOL.
   DO NOT include any Kanji character outside this lesson pool! (Hiragana and Katakana are permitted for grammar, particles, and Okurigana).
2. TARGET FOCUS:
   Primary focus character: 「${targetKanji.character}」 (${targetKanji.meaning}).
   The assessment must evaluate retention and deep comprehension of 「${targetKanji.character}」 and its Lesson ${targetKanji.level} peers.
3. QUESTION DIVERSITY (Synthesize questions across these 5 categories):
   - "kanji_recognition": Identify correct character from meaning/shape description.
   - "onyomi_kunyomi": Discriminate Chinese-derived Onyomi vs native Japanese Kunyomi readings.
   - "english_meaning": Core English semantic definition recall.
   - "vocab_usage": Complete or analyze compound words (熟語) formed from this lesson's Kanji.
   - "sentence_based": Contextual Japanese sentence completion testing real-world application.
4. OPTIONS SPECIFICATION:
   - Exactly FOUR (4) distinct options.
   - Exactly ONE correct option.
   - THREE plausible distractors drawn STRICTLY from Lesson ${targetKanji.level} kanji or their verified readings.
5. ADAPTIVE DIFFICULTY:
   - Target tier: ${cleanDifficulty.toUpperCase()}.
   - Easy: Direct recognition, simple matching.
   - Medium: Reading discrimination, compound completion.
   - Hard: Contextual nuances, look-alike discrimination among lesson peers.
6. BRACKET FURIGANA:
   Annotate Japanese Kanji with bracket furigana: 漢字[かんじ].

${langInstruction}

OUTPUT SCHEMA (Return strictly JSON):
{
  "questions": [
    {
      "kanjiId": ${targetKanji.id},
      "kanjiCharacter": "${targetKanji.character}",
      "category": "kanji_recognition" | "onyomi_kunyomi" | "english_meaning" | "vocab_usage" | "sentence_based",
      "difficulty": "${cleanDifficulty}",
      "prompt": "Clear question prompt with bracket furigana where appropriate",
      "secondaryPrompt": "Instructive guidance for the student",
      "contextSentence": "Natural context sentence if applicable",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Exact matching string from options",
      "explanation": "Detailed pedagogical explanation breaking down readings, meanings, and why distractors are wrong",
      "audioTarget": "Japanese text to speak"
    }
  ]
}`;

    const userPrompt = `LESSON: Lesson ${targetKanji.level} Kanji Assessment
FOCUS KANJI: 「${targetKanji.character}」 (${targetKanji.meaning})
DIFFICULTY: ${cleanDifficulty.toUpperCase()}
QUESTION COUNT REQUESTED: ${requestedCount}

LESSON ${targetKanji.level} KANJI POOL (${lessonKanji.length} characters):
${JSON.stringify(promptContext, null, 2)}

Generate ${requestedCount} diverse pedagogical assessment questions adhering strictly to the above guidelines.`;

    const aiResult = await callUnifiedAi({
      provider: effectiveProvider,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.25,
      max_tokens: 3000,
      jsonMode: true,
      timeoutMs: 22000,
      allowFallback: false
    });

    const validatedQuestions: PedagogicalQuestion[] = [];
    const kanjiRegex = /[\u4E00-\u9FAF]/g;
    const hasUnlearnedKanji = (str?: string) => {
      if (!str) return false;
      const found = str.match(kanjiRegex);
      if (!found) return false;
      return found.some(char => !eligibleChars.has(char));
    };

    if (aiResult.success) {
      const parsed = robustParseJson(aiResult.content);
      const rawQuestions: any[] = parsed?.questions || [];

      for (const q of rawQuestions) {
        if (!q.prompt || !q.options || !Array.isArray(q.options) || q.options.length !== 4) continue;
        if (!q.correctAnswer || !q.options.includes(q.correctAnswer)) continue;

        // Ensure no out-of-lesson kanji exist in question, options, or prompts
        if (q.kanjiCharacter && !eligibleChars.has(q.kanjiCharacter)) continue;
        if (hasUnlearnedKanji(q.prompt)) continue;
        if (hasUnlearnedKanji(q.secondaryPrompt)) continue;
        if (hasUnlearnedKanji(q.contextSentence)) continue;
        if (q.options.some((opt: string) => hasUnlearnedKanji(opt))) continue;

        const validCat: PedagogicalCategory = [
          'kanji_recognition',
          'onyomi_kunyomi',
          'english_meaning',
          'vocab_usage',
          'sentence_based'
        ].includes(q.category) ? q.category : 'kanji_recognition';

        const matchedKanji = lessonKanji.find(k => k.character === q.kanjiCharacter) || targetKanji;

        validatedQuestions.push({
          id: `ped_ai_${Date.now()}_${validatedQuestions.length + 1}`,
          kanjiId: matchedKanji.id,
          kanjiCharacter: matchedKanji.character,
          category: validCat,
          categoryLabel: CATEGORY_META[validCat].label,
          difficulty: cleanDifficulty,
          prompt: q.prompt,
          secondaryPrompt: q.secondaryPrompt || `Lesson ${targetKanji.level} evaluation`,
          contextSentence: q.contextSentence,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation || `「${matchedKanji.character}」 (${matchedKanji.meaning})`,
          audioTarget: q.audioTarget || matchedKanji.character,
          mnemonicHint: matchedKanji.mnemonic
        });
      }
    }

    // 3. Fallback / Supplement: If AI generated fewer than requested, fill with deterministic local engine
    if (validatedQuestions.length < requestedCount) {
      const needed = requestedCount - validatedQuestions.length;
      const localFallback = generateLocalPedagogicalAssessment(
        targetKanji,
        lessonKanji,
        needed,
        cleanDifficulty
      );

      for (const lq of localFallback) {
        // avoid duplicate prompts
        if (!validatedQuestions.some(vq => vq.prompt === lq.prompt)) {
          validatedQuestions.push(lq);
        }
      }
    }

    const finalQuestions = validatedQuestions.slice(0, requestedCount);

    return NextResponse.json({
      success: true,
      questions: finalQuestions,
      lessonLevel: targetKanji.level,
      targetKanji: {
        id: targetKanji.id,
        character: targetKanji.character,
        meaning: targetKanji.meaning
      },
      source: aiResult.success ? aiResult.providerUsed : 'smart_pedagogical_engine',
      providerUsed: aiResult.providerUsed,
      difficulty: cleanDifficulty
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Server error during pedagogical assessment generation.'
    }, { status: 500 });
  }
}
