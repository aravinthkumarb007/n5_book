'use client';

import React from 'react';
import {
  Flame,
  Award,
  BookOpen,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Lock,
  CheckCircle2,
  BrainCircuit,
  Zap,
  FileCheck,
  Calculator,
  RotateCcw,
  Layers
} from 'lucide-react';
import { UserKanjiProgress, UserSettings } from '@/types/kanji';
import { LEVEL_METADATA } from '@/data/kanjiDatabase';

interface DashboardViewProps {
  progressList: UserKanjiProgress[];
  settings: UserSettings;
  onNavigate: (view: string) => void;
  onStartQuickStudy: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  progressList,
  settings,
  onNavigate,
  onStartQuickStudy
}) => {
  // Statistics calculations
  const totalTarget = 120;
  const learnedCount = progressList.filter(p => p.learning_status === 'learned').length;
  const needsRevisionCount = progressList.filter(p => p.learning_status === 'needs_revision').length;
  const learningCount = progressList.filter(p => p.learning_status === 'learning').length;
  const availableCount = progressList.filter(p => p.learning_status === 'available').length;
  const lockedCount = progressList.filter(p => p.learning_status === 'locked').length;

  const totalMasteredPool = learnedCount + needsRevisionCount;
  const remainingCount = totalTarget - totalMasteredPool;
  const progressPercent = Math.round((totalMasteredPool / totalTarget) * 100);

  // Calculate current level
  let currentLevel = 1;
  for (let lvl = 1; lvl <= 12; lvl++) {
    const meta = LEVEL_METADATA.find(l => l.level === lvl);
    if (!meta) continue;
    const lvlKanji = progressList.filter(p => meta.kanjiIds.includes(p.kanji_id));
    const allPassed = lvlKanji.every(p => p.learning_status === 'learned' || p.learning_status === 'needs_revision');
    if (!allPassed) {
      currentLevel = lvl;
      break;
    }
    if (lvl === 12 && allPassed) {
      currentLevel = 12;
    }
  }

  // Mastery Averages across learned pool
  const learnedProgressItems = progressList.filter(p => p.learning_status === 'learned' || p.learning_status === 'needs_revision');
  const avgOnyomi = learnedProgressItems.length > 0
    ? Math.round(learnedProgressItems.reduce((acc, p) => acc + p.onyomi_accuracy, 0) / learnedProgressItems.length)
    : 0;
  const avgKunyomi = learnedProgressItems.length > 0
    ? Math.round(learnedProgressItems.reduce((acc, p) => acc + p.kunyomi_accuracy, 0) / learnedProgressItems.length)
    : 0;
  const avgVocab = learnedProgressItems.length > 0
    ? Math.round(learnedProgressItems.reduce((acc, p) => acc + p.vocabulary_accuracy, 0) / learnedProgressItems.length)
    : 0;
  const avgAccuracy = Math.round((avgOnyomi + avgKunyomi + avgVocab) / 3) || 0;

  // Motivational message based on actual progress
  const getMotivationalMessage = () => {
    if (totalMasteredPool === 0) {
      return 'Welcome! Start Level 1 today to learn your first foundational Japanese Kanji in just 10 minutes.';
    } else if (totalMasteredPool < 10) {
      return `Great beginning! You have unlocked ${totalMasteredPool} kanji. Finish Level 1 to open Level 2.`;
    } else if (totalMasteredPool < 30) {
      return `Solid rhythm! You know ${totalMasteredPool} kanji. Keep your daily office streak alive!`;
    } else if (totalMasteredPool < 60) {
      return `Impressive progress! You are nearly halfway through the entire 120-kanji N5 curriculum.`;
    } else if (totalMasteredPool < 100) {
      return `Mastery within reach! ${totalMasteredPool}/120 kanji conquered. Your reading skills are flourishing.`;
    } else if (totalMasteredPool < 120) {
      return `Final sprint! Only ${remainingCount} kanji remaining until 100% complete N5 mastery.`;
    } else {
      return `Sensational achievement! All 120 N5 Kanji have been mastered! Continue full-syllabus review!`;
    }
  };

  return (
      <div className="space-y-6 animate-fadeIn pb-12 w-full max-w-full min-w-0 overflow-x-hidden">
        {/* Welcome & Motivational Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 p-6 sm:p-8 text-white shadow-xl shadow-red-900/10 w-full max-w-full min-w-0">
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-100">
                  <Sparkles size={14} />
                  <span>N5 Kanji Master • Daily Office Learning</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Konnichiwa, {settings.user_name}!
                </h1>
                <p className="text-sm text-red-50 leading-relaxed">
                  {getMotivationalMessage()}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto shrink-0">
                <button
                  type="button"
                  onClick={onStartQuickStudy}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-red-700 font-bold text-xs shadow-lg hover:bg-stone-50 active:scale-95 transition-all cursor-pointer w-full sm:w-auto"
                >
                  <Zap size={16} />
                  <span>Quick Break (5-15m)</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('learn')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-red-700/60 hover:bg-red-700/80 border border-white/20 text-white font-bold text-xs active:scale-95 transition-all cursor-pointer w-full sm:w-auto"
                >
                  <span>Continue Level {currentLevel}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* Decorative background watermark */}
            <span className="absolute right-4 -bottom-6 text-9xl font-japanese font-black text-white/10 select-none pointer-events-none">
              漢
            </span>
          </div>

          {/* 1-Click Level 1 Recovery Banner if user completed Level 1 yesterday */}
          {totalMasteredPool === 0 && (
            <div className="p-4 sm:p-5 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-700 dark:text-amber-300 shrink-0">
                  <RotateCcw size={20} />
                </span>
                <div>
                  <h4 className="font-bold text-sm text-stone-900 dark:text-white">
                    Completed Kanji Level 1 yesterday?
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-300">
                    Click here to immediately restore your completed Level 1 kanji (#1 to #10), unlock Level 2, and save to Supabase.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={async () => {
                  const { recoverCompletedLevel1 } = await import('@/services/cloudSyncService');
                  await recoverCompletedLevel1();
                  window.location.reload();
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-colors shrink-0 cursor-pointer text-center"
              >
                Restore Level 1 & Unlock Level 2
              </button>
            </div>
          )}

          {/* Minna no Nihongo Feature Highlight Card */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-900 to-red-950 border border-stone-800 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-600 text-white">
                  Feature Expansion
                </span>
                <span className="text-xs font-bold text-amber-300 font-japanese">
                  みんなの日本語 (Minna no Nihongo)
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black">
                Complete Lesson-Wise Vocabulary, Grammar & AI Custom Exam Studio
              </h2>
              <p className="text-xs text-stone-300 leading-relaxed">
                All 25 lessons of Shokyu I loaded with native audio pronunciation, structured grammar formulas,
                interactive sentence formation tiles, and configurable AI test generators.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('minna')}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold text-xs sm:text-sm shadow-lg active:scale-95 transition flex items-center justify-center gap-2 w-full md:w-auto shrink-0 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Open Minna Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Primary KPI Grid (6 metrics) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3.5">
            <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
              <p className="text-xs text-stone-500 font-medium">Target</p>
              <p className="text-2xl font-bold text-stone-900 dark:text-stone-100 mt-1">120</p>
              <span className="text-[11px] text-stone-400">Total N5 Kanji</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
              <p className="text-xs text-stone-500 font-medium">Learned</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">{totalMasteredPool}</p>
              <span className="text-[11px] text-stone-400">{progressPercent}% Completed</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
              <p className="text-xs text-stone-500 font-medium">Remaining</p>
              <p className="text-2xl font-bold text-stone-700 dark:text-stone-300 mt-1">{remainingCount}</p>
              <span className="text-[11px] text-stone-400">Kanji to master</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
              <p className="text-xs text-stone-500 font-medium">Current Level</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">L{currentLevel}</p>
              <span className="text-[11px] text-stone-400">Of 12 Levels</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
              <div className="flex items-center gap-1">
                <Flame size={14} className="text-amber-500" />
                <p className="text-xs text-stone-500 font-medium">Streak</p>
              </div>
              <p className="text-2xl font-bold text-amber-500 mt-1">{settings.daily_streak} <span className="text-xs font-normal">days</span></p>
              <span className="text-[11px] text-stone-400">Keep it going!</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
              <div className="flex items-center gap-1">
                <AlertTriangle size={14} className="text-amber-600" />
                <p className="text-xs text-stone-500 font-medium">Revision</p>
              </div>
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">{needsRevisionCount}</p>
              <span className="text-[11px] text-stone-400">Needs review</span>
            </div>
          </div>

          {/* Main Split: Mastery Progress Bar & Readings Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Overall Curriculum Progress Bar Card */}
            <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                    120-Kanji Learning Progression
                  </h3>
                  <p className="text-xs text-stone-500">
                    Structured across 12 progressive levels (10 kanji each)
                  </p>
                </div>
                <span className="text-sm font-extrabold text-red-600 dark:text-red-400">
                  {progressPercent}%
                </span>
              </div>

              {/* Large Segmented Progress Bar */}
              <div className="w-full h-4 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden flex shadow-inner">
                <div
                  style={{ width: `${(learnedCount / totalTarget) * 100}%` }}
                  className="bg-green-500 h-full transition-all duration-500"
                  title={`Learned: ${learnedCount}`}
                />
                <div
                  style={{ width: `${(needsRevisionCount / totalTarget) * 100}%` }}
                  className="bg-amber-500 h-full transition-all duration-500"
                  title={`Needs Revision: ${needsRevisionCount}`}
                />
                <div
                  style={{ width: `${(learningCount / totalTarget) * 100}%` }}
                  className="bg-blue-500 h-full transition-all duration-500"
                  title={`In Progress: ${learningCount}`}
                />
                <div
                  style={{ width: `${(availableCount / totalTarget) * 100}%` }}
                  className="bg-stone-300 dark:bg-stone-600 h-full transition-all duration-500"
                  title={`Available: ${availableCount}`}
                />
              </div>

              {/* Status Breakdown Legend */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-green-500 shrink-0" />
                  <div>
                    <p className="font-semibold text-stone-800 dark:text-stone-200">{learnedCount} Learned</p>
                    <p className="text-[10px] text-stone-400">Passed assessment</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-amber-500 shrink-0" />
                  <div>
                    <p className="font-semibold text-stone-800 dark:text-stone-200">{needsRevisionCount} Needs Revision</p>
                    <p className="text-[10px] text-stone-400">Mistakes logged</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-stone-300 dark:bg-stone-600 shrink-0" />
                  <div>
                    <p className="font-semibold text-stone-800 dark:text-stone-200">{availableCount} Available</p>
                    <p className="text-[10px] text-stone-400">Ready to study</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 shrink-0" />
                  <div>
                    <p className="font-semibold text-stone-800 dark:text-stone-200">{lockedCount} Locked</p>
                    <p className="text-[10px] text-stone-400">Next levels</p>
                  </div>
                </div>
              </div>

              {/* Level Roadmap Grid Preview */}
              <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
                <p className="text-xs font-bold text-stone-700 dark:text-stone-300 mb-2">
                  Level Roadmap Preview:
                </p>
                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-1.5">
                  {LEVEL_METADATA.map(lvl => {
                    const lvlKanji = progressList.filter(p => lvl.kanjiIds.includes(p.kanji_id));
                    const passedCount = lvlKanji.filter(p => p.learning_status === 'learned' || p.learning_status === 'needs_revision').length;
                    const isFullyLearned = passedCount === 10;
                    const isUnlocked = lvlKanji.some(p => p.learning_status !== 'locked');

                    let badgeStyle = 'bg-stone-100 dark:bg-stone-800 text-stone-400';
                    if (isFullyLearned) {
                      badgeStyle = 'bg-green-600 text-white font-bold';
                    } else if (isUnlocked) {
                      badgeStyle = 'bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900 font-bold';
                    }

                    return (
                      <button
                        key={lvl.level}
                        type="button"
                        onClick={() => onNavigate('learn')}
                        className={`py-2 px-1 rounded-xl text-center text-xs transition-all cursor-pointer ${badgeStyle}`}
                        title={`${lvl.title}: ${passedCount}/10 passed`}
                      >
                        <span>L{lvl.level}</span>
                        <span className="block text-[9px] mt-0.5">{passedCount}/10</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Onyomi, Kunyomi & Vocab Accuracy Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-5">
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  Mastery Dimensions
                </h3>
                <p className="text-xs text-stone-500">
                  Accuracy across reading & vocabulary types
                </p>
              </div>

              <div className="space-y-4">
                {/* Onyomi */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-700 dark:text-stone-300">
                      Onyomi (音読み) Katakana
                    </span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">{avgOnyomi}%</span>
                  </div>
                  <div className="w-full h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${avgOnyomi}%` }}
                    />
                  </div>
                </div>

                {/* Kunyomi */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-700 dark:text-stone-300">
                      Kunyomi (訓読み) Hiragana
                    </span>
                    <span className="font-bold text-red-600 dark:text-red-400">{avgKunyomi}%</span>
                  </div>
                  <div className="w-full h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500 transition-all duration-300"
                      style={{ width: `${avgKunyomi}%` }}
                    />
                  </div>
                </div>

                {/* Vocabulary */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-700 dark:text-stone-300">
                      Compound Vocabulary
                    </span>
                    <span className="font-bold text-green-600 dark:text-green-400">{avgVocab}%</span>
                  </div>
                  <div className="w-full h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all duration-300"
                      style={{ width: `${avgVocab}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* AI Tutor Callout Pill */}
              <div
                onClick={() => onNavigate('tutor')}
                className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-800 hover:border-red-500 transition-all cursor-pointer flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400">
                    <BrainCircuit size={16} />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-stone-900 dark:text-stone-100">
                      Sensei AI Tutor Ready
                    </p>
                    <p className="text-[11px] text-stone-500">
                      Ask questions about Onyomi vs Kunyomi
                    </p>
                  </div>
                </div>
                <ArrowRight size={14} className="text-stone-400" />
              </div>
            </div>
          </div>

          {/* Featured N5 Mock Examination & Counters Learning Modules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* N5 Mock Exam Card */}
            <div
              onClick={() => onNavigate('mock_exam')}
              className="relative overflow-hidden p-6 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-emerald-500/0 border-2 border-emerald-500/30 hover:border-emerald-500 transition-all cursor-pointer group shadow-xs hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                      <FileCheck size={20} />
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                      Official 90-Min Format
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-stone-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    JLPT N5 Mock Question Paper
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    Full 3-section simulation: Vocabulary (20m), Grammar & Reading (40m), and Listening (30m) with AI question generator and official scaled scores (0–180).
                  </p>
                </div>
                <span className="w-9 h-9 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-600 dark:text-stone-300 group-hover:bg-emerald-600 group-hover:text-white transition-all shrink-0">
                  <ArrowRight size={16} />
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-emerald-500/20 flex items-center justify-between text-xs text-emerald-700 dark:text-emerald-300 font-semibold">
                <span>Pass Threshold: 80/180</span>
                <span className="flex items-center gap-1">
                  Start Exam <ArrowRight size={12} />
                </span>
              </div>
            </div>

            {/* Japanese Counters & Numbers Card */}
            <div
              onClick={() => onNavigate('counters')}
              className="relative overflow-hidden p-6 rounded-3xl bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-teal-500/0 border-2 border-teal-500/30 hover:border-teal-500 transition-all cursor-pointer group shadow-xs hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-teal-500/20 text-teal-600 dark:text-teal-400">
                      <Calculator size={20} />
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-700 dark:text-teal-300">
                      14 Counters + Time & Dates
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-stone-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    Counters, Numbers & Time
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    Master irregular pronunciations (本, 匹, 人, 階), hours, minutes, dates 1–31, and take interactive AI timed tests with automatic evaluation.
                  </p>
                </div>
                <span className="w-9 h-9 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-600 dark:text-stone-300 group-hover:bg-teal-600 group-hover:text-white transition-all shrink-0">
                  <ArrowRight size={16} />
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-teal-500/20 flex items-center justify-between text-xs text-teal-700 dark:text-teal-300 font-semibold">
                <span>9 Test Categories Available</span>
                <span className="flex items-center gap-1">
                  Start Learning <ArrowRight size={12} />
                </span>
              </div>
            </div>
          </div>

          {/* Quick Launchpad Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              type="button"
              onClick={() => onNavigate('quiz')}
              className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-red-500 hover:shadow-md transition-all text-left cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-stone-500 uppercase">Test Pool ({totalMasteredPool})</span>
                <Award size={16} className="text-red-500 group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-sm font-bold text-stone-900 dark:text-stone-100">Take Adaptive Quiz</p>
              <p className="text-[11px] text-stone-500 mt-0.5">Strictly tests your learned kanji</p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('flashcards')}
              className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-red-500 hover:shadow-md transition-all text-left cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-stone-500 uppercase">SRS Revision</span>
                <Clock size={16} className="text-amber-500 group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-sm font-bold text-stone-900 dark:text-stone-100">Flashcards Module</p>
              <p className="text-[11px] text-stone-500 mt-0.5">Again / Hard / Good / Easy</p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('weak')}
              className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-red-500 hover:shadow-md transition-all text-left cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-stone-500 uppercase">Mistake Notebook</span>
                <AlertTriangle size={16} className="text-amber-500 group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-sm font-bold text-stone-900 dark:text-stone-100">My Weak Kanji ({needsRevisionCount})</p>
              <p className="text-[11px] text-stone-500 mt-0.5">Targeted error drill</p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('plan')}
              className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-red-500 hover:shadow-md transition-all text-left cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-stone-500 uppercase">Study Schedule</span>
                <BookOpen size={16} className="text-blue-500 group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-sm font-bold text-stone-900 dark:text-stone-100">30-Day Plan</p>
              <p className="text-[11px] text-stone-500 mt-0.5">Adaptive daily agenda</p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('batch_vocab')}
              className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-indigo-500 hover:shadow-md transition-all text-left cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-stone-500 uppercase">Batch Vocab</span>
                <Layers size={16} className="text-indigo-500 group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-sm font-bold text-stone-900 dark:text-stone-100">Marked Vocabulary</p>
              <p className="text-[11px] text-stone-500 mt-0.5">All marked words together</p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('relearn')}
              className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-rose-500 hover:shadow-md transition-all text-left cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-stone-500 uppercase">Retention Hub</span>
                <RotateCcw size={16} className="text-rose-500 group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-sm font-bold text-stone-900 dark:text-stone-100">Vocab Re-learning</p>
              <p className="text-[11px] text-stone-500 mt-0.5">Not Learned & Not Sure</p>
            </button>
          </div>
        </div>
        );
};
