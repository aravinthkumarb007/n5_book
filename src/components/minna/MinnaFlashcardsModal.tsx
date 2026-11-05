'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  RotateCw, Volume2, Sparkles, CheckCircle2, AlertTriangle,
  ChevronRight, ChevronLeft, Shuffle, Check, X, HelpCircle,
  BookOpen, Layers, ArrowRight, ShieldCheck, RefreshCw, Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MinnaVocabularyItem, VocabLearningStatus } from '@/types/minna';
import { speakJapanese } from '@/services/audio';
import { setVocabStatus, getVocabStatus, getStoredVocabStatuses } from '@/services/vocabStorage';
import { getJapaneseWordDisplay } from '@/utils/japaneseWordDisplay';
import { FuriganaText } from '@/components/common/FuriganaText';
import { useSwipeCard } from '@/utils/useSwipeCard';

interface MinnaFlashcardsModalProps {
  title: string;
  subtitle?: string;
  vocabularyList: MinnaVocabularyItem[];
  onClose: () => void;
  onRefreshData?: () => void;
}

export function MinnaFlashcardsModal({
  title,
  subtitle,
  vocabularyList,
  onClose,
  onRefreshData
}: MinnaFlashcardsModalProps) {
  const [cards, setCards] = useState<MinnaVocabularyItem[]>(vocabularyList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [studyMode, setStudyMode] = useState<'ja_to_en' | 'en_to_ja' | 'combined'>('ja_to_en');
  const [showFurigana, setShowFurigana] = useState(true);
  const [localStatuses, setLocalStatuses] = useState<Record<string, VocabLearningStatus>>({});
  const [savingStatus, setSavingStatus] = useState<string | null>(null);
  const [saveToast, setSaveToast] = useState<{ vocabId: string; status: VocabLearningStatus } | null>(null);

  // Initialize local statuses from storage on mount
  useEffect(() => {
    const stored = getStoredVocabStatuses();
    const map: Record<string, VocabLearningStatus> = {};
    for (const v of vocabularyList) {
      if (stored[v.id]?.status) {
        map[v.id] = stored[v.id].status;
      }
    }
    setLocalStatuses(map);
    setCards([...vocabularyList]);
  }, [vocabularyList]);

  // Current Card
  const currentCard = cards[currentIndex];
  const currentStatus = currentCard ? (localStatuses[currentCard.id] || getVocabStatus(currentCard.id)) : null;
  const isEnToJa = studyMode === 'en_to_ja' || (studyMode === 'combined' && (currentIndex % 2 === 1));

  // Keyboard shortcut support (Space = flip, Left/Right = nav, 1 = Not Learned, 2 = Not Sure, 3 = Learned)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (cards.length === 0 || sessionCompleted) return;

      // Ignore if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (isFlipped) {
        if (e.key === '1') handleRate('not_learned');
        else if (e.key === '2') handleRate('not_sure');
        else if (e.key === '3') handleRate('learned');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, currentIndex, cards, sessionCompleted, currentCard]);

  const handleNext = () => {
    if (currentIndex + 1 < cards.length) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev + 1);
    } else {
      finishSession();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleRate = async (status: VocabLearningStatus) => {
    if (!currentCard) return;

    setSavingStatus(currentCard.id);
    setLocalStatuses(prev => ({ ...prev, [currentCard.id]: status }));

    // Show temporary feedback toast
    setSaveToast({ vocabId: currentCard.id, status });
    setTimeout(() => {
      setSaveToast(prev => (prev?.vocabId === currentCard.id ? null : prev));
    }, 2000);

    // Save permanently to backend database
    await setVocabStatus(currentCard.id, currentCard.lessonNumber, status);
    setSavingStatus(null);
    onRefreshData?.();

    // Advance to next card smoothly
    if (currentIndex + 1 < cards.length) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev + 1);
    } else {
      finishSession();
    }
  };

  const finishSession = () => {
    confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });
    setSessionCompleted(true);
  };

  const restartSession = (filterToWeak: boolean = false) => {
    if (filterToWeak) {
      const weakOnly = vocabularyList.filter(v => {
        const s = localStatuses[v.id];
        return s === 'not_learned' || s === 'not_sure';
      });
      setCards(weakOnly.length > 0 ? weakOnly : vocabularyList);
    } else {
      setCards([...vocabularyList]);
    }
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionCompleted(false);
  };

  // Swipe Gestures: Swipe Right -> Learned, Swipe Left -> Re-learn Hub, Tap -> Flip
  const swipe = useSwipeCard({
    onSwipeRight: () => handleRate('learned'),
    onSwipeLeft: () => handleRate('not_sure'),
    onTap: () => setIsFlipped(prev => !prev),
    threshold: 75,
    disabled: sessionCompleted || cards.length === 0
  });

  // Session Statistics
  const sessionStats = useMemo(() => {
    let learnedCount = 0;
    let notSureCount = 0;
    let notLearnedCount = 0;

    for (const card of cards) {
      const s = localStatuses[card.id];
      if (s === 'learned') learnedCount++;
      else if (s === 'not_sure') notSureCount++;
      else if (s === 'not_learned') notLearnedCount++;
    }

    return {
      total: cards.length,
      learnedCount,
      notSureCount,
      notLearnedCount,
      masteryRate: cards.length > 0 ? Math.round((learnedCount / cards.length) * 100) : 0
    };
  }, [cards, localStatuses]);

  if (cards.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-md animate-fadeIn">
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 max-w-md w-full text-center space-y-4 shadow-2xl">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center">
            <BookOpen className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white">No Vocabulary Found</h3>
          <p className="text-xs text-stone-500">
            There are no vocabulary cards matching this selection.
          </p>
          <button
            onClick={onClose}
            className="w-full py-3 min-h-[44px] rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold text-xs"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  // Session Completed Screen
  if (sessionCompleted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 xs:p-3 sm:p-4 bg-stone-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
        <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 p-5 sm:p-8 text-center space-y-4 sm:space-y-5 animate-in zoom-in-95 duration-200 max-h-[94dvh] overflow-y-auto">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white mx-auto flex items-center justify-center shadow-lg">
            <Sparkles className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white">
              Flashcard Session Complete!
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              {title} • {sessionStats.total} Vocabulary Cards Reviewed
            </p>
          </div>

          {/* Result Cards Breakdown */}
          <div className="grid grid-cols-3 gap-2 sm:gap-2.5 pt-1">
            <div className="p-2.5 sm:p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60">
              <span className="text-lg sm:text-xl font-black text-emerald-600 dark:text-emerald-400 block">
                {sessionStats.learnedCount}
              </span>
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
                Learned ✓
              </span>
            </div>

            <div className="p-2.5 sm:p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60">
              <span className="text-lg sm:text-xl font-black text-amber-600 dark:text-amber-400 block">
                {sessionStats.notSureCount}
              </span>
              <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider">
                Not Sure ?
              </span>
            </div>

            <div className="p-2.5 sm:p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/60">
              <span className="text-lg sm:text-xl font-black text-rose-600 dark:text-rose-400 block">
                {sessionStats.notLearnedCount}
              </span>
              <span className="text-[10px] font-bold text-rose-700 dark:text-rose-300 uppercase tracking-wider">
                Not Learned ✗
              </span>
            </div>
          </div>

          <div className="p-2.5 sm:p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-medium text-[11px] sm:text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Saved to database</span>
            </span>
            <span className="font-mono font-bold text-stone-900 dark:text-white">
              {sessionStats.masteryRate}% Mastered
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5 pt-1">
            {(sessionStats.notSureCount > 0 || sessionStats.notLearnedCount > 0) && (
              <button
                onClick={() => restartSession(true)}
                className="w-full sm:flex-1 py-3 px-3 min-h-[44px] rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition shadow-md flex items-center justify-center gap-1.5 active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Re-learn Weak ({sessionStats.notSureCount + sessionStats.notLearnedCount})</span>
              </button>
            )}

            <button
              onClick={() => restartSession(false)}
              className="w-full sm:flex-1 py-3 px-3 min-h-[44px] rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200 font-bold text-xs transition active:scale-95"
            >
              Review All Again
            </button>

            <button
              onClick={onClose}
              className="w-full sm:w-auto py-3 px-5 min-h-[44px] rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition shadow-md active:scale-95"
            >
              Finish & Return
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 xs:p-3 sm:p-4 bg-stone-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 flex flex-col max-h-[94dvh] sm:max-h-[92vh] overflow-hidden animate-in zoom-in-95 duration-200">

        {/* Modal Top Header */}
        <div className="p-3 sm:p-4 pb-2.5 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between gap-2 shrink-0">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400">
                Flashcard
              </span>
              <span className="text-xs font-bold text-stone-900 dark:text-white truncate max-w-[140px] xs:max-w-[200px] sm:max-w-xs">
                {title}
              </span>
            </div>
            {subtitle && (
              <p className="text-[11px] text-stone-400 truncate mt-0.5">{subtitle}</p>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Mode Switcher Pill */}
            <div className="flex items-center gap-0.5 bg-stone-100 dark:bg-stone-800 p-0.5 rounded-xl text-[10px] font-bold">
              <button
                onClick={() => { setStudyMode('ja_to_en'); setIsFlipped(false); }}
                className={`px-1.5 py-1 min-h-[28px] rounded-lg transition ${studyMode === 'ja_to_en' ? 'bg-blue-600 text-white shadow-xs' : 'text-stone-500'}`}
                title="Japanese to English"
              >
                JA➔EN
              </button>
              <button
                onClick={() => { setStudyMode('en_to_ja'); setIsFlipped(false); }}
                className={`px-1.5 py-1 min-h-[28px] rounded-lg transition ${studyMode === 'en_to_ja' ? 'bg-red-600 text-white shadow-xs' : 'text-stone-500'}`}
                title="English to Japanese"
              >
                EN➔JA
              </button>
              <button
                onClick={() => { setStudyMode('combined'); setIsFlipped(false); }}
                className={`px-1.5 py-1 min-h-[28px] rounded-lg transition ${studyMode === 'combined' ? 'bg-amber-500 text-stone-950 font-black shadow-xs' : 'text-stone-500'}`}
                title="Combined 50/50"
              >
                🔀
              </button>
            </div>

            {/* Furigana Toggle Button */}
            <button
              onClick={() => setShowFurigana(prev => !prev)}
              className={`px-1.5 py-1 min-h-[28px] rounded-xl font-bold text-[10px] flex items-center gap-1 transition shrink-0 ${showFurigana
                  ? 'bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800 shadow-xs'
                  : 'text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 bg-stone-100 dark:bg-stone-800'
                }`}
              title={showFurigana ? 'Furigana above Kanji is ON (click to hide)' : 'Furigana is OFF (click to show)'}
            >
              <span className="hidden xs:inline">ふりがな</span>
              <span className={`text-[9px] px-1 py-0.2 rounded font-black ${showFurigana ? 'bg-red-600 text-white' : 'bg-stone-200 dark:bg-stone-700 text-stone-500'
                }`}>
                {showFurigana ? 'ON' : 'OFF'}
              </span>
            </button>

            <button
              onClick={handleShuffle}
              className="p-1.5 min-h-[32px] min-w-[32px] flex items-center justify-center rounded-xl text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
              title="Shuffle Cards"
            >
              <Shuffle className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 min-h-[32px] min-w-[32px] flex items-center justify-center rounded-xl text-stone-400 hover:text-stone-600 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Progress Bar & Counter */}
        <div className="px-3 sm:px-5 pt-2.5 space-y-1 shrink-0">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span className="font-mono font-bold text-[11px] sm:text-xs">
              Card {currentIndex + 1} of {cards.length}
            </span>
            <span className="text-[11px] text-stone-400">
              {Math.round(((currentIndex + 1) / cards.length) * 100)}% Complete
            </span>
          </div>

          <div className="h-1.5 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-600 to-rose-500 transition-all duration-300 rounded-full"
              style={{ width: `${Math.round(((currentIndex + 1) / cards.length) * 100)}%` }}
            />
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-3 sm:p-5 pt-2 overflow-y-auto overscroll-contain flex-1 flex flex-col justify-between space-y-3 sm:space-y-4">

          {/* 3D Flashcard Container with Interactive Swipe Gestures */}
          <div className="w-full perspective-1000 overflow-hidden py-1">
            <div
              {...swipe.handlers}
              style={swipe.cardStyle}
              className="relative w-full cursor-grab active:cursor-grabbing select-none"
            >
              {/* Swipe Right Overlay Badge: LEARNED */}
              <div
                className="absolute top-4 right-4 z-30 pointer-events-none transition-opacity duration-75 flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-emerald-600 text-white font-black text-xs sm:text-sm shadow-xl border-2 border-emerald-400 rotate-12"
                style={{ opacity: swipe.rightOpacity }}
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>LEARNED</span>
              </div>

              {/* Swipe Left Overlay Badge: RE-LEARN HUB */}
              <div
                className="absolute top-4 left-4 z-30 pointer-events-none transition-opacity duration-75 flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-amber-500 text-stone-950 font-black text-xs sm:text-sm shadow-xl border-2 border-amber-300 -rotate-12"
                style={{ opacity: swipe.leftOpacity }}
              >
                <Zap className="w-4 h-4 fill-stone-950 stroke-[2]" />
                <span>RE-LEARN HUB</span>
              </div>

              {/* Inner 3D Flip Card */}
              <div
                className={`relative w-full rounded-3xl transition-transform duration-500 ease-out transform-style-preserve-3d min-h-[270px] xs:min-h-[300px] sm:min-h-[350px] ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
              {/* ==================== FRONT FACE: QUESTION ==================== */}
              <div
                className={`absolute inset-0 w-full h-full rounded-3xl border border-stone-200 dark:border-stone-800 bg-gradient-to-b from-white to-stone-50/50 dark:from-stone-900 dark:to-stone-950/60 shadow-lg hover:shadow-xl p-4 sm:p-6 flex flex-col justify-between overflow-y-auto overscroll-contain backface-hidden ${isFlipped ? 'pointer-events-none' : 'pointer-events-auto'
                  }`}
              >
                {/* Front Top Pill Bar */}
                <div className="flex items-center justify-between text-xs text-stone-400 gap-1.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-mono font-bold px-2 py-0.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-[10px]">
                      {currentCard.lessonNumber > 0 ? `L${currentCard.lessonNumber}` : 'Custom'}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-500">
                      {currentCard.partOfSpeech}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${isEnToJa
                        ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300'
                        : 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                      }`}>
                      {isEnToJa ? '🇬🇧➔🇯🇵 EN➔JA' : '🇯🇵➔🇬🇧 JA➔EN'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakJapanese(currentCard.kanji || currentCard.hiragana);
                      }}
                      className="p-1.5 min-h-[32px] min-w-[32px] flex items-center justify-center rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-red-500 transition active:scale-95"
                      title="Pronounce Japanese"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsFlipped(prev => !prev);
                      }}
                      className="p-1.5 min-h-[32px] min-w-[32px] flex items-center justify-center rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-600 transition active:scale-95"
                      title="Flip Card"
                    >
                      <RotateCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Front Question Body */}
                <div className="my-auto text-center space-y-2.5 py-3">
                  {isEnToJa ? (
                    /* EN to JA Front: English Word as Question */
                    <div className="space-y-2">
                      <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-400 block">
                        What is the Japanese for:
                      </span>
                      <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 dark:text-white leading-tight break-words px-2">
                        {currentCard.english}
                      </div>
                    </div>
                  ) : (
                    /* JA to EN Front: Original Japanese word with Furigana over Kanji */
                    < div className="space-y-1.5">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-400 block">
                    What is the English meaning?
                  </span>
                  <FuriganaText
                    kanji={currentCard.kanji || currentCard.hiragana}
                    reading={currentCard.hiragana}
                    showFurigana={showFurigana}
                    className="font-japanese text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black text-stone-900 dark:text-white drop-shadow-xs break-words px-2 tracking-wide"
                  />
                </div>
                  )}

                <p className="text-[11px] text-stone-400 pt-1 font-medium">
                  Tap anywhere or press <kbd className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 font-mono text-[10px]">Space</kbd> to reveal {isEnToJa ? 'Japanese' : 'meaning'}
                </p>
              </div>

              {/* Front Footer */}
              <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1.5 border-t border-stone-100 dark:border-stone-800">
                <span className="truncate max-w-[160px]">Category: {currentCard.category}</span>
                <span className="shrink-0 flex items-center gap-1">
                  <RotateCw className="w-3 h-3" /> Tap to flip
                </span>
              </div>
            </div>

            {/* ==================== BACK FACE: ANSWER ==================== */}
            <div
              className={`absolute inset-0 w-full h-full rounded-3xl border border-stone-200 dark:border-stone-800 bg-gradient-to-b from-white to-stone-50/50 dark:from-stone-900 dark:to-stone-950/60 shadow-lg hover:shadow-xl p-4 sm:p-6 flex flex-col justify-between overflow-y-auto overscroll-contain backface-hidden rotate-y-180 ${!isFlipped ? 'pointer-events-none' : 'pointer-events-auto'
                }`}
            >
              {/* Back Top Pill Bar */}
              <div className="flex items-center justify-between text-xs text-stone-400 gap-1.5">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-mono font-bold px-2 py-0.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-[10px]">
                    {currentCard.lessonNumber > 0 ? `L${currentCard.lessonNumber}` : 'Custom'}
                  </span>

                  {currentStatus === 'learned' && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Learned
                    </span>
                  )}
                  {currentStatus === 'not_sure' && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center gap-1">
                      <Zap className="w-3 h-3" /> Re-learn
                    </span>
                  )}
                  {currentStatus === 'not_learned' && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 flex items-center gap-1">
                      <X className="w-3 h-3" /> Not Learned
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakJapanese(currentCard.kanji || currentCard.hiragana);
                    }}
                    className="p-1.5 min-h-[32px] min-w-[32px] flex items-center justify-center rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-red-500 transition active:scale-95"
                    title="Pronounce Japanese"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsFlipped(prev => !prev);
                    }}
                    className="p-1.5 min-h-[32px] min-w-[32px] flex items-center justify-center rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-600 transition active:scale-95"
                    title="Flip Back"
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Back Answer Body */}
              <div className="my-auto space-y-2.5 py-2 text-center">
                {(() => {
                  const jp = getJapaneseWordDisplay(currentCard);
                  return (
                    <div>
                      {isEnToJa ? (
                        /* EN to JA Back: Reveals standard Japanese spelling with Furigana */
                        <>
                          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-0.5">
                            ✓ Japanese Translation:
                          </span>
                          <div className="px-2 block">
                            <FuriganaText
                              kanji={currentCard.kanji || currentCard.hiragana}
                              reading={currentCard.hiragana}
                              showFurigana={showFurigana}
                              className="font-japanese text-2xl xs:text-3xl sm:text-4xl font-black text-stone-900 dark:text-white break-words"
                            />
                          </div>
                          {jp.secondaryText && (
                            <span className="text-xs sm:text-sm font-normal text-stone-500 dark:text-stone-400 font-japanese block mt-0.5 break-words">
                              {jp.reading}
                            </span>
                          )}
                          <span className="text-xs text-stone-400 font-mono block mt-0.5">
                            ({currentCard.romaji})
                          </span>
                          <h3 className="text-sm sm:text-base font-bold text-stone-600 dark:text-stone-300 mt-1 break-words">
                            {currentCard.english}
                          </h3>
                        </>
                      ) : (
                        /* JA to EN Back: Reveals English meaning and Japanese with Furigana */
                        <>
                          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-0.5">
                            ✓ English Meaning:
                          </span>
                          <h3 className="text-xl xs:text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white break-words px-2">
                            {currentCard.english}
                          </h3>
                            <div className="pt-1 flex items-center justify-center gap-1.5 flex-wrap">
                              <span className="text-xs text-stone-400">Word:</span>
                              <FuriganaText
                                kanji={currentCard.kanji || currentCard.hiragana}
                                reading={currentCard.hiragana}
                                showFurigana={showFurigana}
                                className="text-sm font-bold font-japanese text-stone-900 dark:text-white"
                              />
                              <span className="text-xs font-mono text-stone-400">
                                ({currentCard.romaji})
                              </span>
                            </div>
                          </>
                        )}
                        </div>
                      );
                  })()}

                      {/* Example sentence */}
                      {currentCard.exampleSentence && (
                        <div className="p-2.5 sm:p-3 rounded-2xl bg-stone-100/70 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-800 text-left space-y-0.5 max-w-md mx-auto">
                          <div className="flex items-center justify-between gap-1">
                            <p className="font-japanese text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 break-words">
                              {currentCard.exampleSentence.japanese}
                            </p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                speakJapanese(currentCard.exampleSentence?.japanese || '');
                              }}
                              className="p-1 min-h-[28px] min-w-[28px] flex items-center justify-center text-red-500 hover:text-red-600 shrink-0"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          {currentCard.exampleSentence.hiragana && (
                            <p className="text-[11px] text-stone-500 font-japanese break-words">
                              {currentCard.exampleSentence.hiragana}
                            </p>
                          )}
                          {currentCard.exampleSentence.english && (
                            <p className="text-[11px] text-stone-600 dark:text-stone-300 italic pt-0.5 break-words">
                              {currentCard.exampleSentence.english}
                            </p>
                          )}
                        </div>
                      )}

                      {currentCard.notes && (
                        <p className="text-[10px] text-stone-400 italic break-words">
                          Note: {currentCard.notes}
                        </p>
                      )}
                    </div>

                {/* Back Footer */ }
                  <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1.5 border-t border-stone-100 dark:border-stone-800">
                    <span className="truncate max-w-[160px]">Category: {currentCard.category}</span>
                    <span className="shrink-0 flex items-center gap-1">
                      <RotateCw className="w-3 h-3" /> Tap to flip back
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Swipe Gestures Visual Guide */}
            <div className="flex items-center justify-between text-[11px] font-bold px-2 py-0.5 text-stone-400 select-none">
              <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                <span>←</span>
                <span>Swipe Left: Re-learn Hub</span>
              </span>
              <span className="text-stone-300 dark:text-stone-700 hidden xs:inline">•</span>
              <span className="text-[10px] text-stone-400 hidden sm:inline">Tap card to Flip</span>
              <span className="text-stone-300 dark:text-stone-700 hidden xs:inline">•</span>
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <span>Swipe Right: Learned</span>
                <span>→</span>
              </span>
            </div>
          </div>

          {/* Database Confirmation Toast */}
          {saveToast && (
            <div className="text-center animate-fadeIn">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold shadow-sm ${saveToast.status === 'not_sure' || saveToast.status === 'not_learned'
                  ? 'bg-amber-500 text-stone-950 font-black'
                  : 'bg-emerald-600 text-white'
                }`}>
                {saveToast.status === 'not_sure' || saveToast.status === 'not_learned' ? (
                  <>
                    <Zap className="w-3.5 h-3.5 text-stone-950 fill-stone-950" />
                    <span>⚡ Added to Re-learn Hub</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-200" />
                    <span>✓ Saved as Learned</span>
                  </>
                )}
              </span>
            </div>
          )}

          {/* Bottom Interactive Workflow Controls */}
          {isFlipped ? (
            /* Rating Buttons: Learned, Not Sure, Not Learned - Mobile Optimized */
            <div className="space-y-1.5 animate-fadeIn">
              <div className="text-[10px] font-bold text-stone-400 text-center uppercase tracking-wider">
                Mark Learning Status & Proceed
              </div>
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
                <button
                  onClick={() => handleRate('not_learned')}
                  disabled={Boolean(savingStatus)}
                  className={`py-2.5 px-2 min-h-[46px] sm:min-h-[50px] rounded-2xl border text-xs font-bold transition flex flex-col items-center justify-center gap-0.5 shadow-sm active:scale-95 ${currentStatus === 'not_learned'
                      ? 'bg-rose-600 text-white border-rose-600 shadow-md ring-2 ring-rose-400/50'
                      : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 hover:bg-rose-100'
                    }`}
                >
                  <div className="flex items-center gap-1">
                    <X className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">Not Learned (1)</span>
                  </div>
                  <span className="text-[9px] font-normal opacity-80 hidden xs:block">Needs Study</span>
                </button>

                <button
                  onClick={() => handleRate('not_sure')}
                  disabled={Boolean(savingStatus)}
                  className={`py-2.5 px-2 min-h-[46px] sm:min-h-[50px] rounded-2xl border text-xs font-bold transition flex flex-col items-center justify-center gap-0.5 shadow-sm active:scale-95 ${currentStatus === 'not_sure'
                      ? 'bg-amber-600 text-white border-amber-600 shadow-md ring-2 ring-amber-400/50'
                      : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900 text-amber-700 dark:text-amber-300 hover:bg-amber-100'
                    }`}
                >
                  <div className="flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                    <span className="truncate">⚡ Re-learn (2)</span>
                  </div>
                  <span className="text-[9px] font-normal opacity-80 hidden xs:block">Fast Recall</span>
                </button>

                <button
                  onClick={() => handleRate('learned')}
                  disabled={Boolean(savingStatus)}
                  className={`py-2.5 px-2 min-h-[46px] sm:min-h-[50px] rounded-2xl border text-xs font-bold transition flex flex-col items-center justify-center gap-0.5 shadow-sm active:scale-95 ${currentStatus === 'learned'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-400/50'
                      : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100'
                    }`}
                >
                  <div className="flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">Learned (3)</span>
                  </div>
                  <span className="text-[9px] font-normal opacity-80 hidden xs:block">Mastered ✓</span>
                </button>
              </div>
            </div>
          ) : (
            /* Reveal Button & Previous/Next Navigation */
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="w-11 h-11 sm:w-12 sm:h-12 min-h-[44px] rounded-2xl border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition text-stone-600 dark:text-stone-300 flex items-center justify-center shrink-0 active:scale-95"
                title="Previous Card (Left Arrow)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsFlipped(true)}
                className="flex-1 py-3 px-3 min-h-[44px] rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-1.5 active:scale-98"
              >
                <RotateCw className="w-4 h-4" />
                <span>Reveal Card (Space)</span>
              </button>

              <button
                onClick={handleNext}
                className="w-11 h-11 sm:w-12 sm:h-12 min-h-[44px] rounded-2xl border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 transition text-stone-600 dark:text-stone-300 flex items-center justify-center shrink-0 active:scale-95"
                title="Next Card (Right Arrow)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
