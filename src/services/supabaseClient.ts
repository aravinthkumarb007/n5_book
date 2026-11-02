import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

function getSupabaseCredentials() {
  let url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
  let key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

  // Fallback: Read directly from .env.local if dev server hasn't been restarted
  if ((!url || !key) && typeof process !== 'undefined' && process.cwd) {
    try {
      const envPath = path.join(process.cwd(), '.env.local');
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        const urlMatch = content.match(/NEXT_PUBLIC_SUPABASE_URL\s*=\s*([^\r\n]+)/);
        const keyMatch = content.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY\s*=\s*([^\r\n]+)/);
        if (urlMatch && !url) url = urlMatch[1].trim().replace(/^['"]|['"]$/g, '');
        if (keyMatch && !key) key = keyMatch[1].trim().replace(/^['"]|['"]$/g, '');
      }
    } catch {}
  }

  return { url, key };
}

export function isSupabaseConfigured(): boolean {
  const { url, key } = getSupabaseCredentials();
  return Boolean(url && key);
}

export function getSupabaseClient() {
  const { url, key } = getSupabaseCredentials();
  if (!url || !key) {
    throw new Error('Supabase URL and Anon Key are not configured in .env.local');
  }
  return createClient(url, key);
}

export const supabase = isSupabaseConfigured()
  ? getSupabaseClient()
  : null;
