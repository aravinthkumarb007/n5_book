import { NextResponse } from 'next/server';
import { ALL_MINNA_LESSONS } from '@/data/minnaNoNihongo';
import { execFile } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

export const dynamic = 'force-dynamic';

const execFileAsync = promisify(execFile);

export async function POST(request: Request) {
  let tempJsonPath: string | null = null;
  let tempPdfPath: string | null = null;

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

    // Retrieve canonical lesson data from curriculum
    const lesson = ALL_MINNA_LESSONS.find(l => l.lessonNumber === num);
    if (!lesson) {
      return NextResponse.json(
        { error: `Lesson ${num} not found in Minna no Nihongo curriculum.` },
        { status: 404 }
      );
    }

    // Assemble topics
    let topics: any[] = [];
    if (grammarData && Array.isArray(grammarData.topics) && grammarData.topics.length > 0) {
      topics = grammarData.topics;
    } else {
      // Build from lesson.grammar and curriculum exercises
      topics = lesson.grammar.map((g, idx) => {
        // Find relevant exercises from lesson.exercises if available
        const relevantExercises = (lesson.exercises || []).filter(
          ex => ex.prompt && (ex.prompt.toLowerCase().includes(g.title.toLowerCase()) || ex.type === 'mcq' || ex.type === 'fill_blank')
        );

        const practiceQuestions = relevantExercises.slice(0, 2).map((ex, exIdx) => {
          const opts = ex.options && ex.options.length >= 4 
            ? ex.options.map((o, oIdx) => `${String.fromCharCode(65 + oIdx)}) ${o}`)
            : [
                `A) ${ex.correctAnswer}`,
                'B) Incorrect particle',
                'C) Casual plain form',
                'D) Incorrect conjugation'
              ];
          
          return {
            question: ex.prompt,
            options: opts,
            correctAnswer: `A) ${ex.correctAnswer}`,
            explanation: ex.explanation || `Applies the grammar rule for ${g.title}.`
          };
        });

        return {
          topicId: g.id || `l${num}_g${idx + 1}`,
          topicName: g.title,
          grammarStructure: g.structure,
          simpleExplanation: g.explanation,
          stepByStepExplanation: g.rules && g.rules.length > 0 ? g.rules.join('\n') : '',
          japaneseExamples: (g.examples || []).map(ex => ({
            japanese: ex.japanese,
            furigana: ex.hiragana,
            romaji: ex.romaji,
            meaning: ex.english || ''
          })),
          practiceQuestions: practiceQuestions.length > 0 ? practiceQuestions : undefined
        };
      });
    }

    const payload = {
      lessonNumber: lesson.lessonNumber,
      title: lesson.title,
      titleJapanese: lesson.titleJapanese,
      description: lesson.description,
      topics,
      providerUsed: provider
    };

    // Prepare temp file paths
    const uniqueId = `pdf_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    tempJsonPath = path.join(os.tmpdir(), `${uniqueId}.json`);
    tempPdfPath = path.join(os.tmpdir(), `${uniqueId}.pdf`);

    // Write payload JSON
    await fs.writeFile(tempJsonPath, JSON.stringify(payload, null, 2), 'utf-8');

    // Locate Python generator script
    const scriptPath = path.join(process.cwd(), 'scripts', 'generate_interactive_grammar_pdf.py');

    // Execute Python script
    await execFileAsync('python', [
      scriptPath,
      '--payload', tempJsonPath,
      '--output', tempPdfPath
    ]);

    // Read generated PDF
    const pdfBuffer = await fs.readFile(tempPdfPath);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Lesson_${num}_Interactive_Grammar_Coach.pdf"`,
        'Content-Length': String(pdfBuffer.length)
      }
    });

  } catch (error: any) {
    console.error('Failed to export interactive grammar PDF:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate interactive PDF.' },
      { status: 500 }
    );
  } finally {
    // Clean up temporary files
    if (tempJsonPath) fs.unlink(tempJsonPath).catch(() => {});
    if (tempPdfPath) fs.unlink(tempPdfPath).catch(() => {});
  }
}
