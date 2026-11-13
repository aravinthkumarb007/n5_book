-- ====================================================================
-- MIGRATION: 2026-11-13 - Kanji Level Tests & AI Comprehensive Test Results
-- ====================================================================

CREATE TABLE IF NOT EXISTS kanji_level_test_results (
    id VARCHAR(64) PRIMARY KEY,
    user_id UUID NOT NULL,
    test_type VARCHAR(50) NOT NULL, -- 'level_hardcoded', 'level_ai', 'all_unlocked_ai'
    level INTEGER, -- 1 to 12, or NULL for all_unlocked_ai
    title VARCHAR(200) NOT NULL,
    score_percent NUMERIC(5, 2) NOT NULL,
    total_questions INTEGER NOT NULL,
    correct_count INTEGER NOT NULL,
    incorrect_count INTEGER NOT NULL,
    is_passed BOOLEAN NOT NULL DEFAULT false,
    generation_mode VARCHAR(50) NOT NULL, -- 'hardcoded', 'ai_groq', 'ai_gemini'
    kanji_ids_tested JSONB DEFAULT '[]'::jsonb,
    answers JSONB DEFAULT '[]'::jsonb,
    time_spent_seconds INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_kanji_test_user ON kanji_level_test_results(user_id);
CREATE INDEX IF NOT EXISTS idx_kanji_test_level ON kanji_level_test_results(level);
CREATE INDEX IF NOT EXISTS idx_kanji_test_date ON kanji_level_test_results(created_at DESC);

ALTER TABLE kanji_level_test_results ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow anon kanji_level_test_results') THEN
    CREATE POLICY "Allow anon kanji_level_test_results" ON kanji_level_test_results FOR ALL USING (true);
  END IF;
END $$;
