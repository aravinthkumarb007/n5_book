// Server-side Unified AI Router (Groq + Google Gemini)
import fs from 'fs';
import path from 'path';
import { callGroqChat, getEffectiveGroqConfig, maskApiKey } from '@/services/groqService';
import { callGeminiChat, getEffectiveGeminiConfig, maskGeminiApiKey, GEMINI_AVAILABLE_MODELS } from '@/services/geminiService';

export type AiProvider = 'groq' | 'gemini';
export type AiPromptContext = 'chat' | 'enrichment' | 'evaluation' | 'exam';

let globalActiveProvider: AiProvider | null = null;

function readActiveProviderFromEnv(): AiProvider | null {
  if (typeof process !== 'undefined') {
    if (process.env.ACTIVE_AI_PROVIDER === 'gemini' || process.env.ACTIVE_AI_PROVIDER === 'groq') {
      return process.env.ACTIVE_AI_PROVIDER as AiProvider;
    }
    if (process.cwd) {
      try {
        const envPath = path.resolve(process.cwd(), '.env.local');
        if (fs.existsSync(envPath)) {
          const content = fs.readFileSync(envPath, 'utf8');
          const match = content.match(/^[ \t]*ACTIVE_AI_PROVIDER[ \t]*=[ \t]*(.+)$/m);
          if (match) {
            const val = match[1].trim().replace(/^['"]|['"]$/g, '');
            if (val === 'gemini' || val === 'groq') return val as AiProvider;
          }
        }
      } catch {}
    }
  }
  return null;
}

function persistActiveProviderToEnv(provider: AiProvider) {
  if (typeof process !== 'undefined') {
    process.env.ACTIVE_AI_PROVIDER = provider;
    if (process.cwd) {
      try {
        const envPath = path.resolve(process.cwd(), '.env.local');
        let content = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
        if (new RegExp(`^[ \\t]*ACTIVE_AI_PROVIDER=`, 'm').test(content)) {
          content = content.replace(/^[ \t]*ACTIVE_AI_PROVIDER=[^\r\n]*/m, `ACTIVE_AI_PROVIDER=${provider}`);
        } else {
          content += `\nACTIVE_AI_PROVIDER=${provider}`;
        }
        fs.writeFileSync(envPath, content.trim() + '\n', 'utf8');
      } catch (e) {
        console.warn('[AI Router] Could not persist ACTIVE_AI_PROVIDER to .env.local:', e);
      }
    }
  }
}

export function getActiveAiProvider(): AiProvider {
  if (!globalActiveProvider) {
    const fromEnv = readActiveProviderFromEnv();
    if (fromEnv) {
      globalActiveProvider = fromEnv;
    }
  }

  if (globalActiveProvider) {
    return globalActiveProvider;
  }

  const groq = getEffectiveGroqConfig();
  const gemini = getEffectiveGeminiConfig();

  if (gemini.apiKey && !groq.apiKey) {
    return 'gemini';
  }
  return 'groq';
}

export function setActiveAiProvider(provider: AiProvider) {
  globalActiveProvider = provider;
  persistActiveProviderToEnv(provider);
}

/**
 * Resolves the effective provider to use:
 * Uses explicitly requested provider if valid ('groq' or 'gemini'),
 * otherwise falls back to the user-selected active provider from Settings.
 */
export function resolveEffectiveProvider(requestedProvider?: string): AiProvider {
  if (requestedProvider === 'gemini' || requestedProvider === 'groq') {
    return requestedProvider;
  }
  return getActiveAiProvider();
}

/**
 * Returns strict language and script formatting instructions based on the selected AI provider.
 * - Groq API: All output and educational explanations strictly in English only. No Tanglish.
 * - Gemini Flash API: Educational explanations must be in natural conversational Tanglish (Tamil words written phonetically using the English/Latin alphabet). No Tamil script.
 * - Exams & Quizzes: Questions, options, prompts, and context sentences ALWAYS stay in English/Japanese. Only the "explanation" field switches to Tanglish for Gemini.
 */
export function getAiLanguageInstructions(provider: AiProvider, context: AiPromptContext): string {
  if (provider === 'gemini') {
    switch (context) {
      case 'exam':
        return `CRITICAL LANGUAGE & SCRIPT RULES FOR GEMINI (TANGLISH EXPLANATIONS ONLY):
1. QUESTIONS, MULTIPLE-CHOICE OPTIONS, INSTRUCTIONS, AND CONTEXT SENTENCES MUST BE IN ENGLISH & JAPANESE:
   - All question prompts ("prompt"), secondary instructions ("secondaryPrompt", "subPrompt"), context sentences ("contextSentence", "contextPassage"), and multiple-choice options ("options") MUST ALWAYS remain in standard English (and Japanese with Furigana).
   - STRICT REQUIREMENT: NEVER translate questions, instructions, or multiple-choice options into Tanglish or Tamil!
2. ONLY THE "explanation" FIELD MUST BE IN CONVERSATIONAL TANGLISH:
   - Write the post-answer educational "explanation" in natural, easy-to-understand conversational Tanglish (Tamil words typed phonetically using English/Latin alphabet letters).
   - Tanglish style example: "'She' singular subject ah irukkuradhunaala present tense la verb kooda 's' add pannanum. Inga indha kanji Kunyomi reading standalone word ah varumbodhu dhaan use aagum. Distractor options la irukkura readings incorrect."
   - STRICT PROHIBITION: DO NOT use Tamil script (never use தமிழ் எழுத்துக்கள்). ONLY use English/Latin letters for Tamil words.
   - Preserve all Japanese script (Kanji, Furigana 漢字[かんじ], Romaji) and standard grammatical terms (subject, verb, particle, Onyomi, Kunyomi) accurately.`;

      case 'chat':
        return `CRITICAL LANGUAGE & SCRIPT RULES FOR GEMINI (CONVERSATIONAL TANGLISH TUTOR):
1. Provide all tutoring explanations, grammar guides, learning advice, feedback, and conversational coaching in natural, friendly Tanglish (Tamil spoken words typed phonetically using English/Latin alphabet letters).
2. Tanglish style example: "Vanakkam! Indha concept romba simple. 'She' singular subject ah irukkuradhunaala, present simple tense la verb kooda 's' illa 'es' add pannanum. Japanese la Onyomi Chinese-derived compound words kooda use aagum, Kunyomi native Japanese standalone word ah varumbodhu use aagum..."
3. STRICT PROHIBITION: DO NOT use Tamil script (never write தமிழ் எழுத்துக்கள்). Use ONLY the English/Latin alphabet to write Tamil words.
4. Keep all Japanese characters (Kanji, Hiragana, Katakana, Furigana), Romaji, and technical grammatical terms (e.g. Onyomi, Kunyomi, particle, subject, verb, te-form) in their proper standard formats.`;

      case 'enrichment':
        return `CRITICAL LANGUAGE & SCRIPT RULES FOR GEMINI (TANGLISH EDUCATIONAL CONTENT):
1. The educational explanation fields ("etymology_and_origin", "memory_mnemonic", "reading_guidance", "office_context_tip") MUST be written in natural, engaging Tanglish (Tamil words written phonetically using the English/Latin alphabet).
2. For "bonus_sentences": Keep "japanese", "hiragana", and "romaji" in standard Japanese, and provide clear translation in "english".
3. STRICT PROHIBITION: DO NOT use Tamil script (never use தமிழ் எழுத்துக்கள்). Use ONLY the English/Latin alphabet for Tamil words.
4. Retain Japanese words, Kanji, Furigana, and linguistic terms (Onyomi, Kunyomi, radical) in their appropriate formats.`;

      case 'evaluation':
        return `CRITICAL LANGUAGE & SCRIPT RULES FOR GEMINI (TANGLISH DIAGNOSTIC FEEDBACK):
1. Provide all diagnostic feedback, coaching summaries, and recommendations ("summary", "strengths", "areasToImprove", "recommendations") in natural, constructive Tanglish (Tamil words written phonetically using the English/Latin alphabet).
2. Tanglish style example: "Nalla effort! Basic vocabulary la nalla score pannirukkeenga, aana particles 'ni' and 'de' la konjam confuse aagudhu. Daily 10 mins grammar patterns practice pannunga."
3. STRICT PROHIBITION: DO NOT use Tamil script (never use தமிழ் எழுத்துக்கள்). Use ONLY English/Latin alphabet for Tamil words.
4. Keep Japanese phrases and grammatical terms accurate.`;
    }
  }

  // Provider is 'groq' -> strictly English only
  switch (context) {
    case 'exam':
      return `CRITICAL LANGUAGE & SCRIPT RULES FOR GROQ (ENGLISH ONLY):
1. All questions, secondary instructions, context sentences, multiple-choice options, and educational explanations MUST be written strictly in English (and standard Japanese with Furigana where applicable).
2. DO NOT use Tanglish or Tamil words anywhere. All explanations must be clear, professional, and entirely in standard English.`;

    case 'chat':
      return `CRITICAL LANGUAGE & SCRIPT RULES FOR GROQ (ENGLISH ONLY):
1. All explanations, coaching, tutoring feedback, and responses MUST be strictly in English (with Japanese script, Furigana, and Romaji where appropriate).
2. DO NOT use Tanglish or Tamil words anywhere. Provide all guidance in natural, encouraging English.`;

    case 'enrichment':
      return `CRITICAL LANGUAGE & SCRIPT RULES FOR GROQ (ENGLISH ONLY):
1. All educational enrichment fields ("etymology_and_origin", "memory_mnemonic", "reading_guidance", "office_context_tip", and bonus sentence translations) MUST be written strictly in English.
2. DO NOT use Tanglish or Tamil words anywhere.`;

    case 'evaluation':
      return `CRITICAL LANGUAGE & SCRIPT RULES FOR GROQ (ENGLISH ONLY):
1. All evaluation feedback, diagnostic summaries, and recommendations ("summary", "strengths", "areasToImprove", "recommendations") MUST be written strictly in English.
2. DO NOT use Tanglish or Tamil words anywhere.`;
  }
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
 * Route chat completion to Groq or Google Gemini.
 * Note: Per user specification, fallback is disabled by default to prevent silent provider switching.
 */
export async function callUnifiedAi(options: UnifiedChatOptions): Promise<UnifiedChatResult> {
  const preferredProvider = options.provider || getActiveAiProvider();
  const allowFallback = options.allowFallback === true; // default false per requirement: do not silently switch to another provider

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

    // Attempt fallback to Groq ONLY if explicitly enabled
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

    // Attempt fallback to Gemini ONLY if explicitly enabled
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
