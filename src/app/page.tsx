'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  LayoutDashboard, BookOpen, Zap, Layers, AlertTriangle,
  Calendar, Search, BarChart3, Bot, Settings as SettingsIcon,
  Flame, Clock, Moon, Sun, Menu, X, Sparkles, CheckCircle2, Cloud, GraduationCap,
  FileCheck, Calculator, RefreshCw, ShieldCheck, RotateCcw
} from 'lucide-react';
import { KanjiRecord, UserKanjiProgress, UserSettings, QuizQuestionType } from '@/types/kanji';
import { ALL_120_KANJI } from '@/data/kanjiDatabase';
import { storage, triggerAutoCloudSync } from '@/services/storage';
import {
  syncFullProjectToCloud,
  restoreAndMergeCloudData,
  recoverCompletedLevel1
} from '@/services/cloudSyncService';

// Views
import { DashboardView } from '@/components/DashboardView';
import { LearnKanjiView } from '@/components/LearnKanjiView';
import { QuizView } from '@/components/QuizView';
import { FlashcardsView } from '@/components/FlashcardsView';
import { WeakKanjiView } from '@/components/WeakKanjiView';
import { DailyPlanView } from '@/components/DailyPlanView';
import { LibraryView } from '@/components/LibraryView';
import { AnalyticsView } from '@/components/AnalyticsView';
import { AiTutorView } from '@/components/AiTutorView';
import { SettingsView } from '@/components/SettingsView';
import { MinnaDashboardView } from '@/components/minna/MinnaDashboardView';
import { MarkedVocabBatchView } from '@/components/minna/MarkedVocabBatchView';
import { VocabRelearningView } from '@/components/minna/VocabRelearningView';
import { getMarkedVocabCount, getRelearnVocabCount } from '@/services/vocabStorage';
import { MockExamHomeView } from '@/components/mockExam/MockExamHomeView';
import { CountersDashboardView } from '@/components/counters/CountersDashboardView';

// Modals
import { KanjiDetailModal } from '@/components/KanjiDetailModal';
import { KanjiAssessmentModal } from '@/components/KanjiAssessmentModal';
import { QuickStudyModal } from '@/components/QuickStudyModal';
import { LevelCompletionModal } from '@/components/LevelCompletionModal';

type NavView =
  | 'dashboard'
  | 'mock_exam'
  | 'counters'
  | 'minna'
  | 'batch_vocab'
  | 'relearn'
  | 'learn'
  | 'quiz'
  | 'flashcards'
  | 'weak'
  | 'plan'
  | 'library'
  | 'analytics'
  | 'ai_tutor'
  | 'settings';

