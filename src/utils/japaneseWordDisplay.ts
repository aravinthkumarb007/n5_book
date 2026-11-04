/**
 * Japanese Vocabulary Writing System & Display Utility
 *
 * Ensures Japanese vocabulary is displayed accurately using its naturally
 * accepted writing system:
 * - Katakana: Words conventionally written in Katakana (loanwords, foreign terms).
 * - Hiragana: Native words normally written in Hiragana (これ, それ, だれ, はい, etc.).
 * - Kanji: Words conventionally written in Kanji (学生, 先生, 本, 車, 病院, etc.).
 * - Kanji with Hiragana (Okurigana): Verbs and adjectives (食べます, 行きます, 大きい, etc.).
 * - Mixed: Kanji + Katakana (消しゴム, ワゴン車, etc.).
 */

export type JapaneseWritingSystem =
  | 'katakana'
  | 'hiragana'
  | 'kanji'
  | 'kanji_with_okurigana'
  | 'mixed';

export interface JapaneseWordDisplay {
  /** The authentic standard Japanese spelling (e.g. アメリカ, 学生, 食べます, これ, 消しゴム) */
  standardSpelling: string;

  /**
   * Primary text to emphasize in bold:
   * - Katakana words: Katakana (e.g. アメリカ, コーヒー, ホテル)
   * - Kanji words: Hiragana reading (e.g. がくせい, たべます)
   * - Hiragana words: Hiragana (e.g. これ, はい)
   */
  primaryText: string;

  /**
   * Secondary text in lighter weight:
   * - Kanji words: The Kanji writing (e.g. 学生, 食べます)
   * - Katakana/Hiragana words with no Kanji: undefined
   */
  secondaryText?: string;

  /** Phonetic reading in Kana */
  reading: string;

  /** Romaji pronunciation */
  romaji: string;

  /** Classified writing system */
  writingSystem: JapaneseWritingSystem;

  /** Whether the word is conventionally written in Katakana */
  isKatakana: boolean;
}

const KANJI_REGEX = /[\u4E00-\u9FAF]/;
const KATAKANA_REGEX = /[\u30A0-\u30FF]/;
const HIRAGANA_REGEX = /[\u3040-\u309F]/;

/**
 * Clean markers like group numbers ("III", "II", "I"), bracketed options ("カレー[ライス]"), etc.
 */
export function cleanJapaneseWord(word: string): string {
  if (!word) return '';
  return word
    .replace(/\s+(III|II|I)$/g, '')
    .trim();
}

/**
 * Checks if a string contains any Kanji character.
 */
export function hasKanji(text: string): boolean {
  return KANJI_REGEX.test(text);
}

/**
 * Checks if a string contains any Katakana character (excluding leading dash/prolonged mark).
 */
export function hasKatakana(text: string): boolean {
  const cleaned = text.replace(/^[ー〜~-]/, '');
  return KATAKANA_REGEX.test(cleaned);
}

/**
 * Determines whether a vocabulary word is conventionally written in Katakana.
 */
export function isConventionallyKatakana(kanjiField?: string, hiraganaField?: string): boolean {
  const k = kanjiField ? cleanJapaneseWord(kanjiField).replace(/^[ー〜~-]/, '') : '';
  const h = hiraganaField ? cleanJapaneseWord(hiraganaField).replace(/^[ー〜~-]/, '') : '';

  // If kanji field has katakana and NO kanji, it's a Katakana word (e.g. アメリカ, テレビ, コピーします)
  if (k && KATAKANA_REGEX.test(k) && !KANJI_REGEX.test(k)) {
    return true;
  }

  // If hiragana field contains katakana and no kanji
  if (h && KATAKANA_REGEX.test(h) && !KANJI_REGEX.test(k)) {
    return true;
  }

  return false;
}

/**
 * Analyzes and formats a Japanese vocabulary item into standard display parts.
 */
