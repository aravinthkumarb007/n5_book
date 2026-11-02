'use client';

import React, { useState, useEffect } from 'react';
import { X, Play, Pause, CheckCircle2, RotateCcw, Clock, ArrowRight, BookOpen, BrainCircuit } from 'lucide-react';
import { KanjiRecord } from '@/types/kanji';
import { storage } from '@/services/storage';
import { ALL_120_KANJI } from '@/data/kanjiDatabase';
import { AudioButton } from './AudioButton';

interface QuickStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenKanjiDetail: (kanji: KanjiRecord) => void;
}

export const QuickStudyModal: React.FC<QuickStudyModalProps> = ({
  isOpen,
  onClose,
  onOpenKanjiDetail
}) => {
  const [selectedDuration, setSelectedDuration] = useState<5 | 10 | 15>(10);
  const [sessionActive, setSessionActive] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(600);
  const [isPaused, setIsPaused] = useState(false);
  const [newKanji, setNewKanji] = useState<KanjiRecord[]>([]);
  const [reviseKanji, setReviseKanji] = useState<KanjiRecord[]>([]);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setupSession(selectedDuration);
    }
  }, [isOpen, selectedDuration]);

  // Focus timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (sessionActive && !isPaused && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining(prev => {
          if (prev <= 1) {
            setSessionCompleted(true);
            setSessionActive(false);
            storage.addStudySession({
              id: `session_${Date.now()}`,
              user_id: 'user_default',
              completed_at: new Date().toISOString(),
              session_duration: selectedDuration,
              kanji_studied: [...newKanji.map(k => k.id), ...reviseKanji.map(k => k.id)],
              quiz_score: 100,
              mode: selectedDuration === 5 ? 'quick_5' : selectedDuration === 10 ? 'quick_10' : 'quick_15'
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [sessionActive, isPaused, secondsRemaining]);

  const setupSession = (duration: 5 | 10 | 15) => {
    const newCount = duration === 5 ? 2 : 5;
    const reviseCount = duration === 5 ? 3 : duration === 10 ? 5 : 10;
    setSecondsRemaining(duration * 60);
    setSessionActive(false);
    setIsPaused(false);
    setSessionCompleted(false);

    const progress = storage.getProgress();

    // Available unlearned kanji
    const available = progress.filter(p => p.learning_status === 'available' || p.learning_status === 'learning');
    const availableKanji = available.map(p => ALL_120_KANJI.find(k => k.id === p.kanji_id)!).filter(Boolean);
    setNewKanji(availableKanji.slice(0, newCount));

    // Learned or revision kanji
    const learned = progress.filter(p => p.learning_status === 'learned' || p.learning_status === 'needs_revision');
    const learnedKanji = learned.map(p => ALL_120_KANJI.find(k => k.id === p.kanji_id)!).filter(Boolean);
    // Sort so weak ones come first
    setReviseKanji(learnedKanji.slice(0, reviseCount));
  };

  if (!isOpen) return null;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const timeFormatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400">
              <Clock size={18} />
            </span>
            <div>
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                Office Quick Study Session
              </h3>
              <p className="text-xs text-stone-500">
                Distraction-free learning tailored for working hours breaks
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-500 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Duration Selector */}
        {!sessionActive && !sessionCompleted && (
          <div className="p-6 space-y-6">
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Select your break duration. The session automatically organizes new kanji discovery and quick memory revisions:
            </p>

            <div className="grid grid-cols-3 gap-3">
              {[
                { min: 5, label: '5-Minute Blitz', sub: 'Learn 2 new • Revise 3' },
                { min: 10, label: '10-Minute Focus', sub: 'Learn 5 new • Revise 5' },
                { min: 15, label: '15-Minute Deep', sub: 'Learn 5 new • Revise 10 + Quiz' },
              ].map(plan => (
                <button
                  key={plan.min}
                  type="button"
                  onClick={() => {
                    setSelectedDuration(plan.min as any);
                    setupSession(plan.min as any);
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    selectedDuration === plan.min
                      ? 'border-red-600 bg-red-50/60 dark:bg-red-950/30 text-red-900 dark:text-red-200 ring-2 ring-red-500/20'
                      : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 bg-white dark:bg-stone-800/40 text-stone-800 dark:text-stone-300'
                  }`}
                >
                  <span className="text-xl font-bold block mb-1">{plan.min} min</span>
                  <span className="text-xs font-semibold block">{plan.label}</span>
                  <span className="text-[11px] text-stone-500 block mt-1">{plan.sub}</span>
                </button>
              ))}
            </div>

            {/* Curriculum Preview */}
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-700 dark:text-stone-300">
                    Targeted New Kanji ({newKanji.length})
                  </span>
                  <span className="text-stone-400">From currently available level</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newKanji.length > 0 ? (
                    newKanji.map(k => (
                      <div
                        key={k.id}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs shadow-xs"
                      >
                        <span className="font-japanese font-bold text-sm text-red-600">{k.character}</span>
                        <span>{k.meaning}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-xs text-stone-400 italic">No new kanji ready. Unlock Level 2+ by passing Level 1!</span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs pt-2">
                  <span className="font-bold text-stone-700 dark:text-stone-300">
                    Spaced Revision Pool ({reviseKanji.length})
                  </span>
                  <span className="text-stone-400">Previously learned or needing revision</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {reviseKanji.length > 0 ? (
                    reviseKanji.map(k => (
                      <div
                        key={k.id}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs shadow-xs"
                      >
                        <span className="font-japanese font-bold text-sm text-green-600">{k.character}</span>
                        <span>{k.meaning}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-xs text-stone-400 italic">No previous kanji yet. Complete your first lesson!</span>
                  )}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSessionActive(true)}
              className="w-full py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs shadow-lg shadow-red-600/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Play size={15} />
              <span>Start {selectedDuration}-Minute Office Session</span>
            </button>
          </div>
        )}

        {/* Active Session Mode */}
        {sessionActive && !sessionCompleted && (
          <div className="p-6 space-y-6">
            {/* Focus Clock Bar */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-stone-900 text-white shadow-md">
              <div className="flex items-center gap-3">
                <span className="font-mono text-3xl font-bold tracking-wider text-red-400">
                  {timeFormatted}
                </span>
                <span className="text-xs text-stone-400">Focus Mode Active</span>
              </div>
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-medium cursor-pointer transition-colors"
              >
                {isPaused ? <Play size={14} className="inline mr-1" /> : <Pause size={14} className="inline mr-1" />}
                {isPaused ? 'Resume' : 'Pause'}
              </button>
            </div>

            {/* Kanji Cards in Active Session */}
            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                1. Study New Kanji: Click to open full lesson & take assessment
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {newKanji.map(k => (
                  <div
                    key={k.id}
                    onClick={() => onOpenKanjiDetail(k)}
                    className="p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-800/50 hover:border-red-500 hover:shadow-md transition-all cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-japanese text-3xl font-bold text-stone-900 dark:text-stone-100">
                        {k.character}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-stone-900 dark:text-stone-100">{k.meaning}</p>
                        <p className="text-xs text-stone-500">{k.hiragana_reading}</p>
                      </div>
                    </div>
                    <AudioButton text={k.character} size="sm" />
                  </div>
                ))}
              </div>

              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 pt-3">
                2. Spaced Revision Cards
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {reviseKanji.map(k => (
                  <div
                    key={k.id}
                    onClick={() => onOpenKanjiDetail(k)}
                    className="p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-800/30 hover:border-stone-400 transition-all cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-japanese text-3xl font-bold text-stone-800 dark:text-stone-200">
                        {k.character}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-stone-900 dark:text-stone-100">{k.meaning}</p>
                        <p className="text-xs text-stone-500">{k.hiragana_reading}</p>
                      </div>
                    </div>
                    <AudioButton text={k.character} size="sm" />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setSessionCompleted(true);
                setSessionActive(false);
              }}
              className="w-full py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 text-xs font-semibold hover:bg-stone-100 dark:hover:bg-stone-800 transition-all cursor-pointer"
            >
              Complete Session Early
            </button>
          </div>
        )}

        {/* Session Finished Celebratory Screen */}
        {sessionCompleted && (
          <div className="p-8 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-950/60 text-green-600 dark:text-green-400 shadow-sm">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
              Break Session Complete!
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Great work! You dedicated {selectedDuration} focused minutes toward mastering your 120 N5 kanji target.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
