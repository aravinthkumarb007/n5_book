import { NextResponse } from 'next/server';
import { callGroqChat } from '@/services/groqService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { eligibleKanjiPool, count, testType } = body;

    if (!eligibleKanjiPool || !Array.isArray(eligibleKanjiPool) || eligibleKanjiPool.length === 0) {
      return NextResponse.json({
        error: 'Eligible kanji pool is empty. Only learned kanji are permitted in test question generation.'
      }, { status: 400 });
    }

    // Extract characters of eligible kanji to strictly validate against
    const eligibleChars = new Set(eligibleKanjiPool.map((k: any) => k.character));
    const eligibleMeanings = new Set(eligibleKanjiPool.map((k: any) => k.meaning));

    const promptContext = eligibleKanjiPool.map((k: any) => ({
      id: k.id,
      character: k.character,
      meaning: k.meaning,
      onyomi: k.onyomi_readings,
      kunyomi: k.kunyomi_readings
    }));

    const systemPrompt = `You are a strict test engine generator for N5 Kanji Master.
CRITICAL CONSTRAINT: You must ONLY generate questions and options using the provided ELIGIBLE KANJI POOL.
Do NOT introduce any kanji character or concept outside this pool!

Output JSON with an array named "questions":
{
  "questions": [
    {
      "kanjiId": number,
      "kanjiCharacter": "single character from pool",
      "type": "${testType || 'kanji_to_english'}",
      "prompt": "The question prompt",
      "secondaryPrompt": "Instruction for the student",
      "options": ["Correct option", "Distractor 1 from pool", "Distractor 2 from pool", "Distractor 3 from pool"],
      "correctAnswer": "Exact string of correct option",
      "explanation": "Clear educational explanation"
    }
  ]
}`;

    const userPrompt = `Eligible learned kanji pool (${eligibleKanjiPool.length} kanji):
${JSON.stringify(promptContext)}

Generate ${count || 5} questions strictly constrained to this pool.`;

    const result = await callGroqChat({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.2, // low temperature for precision
      max_tokens: 1200,
      response_format: { type: 'json_object' }
    });

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 502 });
    }

    let parsed: any = {};
    try {
      parsed = JSON.parse(result.content);
    } catch {
      return NextResponse.json({ success: false, error: 'Failed to parse AI question response' }, { status: 502 });
    }

    const rawQuestions: any[] = parsed.questions || [];
    
    // Strict Validation: Reject questions containing ANY unlearned kanji in character, prompt, or options
    const kanjiRegex = /[\u4E00-\u9FAF]/g;
    const hasUnlearnedKanji = (str: string) => {
      if (!str) return false;
      const found = str.match(kanjiRegex);
      if (!found) return false;
      return found.some(char => !eligibleChars.has(char));
    };

    const validatedQuestions = rawQuestions.filter(q => {
      if (!q.kanjiCharacter || !eligibleChars.has(q.kanjiCharacter)) return false;
      if (!q.options || !Array.isArray(q.options) || q.options.length < 2) return false;
      if (!q.correctAnswer || !q.options.includes(q.correctAnswer)) return false;
      if (hasUnlearnedKanji(q.prompt)) return false;
      if (hasUnlearnedKanji(q.secondaryPrompt)) return false;
      if (q.options.some((opt: string) => hasUnlearnedKanji(opt))) return false;
      return true;
    });

    return NextResponse.json({
      success: true,
      questions: validatedQuestions,
      source: 'groq_ai'
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Server error during dynamic quiz generation.'
    }, { status: 500 });
  }
}
