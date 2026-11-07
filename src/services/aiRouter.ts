// Server-side Unified AI Router (Groq + Google Gemini)
import { callGroqChat, getEffectiveGroqConfig, maskApiKey } from '@/services/groqService';
import { callGeminiChat, getEffectiveGeminiConfig, maskGeminiApiKey, GEMINI_AVAILABLE_MODELS } from '@/services/geminiService';

export type AiProvider = 'groq' | 'gemini';

let globalActiveProvider: AiProvider = 'groq';

export function getActiveAiProvider(): AiProvider {
  const groq = getEffectiveGroqConfig();
  const gemini = getEffectiveGeminiConfig();

  // If user selected Gemini and Gemini has a key, use Gemini
  if (globalActiveProvider === 'gemini' && gemini.apiKey) {
    return 'gemini';
  }
  // If Groq has a key, use Groq
  if (groq.apiKey) {
    return 'groq';
  }
  // If only Gemini has a key, use Gemini
  if (gemini.apiKey) {
    return 'gemini';
  }
  return globalActiveProvider;
}

export function setActiveAiProvider(provider: AiProvider) {
  globalActiveProvider = provider;
}

export interface UnifiedChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface UnifiedChatOptions {
  messages: UnifiedChatMessage[];
  provider?: AiProvider;
  temperature?: number;
  max_tokens?: number;
  jsonMode?: boolean;
  timeoutMs?: number;
  allowFallback?: boolean;
}

export interface UnifiedChatResult {
  success: boolean;
  content: string;
  providerUsed: AiProvider;
  modelUsed?: string;
  tokensUsed?: number;
  error?: string;
  fallbackOccurred?: boolean;
}

/**
 * Route chat completion to Groq or Google Gemini with intelligent fallback
 */
export async function callUnifiedAi(options: UnifiedChatOptions): Promise<UnifiedChatResult> {
  const preferredProvider = options.provider || getActiveAiProvider();
  const allowFallback = options.allowFallback !== false; // default true

  // Try preferred provider first
  if (preferredProvider === 'gemini') {
    const geminiRes = await callGeminiChat({
      messages: options.messages,
      temperature: options.temperature,
      max_tokens: options.max_tokens,
      jsonMode: options.jsonMode,
      timeoutMs: options.timeoutMs
    });

    if (geminiRes.success) {
      return {
        success: true,
        content: geminiRes.content,
        providerUsed: 'gemini',
        modelUsed: geminiRes.modelUsed,
        tokensUsed: geminiRes.tokensUsed
      };
    }

    // Attempt fallback to Groq if enabled and Groq key is present
    const groqConfig = getEffectiveGroqConfig();
    if (allowFallback && groqConfig.apiKey) {
      console.warn(`[AI Router] Gemini call failed (${geminiRes.error}), attempting fallback to Groq...`);
      const groqRes = await callGroqChat({
        messages: options.messages,
        temperature: options.temperature,
        max_tokens: options.max_tokens,
        response_format: options.jsonMode ? { type: 'json_object' } : undefined,
        timeoutMs: options.timeoutMs
      });

      if (groqRes.success) {
        return {
          success: true,
          content: groqRes.content,
          providerUsed: 'groq',
          modelUsed: groqRes.modelUsed,
          tokensUsed: groqRes.tokensUsed,
          fallbackOccurred: true
        };
      }
    }

    return {
      success: false,
      content: '',
      providerUsed: 'gemini',
      error: geminiRes.error
    };
  } else {
    // Default to Groq
    const groqRes = await callGroqChat({
      messages: options.messages,
      temperature: options.temperature,
      max_tokens: options.max_tokens,
      response_format: options.jsonMode ? { type: 'json_object' } : undefined,
      timeoutMs: options.timeoutMs
    });

    if (groqRes.success) {
      return {
        success: true,
        content: groqRes.content,
        providerUsed: 'groq',
        modelUsed: groqRes.modelUsed,
        tokensUsed: groqRes.tokensUsed
      };
    }

    // Attempt fallback to Gemini if enabled and Gemini key is present
    const geminiConfig = getEffectiveGeminiConfig();
    if (allowFallback && geminiConfig.apiKey) {
      console.warn(`[AI Router] Groq call failed (${groqRes.error}), attempting fallback to Google Gemini...`);
      const geminiRes = await callGeminiChat({
        messages: options.messages,
        temperature: options.temperature,
        max_tokens: options.max_tokens,
        jsonMode: options.jsonMode,
        timeoutMs: options.timeoutMs
      });

      if (geminiRes.success) {
        return {
          success: true,
          content: geminiRes.content,
          providerUsed: 'gemini',
          modelUsed: geminiRes.modelUsed,
          tokensUsed: geminiRes.tokensUsed,
          fallbackOccurred: true
        };
      }
    }

    return {
      success: false,
      content: '',
      providerUsed: 'groq',
      error: groqRes.error
    };
  }
}

export function getAllAiProviderStatuses() {
  const groq = getEffectiveGroqConfig();
  const gemini = getEffectiveGeminiConfig();
  const active = getActiveAiProvider();

  return {
    activeProvider: active,
    groq: {
      configured: Boolean(groq.apiKey),
      maskedKey: maskApiKey(groq.apiKey),
      model: groq.model,
      endpoint: groq.endpoint,
      enabled: groq.enabled
    },
    gemini: {
      configured: Boolean(gemini.apiKey),
      maskedKey: maskGeminiApiKey(gemini.apiKey),
      model: gemini.model,
      endpoint: gemini.endpoint,
      enabled: gemini.enabled,
      availableModels: GEMINI_AVAILABLE_MODELS
    }
  };
}

