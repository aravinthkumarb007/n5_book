'use client';

import React, { useState, useEffect } from 'react';
import {
  Key, ShieldCheck, Zap, Server, CheckCircle2, AlertCircle,
  RefreshCw, Sliders, Database, Eye, EyeOff, Save, Trash2,
  Sun, Moon, Volume2, Sparkles, AlertTriangle, Cloud, CloudUpload, CloudDownload, ExternalLink, Globe
} from 'lucide-react';
import { UserSettings } from '@/types/kanji';
import { storage, triggerAutoCloudSync } from '@/services/storage';
import { setClientSupabaseCredentials } from '@/services/supabaseClient';
import { restoreAndMergeCloudData } from '@/services/cloudSyncService';
import { syncVocabStatusesFromBackend } from '@/services/vocabStorage';

interface SettingsViewProps {
  settings: UserSettings;
  onUpdateSettings: (newSettings: Partial<UserSettings>) => void;
  onRefreshAllData: () => void;
}

export function SettingsView({
  settings,
  onUpdateSettings,
  onRefreshAllData
}: SettingsViewProps) {
  // Groq API Form State
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('qwen/qwen3.8-27b');
  const [showKey, setShowKey] = useState(false);
  const [serverStatus, setServerStatus] = useState<{
    configured: boolean;
    maskedKey?: string;
    model?: string;
    endpoint?: string;
  } | null>(null);

  // Test Connection State
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
    latencyMs?: number;
    error?: string;
  } | null>(null);

  // Status message
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Google Gemini API Form State
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [geminiModel, setGeminiModel] = useState('gemini-3.5-flash');
  const [showGeminiKey, setShowGeminiKey] = useState(false);
  const [geminiStatus, setGeminiStatus] = useState<{
    configured: boolean;
    maskedKey?: string;
    model?: string;
    endpoint?: string;
    availableModels?: any[];
  } | null>(null);

  const [activeAiProvider, setActiveAiProviderState] = useState<'groq' | 'gemini'>('groq');

  // Gemini Test Connection State
  const [isTestingGemini, setIsTestingGemini] = useState(false);
  const [geminiTestResult, setGeminiTestResult] = useState<{
    success: boolean;
    message: string;
    latencyMs?: number;
    error?: string;
  } | null>(null);

  const [geminiSaveMessage, setGeminiSaveMessage] = useState<string | null>(null);

  // Supabase Cloud State
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseAnonKey, setSupabaseAnonKey] = useState('');
  const [showSupabaseKey, setShowSupabaseKey] = useState(false);
  const [supabaseStatus, setSupabaseStatus] = useState<{
    configured: boolean;
    url?: string;
    maskedKey?: string;
    hasKey?: boolean;
  } | null>(null);

  // Supabase Test Connection State
  const [isTestingSupabase, setIsTestingSupabase] = useState(false);
  const [supabaseTestResult, setSupabaseTestResult] = useState<{
    success: boolean;
    message: string;
    latencyMs?: number;
    error?: string;
  } | null>(null);

  // Supabase Save Status message
  const [supabaseSaveMessage, setSupabaseSaveMessage] = useState<string | null>(null);

  const [isSeedingKanji, setIsSeedingKanji] = useState(false);
  const [isSyncingProgress, setIsSyncingProgress] = useState(false);
  const [isRestoringProgress, setIsRestoringProgress] = useState(false);
  const [supabaseMessage, setSupabaseMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Load existing server config on mount
  useEffect(() => {
    fetch('/api/ai/config')
      .then(res => res.json())
      .then(data => {
        if (data.groq) {
          setServerStatus(data.groq);
          if (data.groq.model) setModel(data.groq.model);
        } else {
          setServerStatus(data);
          if (data.model) setModel(data.model);
        }
        if (data.gemini) {
          setGeminiStatus(data.gemini);
          if (data.gemini.model) setGeminiModel(data.gemini.model);
        }
        if (data.activeProvider) {
          setActiveAiProviderState(data.activeProvider);
        }
      })
      .catch(() => { });

    fetch('/api/supabase/status')
      .then(res => res.json())
      .then(data => setSupabaseStatus(data))
      .catch(() => { });
  }, []);

  const handleSeedKanjiToSupabase = async () => {
    setIsSeedingKanji(true);
    setSupabaseMessage(null);
    try {
      const res = await fetch('/api/supabase/seed', { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.success) {
        setSupabaseMessage({
          type: 'success',
          text: `✓ Success! Seeded all 120 Kanji, ${data.summary.readingsInserted} readings, and ${data.summary.vocabInserted} vocabulary items to Supabase!`
        });
      } else {
        setSupabaseMessage({
          type: 'error',
          text: `Error seeding: ${data.error || 'Failed'}`
        });
      }
    } catch (err: any) {
      setSupabaseMessage({ type: 'error', text: `Connection error: ${err.message}` });
    } finally {
      setIsSeedingKanji(false);
    }
  };

  const handleSyncProgressToSupabase = async () => {
    setIsSyncingProgress(true);
    setSupabaseMessage(null);
    try {
      const progressList = storage.getProgress();
      const quizHistory = storage.getQuizHistory();
      const currentSettings = storage.getSettings();

      const res = await fetch('/api/supabase/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          progressList,
          settings: currentSettings,
          quizHistory
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSupabaseMessage({
          type: 'success',
          text: `✓ Backed up! ${data.syncedProgressCount} Kanji progress records and ${data.syncedQuizzesCount} quiz logs synced to Supabase cloud.`
        });
      } else {
        setSupabaseMessage({
          type: 'error',
          text: `Sync error: ${data.error || 'Failed'}`
        });
      }
    } catch (err: any) {
      setSupabaseMessage({ type: 'error', text: `Connection error: ${err.message}` });
    } finally {
      setIsSyncingProgress(false);
    }
  };

  const handleRestoreProgressFromSupabase = async () => {
    setIsRestoringProgress(true);
    setSupabaseMessage(null);
    try {
      const res = await fetch('/api/supabase/sync');
      const data = await res.json();
      if (res.ok && data.success && data.progress && data.progress.length > 0) {
        storage.saveProgress(data.progress);
        onRefreshAllData();
        setSupabaseMessage({
          type: 'success',
          text: `✓ Restored! Successfully pulled ${data.progress.length} Kanji progress records from Supabase into your browser.`
        });
      } else {
        setSupabaseMessage({
          type: 'error',
          text: data.error || 'No progress records found in Supabase for this user.'
        });
      }
    } catch (err: any) {
      setSupabaseMessage({ type: 'error', text: `Restore error: ${err.message}` });
    } finally {
      setIsRestoringProgress(false);
    }
  };

  const handleSaveSupabaseConfig = async () => {
    setSupabaseSaveMessage(null);
    setSupabaseTestResult(null);

    const targetUrl = supabaseUrl.trim();
    const targetKey = supabaseAnonKey.trim();

    try {
      const res = await fetch('/api/supabase/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: targetUrl || undefined,
          anonKey: targetKey || undefined
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSupabaseStatus({
          configured: data.configured,
          url: data.url,
          maskedKey: data.maskedKey,
          hasKey: Boolean(data.maskedKey)
        });

        if (targetUrl && targetKey) {
          setClientSupabaseCredentials(targetUrl, targetKey);
        }

        setSupabaseUrl('');
        setSupabaseAnonKey('');
        setSupabaseSaveMessage('Supabase credentials securely saved and activated.');
        setTimeout(() => setSupabaseSaveMessage(null), 4000);

        // Auto fetch and sync cloud data into application state immediately without loss!
        try {
          setSupabaseSaveMessage('Supabase credentials saved. Automatically fetching all your progress and vocabulary data...');
          const cloudResult = await restoreAndMergeCloudData();
          const vocabResult = await syncVocabStatusesFromBackend();
          onRefreshAllData();
          window.dispatchEvent(new CustomEvent('project-data-refreshed'));
          window.dispatchEvent(new CustomEvent('vocab-status-updated'));

          const learnedCount = cloudResult?.learnedCount || 0;
          const vocabCount = Object.keys(vocabResult || {}).length;
          setSupabaseSaveMessage(
            `✓ Supabase connected! Automatically retrieved ${learnedCount} learned Kanji and ${vocabCount} marked vocabulary items without data loss.`
          );
          setTimeout(() => setSupabaseSaveMessage(null), 6000);
        } catch (fetchErr: any) {
          console.warn('Post-save auto fetch warning:', fetchErr);
          triggerAutoCloudSync();
        }
      } else {
        setSupabaseSaveMessage(`Error saving: ${data.error || 'Failed'}`);
      }
    } catch (err: any) {
      setSupabaseSaveMessage(`Network error: ${err.message}`);
    }
  };

  const handleTestSupabaseConnection = async () => {
    setIsTestingSupabase(true);
    setSupabaseTestResult(null);

    try {
      const res = await fetch('/api/supabase/test-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: supabaseUrl.trim() || undefined,
          anonKey: supabaseAnonKey.trim() || undefined
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSupabaseTestResult({
          success: true,
          message: data.message,
          latencyMs: data.latencyMs
        });
      } else {
        setSupabaseTestResult({
          success: false,
          message: 'Connection failed',
          error: data.error || 'Check your Supabase URL and Anon Key.'
        });
      }
    } catch (err: any) {
      setSupabaseTestResult({
        success: false,
        message: 'Network error',
        error: err.message
      });
    } finally {
      setIsTestingSupabase(false);
    }
  };

  const handleClearSupabaseConfig = async () => {
    try {
      await fetch('/api/supabase/status', { method: 'DELETE' });
      setClientSupabaseCredentials('', '');
      setSupabaseStatus({
        configured: false,
        url: '',
        maskedKey: '',
        hasKey: false
      });
      setSupabaseUrl('');
      setSupabaseAnonKey('');
      setSupabaseSaveMessage('Supabase credentials removed from server.');
      setTimeout(() => setSupabaseSaveMessage(null), 3000);
    } catch { }
  };

  const handleSaveGroqConfig = async () => {
    setSaveMessage(null);
    setTestResult(null);

    try {
      const res = await fetch('/api/ai/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: apiKey.trim() || undefined,
          model: model.trim()
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setServerStatus({
          configured: data.configured,
          maskedKey: data.maskedKey,
          model: data.model,
          endpoint: data.endpoint
        });
        setApiKey('');
        setSaveMessage('Groq API configuration securely saved to server runtime.');
        setTimeout(() => setSaveMessage(null), 4000);
      } else {
        setSaveMessage(`Error saving: ${data.error || 'Failed'}`);
      }
    } catch (err: any) {
      setSaveMessage(`Network error: ${err.message}`);
    }
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);

    try {
      const res = await fetch('/api/ai/test-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: apiKey.trim() || undefined,
          model: model.trim()
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setTestResult({
          success: true,
          message: data.message,
          latencyMs: data.latencyMs
        });
      } else {
        setTestResult({
          success: false,
          message: 'Connection failed',
          error: data.error || 'Check your Groq API key and network connectivity.'
        });
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: 'Network error',
        error: err.message
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleClearServerKey = async () => {
    try {
      await fetch('/api/ai/config?provider=groq', { method: 'DELETE' });
      setServerStatus({
        configured: false,
        maskedKey: '',
        model: 'llama-3.3-70b-versatile'
      });
      setApiKey('');
      setSaveMessage('Groq API key removed from server memory.');
      setTimeout(() => setSaveMessage(null), 3000);
    } catch { }
  };

  const handleSaveGeminiConfig = async () => {
    setGeminiSaveMessage(null);
    setGeminiTestResult(null);

    try {
      const res = await fetch('/api/ai/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: 'gemini',
          apiKey: geminiApiKey.trim() || undefined,
          model: geminiModel.trim(),
          activeProvider: activeAiProvider
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setGeminiStatus({
          configured: data.gemini?.configured ?? true,
          maskedKey: data.gemini?.maskedKey,
          model: data.gemini?.model || geminiModel,
          endpoint: data.gemini?.endpoint
        });
        setGeminiApiKey('');
        setGeminiSaveMessage('Google Gemini configuration securely saved to server runtime.');
        setTimeout(() => setGeminiSaveMessage(null), 4000);
      } else {
        setGeminiSaveMessage(`Error saving: ${data.error || 'Failed'}`);
      }
    } catch (err: any) {
      setGeminiSaveMessage(`Network error: ${err.message}`);
    }
  };

  const handleTestGeminiConnection = async () => {
    setIsTestingGemini(true);
    setGeminiTestResult(null);

    try {
      const res = await fetch('/api/ai/test-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: 'gemini',
          apiKey: geminiApiKey.trim() || undefined,
          model: geminiModel.trim()
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setGeminiTestResult({
          success: true,
          message: data.message,
          latencyMs: data.latencyMs
        });
      } else {
        setGeminiTestResult({
          success: false,
          message: 'Connection failed',
          error: data.error || 'Check your Google Gemini API key and network connectivity.'
        });
      }
    } catch (err: any) {
      setGeminiTestResult({
        success: false,
        message: 'Network error',
        error: err.message
      });
    } finally {
      setIsTestingGemini(false);
    }
  };

  const handleClearGeminiKey = async () => {
    try {
      await fetch('/api/ai/config?provider=gemini', { method: 'DELETE' });
      setGeminiStatus({
        configured: false,
        maskedKey: '',
        model: 'gemini-2.0-flash'
      });
      setGeminiApiKey('');
      setGeminiSaveMessage('Google Gemini API key removed from server memory.');
      setTimeout(() => setGeminiSaveMessage(null), 3000);
    } catch { }
  };

  const handleSwitchActiveAiProvider = async (provider: 'groq' | 'gemini') => {
    setActiveAiProviderState(provider);
    try {
      await fetch('/api/ai/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activeProvider: provider })
      });
    } catch { }
  };

  // Developer Seed Scenarios
  const handleSeedScenario = (scenarioNum: number) => {
    const freshMap: Record<number, any> = {};

    if (scenarioNum === 1) {
      // 0 learned
      storage.saveProgressMap({});
    } else if (scenarioNum === 2) {
      // 5 learned (Kanji 1-5)
      for (let i = 1; i <= 5; i++) {
        freshMap[i] = {
          kanji_id: i,
          learning_status: 'learned',
          learned_at: new Date().toISOString(),
          meaning_accuracy: 95,
          onyomi_accuracy: 90,
          kunyomi_accuracy: 85,
          vocabulary_accuracy: 90,
          revision_count: 1,
          mistake_count: 0,
          last_studied_at: new Date().toISOString(),
          next_review_at: new Date(Date.now() + 86400000).toISOString(),
          srs_interval: 1,
          srs_repetitions: 1,
          srs_ease_factor: 2.5,
          incorrect_history: []
        };
      }
      storage.saveProgressMap(freshMap);
    } else if (scenarioNum === 3) {
      // Level 1 complete (Kanji 1-10) -> Unlocks Level 2
      for (let i = 1; i <= 10; i++) {
        freshMap[i] = {
          kanji_id: i,
          learning_status: 'learned',
          learned_at: new Date().toISOString(),
          meaning_accuracy: 92,
          onyomi_accuracy: 88,
          kunyomi_accuracy: 90,
          vocabulary_accuracy: 85,
          revision_count: 2,
          mistake_count: 0,
          last_studied_at: new Date().toISOString(),
          next_review_at: new Date(Date.now() + 172800000).toISOString(),
          srs_interval: 3,
          srs_repetitions: 2,
          srs_ease_factor: 2.5,
          incorrect_history: []
        };
      }
      storage.saveProgressMap(freshMap);
    } else if (scenarioNum === 4) {
      // 30 kanji learned, with weak kanji
      for (let i = 1; i <= 30; i++) {
        const isWeak = i === 4 || i === 12 || i === 23;
        freshMap[i] = {
          kanji_id: i,
          learning_status: isWeak ? 'needs_revision' : 'learned',
          learned_at: new Date().toISOString(),
          meaning_accuracy: isWeak ? 60 : 90,
          onyomi_accuracy: isWeak ? 50 : 88,
          kunyomi_accuracy: isWeak ? 55 : 85,
          vocabulary_accuracy: isWeak ? 60 : 87,
          revision_count: 3,
          mistake_count: isWeak ? 3 : 0,
          last_studied_at: new Date().toISOString(),
          next_review_at: isWeak ? new Date(Date.now() - 3600000).toISOString() : new Date(Date.now() + 86400000).toISOString(),
          srs_interval: isWeak ? 1 : 4,
          srs_repetitions: isWeak ? 1 : 3,
          srs_ease_factor: 2.5,
          incorrect_history: isWeak ? ['Mistake in Onyomi selection', 'Mistake in Vocabulary meaning'] : []
        };
      }
      storage.saveProgressMap(freshMap);
    }

    onRefreshAllData();
    alert(`Scenario ${scenarioNum} loaded successfully!`);
  };

  const handleResetAllData = () => {
    if (confirm('Are you sure you want to reset all progress, quiz history, and session logs? This cannot be undone.')) {
      storage.resetAllData();
      onRefreshAllData();
      alert('All progress data has been reset to default.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 w-full max-w-full min-w-0 overflow-x-hidden">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-red-950 text-white p-6 md:p-8 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sliders className="w-3.5 h-3.5" />
            Configuration & AI Providers
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Settings & AI Engine
          </h1>
          <p className="text-stone-300 text-sm mt-1 max-w-xl">
            Configure Google Gemini API and Groq AI for intelligent quiz generation, adjust learning preferences, and backup progress.
          </p>
        </div>
      </div>

      {/* AI Engine Provider Selector */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-5 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-stone-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Active Primary AI Provider
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Choose your preferred AI engine for quiz generation, Sensei tutor, and mock exams. If one fails, the router automatically falls back.
            </p>
          </div>
          <div className="inline-flex rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 p-1 text-xs">
            <button
              type="button"
              onClick={() => handleSwitchActiveAiProvider('gemini')}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${activeAiProvider === 'gemini'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Google Gemini
              {geminiStatus?.configured && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
            </button>
            <button
              type="button"
              onClick={() => handleSwitchActiveAiProvider('groq')}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${activeAiProvider === 'groq'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
            >
              <Zap className="w-3.5 h-3.5" />
              Groq AI
              {serverStatus?.configured && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
            </button>
          </div>
        </div>
      </div>

      {/* 1. Google Gemini API Section */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-lg">
              ✦
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900 dark:text-white flex items-center gap-2">
                Google Gemini API Provider
                {geminiStatus?.configured ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Connected
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full">
                    <AlertTriangle className="w-3 h-3 text-amber-500" /> Key Required
                  </span>
                )}
                {activeAiProvider === 'gemini' && (
                  <span className="inline-flex items-center text-[10px] font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full">
                    Active Provider
                  </span>
                )}
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                High-speed, free-tier Google AI model for Japanese pedagogy, nuanced questions & furigana verification.
              </p>
            </div>
          </div>
        </div>

        {/* Free Tier Info & Security Notice */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Free-Tier Recommended: gemini-2.0-flash
            </div>
            <p className="opacity-90 leading-relaxed text-[11px]">
              Google AI Studio provides a free tier with <strong>15 RPM (requests per minute)</strong> and <strong>1,500 requests per day</strong>. Perfect for Japanese quiz generation at zero cost.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-200 space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              Server-Side Secure Key Isolation
            </div>
            <p className="opacity-90 leading-relaxed text-[11px]">
              Your Gemini API key is kept exclusively on the server runtime and never exposed to browser clients, bundles, or logs.
            </p>
          </div>
        </div>

        {/* Current Key Status Display */}
        {geminiStatus?.configured && (
          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 flex items-center justify-between text-xs">
            <div className="space-y-0.5">
              <span className="text-stone-400 font-medium block">Active Server Gemini Key:</span>
              <span className="font-mono font-bold text-stone-900 dark:text-white">
                {geminiStatus.maskedKey || 'AIza...configured'}
              </span>
            </div>
            <button
              onClick={handleClearGeminiKey}
              className="text-xs text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Remove Key
            </button>
          </div>
        )}

        {/* Gemini API Key Input */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1.5">
              Google Gemini API Key (starts with `AIza...`)
            </label>
            <div className="relative">
              <Key className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type={showGeminiKey ? 'text' : 'password'}
                placeholder={geminiStatus?.configured ? 'Enter new key to update...' : 'Paste your Google Gemini API key (AIza...)'}
                value={geminiApiKey}
                onChange={(e) => setGeminiApiKey(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/60 text-stone-900 dark:text-stone-100 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowGeminiKey(!showGeminiKey)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                {showGeminiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-stone-400 mt-1">
              Get a free API key instantly in <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold inline-flex items-center gap-1">Google AI Studio <ExternalLink className="w-3 h-3" /></a>.
            </p>
          </div>

          {/* Gemini Model Selector */}
          <div>
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1.5">
              Gemini Model Selection
            </label>
            <select
              value={geminiModel}
              onChange={(e) => setGeminiModel(e.target.value)}
              className="w-full px-4 py-2.5 text-xs font-semibold rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="gemini-3.5-flash">
                gemini-3.5-flash (Recommended • High Speed & Stability • Free Tier)
              </option>
              <option value="gemini-3.5-flash-lite">
                gemini-3.5-flash-lite (Fastest Latency • Lightweight)
              </option>
              <option value="gemini-3.8-flash">
                gemini-3.8-flash (Latest Flagship Reasoning)
              </option>
            </select>
          </div>

          {/* Buttons: Test & Save */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleTestGeminiConnection}
              disabled={isTestingGemini}
              className="flex-1 py-3 px-4 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-750 text-stone-800 dark:text-stone-200 font-bold text-xs transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-blue-500" />
              {isTestingGemini ? 'Testing Gemini Latency...' : 'Test Gemini Connection'}
            </button>

            <button
              onClick={handleSaveGeminiConfig}
              className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-md"
            >
              <Save className="w-4 h-4" />
              Save Gemini Settings
            </button>
          </div>

          {/* Feedback Display */}
          {geminiTestResult && (
            <div className={`p-4 rounded-xl text-xs flex items-start gap-3 animate-fadeIn ${geminiTestResult.success
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-200'
                : 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200'
              }`}>
              {geminiTestResult.success ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className="font-bold">
                  {geminiTestResult.success ? 'Google Gemini Connection Successful!' : 'Gemini Connection Failed'}
                </p>
                <p className="mt-0.5 text-[11px] opacity-90">
                  {geminiTestResult.message}
                </p>
                {geminiTestResult.latencyMs && (
                  <p className="mt-1 font-mono text-[10px] text-emerald-700 dark:text-emerald-300">
                    ⚡ Latency: {geminiTestResult.latencyMs}ms
                  </p>
                )}
                {geminiTestResult.error && (
                  <p className="mt-1 text-[11px] text-rose-700 dark:text-rose-300 font-mono">
                    {geminiTestResult.error}
                  </p>
                )}
              </div>
            </div>
          )}

          {geminiSaveMessage && (
            <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-xs text-stone-700 dark:text-stone-300 animate-fadeIn">
              {geminiSaveMessage}
            </div>
          )}
        </div>
      </div>

      {/* 2. Groq AI Section */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-black text-lg">
              G
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900 dark:text-white flex items-center gap-2">
                Groq AI Inference Provider
                {serverStatus?.configured ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Connected
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full">
                    <AlertTriangle className="w-3 h-3 text-amber-500" /> Key Required
                  </span>
                )}
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                Powers Sensei AI Tutor, Dynamic Kanji Insights, and Adaptive Quiz Generation.
              </p>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-200 space-y-1">
          <div className="flex items-center gap-1.5 font-bold">
            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            Server-Side Secure Key Isolation
          </div>
          <p className="opacity-90 leading-relaxed text-[11px]">
            Your Groq API key is processed exclusively on the Next.js server runtime (<code className="font-mono">/api/ai/...</code>) and is never exposed in browser client-side bundles or stored in client localStorage.
          </p>
        </div>

        {/* Current Key Status Display */}
        {serverStatus?.configured && (
          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 flex items-center justify-between text-xs">
            <div className="space-y-0.5">
              <span className="text-stone-400 font-medium block">Active Server Key:</span>
              <span className="font-mono font-bold text-stone-900 dark:text-white">
                {serverStatus.maskedKey || 'gsk_...configured'}
              </span>
            </div>
            <button
              onClick={handleClearServerKey}
              className="text-xs text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Remove Key
            </button>
          </div>
        )}

        {/* API Key Input */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1.5">
              Groq API Key (starts with `gsk_...`)
            </label>
            <div className="relative">
              <Key className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type={showKey ? 'text' : 'password'}
                placeholder={serverStatus?.configured ? 'Enter new key to update...' : 'Paste your Groq API key (gsk_...)'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/60 text-stone-900 dark:text-stone-100 font-mono focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-stone-400 mt-1">
              Obtain your free API key from the <a href="https://console.groq.com/keys" target="_blank" rel="noreferrer" className="text-red-600 hover:underline">Groq Cloud Console</a>.
            </p>
          </div>

          {/* Model Selector */}
          <div>
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1.5">
              Groq Model Selection
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full px-4 py-2.5 text-xs font-semibold rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="qwen/qwen3.8-27b">
                qwen/qwen3.8-27b (Recommended • Advanced Agentic Reasoning & Speed)
              </option>
              <option value="llama-3.3-70b-versatile">
                llama-3.3-70b-versatile (SOTA Japanese Reasoning & Speed)
              </option>
              <option value="llama-3.1-8b-instant">
                llama-3.1-8b-instant (Fastest Latency • ~150ms)
              </option>
              <option value="mixtral-8x7b-32768">
                mixtral-8x7b-32768 (Balanced MoE)
              </option>
            </select>
          </div>

          {/* Buttons: Test & Save */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleTestConnection}
              disabled={isTesting}
              className="flex-1 py-3 px-4 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-750 text-stone-800 dark:text-stone-200 font-bold text-xs transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Zap className="w-4 h-4 text-amber-500" />
              {isTesting ? 'Testing Latency...' : 'Test Groq Connection'}
            </button>

            <button
              onClick={handleSaveGroqConfig}
              className="flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-md"
            >
              <Save className="w-4 h-4" />
              Save Groq Settings
            </button>
          </div>

          {/* Feedback Display */}
          {testResult && (
            <div className={`p-4 rounded-xl text-xs flex items-start gap-3 animate-fadeIn ${testResult.success
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-200'
              : 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200'
              }`}>
              {testResult.success ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className="font-bold">
                  {testResult.success ? 'Groq AI Connection Successful!' : 'Connection Failed'}
                </p>
                <p className="mt-0.5 text-[11px] opacity-90">
                  {testResult.message}
                </p>
                {testResult.latencyMs && (
                  <p className="mt-1 font-mono text-[10px] text-emerald-700 dark:text-emerald-300">
                    ⚡ Latency: {testResult.latencyMs}ms
                  </p>
                )}
                {testResult.error && (
                  <p className="mt-1 text-[11px] text-rose-700 dark:text-rose-300 font-mono">
                    {testResult.error}
                  </p>
                )}
              </div>
            </div>
          )}

          {saveMessage && (
            <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-xs text-stone-700 dark:text-stone-300 animate-fadeIn">
              {saveMessage}
            </div>
          )}
        </div>
      </div>

      {/* Learning Preferences */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 md:p-8 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-stone-900 dark:text-white pb-3 border-b border-stone-100 dark:border-stone-800">
          Learning & App Preferences
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Daily Target */}
          <div>
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-2">
              Daily Kanji Target
            </label>
            <div className="flex items-center gap-2">
              {[2, 4, 6, 8].map((num) => (
                <button
                  key={num}
                  onClick={() => onUpdateSettings({ daily_target: num })}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${settings.daily_target === num
                    ? 'bg-red-600 text-white'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                    }`}
                >
                  {num} / day
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Session Duration */}
          <div>
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-2">
              Preferred Office Session Duration
            </label>
            <div className="flex items-center gap-2">
              {[5, 10, 15].map((mins) => (
                <button
                  key={mins}
                  onClick={() => onUpdateSettings({ preferred_session_duration: mins as any })}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${settings.preferred_session_duration === mins
                    ? 'bg-red-600 text-white'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                    }`}
                >
                  {mins} min
                </button>
              ))}
            </div>
          </div>

          {/* Speech Speed */}
          <div>
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-2">
              Japanese Pronunciation Speed
            </label>
            <div className="flex items-center gap-2">
              {[
                { label: '0.75x Slow', val: 0.75 },
                { label: '1.0x Normal', val: 1.0 },
                { label: '1.25x Fast', val: 1.25 }
              ].map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => onUpdateSettings({ audio_speed: opt.val })}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${settings.audio_speed === opt.val
                    ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                    }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Switcher */}
          <div>
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-2">
              Visual Theme
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdateSettings({ theme: 'light' })}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${settings.theme === 'light'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
                  }`}
              >
                <Sun className="w-3.5 h-3.5 text-amber-500" /> Light Washi
              </button>
              <button
                onClick={() => onUpdateSettings({ theme: 'dark' })}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${settings.theme === 'dark'
                  ? 'bg-red-600 text-white'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
                  }`}
              >
                <Moon className="w-3.5 h-3.5 text-indigo-300" /> Dark Sumi
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Supabase Cloud Database & Backup Card */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black shadow-xs">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900 dark:text-white flex items-center gap-2">
                Supabase Cloud Database & Storage
                {supabaseStatus?.configured ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Connected
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full">
                    <AlertTriangle className="w-3 h-3 text-amber-500" /> Credentials Required
                  </span>
                )}
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                Synchronize your 120-kanji syllabus, study streaks, quiz logs, and SRS intervals across all your devices in PostgreSQL.
              </p>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
          <div className="flex items-center gap-1.5 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            Server-Side Database Isolation & Backup
          </div>
          <p className="opacity-90 leading-relaxed text-[11px]">
            Your Supabase credentials are authenticated through secure Next.js server endpoints (<code className="font-mono">/api/supabase/...</code>) and saved in <code className="font-mono">.env.local</code> so your study progress remains completely private and encrypted.
          </p>
        </div>

        {/* Current Active Connection Status Display */}
        {supabaseStatus?.configured && (
          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-1">
              <div>
                <span className="text-stone-400 font-medium inline-block w-24">Project URL:</span>
                <span className="font-mono font-bold text-stone-900 dark:text-white">
                  {supabaseStatus.url || 'Configured'}
                </span>
              </div>
              <div>
                <span className="text-stone-400 font-medium inline-block w-24">Anon Key:</span>
                <span className="font-mono font-bold text-stone-900 dark:text-white">
                  {supabaseStatus.maskedKey || '••••••••••••••••'}
                </span>
              </div>
            </div>
            <button
              onClick={handleClearSupabaseConfig}
              className="text-xs text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 cursor-pointer shrink-0"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Disconnect Supabase
            </button>
          </div>
        )}

        {/* Credentials Form Inputs */}
        <div className="space-y-4">
          {/* Supabase URL */}
          <div>
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1.5">
              Supabase Project URL (e.g. `https://your-project.supabase.co`)
            </label>
            <div className="relative">
              <Globe className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder={supabaseStatus?.configured ? 'Enter new URL to update...' : 'https://your-project.supabase.co'}
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/60 text-stone-900 dark:text-stone-100 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <p className="text-[11px] text-stone-400 mt-1">
              Found in your <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-0.5">Supabase Dashboard <ExternalLink className="w-2.5 h-2.5" /></a> under <strong>Project Settings → API → Project URL</strong>.
            </p>
          </div>

          {/* Supabase Anon Key */}
          <div>
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1.5">
              Supabase Anon / Public Key (starts with `ey...`)
            </label>
            <div className="relative">
              <Key className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type={showSupabaseKey ? 'text' : 'password'}
                placeholder={supabaseStatus?.configured ? 'Enter new key to update...' : 'Paste your Supabase anon/public key (eyJhbGci...)'}
                value={supabaseAnonKey}
                onChange={(e) => setSupabaseAnonKey(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/60 text-stone-900 dark:text-stone-100 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={() => setShowSupabaseKey(!showSupabaseKey)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                {showSupabaseKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-stone-400 mt-1">
              Found in your Supabase Dashboard under <strong>Project Settings → API → Project API keys → anon public</strong>.
            </p>
          </div>

          {/* Actions: Test Connection & Save */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
            <button
              onClick={handleTestSupabaseConnection}
              disabled={isTestingSupabase || (!supabaseUrl && !supabaseStatus?.configured)}
              className="px-5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-bold text-xs transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <Zap className={`w-4 h-4 text-emerald-500 ${isTestingSupabase ? 'animate-spin' : ''}`} />
              <span>{isTestingSupabase ? 'Testing Connection...' : 'Test Connection'}</span>
            </button>

            <button
              onClick={handleSaveSupabaseConfig}
              disabled={(!supabaseUrl && !supabaseStatus?.configured) || (!supabaseAnonKey && !supabaseStatus?.hasKey)}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save & Activate</span>
            </button>
          </div>

          {/* Test Result Message Box */}
          {supabaseTestResult && (
            <div className={`p-4 rounded-xl border text-xs animate-fadeIn ${supabaseTestResult.success
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
              }`}>
              <div className="flex items-start gap-2.5">
                {supabaseTestResult.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-semibold">{supabaseTestResult.message}</p>
                  {supabaseTestResult.latencyMs && (
                    <p className="mt-1 text-[11px] font-mono text-emerald-700 dark:text-emerald-400">
                      ⚡ Latency: {supabaseTestResult.latencyMs}ms via Supabase PostgreSQL
                    </p>
                  )}
                  {supabaseTestResult.error && (
                    <p className="mt-1 text-[11px] text-rose-700 dark:text-rose-300 font-mono">
                      {supabaseTestResult.error}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {supabaseSaveMessage && (
            <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-xs text-stone-700 dark:text-stone-300 animate-fadeIn font-medium">
              {supabaseSaveMessage}
            </div>
          )}
        </div>

        {/* Database Setup Helper Note */}
        <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-800 text-xs space-y-2">
          <p className="font-bold text-stone-900 dark:text-white">Quick Database Initialization:</p>
          <p className="text-stone-600 dark:text-stone-300 text-[11px] leading-relaxed">
            If this is a new Supabase project, execute the SQL schema from <code className="px-1.5 py-0.5 rounded bg-stone-200 dark:bg-stone-700 font-mono font-bold">src/db/schema.sql</code> in your Supabase <strong>SQL Editor</strong>, then click <strong>Seed Master Kanji</strong> below to populate all 120 kanji.
          </p>
        </div>

        {/* Cloud Sync & Backup Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <button
            type="button"
            onClick={handleSeedKanjiToSupabase}
            disabled={isSeedingKanji}
            className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:border-emerald-500 text-left transition flex flex-col justify-between cursor-pointer disabled:opacity-50 shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-stone-900 dark:text-white">1. Seed Master Kanji</span>
                <Database className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
                Upload all 120 Kanji, readings, vocabulary & example sentences to Supabase.
              </p>
            </div>
            <div className="mt-3 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
              {isSeedingKanji ? 'Seeding 120 Kanji...' : 'Upload 120 Kanji →'}
            </div>
          </button>

          <button
            type="button"
            onClick={handleSyncProgressToSupabase}
            disabled={isSyncingProgress}
            className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:border-blue-500 text-left transition flex flex-col justify-between cursor-pointer disabled:opacity-50 shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-stone-900 dark:text-white">2. Backup Progress</span>
                <CloudUpload className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
                Sync your learned kanji, streaks, quiz logs, and SRS intervals to cloud.
              </p>
            </div>
            <div className="mt-3 text-[11px] font-bold text-blue-600 dark:text-blue-400">
              {isSyncingProgress ? 'Syncing to Cloud...' : 'Backup to Cloud →'}
            </div>
          </button>

          <button
            type="button"
            onClick={handleRestoreProgressFromSupabase}
            disabled={isRestoringProgress}
            className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:border-purple-500 text-left transition flex flex-col justify-between cursor-pointer disabled:opacity-50 shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-stone-900 dark:text-white">3. Restore Progress</span>
                <CloudDownload className="w-4 h-4 text-purple-600" />
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
                Pull your saved learning progress down from Supabase into your browser.
              </p>
            </div>
            <div className="mt-3 text-[11px] font-bold text-purple-600 dark:text-purple-400">
              {isRestoringProgress ? 'Pulling from Cloud...' : 'Restore from Cloud →'}
            </div>
          </button>
        </div>

        {/* Status Toast */}
        {supabaseMessage && (
          <div
            className={`p-3.5 rounded-xl border text-xs flex items-center gap-2 animate-fadeIn ${supabaseMessage.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-900 text-emerald-800 dark:text-emerald-200'
              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-900 text-rose-800 dark:text-rose-200'
              }`}
          >
            {supabaseMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span className="font-medium">{supabaseMessage.text}</span>
          </div>
        )}
      </div>

      {/* Developer Scenario Seeders */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 md:p-8 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-stone-900 dark:text-white pb-3 border-b border-stone-100 dark:border-stone-800 flex items-center gap-2">
          <Database className="w-4 h-4 text-red-600" />
          Developer Test Scenarios & Data Management
        </h2>
        <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
          Quickly simulate any student learning state to test progressive unlocks, strict learned-pool quiz generation, and mistake notebook workflows:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => handleSeedScenario(1)}
            className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/60 hover:border-red-500 text-left transition"
          >
            <div className="font-bold text-xs text-stone-900 dark:text-white">Scenario 1: Fresh Beginner</div>
            <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
              0 kanji learned • Level 1 available • Tests locked until 1 kanji passed.
            </div>
          </button>

          <button
            onClick={() => handleSeedScenario(2)}
            className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/60 hover:border-red-500 text-left transition"
          >
            <div className="font-bold text-xs text-stone-900 dark:text-white">Scenario 2: Level 1 in Progress</div>
            <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
              5 kanji learned (一 to 五) • Quiz engine strictly tests only these 5.
            </div>
          </button>

          <button
            onClick={() => handleSeedScenario(3)}
            className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/60 hover:border-red-500 text-left transition"
          >
            <div className="font-bold text-xs text-stone-900 dark:text-white">Scenario 3: Level 1 Completed (100%)</div>
            <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
              10 kanji learned • Level 2 automatically unlocks!
            </div>
          </button>

          <button
            onClick={() => handleSeedScenario(4)}
            className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/60 hover:border-red-500 text-left transition"
          >
            <div className="font-bold text-xs text-stone-900 dark:text-white">Scenario 4: Intermediate (30 Kanji)</div>
            <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
              Levels 1-3 unlocked • Weak kanji generated for notebook drills.
            </div>
          </button>
        </div>

        {/* Danger Zone */}
        <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-between items-center">
          <span className="text-xs text-stone-400">Want to start completely fresh?</span>
          <button
            onClick={handleResetAllData}
            className="px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100 text-xs font-bold transition flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Reset All User Data
          </button>
        </div>
      </div>
    </div>
  );
}
