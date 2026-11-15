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

// Convert out-of-lesson kanji in sentences to Hiragana for beginner N5 accessibility
const COMMON_KANJI_TO_HIRAGANA: Record<string, string> = {
  '私': 'わたし', '本': 'ほん', '時': 'じ', '月': 'つき', '会': 'かい',
  '社': 'しゃ', '校': 'こう', '学': 'がく', '生': 'せい', '先': 'せん',
  '行': 'い', '来': 'き', '見': 'み', '食': 'た', '飲': 'の',
  '買': 'か', '書': 'か', '読': 'よ', '話': 'はな', '聞': 'き'
};

function sanitizeContextText(text: string, allowedChars: Set<string>): string {
  if (!text) return '';

  // 1. Convert bracket furigana for unlearned kanji: 漢字[かんじ] -> かんじ
  let result = text.replace(/([\u4E00-\u9FAF]+)\[([^\]]+)\]/g, (match, kanjiPart, reading) => {
    const isAllowed = Array.from(kanjiPart).every((c: any) => allowedChars.has(c));
    return isAllowed ? match : reading;
  });

  // 2. Convert common unlearned standalone kanji to Hiragana
  result = result.replace(/[\u4E00-\u9FAF]/g, (char) => {
    if (allowedChars.has(char)) return char;
    return COMMON_KANJI_TO_HIRAGANA[char] || char;
  });

  return result;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      kanjiId,
      level,
      count = 5,
      difficulty = 'medium',
      provider
    } = body;

    const requestedLevel = Number(level) || 1;
    // Cap at 6 to ensure smooth single-batch completion within Groq token limits
    const requestedCount = Math.min(6, Math.max(3, Number(count) || 5));
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
    // All questions must evaluate the OTHER Kanji taught in this lesson.
    const testableLessonKanji = allLessonKanji.filter(
      k => k.id !== selectedKanji.id && k.character !== selectedKanji.character
    );

    if (testableLessonKanji.length === 0) {
      return NextResponse.json({
        success: false,
        error: `Lesson ${lessonLevel} must contain peer Kanji to generate peer assessment.`
      }, { status: 400 });
    }

    const allLessonChars = new Set(allLessonKanji.map(k => k.character));
    const effectiveProvider = resolveEffectiveProvider(provider);
    const langInstruction = getAiLanguageInstructions(effectiveProvider, 'exam');

    // 3. Prepare structured context for AI
    const testableContext = testableLessonKanji.map(k => ({
      id: k.id,
      char: k.character,
      meaning: k.meaning,
      on: k.onyomi_readings,
      kun: k.kunyomi_readings
    }));

    const systemPrompt = `You are a Master JLPT N5 Examination Authority.
Generate ${requestedCount} AI-powered assessment questions for Lesson ${lessonLevel} peer Kanji: [${testableLessonKanji.map(k => k.character).join(', ')}].

CRITICAL MANDATORY RULES:
1. STRICT EXCLUSION: The student is currently studying 「${selectedKanji.character}」 (${selectedKanji.meaning}).
   DO NOT generate any question testing 「${selectedKanji.character}」!
   All questions must evaluate the student's retention of the OTHER Lesson ${lessonLevel} Kanji: [${testableLessonKanji.map(k => k.character).join(', ')}].
2. SCRIPT RULE: Write all Japanese words in prompts/sentences in Hiragana (e.g. わたし, にほん, がつ) EXCEPT for the specific Lesson ${lessonLevel} Kanji being tested.
3. FORMAT: Exactly 4 distinct options per question, exactly 1 correct answer.
4. Keep explanations concise (1-2 sentences).

${langInstruction}

JSON SCHEMA:
{
  "questions": [
    {
      "kanjiId": number,
      "kanjiCharacter": "single character from testable peer kanji list",
      "category": "kanji_recognition" | "onyomi_kunyomi" | "english_meaning" | "vocab_usage" | "sentence_based",
      "difficulty": "${cleanDifficulty}",
      "prompt": "Question prompt",
      "secondaryPrompt": "Brief instruction",
      "contextSentence": "Short sentence in Hiragana + lesson kanji if applicable",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Exact string from options",
      "explanation": "Concise explanation",
      "audioTarget": "Japanese text"
    }
  ]
}`;

    const userPrompt = `Generate exactly ${requestedCount} diverse questions testing Lesson ${lessonLevel} peer Kanji, strictly excluding 「${selectedKanji.character}」.
Pool: ${JSON.stringify(testableContext)}`;

    // Set max_tokens safely for Groq / Gemini throughput
    const maxTokens = effectiveProvider === 'groq' ? 950 : 1800;

    const aiResult = await callUnifiedAi({
      provider: effectiveProvider,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.25,
      max_tokens: maxTokens,
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
        error: 'AI response was not formatted as valid questions. Please click retry.'
      }, { status: 502 });
    }

    const validatedQuestions: PedagogicalQuestion[] = [];

    for (const q of rawQuestions) {
      if (!q.prompt || !q.options || !Array.isArray(q.options) || q.options.length !== 4) continue;
      if (!q.correctAnswer || !q.options.includes(q.correctAnswer)) continue;

      // Normalize kanji character
      let char = q.kanjiCharacter ? q.kanjiCharacter.trim() : '';
      if (char.length > 1) {
        const match = testableLessonKanji.find(k => char.includes(k.character));
        if (match) char = match.character;
      }

      // STRICT CHECK: Reject if it tests the currently selected Kanji!
      if (char === selectedKanji.character || q.kanjiId === selectedKanji.id) continue;
      if (q.correctAnswer === selectedKanji.character) continue;
      if (typeof q.prompt === 'string' && q.prompt.includes(`「${selectedKanji.character}」`)) continue;

      // Must be a peer Kanji from this lesson
      const matchedPeer = testableLessonKanji.find(k => k.character === char) ||
        testableLessonKanji.find(k => k.id === q.kanjiId);
      if (!matchedPeer) continue;

      // Sanitize context text to ensure beginner N5 accessibility
      const cleanPrompt = sanitizeContextText(q.prompt, allLessonChars);
      const cleanSecPrompt = sanitizeContextText(q.secondaryPrompt || `Lesson ${lessonLevel} Peer Evaluation`, allLessonChars);
      const cleanContext = sanitizeContextText(q.contextSentence, allLessonChars);
      const cleanOptions = q.options.map((opt: string) => sanitizeContextText(opt, allLessonChars));
      const cleanAnswer = sanitizeContextText(q.correctAnswer, allLessonChars);

      const validCat: PedagogicalCategory = [
        'kanji_recognition',
        'onyomi_kunyomi',
        'english_meaning',
        'vocab_usage',
        'sentence_based'
      ].includes(q.category) ? q.category : 'kanji_recognition';

      validatedQuestions.push({
        id: `ai_ped_${Date.now()}_${validatedQuestions.length + 1}`,
        kanjiId: matchedPeer.id,
        kanjiCharacter: matchedPeer.character,
        category: validCat,
        categoryLabel: CATEGORY_META[validCat].label,
        difficulty: cleanDifficulty,
        prompt: cleanPrompt,
        secondaryPrompt: cleanSecPrompt,
        contextSentence: cleanContext,
        options: cleanOptions,
        correctAnswer: cleanAnswer,
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
