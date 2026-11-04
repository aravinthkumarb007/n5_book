'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Layers, Search, Sparkles, Volume2, CheckCircle2,
  AlertTriangle, HelpCircle, X, Check, RefreshCw,
  BookOpen, Filter, ArrowRight, ShieldCheck, Loader2,
  Zap, CheckSquare, Square
} from 'lucide-react';
import { MarkedVocabItemWithMeta, VocabLearningStatus, VocabStatusFilter } from '@/types/minna';
import { speakJapanese } from '@/services/audio';
import { setVocabStatus, batchSetVocabStatus } from '@/services/vocabStorage';
import { ALL_MINNA_LESSONS } from '@/data/minnaNoNihongo';
import { MinnaFlashcardsModal } from './MinnaFlashcardsModal';
import { getJapaneseWordDisplay } from '@/utils/japaneseWordDisplay';

interface MarkedVocabBatchViewProps {
  onNavigateToMinna?: () => void;
  onNavigateToRelearn?: () => void;
}

export function MarkedVocabBatchView({
  onNavigateToMinna,
  onNavigateToRelearn
}: MarkedVocabBatchViewProps) {
  const [items, setItems] = useState<MarkedVocabItemWithMeta[]>([]);
  const [counts, setCounts] = useState({ total: 0, learned: 0, notSure: 0, notLearned: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Filters
  const [statusFilter, setStatusFilter] = useState<VocabStatusFilter>('all');
  const [selectedLessonFilter, setSelectedLessonFilter] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Flashcard Launcher state
  const [flashcardModalOpen, setFlashcardModalOpen] = useState(false);
  const [customFlashcardItems, setCustomFlashcardItems] = useState<MarkedVocabItemWithMeta[] | null>(null);

  // Batch Selection State
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Status update tracking
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

  const handleBatchSetStatus = async (status: VocabLearningStatus | null) => {
    if (selectedIds.size === 0) return;
    const count = selectedIds.size;
    const updates = items.filter(i => selectedIds.has(i.id)).map(i => ({
      vocabId: i.id,
      lessonNumber: i.lessonNumber,
      status
    }));

    if (!status) {
      setItems(prev => prev.filter(i => !selectedIds.has(i.id)));
    } else {
      setItems(prev => prev.map(i => selectedIds.has(i.id) ? { ...i, status, learningStatus: status } : i));
    }

    await batchSetVocabStatus(updates);
    setSelectedIds(new Set());

    if (status === 'not_sure' || status === 'not_learned') {
      setSaveNotice(`⚡ Added ${count} words to Re-learn section for Fast Recall!`);
    } else if (status === 'learned') {
      setSaveNotice(`✓ Marked ${count} words as Learned!`);
    } else {
      setSaveNotice(`Cleared status for ${count} words.`);
    }

    setTimeout(() => setSaveNotice(null), 3500);
    fetchMarkedVocab(true);
  };

  const handleStudySelectedInFlashcards = () => {
    const selected = items.filter(i => selectedIds.has(i.id));
    if (selected.length > 0) {
      setCustomFlashcardItems(selected);
      setFlashcardModalOpen(true);
    }
  };

  const fetchMarkedVocab = async (silent: boolean = false) => {
    if (!silent) setIsLoading(true);
    else setIsRefreshing(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/vocabulary/marked');
      const data = await res.json();

      if (data.success && Array.isArray(data.items)) {
        setItems(data.items);
        if (data.counts) {
          setCounts(data.counts);
        }
      } else {
        setErrorMessage(data.error || 'Failed to load marked vocabulary from database.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Network connection failed while fetching marked vocabulary.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMarkedVocab();

    // Re-fetch if another tab or component updates a status
    const handleStatusUpdate = () => {
      fetchMarkedVocab(true);
    };

    window.addEventListener('vocab-status-updated', handleStatusUpdate);
    return () => window.removeEventListener('vocab-status-updated', handleStatusUpdate);
  }, []);

  // Filtered Items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Status Filter
      if (statusFilter !== 'all' && statusFilter !== 'marked') {
        if (item.status !== statusFilter) return false;
      }

      // Lesson Filter
      if (selectedLessonFilter !== 'all') {
        if (item.lessonNumber !== selectedLessonFilter) return false;
      }

      // Search Query
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

  const handleUpdateStatus = async (vocabId: string, lessonNumber: number, newStatus: VocabLearningStatus | null) => {
    setUpdatingId(vocabId);

    // Optimistic UI update
    if (!newStatus) {
      setItems(prev => prev.filter(i => i.id !== vocabId));
      setCounts(prev => ({
        ...prev,
        total: Math.max(0, prev.total - 1)
      }));
    } else {
      setItems(prev => prev.map(i => i.id === vocabId ? { ...i, status: newStatus, learningStatus: newStatus } : i));
    }

    const res = await setVocabStatus(vocabId, lessonNumber, newStatus);
    setUpdatingId(null);

    if (res.success) {
      setSaveNotice(`✓ Vocabulary marked as "${newStatus ? newStatus.replace('_', ' ') : 'unmarked'}"`);
      setTimeout(() => setSaveNotice(null), 3000);
      fetchMarkedVocab(true);
    } else {
      setSaveNotice(`⚠ Error saving to database: ${res.error || 'Check connection'}`);
      setTimeout(() => setSaveNotice(null), 5000);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300 pb-16 w-full max-w-full min-w-0 overflow-x-hidden">

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-indigo-950 text-white p-6 sm:p-10 border border-stone-800 shadow-2xl w-full max-w-full min-w-0">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 -mb-10 w-64 h-64 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-600 text-white shadow-md flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> Batch Vocabulary Hub
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white/90 backdrop-blur-sm">
              Live Database Synchronized
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            マークされた語彙
            <span className="block text-lg sm:text-2xl lg:text-3xl font-bold text-stone-300 mt-1">
              Marked Vocabulary Batch Manager
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-2xl">
            Access and manage all vocabulary items you have marked across all Minna no Nihongo lessons in one unified batch.
            Review learning statuses, switch classifications, and launch instant flashcard sessions directly from your saved database records.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-2">
            <button
              onClick={() => setFlashcardModalOpen(true)}
              disabled={filteredItems.length === 0}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs sm:text-sm shadow-xl hover:from-red-700 hover:to-rose-700 active:scale-95 transition flex items-center justify-center gap-2 disabled:opacity-50 w-full sm:w-auto"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Study Batch in Flashcards ({filteredItems.length})</span>
            </button>

            {onNavigateToRelearn && (
              <button
                onClick={onNavigateToRelearn}
                className="px-5 py-3 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 font-bold text-xs sm:text-sm backdrop-blur-sm active:scale-95 transition flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Open Re-learning Page ({counts.notSure + counts.notLearned})</span>
              </button>
            )}

            <button
              onClick={() => fetchMarkedVocab(true)}
              disabled={isRefreshing}
              className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm backdrop-blur-sm border border-white/20 active:scale-95 transition flex items-center justify-center gap-2 w-full sm:w-auto"
              title="Refresh from Database"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Save Notification Banner */}
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

      {/* Stat Metric Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
        <div
          onClick={() => setStatusFilter('all')}
          className={`p-4 rounded-2xl border cursor-pointer transition shadow-sm ${
            statusFilter === 'all'
              ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 ring-2 ring-indigo-500/20'
              : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-stone-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Total Marked</span>
            <Layers className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white mt-1">
            {counts.total}
          </div>
          <div className="text-[11px] text-stone-500 mt-0.5">Across all lessons</div>
        </div>

        <div
          onClick={() => setStatusFilter('learned')}
          className={`p-4 rounded-2xl border cursor-pointer transition shadow-sm ${
            statusFilter === 'learned'
              ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 ring-2 ring-emerald-500/20'
              : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-stone-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Learned</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            {counts.learned}
          </div>
          <div className="text-[11px] text-stone-500 mt-0.5">Mastered vocabulary</div>
        </div>

        <div
          onClick={() => setStatusFilter('not_sure')}
          className={`p-4 rounded-2xl border cursor-pointer transition shadow-sm ${
            statusFilter === 'not_sure'
              ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/30 ring-2 ring-amber-500/20'
              : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-stone-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Not Sure</span>
            <HelpCircle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 mt-1">
            {counts.notSure}
          </div>
          <div className="text-[11px] text-stone-500 mt-0.5">Ambiguous / Uncertain</div>
        </div>

        <div
          onClick={() => setStatusFilter('not_learned')}
          className={`p-4 rounded-2xl border cursor-pointer transition shadow-sm ${
            statusFilter === 'not_learned'
              ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/30 ring-2 ring-rose-500/20'
              : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-stone-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">Not Learned</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400 mt-1">
            {counts.notLearned}
          </div>
          <div className="text-[11px] text-stone-500 mt-0.5">Needs study</div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 min-w-0 max-w-full">
        {/* Search */}
        <div className="relative flex-1 min-w-0 max-w-full lg:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search by hiragana, kanji, or meaning..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-wrap">
          {/* Lesson Range Selector */}
          <select
            value={selectedLessonFilter}
            onChange={(e) => setSelectedLessonFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="w-full sm:w-auto px-3 py-2 rounded-xl text-xs font-bold border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          >
            <option value="all">All Lessons (1–25)</option>
            {ALL_MINNA_LESSONS.map(l => (
              <option key={l.id} value={l.lessonNumber}>
                Lesson {l.lessonNumber}: {l.title}
              </option>
            ))}
          </select>

          {/* Status Pills */}
          <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl overflow-x-auto max-w-full">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                statusFilter === 'all' ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs' : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              All ({counts.total})
            </button>
            <button
              onClick={() => setStatusFilter('learned')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                statusFilter === 'learned' ? 'bg-emerald-600 text-white shadow-xs' : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              Learned ({counts.learned})
            </button>
            <button
              onClick={() => setStatusFilter('not_sure')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                statusFilter === 'not_sure' ? 'bg-amber-600 text-white shadow-xs' : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              Not Sure ({counts.notSure})
            </button>
            <button
              onClick={() => setStatusFilter('not_learned')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                statusFilter === 'not_learned' ? 'bg-rose-600 text-white shadow-xs' : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              Not Learned ({counts.notLearned})
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <div className="p-16 text-center space-y-3 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
          <p className="text-xs font-bold text-stone-500">
            Fetching marked vocabulary from backend database...
          </p>
        </div>
      ) : errorMessage ? (
        <div className="p-8 text-center space-y-3 bg-rose-50 dark:bg-rose-950/30 rounded-3xl border border-rose-200 dark:border-rose-900 shadow-sm">
          <AlertTriangle className="w-8 h-8 text-rose-600 mx-auto" />
          <h3 className="font-bold text-sm text-rose-800 dark:text-rose-200">{errorMessage}</h3>
          <button
            onClick={() => fetchMarkedVocab()}
            className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition"
          >
            Retry Connection
          </button>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="p-12 text-center space-y-4 bg-white dark:bg-stone-900 rounded-3xl border border-dashed border-stone-300 dark:border-stone-800 shadow-sm max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-white">
              No Marked Vocabulary Matches
            </h3>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              {items.length === 0
                ? 'You have not marked any vocabulary yet. As you study lessons and flashcards, mark items as Learned, Not Sure, or Not Learned to view them here!'
                : 'No marked vocabulary matches the selected status or lesson filter.'}
            </p>
          </div>

          {items.length === 0 && onNavigateToMinna && (
            <button
              onClick={onNavigateToMinna}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition shadow-md inline-flex items-center gap-1.5"
            >
              <span>Explore Minna Lessons</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 text-xs text-stone-500">
            <span>
              Showing <strong className="text-stone-900 dark:text-white">{filteredItems.length}</strong> marked vocabulary items
            </span>

            <div className="flex items-center gap-3">
              <button
                onClick={selectAllFiltered}
                className="text-xs font-bold text-stone-600 dark:text-stone-300 hover:text-indigo-600 flex items-center gap-1.5"
              >
                {selectedIds.size === filteredItems.length && filteredItems.length > 0 ? (
                  <CheckSquare className="w-4 h-4 text-indigo-600" />
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
                <ShieldCheck className="w-3.5 h-3.5" /> Database verified
              </span>
            </div>
          </div>

          {/* Batch Actions Ribbon */}
          {selectedIds.size > 0 && (
            <div className="p-3 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900 to-indigo-950 text-white flex flex-wrap items-center justify-between gap-3 shadow-md animate-fadeIn border border-stone-800">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-mono font-black text-xs flex items-center justify-center">
                  {selectedIds.size}
                </span>
                <span className="text-xs font-bold">
                  words selected for batch action
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => handleBatchSetStatus('not_sure')}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-xs transition flex items-center gap-1.5 shadow-sm active:scale-95"
                >
                  <Zap className="w-3.5 h-3.5 fill-stone-950" />
                  <span>Add Batch to Re-learn (Fast Recall)</span>
                </button>

                <button
                  onClick={() => handleBatchSetStatus('learned')}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-sm active:scale-95"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Mark Selected as Learned</span>
                </button>

                <button
                  onClick={handleStudySelectedInFlashcards}
                  className="px-3.5 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs backdrop-blur-sm transition flex items-center gap-1.5 active:scale-95"
                >
                  <Layers className="w-3.5 h-3.5 text-amber-300" />
                  <span>Study Selected ({selectedIds.size})</span>
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
              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 shadow-sm ${
                    item.status === 'learned'
                      ? 'border-emerald-200 dark:border-emerald-900/60 bg-white dark:bg-stone-900 hover:border-emerald-400'
                      : item.status === 'not_sure'
                      ? 'border-amber-200 dark:border-amber-900/60 bg-white dark:bg-stone-900 hover:border-amber-400'
                      : 'border-rose-200 dark:border-rose-900/60 bg-white dark:bg-stone-900 hover:border-rose-400'
                  }`}
                >
                  {/* Top Word Bar */}
                  <div>
                    {/* Top Row: Checkbox, Status Badges & Lesson Badge */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <button
                          onClick={() => toggleSelectId(item.id)}
                          className="p-1 -ml-1 text-stone-400 hover:text-indigo-600 transition shrink-0"
                          title={selectedIds.has(item.id) ? 'Deselect' : 'Select for batch action'}
                        >
                          {selectedIds.has(item.id) ? (
                            <CheckSquare className="w-4 h-4 text-indigo-600" />
                          ) : (
                            <Square className="w-4 h-4 text-stone-300 dark:text-stone-600" />
                          )}
                        </button>

                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 shrink-0">
                          Lesson {item.lessonNumber}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
                        {(item.status === 'not_sure' || item.status === 'not_learned') && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 flex items-center gap-1 shadow-xs">
                            <Zap className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                            <span>In Re-learn</span>
                          </span>
                        )}

                        {item.status === 'learned' && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1 shadow-xs">
                            <Check className="w-2.5 h-2.5 text-emerald-500" />
                            <span>Learned</span>
                          </span>
                        )}
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
                            className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-stone-500 hover:text-indigo-600 transition shrink-0 active:scale-95 shadow-xs"
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
                      <div className="mt-2.5 pt-2 border-t border-stone-100 dark:border-stone-800 text-xs">
                        <div className="flex items-center justify-between">
                          <p className="font-japanese text-stone-700 dark:text-stone-300 font-medium line-clamp-1">
                            {item.exampleSentence.japanese}
                          </p>
                          <button
                            onClick={() => speakJapanese(item.exampleSentence?.japanese || '')}
                            className="p-1 text-stone-400 hover:text-red-500"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-stone-500 italic line-clamp-1">
                          {item.exampleSentence.english}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Status Toggle Bar */}
                  <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-1 flex-wrap">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                      Status:
                    </span>

                    <div className="flex items-center gap-1 flex-wrap">
                      <button
                        onClick={() => handleUpdateStatus(item.id, item.lessonNumber, 'not_learned')}
                        disabled={isUpdating}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition flex items-center gap-1 active:scale-95 ${
                          item.status === 'not_learned'
                            ? 'bg-rose-600 text-white shadow-xs'
                            : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
                        }`}
                        title="Mark Not Learned"
                      >
                        <X className="w-3 h-3" /> Not Learned
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(item.id, item.lessonNumber, 'not_sure')}
                        disabled={isUpdating}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition flex items-center gap-1 active:scale-95 ${
                          item.status === 'not_sure'
                            ? 'bg-amber-600 text-white shadow-xs ring-1 ring-amber-400/50'
                            : 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 hover:bg-amber-100 border border-amber-200 dark:border-amber-800'
                        }`}
                        title="Add to Re-learn Hub for fast recall"
                      >
                        <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span>Re-learn (2)</span>
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(item.id, item.lessonNumber, 'learned')}
                        disabled={isUpdating}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition flex items-center gap-1 active:scale-95 ${
                          item.status === 'learned'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
                        }`}
                        title="Mark Learned"
                      >
                        <Check className="w-3 h-3" /> Learned
                      </button>
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
          title={customFlashcardItems ? `Batch Flashcards (${customFlashcardItems.length} Words)` : `Batch Flashcards (${filteredItems.length} Words)`}
          subtitle={`Marked Vocabulary Deck • Status: ${statusFilter.replace('_', ' ')}`}
          vocabularyList={customFlashcardItems || filteredItems}
          onClose={() => {
            setFlashcardModalOpen(false);
            setCustomFlashcardItems(null);
          }}
          onRefreshData={() => fetchMarkedVocab(true)}
        />
      )}

    </div>
  );
}

