import { NextResponse } from 'next/server';
import { callUnifiedAi, resolveEffectiveProvider, getAiLanguageInstructions } from '@/services/aiRouter';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages, userContext, provider } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages array is required.' }, { status: 400 });
    }

    const effectiveProvider = resolveEffectiveProvider(provider);
    const langInstruction = getAiLanguageInstructions(effectiveProvider, 'chat');

    const systemPrompt = `You are "Sensei AI", an expert Japanese language tutor and coach specialized in JLPT N5 kanji mastery within the "N5 Kanji Master" platform.
Your student is an office professional learning 120 foundational N5 kanji through short 10-15 minute daily sessions.

STUDENT PROFILE CONTEXT:
- Total Kanji Target: 120
- Currently Learned: ${userContext?.learnedCount ?? 'N/A'} / 120
- Current Level: Level ${userContext?.currentLevel ?? 1}
- Kanji Needing Revision: ${userContext?.weakKanjiCount ?? 0}
${userContext?.activeKanji ? `- Currently viewing Kanji: 「${userContext.activeKanji.character}」 (${userContext.activeKanji.meaning})` : ''}

TEACHING GUIDELINES:
1. Always provide warm, encouraging, concise, and pedagogically clear explanations.
2. For any Japanese word or kanji, provide: Japanese script, Hiragana/Katakana furigana, Romaji, and English translation.
3. If explaining Onyomi vs Kunyomi, clearly highlight that Onyomi (音読み, in Katakana) is Chinese-derived often used in compound words (熟語), whereas Kunyomi (訓読み, in Hiragana) is native Japanese often used alone or with okurigana.
4. If the student made a mistake in a quiz, analyze WHY the mistake happened and give a memorable mnemonic or pattern tip.
5. Important rule: Politely remind the student that mastery of any kanji is awarded only by passing the 80% learning assessment in the app.
6. Keep formatting neat with markdown bullet points, bold key terms, and easy-to-read tables where appropriate.

${langInstruction}`;

    const formattedMessages = [
      { role: 'system' as const, content: systemPrompt },
      ...messages.slice(-8) // keep recent 8 messages for context
    ];

    const result = await callUnifiedAi({
      messages: formattedMessages,
      provider: effectiveProvider,
      temperature: 0.7,
      max_tokens: 1024,
      allowFallback: false
    });

    if (!result.success) {
      const isAuth = result.error?.toLowerCase().includes('invalid api key') ||
        result.error?.toLowerCase().includes('not configured');
      return NextResponse.json({
        success: false,
        error: isAuth
          ? 'Invalid AI API Key. Please verify your Groq or Gemini key in Settings.'
          : (result.error || 'Failed to generate response from AI Tutor.'),
        isAuthError: isAuth
      }, { status: isAuth ? 401 : 502 });
    }

    return NextResponse.json({
      success: true,
      reply: result.content,
      providerUsed: result.providerUsed,
      modelUsed: result.modelUsed,
      tokensUsed: result.tokensUsed
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Error communicating with AI service.'
    }, { status: 500 });
  }
}
