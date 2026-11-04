export type MockExamSectionId = 'vocabulary' | 'grammar_reading' | 'listening';

export type VocabularyQuestionCategory = 
  | 'kanji_reading' 
  | 'orthography' 
  | 'context_expressions' 
  | 'paraphrases';

export type GrammarReadingQuestionCategory = 
  | 'correct_grammar' 
  | 'sentence_composition' 
  | 'text_grammar' 
  | 'short_passage' 
  | 'mid_passage' 
  | 'information_retrieval';

export type ListeningQuestionCategory = 
  | 'task_comprehension' 
  | 'point_comprehension' 
  | 'verbal_expressions' 
  | 'quick_response';

export type MockExamQuestionCategory = 
  | VocabularyQuestionCategory 
  | GrammarReadingQuestionCategory 
  | ListeningQuestionCategory;

export interface MockExamQuestion {
  id: string;
  section: MockExamSectionId;
  category: MockExamQuestionCategory;
  categoryNameJa: string;
  categoryNameEn: string;
  prompt: string; // May include Furigana brackets: 漢字[かんじ]
  subPrompt?: string;
  contextPassage?: string; // For reading and text grammar
  audioScript?: string; // For listening comprehension dialogues
  options: string[]; // Exactly 4 choices
  correctAnswer: string;
  explanation: string;
  marks: number; // 1 or 2 marks
}

export interface MockExamSectionConfig {
  section: MockExamSectionId;
  titleJa: string;
  titleEn: string;
  timeLimitMinutes: number;
  questionCount: number;
  maxMarks: number;
  categories: {
    id: MockExamQuestionCategory;
    nameJa: string;
    nameEn: string;
    count: number;
  }[];
}

export type MockExamMode = 'full' | 'vocabulary' | 'grammar_reading' | 'listening';

export interface MockExamConfig {
  id: string;
  mode: MockExamMode;
  title: string;
  totalTimeMinutes: number;
  sections: MockExamSectionConfig[];
}

export interface MockExamSectionResult {
  sectionId: MockExamSectionId;
  sectionName: string;
  totalQuestions: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  rawMarks: number;
  maxMarks: number;
  percentage: number;
}

export interface MockExamResult {
  id: string;
  examTitle: string;
  mode: MockExamMode;
  completedAt: string;
  timeSpentSeconds: number;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  totalRawMarks: number;
  maxRawMarks: number;
  percentage: number;
  // Official N5 scaled score estimation (0-180)
  jlptScaledScore: {
    languageKnowledgeAndReading: number; // 0-120
    listening: number; // 0-60
    total: number; // 0-180
  };
  estimatedPass: boolean;
  passBreakdown: {
    overallPass: boolean; // total >= 80/180
    langReadPass: boolean; // lang & reading >= 38/120
    listeningPass: boolean; // listening >= 19/60
  };
  sectionResults: MockExamSectionResult[];
  strongTopics: string[];
  weakTopics: string[];
  recommendedTopics: string[];
  questionReview: {
    question: MockExamQuestion;
    userAnswer?: string;
    isCorrect: boolean;
  }[];
}

