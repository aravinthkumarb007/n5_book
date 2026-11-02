'use client';

import React, { useState } from 'react';
import {
  Sparkles, Clock, Sliders, Check, Zap, Layers,
  BookOpen, HelpCircle, AlertTriangle, ArrowRight
} from 'lucide-react';
import { CustomExamConfig, MinnaQuestionType } from '@/types/minna';
import { FuriganaText } from '@/components/FuriganaText';
import { getMinnaLesson } from '@/data/minnaNoNihongo';

interface MinnaCustomExamModalProps {
  onClose: () => void;
  onStartExam: (config: CustomExamConfig) => void;
  initialLessonRange?: number[];
}

const ALL_QUESTION_TYPES: { type: MinnaQuestionType; label: string; description: string }[] = [
  { type: 'mcq', label: 'Multiple Choice (MCQ)', description: 'Kanji readings, vocabulary definitions, particle picks' },
  { type: 'fill_blank', label: 'Fill in the Blank', description: 'Particles, verb forms (te/nai/ta/dict), conjugations' },
  { type: 'sentence_formation', label: 'Sentence Tiles', description: 'Click/drag word tiles to construct natural Japanese' },
  { type: 'translation_ja_en', label: 'Japanese → English', description: 'Translate contextual Japanese sentences' },
  { type: 'translation_en_ja', label: 'English → Japanese', description: 'Form Japanese expressions from English' },
  { type: 'grammar_correction', label: 'Grammar Error Spotting', description: 'Identify and fix structural grammar mistakes' },
  { type: 'matching', label: 'Vocabulary Matching', description: 'Pair Japanese words with their English definitions' },
  { type: 'reading', label: 'Reading Comprehension', description: 'Mini dialogues and short passage reading questions' },
];

