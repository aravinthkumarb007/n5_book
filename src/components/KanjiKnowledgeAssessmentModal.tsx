'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  Play,
  BrainCircuit,
  Loader2,
  AlertTriangle,
  TrendingUp,
  Target,
  ArrowRight,
  Lightbulb,
  Check,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { KanjiRecord, QuizResultRecord } from '@/types/kanji';
import { ALL_120_KANJI, LEVEL_METADATA } from '@/data/kanjiDatabase';
import {
  PedagogicalQuestion,
  PedagogicalAssessmentSummary,
  AssessmentDifficulty,
  CATEGORY_META,
  evaluatePedagogicalAssessment
} from '@/services/pedagogicalAssessmentService';
import { storage } from '@/services/storage';
import { FuriganaText } from './FuriganaText';
import { AudioButton } from './AudioButton';

interface KanjiKnowledgeAssessmentModalProps {
  kanji: KanjiRecord;
  isOpen: boolean;
  onClose: () => void;
  onAssessmentCompleted?: () => void;
}

export const KanjiKnowledgeAssessmentModal: React.FC<KanjiKnowledgeAssessmentModalProps> = ({
  kanji,
  isOpen,
  onClose,
  onAssessmentCompleted
}) => {
  // Test Phase: 'setup' | 'testing' | 'summary'
  const [phase, setPhase] = useState<'setup' | 'testing' | 'summary'>('setup');

  // Configuration State
  const [questionCount, setQuestionCount] = useState<number>(8);
  const [currentDifficulty, setCurrentDifficulty] = useState<AssessmentDifficulty>('medium');
  const [difficultyNotice, setDifficultyNotice] = useState<string | null>(null);

  // Active Questions & Progression
  const [questions, setQuestions] = useState<PedagogicalQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [providerUsed, setProviderUsed] = useState<string>('ai');

  // Answers & Analytics
  const [answersLog, setAnswersLog] = useState<{
    questionId: string;
    selectedAnswer: string;
    isCorrect: boolean;
  }[]>([]);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [finalSummary, setFinalSummary] = useState<PedagogicalAssessmentSummary | null>(null);

  // Lesson Metadata & Pool
  const lessonMeta = useMemo(() => {
    return LEVEL_METADATA.find(l => l.level === kanji.level) || LEVEL_METADATA[0];
  }, [kanji.level]);

  // All Kanji in this lesson
  const allLessonKanji = useMemo(() => {
    return ALL_120_KANJI.filter(k => k.level === kanji.level);
  }, [kanji.level]);

  // Peer Kanji to be tested (STRICT RULE: Exclude the currently selected Kanji)
  const peerKanjiPool = useMemo(() => {
    return allLessonKanji.filter(k => k.id !== kanji.id && k.character !== kanji.character);
  }, [allLessonKanji, kanji.id, kanji.character]);

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setPhase('setup');
      setQuestions([]);
      setCurrentIndex(0);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setAnswersLog([]);
      setConsecutiveCorrect(0);
      setDifficultyNotice(null);
      setErrorNotice(null);
      setFinalSummary(null);
      setCurrentDifficulty('medium');
    }
  }, [isOpen, kanji.id]);

  if (!isOpen) return null;

  // Pure AI Generation - No Hardcoded Questions
  const handleStartAssessment = async (overrideDifficulty?: AssessmentDifficulty) => {
    setIsLoading(true);
    setErrorNotice(null);
    const startDiff = overrideDifficulty || currentDifficulty;

    try {
      const res = await fetch('/api/ai/kanji-pedagogical-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kanjiId: kanji.id,
          level: kanji.level,
          count: questionCount,
          difficulty: startDiff
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate questions via AI.');
      }

      if (data.questions && Array.isArray(data.questions) && data.questions.length > 0) {
        setQuestions(data.questions);
        setProviderUsed(data.providerUsed || 'AI Engine');
        setCurrentIndex(0);
        setSelectedOption(null);
        setIsAnswerSubmitted(false);
        setAnswersLog([]);
        setConsecutiveCorrect(0);
        setStartTime(Date.now());
        setPhase('testing');
      } else {
        throw new Error('AI returned an empty question set. Please try again.');
      }
    } catch (err: any) {
      setErrorNotice(
        err.message ||
        'AI generation unavailable. Please ensure your Groq or Gemini API key is configured in Settings.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Current Question
  const currentQ = questions[currentIndex];

  // Option Selection & Immediate Feedback
  const handleSelectOption = (option: string) => {
    if (isAnswerSubmitted || !currentQ) return;

    setSelectedOption(option);
    setIsAnswerSubmitted(true);

    const isCorrect = option === currentQ.correctAnswer;
    const newAnswers = [
      ...answersLog,
      {
        questionId: currentQ.id,
        selectedAnswer: option,
        isCorrect
      }
    ];
    setAnswersLog(newAnswers);

    // Dynamic Adaptive Difficulty adjustment
    if (isCorrect) {
      const nextConsecutive = consecutiveCorrect + 1;
      setConsecutiveCorrect(nextConsecutive);

      if (nextConsecutive >= 2) {
        // Upgrade difficulty
        if (currentDifficulty === 'easy') {
          setCurrentDifficulty('medium');
          setDifficultyNotice('⚡ Adaptive Promotion: Upgraded to Medium (Application & Readings)!');
        } else if (currentDifficulty === 'medium') {
          setCurrentDifficulty('hard');
          setDifficultyNotice('🔥 Mastery Streak: Promoted to Hard (Contextual Nuances)!');
        }
        setConsecutiveCorrect(0);
      } else {
        setDifficultyNotice(null);
      }
    } else {
      setConsecutiveCorrect(0);
      // Step difficulty down to reinforce foundations
      if (currentDifficulty === 'hard') {
        setCurrentDifficulty('medium');
        setDifficultyNotice('🌱 Adjusting Difficulty: Medium (Reinforcing Core Concepts)');
      } else if (currentDifficulty === 'medium') {
        setCurrentDifficulty('easy');
        setDifficultyNotice('🌱 Adjusting Difficulty: Easy (Consolidating Fundamental Recognition)');
      } else {
        setDifficultyNotice(null);
      }
    }
  };

  // Advance to Next Question or Summary
  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setDifficultyNotice(null);
    } else {
      // Complete test & compile summary
      const timeSpent = Math.max(1, Math.round((Date.now() - startTime) / 1000));
      const summary = evaluatePedagogicalAssessment(questions, answersLog, timeSpent);
      setFinalSummary(summary);
      setPhase('summary');

      // Trigger Confetti if passed (>=80%)
      if (summary.isPassed) {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {}
      }

      // Record quiz result in local storage
      const quizRecords: QuizResultRecord[] = questions.map(q => {
        const userAns = answersLog.find(a => a.questionId === q.id);
        return {
          id: `ped_quiz_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          date: new Date().toISOString(),
          kanji_id: q.kanjiId,
          question_type: 'kanji_to_english',
          selected_answer: userAns ? userAns.selectedAnswer : '',
          correct_answer: q.correctAnswer,
          is_correct: userAns ? userAns.isCorrect : false,
          time_taken_seconds: Math.round(timeSpent / questions.length)
        };
      });
      storage.addQuizResults(quizRecords);

      // Record overall session
      storage.addStudySession({
        id: `sess_ped_${Date.now()}`,
        user_id: 'user_default',
        completed_at: new Date().toISOString(),
        session_duration: Math.round(timeSpent / 60) || 1,
        kanji_studied: Array.from(new Set(questions.map(q => q.kanjiId))),
        quiz_score: summary.accuracyPercent,
        mode: 'regular_lesson'
      });

      onAssessmentCompleted?.();
    }
  };

  // Retry full test via AI
  const handleRetryFullTest = () => {
    handleStartAssessment(currentDifficulty);
  };

  // Re-attempt missed questions from the AI set
  const handleRetryMissedQuestions = () => {
    if (!finalSummary || finalSummary.incorrectItems.length === 0) return;
    const incorrectPrompts = new Set(finalSummary.incorrectItems.map(i => i.questionPrompt));
    const missedQuestions = questions.filter(q => incorrectPrompts.has(q.prompt));

    if (missedQuestions.length > 0) {
      setQuestions(missedQuestions);
      setCurrentIndex(0);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setAnswersLog([]);
      setConsecutiveCorrect(0);
      setStartTime(Date.now());
      setPhase('testing');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-stone-100 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center font-bold text-sm shadow-xs">
              <BrainCircuit size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                  AI Pedagogical Enrichment – Kanji Assessment
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300">
                  Lesson {kanji.level}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
                  ✨ 100% Pure AI
                </span>
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                Testing the other {peerKanjiPool.length} Kanji in Lesson {kanji.level} (strictly excluding 「{kanji.character}」)
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
          {/* PHASE 1: SETUP & INTRO VIEW                                    */}
          {/* ============================================================== */}
          {phase === 'setup' && (
            <div className="space-y-5">
              {/* Target Kanji Being Studied (Notice of Exclusion) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-stone-50 via-stone-50 to-amber-50/40 dark:from-stone-900/60 dark:via-stone-900/40 dark:to-amber-950/20 border border-stone-200/80 dark:border-stone-800 flex flex-col sm:flex-row items-center sm:items-start gap-4 shadow-xs">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-xs flex flex-col items-center justify-center shrink-0 relative">
                  <span className="font-japanese text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
                    {kanji.character}
                  </span>
                </div>

                <div className="flex-1 text-center sm:text-left space-y-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                      Currently Studied Character
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200">
                      Excluded From Test Questions
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                    「{kanji.character}」 — {kanji.meaning}
                  </h2>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    To ensure authentic recall and practical comprehension, <strong>NO question will test this currently selected Kanji</strong>. Instead, the AI will evaluate your retention of the other {peerKanjiPool.length} Kanji covered in Lesson {kanji.level}.
                  </p>
                </div>
              </div>

              {/* Lesson Scope: The other peer kanji being tested */}
              <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-800/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                    Lesson {kanji.level} Peer Test Pool ({peerKanjiPool.length} Kanji)
                  </span>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    ✓ 100% AI-generated from this pool only
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {peerKanjiPool.map(k => (
                    <span
                      key={k.id}
                      className="px-2.5 py-1 rounded-lg text-sm font-bold font-japanese border bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 border-stone-200 dark:border-stone-700 shadow-xs"
                      title={`${k.meaning} (${k.hiragana_reading})`}
                    >
                      {k.character}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Pedagogical Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-850 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-stone-800 dark:text-stone-200">
                    <Target size={14} className="text-red-500" />
                    <span>Pure AI Synthesis</span>
                  </div>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    Every question is generated live by AI (recognition, readings, meanings, vocabulary, and sentences). Zero hardcoded questions.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-850 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-stone-800 dark:text-stone-200">
                    <TrendingUp size={14} className="text-amber-500" />
                    <span>Real-Time Adaptive Difficulty</span>
                  </div>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    Promotes to Hard on consecutive correct answers, or steps down to consolidate foundations when mistakes occur.
                  </p>
                </div>
              </div>

              {/* Question Count & Initial Difficulty */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                    AI Question Count
                  </label>
                  <select
                    value={questionCount}
                    onChange={e => setQuestionCount(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl text-xs font-semibold border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  >
                    <option value={6}>6 AI Questions (Focused Recall)</option>
                    <option value={8}>8 AI Questions (Standard Assessment)</option>
                    <option value={10}>10 AI Questions (Comprehensive Lesson Drill)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                    Initial Difficulty Tier
                  </label>
                  <select
                    value={currentDifficulty}
                    onChange={e => setCurrentDifficulty(e.target.value as AssessmentDifficulty)}
                    className="w-full p-2.5 rounded-xl text-xs font-semibold border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  >
                    <option value="easy">🟢 Easy (Direct Recognition & Meaning)</option>
                    <option value="medium">🟡 Medium (Readings & Vocabulary Usage)</option>
                    <option value="hard">🟣 Hard (Contextual Nuances & Sentence Fill)</option>
                  </select>
                </div>
              </div>

              {/* Error Notice */}
              {errorNotice && (
                <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-300 space-y-2">
                  <div className="flex items-center gap-2 font-bold">
                    <AlertTriangle size={15} />
                    <span>AI Generation Notice</span>
                  </div>
                  <p>{errorNotice}</p>
                  <p className="text-[11px] text-stone-500">
                    Ensure your Groq or Gemini API key is configured in the Settings tab to generate live AI questions.
                  </p>
                </div>
              )}

              {/* Start Button */}
              <div className="pt-2">
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleStartAssessment()}
                  className="w-full py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Synthesizing Pure AI Questions...</span>
                    </>
                  ) : (
                    <>
                      <Play size={16} />
                      <span>Generate & Start AI Assessment</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* PHASE 2: ACTIVE QUESTION INTERACTIVE ENGINE                    */}
          {/* ============================================================== */}
          {phase === 'testing' && currentQ && (
            <div className="space-y-4">
              {/* Live Status Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-700 dark:text-stone-300">
                      Question {currentIndex + 1} of {questions.length}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 font-semibold flex items-center gap-1">
                      <span>{CATEGORY_META[currentQ.category]?.icon || '🎯'}</span>
                      <span>{currentQ.categoryLabel}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Adaptive Difficulty Pill */}
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all ${
                        currentDifficulty === 'hard'
                          ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-300 dark:border-purple-800 text-purple-700 dark:text-purple-300 animate-pulse'
                          : currentDifficulty === 'medium'
                          ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300'
                          : 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
                      }`}
                    >
                      {currentDifficulty === 'hard' ? '🟣 Hard (Adaptive)' : currentDifficulty === 'medium' ? '🟡 Medium' : '🟢 Easy'}
                    </span>

                    {/* Live Score */}
                    <span className="font-bold text-stone-600 dark:text-stone-400 text-[11px]">
                      Score: {answersLog.filter(a => a.isCorrect).length} / {answersLog.length}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-amber-500 transition-all duration-300 rounded-full"
                    style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Adaptive Difficulty Adjustment Alert */}
              {difficultyNotice && (
                <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/60 text-xs font-semibold text-purple-800 dark:text-purple-300 flex items-center gap-2 animate-fadeIn">
                  <Sparkles size={14} className="shrink-0 text-purple-600 dark:text-purple-400" />
                  <span>{difficultyNotice}</span>
                </div>
              )}

              {/* Main Question Box */}
              <div className="p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-850/50 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 flex-1">
                    <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 font-japanese leading-relaxed">
                      <FuriganaText text={currentQ.prompt} />
                    </h3>
                    {currentQ.secondaryPrompt && (
                      <p className="text-xs text-stone-600 dark:text-stone-400 font-medium">
                        {currentQ.secondaryPrompt}
                      </p>
                    )}
                  </div>
                  {currentQ.audioTarget && (
                    <AudioButton text={currentQ.audioTarget} size="md" />
                  )}
                </div>

                {/* Context sentence if present */}
                {currentQ.contextSentence && (
                  <div className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 font-japanese text-sm sm:text-base font-semibold text-stone-800 dark:text-stone-200">
                    <FuriganaText text={currentQ.contextSentence} />
                  </div>
                )}
              </div>

              {/* 4 Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOption === opt;
                  const isCorrect = opt === currentQ.correctAnswer;

                  let btnStyle = 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-800 hover:border-red-400 dark:hover:border-red-600 text-stone-800 dark:text-stone-200';

                  if (isAnswerSubmitted) {
                    if (isCorrect) {
                      btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 shadow-sm ring-2 ring-emerald-500/20';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 shadow-sm';
                    } else {
                      btnStyle = 'border-stone-200 dark:border-stone-800 bg-stone-100/60 dark:bg-stone-850 opacity-60 text-stone-500';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isAnswerSubmitted}
                      onClick={() => handleSelectOption(opt)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 text-sm font-semibold font-japanese ${btnStyle}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 text-xs font-bold flex items-center justify-center shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {isAnswerSubmitted && isCorrect && (
                        <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                      )}
                      {isAnswerSubmitted && isSelected && !isCorrect && (
                        <XCircle size={18} className="text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Immediate Feedback Card */}
              {isAnswerSubmitted && (
                <div className="p-4 rounded-xl border space-y-3 animate-fadeIn border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-850">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {selectedOption === currentQ.correctAnswer ? (
                        <>
                          <CheckCircle2 size={18} className="text-emerald-600" />
                          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                            ✓ Correct! Outstanding retention.
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle size={18} className="text-rose-600" />
                          <span className="text-xs font-bold text-rose-700 dark:text-rose-300">
                            ✕ Incorrect. Correct answer: 「{currentQ.correctAnswer}」
                          </span>
                        </>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <span>{currentIndex < questions.length - 1 ? 'Next Question' : 'View Detailed Results'}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Detailed Explanation */}
                  <div className="text-xs text-stone-700 dark:text-stone-300 space-y-1.5 pt-1 border-t border-stone-200 dark:border-stone-800">
                    <p className="font-semibold text-stone-800 dark:text-stone-200">
                      📖 Pedagogical Breakdown:
                    </p>
                    <p className="leading-relaxed">{currentQ.explanation}</p>
                    {currentQ.mnemonicHint && (
                      <p className="text-[11px] text-amber-700 dark:text-amber-300 italic pt-0.5">
                        💡 Memory Tip: {currentQ.mnemonicHint}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* PHASE 3: COMPREHENSIVE PERFORMANCE SUMMARY                    */}
          {/* ============================================================== */}
          {phase === 'summary' && finalSummary && (
            <div className="space-y-5">
              {/* Mastery Banner */}
              <div
                className={`p-5 rounded-2xl border text-center space-y-2 shadow-xs ${
                  finalSummary.isPassed
                    ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
                    : 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800'
                }`}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white dark:bg-stone-800 shadow-md mb-1">
                  {finalSummary.accuracyPercent === 100 ? (
                    <Award size={26} className="text-amber-500" />
                  ) : finalSummary.isPassed ? (
                    <CheckCircle2 size={26} className="text-emerald-500" />
                  ) : (
                    <RotateCcw size={26} className="text-amber-600" />
                  )}
                </div>

                <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                  {finalSummary.accuracyPercent === 100
                    ? '🏆 Perfect Kanji Mastery (完璧)!'
                    : finalSummary.isPassed
                    ? `🌟 Lesson ${kanji.level} Peer Assessment Passed!`
                    : '📖 Good Effort – Review Recommended'}
                </h3>

                <p className="text-xs text-stone-600 dark:text-stone-400 max-w-lg mx-auto">
                  {finalSummary.isPassed
                    ? `You demonstrated strong retention across Lesson ${kanji.level} peer Kanji.`
                    : `Review the recommended Kanji below to solidify your understanding of Lesson ${kanji.level}.`}
                </p>

                {/* Score Stats */}
                <div className="flex items-center justify-center gap-6 pt-2 text-xs font-bold text-stone-800 dark:text-stone-200">
                  <span>Score: {finalSummary.score} / {finalSummary.totalQuestions} ({finalSummary.accuracyPercent}%)</span>
                  <span>•</span>
                  <span>Time: {Math.floor(finalSummary.timeSpentSeconds / 60)}m {finalSummary.timeSpentSeconds % 60}s</span>
                </div>
              </div>

              {/* Strengths & Weaknesses Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Strengths */}
                <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/20 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    <Check size={14} />
                    <span>Demonstrated Strengths</span>
                  </div>
                  <ul className="text-xs space-y-1 text-emerald-900 dark:text-emerald-200">
                    {finalSummary.strengths.map((s, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses / Focus Areas */}
                <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/30 dark:bg-amber-950/20 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
                    <AlertTriangle size={14} />
                    <span>Target Focus Areas</span>
                  </div>
                  <ul className="text-xs space-y-1 text-amber-900 dark:text-amber-200">
                    {finalSummary.weaknesses.map((w, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Category-by-Category Diagnostic Bars */}
              <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-850/50 space-y-2.5">
                <span className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                  Category Skill Diagnostics
                </span>
                <div className="space-y-2">
                  {finalSummary.categoryStats.map((stat, idx) => (
                    <div key={idx} className="space-y-1 text-xs">
                      <div className="flex justify-between font-semibold text-stone-700 dark:text-stone-300">
                        <span>{stat.label}</span>
                        <span>{stat.correct}/{stat.total} ({stat.accuracy}%)</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-stone-200 dark:bg-stone-700 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            stat.accuracy >= 80 ? 'bg-emerald-500' : stat.accuracy >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${stat.accuracy}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Personalized Review Recommendations for Missed Kanji */}
              {finalSummary.incorrectItems.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Lightbulb size={16} className="text-amber-500" />
                    <h4 className="text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
                      Personalized Review Cards (Missed Items)
                    </h4>
                  </div>

                  <div className="space-y-2.5">
                    {finalSummary.incorrectItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-800/50 space-y-2 shadow-xs"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span className="font-japanese text-3xl font-bold text-stone-900 dark:text-stone-100">
                              {item.kanji.character}
                            </span>
                            <div>
                              <p className="text-xs font-bold text-stone-800 dark:text-stone-200">
                                {item.kanji.meaning} (Lesson {item.kanji.level})
                              </p>
                              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                                Onyomi: {item.kanji.onyomi_readings.join(', ') || 'N/A'} • Kunyomi: {item.kanji.kunyomi_readings.join(', ') || 'N/A'}
                              </p>
                            </div>
                          </div>
                          <AudioButton text={item.kanji.character} size="sm" />
                        </div>

                        <div className="text-xs space-y-1 p-2.5 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800">
                          <p className="text-stone-700 dark:text-stone-300">
                            <strong>Question:</strong> {item.questionPrompt}
                          </p>
                          <div className="flex gap-4 text-[11px]">
                            <span className="text-rose-600 dark:text-rose-400">Your Answer: {item.selectedAnswer}</span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Correct: {item.correctAnswer}</span>
                          </div>
                          <p className="text-[11px] text-stone-600 dark:text-stone-400 pt-0.5">
                            <strong>Coach Tip:</strong> {item.recommendation}
                          </p>
                          <p className="text-[11px] text-amber-700 dark:text-amber-300 italic">
                            💡 Mnemonic: {item.mnemonic}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons: Retry Full AI Test / Retry Missed Questions / Close */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-stone-100 dark:border-stone-800">
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleRetryFullTest}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-bold transition cursor-pointer"
                  >
                    <RefreshCw size={13} />
                    <span>Generate New AI Test</span>
                  </button>

                  {finalSummary.incorrectItems.length > 0 && (
                    <button
                      type="button"
                      onClick={handleRetryMissedQuestions}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200 text-xs font-bold hover:bg-amber-100 dark:hover:bg-amber-900/40 transition cursor-pointer"
                    >
                      <Target size={13} />
                      <span>Retry Missed Questions ({finalSummary.incorrectItems.length})</span>
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition cursor-pointer"
                >
                  Save & Return to Study
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
