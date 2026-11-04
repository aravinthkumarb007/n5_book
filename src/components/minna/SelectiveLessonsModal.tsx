'use client';

import React, { useState } from 'react';
import { Layers, Sparkles, Check, BookOpen, ArrowRight, X } from 'lucide-react';
import { ALL_MINNA_LESSONS } from '@/data/minnaNoNihongo';

interface SelectiveLessonsModalProps {
  onClose: () => void;
  onStartFlashcards: (lessonNumbers: number[]) => void;
  initialSelection?: number[];
}

export function SelectiveLessonsModal({
  onClose,
  onStartFlashcards,
  initialSelection = [1, 2]
}: SelectiveLessonsModalProps) {
  const [selectedLessons, setSelectedLessons] = useState<number[]>(initialSelection);

  const toggleLesson = (num: number) => {
    if (selectedLessons.includes(num)) {
      if (selectedLessons.length > 1) {
        setSelectedLessons(selectedLessons.filter(n => n !== num));
      }
    } else {
      setSelectedLessons([...selectedLessons, num].sort((a, b) => a - b));
    }
  };

  const applyPreset = (start: number, end: number) => {
    const range: number[] = [];
    for (let i = start; i <= end; i++) range.push(i);
    setSelectedLessons(range);
  };

  const selectAll = () => {
    const all = ALL_MINNA_LESSONS.map(l => l.lessonNumber);
    setSelectedLessons(all);
  };

  // Calculate total vocab in selected lessons
  const totalVocabCount = ALL_MINNA_LESSONS
    .filter(l => selectedLessons.includes(l.lessonNumber))
    .reduce((acc, l) => acc + l.vocabulary.length, 0);

  const handleLaunch = () => {
    if (selectedLessons.length === 0) return;
    onStartFlashcards(selectedLessons);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 flex flex-col p-5 sm:p-7 space-y-5 max-h-[92vh] overflow-hidden animate-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center gap-1">
                <Layers className="w-3 h-3" /> Selective Lessons Mode
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white mt-1">
              Custom Multi-Lesson Flashcards
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Select any combination of lessons to study all their vocabulary seamlessly in one flashcard deck.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-600 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
          >
            ✕
          </button>
        </div>

        {/* Quick Presets */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
            Quick Lesson Range Presets
          </label>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none">
            <button
              onClick={() => applyPreset(1, 5)}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition shrink-0"
            >
              Lessons 1–5
            </button>
            <button
              onClick={() => applyPreset(6, 10)}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition shrink-0"
            >
              Lessons 6–10
            </button>
            <button
              onClick={() => applyPreset(11, 15)}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition shrink-0"
            >
              Lessons 11–15
            </button>
            <button
              onClick={() => applyPreset(16, 20)}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition shrink-0"
            >
              Lessons 16–20
            </button>
            <button
              onClick={() => applyPreset(21, 25)}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition shrink-0"
            >
              Lessons 21–25
            </button>
            <button
              onClick={selectAll}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 hover:bg-red-200 transition shrink-0"
            >
              All 25 Lessons
            </button>
          </div>
        </div>

        {/* 25 Lessons Grid Selection */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-[45vh]">
          <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block sticky top-0 bg-white dark:bg-stone-900 py-1">
            Toggle Lessons to Include ({selectedLessons.length} selected)
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {ALL_MINNA_LESSONS.map((l) => {
              const isSelected = selectedLessons.includes(l.lessonNumber);
              return (
                <button
                  key={l.id}
                  onClick={() => toggleLesson(l.lessonNumber)}
                  className={`p-3 rounded-2xl border text-left transition flex items-center justify-between gap-2 ${
                    isSelected
                      ? 'bg-red-50 dark:bg-red-950/30 border-red-400 dark:border-red-800 text-stone-900 dark:text-white shadow-xs'
                      : 'border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/40 text-stone-600 dark:text-stone-400'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <span className="font-mono text-xs font-bold block">
                      Lesson {l.lessonNumber}
                    </span>
                    <span className="text-[11px] truncate block text-stone-500">
                      {l.vocabulary.length} vocab
                    </span>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 border transition ${
                      isSelected
                        ? 'bg-red-600 border-red-600 text-white'
                        : 'border-stone-300 dark:border-stone-700'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Summary & Launch CTA */}
        <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="text-xs text-stone-500">
            <strong className="text-stone-900 dark:text-white">{selectedLessons.length} Lessons</strong> selected •{' '}
            <strong className="text-red-600 dark:text-red-400">{totalVocabCount} Total Words</strong> in Deck
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-bold transition"
            >
              Cancel
            </button>

            <button
              onClick={handleLaunch}
              disabled={selectedLessons.length === 0}
              className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Launch Flashcards ({totalVocabCount})</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

