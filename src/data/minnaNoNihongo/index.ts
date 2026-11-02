import { MinnaLesson, MinnaVocabularyItem, MinnaGrammarPoint, MinnaPracticeExercise } from '@/types/minna';
import { MINNA_LESSONS_1_TO_5 } from './lessons1_to_5';
import { MINNA_LESSONS_6_TO_10 } from './lessons6_to_10';
import { MINNA_LESSONS_11_TO_15 } from './lessons11_to_15';
import { MINNA_LESSONS_16_TO_20 } from './lessons16_to_20';
import { MINNA_LESSONS_21_TO_25 } from './lessons21_to_25';
import { 
  MINNA_PARTICLES_SUMMARY, 
  MINNA_COUNTERS_TABLE, 
  MINNA_VERBS_CONJUGATION_TABLE,
  ParticleSummaryItem,
  CounterEntry,
  VerbConjugationEntry
} from './appendices';

export * from './appendices';

// All 25 Minna no Nihongo Shokyu I Lessons
export const ALL_MINNA_LESSONS: MinnaLesson[] = [
  ...MINNA_LESSONS_1_TO_5,
  ...MINNA_LESSONS_6_TO_10,
  ...MINNA_LESSONS_11_TO_15,
  ...MINNA_LESSONS_16_TO_20,
  ...MINNA_LESSONS_21_TO_25
];

export function getAllMinnaLessons(): MinnaLesson[] {
  return ALL_MINNA_LESSONS;
}

export function getMinnaLesson(lessonNumber: number): MinnaLesson | undefined {
  return ALL_MINNA_LESSONS.find(l => l.lessonNumber === lessonNumber);
}

export function getVocabularyByLesson(lessonNumber: number): MinnaVocabularyItem[] {
  const lesson = getMinnaLesson(lessonNumber);
  return lesson ? lesson.vocabulary : [];
}

export function getGrammarByLesson(lessonNumber: number): MinnaGrammarPoint[] {
  const lesson = getMinnaLesson(lessonNumber);
  return lesson ? lesson.grammar : [];
}

export function getExercisesByLesson(lessonNumber: number): MinnaPracticeExercise[] {
  const lesson = getMinnaLesson(lessonNumber);
  return lesson ? lesson.exercises : [];
}

export function getParticlesSummary(): ParticleSummaryItem[] {
  return MINNA_PARTICLES_SUMMARY;
}

export function getCountersTable(): CounterEntry[] {
  return MINNA_COUNTERS_TABLE;
}

export function getVerbsConjugationTable(): VerbConjugationEntry[] {
  return MINNA_VERBS_CONJUGATION_TABLE;
}

export function getCurriculumStats() {
  let totalVocab = 0;
  let totalGrammar = 0;
  let totalExercises = 0;

  for (const lesson of ALL_MINNA_LESSONS) {
    totalVocab += lesson.vocabulary.length;
    totalGrammar += lesson.grammar.length;
    totalExercises += lesson.exercises.length;
  }

  return {
    totalLessons: ALL_MINNA_LESSONS.length,
    totalVocab,
    totalGrammar,
    totalExercises
  };
}

export function searchMinnaContent(rawQuery: string) {
  const query = rawQuery.trim().toLowerCase();
  if (!query) {
    return { lessons: ALL_MINNA_LESSONS, vocab: [], grammar: [] };
  }

  const matchingLessons = ALL_MINNA_LESSONS.filter(l => 
    l.title.toLowerCase().includes(query) ||
    l.titleJapanese.includes(query) ||
    l.description.toLowerCase().includes(query) ||
    l.theme.includes(query)
  );

  const matchingVocab: MinnaVocabularyItem[] = [];
  const matchingGrammar: MinnaGrammarPoint[] = [];

  for (const lesson of ALL_MINNA_LESSONS) {
    for (const v of lesson.vocabulary) {
      if (
        v.kanji.includes(query) ||
        v.hiragana.includes(query) ||
        v.romaji.toLowerCase().includes(query) ||
        v.english.toLowerCase().includes(query) ||
        (v.category && v.category.toLowerCase().includes(query))
      ) {
        matchingVocab.push(v);
      }
    }

    for (const g of lesson.grammar) {
      if (
        g.title.toLowerCase().includes(query) ||
        g.structure.toLowerCase().includes(query) ||
        g.explanation.toLowerCase().includes(query)
      ) {
        matchingGrammar.push(g);
      }
    }
  }

  return {
    lessons: matchingLessons,
    vocab: matchingVocab,
    grammar: matchingGrammar
  };
}
