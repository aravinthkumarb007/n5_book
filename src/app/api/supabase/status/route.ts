import { NextResponse } from 'next/server';
import { getServerSupabaseCredentials } from '@/services/serverSupabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { url, key } = getServerSupabaseCredentials();
  const configured = Boolean(url && key);
  const maskedUrl = url ? `${url.slice(0, 18)}...${url.slice(-8)}` : '';

  return NextResponse.json({
    configured,
    url: maskedUrl
  });
}
