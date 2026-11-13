'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Play, CheckCircle2, XCircle, RotateCcw, AlertTriangle,
  Sparkles, Clock, BookOpen, ArrowRight, Zap, Trophy, ShieldCheck,
  Eye, EyeOff, Flame, Sliders, Bot, Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  KanjiRecord,
  QuizQuestion,
  QuizQuestionType,
  UserKanjiProgress
} from '@/types/kanji';
import { quizEngine } from '@/services/quizEngine';
import { storage } from '@/services/storage';
import { srsEngine } from '@/services/srs';
import { LEVEL_METADATA } from '@/data/kanjiDatabase';
import { AudioButton } from './AudioButton';
import { FuriganaText } from './FuriganaText';
import { AiQuizLoadingOverlay } from './common/AiQuizLoadingOverlay';

interface QuizViewProps {
  progressMap: Record<number, UserKanjiProgress>;
  onNavigateToLearn: () => void;
  onNavigateToWeak: () => void;
  onRefreshProgress: () => void;
  initialMode?: QuizQuestionType;
}

const QUIZ_MODES: { type: QuizQuestionType; title: string; desc: string; icon: string }[] = [
  { type: 'kanji_to_english', title: 'Kanji → English', desc: 'Identify the English meaning from the Japanese Kanji', icon: '文' },
  { type: 'english_to_kanji', title: 'English → Kanji', desc: 'Find the correct Kanji matching the English definition', icon: 'A→漢' },
  { type: 'kanji_to_onyomi', title: 'Kanji → Onyomi (音読み)', desc: 'Choose the correct Katakana reading', icon: 'オ' },
  { type: 'kanji_to_kunyomi', title: 'Kanji → Kunyomi (訓読み)', desc: 'Choose the correct Hiragana reading', icon: 'く' },
  { type: 'hiragana_to_kanji', title: 'Hiragana → Kanji', desc: 'Convert phonetic Hiragana reading to Kanji', icon: 'あ→漢' },
  { type: 'vocab_recognition', title: 'Vocabulary Context', desc: 'Identify meaning of compound words using learned kanji', icon: '語' },
  { type: 'sentence_completion', title: 'Sentence Fill-in', desc: 'Select the missing kanji in an example sentence', icon: '文章' },
  { type: 'timed_challenge', title: 'Timed Challenge (15s)', desc: 'Rapid-fire recognition under 15-second pressure', icon: '⚡' },
  { type: 'kanji_recognition', title: 'Rapid Recognition', desc: 'Fast-paced multi-attribute kanji verification', icon: '目' }
];

