'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calendar, CheckCircle2, Circle, ArrowRight, Sparkles, 
  Flame, Clock, BookOpen, Trophy, Compass
} from 'lucide-react';
import { KanjiRecord, UserKanjiProgress } from '@/types/kanji';
import { storage } from '@/services/storage';

interface DailyPlanViewProps {
  kanjiList: KanjiRecord[];
  progressMap: Record<number, UserKanjiProgress>;
  onNavigateToLearn: () => void;
  onOpenQuickStudy: () => void;
}

interface DayPlan {
  day: number;
  title: string;
  focus: string;
  kanjiCount: number;
  kanjiRange: string;
  type: 'learn' | 'review' | 'exam';
  recommendedMinutes: number;
}

const THIRTY_DAY_SYLLABUS: DayPlan[] = [
  { day: 1, title: 'Numbers 1 to 5', focus: '一 二 三 四 五', kanjiCount: 5, kanjiRange: 'Kanji 1–5', type: 'learn', recommendedMinutes: 10 },
  { day: 2, title: 'Numbers 6 to 10', focus: '六 七 八 九 十', kanjiCount: 5, kanjiRange: 'Kanji 6–10', type: 'learn', recommendedMinutes: 10 },
  { day: 3, title: 'Level 1 Mastery & Assessment', focus: 'Pass 80% gate on all 10 Level 1 kanji', kanjiCount: 10, kanjiRange: 'Kanji 1–10', type: 'review', recommendedMinutes: 15 },
  { day: 4, title: 'Calendar & Elements Part 1', focus: '日 月 火 水 木', kanjiCount: 5, kanjiRange: 'Kanji 11–15', type: 'learn', recommendedMinutes: 10 },
  { day: 5, title: 'Calendar & Elements Part 2', focus: '金 土 山 川 田', kanjiCount: 5, kanjiRange: 'Kanji 16–20', type: 'learn', recommendedMinutes: 10 },
  { day: 6, title: 'Level 2 Mastery & Unlock Level 3', focus: 'Days of week compound words (日曜日, 火山)', kanjiCount: 10, kanjiRange: 'Kanji 11–20', type: 'review', recommendedMinutes: 15 },
  { day: 7, title: 'SRS Spaced Repetition Milestone', focus: 'Comprehensive Review of Kanji 1–20', kanjiCount: 20, kanjiRange: 'Kanji 1–20', type: 'review', recommendedMinutes: 15 },
  { day: 8, title: 'Human Identity & Person', focus: '人 子 女 男 目', kanjiCount: 5, kanjiRange: 'Kanji 21–25', type: 'learn', recommendedMinutes: 10 },
  { day: 9, title: 'Body Parts & Strength', focus: '口 耳 手 足 力', kanjiCount: 5, kanjiRange: 'Kanji 26–30', type: 'learn', recommendedMinutes: 10 },
  { day: 10, title: 'Level 3 Mastery & Review', focus: 'People and anatomy compounds (大人, 手紙)', kanjiCount: 10, kanjiRange: 'Kanji 21–30', type: 'review', recommendedMinutes: 15 },
  { day: 11, title: 'Directions & Dimensions', focus: '上 下 中 大 小', kanjiCount: 5, kanjiRange: 'Kanji 31–35', type: 'learn', recommendedMinutes: 10 },
  { day: 12, title: 'Origin & Division', focus: '本 半 分 先 生', kanjiCount: 5, kanjiRange: 'Kanji 36–40', type: 'learn', recommendedMinutes: 10 },
  { day: 13, title: 'Level 4 Mastery Assessment', focus: 'Teacher, student and position vocabulary (先生, 日本)', kanjiCount: 10, kanjiRange: 'Kanji 31–40', type: 'review', recommendedMinutes: 15 },
  { day: 14, title: 'Mid-term SRS Checkpoint', focus: 'First 40 Kanji Memory Retention Sprint', kanjiCount: 40, kanjiRange: 'Kanji 1–40', type: 'review', recommendedMinutes: 15 },
  { day: 15, title: 'Time & Intervals Part 1', focus: '年 今 毎 何 時', kanjiCount: 5, kanjiRange: 'Kanji 41–45', type: 'learn', recommendedMinutes: 10 },
  { day: 16, title: 'Time & Intervals Part 2', focus: '間 午 前 後 朝', kanjiCount: 5, kanjiRange: 'Kanji 46–50', type: 'learn', recommendedMinutes: 10 },
  { day: 17, title: 'Level 5 Mastery & Unlock Level 6', focus: 'AM/PM, morning and time compounds (午前, 一時間)', kanjiCount: 10, kanjiRange: 'Kanji 41–50', type: 'review', recommendedMinutes: 15 },
  { day: 18, title: 'Day/Night & Compass Points', focus: '昼 夜 東 西 南', kanjiCount: 5, kanjiRange: 'Kanji 51–55', type: 'learn', recommendedMinutes: 10 },
  { day: 19, title: 'North, School & Name', focus: '北 学 校 名 白', kanjiCount: 5, kanjiRange: 'Kanji 56–60', type: 'learn', recommendedMinutes: 10 },
  { day: 20, title: 'Level 6 Mastery & Midpoint Review', focus: 'Halfway mark! 60/120 Kanji Mastered (学校, 有名)', kanjiCount: 10, kanjiRange: 'Kanji 51–60', type: 'review', recommendedMinutes: 15 },
  { day: 21, title: 'SRS Spaced Repetition Sprint', focus: 'Flashcards & Mistake Notebook Clearance', kanjiCount: 60, kanjiRange: 'Kanji 1–60', type: 'review', recommendedMinutes: 15 },
  { day: 22, title: 'Colors, Weather & Currency', focus: '黒 赤 青 雨 天 気 円 万 百 千', kanjiCount: 10, kanjiRange: 'Kanji 61–70', type: 'learn', recommendedMinutes: 15 },
  { day: 23, title: 'Level 7 Mastery & Verbs Introduction', focus: 'Japanese money numbers and weather (天気, 一万円)', kanjiCount: 10, kanjiRange: 'Kanji 61–70', type: 'review', recommendedMinutes: 15 },
  { day: 24, title: 'Movement & Sensory Verbs', focus: '行 来 出 入 見 聞 書 読 話 語', kanjiCount: 10, kanjiRange: 'Kanji 71–80', type: 'learn', recommendedMinutes: 15 },
  { day: 25, title: 'Level 8 Mastery & Daily Living', focus: 'Common N5 actions and readings (日本語, 行く, 食べる)', kanjiCount: 10, kanjiRange: 'Kanji 71–80', type: 'review', recommendedMinutes: 15 },
  { day: 26, title: 'Daily Living & Society', focus: '食 飲 休 買 売 立 会 社 店 国', kanjiCount: 10, kanjiRange: 'Kanji 81–90', type: 'learn', recommendedMinutes: 15 },
  { day: 27, title: 'Transit, Travel & Geography', focus: '道 車 駅 電 花 魚 肉 犬 鳥 友', kanjiCount: 10, kanjiRange: 'Kanji 91–100', type: 'learn', recommendedMinutes: 15 },
  { day: 28, title: 'Family, City & Surroundings', focus: '父 母 家 町 京 都 門 外 空 海', kanjiCount: 10, kanjiRange: 'Kanji 101–110', type: 'learn', recommendedMinutes: 15 },
  { day: 29, title: 'Core Adjectives & Final 10', focus: '高 安 新 古 長 多 少 早 歩 週', kanjiCount: 10, kanjiRange: 'Kanji 111–120', type: 'learn', recommendedMinutes: 15 },
  { day: 30, title: 'Grand 120 N5 Kanji Final Exam', focus: '120/120 N5 Kanji Mastery Certification Test', kanjiCount: 120, kanjiRange: 'All 120 Kanji', type: 'exam', recommendedMinutes: 20 }
];

