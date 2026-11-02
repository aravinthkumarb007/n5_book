'use client';

import React, { useState, useMemo } from 'react';
import { 
  BookOpen, Lock, CheckCircle2, AlertTriangle, Sparkles, 
  Search, Award, Clock, ArrowRight, Play, Eye, RotateCcw, ShieldCheck
} from 'lucide-react';
import { KanjiRecord, UserKanjiProgress } from '@/types/kanji';
import { LEVEL_METADATA, LevelInfo } from '@/data/kanjiDatabase';
import { AudioButton } from './AudioButton';

interface LearnKanjiViewProps {
  kanjiList: KanjiRecord[];
  progressMap: Record<number, UserKanjiProgress>;
  onSelectKanji: (kanji: KanjiRecord) => void;
  onStartAssessment: (kanji: KanjiRecord, isReTest?: boolean) => void;
  onOpenQuickStudy?: () => void;
}

export function LearnKanjiView({
  kanjiList,
  progressMap,
  onSelectKanji,
  onStartAssessment,
  onOpenQuickStudy
}: LearnKanjiViewProps) {
  const [selectedLevel, setSelectedLevel] = useState<number | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unlocked' | 'learned' | 'learning' | 'weak'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Check which levels are unlocked
  // Level 1 is always unlocked. Level N is unlocked if all 10 kanji of Level N-1 are learned.
  const levelUnlockStatus = useMemo(() => {
    const status: Record<number, boolean> = { 1: true };
    for (let lvl = 2; lvl <= 12; lvl++) {
      const prevLevelMeta = LEVEL_METADATA.find(l => l.level === lvl - 1);
      if (!prevLevelMeta) {
        status[lvl] = false;
        continue;
      }
      const prevAllLearned = prevLevelMeta.kanjiIds.every(id => {
        const p = progressMap[id];
        return p && p.learning_status === 'learned';
      });
      status[lvl] = prevAllLearned;
    }
    return status;
  }, [progressMap]);

  // Level statistics
  const levelStats = useMemo(() => {
    const stats: Record<number, { total: number; learned: number; learning: number; weak: number; pct: number }> = {};
    LEVEL_METADATA.forEach(l => {
      let learned = 0;
      let learning = 0;
      let weak = 0;
      l.kanjiIds.forEach(id => {
        const p = progressMap[id];
        if (p) {
          if (p.learning_status === 'learned') learned++;
          else if (p.learning_status === 'learning') learning++;
          else if (p.learning_status === 'needs_revision') weak++;
        }
      });
      stats[l.level] = {
        total: l.kanjiIds.length,
        learned,
        learning,
        weak,
        pct: Math.round((learned / l.kanjiIds.length) * 100)
      };
    });
    return stats;
  }, [progressMap]);

  const totalLearnedAllLevels = useMemo(() => {
    return Object.values(progressMap).filter(p => p.learning_status === 'learned' || p.learning_status === 'needs_revision').length;
  }, [progressMap]);

  // Filter kanji based on level, search, and status
  const filteredLevels = useMemo(() => {
    let levels = LEVEL_METADATA;
    if (selectedLevel !== 'all') {
      levels = levels.filter(l => l.level === selectedLevel);
    }
    return levels;
  }, [selectedLevel]);

  const getFilteredKanjiForLevel = (lvl: LevelInfo) => {
    const kanjis = kanjiList.filter(k => k.level === lvl.level);
    return kanjis.filter(k => {
      const prog = progressMap[k.id];
      const status = prog ? prog.learning_status : (levelUnlockStatus[lvl.level] ? 'available' : 'locked');

      // Status filter
      if (statusFilter === 'learned' && status !== 'learned') return false;
      if (statusFilter === 'learning' && status !== 'learning') return false;
      if (statusFilter === 'weak' && status !== 'needs_revision') return false;
      if (statusFilter === 'unlocked' && !levelUnlockStatus[lvl.level]) return false;

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesChar = k.character.includes(q);
        const matchesMeaning = k.meaning.toLowerCase().includes(q);
        const matchesHiragana = k.hiragana_reading.includes(q);
        const matchesOnyomi = k.onyomi_readings.some(o => o.includes(q) || o.toLowerCase().includes(q));
        const matchesKunyomi = k.kunyomi_readings.some(u => u.includes(q) || u.toLowerCase().includes(q));
        if (!matchesChar && !matchesMeaning && !matchesHiragana && !matchesOnyomi && !matchesKunyomi) {
          return false;
        }
      }

      return true;
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Office Study Trigger */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 via-rose-700 to-stone-900 p-6 md:p-8 text-white shadow-xl">
        <div className="absolute right-0 top-0 -mt-6 -mr-6 h-48 w-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-medium tracking-wide uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Progressive Curriculum • 120 N5 Kanji
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              12-Level Kanji Mastery Path
            </h1>
            <p className="mt-2 text-stone-200 text-sm md:text-base max-w-2xl leading-relaxed">
              Step-by-step progressive unlock. Master Level N by passing the 80% learning assessment for all 10 kanji to unlock the next level! Test engine dynamically tests strictly learned kanji.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {totalLearnedAllLevels > 0 && (
              <button
                onClick={() => {
                  const firstLearned = kanjiList.find(k => progressMap[k.id]?.learning_status === 'learned' || progressMap[k.id]?.learning_status === 'needs_revision');
                  if (firstLearned) onStartAssessment(firstLearned, true);
                }}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition shadow-lg shrink-0 text-sm cursor-pointer"
                title="Dynamic Re-Test of your entire learned kanji pool"
              >
                <RotateCcw className="w-4 h-4" />
                Mastery Re-Test ({totalLearnedAllLevels} Pool)
              </button>
            )}

            {onOpenQuickStudy && (
              <button
                onClick={onOpenQuickStudy}
                className="inline-flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white text-stone-900 font-bold hover:bg-stone-100 transition shadow-lg shrink-0 text-sm cursor-pointer"
              >
                <Clock className="w-4 h-4 text-red-600" />
                10-Min Office Blitz
                <ArrowRight className="w-4 h-4 text-stone-500" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-4 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search kanji, meaning, Onyomi, Kunyomi (e.g. 日, sun, ニチ, ひ)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/60 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Status Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                statusFilter === 'all'
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              All Status
            </button>
            <button
              onClick={() => setStatusFilter('unlocked')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                statusFilter === 'unlocked'
                  ? 'bg-blue-600 text-white'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              Unlocked Only
            </button>
            <button
              onClick={() => setStatusFilter('learned')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                statusFilter === 'learned'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              Mastered (80%+)
            </button>
            <button
              onClick={() => setStatusFilter('learning')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                statusFilter === 'learning'
                  ? 'bg-purple-600 text-white'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setStatusFilter('weak')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                statusFilter === 'weak'
                  ? 'bg-rose-600 text-white'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              Needs Revision
            </button>
          </div>
        </div>

        {/* Level Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-2 border-t border-stone-100 dark:border-stone-800">
          <button
            onClick={() => setSelectedLevel('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
              selectedLevel === 'all'
                ? 'bg-red-600 text-white shadow-sm'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            All 12 Levels
          </button>
          {LEVEL_METADATA.map((lvl) => {
            const isUnlocked = levelUnlockStatus[lvl.level];
            const stat = levelStats[lvl.level];
            const isSelected = selectedLevel === lvl.level;

            return (
              <button
                key={lvl.level}
                onClick={() => setSelectedLevel(lvl.level)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-sm'
                    : isUnlocked
                    ? 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-200'
                    : 'bg-stone-100/60 dark:bg-stone-900/60 text-stone-400 dark:text-stone-600'
                }`}
              >
                {!isUnlocked && <Lock className="w-3 h-3" />}
                <span>Lvl {lvl.level}</span>
                {stat && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-white/30 text-white' : 'bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300'
                  }`}>
                    {stat.learned}/10
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Level Sections */}
      <div className="space-y-8">
        {filteredLevels.map((lvl) => {
          const isUnlocked = levelUnlockStatus[lvl.level];
          const stat = levelStats[lvl.level];
          const kanjis = getFilteredKanjiForLevel(lvl);

          return (
            <div 
              key={lvl.level}
              className={`rounded-2xl border transition-all ${
                isUnlocked 
                  ? 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 shadow-sm' 
                  : 'bg-stone-50/70 dark:bg-stone-950/40 border-stone-200/60 dark:border-stone-900 opacity-90'
              } p-5 md:p-6`}
            >
              {/* Level Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-stone-100 dark:border-stone-800">
                <div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold tracking-wider uppercase ${
                      isUnlocked ? 'bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400' : 'bg-stone-200 dark:bg-stone-800 text-stone-500'
                    }`}>
                      Level {lvl.level}
                    </span>
                    <span className="text-xs text-stone-400 dark:text-stone-500 font-medium">
                      {lvl.kanjiRange}
                    </span>
                    {!isUnlocked && (
                      <span className="inline-flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 font-medium bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded">
                        <Lock className="w-3 h-3" />
                        Locked (Pass Level {lvl.level - 1} 100% to unlock)
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-stone-900 dark:text-white mt-1">
                    {lvl.title}
                  </h2>
                  <p className="text-xs md:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
                    {lvl.subtitle} • Key Characters: <span className="font-japanese font-semibold text-stone-700 dark:text-stone-200">{lvl.theme}</span>
                  </p>
                </div>

                {/* Progress Bar & Counter */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 min-w-[220px]">
                  <div className="flex-1 w-full sm:w-auto">
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-stone-600 dark:text-stone-300">Mastery Progress</span>
                      <span className="text-red-600 dark:text-red-400">{stat?.learned || 0}/10 ({stat?.pct || 0}%)</span>
                    </div>
                    <div className="h-2 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-600 to-rose-500 transition-all duration-500 rounded-full"
                        style={{ width: `${stat?.pct || 0}%` }}
                      />
                    </div>
                  </div>

                  {stat && stat.learned > 0 && (
                    <button
                      onClick={() => {
                        const firstLevelLearned = kanjis.find(k => progressMap[k.id]?.learning_status === 'learned' || progressMap[k.id]?.learning_status === 'needs_revision');
                        if (firstLevelLearned) onStartAssessment(firstLevelLearned, true);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold transition shadow-xs shrink-0 cursor-pointer"
                      title={`Re-test all ${stat.learned} learned kanji in Level ${lvl.level}`}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Re-Test Level ({stat.learned})</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Kanji Cards Grid */}
              {kanjis.length === 0 ? (
                <div className="py-12 text-center text-stone-400 text-sm">
                  No kanji match your current search and filter criteria for Level {lvl.level}.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-5">
                  {kanjis.map((k) => {
                    const prog = progressMap[k.id];
                    const isLearned = prog?.learning_status === 'learned';
                    const isLearning = prog?.learning_status === 'learning';
                    const isWeak = prog?.learning_status === 'needs_revision';
                    const cardLocked = !isUnlocked;

                    // Compute overall score
                    const avgScore = prog && isLearned
                      ? Math.round((prog.meaning_accuracy + prog.onyomi_accuracy + prog.kunyomi_accuracy + prog.vocabulary_accuracy) / 4)
                      : null;

                    return (
                      <div
                        key={k.id}
                        className={`group relative rounded-xl border transition-all duration-200 flex flex-col justify-between overflow-hidden ${
                          cardLocked 
                            ? 'bg-stone-100/50 dark:bg-stone-900/30 border-stone-200/60 dark:border-stone-800/50 opacity-60'
                            : isLearned
                            ? 'bg-white dark:bg-stone-850 border-emerald-200 dark:border-emerald-900/50 hover:shadow-md hover:border-emerald-400'
                            : isWeak
                            ? 'bg-white dark:bg-stone-850 border-rose-200 dark:border-rose-900/50 hover:shadow-md hover:border-rose-400'
                            : isLearning
                            ? 'bg-white dark:bg-stone-850 border-purple-200 dark:border-purple-900/50 hover:shadow-md hover:border-purple-400'
                            : 'bg-white dark:bg-stone-850 border-stone-200 dark:border-stone-800 hover:shadow-md hover:border-stone-300'
                        }`}
                      >
                        {/* Top Badge & Number */}
                        <div className="p-4 pb-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-mono text-stone-400 font-semibold">
                              #{k.kanji_number}
                            </span>
                            
                            {cardLocked ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-stone-400 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded">
                                <Lock className="w-2.5 h-2.5" />
                                Locked
                              </span>
                            ) : isLearned ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                {avgScore ? `${avgScore}%` : 'Learned'}
                              </span>
                            ) : isWeak ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded">
                                <AlertTriangle className="w-3 h-3 text-rose-500" />
                                Revision ({prog?.mistake_count}x)
                              </span>
                            ) : isLearning ? (
                              <span className="text-[10px] font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded">
                                In Progress
                              </span>
                            ) : (
                              <span className="text-[10px] font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
                                Available
                              </span>
                            )}
                          </div>

                          {/* Kanji Character with Audio */}
                          <div className="mt-2 text-center relative py-2">
                            <span className="font-japanese text-5xl font-black text-stone-900 dark:text-stone-50 select-none group-hover:scale-105 transition-transform inline-block">
                              {k.character}
                            </span>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2">
                              <AudioButton 
                                text={k.character} 
                                size="sm" 
                                className="opacity-60 hover:opacity-100" 
                              />
                            </div>
                          </div>

                          {/* Meaning */}
                          <div className="text-center mt-1">
                            <p className="text-sm font-bold text-stone-800 dark:text-stone-100 truncate">
                              {k.meaning}
                            </p>
                          </div>

                          {/* Readings Box */}
                          <div className="mt-3 pt-2.5 border-t border-stone-100 dark:border-stone-800 space-y-1 text-xs">
                            <div className="flex justify-between items-center text-[11px]">
                              <span className="text-stone-400 font-medium">On:</span>
                              <span className="font-japanese font-semibold text-red-700 dark:text-red-400 truncate max-w-[120px]">
                                {k.onyomi_readings.join(', ')}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-[11px]">
                              <span className="text-stone-400 font-medium">Kun:</span>
                              <span className="font-japanese font-semibold text-stone-700 dark:text-stone-200 truncate max-w-[120px]">
                                {k.kunyomi_readings.length > 0 ? k.kunyomi_readings.join(', ') : '—'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Action Footer */}
                        <div className="p-3 bg-stone-50/80 dark:bg-stone-800/40 border-t border-stone-100 dark:border-stone-800/80 flex items-center gap-2">
                          <button
                            disabled={cardLocked}
                            onClick={() => onSelectKanji(k)}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-white dark:bg-stone-700 hover:bg-stone-100 dark:hover:bg-stone-600 text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-600 text-xs font-semibold transition disabled:opacity-50"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Study
                          </button>
                          
                          <button
                            disabled={cardLocked}
                            onClick={() => onStartAssessment(k, isLearned || isWeak)}
                            className={`inline-flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-lg text-xs font-bold transition shadow-sm disabled:opacity-50 cursor-pointer ${
                              isLearned
                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                : isWeak
                                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                                : 'bg-red-600 hover:bg-red-700 text-white'
                            }`}
                            title={isLearned || isWeak ? "Dynamic re-test strictly using your learned kanji pool" : "Take 4-step assessment to earn Learned status"}
                          >
                            {isLearned || isWeak ? <RotateCcw className="w-3.5 h-3.5" /> : <Award className="w-3.5 h-3.5" />}
                            {isLearned || isWeak ? 'Re-Test' : 'Pass 80%'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
