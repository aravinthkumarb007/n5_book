'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2, Clock, CheckCircle2, ChevronRight, AlertCircle,
  HelpCircle, Sparkles, Loader2, RefreshCw
} from 'lucide-react';
import { CustomExamConfig, ExamAnswerLog, ExamQuestion, ExamResultRecord } from '@/types/minna';
import { speakJapanese } from '@/services/audio';
import { saveExamResult } from '@/services/minnaStorage';
import { FuriganaText } from '@/components/FuriganaText';

interface MinnaExamRunnerModalProps {
  questions: ExamQuestion[];
  config: CustomExamConfig;
  onClose: () => void;
  onFinishExam: (result: ExamResultRecord) => void;
}

export function MinnaExamRunnerModal({
  questions,
  config,
  onClose,
  onFinishExam
}: MinnaExamRunnerModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [tileSelections, setTileSelections] = useState<Record<string, string[]>>({});
  const [matchingSelections, setMatchingSelections] = useState<Record<string, Record<string, string>>>({});

  // Countdown Timer
  const [secondsRemaining, setSecondsRemaining] = useState<number>(
    config.durationMinutes > 0 ? config.durationMinutes * 60 : 0
  );
  const [startTime] = useState<number>(Date.now());
  const [isEvaluating, setIsEvaluating] = useState(false);

  // Auto-advance timer ref
  const autoNextTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear auto-advance timer on question change or unmount
  useEffect(() => {
    return () => {
      if (autoNextTimerRef.current) clearTimeout(autoNextTimerRef.current);
    };
  }, [currentIndex]);

  useEffect(() => {
    if (config.durationMinutes <= 0) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [config.durationMinutes]);

  const currentQ = questions[currentIndex];
  if (!currentQ) return null;

  const currentAns = userAnswers[currentQ.id] || '';

  // Helpers for Sentence Tiles
  const handleTileClick = (tile: string) => {
    const current = tileSelections[currentQ.id] || [];
    const next = [...current, tile];
    setTileSelections({ ...tileSelections, [currentQ.id]: next });
    setUserAnswers({ ...userAnswers, [currentQ.id]: next.join(' ') });
  };

  const handleRemoveTile = (idx: number) => {
    const current = tileSelections[currentQ.id] || [];
    const next = current.filter((_, i) => i !== idx);
    setTileSelections({ ...tileSelections, [currentQ.id]: next });
    setUserAnswers({ ...userAnswers, [currentQ.id]: next.join(' ') });
  };

  const handleClearTiles = () => {
    setTileSelections({ ...tileSelections, [currentQ.id]: [] });
    setUserAnswers({ ...userAnswers, [currentQ.id]: '' });
  };

  // Automatic Next Question upon Option Selection
  const handleSelectOption = (opt: string) => {
    const nextAnswers = { ...userAnswers, [currentQ.id]: opt };
    setUserAnswers(nextAnswers);

    if (autoNextTimerRef.current) clearTimeout(autoNextTimerRef.current);

    autoNextTimerRef.current = setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(prev => prev + 1);
      } else {
        // Automatically submit exam on completing the final question
        handleSubmitExam(nextAnswers);
      }
    }, 600);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const answeredCount = Object.keys(userAnswers).filter(k => userAnswers[k]?.trim()).length;
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  const handleSubmitExam = async (customAnswers?: Record<string, string>) => {
    if (autoNextTimerRef.current) clearTimeout(autoNextTimerRef.current);
    setIsEvaluating(true);
    const answersToUse = customAnswers || userAnswers;
    const timeSpentSeconds = Math.round((Date.now() - startTime) / 1000);

    // Build Answer Logs
    const answerLogs: ExamAnswerLog[] = questions.map((q) => {
      const uAns = (answersToUse[q.id] || '').trim();
      const cAns = q.correctAnswer.trim();

      // Normalization comparison (strip spaces for Japanese tile questions)
      const isCorrect = uAns.replace(/\s+/g, '') === cAns.replace(/\s+/g, '');

      return {
        questionId: q.id,
        prompt: q.prompt,
        userAnswer: uAns || '(Unanswered)',
        correctAnswer: cAns,
        isCorrect,
        explanation: q.explanation,
        lessonNumber: q.lessonNumber,
        category: q.category
      };
    });

    try {
      // Call Evaluation API
      const res = await fetch('/api/ai/evaluate-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          examTitle: config.title || 'Custom Minna Assessment',
          lessonNumbers: config.lessonRange,
          answers: answerLogs,
          timeSpentSeconds
        })
      });

      const data = await res.json();
      if (data.success && data.result) {
        saveExamResult(data.result);
        onFinishExam(data.result);
        return;
      }
    } catch (err) {
      console.warn('Evaluation API error, fallback to local evaluator:', err);
    }

    // Deterministic fallback if offline
    const totalQuestions = answerLogs.length;
    const correctCount = answerLogs.filter(a => a.isCorrect).length;
    const scorePercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    const fallbackResult: ExamResultRecord = {
      id: `exam_${Date.now()}`,
      examTitle: config.title || 'Custom Minna Assessment',
      date: new Date().toISOString(),
      totalQuestions,
      correctCount,
      scorePercent,
      timeSpentSeconds,
      lessonNumbers: config.lessonRange,
      answers: answerLogs,
      weakLessons: [],
      weakGrammarTopics: [],
      weakVocab: [],
      aiDiagnostic: {
        summary: `You scored ${scorePercent}% (${correctCount}/${totalQuestions}). Great effort!`,
        strengths: ['Completed the custom assessment successfully.'],
        areasToImprove: ['Review questions answered incorrectly in the summary.'],
        recommendations: ['Revise the corresponding Minna lesson materials.']
      }
    };

    saveExamResult(fallbackResult);
    onFinishExam(fallbackResult);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-5 bg-stone-950/75 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 flex flex-col max-h-[96vh] sm:max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Exam Header */}
        <div className="px-3.5 sm:px-6 py-2.5 sm:py-4 bg-stone-900 dark:bg-stone-950 text-white flex items-center justify-between border-b border-stone-800 shrink-0">
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-600 font-bold">
                Q {currentIndex + 1}/{questions.length}
              </span>
              <span className="text-[11px] sm:text-xs text-stone-400">
                Lesson {currentQ.lessonNumber} • {currentQ.category}
              </span>
            </div>
            <h3 className="text-xs sm:text-base font-bold text-white mt-0.5 sm:mt-1 line-clamp-1">
              {config.title || 'Minna Japanese Assessment'}
            </h3>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {config.durationMinutes > 0 && (
              <div className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl font-mono text-[11px] sm:text-xs font-bold flex items-center gap-1 sm:gap-1.5 ${
                secondsRemaining < 60 ? 'bg-red-500/20 text-red-400 animate-pulse' : 'bg-stone-800 text-stone-300'
              }`}>
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTimer(secondsRemaining)}</span>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition"
              title="Quit Exam"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Linear Progress Bar */}
        <div className="w-full h-1.5 bg-stone-100 dark:bg-stone-800">
          <div
            className="h-full bg-gradient-to-r from-red-500 to-rose-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Question Canvas */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-7 space-y-4 sm:space-y-5">
          
          {/* Prompt Header */}
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-base sm:text-lg font-black text-stone-900 dark:text-white leading-relaxed">
                <FuriganaText text={currentQ.prompt} />
              </h2>
              {currentQ.contextText && (
                <button
                  onClick={() => speakJapanese(currentQ.contextText || '')}
                  className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-red-500 transition shrink-0"
                  title="Listen"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Context Text / Sentence / Passage with Furigana */}
            {currentQ.contextText && (
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-800 font-japanese text-sm sm:text-base leading-relaxed text-stone-900 dark:text-stone-100 whitespace-pre-line font-medium">
                <FuriganaText text={currentQ.contextText} />
              </div>
            )}
          </div>

          {/* QUESTION TYPE INTERFACES */}

          {/* 1. Sentence Formation Tiles */}
          {currentQ.type === 'sentence_formation' && currentQ.wordTiles && (
            <div className="space-y-4 pt-2">
              {/* Construction drop slot */}
              <div className="min-h-16 p-3 rounded-2xl border-2 border-dashed border-stone-300 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-950/50 flex flex-wrap gap-2 items-center">
                {(tileSelections[currentQ.id] || []).length === 0 ? (
                  <span className="text-xs text-stone-400 italic">
                    Tap words below in sequence to assemble the Japanese sentence...
                  </span>
                ) : (
                  (tileSelections[currentQ.id] || []).map((tile, tIdx) => (
                    <button
                      key={tIdx}
                      onClick={() => handleRemoveTile(tIdx)}
                      className="px-3 py-1.5 rounded-xl bg-red-600 text-white font-japanese font-bold text-sm shadow-sm hover:bg-red-700 active:scale-95 transition flex items-center gap-1.5"
                    >
                      <FuriganaText text={tile} rtClassName="text-[0.6em] text-white/90 select-none pb-0.5" />
                      <span className="text-xs opacity-70">✕</span>
                    </button>
                  ))
                )}
              </div>

              {/* Available word tiles */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-stone-500">Available Tiles:</span>
                {(tileSelections[currentQ.id] || []).length > 0 && (
                  <button
                    onClick={handleClearTiles}
                    className="text-xs text-stone-400 hover:text-red-500 font-bold transition flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Reset
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {currentQ.wordTiles.map((tile, tIdx) => {
                  const usedCount = (tileSelections[currentQ.id] || []).filter(t => t === tile).length;
                  const availableCount = currentQ.wordTiles!.filter(t => t === tile).length;
                  const isExhausted = usedCount >= availableCount;

                  return (
                    <button
                      key={tIdx}
                      disabled={isExhausted}
                      onClick={() => handleTileClick(tile)}
                      className={`px-4 py-2.5 rounded-xl border text-sm font-japanese font-bold transition shadow-sm ${
                        isExhausted
                          ? 'opacity-30 border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-800 cursor-not-allowed'
                          : 'border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white hover:border-red-500 active:scale-95'
                      }`}
                    >
                      <FuriganaText text={tile} />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. Options Grid with Furigana and Auto-Advance Cue */}
          {currentQ.options && currentQ.options.length > 0 && currentQ.type !== 'sentence_formation' && (
            <div className="grid grid-cols-1 gap-2.5 pt-2">
              {currentQ.options.map((opt, oIdx) => {
                const isSelected = currentAns === opt;
                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(opt)}
                    className={`p-3.5 sm:p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-red-600 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-bold shadow-sm ring-2 ring-red-500/50'
                        : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-800/80 hover:border-stone-400 text-stone-800 dark:text-stone-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-xl flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                        isSelected
                          ? 'bg-red-600 text-white'
                          : 'bg-stone-100 dark:bg-stone-700 text-stone-500'
                      }`}>
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span className="font-japanese text-sm sm:text-base">
                        <FuriganaText text={opt} />
                      </span>
                    </div>

                    {isSelected && (
                      <div className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400 font-bold shrink-0">
                        <span className="text-[11px] font-normal animate-pulse hidden sm:inline">⚡ Advancing...</span>
                        <CheckCircle2 className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}

        </div>

        {/* Footer Navigation Bar */}
        <div className="px-3.5 sm:px-6 py-2.5 sm:py-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 flex items-center justify-between shrink-0">
          <button
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="px-3 sm:px-4 py-2 rounded-xl border border-stone-300 dark:border-stone-700 text-[11px] sm:text-xs font-bold text-stone-600 dark:text-stone-400 disabled:opacity-30 hover:bg-stone-100 transition"
          >
            Previous
          </button>

          <div className="text-[10px] sm:text-xs text-stone-500 font-medium">
            <span className="hidden sm:inline">Answered: </span><span className="font-bold text-stone-900 dark:text-white">{answeredCount}</span>/{questions.length}
          </div>

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={() => setCurrentIndex(currentIndex + 1)}
              className="px-3.5 sm:px-5 py-2 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-[11px] sm:text-xs font-bold hover:opacity-90 active:scale-95 transition flex items-center gap-1 sm:gap-1.5"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          ) : (
            <button
              onClick={() => handleSubmitExam()}
              disabled={isEvaluating}
              className="px-4 sm:px-6 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white text-[11px] sm:text-sm font-bold shadow-lg hover:from-red-700 hover:to-rose-700 active:scale-95 transition flex items-center gap-1.5 sm:gap-2"
            >
              {isEvaluating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Evaluating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Submit Exam</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
