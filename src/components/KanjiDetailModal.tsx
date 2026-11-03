'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Sparkles,
  Award,
  CheckCircle2,
  AlertCircle,
  PenTool,
  BrainCircuit,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { KanjiRecord, LearningStatus } from '@/types/kanji';
import { ALL_120_KANJI } from '@/data/kanjiDatabase';
import { storage } from '@/services/storage';
import { AudioButton } from './AudioButton';
import { StrokeCanvas } from './StrokeCanvas';
import { KanjiAssessmentModal } from './KanjiAssessmentModal';
import { MarkdownRenderer } from './MarkdownRenderer';

interface KanjiDetailModalProps {
  kanji: KanjiRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onProgressUpdated: () => void;
}

export const KanjiDetailModal: React.FC<KanjiDetailModalProps> = ({
  kanji,
  isOpen,
  onClose,
  onProgressUpdated
}) => {
  const [currentKanji, setCurrentKanji] = useState<KanjiRecord | null>(kanji);
  const [activeTab, setActiveTab] = useState<'study' | 'practice' | 'ai_insights'>('study');
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [aiContent, setAiContent] = useState<any>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [isLoadingSentences, setIsLoadingSentences] = useState(false);
  const [sentenceSuccessToast, setSentenceSuccessToast] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  useEffect(() => {
    setCurrentKanji(kanji);
    if (kanji) {
      // Check cached AI content first
      const cached = storage.getCachedAiContent(kanji.id);
      if (cached) {
        setAiContent(cached);
      } else {
        setAiContent(null);
      }
      setAiError(null);
    }
  }, [kanji]);

  if (!isOpen || !currentKanji) return null;

  // Find status
  const progressList = storage.getProgress();
  const currentProgress = progressList.find(p => p.kanji_id === currentKanji.id);
  const status: LearningStatus = currentProgress?.learning_status || 'available';

  // Navigation: previous / next
  const currentIndex = ALL_120_KANJI.findIndex(k => k.id === currentKanji.id);
  const prevKanji = currentIndex > 0 ? ALL_120_KANJI[currentIndex - 1] : null;
  const nextKanji = currentIndex < ALL_120_KANJI.length - 1 ? ALL_120_KANJI[currentIndex + 1] : null;

  const navigateTo = (k: KanjiRecord) => {
    setCurrentKanji(k);
    const cached = storage.getCachedAiContent(k.id);
    setAiContent(cached || null);
    setAiError(null);
  };

  // Fetch Dynamic AI Enrichment using Groq (supports force refresh)
  const fetchAiEnrichment = async (force: boolean = false) => {
    setIsLoadingAi(true);
    setAiError(null);
    try {
      const res = await fetch('/api/ai/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kanji: currentKanji, forceRefresh: force })
      });
      const data = await res.json();
      if (data.success && data.content) {
        setAiContent(data.content);
        storage.setCachedAiContent(currentKanji.id, data.content);
      } else {
        setAiError(data.error || 'Failed to generate AI insights.');
      }
    } catch (e: any) {
      setAiError(e.message || 'Network error communicating with AI server.');
    } finally {
      setIsLoadingAi(false);
    }
  };

  // Fetch BRAND NEW practice sentences (bypasses cache and generates novel examples)
  const refreshNewSentences = async () => {
    if (!currentKanji || isLoadingSentences) return;
    setIsLoadingSentences(true);
    setAiError(null);
    try {
      const res = await fetch('/api/ai/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kanji: currentKanji,
          refreshSentencesOnly: true,
          existingSentences: aiContent?.bonus_sentences || []
        })
      });
      const data = await res.json();
      if (data.success && data.bonus_sentences) {
        setAiContent((prev: any) => {
          const updated = {
            ...(prev || {}),
            bonus_sentences: data.bonus_sentences
          };
          storage.setCachedAiContent(currentKanji.id, updated);
          return updated;
        });
        setSentenceSuccessToast(true);
        setTimeout(() => setSentenceSuccessToast(false), 3500);
      } else {
        setAiError(data.error || 'Failed to generate new sentences.');
      }
    } catch (e: any) {
      setAiError(e.message || 'Error communicating with Groq AI.');
    } finally {
      setIsLoadingSentences(false);
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'learned':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-950/60 text-green-700 dark:text-green-300">
            <CheckCircle2 size={13} /> Learned
          </span>
        );
      case 'needs_revision':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
            <AlertCircle size={13} /> Needs Revision
          </span>
        );
      case 'learning':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
            Learning
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
            Available to Learn
          </span>
        );
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40 flex items-center justify-center p-1 sm:p-5 bg-black/60 backdrop-blur-sm animate-fadeIn">
        <div className="relative w-full max-w-4xl max-h-[96vh] sm:max-h-[92vh] bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 flex flex-col overflow-hidden">
          {/* Top Bar with Status & Navigation */}
          <div className="flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-3.5 border-b border-stone-100 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/60 shrink-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                Lvl {currentKanji.level} • #{currentKanji.kanji_number}
              </span>
              {getStatusBadge()}
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Prev / Next buttons */}
              <button
                type="button"
                disabled={!prevKanji}
                onClick={() => prevKanji && navigateTo(prevKanji)}
                title={prevKanji ? `Previous Kanji: ${prevKanji.character}` : ''}
                className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                disabled={!nextKanji}
                onClick={() => nextKanji && navigateTo(nextKanji)}
                title={nextKanji ? `Next Kanji: ${nextKanji.character}` : ''}
                className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
              <div className="w-px h-5 bg-stone-200 dark:bg-stone-800 mx-0.5 sm:mx-1" />
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-500 cursor-pointer transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Subheader / Tabs - Scrollable on mobile */}
          <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 pt-2 sm:pt-3 border-b border-stone-100 dark:border-stone-800 bg-white dark:bg-stone-900 shrink-0 overflow-x-auto whitespace-nowrap scrollbar-none max-w-full">
            <button
              onClick={() => setActiveTab('study')}
              className={`pb-2.5 sm:pb-3 px-2.5 sm:px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${activeTab === 'study'
                  ? 'border-red-600 text-red-600 dark:text-red-400'
                  : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                }`}
            >
              <BookOpen size={14} />
              <span>Study Kanji</span>
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className={`pb-2.5 sm:pb-3 px-2.5 sm:px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${activeTab === 'practice'
                  ? 'border-red-600 text-red-600 dark:text-red-400'
                  : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                }`}
            >
              <PenTool size={14} />
              <span>Stroke Order & Writing</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('ai_insights');
                if (!aiContent && !isLoadingAi) {
                  fetchAiEnrichment();
                }
              }}
              className={`pb-2.5 sm:pb-3 px-2.5 sm:px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${activeTab === 'ai_insights'
                  ? 'border-red-600 text-red-600 dark:text-red-400'
                  : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                }`}
            >
              <BrainCircuit size={14} />
              <span>AI Insights (Groq)</span>
              {aiContent && <span className="w-1.5 h-1.5 rounded-full bg-green-500" />}
            </button>
          </div>

          {/* Scrollable Modal Content */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 space-y-4 sm:space-y-6">
            {activeTab === 'study' && (
              <div className="space-y-4 sm:space-y-6">
                {/* Hero Kanji Header */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl bg-stone-50/80 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800">
                  <div className="flex flex-col items-center justify-center w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-white dark:bg-stone-900 border border-red-100 dark:border-stone-700 shadow-md relative shrink-0">
                    <span className="font-japanese text-6xl sm:text-7xl font-bold text-stone-900 dark:text-stone-50">
                      {currentKanji.character}
                    </span>
                    <div className="absolute bottom-2 right-2">
                      <AudioButton text={currentKanji.character} size="sm" />
                    </div>
                  </div>

                  <div className="flex-1 text-center sm:text-left space-y-2">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <h2 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
                        {currentKanji.meaning}
                      </h2>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 font-medium">
                        JLPT N5
                      </span>
                    </div>

                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-stone-700 dark:text-stone-300 pt-1">
                        <span><strong className="text-stone-900 dark:text-stone-100">Strokes:</strong> {currentKanji.stroke_count}</span>
                        <span>•</span>
                        <span><strong className="text-stone-900 dark:text-stone-100">Radical:</strong> {currentKanji.radicals}</span>
                        <span>•</span>
                        <span><strong className="text-stone-900 dark:text-stone-100">Reading Guide:</strong> {currentKanji.hiragana_reading}</span>
                      </div>

                      {/* Mnemonic Pill */}
                      <div className="mt-3 p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 text-left">
                        <p className="font-semibold flex items-center gap-1.5 mb-0.5 text-amber-800 dark:text-amber-300">
                          <Sparkles size={13} /> Memory Mnemonic:
                        </p>
                        <p className="leading-relaxed">{currentKanji.mnemonic}</p>
                      </div>
                    </div>
                  </div>

                  {/* Readings Grid (Onyomi & Kunyomi) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Onyomi Card */}
                    <div className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-800/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-blue-500" />
                          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                            Onyomi (音読み) • Katakana
                          </h4>
                        </div>
                        {currentKanji.onyomi_readings[0] && (
                          <AudioButton text={currentKanji.onyomi_readings[0]} size="sm" />
                        )}
                      </div>
                      {currentKanji.onyomi_readings.length > 0 ? (
                        <div>
                          <p className="text-2xl font-japanese font-bold text-blue-600 dark:text-blue-400">
                            {currentKanji.onyomi_readings.join('、 ')}
                          </p>
                            <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                              Romaji: {currentKanji.onyomi_romaji.join(', ')}
                            </p>
                              <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-2">
                                Chinese-derived reading, commonly used in compound kanji words (熟語).
                              </p>
                            </div>
                            ) : (
                            <p className="text-xs text-stone-400 dark:text-stone-500 italic">No standard Onyomi reading.</p>
                    )}
                        </div>

                  {/* Kunyomi Card */}
                      <div className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-800/40 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-red-500" />
                            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                              Kunyomi (訓読み) • Hiragana
                            </h4>
                          </div>
                          {currentKanji.kunyomi_readings[0] && (
                            <AudioButton text={currentKanji.kunyomi_readings[0]} size="sm" />
                          )}
                        </div>
                        {currentKanji.kunyomi_readings.length > 0 ? (
                          <div>
                            <p className="text-2xl font-japanese font-bold text-red-600 dark:text-red-400">
                              {currentKanji.kunyomi_readings.join('、 ')}
                            </p>
                              <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                                Romaji: {currentKanji.kunyomi_romaji.join(', ')}
                              </p>
                                <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-2">
                                  Native Japanese reading, often used when kanji stands alone or with okurigana.
                                </p>
                              </div>
                              ) : (
                              <p className="text-xs text-stone-400 dark:text-stone-500 italic">No standard Kunyomi reading.</p>
                    )}
                          </div>
                </div>

                      {/* Vocabulary Words */}
                      <div className="space-y-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                            Essential Vocabulary ({currentKanji.vocabulary.length} words)
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {currentKanji.vocabulary.map((vocab, idx) => (
                              <div
                                key={idx}
                                className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-800/40 flex items-center justify-between gap-3"
                              >
                                <div className="space-y-0.5 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-base font-japanese font-bold text-stone-900 dark:text-stone-100">
                                      {vocab.word}
                                    </span>
                                      <span className="text-xs text-stone-500 dark:text-stone-400">
                                        【{vocab.hiragana}】
                                      </span>
                                  </div>
                                  <p className="text-xs text-stone-600 dark:text-stone-300 truncate">
                                    {vocab.meaning}
                                  </p>
                                    <div className="flex items-center gap-2 text-[10px] text-stone-500 dark:text-stone-400">
                                      <span>{vocab.romaji}</span>
                                      <span>•</span>
                                      <span className={`capitalize font-medium ${vocab.readingType === 'onyomi'
                                          ? 'text-blue-600 dark:text-blue-400'
                                          : vocab.readingType === 'kunyomi'
                                            ? 'text-red-600 dark:text-red-400'
                                            : 'text-stone-500'
                                        }`}>
                                        {vocab.readingType} reading
                                      </span>
                                    </div>
                                  </div>
                                  <AudioButton text={vocab.word} size="sm" />
                                </div>
                    ))}
                              </div>
                </div>

                          {/* Example Sentences */}
                          <div className="space-y-3">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                                Japanese Example Sentences ({currentKanji.example_sentences.length})
                              </h4>
                              <div className="space-y-2.5">
                                {currentKanji.example_sentences.map((sentence, idx) => (
                                  <div
                                    key={idx}
                                    className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-800/30 flex items-start justify-between gap-3"
                                  >
                                    <div className="space-y-1">
                                      <p className="text-sm font-japanese font-medium text-stone-900 dark:text-stone-100">
                                        {sentence.japanese}
                                      </p>
                                        <p className="text-xs text-stone-500 dark:text-stone-400 font-japanese">
                                          {sentence.hiragana}
                                        </p>
                                        <p className="text-xs text-stone-700 dark:text-stone-300 font-medium pt-0.5">
                                          {sentence.english}
                                        </p>
                                    </div>
                                    <AudioButton text={sentence.japanese} size="sm" />
                                  </div>
                                ))}
                              </div>
                          </div>
                      </div>
            )}

                      {activeTab === 'practice' && (
                        <div className="py-2">
                          <div className="text-center max-w-md mx-auto mb-4">
                            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                              Kanji Stroke Order & Writing Canvas
                            </h3>
                              <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                                Practice drawing 「{currentKanji.character}」 with your finger or mouse. Follow the stroke order guide to build muscle memory.
                              </p>
                          </div>
                          <StrokeCanvas
                            character={currentKanji.character}
                            strokeCount={currentKanji.stroke_count}
                            strokeDirections={currentKanji.stroke_order_data?.directions}
                          />
                        </div>
                      )}

                      {activeTab === 'ai_insights' && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <BrainCircuit size={18} className="text-red-600 dark:text-red-400" />
                              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                                Groq AI Pedagogical Enrichment
                              </h3>
                            </div>
                            <button
                              type="button"
                              disabled={isLoadingAi}
                              onClick={() => fetchAiEnrichment(true)}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors cursor-pointer"
                            >
                              <RefreshCw size={12} className={isLoadingAi ? 'animate-spin' : ''} />
                              <span>Regenerate Insights</span>
                            </button>
                          </div>

                          {isLoadingAi ? (
                            <div className="flex flex-col items-center justify-center py-12 space-y-3">
                              <Loader2 size={32} className="text-red-600 animate-spin" />
                                <p className="text-xs text-stone-600 dark:text-stone-400">
                                  Consulting Groq AI for deep etymology, office application, and reading tips...
                                </p>
                            </div>
                          ) : aiError ? (
                            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-300">
                              <p className="font-bold mb-1">AI Connection Notice:</p>
                              <p>{aiError}</p>
                              <p className="mt-2 text-[11px] text-stone-500">
                                You can configure your GROQ_API_KEY in the Settings tab. Offline lessons and verified dictionary content remain 100% accessible!
                              </p>
                            </div>
                          ) : aiContent ? (
                            <div className="space-y-4">
                              {/* Etymology */}
                              {aiContent.etymology_and_origin && (
                                <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-800/30">
                                  <h4 className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                                    📜 Historical Etymology & Kanji Shape Origin
                                  </h4>
                                  <MarkdownRenderer content={aiContent.etymology_and_origin} />
                                </div>
                              )}

                              {/* Reading guidance */}
                              {aiContent.reading_guidance && (
                                <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-800/30">
                                  <h4 className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                                    🎯 Onyomi vs Kunyomi Practical Application
                                  </h4>
                                  <MarkdownRenderer content={aiContent.reading_guidance} />
                                </div>
                              )}

                              {/* Office Context Tip */}
                              {aiContent.office_context_tip && (
                                <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20">
                                  <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider mb-1.5">
                                    💼 Office Worker & Real-world Usage Tip
                                  </h4>
                                  <MarkdownRenderer content={aiContent.office_context_tip} />
                                </div>
                              )}

                              {/* Bonus Sentences */}
                              {aiContent.bonus_sentences && Array.isArray(aiContent.bonus_sentences) && (
                                <div className="space-y-3 pt-1">
                                  <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                      <h4 className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                                        Additional AI-Generated Practice Sentences
                                      </h4>
                                      {sentenceSuccessToast && (
                                        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 animate-fadeIn">
                                          ✨ New examples loaded!
                                        </span>
                                      )}
                                    </div>

                                    <button
                                      type="button"
                                      disabled={isLoadingSentences}
                                      onClick={refreshNewSentences}
                                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-red-50 hover:bg-red-100 dark:bg-red-950/50 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/60 transition cursor-pointer disabled:opacity-50 shadow-xs shrink-0"
                                      title="Generate brand new AI example sentences"
                                    >
                                      <RefreshCw size={12} className={isLoadingSentences ? 'animate-spin' : ''} />
                                      <span>{isLoadingSentences ? 'Generating New...' : 'Get New Examples'}</span>
                                    </button>
                                  </div>

                                  <div className="space-y-2">
                                    {aiContent.bonus_sentences.map((bs: any, idx: number) => (
                                      <div
                                        key={idx}
                                        className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-800/40 flex items-start justify-between gap-3 shadow-xs hover:border-red-300 transition-colors"
                                      >
                                        <div className="space-y-0.5 text-xs">
                                          <p className="font-japanese text-sm font-bold text-stone-900 dark:text-stone-100">
                                            {bs.japanese}
                                          </p>
                                          <p className="text-stone-500 dark:text-stone-400 text-[11px] font-japanese">{bs.hiragana} ({bs.romaji})</p>
                                          <p className="text-stone-700 dark:text-stone-300 font-medium text-xs pt-0.5">{bs.english}</p>
                                        </div>
                                        <AudioButton text={bs.japanese} size="sm" />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="text-center py-8">
                              <button
                                type="button"
                                onClick={() => fetchAiEnrichment()}
                                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
                              >
                                Generate AI Educational Insights
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Bottom Bar: Action & Assessment Gate */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-3.5 sm:px-6 py-3 sm:py-4 border-t border-stone-100 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-900/80 shrink-0">
                        <div className="text-xs text-stone-500 dark:text-stone-400 text-center sm:text-left">
                          {status === 'learned' ? (
                            <span className="text-green-600 dark:text-green-400 font-semibold">
                              ✓ This kanji is in your learned test pool.
                            </span>
                          ) : (
                            <span>Pass the 80% assessment gate to mark as Learned and unlock test mode.</span>
                          )}
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto">
                          <button
                            type="button"
                            onClick={() => setIsAssessmentOpen(true)}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
                          >
                            <Award size={15} />
                            <span>{status === 'learned' ? 'Retake Mastery Assessment' : 'Take Assessment to Master'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Assessment Modal */}
                  {isAssessmentOpen && (
                    <KanjiAssessmentModal
                      kanji={currentKanji}
                      isOpen={isAssessmentOpen}
                      onClose={() => setIsAssessmentOpen(false)}
                      onPassed={() => {
                        onProgressUpdated();
                      }}
                    />
                  )}
                </>
                );
};
