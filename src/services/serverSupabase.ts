import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// In-memory server-side storage for runtime configured Supabase credentials
let runtimeSupabaseConfig: { url: string; key: string } = {
  url: '',
  key: ''
};

export function getServerSupabaseCredentials(req?: Request) {
  let url = (req ? (req.headers.get('x-supabase-url') || '') : '') ||
            runtimeSupabaseConfig.url || 
            process.env.NEXT_PUBLIC_SUPABASE_URL || 
            process.env.SUPABASE_URL || '';

  let key = (req ? (req.headers.get('x-supabase-key') || req.headers.get('x-supabase-anon-key') || '') : '') ||
            runtimeSupabaseConfig.key || 
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
            process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
            process.env.SUPABASE_ANON_KEY || 
            process.env.SUPABASE_KEY || '';

  // Fallback: Read directly from .env.local if dev server hasn't been restarted
  if ((!url || !key) && typeof process !== 'undefined' && process.cwd) {
    try {
      const envPath = path.resolve(process.cwd(), '.env.local');
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        const urlMatch = content.match(/^[ \t]*(?:NEXT_PUBLIC_SUPABASE_URL|SUPABASE_URL)[ \t]*=[ \t]*(.+)$/m);
        const keyMatch = content.match(/^[ \t]*(?:NEXT_PUBLIC_SUPABASE_ANON_KEY|NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY|SUPABASE_ANON_KEY|SUPABASE_KEY)[ \t]*=[ \t]*(.+)$/m);
        if (urlMatch && !url) url = urlMatch[1].trim().replace(/^['"]|['"]$/g, '');
        if (keyMatch && !key) key = keyMatch[1].trim().replace(/^['"]|['"]$/g, '');
      }
    } catch (e) {
      console.warn('Error reading .env.local on server:', e);
    }
  }

  return { url: url.trim(), key: key.trim() };
}

export function isSupabaseConfigured(req?: Request): boolean {
  const { url, key } = getServerSupabaseCredentials(req);
  return Boolean(url && key);
}

export function getServerSupabaseClient(reqOrUrl?: Request | string, overrideKey?: string) {
  let url = '';
  let key = '';

  if (typeof reqOrUrl === 'string') {
    url = reqOrUrl;
    key = overrideKey || '';
  } else if (reqOrUrl && (reqOrUrl instanceof Request || typeof (reqOrUrl as any).headers?.get === 'function')) {
    const creds = getServerSupabaseCredentials(reqOrUrl as Request);
    url = creds.url;
    key = creds.key;
  } else {
    const creds = getServerSupabaseCredentials();
    url = creds.url;
    key = creds.key;
  }

  if (!url || !key) {
    throw new Error('Supabase URL and Anon Key are not configured');
  }
  return createClient(url, key);
}

export function updateRuntimeSupabaseConfig(config: { url?: string; key?: string }) {
  if (config.url !== undefined) {
    const trimmedUrl = config.url.trim();
    runtimeSupabaseConfig.url = trimmedUrl;
    process.env.NEXT_PUBLIC_SUPABASE_URL = trimmedUrl;
    process.env.SUPABASE_URL = trimmedUrl;
  }

  if (config.key !== undefined) {
    const trimmedKey = config.key.trim();
    runtimeSupabaseConfig.key = trimmedKey;
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = trimmedKey;
    process.env.SUPABASE_ANON_KEY = trimmedKey;
  }

  // Persist to .env.local so credentials persist across dev server restarts
  if (typeof process !== 'undefined' && process.cwd) {
    try {
      const envPath = path.resolve(process.cwd(), '.env.local');
      let content = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';

      const effectiveUrl = runtimeSupabaseConfig.url || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
      const effectiveKey = runtimeSupabaseConfig.key || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

      if (effectiveUrl) {
        if (/^[ \t]*NEXT_PUBLIC_SUPABASE_URL=/m.test(content)) {
          content = content.replace(/^[ \t]*NEXT_PUBLIC_SUPABASE_URL=[^\r\n]*/m, `NEXT_PUBLIC_SUPABASE_URL=${effectiveUrl}`);
        } else {
          content += `\nNEXT_PUBLIC_SUPABASE_URL=${effectiveUrl}`;
        }
      }

      if (effectiveKey) {
        if (/^[ \t]*NEXT_PUBLIC_SUPABASE_ANON_KEY=/m.test(content)) {
          content = content.replace(/^[ \t]*NEXT_PUBLIC_SUPABASE_ANON_KEY=[^\r\n]*/m, `NEXT_PUBLIC_SUPABASE_ANON_KEY=${effectiveKey}`);
        } else {
          content += `\nNEXT_PUBLIC_SUPABASE_ANON_KEY=${effectiveKey}`;
        }
      }

      fs.writeFileSync(envPath, content.trim() + '\n', 'utf8');
    } catch (err) {
      console.warn('Could not persist Supabase credentials to .env.local:', err);
    }
  }
}

export function clearRuntimeSupabaseConfig() {
  runtimeSupabaseConfig = { url: '', key: '' };
  delete process.env.NEXT_PUBLIC_SUPABASE_URL;
  delete process.env.SUPABASE_URL;
  delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  delete process.env.SUPABASE_ANON_KEY;

  if (typeof process !== 'undefined' && process.cwd) {
    try {
      const envPath = path.resolve(process.cwd(), '.env.local');
      if (fs.existsSync(envPath)) {
        let content = fs.readFileSync(envPath, 'utf8');
        content = content.replace(/^[ \t]*NEXT_PUBLIC_SUPABASE_URL=[^\r\n]*/gm, 'NEXT_PUBLIC_SUPABASE_URL=');
        content = content.replace(/^[ \t]*NEXT_PUBLIC_SUPABASE_ANON_KEY=[^\r\n]*/gm, 'NEXT_PUBLIC_SUPABASE_ANON_KEY=');
        content = content.replace(/^[ \t]*SUPABASE_URL=[^\r\n]*/gm, 'SUPABASE_URL=');
        content = content.replace(/^[ \t]*SUPABASE_ANON_KEY=[^\r\n]*/gm, 'SUPABASE_ANON_KEY=');
        fs.writeFileSync(envPath, content.trim() + '\n', 'utf8');
      }
    } catch (err) {
      console.warn('Could not clear Supabase credentials from .env.local:', err);
    }
  }
}

export function maskSupabaseUrl(url: string): string {
  if (!url) return '';
  try {
    const parsed = new URL(url);
    const host = parsed.hostname; // e.g. abcdefghijkl.supabase.co
    const parts = host.split('.');
    if (parts.length >= 3) {
      const projectRef = parts[0];
      const domain = parts.slice(1).join('.');
      const maskedRef = projectRef.length > 6 
        ? `${projectRef.slice(0, 4)}...${projectRef.slice(-2)}` 
        : projectRef;
      return `${parsed.protocol}//${maskedRef}.${domain}`;
    }
    return `${parsed.protocol}//${host}`;
  } catch {
    if (url.length <= 16) return url;
    return `${url.slice(0, 10)}...${url.slice(-6)}`;
  }
}

export function maskSupabaseKey(key: string): string {
  if (!key) return '';
  if (key.length <= 12) return '********';
  return `${key.slice(0, 6)}...${key.slice(-4)}`;
}
