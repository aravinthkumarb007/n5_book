'use client';

import React, { useState, useMemo } from 'react';
import {
  Calculator,
  Hash,
  Clock,
  Calendar,
  Sparkles,
  Play,
  Volume2,
  Search,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  ChevronRight,
  Layers,
  Award,
  Zap,
  Info
} from 'lucide-react';
import {
  CounterCategory,
  CountersTestCategory
} from '@/types/counters';
import {
  JAPANESE_NUMBERS,
  JAPANESE_COUNTERS,
  JAPANESE_HOURS,
  JAPANESE_MINUTES,
  JAPANESE_TIME_PHRASES,
  JAPANESE_MONTHS,
  JAPANESE_DATES,
  JAPANESE_DAYS_OF_WEEK,
  JAPANESE_DURATION_ITEMS
} from '@/data/countersData';
import { FuriganaText } from '@/components/FuriganaText';
import { AudioButton } from '@/components/AudioButton';
import { CountersTestRunnerModal } from './CountersTestRunnerModal';

interface CountersDashboardViewProps {
  onNavigateHome?: () => void;
}

export function CountersDashboardView({ onNavigateHome }: CountersDashboardViewProps) {
  const [activeCategory, setActiveCategory] = useState<CounterCategory>('counters');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCounterId, setSelectedCounterId] = useState<string>('hon');

  // Test Runner State
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [testCategory, setTestCategory] = useState<CountersTestCategory>('mixed');

  const selectedCounter = useMemo(() => {
    return JAPANESE_COUNTERS.find(c => c.id === selectedCounterId) || JAPANESE_COUNTERS[0];
  }, [selectedCounterId]);

  // Filtered numbers
  const filteredNumbers = useMemo(() => {
    if (!searchQuery.trim()) return JAPANESE_NUMBERS;
    const q = searchQuery.toLowerCase().trim();
    return JAPANESE_NUMBERS.filter(n =>
      n.kanji.includes(q) ||
      n.hiragana.includes(q) ||
      n.romaji.toLowerCase().includes(q) ||
      n.english.toLowerCase().includes(q) ||
      String(n.value).includes(q)
    );
  }, [searchQuery]);

  // Filtered dates
  const filteredDates = useMemo(() => {
    if (!searchQuery.trim()) return JAPANESE_DATES;
    const q = searchQuery.toLowerCase().trim();
    return JAPANESE_DATES.filter(d =>
      d.kanji.includes(q) ||
      d.hiragana.includes(q) ||
      d.romaji.toLowerCase().includes(q) ||
      d.english.toLowerCase().includes(q) ||
      String(d.dayNumber).includes(q)
    );
  }, [searchQuery]);

  const handleLaunchTest = (category: CountersTestCategory = 'mixed') => {
    setTestCategory(category);
    setIsTestRunning(true);
  };

  return (
      <div className="space-y-6 max-w-6xl mx-auto pb-16 animate-fadeIn w-full max-w-full min-w-0 overflow-x-hidden">
        {/* Top Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-900 p-6 sm:p-8 text-white shadow-xl w-full max-w-full min-w-0">
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-200">
                  <Calculator className="w-4 h-4" />
                  <span>Comprehensive Japanese Counters, Numbers, Time & Dates</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                  Japanese Counters & Numbers Master
                </h1>
                <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                  Master the 14 essential N5 counters, euphonic sound changes (促音 change & 連濁 voicing), clock times, calendar dates, months, and duration expressions with native audio and AI-generated practice tests.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
                <button
                  onClick={() => handleLaunchTest('counters')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-stone-900 font-extrabold text-xs sm:text-sm shadow-xl hover:bg-stone-100 active:scale-95 transition-all cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-emerald-600" />
                  <span>Take Counters Test</span>
                </button>
                <button
                  onClick={() => handleLaunchTest('full')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-stone-900 hover:bg-black text-white font-extrabold text-xs sm:text-sm shadow-xl active:scale-95 transition cursor-pointer"
                >
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Full Mock Test (20m)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-2 shadow-xs flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {[
              { id: 'counters', label: '14 Core Counters (助数詞)', icon: Hash },
              { id: 'numbers', label: 'Numbers & Units (数字)', icon: Calculator },
              { id: 'time', label: 'Hours & Minutes (時間・分)', icon: Clock },
              { id: 'months', label: '12 Months (月)', icon: Calendar },
              { id: 'dates', label: 'Dates & Days (日・曜日)', icon: BookOpen },
              { id: 'duration', label: 'Duration & Frequency (期間)', icon: Layers }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveCategory(tab.id as any);
                    setSearchQuery('');
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition cursor-pointer ${isActive
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* CATEGORY 1: 14 Core Counters */}
          {activeCategory === 'counters' && (
            <div className="space-y-6">
              {/* Sound Change Rules Notice Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-950 dark:text-emerald-200 space-y-2">
                <h3 className="font-extrabold flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Mastering Japanese Sound Changes (音便 Onbin & 連濁 Rendaku)
                </h3>
                <p className="leading-relaxed text-[11px] opacity-90">
                  In Japanese, when counting with certain consonants (especially <strong>H-sounds</strong> like 本 ほん, 杯 はい, 匹 ひき and <strong>K-sounds</strong> like 個 こ, 回 かい, 階 かい), regular numbers undergo euphonic changes:
                  <br />
                  • <strong>1, 6, 8, 10</strong> often merge into double consonants (っ): いっぽん, ろっぽん, はっぽん, じゅっぽん.
                  <br />
                  • <strong>3</strong> frequently triggers sound voicing (濁音): さんぼん, さんびき, さんがい.
                  <br />
                  • People (人) has unique native words: 1人 is <strong>ひとり</strong>, 2人 is <strong>ふたり</strong>, and 4人 is <strong>よにん</strong>.
                </p>
              </div>

              {/* Counter Selector Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {JAPANESE_COUNTERS.map(c => {
                  const isSelected = c.id === selectedCounterId;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCounterId(c.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${isSelected
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-emerald-400'
                        }`}
                    >
                      <span className="font-japanese font-black text-sm">{c.kanji}</span>
                      <span>{c.english}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Counter Detailed Card */}
              {selectedCounter && (
                <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6">
                  {/* Counter Header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-100 dark:border-stone-800">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-japanese font-black text-2xl shadow-xs">
                        {selectedCounter.kanji.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-xl font-black text-stone-900 dark:text-white font-japanese">
                            {selectedCounter.kanji} ({selectedCounter.hiragana})
                          </h2>
                          <span className="text-xs font-mono text-stone-400">/{selectedCounter.romaji}/</span>
                        </div>
                        <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                          {selectedCounter.english} • {selectedCounter.targetDescription}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleLaunchTest('counters')}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Test this Counter</span>
                    </button>
                  </div>

                  {/* Sound Rule Explanation */}
                  <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-xs space-y-1">
                    <span className="font-bold text-stone-700 dark:text-stone-300 block">Pronunciation Rules:</span>
                    <p className="text-stone-600 dark:text-stone-400 leading-relaxed">{selectedCounter.soundRuleNotes}</p>
                  </div>

                  {/* Counting Table 1 to 10 */}
                  <div className="space-y-3">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-stone-400">
                      Counting Sequence (1 to 10):
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {selectedCounter.items.map(item => (
                        <div
                          key={item.count}
                          className={`p-3.5 rounded-2xl border flex flex-col justify-between transition-all ${item.isIrregular
                              ? 'border-amber-300 dark:border-amber-800 bg-amber-50/40 dark:bg-amber-950/20'
                              : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40'
                            }`}
                        >
                          <div>
                            <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 mb-1">
                              <span>#{item.count}</span>
                              <AudioButton text={item.kanji} size="sm" />
                            </div>
                            <span className="font-japanese font-black text-xl text-stone-900 dark:text-white block">
                              {item.kanji}
                            </span>
                            <span className="font-japanese font-bold text-xs text-red-600 dark:text-red-400 block mt-0.5">
                              {item.hiragana}
                            </span>
                            <span className="text-[10px] text-stone-400 font-mono block">
                              {item.romaji}
                            </span>
                          </div>

                          {item.soundChangeNote && (
                            <span className="mt-2 text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 truncate">
                              {item.soundChangeNote}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Example Sentences */}
                  {selectedCounter.exampleSentences.length > 0 && (
                    <div className="space-y-3 pt-2 border-t border-stone-100 dark:border-stone-800">
                      <h3 className="font-bold text-xs uppercase tracking-wider text-stone-400">
                        Example Japanese Sentences:
                      </h3>
                      <div className="space-y-2">
                        {selectedCounter.exampleSentences.map((ex, idx) => (
                          <div key={idx} className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 flex items-start justify-between gap-3 text-xs">
                            <div className="space-y-0.5">
                              <div className="font-japanese font-bold text-sm text-stone-900 dark:text-white">
                                <FuriganaText text={ex.japanese} />
                              </div>
                              <p className="text-stone-500 dark:text-stone-400 text-xs">
                                {ex.english}
                              </p>
                            </div>
                            <AudioButton text={ex.hiragana} size="sm" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* CATEGORY 2: Numbers & Units */}
          {activeCategory === 'numbers' && (
            <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-100 dark:border-stone-800">
                <div>
                  <h2 className="text-lg font-bold text-stone-900 dark:text-white">
                    Japanese Numbers, Hundreds (百), Thousands (千) & Myriads (万)
                  </h2>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    Japanese groups large numbers in units of 10,000 (万 まん), unlike English 1,000s.
                  </p>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search number, kanji, reading..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {filteredNumbers.map((n, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${n.isIrregular
                        ? 'border-amber-300 dark:border-amber-800 bg-amber-50/40 dark:bg-amber-950/20'
                        : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40'
                      }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 mb-1">
                        <span>{n.value.toLocaleString()}</span>
                        <AudioButton text={n.hiragana} size="sm" />
                      </div>
                      <span className="font-japanese font-black text-2xl text-stone-900 dark:text-white block">
                        {n.kanji}
                      </span>
                      <span className="font-japanese font-bold text-xs text-emerald-600 dark:text-emerald-400 block mt-0.5">
                        {n.hiragana}
                      </span>
                      <span className="text-[10px] text-stone-400 font-mono block">
                        {n.romaji} • {n.english}
                      </span>
                    </div>

                    {n.notes && (
                      <p className="mt-2 text-[10px] text-amber-800 dark:text-amber-300 bg-amber-100/60 dark:bg-amber-900/40 p-1.5 rounded-lg leading-tight">
                        {n.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CATEGORY 3: Hours & Minutes */}
          {activeCategory === 'time' && (
            <div className="space-y-6">
              {/* Hours Card */}
              <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm space-y-4">
                <h3 className="font-black text-base text-stone-900 dark:text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  Hours of the Day (〜時 ji)
                </h3>
                <p className="text-xs text-stone-500">
                  Note the crucial irregular hours: <strong>4 o'clock (よじ)</strong>, <strong>7 o'clock (しちじ)</strong>, and <strong>9 o'clock (くじ)</strong>.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                  {JAPANESE_HOURS.map((h, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-2xl border text-center ${h.isIrregular
                          ? 'border-amber-300 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20'
                          : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40'
                        }`}
                    >
                      <span className="font-japanese font-black text-lg text-stone-900 dark:text-white block">
                        {h.kanji}
                      </span>
                      <span className="font-japanese font-bold text-xs text-emerald-600 dark:text-emerald-400 block">
                        {h.hiragana}
                      </span>
                      <span className="text-[10px] text-stone-400 block font-mono">
                        {h.english}
                      </span>
                      <div className="mt-1 flex justify-center">
                        <AudioButton text={h.hiragana} size="sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Minutes Card */}
              <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm space-y-4">
                <h3 className="font-black text-base text-stone-900 dark:text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  Minutes (〜分 fun / pun)
                </h3>
                <p className="text-xs text-stone-500">
                  Minutes alternate between <strong>ふん (fun)</strong> and <strong>ぷん (pun)</strong>. 1, 3, 4, 6, 8, 10 take <strong>ぷん</strong>. 30 minutes past the hour is also commonly called <strong>半 (はん)</strong>.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                  {JAPANESE_MINUTES.map((m, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-2xl border text-center ${m.isIrregular
                          ? 'border-indigo-300 dark:border-indigo-800 bg-indigo-50/40 dark:bg-indigo-950/20'
                          : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40'
                        }`}
                    >
                      <span className="font-japanese font-black text-lg text-stone-900 dark:text-white block">
                        {m.kanji}
                      </span>
                      <span className="font-japanese font-bold text-xs text-indigo-600 dark:text-indigo-400 block">
                        {m.hiragana}
                      </span>
                      <span className="text-[10px] text-stone-400 block font-mono">
                        {m.english}
                      </span>
                      <div className="mt-1 flex justify-center">
                        <AudioButton text={m.hiragana} size="sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CATEGORY 4: 12 Months */}
          {activeCategory === 'months' && (
            <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
                <div>
                  <h2 className="text-lg font-bold text-stone-900 dark:text-white">
                    All 12 Japanese Months (一月〜十二月)
                  </h2>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    Note the 3 strict irregular months: <strong>4月 (しがつ)</strong>, <strong>7月 (しちがつ)</strong>, and <strong>9月 (くがつ)</strong>.
                  </p>
                </div>
                <button
                  onClick={() => handleLaunchTest('months')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                >
                  Test Months
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {JAPANESE_MONTHS.map(m => (
                  <div
                    key={m.month}
                    className={`p-4 rounded-2xl border text-center space-y-1.5 ${m.isIrregular
                        ? 'border-amber-300 dark:border-amber-800 bg-amber-50/40 dark:bg-amber-950/20'
                        : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40'
                      }`}
                  >
                    <div className="flex justify-between items-center text-[10px] font-mono text-stone-400">
                      <span>Month {m.month}</span>
                      <AudioButton text={m.hiragana} size="sm" />
                    </div>
                    <span className="font-japanese font-black text-2xl text-stone-900 dark:text-white block">
                      {m.kanji}
                    </span>
                    <span className="font-japanese font-bold text-sm text-red-600 dark:text-red-400 block">
                      {m.hiragana}
                    </span>
                    <span className="text-xs text-stone-600 dark:text-stone-400 block">
                      {m.english}
                    </span>
                    {m.notes && (
                      <span className="text-[10px] text-amber-700 dark:text-amber-300 font-bold block pt-1">
                        {m.notes}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CATEGORY 5: Dates & Days of the Week */}
          {activeCategory === 'dates' && (
            <div className="space-y-6">
              {/* Days of the Week */}
              <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm space-y-4">
                <h3 className="font-black text-base text-stone-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  Days of the Week (曜日 Youbi)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
                  {JAPANESE_DAYS_OF_WEEK.map(d => (
                    <div key={d.dayNumber} className="p-3 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40 text-center space-y-1">
                      <span className="font-japanese font-black text-base text-stone-900 dark:text-white block">
                        {d.kanji}
                      </span>
                      <span className="font-japanese font-semibold text-xs text-emerald-600 dark:text-emerald-400 block">
                        {d.hiragana}
                      </span>
                      <span className="text-[10px] text-stone-400 block truncate">
                        {d.english.split(' ')[0]}
                      </span>
                      <div className="flex justify-center pt-1">
                        <AudioButton text={d.hiragana} size="sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 1st to 31st Days of the Month */}
              <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-stone-100 dark:border-stone-800">
                  <div>
                    <h3 className="font-black text-base text-stone-900 dark:text-white">
                      Days of the Month (1日〜31日)
                    </h3>
                    <p className="text-xs text-stone-500">
                      Days 1–10, 14, 20, and 24 have unique native Japanese readings.
                    </p>
                  </div>

                  <div className="relative w-full sm:w-60">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Filter day (e.g. ついたち, 14)..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-1 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                  {filteredDates.map(d => (
                    <div
                      key={d.dayNumber}
                      className={`p-3 rounded-2xl border text-center space-y-0.5 ${d.isIrregular
                          ? 'border-amber-300 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20'
                          : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40'
                        }`}
                    >
                      <div className="flex justify-between items-center text-[10px] font-mono text-stone-400">
                        <span>Day {d.dayNumber}</span>
                        <AudioButton text={d.hiragana} size="sm" />
                      </div>
                      <span className="font-japanese font-black text-lg text-stone-900 dark:text-white block">
                        {d.kanji}
                      </span>
                      <span className="font-japanese font-bold text-xs text-red-600 dark:text-red-400 block truncate">
                        {d.hiragana}
                      </span>
                      <span className="text-[10px] text-stone-400 block font-mono">
                        {d.romaji}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CATEGORY 6: Duration & Frequency */}
          {activeCategory === 'duration' && (
            <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="pb-4 border-b border-stone-100 dark:border-stone-800">
                <h2 className="text-lg font-bold text-stone-900 dark:text-white">
                  Counting Duration vs Clock Points
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  Learn the distinction between a point on the clock (一時 = 1 o'clock) vs a span of elapsed time (一時間 = 1 hour long).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {JAPANESE_DURATION_ITEMS.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-japanese font-black text-xl text-stone-900 dark:text-white block">
                          {item.kanji}
                        </span>
                        <span className="font-japanese font-bold text-xs text-emerald-600 dark:text-emerald-400 block">
                          {item.hiragana}
                        </span>
                      </div>
                      <AudioButton text={item.hiragana} size="sm" />
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-300 font-medium">
                      {item.english}
                    </p>
                    {item.notes && (
                      <p className="text-[10px] text-stone-400 bg-white dark:bg-stone-900 p-2 rounded-xl border border-stone-100 dark:border-stone-800">
                        {item.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Active Counters Test Modal */}
          {isTestRunning && (
            <CountersTestRunnerModal
              category={testCategory}
              onClose={() => setIsTestRunning(false)}
            />
          )}
        </div>
        );
}

