import { NextResponse } from 'next/server';
import { callGroqChat } from '@/services/groqService';
import { ALL_MINNA_LESSONS } from '@/data/minnaNoNihongo';
import { generateLocalExam } from '@/services/minnaQuizEngine';
import { CustomExamConfig, ExamQuestion, MinnaLesson } from '@/types/minna';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      lessonRange = [1],
      questionTypes = ['mcq', 'fill_blank', 'sentence_formation', 'translation_ja_en'],
      questionCount = 10,
      focus = 'all',
      difficulty = 'medium',
      extraVocab = [],
      extraGrammar = [],
      generatorMode = 'groq_ai'
    } = body;

    const targetLessons: MinnaLesson[] = ALL_MINNA_LESSONS.filter(l =>
      lessonRange.includes(l.lessonNumber)
    );

    // Fallback if no lessons
    const activeLessons = targetLessons.length > 0 ? targetLessons : [ALL_MINNA_LESSONS[0]];

    const config: CustomExamConfig = {
      level: 'N5',
      lessonRange,
      focus,
      questionTypes,
      questionCount,
      difficulty,
      durationMinutes: 0,
      includeWeakAreas: false,
      generatorMode
    };

    // If local mode is requested directly, generate fast local exam
    if (generatorMode === 'smart_local') {
      const localQuestions = generateLocalExam(config, extraVocab, extraGrammar);
      return NextResponse.json({
        success: true,
        source: 'smart_local',
        questions: localQuestions
      });
    }

    // Prepare curriculum context for Groq AI
    const vocabContext = activeLessons.flatMap(l => l.vocabulary.slice(0, 15)).map(v => ({
      lesson: v.lessonNumber,
      kanji: v.kanji,
      hiragana: v.hiragana,
      romaji: v.romaji,
      english: v.english
    }));

    const grammarContext = activeLessons.flatMap(l => l.grammar).map(g => ({
      lesson: g.lessonNumber,
      title: g.title,
      structure: g.structure,
      rules: g.rules
    }));

    const systemPrompt = `You are an expert Japanese Language Teacher specializing in the Minna no Nihongo curriculum (JLPT N5).
Generate high-quality assessment questions for the selected lessons.
Allowed question types: ${questionTypes.join(', ')}.

MANDATORY FURIGANA REQUIREMENT:
For ALL Japanese text containing Kanji characters (in "prompt", "contextText", "options", "wordTiles", and "correctAnswer"), ALWAYS annotate each Kanji with Furigana using square brackets:
Format: 漢字[かんじ]
Examples:
- "私[わたし]は 日本[にほん]へ 行[い]きます。"
- "本[ほん]を 読[よ]む"
- "食[た]べます"
- "友達[ともだち]と 映画[えいが]を 見[み]ました。"

Return a JSON object with a "questions" array matching this exact schema:
{
  "questions": [
    {
      "id": "q1",
      "lessonNumber": number,
      "type": "mcq" | "fill_blank" | "sentence_formation" | "translation_ja_en" | "translation_en_ja" | "grammar_correction" | "matching" | "reading",
      "category": "vocabulary" | "grammar" | "reading",
      "prompt": "Clear instruction in English or Japanese with furigana if Japanese",
      "contextText": "Optional context sentence with furigana 漢字[かんじ]",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "wordTiles": ["tile1", "tile2", "tile3"],
      "correctAnswer": "Exact string of correct answer",
      "explanation": "Clear explanation of grammar/vocab principle"
    }
  ]
}`;

    const userPrompt = `Lessons: ${lessonRange.join(', ')}
Count: ${questionCount} questions
Difficulty: ${difficulty}
Focus: ${focus}

Vocabulary reference:
${JSON.stringify(vocabContext.slice(0, 30))}

Grammar reference:
${JSON.stringify(grammarContext.slice(0, 12))}

Generate exactly ${questionCount} diverse, accurate questions.`;

    try {
      const response = await callGroqChat({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
        max_tokens: 2200,
        response_format: { type: 'json_object' }
      });

      const parsed = JSON.parse(response.content);
      if (parsed.questions && Array.isArray(parsed.questions) && parsed.questions.length > 0) {
        return NextResponse.json({
          success: true,
          source: 'groq_ai',
          questions: parsed.questions
        });
      }
    } catch (aiErr) {
      console.warn('Groq AI generation error, falling back to smart local engine:', aiErr);
    }

    // Fallback to smart local exam if Groq is unavailable or rate limited
    const fallbackQuestions = generateLocalExam(config, extraVocab, extraGrammar);
    return NextResponse.json({
      success: true,
      source: 'smart_local_fallback',
      questions: fallbackQuestions
    });

  } catch (error: any) {
    console.error('Quiz generation API error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to generate quiz' },
      { status: 500 }
    );
  }
}
