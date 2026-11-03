export type LearningStatus = 'locked' | 'available' | 'learning' | 'learned' | 'needs_revision';

export type ReadingType = 'onyomi' | 'kunyomi' | 'irregular';

export interface VocabularyItem {
  word: string;
  hiragana: string;
  romaji: string;
  meaning: string;
  readingType: ReadingType;
  source?: string;
  verificationStatus?: 'verified' | 'pending' | 'needs_review' | 'unavailable';
}

export interface ExampleSentence {
  japanese: string;
  hiragana: string;
  romaji: string;
  english: string;
  verificationStatus?: 'verified' | 'pending' | 'needs_review' | 'unavailable';
}

export interface StrokeOrderData {
  count: number;
  directions?: string[];
  svgPaths?: string[];
}

export interface DynamicAiEnrichment {
  etymology_and_origin?: string;
  memory_mnemonic?: string;
  reading_guidance?: string;
  office_context_tip?: string;
  bonus_sentences?: ExampleSentence[];
  generatedAt?: string;
  provider?: string;
}

export interface KanjiRecord {
  id: number;
  kanji_number: number;
  character: string;
  meaning: string;
  level: number; // 1 to 12
  onyomi_readings: string[]; // in Katakana
  kunyomi_readings: string[]; // in Hiragana
  onyomi_romaji: string[];
  kunyomi_romaji: string[];
  hiragana_reading: string;
  stroke_count: number;
  radicals: string;
  stroke_order_data: StrokeOrderData;
  mnemonic: string;
  vocabulary: VocabularyItem[];
  example_sentences: ExampleSentence[];
  ai_enrichment?: DynamicAiEnrichment;
}

export interface UserKanjiProgress {
  kanji_id: number;
  learning_status: LearningStatus;
  learned_at: string | null;
  meaning_accuracy: number;
  onyomi_accuracy: number;
  kunyomi_accuracy: number;
  vocabulary_accuracy: number;
  revision_count: number;
  mistake_count: number;
  last_studied_at: string | null;
  next_review_at: string | null;
  srs_interval: number;
  srs_repetitions: number;
  srs_ease_factor: number;
  incorrect_history: string[];
}

export type QuizQuestionType = 
  | 'kanji_to_english'
  | 'english_to_kanji'
  | 'kanji_to_onyomi'
  | 'kanji_to_kunyomi'
  | 'hiragana_to_kanji'
  | 'vocab_recognition'
  | 'sentence_completion'
  | 'timed_challenge'
  | 'kanji_recognition';

export interface QuizQuestion {
  id: string;
  kanjiId: number;
  type: QuizQuestionType;
  prompt: string;
  secondaryPrompt?: string;
  contextSentence?: string;
  englishMeaning?: string;
  options: string[]; // 4 choices, dynamically drawn ONLY from learned kanji pool
  correctAnswer: string;
  explanation: string;
  kanjiCharacter: string;
}

export interface QuizResultRecord {
  id: string;
  date: string;
  kanji_id: number;
  question_type: QuizQuestionType;
  selected_answer: string;
  correct_answer: string;
  is_correct: boolean;
  time_taken_seconds: number;
}

export interface StudySessionRecord {
  id: string;
  user_id: string;
  completed_at: string;
  session_duration: number; // in minutes
  kanji_studied: number[];
  quiz_score: number;
  mode: 'quick_5' | 'quick_10' | 'quick_15' | 'regular_lesson' | 'quiz' | 'flashcards' | 'weak_kanji';
}

export interface UserSettings {
  user_id: string;
  user_name: string;
  daily_target: number;
  preferred_session_duration: 5 | 10 | 15;
  theme: 'light' | 'dark';
  sound_enabled: boolean;
  audio_speed: number;
  daily_streak: number;
  last_active_date: string;
  study_dates: string[];
}

export interface ApiConfiguration {
  provider: 'groq';
  apiKey: string;
  model: string;
  endpoint: string;
  enabled: boolean;
  maskedKey?: string;
  status?: 'active' | 'error' | 'unconfigured';
  lastTestedAt?: string;
}

export type FlashcardRating = 'again' | 'hard' | 'good' | 'easy';
