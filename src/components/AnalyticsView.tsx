'use client';

import React, { useMemo } from 'react';
import {
  BarChart3, CheckCircle2, AlertTriangle, TrendingUp,
  Clock, ShieldCheck, Flame, BookOpen, Layers, Zap
} from 'lucide-react';
import { KanjiRecord, UserKanjiProgress } from '@/types/kanji';
import { LEVEL_METADATA } from '@/data/kanjiDatabase';
import { storage } from '@/services/storage';

interface AnalyticsViewProps {
  kanjiList: KanjiRecord[];
  progressMap: Record<number, UserKanjiProgress>;
}

export function AnalyticsView({
  kanjiList,
  progressMap
}: AnalyticsViewProps) {
  // Aggregate stats
  const stats = useMemo(() => {
    let learned = 0;
    let learning = 0;
    let weak = 0;
    let totalMeaningAcc = 0;
    let totalOnyomiAcc = 0;
    let totalKunyomiAcc = 0;
    let totalVocabAcc = 0;
    let studiedCount = 0;

    let matureCards = 0;
    let youngCards = 0;

    Object.values(progressMap).forEach((p) => {
      if (p.learning_status === 'learned') learned++;
      else if (p.learning_status === 'learning') learning++;
      else if (p.learning_status === 'needs_revision') weak++;

      if (p.learning_status !== 'locked') {
        studiedCount++;
        totalMeaningAcc += p.meaning_accuracy;
        totalOnyomiAcc += p.onyomi_accuracy;
        totalKunyomiAcc += p.kunyomi_accuracy;
        totalVocabAcc += p.vocabulary_accuracy;

        if (p.srs_interval >= 21) matureCards++;
        else if (p.srs_interval > 0) youngCards++;
      }
    });

    const divisor = Math.max(1, studiedCount);

    return {
      learned,
      learning,
      weak,
      locked: 120 - (learned + learning + weak),
      meaningAcc: Math.round(totalMeaningAcc / divisor),
      onyomiAcc: Math.round(totalOnyomiAcc / divisor),
      kunyomiAcc: Math.round(totalKunyomiAcc / divisor),
      vocabAcc: Math.round(totalVocabAcc / divisor),
      matureCards,
      youngCards,
      pctMastered: Math.round((learned / 120) * 100)
    };
  }, [progressMap]);

  // Quiz history records
  const quizHistory = storage.getQuizResults().slice(-15).reverse();

  return (
      <div className="space-y-6 max-w-5xl mx-auto w-full max-w-full min-w-0 overflow-x-hidden">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-red-950 text-white p-6 md:p-8 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <BarChart3 className="w-3.5 h-3.5" />
              Learning Intelligence & Retention
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Kanji Mastery Analytics
            </h1>
            <p className="text-stone-300 text-sm mt-1 max-w-xl">
              Detailed performance breakdown, spaced repetition intervals, and category accuracy across your 120-kanji syllabus.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 text-center shrink-0">
            <span className="text-[11px] text-stone-300 block font-medium uppercase tracking-wider">Overall N5 Mastery</span>
            <span className="text-3xl font-black text-white">{stats.pctMastered}%</span>
            <span className="text-[10px] text-stone-400 block">{stats.learned} / 120 Kanji</span>
          </div>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
            <span className="text-xs font-bold text-stone-400 block uppercase tracking-wider">Mastered (80%+)</span>
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block">
              {stats.learned}
            </span>
            <span className="text-[11px] text-stone-500 block mt-0.5">{stats.pctMastered}% of 120 target</span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
            <span className="text-xs font-bold text-stone-400 block uppercase tracking-wider">In Progress</span>
            <span className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1 block">
              {stats.learning}
            </span>
            <span className="text-[11px] text-stone-500 block mt-0.5">Currently studying</span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
            <span className="text-xs font-bold text-stone-400 block uppercase tracking-wider">Needs Revision</span>
            <span className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-1 block">
              {stats.weak}
            </span>
            <span className="text-[11px] text-stone-500 block mt-0.5">Mistakes logged</span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
            <span className="text-xs font-bold text-stone-400 block uppercase tracking-wider">SRS Retention</span>
            <span className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1 block">
              {stats.matureCards}
            </span>
            <span className="text-[11px] text-stone-500 block mt-0.5">Mature cards (&ge;21d)</span>
          </div>
        </div>

        {/* Accuracy by Category */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-red-600" />
            Accuracy Breakdown by Category
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-800 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-stone-700 dark:text-stone-300">English Meaning</span>
                <span className="text-emerald-600">{stats.meaningAcc}%</span>
              </div>
              <div className="h-2 w-full bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${stats.meaningAcc}%` }} />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-800 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-stone-700 dark:text-stone-300">Onyomi (音読み)</span>
                <span className="text-red-600">{stats.onyomiAcc}%</span>
              </div>
              <div className="h-2 w-full bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: `${stats.onyomiAcc}%` }} />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-800 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-stone-700 dark:text-stone-300">Kunyomi (訓読み)</span>
                <span className="text-amber-600">{stats.kunyomiAcc}%</span>
              </div>
              <div className="h-2 w-full bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${stats.kunyomiAcc}%` }} />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-800 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-stone-700 dark:text-stone-300">Vocabulary</span>
                <span className="text-purple-600">{stats.vocabAcc}%</span>
              </div>
              <div className="h-2 w-full bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: `${stats.vocabAcc}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* 12-Level Progress Matrix */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-red-600" />
            12-Level Mastery Matrix
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {LEVEL_METADATA.map((lvl) => {
              const levelLearned = lvl.kanjiIds.filter(id => progressMap[id]?.learning_status === 'learned').length;
              const pct = Math.round((levelLearned / 10) * 100);

              return (
                <div
                  key={lvl.level}
                  className="p-3.5 rounded-xl border border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-850 space-y-1.5"
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-stone-800 dark:text-stone-200">Level {lvl.level}</span>
                    <span className="text-stone-500 font-semibold">{levelLearned}/10 ({pct}%)</span>
                  </div>
                  <div className="h-1.5 w-full bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-600 rounded-full transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-stone-400 truncate">
                    {lvl.subtitle}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Quiz Logs */}
        {quizHistory.length > 0 && (
          <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-stone-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-600" />
              Recent Quiz Submissions
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-400 font-medium">
                    <th className="pb-2">Time</th>
                    <th className="pb-2">Format</th>
                    <th className="pb-2">Your Answer</th>
                    <th className="pb-2">Correct Answer</th>
                    <th className="pb-2 text-right">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                  {quizHistory.map((rec) => (
                    <tr key={rec.id} className="text-stone-700 dark:text-stone-300">
                      <td className="py-2.5 font-mono text-[11px] text-stone-400">
                        {new Date(rec.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-2.5 capitalize">{rec.question_type.replace(/_/g, ' ')}</td>
                      <td className="py-2.5 truncate max-w-[120px]">{rec.selected_answer}</td>
                      <td className="py-2.5 truncate max-w-[120px] font-semibold">{rec.correct_answer}</td>
                      <td className="py-2.5 text-right">
                        {rec.is_correct ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-rose-600 font-bold">
                            <AlertTriangle className="w-3.5 h-3.5" /> Wrong
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      );
}
