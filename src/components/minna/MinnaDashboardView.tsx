'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen, Sparkles, Trophy, CheckCircle2, Clock,
  Search, Plus, ArrowRight, Play, Award, Zap, Layers,
  ChevronRight, RefreshCw, BarChart2, Star, Sliders
} from 'lucide-react';
import { CustomExamConfig, CustomLesson, ExamQuestion, ExamResultRecord, MinnaLesson, MinnaUserLessonProgress } from '@/types/minna';
import { ALL_MINNA_LESSONS, getCurriculumStats } from '@/data/minnaNoNihongo';
import {
  getMinnaDashboardStats,
  loadCustomLessons,
  loadExamResults,
  loadMinnaProgress
} from '@/services/minnaStorage';

// Modals
import { MinnaLessonDetailModal } from './MinnaLessonDetailModal';
import { MinnaCustomExamModal } from './MinnaCustomExamModal';
import { MinnaExamRunnerModal } from './MinnaExamRunnerModal';
import { MinnaExamResultModal } from './MinnaExamResultModal';
import { MinnaCustomLessonModal } from './MinnaCustomLessonModal';
import { MinnaLessonQuizModal } from './MinnaLessonQuizModal';
import { MinnaAppendicesModal } from './MinnaAppendicesModal';
import { AiQuizLoadingOverlay } from '@/components/common/AiQuizLoadingOverlay';

interface MinnaDashboardViewProps {
  onNavigateHome?: () => void;
}

