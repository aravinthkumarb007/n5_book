'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  Clock,
  Play,
  BrainCircuit,
  Loader2,
  ChevronRight,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Check,
  RefreshCw,
  Layers,
  HelpCircle,
  FileText,
  Volume2,
  BookOpen,
  Pause,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { KanjiRecord, UserKanjiProgress } from '@/types/kanji';
import { ALL_120_KANJI, LEVEL_METADATA } from '@/data/kanjiDatabase';
import {
  AiLevelQuestion,
  AiLevelExamEvaluation,
  JLPT_QUESTION_TYPE_META,
  getCumulativeLearnedKanjiPool,
  evaluateAiLevelExam
} from '@/services/aiKanjiLevelAssessmentService';
import { storage } from '@/services/storage';
import { FuriganaText } from './FuriganaText';
import { AudioButton } from './AudioButton';

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

// Strips bracketed furigana/reading annotations attached to kanji:
// e.g. 漢字[かんじ], 漢字(かんじ), 漢字（かんじ）, 漢字【かんじ】 -> 漢字
function stripFurigana(text: string): string {
  if (!text) return '';
  return text.replace(/([\u4E00-\u9FAF\u3005]+)\s*[\[(（【<]\s*[ぁ-んァ-ヶー]+\s*[\])）】>]/g, '$1');
}

interface AiKanjiLevelAssessmentModalProps {
  level: number;
  isOpen: boolean;
  onClose: () => void;
  progressMap: Record<number, UserKanjiProgress>;
  onAssessmentCompleted?: () => void;
}

