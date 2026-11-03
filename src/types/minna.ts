// Type Definitions for Minna no Nihongo Curriculum, Tests & Custom Lessons

export type MinnaLevel = 'N5' | 'N4';

export type MinnaPartOfSpeech = 
  | 'noun' 
  | 'verb-1'      // Godan verbs (五段動詞)
  | 'verb-2'      // Ichidan verbs (一段動詞)
  | 'verb-3'      // Irregular verbs (くる / する)
  | 'i-adjective' 
  | 'na-adjective' 
  | 'adverb' 
  | 'particle' 
  | 'phrase' 
  | 'pronoun' 
  | 'counter' 
  | 'suffix'
  | 'conjunction';

export interface MinnaSentenceExample {
  japanese: string;
  hiragana: string;
  romaji: string;
  english?: string;
  explanation?: string;
}

export interface MinnaVocabularyItem {
  id: string;
  lessonNumber: number;
  kanji: string;
  hiragana: string;
  romaji: string;
  english: string;
  partOfSpeech: MinnaPartOfSpeech;
  category: string;
  exampleSentence?: MinnaSentenceExample;
  notes?: string;
}

export interface MinnaGrammarPoint {
  id: string;
  lessonNumber: number;
  title: string;
  structure: string;
  explanation: string;
  rules: string[];
  examples: MinnaSentenceExample[];
  commonMistakes?: string[];
}

export type MinnaQuestionType =
  | 'mcq'
  | 'fill_blank'
  | 'sentence_formation'
  | 'translation_ja_en'
  | 'translation_en_ja'
  | 'grammar_correction'
  | 'matching'
  | 'reading';

export interface MinnaPracticeExercise {
  id: string;
  lessonNumber: number;
  type: MinnaQuestionType;
  prompt: string;
  contextSentence?: string;
  options?: string[];
  wordTiles?: string[]; // For sentence formation
  correctAnswer: string;
  explanation: string;
  category: 'vocabulary' | 'grammar' | 'reading';
}

export interface MinnaDialogueLine {
  speaker: string;
  japanese: string;
  hiragana: string;
  english: string;
}

export interface MinnaDialogue {
  title: string;
  situation: string;
  lines: MinnaDialogueLine[];
}

export interface MinnaLesson {
  id: number;
  lessonNumber: number;
  level: MinnaLevel;
  title: string;
  titleJapanese: string;
  theme: string;
  description: string;
  keyPhrases: string[];
  vocabulary: MinnaVocabularyItem[];
  grammar: MinnaGrammarPoint[];
  exercises: MinnaPracticeExercise[];
  dialogue?: MinnaDialogue;
}

export interface CustomLesson {
  id: string;
  title: string;
  description: string;
  level: MinnaLevel;
  tags: string[];
  vocabulary: MinnaVocabularyItem[];
  grammar: MinnaGrammarPoint[];
  createdAt: string;
  updatedAt: string;
  isUserCreated: boolean;
}

export interface MinnaUserLessonProgress {
  lessonNumber: number;
  status: 'not_started' | 'in_progress' | 'completed' | 'mastered';
  learnedVocabIds: string[];
  understoodGrammarIds: string[];
  bestScore: number;
  totalAttempts: number;
  lastStudiedAt: string | null;
  weakVocabIds: string[];
  weakGrammarIds: string[];
}

export interface CustomExamConfig {
  title?: string;
  level: MinnaLevel;
  lessonRange: number[];
  focus: 'all' | 'vocab' | 'grammar';
  questionTypes: MinnaQuestionType[];
  questionCount: number;
  difficulty: 'easy' | 'medium' | 'hard';
  durationMinutes: number; // 0 for untimed
  includeWeakAreas: boolean;
  generatorMode: 'smart_local' | 'groq_ai';
}

export interface ExamQuestion {
  id: string;
  lessonNumber: number;
  type: MinnaQuestionType;
  category: 'vocabulary' | 'grammar' | 'reading';
  prompt: string;
  secondaryPrompt?: string;
  contextText?: string;
  englishMeaning?: string;
  options?: string[];
  wordTiles?: string[]; // For sentence formation
  matchingPairs?: { left: string; right: string }[];
  correctAnswer: string;
  explanation: string;
  grammarPointId?: string;
  vocabId?: string;
}

export interface ExamAnswerLog {
  questionId: string;
  prompt: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string;
  lessonNumber: number;
  category: 'vocabulary' | 'grammar' | 'reading';
}

export interface ExamResultRecord {
  id: string;
  examTitle: string;
  date: string;
  totalQuestions: number;
  correctCount: number;
  scorePercent: number;
  timeSpentSeconds: number;
  lessonNumbers: number[];
  answers: ExamAnswerLog[];
  weakLessons: number[];
  weakGrammarTopics: string[];
  weakVocab: string[];
  aiDiagnostic?: {
    summary: string;
    strengths: string[];
    areasToImprove: string[];
    recommendations: string[];
  };
}