export function MinnaDashboardView({ onNavigateHome }: MinnaDashboardViewProps) {
  const [progressList, setProgressList] = useState<MinnaUserLessonProgress[]>([]);
  const [customLessons, setCustomLessons] = useState<CustomLesson[]>([]);
  const [examHistory, setExamHistory] = useState<ExamResultRecord[]>([]);

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'assessments' | 'in_progress' | 'completed' | 'custom'>('all');

  // Modals Active State
  const [selectedLessonForDetail, setSelectedLessonForDetail] = useState<MinnaLesson | null>(null);
  const [lessonForQuizModal, setLessonForQuizModal] = useState<MinnaLesson | null>(null);
  const [customExamModalOpen, setCustomExamModalOpen] = useState(false);
  const [customExamInitialRange, setCustomExamInitialRange] = useState<number[]>([1]);
  const [customLessonModalOpen, setCustomLessonModalOpen] = useState(false);
  const [editingCustomLesson, setEditingCustomLesson] = useState<CustomLesson | null>(null);
  const [appendicesModalOpen, setAppendicesModalOpen] = useState(false);

  // Active Exam Execution
  const [activeExamConfig, setActiveExamConfig] = useState<CustomExamConfig | null>(null);
  const [activeExamQuestions, setActiveExamQuestions] = useState<ExamQuestion[] | null>(null);
  const [examResultForModal, setExamResultForModal] = useState<ExamResultRecord | null>(null);

  const [isLoadingQuiz, setIsLoadingQuiz] = useState(false);

  // Load storage state on mount
  const refreshLocalData = () => {
    setProgressList(loadMinnaProgress());
    setCustomLessons(loadCustomLessons());
    setExamHistory(loadExamResults());
  };

  useEffect(() => {
    refreshLocalData();
  }, []);

  const stats = useMemo(() => {
    return getMinnaDashboardStats();
  }, [progressList, examHistory]);

  const curriculumStats = useMemo(() => {
    return getCurriculumStats();
  }, []);

  const progressMap = useMemo(() => {
    const map = new Map<number, MinnaUserLessonProgress>();
    for (const p of progressList) {
      map.set(p.lessonNumber, p);
    }
    return map;
  }, [progressList]);

  // Filter lessons
  const filteredLessons = useMemo(() => {
    return ALL_MINNA_LESSONS.filter(l => {
      const p = progressMap.get(l.lessonNumber);
      const status = p?.status || 'not_started';

      if (statusFilter === 'in_progress' && status !== 'in_progress') return false;
      if (statusFilter === 'completed' && status !== 'completed' && status !== 'mastered') return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = l.title.toLowerCase().includes(q) || l.titleJapanese.includes(q);
        const matchVocab = l.vocabulary.some(v => v.kanji.includes(q) || v.hiragana.includes(q) || v.english.toLowerCase().includes(q));
        const matchGrammar = l.grammar.some(g => g.title.toLowerCase().includes(q) || g.structure.toLowerCase().includes(q));
        return matchTitle || matchVocab || matchGrammar;
      }

      return true;
    });
  }, [progressMap, statusFilter, searchQuery]);

  // Launch Exam Runner
  const handleStartExam = async (config: CustomExamConfig) => {
    setIsLoadingQuiz(true);
    setCustomExamModalOpen(false);

    try {
      const res = await fetch('/api/ai/generate-lesson-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonRange: config.lessonRange,
          questionTypes: config.questionTypes,
          questionCount: config.questionCount,
          focus: config.focus,
          difficulty: config.difficulty,
          generatorMode: config.generatorMode
        })
      });

      const data = await res.json();
      if (data.questions && data.questions.length > 0) {
        setActiveExamConfig(config);
        setActiveExamQuestions(data.questions);
      }
    } catch (e) {
      console.error('Failed to generate exam:', e);
    } finally {
      setIsLoadingQuiz(false);
    }
  };

  const handleLaunchQuickLessonQuiz = (lesson: MinnaLesson) => {
    setSelectedLessonForDetail(null);
    setLessonForQuizModal(lesson);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300 pb-16">

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-red-950 text-white p-6 sm:p-10 border border-stone-800 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 -mb-10 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-red-600 text-white shadow-md">
              JLPT N5 Core Curriculum
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white/90 backdrop-blur-sm">
              Shokyu I • 初級I (Lessons 1–25)
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            みんなの日本語
            <span className="block text-lg sm:text-2xl lg:text-3xl font-bold text-stone-300 mt-1">
              Minna no Nihongo Master Academy
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-2xl">
            Complete lesson-by-lesson textbook curriculum with native vocabulary audio, structured grammar formulas,
            interactive sentence formation tiles, and custom AI-powered exam generators.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-2">
            <button
              onClick={() => {
                setCustomExamInitialRange([1, 2, 3, 4, 5]);
                setCustomExamModalOpen(true);
              }}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs sm:text-sm shadow-xl hover:from-red-700 hover:to-rose-700 active:scale-95 transition flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>AI Custom Exam Studio</span>
            </button>

            <button
              onClick={() => {
                setEditingCustomLesson(null);
                setCustomLessonModalOpen(true);
              }}
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm backdrop-blur-sm border border-white/20 active:scale-95 transition flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Create Custom Lesson</span>
            </button>

            <button
              onClick={() => setAppendicesModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-indigo-600/80 hover:bg-indigo-600 text-white font-bold text-xs sm:text-sm shadow-xl active:scale-95 transition flex items-center justify-center gap-2 border border-indigo-500/40 w-full sm:w-auto"
            >
              <BookOpen className="w-4 h-4 text-indigo-200" />
              <span>Textbook Appendices (助詞・活用・助数詞)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Curriculum Stat Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="p-3.5 sm:p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm flex items-center gap-2.5 sm:gap-3.5">
          <div className="p-2 sm:p-3 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 shrink-0">
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-base sm:text-2xl font-black text-stone-900 dark:text-white truncate">
              {stats.completedLessons} / {curriculumStats.totalLessons}
            </div>
            <div className="text-[10px] sm:text-[11px] font-bold text-stone-500 uppercase tracking-wider truncate">
              Lessons Done
            </div>
          </div>
        </div>

        <div className="p-3.5 sm:p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm flex items-center gap-2.5 sm:gap-3.5">
          <div className="p-2 sm:p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shrink-0">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-base sm:text-2xl font-black text-stone-900 dark:text-white truncate">
              {stats.totalLearnedVocab}
            </div>
            <div className="text-[10px] sm:text-[11px] font-bold text-stone-500 uppercase tracking-wider truncate">
              Vocab Mastered
            </div>
          </div>
        </div>

        <div className="p-3.5 sm:p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm flex items-center gap-2.5 sm:gap-3.5">
          <div className="p-2 sm:p-3 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shrink-0">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-base sm:text-2xl font-black text-stone-900 dark:text-white truncate">
              {stats.totalUnderstoodGrammar}
            </div>
            <div className="text-[10px] sm:text-[11px] font-bold text-stone-500 uppercase tracking-wider truncate">
              Grammar Points
            </div>
          </div>
        </div>

        <div className="p-3.5 sm:p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm flex items-center gap-2.5 sm:gap-3.5">
          <div className="p-2 sm:p-3 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 shrink-0">
            <Award className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-base sm:text-2xl font-black text-stone-900 dark:text-white truncate">
              {stats.avgExamScore}%
            </div>
            <div className="text-[10px] sm:text-[11px] font-bold text-stone-500 uppercase tracking-wider truncate">
              Avg Exam Score
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 min-w-0 max-w-full">
          {/* Search */}
            <div className="relative flex-1 max-w-md min-w-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search lessons, vocabulary, kanji, or grammar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
              />
            </div>

            {/* Filter Badges */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 max-w-full scrollbar-none">
                {[
                  { id: 'all', label: 'All 25 Lessons' },
                  { id: 'assessments', label: '🎯 Lesson Assessments (1–25)' },
                  { id: 'in_progress', label: 'In Progress' },
                  { id: 'completed', label: 'Completed' },
                  { id: 'custom', label: `Custom Units (${customLessons.length})` }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setStatusFilter(item.id as any)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs whitespace-nowrap transition cursor-pointer shrink-0 ${
                      statusFilter === item.id
                        ? 'bg-red-600 text-white shadow-sm'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                    }`}
                  >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Lessons Section (If Selected or Available) */}
      {(statusFilter === 'custom' || customLessons.length > 0) && (
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 sm:gap-2">
            <h2 className="text-sm font-black uppercase tracking-wider text-stone-500 flex items-center gap-2">
              <Layers className="w-4 h-4 text-red-500" />
              <span>User Custom Study Lessons ({customLessons.length})</span>
            </h2>
            <button
              onClick={() => {
                setEditingCustomLesson(null);
                setCustomLessonModalOpen(true);
              }}
              className="text-xs font-bold text-red-600 dark:text-red-400 flex items-center gap-1 hover:underline"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Custom Unit</span>
            </button>
          </div>

          {customLessons.length === 0 ? (
            <div className="p-6 rounded-2xl border border-dashed border-stone-300 dark:border-stone-800 text-center text-xs text-stone-400">
              No custom study lessons created yet. Click "New Custom Unit" to build a tailored lesson!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {customLessons.map((cl) => (
                <div
                  key={cl.id}
                  className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm flex flex-col justify-between gap-3 hover:border-red-400 transition"
                >
                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      {cl.tags.map((t, idx) => (
                        <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-bold">
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-bold text-sm text-stone-900 dark:text-white">{cl.title}</h3>
                    {cl.description && (
                      <p className="text-xs text-stone-500 line-clamp-2 mt-1">{cl.description}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800 text-xs">
                    <span className="text-stone-400">
                      {cl.vocabulary.length} Vocab • {cl.grammar.length} Grammar
                    </span>
                    <button
                      onClick={() => {
                        setEditingCustomLesson(cl);
                        setCustomLessonModalOpen(true);
                      }}
                      className="text-red-600 dark:text-red-400 font-bold hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Primary Lessons Grid */}
      {statusFilter !== 'custom' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 sm:gap-2">
            <h2 className="text-sm font-black uppercase tracking-wider text-stone-500">
              {statusFilter === 'assessments'
                ? `🎯 Lesson-Wise Assessments (${filteredLessons.length} Lessons Available)`
                : `Minna no Nihongo Lessons (${filteredLessons.length})`}
              </h2>
              <span className="text-xs text-stone-400">
                {statusFilter === 'assessments'
                  ? 'Generate AI tests or instant quizzes strictly for any single lesson'
                  : 'Click any lesson to browse vocabulary, grammar explanations & dialogues'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLessons.map((lesson) => {
                const p = progressMap.get(lesson.lessonNumber);
                const status = p?.status || 'not_started';
                const learnedVocabCount = p?.learnedVocabIds?.length || 0;
                const understoodGrammarCount = p?.understoodGrammarIds?.length || 0;
                const bestScore = p?.bestScore || 0;

                return (
                  <div
                    key={lesson.id}
                    className="p-5 rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4 group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-black font-mono px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                          Lesson {lesson.lessonNumber}
                        </span>

                        {/* Status Badge */}
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${status === 'mastered'
                            ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                            : status === 'completed'
                              ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
                              : status === 'in_progress'
                                ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                                : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                          }`}>
                          {status.replace('_', ' ')}
                        </span>
                      </div>

                      <h3 className="text-base font-black text-stone-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                        {lesson.title}
                      </h3>
                      <p className="text-xs font-japanese text-stone-500 font-medium line-clamp-1">
                        {lesson.titleJapanese}
                      </p>

                      <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                        {lesson.description}
                      </p>
                    </div>

                    {/* Metrics and Buttons */}
                    <div className="space-y-3 pt-3 border-t border-stone-100 dark:border-stone-800/80">
                      <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
                        <span>
                          {learnedVocabCount}/{lesson.vocabulary.length} Vocab
                        </span>
                        <span>
                          {understoodGrammarCount}/{lesson.grammar.length} Grammar
                        </span>
                        {bestScore > 0 && (
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">
                            Best: {bestScore}%
                          </span>
                        )}
                      </div>

                      {statusFilter === 'assessments' ? (
                        <button
                          onClick={() => handleLaunchQuickLessonQuiz(lesson)}
                          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-md active:scale-95"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                          <span>Generate Lesson {lesson.lessonNumber} Assessment</span>
                        </button>
                      ) : (
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => setSelectedLessonForDetail(lesson)}
                            className="py-2.5 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold transition flex items-center justify-center gap-1.5"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Study</span>
                          </button>

                          <button
                            onClick={() => handleLaunchQuickLessonQuiz(lesson)}
                            className="py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                          >
                            <Play className="w-3.5 h-3.5" />
                            <span>Quiz</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
      )}

          {/* Recent Exam History */}
          {examHistory.length > 0 && (
            <div className="space-y-3 pt-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-black uppercase tracking-wider text-stone-500 flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-amber-500" />
                  <span>Recent Custom Exam Reports ({examHistory.length})</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {examHistory.slice(0, 4).map((ex) => (
                  <div
                    key={ex.id}
                    className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm flex items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-black font-mono px-2 py-0.5 rounded-full ${ex.scorePercent >= 80 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                          }`}>
                          {ex.scorePercent}%
                        </span>
                        <span className="font-bold text-xs text-stone-900 dark:text-white">
                          {ex.examTitle}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500">
                        {ex.correctCount}/{ex.totalQuestions} Correct • Lessons: {ex.lessonNumbers.join(', ')}
                      </p>
                    </div>

                    <button
                      onClick={() => setExamResultForModal(ex)}
                      className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-xs font-bold hover:bg-stone-200 text-stone-700 dark:text-stone-300"
                    >
                      Diagnostic
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODAL 1: Lesson Detail Modal */}
          {selectedLessonForDetail && (
            <MinnaLessonDetailModal
              lesson={selectedLessonForDetail}
              learnedVocabIds={progressMap.get(selectedLessonForDetail.lessonNumber)?.learnedVocabIds || []}
              understoodGrammarIds={progressMap.get(selectedLessonForDetail.lessonNumber)?.understoodGrammarIds || []}
              onClose={() => setSelectedLessonForDetail(null)}
              onLaunchLessonQuiz={handleLaunchQuickLessonQuiz}
              onRefreshProgress={refreshLocalData}
            />
          )}

          {/* MODAL 2: Custom Exam Studio */}
          {customExamModalOpen && (
            <MinnaCustomExamModal
              onClose={() => setCustomExamModalOpen(false)}
              onStartExam={handleStartExam}
              initialLessonRange={customExamInitialRange}
            />
          )}

          {/* MODAL 3: Active Exam Runner */}
          {activeExamQuestions && activeExamConfig && (
            <MinnaExamRunnerModal
              questions={activeExamQuestions}
              config={activeExamConfig}
              onClose={() => {
                setActiveExamQuestions(null);
                setActiveExamConfig(null);
                refreshLocalData();
              }}
              onFinishExam={(res) => {
                setActiveExamQuestions(null);
                setActiveExamConfig(null);
                setExamResultForModal(res);
                refreshLocalData();
              }}
            />
          )}

          {/* MODAL 4: Exam Result Diagnostic */}
          {examResultForModal && (
            <MinnaExamResultModal
              result={examResultForModal}
              onClose={() => setExamResultForModal(null)}
              onRetest={(lessons) => {
                setExamResultForModal(null);
                setCustomExamInitialRange(lessons);
                setCustomExamModalOpen(true);
              }}
            />
          )}

          {/* MODAL 5: Custom Lesson Maker */}
          {customLessonModalOpen && (
            <MinnaCustomLessonModal
              editLesson={editingCustomLesson}
              onClose={() => setCustomLessonModalOpen(false)}
              onLessonSaved={() => {
                setCustomLessonModalOpen(false);
                refreshLocalData();
              }}
            />
          )}

          {/* MODAL 6: Dedicated Lesson-Wise Assessment Modal */}
          {lessonForQuizModal && (
            <MinnaLessonQuizModal
              lesson={lessonForQuizModal}
              onClose={() => setLessonForQuizModal(null)}
              onStartExam={(config, questions) => {
                setLessonForQuizModal(null);
                setActiveExamConfig(config);
                setActiveExamQuestions(questions);
              }}
            />
          )}

          {/* MODAL 7: Official Textbook Appendices & Summary Reference */}
          <MinnaAppendicesModal
            isOpen={appendicesModalOpen}
            onClose={() => setAppendicesModalOpen(false)}
          />

          {/* AI Custom Exam Studio Generation Loading Indicator */}
          <AiQuizLoadingOverlay
            isOpen={isLoadingQuiz}
            title="AI Custom Exam Studio"
            subtitle="Groq AI is assembling your customized JLPT N5 assessment with furigana..."
          />

        </div>
        );
}
