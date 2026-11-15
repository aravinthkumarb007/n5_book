import { NextResponse } from 'next/server';
import { callUnifiedAi, resolveEffectiveProvider, getAiLanguageInstructions } from '@/services/aiRouter';
import { ALL_120_KANJI } from '@/data/kanjiDatabase';
import {
  PedagogicalQuestion,
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
  } catch {
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
      provider
    } = body;

    const requestedLevel = Number(level) || 1;
    const requestedCount = Math.min(15, Math.max(4, Number(count) || 8));
    const cleanDifficulty: AssessmentDifficulty =
      ['easy', 'medium', 'hard'].includes(difficulty) ? difficulty : 'medium';

    // 1. Retrieve the currently selected kanji and all kanji for this lesson
    const selectedKanji = ALL_120_KANJI.find(k => k.id === Number(kanjiId)) || ALL_120_KANJI[0];
    const lessonLevel = selectedKanji ? selectedKanji.level : requestedLevel;
    const allLessonKanji = ALL_120_KANJI.filter(k => k.level === lessonLevel);

    if (allLessonKanji.length === 0) {
      return NextResponse.json({
        success: false,
        error: `No Kanji found for lesson level ${lessonLevel}.`
      }, { status: 400 });
    }

    // 2. STRICT RULE: EXCLUDE the currently selected Kanji from question generation!
    // All questions must test the OTHER Kanji taught in this lesson.
    const testableLessonKanji = allLessonKanji.filter(
      k => k.id !== selectedKanji.id && k.character !== selectedKanji.character
    );

    if (testableLessonKanji.length === 0) {
      return NextResponse.json({
        success: false,
        error: `Lesson ${lessonLevel} must contain peer Kanji to generate peer assessment.`
      }, { status: 400 });
    }

    const testableChars = new Set(testableLessonKanji.map(k => k.character));
    const allLessonChars = new Set(allLessonKanji.map(k => k.character));
    const effectiveProvider = resolveEffectiveProvider(provider);
    const langInstruction = getAiLanguageInstructions(effectiveProvider, 'exam');

    // 3. Prepare structured context for AI (providing detailed data for testable lesson peer kanji)
    const testableContext = testableLessonKanji.map(k => ({
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

    const systemPrompt = `You are the Master JLPT N5 Japanese Examination Authority.
Your sole mission is to dynamically synthesize an authentic, high-quality, 100% AI-generated interactive Kanji assessment for Lesson ${lessonLevel}.

STRICT MANDATORY CONSTRAINTS:
1. ABSOLUTE EXCLUSION OF CURRENTLY SELECTED KANJI:
   The student is currently viewing and studying: 「${selectedKanji.character}」 (${selectedKanji.meaning}).
   CRITICAL PROHIBITION: DO NOT generate any question testing 「${selectedKanji.character}」!
   - NO question prompt should ask about 「${selectedKanji.character}」.
   - NO correct answer may be 「${selectedKanji.character}」.
   - All questions MUST evaluate the student's retention of the OTHER Kanji covered in Lesson ${lessonLevel}: [${testableLessonKanji.map(k => k.character).join(', ')}].

2. STRICT LESSON BOUNDARY:
   Only use Kanji characters from Lesson ${lessonLevel} (the testable pool).
   CRITICAL: Never introduce ANY Kanji character from other lessons or levels! (Standard Hiragana and Katakana are permitted for grammar and Okurigana).

3. QUESTION CATEGORIES (Distribute questions across these 5 categories):
   - "kanji_recognition": Identify correct character given its meaning, components, or stroke characteristics.
   - "onyomi_kunyomi": Discriminate Chinese-derived Onyomi vs native Japanese Kunyomi readings in context.
   - "english_meaning": Core English definition and semantic understanding.
   - "vocab_usage": Complete or analyze compound words (熟語) formed from Lesson ${lessonLevel} Kanji.
   - "sentence_based": Contextual Japanese sentence completion testing real-world practical application.

4. MULTIPLE-CHOICE FORMAT:
   - Exactly FOUR (4) distinct options.
   - Exactly ONE correct option.
   - THREE plausible distractors drawn strictly from Lesson ${lessonLevel} Kanji and their verified readings.

5. ADAPTIVE DIFFICULTY TARGET: ${cleanDifficulty.toUpperCase()}
   - Easy: Direct recognition, simple matching.
   - Medium: Reading discrimination, compound completion.
   - Hard: Contextual nuances, look-alike discrimination among lesson peers.

6. BRACKET FURIGANA:
   Annotate all Japanese Kanji with bracket furigana: 漢字[かんじ].

${langInstruction}

OUTPUT SCHEMA (Return strictly JSON):
{
  "questions": [
    {
      "kanjiId": number (must be an ID from the testable peer kanji list, NEVER ${selectedKanji.id}),
      "kanjiCharacter": "single character from testable peer kanji list, NEVER ${selectedKanji.character}",
      "category": "kanji_recognition" | "onyomi_kunyomi" | "english_meaning" | "vocab_usage" | "sentence_based",
      "difficulty": "${cleanDifficulty}",
      "prompt": "Clear question prompt with bracket furigana where appropriate",
      "secondaryPrompt": "Instructive guidance for the student in English",
      "contextSentence": "Natural context sentence if applicable",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Exact matching string from options",
      "explanation": "Detailed pedagogical explanation breaking down readings, meanings, and why distractors are wrong",
      "audioTarget": "Japanese text to speak"
    }
  ]
}`;

    const userPrompt = `LESSON: Lesson ${lessonLevel} Kanji Knowledge Assessment
CURRENTLY STUDIED KANJI TO EXCLUDE: 「${selectedKanji.character}」 (${selectedKanji.meaning}) - DO NOT generate questions on this character!

TESTABLE LESSON ${lessonLevel} PEER KANJI (${testableLessonKanji.length} characters):
${JSON.stringify(testableContext, null, 2)}

DIFFICULTY: ${cleanDifficulty.toUpperCase()}
QUESTIONS REQUESTED: ${requestedCount} questions

Generate exactly ${requestedCount} pure AI-powered questions testing ONLY the above peer Kanji, strictly excluding 「${selectedKanji.character}」.`;

    // Pure AI call - no hardcoded questions allowed
    const aiResult = await callUnifiedAi({
      provider: effectiveProvider,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.25,
      max_tokens: 3500,
      jsonMode: true,
      timeoutMs: 30000,
      allowFallback: true
    });

    if (!aiResult.success) {
      return NextResponse.json({
        success: false,
        error: aiResult.error || 'AI generation unavailable. Please ensure Groq or Gemini API key is configured in Settings.'
      }, { status: 502 });
    }

    const parsed = robustParseJson(aiResult.content);
    const rawQuestions: any[] = parsed?.questions || [];

    if (!Array.isArray(rawQuestions) || rawQuestions.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'AI response was not formatted as valid questions. Please try again.'
      }, { status: 502 });
    }

    const validatedQuestions: PedagogicalQuestion[] = [];
    const kanjiRegex = /[\u4E00-\u9FAF]/g;
    const hasUnlearnedKanji = (str?: string) => {
      if (!str) return false;
      const found = str.match(kanjiRegex);
      if (!found) return false;
      return found.some(char => !allLessonChars.has(char));
    };

    for (const q of rawQuestions) {
      if (!q.prompt || !q.options || !Array.isArray(q.options) || q.options.length !== 4) continue;
      if (!q.correctAnswer || !q.options.includes(q.correctAnswer)) continue;

      // STRICT CHECK: Reject any question testing the currently selected Kanji!
      if (q.kanjiCharacter === selectedKanji.character || q.kanjiId === selectedKanji.id) continue;
      if (q.correctAnswer === selectedKanji.character) continue;
      if (typeof q.prompt === 'string' && q.prompt.includes(`「${selectedKanji.character}」`)) continue;

      // Reject questions containing Kanji outside this lesson
      if (q.kanjiCharacter && !testableChars.has(q.kanjiCharacter)) continue;
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

      const matchedPeer = testableLessonKanji.find(k => k.character === q.kanjiCharacter) ||
        testableLessonKanji.find(k => k.id === q.kanjiId) ||
        testableLessonKanji[validatedQuestions.length % testableLessonKanji.length];

      validatedQuestions.push({
        id: `ai_ped_${Date.now()}_${validatedQuestions.length + 1}`,
        kanjiId: matchedPeer.id,
        kanjiCharacter: matchedPeer.character,
        category: validCat,
        categoryLabel: CATEGORY_META[validCat].label,
        difficulty: cleanDifficulty,
        prompt: q.prompt,
        secondaryPrompt: q.secondaryPrompt || `Lesson ${lessonLevel} Peer Evaluation`,
        contextSentence: q.contextSentence,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation || `「${matchedPeer.character}」 (${matchedPeer.meaning})`,
        audioTarget: q.audioTarget || matchedPeer.character,
        mnemonicHint: matchedPeer.mnemonic
      });
    }

    if (validatedQuestions.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'AI did not return valid peer questions for this lesson. Please click retry.'
      }, { status: 502 });
    }

    return NextResponse.json({
      success: true,
      questions: validatedQuestions,
      lessonLevel,
      selectedKanji: {
        id: selectedKanji.id,
        character: selectedKanji.character,
        meaning: selectedKanji.meaning
      },
      testablePeerKanji: testableLessonKanji.map(k => ({ id: k.id, character: k.character, meaning: k.meaning })),
      source: 'pure_ai',
      providerUsed: aiResult.providerUsed,
      modelUsed: aiResult.modelUsed,
      difficulty: cleanDifficulty
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Server error during AI assessment generation.'
    }, { status: 500 });
  }
}
