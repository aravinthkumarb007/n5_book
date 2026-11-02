'use client';

import React, { useState } from 'react';
import {
  Volume2, CheckCircle2, Circle, AlertCircle, BookOpen,
  MessageSquare, Sparkles, ChevronRight, Check, Trophy, Zap, ArrowRight
} from 'lucide-react';
import { MinnaLesson } from '@/types/minna';
import { speakJapanese } from '@/services/audio';
import { toggleVocabLearned, toggleGrammarUnderstood } from '@/services/minnaStorage';

interface MinnaLessonDetailModalProps {
  lesson: MinnaLesson;
  learnedVocabIds: string[];
  understoodGrammarIds: string[];
  onClose: () => void;
  onLaunchLessonQuiz: (lesson: MinnaLesson) => void;
  onRefreshProgress: () => void;
}

export function MinnaLessonDetailModal({
  lesson,
  learnedVocabIds,
  understoodGrammarIds,
  onClose,
  onLaunchLessonQuiz,
  onRefreshProgress
}: MinnaLessonDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'vocab' | 'grammar' | 'dialogue' | 'exercises' | 'assessment'>('vocab');
  const [vocabSearch, setVocabSearch] = useState('');
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);
  const [userExerciseAnswers, setUserExerciseAnswers] = useState<Record<string, string>>({});
  const [exerciseEvaluations, setExerciseEvaluations] = useState<Record<string, boolean>>({});
  const [activeTiles, setActiveTiles] = useState<Record<string, string[]>>({});

  const filteredVocab = lesson.vocabulary.filter(v =>
    v.kanji.toLowerCase().includes(vocabSearch.toLowerCase()) ||
    v.hiragana.toLowerCase().includes(vocabSearch.toLowerCase()) ||
    v.english.toLowerCase().includes(vocabSearch.toLowerCase()) ||
    v.romaji.toLowerCase().includes(vocabSearch.toLowerCase())
  );

  const vocabProgressPercent = lesson.vocabulary.length > 0
    ? Math.round((lesson.vocabulary.filter(v => learnedVocabIds.includes(v.id)).length / lesson.vocabulary.length) * 100)
    : 0;

  const grammarProgressPercent = lesson.grammar.length > 0
    ? Math.round((lesson.grammar.filter(g => understoodGrammarIds.includes(g.id)).length / lesson.grammar.length) * 100)
    : 0;

  const handleToggleVocab = (vocabId: string) => {
    toggleVocabLearned(lesson.lessonNumber, vocabId);
    onRefreshProgress();
  };

  const handleToggleGrammar = (grammarId: string) => {
    toggleGrammarUnderstood(lesson.lessonNumber, grammarId);
    onRefreshProgress();
  };

  const handleTileClick = (exId: string, tile: string) => {
    const current = activeTiles[exId] || [];
    const next = [...current, tile];
    setActiveTiles({ ...activeTiles, [exId]: next });
    setUserExerciseAnswers({ ...userExerciseAnswers, [exId]: next.join(' ') });
  };

  const handleRemoveTile = (exId: string, index: number) => {
    const current = activeTiles[exId] || [];
    const next = current.filter((_, i) => i !== index);
    setActiveTiles({ ...activeTiles, [exId]: next });
    setUserExerciseAnswers({ ...userExerciseAnswers, [exId]: next.join(' ') });
  };

  const checkExerciseAnswer = (exId: string, correctAns: string) => {
    const userAns = (userExerciseAnswers[exId] || '').trim();
    const isCorrect = userAns.replace(/\s+/g, '') === correctAns.replace(/\s+/g, '');
    setExerciseEvaluations({ ...exerciseEvaluations, [exId]: isCorrect });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-4 bg-stone-950/70 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white dark:bg-stone-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 flex flex-col max-h-[96vh] sm:max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-5 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider bg-white/20">
                Lesson {lesson.lessonNumber} • JLPT {lesson.level}
              </span>
              <span className="text-xs text-white/90 font-japanese font-medium truncate">
                {lesson.titleJapanese}
              </span>
            </div>
            <h2 className="text-base sm:text-2xl font-black text-white truncate">{lesson.title}</h2>
            <p className="text-xs text-white/80 max-w-2xl mt-0.5 leading-relaxed line-clamp-1 sm:line-clamp-2 hidden xs:block">
              {lesson.description}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onLaunchLessonQuiz(lesson)}
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white text-red-600 font-bold text-xs sm:text-sm rounded-xl shadow-lg hover:bg-stone-50 active:scale-95 transition flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
              <span>Test</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-xl bg-black/20 hover:bg-black/30 text-white transition"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tab Bar & Progress Header (Horizontally scrollable on mobile) */}
        <div className="px-3 sm:px-6 py-2.5 sm:py-3 border-b border-stone-200 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-950/50 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-1.5 bg-stone-200/80 dark:bg-stone-800 p-1 rounded-2xl overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('vocab')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                activeTab === 'vocab'
                  ? 'bg-white dark:bg-stone-900 text-red-600 dark:text-red-400 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Vocab ({lesson.vocabulary.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('grammar')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                activeTab === 'grammar'
                  ? 'bg-white dark:bg-stone-900 text-red-600 dark:text-red-400 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Grammar ({lesson.grammar.length})</span>
            </button>
            {lesson.dialogue && (
              <button
                onClick={() => setActiveTab('dialogue')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                  activeTab === 'dialogue'
                    ? 'bg-white dark:bg-stone-900 text-red-600 dark:text-red-400 shadow-sm'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Dialogue</span>
              </button>
            )}
            <button
              onClick={() => setActiveTab('exercises')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                activeTab === 'exercises'
                  ? 'bg-white dark:bg-stone-900 text-red-600 dark:text-red-400 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Exercises ({lesson.exercises.length})
            </button>
            <button
              onClick={() => setActiveTab('assessment')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'assessment'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <Trophy className={`w-3.5 h-3.5 ${activeTab === 'assessment' ? 'text-amber-300' : 'text-amber-500'}`} />
              Assessment
            </button>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-stone-500">
            <div className="flex items-center gap-2">
              <span>Vocab:</span>
              <div className="w-20 h-2 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${vocabProgressPercent}%` }} />
              </div>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{vocabProgressPercent}%</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Grammar:</span>
              <div className="w-20 h-2 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${grammarProgressPercent}%` }} />
              </div>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{grammarProgressPercent}%</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          
          {/* TAB 1: VOCABULARY */}
          {activeTab === 'vocab' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <input
                  type="text"
                  placeholder="Filter vocabulary by kanji, hiragana, or meaning..."
                  value={vocabSearch}
                  onChange={(e) => setVocabSearch(e.target.value)}
                  className="w-full sm:max-w-md px-4 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <span className="text-xs text-stone-500 shrink-0">
                  Showing {filteredVocab.length} words
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredVocab.map((v) => {
                  const isLearned = learnedVocabIds.includes(v.id);
                  return (
                    <div
                      key={v.id}
                      className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between gap-2.5 ${
                        isLearned
                          ? 'border-emerald-300 dark:border-emerald-800/60 bg-emerald-50/40 dark:bg-emerald-950/20'
                          : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40 hover:border-red-300 dark:hover:border-red-900/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-2 flex-1 min-w-0">
                          <span className="text-lg sm:text-xl font-black font-japanese text-stone-900 dark:text-white">
                            {v.kanji}
                          </span>
                          <span className="text-xs text-stone-500 font-japanese font-medium">
                            {v.hiragana}
                          </span>
                          <span className="text-[11px] text-stone-400 font-mono">
                            ({v.romaji})
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => speakJapanese(v.kanji || v.hiragana)}
                            className="p-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-500 transition"
                            title="Listen Pronunciation"
                          >
                            <Volume2 className="w-4 h-4 text-red-500" />
                          </button>
                          <button
                            onClick={() => handleToggleVocab(v.id)}
                            className={`p-1.5 rounded-lg transition ${
                              isLearned
                                ? 'bg-emerald-500 text-white shadow-sm'
                                : 'bg-stone-200 dark:bg-stone-700 text-stone-400 hover:text-stone-600'
                            }`}
                            title={isLearned ? 'Learned' : 'Mark as Learned'}
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-stone-800 dark:text-stone-200">
                          {v.english}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300 font-mono">
                          {v.partOfSpeech}
                        </span>
                      </div>

                      {v.exampleSentence && (
                        <div className="mt-1 pt-2 border-t border-stone-200 dark:border-stone-800/60 text-xs">
                          <div className="flex items-center justify-between">
                            <p className="font-japanese text-stone-700 dark:text-stone-300 font-medium">
                              {v.exampleSentence.japanese}
                            </p>
                            <button
                              onClick={() => speakJapanese(v.exampleSentence?.japanese || '')}
                              className="text-stone-400 hover:text-red-500 p-1"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-[11px] text-stone-500 italic mt-0.5">
                            {v.exampleSentence.english}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: GRAMMAR */}
          {activeTab === 'grammar' && (
            <div className="space-y-4">
              {lesson.grammar.map((g, idx) => {
                const isUnderstood = understoodGrammarIds.includes(g.id);
                return (
                  <div
                    key={g.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      isUnderstood
                        ? 'border-blue-300 dark:border-blue-800/60 bg-blue-50/30 dark:bg-blue-950/20'
                        : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-mono font-bold text-[10px] flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <h3 className="text-base sm:text-lg font-black text-stone-900 dark:text-white">
                            {g.title}
                          </h3>
                        </div>
                        <div className="inline-block px-3 py-1 rounded-lg bg-stone-200 dark:bg-stone-800 text-xs font-mono font-bold text-red-600 dark:text-red-400 mt-1">
                          {g.structure}
                        </div>
                      </div>

                      <button
                        onClick={() => handleToggleGrammar(g.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                          isUnderstood
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-300'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        {isUnderstood ? 'Understood' : 'Mark Understood'}
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed mb-3">
                      {g.explanation}
                    </p>

                    {g.rules && g.rules.length > 0 && (
                      <div className="mb-3 space-y-1 bg-white/70 dark:bg-stone-900/70 p-3 rounded-xl border border-stone-200 dark:border-stone-800 text-xs">
                        <span className="font-bold text-stone-600 dark:text-stone-400 block mb-1">
                          Key Rules:
                        </span>
                        {g.rules.map((rule, rIdx) => (
                          <div key={rIdx} className="flex items-start gap-2 text-stone-700 dark:text-stone-300">
                            <span className="text-red-500 font-bold">•</span>
                            <span>{rule}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {g.examples && g.examples.length > 0 && (
                      <div className="space-y-2 mt-3 pt-3 border-t border-stone-200 dark:border-stone-800/80">
                        <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                          Examples
                        </span>
                        <div className="space-y-2">
                          {g.examples.map((eg, eIdx) => (
                            <div
                              key={eIdx}
                              className="p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 flex items-center justify-between gap-3 text-xs"
                            >
                              <div>
                                <div className="font-japanese font-bold text-stone-900 dark:text-stone-100">
                                  {eg.japanese}
                                </div>
                                <div className="text-[11px] text-stone-500 italic mt-0.5">
                                  {eg.english}
                                </div>
                              </div>
                              <button
                                onClick={() => speakJapanese(eg.japanese)}
                                className="p-1.5 rounded-lg text-stone-400 hover:text-red-500 hover:bg-stone-100 dark:hover:bg-stone-800"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {g.commonMistakes && g.commonMistakes.length > 0 && (
                      <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold">Common Pitfall: </span>
                          {g.commonMistakes.join(' ')}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 3: DIALOGUE */}
          {activeTab === 'dialogue' && lesson.dialogue && (
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-red-500/10 border border-amber-500/20">
                <h3 className="font-black text-sm text-stone-900 dark:text-white mb-1">
                  {lesson.dialogue.title}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 italic">
                  Situation: {lesson.dialogue.situation}
                </p>
              </div>

              <div className="space-y-3">
                {lesson.dialogue.lines.map((line, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-800 flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-600 text-white font-mono">
                          {line.speaker}
                        </span>
                        <span className="text-sm font-bold font-japanese text-stone-900 dark:text-white">
                          {line.japanese}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 font-japanese">
                        {line.hiragana}
                      </p>
                      <p className="text-xs text-stone-700 dark:text-stone-300 italic">
                        "{line.english}"
                      </p>
                    </div>

                    <button
                      onClick={() => speakJapanese(line.japanese)}
                      className="p-2 rounded-xl text-stone-400 hover:text-red-500 hover:bg-stone-200 dark:hover:bg-stone-700 transition shrink-0"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: EXERCISES */}
          {activeTab === 'exercises' && (
            <div className="space-y-4">
              {lesson.exercises.map((ex, idx) => {
                const userAns = userExerciseAnswers[ex.id] || '';
                const isEvaluated = ex.id in exerciseEvaluations;
                const isCorrect = exerciseEvaluations[ex.id];

                return (
                  <div
                    key={ex.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isEvaluated
                        ? isCorrect
                          ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/20'
                          : 'border-red-300 dark:border-red-800 bg-red-50/30 dark:bg-red-950/20'
                        : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300">
                        Exercise {idx + 1} • {ex.type.replace('_', ' ')}
                      </span>
                      {isEvaluated && (
                        <span className={`text-xs font-bold flex items-center gap-1 ${
                          isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                        </span>
                      )}
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white mb-2">
                      {ex.prompt}
                    </h4>

                    {ex.contextSentence && (
                      <div className="p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 mb-3 font-japanese font-bold text-sm text-stone-800 dark:text-stone-200">
                        {ex.contextSentence}
                      </div>
                    )}

                    {/* Word Tiles for Sentence Formation */}
                    {ex.type === 'sentence_formation' && ex.wordTiles && (
                      <div className="space-y-3 mb-3">
                        <div className="min-h-12 p-2 rounded-xl border border-dashed border-stone-300 dark:border-stone-700 bg-white/50 dark:bg-stone-900/50 flex flex-wrap gap-1.5 items-center">
                          {(activeTiles[ex.id] || []).length === 0 ? (
                            <span className="text-xs text-stone-400 italic">
                              Click tiles below to arrange the sentence...
                            </span>
                          ) : (
                            (activeTiles[ex.id] || []).map((tile, tIdx) => (
                              <button
                                key={tIdx}
                                onClick={() => handleRemoveTile(ex.id, tIdx)}
                                className="px-2.5 py-1 rounded-lg bg-red-600 text-white font-japanese font-bold text-xs shadow-sm hover:bg-red-700 transition"
                              >
                                {tile} ✕
                              </button>
                            ))
                          )}
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {ex.wordTiles.map((tile, tIdx) => (
                            <button
                              key={tIdx}
                              onClick={() => handleTileClick(ex.id, tile)}
                              className="px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 hover:border-red-500 font-japanese font-bold text-xs transition"
                            >
                              {tile}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Options for MCQ / Fill Blank */}
                    {ex.options && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                        {ex.options.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            onClick={() => setUserExerciseAnswers({ ...userExerciseAnswers, [ex.id]: opt })}
                            className={`p-2.5 rounded-xl border text-left text-xs font-medium transition ${
                              userAns === opt
                                ? 'border-red-600 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-bold'
                                : 'border-stone-200 dark:border-stone-800 hover:border-stone-400 bg-white dark:bg-stone-900'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-stone-200 dark:border-stone-800">
                      <button
                        onClick={() => checkExerciseAnswer(ex.id, ex.correctAnswer)}
                        disabled={!userAns}
                        className="px-4 py-1.5 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-bold disabled:opacity-40 hover:opacity-90 transition"
                      >
                        Check Answer
                      </button>

                      {isEvaluated && (
                        <p className="text-xs text-stone-600 dark:text-stone-400 italic">
                          {ex.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 5: LESSON ASSESSMENT */}
          {activeTab === 'assessment' && (
            <div className="max-w-2xl mx-auto space-y-6 py-4">
              <div className="p-6 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-red-950 text-white border border-stone-800 shadow-xl space-y-4 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center shadow-lg">
                  <Trophy className="w-8 h-8 text-white" />
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] uppercase font-mono font-bold tracking-widest text-amber-300">
                    Lesson-Wise AI Assessment
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black">
                    Lesson {lesson.lessonNumber} Mastery Assessment
                  </h3>
                  <p className="text-xs text-stone-300 max-w-md mx-auto leading-relaxed">
                    Test yourself on all {lesson.vocabulary.length} vocabulary words and {lesson.grammar.length} grammar patterns strictly from Lesson {lesson.lessonNumber}.
                  </p>
                </div>

                <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <span className="block text-lg font-black text-white">{lesson.vocabulary.length}</span>
                    <span className="text-[10px] text-stone-400 uppercase font-bold">Vocabulary</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <span className="block text-lg font-black text-white">{lesson.grammar.length}</span>
                    <span className="text-[10px] text-stone-400 uppercase font-bold">Grammar</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <span className="block text-lg font-black text-emerald-400">{vocabProgressPercent}%</span>
                    <span className="text-[10px] text-stone-400 uppercase font-bold">Learned</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <span className="block text-lg font-black text-amber-400">8</span>
                    <span className="text-[10px] text-stone-400 uppercase font-bold">Question Types</span>
                  </div>
                </div>

                <div className="pt-2 w-full max-w-sm">
                  <button
                    onClick={() => onLaunchLessonQuiz(lesson)}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-black text-sm shadow-xl active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Launch Lesson {lesson.lessonNumber} Assessment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Question Types Coverage Details */}
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-800 space-y-2 text-xs">
                <span className="font-bold text-stone-800 dark:text-stone-200 block">
                  Question Formats Generated for Lesson {lesson.lessonNumber}:
                </span>
                <div className="grid grid-cols-2 gap-2 text-stone-600 dark:text-stone-400">
                  <div className="flex items-center gap-1.5">
                    <span className="text-red-500 font-bold">•</span>
                    <span>MCQ Vocabulary & Kanji Readings</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-red-500 font-bold">•</span>
                    <span>Fill in the Blanks (Particles & Verbs)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-red-500 font-bold">•</span>
                    <span>Sentence Formation (Clickable Word Tiles)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-red-500 font-bold">•</span>
                    <span>Contextual Japanese ↔ English Translations</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-red-500 font-bold">•</span>
                    <span>Grammar Rules & Error Spotting</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-red-500 font-bold">•</span>
                    <span>Vocabulary Pair Matching</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            Minna no Nihongo Shokyu I (Lesson {lesson.lessonNumber})
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-bold hover:bg-stone-300 transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
