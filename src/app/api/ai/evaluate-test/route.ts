import { NextResponse } from 'next/server';
import { callGroqChat } from '@/services/groqService';
import { evaluateExamResults } from '@/services/minnaQuizEngine';
import { ExamAnswerLog } from '@/types/minna';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      examTitle = 'Minna Japanese Assessment',
      lessonNumbers = [1],
      answers = [],
      timeSpentSeconds = 60
    } = body;

    // First, compute the deterministic diagnostic
    const localResult = evaluateExamResults(examTitle, lessonNumbers, answers, timeSpentSeconds);

    // Call Groq AI for an advanced, personalized evaluation if errors exist
    const incorrectAnswers = (answers as ExamAnswerLog[]).filter(a => !a.isCorrect);

    if (incorrectAnswers.length > 0) {
      try {
        const systemPrompt = `You are an encouraging, expert Japanese tutor analyzing student exam errors on Minna no Nihongo.
Output a JSON object with:
{
  "summary": "1-2 sentence overall coaching summary",
  "strengths": ["string", "string"],
  "areasToImprove": ["string", "string"],
  "recommendations": ["string", "string"]
}`;

        const userPrompt = `Score: ${localResult.scorePercent}% (${localResult.correctCount}/${localResult.totalQuestions})
Lessons tested: ${lessonNumbers.join(', ')}
Incorrect answers sample:
${JSON.stringify(incorrectAnswers.slice(0, 5).map(a => ({
  prompt: a.prompt,
  userAnswer: a.userAnswer,
  correctAnswer: a.correctAnswer,
  category: a.category
})))}

Provide insightful, actionable study recommendations for this student.`;

        const response = await callGroqChat({
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.3,
          max_tokens: 800,
          response_format: { type: 'json_object' }
        });

        const parsed = JSON.parse(response.content);
        if (parsed.summary) {
          localResult.aiDiagnostic = {
            summary: parsed.summary,
            strengths: parsed.strengths || localResult.aiDiagnostic?.strengths || [],
            areasToImprove: parsed.areasToImprove || localResult.aiDiagnostic?.areasToImprove || [],
            recommendations: parsed.recommendations || localResult.aiDiagnostic?.recommendations || []
          };
        }
      } catch (aiErr) {
        console.warn('AI evaluation Groq call failed, keeping deterministic diagnostic:', aiErr);
      }
    }

    return NextResponse.json({
      success: true,
      result: localResult
    });

  } catch (error: any) {
    console.error('Evaluate test API error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to evaluate test' },
      { status: 500 }
    );
  }
}
