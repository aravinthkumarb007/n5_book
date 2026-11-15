'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  RefreshCw,
  BookOpen,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Volume2,
  ChevronRight,
  ExternalLink,
  Loader2,
  Info
} from 'lucide-react';
import { MinnaLesson, MinnaGrammarPoint } from '@/types/minna';
import { speakJapanese } from '@/services/audio';
import { FuriganaText } from '@/components/FuriganaText';

export interface MinnaAiGrammarModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: MinnaLesson;
  initialTopicId?: string | null;
}

interface GrammarAiExample {
  japanese: string;
  furigana?: string;
  romaji?: string;
  meaning: string;
}

interface GrammarAiTopic {
  topicId: string;
  topicName: string;
  simpleExplanation: string;
  grammarStructure: string;
  stepByStepExplanation: string;
  japaneseExamples: GrammarAiExample[];
  commonMistakes: string[];
  learningTips: string[];
}

interface GrammarAiPayload {
  lessonNumber: number;
  lessonTitle: string;
  topics: GrammarAiTopic[];
  providerUsed: 'groq' | 'gemini';
  modelUsed?: string;
  generatedAt?: string;
}

export function MinnaAiGrammarModal({
  isOpen,
  onClose,
  lesson,
  initialTopicId
}: MinnaAiGrammarModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeProvider, setActiveProvider] = useState<'groq' | 'gemini'>('groq');
  const [grammarData, setGrammarData] = useState<GrammarAiPayload | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string>('all');

  // Load configured provider and cached grammar on open
  useEffect(() => {
    if (!isOpen || !lesson) return;

    if (initialTopicId) {
      setSelectedTopicId(initialTopicId);
    } else {
      setSelectedTopicId('all');
    }

    // 1. Fetch active provider from Settings
    fetch('/api/ai/config')
      .then(res => res.json())
      .then(config => {
        const prov: 'groq' | 'gemini' = config.activeProvider === 'gemini' ? 'gemini' : 'groq';
        setActiveProvider(prov);

        // 2. Check localStorage cache for this lesson & provider
        const cacheKey = `minna_ai_grammar_l${lesson.lessonNumber}_${prov}`;
        try {
          const cached = localStorage.getItem(cacheKey);
          if (cached) {
            const parsed = JSON.parse(cached);
            if (parsed && Array.isArray(parsed.topics) && parsed.topics.length > 0) {
              setGrammarData(parsed);
              return;
            }
          }
        } catch { }

        // 3. If no cache, fetch fresh from AI
        fetchGrammarExplanation(prov, false);
      })
      .catch(() => {
        fetchGrammarExplanation('groq', false);
      });
  }, [isOpen, lesson.lessonNumber, initialTopicId]);

  const fetchGrammarExplanation = async (providerToUse: 'groq' | 'gemini', forceRefresh = false) => {
    if (isLoading) return; // Prevent duplicate requests
    setIsLoading(true);
    setError(null);

    const cacheKey = `minna_ai_grammar_l${lesson.lessonNumber}_${providerToUse}`;

    try {
      const res = await fetch('/api/ai/explain-grammar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonNumber: lesson.lessonNumber,
          lessonTitle: lesson.title,
          grammarPoints: lesson.grammar,
          provider: providerToUse,
          forceRefresh
        })
      });

      const data = await res.json();

      if (res.ok && data.success && Array.isArray(data.topics) && data.topics.length > 0) {
        setGrammarData(data);
        setActiveProvider(data.providerUsed || providerToUse);
        try {
          localStorage.setItem(cacheKey, JSON.stringify(data));
        } catch { }
      } else {
        setError(data.error || 'Failed to generate AI grammar explanation.');
      }
    } catch (err: any) {
      setError(err.message || 'Network connection failed while generating grammar.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    if (isLoading) return;
    fetchGrammarExplanation(activeProvider, true);
  };

  if (!isOpen) return null;

  const topicsToDisplay = grammarData?.topics?.filter(t =>
    selectedTopicId === 'all' ? true : t.topicId === selectedTopicId || t.topicName === selectedTopicId
  ) || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-stone-100 dark:border-stone-800/80 bg-gradient-to-r from-stone-50 via-white to-stone-50 dark:from-stone-900 dark:via-stone-900 dark:to-stone-850 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shrink-0">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] sm:text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                  Lesson {lesson.lessonNumber}
                </span>
                <span className="text-xs font-bold text-stone-500 truncate">
                  {lesson.title}
                </span>
                {/* Active Provider Pill */}
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${activeProvider === 'gemini'
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900'
                      : 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900'
                    }`}
                >
                  <Sparkles className="w-2.5 h-2.5" />
                  {activeProvider === 'gemini' ? 'Gemini (Tanglish)' : 'Groq AI (English)'}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-stone-900 dark:text-white truncate mt-0.5">
                Learn Grammar via AI Coach
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-bold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
              title="Regenerate fresh grammar explanations"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{isLoading ? 'Regenerating...' : 'Regenerate'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Navigation Bar (Topic Pills) */}
        {grammarData && grammarData.topics && grammarData.topics.length > 0 && !isLoading && (
          <div className="px-4 sm:px-6 py-2.5 bg-stone-50/80 dark:bg-stone-850/60 border-b border-stone-200/80 dark:border-stone-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
            <button
              onClick={() => setSelectedTopicId('all')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 ${selectedTopicId === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700 hover:bg-stone-100'
                }`}
            >
              All Topics ({grammarData.topics.length})
            </button>
            {grammarData.topics.map((t, idx) => {
              const isSelected = selectedTopicId === t.topicId || selectedTopicId === t.topicName;
              return (
                <button
                  key={t.topicId || idx}
                  onClick={() => setSelectedTopicId(t.topicId || t.topicName)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 flex items-center gap-1 ${isSelected
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700 hover:bg-stone-100'
                    }`}
                >
                  <span className="text-[10px] opacity-70">#{idx + 1}</span>
                  <span>{t.topicName}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Loading State */}
          {isLoading && (
            <div className="py-16 flex flex-col items-center justify-center space-y-4 text-center">
              <div className="relative">
                <div className="w-16 h-16 rounded-3xl bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center animate-pulse">
                  <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <Loader2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400 animate-spin absolute -top-1 -right-1" />
              </div>

              <div className="max-w-md space-y-1.5 px-4">
                <h3 className="text-base font-bold text-stone-900 dark:text-white">
                  Sensei AI is analyzing Lesson {lesson.lessonNumber} Grammar...
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                  Generating structured pedagogical rules, sentence formulas, step-by-step construction,
                  authentic examples, and common pitfalls in{' '}
                  <span className="font-semibold text-stone-800 dark:text-stone-200">
                    {activeProvider === 'gemini' ? 'conversational Tanglish' : 'clear English'}
                  </span>
                  .
                </p>
                <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] font-mono text-stone-400">
                  <Info className="w-3.5 h-3.5 text-blue-500" />
                  <span>Extended 120s timeout enabled for complete explanations</span>
                </div>
              </div>
            </div>
          )}

          {/* Error State */}
          {!isLoading && error && (
            <div className="p-6 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 mx-auto flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-red-900 dark:text-red-200">
                AI Grammar Explanation Unavailable
              </h3>
              <p className="text-xs text-red-700 dark:text-red-300 max-w-md mx-auto">
                {error}
              </p>
              <button
                onClick={() => fetchGrammarExplanation(activeProvider, true)}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition cursor-pointer"
              >
                Retry Generation
              </button>
            </div>
          )}

          {/* Content State: Topics List */}
          {!isLoading && !error && grammarData && (
            <div className="space-y-8">
              {/* Language Notice Banner */}
              <div className="p-3.5 rounded-2xl bg-stone-100/80 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-base">
                    {activeProvider === 'gemini' ? '🇮🇳' : '🇬🇧'}
                  </span>
                  <span className="font-medium text-stone-700 dark:text-stone-300">
                    {activeProvider === 'gemini' ? (
                      <>
                        Explaining in natural <strong>Tanglish</strong> (Tamil in English letters) powered by <strong>Google Gemini Flash</strong>.
                      </>
                    ) : (
                      <>
                        Explaining in structured <strong>English</strong> powered by <strong>Groq AI</strong>.
                      </>
                    )}
                  </span>
                </div>
                <span className="text-[11px] text-stone-500 hidden sm:inline">
                  Change language preference in Settings → Active AI Provider
                </span>
              </div>

              {topicsToDisplay.map((topic, tIdx) => (
                <div
                  key={topic.topicId || tIdx}
                  className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm overflow-hidden space-y-5"
                >
                  {/* Topic Header Card */}
                  <div className="p-5 sm:p-6 bg-gradient-to-r from-stone-50 via-white to-blue-50/20 dark:from-stone-900 dark:via-stone-900 dark:to-blue-950/20 border-b border-stone-100 dark:border-stone-800">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                            {tIdx + 1}
                          </span>
                          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                            Grammar Point
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white mt-1">
                          {topic.topicName}
                        </h3>
                      </div>

                      {/* Formula Banner */}
                      {topic.grammarStructure && (
                        <div className="text-right">
                          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                            Pattern Formula
                          </span>
                          <span className="inline-block px-3 py-1 rounded-xl bg-stone-900 dark:bg-black text-amber-300 font-mono font-bold text-xs sm:text-sm mt-0.5 shadow-xs">
                            {topic.grammarStructure}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="px-5 sm:px-6 pb-6 space-y-6">
                    {/* 1. Simple Explanation */}
                    <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 space-y-1.5">
                      <h4 className="text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                        <span>Meaning & Purpose</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-medium">
                        {topic.simpleExplanation}
                      </p>
                    </div>

                    {/* 2. Step-by-Step Sentence Construction */}
                    {topic.stepByStepExplanation && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-indigo-500" />
                          <span>How to Construct Sentences (Step-by-Step)</span>
                        </h4>
                        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line">
                          {topic.stepByStepExplanation}
                        </div>
                      </div>
                    )}

                    {/* 3. Practical Japanese Examples */}
                    {topic.japaneseExamples && topic.japaneseExamples.length > 0 && (
                      <div className="space-y-2.5">
                        <h4 className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Practical Japanese Examples</span>
                        </h4>
                        <div className="space-y-2">
                          {topic.japaneseExamples.map((eg, egIdx) => (
                            <div
                              key={egIdx}
                              className="p-3.5 rounded-2xl bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-750 flex items-start justify-between gap-3 shadow-xs"
                            >
                              <div className="space-y-1">
                                <div className="text-sm sm:text-base font-bold text-stone-900 dark:text-white font-japanese">
                                  {eg.furigana ? (
                                    <FuriganaText text={eg.furigana} />
                                  ) : (
                                    eg.japanese
                                  )}
                                </div>
                                {eg.romaji && (
                                  <div className="text-xs font-mono text-stone-400">
                                    {eg.romaji}
                                  </div>
                                )}
                                <div className="text-xs text-blue-700 dark:text-blue-300 font-medium">
                                  {eg.meaning}
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => speakJapanese(eg.japanese)}
                                className="p-2 rounded-xl text-stone-400 hover:text-red-500 hover:bg-stone-100 dark:hover:bg-stone-800 transition shrink-0"
                                title="Listen to Japanese pronunciation"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Grid for Common Mistakes & Learning Tips */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                      {/* 4. Common Mistakes */}
                      {topic.commonMistakes && topic.commonMistakes.length > 0 && (
                        <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-2">
                          <h4 className="text-xs font-bold text-rose-900 dark:text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                            <span>Common Mistakes to Avoid</span>
                          </h4>
                          <ul className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300">
                            {topic.commonMistakes.map((m, mIdx) => (
                              <li key={mIdx} className="flex items-start gap-2 leading-relaxed">
                                <span className="text-rose-500 font-bold shrink-0">✕</span>
                                <span>{m}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* 5. Sensei's Learning Tips */}
                      {topic.learningTips && topic.learningTips.length > 0 && (
                        <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 space-y-2">
                          <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                            <Lightbulb className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Sensei's Tips & Memory Anchors</span>
                          </h4>
                          <ul className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300">
                            {topic.learningTips.map((tip, tipIdx) => (
                              <li key={tipIdx} className="flex items-start gap-2 leading-relaxed">
                                <span className="text-emerald-500 font-bold shrink-0">✓</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 flex items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2 text-stone-500">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Mastering Lesson {lesson.lessonNumber} Grammar</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold text-xs transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
