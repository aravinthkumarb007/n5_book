export type CounterCategory = 
  | 'numbers' 
  | 'counters' 
  | 'time' 
  | 'months' 
  | 'dates' 
  | 'duration';

export interface NumberItem {
  value: number;
  kanji: string;
  hiragana: string;
  romaji: string;
  english: string;
  category: '1_to_10' | '11_to_100' | 'hundreds' | 'thousands' | 'ten_thousands' | 'special';
  notes?: string;
  isIrregular?: boolean;
}

export interface CounterItemCount {
  count: number;
  kanji: string;
  hiragana: string;
  romaji: string;
  isIrregular?: boolean;
  soundChangeNote?: string;
}

export interface CounterDefinition {
  id: string;
  kanji: string;
  hiragana: string;
  romaji: string;
  english: string;
  targetDescription: string;
  soundRuleNotes: string;
  items: CounterItemCount[];
  exampleSentences: {
    japanese: string;
    hiragana: string;
    english: string;
  }[];
}

export interface TimeItem {
  type: 'hour' | 'minute' | 'second' | 'ampm' | 'phrase';
  kanji: string;
  hiragana: string;
  romaji: string;
  english: string;
  isIrregular?: boolean;
  notes?: string;
}

export interface MonthItem {
  month: number;
  kanji: string;
  hiragana: string;
  romaji: string;
  english: string;
  isIrregular?: boolean;
  notes?: string;
}

export interface DateDayItem {
  dayNumber: number;
  kanji: string;
  hiragana: string;
  romaji: string;
  english: string;
  isIrregular?: boolean;
  notes?: string;
}

export interface DurationItem {
  type: 'hour_duration' | 'minute_duration' | 'day_duration' | 'week_duration' | 'month_duration' | 'year_duration' | 'frequency';
  kanji: string;
  hiragana: string;
  romaji: string;
  english: string;
  notes?: string;
}

export type CountersTestCategory = 
  | 'numbers'
  | 'counters'
  | 'time'
  | 'months'
  | 'dates'
  | 'days_of_week'
  | 'minutes_hours'
  | 'mixed'
  | 'full';

export interface CountersTestQuestion {
  id: string;
  category: CountersTestCategory;
  categoryName: string;
  prompt: string;
  contextSentence?: string;
  options: string[]; // 4 options
  correctAnswer: string;
  explanation: string;
  targetItem?: string;
}

export interface CountersTestResult {
  id: string;
  category: CountersTestCategory;
  categoryTitle: string;
  completedAt: string;
  timeSpentSeconds: number;
  score: number;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  percentage: number;
  topicPerformance: {
    topic: string;
    correct: number;
    total: number;
    percentage: number;
  }[];
  strongAreas: string[];
  weakAreas: string[];
  recommendedTopics: string[];
  answers: {
    question: CountersTestQuestion;
    userAnswer?: string;
    isCorrect: boolean;
  }[];
}

