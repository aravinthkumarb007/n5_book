'use client';

import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, RefreshCw, ArrowRight, ShieldCheck, Cloud, X } from 'lucide-react';
import { syncFullProjectToCloud } from '@/services/cloudSyncService';

interface LevelCompletionModalProps {
  level: number;
  status: 'success' | 'warning';
  errorMessage?: string;
  onClose: () => void;
  onRetrySuccess?: () => void;
}

export function LevelCompletionModal({
  level,
  status: initialStatus,
  errorMessage: initialError,
  onClose,
  onRetrySuccess
}: LevelCompletionModalProps) {
  const [status, setStatus] = useState<'success' | 'warning'>(initialStatus);
  const [errorMessage, setErrorMessage] = useState(initialError);
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);
    try {
      const res = await syncFullProjectToCloud();
      if (res.success) {
        setStatus('success');
        setErrorMessage(undefined);
        onRetrySuccess?.();
      } else {
        setErrorMessage(res.error || 'Failed to save to cloud database. Please check your Neon configuration.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Network error occurred while contacting database.');
    } finally {
      setIsRetrying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-7 space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-xl"
        >
          <X size={18} />
        </button>

        {status === 'success' ? (
          <>
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 size={32} />
            </div>

            <div className="text-center space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                Database Verified
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white">
                Level {level} Conquered! 🎉
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                All 10 Kanji have been mastered and successfully recorded in your <strong>Neon Cloud Database</strong>. Level {level + 1} is now unlocked!
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-800 flex items-center gap-3 text-xs text-stone-600 dark:text-stone-300">
              <ShieldCheck size={18} className="text-emerald-500 shrink-0" />
              <span>Full progress, SRS repetitions, and unlocked levels are secured.</span>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <span>Continue Learning</span>
              <ArrowRight size={16} />
            </button>
          </>
        ) : (
          <>
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <AlertTriangle size={32} />
            </div>

            <div className="text-center space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
                Cloud Sync Fallback
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white">
                Level {level} Saved Locally
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                Your Level {level} completion is <strong>safely preserved on your device</strong>, but connecting to the cloud database encountered an issue.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300 font-mono">
                {errorMessage}
              </div>
            )}

            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-800 flex items-center gap-3 text-xs text-stone-600 dark:text-stone-300">
              <Cloud size={18} className="text-amber-500 shrink-0" />
              <span>No progress was lost. You can retry now or sync anytime using the Header Sync button.</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
              <button
                onClick={handleRetry}
                disabled={isRetrying}
                className="flex-1 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <RefreshCw size={15} className={isRetrying ? 'animate-spin' : ''} />
                <span>{isRetrying ? 'Retrying Database Sync...' : 'Retry Saving to Cloud'}</span>
              </button>
              <button
                onClick={onClose}
                className="py-3 px-4 rounded-2xl border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-bold text-xs sm:text-sm hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                Keep Locally & Continue
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

