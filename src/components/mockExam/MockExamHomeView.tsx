'use client';

import React, { useState, useEffect } from 'react';
import {
  FileCheck,
  Clock,
  Sparkles,
  Play,
  Award,
  AlertCircle,
  RotateCcw,
  BookOpen,
  Headphones,
  FileText,
  ChevronRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
  BarChart3,
  RefreshCw,
  Info,
  Calendar,
  Layers,
  Zap
} from 'lucide-react';
import {
  MockExamConfig,
  MockExamMode,
  MockExamQuestion,
  MockExamResult
} from '@/types/mockExam';
import {
  OFFICIAL_N5_EXAM_CONFIGS,
  SAMPLE_DEV_N5_QUESTION
} from '@/services/mockExamAiEngine';
import {
  getExamHistory,
  getPastQuestionFingerprints
} from '@/services/mockExamStorage';
import { MockExamRunnerModal } from './MockExamRunnerModal';
import { MockExamReportModal } from './MockExamReportModal';

interface MockExamHomeViewProps {
  onNavigateHome?: () => void;
}

export function MockExamHomeView({ onNavigateHome }: MockExamHomeViewProps) {
  const [activeTab, setActiveTab] = useState<'start' | 'instructions' | 'history' | 'reports'>('start');
  const [selectedMode, setSelectedMode] = useState<MockExamMode>('full');

  // Loading & Generation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationMessage, setGenerationMessage] = useState<string | null>(null);
  const [generatedQuestions, setGeneratedQuestions] = useState<MockExamQuestion[] | null>(null);

  // Active Modals
  const [isExamRunning, setIsExamRunning] = useState(false);
  const [activeExamConfig, setActiveExamConfig] = useState<MockExamConfig>(OFFICIAL_N5_EXAM_CONFIGS.full);
  const [activeReport, setActiveReport] = useState<MockExamResult | null>(null);

  // History state
  const [examHistory, setExamHistory] = useState<MockExamResult[]>([]);

  useEffect(() => {
    setExamHistory(getExamHistory());
  }, [isExamRunning, activeReport]);

  const latestResult = examHistory.length > 0 ? examHistory[0] : null;

  // Prominent "Generate New Questions" Handler
  const handleGenerateQuestions = async (modeToUse: MockExamMode = selectedMode) => {
    setIsGenerating(true);
    setGenerationMessage('Sending blueprint to AI Question Generation Engine...');
    try {
      const pastFingerprints = Array.from(getPastQuestionFingerprints());
      const res = await fetch('/api/ai/generate-mock-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: modeToUse,
          pastQuestionFingerprints: pastFingerprints
        })
      });

      const data = await res.json();
      if (res.ok && data.success && data.questions && data.questions.length > 0) {
        setGeneratedQuestions(data.questions);
        setGenerationMessage(`✓ Generated ${data.questions.length} fresh JLPT N5 questions (${data.source === 'groq_ai' ? 'Groq AI' : 'Verified Standard'})!`);
        setTimeout(() => setGenerationMessage(null), 4000);
        return data.questions;
      } else {
        setGenerationMessage(`Note: ${data.error || 'Failed to generate questions, using official standard questions.'}`);
        setTimeout(() => setGenerationMessage(null), 4000);
      }
    } catch (err: any) {
      setGenerationMessage(`Connection note: ${err.message || 'Error communicating with generation engine.'}`);
      setTimeout(() => setGenerationMessage(null), 4000);
    } finally {
      setIsGenerating(false);
    }
    return null;
  };

  // Start examination
  const handleStartExam = async (mode: MockExamMode) => {
    setSelectedMode(mode);
    const config = OFFICIAL_N5_EXAM_CONFIGS[mode];
    setActiveExamConfig(config);

    // If we already have generated questions for this mode, use them, otherwise generate fresh
    let questionsToUse = generatedQuestions;
    if (!questionsToUse || questionsToUse.length === 0) {
      questionsToUse = await handleGenerateQuestions(mode);
    }

    setIsExamRunning(true);
  };

  return (
      <div className="space-y-6 max-w-6xl mx-auto pb-16 animate-fadeIn w-full max-w-full min-w-0 overflow-x-hidden">
        {/* Top Banner with Prominent "Generate New Questions" Button */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-indigo-900 p-6 sm:p-8 text-white shadow-xl w-full max-w-full min-w-0">
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-200">
                  <FileCheck className="w-4 h-4" />
                  <span>Official JLPT Format • 90-Minute Standard</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                  JLPT N5 Mock Question Paper Studio
                </h1>
                <p className="text-xs sm:text-sm text-red-100 leading-relaxed">
                  Experience the genuine Japan Foundation JLPT examination format. Test under official section time limits (20m Vocab, 40m Grammar & Reading, 30m Listening) with fresh, dynamic AI question sets and scaled score estimation.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
                {/* Prominent Generate New Questions Button */}
                <button
                  onClick={() => handleGenerateQuestions(selectedMode)}
                  disabled={isGenerating}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-stone-900 font-extrabold text-xs sm:text-sm shadow-xl hover:bg-stone-100 active:scale-95 transition-all cursor-pointer disabled:opacity-60"
                  title="Generate a completely fresh set of N5 questions using Groq AI"
                >
                  <RefreshCw className={`w-4 h-4 text-red-600 ${isGenerating ? 'animate-spin' : ''}`} />
                  <span>{isGenerating ? 'Generating Questions...' : 'Generate New Questions'}</span>
                </button>

                <button
                  onClick={() => handleStartExam('full')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-stone-900 hover:bg-black text-white font-extrabold text-xs sm:text-sm shadow-xl active:scale-95 transition cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current text-emerald-400" />
                  <span>Start Full Exam (90m)</span>
                </button>
              </div>
            </div>

            {generationMessage && (
              <div className="mt-4 p-3 rounded-xl bg-white/20 backdrop-blur-md text-xs font-semibold text-white animate-fadeIn flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                <span>{generationMessage}</span>
              </div>
            )}
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-2 shadow-xs flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {[
              { id: 'start', label: 'Start New Mock Exam', icon: Play },
              { id: 'instructions', label: 'Exam Instructions', icon: Info },
              { id: 'history', label: `Previous Exam Results (${examHistory.length})`, icon: Calendar },
              { id: 'reports', label: 'Performance Reports', icon: BarChart3 }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition cursor-pointer ${isActive
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: Start New Mock Exam & Practice Modes */}
          {activeTab === 'start' && (
            <div className="space-y-6">
              {/* Latest Exam Quick Stats Banner (If user has taken an exam) */}
              {latestResult && (
                <div className="bg-white dark:bg-stone-900 p-4 sm:p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg ${latestResult.estimatedPass
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                      : 'bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
                      }`}>
                      {latestResult.estimatedPass ? '合格' : '不合格'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-stone-900 dark:text-white">
                          Latest Mock Result: {latestResult.examTitle}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${latestResult.estimatedPass
                          ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200'
                          : 'bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-400 border border-rose-200'
                          }`}>
                          {latestResult.estimatedPass ? 'Estimated Pass (合格)' : 'Needs Revision (再挑戦)'}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                        Estimated Scaled Score: <strong>{latestResult.jlptScaledScore.total} / 180</strong> • Raw Marks: {latestResult.totalRawMarks}/{latestResult.maxRawMarks} ({latestResult.percentage}%) • {new Date(latestResult.completedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveReport(latestResult)}
                    className="px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-xs font-bold text-stone-700 dark:text-stone-300 transition shrink-0"
                  >
                    Review Report →
                  </button>
                </div>
              )}

              {/* Section Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Option 1: Full-Length Official Mock Exam */}
                <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border-2 border-red-500/40 hover:border-red-500 transition-all shadow-sm flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 font-mono font-bold text-xs uppercase tracking-wider">
                        Full-Length Simulation
                      </span>
                      <span className="text-xs font-mono font-bold text-stone-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> 90 Minutes Total
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-stone-900 dark:text-white mt-3">
                      Full JLPT N5 Official Mock Examination
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                      Complete simulated test containing all 3 official test sections in sequence with official countdown timers and automatic evaluation.
                    </p>

                    <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800 space-y-2 text-xs">
                      <div className="flex items-center justify-between text-stone-600 dark:text-stone-300">
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-red-500" />
                          1. Vocabulary (文字・語彙)
                        </span>
                        <span className="font-mono font-semibold">20 Minutes</span>
                      </div>
                      <div className="flex items-center justify-between text-stone-600 dark:text-stone-300">
                        <span className="flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-blue-500" />
                          2. Grammar & Reading (文法・読解)
                        </span>
                        <span className="font-mono font-semibold">40 Minutes</span>
                      </div>
                      <div className="flex items-center justify-between text-stone-600 dark:text-stone-300">
                        <span className="flex items-center gap-1.5">
                          <Headphones className="w-3.5 h-3.5 text-indigo-500" />
                          3. Listening (聴解)
                        </span>
                        <span className="font-mono font-semibold">30 Minutes</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartExam('full')}
                    className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Launch Full Mock Exam (90m)</span>
                  </button>
                </div>

                {/* Option 2: Vocabulary Section Practice */}
                <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-red-400 transition-all shadow-sm flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono font-bold text-xs uppercase tracking-wider">
                        Section Practice
                      </span>
                      <span className="text-xs font-mono font-bold text-stone-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> 20 Minutes
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-stone-900 dark:text-white mt-3">
                      Vocabulary Section (文字・語彙)
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                      Focus on Kanji Reading, Orthography (Kanji writing), Contextually Defined Expressions, and Paraphrases.
                    </p>

                    <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800 space-y-1.5 text-xs text-stone-600 dark:text-stone-400">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        <span>問題1: 漢字読み (Kanji Reading)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        <span>問題2: 表記 (Orthography / Kanji Writing)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        <span>問題3: 文脈規定 (Contextual Usage)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        <span>問題4: 言い換え類義 (Paraphrases)</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartExam('vocabulary')}
                    className="w-full py-3 rounded-xl bg-stone-900 hover:bg-black text-white font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Practice Vocabulary (20m)</span>
                  </button>
                </div>

                {/* Option 3: Grammar & Reading Section Practice */}
                <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-blue-400 transition-all shadow-sm flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono font-bold text-xs uppercase tracking-wider">
                        Section Practice
                      </span>
                      <span className="text-xs font-mono font-bold text-stone-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> 40 Minutes
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-stone-900 dark:text-white mt-3">
                      Grammar & Reading (文法・読解)
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                      Practice particle choices, sentence composition star ordering (★), text cloze, and reading comprehension passages.
                    </p>

                    <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800 space-y-1.5 text-xs text-stone-600 dark:text-stone-400">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <span>文の文法1 (Correct Grammar Form)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <span>文の文法2 (Sentence Composition ★)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <span>短文・中文・情報検索 (Reading Passages)</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartExam('grammar_reading')}
                    className="w-full py-3 rounded-xl bg-stone-900 hover:bg-black text-white font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Practice Grammar & Reading (40m)</span>
                  </button>
                </div>

                {/* Option 4: Listening Section Practice */}
                <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-indigo-400 transition-all shadow-sm flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono font-bold text-xs uppercase tracking-wider">
                        Section Practice
                      </span>
                      <span className="text-xs font-mono font-bold text-stone-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> 30 Minutes
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-stone-900 dark:text-white mt-3">
                      Listening Section (聴解)
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                      Interactive audio playback with speech synthesis and native Google TTS fallback covering all 4 N5 listening patterns.
                    </p>

                    <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800 space-y-1.5 text-xs text-stone-600 dark:text-stone-400">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        <span>課題理解 (Task-based Comprehension)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        <span>ポイント理解 (Key Point Comprehension)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        <span>発話表現 & 即時応答 (Verbal & Quick Response)</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartExam('listening')}
                    className="w-full py-3 rounded-xl bg-stone-900 hover:bg-black text-white font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Practice Listening (30m)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Exam Instructions */}
          {activeTab === 'instructions' && (
            <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-stone-100 dark:border-stone-800">
                <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center font-bold">
                  N5
                </div>
                <div>
                  <h2 className="text-lg font-bold text-stone-900 dark:text-white">
                    Official JLPT N5 Examination Instructions & Regulations
                  </h2>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Official structure defined by the Japan Foundation and Japan Educational Exchanges and Services (JEES)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 space-y-2">
                  <span className="font-bold text-xs text-red-600 dark:text-red-400 block">Section 1</span>
                  <h4 className="font-black text-sm text-stone-900 dark:text-white">Vocabulary (文字・語彙)</h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    Time Limit: <strong>20 Minutes</strong>. Tests Kanji reading, orthography (Kanji writing), contextual expressions, and paraphrases.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 space-y-2">
                  <span className="font-bold text-xs text-blue-600 dark:text-blue-400 block">Section 2</span>
                  <h4 className="font-black text-sm text-stone-900 dark:text-white">Grammar & Reading (文法・読解)</h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    Time Limit: <strong>40 Minutes</strong>. Tests particle usage, star ordering composition, and reading comprehension of short/mid passages and notices.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 space-y-2">
                  <span className="font-bold text-xs text-indigo-600 dark:text-indigo-400 block">Section 3</span>
                  <h4 className="font-black text-sm text-stone-900 dark:text-white">Listening (聴解)</h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    Time Limit: <strong>30 Minutes</strong>. Tests listening comprehension across task-oriented dialogues, key point retention, verbal reactions, and quick replies.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 space-y-2">
                <h4 className="font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  Official JLPT N5 Scoring & Passing Benchmark
                </h4>
                <p className="leading-relaxed text-[11px]">
                  • <strong>Overall Pass Mark</strong>: 80 / 180 points (44.4%)<br />
                  • <strong>Sectional Qualifying Threshold</strong>: Language Knowledge (Vocab/Grammar) & Reading requires at least <strong>38 / 120 points</strong>.<br />
                  • <strong>Listening Qualifying Threshold</strong>: Listening requires at least <strong>19 / 60 points</strong>.<br />
                  <em>Note: You must pass BOTH individual sections in addition to meeting the overall total score threshold to pass the official examination.</em>
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: Previous Exam Results & History */}
          {activeTab === 'history' && (
            <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                <h3 className="font-bold text-base text-stone-900 dark:text-white">
                  Previous Mock Examination Attempts ({examHistory.length})
                </h3>
                <span className="text-xs text-stone-400">
                  Saved locally & synced to cloud
                </span>
              </div>

              {examHistory.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <FileCheck className="w-12 h-12 text-stone-300 dark:text-stone-600 mx-auto" />
                  <p className="text-sm font-semibold text-stone-600 dark:text-stone-400">
                    No mock examinations taken yet.
                  </p>
                  <button
                    onClick={() => setActiveTab('start')}
                    className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs"
                  >
                    Take Your First Exam
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {examHistory.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setActiveReport(item)}
                      className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40 hover:border-red-400 transition cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${item.estimatedPass
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                          }`}>
                          {item.estimatedPass ? '合格' : '不合格'}
                        </span>
                        <div>
                          <h4 className="font-bold text-sm text-stone-900 dark:text-white">
                            {item.examTitle}
                          </h4>
                          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                            {new Date(item.completedAt).toLocaleString()} • {Math.round(item.timeSpentSeconds / 60)} mins elapsed
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-200 dark:border-stone-700">
                        <div className="text-right">
                          <span className="font-mono font-black text-sm text-stone-900 dark:text-white">
                            {item.jlptScaledScore.total} / 180
                          </span>
                          <span className="text-[11px] text-stone-400 block">
                            Raw: {item.totalRawMarks}/{item.maxRawMarks} ({item.percentage}%)
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-stone-400" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Performance Reports */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              {latestResult ? (
                <MockExamReportModal
                  result={latestResult}
                  onClose={() => setActiveTab('start')}
                  isInline={true}
                />
              ) : (
                <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-12 text-center space-y-3">
                  <BarChart3 className="w-12 h-12 text-stone-300 dark:text-stone-600 mx-auto" />
                  <h3 className="font-bold text-base text-stone-900 dark:text-white">No Exam Data Available</h3>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    Complete a mock exam or section practice test to see your in-depth performance analysis, sectional scoring breakdowns, and recommended practice topics.
                  </p>
                  <button
                    onClick={() => setActiveTab('start')}
                    className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs"
                  >
                    Start an Exam
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Active Exam Runner Modal */}
          {isExamRunning && (
            <MockExamRunnerModal
              config={activeExamConfig}
              questions={generatedQuestions || [SAMPLE_DEV_N5_QUESTION]}
              onComplete={(result) => {
                setIsExamRunning(false);
                setActiveReport(result);
                setGeneratedQuestions(null); // Reset cache so next attempt triggers fresh questions
              }}
              onClose={() => setIsExamRunning(false)}
            />
          )}

          {/* Active Examination Report Modal */}
          {activeReport && !isExamRunning && activeTab !== 'reports' && (
            <MockExamReportModal
              result={activeReport}
              onClose={() => setActiveReport(null)}
            />
          )}
        </div>
        );
}