export function getJapaneseWordDisplay(item: {
  kanji?: string;
  hiragana?: string;
  romaji?: string;
}): JapaneseWordDisplay {
  const rawKanji = item.kanji || '';
  const rawHiragana = item.hiragana || '';
  const romaji = item.romaji || '';

  const cleanedKanji = cleanJapaneseWord(rawKanji);
  const cleanedHiragana = cleanJapaneseWord(rawHiragana);

  const containsKanji = hasKanji(cleanedKanji);
  const containsKatakana = hasKatakana(cleanedKanji) || hasKatakana(cleanedHiragana);
  const kanjiHasHiragana = HIRAGANA_REGEX.test(cleanedKanji);

  // 1. Katakana Words (Loanwords & foreign-origin vocabulary)
  // e.g. アメリカ, テレビ, コーヒー, ホテル, サンドイッチ, コピーします, ハンサム[な]
  if (!containsKanji && containsKatakana) {
    // Standard spelling is the Katakana version
    const standardSpelling = cleanedKanji || cleanedHiragana;
    return {
      standardSpelling,
      primaryText: standardSpelling,
      secondaryText: undefined,
      reading: standardSpelling,
      romaji,
      writingSystem: 'katakana',
      isKatakana: true
    };
  }

  // 2. Mixed: Kanji + Katakana (e.g. 消しゴム, ワゴン車)
  if (containsKanji && containsKatakana) {
    const standardSpelling = cleanedKanji;
    // Reading uses the katakana for the loanword portion and hiragana for kanji
    const reading = cleanedHiragana || cleanedKanji;
    return {
      standardSpelling,
      primaryText: reading,
      secondaryText: standardSpelling !== reading ? standardSpelling : undefined,
      reading,
      romaji,
      writingSystem: 'mixed',
      isKatakana: false
    };
  }

  // 3. Kanji with Okurigana (Verbs, Adjectives) (e.g. 食べます, 飲みます, 行きます, 大きい)
  if (containsKanji && kanjiHasHiragana) {
    const standardSpelling = cleanedKanji;
    const reading = cleanedHiragana || cleanedKanji;
    return {
      standardSpelling,
      primaryText: reading,
      secondaryText: standardSpelling,
      reading,
      romaji,
      writingSystem: 'kanji_with_okurigana',
      isKatakana: false
    };
  }

  // 4. Pure Kanji Words (e.g. 学生, 先生, 本, 車, 病院)
  if (containsKanji && !kanjiHasHiragana) {
    const standardSpelling = cleanedKanji;
    const reading = cleanedHiragana || cleanedKanji;
    return {
      standardSpelling,
      primaryText: reading,
      secondaryText: standardSpelling,
      reading,
      romaji,
      writingSystem: 'kanji',
      isKatakana: false
    };
  }

  // 5. Pure Hiragana Words (e.g. これ, それ, あれ, だれ, どこ, はい, いいえ, ありがとう)
  const standardSpelling = cleanedKanji || cleanedHiragana;
  const isDistinctKanji = cleanedKanji && cleanedKanji !== cleanedHiragana && containsKanji;

  return {
    standardSpelling,
    primaryText: cleanedHiragana || cleanedKanji,
    secondaryText: isDistinctKanji ? cleanedKanji : undefined,
    reading: cleanedHiragana || cleanedKanji,
    romaji,
    writingSystem: 'hiragana',
    isKatakana: false
  };
}

/**
 * Segment for Furigana ruby display.
 * `ruby`: The base text (Kanji character(s) or Kana).
 * `rt`: The phonetic reading displayed above the Kanji (undefined for non-Kanji).
 */
export interface FuriganaSegment {
  ruby: string;
  rt?: string;
}

/**
 * Parses a Japanese word with its reading into segmented Furigana ruby units.
 * Aligns Furigana accurately over Kanji characters, preserving Kana affixes.
 *
 * Examples:
 * - "学生", "がくせい" -> [{ ruby: "学生", rt: "がくせい" }]
 * - "食べます", "たべます" -> [{ ruby: "食", rt: "た" }, { ruby: "べます" }]
 * - "お茶", "おちゃ" -> [{ ruby: "お" }, { ruby: "茶", rt: "ちゃ" }]
 * - "お母さん", "おかあさん" -> [{ ruby: "お" }, { ruby: "母", rt: "かあ" }, { ruby: "さん" }]
 * - "大きい", "おおきい" -> [{ ruby: "大", rt: "おお" }, { ruby: "きい" }]
 * - "アメリカ", "アメリカ" -> [{ ruby: "アメリカ" }]
 */
export function parseFurigana(kanjiText?: string, readingText?: string): FuriganaSegment[] {
  if (!kanjiText && !readingText) return [];
  if (!kanjiText) return [{ ruby: readingText || '' }];
  if (!readingText) return [{ ruby: kanjiText }];

  const cleanK = cleanJapaneseWord(kanjiText);
  const cleanR = cleanJapaneseWord(readingText);

  // If there are no Kanji characters, no furigana is needed
  if (!hasKanji(cleanK)) {
    return [{ ruby: cleanK }];
  }

  // Split kanjiText into alternating chunks of kanji and non-kanji
  const chunks: Array<{ isKanji: boolean; text: string }> = [];
  let currentIsKanji = hasKanji(cleanK[0]);
  let currentStr = cleanK[0];

  for (let i = 1; i < cleanK.length; i++) {
    const isK = hasKanji(cleanK[i]);
    if (isK === currentIsKanji) {
      currentStr += cleanK[i];
    } else {
      chunks.push({ isKanji: currentIsKanji, text: currentStr });
      currentIsKanji = isK;
      currentStr = cleanK[i];
    }
  }
  chunks.push({ isKanji: currentIsKanji, text: currentStr });

  // If there are no non-kanji chunks, the whole word is kanji (e.g. 学生, 先生, 病院)
  if (!chunks.some(c => !c.isKanji)) {
    return [{ ruby: cleanK, rt: cleanR }];
  }

  const result: FuriganaSegment[] = [];
  let readingRemaining = cleanR;

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    if (!chunk.isKanji) {
      result.push({ ruby: chunk.text });
      if (readingRemaining.startsWith(chunk.text)) {
        readingRemaining = readingRemaining.slice(chunk.text.length);
      }
    } else {
      // Find where the next non-kanji chunk appears in readingRemaining
      const nextNonKanji = chunks.slice(i + 1).find(c => !c.isKanji);
      if (nextNonKanji) {
        const nextIdx = readingRemaining.indexOf(nextNonKanji.text);
        if (nextIdx !== -1) {
          const rubyReading = readingRemaining.slice(0, nextIdx);
          result.push({ ruby: chunk.text, rt: rubyReading });
          readingRemaining = readingRemaining.slice(nextIdx);
        } else {
          result.push({ ruby: chunk.text, rt: readingRemaining });
          readingRemaining = '';
        }
      } else {
        result.push({ ruby: chunk.text, rt: readingRemaining });
        readingRemaining = '';
      }
    }
  }

  return result;
}

