'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, BookOpen, Brain, Zap } from 'lucide-react';

interface AiQuizLoadingOverlayProps {
  isOpen: boolean;
  title?: string;
  subtitle?: string;
}

const LOADING_STEPS = [
  'Connecting to high-speed Groq LLaMA 3.3 engine...',
  'Analyzing JLPT N5 Minna no Nihongo curriculum...',
  'Synthesizing authentic contextual Japanese sentences...',
  'Adding ruby furigana to all kanji characters...',
  'Calibrating question distractors and grammar explanations...',
  'Finalizing personalized exam questions...'
];

export const AiQuizLoadingOverlay: React.FC<AiQuizLoadingOverlayProps> = ({
  isOpen,
  title = 'Generating AI Custom Quiz',
  subtitle = 'Crafting specialized JLPT N5 questions with complete furigana...'
}) => {
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setStepIdx(0);
      return;
    }

    const interval = setInterval(() => {
      setStepIdx(prev => (prev + 1) % LOADING_STEPS.length);
    }, 1200);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-stone-900 border border-stone-800 rounded-3xl p-8 shadow-2xl text-center space-y-6 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Central Animated Spinner Icon */}
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
          {/* Pulsing Outer Rings */}
          <div className="absolute inset-0 rounded-full border-2 border-red-500/30 animate-ping opacity-30" />
          <div className="absolute -inset-2 rounded-full border border-red-500/20 animate-pulse" />
          
          {/* Rotating Gradient Spinner */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-red-500 border-r-rose-400 border-b-amber-400 animate-spin" />

          {/* Central Logo */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center shadow-lg shadow-red-600/40">
            <Sparkles className="w-8 h-8 text-white animate-pulse" />
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold tracking-wide">
            <Zap className="w-3.5 h-3.5 animate-bounce" />
            AI EXAM ENGINE ACTIVE
          </div>
          <h3 className="text-xl font-black text-white tracking-tight">
            {title}
          </h3>
          <p className="text-xs text-stone-400 max-w-xs mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Progress Step Carousel */}
        <div className="p-3.5 rounded-2xl bg-stone-950/70 border border-stone-800 text-xs font-medium text-stone-300 flex items-center justify-center gap-2.5 min-h-[46px]">
          <Loader2 className="w-4 h-4 text-amber-400 animate-spin shrink-0" />
          <span className="animate-fadeIn key={stepIdx}">
            {LOADING_STEPS[stepIdx]}
          </span>
        </div>

        <div className="text-[11px] text-stone-500 flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Furigana & distractor verification in progress</span>
        </div>
      </div>
    </div>
  );
};

export default AiQuizLoadingOverlay;
