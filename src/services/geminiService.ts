// Server-side Google Gemini AI Service
import fs from 'fs';
import path from 'path';

export interface GeminiConfig {
  apiKey: string;
  model: string;
  endpoint: string;
  enabled: boolean;
}

// In-memory server-side storage for configured Gemini key
let runtimeGeminiConfig: Partial<GeminiConfig> = {};

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

export const GEMINI_AVAILABLE_MODELS = [
  {
    id: 'gemini-3.5-flash',
    name: 'Gemini 3.5 Flash (Recommended • High Speed & Stability)',
    description: 'Ultra-fast, reliable response times with free tier quota. Perfect for quizzes.'
  },
  {
    id: 'gemini-3.5-flash-lite',
    name: 'Gemini 3.5 Flash Lite (Fastest Latency)',
    description: 'Lightweight and fastest response time for rapid question generation.'
  },
  {
    id: 'gemini-3.8-flash',
    name: 'Gemini 3.8 Flash (Deep Reasoning Flagship)',
    description: 'Latest advanced reasoning model from Google AI.'
  }
];

export function getEffectiveGeminiConfig(): GeminiConfig {
  let apiKey = runtimeGeminiConfig.apiKey || process.env.GEMINI_API_KEY || '';
  if (!apiKey) apiKey = readKeyFromEnvLocal('GEMINI_API_KEY');

  let model = runtimeGeminiConfig.model || process.env.GEMINI_MODEL || '';
  if (!model) model = readKeyFromEnvLocal('GEMINI_MODEL') || 'gemini-3.5-flash';

  const endpoint = runtimeGeminiConfig.endpoint || process.env.GEMINI_ENDPOINT || 'https://generativelanguage.googleapis.com/v1beta';
  const enabled = runtimeGeminiConfig.enabled !== undefined ? runtimeGeminiConfig.enabled : Boolean(apiKey);

  return { apiKey: apiKey.trim(), model: model.trim(), endpoint, enabled };
}

export function updateRuntimeGeminiConfig(newConfig: Partial<GeminiConfig>) {
  runtimeGeminiConfig = { ...runtimeGeminiConfig, ...newConfig };
  if (newConfig.apiKey !== undefined) {
    process.env.GEMINI_API_KEY = newConfig.apiKey;
    persistToEnvLocal('GEMINI_API_KEY', newConfig.apiKey);
  }
  if (newConfig.model !== undefined) {
    process.env.GEMINI_MODEL = newConfig.model;
    persistToEnvLocal('GEMINI_MODEL', newConfig.model);
  }
}

export function clearRuntimeGeminiConfig() {
  runtimeGeminiConfig = { apiKey: '', enabled: false };
  delete process.env.GEMINI_API_KEY;
  persistToEnvLocal('GEMINI_API_KEY', '');
}

export function maskGeminiApiKey(key: string): string {
  if (!key) return '';
  if (key.length <= 8) return '********';
  return `${key.slice(0, 4)}...${key.slice(-4)}`;
}

export interface GeminiChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface GeminiChatOptions {
  messages: GeminiChatMessage[];
  model?: string;
  temperature?: number;
  max_tokens?: number;
  jsonMode?: boolean;
  timeoutMs?: number;
}

/**
 * Execute Google Gemini API Call securely on the server
 */
export async function callGeminiChat(options: GeminiChatOptions): Promise<{
  success: boolean;
  content: string;
  error?: string;
  modelUsed?: string;
  tokensUsed?: number;
}> {
  const config = getEffectiveGeminiConfig();

  if (!config.apiKey) {
    return {
      success: false,
      content: '',
      error: 'Google Gemini API Key is not configured. Please add your GEMINI_API_KEY in Settings or .env file.'
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options.timeoutMs || 25000);

  try {
    // Separate system instructions from conversation turns
    const systemMessages = options.messages.filter(m => m.role === 'system');
    const conversationMessages = options.messages.filter(m => m.role !== 'system');

    // Build systemInstruction if provided
    let systemInstruction: any = undefined;
    if (systemMessages.length > 0) {
      systemInstruction = {
        parts: systemMessages.map(m => ({ text: m.content }))
      };
    }

    // Build contents array in Gemini format
    const contents: any[] = conversationMessages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    // If no user message was provided, create one from system messages
    if (contents.length === 0 && systemMessages.length > 0) {
      contents.push({
        role: 'user',
        parts: [{ text: 'Please proceed with the instructions above.' }]
      });
    }

    // Generation configuration
    const generationConfig: any = {
      temperature: options.temperature ?? 0.3,
      maxOutputTokens: options.max_tokens ?? 2048,
      thinkingConfig: {
        thinkingBudget: 0
      }
    };

    if (options.jsonMode) {
      generationConfig.responseMimeType = 'application/json';
    }

    const rawModel = options.model || config.model || 'gemini-2.0-flash';
    const targetModel = rawModel.replace(/^models\//, '');
    const baseUrl = config.endpoint.replace(/\/+$/, '');
    const apiUrl = `${baseUrl}/models/${targetModel}:generateContent?key=${encodeURIComponent(config.apiKey.trim())}`;

    const payload: any = {
      contents,
      generationConfig
    };

    if (systemInstruction) {
      payload.systemInstruction = systemInstruction;
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': config.apiKey.trim()
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errBody = await response.text();
      console.error('[Google Gemini API Response]', response.status, errBody);
      let parsedMsg = `Gemini API error (${response.status}): ${errBody}`;
      try {
        const jsonErr = JSON.parse(errBody);
        if (jsonErr.error && jsonErr.error.message) {
          parsedMsg = jsonErr.error.message;
        }
      } catch {}

      if (response.status === 400 && (parsedMsg.includes('API_KEY_INVALID') || parsedMsg.includes('API key not valid'))) {
        parsedMsg = 'Invalid Gemini API key. Please check your key at https://aistudio.google.com/app/apikey';
      } else if (response.status === 429) {
        parsedMsg = 'Gemini free-tier rate limit reached. Please wait a moment or switch to Groq AI.';
      } else if (response.status === 404) {
        parsedMsg = `Gemini model "${targetModel}" not found or not supported for this API key. Google error: ${parsedMsg}`;
      }

      return { success: false, content: '', error: parsedMsg };
    }

    const data = await response.json();
    
    // Extract candidate text
    const candidate = data.candidates?.[0];
    const parts = candidate?.content?.parts;
    let content = '';

    if (parts && Array.isArray(parts)) {
      content = parts.map(p => p.text || '').join('');
    }

    const tokensUsed = data.usageMetadata?.totalTokenCount;

    return {
      success: true,
      content,
      modelUsed: targetModel,
      tokensUsed
    };
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      return { success: false, content: '', error: 'Google Gemini API request timed out (25s limit).' };
    }
    return { success: false, content: '', error: err.message || 'Unknown network error calling Google Gemini API.' };
  }
}