export default function HomePage() {
  const [currentView, setCurrentView] = useState<NavView>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // App Data State
  const [progressList, setProgressList] = useState<UserKanjiProgress[]>([]);
  const [settings, setSettings] = useState<UserSettings>(storage.getSettings());
  const [isLoaded, setIsLoaded] = useState(false);

  // Modal State
  const [selectedKanji, setSelectedKanji] = useState<KanjiRecord | null>(null);
  const [assessmentKanji, setAssessmentKanji] = useState<KanjiRecord | null>(null);
  const [isAssessmentReTest, setIsAssessmentReTest] = useState(false);
  const [isQuickStudyOpen, setIsQuickStudyOpen] = useState(false);
  const [quizInitialMode, setQuizInitialMode] = useState<QuizQuestionType>('kanji_to_english');

  const [cloudSyncStatus, setCloudSyncStatus] = useState<'saved' | 'syncing' | 'offline'>('saved');
  const [syncToastMessage, setSyncToastMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [levelCompletionModalData, setLevelCompletionModalData] = useState<{
    level: number;
    status: 'success' | 'warning';
    errorMessage?: string;
  } | null>(null);

  const [markedVocabCount, setMarkedVocabCount] = useState(0);
  const [relearnVocabCount, setRelearnVocabCount] = useState(0);

  // Load storage state on mount
  const refreshData = () => {
    const p = storage.getProgress();
    const s = storage.getSettings();
    setProgressList(p);
    setSettings(s);
    setMarkedVocabCount(getMarkedVocabCount());
    setRelearnVocabCount(getRelearnVocabCount());
  };

  const handleManualSync = async () => {
    setCloudSyncStatus('syncing');
    setSyncToastMessage({ type: 'info', text: 'Synchronizing complete project to Supabase Cloud...' });

    const result = await syncFullProjectToCloud();
    if (result.success) {
      setCloudSyncStatus('saved');
      setSyncToastMessage({
        type: 'success',
        text: `✓ Complete Project Synced! ${result.syncedProgressCount ?? 120} Kanji records, levels, lessons, and tests verified in Supabase.`
      });
      refreshData();
    } else {
      setCloudSyncStatus('offline');
      setSyncToastMessage({
        type: 'error',
        text: `⚠ Sync Warning: ${result.error || 'Connection failed'}. Your progress is safely kept on your device.`
      });
    }

    setTimeout(() => {
      setSyncToastMessage(null);
    }, 6000);
  };

  useEffect(() => {
    // 1. Immediately load local data so UI appears with 0ms delay
    refreshData();
    setIsLoaded(true);

    // 2. Listen for background cloud sync events
    const handleStatus = (e: any) => {
      if (e.detail?.status) {
        setCloudSyncStatus(e.detail.status);
      }
    };

    const handleLevelSyncWarning = (e: any) => {
      if (e.detail?.level) {
        setLevelCompletionModalData({
          level: e.detail.level,
          status: 'warning',
          errorMessage: e.detail.error
        });
      }
    };

    const handleLevelSyncSuccess = (e: any) => {
      if (e.detail?.level) {
        setLevelCompletionModalData({
          level: e.detail.level,
          status: 'success'
        });
      }
    };

    const handleRefresh = () => {
      refreshData();
    };

    window.addEventListener('cloud-sync-status', handleStatus);
    window.addEventListener('level-completion-sync-warning', handleLevelSyncWarning);
    window.addEventListener('level-completion-verified', handleLevelSyncSuccess);
    window.addEventListener('project-data-refreshed', handleRefresh);
    window.addEventListener('vocab-status-updated', handleRefresh);

    // 3. Automatically restore & merge progress from Supabase Cloud DB
    async function restoreCloud() {
      try {
        const res = await restoreAndMergeCloudData();
        refreshData();
      } catch (e) {
        console.warn('Initial cloud restore error:', e);
      }
    }

    restoreCloud();

    return () => {
      window.removeEventListener('cloud-sync-status', handleStatus);
      window.removeEventListener('level-completion-sync-warning', handleLevelSyncWarning);
      window.removeEventListener('level-completion-verified', handleLevelSyncSuccess);
      window.removeEventListener('project-data-refreshed', handleRefresh);
      window.removeEventListener('vocab-status-updated', handleRefresh);
    };
  }, []);

  // Sync theme with HTML class
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (settings.theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [settings.theme]);

  const handleUpdateSettings = (updated: Partial<UserSettings>) => {
    const newSettings = { ...settings, ...updated };
    storage.saveSettings(newSettings);
    setSettings(newSettings);
  };

  const progressMap = useMemo(() => {
    const map: Record<number, UserKanjiProgress> = {};
    progressList.forEach((p) => {
      map[p.kanji_id] = p;
    });
    return map;
  }, [progressList]);

  // Derived counts
  const learnedCount = progressList.filter(p => p.learning_status === 'learned').length;
  const weakCount = progressList.filter(p => p.learning_status === 'needs_revision' || p.mistake_count > 0).length;
  const dueCount = progressList.filter(p => {
    if (p.learning_status !== 'learned' && p.learning_status !== 'needs_revision') return false;
    if (!p.next_review_at) return true;
    return new Date(p.next_review_at) <= new Date();
  }).length;

  const navItems: { id: NavView; label: string; icon: React.FC<{ className?: string }>; badge?: string | number; badgeColor?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'mock_exam', label: 'N5 Mock Exam', icon: FileCheck, badge: '90m Exam', badgeColor: 'bg-emerald-600 text-white' },
    { id: 'counters', label: 'Counters & Numbers', icon: Calculator, badge: 'Counters & Time', badgeColor: 'bg-teal-600 text-white' },
    { id: 'minna', label: 'Minna Curriculum', icon: GraduationCap, badge: '25 Lessons', badgeColor: 'bg-red-600 text-white' },
    { id: 'batch_vocab', label: 'Marked Vocab', icon: Layers, badge: markedVocabCount > 0 ? markedVocabCount : undefined, badgeColor: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300' },
    { id: 'relearn', label: 'Vocab Re-learning', icon: RotateCcw, badge: relearnVocabCount > 0 ? relearnVocabCount : undefined, badgeColor: 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300' },
    { id: 'learn', label: 'Learn Kanji', icon: BookOpen, badge: `${learnedCount}/120`, badgeColor: 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300' },
    { id: 'quiz', label: 'Practice & Quiz', icon: Zap },
    { id: 'flashcards', label: 'Flashcards', icon: Layers, badge: dueCount > 0 ? dueCount : undefined, badgeColor: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300' },
    { id: 'weak', label: 'Weak Kanji', icon: AlertTriangle, badge: weakCount > 0 ? weakCount : undefined, badgeColor: 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300' },
    { id: 'plan', label: '30-Day Plan', icon: Calendar },
    { id: 'library', label: 'Kanji Library', icon: Search },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'ai_tutor', label: 'Sensei AI', icon: Bot, badge: 'Groq', badgeColor: 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300' },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950 text-stone-600">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          <span className="font-japanese font-bold text-sm tracking-wider">読み込み中... (Loading N5 Kanji Master)</span>
        </div>
      </div>
    );
  }

  return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans flex flex-col selection:bg-red-500 selection:text-white w-full max-w-full overflow-x-hidden">
        {/* Top Application Header */}
            <header className="sticky top-0 z-30 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 w-full overflow-hidden">
              <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4 w-full min-w-0">
                {/* Logo / Brand */}
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    <button
                      onClick={() => setMobileMenuOpen(prev => !prev)}
                      className="lg:hidden p-1.5 sm:p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 shrink-0"
                    >
                      {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>

                    <div
                      onClick={() => setCurrentView('dashboard')}
                      className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group select-none min-w-0"
                    >
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 text-white flex items-center justify-center font-japanese font-black text-base sm:text-lg shadow-md group-hover:scale-105 transition-transform shrink-0">
                        漢
                      </div>
                      <div className="min-w-0">
                          <span className="font-black text-xs sm:text-base md:text-lg tracking-tight flex items-center gap-1.5 truncate">
                            N5 漢字マスター
                              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400 shrink-0 hidden xs:inline">
                                Groq AI
                              </span>
                            </span>
                            <span className="text-[10px] text-stone-400 hidden sm:block font-medium -mt-0.5 truncate">
                              120 Kanji Progressive Learning System
                            </span>
                          </div>
                      </div>
                    </div>

                    {/* Quick Stats & Controls */}
                    <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                      {/* Complete Project Synchronization Button */}
                      <button
                        type="button"
                        onClick={handleManualSync}
                        disabled={cloudSyncStatus === 'syncing'}
                        className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer transition shadow-xs ${cloudSyncStatus === 'saved'
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20'
                            : cloudSyncStatus === 'syncing'
                              ? 'bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300'
                              : 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300 hover:bg-amber-500/20'
                          }`}
                        title="Click to synchronize your entire project (all completed levels, kanji, lessons, quizzes) with Supabase Cloud Database"
                      >
                        <Cloud className={`w-3.5 h-3.5 ${cloudSyncStatus === 'saved'
                            ? 'text-emerald-500'
                            : cloudSyncStatus === 'syncing'
                              ? 'text-blue-500 animate-pulse'
                              : 'text-amber-500'
                          }`} />
                        <span className="hidden sm:inline text-[11px] font-bold">
                          {cloudSyncStatus === 'saved' ? 'Cloud Synced' : cloudSyncStatus === 'syncing' ? 'Syncing...' : 'Sync Now'}
                        </span>
                        <span className={`w-2 h-2 rounded-full ${cloudSyncStatus === 'saved' ? 'bg-emerald-500' : cloudSyncStatus === 'syncing' ? 'bg-blue-500 animate-ping' : 'bg-amber-500'
                          }`} />
                      </button>

                      {/* Streak Counter */}
                      <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-900 text-orange-700 dark:text-orange-400 text-xs font-bold shadow-sm shrink-0">
                        <Flame className="w-3.5 sm:w-4 h-3.5 sm:h-4 fill-current text-orange-500 animate-pulse" />
                        <span>
                          {settings.daily_streak || 1}
                          <span className="hidden sm:inline"> Day Streak</span>
                          <span className="sm:hidden">d</span>
                        </span>
                      </div>

                      {/* Quick 10-Min Office Session Launcher */}
                      <button
                        onClick={() => setIsQuickStudyOpen(true)}
                        className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm transition"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>10-Min Office Blitz</span>
                      </button>

                      {/* Theme Switcher Button */}
                      <button
                        onClick={() => handleUpdateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' })}
                        className="p-1.5 sm:p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
                        title="Toggle Light / Dark Mode"
                      >
                        {settings.theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
                      </button>
                    </div>
                  </div>
                </header>

                {/* Synchronization Feedback Toast Banner */}
                {syncToastMessage && (
                  <div className={`sticky top-16 z-25 px-4 py-2.5 backdrop-blur-md text-xs font-semibold flex items-center justify-between shadow-md transition-all animate-fadeIn ${syncToastMessage.type === 'success'
                      ? 'bg-emerald-600 text-white'
                      : syncToastMessage.type === 'error'
                        ? 'bg-rose-600 text-white'
                        : 'bg-stone-900/90 dark:bg-stone-800/90 text-white'
                    }`}>
                    <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        {syncToastMessage.type === 'success' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />
                        ) : syncToastMessage.type === 'error' ? (
                          <AlertTriangle className="w-4 h-4 text-rose-200 shrink-0" />
                        ) : (
                          <RefreshCw className="w-4 h-4 text-blue-200 animate-spin shrink-0" />
                        )}
                        <span>{syncToastMessage.text}</span>
                      </div>
                      <button
                        onClick={() => setSyncToastMessage(null)}
                        className="text-white/80 hover:text-white p-1 rounded-lg"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Main Layout Body */}
                  <div className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-4 sm:py-6 pb-24 lg:pb-8 flex flex-col lg:flex-row gap-0 lg:gap-6 min-w-0 overflow-x-hidden">
                    {/* Desktop Sidebar Navigation */}
                    <aside className="hidden lg:block w-64 shrink-0 space-y-1 select-none">
                      <div className="sticky top-24 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-3 shadow-sm space-y-1">
                        {navItems.map((item) => {
                          const Icon = item.icon;
                          const isActive = currentView === item.id;

                          return (
                            <button
                              key={item.id}
                              onClick={() => setCurrentView(item.id)}
                              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${isActive
                                ? 'bg-red-600 text-white shadow-md'
                                : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                                }`}
                            >
                              <div className="flex items-center gap-3">
                                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                                <span>{item.label}</span>
                              </div>

                              {item.badge && (
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${isActive ? 'bg-white/20 text-white' : item.badgeColor || 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
                                  }`}>
                                  {item.badge}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </aside>

                    {/* Mobile Navigation Drawer */}
                    {mobileMenuOpen && (
                      <div className="fixed inset-0 z-40 lg:hidden flex">
                        <div
                          className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm"
                          onClick={() => setMobileMenuOpen(false)}
                        />
                        <div className="relative w-72 max-w-[80%] bg-white dark:bg-stone-900 h-full p-4 shadow-2xl flex flex-col justify-between overflow-y-auto">
                          <div className="space-y-1">
                            <div className="pb-3 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
                              <span className="font-bold text-sm">Navigation Menu</span>
                              <button onClick={() => setMobileMenuOpen(false)}>
                                <X className="w-5 h-5 text-stone-400" />
                              </button>
                            </div>
                            <div className="pt-2 space-y-1">
                              {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = currentView === item.id;
                                return (
                                  <button
                                    key={item.id}
                                    onClick={() => {
                                      setCurrentView(item.id);
                                      setMobileMenuOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${isActive
                                      ? 'bg-red-600 text-white shadow-md'
                                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                                      }`}
                                  >
                                    <div className="flex items-center gap-3">
                                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                                      <span>{item.label}</span>
                                    </div>
                                    {item.badge && (
                                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${isActive ? 'bg-white/20 text-white' : item.badgeColor
                                        }`}>
                                        {item.badge}
                                      </span>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
                            <button
                              onClick={() => {
                                setIsQuickStudyOpen(true);
                                setMobileMenuOpen(false);
                              }}
                              className="w-full py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
                            >
                              <Clock className="w-4 h-4" />
                              10-Min Office Blitz
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Primary View Container */}
                        <main className="flex-1 min-w-0 w-full max-w-full overflow-hidden">
                          <div className={currentView === 'dashboard' ? 'w-full max-w-full min-w-0 block' : 'hidden'}>
                            <DashboardView
                              progressList={progressList}
                              settings={settings}
                              onNavigate={(view) => setCurrentView(view as NavView)}
                              onStartQuickStudy={() => setIsQuickStudyOpen(true)}
                            />
                          </div>

                            <div className={currentView === 'mock_exam' ? 'w-full max-w-full min-w-0 block' : 'hidden'}>
                              <MockExamHomeView
                                onNavigateHome={() => setCurrentView('dashboard')}
                              />
                            </div>

                              <div className={currentView === 'counters' ? 'w-full max-w-full min-w-0 block' : 'hidden'}>
                                <CountersDashboardView
                                  onNavigateHome={() => setCurrentView('dashboard')}
                                />
                              </div>

                                <div className={currentView === 'minna' ? 'w-full max-w-full min-w-0 block' : 'hidden'}>
                                  <MinnaDashboardView
                                    onNavigateHome={() => setCurrentView('dashboard')}
                                    onNavigateToBatch={() => setCurrentView('batch_vocab')}
                                    onNavigateToRelearn={() => setCurrentView('relearn')}
                                  />
                                </div>

                                <div className={currentView === 'batch_vocab' ? 'w-full max-w-full min-w-0 block' : 'hidden'}>
                                  <MarkedVocabBatchView
                                    onNavigateToMinna={() => setCurrentView('minna')}
                                    onNavigateToRelearn={() => setCurrentView('relearn')}
                                  />
                                </div>

                                <div className={currentView === 'relearn' ? 'w-full max-w-full min-w-0 block' : 'hidden'}>
                                  <VocabRelearningView
                                    onNavigateToMinna={() => setCurrentView('minna')}
                                    onNavigateToBatch={() => setCurrentView('batch_vocab')}
                                  />
                                </div>

                                  <div className={currentView === 'learn' ? 'w-full max-w-full min-w-0 block' : 'hidden'}>
                                    <LearnKanjiView
                                      kanjiList={ALL_120_KANJI}
                                      progressMap={progressMap}
                                      onSelectKanji={(k) => setSelectedKanji(k)}
                                      onStartAssessment={(k, isReTest) => {
                                        setAssessmentKanji(k);
                                        setIsAssessmentReTest(Boolean(isReTest));
                                      }}
                                      onOpenQuickStudy={() => setIsQuickStudyOpen(true)}
                                      onRefreshProgress={refreshData}
                                    />
                                  </div>

                                    <div className={currentView === 'quiz' ? 'w-full max-w-full min-w-0 block' : 'hidden'}>
                                      <QuizView
                                        progressMap={progressMap}
                                        onNavigateToLearn={() => setCurrentView('learn')}
                                        onNavigateToWeak={() => setCurrentView('weak')}
                                        onRefreshProgress={refreshData}
                                        initialMode={quizInitialMode}
                                      />
                                    </div>

                                      <div className={currentView === 'flashcards' ? 'w-full max-w-full min-w-0 block' : 'hidden'}>
                                        <FlashcardsView
                                          kanjiList={ALL_120_KANJI}
                                          progressMap={progressMap}
                                          onRefreshProgress={refreshData}
                                          onNavigateToLearn={() => setCurrentView('learn')}
                                        />
                                      </div>

                                        <div className={currentView === 'weak' ? 'w-full max-w-full min-w-0 block' : 'hidden'}>
                                          <WeakKanjiView
                                            kanjiList={ALL_120_KANJI}
                                            progressMap={progressMap}
                                            onSelectKanji={(k) => setSelectedKanji(k)}
                                            onStartAssessment={(k) => {
                                              setAssessmentKanji(k);
                                              setIsAssessmentReTest(true);
                                            }}
                                            onLaunchDrill={() => {
                                              setQuizInitialMode('kanji_to_english');
                                              setCurrentView('quiz');
                                            }}
                                            onRefreshProgress={refreshData}
                                          />
                                        </div>

                                          <div className={currentView === 'plan' ? 'w-full max-w-full min-w-0 block' : 'hidden'}>
                                            <DailyPlanView
                                              kanjiList={ALL_120_KANJI}
                                              progressMap={progressMap}
                                              onNavigateToLearn={() => setCurrentView('learn')}
                                              onOpenQuickStudy={() => setIsQuickStudyOpen(true)}
                                            />
                                          </div>

                                            <div className={currentView === 'library' ? 'w-full max-w-full min-w-0 block' : 'hidden'}>
                                              <LibraryView
                                                kanjiList={ALL_120_KANJI}
                                                progressMap={progressMap}
                                                onSelectKanji={(k) => setSelectedKanji(k)}
                                              />
                                            </div>

                                              <div className={currentView === 'analytics' ? 'w-full max-w-full min-w-0 block' : 'hidden'}>
                                                <AnalyticsView
                                                  kanjiList={ALL_120_KANJI}
                                                  progressMap={progressMap}
                                                />
                                              </div>

                                                <div className={currentView === 'ai_tutor' ? 'w-full max-w-full min-w-0 block' : 'hidden'}>
                                                  <AiTutorView
                                                    kanjiList={ALL_120_KANJI}
                                                    progressMap={progressMap}
                                                    onNavigateToSettings={() => setCurrentView('settings')}
                                                  />
                                                </div>

                                                  <div className={currentView === 'settings' ? 'w-full max-w-full min-w-0 block' : 'hidden'}>
                                                    <SettingsView
                                                      settings={settings}
                                                      onUpdateSettings={handleUpdateSettings}
                                                      onRefreshAllData={refreshData}
                                                    />
                                                  </div>
                                                </main>
                                              </div>

                                              {/* Mobile Bottom Navigation Bar (Persistent 1-Thumb Mobile App Experience) */}
                                              <nav className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-t border-stone-200 dark:border-stone-800 px-2 py-1.5 flex items-center justify-around shadow-lg">
                                                <button
                                                  onClick={() => setCurrentView('dashboard')}
                                                  className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition ${currentView === 'dashboard'
                                                    ? 'text-red-600 dark:text-red-400 font-bold'
                                                    : 'text-stone-500 dark:text-stone-400'
                                                    }`}
                                                >
                                                  <LayoutDashboard className="w-5 h-5 mb-0.5" />
                                                  <span className="text-[10px]">Home</span>
                                                </button>

                                                <button
                                                  onClick={() => setCurrentView('minna')}
                                                  className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition relative ${currentView === 'minna'
                                                    ? 'text-red-600 dark:text-red-400 font-bold'
                                                    : 'text-stone-500 dark:text-stone-400'
                                                    }`}
                                                >
                                                  <div className="relative">
                                                    <GraduationCap className="w-5 h-5 mb-0.5" />
                                                    <span className="absolute -top-1 -right-2 text-[8px] px-1 rounded-full bg-red-600 text-white font-mono font-bold leading-tight">
                                                      25
                                                    </span>
                                                  </div>
                                                  <span className="text-[10px]">Minna</span>
                                                </button>

                                                <button
                                                  onClick={() => setCurrentView('learn')}
                                                  className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition relative ${currentView === 'learn'
                                                    ? 'text-red-600 dark:text-red-400 font-bold'
                                                    : 'text-stone-500 dark:text-stone-400'
                                                    }`}
                                                >
                                                  <div className="relative">
                                                    <BookOpen className="w-5 h-5 mb-0.5" />
                                                    <span className="absolute -top-1 -right-2 text-[8px] px-1 rounded-full bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 font-mono font-bold leading-tight">
                                                      {learnedCount}
                                                    </span>
                                                  </div>
                                                  <span className="text-[10px]">Kanji</span>
                                                </button>

                                                <button
                                                  onClick={() => setCurrentView('quiz')}
                                                  className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition ${currentView === 'quiz'
                                                    ? 'text-red-600 dark:text-red-400 font-bold'
                                                    : 'text-stone-500 dark:text-stone-400'
                                                    }`}
                                                >
                                                  <Zap className="w-5 h-5 mb-0.5" />
                                                  <span className="text-[10px]">Quiz</span>
                                                </button>

                                                <button
                                                  onClick={() => setMobileMenuOpen(true)}
                                                  className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition ${mobileMenuOpen
                                                    ? 'text-red-600 dark:text-red-400 font-bold'
                                                    : 'text-stone-500 dark:text-stone-400'
                                                    }`}
                                                >
                                                  <Menu className="w-5 h-5 mb-0.5" />
                                                  <span className="text-[10px]">More</span>
                                                </button>
                                              </nav>

                                              {/* Global Modals */}
                                              {selectedKanji && (
                                                <KanjiDetailModal
                                                  kanji={selectedKanji}
                                                  isOpen={Boolean(selectedKanji)}
                                                  onClose={() => setSelectedKanji(null)}
                                                  onProgressUpdated={refreshData}
                                                />
                                              )}

                                              {assessmentKanji && (
                                                <KanjiAssessmentModal
                                                  kanji={assessmentKanji}
                                                  isReTest={isAssessmentReTest}
                                                  isOpen={Boolean(assessmentKanji)}
                                                  onClose={() => setAssessmentKanji(null)}
                                                  onPassed={refreshData}
                                                  onProgressUpdated={refreshData}
                                                />
                                              )}

                                              {isQuickStudyOpen && (
                                                <QuickStudyModal
                                                  isOpen={isQuickStudyOpen}
                                                  onClose={() => setIsQuickStudyOpen(false)}
                                                  onOpenKanjiDetail={(k) => {
                                                    setIsQuickStudyOpen(false);
                                                    setSelectedKanji(k);
                                                  }}
                                                />
                                              )}

                                              {levelCompletionModalData && (
                                                <LevelCompletionModal
                                                  level={levelCompletionModalData.level}
                                                  status={levelCompletionModalData.status}
                                                  errorMessage={levelCompletionModalData.errorMessage}
                                                  onClose={() => setLevelCompletionModalData(null)}
                                                  onRetrySuccess={() => {
                                                    refreshData();
                                                  }}
                                                />
                                              )}
                                            </div>
                                            );
}