export function QuizView({
  progressMap,
  onNavigateToLearn,
  onNavigateToWeak,
  onRefreshProgress,
  initialMode = 'kanji_to_english'
}: QuizViewProps) {
  // State: setup | quiz | results
  const [phase, setPhase] = useState<'setup' | 'quiz' | 'results'>('setup');
  const [selectedMode, setSelectedMode] = useState<QuizQuestionType>(initialMode);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [selectedLevel, setSelectedLevel] = useState<'all' | number>('all');
  const [aiProvider, setAiProvider] = useState<'auto' | 'groq' | 'gemini'>('auto');
  const [useAiGeneration, setUseAiGeneration] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [generationMeta, setGenerationMeta] = useState<{
    providerUsed?: string;
    modelUsed?: string;
    difficulty?: string;
    source?: string;
  }>({});

  // Active quiz state
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showEnglishMeaning, setShowEnglishMeaning] = useState(false);
  const [answersLog, setAnswersLog] = useState<{
    question: QuizQuestion;
    selected: string;
    isCorrect: boolean;
    timeSpent: number;
  }[]>([]);

  // Timed challenge state
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const autoNextTimerRef = useRef<NodeJS.Timeout | null>(null);
  const questionStartTimeRef = useRef<number>(Date.now());

  // Cleanup auto-advance timer on unmount
  useEffect(() => {
    return () => {
      if (autoNextTimerRef.current) clearTimeout(autoNextTimerRef.current);
    };
  }, []);

  // Learned Kanji Pool strictly checked
  const eligiblePool = storage.getLearnedKanjiPool();

  // Reset English meaning toggle on question change
  useEffect(() => {
    setShowEnglishMeaning(false);
  }, [currentIndex, phase]);

  // Reset timer on question change
  useEffect(() => {
    if (phase === 'quiz' && selectedMode === 'timed_challenge') {
      setTimeLeft(15);
      if (timerRef.current) clearInterval(timerRef.current);

      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, phase, selectedMode]);

  const handleTimeUp = () => {
    if (isAnswerSubmitted) return;
    handleAnswerSubmit('__TIME_UP__');
  };

  const startQuiz = async () => {
    if (eligiblePool.length === 0) return;

    // Filter by selected level if applicable
    let targetPool = eligiblePool;
    if (selectedLevel !== 'all') {
      const lvlMeta = LEVEL_METADATA.find(l => l.level === selectedLevel);
      if (lvlMeta) {
        const filtered = eligiblePool.filter(k => lvlMeta.kanjiIds.includes(k.id));
        if (filtered.length >= 2) {
          targetPool = filtered;
        }
      }
    }

    const pastResults = storage.getQuizResults();
    const pastFingerprints = pastResults.slice(-20).map(r => `${r.question_type}:${r.correct_answer}`);

    if (useAiGeneration) {
      setIsAiLoading(true);
      setAiError(null);
      try {
        const res = await fetch('/api/ai/generate-quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eligibleKanjiPool: targetPool,
            count: questionCount,
            testType: selectedMode,
            difficulty,
            topic: selectedLevel === 'all' ? 'All Mastered N5 Kanji' : `Level ${selectedLevel}`,
            provider: aiProvider === 'auto' ? undefined : aiProvider,
            pastQuestionFingerprints: pastFingerprints
          })
        });
        const data = await res.json();
        if (data.success && data.questions && data.questions.length > 0) {
          setGenerationMeta({
            providerUsed: data.providerUsed,
            modelUsed: data.modelUsed,
            difficulty: data.difficulty || difficulty,
            source: data.source
          });
          setQuestions(data.questions);
          initQuizRun(data.questions);
          setIsAiLoading(false);
          return;
        } else {
          setAiError(data.error || 'AI quiz generation failed. Falling back to local engine.');
        }
      } catch (err: any) {
        setAiError(err.message || 'AI service unreachable. Using high-speed local engine.');
      }
      setIsAiLoading(false);
    }

    // Standard high-speed engine strictly utilizing learned pool with difficulty
    setGenerationMeta({
      difficulty,
      source: 'smart_local_engine'
    });
    const result = quizEngine.generateQuiz(selectedMode, questionCount, targetPool, difficulty);
    if (result.questions.length > 0) {
      setQuestions(result.questions);
      initQuizRun(result.questions);
    }
  };

  const initQuizRun = (qs: QuizQuestion[]) => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setAnswersLog([]);
    questionStartTimeRef.current = Date.now();
    setPhase('quiz');
  };

  const handleAnswerSubmit = (option: string) => {
    if (isAnswerSubmitted) return;
    if (timerRef.current) clearInterval(timerRef.current);

    const timeSpent = Math.max(1, Math.round((Date.now() - questionStartTimeRef.current) / 1000));
    const currentQ = questions[currentIndex];
    const isCorrect = option === currentQ.correctAnswer;

    setSelectedOption(option);
    setIsAnswerSubmitted(true);

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setAnswersLog(prev => [
      ...prev,
      {
        question: currentQ,
        selected: option,
        isCorrect,
        timeSpent
      }
    ]);

    // Update SRS and mistake tracking in storage
    const currentProg = progressMap[currentQ.kanjiId];
    if (currentProg) {
      const newMistakes = isCorrect ? currentProg.mistake_count : currentProg.mistake_count + 1;
      const newStatus = !isCorrect ? 'needs_revision' : currentProg.learning_status;
      const incorrectHistory = isCorrect
        ? currentProg.incorrect_history
        : Array.from(new Set([...currentProg.incorrect_history, `${currentQ.type}: answered "${option}" instead of "${currentQ.correctAnswer}"`]));

      // Update accuracy depending on question type
      let mAcc = currentProg.meaning_accuracy;
      let oAcc = currentProg.onyomi_accuracy;
      let kAcc = currentProg.kunyomi_accuracy;
      let vAcc = currentProg.vocabulary_accuracy;

      if (currentQ.type.includes('english')) {
        mAcc = isCorrect ? Math.min(100, mAcc + 5) : Math.max(0, mAcc - 15);
      } else if (currentQ.type.includes('onyomi')) {
        oAcc = isCorrect ? Math.min(100, oAcc + 5) : Math.max(0, oAcc - 15);
      } else if (currentQ.type.includes('kunyomi')) {
        kAcc = isCorrect ? Math.min(100, kAcc + 5) : Math.max(0, kAcc - 15);
      } else if (currentQ.type.includes('vocab')) {
        vAcc = isCorrect ? Math.min(100, vAcc + 5) : Math.max(0, vAcc - 15);
      }

      // SRS interval update
      const srsGrade = isCorrect ? 4 : 1; // 4 = good, 1 = again
      const srsUpdate = srsEngine.calculateNextReview(
        srsGrade,
        currentProg.srs_repetitions,
        currentProg.srs_ease_factor,
        currentProg.srs_interval
      );

      storage.updateKanjiProgress(currentQ.kanjiId, {
        mistake_count: newMistakes,
        learning_status: newStatus,
        incorrect_history: incorrectHistory,
        meaning_accuracy: mAcc,
        onyomi_accuracy: oAcc,
        kunyomi_accuracy: kAcc,
        vocabulary_accuracy: vAcc,
        srs_interval: srsUpdate.interval,
        srs_repetitions: srsUpdate.repetitions,
        srs_ease_factor: srsUpdate.easeFactor,
        next_review_at: srsUpdate.nextReviewDate.toISOString(),
        last_studied_at: new Date().toISOString()
      });
    }

    // Save individual quiz result record
    storage.recordQuizResult({
      kanji_id: currentQ.kanjiId,
      question_type: currentQ.type,
      selected_answer: option,
      correct_answer: currentQ.correctAnswer,
      is_correct: isCorrect,
      time_taken_seconds: timeSpent
    });

    // Auto-advance to next question smoothly after 850ms
    if (autoNextTimerRef.current) clearTimeout(autoNextTimerRef.current);
    autoNextTimerRef.current = setTimeout(() => {
      handleNextQuestion();
    }, 850);
  };

  const handleNextQuestion = () => {
    if (autoNextTimerRef.current) clearTimeout(autoNextTimerRef.current);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      questionStartTimeRef.current = Date.now();
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const finalScore = score + (selectedOption === questions[currentIndex]?.correctAnswer ? 0 : 0);
    const pct = Math.round((finalScore / questions.length) * 100);

    if (pct >= 80) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }

    // Record session
    storage.recordSession({
      user_id: 'user_default',
      session_duration: Math.max(1, Math.round(answersLog.reduce((acc, a) => acc + a.timeSpent, 0) / 60)),
      kanji_studied: Array.from(new Set(questions.map(q => q.kanjiId))),
      quiz_score: pct,
      mode: 'quiz'
    });

    onRefreshProgress();
    setPhase('results');
  };

  // ==========================================
  // PHASE 0: EMPTY POOL GUARD
  // ==========================================
  if (eligiblePool.length === 0) {
    return (
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-8 md:p-12 text-center max-w-2xl mx-auto shadow-sm w-full max-w-full min-w-0">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center mb-5">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
          Learned Kanji Pool is Empty
        </h2>
        <p className="text-stone-500 dark:text-stone-400 text-sm mt-3 leading-relaxed">
          The test engine is strictly designed to guarantee <strong className="text-stone-700 dark:text-stone-200">zero unlearned kanji</strong> in your questions and answer choices.
        </p>
        <div className="mt-4 p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 text-xs text-stone-600 dark:text-stone-300 text-left border border-stone-200 dark:border-stone-700">
          <p className="font-semibold text-stone-800 dark:text-stone-100 mb-1">To unlock the test engine:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Open <strong>Learn Kanji</strong> and select Level 1 (Kanji 1-10: 人 to 八).</li>
            <li>Study any kanji and take its 4-step assessment.</li>
            <li>Score 80%+ to earn the <span className="text-emerald-600 font-bold">Learned</span> status.</li>
            <li>Return here to test yourself across all 9 adaptive test modes!</li>
          </ol>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onNavigateToLearn}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition shadow-md text-sm"
          >
            <BookOpen className="w-4 h-4" />
            Go to Level 1 Curriculum
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // PHASE 1: QUIZ SETUP
  // ==========================================
  if (phase === 'setup') {
    return (
      <div className="space-y-6 max-w-4xl mx-auto w-full max-w-full min-w-0 overflow-x-hidden">
        {/* Banner */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-red-950 text-white p-6 md:p-8 rounded-2xl shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-semibold uppercase tracking-wider mb-2">
                <Zap className="w-3.5 h-3.5" />
                Adaptive Testing Engine
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Practice & Mastery Tests
              </h1>
              <p className="text-stone-300 text-sm mt-1 max-w-xl">
                Test yourself with 9 specialized question modes. Your test pool currently contains <strong className="text-white">{eligiblePool.length} mastered kanji</strong>. Distractors are strictly drawn only from this pool.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 text-center shrink-0">
              <span className="text-xs text-stone-300 block font-medium">Eligible Pool</span>
              <span className="text-2xl font-black text-white">{eligiblePool.length}</span>
              <span className="text-[10px] text-stone-400 block">Learned Kanji</span>
            </div>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm space-y-6">
          <div>
            <h2 className="text-base font-bold text-stone-900 dark:text-white mb-3">
              1. Select Test Mode (9 Formats)
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
              {QUIZ_MODES.map((m) => {
                const isSelected = selectedMode === m.type;
                return (
                  <button
                    key={m.type}
                    onClick={() => setSelectedMode(m.type)}
                    className={`p-3 sm:p-4 rounded-xl border text-left transition relative flex flex-col justify-between min-h-[115px] sm:min-h-[130px] ${isSelected
                      ? 'border-red-600 bg-red-50/60 dark:bg-red-950/30 text-stone-900 dark:text-white ring-2 ring-red-500/20 shadow-sm'
                      : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 bg-white dark:bg-stone-850 text-stone-700 dark:text-stone-300'
                      }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white font-bold flex items-center justify-center text-xs">
                          {m.icon}
                        </span>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-red-600" />
                        )}
                      </div>
                      <h3 className="font-bold text-xs sm:text-sm line-clamp-1">{m.title}</h3>
                    </div>
                    <p className="text-[10px] sm:text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2 leading-relaxed">
                      {m.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

            {/* 2. Kanji Scope & Difficulty Selection */}
            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h2 className="text-base font-bold text-stone-900 dark:text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-red-600" />
                  2. Scope & Target Level
                </h2>
                <span className="text-xs text-stone-500">
                  Target pool: <strong className="text-stone-900 dark:text-white">{
                    selectedLevel === 'all'
                      ? eligiblePool.length
                      : eligiblePool.filter(k => LEVEL_METADATA.find(l => l.level === selectedLevel)?.kanjiIds.includes(k.id)).length
                  }</strong> kanji
                </span>
              </div>

              {/* Level Scope Selector */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                <button
                  onClick={() => setSelectedLevel('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${selectedLevel === 'all'
                      ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900 shadow-sm'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                    }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  All Mastered ({eligiblePool.length})
                </button>
                {LEVEL_METADATA.map((lvl) => {
                  const countInPool = eligiblePool.filter(k => lvl.kanjiIds.includes(k.id)).length;
                  const isAvailable = countInPool >= 2;
                  return (
                    <button
                      key={lvl.level}
                      onClick={() => isAvailable && setSelectedLevel(lvl.level)}
                      disabled={!isAvailable}
                      title={!isAvailable ? 'Learn at least 2 Kanji in this level to unlock' : undefined}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition ${selectedLevel === lvl.level
                          ? 'bg-red-600 text-white shadow-sm font-bold'
                          : isAvailable
                            ? 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                            : 'bg-stone-50 dark:bg-stone-900/50 text-stone-400 dark:text-stone-600 cursor-not-allowed opacity-50 border border-dashed border-stone-200 dark:border-stone-800'
                        }`}
                    >
                      Lvl {lvl.level} ({countInPool})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Difficulty Level Selector */}
            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-base font-bold text-stone-900 dark:text-white flex items-center gap-2">
                  <Flame className="w-4 h-4 text-rose-500" />
                  3. Select Difficulty Level
                </label>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-400">
                  Difficulty: <span className={
                    difficulty === 'hard' ? 'text-rose-500' : difficulty === 'medium' ? 'text-amber-500' : 'text-emerald-500'
                  }>{difficulty}</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Easy */}
                <button
                  type="button"
                  onClick={() => setDifficulty('easy')}
                  className={`p-3.5 rounded-xl border text-left transition flex flex-col justify-between ${difficulty === 'easy'
                      ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30 ring-2 ring-emerald-500/30'
                      : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 bg-white dark:bg-stone-850'
                    }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-700 dark:text-emerald-300">
                        🌱 Easy • 初級
                      </span>
                      {difficulty === 'easy' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    </div>
                    <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-snug">
                      Basic readings & direct meanings with clearly distinguishable distractors.
                    </p>
                  </div>
                </button>

                {/* Medium */}
                <button
                  type="button"
                  onClick={() => setDifficulty('medium')}
                  className={`p-3.5 rounded-xl border text-left transition flex flex-col justify-between ${difficulty === 'medium'
                      ? 'border-amber-500 bg-amber-50/70 dark:bg-amber-950/30 ring-2 ring-amber-500/30'
                      : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 bg-white dark:bg-stone-850'
                    }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="inline-flex items-center gap-1 text-xs font-black text-amber-700 dark:text-amber-300">
                        ⚡ Medium • 中級
                      </span>
                      {difficulty === 'medium' && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
                    </div>
                    <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-snug">
                      Contextual compound usage, standard on/kun discrimination, and plausible options.
                    </p>
                  </div>
                </button>

                {/* Hard */}
                <button
                  type="button"
                  onClick={() => setDifficulty('hard')}
                  className={`p-3.5 rounded-xl border text-left transition flex flex-col justify-between ${difficulty === 'hard'
                      ? 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/30 ring-2 ring-rose-500/30'
                      : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 bg-white dark:bg-stone-850'
                    }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="inline-flex items-center gap-1 text-xs font-black text-rose-700 dark:text-rose-300">
                        🔥 Hard • 上級
                      </span>
                      {difficulty === 'hard' && <CheckCircle2 className="w-4 h-4 text-rose-600" />}
                    </div>
                    <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-snug">
                      Look-alike kanji traps (日/目, 木/本), homophone traps, subtle context & compound analysis.
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* 4. Question Count & 5. AI Generation Engine */}
            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex flex-col md:flex-row items-stretch md:items-start justify-between gap-6">
              <div>
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-2">
                  4. Number of Questions
                </label>
                <div className="flex items-center gap-2">
                  {[5, 10, 15, 20].map((num) => (
                    <button
                      key={num}
                      onClick={() => setQuestionCount(num)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition ${questionCount === num
                        ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900 shadow-sm'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                        }`}
                    >
                      {num} Qs
                    </button>
                  ))}
                </div>
              </div>

                    {/* AI Generation Settings Card */}
                    <div className="flex-1 p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <label htmlFor="ai-toggle" className="flex items-center gap-2 cursor-pointer">
                          <input
                            id="ai-toggle"
                            type="checkbox"
                            checked={useAiGeneration}
                            onChange={(e) => setUseAiGeneration(e.target.checked)}
                            className="w-4 h-4 text-red-600 rounded focus:ring-red-500 cursor-pointer"
                          />
                          <span className="text-xs font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            AI-Powered Question Synthesis
                          </span>
                        </label>
                        <span className="text-[10px] font-semibold text-stone-400">
                          Groq & Gemini Supported
                        </span>
                    </div>

                    <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed pl-6">
                      Dynamically generates non-repetitive questions tailored to your pool and strict difficulty level.
                    </p>

                    {useAiGeneration && (
                      <div className="pl-6 pt-1 flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-stone-600 dark:text-stone-300">Provider:</span>
                        <div className="inline-flex rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-0.5 text-[11px]">
                          <button
                            type="button"
                            onClick={() => setAiProvider('auto')}
                            className={`px-2 py-0.5 rounded-md font-semibold transition ${aiProvider === 'auto'
                                ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900'
                                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                              }`}
                          >
                            Auto
                          </button>
                          <button
                            type="button"
                            onClick={() => setAiProvider('gemini')}
                            className={`px-2 py-0.5 rounded-md font-semibold transition ${aiProvider === 'gemini'
                                ? 'bg-red-600 text-white'
                                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                              }`}
                          >
                            Google Gemini
                          </button>
                          <button
                            type="button"
                            onClick={() => setAiProvider('groq')}
                            className={`px-2 py-0.5 rounded-md font-semibold transition ${aiProvider === 'groq'
                                ? 'bg-red-600 text-white'
                                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                              }`}
                          >
                            Groq AI
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
              </div>

              {aiError && (
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-200 text-xs">
                  {aiError}
                </div>
              )}

              {/* Launch Quiz Button */}
              <div className="pt-2">
                <button
                  onClick={startQuiz}
                  disabled={isAiLoading}
                  className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-base transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isAiLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Synthesizing {difficulty.toUpperCase()} Quiz via {aiProvider === 'gemini' ? 'Gemini' : aiProvider === 'groq' ? 'Groq' : 'AI'}...
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 fill-current" />
                      Start {selectedMode.replace(/_/g, ' ')} ({questionCount} Qs • {difficulty.toUpperCase()})
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          );
  }

          // ==========================================
          // PHASE 3: QUIZ RESULTS
          // ==========================================
          if (phase === 'results') {
    const finalScore = score;
          const total = questions.length;
          const pct = Math.round((finalScore / total) * 100);
    const passed = pct >= 80;
    const mistakes = answersLog.filter(a => !a.isCorrect);

          return (
          <div className="max-w-2xl mx-auto space-y-6 w-full max-w-full min-w-0 overflow-x-hidden">
            {/* Results Banner */}
            <div className={`p-8 rounded-2xl text-center text-white shadow-xl ${passed
              ? 'bg-gradient-to-br from-emerald-600 via-teal-700 to-stone-900'
              : 'bg-gradient-to-br from-amber-600 via-rose-700 to-stone-900'
              }`}>
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md mx-auto flex items-center justify-center mb-4">
                {passed ? <Trophy className="w-8 h-8 text-yellow-300" /> : <AlertTriangle className="w-8 h-8 text-amber-200" />}
              </div>
                <div className="flex items-center justify-center gap-2 flex-wrap mb-2">
                  <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                    {passed ? '80% Gate Passed • 合格' : 'Review Needed • 不合格'}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                    Level: {generationMeta.difficulty || difficulty}
                  </span>
                  {generationMeta.providerUsed && (
                    <span className="text-xs font-bold tracking-wider px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-yellow-300" />
                      {generationMeta.providerUsed === 'gemini' ? 'Gemini AI' : 'Groq AI'}
                    </span>
                  )}
                </div>
                <h2 className="text-4xl font-black mt-1">
                  {pct}%
                </h2>
                <p className="text-stone-200 text-sm mt-1">
                  {finalScore} out of {total} correct in {selectedMode.replace(/_/g, ' ')}
                </p>
            </div>

            {/* Mistakes Review */}
            {mistakes.length > 0 && (
              <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm space-y-4">
                <h3 className="font-bold text-sm text-stone-900 dark:text-white flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  Mistake Breakdown ({mistakes.length} Questions Added to Weak Kanji Notebook)
                </h3>
                <div className="space-y-3">
                  {mistakes.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-rose-100 dark:border-rose-950/60 bg-rose-50/50 dark:bg-rose-950/20 text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-japanese text-xl font-bold text-stone-900 dark:text-white">
                          <FuriganaText text={m.question.kanjiCharacter || m.question.prompt} />
                        </span>
                        <AudioButton text={m.question.kanjiCharacter || m.question.prompt} size="sm" />
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                        <div className="text-rose-700 dark:text-rose-400 font-medium">
                          Your answer: <span className="line-through">{m.selected === '__TIME_UP__' ? 'Time Expired' : <FuriganaText text={m.selected} />}</span>
                        </div>
                        <div className="text-emerald-700 dark:text-emerald-400 font-bold">
                          Correct: <FuriganaText text={m.question.correctAnswer} />
                        </div>
                      </div>
                      <p className="text-stone-500 dark:text-stone-400 text-[10px] pt-1 border-t border-rose-100 dark:border-rose-900/40">
                        <FuriganaText text={m.question.explanation} />
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setPhase('setup')}
                className="py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                New Test
              </button>
              {mistakes.length > 0 && (
                <button
                  onClick={onNavigateToWeak}
                  className="py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Practice Weak Kanji ({mistakes.length})
                </button>
              )}
              <button
                onClick={onNavigateToLearn}
                className="py-3 px-4 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200 font-bold text-xs transition flex items-center justify-center gap-2"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Back to Curriculum
              </button>
            </div>
          </div>
          );
  }

          // ==========================================
          // PHASE 2: ACTIVE QUIZ RUN
          // ==========================================
          const currentQ = questions[currentIndex];
          const progressPct = Math.round(((currentIndex + 1) / questions.length) * 100);

          return (
          <div className="max-w-2xl mx-auto space-y-6 w-full max-w-full min-w-0 overflow-x-hidden">
            {/* Top Header: Progress & Timer */}
            <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-4 shadow-sm flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                    Q {currentIndex + 1} / {questions.length}
                  </span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${(currentQ.difficulty || difficulty) === 'hard'
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-300/40'
                        : (currentQ.difficulty || difficulty) === 'medium'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-300/40'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-300/40'
                      }`}>
                      {(currentQ.difficulty || difficulty) === 'hard' ? '🔥 Hard' : (currentQ.difficulty || difficulty) === 'medium' ? '⚡ Med' : '🌱 Easy'}
                    </span>
                    {generationMeta.source && generationMeta.source !== 'smart_local_engine' && (
                      <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200/50">
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        {generationMeta.providerUsed === 'gemini' ? 'Gemini' : 'Groq'}
                      </span>
                    )}
                    <span className="text-xs font-medium text-stone-400 capitalize hidden sm:inline">
                      {selectedMode.replace(/_/g, ' ')}
                    </span>
                </div>

                {selectedMode === 'timed_challenge' && (
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold ${timeLeft <= 5
                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400 animate-pulse'
                    : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
                    }`}>
                    <Clock className="w-3.5 h-3.5" />
                    {timeLeft}s
                  </div>
                )}

                <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Score: {score}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-600 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              {/* Main Question Card */}
              <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 md:p-8 shadow-sm space-y-6 text-center">
                {currentQ.secondaryPrompt && (
                  <p className="text-xs uppercase tracking-wider font-semibold text-stone-400">
                    <FuriganaText text={currentQ.secondaryPrompt} />
                  </p>
                )}

                {/* Big Japanese Display with Furigana */}
                <div className="py-2 sm:py-4 flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
                  <FuriganaText
                    text={currentQ.prompt}
                    className="font-japanese text-3xl sm:text-5xl md:text-6xl font-black text-stone-900 dark:text-white select-none text-center"
                  />
                  <AudioButton text={currentQ.kanjiCharacter || currentQ.prompt} size="md" />
                </div>

                {/* Show/Hide English Meaning Toggle (Hidden by default to keep interface clean & focused on Japanese) */}
                {(currentQ.englishMeaning || currentQ.contextSentence) && (
                  <div className="flex flex-col items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowEnglishMeaning(prev => !prev)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/80 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-white shadow-2xs"
                      title={showEnglishMeaning ? "Hide English Meaning" : "Show English Meaning"}
                    >
                      {showEnglishMeaning ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5 text-red-500" />
                          <span>Hide English Meaning</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
                          <span>Show English Meaning</span>
                        </>
                      )}
                    </button>

                    {showEnglishMeaning && (
                      <div className="p-3 px-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs sm:text-sm font-medium text-amber-900 dark:text-amber-200 animate-fadeIn max-w-lg mx-auto shadow-xs">
                        <span className="font-bold text-amber-800 dark:text-amber-300 mr-1.5">Meaning:</span>
                        <span>{currentQ.englishMeaning || currentQ.contextSentence}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* 4 Choices Grid with Furigana */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = selectedOption === opt;
                    const isCorrect = opt === currentQ.correctAnswer;

                    let btnStyle = 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600 bg-white dark:bg-stone-850 text-stone-800 dark:text-stone-200';

                    if (isAnswerSubmitted) {
                      if (isCorrect) {
                        btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 font-bold ring-2 ring-emerald-500/20';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 font-bold';
                      } else {
                        btnStyle = 'opacity-40 border-stone-200 dark:border-stone-800';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isAnswerSubmitted}
                        onClick={() => handleAnswerSubmit(opt)}
                        className={`p-4 rounded-xl border text-sm md:text-base font-medium transition text-center flex items-center justify-center gap-2 ${btnStyle}`}
                      >
                        <FuriganaText text={opt} />
                        {isAnswerSubmitted && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        {isAnswerSubmitted && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Card after Submission */}
                {isAnswerSubmitted && (
                  <div className="mt-6 pt-6 border-t border-stone-100 dark:border-stone-800 text-left animate-fadeIn space-y-4">
                    <div className={`p-4 rounded-xl flex items-start gap-3 ${selectedOption === currentQ.correctAnswer
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-200'
                      : 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200'
                      }`}>
                      {selectedOption === currentQ.correctAnswer ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="font-bold text-sm">
                          {selectedOption === currentQ.correctAnswer ? 'Correct! 正解です' : 'Incorrect. 復習しましょう'}
                        </p>
                        <p className="text-xs mt-1 leading-relaxed opacity-90">
                          <FuriganaText text={currentQ.explanation} />
                        </p>
                        <span className="text-[11px] text-stone-500 dark:text-stone-400 font-normal block mt-1 animate-pulse">
                          ⚡ Auto-advancing to next question...
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleNextQuestion}
                      className="w-full py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-white dark:hover:bg-stone-100 text-white dark:text-stone-900 font-bold text-sm transition flex items-center justify-center gap-2 shadow-md"
                    >
                      <span>{currentIndex + 1 < questions.length ? 'Next Question' : 'View Test Results'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* AI Quiz Loading Animation Overlay */}
              <AiQuizLoadingOverlay
                isOpen={isAiLoading}
                title="Generating AI Kanji Quiz"
                subtitle="Synthesizing personalized JLPT N5 questions with complete furigana..."
              />
            </div>
            );
}
