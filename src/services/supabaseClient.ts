import { createClient } from '@supabase/supabase-js';

function getSupabaseCredentials() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  return { url, key };
}

export function isSupabaseConfigured(): boolean {
  const { url, key } = getSupabaseCredentials();
  return Boolean(url && key);
}

export function getSupabaseClient() {
  const { url, key } = getSupabaseCredentials();
  if (!url || !key) {
    throw new Error('Supabase URL and Anon Key are not configured');
  }
  return createClient(url, key);
}

export const supabase = isSupabaseConfigured()
  ? getSupabaseClient()
  : null;
