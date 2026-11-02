'use client';

import React, { useState } from 'react';
import {
  Trophy, CheckCircle2, XCircle, Sparkles, BookOpen,
  ArrowRight, RefreshCw, ChevronDown, ChevronUp, AlertTriangle
} from 'lucide-react';
import { ExamResultRecord } from '@/types/minna';
import { FuriganaText } from '@/components/FuriganaText';

interface MinnaExamResultModalProps {
  result: ExamResultRecord;
  onClose: () => void;
  onRetest: (lessonNumbers: number[]) => void;
}

export function MinnaExamResultModal({
  result,
  onClose,
  onRetest
}: MinnaExamResultModalProps) {
  const [expandedAnswers, setExpandedAnswers] = useState(false);
  const isPass = result.scorePercent >= 70;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-950/75 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Score Banner Header */}
        <div className={`px-6 py-6 text-white text-center flex flex-col items-center justify-center gap-2 relative overflow-hidden ${
          isPass
            ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600'
            : 'bg-gradient-to-r from-red-600 via-rose-600 to-amber-600'
        }`}>
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-1 shadow-lg">
            {isPass ? (
              <Trophy className="w-8 h-8 text-amber-300" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-amber-200" />
            )}
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-4xl sm:text-5xl font-black">{result.scorePercent}%</span>
            <span className="text-xs uppercase font-bold tracking-wider opacity-90">Score</span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold">
            {isPass ? 'Outstanding Mastery!' : 'Good Effort! Keep Reviewing'}
          </h2>
          <p className="text-xs text-white/90 max-w-md">
            {result.correctCount} of {result.totalQuestions} questions answered correctly • Time spent: {formatTime(result.timeSpentSeconds)}
          </p>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-black/20 hover:bg-black/30 text-white transition"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          
          {/* AI Diagnostic Coach Section */}
          {result.aiDiagnostic && (
            <div className="p-5 rounded-3xl bg-gradient-to-br from-red-500/10 via-amber-500/10 to-rose-500/10 border border-red-500/20 space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-red-600 text-white">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-stone-900 dark:text-white uppercase tracking-wider">
                    AI Diagnostic Learning Evaluation
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    Personalized insights and study prescription
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 font-medium leading-relaxed bg-white/60 dark:bg-stone-900/60 p-3.5 rounded-2xl border border-stone-200/60 dark:border-stone-800/60">
                {result.aiDiagnostic.summary}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {/* Strengths */}
                {result.aiDiagnostic.strengths && result.aiDiagnostic.strengths.length > 0 && (
                  <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-xs">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400 block mb-2">
                      Key Strengths Demonstrated:
                    </span>
                    <ul className="space-y-1 text-stone-700 dark:text-stone-300">
                      {result.aiDiagnostic.strengths.map((str, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-500">✓</span>
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommendations */}
                {result.aiDiagnostic.recommendations && result.aiDiagnostic.recommendations.length > 0 && (
                  <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 text-xs">
                    <span className="font-bold text-amber-700 dark:text-amber-400 block mb-2">
                      Recommended Next Steps:
                    </span>
                    <ul className="space-y-1 text-stone-700 dark:text-stone-300">
                      {result.aiDiagnostic.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-amber-500">→</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Breakdown Header & Toggle */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-stone-500">
                Question Review & Solutions ({result.answers.length} Questions)
              </h3>
              <button
                onClick={() => setExpandedAnswers(!expandedAnswers)}
                className="text-xs font-bold text-red-600 dark:text-red-400 flex items-center gap-1 hover:underline"
              >
                <span>{expandedAnswers ? 'Collapse Details' : 'Expand All Details'}</span>
                {expandedAnswers ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="space-y-2.5">
              {result.answers.map((ans, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border transition-all text-xs ${
                    ans.isCorrect
                      ? 'border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/30 dark:bg-emerald-950/10'
                      : 'border-red-200 dark:border-red-900/40 bg-red-50/30 dark:bg-red-950/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5">
                        {ans.isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
                        )}
                      </div>
                      <div>
                        <span className="font-bold text-stone-900 dark:text-white">
                          Q{idx + 1}. <FuriganaText text={ans.prompt} />
                        </span>
                        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-stone-600 dark:text-stone-400">
                          <div>
                            <span>Your Answer: </span>
                            <span className={ans.isCorrect ? 'text-emerald-600 font-bold' : 'text-red-600 font-bold line-through'}>
                              <FuriganaText text={ans.userAnswer} />
                            </span>
                          </div>
                          {!ans.isCorrect && (
                            <div>
                              <span>Correct: </span>
                              <span className="text-emerald-600 font-bold">
                                <FuriganaText text={ans.correctAnswer} />
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 shrink-0">
                      L{ans.lessonNumber}
                    </span>
                  </div>

                  {(expandedAnswers || !ans.isCorrect) && ans.explanation && (
                    <div className="mt-2.5 pt-2 border-t border-stone-200 dark:border-stone-800 text-[11px] text-stone-600 dark:text-stone-300 italic">
                      💡 <FuriganaText text={ans.explanation} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-stone-300 transition"
          >
            Close & Back to Curriculum
          </button>

          <button
            onClick={() => onRetest(result.lessonNumbers)}
            className="px-6 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs sm:text-sm shadow-lg hover:bg-red-700 active:scale-95 transition flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retest These Lessons (Fresh Questions)</span>
          </button>
        </div>

      </div>
    </div>
  );
}
