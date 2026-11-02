'use client';

import React, { useState } from 'react';
import {
  Sparkles, Plus, Trash2, BookOpen, Layers, Check,
  Download, ArrowRight, X
} from 'lucide-react';
import { CustomLesson, MinnaGrammarPoint, MinnaVocabularyItem } from '@/types/minna';
import { ALL_MINNA_LESSONS } from '@/data/minnaNoNihongo';
import { saveCustomLesson } from '@/services/minnaStorage';

interface MinnaCustomLessonModalProps {
  onClose: () => void;
  onLessonSaved: (lesson: CustomLesson) => void;
  editLesson?: CustomLesson | null;
}

export function MinnaCustomLessonModal({
  onClose,
  onLessonSaved,
  editLesson
}: MinnaCustomLessonModalProps) {
  const [title, setTitle] = useState(editLesson?.title || '');
  const [description, setDescription] = useState(editLesson?.description || '');
  const [tagsInput, setTagsInput] = useState(editLesson?.tags?.join(', ') || 'N5, Revision');
  const [vocabList, setVocabList] = useState<MinnaVocabularyItem[]>(editLesson?.vocabulary || []);
  const [grammarList, setGrammarList] = useState<MinnaGrammarPoint[]>(editLesson?.grammar || []);

  // New Vocab Form State
  const [newKanji, setNewKanji] = useState('');
  const [newHiragana, setNewHiragana] = useState('');
  const [newRomaji, setNewRomaji] = useState('');
  const [newEnglish, setNewEnglish] = useState('');

  // New Grammar Form State
  const [newGrammarTitle, setNewGrammarTitle] = useState('');
  const [newGrammarStructure, setNewGrammarStructure] = useState('');
  const [newGrammarExplanation, setNewGrammarExplanation] = useState('');

  // Import Drawer State
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [selectedLessonToImport, setSelectedLessonToImport] = useState<number>(1);

  const handleAddVocab = () => {
    if (!newHiragana.trim() || !newEnglish.trim()) return;

    const item: MinnaVocabularyItem = {
      id: `cust_v_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      lessonNumber: 0,
      kanji: newKanji.trim() || newHiragana.trim(),
      hiragana: newHiragana.trim(),
      romaji: newRomaji.trim() || newHiragana.trim(),
      english: newEnglish.trim(),
      partOfSpeech: 'noun',
      category: 'Custom'
    };

    setVocabList([...vocabList, item]);
    setNewKanji('');
    setNewHiragana('');
    setNewRomaji('');
    setNewEnglish('');
  };

  const handleAddGrammar = () => {
    if (!newGrammarTitle.trim() || !newGrammarStructure.trim()) return;

    const point: MinnaGrammarPoint = {
      id: `cust_g_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      lessonNumber: 0,
      title: newGrammarTitle.trim(),
      structure: newGrammarStructure.trim(),
      explanation: newGrammarExplanation.trim() || 'Custom grammar concept',
      rules: [],
      examples: []
    };

    setGrammarList([...grammarList, point]);
    setNewGrammarTitle('');
    setNewGrammarStructure('');
    setNewGrammarExplanation('');
  };

  const handleImportFromLesson = () => {
    const lesson = ALL_MINNA_LESSONS.find(l => l.lessonNumber === selectedLessonToImport);
    if (!lesson) return;

    // Add unique vocab
    const existingVocabKanji = new Set(vocabList.map(v => v.kanji));
    const toAddVocab = lesson.vocabulary.filter(v => !existingVocabKanji.has(v.kanji));

    // Add unique grammar
    const existingGrammarTitles = new Set(grammarList.map(g => g.title));
    const toAddGrammar = lesson.grammar.filter(g => !existingGrammarTitles.has(g.title));

    setVocabList([...vocabList, ...toAddVocab]);
    setGrammarList([...grammarList, ...toAddGrammar]);
    setImportModalOpen(false);
  };

  const handleSave = () => {
    if (!title.trim()) return;

    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);

    const lesson: CustomLesson = {
      id: editLesson?.id || `custom_lesson_${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      level: 'N5',
      tags: tags.length > 0 ? tags : ['Custom', 'N5'],
      vocabulary: vocabList,
      grammar: grammarList,
      createdAt: editLesson?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isUserCreated: true
    };

    saveCustomLesson(lesson);
    onLessonSaved(lesson);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-950/75 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-sm">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black">
                {editLesson ? 'Edit Custom Lesson' : 'Create Custom Lesson'}
              </h2>
              <p className="text-xs text-white/90">
                Design personalized Japanese study units, mash up existing Minna topics, or add novel vocab & grammar
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-black/20 hover:bg-black/30 text-white transition"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          
          {/* Metadata Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                Lesson Title *
              </label>
              <input
                type="text"
                placeholder="e.g. My High Priority JLPT N5 Vocab"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                Tags (comma separated)
              </label>
              <input
                type="text"
                placeholder="e.g. N5, Verbs, Review, Daily Life"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                Lesson Description / Study Goal
              </label>
              <input
                type="text"
                placeholder="e.g. Focused revision before mock exam covering motion verbs and te-form"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Import from Minna Button */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200">
                Import Existing Topics from Minna no Nihongo
              </h4>
              <p className="text-[11px] text-amber-700 dark:text-amber-300 mt-0.5">
                Automatically pull verified vocabulary and grammar from any of Lessons 1–25 into this lesson.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setImportModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 transition flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Import from Minna</span>
            </button>
          </div>

          {/* Section: Vocabulary List */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-stone-500">
                Vocabulary Items ({vocabList.length})
              </h3>
            </div>

            {/* Quick Add Vocab Row */}
            <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-800 grid grid-cols-2 sm:grid-cols-5 gap-2 items-center">
              <input
                type="text"
                placeholder="Kanji (漢字)"
                value={newKanji}
                onChange={(e) => setNewKanji(e.target.value)}
                className="px-3 py-2 rounded-xl text-xs border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900"
              />
              <input
                type="text"
                placeholder="Hiragana * (ひらがな)"
                value={newHiragana}
                onChange={(e) => setNewHiragana(e.target.value)}
                className="px-3 py-2 rounded-xl text-xs border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900"
              />
              <input
                type="text"
                placeholder="Romaji (romaji)"
                value={newRomaji}
                onChange={(e) => setNewRomaji(e.target.value)}
                className="px-3 py-2 rounded-xl text-xs border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900"
              />
              <input
                type="text"
                placeholder="English Meaning *"
                value={newEnglish}
                onChange={(e) => setNewEnglish(e.target.value)}
                className="px-3 py-2 rounded-xl text-xs border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900"
              />
              <button
                type="button"
                onClick={handleAddVocab}
                disabled={!newHiragana.trim() || !newEnglish.trim()}
                className="col-span-2 sm:col-span-1 py-2 px-3 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-bold disabled:opacity-30 hover:opacity-90 transition flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Word</span>
              </button>
            </div>

            {/* Vocab Badges */}
            <div className="max-h-48 overflow-y-auto flex flex-wrap gap-2 p-1">
              {vocabList.length === 0 ? (
                <span className="text-xs text-stone-400 italic">No vocabulary added yet.</span>
              ) : (
                vocabList.map((v, idx) => (
                  <div
                    key={idx}
                    className="pl-3 pr-2 py-1.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs flex items-center gap-2"
                  >
                    <span className="font-japanese font-bold text-stone-900 dark:text-white">
                      {v.kanji}
                    </span>
                    <span className="text-stone-400">({v.hiragana})</span>
                    <span className="text-stone-600 dark:text-stone-300 font-medium">= {v.english}</span>
                    <button
                      type="button"
                      onClick={() => setVocabList(vocabList.filter((_, i) => i !== idx))}
                      className="text-stone-400 hover:text-red-500 p-0.5 ml-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Section: Grammar Points */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-stone-500">
                Grammar Points ({grammarList.length})
              </h3>
            </div>

            {/* Quick Add Grammar Box */}
            <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-800 space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Grammar Title (e.g. 〜てから After doing...)"
                  value={newGrammarTitle}
                  onChange={(e) => setNewGrammarTitle(e.target.value)}
                  className="px-3 py-2 rounded-xl text-xs border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900"
                />
                <input
                  type="text"
                  placeholder="Structure Formula (e.g. Verb [Te-Form] + から)"
                  value={newGrammarStructure}
                  onChange={(e) => setNewGrammarStructure(e.target.value)}
                  className="px-3 py-2 rounded-xl text-xs border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 font-mono"
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Short Explanation or Rule"
                  value={newGrammarExplanation}
                  onChange={(e) => setNewGrammarExplanation(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl text-xs border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900"
                />
                <button
                  type="button"
                  onClick={handleAddGrammar}
                  disabled={!newGrammarTitle.trim() || !newGrammarStructure.trim()}
                  className="px-4 py-2 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-bold disabled:opacity-30 hover:opacity-90 transition flex items-center gap-1 shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Grammar</span>
                </button>
              </div>
            </div>

            {/* Grammar Cards */}
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {grammarList.length === 0 ? (
                <span className="text-xs text-stone-400 italic">No grammar points added yet.</span>
              ) : (
                grammarList.map((g, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs flex items-center justify-between gap-2"
                  >
                    <div>
                      <div className="font-bold text-stone-900 dark:text-white">
                        {g.title}
                      </div>
                      <div className="font-mono text-red-600 dark:text-red-400 text-[11px] mt-0.5">
                        {g.structure}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setGrammarList(grammarList.filter((_, i) => i !== idx))}
                      className="text-stone-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            Total: {vocabList.length} Words • {grammarList.length} Grammar Topics
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-stone-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!title.trim()}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs sm:text-sm shadow-lg hover:from-red-700 hover:to-rose-700 disabled:opacity-40 transition flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Save Lesson</span>
            </button>
          </div>
        </div>

      </div>

      {/* Import Modal Overlay */}
      {importModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 max-w-md w-full border border-stone-200 dark:border-stone-800 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-sm text-stone-900 dark:text-white">
                Select Minna Lesson to Import
              </h3>
              <button onClick={() => setImportModalOpen(false)}>✕</button>
            </div>

            <p className="text-xs text-stone-500">
              Pick any of the 25 official Minna no Nihongo lessons to copy all its verified vocabulary and grammar items into this custom lesson.
            </p>

            <select
              value={selectedLessonToImport}
              onChange={(e) => setSelectedLessonToImport(Number(e.target.value))}
              className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs font-bold"
            >
              {ALL_MINNA_LESSONS.map((l) => (
                <option key={l.lessonNumber} value={l.lessonNumber}>
                  Lesson {l.lessonNumber}: {l.title} ({l.vocabulary.length} words, {l.grammar.length} grammar)
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setImportModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleImportFromLesson}
                className="px-5 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700"
              >
                Import Content
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
