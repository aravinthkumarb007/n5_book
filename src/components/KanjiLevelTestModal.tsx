'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  X, Sparkles, CheckCircle2, XCircle, Award, RotateCcw,
  Clock, Play, BookOpen, Bot, ShieldCheck, Loader2,
  ChevronRight, AlertTriangle, Layers, Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { KanjiRecord, QuizQuestion, UserKanjiProgress, KanjiLevelTestResult } from '@/types/kanji';
import { LEVEL_METADATA, LevelInfo } from '@/data/kanjiDatabase';
import { getHardcodedQuestionsForLevel } from '@/data/hardcodedLevelQuestions';
import { storage } from '@/services/storage';
import { FuriganaText } from './FuriganaText';
import { AudioButton } from './AudioButton';

export type TestScopeMode = 'level_test' | 'all_unlocked_ai';
export type TestGenerationType = 'hardcoded' | 'ai';

interface KanjiLevelTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  scopeMode: TestScopeMode;
  initialLevel?: number;
  kanjiList: KanjiRecord[];
  progressMap: Record<number, UserKanjiProgress>;
  onTestCompleted?: () => void;
}

export function KanjiLevelTestModal({
  isOpen,
  onClose,
  scopeMode,
  initialLevel = 1,
  kanjiList,
  progressMap,
  onTestCompleted
}: KanjiLevelTestModalProps) {
  // Setup & Configuration State
  const [selectedLevel, setSelectedLevel] = useState<number>(initialLevel);
  const [generationType, setGenerationType] = useState<TestGenerationType>(
    scopeMode === 'all_unlocked_ai' ? 'ai' : 'hardcoded'
  );
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [aiProvider, setAiProvider] = useState<'auto' | 'groq' | 'gemini'>('auto');

  // Active Test State
  const [testPhase, setTestPhase] = useState<'setup' | 'testing' | 'results'>('setup');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  // Results & Analytics State
  const [userAnswersLog, setUserAnswersLog] = useState<{
    questionId: string;
    kanjiId: number;
    prompt: string;
    selectedAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    explanation: string;
  }[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [totalTimeSpent, setTotalTimeSpent] = useState<number>(0);

  // Auto-advance Timer Ref
  const autoAdvanceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync initial level when opened
  useEffect(() => {
    if (isOpen) {
      setSelectedLevel(initialLevel);
      setGenerationType(scopeMode === 'all_unlocked_ai' ? 'ai' : 'hardcoded');
      setTestPhase('setup');
      setQuestions([]);
      setCurrentIndex(0);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setUserAnswersLog([]);
      setCorrectCount(0);
      setErrorNotice(null);
    }
  }, [isOpen, initialLevel, scopeMode]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
    };
  }, []);

  if (!isOpen) return null;

  // Selected level metadata
  const currentLevelMeta = LEVEL_METADATA.find(l => l.level === selectedLevel) || LEVEL_METADATA[0];

  // Eligible Kanji Pool for Level Test
  const levelKanjiPool = kanjiList.filter(k => k.level === selectedLevel);

  // Eligible Kanji Pool for "All Learned / Unlocked Kanji" Test
  const allLearnedOrUnlockedPool = kanjiList.filter(k => {
    const prog = progressMap[k.id];
    // Include all kanji that are not locked
    return prog ? prog.learning_status !== 'locked' : (k.level === 1);
  });

  const activePool = scopeMode === 'all_unlocked_ai' ? allLearnedOrUnlockedPool : levelKanjiPool;

  // Start the Test
  const handleStartTest = async (overrideType?: TestGenerationType) => {
    const typeToUse = scopeMode === 'all_unlocked_ai' ? 'ai' : (overrideType || generationType);
    setErrorNotice(null);
    setIsLoadingQuestions(true);

    if (typeToUse === 'hardcoded') {
      setLoadingMessage('Loading official curriculum questions...');
      const hardcodedQs = getHardcodedQuestionsForLevel(selectedLevel);
      if (hardcodedQs.length > 0) {
        setQuestions(hardcodedQs);
        setCurrentIndex(0);
        setSelectedOption(null);
        setIsAnswerSubmitted(false);
        setUserAnswersLog([]);
        setCorrectCount(0);
        setStartTime(Date.now());
        setTestPhase('testing');
      } else {
        setErrorNotice(`No predefined questions found for Level ${selectedLevel}.`);
      }
      setIsLoadingQuestions(false);
      return;
    }

    // AI Generation Mode
    setLoadingMessage(
      scopeMode === 'all_unlocked_ai'
        ? `Generating AI test covering all ${allLearnedOrUnlockedPool.length} learned/unlocked Kanji...`
        : `Generating dynamic AI test for Level ${selectedLevel} (${currentLevelMeta.title})...`
    );

    try {
      const targetPool = scopeMode === 'all_unlocked_ai' ? allLearnedOrUnlockedPool : levelKanjiPool;

      if (targetPool.length === 0) {
        setErrorNotice('No eligible Kanji found to generate a test.');
        setIsLoadingQuestions(false);
        return;
      }

      // Determine appropriate question count (10 questions for level, or up to 15 for comprehensive)
      const count = scopeMode === 'all_unlocked_ai'
        ? Math.min(20, Math.max(8, targetPool.length))
        : 10;

      const res = await fetch('/api/ai/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eligibleKanjiPool: targetPool,
          count,
          testType: 'vocab_recognition',
          difficulty,
          topic: scopeMode === 'all_unlocked_ai'
            ? `All Learned & Unlocked N5 Kanji (${targetPool.length} characters)`
            : `Level ${selectedLevel} Mastery Test (${currentLevelMeta.theme})`,
          provider: aiProvider === 'auto' ? undefined : aiProvider
        })
      });

      const data = await res.json();
      if (data.success && Array.isArray(data.questions) && data.questions.length > 0) {
        setQuestions(data.questions);
        setCurrentIndex(0);
        setSelectedOption(null);
        setIsAnswerSubmitted(false);
        setUserAnswersLog([]);
        setCorrectCount(0);
        setStartTime(Date.now());
        setTestPhase('testing');
      } else {
        // Fallback for Level test: use hardcoded questions if AI is offline
        if (scopeMode === 'level_test') {
          const fallbackQs = getHardcodedQuestionsForLevel(selectedLevel);
          if (fallbackQs.length > 0) {
            setQuestions(fallbackQs);
            setCurrentIndex(0);
            setSelectedOption(null);
            setIsAnswerSubmitted(false);
            setUserAnswersLog([]);
            setCorrectCount(0);
            setStartTime(Date.now());
            setTestPhase('testing');
            setErrorNotice('AI service unreachable. Loaded official curriculum questions as fallback.');
          } else {
            setErrorNotice(data.error || 'Failed to generate AI questions. Please try again.');
          }
        } else {
          setErrorNotice(data.error || 'Failed to generate AI test. Please verify your AI API key in Settings.');
        }
      }
    } catch (err: any) {
      setErrorNotice(err.message || 'Network error while generating questions.');
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  // Requirement 2: Automatic Navigation Between Questions
  const handleSelectOption = (option: string) => {
    if (isAnswerSubmitted) return;

    const currentQ = questions[currentIndex];
    const isCorrect = option === currentQ.correctAnswer;

    setSelectedOption(option);
    setIsAnswerSubmitted(true);

    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    }

    // Log the answer
    setUserAnswersLog(prev => [
      ...prev,
      {
        questionId: currentQ.id,
        kanjiId: currentQ.kanjiId,
        prompt: currentQ.prompt,
        selectedAnswer: option,
        correctAnswer: currentQ.correctAnswer,
        isCorrect,
        explanation: currentQ.explanation
      }
    ]);

    // Record question in quiz history and update accuracy in storage
    storage.recordQuizResult?.({
      kanji_id: currentQ.kanjiId,
      question_type: currentQ.type,
      selected_answer: option,
      correct_answer: currentQ.correctAnswer,
      is_correct: isCorrect,
      time_taken_seconds: 5
    });

    // Update kanji progress
    const currentProg = progressMap[currentQ.kanjiId];
    if (currentProg) {
      const newMistakes = isCorrect ? currentProg.mistake_count : currentProg.mistake_count + 1;
      const newStatus = !isCorrect && currentProg.learning_status === 'learned'
        ? 'needs_revision'
        : currentProg.learning_status;

      storage.updateSingleKanjiProgress(currentQ.kanjiId, {
        mistake_count: newMistakes,
        learning_status: newStatus,
        last_studied_at: new Date().toISOString()
      });
    }

    // Smooth Automatic Navigation to Next Question after 800ms
    if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
    autoAdvanceTimerRef.current = setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(prev => prev + 1);
        setSelectedOption(null);
        setIsAnswerSubmitted(false);
      } else {
        handleFinishTest();
      }
    }, 800);
  };

  // Complete and Finalize Test
  const handleFinishTest = () => {
    if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);

    const timeSpent = Math.max(5, Math.round((Date.now() - startTime) / 1000));
    setTotalTimeSpent(timeSpent);

    // Calculate score (currentQ answer was already accounted in correctCount or evaluate)
    const finalScorePercent = Math.round((correctCount / questions.length) * 100);
    const isPassed = finalScorePercent >= 80;

    if (isPassed) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}
    }

    // Persist Level Test Record in Neon & LocalStorage (Requirement 5 & 6)
    const testRecord: KanjiLevelTestResult = {
      id: `test_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      test_type: scopeMode === 'all_unlocked_ai' ? 'all_unlocked_ai' : (generationType === 'hardcoded' ? 'level_hardcoded' : 'level_ai'),
      level: scopeMode === 'all_unlocked_ai' ? undefined : selectedLevel,
      title: scopeMode === 'all_unlocked_ai'
        ? `AI Comprehensive Test (${allLearnedOrUnlockedPool.length} Kanji)`
        : `Level ${selectedLevel} Mastery Test (${currentLevelMeta.title})`,
      score_percent: finalScorePercent,
      total_questions: questions.length,
      correct_count: correctCount,
      incorrect_count: questions.length - correctCount,
      is_passed: isPassed,
      generation_mode: scopeMode === 'all_unlocked_ai' ? `ai_${aiProvider}` : generationType,
      kanji_ids_tested: Array.from(new Set(questions.map(q => q.kanjiId))),
      answers: userAnswersLog,
      time_spent_seconds: timeSpent,
      created_at: new Date().toISOString()
    };

    storage.recordKanjiLevelTestResult(testRecord);
    onTestCompleted?.();
    setTestPhase('results');
  };

  const currentQ = questions[currentIndex];
  const progressPercent = questions.length > 0 ? Math.round(((currentIndex + 1) / questions.length) * 100) : 0;
  const finalScorePercent = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
  const isPassed = finalScorePercent >= 80;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[94vh]">

        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-stone-100 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-900/80 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="p-2 sm:p-2.5 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 shrink-0">
              {scopeMode === 'all_unlocked_ai' ? <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" /> : <Award className="w-5 h-5" />}
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-white">
                  {scopeMode === 'all_unlocked_ai'
                    ? 'AI Comprehensive Test'
                    : `Level ${selectedLevel} Mastery Test`}
                </h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  scopeMode === 'all_unlocked_ai'
                    ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300'
                    : generationType === 'ai'
                      ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
                      : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                }`}>
                  {scopeMode === 'all_unlocked_ai' ? 'AI Only' : (generationType === 'ai' ? 'AI Mode' : 'Curriculum')}
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                {scopeMode === 'all_unlocked_ai'
                  ? `Covering all ${allLearnedOrUnlockedPool.length} learned/unlocked Kanji`
                  : `${currentLevelMeta.title} • 10 Kanji`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* PHASE 1: SETUP SCREEN                                              */}
        {/* ------------------------------------------------------------------ */}
        {testPhase === 'setup' && (
          <div className="p-4 sm:p-6 space-y-6 overflow-y-auto flex-1">
            {errorNotice && (
              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{errorNotice}</span>
              </div>
            )}

            {/* Level Selector (Only when in Level Test mode) */}
            {scopeMode === 'level_test' && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  Select Kanji Level
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {LEVEL_METADATA.map((lvl) => {
                    const isSelected = selectedLevel === lvl.level;
                    return (
                      <button
                        key={lvl.level}
                        type="button"
                        onClick={() => setSelectedLevel(lvl.level)}
                        className={`p-2.5 rounded-xl border text-center transition cursor-pointer ${
                          isSelected
                            ? 'bg-red-600 text-white border-red-600 font-bold shadow-sm'
                            : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100'
                        }`}
                      >
                        <div className="text-xs font-bold">Lvl {lvl.level}</div>
                        <div className={`text-[10px] mt-0.5 font-japanese truncate ${isSelected ? 'text-red-100' : 'text-stone-400'}`}>
                          {lvl.theme.split(' ').slice(0, 3).join('')}...
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Kanji Scope Overview Banner */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-stone-700 dark:text-stone-200">
                <span>Tested Kanji Characters:</span>
                <span className="text-red-600 dark:text-red-400 font-mono">
                  {activePool.length} Characters
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activePool.map(k => (
                  <span
                    key={k.id}
                    className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-sm font-japanese font-bold text-stone-800 dark:text-stone-100 shadow-xs"
                    title={`${k.character} (${k.meaning})`}
                  >
                    {k.character}
                  </span>
                ))}
              </div>
            </div>

            {/* Requirement 3: Test Generation Mode Selection */}
            {scopeMode === 'level_test' && (
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  Test Generation Mode
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Mode 1: Hardcoded Questions */}
                  <div
                    onClick={() => setGenerationType('hardcoded')}
                    className={`p-4 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between ${
                      generationType === 'hardcoded'
                        ? 'border-red-600 bg-red-50/40 dark:bg-red-950/20 shadow-sm'
                        : 'border-stone-200 dark:border-stone-800 hover:border-stone-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <BookOpen className={`w-4 h-4 ${generationType === 'hardcoded' ? 'text-red-600' : 'text-stone-500'}`} />
                        <span className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white">
                          Curriculum Questions
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                        Predefined, verified JLPT N5 questions stored directly in the application. Fast and 100% offline.
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-red-600 mt-2 uppercase tracking-wider">
                      Mode 1: Hardcoded
                    </span>
                  </div>

                  {/* Mode 2: AI-Generated Questions */}
                  <div
                    onClick={() => setGenerationType('ai')}
                    className={`p-4 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between ${
                      generationType === 'ai'
                        ? 'border-purple-600 bg-purple-50/40 dark:bg-purple-950/20 shadow-sm'
                        : 'border-stone-200 dark:border-stone-800 hover:border-stone-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Sparkles className={`w-4 h-4 ${generationType === 'ai' ? 'text-purple-600' : 'text-stone-500'}`} />
                        <span className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white">
                          AI-Generated Test
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                        Dynamically synthesized questions powered by Gemini or Groq, customized strictly to this level.
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-purple-600 mt-2 uppercase tracking-wider">
                      Mode 2: AI Dynamic
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* AI Settings (When AI mode is active) */}
            {(generationType === 'ai' || scopeMode === 'all_unlocked_ai') && (
              <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/60 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-900 dark:text-purple-200">
                  <Bot className="w-4 h-4 text-purple-600" />
                  <span>AI Test Generation Options</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-semibold text-stone-600 dark:text-stone-300 block mb-1">
                      Difficulty Level:
                    </label>
                    <div className="flex gap-1.5">
                      {(['easy', 'medium', 'hard'] as const).map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setDifficulty(d)}
                          className={`flex-1 py-1.5 rounded-lg font-bold capitalize transition cursor-pointer text-xs ${
                            difficulty === d
                              ? 'bg-purple-600 text-white'
                              : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-stone-600 dark:text-stone-300 block mb-1">
                      AI Provider:
                    </label>
                    <div className="flex gap-1.5">
                      {(['auto', 'gemini', 'groq'] as const).map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setAiProvider(p)}
                          className={`flex-1 py-1.5 rounded-lg font-bold capitalize transition cursor-pointer text-xs ${
                            aiProvider === p
                              ? 'bg-purple-600 text-white'
                              : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
                          }`}
                        >
                          {p === 'auto' ? 'Auto' : p === 'gemini' ? 'Gemini' : 'Groq'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Start Button */}
            <button
              onClick={() => handleStartTest()}
              disabled={isLoadingQuestions || activePool.length === 0}
              className={`w-full py-3.5 rounded-2xl text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                scopeMode === 'all_unlocked_ai' || generationType === 'ai'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {isLoadingQuestions ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{loadingMessage || 'Preparing Test Questions...'}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>
                    {scopeMode === 'all_unlocked_ai'
                      ? `Generate AI Test (${allLearnedOrUnlockedPool.length} Kanji)`
                      : `Start Level ${selectedLevel} Test (${generationType === 'ai' ? 'AI Generated' : 'Curriculum'})`}
                  </span>
                </>
              )}
            </button>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* PHASE 2: ACTIVE TEST QUESTION RUNNER                               */}
        {/* ------------------------------------------------------------------ */}
        {testPhase === 'testing' && currentQ && (
          <div className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1 flex flex-col justify-between">
            {/* Top Question Progress & Badge */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-stone-500 dark:text-stone-400">
                <span className="flex items-center gap-1.5">
                  <span className="font-bold text-red-600 dark:text-red-400">
                    Question {currentIndex + 1}
                  </span>
                  <span>/ {questions.length}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-[10px] font-bold uppercase">
                  <Clock className="w-3 h-3 text-stone-400" />
                  <span>Auto-Advance</span>
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-600 to-rose-500 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-stone-50/70 dark:bg-stone-800/40 rounded-2xl border border-stone-200 dark:border-stone-700/60 p-5 text-center space-y-3">
              <div className="flex items-center justify-center gap-3">
                <div className="font-japanese text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white">
                  <FuriganaText text={currentQ.prompt} />
                </div>
                <AudioButton text={currentQ.prompt.replace(/\[.*?\]/g, '')} size="md" />
              </div>

              {currentQ.secondaryPrompt && (
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-medium">
                  {currentQ.secondaryPrompt}
                </p>
              )}
            </div>

            {/* Multiple Choice Options (4 Choices) */}
            <div className="space-y-2.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 text-center">
                Select the correct answer (moves automatically to next question)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentQ.options.map((option, idx) => {
                  const isSelected = selectedOption === option;
                  const isCorrect = option === currentQ.correctAnswer;

                  let optionStyle = 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 hover:border-stone-400 text-stone-800 dark:text-stone-100';

                  if (isAnswerSubmitted) {
                    if (isCorrect) {
                      optionStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-200 ring-2 ring-emerald-500/30';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-800 dark:text-rose-200 ring-2 ring-rose-500/30';
                    } else {
                      optionStyle = 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 opacity-60 text-stone-400';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(option)}
                      disabled={isAnswerSubmitted}
                      className={`p-3.5 sm:p-4 rounded-2xl border-2 text-left font-semibold text-xs sm:text-sm transition-all duration-150 flex items-center justify-between gap-2 cursor-pointer disabled:cursor-default ${optionStyle}`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-5 h-5 rounded-full bg-stone-100 dark:bg-stone-700 flex items-center justify-center text-[10px] font-bold text-stone-600 dark:text-stone-300 shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="truncate">
                          <FuriganaText text={option} />
                        </span>
                      </div>

                      {isAnswerSubmitted && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 animate-scaleIn" />
                      )}
                      {isAnswerSubmitted && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0 animate-scaleIn" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Answer Explanation Strip (Shown immediately when answered) */}
            {isAnswerSubmitted && (
              <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-xs text-stone-600 dark:text-stone-300 animate-fadeIn">
                <span className="font-bold text-stone-800 dark:text-stone-100">Explanation: </span>
                <span>{currentQ.explanation}</span>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* PHASE 3: RESULTS & PERFORMANCE SUMMARY                             */}
        {/* ------------------------------------------------------------------ */}
        {testPhase === 'results' && (
          <div className="p-4 sm:p-6 space-y-6 overflow-y-auto flex-1">
            {/* Top Score Banner */}
            <div className={`p-6 rounded-3xl text-center space-y-2 border ${
              isPassed
                ? 'bg-gradient-to-b from-emerald-500/15 to-emerald-500/5 border-emerald-500/30'
                : 'bg-gradient-to-b from-rose-500/15 to-rose-500/5 border-rose-500/30'
            }`}>
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-white dark:bg-stone-800 shadow-md">
                {isPassed ? (
                  <Award className="w-8 h-8 text-emerald-600" />
                ) : (
                  <RotateCcw className="w-8 h-8 text-rose-600" />
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white">
                {isPassed ? 'Test Passed! Level Mastered' : 'Needs More Practice'}
              </h2>

              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-md mx-auto">
                {isPassed
                  ? `Great job! You scored ${finalScorePercent}% and demonstrated mastery over the tested Kanji.`
                  : `You scored ${finalScorePercent}%. Pass criteria is 80%. Review the questions below and try again!`}
              </p>

              {/* Score Badges */}
              <div className="flex items-center justify-center gap-4 pt-3">
                <div className="px-4 py-2 rounded-xl bg-white dark:bg-stone-800 shadow-xs border border-stone-200 dark:border-stone-700">
                  <span className="text-[10px] text-stone-400 block font-semibold uppercase">Score</span>
                  <span className="text-lg font-black text-stone-900 dark:text-white">
                    {correctCount} / {questions.length} ({finalScorePercent}%)
                  </span>
                </div>
                <div className="px-4 py-2 rounded-xl bg-white dark:bg-stone-800 shadow-xs border border-stone-200 dark:border-stone-700">
                  <span className="text-[10px] text-stone-400 block font-semibold uppercase">Time</span>
                  <span className="text-lg font-black text-stone-900 dark:text-white">
                    {totalTimeSpent}s
                  </span>
                </div>
              </div>
            </div>

            {/* Detailed Question Review */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Question Breakdown & Review
              </h4>

              <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                {userAnswersLog.map((ans, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-xs space-y-1 ${
                      ans.isCorrect
                        ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60'
                        : 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60'
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-stone-800 dark:text-stone-200">
                        Q{idx + 1}: <FuriganaText text={ans.prompt} />
                      </span>
                      {ans.isCorrect ? (
                        <span className="text-emerald-600 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                        </span>
                      ) : (
                        <span className="text-rose-600 font-bold flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" /> Incorrect
                        </span>
                      )}
                    </div>
                    {!ans.isCorrect && (
                      <div className="text-[11px] text-stone-500 dark:text-stone-400">
                        Your answer: <span className="text-rose-600 font-medium">{ans.selectedAnswer}</span> • Correct: <span className="text-emerald-600 font-bold">{ans.correctAnswer}</span>
                      </div>
                    )}
                    <div className="text-[10px] text-stone-400 dark:text-stone-500 pt-0.5">
                      {ans.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                onClick={() => handleStartTest()}
                className="flex-1 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md transition cursor-pointer flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Test</span>
              </button>

              {scopeMode === 'level_test' && generationType === 'hardcoded' && (
                <button
                  onClick={() => handleStartTest('ai')}
                  className="flex-1 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm shadow-md transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Try AI-Generated Test</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="py-3 px-5 rounded-2xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 font-bold text-xs sm:text-sm transition cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
