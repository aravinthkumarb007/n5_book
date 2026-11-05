'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  RotateCcw, Sparkles, Volume2, CheckCircle2, AlertTriangle,
  HelpCircle, X, Check, RefreshCw, BookOpen, Search,
  ArrowRight, ShieldCheck, Loader2, Trophy, Layers, Zap, CheckSquare, Square
} from 'lucide-react';
import { MarkedVocabItemWithMeta, VocabLearningStatus } from '@/types/minna';
import { speakJapanese } from '@/services/audio';
import { setVocabStatus, batchSetVocabStatus, getStoredVocabStatuses, getMasterVocabItem } from '@/services/vocabStorage';
import { getSupabaseHeaders } from '@/services/supabaseClient';
import { ALL_MINNA_LESSONS } from '@/data/minnaNoNihongo';
import { MinnaFlashcardsModal } from './MinnaFlashcardsModal';
import { getJapaneseWordDisplay } from '@/utils/japaneseWordDisplay';

interface VocabRelearningViewProps {
  onNavigateToMinna?: () => void;
  onNavigateToBatch?: () => void;
}

export function VocabRelearningView({
  onNavigateToMinna,
  onNavigateToBatch
}: VocabRelearningViewProps) {
  const [items, setItems] = useState<MarkedVocabItemWithMeta[]>([]);
  const [counts, setCounts] = useState({ total: 0, notSure: 0, notLearned: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Filters
  const [statusFilter, setStatusFilter] = useState<'all' | 'not_learned' | 'not_sure'>('all');
  const [selectedLessonFilter, setSelectedLessonFilter] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Flashcards state
  const [flashcardModalOpen, setFlashcardModalOpen] = useState(false);
  const [customFlashcardItems, setCustomFlashcardItems] = useState<MarkedVocabItemWithMeta[] | null>(null);

  // Batch selection state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Update feedback state
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [saveNotice, setSaveNotice] = useState<string | null>(null);

  const toggleSelectId = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAllFiltered = () => {
    if (selectedIds.size === filteredItems.length && filteredItems.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredItems.map(i => i.id)));
    }
  };

  const handleBatchPromoteLearned = async () => {
    if (selectedIds.size === 0) return;
    const count = selectedIds.size;
    const updates = items.filter(i => selectedIds.has(i.id)).map(i => ({
      vocabId: i.id,
      lessonNumber: i.lessonNumber,
      status: 'learned' as VocabLearningStatus
    }));

    setItems(prev => prev.filter(i => !selectedIds.has(i.id)));
    setCounts(prev => ({
      ...prev,
      total: Math.max(0, prev.total - count)
    }));

    await batchSetVocabStatus(updates);
    setSelectedIds(new Set());
    setSaveNotice(`✓ Mastered! ${count} vocabulary items promoted to Learned and removed from Re-learning.`);
    setTimeout(() => setSaveNotice(null), 3500);
    fetchRelearnVocab(true);
  };

  const handleLaunchFastRecallSelected = () => {
    const selected = items.filter(i => selectedIds.has(i.id));
    if (selected.length > 0) {
      setCustomFlashcardItems(selected);
      setFlashcardModalOpen(true);
    }
  };

  const handleLaunchSingleFastRecall = (item: MarkedVocabItemWithMeta) => {
    setCustomFlashcardItems([item]);
    setFlashcardModalOpen(true);
  };

  const loadLocalFallback = (errText?: string) => {
    const localStatuses = getStoredVocabStatuses();
    const records = Object.values(localStatuses);
    if (records.length > 0) {
      const localItems: MarkedVocabItemWithMeta[] = [];
      const c = { total: 0, notSure: 0, notLearned: 0 };
      for (const rec of records) {
        if (rec.status !== 'not_sure' && rec.status !== 'not_learned') continue;
        if (rec.status === 'not_sure') c.notSure++;
        if (rec.status === 'not_learned') c.notLearned++;
        c.total++;

        const base = getMasterVocabItem(rec.vocabId);
        if (base) {
          localItems.push({
            ...base,
            status: rec.status,
            learningStatus: rec.status,
            statusUpdatedAt: rec.updatedAt
          });
        }
      }
      localItems.sort((a, b) => {
        if (a.lessonNumber !== b.lessonNumber) return a.lessonNumber - b.lessonNumber;
        return a.id.localeCompare(b.id);
      });
      setItems(localItems);
      setCounts(c);
      setErrorMessage(null);
    } else {
      setErrorMessage(errText || 'Supabase URL and Anon Key are not configured');
    }
  };

  const fetchRelearnVocab = async (silent: boolean = false) => {
    if (!silent) setIsLoading(true);
    else setIsRefreshing(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/vocabulary/relearn', {
        headers: getSupabaseHeaders()
      });
      const data = await res.json();

      if (data.success && Array.isArray(data.items)) {
        setItems(data.items);
        if (data.counts) {
          setCounts(data.counts);
        }
      } else {
        loadLocalFallback(data.error);
      }
    } catch (err: any) {
      loadLocalFallback(err.message);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRelearnVocab();

    const handleStatusUpdate = () => {
      fetchRelearnVocab(true);
    };

    window.addEventListener('vocab-status-updated', handleStatusUpdate);
    window.addEventListener('project-data-refreshed', handleStatusUpdate);
    return () => {
      window.removeEventListener('vocab-status-updated', handleStatusUpdate);
      window.removeEventListener('project-data-refreshed', handleStatusUpdate);
    };
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (statusFilter !== 'all') {
        if (item.status !== statusFilter) return false;
      }

      if (selectedLessonFilter !== 'all') {
        if (item.lessonNumber !== selectedLessonFilter) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchKanji = item.kanji.toLowerCase().includes(q);
        const matchHiragana = item.hiragana.toLowerCase().includes(q);
        const matchRomaji = item.romaji.toLowerCase().includes(q);
        const matchEnglish = item.english.toLowerCase().includes(q);
        return matchKanji || matchHiragana || matchRomaji || matchEnglish;
      }

      return true;
    });
  }, [items, statusFilter, selectedLessonFilter, searchQuery]);

  const handleUpdateStatus = async (vocabId: string, lessonNumber: number, newStatus: VocabLearningStatus) => {
    setUpdatingId(vocabId);

    // If promoted to 'learned', remove from re-learning pool immediately
    if (newStatus === 'learned') {
      setItems(prev => prev.filter(i => i.id !== vocabId));
      setCounts(prev => ({
        ...prev,
        total: Math.max(0, prev.total - 1),
        notLearned: items.find(i => i.id === vocabId)?.status === 'not_learned' ? Math.max(0, prev.notLearned - 1) : prev.notLearned,
        notSure: items.find(i => i.id === vocabId)?.status === 'not_sure' ? Math.max(0, prev.notSure - 1) : prev.notSure
      }));
    } else {
      setItems(prev => prev.map(i => i.id === vocabId ? { ...i, status: newStatus, learningStatus: newStatus } : i));
    }

    const res = await setVocabStatus(vocabId, lessonNumber, newStatus);
    setUpdatingId(null);

    if (res.success) {
      if (newStatus === 'learned') {
        setSaveNotice(`✓ Mastered! Word promoted to Learned and removed from Re-learning.`);
      } else {
        setSaveNotice(`✓ Status updated to "${newStatus.replace('_', ' ')}"`);
      }
      setTimeout(() => setSaveNotice(null), 3000);
      fetchRelearnVocab(true);
    } else {
      setSaveNotice(`⚠ Database save error: ${res.error || 'Connection failed'}`);
      setTimeout(() => setSaveNotice(null), 5000);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300 pb-16 w-full max-w-full min-w-0 overflow-x-hidden">

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-rose-950 text-white p-6 sm:p-10 border border-stone-800 shadow-2xl w-full max-w-full min-w-0">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 -mb-10 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-600 text-white shadow-md flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5" /> Retention & Mastery Center
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white/90 backdrop-blur-sm">
              Dedicated Re-learning Page
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            語彙の再学習
            <span className="block text-lg sm:text-2xl lg:text-3xl font-bold text-stone-300 mt-1">
              Vocabulary Re-learning Hub
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-2xl">
            Targeted review workspace strictly for vocabulary items marked as <strong>Not Learned</strong> or <strong>Not Sure</strong>.
            Strengthen your weak areas, review detailed context examples, and promote mastered words to full <strong>Learned</strong> status.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-2">
            <button
              onClick={() => {
                setCustomFlashcardItems(null);
                setFlashcardModalOpen(true);
              }}
              disabled={filteredItems.length === 0}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white font-bold text-xs sm:text-sm shadow-xl hover:from-red-700 hover:to-rose-700 active:scale-95 transition flex items-center justify-center gap-2 disabled:opacity-50 w-full sm:w-auto"
            >
              <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>⚡ Start Fast Recall Flashcards ({filteredItems.length})</span>
            </button>

            {onNavigateToBatch && (
              <button
                onClick={onNavigateToBatch}
                className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm backdrop-blur-sm active:scale-95 transition flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Layers className="w-4 h-4 text-indigo-300" />
                <span>View All Marked Batch</span>
              </button>
            )}

            <button
              onClick={() => fetchRelearnVocab(true)}
              disabled={isRefreshing}
              className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm backdrop-blur-sm border border-white/20 active:scale-95 transition flex items-center justify-center gap-2 w-full sm:w-auto"
              title="Refresh Re-learning Pool"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Save Notification */}
      {saveNotice && (
        <div className="p-3.5 rounded-2xl bg-stone-900 text-white text-xs font-bold flex items-center justify-between shadow-lg animate-fadeIn border border-stone-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{saveNotice}</span>
          </div>
          <button onClick={() => setSaveNotice(null)} className="text-white/70 hover:text-white p-1">
            ✕
          </button>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div
          onClick={() => setStatusFilter('all')}
          className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition shadow-sm ${
            statusFilter === 'all'
              ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/30 ring-2 ring-rose-500/20'
              : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-stone-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
              Total Re-learning Pool
            </span>
            <RotateCcw className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400 mt-1">
            {counts.total}
          </div>
          <div className="text-[11px] text-stone-500 mt-0.5">Words needing reinforcement</div>
        </div>

        <div
          onClick={() => setStatusFilter('not_learned')}
          className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition shadow-sm ${
            statusFilter === 'not_learned'
              ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/30 ring-2 ring-rose-500/20'
              : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-stone-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
              Not Learned (Unlearned)
            </span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400 mt-1">
            {counts.notLearned}
          </div>
          <div className="text-[11px] text-stone-500 mt-0.5">High priority to study</div>
        </div>

        <div
          onClick={() => setStatusFilter('not_sure')}
          className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition shadow-sm ${
            statusFilter === 'not_sure'
              ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/30 ring-2 ring-amber-500/20'
              : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-stone-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Not Sure (Uncertain)
            </span>
            <HelpCircle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 mt-1">
            {counts.notSure}
          </div>
          <div className="text-[11px] text-stone-500 mt-0.5">Needs repetition & clarity</div>
        </div>
      </div>

      {/* Filter and Search Bar - Clean Responsive Card Layout */}
      <div className="bg-white dark:bg-stone-900 p-3 sm:p-4 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-3 w-full min-w-0">
        {/* Row 1: Search Input (Full width, guaranteed non-collapsing) */}
        <div className="relative w-full min-w-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by hiragana, kanji, romaji, or meaning..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-800/50 text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-lg"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Row 2: Controls Bar - Lesson Selector + Status Filters */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-stone-100 dark:border-stone-800/80">
          {/* Lesson Selector */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider shrink-0">
              Lesson:
            </span>
            <select
              value={selectedLessonFilter}
              onChange={(e) => setSelectedLessonFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="w-full sm:w-auto max-w-full sm:max-w-[240px] md:max-w-[270px] truncate px-3 py-2 rounded-xl text-xs font-bold border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-xs"
            >
              <option value="all">All Lessons with Re-learn Words</option>
              {ALL_MINNA_LESSONS.map(l => (
                <option key={l.id} value={l.lessonNumber}>
                  Lesson {l.lessonNumber}: {l.title.replace(/^Lesson \d+:\s*/, '')}
                </option>
              ))}
            </select>
          </div>

          {/* Status Pills */}
          <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800/80 p-1 rounded-xl overflow-x-auto max-w-full">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                statusFilter === 'all' ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs' : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              All ({counts.total})
            </button>
            <button
              onClick={() => setStatusFilter('not_learned')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                statusFilter === 'not_learned' ? 'bg-rose-600 text-white shadow-xs' : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              Not Learned ({counts.notLearned})
            </button>
            <button
              onClick={() => setStatusFilter('not_sure')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                statusFilter === 'not_sure' ? 'bg-amber-600 text-white shadow-xs' : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              Not Sure ({counts.notSure})
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {isLoading ? (
        <div className="p-16 text-center space-y-3 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm">
          <Loader2 className="w-8 h-8 text-rose-600 animate-spin mx-auto" />
          <p className="text-xs font-bold text-stone-500">
            Querying re-learning vocabulary from database...
          </p>
        </div>
      ) : errorMessage ? (
        <div className="p-8 text-center space-y-3 bg-rose-50 dark:bg-rose-950/30 rounded-3xl border border-rose-200 dark:border-rose-900 shadow-sm">
          <AlertTriangle className="w-8 h-8 text-rose-600 mx-auto" />
          <h3 className="font-bold text-sm text-rose-800 dark:text-rose-200">{errorMessage}</h3>
          <button
            onClick={() => fetchRelearnVocab()}
            className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition"
          >
            Retry Connection
          </button>
        </div>
      ) : counts.total === 0 ? (
        /* ALL CAUGHT UP SCREEN */
        <div className="p-12 text-center space-y-4 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-stone-900 dark:text-white">
              All Caught Up!
            </h3>
            <p className="text-xs text-stone-500 mt-2 leading-relaxed">
              You have <strong>0 vocabulary</strong> marked as Not Learned or Not Sure. You have mastered all items studied so far!
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center pt-2">
            {onNavigateToMinna && (
              <button
                onClick={onNavigateToMinna}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition shadow-md flex items-center gap-1.5"
              >
                <span>Study More Lessons</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            {onNavigateToBatch && (
              <button
                onClick={onNavigateToBatch}
                className="px-5 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300 font-bold text-xs transition"
              >
                Browse All Marked Vocabulary
              </button>
            )}
          </div>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="p-8 text-center space-y-2 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
          <p className="text-xs text-stone-500">
            No re-learning items match the selected filter.
          </p>
          <button
            onClick={() => { setStatusFilter('all'); setSelectedLessonFilter('all'); setSearchQuery(''); }}
            className="text-xs font-bold text-rose-600 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 text-xs text-stone-500">
            <span>
              Reviewing <strong className="text-stone-900 dark:text-white">{filteredItems.length}</strong> words needing re-learning
            </span>

            <div className="flex items-center gap-3">
              <button
                onClick={selectAllFiltered}
                className="text-xs font-bold text-stone-600 dark:text-stone-300 hover:text-rose-600 flex items-center gap-1.5"
              >
                {selectedIds.size === filteredItems.length && filteredItems.length > 0 ? (
                  <CheckSquare className="w-4 h-4 text-rose-600" />
                ) : (
                  <Square className="w-4 h-4 text-stone-400" />
                )}
                <span>
                  {selectedIds.size === filteredItems.length && filteredItems.length > 0
                    ? 'Deselect All'
                    : `Select All (${filteredItems.length})`}
                </span>
              </button>

              <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Synchronized with DB
              </span>
            </div>
          </div>

          {/* Batch Ribbon when items are selected */}
          {selectedIds.size > 0 && (
            <div className="p-3 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900 to-rose-950 text-white flex flex-wrap items-center justify-between gap-3 shadow-md animate-fadeIn border border-stone-800">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-rose-600 text-white font-mono font-black text-xs flex items-center justify-center">
                  {selectedIds.size}
                </span>
                <span className="text-xs font-bold">
                  re-learning items selected for batch action
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleLaunchFastRecallSelected}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-xs transition flex items-center gap-1.5 shadow-sm active:scale-95"
                >
                  <Zap className="w-3.5 h-3.5 fill-stone-950" />
                  <span>Fast Recall Selected ({selectedIds.size})</span>
                </button>

                <button
                  onClick={handleBatchPromoteLearned}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-sm active:scale-95"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Mark Selected as Learned (Batch Promote)</span>
                </button>

                <button
                  onClick={() => setSelectedIds(new Set())}
                  className="text-stone-400 hover:text-white text-xs px-2 py-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredItems.map((item) => {
              const isUpdating = updatingId === item.id;
              const isNotLearned = item.status === 'not_learned';

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 shadow-sm ${
                    isNotLearned
                      ? 'border-rose-300 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/10 hover:border-rose-400'
                      : 'border-amber-300 dark:border-amber-900/60 bg-amber-50/20 dark:bg-amber-950/10 hover:border-amber-400'
                  }`}
                >
                  <div>
                    {/* Top Status & Lesson Badges with Batch Checkbox */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <button
                          onClick={() => toggleSelectId(item.id)}
                          className="p-1 -ml-1 text-stone-400 hover:text-rose-600 transition shrink-0"
                          title={selectedIds.has(item.id) ? 'Deselect' : 'Select for batch action'}
                        >
                          {selectedIds.has(item.id) ? (
                            <CheckSquare className="w-4 h-4 text-rose-600" />
                          ) : (
                            <Square className="w-4 h-4 text-stone-300 dark:text-stone-600" />
                          )}
                        </button>

                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 shrink-0">
                          Lesson {item.lessonNumber}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 flex items-center gap-1 shadow-xs">
                          <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                          <span className="hidden xs:inline">Fast Recall</span>
                        </span>

                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                            isNotLearned
                              ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
                              : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                          }`}
                        >
                          {isNotLearned ? (
                            <>
                              <X className="w-3 h-3" /> <span>Not Learned</span>
                            </>
                          ) : (
                            <>
                              <HelpCircle className="w-3 h-3" /> <span>Not Sure</span>
                            </>
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Word Typography: Standard Japanese Writing System */}
                    {(() => {
                      const jp = getJapaneseWordDisplay(item);
                      return (
                        <div className="flex items-start justify-between gap-2.5">
                          <div className="flex-1 min-w-0">
                            {/* Primary Text: Katakana for loanwords, Hiragana reading for kanji, Hiragana for native */}
                            <div className="text-2xl sm:text-3xl font-black font-japanese text-stone-900 dark:text-white tracking-wide break-words leading-tight">
                              {jp.primaryText}
                            </div>

                            {/* Secondary Text: Kanji (if present) & Romaji */}
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1">
                              {jp.secondaryText && (
                                <span className="text-sm sm:text-base font-normal font-japanese text-stone-500 dark:text-stone-400">
                                  {jp.secondaryText}
                                </span>
                              )}
                              <span className="text-xs font-mono text-stone-400 dark:text-stone-500">
                                ({item.romaji})
                              </span>
                            </div>
                          </div>

                          {/* Speaker Pronunciation Button */}
                          <button
                            onClick={() => speakJapanese(jp.reading || jp.standardSpelling)}
                            className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-stone-500 hover:text-rose-600 transition shrink-0 active:scale-95 shadow-xs"
                            title="Listen Pronunciation"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })()}

                    {/* English Meaning */}
                    <div className="text-sm sm:text-base font-bold text-stone-800 dark:text-stone-100 mt-2 leading-snug">
                      {item.english}
                    </div>

                    <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-500 font-mono mt-1.5">
                      {item.partOfSpeech}
                    </span>

                    {/* Example Sentence */}
                    {item.exampleSentence && (
                      <div className="mt-2.5 pt-2 border-t border-stone-200/60 dark:border-stone-800 text-xs">
                        <div className="flex items-center justify-between">
                          <p className="font-japanese text-stone-700 dark:text-stone-300 font-medium">
                            {item.exampleSentence.japanese}
                          </p>
                          <button
                            onClick={() => speakJapanese(item.exampleSentence?.japanese || '')}
                            className="p-1 text-stone-400 hover:text-red-500 shrink-0"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-stone-500 italic mt-0.5">
                          {item.exampleSentence.english}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Relearning Action Toolbar */}
                  <div className="pt-2.5 border-t border-stone-200/60 dark:border-stone-800 space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button
                        onClick={() => handleLaunchSingleFastRecall(item)}
                        className="py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-stone-950 font-black text-xs transition flex items-center justify-center gap-1.5 shadow-xs"
                        title="Fast Recall flashcard for this word"
                      >
                        <Zap className="w-3.5 h-3.5 fill-stone-950" />
                        <span>Fast Recall 🎴</span>
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(item.id, item.lessonNumber, 'learned')}
                        disabled={isUpdating}
                        className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Promote Learned ✓</span>
                      </button>
                    </div>

                    {/* Switch between Not Learned & Not Sure */}
                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span className="text-stone-400 font-medium">Re-learn Priority:</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleUpdateStatus(item.id, item.lessonNumber, 'not_learned')}
                          disabled={isUpdating}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition flex items-center gap-1 ${
                            isNotLearned
                              ? 'bg-rose-600 text-white shadow-xs'
                              : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
                          }`}
                        >
                          <X className="w-3 h-3" />
                          <span>Not Learned</span>
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(item.id, item.lessonNumber, 'not_sure')}
                          disabled={isUpdating}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition flex items-center gap-1 ${
                            !isNotLearned
                              ? 'bg-amber-600 text-white shadow-xs'
                              : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
                          }`}
                        >
                          <HelpCircle className="w-3 h-3" />
                          <span>Not Sure</span>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Flashcard Modal */}
      {flashcardModalOpen && (
        <MinnaFlashcardsModal
          title={customFlashcardItems ? `Fast Recall Flashcards (${customFlashcardItems.length} Words)` : `Re-learning Fast Recall (${filteredItems.length} Words)`}
          subtitle="Targeted Retention Session • Not Learned & Not Sure Pool"
          vocabularyList={customFlashcardItems || filteredItems}
          onClose={() => {
            setFlashcardModalOpen(false);
            setCustomFlashcardItems(null);
          }}
          onRefreshData={() => fetchRelearnVocab(true)}
        />
      )}

    </div>
  );
}

