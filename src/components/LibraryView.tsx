'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, BookOpen, Volume2, CheckCircle2, 
  AlertTriangle, Lock, Eye, Download, Printer, ArrowUpDown
} from 'lucide-react';
import { KanjiRecord, UserKanjiProgress } from '@/types/kanji';
import { AudioButton } from './AudioButton';

interface LibraryViewProps {
  kanjiList: KanjiRecord[];
  progressMap: Record<number, UserKanjiProgress>;
  onSelectKanji: (kanji: KanjiRecord) => void;
}

export function LibraryView({
  kanjiList,
  progressMap,
  onSelectKanji
}: LibraryViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<number | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'number' | 'strokes' | 'meaning'>('number');

  const filteredKanji = useMemo(() => {
    return kanjiList.filter(k => {
      // Level filter
      if (selectedLevel !== 'all' && k.level !== selectedLevel) return false;

      // Status filter
      const p = progressMap[k.id];
      const status = p ? p.learning_status : 'locked';
      if (selectedStatus === 'learned' && status !== 'learned') return false;
      if (selectedStatus === 'learning' && status !== 'learning') return false;
      if (selectedStatus === 'weak' && status !== 'needs_revision') return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesChar = k.character.includes(q);
        const matchesMeaning = k.meaning.toLowerCase().includes(q);
        const matchesHiragana = k.hiragana_reading.includes(q);
        const matchesOnyomi = k.onyomi_readings.some(o => o.includes(q) || o.toLowerCase().includes(q));
        const matchesKunyomi = k.kunyomi_readings.some(u => u.includes(q) || u.toLowerCase().includes(q));
        const matchesRomaji = k.onyomi_romaji.concat(k.kunyomi_romaji).some(r => r.toLowerCase().includes(q));
        const matchesVocab = k.vocabulary.some(v => v.word.includes(q) || v.meaning.toLowerCase().includes(q));

        if (!matchesChar && !matchesMeaning && !matchesHiragana && !matchesOnyomi && !matchesKunyomi && !matchesRomaji && !matchesVocab) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'number') return a.kanji_number - b.kanji_number;
      if (sortBy === 'strokes') return a.stroke_count - b.stroke_count;
      if (sortBy === 'meaning') return a.meaning.localeCompare(b.meaning);
      return 0;
    });
  }, [kanjiList, progressMap, selectedLevel, selectedStatus, searchQuery, sortBy]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-red-950 text-white p-6 md:p-8 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            120 N5 Kanji Master Library
          </h1>
          <p className="text-stone-300 text-sm mt-1 max-w-xl">
            Complete searchable dictionary with verified Onyomi, Kunyomi, stroke counts, radicals, and vocabulary words.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition border border-white/20 flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            Print / Export Sheet
          </button>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-4 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search kanji, meaning, readings, vocab (e.g. 火, fire, カ, ひ)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/60 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full md:w-auto">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="flex-1 sm:flex-none px-2.5 sm:px-3 py-2 text-xs font-semibold rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-200 focus:outline-none"
            >
              <option value="all">All 12 Levels</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((lvl) => (
                <option key={lvl} value={lvl}>Level {lvl}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="flex-1 sm:flex-none px-2.5 sm:px-3 py-2 text-xs font-semibold rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-200 focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="learned">Mastered</option>
              <option value="learning">In Progress</option>
              <option value="weak">Revision</option>
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="flex-1 sm:flex-none px-2.5 sm:px-3 py-2 text-xs font-semibold rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-200 focus:outline-none"
            >
              <option value="number">Sort by #</option>
              <option value="strokes">Strokes</option>
              <option value="meaning">A-Z</option>
            </select>
          </div>
        </div>

        <div className="text-xs text-stone-500 dark:text-stone-400 font-medium pt-1">
          Showing <strong>{filteredKanji.length}</strong> of 120 Kanji
        </div>
      </div>

      {/* Kanji Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filteredKanji.map((k) => {
          const prog = progressMap[k.id];
          const isLearned = prog?.learning_status === 'learned';
          const isWeak = prog?.learning_status === 'needs_revision';

          return (
            <div
              key={k.id}
              onClick={() => onSelectKanji(k)}
              className="group cursor-pointer p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-red-500 hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] text-stone-400 font-mono mb-1">
                  <span>#{k.kanji_number}</span>
                  {isLearned ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  ) : isWeak ? (
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                  ) : null}
                </div>

                <div className="text-center py-2">
                  <span className="font-japanese text-4xl font-black text-stone-900 dark:text-white group-hover:scale-105 transition-transform inline-block">
                    {k.character}
                  </span>
                </div>

                <div className="text-center mt-1">
                  <p className="font-bold text-xs text-stone-800 dark:text-stone-100 truncate">
                    {k.meaning}
                  </p>
                  <p className="font-japanese text-[11px] text-red-600 dark:text-red-400 truncate mt-0.5">
                    {k.onyomi_readings[0] || '—'}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[10px] text-stone-400">
                <span>{k.stroke_count} strokes</span>
                <span className="text-stone-500 font-medium">Lvl {k.level}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
