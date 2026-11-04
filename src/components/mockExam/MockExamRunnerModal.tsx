'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  BookmarkCheck, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  HelpCircle, 
  Headphones, 
  Volume2, 
  Layers, 
  Send,
  Eye,
  EyeOff
} from 'lucide-react';
import { 
  MockExamConfig, 
  MockExamQuestion, 
  MockExamResult 
} from '@/types/mockExam';
import { 
  evaluateMockExamSubmission 
} from '@/services/mockExamAiEngine';
import { 
  saveExamResult 
} from '@/services/mockExamStorage';
import { FuriganaText } from '@/components/FuriganaText';
import { AudioButton } from '@/components/AudioButton';

interface MockExamRunnerModalProps {
  config: MockExamConfig;
  questions: MockExamQuestion[];
  onComplete: (result: MockExamResult) => void;
  onClose: () => void;
}

export function MockExamRunnerModal({
  config,
  questions,
  onComplete,
  onClose
}: MockExamRunnerModalProps) {
  // Ensure we have at least 1 question
  const validQuestions = questions.length > 0 ? questions : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  
  // Timer State (Fixed countdown in seconds)
  const initialSeconds = config.totalTimeMinutes * 60;
  const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // UI Drawer State
  const [showQuestionPalette, setShowQuestionPalette] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  // Auto submission ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer countdown
  useEffect(() => {
    if (!isTimerRunning) return;

    timerRef.current = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current as any);
          handleFinalSubmit(true); // Auto submit on timer zero
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, answers]);

  const currentQ = validQuestions[currentIndex] || validQuestions[0];
  const totalQuestions = validQuestions.length;

  // Format Timer mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(answers).filter(k => answers[k] && answers[k].trim()).length;
  const unansweredCount = totalQuestions - answeredCount;
  const markedCount = Object.values(markedForReview).filter(Boolean).length;

  const handleSelectOption = (opt: string) => {
    if (!currentQ) return;
    setAnswers(prev => ({ ...prev, [currentQ.id]: opt }));
  };

  const handleToggleReview = () => {
    if (!currentQ) return;
    setMarkedForReview(prev => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id]
    }));
  };

  const handleFinalSubmit = (forcedTimeout = false) => {
    setIsTimerRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);

    const timeSpent = initialSeconds - secondsRemaining;
    const result = evaluateMockExamSubmission(
      validQuestions,
      answers,
      timeSpent,
      config.mode,
      config.title
    );

    // Persist in local storage and cloud sync
    saveExamResult(result);

    onComplete(result);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-md flex flex-col justify-between overflow-hidden animate-fadeIn">
      {/* Top Header Bar */}
      <header className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-4 sm:px-6 py-3.5 shadow-sm shrink-0">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Exam Info & Candidate */}
          <div className="flex items-center gap-3 min-w-0">
            <span className="px-2.5 py-1 rounded-xl bg-red-600 text-white font-mono font-black text-xs shrink-0">
              JLPT N5
            </span>
            <div className="min-w-0">
              <h2 className="font-extrabold text-sm sm:text-base text-stone-900 dark:text-white truncate">
                {config.title}
              </h2>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                Candidate: <strong>Examinee (You)</strong> • Section: <span className="capitalize">{currentQ?.section.replace('_', ' ')}</span>
              </p>
            </div>
          </div>

          {/* Right: Timer & Submit Action */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Fixed Countdown Timer */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono font-black text-sm shadow-xs ${
              secondsRemaining < 300 
                ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-400 text-rose-600 dark:text-rose-400 animate-pulse'
                : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200'
            }`}>
              <Clock className="w-4 h-4 text-stone-400" />
              <span>{formatTime(secondsRemaining)}</span>
            </div>

            {/* Question Palette Drawer Trigger */}
            <button
              onClick={() => setShowQuestionPalette(prev => !prev)}
              className="p-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              title="View all questions"
            >
              <Layers className="w-4 h-4" />
              <span className="hidden sm:inline">Palette</span>
            </button>

            {/* Submit Examination */}
            <button
              onClick={() => setShowSubmitConfirm(true)}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs transition shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit</span>
            </button>

            {/* Exit / Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition"
              title="Close exam"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 overflow-y-auto">
        {currentQ ? (
          <div className="space-y-5 animate-fadeIn">
            {/* Question Status Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pb-3 border-b border-stone-200 dark:border-stone-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-500 dark:text-stone-400">
                  Question {currentIndex + 1} of {totalQuestions}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold font-japanese">
                  {currentQ.categoryNameJa}
                </span>
                <span className="text-[11px] text-stone-400">
                  ({currentQ.marks} {currentQ.marks === 1 ? 'mark' : 'marks'})
                </span>
              </div>

              {/* Review Checkbox */}
              <button
                onClick={handleToggleReview}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                  markedForReview[currentQ.id]
                    ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                {markedForReview[currentQ.id] ? (
                  <BookmarkCheck className="w-3.5 h-3.5 text-amber-600 fill-current" />
                ) : (
                  <Bookmark className="w-3.5 h-3.5" />
                )}
                <span>{markedForReview[currentQ.id] ? 'Marked for Review' : 'Mark for Review'}</span>
              </button>
            </div>

            {/* Context Passage (For Reading Comprehension) */}
            {currentQ.contextPassage && (
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                  Reading Passage / Reference Notice:
                </span>
                <div className="font-japanese text-sm sm:text-base leading-relaxed text-stone-800 dark:text-stone-200 whitespace-pre-wrap">
                  <FuriganaText text={currentQ.contextPassage} />
                </div>
              </div>
            )}

            {/* Listening Audio Section (If Listening Question) */}
            {currentQ.section === 'listening' && (
              <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-200 font-bold text-xs">
                    <Headphones className="w-4 h-4 text-indigo-600" />
                    <span>Listening Dialogue Audio Playback</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {currentQ.audioScript && (
                      <button
                        onClick={() => setShowTranscript(prev => !prev)}
                        className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                      >
                        {showTranscript ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        <span>{showTranscript ? 'Hide Dialogue Text' : 'View Dialogue Text'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Audio Button to play dialogue */}
                {currentQ.audioScript && (
                  <div className="flex items-center gap-3 pt-1">
                    <AudioButton 
                      text={currentQ.audioScript} 
                      size="md"
                      label="Play Audio Dialogue (音声再生)"
                    />
                    <span className="text-[11px] text-stone-500 dark:text-stone-400">
                      Click to listen to the Japanese conversation dialogue
                    </span>
                  </div>
                )}

                {/* Optional Transcript */}
                {showTranscript && currentQ.audioScript && (
                  <div className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-indigo-200 dark:border-indigo-800 text-xs font-japanese text-stone-800 dark:text-stone-200 whitespace-pre-wrap animate-fadeIn">
                    <FuriganaText text={currentQ.audioScript} />
                  </div>
                )}
              </div>
            )}

            {/* Question Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
              <div className="space-y-1">
                {currentQ.subPrompt && (
                  <p className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                    {currentQ.subPrompt}
                  </p>
                )}
                <div className="text-base sm:text-lg font-bold text-stone-900 dark:text-white leading-relaxed font-japanese">
                  <FuriganaText text={currentQ.prompt} />
                </div>
              </div>

              {/* 4 Answer Choices */}
              <div className="space-y-2.5 pt-2">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = answers[currentQ.id] === opt;
                  const optionLabel = ['1', '2', '3', '4'][idx] || String(idx + 1);

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(opt)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        isSelected
                          ? 'border-red-600 bg-red-50/60 dark:bg-red-950/40 text-red-950 dark:text-red-100 shadow-sm'
                          : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                          isSelected
                            ? 'bg-red-600 text-white'
                            : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
                        }`}>
                          {optionLabel}
                        </span>
                        <span className="font-japanese text-sm sm:text-base font-semibold">
                          <FuriganaText text={opt} />
                        </span>
                      </div>

                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-red-600 bg-red-600' : 'border-stone-300 dark:border-stone-600'
                      }`}>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 text-stone-400">Loading examination question...</div>
        )}
      </main>

      {/* Bottom Sticky Navigation Bar */}
      <footer className="bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 px-4 sm:px-6 py-3.5 shadow-md shrink-0">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          {/* Previous Button */}
          <button
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 text-xs font-bold transition flex items-center gap-1.5 disabled:opacity-40 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous Question</span>
            <span className="sm:hidden">Prev</span>
          </button>

          {/* Quick Question Count & Unanswered Indicator */}
          <div className="text-center">
            <span className="text-xs font-mono font-bold text-stone-700 dark:text-stone-300 block">
              {currentIndex + 1} / {totalQuestions}
            </span>
            <span className="text-[10px] text-stone-400">
              {unansweredCount > 0 ? `${unansweredCount} Unanswered` : 'All Answered!'}
            </span>
          </div>

          {/* Next Button or Submit */}
          {currentIndex < totalQuestions - 1 ? (
            <button
              onClick={() => setCurrentIndex(prev => Math.min(totalQuestions - 1, prev + 1))}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setShowSubmitConfirm(true)}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span>Review & Submit</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </footer>

      {/* Question Palette Drawer Modal */}
      {showQuestionPalette && (
        <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
              <h3 className="font-extrabold text-sm text-stone-900 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-red-500" />
                Examination Question Navigator
              </h3>
              <button 
                onClick={() => setShowQuestionPalette(false)}
                className="text-stone-400 hover:text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-3 text-[11px] text-stone-500 pb-2">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500" /> Answered ({answeredCount})
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-stone-200 dark:bg-stone-700" /> Unanswered ({unansweredCount})
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-500" /> Marked ({markedCount})
              </span>
            </div>

            {/* Grid of questions */}
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 max-h-[300px] overflow-y-auto p-1">
              {validQuestions.map((q, idx) => {
                const isAns = Boolean(answers[q.id]);
                const isMarked = Boolean(markedForReview[q.id]);
                const isCurr = idx === currentIndex;

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowQuestionPalette(false);
                    }}
                    className={`h-10 rounded-xl font-mono text-xs font-black transition relative cursor-pointer flex items-center justify-center ${
                      isCurr ? 'ring-2 ring-red-500 ring-offset-2' : ''
                    } ${
                      isMarked
                        ? 'bg-amber-100 text-amber-900 border border-amber-400'
                        : isAns
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    {idx + 1}
                    {isMarked && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 absolute top-1 right-1" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowQuestionPalette(false)}
                className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold text-xs"
              >
                Close Palette
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Before Submission Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-extrabold text-base text-stone-900 dark:text-white">
                Submit Examination?
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                You still have <strong>{formatTime(secondsRemaining)}</strong> remaining.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-stone-500">Total Questions:</span>
                <span className="font-bold">{totalQuestions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-600 font-semibold">Answered:</span>
                <span className="font-bold text-emerald-600">{answeredCount}</span>
              </div>
              {unansweredCount > 0 && (
                <div className="flex justify-between">
                  <span className="text-rose-600 font-semibold">Unanswered:</span>
                  <span className="font-bold text-rose-600">{unansweredCount}</span>
                </div>
              )}
              {markedCount > 0 && (
                <div className="flex justify-between">
                  <span className="text-amber-600 font-semibold">Marked for Review:</span>
                  <span className="font-bold text-amber-600">{markedCount}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold text-xs transition cursor-pointer"
              >
                Back to Exam
              </button>
              <button
                onClick={() => {
                  setShowSubmitConfirm(false);
                  handleFinalSubmit(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-md transition cursor-pointer"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

