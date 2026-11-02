-- ====================================================================
-- N5 KANJI MASTER - POSTGRESQL & SUPABASE RELATIONAL DATABASE SCHEMA
-- ====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Fixed 120-Kanji Syllabus Table
CREATE TABLE IF NOT EXISTS kanji (
    id SERIAL PRIMARY KEY,
    kanji_number INTEGER UNIQUE NOT NULL CHECK (kanji_number BETWEEN 1 AND 120),
    character VARCHAR(4) UNIQUE NOT NULL,
    meaning VARCHAR(100) NOT NULL,
    level INTEGER NOT NULL CHECK (level BETWEEN 1 AND 12),
    stroke_count INTEGER NOT NULL,
    radicals VARCHAR(100) NOT NULL,
    mnemonic TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index on level for fast level queries
CREATE INDEX IF NOT EXISTS idx_kanji_level ON kanji(level);
CREATE INDEX IF NOT EXISTS idx_kanji_character ON kanji(character);

-- 2. Readings Table (Normalized for Onyomi and Kunyomi)
CREATE TABLE IF NOT EXISTS kanji_readings (
    id SERIAL PRIMARY KEY,
    kanji_id INTEGER NOT NULL REFERENCES kanji(id) ON DELETE CASCADE,
    reading_type VARCHAR(10) NOT NULL CHECK (reading_type IN ('onyomi', 'kunyomi')),
    reading_japanese VARCHAR(50) NOT NULL, -- Katakana for Onyomi, Hiragana for Kunyomi
    reading_romaji VARCHAR(50) NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    verification_status VARCHAR(20) DEFAULT 'verified' CHECK (verification_status IN ('pending', 'verified', 'needs_review', 'unavailable')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_readings_kanji ON kanji_readings(kanji_id);

-- 3. Kanji Stroke Order Data
CREATE TABLE IF NOT EXISTS kanji_stroke_data (
    id SERIAL PRIMARY KEY,
    kanji_id INTEGER UNIQUE NOT NULL REFERENCES kanji(id) ON DELETE CASCADE,
    stroke_count INTEGER NOT NULL,
    stroke_directions JSONB DEFAULT '[]'::jsonb,
    svg_paths JSONB DEFAULT '[]'::jsonb,
    source VARCHAR(50) DEFAULT 'KanjiVG',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Kanji Vocabulary Table
CREATE TABLE IF NOT EXISTS kanji_vocabulary (
    id SERIAL PRIMARY KEY,
    kanji_id INTEGER NOT NULL REFERENCES kanji(id) ON DELETE CASCADE,
    word VARCHAR(50) NOT NULL,
    hiragana VARCHAR(50) NOT NULL,
    romaji VARCHAR(50) NOT NULL,
    meaning VARCHAR(255) NOT NULL,
    reading_type VARCHAR(20) NOT NULL CHECK (reading_type IN ('onyomi', 'kunyomi', 'irregular')),
    verification_status VARCHAR(20) DEFAULT 'verified' CHECK (verification_status IN ('pending', 'verified', 'needs_review', 'unavailable')),
    source VARCHAR(50) DEFAULT 'JMdict',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_vocab_kanji ON kanji_vocabulary(kanji_id);

-- 5. Kanji Example Sentences
CREATE TABLE IF NOT EXISTS kanji_examples (
    id SERIAL PRIMARY KEY,
    kanji_id INTEGER NOT NULL REFERENCES kanji(id) ON DELETE CASCADE,
    japanese TEXT NOT NULL,
    hiragana TEXT NOT NULL,
    romaji TEXT NOT NULL,
    english TEXT NOT NULL,
    verification_status VARCHAR(20) DEFAULT 'verified' CHECK (verification_status IN ('pending', 'verified', 'needs_review', 'unavailable')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_examples_kanji ON kanji_examples(kanji_id);

-- 6. User Kanji Progress Table
CREATE TABLE IF NOT EXISTS user_kanji_progress (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL, -- Supabase auth.users id or anonymous user uuid
    kanji_id INTEGER NOT NULL REFERENCES kanji(id) ON DELETE CASCADE,
    learning_status VARCHAR(20) NOT NULL DEFAULT 'locked' CHECK (learning_status IN ('locked', 'available', 'learning', 'learned', 'needs_revision')),
    learned_at TIMESTAMP WITH TIME ZONE,
    last_studied_at TIMESTAMP WITH TIME ZONE,
    next_review_at TIMESTAMP WITH TIME ZONE,
    meaning_accuracy NUMERIC(5, 2) DEFAULT 0.00,
    onyomi_accuracy NUMERIC(5, 2) DEFAULT 0.00,
    kunyomi_accuracy NUMERIC(5, 2) DEFAULT 0.00,
    vocabulary_accuracy NUMERIC(5, 2) DEFAULT 0.00,
    revision_count INTEGER DEFAULT 0,
    mistake_count INTEGER DEFAULT 0,
    srs_interval INTEGER DEFAULT 1,
    srs_repetitions INTEGER DEFAULT 0,
    srs_ease_factor NUMERIC(4, 2) DEFAULT 2.50,
    incorrect_history JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, kanji_id)
);

CREATE INDEX IF NOT EXISTS idx_user_kanji_status ON user_kanji_progress(user_id, learning_status);

-- 7. Quiz Questions (Dynamically generated questions repository)
CREATE TABLE IF NOT EXISTS quiz_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    kanji_id INTEGER NOT NULL REFERENCES kanji(id) ON DELETE CASCADE,
    question_type VARCHAR(50) NOT NULL,
    prompt TEXT NOT NULL,
    secondary_prompt TEXT,
    context_sentence TEXT,
    options JSONB NOT NULL, -- 4 choices, dynamically drawn strictly from learned pool
    correct_answer TEXT NOT NULL,
    explanation TEXT NOT NULL,
    generated_by VARCHAR(50) DEFAULT 'system' CHECK (generated_by IN ('system', 'groq_ai')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Quiz History Table
CREATE TABLE IF NOT EXISTS quiz_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    kanji_id INTEGER NOT NULL REFERENCES kanji(id) ON DELETE CASCADE,
    question_type VARCHAR(50) NOT NULL,
    selected_answer TEXT NOT NULL,
    correct_answer TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    time_taken_seconds NUMERIC(6, 2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quiz_history_user ON quiz_history(user_id, created_at DESC);

-- 9. Study Sessions Table (5/10/15 min sessions, reviews, etc.)
CREATE TABLE IF NOT EXISTS study_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    session_duration INTEGER NOT NULL, -- minutes
    mode VARCHAR(50) NOT NULL,
    kanji_studied JSONB NOT NULL DEFAULT '[]'::jsonb,
    quiz_score NUMERIC(5, 2) DEFAULT 0,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Flashcard Reviews (Spaced Repetition Log)
CREATE TABLE IF NOT EXISTS flashcard_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    kanji_id INTEGER NOT NULL REFERENCES kanji(id) ON DELETE CASCADE,
    rating VARCHAR(10) NOT NULL CHECK (rating IN ('again', 'hard', 'good', 'easy')),
    previous_interval INTEGER NOT NULL,
    new_interval INTEGER NOT NULL,
    reviewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. User Settings Table
CREATE TABLE IF NOT EXISTS user_settings (
    user_id UUID PRIMARY KEY,
    user_name VARCHAR(100) DEFAULT 'Kanji Scholar',
    daily_target INTEGER DEFAULT 5,
    preferred_session_duration INTEGER DEFAULT 10,
    theme VARCHAR(10) DEFAULT 'light' CHECK (theme IN ('light', 'dark')),
    sound_enabled BOOLEAN DEFAULT true,
    audio_speed NUMERIC(3, 2) DEFAULT 1.0,
    daily_streak INTEGER DEFAULT 1,
    last_active_date DATE DEFAULT CURRENT_DATE,
    study_dates JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. User API Configuration (Secure Server Storage for Groq / AI Credentials)
CREATE TABLE IF NOT EXISTS user_api_config (
    user_id UUID PRIMARY KEY,
    ai_provider VARCHAR(50) DEFAULT 'groq',
    api_model VARCHAR(100) DEFAULT 'llama-3.3-70b-versatile',
    api_endpoint VARCHAR(255) DEFAULT 'https://api.groq.com/openai/v1/chat/completions',
    api_key_encrypted TEXT, -- Encrypted at rest
    ai_enabled BOOLEAN DEFAULT true,
    status VARCHAR(20) DEFAULT 'unconfigured' CHECK (status IN ('active', 'error', 'unconfigured')),
    last_tested_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 13. Daily Learning Plan Table
CREATE TABLE IF NOT EXISTS daily_learning_plan (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    day_number INTEGER NOT NULL CHECK (day_number BETWEEN 1 AND 30),
    target_kanji_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
    review_kanji_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, day_number)
);

-- 14. Learning Analytics Table
CREATE TABLE IF NOT EXISTS learning_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    snapshot_date DATE DEFAULT CURRENT_DATE,
    total_learned INTEGER DEFAULT 0,
    total_in_progress INTEGER DEFAULT 0,
    total_needs_revision INTEGER DEFAULT 0,
    total_locked INTEGER DEFAULT 120,
    overall_accuracy NUMERIC(5, 2) DEFAULT 0,
    total_study_minutes INTEGER DEFAULT 0,
    UNIQUE(user_id, snapshot_date)
);

-- 15. Content Cache Table (For AI Explanations, Cultural Insights & Memory Mnemonics)
CREATE TABLE IF NOT EXISTS content_cache (
    id SERIAL PRIMARY KEY,
    cache_key VARCHAR(255) UNIQUE NOT NULL,
    kanji_id INTEGER REFERENCES kanji(id) ON DELETE CASCADE,
    content_type VARCHAR(50) NOT NULL,
    payload JSONB NOT NULL,
    version INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_content_cache_key ON content_cache(cache_key);

-- Row Level Security (RLS) policies
ALTER TABLE user_kanji_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcard_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_api_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_learning_plan ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_analytics ENABLE ROW LEVEL SECURITY;

-- Development & Single User Policies (Allows seamless sync via anon key)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public select kanji') THEN
    CREATE POLICY "Allow public select kanji" ON kanji FOR ALL USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow anon kanji_readings') THEN
    CREATE POLICY "Allow anon kanji_readings" ON kanji_readings FOR ALL USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow anon kanji_stroke_data') THEN
    CREATE POLICY "Allow anon kanji_stroke_data" ON kanji_stroke_data FOR ALL USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow anon kanji_vocabulary') THEN
    CREATE POLICY "Allow anon kanji_vocabulary" ON kanji_vocabulary FOR ALL USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow anon kanji_examples') THEN
    CREATE POLICY "Allow anon kanji_examples" ON kanji_examples FOR ALL USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow anon user_kanji_progress') THEN
    CREATE POLICY "Allow anon user_kanji_progress" ON user_kanji_progress FOR ALL USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow anon quiz_history') THEN
    CREATE POLICY "Allow anon quiz_history" ON quiz_history FOR ALL USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow anon study_sessions') THEN
    CREATE POLICY "Allow anon study_sessions" ON study_sessions FOR ALL USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow anon user_settings') THEN
    CREATE POLICY "Allow anon user_settings" ON user_settings FOR ALL USING (true);
  END IF;
END $$;

