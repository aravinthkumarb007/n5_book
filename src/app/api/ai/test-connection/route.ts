import { NextResponse } from 'next/server';
import { callGroqChat, getEffectiveGroqConfig, updateRuntimeGroqConfig } from '@/services/groqService';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    if (body.apiKey) {
      updateRuntimeGroqConfig({
        apiKey: body.apiKey.trim(),
        model: body.model || undefined,
        endpoint: body.endpoint || undefined
      });
    }

    const config = getEffectiveGroqConfig();
    if (!config.apiKey) {
      return NextResponse.json(
        { success: false, error: 'No Groq API key provided or found in environment.' },
        { status: 400 }
      );
    }

    const startTime = Date.now();
    const result = await callGroqChat({
      messages: [
        {
          role: 'system',
          content: 'You are an AI Japanese Language Instructor. Respond concisely in JSON: {"status": "ok", "message": "接続完了 (Connection Established)"}'
        },
        {
          role: 'user',
          content: 'Verify API connection for N5 Kanji Master.'
        }
      ],
      max_tokens: 60,
      temperature: 0.1,
      timeoutMs: 10000
    });

    const latencyMs = Date.now() - startTime;

    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: result.error,
        latencyMs
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Connection to Groq AI established successfully!',
      model: result.modelUsed,
      latencyMs,
      responseSample: result.content
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Connection test failed.'
    }, { status: 500 });
  }
}
