'use client';

import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Clock, 
  BarChart3, 
  RotateCcw, 
  ArrowRight, 
  X, 
  BookOpen, 
  Headphones, 
  Sparkles, 
  Check, 
  FileText,
  TrendingUp,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { MockExamResult } from '@/types/mockExam';
import { FuriganaText } from '@/components/FuriganaText';

interface MockExamReportModalProps {
  result: MockExamResult;
  onClose: () => void;
  isInline?: boolean;
}

export function MockExamReportModal({
  result,
  onClose,
  isInline = false
}: MockExamReportModalProps) {
  const [filterResult, setFilterResult] = useState<'all' | 'correct' | 'incorrect' | 'unanswered'>('all');
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  const filteredReview = result.questionReview.filter(item => {
    if (filterResult === 'correct') return item.isCorrect;
    if (filterResult === 'incorrect') return !item.isCorrect && Boolean(item.userAnswer);
    if (filterResult === 'unanswered') return !item.userAnswer;
    return true;
  });

  const content = (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header Card */}
      <div className={`p-6 sm:p-8 rounded-3xl text-white shadow-xl relative overflow-hidden ${
        result.estimatedPass
          ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-stone-900'
          : 'bg-gradient-to-r from-rose-600 via-orange-600 to-stone-900'
      }`}>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 backdrop-blur-md">
                JLPT N5 Examination Evaluation
              </span>
              <span className="text-xs text-white/80">
                {new Date(result.completedAt).toLocaleString()}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black">
              {result.estimatedPass ? '合格見込 (Estimated Pass) 🎉' : '再挑戦 (Needs Revision) 💪'}
            </h2>

            <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-xl">
              {result.estimatedPass
                ? 'Congratulations! Your score meets both the overall threshold (≥80/180) and all sectional minimum qualifying benchmarks.'
                : 'Keep practicing! Review your weak topics below and practice with targeted section quizzes to reach the official qualifying thresholds.'}
            </p>
          </div>

          {/* Scaled Score Circle */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-3xl flex items-center gap-4 shrink-0">
            <div className="text-right">
              <span className="text-[10px] text-white/70 uppercase tracking-widest block font-bold">
                Estimated Scaled Score
              </span>
              <span className="text-3xl sm:text-4xl font-black tracking-tight text-white block">
                {result.jlptScaledScore.total}
                <span className="text-sm font-normal opacity-80"> / 180</span>
              </span>
              <span className="text-[11px] text-white/90 font-medium">
                Raw: {result.totalRawMarks} / {result.maxRawMarks} ({result.percentage}%)
              </span>
            </div>

            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl shadow-inner ${
              result.estimatedPass ? 'bg-emerald-400 text-stone-900' : 'bg-rose-400 text-stone-900'
            }`}>
              {result.estimatedPass ? '合' : '否'}
            </div>
          </div>
        </div>
      </div>

      {/* Official N5 Thresholds Breakdown Alert */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-stone-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Official JLPT N5 Benchmark Verification (Reference Scaling)
          </h3>
          <span className="text-[10px] font-bold text-stone-400 bg-stone-100 dark:bg-stone-800 px-2.5 py-0.5 rounded-full">
            Estimated Mock Simulation
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {/* Metric 1: Overall */}
          <div className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/40 space-y-1">
            <div className="flex justify-between text-stone-500">
              <span>Overall Score</span>
              <span>Pass: ≥ 80</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-mono font-black text-base text-stone-900 dark:text-white">
                {result.jlptScaledScore.total} / 180
              </span>
              <span className={`text-[10px] font-bold ${
                result.passBreakdown.overallPass ? 'text-emerald-600' : 'text-rose-600'
              }`}>
                {result.passBreakdown.overallPass ? '✓ Passed' : '✗ Below 80'}
              </span>
            </div>
          </div>

          {/* Metric 2: Language Knowledge & Reading */}
          <div className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/40 space-y-1">
            <div className="flex justify-between text-stone-500">
              <span>Lang & Reading</span>
              <span>Pass: ≥ 38</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-mono font-black text-base text-stone-900 dark:text-white">
                {result.jlptScaledScore.languageKnowledgeAndReading} / 120
              </span>
              <span className={`text-[10px] font-bold ${
                result.passBreakdown.langReadPass ? 'text-emerald-600' : 'text-rose-600'
              }`}>
                {result.passBreakdown.langReadPass ? '✓ Qualified' : '✗ Below 38'}
              </span>
            </div>
          </div>

          {/* Metric 3: Listening */}
          <div className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/40 space-y-1">
            <div className="flex justify-between text-stone-500">
              <span>Listening (聴解)</span>
              <span>Pass: ≥ 19</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-mono font-black text-base text-stone-900 dark:text-white">
                {result.jlptScaledScore.listening} / 60
              </span>
              <span className={`text-[10px] font-bold ${
                result.passBreakdown.listeningPass ? 'text-emerald-600' : 'text-rose-600'
              }`}>
                {result.passBreakdown.listeningPass ? '✓ Qualified' : '✗ Below 19'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Summary Cards (Correct, Incorrect, Unanswered, Time) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <span className="text-[11px] font-medium text-stone-400 block">Correct Answers</span>
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block">
            {result.correctCount}
            <span className="text-xs font-normal text-stone-400"> / {result.totalQuestions}</span>
          </span>
          <span className="text-[10px] text-emerald-700 font-bold">
            {Math.round((result.correctCount / result.totalQuestions) * 100)}% Accuracy
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <span className="text-[11px] font-medium text-stone-400 block">Incorrect Answers</span>
          <span className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-1 block">
            {result.incorrectCount}
          </span>
          <span className="text-[10px] text-stone-400">Review mistakes below</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <span className="text-[11px] font-medium text-stone-400 block">Unanswered</span>
          <span className="text-2xl font-black text-stone-700 dark:text-stone-300 mt-1 block">
            {result.unansweredCount}
          </span>
          <span className="text-[10px] text-stone-400">Skipped or timeout</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <span className="text-[11px] font-medium text-stone-400 block">Time Elapsed</span>
          <span className="text-2xl font-black text-stone-900 dark:text-white mt-1 block font-mono">
            {Math.floor(result.timeSpentSeconds / 60)}m {result.timeSpentSeconds % 60}s
          </span>
          <span className="text-[10px] text-stone-400">Fixed official pacing</span>
        </div>
      </div>

      {/* Section-Wise Breakdown Bars */}
      <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <h3 className="font-black text-base text-stone-900 dark:text-white flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-red-600" />
          Section-Wise Performance Breakdown
        </h3>

        <div className="space-y-3">
          {result.sectionResults.map(sec => (
            <div key={sec.sectionId} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-800 dark:text-stone-200">
                  {sec.sectionName}
                </span>
                <span className="font-mono font-semibold text-stone-600 dark:text-stone-400">
                  {sec.rawMarks} / {sec.maxMarks} marks ({sec.percentage}%) • {sec.correct}/{sec.totalQuestions} correct
                </span>
              </div>
              <div className="h-2 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    sec.percentage >= 70 ? 'bg-emerald-500' : sec.percentage >= 40 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${sec.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strong & Weak Areas Diagnosis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strong Areas */}
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3">
          <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Demonstrated Strong Topics
          </h4>
          {result.strongTopics.length > 0 ? (
            <ul className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300">
              {result.strongTopics.map((top, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{top}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-stone-400">No topics met the 75%+ mastery threshold in this attempt.</p>
          )}
        </div>

        {/* Weak Topics & Recommendations */}
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3">
          <h4 className="font-bold text-xs uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-rose-500" />
            Recommended Focus Areas
          </h4>
          <ul className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300">
            {result.recommendedTopics.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1 shrink-0" />
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Detailed Question Review Table / Cards */}
      <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-stone-100 dark:border-stone-800">
          <div>
            <h3 className="font-black text-base text-stone-900 dark:text-white">
              Detailed Question-by-Question Review
            </h3>
            <p className="text-xs text-stone-400">
              Inspect your answers against the official validated answer key with full explanations.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 text-xs">
            {(['all', 'correct', 'incorrect', 'unanswered'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilterResult(f)}
                className={`px-3 py-1 rounded-xl font-bold transition capitalize cursor-pointer ${
                  filterResult === f
                    ? 'bg-red-600 text-white'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* List of Questions */}
        <div className="space-y-3">
          {filteredReview.map((item, idx) => {
            const isExpanded = expandedQuestionId === item.question.id;
            const q = item.question;

            return (
              <div 
                key={q.id}
                className={`p-4 rounded-2xl border transition-all ${
                  item.isCorrect
                    ? 'border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-950/10'
                    : item.userAnswer
                    ? 'border-rose-200 dark:border-rose-900/40 bg-rose-50/20 dark:bg-rose-950/10'
                    : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/30'
                }`}
              >
                <div 
                  onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                  className="flex items-start justify-between gap-3 cursor-pointer select-none"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                      item.isCorrect
                        ? 'bg-emerald-600 text-white'
                        : item.userAnswer
                        ? 'bg-rose-600 text-white'
                        : 'bg-stone-300 dark:bg-stone-700 text-stone-700 dark:text-stone-300'
                    }`}>
                      {item.isCorrect ? '✓' : item.userAnswer ? '✗' : '—'}
                    </span>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-mono text-stone-400 font-semibold">Q{idx + 1}</span>
                        <span className="font-semibold text-stone-500 font-japanese">
                          {q.categoryNameJa}
                        </span>
                        <span className="text-[10px] text-stone-400 capitalize">
                          ({q.section.replace('_', ' ')})
                        </span>
                      </div>
                      <div className="font-japanese font-bold text-sm text-stone-900 dark:text-white mt-0.5 line-clamp-1">
                        <FuriganaText text={q.prompt} />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${
                      item.isCorrect
                        ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60'
                        : item.userAnswer
                        ? 'text-rose-700 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/60'
                        : 'text-stone-600 dark:text-stone-400 bg-stone-200 dark:bg-stone-700'
                    }`}>
                      {item.isCorrect ? '+1 mark' : '0 marks'}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-stone-200/60 dark:border-stone-800 space-y-3 text-xs animate-fadeIn">
                    {/* Prompt Full */}
                    <div>
                      <span className="text-[11px] font-bold text-stone-400 block mb-1">Full Question:</span>
                      <div className="font-japanese text-sm font-semibold text-stone-900 dark:text-white">
                        <FuriganaText text={q.prompt} />
                      </div>
                      {q.subPrompt && (
                        <p className="text-stone-500 text-xs mt-1">{q.subPrompt}</p>
                      )}
                    </div>

                    {/* Context / Audio script */}
                    {q.contextPassage && (
                      <div className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 font-japanese text-xs leading-relaxed text-stone-700 dark:text-stone-300">
                        <FuriganaText text={q.contextPassage} />
                      </div>
                    )}
                    {q.audioScript && (
                      <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-900 font-japanese text-xs leading-relaxed text-indigo-950 dark:text-indigo-200">
                        <span className="font-bold text-[10px] block mb-1 uppercase tracking-wider text-indigo-500">Audio Dialogue Script:</span>
                        <FuriganaText text={q.audioScript} />
                      </div>
                    )}

                    {/* Choices comparison */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800/60">
                        <span className="text-stone-400 font-medium block text-[10px]">Your Answer:</span>
                        <span className={`font-japanese font-bold text-xs mt-0.5 block ${
                          item.isCorrect ? 'text-emerald-600' : 'text-rose-600'
                        }`}>
                          {item.userAnswer ? <FuriganaText text={item.userAnswer} /> : '— (Unanswered)'}
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900">
                        <span className="text-emerald-700 dark:text-emerald-400 font-medium block text-[10px]">Correct Answer:</span>
                        <span className="font-japanese font-bold text-xs text-emerald-900 dark:text-emerald-200 mt-0.5 block">
                          <FuriganaText text={q.correctAnswer} />
                        </span>
                      </div>
                    </div>

                    {/* Explanation */}
                    <div className="p-3.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 space-y-1">
                      <span className="font-bold text-stone-900 dark:text-white block">Explanation:</span>
                      <p className="leading-relaxed">{q.explanation}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  if (isInline) {
    return content;
  }

  return (
    <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-3xl max-w-4xl w-full p-4 sm:p-8 shadow-2xl relative my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white dark:bg-stone-900 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 shadow-sm transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {content}

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white font-bold text-xs transition cursor-pointer shadow-md"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
}

