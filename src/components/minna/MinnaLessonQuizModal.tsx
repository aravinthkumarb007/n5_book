'use client';

import React, { useState } from 'react';
import {
  Sparkles, Zap, Trophy, Clock, CheckCircle2, ArrowRight,
  BookOpen, Layers, Check, Loader2, HelpCircle
} from 'lucide-react';
import { CustomExamConfig, ExamQuestion, MinnaLesson, MinnaQuestionType } from '@/types/minna';
import { FuriganaText } from '@/components/FuriganaText';
import { AiQuizLoadingOverlay } from '@/components/common/AiQuizLoadingOverlay';

interface MinnaLessonQuizModalProps {
  lesson: MinnaLesson;
  onClose: () => void;
  onStartExam: (config: CustomExamConfig, questions: ExamQuestion[]) => void;
}

export function MinnaLessonQuizModal({
  lesson,
  onClose,
  onStartExam
}: MinnaLessonQuizModalProps) {
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [focus, setFocus] = useState<'all' | 'vocab' | 'grammar'>('all');
  const [generatorMode, setGeneratorMode] = useState<'groq_ai' | 'smart_local'>('groq_ai');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const allQuestionTypes: MinnaQuestionType[] = [
    'mcq',
    'fill_blank',
    'sentence_formation',
    'translation_ja_en',
    'translation_en_ja',
    'grammar_correction',
    'matching',
    'reading'
  ];

  const handleLaunch = async () => {
    setIsGenerating(true);
    setErrorMessage(null);

    const config: CustomExamConfig = {
      title: `Lesson ${lesson.lessonNumber} Assessment: ${lesson.title}`,
      level: lesson.level,
      lessonRange: [lesson.lessonNumber],
      focus,
      questionTypes: allQuestionTypes,
      questionCount,
      difficulty,
      durationMinutes: questionCount <= 5 ? 5 : questionCount <= 10 ? 10 : 15,
      includeWeakAreas: true,
      generatorMode
    };

    try {
      const res = await fetch('/api/ai/generate-lesson-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonRange: [lesson.lessonNumber],
          questionTypes: allQuestionTypes,
          questionCount,
          focus,
          difficulty,
          generatorMode
        })
      });

      const data = await res.json();
      if (data.questions && data.questions.length > 0) {
        onStartExam(config, data.questions);
        return;
      } else {
        throw new Error(data.error || 'No questions generated');
      }
    } catch (err: any) {
      console.warn('AI quiz generation failed, retrying with smart local generator:', err);
      // Automatic fallback to smart local generator
      try {
        const fallbackRes = await fetch('/api/ai/generate-lesson-quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lessonRange: [lesson.lessonNumber],
            questionTypes: allQuestionTypes,
            questionCount,
            focus,
            difficulty,
            generatorMode: 'smart_local'
          })
        });
        const fallbackData = await fallbackRes.json();
        if (fallbackData.questions && fallbackData.questions.length > 0) {
          onStartExam({ ...config, generatorMode: 'smart_local' }, fallbackData.questions);
          return;
        }
      } catch (e2: any) {
        setErrorMessage('Failed to generate quiz. Please try again.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-5 bg-stone-950/75 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 flex flex-col max-h-[96vh] sm:max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-3.5 sm:px-6 py-3 sm:py-5 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white flex items-center justify-between shrink-0">
          <div className="space-y-0.5 sm:space-y-1">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-white/20">
                Lesson Assessment
              </span>
              <span className="text-xs font-japanese font-medium opacity-90">
                <FuriganaText text={lesson.titleJapanese} rtClassName="text-[0.6em] text-amber-200 select-none pb-0.5" />
              </span>
            </div>
            <h2 className="text-base sm:text-xl font-black">
              Lesson {lesson.lessonNumber} Assessment
            </h2>
            <p className="text-[11px] sm:text-xs text-white/90 line-clamp-1">
              {lesson.title}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl bg-black/20 hover:bg-black/30 text-white transition"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 space-y-4 sm:space-y-5">
          
          {/* Syllabus Scope Overview */}
          <div className="p-3 sm:p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-stone-900 dark:text-white block">
                Target Pool:
              </span>
              <span className="text-stone-500 text-[11px]">
                Lesson {lesson.lessonNumber} curriculum
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 font-mono font-bold text-stone-700 dark:text-stone-300">
              <span className="px-2 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[11px]">
                {lesson.vocabulary.length} Vocab
              </span>
              <span className="px-2 py-1 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[11px]">
                {lesson.grammar.length} Grammar
              </span>
            </div>
          </div>

          {/* Preset Quiz Modes */}
          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-stone-500">
              Select Assessment Mode
            </label>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
              {[
                { cnt: 5, label: 'Quick Quiz', time: '3 mins', icon: Zap },
                { cnt: 10, label: 'Standard Test', time: '8 mins', icon: CheckCircle2 },
                { cnt: 15, label: 'Mastery Exam', time: '15 mins', icon: Trophy },
              ].map((m) => {
                const Icon = m.icon;
                const isSelected = questionCount === m.cnt;
                return (
                  <button
                    key={m.cnt}
                    type="button"
                    onClick={() => setQuestionCount(m.cnt)}
                    className={`p-2 sm:p-3 rounded-2xl border text-left transition flex flex-col justify-between gap-1.5 ${
                      isSelected
                        ? 'border-red-600 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-bold ring-1 ring-red-500 shadow-sm'
                        : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="text-[11px] sm:text-xs font-mono font-black">{m.cnt} Qs</span>
                    </div>
                    <div>
                      <div className="text-[11px] sm:text-xs font-bold leading-tight">{m.label}</div>
                      <div className="text-[9px] sm:text-[10px] text-stone-400 mt-0.5">{m.time}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Focus & Engine Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Focus */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-600 dark:text-stone-400">
                Curriculum Focus
              </label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'vocab', label: 'Vocab' },
                  { id: 'grammar', label: 'Grammar' }
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFocus(f.id as any)}
                    className={`py-2 px-1 rounded-xl text-xs font-bold transition border ${
                      focus === f.id
                        ? 'border-red-600 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400'
                        : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 bg-white dark:bg-stone-900'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Test Engine */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-600 dark:text-stone-400">
                Question Generator
              </label>
              <div className="grid grid-cols-2 gap-1">
                <button
                  type="button"
                  onClick={() => setGeneratorMode('groq_ai')}
                  className={`p-2 rounded-xl text-xs font-bold transition border flex items-center justify-center gap-1.5 ${
                    generatorMode === 'groq_ai'
                      ? 'border-red-600 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400'
                      : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 bg-white dark:bg-stone-900'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Groq AI
                </button>
                <button
                  type="button"
                  onClick={() => setGeneratorMode('smart_local')}
                  className={`p-2 rounded-xl text-xs font-bold transition border flex items-center justify-center gap-1.5 ${
                    generatorMode === 'smart_local'
                      ? 'border-red-600 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400'
                      : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 bg-white dark:bg-stone-900'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-blue-500" />
                  Smart Local
                </button>
              </div>
            </div>

          </div>

          {/* Formats Included Checklist */}
          <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/30 border border-stone-200 dark:border-stone-800 text-xs space-y-1.5">
            <span className="font-bold text-stone-700 dark:text-stone-300 block">
              Question Formats Dynamically Included:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-1 text-[11px] text-stone-600 dark:text-stone-400">
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Vocabulary & Readings (MCQ)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Particles & Conjugations (Fill-in)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Sentence Tiles (Word Formation)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Translations (JA ↔ EN)</span>
              </div>
            </div>
          </div>

          {errorMessage && (
            <p className="text-xs text-red-600 dark:text-red-400 font-medium bg-red-50 dark:bg-red-950/40 p-2.5 rounded-xl border border-red-200 dark:border-red-900">
              {errorMessage}
            </p>
          )}

        </div>

        {/* Footer Actions */}
        <div className="px-3.5 sm:px-6 py-2.5 sm:py-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 flex items-center justify-between gap-2 shrink-0">
          <button
            onClick={onClose}
            className="px-3 sm:px-4 py-2 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-stone-300 transition shrink-0"
          >
            Cancel
          </button>

          <button
            onClick={handleLaunch}
            disabled={isGenerating}
            className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs sm:text-sm shadow-lg hover:from-red-700 hover:to-rose-700 active:scale-95 transition flex items-center justify-center gap-1.5 sm:gap-2 flex-1 sm:flex-initial"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Generating {questionCount} Qs...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Start Assessment</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </>
            )}
          </button>
        </div>

      </div>

      {/* AI Quiz Generation Loading Indicator */}
      <AiQuizLoadingOverlay
        isOpen={isGenerating}
        title={`Generating Lesson ${lesson.lessonNumber} Assessment`}
        subtitle="Groq AI is synthesizing authentic Japanese questions with complete furigana..."
      />
    </div>
  );
}
