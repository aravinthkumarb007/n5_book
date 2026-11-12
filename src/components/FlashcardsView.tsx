'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  RotateCw, Volume2, Sparkles, CheckCircle2, AlertTriangle,
  Clock, ArrowRight, ArrowLeft, ArrowUp, Copy, Layers, Eye, BookOpen, ChevronRight,
  ChevronLeft, Shuffle, Check, X, Zap, CheckSquare, Square,
  Filter, Globe, ArrowLeftRight, HelpCircle, Trophy, RotateCcw,
  ShieldCheck, Search
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { KanjiRecord, UserKanjiProgress, FlashcardRating } from '@/types/kanji';
import { ALL_MINNA_LESSONS } from '@/data/minnaNoNihongo';
import { ALL_120_KANJI, LEVEL_METADATA } from '@/data/kanjiDatabase';
import { srsEngine } from '@/services/srs';
import { storage } from '@/services/storage';
import { speakJapanese } from '@/services/audio';
import { setVocabStatus } from '@/services/vocabStorage';
import { loadCustomLessons } from '@/services/minnaStorage';
import { getJapaneseWordDisplay, parseFurigana } from '@/utils/japaneseWordDisplay';
import { FuriganaText } from '@/components/common/FuriganaText';
import { useSwipeCard } from '@/utils/useSwipeCard';

