import { NextResponse } from 'next/server';
import { ALL_MINNA_LESSONS } from '@/data/minnaNoNihongo';
import { generateGrammarPdfHtml, GrammarAiPayload } from '@/services/grammarPdfExport';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const {
      lessonNumber,
      provider = 'groq',
      grammarData = null
    } = body;

    const num = Number(lessonNumber);
    if (!num || num < 1 || num > 25) {
      return NextResponse.json(
        { error: 'Valid lessonNumber (1 to 25) is required.' },
        { status: 400 }
      );
    }

    const lesson = ALL_MINNA_LESSONS.find(l => l.lessonNumber === num);
    if (!lesson) {
      return NextResponse.json(
        { error: `Lesson ${num} not found in Minna no Nihongo curriculum.` },
        { status: 404 }
      );
    }

    let payload: GrammarAiPayload;
    if (grammarData && Array.isArray(grammarData.topics) && grammarData.topics.length > 0) {
      payload = grammarData;
    } else {
      payload = {
        lessonNumber: lesson.lessonNumber,
        lessonTitle: lesson.title,
        providerUsed: provider,
        generatedAt: new Date().toISOString(),
        topics: lesson.grammar.map((g, idx) => ({
          topicId: g.id || `l${num}_g${idx + 1}`,
          topicName: g.title,
          simpleExplanation: g.explanation,
          grammarStructure: g.structure,
          stepByStepExplanation: g.rules && g.rules.length > 0 ? g.rules.join('\n') : '',
          japaneseExamples: (g.examples || []).map(ex => ({
            japanese: ex.japanese,
            furigana: ex.hiragana,
            romaji: ex.romaji,
            meaning: ex.english || ''
          })),
          commonMistakes: g.commonMistakes || [
            `Confusing the particle role in "${g.structure}".`,
            'Using informal/casual endings instead of standard polite N5 forms.'
          ],
          learningTips: [
            `Practice speaking sentences with "${g.structure}" aloud to build fluency.`,
            'Review sentence patterns repeatedly to build natural Japanese speaking intuition.'
          ]
        }))
      };
    }

    // Generate pure Next.js / TypeScript self-contained interactive HTML document
    const html = generateGrammarPdfHtml(lesson, payload);

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, max-age=0'
      }
    });

  } catch (error: any) {
    console.error('Failed to export interactive grammar document:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate interactive document.' },
      { status: 500 }
    );
  }
}
