import { createClient } from '@supabase/supabase-js';

export function getSupabaseCredentials() {
  let url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  let key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

  // In browser, if env vars were not present at build time, check localStorage cache
  if ((!url || !key) && typeof window !== 'undefined' && window.localStorage) {
    try {
      const storedUrl = localStorage.getItem('supabase_runtime_url');
      const storedKey = localStorage.getItem('supabase_runtime_anon_key');
      if (storedUrl && !url) url = storedUrl;
      if (storedKey && !key) key = storedKey;
    } catch {}
  }

  return { url, key };
}

export function setClientSupabaseCredentials(url: string, key: string) {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      if (url && key) {
        localStorage.setItem('supabase_runtime_url', url);
        localStorage.setItem('supabase_runtime_anon_key', key);
      } else {
        localStorage.removeItem('supabase_runtime_url');
        localStorage.removeItem('supabase_runtime_anon_key');
      }
    } catch {}
  }
}

export function isSupabaseConfigured(): boolean {
  const { url, key } = getSupabaseCredentials();
  return Boolean(url && key);
}

let cachedClient: any = null;
let lastUrl = '';
let lastKey = '';

export function getSupabaseClient() {
  const { url, key } = getSupabaseCredentials();
  if (!url || !key) return null;
  if (cachedClient && lastUrl === url && lastKey === key) {
    return cachedClient;
  }
  cachedClient = createClient(url, key);
  lastUrl = url;
  lastKey = key;
  return cachedClient;
}

// Dynamic proxy so calls to supabase.from(...) work even after credentials are configured at runtime
export const supabase = new Proxy({} as any, {
  get(target, prop) {
    const client = getSupabaseClient();
    if (!client) return undefined;
    const value = (client as any)[prop];
    if (typeof value === 'function') {
      return value.bind(client);
    }
    return value;
  }
});