/**
 * Fisher-Yates (Knuth) Unbiased Shuffle Algorithm
 * Ensures truly uniform randomized distribution without omissions or duplicates
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

export type FlashcardDirection = 'en_to_ja' | 'ja_to_en';
export type FlashcardStudyMode = 'en_to_ja' | 'ja_to_en' | 'combined';
export type FlashcardContentType = 'both' | 'vocab' | 'kanji';

export interface FlashcardItem {
  id: string;
  type: 'vocabulary' | 'kanji';
  lessonNumber: number;
  direction: FlashcardDirection;
  // Japanese representation
  primaryJapanese: string; // Vocab: Standard spelling. Kanji: Character
  secondaryJapanese?: string; // Vocab: Kanji/Reading. Kanji: Readings
  hiragana: string;
  kanji?: string;
  romaji: string;
  // English representation
  english: string;
  // Metadata
  partOfSpeech?: string;
  category?: string;
  exampleSentence?: {
    japanese: string;
    hiragana?: string;
    english?: string;
  };
  // Kanji specific
  onyomi?: string[];
  kunyomi?: string[];
  strokeCount?: number;
  mnemonic?: string;
}

interface FlashcardsViewProps {
  kanjiList: KanjiRecord[];
  progressMap: Record<number, UserKanjiProgress>;
  onRefreshProgress: () => void;
  onNavigateToLearn: () => void;
}


// Common Minna no Nihongo Kanji outside the base 120 Kanji list
const COMMON_EXTRA_KANJI: Record<string, { reading: string; romaji: string; meaning: string; onyomi?: string[]; kunyomi?: string[] }> = {
  '号': { reading: 'ごう', romaji: 'gō', meaning: 'number, signal, sign', onyomi: ['ゴウ'] },
  '信': { reading: 'しん', romaji: 'shin', meaning: 'trust, faith, signal', onyomi: ['シン'] },
  '曲': { reading: 'ま', romaji: 'ma', meaning: 'bend, turn, music', kunyomi: ['ま・がる', 'ま・げる'], onyomi: ['キョク'] },
  '開': { reading: 'あ', romaji: 'a', meaning: 'open, unlock', kunyomi: ['あ・ける', 'ひら・く'], onyomi: ['カイ'] },
  '閉': { reading: 'し', romaji: 'shi', meaning: 'close, shut', kunyomi: ['し・める', 'と・じる'], onyomi: ['ヘイ'] },
  '急': { reading: 'いそ', romaji: 'iso', meaning: 'hurry, urgent', kunyomi: ['いそ・ぐ'], onyomi: ['キュウ'] },
  '消': { reading: 'け', romaji: 'ke', meaning: 'extinguish, turn off, erase', kunyomi: ['け・す', 'き・える'], onyomi: ['ショウ'] },
  '待': { reading: 'ま', romaji: 'ma', meaning: 'wait', kunyomi: ['ま・つ'], onyomi: ['タイ'] },
  '止': { reading: 'と', romaji: 'to', meaning: 'stop, halt', kunyomi: ['と・める', 'と・まる'], onyomi: ['シ'] },
  '持': { reading: 'も', romaji: 'mo', meaning: 'hold, have', kunyomi: ['も・つ'], onyomi: ['ジ'] },
  '取': { reading: 'と', romaji: 'to', meaning: 'take, fetch', kunyomi: ['と・る'], onyomi: ['シュ'] },
  '伝': { reading: 'つた', romaji: 'tsuta', meaning: 'transmit, help', kunyomi: ['つた・える', 'つた・わる'], onyomi: ['デン'] },
  '呼': { reading: 'よ', romaji: 'yo', meaning: 'call, invite', kunyomi: ['よ・ぶ'], onyomi: ['コ'] },
  '降': { reading: 'ふ', romaji: 'fu', meaning: 'fall (rain), descend', kunyomi: ['ふ・る', 'お・りる'], onyomi: ['コウ'] },
  '使': { reading: 'つか', romaji: 'tsuka', meaning: 'use', kunyomi: ['つか・う'], onyomi: ['シ'] },
  '作': { reading: 'つく', romaji: 'tsuku', meaning: 'make, produce', kunyomi: ['つく・る'], onyomi: ['サク', 'サ'] },
  '知': { reading: 'し', romaji: 'shi', meaning: 'know', kunyomi: ['し・る'], onyomi: ['チ'] },
  '住': { reading: 'す', romaji: 'su', meaning: 'live, reside', kunyomi: ['す・む'], onyomi: ['ジュウ'] },
  '置': { reading: 'お', romaji: 'o', meaning: 'put, place', kunyomi: ['お・く'], onyomi: ['チ'] },
  '洗': { reading: 'あら', romaji: 'ara', meaning: 'wash', kunyomi: ['あら・う'], onyomi: ['セン'] },
  '借': { reading: 'か', romaji: 'ka', meaning: 'borrow, rent', kunyomi: ['か・りる'], onyomi: ['シャク'] },
  '貸': { reading: 'か', romaji: 'ka', meaning: 'lend, loan', kunyomi: ['か・す'], onyomi: ['タイ'] },
  '返': { reading: 'かえ', romaji: 'kae', meaning: 'return', kunyomi: ['かえ・す'], onyomi: ['ヘン'] },
  '払': { reading: 'はら', romaji: 'hara', meaning: 'pay', kunyomi: ['はら・う'], onyomi: ['フツ'] },
  '脱': { reading: 'ぬ', romaji: 'nu', meaning: 'take off (clothes)', kunyomi: ['ぬ・ぐ'], onyomi: ['ダツ'] },
  '残': { reading: 'のこ', romaji: 'noko', meaning: 'remain, leave behind', kunyomi: ['のこ・る'], onyomi: ['ザン'] },
  '忘': { reading: 'わす', romaji: 'wasu', meaning: 'forget', kunyomi: ['わす・れる'], onyomi: ['ボウ'] },
  '送': { reading: 'おく', romaji: 'oku', meaning: 'send, escort', kunyomi: ['おく・る'], onyomi: ['ソウ'] },
  '切': { reading: 'き', romaji: 'ki', meaning: 'cut', kunyomi: ['き・る'], onyomi: ['セツ'] },
  '覚': { reading: 'おぼ', romaji: 'obo', meaning: 'memorize, remember', kunyomi: ['おぼ・える'], onyomi: ['カク'] },
  '答': { reading: 'こた', romaji: 'kota', meaning: 'answer, reply', kunyomi: ['こた・える'], onyomi: ['トウ'] },
  '問': { reading: 'もん', romaji: 'mon', meaning: 'question, problem', onyomi: ['モン'] },
  '題': { reading: 'だい', romaji: 'dai', meaning: 'topic, subject, problem', onyomi: ['ダイ'] },
  '宿': { reading: 'しゅく', romaji: 'shuku', meaning: 'inn, lodge', onyomi: ['シュク'] },
  '試': { reading: 'し', romaji: 'shi', meaning: 'test, try', onyomi: ['シ'] },
  '験': { reading: 'けん', romaji: 'ken', meaning: 'verify, test', onyomi: ['ケン'] },
  '練': { reading: 'れん', romaji: 'ren', meaning: 'practice, train', onyomi: ['レン'] },
  '習': { reading: 'しゅう', romaji: 'shū', meaning: 'learn, practice', kunyomi: ['なら・う'], onyomi: ['シュウ'] },
  '教': { reading: 'おし', romaji: 'oshi', meaning: 'teach', kunyomi: ['おし・える'], onyomi: ['キョウ'] },
  '室': { reading: 'しつ', romaji: 'shitsu', meaning: 'room', onyomi: ['シツ'] },
  '堂': { reading: 'どう', romaji: 'dō', meaning: 'hall, public room', onyomi: ['ドウ'] },
  '所': { reading: 'ところ', romaji: 'tokoro', meaning: 'place', kunyomi: ['ところ'], onyomi: ['ショ'] },
  '屋': { reading: 'や', romaji: 'ya', meaning: 'shop, roof', kunyomi: ['や'], onyomi: ['オク'] },
  '銀': { reading: 'ぎん', romaji: 'gin', meaning: 'silver', onyomi: ['ギン'] },
  '病': { reading: 'びょう', romaji: 'byō', meaning: 'illness, sick', onyomi: ['ビョウ'] },
  '院': { reading: 'いん', romaji: 'in', meaning: 'institution', onyomi: ['イン'] },
  '医': { reading: 'い', romaji: 'i', meaning: 'doctor, medicine', onyomi: ['イ'] },
  '者': { reading: 'しゃ', romaji: 'sha', meaning: 'person', onyomi: ['シャ'] },
  '研': { reading: 'けん', romaji: 'ken', meaning: 'study, sharpen', onyomi: ['ケン'] },
  '究': { reading: 'きゅう', romaji: 'kyū', meaning: 'research, investigate', onyomi: ['キュウ'] },
  '誰': { reading: 'だれ', romaji: 'dare', meaning: 'who', kunyomi: ['だれ'] },
  '私': { reading: 'わたし', romaji: 'watashi', meaning: 'I, me', kunyomi: ['わたし'], onyomi: ['シ'] },
  '彼': { reading: 'かれ', romaji: 'kare', meaning: 'he, that', kunyomi: ['かれ'] },
  '兄': { reading: 'あに', romaji: 'ani', meaning: 'older brother', kunyomi: ['あに'], onyomi: ['ケイ'] },
  '姉': { reading: 'あね', romaji: 'ane', meaning: 'older sister', kunyomi: ['あね'], onyomi: ['シ'] },
  '弟': { reading: 'おとうと', romaji: 'otōto', meaning: 'younger brother', kunyomi: ['おとうと'], onyomi: ['テイ'] },
  '妹': { reading: 'いもうと', romaji: 'imōto', meaning: 'younger sister', kunyomi: ['いもうと'], onyomi: ['マイ'] },
  '夫': { reading: 'おっと', romaji: 'otto', meaning: 'husband', kunyomi: ['おっと'], onyomi: ['フ'] },
  '妻': { reading: 'つま', romaji: 'tsuma', meaning: 'wife', kunyomi: ['つま'], onyomi: ['サイ'] },
  '服': { reading: 'ふく', romaji: 'fuku', meaning: 'clothing, clothes', onyomi: ['フク'] },
  '色': { reading: 'いろ', romaji: 'iro', meaning: 'color', kunyomi: ['いろ'], onyomi: ['ショク'] },
  '茶': { reading: 'ちゃ', romaji: 'cha', meaning: 'tea', onyomi: ['チャ', 'サ'] },
  '酒': { reading: 'さけ', romaji: 'sake', meaning: 'alcohol, sake', kunyomi: ['さけ'], onyomi: ['シュ'] },
  '肉': { reading: 'にく', romaji: 'niku', meaning: 'meat', onyomi: ['ニク'] },
  '魚': { reading: 'さかな', romaji: 'sakana', meaning: 'fish', kunyomi: ['さかな'], onyomi: ['ギョ'] },
  '物': { reading: 'もの', romaji: 'mono', meaning: 'thing, object', kunyomi: ['もの'], onyomi: ['ブツ'] },
  '鳥': { reading: 'とり', romaji: 'tori', meaning: 'bird', kunyomi: ['とり'], onyomi: ['チョウ'] },
  '犬': { reading: 'いぬ', romaji: 'inu', meaning: 'dog', kunyomi: ['いぬ'], onyomi: ['ケン'] },
  '猫': { reading: 'ねこ', romaji: 'neko', meaning: 'cat', kunyomi: ['ねこ'], onyomi: ['ビョウ'] },
  '道': { reading: 'みち', romaji: 'michi', meaning: 'road, way', kunyomi: ['みち'], onyomi: ['ドウ'] },
  '橋': { reading: 'はし', romaji: 'hashi', meaning: 'bridge', kunyomi: ['はし'], onyomi: ['キョウ'] },
  '角': { reading: 'かど', romaji: 'kado', meaning: 'corner', kunyomi: ['かど'], onyomi: ['カク'] },
  '門': { reading: 'もん', romaji: 'mon', meaning: 'gate', onyomi: ['モン'] },
  '風': { reading: 'かぜ', romaji: 'kaze', meaning: 'wind', kunyomi: ['かぜ'], onyomi: ['フウ'] },
  '雨': { reading: 'あめ', romaji: 'ame', meaning: 'rain', kunyomi: ['あめ'], onyomi: ['ウ'] },
  '雪': { reading: 'ゆき', romaji: 'yuki', meaning: 'snow', kunyomi: ['ゆき'], onyomi: ['セツ'] },
  '春': { reading: 'はる', romaji: 'haru', meaning: 'spring', kunyomi: ['はる'], onyomi: ['シュン'] },
  '夏': { reading: 'なつ', romaji: 'natsu', meaning: 'summer', kunyomi: ['なつ'], onyomi: ['カ'] },
  '秋': { reading: 'あき', romaji: 'aki', meaning: 'autumn', kunyomi: ['あき'], onyomi: ['シュウ'] },
  '冬': { reading: 'ふゆ', romaji: 'fuyu', meaning: 'winter', kunyomi: ['ふゆ'], onyomi: ['トウ'] },
  '音': { reading: 'おと', romaji: 'oto', meaning: 'sound', kunyomi: ['おと'], onyomi: ['オン'] },
  '字': { reading: 'じ', romaji: 'ji', meaning: 'character, letter', onyomi: ['ジ'] },
  '文': { reading: 'ぶん', romaji: 'bun', meaning: 'sentence, text', onyomi: ['ブン'] },
  '紙': { reading: 'かみ', romaji: 'kami', meaning: 'paper', kunyomi: ['かみ'], onyomi: ['シ'] },
  '手': { reading: 'て', romaji: 'te', meaning: 'hand', kunyomi: ['て'], onyomi: ['シュ'] },
  '頭': { reading: 'あたま', romaji: 'atama', meaning: 'head', kunyomi: ['あたま'], onyomi: ['トウ', 'ズ'] },
  '顔': { reading: 'かお', romaji: 'kao', meaning: 'face', kunyomi: ['かお'], onyomi: ['ガン'] },
  '体': { reading: 'からだ', romaji: 'karada', meaning: 'body', kunyomi: ['からだ'], onyomi: ['タイ'] },
  '心': { reading: 'こころ', romaji: 'kokoro', meaning: 'heart, spirit', kunyomi: ['こころ'], onyomi: ['シン'] },
  '力': { reading: 'ちから', romaji: 'chikara', meaning: 'power, strength', kunyomi: ['ちから'], onyomi: ['リョク'] },
  '写': { reading: 'しゃ', romaji: 'sha', meaning: 'copy, photograph', onyomi: ['シャ'] },
  '真': { reading: 'しん', romaji: 'shin', meaning: 'true, truth', onyomi: ['シン'] },
  '旅': { reading: 'りょ', romaji: 'ryo', meaning: 'travel, trip', kunyomi: ['たび'], onyomi: ['リョ'] },
  '自': { reading: 'じ', romaji: 'ji', meaning: 'oneself', onyomi: ['ジ'] },
  '動': { reading: 'どう', romaji: 'dō', meaning: 'move, motion', kunyomi: ['うご・く'], onyomi: ['ドウ'] },
  '運': { reading: 'うん', romaji: 'un', meaning: 'carry, transport, fortune', kunyomi: ['はこ・ぶ'], onyomi: ['ウン'] },
  '転': { reading: 'てん', romaji: 'ten', meaning: 'revolve, turn', onyomi: ['テン'] }
};

// Dynamic responsive font size helper for Japanese flashcard text
function getJapaneseTextClass(text: string, isKanjiChar = false): string {
  if (isKanjiChar) {
    return 'text-5xl xs:text-6xl sm:text-7xl md:text-8xl font-black font-japanese text-stone-900 dark:text-white drop-shadow-xs';
  }
  const len = text ? text.length : 0;
  if (len <= 4) {
    return 'text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-black font-japanese text-stone-900 dark:text-white tracking-wide break-words px-2';
  }
  if (len <= 8) {
    return 'text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black font-japanese text-stone-900 dark:text-white tracking-wide break-words px-2';
  }
  if (len <= 14) {
    return 'text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black font-japanese text-stone-900 dark:text-white tracking-wide break-words px-2 leading-snug';
  }
  if (len <= 20) {
    return 'text-xl xs:text-2xl sm:text-3xl md:text-4xl font-extrabold font-japanese text-stone-900 dark:text-white tracking-normal break-words px-2 leading-relaxed';
  }
  return 'text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold font-japanese text-stone-900 dark:text-white tracking-normal break-words px-2 leading-relaxed';
}

// Dynamic responsive font size helper for English flashcard text
function getEnglishTextClass(text: string): string {
  const len = text ? text.length : 0;
  if (len <= 16) {
    return 'text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 dark:text-white leading-tight break-words px-2';
  }
  if (len <= 32) {
    return 'text-xl xs:text-2xl sm:text-3xl md:text-4xl font-black text-stone-900 dark:text-white leading-snug break-words px-2';
  }
  if (len <= 55) {
    return 'text-lg xs:text-xl sm:text-2xl md:text-3xl font-extrabold text-stone-900 dark:text-white leading-relaxed break-words px-2';
  }
  return 'text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-stone-900 dark:text-white leading-relaxed break-words px-2';
}

export function FlashcardsView({
  kanjiList,
  progressMap,
  onRefreshProgress,
  onNavigateToLearn
}: FlashcardsViewProps) {
  // Navigation / View Tabs
  const [activeTab, setActiveTab] = useState<'studio' | 'srs'>('studio');

  // Studio Phase: 'select_lessons' | 'select_mode' | 'active_player' | 'session_complete'
  const [phase, setPhase] = useState<'select_lessons' | 'select_mode' | 'active_player' | 'session_complete'>('select_lessons');

  // Lesson & Content Selection State
  const [selectedLessons, setSelectedLessons] = useState<number[]>([1]);
  const [contentType, setContentType] = useState<FlashcardContentType>('both');
  const [lessonSearch, setLessonSearch] = useState('');

  // Active Flashcard Session State
  const [studyMode, setStudyMode] = useState<FlashcardStudyMode>('combined');
  const [sessionCards, setSessionCards] = useState<FlashcardItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [contentFilter, setContentFilter] = useState<'all' | 'vocab' | 'kanji'>('all');
  const [showFurigana, setShowFurigana] = useState(true);
  const [cardStatusToast, setCardStatusToast] = useState<{ id: string; message: string } | null>(null);
  const [copiedFace, setCopiedFace] = useState<'front' | 'back' | null>(null);

  // Legacy SRS State (Preserved for Spaced Repetition Due Queue)
  const [srsFilterMode, setSrsFilterMode] = useState<'due' | 'weak' | 'all'>('due');
  const [srsSelectedLevel, setSrsSelectedLevel] = useState<number | 'all'>('all');
  const [srsCurrentIndex, setSrsCurrentIndex] = useState(0);
  const [srsIsFlipped, setSrsIsFlipped] = useState(false);
  const [srsSessionCompleted, setSrsSessionCompleted] = useState(false);
  const [srsReviewedCount, setSrsReviewedCount] = useState(0);

  // All available lessons (Minna 1-25 + custom lessons)
  const allLessons = useMemo(() => {
    const list = [...ALL_MINNA_LESSONS];
    if (typeof window !== 'undefined') {
      try {
        const custom = loadCustomLessons();
        if (Array.isArray(custom)) {
          custom.forEach((c: any, idx: number) => {
            const lessonNum = typeof c.lessonNumber === 'number' ? c.lessonNumber : (100 + idx + 1);
            if (!list.some(l => l.lessonNumber === lessonNum)) {
              list.push({
                lessonNumber: lessonNum,
                title: c.title || ('Custom Lesson ' + (idx + 1)),
                titleJapanese: c.titleJapanese || c.title || ('カスタム ' + (idx + 1)),
                level: c.level || 'N5',
                description: c.description || 'Custom User Lesson',
                vocabulary: c.vocabulary || [],
                grammar: c.grammar || [],
                exercises: []
              } as any);
            }
          });
        }
      } catch { }
    }
    return list.sort((a, b) => a.lessonNumber - b.lessonNumber);
  }, []);

  // Filter lessons in selection screen
  const filteredLessonList = useMemo(() => {
    if (!lessonSearch.trim()) return allLessons;
    const q = lessonSearch.toLowerCase().trim();
    return allLessons.filter(l =>
      l.lessonNumber.toString() === q ||
      l.title.toLowerCase().includes(q) ||
      (l.titleJapanese && l.titleJapanese.includes(q))
    );
  }, [allLessons, lessonSearch]);

  // Calculate live preview counts for selected lessons
  const selectedCounts = useMemo(() => {
    let vocabCount = 0;
    const uniqueKanji = new Set<string>();

    selectedLessons.forEach(lNum => {
      const lesson = allLessons.find(l => l.lessonNumber === lNum);
      if (lesson) {
        vocabCount += lesson.vocabulary.length;
        lesson.vocabulary.forEach(v => {
          if (v.kanji) {
            const matches = v.kanji.match(/[\u4E00-\u9FAF]/g);
            if (matches) matches.forEach(ch => uniqueKanji.add(ch));
          }
        });
      }
    });

    const kanjiCount = uniqueKanji.size;
    let totalCards = 0;
    if (contentType === 'both') totalCards = vocabCount + kanjiCount;
    else if (contentType === 'vocab') totalCards = vocabCount;
    else if (contentType === 'kanji') totalCards = kanjiCount;

    return { vocabCount, kanjiCount, totalCards };
  }, [selectedLessons, contentType, allLessons]);

  // Toggle single lesson selection
  const toggleLesson = (lessonNum: number) => {
    setSelectedLessons(prev => {
      if (prev.includes(lessonNum)) {
        return prev.filter(n => n !== lessonNum);
      } else {
        return [...prev, lessonNum].sort((a, b) => a - b);
      }
    });
  };

  // Select all lessons
  const selectAllLessons = () => {
    setSelectedLessons(allLessons.map(l => l.lessonNumber));
  };

  // Deselect all lessons
  const deselectAllLessons = () => {
    setSelectedLessons([]);
  };

  // Select range presets (1-5, 6-10, etc.)
  const selectRangePreset = (start: number, end: number) => {
    const range = allLessons
      .map(l => l.lessonNumber)
      .filter(num => num >= start && num <= end);
    setSelectedLessons(range);
  };

  // Compile flashcards from selected lessons
  const generateFlashcardDeck = (
    lessonsToLoad: number[],
    typeChoice: FlashcardContentType,
    modeChoice: FlashcardStudyMode
  ): FlashcardItem[] => {
    const cards: FlashcardItem[] = [];
    const seenIds = new Set<string>();

    lessonsToLoad.forEach(lessonNum => {
      const lesson = allLessons.find(l => l.lessonNumber === lessonNum);
      if (!lesson) return;

      // 1. Vocabulary Cards
      if (typeChoice === 'both' || typeChoice === 'vocab') {
        lesson.vocabulary.forEach(v => {
          const id = `vocab_${v.id}`;
          if (seenIds.has(id)) return;
          seenIds.add(id);

          const cardDirection: FlashcardDirection = modeChoice === 'combined'
            ? (Math.random() > 0.5 ? 'en_to_ja' : 'ja_to_en')
            : modeChoice;

          const jp = getJapaneseWordDisplay(v);

          cards.push({
            id,
            type: 'vocabulary',
            lessonNumber: lessonNum,
            direction: cardDirection,
            primaryJapanese: jp.standardSpelling,
            secondaryJapanese: jp.secondaryText,
            hiragana: jp.reading,
            kanji: jp.standardSpelling,
            romaji: v.romaji,
            english: v.english,
            partOfSpeech: v.partOfSpeech,
            category: v.category,
            exampleSentence: v.exampleSentence
          });
        });
      }

      // 2. Kanji Cards from lesson vocabulary
      if (typeChoice === 'both' || typeChoice === 'kanji') {
        const uniqueKanjiChars = new Set<string>();
        lesson.vocabulary.forEach(v => {
          if (v.kanji) {
            const matches = v.kanji.match(/[\u4E00-\u9FAF]/g);
            if (matches) matches.forEach(ch => uniqueKanjiChars.add(ch));
          }
        });

        uniqueKanjiChars.forEach(char => {
          const id = `kanji_${char}_L${lessonNum}`;
          if (seenIds.has(id)) return;
          seenIds.add(id);

          const match120 = ALL_120_KANJI.find(k => k.character === char);
          const cardDirection: FlashcardDirection = modeChoice === 'combined'
            ? (Math.random() > 0.5 ? 'en_to_ja' : 'ja_to_en')
            : modeChoice;

          if (match120) {
            cards.push({
              id,
              type: 'kanji',
              lessonNumber: lessonNum,
              direction: cardDirection,
              primaryJapanese: match120.character,
              secondaryJapanese: match120.kunyomi_readings.concat(match120.onyomi_readings).join('、'),
              hiragana: match120.hiragana_reading || match120.kunyomi_readings[0] || '',
              kanji: match120.character,
              romaji: match120.kunyomi_romaji[0] || match120.onyomi_romaji[0] || '',
              english: match120.meaning,
              onyomi: match120.onyomi_readings,
              kunyomi: match120.kunyomi_readings,
              strokeCount: match120.stroke_count,
              mnemonic: match120.mnemonic
            });
          } else {
            // Prioritize shortest vocabulary word containing this Kanji character
            const matchingVocabs = lesson.vocabulary.filter(v => v.kanji && v.kanji.includes(char));
            const parentVocab = matchingVocabs.sort((a, b) => a.kanji.length - b.kanji.length)[0];
            const extraMatch = COMMON_EXTRA_KANJI[char];

            let kanjiReading = extraMatch?.reading || '';
            let kanjiRomaji = extraMatch?.romaji || '';
            let kanjiMeaning = extraMatch?.meaning || '';
            let kanjiContext = '';

            if (parentVocab) {
              const segs = parseFurigana(parentVocab.kanji, parentVocab.hiragana);
              const targetSeg = segs.find(s => s.ruby.includes(char));
              if (targetSeg) {
                if (!kanjiReading) {
                  kanjiReading = targetSeg.rt || targetSeg.ruby;
                }
                if (targetSeg.ruby.length > 1) {
                  kanjiContext = `${targetSeg.ruby} (${targetSeg.rt || ''})`;
                }
              }
            }

            if (!kanjiReading) {
              kanjiReading = parentVocab?.hiragana ? parentVocab.hiragana.split(/[\s、。]/)[0] : '';
            }

            if (!kanjiMeaning) {
              kanjiMeaning = parentVocab ? `Kanji in "${parentVocab.kanji}" (${parentVocab.english})` : 'Kanji character';
            } else if (kanjiContext) {
              kanjiMeaning = `${kanjiMeaning} • In: ${kanjiContext}`;
            }

            cards.push({
              id,
              type: 'kanji',
              lessonNumber: lessonNum,
              direction: cardDirection,
              primaryJapanese: char,
              secondaryJapanese: extraMatch?.onyomi?.concat(extraMatch?.kunyomi || []).join('、') || kanjiContext || parentVocab?.hiragana,
              hiragana: kanjiReading,
              kanji: char,
              romaji: kanjiRomaji || parentVocab?.romaji || '',
              english: kanjiMeaning,
              category: parentVocab?.category || 'Kanji',
              onyomi: extraMatch?.onyomi,
              kunyomi: extraMatch?.kunyomi
            });
          }
        });
      }
    });

    return cards;
  };

  // Start button action: proceed to study mode selection
  const handleProceedToModeSelect = () => {
    if (selectedLessons.length === 0) return;
    setPhase('select_mode');
  };

  // Launch flashcards with chosen mode - automatically randomized with Fisher-Yates shuffle
  const handleStartSession = (mode: FlashcardStudyMode) => {
    setStudyMode(mode);
    const rawDeck = generateFlashcardDeck(selectedLessons, contentType, mode);
    // Apply Fisher-Yates shuffle so vocabulary is never memorized sequentially
    const shuffledDeck = shuffleArray(rawDeck);
    setSessionCards(shuffledDeck);
    setCurrentIndex(0);
    setIsFlipped(false);
    setContentFilter('all');
    setPhase('active_player');
  };

  // Re-shuffle current session cards using Fisher-Yates algorithm
  const handleShuffle = () => {
    setSessionCards(prev => shuffleArray(prev));
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  // Restart practice session with brand new Fisher-Yates shuffled order
  const handleRestartSession = () => {
    const rawDeck = generateFlashcardDeck(selectedLessons, contentType, studyMode);
    const freshShuffledDeck = shuffleArray(rawDeck);
    setSessionCards(freshShuffledDeck);
    setCurrentIndex(0);
    setIsFlipped(false);
    setPhase('active_player');
  };

  // Switch study mode on the fly during session
  const handleSwitchModeInSession = (newMode: FlashcardStudyMode) => {
    setStudyMode(newMode);
    setSessionCards(prev =>
      prev.map(c => ({
        ...c,
        direction: newMode === 'combined'
          ? (Math.random() > 0.5 ? 'en_to_ja' : 'ja_to_en')
          : newMode
      }))
    );
    setIsFlipped(false);
  };

  // Filtered cards by content filter tab in active player
  const filteredSessionCards = useMemo(() => {
    if (contentFilter === 'all') return sessionCards;
    return sessionCards.filter(c => c.type === contentFilter);
  }, [sessionCards, contentFilter]);

  const currentCard: FlashcardItem | undefined = filteredSessionCards[currentIndex];

  const fallbackCopyText = (text: string) => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.top = '-9999px';
      textArea.style.left = '-9999px';
      textArea.setAttribute('readonly', '');
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (e) {
      console.error('Fallback copy failed', e);
      return false;
    }
  };

  const handleCopyCard = (face: 'front' | 'back') => {
    if (!currentCard) return;

    let textToCopy = '';
    let label = '';

    const isCurrentEnToJa = currentCard.direction === 'en_to_ja';
    if (face === 'front') {
      if (isCurrentEnToJa) {
        textToCopy = currentCard.english;
        label = 'English';
      } else {
        textToCopy = currentCard.kanji || currentCard.primaryJapanese || currentCard.hiragana || '';
        label = 'Japanese';
      }
    } else {
      if (isCurrentEnToJa) {
        textToCopy = currentCard.kanji || currentCard.primaryJapanese || currentCard.hiragana || '';
        label = 'Japanese';
      } else {
        textToCopy = currentCard.english;
        label = 'English';
      }
    }

    const cleaned = textToCopy.replace(/[（(].*?[)）]/g, '').trim();
    if (!cleaned) return;

    const onCopied = () => {
      setCopiedFace(face);
      const preview = cleaned.length > 25 ? cleaned.slice(0, 22) + '...' : cleaned;
      setCardStatusToast({
        id: currentCard.id,
        message: `Copied ${label}: "${preview}"`
      });
      setTimeout(() => {
        setCopiedFace(null);
        setCardStatusToast(null);
      }, 1800);
    };

    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(cleaned)
        .then(onCopied)
        .catch(() => {
          fallbackCopyText(cleaned);
          onCopied();
        });
    } else {
      fallbackCopyText(cleaned);
      onCopied();
    }
  };

  // Navigation handlers
  const handleNext = () => {
    if (currentIndex + 1 < filteredSessionCards.length) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev + 1);
    } else {
      confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });
      setPhase('session_complete');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Status marking handler (Database sync)
  const handleMarkStatus = async (status: 'learned' | 'not_sure') => {
    if (!currentCard) return;

    if (currentCard.type === 'vocabulary') {
      const vocabId = currentCard.id.replace('vocab_', '');
      await setVocabStatus(vocabId, currentCard.lessonNumber, status);
    } else if (currentCard.type === 'kanji') {
      const match = kanjiList.find(k => k.character === currentCard.primaryJapanese || k.character === currentCard.kanji);
      if (match) {
        storage.updateKanjiProgress(match.id, {
          learning_status: status === 'learned' ? 'learned' : 'needs_revision',
          last_studied_at: new Date().toISOString()
        });
      }
    }

    setCardStatusToast({
      id: currentCard.id,
      message: status === 'learned' ? '✓ Marked as Learned' : '⚡ Added to Re-learn Hub'
    });
    setTimeout(() => setCardStatusToast(null), 2500);

    onRefreshProgress?.();
  };

  // Swipe Gestures: Swipe Right -> Learned, Swipe Left -> Re-learn Hub, Swipe Up -> Next Card, Tap -> Flip
  const swipe = useSwipeCard({
    onSwipeRight: () => {
      handleMarkStatus('learned');
      handleNext();
    },
    onSwipeLeft: () => {
      handleMarkStatus('not_sure');
      handleNext();
    },
    onSwipeUp: () => {
      handleNext();
    },
    onTap: () => setIsFlipped(prev => !prev),
    threshold: 75,
    disabled: phase !== 'active_player' || !currentCard
  });

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (phase !== 'active_player' || !currentCard) return;

      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 's' || e.key === 'S') {
        handleShuffle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, isFlipped, currentIndex, filteredSessionCards, currentCard]);

  // --------------------------------------------------------------------------
  // Legacy SRS Handlers (for SRS Tab)
  // --------------------------------------------------------------------------
  const eligibleSrsCards = useMemo(() => {
    return kanjiList.filter(k => {
      const prog = progressMap[k.id];
      if (!prog || (prog.learning_status !== 'learned' && prog.learning_status !== 'needs_revision' && prog.learning_status !== 'learning')) {
        return false;
      }
      if (srsSelectedLevel !== 'all' && k.level !== srsSelectedLevel) return false;
      if (srsFilterMode === 'due') {
        if (!prog.next_review_at) return true;
        return new Date(prog.next_review_at) <= new Date();
      }
      if (srsFilterMode === 'weak') {
        return prog.learning_status === 'needs_revision' || prog.mistake_count > 0;
      }
      return true;
    });
  }, [kanjiList, progressMap, srsFilterMode, srsSelectedLevel]);

  const currentSrsKanji = eligibleSrsCards[srsCurrentIndex];
  const currentSrsProgress = currentSrsKanji ? progressMap[currentSrsKanji.id] : null;

  const handleSrsRate = (rating: FlashcardRating) => {
    if (!currentSrsKanji || !currentSrsProgress) return;
    const gradeMap: Record<FlashcardRating, number> = { again: 1, hard: 2, good: 4, easy: 5 };
    const grade = gradeMap[rating];

    const srsUpdate = srsEngine.calculateNextReview(
      grade,
      currentSrsProgress.srs_repetitions,
      currentSrsProgress.srs_ease_factor,
      currentSrsProgress.srs_interval
    );

    const isAgain = rating === 'again';
    const newMistakes = isAgain ? currentSrsProgress.mistake_count + 1 : currentSrsProgress.mistake_count;
    const newStatus = isAgain ? 'needs_revision' : currentSrsProgress.learning_status;

    storage.updateKanjiProgress(currentSrsKanji.id, {
      srs_interval: srsUpdate.interval,
      srs_repetitions: srsUpdate.repetitions,
      srs_ease_factor: srsUpdate.easeFactor,
      next_review_at: srsUpdate.nextReviewDate.toISOString(),
      last_studied_at: new Date().toISOString(),
      mistake_count: newMistakes,
      learning_status: newStatus,
      revision_count: currentSrsProgress.revision_count + 1
    });

    setSrsReviewedCount(prev => prev + 1);

    if (srsCurrentIndex + 1 < eligibleSrsCards.length) {
      setSrsIsFlipped(false);
      setSrsCurrentIndex(prev => prev + 1);
    } else {
      confetti({ particleCount: 70, spread: 60 });
      setSrsSessionCompleted(true);
      onRefreshProgress();
    }
  };

  const restartSrsSession = () => {
    setSrsCurrentIndex(0);
    setSrsIsFlipped(false);
    setSrsSessionCompleted(false);
    setSrsReviewedCount(0);
  };

  // ==========================================================================
  // RENDER: SRS Tab (Preserved Legacy Queue)
  // ==========================================================================
  if (activeTab === 'srs') {
    return (
      <div className="max-w-4xl mx-auto space-y-5 w-full min-w-0 pb-16 px-2 sm:px-4">
        {/* Top Tab Bar */}
        <div className="flex items-center justify-between gap-3 border-b border-stone-200 dark:border-stone-800 pb-3 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('studio')}
              className="px-3.5 py-2 min-h-[40px] rounded-xl text-xs font-bold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 transition"
            >
              ← Lesson Flashcard Studio
            </button>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
              Kanji SRS Review Queue
            </span>
          </div>
        </div>

        {eligibleSrsCards.length === 0 ? (
          <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-10 text-center max-w-xl mx-auto shadow-sm">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white">All Caught Up!</h2>
            <p className="text-stone-500 text-xs sm:text-sm mt-2">
              No SRS cards are currently due for spaced repetition review.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={() => { setSrsFilterMode('all'); restartSrsSession(); }}
                className="px-4 py-2.5 min-h-[44px] rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold text-xs"
              >
                Review All Learned Cards
              </button>
              <button
                onClick={() => setActiveTab('studio')}
                className="px-4 py-2.5 min-h-[44px] rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700"
              >
                Open Lesson Flashcard Studio
              </button>
            </div>
          </div>
        ) : srsSessionCompleted ? (
          <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-10 text-center max-w-xl mx-auto shadow-sm space-y-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white mx-auto flex items-center justify-center shadow-lg">
              <Sparkles className="w-8 h-8" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white">SRS Review Complete!</h2>
            <p className="text-stone-500 text-xs">Reviewed {srsReviewedCount} kanji flashcards.</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
              <button onClick={restartSrsSession} className="px-5 py-2.5 min-h-[44px] rounded-xl bg-red-600 text-white font-bold text-xs">
                Review Again
              </button>
              <button onClick={() => setActiveTab('studio')} className="px-5 py-2.5 min-h-[44px] rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-bold text-xs">
                Study Lessons
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="flex items-center justify-between text-xs text-stone-500 bg-white dark:bg-stone-900 p-3 rounded-2xl border border-stone-200 dark:border-stone-800">
              <div className="flex gap-1.5">
                <button
                  onClick={() => { setSrsFilterMode('due'); restartSrsSession(); }}
                  className={`px-3 py-1.5 rounded-lg font-bold min-h-[36px] ${srsFilterMode === 'due' ? 'bg-red-600 text-white' : 'bg-stone-100 dark:bg-stone-800'}`}
                >
                  Due
                </button>
                <button
                  onClick={() => { setSrsFilterMode('all'); restartSrsSession(); }}
                  className={`px-3 py-1.5 rounded-lg font-bold min-h-[36px] ${srsFilterMode === 'all' ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900' : 'bg-stone-100 dark:bg-stone-800'}`}
                >
                  All ({eligibleSrsCards.length})
                </button>
              </div>
              <span className="font-mono font-bold">Card {srsCurrentIndex + 1} of {eligibleSrsCards.length}</span>
            </div>

            {currentSrsKanji && (
              <div
                onClick={() => setSrsIsFlipped(prev => !prev)}
                className="cursor-pointer min-h-[300px] sm:min-h-[360px] rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xl p-5 sm:p-7 flex flex-col justify-between"
              >
                {!srsIsFlipped ? (
                  <div className="my-auto text-center space-y-2">
                    <span className="text-5xl xs:text-6xl sm:text-7xl font-black font-japanese text-stone-900 dark:text-white">
                      {currentSrsKanji.character}
                    </span>
                    <p className="text-xs text-stone-400">Click or Space to flip</p>
                  </div>
                ) : (
                  <div className="my-auto text-center space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-black text-red-600 dark:text-red-400">{currentSrsKanji.meaning}</h3>
                    <div className="text-sm font-japanese break-words">
                      <span className="text-stone-400">On: </span>{currentSrsKanji.onyomi_readings.join(', ')}
                    </div>
                    <div className="text-sm font-japanese break-words">
                      <span className="text-stone-400">Kun: </span>{currentSrsKanji.kunyomi_readings.join(', ')}
                    </div>
                  </div>
                )}

                {srsIsFlipped && (
                  <div className="grid grid-cols-2 xs:grid-cols-4 gap-2 pt-3 border-t border-stone-100 dark:border-stone-800">
                    <button onClick={(e) => { e.stopPropagation(); handleSrsRate('again'); }} className="py-2.5 min-h-[40px] rounded-xl bg-red-100 text-red-700 text-xs font-bold">Again (1)</button>
                    <button onClick={(e) => { e.stopPropagation(); handleSrsRate('hard'); }} className="py-2.5 min-h-[40px] rounded-xl bg-amber-100 text-amber-700 text-xs font-bold">Hard (2)</button>
                    <button onClick={(e) => { e.stopPropagation(); handleSrsRate('good'); }} className="py-2.5 min-h-[40px] rounded-xl bg-blue-100 text-blue-700 text-xs font-bold">Good (3)</button>
                    <button onClick={(e) => { e.stopPropagation(); handleSrsRate('easy'); }} className="py-2.5 min-h-[40px] rounded-xl bg-emerald-100 text-emerald-700 text-xs font-bold">Easy (4)</button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // ==========================================================================
  // RENDER: PHASE 1 - LESSON SELECTION SCREEN
  // ==========================================================================
  if (phase === 'select_lessons') {
    return (
      <div className="space-y-5 sm:space-y-7 animate-in fade-in duration-300 pb-28 w-full max-w-full min-w-0 px-2 xs:px-3 sm:px-4">
        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-rose-950 text-white p-4 sm:p-7 md:p-9 border border-stone-800 shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
            <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-red-600 text-white shadow-md inline-flex items-center gap-1.5 w-fit">
                <Layers className="w-3.5 h-3.5" /> Interactive Flashcards
              </span>

              <button
                onClick={() => setActiveTab('srs')}
                className="text-xs text-stone-300 hover:text-white underline inline-flex items-center gap-1 w-fit"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Switch to SRS Spaced Repetition Due Queue</span>
              </button>
            </div>

            <h1 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
              フラッシュカード学習
              <span className="block text-base sm:text-xl lg:text-2xl font-bold text-stone-300 mt-1">
                Japanese Flashcard Studio
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-2xl">
              Select one or multiple lessons below to practice both <strong>Kanji</strong> and <strong>Vocabulary</strong>.
              Study in <strong>English-to-Japanese</strong>, <strong>Japanese-to-English</strong>, or <strong>Combined</strong> modes.
            </p>
          </div>
        </div>

        {/* Option 1: Content Type Selector (Both / Vocabulary / Kanji) */}
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-4 sm:p-6 shadow-sm space-y-3">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-white">
              1. Select Learning Content
            </h3>
            <p className="text-xs text-stone-500">
              Choose whether to study both Kanji and Vocabulary cards or focus on one.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
            <button
              onClick={() => setContentType('both')}
              className={`p-3.5 sm:p-4 rounded-2xl border text-left transition flex items-center justify-between min-h-[48px] ${contentType === 'both'
                  ? 'border-red-500 bg-red-50/50 dark:bg-red-950/30 ring-2 ring-red-500/20 text-stone-900 dark:text-white'
                  : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40 text-stone-600 dark:text-stone-400 hover:border-stone-300'
                }`}
            >
              <div>
                <div className="font-bold text-xs sm:text-sm flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Both Kanji & Vocabulary</span>
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5">Comprehensive mastery (Recommended)</div>
              </div>
              {contentType === 'both' && <Check className="w-4 h-4 text-red-600 shrink-0 ml-2" />}
            </button>

            <button
              onClick={() => setContentType('vocab')}
              className={`p-3.5 sm:p-4 rounded-2xl border text-left transition flex items-center justify-between min-h-[48px] ${contentType === 'vocab'
                  ? 'border-red-500 bg-red-50/50 dark:bg-red-950/30 ring-2 ring-red-500/20 text-stone-900 dark:text-white'
                  : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40 text-stone-600 dark:text-stone-400 hover:border-stone-300'
                }`}
            >
              <div>
                <div className="font-bold text-xs sm:text-sm flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>Vocabulary Only</span>
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5">Focus on words & context examples</div>
              </div>
              {contentType === 'vocab' && <Check className="w-4 h-4 text-red-600 shrink-0 ml-2" />}
            </button>

            <button
              onClick={() => setContentType('kanji')}
              className={`p-3.5 sm:p-4 rounded-2xl border text-left transition flex items-center justify-between min-h-[48px] ${contentType === 'kanji'
                  ? 'border-red-500 bg-red-50/50 dark:bg-red-950/30 ring-2 ring-red-500/20 text-stone-900 dark:text-white'
                  : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40 text-stone-600 dark:text-stone-400 hover:border-stone-300'
                }`}
            >
              <div>
                <div className="font-bold text-xs sm:text-sm flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Kanji Only</span>
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5">Characters, readings & meanings</div>
              </div>
              {contentType === 'kanji' && <Check className="w-4 h-4 text-red-600 shrink-0 ml-2" />}
            </button>
          </div>
        </div>

        {/* Option 2: Lesson Selection Section */}
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-white">
                2. Select Lessons to Study
              </h3>
              <p className="text-xs text-stone-500">
                Choose one, multiple, or all lessons. Cards will be dynamically extracted from selected lessons.
              </p>
            </div>

            {/* Quick Presets & Select All (Horizontally scrollable on mobile) */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              <button
                onClick={selectAllLessons}
                className="px-3 py-1.5 min-h-[36px] shrink-0 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200 text-xs font-bold transition flex items-center gap-1"
              >
                <CheckSquare className="w-3.5 h-3.5 text-red-500" />
                <span>Select All</span>
              </button>

              <button
                onClick={deselectAllLessons}
                className="px-3 py-1.5 min-h-[36px] shrink-0 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-600 dark:text-stone-400 text-xs font-bold transition"
              >
                Deselect All
              </button>

              <div className="flex items-center gap-1 pl-1.5 border-l border-stone-200 dark:border-stone-800 text-[11px] shrink-0">
                <button onClick={() => selectRangePreset(1, 5)} className="px-2 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:text-red-600 font-medium">1–5</button>
                <button onClick={() => selectRangePreset(6, 10)} className="px-2 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:text-red-600 font-medium">6–10</button>
                <button onClick={() => selectRangePreset(11, 15)} className="px-2 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:text-red-600 font-medium">11–15</button>
                <button onClick={() => selectRangePreset(16, 20)} className="px-2 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:text-red-600 font-medium">16–20</button>
                <button onClick={() => selectRangePreset(21, 25)} className="px-2 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:text-red-600 font-medium">21–25</button>
              </div>
            </div>
          </div>

          {/* Search Lesson Filter */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Filter lessons by title or number (e.g. 1, Shopping, Everyday Life)..."
              value={lessonSearch}
              onChange={(e) => setLessonSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Lesson Cards Grid - Responsive columns */}
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3 max-h-[380px] sm:max-h-[500px] overflow-y-auto pr-1">
            {filteredLessonList.map(l => {
              const isSelected = selectedLessons.includes(l.lessonNumber);
              const vocabCount = l.vocabulary.length;
              return (
                <div
                  key={l.lessonNumber}
                  onClick={() => toggleLesson(l.lessonNumber)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between gap-1.5 min-h-[70px] ${isSelected
                      ? 'border-red-500 bg-red-50/40 dark:bg-red-950/20 ring-2 ring-red-500/20 shadow-xs'
                      : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-stone-300'
                    }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      {isSelected ? (
                        <CheckSquare className="w-4 h-4 text-red-600 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-stone-300 dark:text-stone-600 shrink-0" />
                      )}
                      <span className="font-mono text-xs font-black text-stone-900 dark:text-white truncate">
                        Lesson {l.lessonNumber}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 shrink-0">
                      {vocabCount}w
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-stone-800 dark:text-stone-200 line-clamp-1">
                      {l.title}
                    </h4>
                    {l.titleJapanese && (
                      <p className="text-[11px] text-stone-400 font-japanese line-clamp-1">
                        {l.titleJapanese}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Floating Action Bar with Safe Area */}
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-t border-stone-200 dark:border-stone-800 p-3 sm:p-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-xl">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
            <div className="text-xs text-center sm:text-left">
              <span className="font-bold text-stone-900 dark:text-white">
                {selectedLessons.length} {selectedLessons.length === 1 ? 'Lesson' : 'Lessons'} Selected
              </span>
              <span className="text-stone-500 ml-1.5">
                • {selectedCounts.totalCards} cards ready ({selectedCounts.vocabCount} vocab, {selectedCounts.kanjiCount} kanji)
              </span>
            </div>

            <button
              onClick={handleProceedToModeSelect}
              disabled={selectedLessons.length === 0}
              className="w-full sm:w-auto px-6 py-3 min-h-[46px] rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold text-xs sm:text-sm shadow-lg active:scale-95 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>Start Flashcards</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // RENDER: PHASE 2 - FLASHCARD STUDY MODES SELECTION SCREEN
  // ==========================================================================
  if (phase === 'select_mode') {
    return (
      <div className="space-y-5 sm:space-y-7 animate-in fade-in duration-300 pb-20 max-w-4xl mx-auto w-full min-w-0 px-2 xs:px-3 sm:px-4">
        <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2">
          <button
            onClick={() => setPhase('select_lessons')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs font-bold text-stone-700 dark:text-stone-300 hover:bg-stone-100 transition active:scale-95 w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Change Lessons</span>
          </button>

          <span className="text-xs text-stone-500">
            Lessons {selectedLessons.join(', ')} • {selectedCounts.totalCards} Flashcards
          </span>
        </div>

        <div className="text-center space-y-1.5 py-1">
          <h2 className="text-xl sm:text-3xl font-black text-stone-900 dark:text-white">
            Choose Your Flashcard Study Mode
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 max-w-lg mx-auto">
            Select how you want to test your memory across the selected {selectedCounts.totalCards} cards.
          </p>
        </div>

        {/* 3 Study Modes Grid - Responsive Stacked / 3-Column */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
          {/* Mode 1: English to Japanese */}
          <div
            onClick={() => handleStartSession('en_to_ja')}
            className="p-4 sm:p-6 rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm hover:shadow-xl hover:border-red-400 dark:hover:border-red-800 transition cursor-pointer flex flex-col justify-between gap-4 group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center text-base sm:text-lg font-black group-hover:scale-110 transition shrink-0">
                  🇬🇧➔🇯🇵
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-stone-900 dark:text-white group-hover:text-red-600 transition">
                    English to Japanese
                  </h3>
                  <span className="text-[10px] sm:text-[11px] font-bold text-red-500 uppercase tracking-wider block">
                    Active Production
                  </span>
                </div>
              </div>

              <p className="text-xs text-stone-500 leading-relaxed">
                Front displays the <strong>English meaning</strong>. Flip to reveal the corresponding Japanese word in <strong>Hiragana, Kanji, or Katakana</strong>.
              </p>

              <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800 text-xs">
                <span className="text-stone-400 text-[10px] block">Front:</span>
                <span className="font-bold text-stone-700 dark:text-stone-200">student (college)</span>
                <span className="text-stone-400 text-[10px] block mt-1">Back:</span>
                <span className="font-japanese font-bold text-stone-900 dark:text-white">がくせい (学生)</span>
              </div>
            </div>

            <button className="w-full py-2.5 min-h-[44px] rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-sm active:scale-95">
              <span>Start English to Japanese</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mode 2: Japanese to English */}
          <div
            onClick={() => handleStartSession('ja_to_en')}
            className="p-4 sm:p-6 rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-800 transition cursor-pointer flex flex-col justify-between gap-4 group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center text-base sm:text-lg font-black group-hover:scale-110 transition shrink-0">
                  🇯🇵➔🇬🇧
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-stone-900 dark:text-white group-hover:text-blue-600 transition">
                    Japanese to English
                  </h3>
                  <span className="text-[10px] sm:text-[11px] font-bold text-blue-500 uppercase tracking-wider block">
                    Recognition & Reading
                  </span>
                </div>
              </div>

              <p className="text-xs text-stone-500 leading-relaxed">
                Front displays the <strong>Japanese word</strong> using appropriate writing. Flip to reveal the <strong>correct English meaning</strong> & readings.
              </p>

              <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800 text-xs">
                <span className="text-stone-400 text-[10px] block">Front:</span>
                <span className="font-japanese font-bold text-stone-900 dark:text-white">がくせい (学生)</span>
                <span className="text-stone-400 text-[10px] block mt-1">Back:</span>
                <span className="font-bold text-stone-700 dark:text-stone-200">student (college)</span>
              </div>
            </div>

            <button className="w-full py-2.5 min-h-[44px] rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-sm active:scale-95">
              <span>Start Japanese to English</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mode 3: Combined Mode */}
          <div
            onClick={() => handleStartSession('combined')}
            className="p-4 sm:p-6 rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm hover:shadow-xl hover:border-amber-400 dark:hover:border-amber-800 transition cursor-pointer flex flex-col justify-between gap-4 group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center text-base sm:text-lg font-black group-hover:scale-110 transition shrink-0">
                  🔀
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-stone-900 dark:text-white group-hover:text-amber-600 transition">
                    Combined Mode
                  </h3>
                  <span className="text-[10px] sm:text-[11px] font-bold text-amber-500 uppercase tracking-wider block">
                    Bidirectional Mastery
                  </span>
                </div>
              </div>

              <p className="text-xs text-stone-500 leading-relaxed">
                <strong>Randomly mixes</strong> English-to-Japanese and Japanese-to-English cards to test both comprehension and active production.
              </p>

              <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800 text-xs">
                <span className="text-stone-400 text-[10px] block">Randomized Direction:</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">50% EN➔JA + 50% JA➔EN</span>
                <span className="text-stone-400 text-[10px] block mt-1">Benefit:</span>
                <span className="text-stone-600 dark:text-stone-300">Prevents directional memory bias</span>
              </div>
            </div>

            <button className="w-full py-2.5 min-h-[44px] rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-xs transition flex items-center justify-center gap-1.5 shadow-sm active:scale-95">
              <span>Start Combined Mode</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // RENDER: PHASE 4 - SESSION COMPLETE SCREEN
  // ==========================================================================
  if (phase === 'session_complete') {
    return (
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-5 sm:p-8 md:p-12 text-center max-w-xl mx-auto shadow-xl space-y-4 sm:space-y-5 my-6 sm:my-8 px-4">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-red-600 to-amber-500 text-white mx-auto flex items-center justify-center shadow-lg">
          <Trophy className="w-7 h-7 sm:w-8 sm:h-8 text-amber-200" />
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-stone-900 dark:text-white">
          Flashcard Session Complete!
        </h2>
        <p className="text-stone-500 text-xs sm:text-sm max-w-md mx-auto">
          You finished studying <strong>{sessionCards.length} flashcards</strong> across Lessons {selectedLessons.join(', ')} in <strong>{studyMode.replace(/_/g, ' ').toUpperCase()}</strong> mode!
        </p>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-800 text-xs grid grid-cols-2 gap-2 sm:gap-3 text-left">
          <div>
            <span className="text-stone-400 block text-[10px]">Lessons Studied:</span>
            <span className="font-bold text-stone-800 dark:text-stone-200">Lessons {selectedLessons.join(', ')}</span>
          </div>
          <div>
            <span className="text-stone-400 block text-[10px]">Cards Completed:</span>
            <span className="font-bold text-stone-800 dark:text-stone-200">{sessionCards.length} Cards</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5 justify-center pt-2">
          <button
            onClick={handleRestartSession}
            className="w-full sm:w-auto px-5 py-3 min-h-[44px] rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition shadow-md flex items-center justify-center gap-1.5 active:scale-95"
            title="Start new practice session with a freshly randomized shuffle order"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Study Again (New Shuffle)</span>
          </button>

          <button
            onClick={() => setPhase('select_mode')}
            className="w-full sm:w-auto px-5 py-3 min-h-[44px] rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200 font-bold text-xs transition flex items-center justify-center gap-1.5 active:scale-95"
          >
            <span>Change Study Mode</span>
          </button>

          <button
            onClick={() => setPhase('select_lessons')}
            className="w-full sm:w-auto px-5 py-3 min-h-[44px] rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200 font-bold text-xs transition flex items-center justify-center gap-1.5 active:scale-95"
          >
            <span>Select Other Lessons</span>
          </button>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // RENDER: PHASE 3 - ACTIVE FLASHCARD PLAYER
  // ==========================================================================
  if (!currentCard) {
    return (
      <div className="text-center p-8 sm:p-12 space-y-4">
        <p className="text-stone-500 text-sm">No flashcards found for this filter.</p>
        <button
          onClick={() => setContentFilter('all')}
          className="px-4 py-2 min-h-[40px] rounded-xl bg-red-600 text-white font-bold text-xs"
        >
          Reset Content Filter
        </button>
      </div>
    );
  }

  const isEnToJa = currentCard.direction === 'en_to_ja';
  const progressPercent = Math.round(((currentIndex + 1) / filteredSessionCards.length) * 100);

  return (
    <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4 w-full min-w-0 pb-16 px-2 xs:px-3 sm:px-4">
      {/* Top Controls Bar - Mobile Responsive 2-Row or 1-Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 bg-white dark:bg-stone-900 p-2.5 sm:p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm text-xs">
        {/* Row 1: Back to Lessons + Mode Switcher + Shuffle */}
        <div className="flex items-center justify-between sm:justify-start gap-2">
          <button
            onClick={() => setPhase('select_lessons')}
            className="text-stone-500 hover:text-stone-900 dark:hover:text-white font-bold flex items-center gap-1 min-h-[34px] px-1"
            title="Return to lesson selection"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden xs:inline">Lessons</span>
          </button>

          {/* Mode Switcher Pill */}
          <div className="flex items-center gap-0.5 bg-stone-100 dark:bg-stone-800 p-0.5 rounded-xl text-[10px] xs:text-[11px] font-bold">
            <button
              onClick={() => handleSwitchModeInSession('en_to_ja')}
              className={`px-2 py-1 min-h-[30px] rounded-lg transition ${studyMode === 'en_to_ja' ? 'bg-red-600 text-white shadow-xs' : 'text-stone-500'}`}
              title="Switch to English to Japanese"
            >
              EN➔JA
            </button>
            <button
              onClick={() => handleSwitchModeInSession('ja_to_en')}
              className={`px-2 py-1 min-h-[30px] rounded-lg transition ${studyMode === 'ja_to_en' ? 'bg-blue-600 text-white shadow-xs' : 'text-stone-500'}`}
              title="Switch to Japanese to English"
            >
              JA➔EN
            </button>
            <button
              onClick={() => handleSwitchModeInSession('combined')}
              className={`px-2 py-1 min-h-[30px] rounded-lg transition ${studyMode === 'combined' ? 'bg-amber-500 text-stone-950 font-black shadow-xs' : 'text-stone-500'}`}
              title="Switch to Combined 50/50"
            >
              🔀
            </button>
          </div>

          {/* Furigana Toggle Button */}
          <button
            onClick={() => setShowFurigana(prev => !prev)}
            className={`px-2 py-1 min-h-[30px] rounded-xl font-bold text-[10px] xs:text-[11px] flex items-center gap-1 transition shrink-0 ${showFurigana
                ? 'bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800 shadow-xs'
                : 'text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 bg-stone-100 dark:bg-stone-800'
              }`}
            title={showFurigana ? 'Furigana above Kanji is ON (click to hide)' : 'Furigana is OFF (click to show)'}
          >
            <span>ふりがな</span>
            <span className={`text-[9px] px-1 py-0.2 rounded font-black ${showFurigana ? 'bg-red-600 text-white' : 'bg-stone-200 dark:bg-stone-700 text-stone-500'
              }`}>
              {showFurigana ? 'ON' : 'OFF'}
            </span>
          </button>

          <button
            onClick={handleShuffle}
            className="p-1.5 min-h-[32px] min-w-[32px] flex items-center justify-center rounded-lg text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition sm:hidden"
            title="Shuffle Cards"
          >
            <Shuffle className="w-4 h-4" />
          </button>
        </div>

        {/* Row 2 (or right on sm+): Content Filter Tabs + Desktop Shuffle + Counter */}
        <div className="flex items-center justify-between sm:justify-end gap-2 border-t sm:border-t-0 pt-2 sm:pt-0 border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-0.5 rounded-xl text-[10px] xs:text-[11px]">
            <button
              onClick={() => { setContentFilter('all'); setCurrentIndex(0); setIsFlipped(false); }}
              className={`px-2 py-1 min-h-[28px] rounded-lg font-bold transition ${contentFilter === 'all' ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs' : 'text-stone-500'}`}
            >
              All ({sessionCards.length})
            </button>
            <button
              onClick={() => { setContentFilter('vocab'); setCurrentIndex(0); setIsFlipped(false); }}
              className={`px-2 py-1 min-h-[28px] rounded-lg font-bold transition ${contentFilter === 'vocab' ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs' : 'text-stone-500'}`}
            >
              Vocab
            </button>
            <button
              onClick={() => { setContentFilter('kanji'); setCurrentIndex(0); setIsFlipped(false); }}
              className={`px-2 py-1 min-h-[28px] rounded-lg font-bold transition ${contentFilter === 'kanji' ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs' : 'text-stone-500'}`}
            >
              Kanji
            </button>
          </div>

          <button
            onClick={handleShuffle}
            className="px-2 py-1 min-h-[28px] rounded-lg text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/50 border border-amber-200/60 dark:border-amber-900/40 transition flex items-center gap-1 text-[10px] xs:text-[11px] font-bold shrink-0"
            title="Fisher-Yates Shuffle active. Click to re-randomize cards."
          >
            <Shuffle className="w-3 h-3 text-amber-500" />
            <span className="hidden xs:inline">Shuffled</span>
          </button>

          <span className="font-mono font-bold text-stone-500 text-[11px] xs:text-xs">
            {currentIndex + 1} / {filteredSessionCards.length}
          </span>
        </div>
      </div>

      {/* Progress Bar & Percentage */}
      <div className="space-y-1">
        <div className="h-1.5 w-full bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Feedback Toast */}
      {cardStatusToast && (
        <div className="text-center animate-fadeIn">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-stone-900 text-white shadow-md">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{cardStatusToast.message}</span>
          </span>
        </div>
      )}

      {/* 3D Interactive Touch-Friendly Flashcard Container with Swipe Gestures */}
      <div className="w-full perspective-1000 overflow-hidden py-1">
        <div
          {...swipe.handlers}
          style={swipe.cardStyle}
          className="relative w-full cursor-grab active:cursor-grabbing select-none"
        >
          {/* Swipe Right Overlay Badge: LEARNED */}
          <div
            className="absolute top-4 right-4 z-30 pointer-events-none transition-opacity duration-75 flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-emerald-600 text-white font-black text-xs sm:text-sm shadow-xl border-2 border-emerald-400 rotate-12"
            style={{ opacity: swipe.rightOpacity }}
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>LEARNED</span>
          </div>

          {/* Swipe Left Overlay Badge: RE-LEARN HUB */}
          <div
            className="absolute top-4 left-4 z-30 pointer-events-none transition-opacity duration-75 flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-amber-500 text-stone-950 font-black text-xs sm:text-sm shadow-xl border-2 border-amber-300 -rotate-12"
            style={{ opacity: swipe.leftOpacity }}
          >
            <Zap className="w-4 h-4 fill-stone-950 stroke-[2]" />
            <span>RE-LEARN HUB</span>
          </div>

          {/* Swipe Up Overlay Badge: NEXT CARD */}
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none transition-opacity duration-75 flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-sky-600 text-white font-black text-xs sm:text-sm shadow-xl border-2 border-sky-400"
            style={{ opacity: swipe.upOpacity }}
          >
            <ArrowUp className="w-4 h-4 stroke-[3]" />
            <span>NEXT CARD</span>
          </div>

          {/* Inner 3D Flip Card */}
          <div
            className={`relative w-full rounded-3xl transition-transform duration-500 ease-out transform-style-preserve-3d min-h-[310px] xs:min-h-[350px] sm:min-h-[400px] md:min-h-[430px] ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
          {/* ==================== FRONT FACE: QUESTION ONLY ==================== */}
          <div
            className={`absolute inset-0 w-full h-full rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xl p-4 sm:p-7 flex flex-col justify-between overflow-y-auto overscroll-contain backface-hidden ${isFlipped ? 'pointer-events-none' : 'pointer-events-auto'
              }`}
          >
            {/* Top Badges Bar with Copy Control */}
            <div className="flex items-center justify-between text-xs text-stone-400 gap-1.5 flex-wrap">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${isEnToJa
                    ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300'
                    : 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                  }`}>
                  {isEnToJa ? '🇬🇧➔🇯🇵 EN➔JA' : '🇯🇵➔🇬🇧 JA➔EN'}
                </span>

                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                  {currentCard.type === 'vocabulary' ? '📖 Vocab' : '🈁 Kanji'}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyCard('front');
                  }}
                  className={`px-2 py-1 min-h-[28px] rounded-lg transition flex items-center gap-1 text-[11px] font-bold active:scale-95 ${
                    copiedFace === 'front'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800'
                      : 'bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300'
                  }`}
                  title={isEnToJa ? 'Copy English prompt' : 'Copy Japanese prompt'}
                  aria-label="Copy prompt"
                >
                  {copiedFace === 'front' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[2.5]" />
                      <span className="text-emerald-600 dark:text-emerald-400 text-[10px]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[10px]">Copy</span>
                    </>
                  )}
                </button>

                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-500">
                  Lesson {currentCard.lessonNumber}
                </span>
              </div>
            </div>

            {/* Front Center Question */}
            <div className="my-auto text-center space-y-3 py-3 w-full max-w-full overflow-hidden">
              {isEnToJa ? (
                /* EN to JA Front: English Word as Question */
                <div className="space-y-2 sm:space-y-3">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-400 block">
                    What is the Japanese for:
                  </span>
                  <div className={getEnglishTextClass(currentCard.english)}>
                    {currentCard.english}
                  </div>
                  {currentCard.partOfSpeech && (
                    <span className="inline-block text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-500">
                      {currentCard.partOfSpeech}
                    </span>
                  )}
                </div>
              ) : (
                /* JA to EN Front: Japanese Word as Question */
                <div className="space-y-2 sm:space-y-3">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-400 block">
                    What is the English meaning?
                  </span>

                  {currentCard.type === 'vocabulary' ? (
                    <FuriganaText
                      kanji={currentCard.kanji || currentCard.primaryJapanese}
                      reading={currentCard.hiragana || currentCard.primaryJapanese}
                      showFurigana={showFurigana}
                      className={getJapaneseTextClass(currentCard.kanji || currentCard.primaryJapanese, false)}
                    />
                  ) : (
                    /* Kanji Character with Furigana */
                    <FuriganaText
                      kanji={currentCard.primaryJapanese}
                      reading={currentCard.hiragana || currentCard.secondaryJapanese}
                      showFurigana={showFurigana}
                      className={getJapaneseTextClass(currentCard.primaryJapanese, true)}
                    />
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakJapanese(currentCard.hiragana || currentCard.primaryJapanese);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[38px] rounded-xl bg-stone-100 dark:bg-stone-800 text-red-500 hover:text-red-600 text-xs font-bold transition active:scale-95"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Pronounce</span>
                  </button>
                </div>
              )}

              <p className="text-[11px] text-stone-400 pt-1">
                Tap anywhere or press <kbd className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 font-mono text-[10px]">Space</kbd> to reveal answer
              </p>
            </div>

            {/* Front Footer */}
            <div className="flex items-center justify-between text-[11px] text-stone-400 pt-2 border-t border-stone-100 dark:border-stone-800">
              <span className="truncate max-w-[180px]">{currentCard.category || 'Minna no Nihongo'}</span>
              <span className="shrink-0 flex items-center gap-1">
                <RotateCw className="w-3 h-3" /> Tap to flip
              </span>
            </div>
          </div>

          {/* ==================== BACK FACE: ANSWER REVEALED ==================== */}
          <div
            className={`absolute inset-0 w-full h-full rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xl p-4 sm:p-7 flex flex-col justify-between overflow-y-auto overscroll-contain backface-hidden rotate-y-180 ${!isFlipped ? 'pointer-events-none' : 'pointer-events-auto'
              }`}
          >
            {/* Top Badges Bar with Copy Control */}
            <div className="flex items-center justify-between text-xs text-stone-400 gap-1.5 flex-wrap">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  ✓ Answer
                </span>

                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                  {currentCard.type === 'vocabulary' ? '📖 Vocab' : '🈁 Kanji'}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyCard('back');
                  }}
                  className={`px-2 py-1 min-h-[28px] rounded-lg transition flex items-center gap-1 text-[11px] font-bold active:scale-95 ${
                    copiedFace === 'back'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800'
                      : 'bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300'
                  }`}
                  title={isEnToJa ? 'Copy Japanese translation' : 'Copy English meaning'}
                  aria-label="Copy answer"
                >
                  {copiedFace === 'back' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[2.5]" />
                      <span className="text-emerald-600 dark:text-emerald-400 text-[10px]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[10px]">Copy</span>
                    </>
                  )}
                </button>

                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-500">
                  Lesson {currentCard.lessonNumber}
                </span>
              </div>
            </div>

            {/* Back Center Answer */}
            <div className="my-auto space-y-3 py-2 text-center w-full max-w-full overflow-hidden">
              {isEnToJa ? (
                /* EN to JA Back: Japanese Answer Revealed */
                <div className="space-y-2 sm:space-y-2.5">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                    ✓ Japanese Translation:
                  </span>

                  {currentCard.type === 'vocabulary' ? (
                    (() => {
                      const jp = getJapaneseWordDisplay({ kanji: currentCard.kanji, hiragana: currentCard.hiragana, romaji: currentCard.romaji });
                      return (
                        <div>
                            {/* Standard Japanese Spelling with Furigana over Kanji */}
                            <div className="px-2">
                              <FuriganaText
                                kanji={currentCard.kanji || currentCard.primaryJapanese}
                                reading={currentCard.hiragana || currentCard.primaryJapanese}
                                showFurigana={showFurigana}
                                className={getJapaneseTextClass(currentCard.kanji || currentCard.primaryJapanese, false)}
                              />
                            </div>
                            {/* Secondary reading underneath if distinct Kanji */}
                            {jp.secondaryText && (
                              <div className="text-lg xs:text-xl sm:text-2xl font-normal font-japanese text-stone-500 dark:text-stone-400 mt-0.5 break-words">
                                {jp.reading}
                              </div>
                            )}
                            <div className="text-xs font-mono text-stone-400 mt-0.5">
                              ({currentCard.romaji})
                            </div>
                          </div>
                          );
                    })()
                          ) : (
                          <div>
                            <FuriganaText
                              kanji={currentCard.primaryJapanese}
                              reading={currentCard.hiragana}
                              showFurigana={showFurigana}
                              className="text-5xl xs:text-6xl sm:text-7xl font-black font-japanese text-stone-900 dark:text-white"
                            />
                            <div className="text-xs sm:text-sm font-japanese text-stone-500 mt-1 break-words">
                              {currentCard.secondaryJapanese}
                            </div>
                          </div>
                  )}

                          <div className="flex items-center justify-center gap-2 pt-0.5">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                speakJapanese(currentCard.hiragana || currentCard.primaryJapanese);
                              }}
                              className="p-1.5 min-h-[34px] min-w-[34px] flex items-center justify-center rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 hover:text-red-700 transition active:scale-95"
                              title="Pronounce"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                            <span className="font-bold text-xs sm:text-sm text-stone-700 dark:text-stone-200">
                              {currentCard.english}
                            </span>
                          </div>

                          {/* Example sentence if available */}
                          {currentCard.exampleSentence && (
                            <div className="p-2.5 sm:p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-800 text-left text-xs max-w-md mx-auto">
                              <p className="font-japanese font-bold text-stone-800 dark:text-stone-200 break-words">
                                {currentCard.exampleSentence.japanese}
                              </p>
                              <p className="text-[11px] text-stone-500 italic mt-0.5 break-words">
                                {currentCard.exampleSentence.english}
                              </p>
                            </div>
                          )}

                          {/* Kanji stroke & readings if kanji */}
                          {currentCard.type === 'kanji' && currentCard.onyomi && (
                            <div className="text-xs font-japanese text-stone-500 space-x-2 break-words">
                              <span>On: {currentCard.onyomi.join(', ')}</span>
                              <span>Kun: {currentCard.kunyomi?.join(', ')}</span>
                            </div>
                          )}
                        </div>
                      ) : (
                    /* JA to EN Back: English Answer Revealed */
                    <div className="space-y-2 sm:space-y-2.5">
                      <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                        ✓ English Meaning:
                      </span>

                      <div className={getEnglishTextClass(currentCard.english)}>
                        {currentCard.english}
                      </div>

                      {/* Japanese word with Furigana */}
                      <div className="pt-1 flex items-center justify-center gap-1.5 flex-wrap">
                        <span className="text-xs text-stone-400">Word:</span>
                        <FuriganaText
                          kanji={currentCard.kanji || currentCard.primaryJapanese}
                          reading={currentCard.hiragana || currentCard.primaryJapanese}
                          showFurigana={showFurigana}
                          className="text-base font-bold font-japanese text-stone-900 dark:text-white"
                        />
                        <span className="text-xs font-mono text-stone-400">
                          ({currentCard.romaji})
                        </span>
                      </div>

                      <div className="flex items-center justify-center gap-2 pt-0.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            speakJapanese(currentCard.hiragana || currentCard.primaryJapanese);
                          }}
                          className="p-1.5 min-h-[34px] min-w-[34px] flex items-center justify-center rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 hover:text-red-700 transition active:scale-95"
                          title="Pronounce"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Example sentence */}
                      {currentCard.exampleSentence && (
                        <div className="p-2.5 sm:p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-800 text-left text-xs max-w-md mx-auto">
                          <p className="font-japanese font-bold text-stone-800 dark:text-stone-200 break-words">
                            {currentCard.exampleSentence.japanese}
                          </p>
                          <p className="text-[11px] text-stone-500 italic mt-0.5 break-words">
                            {currentCard.exampleSentence.english}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Quick Status Rating Buttons on Back */}
                  <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-center gap-2 flex-wrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkStatus('not_sure');
                      }}
                      className="px-3 py-1.5 min-h-[38px] rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold hover:bg-amber-100 transition flex items-center gap-1 active:scale-95"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Mark Re-learn</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkStatus('learned');
                      }}
                      className="px-3 py-1.5 min-h-[38px] rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold hover:bg-emerald-100 transition flex items-center gap-1 active:scale-95"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Mark Learned</span>
                    </button>
                  </div>
                </div>

                {/* Back Footer */}
                <div className="flex items-center justify-between text-[11px] text-stone-400 pt-2 border-t border-stone-100 dark:border-stone-800">
                  <span className="truncate max-w-[180px]">{currentCard.category || 'Minna no Nihongo'}</span>
                  <span className="shrink-0 flex items-center gap-1">
                    <RotateCw className="w-3 h-3" /> Tap to flip back
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Swipe Gestures Visual Guide */}
          <div className="flex items-center justify-between text-[10px] xs:text-[11px] font-bold px-2 xs:px-3 py-1 text-stone-400 select-none flex-wrap gap-y-1">
            <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
              <span>←</span>
              <span>Re-learn Hub</span>
            </span>
            <span className="text-stone-300 dark:text-stone-700 hidden xs:inline">•</span>
            <span className="flex items-center gap-1 text-sky-600 dark:text-sky-400 font-extrabold">
              <span>↑</span>
              <span>Swipe Up: Next</span>
            </span>
            <span className="text-stone-300 dark:text-stone-700 hidden xs:inline">•</span>
            <span className="text-[10px] text-stone-400 hidden sm:inline">Tap: Flip</span>
            <span className="text-stone-300 dark:text-stone-700 hidden xs:inline">•</span>
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <span>Learned</span>
              <span>→</span>
            </span>
          </div>
        </div>

        {/* Navigation Controls: Previous / Flip / Next - Mobile Friendly Tap Targets */}
        <div className="flex items-center justify-between gap-2 sm:gap-3 mt-3 sm:mt-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex-1 py-3 px-3 sm:px-4 min-h-[44px] sm:min-h-[48px] rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs sm:text-sm font-bold text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 disabled:opacity-40 transition flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
          >
            <ChevronLeft className="w-4 h-4 shrink-0" />
            <span className="hidden xs:inline">Previous</span>
            <span className="xs:hidden">Prev</span>
          </button>

          <button
            onClick={() => setIsFlipped(prev => !prev)}
            className="py-3 px-4 sm:px-6 min-h-[44px] sm:min-h-[48px] rounded-2xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200 text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 shadow-sm active:scale-95 shrink-0"
          >
            <RotateCw className="w-4 h-4 shrink-0" />
            <span>{isFlipped ? 'Flip Back' : 'Flip'}</span>
          </button>

          <button
            onClick={handleNext}
            className="flex-1 py-3 px-3 sm:px-4 min-h-[44px] sm:min-h-[48px] rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 shadow-md active:scale-95"
          >
            <span>{currentIndex + 1 === filteredSessionCards.length ? 'Finish' : 'Next'}</span>
            <ChevronRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>
      );
}
