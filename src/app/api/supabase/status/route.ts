import { NextResponse } from 'next/server';
import { 
  getServerSupabaseCredentials, 
  updateRuntimeSupabaseConfig, 
  clearRuntimeSupabaseConfig, 
  maskSupabaseUrl, 
  maskSupabaseKey 
} from '@/services/serverSupabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { url, key } = getServerSupabaseCredentials();
  const configured = Boolean(url && key);

  return NextResponse.json({
    configured,
    url: maskSupabaseUrl(url),
    rawUrl: url || '',
    maskedKey: maskSupabaseKey(key),
    hasKey: Boolean(key)
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, anonKey, key } = body;
    const effectiveKey = anonKey || key;

    const updates: { url?: string; key?: string } = {};
    if (url !== undefined) updates.url = url.trim();
    if (effectiveKey !== undefined) updates.key = effectiveKey.trim();

    updateRuntimeSupabaseConfig(updates);
    const creds = getServerSupabaseCredentials();

    return NextResponse.json({
      success: true,
      message: 'Supabase configuration saved successfully.',
      configured: Boolean(creds.url && creds.key),
      url: maskSupabaseUrl(creds.url),
      maskedKey: maskSupabaseKey(creds.key)
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Invalid configuration payload' },
      { status: 400 }
    );
  }
}

export async function DELETE() {
  clearRuntimeSupabaseConfig();
  return NextResponse.json({
    success: true,
    message: 'Supabase credentials removed from server configuration.',
    configured: false
  });
}
