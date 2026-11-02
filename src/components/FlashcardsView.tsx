'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  RotateCw, Volume2, Sparkles, CheckCircle2, AlertTriangle, 
  Clock, ArrowRight, Layers, Eye, BookOpen, ChevronRight, ChevronLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { KanjiRecord, UserKanjiProgress, FlashcardRating } from '@/types/kanji';
import { srsEngine } from '@/services/srs';
import { storage } from '@/services/storage';
import { AudioButton } from './AudioButton';

interface FlashcardsViewProps {
  kanjiList: KanjiRecord[];
  progressMap: Record<number, UserKanjiProgress>;
  onRefreshProgress: () => void;
  onNavigateToLearn: () => void;
}

export function FlashcardsView({
  kanjiList,
  progressMap,
  onRefreshProgress,
  onNavigateToLearn
}: FlashcardsViewProps) {
  const [filterMode, setFilterMode] = useState<'due' | 'weak' | 'all'>('due');
  const [selectedLevel, setSelectedLevel] = useState<number | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);

  // Eligible kanji are only those that have been unlocked and studied
  const eligibleCards = useMemo(() => {
    return kanjiList.filter(k => {
      const prog = progressMap[k.id];
      if (!prog || (prog.learning_status !== 'learned' && prog.learning_status !== 'needs_revision' && prog.learning_status !== 'learning')) {
        return false;
      }

      if (selectedLevel !== 'all' && k.level !== selectedLevel) {
        return false;
      }

      if (filterMode === 'due') {
        if (!prog.next_review_at) return true;
        return new Date(prog.next_review_at) <= new Date();
      }

      if (filterMode === 'weak') {
        return prog.learning_status === 'needs_revision' || prog.mistake_count > 0;
      }

      return true; // 'all'
    });
  }, [kanjiList, progressMap, filterMode, selectedLevel]);

  // Keyboard shortcut support (Space = flip, 1-4 = rate)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (eligibleCards.length === 0 || sessionCompleted) return;

      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      } else if (isFlipped) {
        if (e.key === '1') handleRate('again');
        else if (e.key === '2') handleRate('hard');
        else if (e.key === '3') handleRate('good');
        else if (e.key === '4') handleRate('easy');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, currentIndex, eligibleCards, sessionCompleted]);

  const currentKanji = eligibleCards[currentIndex];
  const currentProgress = currentKanji ? progressMap[currentKanji.id] : null;

  const handleRate = (rating: FlashcardRating) => {
    if (!currentKanji || !currentProgress) return;

    // Map rating to grade (1: again, 2: hard, 3: good, 5: easy)
    const gradeMap: Record<FlashcardRating, number> = {
      again: 1,
      hard: 2,
      good: 4,
      easy: 5
    };
    const grade = gradeMap[rating];

    const srsUpdate = srsEngine.calculateNextReview(
      grade,
      currentProgress.srs_repetitions,
      currentProgress.srs_ease_factor,
      currentProgress.srs_interval
    );

    const isAgain = rating === 'again';
    const newMistakes = isAgain ? currentProgress.mistake_count + 1 : currentProgress.mistake_count;
    const newStatus = isAgain ? 'needs_revision' : currentProgress.learning_status;

    storage.updateKanjiProgress(currentKanji.id, {
      srs_interval: srsUpdate.interval,
      srs_repetitions: srsUpdate.repetitions,
      srs_ease_factor: srsUpdate.easeFactor,
      next_review_at: srsUpdate.nextReviewDate.toISOString(),
      last_studied_at: new Date().toISOString(),
      mistake_count: newMistakes,
      learning_status: newStatus,
      revision_count: currentProgress.revision_count + 1
    });

    setReviewedCount(prev => prev + 1);

    // Advance to next card or complete session
    if (currentIndex + 1 < eligibleCards.length) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev + 1);
    } else {
      confetti({ particleCount: 70, spread: 60 });
      setSessionCompleted(true);
      onRefreshProgress();
    }
  };

  const restartSession = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionCompleted(false);
    setReviewedCount(0);
  };

  // If no cards match
  if (eligibleCards.length === 0) {
    return (
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-8 md:p-12 text-center max-w-xl mx-auto shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-5">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
          All Caught Up!
        </h2>
        <p className="text-stone-500 dark:text-stone-400 text-sm mt-2 leading-relaxed">
          {filterMode === 'due' 
            ? 'No flashcards are currently due for spaced repetition review! Great consistency.' 
            : 'No kanji match the selected filter.'}
        </p>

        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => { setFilterMode('all'); restartSession(); }}
            className="px-4 py-2.5 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold text-xs transition"
          >
            Review All Learned Cards
          </button>
          <button
            onClick={onNavigateToLearn}
            className="px-4 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs transition hover:bg-red-700"
          >
            Study New Kanji in Level Curriculum
          </button>
        </div>
      </div>
    );
  }

  // Session Completed Screen
  if (sessionCompleted) {
    return (
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-8 md:p-12 text-center max-w-xl mx-auto shadow-sm space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white mx-auto flex items-center justify-center shadow-lg">
          <Sparkles className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-extrabold text-stone-900 dark:text-white">
          SRS Review Session Complete!
        </h2>
        <p className="text-stone-500 dark:text-stone-400 text-sm">
          You successfully reviewed <strong className="text-stone-800 dark:text-stone-100">{reviewedCount} flashcards</strong>. Your intervals and retention schedules have been dynamically updated in the memory engine.
        </p>
        <div className="flex gap-3 justify-center pt-2">
          <button
            onClick={restartSession}
            className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition shadow-md"
          >
            Review Again
          </button>
          <button
            onClick={onNavigateToLearn}
            className="px-5 py-3 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200 font-bold text-xs transition"
          >
            Return to Curriculum
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Top Filter and Controls */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-3 sm:p-4 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none pb-1 max-w-full text-xs">
          <button
            onClick={() => { setFilterMode('due'); restartSession(); }}
            className={`px-3 py-1.5 rounded-lg font-bold transition shrink-0 ${
              filterMode === 'due' ? 'bg-red-600 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
            }`}
          >
            Due for Review
          </button>
          <button
            onClick={() => { setFilterMode('weak'); restartSession(); }}
            className={`px-3 py-1.5 rounded-lg font-bold transition shrink-0 ${
              filterMode === 'weak' ? 'bg-rose-600 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
            }`}
          >
            Weak Cards
          </button>
          <button
            onClick={() => { setFilterMode('all'); restartSession(); }}
            className={`px-3 py-1.5 rounded-lg font-bold transition shrink-0 ${
              filterMode === 'all' ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900' : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
            }`}
          >
            All Cards ({eligibleCards.length})
          </button>
        </div>

        {/* Counter */}
        <div className="text-xs font-mono font-semibold text-stone-500 text-right">
          Card {currentIndex + 1} of {eligibleCards.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-red-600 transition-all duration-300 rounded-full"
          style={{ width: `${Math.round(((currentIndex + 1) / eligibleCards.length) * 100)}%` }}
        />
      </div>

      {/* 3D Flashcard Container */}
      <div 
        onClick={() => setIsFlipped(prev => !prev)}
        className="cursor-pointer min-h-[340px] sm:min-h-[360px] md:min-h-[420px] rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xl transition-all duration-300 hover:shadow-2xl relative flex flex-col justify-between p-4 sm:p-6 md:p-8 select-none"
      >
        {/* Top Card Bar */}
        <div className="flex items-center justify-between text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
              Lvl {currentKanji.level} • #{currentKanji.kanji_number}
            </span>
            <span className="text-[11px]">
              {currentKanji.stroke_count} strokes
            </span>
          </div>

          <div className="flex items-center gap-2">
            <AudioButton text={currentKanji.character} size="sm" />
            <button 
              onClick={(e) => { e.stopPropagation(); setIsFlipped(prev => !prev); }}
              className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-600"
              title="Flip Card (Space)"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card Body */}
        {!isFlipped ? (
          /* FRONT SIDE */
          <div className="my-auto text-center space-y-4">
            <div className="relative inline-block py-4 sm:py-6">
              <span className="font-japanese text-7xl sm:text-8xl md:text-9xl font-black text-stone-900 dark:text-white drop-shadow-sm">
                {currentKanji.character}
              </span>
            </div>
            <p className="text-xs text-stone-400 font-medium">
              Tap anywhere or press <kbd className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 font-mono text-[10px]">Space</kbd> to reveal readings & meaning
            </p>
          </div>
        ) : (
          /* BACK SIDE */
          <div className="my-auto space-y-4 sm:space-y-5 animate-fadeIn">
            {/* Meaning & Character */}
            <div className="text-center pb-3 sm:pb-4 border-b border-stone-100 dark:border-stone-800">
              <span className="font-japanese text-3xl sm:text-4xl font-black text-red-600 dark:text-red-400">
                {currentKanji.character}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-white mt-1">
                {currentKanji.meaning}
              </h3>
            </div>

            {/* Readings Table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 text-xs">
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-800">
                <span className="text-stone-400 font-medium block mb-1">Onyomi (音読み)</span>
                <span className="font-japanese font-bold text-red-700 dark:text-red-400 text-base">
                  {currentKanji.onyomi_readings.join(', ')}
                </span>
                <span className="text-stone-400 block text-[11px] font-mono mt-0.5">
                  {currentKanji.onyomi_romaji.join(', ')}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-800">
                <span className="text-stone-400 font-medium block mb-1">Kunyomi (訓読み)</span>
                <span className="font-japanese font-bold text-stone-800 dark:text-stone-100 text-base">
                  {currentKanji.kunyomi_readings.length > 0 ? currentKanji.kunyomi_readings.join(', ') : '—'}
                </span>
                <span className="text-stone-400 block text-[11px] font-mono mt-0.5">
                  {currentKanji.kunyomi_romaji.join(', ')}
                </span>
              </div>
            </div>

            {/* Core Vocab Preview */}
            {currentKanji.vocabulary.length > 0 && (
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-800 text-xs flex items-center justify-between">
                <div>
                  <span className="font-japanese font-bold text-stone-900 dark:text-white text-sm">
                    {currentKanji.vocabulary[0].word} ({currentKanji.vocabulary[0].hiragana})
                  </span>
                  <span className="text-stone-500 dark:text-stone-400 block text-[11px]">
                    {currentKanji.vocabulary[0].meaning}
                  </span>
                </div>
                <AudioButton text={currentKanji.vocabulary[0].word} size="sm" />
              </div>
            )}
          </div>
        )}

        {/* Card Footer / Tip */}
        <div className="text-center text-[11px] text-stone-400 pt-2 border-t border-stone-100 dark:border-stone-800">
          Radicals: <span className="font-japanese font-semibold">{currentKanji.radicals}</span> • Interval: <span className="font-mono font-semibold">{currentProgress?.srs_interval || 1}d</span>
        </div>
      </div>

      {/* SM-2 Spaced Repetition Grading Buttons */}
      {isFlipped ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 animate-fadeIn">
          <button
            onClick={() => handleRate('again')}
            className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs font-bold transition flex flex-col items-center gap-1 shadow-sm"
          >
            <span>Again (1)</span>
            <span className="text-[10px] font-normal opacity-80">&lt; 10 min</span>
          </button>
          <button
            onClick={() => handleRate('hard')}
            className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/40 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-200 text-xs font-bold transition flex flex-col items-center gap-1 shadow-sm"
          >
            <span>Hard (2)</span>
            <span className="text-[10px] font-normal opacity-80">1 day</span>
          </button>
          <button
            onClick={() => handleRate('good')}
            className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs font-bold transition flex flex-col items-center gap-1 shadow-sm"
          >
            <span>Good (3)</span>
            <span className="text-[10px] font-normal opacity-80">
              {Math.round((currentProgress?.srs_interval || 1) * 2.5)} days
            </span>
          </button>
          <button
            onClick={() => handleRate('easy')}
            className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-900 text-blue-800 dark:text-blue-200 text-xs font-bold transition flex flex-col items-center gap-1 shadow-sm"
          >
            <span>Easy (4)</span>
            <span className="text-[10px] font-normal opacity-80">
              {Math.round((currentProgress?.srs_interval || 1) * 3.5)} days
            </span>
          </button>
        </div>
      ) : (
        <div className="text-center">
          <button
            onClick={() => setIsFlipped(true)}
            className="w-full py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-white dark:hover:bg-stone-100 text-white dark:text-stone-900 font-bold text-sm transition shadow-md flex items-center justify-center gap-2"
          >
            <RotateCw className="w-4 h-4" />
            Reveal Card (Space)
          </button>
        </div>
      )}
    </div>
  );
}
