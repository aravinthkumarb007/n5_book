import { NextResponse } from 'next/server';
import { updateRuntimeGroqConfig } from '@/services/groqService';
import { updateRuntimeGeminiConfig } from '@/services/geminiService';
import { getAllAiProviderStatuses, setActiveAiProvider, AiProvider } from '@/services/aiRouter';

export async function GET() {
  const statuses = getAllAiProviderStatuses();
  return NextResponse.json({
    ...statuses,
    // backward-compatibility fields for legacy callers
    configured: statuses.groq.configured || statuses.gemini.configured,
    model: statuses.activeProvider === 'gemini' ? statuses.gemini.model : statuses.groq.model,
    maskedKey: statuses.activeProvider === 'gemini' ? statuses.gemini.maskedKey : statuses.groq.maskedKey
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { provider = 'groq', apiKey, model, endpoint, enabled, activeProvider } = body;

    if (activeProvider && (activeProvider === 'groq' || activeProvider === 'gemini')) {
      setActiveAiProvider(activeProvider as AiProvider);
    }

    if (provider === 'gemini') {
      const updates: any = {};
      if (apiKey !== undefined) updates.apiKey = apiKey.trim();
      if (model !== undefined) updates.model = model.trim();
      if (endpoint !== undefined) updates.endpoint = endpoint.trim();
      if (enabled !== undefined) updates.enabled = Boolean(enabled);

      updateRuntimeGeminiConfig(updates);
    } else {
      const updates: any = {};
      if (apiKey !== undefined) updates.apiKey = apiKey.trim();
      if (model !== undefined) updates.model = model.trim();
      if (endpoint !== undefined) updates.endpoint = endpoint.trim();
      if (enabled !== undefined) updates.enabled = Boolean(enabled);

      updateRuntimeGroqConfig(updates);
    }

    const statuses = getAllAiProviderStatuses();

    return NextResponse.json({
      success: true,
      message: `${provider === 'gemini' ? 'Google Gemini' : 'Groq AI'} configuration updated successfully.`,
      ...statuses
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Invalid configuration payload' },
      { status: 400 }
    );
  }
}

  export async function DELETE(request: Request) {
    try {
      const { searchParams } = new URL(request.url);
      const provider = searchParams.get('provider');

      if (provider === 'gemini') {
        updateRuntimeGeminiConfig({ apiKey: '', enabled: false });
        return NextResponse.json({
          success: true,
          message: 'Google Gemini API key removed from server memory.'
        });
      } else if (provider === 'groq') {
        updateRuntimeGroqConfig({ apiKey: '', enabled: false });
        return NextResponse.json({
          success: true,
          message: 'Groq API key removed from server memory.'
        });
      } else {
        updateRuntimeGroqConfig({ apiKey: '', enabled: false });
        updateRuntimeGeminiConfig({ apiKey: '', enabled: false });
        return NextResponse.json({
          success: true,
          message: 'All AI provider keys removed from server memory.'
        });
      }
    } catch (err: any) {
      return NextResponse.json(
        { success: false, error: err.message || 'Failed to clear key' },
        { status: 500 }
      );
    }
  }
