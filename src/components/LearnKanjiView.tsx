'use client';

import React, { useState, useMemo } from 'react';
import {
  BookOpen, Lock, CheckCircle2, AlertTriangle, Sparkles,
  Search, Award, Clock, ArrowRight, Play, Eye, RotateCcw, ShieldCheck, Loader2
} from 'lucide-react';
import { KanjiRecord, UserKanjiProgress } from '@/types/kanji';
import { LEVEL_METADATA, LevelInfo } from '@/data/kanjiDatabase';
import { AudioButton } from './AudioButton';
import { recoverCompletedLevel1 } from '@/services/cloudSyncService';
import { KanjiLevelTestModal, TestScopeMode } from './KanjiLevelTestModal';

interface LearnKanjiViewProps {
  kanjiList: KanjiRecord[];
  progressMap: Record<number, UserKanjiProgress>;
  onSelectKanji: (kanji: KanjiRecord) => void;
  onStartAssessment: (kanji: KanjiRecord, isReTest?: boolean) => void;
  onOpenQuickStudy?: () => void;
  onRefreshProgress?: () => void;
}

export function LearnKanjiView({
  kanjiList,
  progressMap,
  onSelectKanji,
  onStartAssessment,
  onOpenQuickStudy,
  onRefreshProgress
}: LearnKanjiViewProps) {
  const [selectedLevel, setSelectedLevel] = useState<number | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unlocked' | 'learned' | 'learning' | 'weak'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRecovering, setIsRecovering] = useState(false);
  const [recoveryNotice, setRecoveryNotice] = useState<string | null>(null);

  // Level & AI Test Modal State
  const [isLevelTestModalOpen, setIsLevelTestModalOpen] = useState(false);
  const [modalScopeMode, setModalScopeMode] = useState<TestScopeMode>('level_test');
  const [modalInitialLevel, setModalInitialLevel] = useState<number>(1);

  const handleOpenLevelTest = (level: number) => {
    setModalScopeMode('level_test');
    setModalInitialLevel(level);
    setIsLevelTestModalOpen(true);
  };

  const handleOpenAiTest = () => {
    setModalScopeMode('all_unlocked_ai');
    setIsLevelTestModalOpen(true);
  };

  const handleRecoverLevel1 = async () => {
    setIsRecovering(true);
    setRecoveryNotice(null);
    try {
      const res = await recoverCompletedLevel1();
      if (res.success) {
        setRecoveryNotice('✓ Level 1 Restored & Verified! All 10 Kanji marked as Learned and Level 2 is unlocked.');
      } else {
        setRecoveryNotice('✓ Level 1 Restored Locally! Unlocked Level 2 (Cloud sync will retry automatically).');
      }
      onRefreshProgress?.();
    } catch (err: any) {
      setRecoveryNotice(`Recovery error: ${err.message}`);
    } finally {
      setIsRecovering(false);
      setTimeout(() => setRecoveryNotice(null), 8000);
    }
  };

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

  // All eligible learned or unlocked kanji pool for AI test (Requirement 4)
  const allLearnedOrUnlockedPool = useMemo(() => {
    return kanjiList.filter(k => {
      const p = progressMap[k.id];
      return p ? p.learning_status !== 'locked' : levelUnlockStatus[k.level];
    });
  }, [kanjiList, progressMap, levelUnlockStatus]);

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
      <div className="space-y-6 w-full max-w-full min-w-0 overflow-x-hidden">
        {/* Top Banner & Quick Office Study Trigger */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 via-rose-700 to-stone-900 p-4 sm:p-6 md:p-8 text-white shadow-xl w-full max-w-full min-w-0">
            <div className="absolute right-0 top-0 -mt-6 mr-0 h-48 w-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
                  <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 w-full min-w-0">
                    <div className="min-w-0 flex-1">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-[10px] sm:text-xs font-medium tracking-wide uppercase mb-2 sm:mb-3 max-w-full">
                        <Sparkles className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">Progressive Curriculum • 120 N5 Kanji</span>
                      </div>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight break-words">
                          12-Level Kanji Mastery Path
                        </h1>
                          <p className="mt-1.5 sm:mt-2 text-stone-200 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed break-words">
                            Step-by-step progressive unlock. Master Level N by passing the 80% learning assessment for all 10 kanji to unlock the next level! Test engine dynamically tests strictly learned kanji.
                          </p>
                        </div>

                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto shrink-0 min-w-0">
                            {/* AI Test for All Learned / Unlocked Kanji (Requirement 4) */}
                            <button
                              onClick={handleOpenAiTest}
                              disabled={allLearnedOrUnlockedPool.length === 0}
                              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-800 text-white font-bold transition shadow-lg shrink-0 text-xs sm:text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                              title={`Dynamic AI Test strictly covering all your ${allLearnedOrUnlockedPool.length} learned and unlocked kanji`}
                            >
                              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                              <span className="truncate">AI Test ({allLearnedOrUnlockedPool.length} Kanji)</span>
                            </button>

                            {totalLearnedAllLevels > 0 && (
                              <button
                                onClick={() => {
                                  const firstLearned = kanjiList.find(k => progressMap[k.id]?.learning_status === 'learned' || progressMap[k.id]?.learning_status === 'needs_revision');
                                  if (firstLearned) onStartAssessment(firstLearned, true);
                                }}
                                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition shadow-lg shrink-0 text-xs sm:text-sm cursor-pointer w-full sm:w-auto"
                                title="Dynamic Re-Test of your entire learned kanji pool"
                              >
                                <RotateCcw className="w-4 h-4 shrink-0" />
                                <span className="truncate">Mastery Re-Test ({totalLearnedAllLevels} Pool)</span>
                              </button>
                            )}

                            {onOpenQuickStudy && (
                              <button
                                onClick={onOpenQuickStudy}
                                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl bg-white text-stone-900 font-bold hover:bg-stone-100 transition shadow-lg shrink-0 text-xs sm:text-sm cursor-pointer w-full sm:w-auto"
                              >
                                <Clock className="w-4 h-4 text-red-600 shrink-0" />
                                <span>10-Min Office Blitz</span>
                                <ArrowRight className="w-4 h-4 text-stone-500 shrink-0" />
                              </button>
                            )}
                          </div>
                        </div>
                    </div>

                    {/* Recovery Feedback Notice */}
                    {recoveryNotice && (
                          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm font-semibold text-emerald-800 dark:text-emerald-300 flex items-center justify-between gap-3 shadow-sm animate-fadeIn w-full max-w-full min-w-0">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                              <span className="break-words">{recoveryNotice}</span>
                            </div>
                              <button onClick={() => setRecoveryNotice(null)} className="text-emerald-600 hover:text-emerald-900 p-1 shrink-0">
                                ✕
                              </button>
                          </div>
      )}

                          {/* Level 1 Recovery Banner (Displayed when Level 1 is not fully marked as learned) */}
                          {levelStats[1]?.pct < 100 && (
                                <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border-2 border-amber-500/30 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-sm animate-fadeIn w-full max-w-full min-w-0 overflow-hidden">
                                  <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                                    <span className="p-3 rounded-2xl bg-amber-500/20 text-amber-700 dark:text-amber-300 shrink-0">
                                      <RotateCcw className="w-5 h-5" />
                                    </span>
                                          <div className="space-y-0.5 min-w-0 flex-1">
                                            <div className="flex items-center gap-2 flex-wrap">
                                              <h4 className="font-extrabold text-sm sm:text-base text-stone-900 dark:text-white break-words">
                                                Completed Kanji Level 1 Yesterday?
                                              </h4>
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 uppercase shrink-0">
                                                  1-Click Recovery
                                                </span>
                                            </div>
                                              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed break-words">
                                                Restore your 10 completed Kanji (#1 人 through #10 八), immediately unlock Level 2, and verify & save the completion to Supabase.
                                              </p>
                                          </div>
                                      </div>

                                      <button
                                        onClick={handleRecoverLevel1}
                                        disabled={isRecovering}
                                        className="w-full md:w-auto px-5 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all shrink-0 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-95"
                                      >
                                        {isRecovering ? (
              <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                                        ) : (
              <Sparkles className="w-4 h-4 shrink-0" />
                                        )}
                                        <span className="truncate">{isRecovering ? 'Restoring & Syncing...' : 'Restore Level 1 & Unlock Level 2'}</span>
                                      </button>
                                    </div>
      )}

                                    {/* Filter and Search Bar */}
                                        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-3 sm:p-4 shadow-sm space-y-3 sm:space-y-4 w-full max-w-full min-w-0 overflow-hidden">
                                          <div className="flex flex-col md:flex-row gap-3 sm:gap-4 items-stretch md:items-center justify-between w-full min-w-0">
                                            {/* Search Box */}
                                              <div className="relative flex-1 min-w-0 w-full">
                                                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                                                <input
                                                  type="text"
                                                  placeholder="Search kanji, meaning, Onyomi, Kunyomi..."
                                                  value={searchQuery}
                                                  onChange={(e) => setSearchQuery(e.target.value)}
                                                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/60 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                />
                                              </div>

                                              {/* Status Filter Buttons - Horizontal swipeable on mobile */}
                                                <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none pb-1 text-xs w-full md:w-auto min-w-0 max-w-full">
                                                  <button
                                                    onClick={() => setStatusFilter('all')}
                                                    className={`px-3 py-1.5 rounded-lg font-medium transition shrink-0 ${statusFilter === 'all'
                                                      ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                                                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                                                      }`}
                                                  >
                                                    All Status
                                                  </button>
                                                  <button
                                                    onClick={() => setStatusFilter('unlocked')}
                                                    className={`px-3 py-1.5 rounded-lg font-medium transition shrink-0 ${statusFilter === 'unlocked'
                                                      ? 'bg-blue-600 text-white'
                                                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                                                      }`}
                                                  >
                                                    Unlocked
                                                  </button>
                                                  <button
                                                    onClick={() => setStatusFilter('learned')}
                                                    className={`px-3 py-1.5 rounded-lg font-medium transition shrink-0 ${statusFilter === 'learned'
                                                      ? 'bg-emerald-600 text-white'
                                                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                                                      }`}
                                                  >
                                                    Mastered (80%+)
                                                  </button>
                                                  <button
                                                    onClick={() => setStatusFilter('learning')}
                                                    className={`px-3 py-1.5 rounded-lg font-medium transition shrink-0 ${statusFilter === 'learning'
                                                      ? 'bg-purple-600 text-white'
                                                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                                                      }`}
                                                  >
                                                    In Progress
                                                  </button>
                                                  <button
                                                    onClick={() => setStatusFilter('weak')}
                                                    className={`px-3 py-1.5 rounded-lg font-medium transition shrink-0 ${statusFilter === 'weak'
                                                      ? 'bg-rose-600 text-white'
                                                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                                                      }`}
                                                  >
                                                    Needs Revision
                                                  </button>
                                                </div>
                                              </div>

                                              {/* Level Selector Pills - Horizontal swipeable on mobile */}
                                                <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none pb-1 pt-2 border-t border-stone-100 dark:border-stone-800 w-full min-w-0 max-w-full">
                                                  <button
                                                    onClick={() => setSelectedLevel('all')}
                                                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition shrink-0 ${selectedLevel === 'all'
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
                                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition shrink-0 ${isSelected
                                                          ? 'bg-red-600 text-white shadow-sm'
                                                          : isUnlocked
                                                            ? 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-200'
                                                            : 'bg-stone-100/60 dark:bg-stone-900/60 text-stone-400 dark:text-stone-600'
                                                          }`}
                                                      >
                                                        {!isUnlocked && <Lock className="w-3 h-3 shrink-0" />}
                                                        <span>Lvl {lvl.level}</span>
                                                        {stat && (
                                                          <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/30 text-white' : 'bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300'
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
                                                <div className="space-y-6 sm:space-y-8 w-full max-w-full min-w-0">
                                                  {filteredLevels.map((lvl) => {
                                                    const isUnlocked = levelUnlockStatus[lvl.level];
                                                    const stat = levelStats[lvl.level];
                                                    const kanjis = getFilteredKanjiForLevel(lvl);

                                                    // Requirement 1: Check if all kanji in this level have been studied
                                                    const studiedCount = lvl.kanjiIds.filter(id => {
                                                      const p = progressMap[id];
                                                      return p && (p.learning_status === 'learned' || p.learning_status === 'learning' || p.learning_status === 'needs_revision' || p.last_studied_at);
                                                    }).length;
                                                    const isLevelStudied = isUnlocked && studiedCount === lvl.kanjiIds.length;

                                                    return (
                                                      <div
                                                        key={lvl.level}
                                                        className={`rounded-2xl border transition-all w-full max-w-full min-w-0 overflow-hidden ${isUnlocked
                                                          ? 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 shadow-sm'
                                                          : 'bg-stone-50/70 dark:bg-stone-950/40 border-stone-200/60 dark:border-stone-900 opacity-90'
                                                        } p-3.5 sm:p-5 md:p-6`}
                                                      >
                                                  {/* Level Header */}
                                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 sm:pb-5 border-b border-stone-100 dark:border-stone-800 w-full min-w-0">
                                                      <div className="min-w-0 flex-1">
                                                        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                                                          <span className={`px-2.5 py-1 rounded-md text-xs font-bold tracking-wider uppercase shrink-0 ${isUnlocked ? 'bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400' : 'bg-stone-200 dark:bg-stone-800 text-stone-500'
                                                            }`}>
                                                            Level {lvl.level}
                                                          </span>
                                                          <span className="text-xs text-stone-400 dark:text-stone-500 font-medium shrink-0">
                                                            {lvl.kanjiRange}
                                                          </span>
                                                          {!isUnlocked && (
                                                            <span className="inline-flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 font-medium bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded flex-wrap">
                                                              <Lock className="w-3 h-3 shrink-0" />
                                                              <span>Locked (Pass Level {lvl.level - 1} 100% to unlock)</span>
                                                            </span>
                                                          )}
                                                        </div>
                                                        <h2 className="text-base sm:text-lg md:text-xl font-bold text-stone-900 dark:text-white mt-1 break-words">
                                                          {lvl.title}
                                                        </h2>
                                                        <p className="text-xs md:text-sm text-stone-500 dark:text-stone-400 mt-0.5 break-words">
                                                          {lvl.subtitle} • Key Characters: <span className="font-japanese font-semibold text-stone-700 dark:text-stone-200 break-words">{lvl.theme}</span>
                                                        </p>
                                                      </div>

                                                        {/* Progress Bar & Common Start Test Button (Requirement 1) */}
                                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto min-w-0">
                                                          <div className="flex-1 w-full sm:w-44 min-w-0">
                                                            <div className="flex justify-between text-xs font-semibold mb-1">
                                                              <span className="text-stone-600 dark:text-stone-300">Mastery</span>
                                                              <span className="text-red-600 dark:text-red-400">{stat?.learned || 0}/10 ({stat?.pct || 0}%)</span>
                                                            </div>
                                                            <div className="h-2 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                                                              <div
                                                                className="h-full bg-gradient-to-r from-red-600 to-rose-500 transition-all duration-500 rounded-full"
                                                                style={{ width: `${stat?.pct || 0}%` }}
                                                              />
                                                            </div>
                                                          </div>

                                                      {/* Common Test Button for Each Level */}
                                                      {isLevelStudied ? (
                                                        <button
                                                          onClick={() => handleOpenLevelTest(lvl.level)}
                                                          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-sm hover:shadow-md cursor-pointer shrink-0 w-full sm:w-auto active:scale-95"
                                                          title={`Start Level ${lvl.level} Test (All 10 Kanji Studied)`}
                                                        >
                                                          <Play className="w-3.5 h-3.5 fill-current shrink-0" />
                                                          <span>Start Test</span>
                                                        </button>
                                                      ) : (
                                                        <button
                                                          disabled
                                                          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800/80 text-stone-400 dark:text-stone-500 text-xs font-semibold shrink-0 cursor-not-allowed border border-stone-200/80 dark:border-stone-700/60 w-full sm:w-auto"
                                                          title={`Study all 10 kanji in Level ${lvl.level} to unlock this test (${studiedCount}/10 studied)`}
                                                        >
                                                          <Lock className="w-3 h-3 shrink-0" />
                                                          <span>Start Test ({studiedCount}/10)</span>
                                                        </button>
                                                      )}
                                                    </div>
                                                  </div>

                                                        {/* Kanji Cards Grid */ }
                                                        {
                                                          kanjis.length === 0 ? (
                                                            <div className="py-12 text-center text-stone-400 text-sm">
                                                              No kanji match your current search and filter criteria for Level {lvl.level}.
                                                            </div>
                                                          ) : (
                                                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mt-4 sm:mt-5 w-full min-w-0">
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
                                                                        className={`group relative rounded-xl border transition-all duration-200 flex flex-col justify-between overflow-hidden w-full min-w-0 ${cardLocked
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
                                                                        <div className="p-3.5 sm:p-4 pb-2 w-full min-w-0">
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
                                                                      <div className="p-2.5 sm:p-3 bg-stone-50/80 dark:bg-stone-800/40 border-t border-stone-100 dark:border-stone-800/80 flex items-center gap-2 min-w-0 w-full">
                                                                        <button
                                                                          disabled={cardLocked}
                                                                          onClick={() => onSelectKanji(k)}
                                                                          className="flex-1 min-w-0 inline-flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-white dark:bg-stone-700 hover:bg-stone-100 dark:hover:bg-stone-600 text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-600 text-xs font-semibold transition disabled:opacity-50"
                                                                        >
                                                                          <Eye className="w-3.5 h-3.5 shrink-0" />
                                                                          <span className="truncate">Study</span>
                                                                        </button>

                                                                    <button
                                                                      disabled={cardLocked}
                                                                      onClick={() => onStartAssessment(k, isLearned || isWeak)}
                                                                      className={`min-w-0 inline-flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-lg text-xs font-bold transition shadow-sm disabled:opacity-50 cursor-pointer shrink-0 ${isLearned
                                                                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                                                        : isWeak
                                                                          ? 'bg-rose-600 hover:bg-rose-700 text-white'
                                                                          : 'bg-red-600 hover:bg-red-700 text-white'
                                                                        }`}
                                                                      title={isLearned || isWeak ? "Dynamic re-test strictly using your learned kanji pool" : "Take 4-step assessment to earn Learned status"}
                                                                    >
                                                                      {isLearned || isWeak ? <RotateCcw className="w-3.5 h-3.5 shrink-0" /> : <Award className="w-3.5 h-3.5 shrink-0" />}
                                                                      <span className="truncate">{isLearned || isWeak ? 'Re-Test' : 'Pass 80%'}</span>
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

                                          {/* Kanji Level & AI Test Modal */}
                                          <KanjiLevelTestModal
                                            isOpen={isLevelTestModalOpen}
                                            onClose={() => setIsLevelTestModalOpen(false)}
                                            scopeMode={modalScopeMode}
                                            initialLevel={modalInitialLevel}
                                            kanjiList={kanjiList}
                                            progressMap={progressMap}
                                            onTestCompleted={() => {
                                              onRefreshProgress?.();
                                            }}
                                          />
                                        </div>
                                        );
}
