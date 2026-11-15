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

function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const DEFAULT_SUBPROMPTS: Record<JlptQuestionType, string> = {
  reading_identification: 'Choose the correct reading of the underlined word.',
  kanji_selection: 'Choose the correct kanji for the underlined word.',
  vocab_meaning: 'Choose the correct meaning of the underlined word.',
  contextual_usage: 'Choose the word that best fits the sentence context.',
  sentence_fill: 'Choose the correct kanji to complete the sentence.'
};
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

    const systemPrompt = `You are the Official Chief Examiner for the JLPT N5 and NAT-TEST 5Q Japanese Language Examinations.
Your mission is to dynamically synthesize authentic, grammatically flawless, natural Japanese exam questions for Level ${requestedLevel}.

CRITICAL PEDAGOGICAL & JLPT EXAMINATION SPECIFICATIONS:

1. AUTHENTIC QUESTION PATTERNS & PRESENTATION:
   Every question MUST follow one of these 5 authentic JLPT N5 / NAT-TEST 5Q formats with markdown underline __word__ around the target word:

   - Pattern 1 ("reading_identification" - 漢字の読み):
     Instruction (subPrompt): "Choose the correct reading of the underlined word."
     Prompt: A natural Japanese sentence with the target word underlined.
     Example: "毎朝、__新聞__を読みます。"
     Options: Exactly 4 authentic Hiragana readings with realistic phonetic distractors (e.g., voiced/unvoiced consonants like しん/じん, p-sounds like ぶん/ぷん, long vowels, alternate readings).
     Example options: ["しんぶん", "しんもん", "しんぷん", "じんぶん"]
     CorrectAnswer: "しんぶん"

   - Pattern 2 ("kanji_selection" - 表記・漢字選択):
     Instruction (subPrompt): "Choose the correct kanji for the underlined word."
     Prompt: A natural Japanese sentence with the target Hiragana word underlined.
     Example: "きのう、友だちに __あいました__。"
     Options: Exactly 4 Kanji choices with identical okurigana, drawn from the cumulative pool.
     Example options: ["会いました", "合いました", "今いました", "見いました"]
     CorrectAnswer: "会いました"

   - Pattern 3 ("vocab_meaning" - 語彙の意味):
     Instruction (subPrompt): "Choose the correct meaning of the underlined word."
     Prompt: "「__休日__」の意味として最もよいものはどれですか。"
     Options: Exactly 4 distinct English meanings.
     Example options: ["Holiday / Day off", "Workday", "Birthday", "Yesterday"]
     CorrectAnswer: "Holiday / Day off"

   - Pattern 4 ("contextual_usage" - 文脈規定・言葉の使い方):
     Instruction (subPrompt): "Choose the word that best fits the sentence context."
     Prompt: A natural sentence with a blank ［　］.
     Example: "田中さんは　大学の　［　］です。"
     Options: Exactly 4 plausible Japanese words formed strictly with cumulative Kanji.
     Example options: ["学生", "先生", "会社", "友達"]
     CorrectAnswer: "学生"

   - Pattern 5 ("sentence_fill" - 文中漢字選択):
     Instruction (subPrompt): "Choose the correct kanji to complete the sentence."
     Prompt: A natural sentence testing a single Kanji character in context with ［　］.
     Example: "いま、何［　］ですか。"
     Options: Exactly 4 single Kanji characters strictly from the cumulative pool.
     Example options: ["時", "分", "半", "年"]
     CorrectAnswer: "時"

2. CUMULATIVE KANJI POOL RULES:
   - Target Curriculum (Level ${requestedLevel}): [${currentLevelChars || 'All Level Kanji'}]
   - Prior Retention (Levels 1–${requestedLevel - 1}): [${prevLevelsChars || 'Level 1 Foundational'}]
   - Every tested Kanji and every Kanji in options MUST come strictly from this cumulative pool!
   - NO unlearned Kanji from higher levels permitted in questions, options, or passages!
   - Grammatical words and particles outside the pool must be written in Hiragana (e.g. わたし, ともだち).

3. ABSOLUTE ZERO FURIGANA DURING EXAM:
   - NEVER put Furigana, reading annotations [かんじ], romaji, or pronunciation hints inside prompt, contextSentence, or options.
   - The user must demonstrate independent reading ability.
   - Put detailed readings, furigana, and educational explanations in "explanation" for review after the test.

4. REALISTIC DISTRACTORS & UNAMBIGUOUS ANSWERS:
   - Exactly FOUR (4) options per question.
   - All 4 options MUST be distinct and non-empty (NO DUPLICATES).
   - Exactly ONE unambiguously correct answer.
   - Realistic distractors with plausible variations.

${langInstruction}

OUTPUT SCHEMA (Return strictly JSON):
{
  "questions": [
    {
      "kanjiId": number,
      "kanjiCharacter": "single character from cumulative pool",
      "kanjiLevel": number,
      "questionType": "reading_identification" | "kanji_selection" | "vocab_meaning" | "contextual_usage" | "sentence_fill",
      "prompt": "Natural Japanese sentence with __target_word__ underlined, without furigana",
      "subPrompt": "Choose the correct reading of the underlined word.",
      "contextSentence": "Short natural context sentence without furigana (optional)",
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
      let cleanPrompt = sanitizeContextText(q.prompt, cumulativeChars);
      let cleanSubPrompt = sanitizeContextText(q.subPrompt || '', cumulativeChars);
      const cleanContext = sanitizeContextText(q.contextSentence || '', cumulativeChars);
      const rawOptions = q.options.map((opt: string) => sanitizeContextText(opt, cumulativeChars).trim());
      const cleanAnswer = sanitizeContextText(q.correctAnswer, cumulativeChars).trim();

      // Ensure all 4 options are non-empty and unique (NO duplicate choices)
      const uniqueOptions: string[] = Array.from(new Set(rawOptions.filter((opt): opt is string => Boolean(opt))));
      if (uniqueOptions.length !== 4) continue;
      if (!uniqueOptions.includes(cleanAnswer)) continue;

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

      // Ensure proper JLPT subprompt instruction
      if (!cleanSubPrompt || cleanSubPrompt.length < 5) {
        cleanSubPrompt = DEFAULT_SUBPROMPTS[qType];
      }

      // If prompt doesn't have underline formatting (__...__), add it to target kanji
      if (!cleanPrompt.includes('__') && !cleanPrompt.includes('【') && cleanPrompt.includes(matchedKanji.character)) {
        cleanPrompt = cleanPrompt.replace(matchedKanji.character, `__${matchedKanji.character}__`);
      }

      // Shuffle options randomly so correct answer is uniformly distributed among A, B, C, D
      const shuffledOptions = shuffleArray(uniqueOptions);

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
        options: shuffledOptions,
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
