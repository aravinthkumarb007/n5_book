import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getServerSupabaseCredentials } from '@/services/serverSupabase';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const creds = getServerSupabaseCredentials();

    const targetUrl = (body.url || creds.url || '').trim();
    const targetKey = (body.anonKey || body.key || creds.key || '').trim();

    if (!targetUrl) {
      return NextResponse.json({
        success: false,
        error: 'Supabase Project URL is required. (e.g., https://your-project.supabase.co)'
      }, { status: 400 });
    }

    if (!targetKey) {
      return NextResponse.json({
        success: false,
        error: 'Supabase Anon / Public Key is required.'
      }, { status: 400 });
    }

    // Validate URL scheme
    try {
      const parsed = new URL(targetUrl);
      if (!parsed.protocol.startsWith('http')) {
        throw new Error('Must start with https://');
      }
    } catch {
      return NextResponse.json({
        success: false,
        error: 'Invalid Supabase URL format. URL must start with https://'
      }, { status: 400 });
    }

    const startTime = Date.now();
    const client = createClient(targetUrl, targetKey, {
      auth: { persistSession: false, autoRefreshToken: false }
    });

    // Test ping by querying user_kanji_progress or kanji
    const { data, error } = await client
      .from('user_kanji_progress')
      .select('count', { count: 'exact', head: true });

    const latencyMs = Date.now() - startTime;

    if (error) {
      // 42P01 or PGRST205 indicates table not yet created in PostgreSQL, but credentials & network connected!
      if (
        error.code === '42P01' || 
        error.code === 'PGRST205' || 
        error.message?.includes('does not exist') ||
        error.message?.includes('schema cache')
      ) {
        return NextResponse.json({
          success: true,
          message: 'Connection established to Supabase! (Database reachable; tables not yet initialized. Run schema.sql or click Seed Master Kanji below.)',
          tablesReady: false,
          latencyMs
        });
      }

      // Authentication or JWT errors
      if (
        error.code === 'PGRST301' || 
        error.message?.includes('JWT') || 
        error.message?.includes('apikey') || 
        error.message?.includes('Invalid') ||
        error.message?.includes('Unauthorized')
      ) {
        return NextResponse.json({
          success: false,
          error: `Authentication failed: ${error.message}. Please verify your Supabase Anon Key.`,
          latencyMs
        }, { status: 401 });
      }

      return NextResponse.json({
        success: false,
        error: error.message || 'Supabase query failed',
        latencyMs
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Connection to Supabase established successfully!',
      tablesReady: true,
      latencyMs
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Failed to connect to Supabase.'
    }, { status: 500 });
  }
}

