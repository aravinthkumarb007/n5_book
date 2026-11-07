'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertCircle,
  Flag,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Award,
  HelpCircle,
  Loader2,
  TrendingUp,
  AlertTriangle,
  BookOpen
} from 'lucide-react';
import {
  CountersTestCategory,
  CountersTestQuestion,
  CountersTestResult
} from '@/types/counters';
import { FuriganaText } from '@/components/FuriganaText';
import { AudioButton } from '@/components/AudioButton';
import {
  saveCountersQuizResult,
  getPastCountersQuestionFingerprints
} from '@/services/countersStorage';

interface CountersTestRunnerModalProps {
  category: CountersTestCategory;
  onClose: () => void;
}

export function CountersTestRunnerModal({ category, onClose }: CountersTestRunnerModalProps) {
  const [loading, setLoading] = useState(true);
  const [generatingNew, setGeneratingNew] = useState(false);
  const [questions, setQuestions] = useState<CountersTestQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [markedForReview, setMarkedForReview] = useState<Set<string>>(new Set());

  // Timer: default 10 minutes (600s)
  const initialTimeSeconds = category === 'full' ? 900 : 600;
  const [timeLeft, setTimeLeft] = useState<number>(initialTimeSeconds);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<CountersTestResult | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

    const fetchQuestions = useCallback(async (isRefresh = false, overrideDifficulty?: 'easy' | 'medium' | 'hard') => {
      const diffToUse = overrideDifficulty || difficulty;
      try {
        if (isRefresh) {
          setGeneratingNew(true);
        } else {
          setLoading(true);
        }

        const pastFingerprints = Array.from(getPastCountersQuestionFingerprints());
        const res = await fetch('/api/ai/generate-counters-quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            category,
            difficulty: diffToUse,
            count: category === 'full' ? 15 : 10,
            pastQuestionFingerprints: pastFingerprints
          })
        });

        const data = await res.json();
        if (data.success && Array.isArray(data.questions) && data.questions.length > 0) {
          setQuestions(data.questions);
          setCurrentIndex(0);
          setUserAnswers({});
          setMarkedForReview(new Set());
          setTimeLeft(initialTimeSeconds);
          setIsSubmitted(false);
          setResult(null);
        }
      } catch (err) {
        console.error('Failed to generate counters quiz:', err);
      } finally {
        setLoading(false);
        setGeneratingNew(false);
      }
    }, [category, initialTimeSeconds]);

    useEffect(() => {
      fetchQuestions();
    }, [fetchQuestions]);

    const handleSubmit = useCallback(() => {
      if (isSubmitted || questions.length === 0) return;
      if (timerRef.current) clearInterval(timerRef.current);

      const timeSpent = initialTimeSeconds - timeLeft;
      let correctCount = 0;
      let incorrectCount = 0;
      let unansweredCount = 0;

      const topicStats: Record<string, { correct: number; total: number }> = {};

      const evaluatedAnswers = questions.map(q => {
        const ans = userAnswers[q.id];
        const isCorrect = ans !== undefined && ans.trim() === q.correctAnswer.trim();

        if (ans === undefined) {
          unansweredCount++;
        } else if (isCorrect) {
          correctCount++;
        } else {
          incorrectCount++;
        }

        const topicKey = q.categoryName || 'General Counters';
        if (!topicStats[topicKey]) {
          topicStats[topicKey] = { correct: 0, total: 0 };
        }
        topicStats[topicKey].total++;
        if (isCorrect) topicStats[topicKey].correct++;

        return {
          question: q,
          userAnswer: ans,
          isCorrect
        };
      });

      const totalQuestions = questions.length;
      const percentage = Math.round((correctCount / totalQuestions) * 100);

      const topicPerformance = Object.entries(topicStats).map(([topic, stats]) => ({
        topic,
        correct: stats.correct,
        total: stats.total,
        percentage: Math.round((stats.correct / stats.total) * 100)
      }));

      const strongAreas = topicPerformance
        .filter(t => t.percentage >= 80)
        .map(t => `${t.topic} (${t.percentage}%)`);

      const weakAreas = topicPerformance
        .filter(t => t.percentage < 60)
        .map(t => `${t.topic} (${t.percentage}%)`);

      const recommendedTopics: string[] = [];
      if (weakAreas.length > 0) {
        recommendedTopics.push(...weakAreas.map(w => `Review and practice irregular pronunciations in ${w.split(' (')[0]}`));
      } else {
        recommendedTopics.push('Great job! Practice speed and native audio recognition.');
      }

      const testResult: CountersTestResult = {
        id: `ctr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        category,
        categoryTitle: questions[0]?.categoryName || 'Counters & Numbers Test',
        completedAt: new Date().toISOString(),
        timeSpentSeconds: timeSpent,
        score: correctCount,
        totalQuestions,
        correctCount,
        incorrectCount,
        unansweredCount,
        percentage,
        topicPerformance,
        strongAreas: strongAreas.length > 0 ? strongAreas : ['Consistent performance across areas'],
        weakAreas: weakAreas.length > 0 ? weakAreas : ['None detected! Excellent mastery.'],
        recommendedTopics,
        answers: evaluatedAnswers
      };

      saveCountersQuizResult(testResult);
      setResult(testResult);
      setIsSubmitted(true);
      setShowConfirmSubmit(false);
    }, [isSubmitted, questions, userAnswers, initialTimeSeconds, timeLeft, category]);

    // Countdown timer
    useEffect(() => {
      if (loading || isSubmitted) return;

      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }, [loading, isSubmitted, handleSubmit]);

    const formatTimer = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSelectOption = (option: string) => {
      if (isSubmitted) return;
      const currentQ = questions[currentIndex];
      if (!currentQ) return;
      setUserAnswers(prev => ({
        ...prev,
        [currentQ.id]: option
      }));
    };

    const toggleMarkForReview = () => {
      const currentQ = questions[currentIndex];
      if (!currentQ) return;
      setMarkedForReview(prev => {
        const next = new Set(prev);
        if (next.has(currentQ.id)) {
          next.delete(currentQ.id);
        } else {
          next.add(currentQ.id);
        }
        return next;
      });
    };

    const currentQ = questions[currentIndex];
    const unansweredCount = questions.filter(q => userAnswers[q.id] === undefined).length;
    const isTimeLow = timeLeft < 120; // under 2 mins

    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">

          {/* Top Header */}
          <div className="px-6 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-900/50">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base sm:text-lg text-stone-900 dark:text-white">
                    {questions[0]?.categoryName || 'Counters & Numbers Test'}
                  </h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 font-semibold uppercase tracking-wider">
                    JLPT N5
                  </span>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {questions.length > 0 ? `${questions.length} Questions • Sound Change & Irregular Mastery` : 'Preparing test questions...'}
                </p>
              </div>
            </div>

              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                {/* Difficulty Selector */}
                {!isSubmitted && (
                  <select
                    value={difficulty}
                    onChange={(e) => {
                      const newDiff = e.target.value as 'easy' | 'medium' | 'hard';
                      setDifficulty(newDiff);
                      fetchQuestions(true, newDiff);
                    }}
                    disabled={generatingNew || loading}
                    className="px-2.5 py-1 rounded-xl text-xs font-bold border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-none"
                  >
                    <option value="easy">🌱 Easy</option>
                    <option value="medium">⚡ Medium</option>
                    <option value="hard">🔥 Hard</option>
                  </select>
                )}

                {/* Generate New Questions Button */}
                {!isSubmitted && (
                  <button
                    onClick={() => fetchQuestions(true)}
                    disabled={generatingNew || loading}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 transition-colors disabled:opacity-50"
                    title="Generate a completely new set of AI practice questions"
                  >
                    {generatingNew ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5" />
                    )}
                    <span className="hidden sm:inline">Regenerate</span>
                  </button>
                )}

                {/* Countdown Timer */}
                {!isSubmitted && !loading && (
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs sm:text-sm font-bold border ${isTimeLow
                      ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400 animate-pulse'
                      : 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                    }`}>
                    <Clock className="w-4 h-4" />
                    <span>{formatTimer(timeLeft)}</span>
                  </div>
                )}

                {/* Close button */}
                <button
                  onClick={() => {
                    if (!isSubmitted && questions.length > 0) {
                      if (confirm('Are you sure you want to exit? Your current test progress will be lost.')) {
                        onClose();
                      }
                    } else {
                      onClose();
                    }
                  }}
                  className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7">
              {loading ? (
                <div className="py-24 flex flex-col items-center justify-center text-center gap-4">
                  <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
                  <div>
                    <p className="font-bold text-stone-900 dark:text-white text-base">
                      {generatingNew ? 'Generating Fresh AI Questions...' : 'Loading Test Questions...'}
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mt-1">
                      Synthesizing authentic N5 counters, irregular sound changes, and readings.
                    </p>
                  </div>
                </div>
              ) : isSubmitted && result ? (
                /* Result and Detailed Report */
                <div className="space-y-6">
                  {/* Score Banner */}
                  <div className="bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border border-emerald-200 dark:border-emerald-800/50 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="space-y-2 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <Award className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                        <span className="font-bold text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                          Test Evaluation Complete
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white">
                        {result.percentage >= 80 ? 'Mastery Achieved! おめでとう！' : result.percentage >= 60 ? 'Good Progress! Keep Practicing!' : 'Needs Practice on Irregular Forms'}
                      </h2>
                      <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                        Category: <strong className="text-stone-900 dark:text-white">{result.categoryTitle}</strong> • Time: {Math.floor(result.timeSpentSeconds / 60)}m {result.timeSpentSeconds % 60}s
                      </p>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center p-4 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm min-w-[120px]">
                        <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">
                          {result.percentage}%
                        </div>
                        <div className="text-xs font-semibold text-stone-500 dark:text-stone-400 mt-1">
                          {result.correctCount} / {result.totalQuestions} Correct
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats Overview */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-800">
                      <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">Total Questions</p>
                      <p className="text-xl font-bold text-stone-900 dark:text-white mt-1">{result.totalQuestions}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
                      <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">Correct Answers</p>
                      <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{result.correctCount}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800">
                      <p className="text-xs text-rose-700 dark:text-rose-400 font-medium">Incorrect Answers</p>
                      <p className="text-xl font-bold text-rose-600 dark:text-rose-400 mt-1">{result.incorrectCount}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                      <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">Unanswered</p>
                      <p className="text-xl font-bold text-amber-600 dark:text-amber-400 mt-1">{result.unansweredCount}</p>
                    </div>
                  </div>

                  {/* Strengths & Weaknesses */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
                      <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
                        <TrendingUp className="w-4 h-4" /> Strong Topics
                      </div>
                      <ul className="space-y-1 text-xs text-stone-700 dark:text-stone-300">
                        {result.strongAreas.map((s, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800">
                      <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs uppercase tracking-wider mb-2">
                        <AlertTriangle className="w-4 h-4" /> Weak Topics & Recommendations
                      </div>
                      <ul className="space-y-1 text-xs text-stone-700 dark:text-stone-300">
                        {result.weakAreas.map((w, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Detailed Review Section */}
                  <div className="space-y-4 pt-4 border-t border-stone-200 dark:border-stone-800">
                    <h4 className="font-bold text-base text-stone-900 dark:text-white flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-emerald-500" />
                      Detailed Question Review
                    </h4>

                    <div className="space-y-3">
                      {result.answers.map((ans, idx) => (
                        <div
                          key={ans.question.id}
                          className={`p-4 rounded-2xl border transition-all ${ans.isCorrect
                              ? 'bg-emerald-500/5 border-emerald-200 dark:border-emerald-800/40'
                              : 'bg-rose-500/5 border-rose-200 dark:border-rose-800/40'
                            }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300">
                                Q{idx + 1}
                              </span>
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 ${ans.isCorrect
                                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                                  : 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300'
                                }`}>
                                {ans.isCorrect ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                {ans.isCorrect ? 'Correct' : ans.userAnswer === undefined ? 'Unanswered' : 'Incorrect'}
                              </span>
                              {ans.question.targetItem && (
                                <span className="text-[11px] text-stone-500 dark:text-stone-400">
                                  Target: {ans.question.targetItem}
                                </span>
                              )}
                            </div>
                            <AudioButton text={ans.question.prompt} size="sm" />
                          </div>

                          <div className="mt-2 text-stone-900 dark:text-white font-medium text-sm leading-relaxed">
                            <FuriganaText text={ans.question.prompt} />
                          </div>

                          {ans.question.contextSentence && (
                            <div className="mt-1 text-xs text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-800/60 p-2 rounded-xl">
                              <FuriganaText text={ans.question.contextSentence} />
                            </div>
                          )}

                          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            <div className={`p-2 rounded-xl border ${ans.isCorrect
                                ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                                : 'bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300'
                              }`}>
                              <span className="font-semibold block">Your Answer:</span>
                              <span className="font-bold text-sm">
                                {ans.userAnswer !== undefined ? (
                                  <FuriganaText text={ans.userAnswer} />
                                ) : (
                                  'None (Skipped)'
                                )}
                              </span>
                            </div>

                            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300">
                              <span className="font-semibold block">Correct Answer:</span>
                              <span className="font-bold text-sm">
                                <FuriganaText text={ans.question.correctAnswer} />
                              </span>
                            </div>
                          </div>

                          {ans.question.explanation && (
                            <div className="mt-2 text-xs text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-stone-800/40 p-2.5 rounded-xl border border-stone-200 dark:border-stone-800">
                              <strong className="text-stone-700 dark:text-stone-300 block mb-0.5">Explanation:</strong>
                              <FuriganaText text={ans.question.explanation} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 flex flex-wrap items-center justify-end gap-3">
                    <button
                      onClick={() => fetchQuestions(true)}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold text-xs sm:text-sm transition-colors"
                    >
                      <Sparkles className="w-4 h-4" />
                      Generate New Questions & Retake
                    </button>
                    <button
                      onClick={() => {
                        setUserAnswers({});
                        setMarkedForReview(new Set());
                        setTimeLeft(initialTimeSeconds);
                        setCurrentIndex(0);
                        setIsSubmitted(false);
                        setResult(null);
                      }}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-bold text-xs sm:text-sm transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Retake Same Set
                    </button>
                    <button
                      onClick={onClose}
                      className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-colors"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : currentQ ? (
                /* Active Question Testing Screen */
                <div className="space-y-6">
                  {/* Question Meta Bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                        Question {currentIndex + 1} of {questions.length}
                      </span>
                      {currentQ.targetItem && (
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-medium">
                          {currentQ.targetItem}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={toggleMarkForReview}
                      className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-colors ${markedForReview.has(currentQ.id)
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
                          : 'border-stone-200 dark:border-stone-800 text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800'
                        }`}
                    >
                      <Flag className={`w-3.5 h-3.5 ${markedForReview.has(currentQ.id) ? 'fill-amber-500 text-amber-500' : ''}`} />
                      <span>{markedForReview.has(currentQ.id) ? 'Marked for Review' : 'Mark for Review'}</span>
                    </button>
                  </div>

                  {/* Question Prompt */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-800 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-base sm:text-lg font-bold text-stone-900 dark:text-white leading-relaxed">
                        <FuriganaText text={currentQ.prompt} />
                      </div>
                      <AudioButton text={currentQ.prompt} size="md" />
                    </div>

                    {currentQ.contextSentence && (
                      <div className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 font-japanese text-sm flex items-center justify-between gap-3">
                        <FuriganaText text={currentQ.contextSentence} />
                        <AudioButton text={currentQ.contextSentence} size="sm" />
                      </div>
                    )}
                  </div>

                  {/* 4 Options Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentQ.options.map((option, optIdx) => {
                      const isSelected = userAnswers[currentQ.id] === option;
                      const letter = String.fromCharCode(65 + optIdx); // A, B, C, D

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(option)}
                          className={`p-4 rounded-2xl text-left border-2 transition-all flex items-center justify-between gap-3 ${isSelected
                              ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30 shadow-sm'
                              : 'border-stone-200 dark:border-stone-800 hover:border-emerald-300 dark:hover:border-emerald-700 bg-white dark:bg-stone-900'
                            }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${isSelected
                                ? 'bg-emerald-500 text-white'
                                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                              }`}>
                              {letter}
                            </span>
                            <span className="font-japanese text-stone-900 dark:text-white font-medium text-sm sm:text-base">
                              <FuriganaText text={option} />
                            </span>
                          </div>
                          <AudioButton text={option} size="sm" />
                        </button>
                      );
                    })}
                  </div>

                  {/* Question Navigation Drawer Pills */}
                  <div className="pt-2">
                    <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 mb-2">
                      Question Palette ({questions.length - unansweredCount}/{questions.length} answered)
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {questions.map((q, idx) => {
                        const isAnswered = userAnswers[q.id] !== undefined;
                        const isMarked = markedForReview.has(q.id);
                        const isCurrent = idx === currentIndex;

                        let bgClass = 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700';
                        if (isAnswered) {
                          bgClass = 'bg-emerald-500 text-white border-emerald-600';
                        }
                        if (isMarked) {
                          bgClass = 'bg-amber-400 text-stone-900 border-amber-500';
                        }
                        if (isCurrent) {
                          bgClass += ' ring-2 ring-emerald-500 ring-offset-2 dark:ring-offset-stone-900';
                        }

                        return (
                          <button
                            key={q.id}
                            onClick={() => setCurrentIndex(idx)}
                            className={`w-7 h-7 rounded-lg text-xs font-bold border transition-transform active:scale-95 flex items-center justify-center ${bgClass}`}
                          >
                            {idx + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-stone-500">
                  No questions found. Please try generating questions again.
                </div>
              )}
            </div>

            {/* Footer Bar */}
            {!isSubmitted && questions.length > 0 && !loading && (
              <div className="px-6 py-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 flex items-center justify-between">
                <button
                  onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-40 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-2">
                  {currentIndex < questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : null}

                  <button
                    onClick={() => {
                      if (unansweredCount > 0) {
                        setShowConfirmSubmit(true);
                      } else {
                        handleSubmit();
                      }
                    }}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-stone-900 dark:bg-white text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-100 shadow-sm transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit Test</span>
                  </button>
                </div>
              </div>
            )}

            {/* Confirmation Modal for Unanswered Questions */}
            {showConfirmSubmit && (
              <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
                  <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400">
                    <AlertCircle className="w-6 h-6" />
                    <h4 className="font-bold text-base text-stone-900 dark:text-white">Submit Examination?</h4>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    You have <strong className="text-stone-900 dark:text-white">{unansweredCount} unanswered questions</strong> out of {questions.length}. Are you ready to submit and evaluate your score?
                  </p>
                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      onClick={() => setShowConfirmSubmit(false)}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                    >
                      Continue Test
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="px-4 py-1.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white"
                    >
                      Submit Anyway
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
        );
}

