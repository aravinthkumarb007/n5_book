'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { MarkedVocabBatchView } from '@/components/minna/MarkedVocabBatchView';
import { ArrowLeft, RotateCcw } from 'lucide-react';

export default function BatchVocabPage() {
  const router = useRouter();

  return (
        <main className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 p-3.5 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          <div className="mb-4 sm:mb-6 flex flex-wrap items-center justify-between gap-2.5">
            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs font-bold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition active:scale-95 shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => router.push('/relearn')}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs font-bold text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition active:scale-95 shadow-xs"
            >
              <RotateCcw className="w-4 h-4 text-rose-500" />
              <span>Vocabulary Re-learning Hub</span>
            </button>
          </div>

          <MarkedVocabBatchView
            onNavigateToMinna={() => router.push('/')}
            onNavigateToRelearn={() => router.push('/relearn')}
          />
        </main>
        );
}
