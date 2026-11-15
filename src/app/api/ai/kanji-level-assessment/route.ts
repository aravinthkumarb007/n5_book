import { NextResponse } from 'next/server';
import { callUnifiedAi, resolveEffectiveProvider, getAiLanguageInstructions } from '@/services/aiRouter';
import { ALL_120_KANJI } from '@/data/kanjiDatabase';
import {
  AiLevelQuestion,
  JlptQuestionType,
  JLPT_QUESTION_TYPE_META,
  getCumulativeLearnedKanjiPool
} from '@/services/aiKanjiLevelAssessmentService';

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

// Convert out-of-pool kanji in sentences to Hiragana for beginner N5 accessibility
const COMMON_KANJI_TO_HIRAGANA: Record<string, string> = {
  '私': 'わたし', '本': 'ほん', '時': 'じ', '月': 'つき', '会': 'かい',
  '社': 'しゃ', '校': 'こう', '学': 'がく', '生': 'せい', '先': 'せん',
  '行': 'い', '来': 'き', '見': 'み', '食': 'た', '飲': 'の',
  '買': 'か', '書': 'か', '読': 'よ', '話': 'はな', '聞': 'き'
};

function sanitizeContextText(text: string, allowedChars: Set<string>): string {
  if (!text) return '';

  // 1. Process bracket furigana:
  // - If the kanji is allowed, keep ONLY the kanji part (no furigana/reading hint): 漢字[かんじ] -> 漢字
  // - If the kanji is unlearned, convert to Hiragana reading: 漢字[かんじ] -> かんじ
  let result = text.replace(/([\u4E00-\u9FAF\u3005]+)\s*[\[(（【<]\s*([ぁ-んァ-ヶー]+)\s*[\])）】>]/g, (match, kanjiPart, reading) => {
    const isAllowed = Array.from(kanjiPart).every((c: any) => allowedChars.has(c));
    return isAllowed ? kanjiPart : reading;
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
      level,
      learnedKanjiIds = [],
      count = 8,
      difficulty = 'medium',
      provider
    } = body;

    const requestedLevel = Number(level) || 1;
    const requestedCount = Math.min(12, Math.max(5, Number(count) || 8));
    const cleanDifficulty: 'easy' | 'medium' | 'hard' =
      ['easy', 'medium', 'hard'].includes(difficulty) ? difficulty : 'medium';

    // 1. Determine cumulative learned pool
    const {
      cumulativePool,
      currentLevelLearned,
      previousLevelsLearned
    } = getCumulativeLearnedKanjiPool(requestedLevel, learnedKanjiIds);

    if (cumulativePool.length === 0) {
      return NextResponse.json({
        success: false,
        error: `No learned Kanji found for Level ${requestedLevel}. Study kanji to build your assessment pool.`
      }, { status: 400 });
    }

    const cumulativeChars = new Set(cumulativePool.map(k => k.character));
    const effectiveProvider = resolveEffectiveProvider(provider);
    const langInstruction = getAiLanguageInstructions(effectiveProvider, 'exam');

    // 2. Structured context for AI
    const poolContext = cumulativePool.map(k => ({
      id: k.id,
      char: k.character,
      level: k.level,
      meaning: k.meaning,
      on: k.onyomi_readings,
      kun: k.kunyomi_readings,
      isCurrentLevel: k.level === requestedLevel
    }));

    const currentLevelChars = currentLevelLearned.map(k => k.character).join(' ');
    const prevLevelsChars = previousLevelsLearned.map(k => k.character).join(' ');

    const systemPrompt = `You are the Official Examination Authority for JLPT N5 and NAT-TEST 5Q Japanese Kanji Examinations.
Your mission is to synthesize an authentic, realistic, 100% AI-generated Level ${requestedLevel} Kanji Examination.

PEDAGOGICAL & EXAM SPECIFICATIONS:
1. CUMULATIVE KANJI POOL ENFORCEMENT:
   Current Level (${requestedLevel}) Kanji Pool: [${currentLevelChars || 'None'}]
   Previous Levels (1–${requestedLevel - 1}) Cumulative Kanji Pool: [${prevLevelsChars || 'None'}]
   TOTAL CUMULATIVE EXAM POOL: ${cumulativePool.length} characters.
   CRITICAL MANDATORY RULE: Every question, option, and tested Kanji MUST come STRICTLY from this cumulative pool!
   DO NOT introduce any Kanji character outside this cumulative pool! (Hiragana and Katakana are permitted for grammar and Okurigana).

2. AUTHENTIC JLPT / NAT-TEST QUESTION PATTERNS (Distribute across these 5 types):
   - "reading_identification": 漢字の読み (e.g. 「日本に行きます。」の「日本」の読み方はどれですか。)
   - "kanji_selection": 表記・漢字選択 (e.g. 「かのじょは [ひと] です。」の [ひと] はどの漢字ですか。)
   - "vocab_meaning": 語彙の意味 (e.g. 「休日」の意味はどれですか。)
   - "contextual_usage": 文脈規定・使い方 (e.g. 文脈に最も合う言葉・漢字を一つ選んでください。)
   - "sentence_fill": 文中漢字選択 (e.g. 「いま、［　］時ですか。」)

3. CRITICAL: ZERO FURIGANA & ZERO READING HINTS DURING ASSESSMENT:
   - MANDATORY: NEVER include Furigana (ふりがな), Hiragana reading hints, Romaji, or pronunciation hints in "prompt", "subPrompt", "contextSentence", or "options"!
   - Present Kanji cleanly (e.g. 『日本』, NEVER 『日本[にほん]』), exactly like authentic printed JLPT and NAT-TEST exam question sheets.
   - The assessment evaluates the student's ability to read and recognize Kanji independently without hints.
   - In "explanation", DO include full readings, furigana, and educational explanations for review after completing the test.

4. BALANCED CUMULATIVE COVERAGE:
   - Approximately 50-60% of questions should test Current Level (${requestedLevel}) Kanji.
   - Approximately 40-50% of questions should test Previously Learned Retention (Levels 1–${requestedLevel - 1}).

5. EXAM STRUCTURE & PRESENTATION:
   - Exactly FOUR (4) multiple-choice options per question.
   - Exactly ONE correct option.
   - Realistic, authentic distractors drawn strictly from the cumulative pool (homophones, similar radicals, related meanings).
   - Clear, concise explanation for each question breaking down why the correct answer is right.

${langInstruction}

OUTPUT SCHEMA (Return strictly JSON):
{
  "questions": [
    {
      "kanjiId": number,
      "kanjiCharacter": "single character from cumulative pool",
      "kanjiLevel": number,
      "questionType": "reading_identification" | "kanji_selection" | "vocab_meaning" | "contextual_usage" | "sentence_fill",
      "prompt": "Question prompt in authentic JLPT exam style without any furigana or reading hints",
      "subPrompt": "Brief standard exam instruction without giving away the reading",
      "contextSentence": "Short natural context sentence without furigana",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "correctAnswer": "Exact matching string from options",
      "explanation": "Clear educational explanation with readings for post-test review"
    }
  ]
}`;

    const userPrompt = `Generate exactly ${requestedCount} authentic JLPT / NAT-TEST Level ${requestedLevel} exam questions.
DIFFICULTY: ${cleanDifficulty.toUpperCase()}
TARGET LEVEL: ${requestedLevel}
CUMULATIVE LEARNED POOL (${cumulativePool.length} characters):
${JSON.stringify(poolContext, null, 2)}`;

    // Set max_tokens safely for Groq / Gemini throughput
    const maxTokens = effectiveProvider === 'groq' ? 1200 : 2500;

    const aiResult = await callUnifiedAi({
      provider: effectiveProvider,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.25,
      max_tokens: maxTokens,
      jsonMode: true,
      timeoutMs: 35000,
      allowFallback: true
    });

    if (!aiResult.success) {
      return NextResponse.json({
        success: false,
        error: aiResult.error || 'AI exam generation unavailable. Please check your AI API key in Settings.'
      }, { status: 502 });
    }

    const parsed = robustParseJson(aiResult.content);
    const rawQuestions: any[] = parsed?.questions || [];

    if (!Array.isArray(rawQuestions) || rawQuestions.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'AI response was not formatted as valid exam questions. Please try again.'
      }, { status: 502 });
    }

    const validatedQuestions: AiLevelQuestion[] = [];

    for (const q of rawQuestions) {
      if (!q.prompt || !q.options || !Array.isArray(q.options) || q.options.length !== 4) continue;
      if (!q.correctAnswer || !q.options.includes(q.correctAnswer)) continue;

      // Normalize kanji character
      let char = q.kanjiCharacter ? q.kanjiCharacter.trim() : '';
      if (char.length > 1) {
        const match = cumulativePool.find(k => char.includes(k.character));
        if (match) char = match.character;
      }

      // Match kanji record in cumulative pool
      const matchedKanji = cumulativePool.find(k => k.character === char) ||
        cumulativePool.find(k => k.id === q.kanjiId) ||
        cumulativePool[validatedQuestions.length % cumulativePool.length];

      // Sanitize context text
      const cleanPrompt = sanitizeContextText(q.prompt, cumulativeChars);
      const cleanSubPrompt = sanitizeContextText(q.subPrompt || '', cumulativeChars);
      const cleanContext = sanitizeContextText(q.contextSentence || '', cumulativeChars);
      const cleanOptions = q.options.map((opt: string) => sanitizeContextText(opt, cumulativeChars));
      const cleanAnswer = sanitizeContextText(q.correctAnswer, cumulativeChars);

      const validTypes: JlptQuestionType[] = [
        'reading_identification',
        'kanji_selection',
        'vocab_meaning',
        'contextual_usage',
        'sentence_fill'
      ];
      const qType: JlptQuestionType = validTypes.includes(q.questionType)
        ? q.questionType
        : validTypes[validatedQuestions.length % validTypes.length];

      validatedQuestions.push({
        id: `ai_exam_${Date.now()}_${validatedQuestions.length + 1}`,
        kanjiId: matchedKanji.id,
        kanjiCharacter: matchedKanji.character,
        kanjiLevel: matchedKanji.level,
        isCurrentLevel: matchedKanji.level === requestedLevel,
        questionType: qType,
        questionTypeLabel: JLPT_QUESTION_TYPE_META[qType].label,
        prompt: cleanPrompt,
        subPrompt: cleanSubPrompt,
        contextSentence: cleanContext,
        options: cleanOptions,
        correctAnswer: cleanAnswer,
        explanation: q.explanation || `「${matchedKanji.character}」 (${matchedKanji.meaning})`,
        audioTarget: matchedKanji.character
      });
    }

    if (validatedQuestions.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'AI did not return valid cumulative exam questions. Please click retry.'
      }, { status: 502 });
    }

    return NextResponse.json({
      success: true,
      questions: validatedQuestions,
      level: requestedLevel,
      cumulativePoolCount: cumulativePool.length,
      currentLevelPoolCount: currentLevelLearned.length,
      previousLevelsPoolCount: previousLevelsLearned.length,
      providerUsed: aiResult.providerUsed,
      modelUsed: aiResult.modelUsed
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Server error during AI level assessment generation.'
    }, { status: 500 });
  }
}
