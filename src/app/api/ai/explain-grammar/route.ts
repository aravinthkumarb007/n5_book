import { NextResponse } from 'next/server';
import { callUnifiedAi, resolveEffectiveProvider, getAiLanguageInstructions, AiProvider } from '@/services/aiRouter';

export const dynamic = 'force-dynamic';

// In-memory cache for dynamic grammar explanations: `grammar_${lessonNumber}_${provider}` -> content
const grammarCache = new Map<string, any>();

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const {
      lessonNumber,
      lessonTitle = `Lesson ${lessonNumber}`,
      grammarPoints = [],
      provider,
      forceRefresh = false
    } = body;

    if (!lessonNumber || !Array.isArray(grammarPoints) || grammarPoints.length === 0) {
      return NextResponse.json(
        { error: 'Valid lessonNumber and grammarPoints array are required.' },
        { status: 400 }
      );
    }

    const effectiveProvider: AiProvider = resolveEffectiveProvider(provider);
    const cacheKey = `grammar_l${lessonNumber}_${effectiveProvider}`;

    // Return cached explanation if available and not forcing refresh
    if (!forceRefresh && grammarCache.has(cacheKey)) {
      return NextResponse.json({
        success: true,
        source: 'cache',
        providerUsed: effectiveProvider,
        ...grammarCache.get(cacheKey)
      });
    }

    const langInstruction = getAiLanguageInstructions(effectiveProvider, 'grammar');

    const systemPrompt = `You are an expert Japanese Language Professor and Master Tutor specializing in the Minna no Nihongo (JLPT N5) curriculum.
Your mission is to provide an in-depth, structured, beginner-friendly pedagogical breakdown of the grammar points in Lesson ${lessonNumber}: "${lessonTitle}".

CRITICAL PEDAGOGICAL CONSTRAINTS:
1. ONLY explain the grammar points provided in this lesson's curriculum context. DO NOT introduce unrelated grammar patterns from future or other lessons.
2. For EVERY grammar point in the lesson, provide a comprehensive breakdown adhering to the 7 required learning components:
   - "topicName": Exact name of the grammar point (e.g. "〜は〜です", "〜たいです").
   - "simpleExplanation": Clear explanation of what the pattern means and when/why it is used.
   - "grammarStructure": Exact formula showing how words/particles are connected (e.g. "Noun 1 + は + Noun 2 + です", "Verb [ます-form stem] + たいです").
   - "stepByStepExplanation": Step-by-step guidance on how to construct authentic sentences using this pattern.
   - "japaneseExamples": Exactly 2 to 3 authentic Japanese example sentences with:
       * "japanese": Japanese sentence with Kanji.
       * "furigana": Furigana in bracket notation (e.g. わたし[わたし]は 学生[がくせい]です。).
       * "romaji": Hepburn romaji.
       * "meaning": Translation (in English if Groq is selected, or in Tanglish/English if Gemini is selected).
   - "commonMistakes": 2 specific, frequent mistakes learners make with this point and how to avoid them.
   - "learningTips": 2 actionable tips/mnemonics to remember and apply the grammar pattern correctly.

${langInstruction}

OUTPUT SCHEMA (Return strictly valid JSON):
{
  "lessonNumber": ${lessonNumber},
  "lessonTitle": "${lessonTitle}",
  "topics": [
    {
      "topicId": "string (matching input id)",
      "topicName": "string",
      "simpleExplanation": "string",
      "grammarStructure": "string",
      "stepByStepExplanation": "string",
      "japaneseExamples": [
        {
          "japanese": "string",
          "furigana": "string",
          "romaji": "string",
          "meaning": "string"
        }
      ],
      "commonMistakes": [
        "string describing mistake and fix",
        "string describing mistake and fix"
      ],
      "learningTips": [
        "string tip/mnemonic",
        "string tip/mnemonic"
      ]
    }
  ]
}`;

    const contextPoints = grammarPoints.map((g: any, idx: number) => ({
      topicId: g.id || `g_${lessonNumber}_${idx + 1}`,
      title: g.title,
      structure: g.structure,
      textbookExplanation: g.explanation,
      rules: g.rules || [],
      existingExamples: g.examples || []
    }));

    const userPrompt = `Curriculum for Lesson ${lessonNumber} ("${lessonTitle}"):
${JSON.stringify(contextPoints, null, 2)}

Provide the structured educational breakdown for all ${contextPoints.length} grammar points in Lesson ${lessonNumber}.`;

    const aiResult = await callUnifiedAi({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      provider: effectiveProvider,
      temperature: 0.3,
      max_tokens: 3500,
      jsonMode: true,
      timeoutMs: 120000, // Extended 120s timeout per requirement
      allowFallback: false
    });

    if (!aiResult.success) {
      const isAuth = aiResult.error?.toLowerCase().includes('invalid api key') ||
        aiResult.error?.toLowerCase().includes('not configured');
      const isTimeout = aiResult.error?.toLowerCase().includes('timed out');

      return NextResponse.json({
        success: false,
        error: isAuth
          ? `Invalid AI API Key. Please verify your ${effectiveProvider === 'gemini' ? 'Google Gemini' : 'Groq'} key in Settings.`
          : isTimeout
            ? `${effectiveProvider === 'gemini' ? 'Google Gemini' : 'Groq'} API request timed out (120s limit). Please try again.`
            : (aiResult.error || 'Failed to generate grammar explanations.'),
        isAuthError: isAuth,
        isTimeout
      }, { status: isAuth ? 401 : isTimeout ? 504 : 502 });
    }

    let parsedContent: any = {};
    try {
      parsedContent = JSON.parse(aiResult.content);
    } catch {
      return NextResponse.json({
        success: false,
        error: 'AI response was not valid JSON. Please try again.'
      }, { status: 502 });
    }

    const topics = Array.isArray(parsedContent.topics) ? parsedContent.topics : [];

    const resultPayload = {
      lessonNumber,
      lessonTitle,
      topics,
      generatedAt: new Date().toISOString()
    };

    // Cache the result in server memory
    grammarCache.set(cacheKey, resultPayload);

    return NextResponse.json({
      success: true,
      source: `${aiResult.providerUsed}_ai`,
      providerUsed: aiResult.providerUsed,
      modelUsed: aiResult.modelUsed,
      ...resultPayload
    });

  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Server error while generating grammar explanation.'
    }, { status: 500 });
  }
}