export const AiKanjiLevelAssessmentModal: React.FC<AiKanjiLevelAssessmentModalProps> = ({
  level,
  isOpen,
  onClose,
  progressMap,
  onAssessmentCompleted
}) => {
  // Phases: 'setup' | 'exam' | 'review_sheet' | 'results'
  const [phase, setPhase] = useState<'setup' | 'exam' | 'review_sheet' | 'results'>('setup');

  // Exam Configuration
  const [questionCount, setQuestionCount] = useState<number>(8);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [timerEnabled, setTimerEnabled] = useState<boolean>(true);
  const [timerMinutes, setTimerMinutes] = useState<number>(10);

  // Active Exam State
  const [questions, setQuestions] = useState<AiLevelQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({}); // questionId -> selected answer
  const [isAdvancing, setIsAdvancing] = useState(false); // Prevents accidental double-taps
  const [isLoading, setIsLoading] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  // Timer State
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(600);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);
  const [examStartTime, setExamStartTime] = useState<number>(0);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Results State
  const [finalEvaluation, setFinalEvaluation] = useState<AiLevelExamEvaluation | null>(null);

  // Level Metadata
  const levelMeta = useMemo(() => {
    return LEVEL_METADATA.find(l => l.level === level) || LEVEL_METADATA[0];
  }, [level]);

  // Learned Kanji IDs from progressMap
  const learnedKanjiIds = useMemo(() => {
    return Object.values(progressMap)
      .filter(p => p.learning_status === 'learned' || p.learning_status === 'needs_revision')
      .map(p => p.kanji_id);
  }, [progressMap]);

  // Cumulative pool breakdown
  const poolData = useMemo(() => {
    return getCumulativeLearnedKanjiPool(level, learnedKanjiIds);
  }, [level, learnedKanjiIds]);

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setPhase('setup');
      setQuestions([]);
      setCurrentIndex(0);
      setAnswers({});
      setIsAdvancing(false);
      setErrorNotice(null);
      setFinalEvaluation(null);
      setTimeRemainingSeconds(timerMinutes * 60);
      setIsTimerPaused(false);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isOpen, level, timerMinutes]);

  // Timer countdown hook
  useEffect(() => {
    if (phase === 'exam' && timerEnabled && !isTimerPaused) {
      timerIntervalRef.current = setInterval(() => {
        setTimeRemainingSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current!);
            handleFinalSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [phase, timerEnabled, isTimerPaused]);

  if (!isOpen) return null;

  // Start Assessment: Generate AI Questions
  const handleStartExam = async () => {
    setIsLoading(true);
    setErrorNotice(null);

    try {
      const res = await fetch('/api/ai/kanji-level-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          level,
          learnedKanjiIds,
          count: questionCount,
          difficulty
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate AI Level Assessment.');
      }

      if (data.questions && Array.isArray(data.questions) && data.questions.length > 0) {
        setQuestions(data.questions);
        setCurrentIndex(0);
        setAnswers({});
        setTimeRemainingSeconds(timerMinutes * 60);
        setExamStartTime(Date.now());
        setPhase('exam');
      } else {
        throw new Error('AI returned an empty question list. Please try again.');
      }
    } catch (err: any) {
      setErrorNotice(err.message || 'Error generating AI questions. Please verify your AI API key in Settings.');
    } finally {
      setIsLoading(false);
    }
  };

  const currentQ = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const isAllAnswered = questions.length > 0 && answeredCount === questions.length;

  // Format timer display mm:ss
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Option Selection: Auto-advance immediately upon selection
  const handleSelectOption = (option: string) => {
    if (!currentQ || isAdvancing) return;

    setIsAdvancing(true);
    const updatedAnswers = {
      ...answers,
      [currentQ.id]: option
    };
    setAnswers(updatedAnswers);

    // Tactile 280ms feedback then immediately proceed to next question or submit results
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setIsAdvancing(false);
      } else {
        // Last question answered: immediately transition to assessment results
        setIsAdvancing(false);
        handleFinalSubmit(updatedAnswers);
      }
    }, 280);
  };

  // Keyboard navigation for A/B/C/D and 1/2/3/4
  useEffect(() => {
    if (phase !== 'exam' || !currentQ || isAdvancing) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const key = e.key.toUpperCase();
      let optIdx = -1;
      if (key === 'A' || key === '1') optIdx = 0;
      else if (key === 'B' || key === '2') optIdx = 1;
      else if (key === 'C' || key === '3') optIdx = 2;
      else if (key === 'D' || key === '4') optIdx = 3;

      if (optIdx >= 0 && optIdx < currentQ.options.length) {
        e.preventDefault();
        handleSelectOption(currentQ.options[optIdx]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, currentQ, isAdvancing, currentIndex, questions, answers]);

  // Final Submit
  const handleFinalSubmit = (customAnswers?: Record<string, string>) => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    const effectiveAnswers = customAnswers || answers;
    const timeSpent = Math.max(1, Math.round((Date.now() - examStartTime) / 1000));
    const evaluation = evaluateAiLevelExam(questions, effectiveAnswers, level, timeSpent);
    setFinalEvaluation(evaluation);
    setPhase('results');

    // Confetti celebration if passed (>=80%)
    if (evaluation.isPassed) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}
    }

    // Record exam results in storage
    storage.recordKanjiLevelTestResult({
      id: `ai_exam_${Date.now()}`,
      test_type: 'level_ai',
      level,
      title: `Level ${level} AI Cumulative Assessment`,
      score_percent: evaluation.accuracyPercent,
      total_questions: evaluation.totalQuestions,
      correct_count: evaluation.score,
      incorrect_count: evaluation.totalQuestions - evaluation.score,
      is_passed: evaluation.isPassed,
      generation_mode: '100% Pure AI (Cumulative Learned Pool)',
      kanji_ids_tested: Array.from(new Set(questions.map(q => q.kanjiId))),
      answers: questions.map(q => ({
        questionId: q.id,
        kanjiId: q.kanjiId,
        prompt: q.prompt,
        selectedAnswer: effectiveAnswers[q.id] || '',
        correctAnswer: q.correctAnswer,
        isCorrect: effectiveAnswers[q.id] === q.correctAnswer
      })),
      time_spent_seconds: timeSpent,
      created_at: new Date().toISOString()
    });

    onAssessmentCompleted?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-stone-100 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center font-bold text-sm shadow-xs">
              <BrainCircuit size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                  AI Kanji Level Assessment
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300">
                  Level {level}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                  JLPT N5 / NAT-TEST 5Q
                </span>
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                {levelMeta.title} • Cumulative Learned Pool Assessment
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">

          {/* ============================================================== */}
          {/* PHASE 1: EXAM SETUP & BRIEFING                                 */}
          {/* ============================================================== */}
          {phase === 'setup' && (
            <div className="space-y-5">
              {/* Level Briefing Hero Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-red-50/80 via-stone-50 to-amber-50/40 dark:from-red-950/30 dark:via-stone-900/60 dark:to-amber-950/20 border border-red-200/80 dark:border-red-900/50 shadow-xs space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-red-700 dark:text-red-300 uppercase tracking-wider">
                    Official JLPT & NAT-TEST Exam Preparation Engine
                  </span>
                </div>
                <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                  Take Level {level} AI Kanji Assessment
                </h2>
                <p className="text-xs text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed">
                  Evaluate your overall Kanji comprehension and test-readiness in one centralized assessment. All questions are dynamically synthesized by AI using <strong>only the Kanji you have learned</strong>, combining Level {level} with previously completed levels for maximum long-term retention.
                </p>
              </div>

              {/* Cumulative Learned Pool Breakdown */}
              <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-850/50 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                    Cumulative Learned Kanji Pool ({poolData.cumulativePool.length} Total Characters)
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    ✓ Zero Unlearned Kanji
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <span className="text-stone-700 dark:text-stone-300">Level {level} Learned Pool</span>
                      <span className="text-red-600 dark:text-red-400">{poolData.currentLevelLearned.length} Kanji</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {poolData.currentLevelLearned.map(k => (
                        <span key={k.id} className="px-1.5 py-0.5 rounded text-xs font-japanese font-semibold bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200/60 dark:border-red-900/60">
                          {k.character}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <span className="text-stone-700 dark:text-stone-300">Previous Levels (1–{level - 1}) Retention Pool</span>
                      <span className="text-stone-600 dark:text-stone-400">{poolData.previousLevelsLearned.length} Kanji</span>
                    </div>
                    <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto">
                      {poolData.previousLevelsLearned.length > 0 ? (
                        poolData.previousLevelsLearned.map(k => (
                          <span key={k.id} className="px-1.5 py-0.5 rounded text-xs font-japanese font-semibold bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300">
                            {k.character}
                          </span>
                        ))
                      ) : (
                        <span className="text-[11px] text-stone-400 italic">Level 1 is the foundational tier.</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Exam Format & Question Types */}
              <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-850 space-y-2">
                <span className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                  Authentic JLPT & NAT-TEST Examination Question Patterns
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-1 text-xs">
                  <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-0.5">
                    <p className="font-bold text-stone-800 dark:text-stone-200">1. 漢字の読み</p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">Kanji reading identification in authentic context.</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-0.5">
                    <p className="font-bold text-stone-800 dark:text-stone-200">2. 表記・漢字選択</p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">Selecting correct Kanji for Hiragana words.</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-0.5">
                    <p className="font-bold text-stone-800 dark:text-stone-200">3. 語彙の意味</p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">Meaning of multi-Kanji compound words (熟語).</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-0.5">
                    <p className="font-bold text-stone-800 dark:text-stone-200">4. 文脈規定</p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">Contextual word selection in realistic situations.</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-0.5">
                    <p className="font-bold text-stone-800 dark:text-stone-200">5. 文中漢字選択</p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">Completing Japanese sentences with accurate Kanji.</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60 space-y-0.5">
                    <p className="font-bold text-stone-800 dark:text-stone-200">6. 4択問題</p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">Strictly 4 plausible choices with realistic distractors.</p>
                  </div>
                </div>
              </div>

              {/* Exam Settings */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                    Question Count
                  </label>
                  <select
                    value={questionCount}
                    onChange={e => setQuestionCount(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl text-xs font-semibold border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  >
                    <option value={8}>8 Questions (Standard Assessment)</option>
                    <option value={10}>10 Questions (Official Exam Format)</option>
                    <option value={12}>12 Questions (Comprehensive Drill)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                    Exam Difficulty
                  </label>
                  <select
                    value={difficulty}
                    onChange={e => setDifficulty(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl text-xs font-semibold border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  >
                    <option value="easy">🟢 Easy (Basic Recall & Recognition)</option>
                    <option value="medium">🟡 Medium (Standard JLPT N5 / NAT-TEST 5Q)</option>
                    <option value="hard">🟣 Hard (Advanced Context & Distractors)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                    Exam Timer
                  </label>
                  <div className="flex items-center gap-2">
                    <select
                      value={timerEnabled ? timerMinutes : 0}
                      onChange={e => {
                        const val = Number(e.target.value);
                        if (val === 0) {
                          setTimerEnabled(false);
                        } else {
                          setTimerEnabled(true);
                          setTimerMinutes(val);
                        }
                      }}
                      className="w-full p-2.5 rounded-xl text-xs font-semibold border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                    >
                      <option value={10}>⏱️ 10 Minutes (Standard Exam)</option>
                      <option value={15}>⏱️ 15 Minutes (Extended Exam)</option>
                      <option value={0}>Untimed (Practice Mode)</option>
                    </select>
                  </div>
                </div>
              </div>

              {poolData.cumulativePool.length === 0 && (
                <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-200 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <AlertTriangle size={15} /> No Learned Kanji in Pool Yet
                  </p>
                  <p>
                    The AI assessment dynamically evaluates only Kanji you have already learned. Please study and pass at least one Kanji in Level {level} (or previous levels) to unlock this assessment.
                  </p>
                </div>
              )}

              {errorNotice && (
                <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-300 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <AlertTriangle size={14} /> AI Exam Generation Notice
                  </p>
                  <p>{errorNotice}</p>
                </div>
              )}

              {/* Start Button */}
              <div className="pt-2">
                <button
                  type="button"
                  disabled={isLoading || poolData.cumulativePool.length === 0}
                  onClick={handleStartExam}
                  className="w-full py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-98"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Synthesizing AI Cumulative Exam for Level {level}...</span>
                    </>
                  ) : poolData.cumulativePool.length === 0 ? (
                    <>
                      <BookOpen size={16} />
                      <span>Study Kanji to Unlock AI Level Assessment</span>
                    </>
                  ) : (
                    <>
                      <Play size={16} className="fill-current" />
                      <span>Start AI Kanji Level Assessment ({questionCount} Questions)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* PHASE 2: ACTIVE EXAMINATION INTERFACE                          */}
          {/* ============================================================== */}
          {phase === 'exam' && currentQ && (
            <div className="space-y-4">
              {/* Top Exam Navigation Bar with Progress Indicator */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-sm font-bold text-stone-900 dark:text-stone-100">
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300">
                    {currentQ.questionTypeLabel}
                  </span>
                  {currentQ.isCurrentLevel ? (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200">
                      Level {level} Focus
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300">
                      Level {currentQ.kanjiLevel} Retention
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {/* Timer Display */}
                  {timerEnabled && (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-bold text-stone-800 dark:text-stone-200">
                      <Clock size={13} className={timeRemainingSeconds < 120 ? 'text-red-500 animate-pulse' : 'text-stone-500'} />
                      <span className={timeRemainingSeconds < 120 ? 'text-red-600 dark:text-red-400 font-mono' : 'font-mono'}>
                        {formatTimer(timeRemainingSeconds)}
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsTimerPaused(!isTimerPaused)}
                        className="ml-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
                        title={isTimerPaused ? 'Resume timer' : 'Pause timer'}
                      >
                        {isTimerPaused ? <Play size={11} /> : <Pause size={11} />}
                      </button>
                    </div>
                  )}

                  {/* Review Sheet Button */}
                  <button
                    type="button"
                    onClick={() => setPhase('review_sheet')}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-bold transition cursor-pointer"
                    title="Review answered and unanswered questions"
                  >
                    <FileText size={12} />
                    <span>Review ({answeredCount}/{questions.length})</span>
                  </button>
                </div>
              </div>

              {/* Sleek Progress Bar */}
              <div className="w-full bg-stone-100 dark:bg-stone-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-600 to-rose-500 transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Main Question Card (Authentic JLPT / NAT-TEST Exam Presentation: NO Furigana, NO Hints) */}
              <div className="p-5 sm:p-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-850 space-y-4 shadow-xs">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                      問題 {currentIndex + 1}
                    </span>
                    <span className="text-[11px] text-stone-400 dark:text-stone-500">
                      Tap an option to answer & auto-advance
                    </span>
                  </div>

                  {/* Clean Question Prompt without Furigana or Reading Hints */}
                  <h3 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 font-japanese leading-relaxed">
                    {stripFurigana(currentQ.prompt)}
                  </h3>

                  {currentQ.subPrompt && (
                    <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                      {stripFurigana(currentQ.subPrompt)}
                    </p>
                  )}
                </div>

                {/* Optional Context Sentence without Furigana */}
                {currentQ.contextSentence && (
                  <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 font-japanese text-base sm:text-lg font-semibold text-stone-800 dark:text-stone-200 leading-relaxed">
                    {stripFurigana(currentQ.contextSentence)}
                  </div>
                )}
              </div>

              {/* 4 Options Grid (A, B, C, D) - Selecting Option Automatically Navigates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = answers[currentQ.id] === opt;
                  const label = OPTION_LABELS[idx] || String(idx + 1);

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isAdvancing}
                      onClick={() => handleSelectOption(opt)}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 text-base font-semibold font-japanese active:scale-98 disabled:pointer-events-none ${
                        isSelected
                          ? 'border-red-600 bg-red-50/90 dark:bg-red-950/50 text-red-950 dark:text-red-100 shadow-sm ring-2 ring-red-500/30'
                          : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-800 hover:border-red-300 dark:hover:border-red-700 hover:bg-stone-50/50 dark:hover:bg-stone-750 text-stone-800 dark:text-stone-200'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 transition ${
                          isSelected
                            ? 'bg-red-600 text-white shadow-xs'
                            : 'bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300'
                        }`}>
                          {label}
                        </span>
                        <span className="truncate">{stripFurigana(opt)}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Subtle Navigation Bar: Previous Question Only (No separate Next button) */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  disabled={currentIndex === 0 || isAdvancing}
                  onClick={() => setCurrentIndex(prev => prev - 1)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200 text-xs font-semibold transition cursor-pointer disabled:opacity-0 disabled:pointer-events-none"
                >
                  <ArrowLeft size={14} />
                  <span>Previous Question</span>
                </button>

                <span className="text-[11px] text-stone-400 dark:text-stone-500">
                  Select A, B, C, or D (or press keys A/B/C/D)
                </span>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* PHASE 3: PRE-SUBMISSION REVIEW SHEET                           */}
          {/* ============================================================== */}
          {phase === 'review_sheet' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-850 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                    Examination Overview & Answer Sheet
                  </h3>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    isAllAnswered
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                      : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                  }`}>
                    {answeredCount} / {questions.length} Answered
                  </span>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400">
                  {isAllAnswered
                    ? 'All questions have been answered. You may submit your examination or click any question to review.'
                    : `You have ${questions.length - answeredCount} unanswered question(s). Click any question below to complete your answer.`}
                </p>
              </div>

              {/* Questions Overview List */}
              <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
                {questions.map((q, idx) => {
                  const ans = answers[q.id];

                  return (
                    <div
                      key={q.id}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setPhase('exam');
                      }}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 text-xs ${
                        ans
                          ? 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-800 hover:border-stone-400'
                          : 'border-amber-300 dark:border-amber-800 bg-amber-50/40 dark:bg-amber-950/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-lg font-bold flex items-center justify-center shrink-0 ${
                          ans ? 'bg-stone-100 dark:bg-stone-700 text-stone-800 dark:text-stone-200' : 'bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100'
                        }`}>
                          {idx + 1}
                        </span>
                        <div>
                          <p className="font-semibold text-stone-800 dark:text-stone-200 line-clamp-1 font-japanese">
                            {stripFurigana(q.prompt)}
                          </p>
                          <p className="text-[11px] text-stone-500 dark:text-stone-400">
                            {ans ? `Selected: ${ans}` : '⚠️ Unanswered – Click to answer'}
                          </p>
                        </div>
                      </div>

                      <ChevronRight size={15} className="text-stone-400 shrink-0" />
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-stone-100 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setPhase('exam')}
                  className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-bold transition cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  ← Return to Questions
                </button>

                <button
                  type="button"
                  onClick={() => handleFinalSubmit()}
                  className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Send size={14} />
                  <span>Confirm & Submit Examination</span>
                </button>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* PHASE 4: DETAILED AI PERFORMANCE EVALUATION (RESULTS)          */}
          {/* ============================================================== */}
          {phase === 'results' && finalEvaluation && (
            <div className="space-y-5">
              {/* Mastery Banner */}
              <div className={`p-5 rounded-2xl border text-center space-y-2 shadow-xs ${
                finalEvaluation.isPassed
                  ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
                  : 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800'
              }`}>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white dark:bg-stone-800 shadow-md mb-1">
                  {finalEvaluation.accuracyPercent >= 90 ? (
                    <Award size={26} className="text-amber-500" />
                  ) : finalEvaluation.isPassed ? (
                    <CheckCircle2 size={26} className="text-emerald-500" />
                  ) : (
                    <RotateCcw size={26} className="text-amber-600" />
                  )}
                </div>

                <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                  {finalEvaluation.accuracyPercent >= 90
                    ? `🏆 Level ${level} Exam Ready (合格圏内)!`
                    : finalEvaluation.isPassed
                    ? `🌟 Level ${level} Assessment Passed!`
                    : `📖 Level ${level} Practice Completed – Review Recommended`}
                </h3>

                <p className="text-xs text-stone-600 dark:text-stone-400 max-w-lg mx-auto">
                  {finalEvaluation.isPassed
                    ? `You demonstrated strong cumulative retention across Level ${level} and previous foundational levels.`
                    : `Focus on the recommended Kanji below to solidify your retention before taking the official exam.`}
                </p>

                {/* Score & Exam Readiness Status */}
                <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs font-bold text-stone-800 dark:text-stone-200">
                  <span>Score: {finalEvaluation.score} / {finalEvaluation.totalQuestions} ({finalEvaluation.accuracyPercent}%)</span>
                  <span>•</span>
                  <span>Status: <strong className="text-red-600 dark:text-red-400">{finalEvaluation.examReadinessRating}</strong></span>
                  <span>•</span>
                  <span>Time: {Math.floor(finalEvaluation.timeSpentSeconds / 60)}m {finalEvaluation.timeSpentSeconds % 60}s</span>
                </div>
              </div>

              {/* Cumulative Retention Diagnostic Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-850 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-stone-800 dark:text-stone-200">Level {level} New Kanji Performance</span>
                    <span className="text-red-600 dark:text-red-400">{finalEvaluation.currentLevelStats.pct}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                    <div
                      className="h-full bg-red-600 rounded-full transition-all duration-500"
                      style={{ width: `${finalEvaluation.currentLevelStats.pct}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    {finalEvaluation.currentLevelStats.correct} / {finalEvaluation.currentLevelStats.total} questions answered correctly.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-850 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-stone-800 dark:text-stone-200">Previous Levels (1–{level - 1}) Retention</span>
                    <span className="text-emerald-600 dark:text-emerald-400">{finalEvaluation.previousLevelsStats.pct}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                      style={{ width: `${finalEvaluation.previousLevelsStats.pct}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    {finalEvaluation.previousLevelsStats.correct} / {finalEvaluation.previousLevelsStats.total} questions answered correctly.
                  </p>
                </div>
              </div>

              {/* Strengths & Weak Areas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/20 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    <Check size={14} />
                    <span>Demonstrated Strengths</span>
                  </div>
                  <ul className="text-xs space-y-1 text-emerald-900 dark:text-emerald-200">
                    {finalEvaluation.strengths.map((s, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/30 dark:bg-amber-950/20 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
                    <AlertTriangle size={14} />
                    <span>Target Focus & Revision Areas</span>
                  </div>
                  <ul className="text-xs space-y-1 text-amber-900 dark:text-amber-200">
                    {finalEvaluation.weakAreas.map((w, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Personalized AI Recommendations */}
              {finalEvaluation.recommendations.length > 0 && (
                <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-850 space-y-2">
                  <span className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles size={13} className="text-amber-500" /> Personalized AI Exam Guidance
                  </span>
                  <ul className="text-xs space-y-1 text-stone-700 dark:text-stone-300">
                    {finalEvaluation.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-red-500 font-bold">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Kanji Requiring Additional Revision */}
              {finalEvaluation.incorrectKanji.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider flex items-center gap-1.5">
                    <RotateCcw size={13} /> Kanji Requiring Revision ({finalEvaluation.incorrectKanji.length})
                  </h4>

                  <div className="space-y-2">
                    {finalEvaluation.incorrectKanji.map((item, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-800/50 space-y-2 shadow-xs">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span className="font-japanese text-3xl font-bold text-stone-900 dark:text-stone-100">
                              {item.kanji.character}
                            </span>
                            <div>
                              <p className="text-xs font-bold text-stone-800 dark:text-stone-200">
                                {item.kanji.meaning} (Level {item.kanji.level})
                              </p>
                              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                                Onyomi: {item.kanji.onyomi_readings.join(', ') || 'N/A'} • Kunyomi: {item.kanji.kunyomi_readings.join(', ') || 'N/A'}
                              </p>
                            </div>
                          </div>
                          <AudioButton text={item.kanji.character} size="sm" />
                        </div>

                        <div className="text-xs space-y-1 p-2 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800">
                          <p className="text-stone-700 dark:text-stone-300">
                            <strong>Question:</strong> {item.questionPrompt}
                          </p>
                          <div className="flex gap-4 text-[11px]">
                            <span className="text-rose-600 dark:text-rose-400">Your Answer: {item.selectedAnswer}</span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Correct: {item.correctAnswer}</span>
                          </div>
                          <p className="text-[11px] text-stone-600 dark:text-stone-400 pt-0.5">
                            <strong>Explanation:</strong> {item.explanation}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Complete Question Review Accordion / List */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
                  Complete Examination Review ({questions.length} Questions)
                </h4>

                <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-1">
                  {questions.map((q, idx) => {
                    const userAns = answers[q.id];
                    const isCorrect = userAns === q.correctAnswer;

                    return (
                      <div
                        key={q.id}
                        className={`p-3.5 rounded-xl border text-xs space-y-2 ${
                          isCorrect
                            ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/10'
                            : 'border-rose-200 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/10'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2">
                            {isCorrect ? (
                              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                            ) : (
                              <XCircle size={16} className="text-rose-600 shrink-0" />
                            )}
                            <span className="font-bold text-stone-800 dark:text-stone-200">
                              問題 {idx + 1}: <FuriganaText text={q.prompt} />
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-semibold text-stone-500">
                              {q.questionTypeLabel}
                            </span>
                            {q.audioTarget && (
                              <AudioButton text={q.audioTarget} size="sm" />
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <span className={isCorrect ? 'text-emerald-700 dark:text-emerald-300 font-semibold' : 'text-rose-600 dark:text-rose-400'}>
                            Your choice: {userAns || '(Unanswered)'}
                          </span>
                          <span className="text-emerald-700 dark:text-emerald-300 font-semibold">
                            Correct: {q.correctAnswer}
                          </span>
                        </div>

                        <div className="text-[11px] text-stone-600 dark:text-stone-400 pt-0.5 border-t border-stone-200/60 dark:border-stone-800">
                          <FuriganaText text={q.explanation} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons: Retake / Finish */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-stone-100 dark:border-stone-800">
                <button
                  type="button"
                  onClick={handleStartExam}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-bold transition cursor-pointer"
                >
                  <RefreshCw size={13} />
                  <span>Retake Assessment (New AI Questions)</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition cursor-pointer"
                >
                  Save & Return to Kanji Levels
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