export function MinnaCustomExamModal({
  onClose,
  onStartExam,
  initialLessonRange = [1]
}: MinnaCustomExamModalProps) {
  const [selectedLessons, setSelectedLessons] = useState<number[]>(initialLessonRange);
  const [focus, setFocus] = useState<'all' | 'vocab' | 'grammar'>('all');
  const [selectedQuestionTypes, setSelectedQuestionTypes] = useState<MinnaQuestionType[]>([
    'mcq', 'fill_blank', 'sentence_formation', 'translation_ja_en', 'translation_en_ja'
  ]);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [durationMinutes, setDurationMinutes] = useState<number>(10);
  const [generatorMode, setGeneratorMode] = useState<'smart_local' | 'groq_ai'>('groq_ai');

  const toggleLesson = (num: number) => {
    if (selectedLessons.includes(num)) {
      if (selectedLessons.length > 1) {
        setSelectedLessons(selectedLessons.filter(n => n !== num));
      }
    } else {
      setSelectedLessons([...selectedLessons, num].sort((a, b) => a - b));
    }
  };

  const applyLessonPreset = (start: number, end: number) => {
    const range: number[] = [];
    for (let i = start; i <= end; i++) range.push(i);
    setSelectedLessons(range);
  };

  const toggleQuestionType = (type: MinnaQuestionType) => {
    if (selectedQuestionTypes.includes(type)) {
      if (selectedQuestionTypes.length > 1) {
        setSelectedQuestionTypes(selectedQuestionTypes.filter(t => t !== type));
      }
    } else {
      setSelectedQuestionTypes([...selectedQuestionTypes, type]);
    }
  };

  const handleLaunch = () => {
    const config: CustomExamConfig = {
      title: `Minna Assessment (Lessons ${selectedLessons.join(', ')})`,
      level: 'N5',
      lessonRange: selectedLessons,
      focus,
      questionTypes: selectedQuestionTypes,
      questionCount,
      difficulty,
      durationMinutes,
      includeWeakAreas: true,
      generatorMode
    };
    onStartExam(config);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-4 bg-stone-950/70 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-stone-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 flex flex-col max-h-[96vh] sm:max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-5 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="p-2 sm:p-2.5 rounded-2xl bg-white/20 backdrop-blur-sm shrink-0">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-200" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-2xl font-black truncate">AI Custom Exam Studio</h2>
              <p className="text-[11px] sm:text-xs text-white/90 line-clamp-1">
                Design custom JLPT N5 tests across Minna lessons
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl bg-black/20 hover:bg-black/30 text-white transition shrink-0"
          >
            ✕
          </button>
        </div>

        {/* Studio Form Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6">
          
          {/* Section 1: Lesson Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-stone-500">
                1. Select Lessons to Test ({selectedLessons.length} selected)
              </label>

              {/* Quick Presets */}
              <div className="flex flex-wrap gap-1">
                <button
                  type="button"
                  onClick={() => applyLessonPreset(1, 5)}
                  className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-stone-100 dark:bg-stone-800 hover:bg-red-100 text-stone-700 dark:text-stone-300"
                >
                  L1–5
                </button>
                <button
                  type="button"
                  onClick={() => applyLessonPreset(6, 10)}
                  className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-stone-100 dark:bg-stone-800 hover:bg-red-100 text-stone-700 dark:text-stone-300"
                >
                  L6–10
                </button>
                <button
                  type="button"
                  onClick={() => applyLessonPreset(11, 15)}
                  className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-stone-100 dark:bg-stone-800 hover:bg-red-100 text-stone-700 dark:text-stone-300"
                >
                  L11–15
                </button>
                <button
                  type="button"
                  onClick={() => applyLessonPreset(16, 20)}
                  className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-stone-100 dark:bg-stone-800 hover:bg-red-100 text-stone-700 dark:text-stone-300"
                >
                  L16–20
                </button>
                <button
                  type="button"
                  onClick={() => applyLessonPreset(21, 25)}
                  className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-stone-100 dark:bg-stone-800 hover:bg-red-100 text-stone-700 dark:text-stone-300"
                >
                  L21–25
                </button>
                <button
                  type="button"
                  onClick={() => applyLessonPreset(1, 25)}
                  className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-red-600 text-white"
                >
                  All 1–25
                </button>
              </div>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-13 gap-1.5">
              {Array.from({ length: 25 }, (_, i) => i + 1).map((num) => {
                const isSelected = selectedLessons.includes(num);
                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => toggleLesson(num)}
                    className={`py-2 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center ${
                      isSelected
                        ? 'bg-red-600 text-white shadow-sm scale-105'
                        : 'bg-stone-100 dark:bg-stone-800/80 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
                    }`}
                  >
                    <span>L{num}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Lessons Furigana Preview */}
            <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 text-xs flex flex-wrap items-center gap-2">
              <span className="font-bold text-stone-500 uppercase tracking-wider text-[10px]">
                Selected Syllabus:
              </span>
              <div className="flex flex-wrap gap-1.5 items-center">
                {selectedLessons.map(num => {
                  const les = getMinnaLesson(num);
                  return (
                    <span
                      key={num}
                      className="px-2.5 py-1 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-japanese text-xs text-stone-800 dark:text-stone-200 inline-flex items-center gap-1.5 shadow-2xs"
                    >
                      <span className="font-mono font-bold text-red-600 text-[10px]">L{num}</span>
                      {les && <FuriganaText text={les.titleJapanese} />}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 2: Focus & Engine */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Focus */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-stone-500">
                2. Curriculum Focus
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFocus('all')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition border ${
                    focus === 'all'
                      ? 'border-red-600 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400'
                      : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400'
                  }`}
                >
                  Vocab & Grammar
                </button>
                <button
                  type="button"
                  onClick={() => setFocus('vocab')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition border ${
                    focus === 'vocab'
                      ? 'border-red-600 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400'
                      : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400'
                  }`}
                >
                  Vocabulary Only
                </button>
                <button
                  type="button"
                  onClick={() => setFocus('grammar')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition border ${
                    focus === 'grammar'
                      ? 'border-red-600 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400'
                      : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400'
                  }`}
                >
                  Grammar Only
                </button>
              </div>
            </div>

            {/* Generator Engine */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-stone-500">
                3. Test Engine
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGeneratorMode('groq_ai')}
                  className={`p-2 rounded-xl text-xs font-bold transition border flex items-center justify-center gap-1.5 ${
                    generatorMode === 'groq_ai'
                      ? 'border-red-600 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400'
                      : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Groq AI (Contextual)
                </button>
                <button
                  type="button"
                  onClick={() => setGeneratorMode('smart_local')}
                  className={`p-2 rounded-xl text-xs font-bold transition border flex items-center justify-center gap-1.5 ${
                    generatorMode === 'smart_local'
                      ? 'border-red-600 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400'
                      : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-blue-500" />
                  Smart Local (Instant)
                </button>
              </div>
            </div>

          </div>

          {/* Section 3: Question Types (8 Formats) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-stone-500">
                4. Select Question Formats ({selectedQuestionTypes.length}/8 enabled)
              </label>
              <button
                type="button"
                onClick={() => setSelectedQuestionTypes(ALL_QUESTION_TYPES.map(q => q.type))}
                className="text-[11px] font-bold text-red-600 dark:text-red-400 hover:underline"
              >
                Select All
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2">
              {ALL_QUESTION_TYPES.map((item) => {
                const isSelected = selectedQuestionTypes.includes(item.type);
                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => toggleQuestionType(item.type)}
                    className={`p-2.5 sm:p-3 rounded-2xl border text-left transition flex flex-col justify-between gap-1.5 ${
                      isSelected
                        ? 'border-red-500 bg-red-50/50 dark:bg-red-950/30'
                        : 'border-stone-200 dark:border-stone-800 bg-stone-50/30 dark:bg-stone-800/20 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-[11px] sm:text-xs text-stone-900 dark:text-white line-clamp-1">
                        {item.label}
                      </span>
                      <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-red-600 text-white' : 'bg-stone-300 dark:bg-stone-700'
                      }`}>
                        {isSelected && <Check className="w-2.5 h-2.5" />}
                      </div>
                    </div>
                    <p className="text-[9px] sm:text-[10px] text-stone-500 line-clamp-2">
                      {item.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 4: Parameters (Count, Difficulty, Timer) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            
            {/* Question Count */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-600 dark:text-stone-400">
                Question Count
              </label>
              <div className="flex gap-1 sm:gap-1.5">
                {[5, 10, 15, 20, 25].map((cnt) => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => setQuestionCount(cnt)}
                    className={`flex-1 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition ${
                      questionCount === cnt
                        ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    {cnt}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-600 dark:text-stone-400">
                Difficulty
              </label>
              <div className="flex gap-1 sm:gap-1.5">
                {(['easy', 'medium', 'hard'] as const).map((diff) => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setDifficulty(diff)}
                    className={`flex-1 py-1.5 sm:py-2 rounded-xl text-xs font-bold capitalize transition ${
                      difficulty === diff
                        ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Timer Duration */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-600 dark:text-stone-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-500" />
                Timer
              </label>
              <div className="flex gap-1 sm:gap-1.5">
                {[
                  { label: 'Off', val: 0 },
                  { label: '5m', val: 5 },
                  { label: '10m', val: 10 },
                  { label: '15m', val: 15 },
                  { label: '20m', val: 20 },
                ].map((t) => (
                  <button
                    key={t.val}
                    type="button"
                    onClick={() => setDurationMinutes(t.val)}
                    className={`flex-1 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition ${
                      durationMinutes === t.val
                        ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="text-xs text-stone-500 text-center sm:text-left">
            Selected: <span className="font-bold text-stone-800 dark:text-stone-200">{questionCount} Qs</span> • <span className="font-bold text-stone-800 dark:text-stone-200">{selectedLessons.length} Lessons</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-stone-300 transition text-center"
            >
              Cancel
            </button>
            <button
              onClick={handleLaunch}
              className="flex-2 sm:flex-initial px-5 sm:px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs sm:text-sm shadow-lg hover:from-red-700 hover:to-rose-700 active:scale-95 transition flex items-center justify-center gap-2"
            >
              <span>Generate & Start</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