export function DailyPlanView({
  kanjiList,
  progressMap,
  onNavigateToLearn,
  onOpenQuickStudy
}: DailyPlanViewProps) {
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  // Load completed days from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('n5_kanji_completed_days');
      if (stored) {
        setCompletedDays(JSON.parse(stored));
      }
    } catch {}
  }, []);

  const toggleDayCompletion = (dayNum: number) => {
    setCompletedDays(prev => {
      const updated = prev.includes(dayNum) 
        ? prev.filter(d => d !== dayNum) 
        : [...prev, dayNum];
      try {
        localStorage.setItem('n5_kanji_completed_days', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Determine current active day based on completed days count
  const currentDayNum = Math.min(30, (completedDays.length || 0) + 1);
  const currentDayPlan = THIRTY_DAY_SYLLABUS.find(d => d.day === currentDayNum) || THIRTY_DAY_SYLLABUS[0];

  const totalLearned = Object.values(progressMap).filter(p => p.learning_status === 'learned').length;
  const pctComplete = Math.round((completedDays.length / 30) * 100);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-red-950 text-white p-6 md:p-8 rounded-2xl shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Calendar className="w-3.5 h-3.5" />
              Office Worker Routine • 10–15 Min / Day
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              30-Day N5 Kanji Roadmap
            </h1>
            <p className="text-stone-300 text-sm mt-1 max-w-xl">
              Consistent daily habit tailored to busy office schedules. In 30 days, achieve complete mastery of all 120 JLPT N5 kanji.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 shrink-0">
            <div>
              <span className="text-[11px] text-stone-300 uppercase tracking-wider block font-medium">Roadmap Progress</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl font-black text-white">{completedDays.length}</span>
                <span className="text-stone-400 text-xs">/ 30 Days</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-full border-4 border-red-500 flex items-center justify-center font-bold text-xs text-white">
              {pctComplete}%
            </div>
          </div>
        </div>
      </div>

      {/* Today's Recommended Mission */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border-2 border-red-500/30 p-6 shadow-md relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/60 px-2.5 py-1 rounded-md">
              Today's Recommended Focus: Day {currentDayPlan.day}
            </span>
            <h2 className="text-xl font-bold text-stone-900 dark:text-white mt-2">
              {currentDayPlan.title}
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-xs md:text-sm mt-1">
              Focus: <span className="font-japanese font-semibold text-stone-800 dark:text-stone-100">{currentDayPlan.focus}</span> ({currentDayPlan.kanjiRange})
            </p>
            <div className="flex items-center gap-4 text-xs text-stone-400 mt-2">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                {currentDayPlan.recommendedMinutes} minutes
              </span>
              <span>•</span>
              <span className="capitalize">{currentDayPlan.type} session</span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onOpenQuickStudy}
              className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition shadow-md flex items-center justify-center gap-2"
            >
              <Clock className="w-4 h-4" />
              Launch Office Session
            </button>
            <button
              onClick={() => toggleDayCompletion(currentDayPlan.day)}
              className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-center ${
                completedDays.includes(currentDayPlan.day)
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-600'
                  : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100'
              }`}
              title="Mark Day as Done"
            >
              {completedDays.includes(currentDayPlan.day) ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <Circle className="w-5 h-5 text-stone-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 30-Day Grid */}
      <div className="space-y-3">
        <h3 className="font-bold text-sm text-stone-800 dark:text-stone-200">
          Curriculum Days (1 to 30)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {THIRTY_DAY_SYLLABUS.map((plan) => {
            const isDone = completedDays.includes(plan.day);
            const isCurrent = plan.day === currentDayNum;

            return (
              <div
                key={plan.day}
                className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                  isDone
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60'
                    : isCurrent
                    ? 'bg-white dark:bg-stone-850 border-red-500 shadow-md ring-2 ring-red-500/20'
                    : 'bg-white dark:bg-stone-850 border-stone-200 dark:border-stone-800 hover:border-stone-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                      isDone 
                        ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300'
                        : isCurrent
                        ? 'bg-red-600 text-white'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                    }`}>
                      Day {plan.day}
                    </span>

                    <button
                      onClick={() => toggleDayCompletion(plan.day)}
                      className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Circle className="w-4 h-4 text-stone-300 dark:text-stone-600" />
                      )}
                    </button>
                  </div>

                  <h4 className="font-bold text-xs text-stone-900 dark:text-white line-clamp-1">
                    {plan.title}
                  </h4>
                  <p className="text-[11px] font-japanese text-stone-600 dark:text-stone-400 mt-1 line-clamp-1">
                    {plan.focus}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[10px] text-stone-400">
                  <span>{plan.recommendedMinutes} min</span>
                  <span className="capitalize">{plan.type}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
