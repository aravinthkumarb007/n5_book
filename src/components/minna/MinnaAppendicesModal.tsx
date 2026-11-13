'use client';

import React, { useState, useMemo } from 'react';
import { 
  MINNA_PARTICLES_SUMMARY, 
  MINNA_COUNTERS_TABLE, 
  MINNA_VERBS_CONJUGATION_TABLE,
  ParticleSummaryItem,
  CounterEntry,
  VerbConjugationEntry
} from '@/data/minnaNoNihongo/appendices';

interface MinnaAppendicesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'particles' | 'verbs' | 'counters' | 'overview';

export const MinnaAppendicesModal: React.FC<MinnaAppendicesModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('particles');
  const [searchQuery, setSearchQuery] = useState('');
  const [verbGroupFilter, setVerbGroupFilter] = useState<'ALL' | 'I' | 'II' | 'III'>('ALL');

  // Filter particles
  const filteredParticles = useMemo(() => {
    if (!searchQuery.trim()) return MINNA_PARTICLES_SUMMARY;
    const q = searchQuery.toLowerCase();
    return MINNA_PARTICLES_SUMMARY.filter(p => 
      p.particle.toLowerCase().includes(q) ||
      p.usages.some(u => 
        u.category.toLowerCase().includes(q) || 
        u.description.toLowerCase().includes(q) ||
        u.examples.some(e => e.ja.includes(q) || e.en.toLowerCase().includes(q))
      )
    );
  }, [searchQuery]);

  // Filter verbs
  const filteredVerbs = useMemo(() => {
    return MINNA_VERBS_CONJUGATION_TABLE.filter(v => {
      if (verbGroupFilter !== 'ALL' && v.group !== verbGroupFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          v.dictionary.toLowerCase().includes(q) ||
          v.masu.toLowerCase().includes(q) ||
          v.te.toLowerCase().includes(q) ||
          v.nai.toLowerCase().includes(q) ||
          v.ta.toLowerCase().includes(q) ||
          v.meaning.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [searchQuery, verbGroupFilter]);

  // Filter counters
  const filteredCounters = useMemo(() => {
    if (!searchQuery.trim()) return MINNA_COUNTERS_TABLE;
    const q = searchQuery.toLowerCase();
    return MINNA_COUNTERS_TABLE.filter(c =>
      c.counter.toLowerCase().includes(q) ||
      c.kanji.includes(q) ||
      c.usage.toLowerCase().includes(q) ||
      c.items.some(i => i.reading.includes(q) || i.romaji.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-5xl max-h-[96vh] sm:max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-3.5 sm:p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Official Textbook Reference (付録 & まとめ)
              </span>
              <span className="text-[11px] sm:text-xs text-slate-400 hidden sm:inline">Minna no Nihongo I (3A Corporation)</span>
            </div>
            <h2 className="text-base sm:text-2xl font-bold text-white mt-1 flex items-center gap-1.5 sm:gap-2">
              📖 Grammar & Linguistic Master Appendices
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation & Search */}
        <div className="p-3 sm:p-4 border-b border-slate-800 bg-slate-900/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 shrink-0">
          <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none pb-1 sm:pb-0 max-w-full">
            <button
              onClick={() => { setActiveTab('particles'); setSearchQuery(''); }}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all shrink-0 ${
                activeTab === 'particles'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              🏷️ 助詞まとめ (Particles)
            </button>
            <button
              onClick={() => { setActiveTab('verbs'); setSearchQuery(''); }}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all shrink-0 ${
                activeTab === 'verbs'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              🔄 動詞活用表 (Verbs Table)
            </button>
            <button
              onClick={() => { setActiveTab('counters'); setSearchQuery(''); }}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all shrink-0 ${
                activeTab === 'counters'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              🔢 助数詞一覧 (Counters)
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search reference..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: PARTICLES SUMMARY */}
          {activeTab === 'particles' && (
            <div className="space-y-4">
              <div className="p-3 bg-indigo-950/30 border border-indigo-900/50 rounded-xl text-xs text-indigo-300">
                💡 Reference from Textbook Summary Lesson I (Pages 183–186). Systematically organizes all particle functions across Lessons 1 to 25.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredParticles.map((item, idx) => (
                  <div key={idx} className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-all">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-3">
                      <span className="text-xl font-bold text-amber-400 font-mono">[{item.particle}]</span>
                      <span className="text-xs text-slate-400">{item.usages.length} usage patterns</span>
                    </div>

                    <div className="space-y-3">
                      {item.usages.map((usage, uIdx) => (
                        <div key={uIdx} className="bg-slate-900/60 p-3 rounded-lg border border-slate-800/50 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-emerald-400">{usage.category}</span>
                            <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">L.{usage.lesson}</span>
                          </div>
                          <p className="text-xs text-slate-300">{usage.description}</p>
                          <div className="space-y-1 pt-1 border-t border-slate-800/40">
                            {usage.examples.map((ex, exIdx) => (
                              <div key={exIdx} className="text-xs">
                                <div className="text-slate-200 font-japanese font-medium">{ex.ja}</div>
                                <div className="text-slate-400 text-[11px] italic">{ex.en}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: VERB CONJUGATION MASTER TABLE */}
          {activeTab === 'verbs' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-300">
                  Total Verbs: <span className="font-bold text-indigo-400">{filteredVerbs.length}</span> (Textbook Appendix V, Pages 198–209)
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-400 mr-1">Group:</span>
                  {(['ALL', 'I', 'II', 'III'] as const).map(g => (
                    <button
                      key={g}
                      onClick={() => setVerbGroupFilter(g)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                        verbGroupFilter === g
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {g === 'ALL' ? 'All Groups' : `Group ${g}`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-800 shadow-md">
                <table className="w-full text-left text-xs text-slate-300 border-collapse">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider font-semibold border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-3">Meaning / English</th>
                      <th className="py-3 px-3">Dictionary (辞書形)</th>
                      <th className="py-3 px-3">Masu (ます形)</th>
                      <th className="py-3 px-3">Te (て形)</th>
                      <th className="py-3 px-3">Nai (ない形)</th>
                      <th className="py-3 px-3">Ta (た形)</th>
                      <th className="py-3 px-2 text-center">Grp</th>
                      <th className="py-3 px-2 text-center">Lsn</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                    {filteredVerbs.map((v, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-2.5 px-3 font-medium text-white">{v.meaning}</td>
                        <td className="py-2.5 px-3 font-japanese text-amber-300 font-semibold">{v.dictionary}</td>
                        <td className="py-2.5 px-3 font-japanese text-emerald-300">{v.masu}</td>
                        <td className="py-2.5 px-3 font-japanese text-cyan-300">{v.te}</td>
                        <td className="py-2.5 px-3 font-japanese text-rose-300">{v.nai}</td>
                        <td className="py-2.5 px-3 font-japanese text-indigo-300">{v.ta}</td>
                        <td className="py-2.5 px-2 text-center">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            v.group === 'I' ? 'bg-amber-950 text-amber-400 border border-amber-800/40' :
                            v.group === 'II' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40' :
                            'bg-purple-950 text-purple-400 border border-purple-800/40'
                          }`}>
                            {v.group}
                          </span>
                        </td>
                        <td className="py-2.5 px-2 text-center text-slate-400 text-[11px]">
                          {v.lesson}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: COUNTERS MASTER CHART */}
          {activeTab === 'counters' && (
            <div className="space-y-4">
              <div className="p-3 bg-emerald-950/30 border border-emerald-900/50 rounded-xl text-xs text-emerald-300">
                💡 Complete Counters Table from Textbook Appendix IV (Pages 196–197). Includes euphonic changes (e.g. 1本 = いっぽん, 3本 = さんぼん, 1杯 = いっぱい).
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCounters.map((counter, idx) => (
                  <div key={idx} className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-all">
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                        <span className="text-lg font-bold text-emerald-400 font-japanese">{counter.kanji}</span>
                        <span className="text-xs text-slate-400 font-mono">Q: {counter.questionWord}</span>
                      </div>
                      <p className="text-xs text-slate-300 mb-3 font-medium">{counter.usage}</p>

                      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs bg-slate-900/70 p-2.5 rounded-lg border border-slate-800/50">
                        {counter.items.map(item => (
                          <div key={item.count} className="flex items-center justify-between py-0.5">
                            <span className="text-slate-400 font-mono text-[11px]">{item.count}:</span>
                            <span className="font-japanese text-slate-200 font-semibold">{item.reading}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left shrink-0">
          <span className="text-[11px] sm:text-xs text-slate-400">
            Source: Minna no Nihongo Shokyu I (スリーエーネットワーク 3A Corporation)
          </span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-medium transition-colors"
          >
            Close Reference
          </button>
        </div>
      </div>
    </div>
  );
};
