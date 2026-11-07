import { NextResponse } from 'next/server';
import { callUnifiedAi } from '@/services/aiRouter';
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
      generatorMode = 'ai',
      provider,
      pastQuestionFingerprints = []
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
        difficulty,
        questions: localQuestions
      });
    }

    // Prepare curriculum context
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

    // Explicit Pedagogical Difficulty Guidelines
    let difficultyInstructions = '';
    if (difficulty === 'easy') {
      difficultyInstructions = `DIFFICULTY: EASY (初級)
      - Test single, straightforward grammatical concepts or fundamental vocabulary definitions.
- For particles, use obvious contrasting distractors(e.g.testing 'を' with unrelated distractors like 'から' / 'まで').
    - Keep sentences short(under 8 words).
- Focus on basic identification, direct translation, or standard 'です/ます' declarative sentences.`;
    } else if (difficulty === 'hard') {
      difficultyInstructions = `DIFFICULTY: HARD(上級) - MANDATORY RULES:
    - DO NOT generate simple 1 - step recall or obvious definition questions.
- For particles: Test tricky contrasts in nuanced contexts(e.g., 'に' vs 'で' for location of existence vs action; 'は' topic contrast vs 'が' subject identifier; 'へ' vs 'に' direction vs destination).
    - For verbs: Test tricky conjugations(e.g., te - form sound shifts like 書いて vs 泳いで vs 待って; potential or te - mo - ii permission nuances).
    - For distractors: All 4 options MUST be highly plausible, grammatically valid words / particles, differing only in precise nuance or collocation.
- Include compound sentences or dialogue contexts where conversational tone dictates the appropriate form.
- Include giving / receiving(あげる / もらう / くれる) or movement purpose(...に行きます) where relevant.`;
    } else {
      difficultyInstructions = `DIFFICULTY: MEDIUM(中級)
      - Test practical sentence usage, standard particles, and common conversational phrases.
- Distractors should be reasonable alternatives from the same lesson range.
- Require applying grammar patterns to context rather than isolated words.`;
    }

    const systemPrompt = `You are a Master Japanese Language Professor specializing in the Minna no Nihongo curriculum(JLPT N5).
Generate high - quality assessment questions for the selected lessons with strict adherence to pedagogical accuracy.
Allowed question types: ${ questionTypes.join(', ') }.

${ difficultyInstructions }

MANDATORY FURIGANA REQUIREMENT:
For ALL Japanese text containing Kanji characters(in "prompt", "contextText", "options", "wordTiles", and "correctAnswer"), ALWAYS annotate each Kanji with Furigana using square brackets:
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
          "difficulty": "${difficulty}",
          "prompt": "Clear instruction in English or Japanese with furigana if Japanese",
          "contextText": "Optional context sentence with furigana 漢字[かんじ]",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "wordTiles": ["tile1", "tile2", "tile3"],
          "correctAnswer": "Exact string of correct answer",
      "explanation": "Pedagogical explanation of why this answer is correct and why other options are incorrect"
        }
      ]
    } `;

    const excludeNote = pastQuestionFingerprints.length > 0
      ? `DO NOT repeat any of these recently asked questions or topics: \n${ pastQuestionFingerprints.slice(-15).join('\n') } \n`
      : '';

    const userPrompt = `Lessons: ${ lessonRange.join(', ') }
    Count: ${ questionCount } questions
    Difficulty: ${ difficulty.toUpperCase() }
    Focus: ${ focus }
${ excludeNote }
Vocabulary reference:
${ JSON.stringify(vocabContext.slice(0, 30)) }

Grammar reference:
${ JSON.stringify(grammarContext.slice(0, 12)) }

Generate exactly ${questionCount} diverse, accurate, high-quality questions strictly at ${difficulty.toUpperCase()} level.`;

    try {
        const response = await callUnifiedAi({
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
        provider: provider === 'groq' || provider === 'gemini' ? provider : undefined,
          temperature: difficulty === 'hard' ? 0.35 : 0.25,
          max_tokens: 3000,
          jsonMode: true,
          allowFallback: true
        });

      if (response.success && response.content) {
        const parsed = JSON.parse(response.content);
        if (parsed.questions && Array.isArray(parsed.questions) && parsed.questions.length > 0) {
          // Normalize difficulty tag on all questions
          const sanitized = parsed.questions.map((q: any, i: number) => ({
            ...q,
            id: q.id || `q_${Date.now()}_${i}`,
            difficulty: q.difficulty || difficulty
          }));

          return NextResponse.json({
            success: true,
            source: response.fallbackOccurred ? `${response.providerUsed}_fallback` : `${response.providerUsed}_ai`,
            providerUsed: response.providerUsed,
            modelUsed: response.modelUsed,
            difficulty,
            questions: sanitized
          });
        }
      }
    } catch (aiErr) {
      console.warn('Unified AI generation error, falling back to smart local engine:', aiErr);
    }

    // Fallback to smart local exam if AI is unavailable or rate limited
    const fallbackQuestions = generateLocalExam(config, extraVocab, extraGrammar);
    return NextResponse.json({
      success: true,
      source: 'smart_local_fallback',
      difficulty,
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
