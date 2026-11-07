// Server-side Groq AI Service
import fs from 'fs';
import path from 'path';

export interface GroqConfig {
  apiKey: string;
  model: string;
  endpoint: string;
  enabled: boolean;
}

// In-memory server-side storage for configured key
let runtimeConfig: Partial<GroqConfig> = {};

function readKeyFromEnvLocal(varName: string): string {
  if (typeof process !== 'undefined' && process.cwd) {
    try {
      const envPath = path.resolve(process.cwd(), '.env.local');
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        const match = content.match(new RegExp(`^[ \\t]*${varName}[ \\t]*=[ \\t]*(.+)$`, 'm'));
        if (match) return match[1].trim().replace(/^['"]|['"]$/g, '');
      }
    } catch {}
  }
  return '';
}

function persistToEnvLocal(varName: string, value: string) {
  if (typeof process !== 'undefined' && process.cwd) {
    try {
      const envPath = path.resolve(process.cwd(), '.env.local');
      let content = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
      if (value) {
        if (new RegExp(`^[ \\t]*${varName}=`, 'm').test(content)) {
          content = content.replace(new RegExp(`^[ \\t]*${varName}=[^\r\n]*`, 'm'), `${varName}=${value}`);
        } else {
          content += `\n${varName}=${value}`;
        }
      } else {
        content = content.replace(new RegExp(`^[ \\t]*${varName}=[^\r\n]*[\r\n]?`, 'm'), '');
      }
      fs.writeFileSync(envPath, content.trim() + '\n', 'utf8');
    } catch (e) {
      console.warn(`Could not persist ${varName} to .env.local:`, e);
    }
  }
}

export function getEffectiveGroqConfig(): GroqConfig {
  let apiKey = runtimeConfig.apiKey || process.env.GROQ_API_KEY || '';
  if (!apiKey) apiKey = readKeyFromEnvLocal('GROQ_API_KEY');

  let model = runtimeConfig.model || process.env.GROQ_MODEL || '';
  if (!model) model = readKeyFromEnvLocal('GROQ_MODEL') || 'qwen/qwen3.8-27b';

  const endpoint = runtimeConfig.endpoint || process.env.GROQ_ENDPOINT || 'https://api.groq.com/openai/v1/chat/completions';
  const enabled = runtimeConfig.enabled !== undefined ? runtimeConfig.enabled : Boolean(apiKey);

  return { apiKey: apiKey.trim(), model: model.trim(), endpoint, enabled };
}

export function updateRuntimeGroqConfig(newConfig: Partial<GroqConfig>) {
  runtimeConfig = { ...runtimeConfig, ...newConfig };
  if (newConfig.apiKey !== undefined) {
    process.env.GROQ_API_KEY = newConfig.apiKey;
    persistToEnvLocal('GROQ_API_KEY', newConfig.apiKey);
  }
  if (newConfig.model !== undefined) {
    process.env.GROQ_MODEL = newConfig.model;
    persistToEnvLocal('GROQ_MODEL', newConfig.model);
  }
}

export function clearRuntimeGroqConfig() {
  runtimeConfig = { apiKey: '', enabled: false };
  delete process.env.GROQ_API_KEY;
  persistToEnvLocal('GROQ_API_KEY', '');
}

export function maskApiKey(key: string): string {
  if (!key) return '';
  if (key.length <= 8) return '********';
  return `${key.slice(0, 4)}...${key.slice(-4)}`;
}

export interface GroqChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface GroqChatOptions {
  messages: GroqChatMessage[];
  temperature?: number;
  max_tokens?: number;
  response_format?: { type: 'json_object' | 'text' };
  timeoutMs?: number;
}

/**
 * Execute Groq API Call securely on the server
 */
export async function callGroqChat(options: GroqChatOptions): Promise<{
  success: boolean;
  content: string;
  error?: string;
  modelUsed?: string;
  tokensUsed?: number;
}> {
  const config = getEffectiveGroqConfig();

  if (!config.apiKey) {
    return {
      success: false,
      content: '',
      error: 'Groq API Key is not configured. Please add your GROQ_API_KEY in Settings or .env file.'
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options.timeoutMs || 20000);

  try {
    const payload: any = {
      model: config.model,
      messages: options.messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.max_tokens ?? 1024
    };

    if (options.response_format) {
      payload.response_format = options.response_format;
    }

    const response = await fetch(config.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey.trim()}`
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errBody = await response.text();
      let parsedMsg = `Groq API responded with status ${response.status}`;
      try {
        const jsonErr = JSON.parse(errBody);
        if (jsonErr.error && jsonErr.error.message) {
          parsedMsg = jsonErr.error.message;
        }
      } catch {}
      return { success: false, content: '', error: parsedMsg };
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';
    const tokensUsed = data.usage?.total_tokens;

    return {
      success: true,
      content,
      modelUsed: data.model || config.model,
      tokensUsed
    };
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      return { success: false, content: '', error: 'Groq API request timed out (20s limit).' };
    }
    return { success: false, content: '', error: err.message || 'Unknown network error calling Groq API.' };
  }
}
