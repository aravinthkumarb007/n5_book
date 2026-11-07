import { NextResponse } from 'next/server';
import { callGroqChat, getEffectiveGroqConfig, updateRuntimeGroqConfig } from '@/services/groqService';
import { callGeminiChat, getEffectiveGeminiConfig, updateRuntimeGeminiConfig } from '@/services/geminiService';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const provider = body.provider === 'gemini' ? 'gemini' : 'groq';

    if (provider === 'gemini') {
      const updates: any = {};
      if (body.apiKey) updates.apiKey = body.apiKey.trim();
      if (body.model) updates.model = body.model.trim();
      if (Object.keys(updates).length > 0) {
        updateRuntimeGeminiConfig(updates);
      }

      const config = getEffectiveGeminiConfig();
      if (!config.apiKey) {
        return NextResponse.json(
          { success: false, error: 'No Google Gemini API key provided or found in environment.' },
          { status: 400 }
        );
      }

      const startTime = Date.now();
      const result = await callGeminiChat({
        messages: [
          {
            role: 'system',
            content: 'You are an AI Japanese Language Instructor. Respond concisely in JSON: {"status": "ok", "provider": "gemini", "message": "Google Gemini 接続完了 (Connection Established)"}'
          },
          {
            role: 'user',
            content: 'Verify Google Gemini API connection for N5 Kanji Master.'
          }
        ],
        model: body.model || config.model,
        max_tokens: 100,
        temperature: 0.1,
        jsonMode: true,
        timeoutMs: 30000
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
        message: 'Connection to Google Gemini API established successfully!',
        model: result.modelUsed,
        latencyMs,
        provider: 'gemini',
        responseSample: result.content
      });
    } else {
      // Groq test
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
              content: 'You are an AI Japanese Language Instructor. Respond concisely in JSON: {"status": "ok", "provider": "groq", "message": "Groq AI 接続完了 (Connection Established)"}'
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
              provider: 'groq',
                responseSample: result.content
      });
    }
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Connection test failed.'
    }, { status: 500 });
  }
}
