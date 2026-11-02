import { NextResponse } from 'next/server';
import { callGroqChat } from '@/services/groqService';

// In-memory cache for dynamic enriched educational content: kanjiId -> content
const contentCache = new Map<number, any>();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { kanji, forceRefresh, refreshSentencesOnly, existingSentences } = body;

    if (!kanji || !kanji.id || !kanji.character) {
      return NextResponse.json({ error: 'Valid kanji object is required.' }, { status: 400 });
    }

    // Handle Refresh Sentences Only (guarantees brand new examples different from previous ones)
    if (refreshSentencesOnly) {
      const existingList = Array.isArray(existingSentences) && existingSentences.length > 0
        ? existingSentences.map((s: any) => typeof s === 'string' ? s : s?.japanese).filter(Boolean).join(' | ')
        : 'None';

      const sentencePrompt = `You are an expert Japanese teacher for JLPT N5.
Create 2 BRAND NEW, AUTHENTIC Japanese practice sentences for the kanji 「${kanji.character}」 (${kanji.meaning}).
IMPORTANT INSTRUCTION: DO NOT repeat any of these previously shown sentences:
${existingList}

Ensure the sentences use realistic workplace, daily life, or office contexts for JLPT N5 beginners.
Return strictly valid JSON in this schema:
{
  "bonus_sentences": [
    {
      "japanese": "Natural Japanese sentence with kanji",
      "hiragana": "Full hiragana furigana reading",
      "romaji": "Hepburn romaji reading",
      "english": "Clear, natural English translation"
    }
  ]
}`;

      const res = await callGroqChat({
        messages: [
          { role: 'system', content: sentencePrompt },
          { role: 'user', content: `Generate 2 novel, fresh sentences for 「${kanji.character}」 (${kanji.meaning}). Timestamp: ${Date.now()}` }
        ],
        temperature: 0.85, // Higher temperature for novelty and variation
        max_tokens: 500,
        response_format: { type: 'json_object' }
      });

      if (!res.success) {
        const isAuth = res.error?.toLowerCase().includes('invalid api key') || 
                       res.error?.toLowerCase().includes('not configured');
        return NextResponse.json({
          success: false,
          error: isAuth 
            ? 'Invalid Groq API Key. Please verify or re-copy your key from console.groq.com/keys.' 
            : (res.error || 'Groq AI request failed.'),
          isAuthError: isAuth
        }, { status: isAuth ? 401 : 502 });
      }

      let parsedSentences: any = {};
      try {
        parsedSentences = JSON.parse(res.content);
      } catch {
        return NextResponse.json({ success: false, error: 'AI response was not valid JSON.' }, { status: 502 });
      }

      const newBonus = parsedSentences.bonus_sentences || [];
      
      // Update in-memory cache with new sentences
      if (contentCache.has(kanji.id)) {
        const cached = contentCache.get(kanji.id);
        cached.bonus_sentences = newBonus;
        contentCache.set(kanji.id, cached);
      }

      return NextResponse.json({
        success: true,
        source: 'groq_ai_fresh_sentences',
        bonus_sentences: newBonus
      });
    }

    // Check cache first if not force-refreshing
    if (!forceRefresh && contentCache.has(kanji.id)) {
      return NextResponse.json({
        success: true,
        source: 'cache',
        content: contentCache.get(kanji.id)
      });
    }

    const systemPrompt = `You are a Japanese linguist and educational content engine for N5 Kanji Master.
Given a Japanese N5 kanji, generate rich educational enhancements formatted strictly as JSON.

STRICT SCHEMA TO RETURN:
{
  "etymology_and_origin": "Concise historical origin of the character shape",
  "memory_mnemonic": "A vivid, unforgettable memory trick to memorize the kanji shape and meaning",
  "reading_guidance": "Clear explanation of how Onyomi vs Kunyomi is used for this specific kanji",
  "office_context_tip": "How an office worker might see or use this kanji in daily Japanese work or communication",
  "bonus_sentences": [
    {
      "japanese": "Sentence in natural Japanese",
      "hiragana": "Full hiragana pronunciation",
      "romaji": "Romaji reading",
      "english": "Natural English translation"
    }
  ]
}

DO NOT invent readings. Use only authentic Japanese grammar.`;

    const userPrompt = `Generate educational enrichment for:
Kanji: ${kanji.character}
Meaning: ${kanji.meaning}
Onyomi: ${kanji.onyomi_readings?.join(', ') || 'None'}
Kunyomi: ${kanji.kunyomi_readings?.join(', ') || 'None'}
Radicals: ${kanji.radicals || 'None'}`;

    const result = await callGroqChat({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.3,
      max_tokens: 800,
      response_format: { type: 'json_object' }
    });

    if (!result.success) {
      const isAuth = result.error?.toLowerCase().includes('invalid api key') || 
                     result.error?.toLowerCase().includes('not configured');
      return NextResponse.json({
        success: false,
        error: isAuth 
          ? 'Invalid Groq API Key. Please verify or re-copy your key from console.groq.com/keys.' 
          : (result.error || 'Groq AI request failed.'),
        isAuthError: isAuth
      }, { status: isAuth ? 401 : 502 });
    }

    let parsedContent: any = {};
    try {
      parsedContent = JSON.parse(result.content);
    } catch {
      return NextResponse.json({
        success: false,
        error: 'AI response was not valid JSON.'
      }, { status: 502 });
    }

    // Save to cache
    contentCache.set(kanji.id, parsedContent);

    return NextResponse.json({
      success: true,
      source: 'groq_ai',
      content: parsedContent
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Error generating educational content.'
    }, { status: 500 });
  }
}
