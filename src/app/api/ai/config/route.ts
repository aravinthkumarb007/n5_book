import { NextResponse } from 'next/server';
import { getEffectiveGroqConfig, maskApiKey, updateRuntimeGroqConfig } from '@/services/groqService';

export async function GET() {
  const config = getEffectiveGroqConfig();
  return NextResponse.json({
    configured: Boolean(config.apiKey),
    maskedKey: maskApiKey(config.apiKey),
    model: config.model,
    endpoint: config.endpoint,
    enabled: config.enabled,
    provider: 'groq'
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { apiKey, model, endpoint, enabled } = body;

    const updates: any = {};
    if (apiKey !== undefined) updates.apiKey = apiKey.trim();
    if (model !== undefined) updates.model = model.trim();
    if (endpoint !== undefined) updates.endpoint = endpoint.trim();
    if (enabled !== undefined) updates.enabled = Boolean(enabled);

    updateRuntimeGroqConfig(updates);
    const updated = getEffectiveGroqConfig();

    return NextResponse.json({
      success: true,
      message: 'API configuration updated successfully.',
      configured: Boolean(updated.apiKey),
      maskedKey: maskApiKey(updated.apiKey),
      model: updated.model,
      endpoint: updated.endpoint,
      enabled: updated.enabled
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Invalid configuration payload' },
      { status: 400 }
    );
  }
}

export async function DELETE() {
  updateRuntimeGroqConfig({ apiKey: '', enabled: false });
  return NextResponse.json({
    success: true,
    message: 'API key removed from server memory.'
  });
}
