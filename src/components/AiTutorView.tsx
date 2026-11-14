'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles, Send, Bot, User, Trash2, Volume2,
  Settings as SettingsIcon, Zap, CheckCircle2, AlertCircle, ArrowRight
} from 'lucide-react';
import { KanjiRecord, UserKanjiProgress } from '@/types/kanji';
import { AudioButton } from './AudioButton';
import { MarkdownRenderer } from './MarkdownRenderer';

interface AiTutorViewProps {
  kanjiList: KanjiRecord[];
  progressMap: Record<number, UserKanjiProgress>;
  onNavigateToSettings: () => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  latencyMs?: number;
}

const QUICK_PROMPTS = [
  'How do I distinguish Onyomi vs Kunyomi in office compound words?',
  'Give me a memorable office mnemonic for 会社 (kaisya / company)',
  'Write a short polite office email using only Level 1 and 2 kanji',
  'Break down the radicals of 「話」 (talk/speak)',
  'Give me 3 practice sentences using 日 (day/sun) with furigana'
];

export function AiTutorView({
  kanjiList,
  progressMap,
  onNavigateToSettings
}: AiTutorViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `こんにちは！ (Konnichiwa!) I am **Sensei AI**, your personal Japanese tutor.

I'm here to help you master all 120 JLPT N5 kanji in your 10-15 minute daily office sessions. You can ask me:
- **Mnemonics** to remember difficult kanji characters.
- **Onyomi vs Kunyomi** explanations and compound word rules.
- **Office context examples** for natural workplace Japanese.
- **Radical breakdowns** and stroke origin stories.

How can I assist your Japanese study today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const learnedCount = Object.values(progressMap).filter(p => p.learning_status === 'learned').length;
  const weakCount = Object.values(progressMap).filter(p => p.learning_status === 'needs_revision').length;

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setErrorMessage(null);

    const startTime = Date.now();

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({
            role: m.role,
            content: m.content
          })),
          userContext: {
            learnedCount,
            weakKanjiCount: weakCount,
            totalKanjiTarget: 120
          }
        })
      });

      const data = await response.json();
      const latencyMs = Date.now() - startTime;

      if (!response.ok || !data.success) {
        setErrorMessage(data.error || 'Failed to receive response from AI Sensei.');
        if (data.error && data.error.toLowerCase().includes('api key')) {
          setErrorMessage('AI API Key is not configured. Please add your Groq or Gemini API key in Settings.');
        }
      } else {
        const assistantMsg: ChatMessage = {
          id: `ai_${Date.now()}`,
          role: 'assistant',
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          latencyMs
        };
        setMessages(prev => [...prev, assistantMsg]);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Network connection to AI service failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: 'Chat cleared. How can I help you with your N5 kanji practice today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
      <div className="max-w-4xl mx-auto space-y-4 w-full max-w-full min-w-0 overflow-x-hidden">
        {/* Top Header */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-4 md:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 text-white flex items-center justify-center shadow-md">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-stone-900 dark:text-white">
                  Sensei AI • Japanese Language Tutor
                </h1>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                  <Zap className="w-2.5 h-2.5" />
                  Groq Qwen 3.8 27B
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                Trained on JLPT N5 curriculum • Context aware ({learnedCount}/120 Kanji Mastered)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClearChat}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition text-xs font-semibold flex items-center gap-1.5"
              title="Clear Chat"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Clear</span>
            </button>
            <button
              onClick={onNavigateToSettings}
              className="px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 transition text-xs font-bold flex items-center gap-1.5"
            >
              <SettingsIcon className="w-3.5 h-3.5" />
              <span>API Settings</span>
            </button>
          </div>
        </div>

        {/* Error Alert with direct Settings CTA */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs flex items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={onNavigateToSettings}
              className="px-3 py-1.5 rounded-lg bg-rose-600 text-white font-bold text-xs shrink-0 hover:bg-rose-700 transition"
            >
              Configure Groq Key
            </button>
          </div>
        )}

        {/* Chat Messages Box */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-4 md:p-6 shadow-sm min-h-[440px] max-h-[560px] overflow-y-auto space-y-4">
          {messages.map((m) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={m.id}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white text-xs ${isUser ? 'bg-stone-900 dark:bg-stone-700' : 'bg-red-600'
                  }`}>
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`rounded-2xl p-4 text-xs md:text-sm leading-relaxed ${isUser
                    ? 'max-w-[85%] sm:max-w-[75%] bg-red-600 text-white rounded-tr-none whitespace-pre-wrap'
                    : 'max-w-[92%] sm:max-w-[85%] bg-stone-50 dark:bg-stone-800/80 border border-stone-200/60 dark:border-stone-700/60 text-stone-800 dark:text-stone-100 rounded-tl-none shadow-xs'
                  }`}>
                  {isUser ? (
                    <div>{m.content}</div>
                  ) : (
                    <MarkdownRenderer content={m.content} />
                  )}

                  <div className="mt-2.5 pt-2 border-t border-stone-200/50 dark:border-stone-700/50 flex items-center justify-between text-[10px] opacity-70">
                    <span>{m.timestamp}</span>
                    {!isUser && m.latencyMs && (
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                        ⚡ {m.latencyMs}ms via Groq Qwen
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center text-xs shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-stone-50 dark:bg-stone-800 p-4 rounded-2xl rounded-tl-none border border-stone-200 dark:border-stone-700 flex items-center gap-2 text-xs text-stone-500">
                <div className="w-3.5 h-3.5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                Sensei is drafting explanation...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto whitespace-nowrap scrollbar-none pb-1 text-xs max-w-full">
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              disabled={isLoading}
              onClick={() => handleSend(prompt)}
              className="px-3 py-1.5 rounded-full border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:border-red-500 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white whitespace-nowrap transition disabled:opacity-50 text-[11px] shrink-0 cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            disabled={isLoading}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Sensei AI about kanji, readings, mnemonics, or sentence practice..."
            className="flex-1 px-4 py-3 text-sm rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition shadow-md flex items-center gap-2 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
      );
}
