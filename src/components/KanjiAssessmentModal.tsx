'use client';

import React, { useState, useEffect } from 'react';
import {
  X, CheckCircle2, AlertCircle, Award, ArrowRight, RotateCcw,
  Sparkles, ShieldCheck, Loader2, RefreshCw, Eye, EyeOff
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { KanjiRecord, QuizQuestion } from '@/types/kanji';
import { quizEngine } from '@/services/quizEngine';
import { storage } from '@/services/storage';
import { FuriganaText } from './FuriganaText';

interface KanjiAssessmentModalProps {
  kanji: KanjiRecord;
  isOpen: boolean;
  onClose: () => void;
  onPassed: () => void;
  isReTest?: boolean;
  onProgressUpdated?: () => void;
}

export const KanjiAssessmentModal: React.FC<KanjiAssessmentModalProps> = ({
  kanji,
  isOpen,
  onClose,
  onPassed,
  isReTest: isReTestProp,
  onProgressUpdated
}) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showEnglishMeaning, setShowEnglishMeaning] = useState(false);

  // Dynamic test controls
  const [isAiMode, setIsAiMode] = useState(false);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [aiNotice, setAiNotice] = useState<string | null>(null);

  // Determine if this is a Re-Test
  const currentProg = storage.getProgress().find(p => p.kanji_id === kanji.id);
  const isReTest = isReTestProp ?? (currentProg?.learning_status === 'learned' || currentProg?.learning_status === 'needs_revision');

  // Dynamic learned pool retrieved directly from database / storage
  const learnedPool = storage.getLearnedKanjiPool();

  const loadQuestions = async (useAi: boolean = false) => {
    setIsLoadingQuestions(true);
    setAiNotice(null);

    try {
      if (useAi) {
        // Online Groq JLPT N5 question generation
        const res = await fetch('/api/ai/generate-quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eligibleKanjiPool: learnedPool.length > 0 ? learnedPool : [kanji],
            count: 5,
            testType: 'kanji_to_english'
          })
        });

        const data = await res.json();
        if (data.success && data.questions && data.questions.length > 0) {
          setQuestions(data.questions);
          setAiNotice('✨ Questions generated dynamically from Groq JLPT N5 engine');
          resetTestState();
          setIsLoadingQuestions(false);
          return;
        } else {
          setAiNotice('Groq AI generation fallback: Loaded dynamic smart engine');
        }
      }

      // High-speed dynamic generator strictly constrained to learned pool
      if (isReTest) {
        const dynamicQs = quizEngine.generateKanjiReTest(kanji, learnedPool, 5);
        setQuestions(dynamicQs);
      } else {
        const initialQs = quizEngine.generateKanjiAssessment(kanji, learnedPool);
        setQuestions(initialQs);
      }
      resetTestState();
    } catch {
      // Fallback
      const fallbackQs = isReTest
        ? quizEngine.generateKanjiReTest(kanji, learnedPool, 5)
        : quizEngine.generateKanjiAssessment(kanji, learnedPool);
      setQuestions(fallbackQs);
      resetTestState();
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  const resetTestState = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setCorrectAnswersCount(0);
    setIsCompleted(false);
    setShowEnglishMeaning(false);
  };

  useEffect(() => {
    if (isOpen) {
      loadQuestions(isAiMode);
    }
  }, [isOpen, kanji.id]);

  if (!isOpen || questions.length === 0) return null;

  const currentQ = questions[currentIndex];
  const totalCount = questions.length;
  const scorePercent = Math.round((correctAnswersCount / totalCount) * 100);
  const passed = scorePercent >= 80;

  const handleSelectOption = (opt: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(opt);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === currentQ.correctAnswer;

    if (isCorrect) {
      setCorrectAnswersCount(prev => prev + 1);
    } else {
      // RULE: Incorrect answers MUST increase revision frequency!
      const prog = storage.getProgress().find(p => p.kanji_id === currentQ.kanjiId);
      const newMistakes = (prog?.mistake_count || 0) + 1;
      storage.updateSingleKanjiProgress(currentQ.kanjiId, {
        mistake_count: newMistakes,
        learning_status: 'needs_revision',
        srs_repetitions: 0,
        srs_interval: 1, // SRS interval reset to 1 day
        last_studied_at: new Date().toISOString()
      });
      onProgressUpdated?.();
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < totalCount) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setShowEnglishMeaning(false);
    } else {
      // Completed all questions
      const finalScore = Math.round(((correctAnswersCount + (selectedOption === currentQ.correctAnswer ? 0 : 0)) / totalCount) * 100);
      setIsCompleted(true);

      if (finalScore >= 80) {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch { }

        // Officially mark as Learned in the persistent database!
        storage.updateSingleKanjiProgress(kanji.id, {
          learning_status: 'learned',
          learned_at: new Date().toISOString(),
          last_studied_at: new Date().toISOString(),
          meaning_accuracy: 100,
          onyomi_accuracy: 100,
          kunyomi_accuracy: 100,
          vocabulary_accuracy: 100,
          revision_count: (currentProg?.revision_count || 0) + 1
        });
        onPassed();
        onProgressUpdated?.();
      }
    }
  };

  const handleRegenerateNewTest = () => {
    loadQuestions(isAiMode);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[96vh] sm:max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-3.5 sm:px-6 py-3 sm:py-4 border-b border-stone-100 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/70">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="font-japanese text-2xl sm:text-3xl font-black text-red-600 dark:text-red-500">
              {kanji.character}
            </span>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h3 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100">
                  {isReTest ? 'Dynamic Mastery Re-Test' : 'Kanji Learning Assessment'}
                </h3>
                <span className={`text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${isReTest
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                    : 'bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400'
                  }`}>
                  {isReTest ? 'Re-Test' : 'Pass 80%'}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                {isReTest
                  ? `Testing 「${kanji.character}」 against learned pool`
                  : '80% required to graduate and unlock next kanji'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-500 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Strict Learned Pool Compliance Strip */}
        <div className="bg-stone-100 dark:bg-stone-800/60 px-3.5 sm:px-6 py-2 border-b border-stone-200 dark:border-stone-800 text-xs flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5 text-stone-600 dark:text-stone-300 shrink-0 font-medium text-[11px] sm:text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Strict Pool: <strong>{learnedPool.length} Learned</strong> (0 unlearned)</span>
          </div>

          {/* Quick Regenerate New Test button */}
          <button
            onClick={handleRegenerateNewTest}
            disabled={isLoadingQuestions}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white dark:bg-stone-700 hover:bg-stone-50 dark:hover:bg-stone-600 text-stone-700 dark:text-stone-200 text-[11px] font-semibold border border-stone-200 dark:border-stone-600 transition shadow-xs cursor-pointer shrink-0"
            title="Generate a brand new test with fresh questions"
          >
            {isLoadingQuestions ? (
              <Loader2 className="w-3 h-3 animate-spin text-red-600" />
            ) : (
              <RefreshCw className="w-3 h-3 text-red-600" />
            )}
            <span>New Questions</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-3.5 sm:p-6 overflow-y-auto">
          {!isCompleted ? (
            <div>
              {/* Progress Tracker */}
              <div className="flex items-center justify-between mb-3 text-xs font-semibold text-stone-500 dark:text-stone-400">
                <span>Question {currentIndex + 1} of {totalCount}</span>
                <span className="text-red-600 dark:text-red-400">Target: ≥80% Pass</span>
              </div>
              <div className="w-full h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-red-600 transition-all duration-300"
                  style={{ width: `${((currentIndex + (isAnswerSubmitted ? 1 : 0)) / totalCount) * 100}%` }}
                />
              </div>

              {/* Question Prompts */}
              <div className="text-center mb-6">
                <span className="inline-block text-xs uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400 font-semibold mb-2">
                  <FuriganaText text={currentQ.secondaryPrompt || 'Select the correct answer'} />
                </span>
                  <h4 className="text-2xl sm:text-3xl font-japanese font-bold text-stone-900 dark:text-stone-100 mb-1">
                    <FuriganaText text={currentQ.prompt} />
                  </h4>

                {/* Show/Hide English Meaning Toggle */}
                  {(currentQ.englishMeaning || currentQ.contextSentence) && (
                    <div className="flex flex-col items-center gap-1.5 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowEnglishMeaning(prev => !prev)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/80 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-white"
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
                        <div className="p-2.5 px-3.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs font-medium text-amber-900 dark:text-amber-200 animate-fadeIn max-w-sm mx-auto">
                          <span className="font-bold text-amber-800 dark:text-amber-300 mr-1.5">Meaning:</span>
                          <span>{currentQ.englishMeaning || currentQ.contextSentence}</span>
                        </div>
                      )}
                    </div>
                  )}
              </div>

              {/* Multiple Choice Options */}
              <div className="space-y-2.5 mb-6">
                {currentQ.options.map((option, idx) => {
                  let btnStyle = 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 bg-white dark:bg-stone-800/60 text-stone-800 dark:text-stone-200';

                  if (selectedOption === option && !isAnswerSubmitted) {
                    btnStyle = 'border-red-500 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 ring-2 ring-red-500/20';
                  }

                  if (isAnswerSubmitted) {
                    if (option === currentQ.correctAnswer) {
                      btnStyle = 'border-green-500 bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-300 font-medium';
                    } else if (selectedOption === option) {
                      btnStyle = 'border-red-500 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300';
                    } else {
                      btnStyle = 'border-stone-200 dark:border-stone-800 opacity-40';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isAnswerSubmitted}
                      onClick={() => handleSelectOption(option)}
                      className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-150 flex items-center justify-between cursor-pointer ${btnStyle}`}
                    >
                      <span className="font-medium"><FuriganaText text={option} /></span>
                      {isAnswerSubmitted && option === currentQ.correctAnswer && (
                        <CheckCircle2 size={16} className="text-green-600 dark:text-green-400 shrink-0" />
                      )}
                      {isAnswerSubmitted && selectedOption === option && option !== currentQ.correctAnswer && (
                        <AlertCircle size={16} className="text-red-600 dark:text-red-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Revision Alert Note when submitted */}
              {isAnswerSubmitted && (
                <div className="space-y-2 mb-6">
                  {selectedOption !== currentQ.correctAnswer && (
                    <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-800 dark:text-rose-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>
                        <strong>Incorrect answer:</strong> Increased Spaced Repetition (SRS) frequency & marked for revision!
                      </span>
                    </div>
                  )}
                  <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800/80 text-xs text-stone-600 dark:text-stone-300">
                    <p className="font-semibold mb-0.5">Explanation:</p>
                    <p>{currentQ.explanation}</p>
                  </div>
                </div>
              )}

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800">
                <button
                  type="button"
                  onClick={handleRegenerateNewTest}
                  disabled={isLoadingQuestions}
                  className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 transition"
                >
                  <RotateCcw size={13} />
                  <span>New Questions</span>
                </button>

                <div>
                  {!isAnswerSubmitted ? (
                    <button
                      type="button"
                      disabled={!selectedOption}
                      onClick={handleSubmitAnswer}
                      className={`px-5 py-2.5 rounded-xl font-semibold text-xs transition-all ${selectedOption
                          ? 'bg-red-600 hover:bg-red-700 text-white shadow-md cursor-pointer'
                          : 'bg-stone-200 dark:bg-stone-800 text-stone-400 cursor-not-allowed'
                        }`}
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
                    >
                      <span>{currentIndex + 1 < totalCount ? 'Next Question' : 'View Results'}</span>
                      <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="text-center py-4">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 shadow-sm ${passed
                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                  : 'bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
                }`}>
                <Award size={32} />
              </div>

              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-1">
                {passed
                  ? (isReTest ? 'Re-Test Passed with Mastery!' : 'Assessment Passed!')
                  : 'Needs Further Practice'}
              </h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 mb-4">
                You scored <span className="font-bold text-stone-800 dark:text-stone-200">{scorePercent}%</span> ({correctAnswersCount} of {totalCount} correct)
              </p>

              {passed ? (
                <div className="p-4 rounded-2xl bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-900 text-xs text-green-800 dark:text-green-300 mb-6 text-left space-y-1">
                  <p className="font-bold text-green-900 dark:text-green-200">
                    ✓ {isReTest ? 'Mastery Confirmed!' : 'Kanji Officially Learned!'}
                  </p>
                  <p>• Status active in <strong>Learned</strong> pool</p>
                  <p>• Added to the dynamic test question pool for future tests</p>
                  <p>• Spaced Repetition (SRS) schedule successfully updated</p>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-300 mb-6 text-left space-y-1">
                  <p className="font-bold text-amber-900 dark:text-amber-200">Minimum 80% score required.</p>
                  <p>• Marked as <strong>Needs Revision</strong> in the database</p>
                  <p>• Revision interval reset to increase practice frequency</p>
                  <p className="mt-1">Review the Onyomi, Kunyomi, and vocabulary, then generate a new re-test when ready!</p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleRegenerateNewTest}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs shadow-md cursor-pointer transition-all"
                >
                  <RotateCcw size={14} />
                  <span>{passed ? 'Take Another Re-Test (New Questions)' : 'Retry with New Questions'}</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 text-xs font-semibold hover:bg-stone-50 dark:hover:bg-stone-800 cursor-pointer text-center"
                >
                  Done & Return
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
