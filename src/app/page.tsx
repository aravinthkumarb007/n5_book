'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, BookOpen, Zap, Layers, AlertTriangle, 
  Calendar, Search, BarChart3, Bot, Settings as SettingsIcon, 
  Flame, Clock, Moon, Sun, Menu, X, Sparkles, CheckCircle2, Cloud
} from 'lucide-react';
import { KanjiRecord, UserKanjiProgress, UserSettings, QuizQuestionType } from '@/types/kanji';
import { ALL_120_KANJI } from '@/data/kanjiDatabase';
import { storage, triggerAutoCloudSync } from '@/services/storage';

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

// Modals
import { KanjiDetailModal } from '@/components/KanjiDetailModal';
import { KanjiAssessmentModal } from '@/components/KanjiAssessmentModal';
import { QuickStudyModal } from '@/components/QuickStudyModal';

type NavView = 
  | 'dashboard' 
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

  // Load storage state on mount
  const refreshData = () => {
    const p = storage.getProgress();
    const s = storage.getSettings();
    setProgressList(p);
    setSettings(s);
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
    window.addEventListener('cloud-sync-status', handleStatus);

    // 3. Automatically restore progress from Supabase Cloud DB so you pick up exactly where you left off
    async function restoreCloudProgress() {
      try {
        setCloudSyncStatus('syncing');
        const res = await fetch('/api/supabase/sync');
        const data = await res.json();

        if (res.ok && data.success && data.hasCloudData && data.progress && data.progress.length > 0) {
          const currentLocal = storage.getProgress();
          const localLearned = currentLocal.filter(p => p.learning_status === 'learned').length;
          const cloudLearned = data.progress.filter((p: any) => p.learning_status === 'learned').length;

          // If cloud has equal or more progress, adopt cloud state!
          if (cloudLearned >= localLearned) {
            storage.saveProgress(data.progress);
            if (data.settings) {
              storage.saveSettings({ ...storage.getSettings(), ...data.settings });
            }
            refreshData();
          } else {
            // Local has newer progress, push local to cloud!
            triggerAutoCloudSync();
          }
          setCloudSyncStatus('saved');
        } else if (res.ok && (!data.hasCloudData || data.progress.length === 0)) {
          // Cloud is empty yet, auto-sync local progress to cloud
          triggerAutoCloudSync();
          setCloudSyncStatus('saved');
        } else {
          setCloudSyncStatus('saved');
        }
      } catch {
        setCloudSyncStatus('offline');
      }
    }

    restoreCloudProgress();

    return () => {
      window.removeEventListener('cloud-sync-status', handleStatus);
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
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans flex flex-col selection:bg-red-500 selection:text-white">
      {/* Top Application Header */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div 
              onClick={() => setCurrentView('dashboard')}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 text-white flex items-center justify-center font-japanese font-black text-lg shadow-md group-hover:scale-105 transition-transform">
                漢
              </div>
              <div>
                <span className="font-black text-base md:text-lg tracking-tight flex items-center gap-1.5">
                  N5 漢字マスター
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400">
                    Groq AI
                  </span>
                </span>
                <span className="text-[10px] text-stone-400 block font-medium -mt-0.5">
                  120 Kanji Progressive Learning System
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Cloud DB Sync Indicator */}
            <div 
              onClick={() => setCurrentView('settings')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer transition shadow-xs bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-emerald-500"
              title={
                cloudSyncStatus === 'saved'
                  ? 'All study progress is securely saved to Supabase cloud'
                  : cloudSyncStatus === 'syncing'
                  ? 'Syncing latest progress to Supabase cloud...'
                  : 'Saved locally in browser (Offline ready)'
              }
            >
              <Cloud className={`w-3.5 h-3.5 ${
                cloudSyncStatus === 'saved'
                  ? 'text-emerald-500'
                  : cloudSyncStatus === 'syncing'
                  ? 'text-blue-500 animate-pulse'
                  : 'text-stone-400'
              }`} />
              <span className="hidden md:inline text-[11px] font-bold text-stone-700 dark:text-stone-300">
                {cloudSyncStatus === 'saved' ? 'Cloud Synced' : cloudSyncStatus === 'syncing' ? 'Syncing...' : 'Local Storage'}
              </span>
              <span className={`w-2 h-2 rounded-full ${
                cloudSyncStatus === 'saved' ? 'bg-emerald-500' : cloudSyncStatus === 'syncing' ? 'bg-blue-500 animate-ping' : 'bg-stone-300 dark:bg-stone-700'
              }`} />
            </div>

            {/* Streak Counter */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-900 text-orange-700 dark:text-orange-400 text-xs font-bold shadow-sm">
              <Flame className="w-4 h-4 fill-current text-orange-500 animate-pulse" />
              <span>{settings.daily_streak || 1} Day Streak</span>
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
              className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
              title="Toggle Light / Dark Mode"
            >
              {settings.theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout Body */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex gap-6">
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
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                    isActive
                      ? 'bg-red-600 text-white shadow-md'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                      isActive ? 'bg-white/20 text-white' : item.badgeColor || 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
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
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                          isActive
                            ? 'bg-red-600 text-white shadow-md'
                            : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                            isActive ? 'bg-white/20 text-white' : item.badgeColor
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
        <main className="flex-1 min-w-0">
          <div className={currentView === 'dashboard' ? 'block' : 'hidden'}>
            <DashboardView
              progressList={progressList}
              settings={settings}
              onNavigate={(view) => setCurrentView(view as NavView)}
              onStartQuickStudy={() => setIsQuickStudyOpen(true)}
            />
          </div>

          <div className={currentView === 'learn' ? 'block' : 'hidden'}>
            <LearnKanjiView
              kanjiList={ALL_120_KANJI}
              progressMap={progressMap}
              onSelectKanji={(k) => setSelectedKanji(k)}
              onStartAssessment={(k, isReTest) => {
                setAssessmentKanji(k);
                setIsAssessmentReTest(Boolean(isReTest));
              }}
              onOpenQuickStudy={() => setIsQuickStudyOpen(true)}
            />
          </div>

          <div className={currentView === 'quiz' ? 'block' : 'hidden'}>
            <QuizView
              progressMap={progressMap}
              onNavigateToLearn={() => setCurrentView('learn')}
              onNavigateToWeak={() => setCurrentView('weak')}
              onRefreshProgress={refreshData}
              initialMode={quizInitialMode}
            />
          </div>

          <div className={currentView === 'flashcards' ? 'block' : 'hidden'}>
            <FlashcardsView
              kanjiList={ALL_120_KANJI}
              progressMap={progressMap}
              onRefreshProgress={refreshData}
              onNavigateToLearn={() => setCurrentView('learn')}
            />
          </div>

          <div className={currentView === 'weak' ? 'block' : 'hidden'}>
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

          <div className={currentView === 'plan' ? 'block' : 'hidden'}>
            <DailyPlanView
              kanjiList={ALL_120_KANJI}
              progressMap={progressMap}
              onNavigateToLearn={() => setCurrentView('learn')}
              onOpenQuickStudy={() => setIsQuickStudyOpen(true)}
            />
          </div>

          <div className={currentView === 'library' ? 'block' : 'hidden'}>
            <LibraryView
              kanjiList={ALL_120_KANJI}
              progressMap={progressMap}
              onSelectKanji={(k) => setSelectedKanji(k)}
            />
          </div>

          <div className={currentView === 'analytics' ? 'block' : 'hidden'}>
            <AnalyticsView
              kanjiList={ALL_120_KANJI}
              progressMap={progressMap}
            />
          </div>

          <div className={currentView === 'ai_tutor' ? 'block' : 'hidden'}>
            <AiTutorView
              kanjiList={ALL_120_KANJI}
              progressMap={progressMap}
              onNavigateToSettings={() => setCurrentView('settings')}
            />
          </div>

          <div className={currentView === 'settings' ? 'block' : 'hidden'}>
            <SettingsView
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
              onRefreshAllData={refreshData}
            />
          </div>
        </main>
      </div>

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
    </div>
  );
}
