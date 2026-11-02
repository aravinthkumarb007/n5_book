import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

export function getServerSupabaseCredentials() {
  let url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
  let key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
            process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
            process.env.SUPABASE_ANON_KEY || 
            process.env.SUPABASE_KEY || '';

  // Fallback: Read directly from .env.local if dev server hasn't been restarted
  if ((!url || !key) && typeof process !== 'undefined' && process.cwd) {
    try {
      const envPath = path.resolve(process.cwd(), '.env.local');
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        const urlMatch = content.match(/(?:NEXT_PUBLIC_SUPABASE_URL|SUPABASE_URL)\s*=\s*([^\r\n]+)/);
        const keyMatch = content.match(/(?:NEXT_PUBLIC_SUPABASE_ANON_KEY|NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY|SUPABASE_KEY)\s*=\s*([^\r\n]+)/);
        if (urlMatch && !url) url = urlMatch[1].trim().replace(/^['"]|['"]$/g, '');
        if (keyMatch && !key) key = keyMatch[1].trim().replace(/^['"]|['"]$/g, '');
      }
    } catch (e) {
      console.warn('Error reading .env.local on server:', e);
    }
  }

  return { url, key };
}

export function isSupabaseConfigured(): boolean {
  const { url, key } = getServerSupabaseCredentials();
  return Boolean(url && key);
}

export function getServerSupabaseClient() {
  const { url, key } = getServerSupabaseCredentials();
  if (!url || !key) {
    throw new Error('Supabase URL and Anon Key are not configured in .env.local');
  }
  return createClient(url, key);
}
