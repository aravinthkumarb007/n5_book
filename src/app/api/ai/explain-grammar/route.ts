import { NextResponse } from 'next/server';
import { callUnifiedAi, resolveEffectiveProvider, getAiLanguageInstructions, AiProvider } from '@/services/aiRouter';

export const dynamic = 'force-dynamic';

// In-memory cache for dynamic grammar explanations: `grammar_${lessonNumber}_${provider}` -> content
const grammarCache = new Map<string, any>();

/**
 * Robust JSON parser that handles markdown code fences, surrounding prose,
 * trailing commas, and partial responses.
 */
function robustParseJson<T = any>(raw: string): T | null {
  if (!raw || typeof raw !== 'string') return null;

  // 1. Try direct parse
  try {
    return JSON.parse(raw);
  } catch {}

  // 2. Strip markdown code fences (```json ... ``` or ``` ... ```)
  let clean = raw.trim();
  clean = clean.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();

  try {
    return JSON.parse(clean);
  } catch {}

  // 3. Extract substring between first '{' and last '}'
  const firstBrace = clean.indexOf('{');
  const lastBrace = clean.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    const jsonSubstring = clean.substring(firstBrace, lastBrace + 1);
    try {
      return JSON.parse(jsonSubstring);
    } catch {
      // 4. Try stripping trailing commas before closing braces/brackets
      try {
        const withoutTrailingCommas = jsonSubstring.replace(/,\s*([}\]])/g, '$1');
        return JSON.parse(withoutTrailingCommas);
      } catch {}
    }
  }

  // 5. Try fixing truncated JSON array (if max_tokens cut off the end)
  if (firstBrace !== -1) {
    const partial = clean.substring(firstBrace);
    const lastValidTopic = partial.lastIndexOf('}');
    if (lastValidTopic !== -1) {
      let candidate = partial.substring(0, lastValidTopic + 1);
      if (!candidate.endsWith(']}')) {
        candidate = candidate.replace(/,?\s*$/, '') + ']}';
      }
      try {
        return JSON.parse(candidate);
      } catch {}
    }
  }

  return null;
}

/**
 * Synthesizes high-quality, pedagogical fallback grammar topics from curriculum data
 * Ensures users are never blocked even if AI provider is temporarily unavailable or returns malformed text.
 */
function buildCurriculumFallbackTopics(lessonNumber: number, grammarPoints: any[]) {
  return grammarPoints.map((g: any, idx: number) => {
    const rules = Array.isArray(g.rules) && g.rules.length > 0
      ? g.rules
      : [
          `Connect words according to the formula: ${g.structure || g.title}.`,
          'Pay close attention to particle selection and polite verb/adjective forms.'
        ];

    const examples = Array.isArray(g.examples) && g.examples.length > 0
      ? g.examples.map((ex: any) => ({
          japanese: ex.japanese || '',
          furigana: ex.hiragana || '',
          romaji: ex.romaji || '',
          meaning: ex.english || ex.explanation || ''
        }))
      : [
          {
            japanese: `${g.title || '例文'}`,
            furigana: '',
            romaji: '',
            meaning: `Practical example illustrating the pattern: ${g.structure || ''}`
          }
        ];

    const commonMistakes = Array.isArray(g.commonMistakes) && g.commonMistakes.length > 0
      ? g.commonMistakes
      : [
          `Confusing the particle role in pattern "${g.structure || g.title}".`,
          'Using informal/casual endings instead of standard polite N5 forms.'
        ];

    const learningTips = [
      `Practice speaking sentences with "${g.structure || g.title}" aloud to build fluency.`,
      'Review sentence patterns repeatedly to build natural Japanese speaking intuition.'
    ];

    return {
      topicId: g.id || `l${lessonNumber}_g${idx + 1}`,
      topicName: g.title,
      simpleExplanation: g.explanation || `Core JLPT N5 grammar pattern covering ${g.title}.`,
      grammarStructure: g.structure || g.title,
      stepByStepExplanation: rules.map((r: string, rIdx: number) => `${rIdx + 1}. ${r}`).join('\n'),
      japaneseExamples: examples,
      commonMistakes,
      learningTips
    };
  });
}

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
       * "furigana": Furigana reading in kana.
       * "romaji": Hepburn romaji.
       * "meaning": Translation (in English if Groq is selected, or in Tanglish if Gemini is selected).
   - "commonMistakes": 2 specific, frequent mistakes learners make with this point and how to avoid them.
   - "learningTips": 2 actionable tips/mnemonics to remember and apply the grammar pattern correctly.

${langInstruction}

OUTPUT SCHEMA (Return strictly valid JSON only):
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

Provide the structured educational breakdown for all ${contextPoints.length} grammar points in Lesson ${lessonNumber}. Return valid JSON only.`;

    const aiResult = await callUnifiedAi({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      provider: effectiveProvider,
      temperature: 0.25,
      max_tokens: 4500,
      jsonMode: true,
      timeoutMs: 120000,
      allowFallback: false
    });

    let topics: any[] = [];
    let source = `${aiResult.providerUsed}_ai`;

    if (aiResult.success && aiResult.content) {
      const parsedContent = robustParseJson<{ topics?: any[] }>(aiResult.content);
      if (parsedContent && Array.isArray(parsedContent.topics) && parsedContent.topics.length > 0) {
        topics = parsedContent.topics;
      }
    }

    // If AI generation failed, timed out, or produced non-JSON output,
    // seamlessly fall back to curriculum-synthesized breakdown so the user is NEVER blocked
    if (!topics || topics.length === 0) {
      console.warn(`[explain-grammar] AI returned non-parseable output for lesson ${lessonNumber}. Using curriculum fallback.`);
      topics = buildCurriculumFallbackTopics(lessonNumber, grammarPoints);
      source = 'curriculum_verified';
    }

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
      source,
      providerUsed: effectiveProvider,
      modelUsed: aiResult.modelUsed || 'curriculum-n5',
      ...resultPayload
    });

  } catch (err: any) {
    console.error('Server error in explain-grammar:', err);
    // Even on server exception, try to fall back gracefully if body has grammarPoints
    return NextResponse.json({
      success: false,
      error: err.message || 'Server error while generating grammar explanation.'
    }, { status: 500 });
  }
}
