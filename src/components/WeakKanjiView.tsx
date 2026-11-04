'use client';

import React, { useState, useMemo } from 'react';
import {
  AlertTriangle, RotateCcw, Sparkles, CheckCircle2,
  BookOpen, Play, Brain, ChevronDown, ChevronUp, Award
} from 'lucide-react';
import { KanjiRecord, UserKanjiProgress } from '@/types/kanji';
import { storage } from '@/services/storage';
import { AudioButton } from './AudioButton';

interface WeakKanjiViewProps {
  kanjiList: KanjiRecord[];
  progressMap: Record<number, UserKanjiProgress>;
  onSelectKanji: (kanji: KanjiRecord) => void;
  onStartAssessment: (kanji: KanjiRecord) => void;
  onLaunchDrill: (weakKanji: KanjiRecord[]) => void;
  onRefreshProgress: () => void;
}

export function WeakKanjiView({
  kanjiList,
  progressMap,
  onSelectKanji,
  onStartAssessment,
  onLaunchDrill,
  onRefreshProgress
}: WeakKanjiViewProps) {
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Identify weak kanji: mistake_count > 0 or status === 'needs_revision'
  const weakKanjiList = useMemo(() => {
    return kanjiList.filter(k => {
      const p = progressMap[k.id];
      return p && (p.learning_status === 'needs_revision' || p.mistake_count > 0);
    }).sort((a, b) => {
      const pA = progressMap[a.id]?.mistake_count || 0;
      const pB = progressMap[b.id]?.mistake_count || 0;
      return pB - pA; // most mistakes first
    });
  }, [kanjiList, progressMap]);

  const totalMistakes = useMemo(() => {
    return weakKanjiList.reduce((acc, k) => acc + (progressMap[k.id]?.mistake_count || 0), 0);
  }, [weakKanjiList, progressMap]);

  // Request Groq AI analysis on the weak kanji
  const handleAiAnalysis = async () => {
    if (weakKanjiList.length === 0) return;

    setIsAiAnalyzing(true);
    setAiError(null);
    try {
      const kanjiSummary = weakKanjiList.slice(0, 8).map(k => ({
        kanji: k.character,
        meaning: k.meaning,
        onyomi: k.onyomi_readings.join(', '),
        kunyomi: k.kunyomi_readings.join(', '),
        mistakes: progressMap[k.id]?.mistake_count || 1,
        errorNotes: progressMap[k.id]?.incorrect_history || []
      }));

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: `Please analyze my weak kanji notebook. Here are the kanji I made mistakes on:
${JSON.stringify(kanjiSummary, null, 2)}

Provide:
1. Common confusion patterns (why these kanji or readings get mixed up).
2. Memorable, punchy mnemonics to never confuse them again.
3. 2 rapid memory anchor sentences using them.`
            }
          ],
          userContext: {
            weakKanjiCount: weakKanjiList.length
          }
        })
      });

      const data = await res.json();
      if (data.success && data.reply) {
        setAiAnalysisResult(data.reply);
      } else {
        setAiError(data.error || 'Groq AI analysis failed.');
      }
    } catch (err: any) {
      setAiError(err.message || 'Network error calling Groq AI.');
    } finally {
      setIsAiAnalyzing(false);
    }
  };

  const handleClearWeak = (kanjiId: number) => {
    storage.updateKanjiProgress(kanjiId, {
      mistake_count: 0,
      learning_status: 'learned'
    });
    onRefreshProgress();
  };

  if (weakKanjiList.length === 0) {
    return (
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-8 md:p-12 text-center max-w-xl mx-auto shadow-sm space-y-4 w-full max-w-full min-w-0">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
            Mistake Notebook is Clean!
          </h2>
          <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
            You currently have zero weak kanji. Whenever you make a mistake in a quiz or assessment, it will automatically be documented here for targeted remediation.
          </p>
        </div>
        );
  }

        return (
          <div className="space-y-6 max-w-4xl mx-auto w-full max-w-full min-w-0 overflow-x-hidden">
            {/* Banner */}
            <div className="bg-gradient-to-r from-rose-900 via-stone-900 to-stone-800 text-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-2">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Mistake Notebook & Remediation Center
                  </div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
                    Weak Kanji Drill Center
                  </h1>
                  <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
                    Targeted practice for kanji where mistakes occurred. Re-test and pass with 80%+ accuracy to restore mastered status.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto shrink-0">
                  <button
                    onClick={() => onLaunchDrill(weakKanjiList)}
                    className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    Practice Weak Kanji ({weakKanjiList.length})
                  </button>
                  <button
                    onClick={handleAiAnalysis}
                    disabled={isAiAnalyzing}
                    className="px-4 py-2.5 sm:py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition border border-white/20 flex items-center justify-center gap-2 disabled:opacity-50 w-full sm:w-auto"
                  >
                    <Brain className="w-4 h-4 text-amber-300" />
                    {isAiAnalyzing ? 'Analyzing...' : 'Sensei AI Diagnosis'}
                  </button>
                </div>
              </div>
            </div>

            {/* Groq AI Diagnosis Card */}
            {aiAnalysisResult && (
              <div className="bg-stone-900 text-white rounded-2xl p-6 border border-stone-800 shadow-xl space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <Sparkles className="w-4 h-4" />
                    Sensei AI Remediation Analysis (Groq Qwen 3.8 27B)
                  </div>
                  <button
                    onClick={() => setAiAnalysisResult(null)}
                    className="text-xs text-stone-400 hover:text-white"
                  >
                    Dismiss
                  </button>
                </div>
                <div className="text-xs md:text-sm text-stone-200 leading-relaxed whitespace-pre-wrap font-sans">
                  {aiAnalysisResult}
                </div>
              </div>
            )}

            {aiError && (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs">
                {aiError}
              </div>
            )}

            {/* List of Weak Kanji Cards */}
            <div className="space-y-3">
              {weakKanjiList.map((k) => {
                const prog = progressMap[k.id];
                const isExpanded = expandedId === k.id;
                const mistakeCount = prog?.mistake_count || 1;

                return (
                  <div
                    key={k.id}
                    className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-3.5 sm:p-5 shadow-sm transition hover:border-stone-300 dark:hover:border-stone-700"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                      {/* Kanji Character & Details */}
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="relative">
                          <span className="font-japanese text-4xl sm:text-5xl font-black text-stone-900 dark:text-white">
                            {k.character}
                          </span>
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-sm sm:text-base text-stone-900 dark:text-white">
                              {k.meaning}
                            </h3>
                            <AudioButton text={k.character} size="sm" />
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300">
                              {mistakeCount} {mistakeCount === 1 ? 'mistake' : 'mistakes'}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-stone-500 dark:text-stone-400 mt-1">
                            <span>On: <strong className="font-japanese text-red-600 dark:text-red-400">{k.onyomi_readings.join(', ')}</strong></span>
                            <span>•</span>
                            <span>Kun: <strong className="font-japanese text-stone-700 dark:text-stone-300">{k.kunyomi_readings.join(', ') || '—'}</strong></span>
                            <span>•</span>
                            <span>Level {k.level}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100 dark:border-stone-800">
                        <button
                          onClick={() => onStartAssessment(k)}
                          className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-sm"
                        >
                          <Award className="w-3.5 h-3.5" />
                          Re-Test (80%)
                        </button>

                        <button
                          onClick={() => onSelectKanji(k)}
                          className="px-3.5 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200 font-bold text-xs transition flex items-center gap-1.5"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          Study
                        </button>

                        <button
                          onClick={() => setExpandedId(isExpanded ? null : k.id)}
                          className="p-2 rounded-xl text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Expanded History Details */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800 space-y-3 text-xs animate-fadeIn">
                        <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 space-y-1">
                          <span className="font-bold text-stone-700 dark:text-stone-300 block">
                            Memory Mnemonic:
                          </span>
                          <p className="text-stone-600 dark:text-stone-400">
                            {k.mnemonic}
                          </p>
                        </div>

                        {prog?.incorrect_history && prog.incorrect_history.length > 0 && (
                          <div className="space-y-1">
                            <span className="font-semibold text-stone-500 block text-[11px]">
                              Recent Incorrect Submissions:
                            </span>
                            <ul className="list-disc list-inside space-y-1 text-stone-600 dark:text-stone-400 text-[11px]">
                              {prog.incorrect_history.slice(-3).map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="flex justify-end pt-1">
                          <button
                            onClick={() => handleClearWeak(k.id)}
                            className="text-[11px] text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 underline"
                          >
                            Mark as resolved manually
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          );
}
