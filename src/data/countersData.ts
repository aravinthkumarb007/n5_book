import { 
  NumberItem, 
  CounterDefinition, 
  TimeItem, 
  MonthItem, 
  DateDayItem, 
  DurationItem 
} from '@/types/counters';

// ============================================================================
// Category A: Japanese Numbers (1 to 100, Hundreds, Thousands, Ten Thousands)
// ============================================================================

export const JAPANESE_NUMBERS: NumberItem[] = [
  // 1 to 10
  { value: 1, kanji: '一', hiragana: 'いち', romaji: 'ichi', english: 'One', category: '1_to_10' },
  { value: 2, kanji: '二', hiragana: 'に', romaji: 'ni', english: 'Two', category: '1_to_10' },
  { value: 3, kanji: '三', hiragana: 'さん', romaji: 'san', english: 'Three', category: '1_to_10' },
  { value: 4, kanji: '四', hiragana: 'よん / し', romaji: 'yon / shi', english: 'Four', category: '1_to_10', isIrregular: true, notes: 'Used as よん in general counting, し in April (しがつ) and 4 o\'clock (よじ).' },
  { value: 5, kanji: '五', hiragana: 'ご', romaji: 'go', english: 'Five', category: '1_to_10' },
  { value: 6, kanji: '六', hiragana: 'ろく', romaji: 'roku', english: 'Six', category: '1_to_10' },
  { value: 7, kanji: '七', hiragana: 'なな / しち', romaji: 'nana / shichi', english: 'Seven', category: '1_to_10', isIrregular: true, notes: 'なな is most common; しち used in July (しちがつ) and 7 o\'clock (しちじ).' },
  { value: 8, kanji: '八', hiragana: 'はち', romaji: 'hachi', english: 'Eight', category: '1_to_10' },
  { value: 9, kanji: '九', hiragana: 'きゅう / く', romaji: 'kyuu / ku', english: 'Nine', category: '1_to_10', isIrregular: true, notes: 'きゅう is common; く used in September (くがつ) and 9 o\'clock (くじ).' },
  { value: 10, kanji: '十', hiragana: 'じゅう', romaji: 'juu', english: 'Ten', category: '1_to_10' },

  // 11 to 20 & Key tens
  { value: 11, kanji: '十一', hiragana: 'じゅういち', romaji: 'juu-ichi', english: 'Eleven', category: '11_to_100' },
  { value: 12, kanji: '十二', hiragana: 'じゅうに', romaji: 'juu-ni', english: 'Twelve', category: '11_to_100' },
  { value: 14, kanji: '十四', hiragana: 'じゅうよん / じゅうし', romaji: 'juu-yon', english: 'Fourteen', category: '11_to_100' },
  { value: 17, kanji: '十七', hiragana: 'じゅうなな / じゅうしち', romaji: 'juu-nana', english: 'Seventeen', category: '11_to_100' },
  { value: 19, kanji: '十九', hiragana: 'じゅうきゅう / じゅうく', romaji: 'juu-kyuu', english: 'Nineteen', category: '11_to_100' },
  { value: 20, kanji: '二十', hiragana: 'にじゅう', romaji: 'ni-juu', english: 'Twenty', category: '11_to_100' },
  { value: 30, kanji: '三十', hiragana: 'さんじゅう', romaji: 'san-juu', english: 'Thirty', category: '11_to_100' },
  { value: 40, kanji: '四十', hiragana: 'よんじゅう', romaji: 'yon-juu', english: 'Forty', category: '11_to_100' },
  { value: 50, kanji: '五十', hiragana: 'ごじゅう', romaji: 'go-juu', english: 'Fifty', category: '11_to_100' },
  { value: 60, kanji: '六十', hiragana: 'ろくじゅう', romaji: 'roku-juu', english: 'Sixty', category: '11_to_100' },
  { value: 70, kanji: '七十', hiragana: 'ななじゅう', romaji: 'nana-juu', english: 'Seventy', category: '11_to_100' },
  { value: 80, kanji: '八十', hiragana: 'はちじゅう', romaji: 'hachi-juu', english: 'Eighty', category: '11_to_100' },
  { value: 90, kanji: '九十', hiragana: 'きゅうじゅう', romaji: 'kyuu-juu', english: 'Ninety', category: '11_to_100' },
  { value: 99, kanji: '九十九', hiragana: 'きゅうじゅうきゅう', romaji: 'kyuu-juu-kyuu', english: 'Ninety-nine', category: '11_to_100' },

  // Hundreds (百 ひゃく)
  { value: 100, kanji: '百', hiragana: 'ひゃく', romaji: 'hyaku', english: '100 (One hundred)', category: 'hundreds' },
  { value: 200, kanji: '二百', hiragana: 'にひゃく', romaji: 'ni-hyaku', english: '200', category: 'hundreds' },
  { value: 300, kanji: '三百', hiragana: 'さんびゃく', romaji: 'san-byaku', english: '300 (Sound change)', category: 'hundreds', isIrregular: true, notes: 'Sound voicing: ひゃく becomes びゃく after さん.' },
  { value: 400, kanji: '四百', hiragana: 'よんひゃく', romaji: 'yon-hyaku', english: '400', category: 'hundreds' },
  { value: 500, kanji: '五百', hiragana: 'ごひゃく', romaji: 'go-hyaku', english: '500', category: 'hundreds' },
  { value: 600, kanji: '六百', hiragana: 'ろっぴゃく', romaji: 'roppyaku', english: '600 (Sound change)', category: 'hundreds', isIrregular: true, notes: 'Double consonant: ろく + ひゃく becomes ろっぴゃく.' },
  { value: 700, kanji: '七百', hiragana: 'ななひゃく', romaji: 'nana-hyaku', english: '700', category: 'hundreds' },
  { value: 800, kanji: '八百', hiragana: 'はっぴゃく', romaji: 'happyaku', english: '800 (Sound change)', category: 'hundreds', isIrregular: true, notes: 'Double consonant: はち + ひゃく becomes はっぴゃく.' },
  { value: 900, kanji: '九百', hiragana: 'きゅうひゃく', romaji: 'kyuu-hyaku', english: '900', category: 'hundreds' },

  // Thousands (千 せん)
  { value: 1000, kanji: '千', hiragana: 'せん', romaji: 'sen', english: '1,000 (One thousand)', category: 'thousands' },
  { value: 2000, kanji: '二千', hiragana: 'にせん', romaji: 'ni-sen', english: '2,000', category: 'thousands' },
  { value: 3000, kanji: '三千', hiragana: 'さんぜん', romaji: 'san-zen', english: '3,000 (Sound change)', category: 'thousands', isIrregular: true, notes: 'Voicing: せん becomes ぜん after さん.' },
  { value: 4000, kanji: '四千', hiragana: 'よんせん', romaji: 'yon-sen', english: '4,000', category: 'thousands' },
  { value: 5000, kanji: '五千', hiragana: 'ごせん', romaji: 'go-sen', english: '5,000', category: 'thousands' },
  { value: 6000, kanji: '六千', hiragana: 'ろくせん', romaji: 'roku-sen', english: '6,000', category: 'thousands' },
  { value: 7000, kanji: '七千', hiragana: 'ななせん', romaji: 'nana-sen', english: '7,000', category: 'thousands' },
  { value: 8000, kanji: '八千', hiragana: 'はっせん', romaji: 'hassen', english: '8,000 (Sound change)', category: 'thousands', isIrregular: true, notes: 'Double consonant: はち + せん becomes はっせん.' },
  { value: 9000, kanji: '九千', hiragana: 'きゅうせん', romaji: 'kyuu-sen', english: '9,000', category: 'thousands' },

  // Ten Thousands (万 まん - Japanese 4-digit grouping unit)
  { value: 10000, kanji: '一万', hiragana: 'いちまん', romaji: 'ichi-man', english: '10,000 (Ten thousand)', category: 'ten_thousands', notes: 'Japanese numbers count in units of 10,000 (万) rather than 1,000.' },
  { value: 50000, kanji: '五万', hiragana: 'ごまん', romaji: 'go-man', english: '50,000', category: 'ten_thousands' },
  { value: 100000, kanji: '十万', hiragana: 'じゅうまん', romaji: 'juu-man', english: '100,000 (One hundred thousand)', category: 'ten_thousands' },
  { value: 1000000, kanji: '百万', hiragana: 'ひゃくまん', romaji: 'hyaku-man', english: '1,000,000 (One million)', category: 'ten_thousands' },
  { value: 10000000, kanji: '千万', hiragana: 'せんまん / いっせんまん', romaji: 'sen-man', english: '10,000,000 (Ten million)', category: 'ten_thousands' },
  { value: 100000000, kanji: '一億', hiragana: 'いちおく', romaji: 'ichi-oku', english: '100,000,000 (One hundred million)', category: 'special', notes: 'Next 4-digit unit is 億 (おく, 100,000,000).' }
];

// ============================================================================
// Category B: 14 Core Japanese Counters + Native System
// ============================================================================

export const JAPANESE_COUNTERS: CounterDefinition[] = [
  // 1. 人 (にん) - People
  {
    id: 'nin',
    kanji: '人',
    hiragana: 'にん',
    romaji: 'nin',
    english: 'People',
    targetDescription: 'Counting human beings (individuals, friends, students, colleagues).',
    soundRuleNotes: '1 and 2 people use completely native Japanese irregular readings (ひとり and ふたり). 4 people is よにん (NEVER しにん).',
    items: [
      { count: 1, kanji: '一人', hiragana: 'ひとり', romaji: 'hitori', isIrregular: true, soundChangeNote: 'Special native reading' },
      { count: 2, kanji: '二人', hiragana: 'ふたり', romaji: 'futari', isIrregular: true, soundChangeNote: 'Special native reading' },
      { count: 3, kanji: '三人', hiragana: 'さんにん', romaji: 'san-nin' },
      { count: 4, kanji: '四人', hiragana: 'よにん', romaji: 'yonin', isIrregular: true, soundChangeNote: 'Strictly よにん (not よんにん or しにん)' },
      { count: 5, kanji: '五人', hiragana: 'ごにん', romaji: 'go-nin' },
      { count: 6, kanji: '六人', hiragana: 'ろくにん', romaji: 'roku-nin' },
      { count: 7, kanji: '七人', hiragana: 'しちにん / ななにん', romaji: 'shichi-nin / nana-nin' },
      { count: 8, kanji: '八人', hiragana: 'はちにん', romaji: 'hachi-nin' },
      { count: 9, kanji: '九人', hiragana: 'きゅうにん / くにん', romaji: 'kyuu-nin' },
      { count: 10, kanji: '十人', hiragana: 'じゅうにん', romaji: 'juu-nin' }
    ],
    exampleSentences: [
      { japanese: '部屋[へや]に 学生[がくせい]が 三人[さんにん] います。', hiragana: 'へやに がくせいが さんにん います。', english: 'There are three students in the room.' },
      { japanese: '昨日[きのう]、一人[ひとり]で 映画[えいが]を 見[み]ました。', hiragana: 'きのう、ひとりで えいがを みました。', english: 'Yesterday, I watched a movie alone (as one person).' }
    ]
  },

  // 2. 個 (こ) - Small, compact objects
  {
    id: 'ko',
    kanji: '個',
    hiragana: 'こ',
    romaji: 'ko',
    english: 'Small / Compact Objects',
    targetDescription: 'Counting small, round or 3D objects like apples, eggs, erasers, candies, dice, boxes.',
    soundRuleNotes: '1, 6, 8, and 10 undergo geminate double-consonant changes (っ).',
    items: [
      { count: 1, kanji: '一個', hiragana: 'いっこ', romaji: 'ikko', isIrregular: true, soundChangeNote: 'Double consonant (っ)' },
      { count: 2, kanji: '二個', hiragana: 'にこ', romaji: 'ni-ko' },
      { count: 3, kanji: '三個', hiragana: 'さんこ', romaji: 'san-ko' },
      { count: 4, kanji: '四個', hiragana: 'よんこ', romaji: 'yon-ko' },
      { count: 5, kanji: '五個', hiragana: 'ごこ', romaji: 'go-ko' },
      { count: 6, kanji: '六個', hiragana: 'ろっこ', romaji: 'rokko', isIrregular: true, soundChangeNote: 'Double consonant (っ)' },
      { count: 7, kanji: '七個', hiragana: 'ななこ', romaji: 'nana-ko' },
      { count: 8, kanji: '八個', hiragana: 'はっこ', romaji: 'hakko', isIrregular: true, soundChangeNote: 'Double consonant (っ)' },
      { count: 9, kanji: '九個', hiragana: 'きゅうこ', romaji: 'kyuu-ko' },
      { count: 10, kanji: '十個', hiragana: 'じゅっこ / じっこ', romaji: 'jukko', isIrregular: true, soundChangeNote: 'Double consonant (っ)' }
    ],
    exampleSentences: [
      { japanese: 'りんごを 六個[ろっこ] 買[か]いました。', hiragana: 'りんごを ろっこ かいました。', english: 'I bought six apples.' },
      { japanese: '消[け]しゴムが 一個[いっこ] あります。', hiragana: 'けしごむが いっこ あります。', english: 'There is one eraser.' }
    ]
  },

  // 3. 本 (ほん / ぽん / ぼん) - Cylindrical & Long Objects
  {
    id: 'hon',
    kanji: '本',
    hiragana: 'ほん',
    romaji: 'hon',
    english: 'Long, Cylindrical Objects',
    targetDescription: 'Counting bottles, pens, umbrellas, trees, roads, rivers, bananas, train tracks, telephone calls, movies.',
    soundRuleNotes: 'Complex euphonic sound changes: 1, 6, 8, 10 take ぽん (p); 3 takes ぼん (b); 2, 4, 5, 7, 9 take ほん (h).',
    items: [
      { count: 1, kanji: '一本', hiragana: 'いっぽん', romaji: 'ippon', isIrregular: true, soundChangeNote: 'Takes ぽん (p)' },
      { count: 2, kanji: '二本', hiragana: 'にほん', romaji: 'ni-hon' },
      { count: 3, kanji: '三本', hiragana: 'さんぼん', romaji: 'san-bon', isIrregular: true, soundChangeNote: 'Takes ぼん (b)' },
      { count: 4, kanji: '四本', hiragana: 'よんほん', romaji: 'yon-hon' },
      { count: 5, kanji: '五本', hiragana: 'ごほん', romaji: 'go-hon' },
      { count: 6, kanji: '六本', hiragana: 'ろっぽん', romaji: 'roppon', isIrregular: true, soundChangeNote: 'Takes ぽん (p)' },
      { count: 7, kanji: '七本', hiragana: 'ななほん', romaji: 'nana-hon' },
      { count: 8, kanji: '八本', hiragana: 'はっぽん', romaji: 'happon', isIrregular: true, soundChangeNote: 'Takes ぽん (p)' },
      { count: 9, kanji: '九本', hiragana: 'きゅうほん', romaji: 'kyuu-hon' },
      { count: 10, kanji: '十本', hiragana: 'じゅっぽん / じっぽん', romaji: 'juppon', isIrregular: true, soundChangeNote: 'Takes ぽん (p)' }
    ],
    exampleSentences: [
      { japanese: 'ペンが 三本[さんぼん] あります。', hiragana: 'ぺんが さんぼん あります。', english: 'There are three pens.' },
      { japanese: '水[みず]を 一本[いっぽん] ください。', hiragana: 'みずを いっぽん ください。', english: 'Please give me one bottle of water.' }
    ]
  },

  // 4. 枚 (まい) - Thin, flat objects
  {
    id: 'mai',
    kanji: '枚',
    hiragana: 'まい',
    romaji: 'mai',
    english: 'Flat, Thin Objects',
    targetDescription: 'Counting paper, tickets, photos, plates, shirts, towels, stamps, credit cards.',
    soundRuleNotes: 'Completely regular! No euphonic sound changes from 1 to 10.',
    items: [
      { count: 1, kanji: '一枚', hiragana: 'いちまい', romaji: 'ichi-mai' },
      { count: 2, kanji: '二枚', hiragana: 'にまい', romaji: 'ni-mai' },
      { count: 3, kanji: '三枚', hiragana: 'さんまい', romaji: 'san-mai' },
      { count: 4, kanji: '四枚', hiragana: 'よんまい', romaji: 'yon-mai' },
      { count: 5, kanji: '五枚', hiragana: 'ごまい', romaji: 'go-mai' },
      { count: 6, kanji: '六枚', hiragana: 'ろくまい', romaji: 'roku-mai' },
      { count: 7, kanji: '七枚', hiragana: 'ななまい', romaji: 'nana-mai' },
      { count: 8, kanji: '八枚', hiragana: 'はちまい', romaji: 'hachi-mai' },
      { count: 9, kanji: '九枚', hiragana: 'きゅうまい', romaji: 'kyuu-mai' },
      { count: 10, kanji: '十枚', hiragana: 'じゅうまい', romaji: 'juu-mai' }
    ],
    exampleSentences: [
      { japanese: '切符[きっぷ]を 二枚[にまい] 買[か]いました。', hiragana: 'きっぷを にまい かいました。', english: 'I bought two tickets.' },
      { japanese: '紙[かみ]が 五枚[ごまい] あります。', hiragana: 'かみが ごまい あります。', english: 'There are five sheets of paper.' }
    ]
  },

  // 5. 匹 (ひき / ぴき / びき) - Small Animals
  {
    id: 'hiki',
    kanji: '匹',
    hiragana: 'ひき',
    romaji: 'hiki',
    english: 'Small Animals & Pets',
    targetDescription: 'Counting dogs, cats, fish, insects, mice, frogs.',
    soundRuleNotes: 'Similar to 本: 1, 6, 8, 10 become ぴき (p); 3 becomes びき (b); others stay ひき (h).',
    items: [
      { count: 1, kanji: '一匹', hiragana: 'いっぴき', romaji: 'ippiki', isIrregular: true, soundChangeNote: 'Takes ぴき (p)' },
      { count: 2, kanji: '二匹', hiragana: 'にひき', romaji: 'ni-hiki' },
      { count: 3, kanji: '三匹', hiragana: 'さんびき', romaji: 'san-biki', isIrregular: true, soundChangeNote: 'Takes びき (b)' },
      { count: 4, kanji: '四匹', hiragana: 'よんひき', romaji: 'yon-hiki' },
      { count: 5, kanji: '五匹', hiragana: 'ごひき', romaji: 'go-hiki' },
      { count: 6, kanji: '六匹', hiragana: 'ろっぴき', romaji: 'roppiki', isIrregular: true, soundChangeNote: 'Takes ぴき (p)' },
      { count: 7, kanji: '七匹', hiragana: 'ななひき', romaji: 'nana-hiki' },
      { count: 8, kanji: '八匹', hiragana: 'はっぴき', romaji: 'happiki', isIrregular: true, soundChangeNote: 'Takes ぴき (p)' },
      { count: 9, kanji: '九匹', hiragana: 'きゅうひき', romaji: 'kyuu-hiki' },
      { count: 10, kanji: '十匹', hiragana: 'じゅっぴき / じっぴき', romaji: 'juppiki', isIrregular: true, soundChangeNote: 'Takes ぴき (p)' }
    ],
    exampleSentences: [
      { japanese: '猫[ねこ]が 一匹[いっぴき] と 犬[いぬ]が 二匹[にひき] います。', hiragana: 'ねこが いっぴきと いぬが にひき います。', english: 'There is one cat and two dogs.' },
      { japanese: '池[いけ]に 魚[さかな]が 三匹[さんびき] 泳[およ]いで います。', hiragana: 'いけに さかなが さんびき およいで います。', english: 'Three fish are swimming in the pond.' }
    ]
  },

  // 6. 冊 (さつ) - Bound Volumes & Books
  {
    id: 'satsu',
    kanji: '冊',
    hiragana: 'さつ',
    romaji: 'satsu',
    english: 'Books & Bound Volumes',
    targetDescription: 'Counting books, magazines, dictionaries, notebooks, albums.',
    soundRuleNotes: '1, 8, and 10 change to double consonant (っ).',
    items: [
      { count: 1, kanji: '一冊', hiragana: 'いっさつ', romaji: 'issatsu', isIrregular: true, soundChangeNote: 'Double consonant (っ)' },
      { count: 2, kanji: '二冊', hiragana: 'にさつ', romaji: 'ni-satsu' },
      { count: 3, kanji: '三冊', hiragana: 'さんさつ', romaji: 'san-satsu' },
      { count: 4, kanji: '四冊', hiragana: 'よんさつ', romaji: 'yon-satsu' },
      { count: 5, kanji: '五冊', hiragana: 'ごさつ', romaji: 'go-satsu' },
      { count: 6, kanji: '六冊', hiragana: 'ろくさつ', romaji: 'roku-satsu' },
      { count: 7, kanji: '七冊', hiragana: 'ななさつ', romaji: 'nana-satsu' },
      { count: 8, kanji: '八冊', hiragana: 'はっさつ', romaji: 'hassatsu', isIrregular: true, soundChangeNote: 'Double consonant (っ)' },
      { count: 9, kanji: '九冊', hiragana: 'きゅうさつ', romaji: 'kyuu-satsu' },
      { count: 10, kanji: '十冊', hiragana: 'じゅっさつ / じっさつ', romaji: 'jussatsu', isIrregular: true, soundChangeNote: 'Double consonant (っ)' }
    ],
    exampleSentences: [
      { japanese: '図書館[としょかん]で 本[ほん]を 三冊[さんさつ] 借[か]りました。', hiragana: 'としょかんで ほんを さんさつ かりました。', english: 'I borrowed three books from the library.' }
    ]
  },

  // 7. 台 (だい) - Machines, Vehicles & Electronics
  {
    id: 'dai',
    kanji: '台',
    hiragana: 'だい',
    romaji: 'dai',
    english: 'Machines & Vehicles',
    targetDescription: 'Counting cars, bicycles, computers, televisions, cameras, refrigerators, washing machines.',
    soundRuleNotes: 'Completely regular counting without sound changes.',
    items: [
      { count: 1, kanji: '一台', hiragana: 'いちだい', romaji: 'ichi-dai' },
      { count: 2, kanji: '二台', hiragana: 'にだい', romaji: 'ni-dai' },
      { count: 3, kanji: '三台', hiragana: 'さんだい', romaji: 'san-dai' },
      { count: 4, kanji: '四台', hiragana: 'よんだい', romaji: 'yon-dai' },
      { count: 5, kanji: '五台', hiragana: 'ごだい', romaji: 'go-dai' },
      { count: 6, kanji: '六台', hiragana: 'ろくだい', romaji: 'roku-dai' },
      { count: 7, kanji: '七台', hiragana: 'ななだい', romaji: 'nana-dai' },
      { count: 8, kanji: '八台', hiragana: 'はちだい', romaji: 'hachi-dai' },
      { count: 9, kanji: '九台', hiragana: 'きゅうだい', romaji: 'kyuu-dai' },
      { count: 10, kanji: '十台', hiragana: 'じゅうだい', romaji: 'juu-dai' }
    ],
    exampleSentences: [
      { japanese: '車[くるま]が 一台[いちだい] あります。', hiragana: 'くるまが いちだい あります。', english: 'There is one car.' },
      { japanese: '会社[かいしゃ]に パソコンが 十台[じゅうだい] あります。', hiragana: 'かいしゃに ぱそこんが じゅうだい あります。', english: 'There are ten computers in the company.' }
    ]
  },

  // 8. 回 (かい) - Occurrences, Frequency & Times
  {
    id: 'kai_frequency',
    kanji: '回',
    hiragana: 'かい',
    romaji: 'kai',
    english: 'Occurrences & Times',
    targetDescription: 'Counting number of times an action occurs (once, twice, 3 times).',
    soundRuleNotes: '1, 6, 8, 10 become いっかい, ろっかい, はっかい, じゅっかい.',
    items: [
      { count: 1, kanji: '一回', hiragana: 'いっかい', romaji: 'ikkai', isIrregular: true, soundChangeNote: 'Double consonant (っ)' },
      { count: 2, kanji: '二回', hiragana: 'にかい', romaji: 'ni-kai' },
      { count: 3, kanji: '三回', hiragana: 'さんかい', romaji: 'san-kai' },
      { count: 4, kanji: '四回', hiragana: 'よんかい', romaji: 'yon-kai' },
      { count: 5, kanji: '五回', hiragana: 'ごかい', romaji: 'go-kai' },
      { count: 6, kanji: '六回', hiragana: 'ろっかい', romaji: 'rokkai', isIrregular: true, soundChangeNote: 'Double consonant (っ)' },
      { count: 7, kanji: '七回', hiragana: 'ななかい', romaji: 'nana-kai' },
      { count: 8, kanji: '八回', hiragana: 'はっかい', romaji: 'hakkai', isIrregular: true, soundChangeNote: 'Double consonant (っ)' },
      { count: 9, kanji: '九回', hiragana: 'きゅうかい', romaji: 'kyuu-kai' },
      { count: 10, kanji: '十回', hiragana: 'じゅっかい / じっかい', romaji: 'jukkai', isIrregular: true, soundChangeNote: 'Double consonant (っ)' }
    ],
    exampleSentences: [
      { japanese: '週[しゅう]に 二回[にかい] 日本語[にほんご]を 勉強[べんきょう]します。', hiragana: 'しゅうに にかい にほんごを べんきょうします。', english: 'I study Japanese twice a week.' }
    ]
  },

  // 9. 階 (かい / がい) - Floors of a building
  {
    id: 'kai_floors',
    kanji: '階',
    hiragana: 'かい',
    romaji: 'kai',
    english: 'Building Floors (Stories)',
    targetDescription: 'Counting storeys or levels in a building (1st floor, 2nd floor, 3rd floor).',
    soundRuleNotes: '1, 6, 8, 10 take double consonant; 3rd floor is famously さんがい (voiced がい) or さんかい.',
    items: [
      { count: 1, kanji: '一階', hiragana: 'いっかい', romaji: 'ikkai', isIrregular: true, soundChangeNote: '1st floor / Ground floor' },
      { count: 2, kanji: '二階', hiragana: 'にかい', romaji: 'ni-kai' },
      { count: 3, kanji: '三階', hiragana: 'さんがい / さんかい', romaji: 'san-gai', isIrregular: true, soundChangeNote: 'Often voiced as がい' },
      { count: 4, kanji: '四階', hiragana: 'よんかい', romaji: 'yon-kai' },
      { count: 5, kanji: '五階', hiragana: 'ごかい', romaji: 'go-kai' },
      { count: 6, kanji: '六階', hiragana: 'ろっかい', romaji: 'rokkai', isIrregular: true },
      { count: 7, kanji: '七階', hiragana: 'ななかい', romaji: 'nana-kai' },
      { count: 8, kanji: '八階', hiragana: 'はっかい', romaji: 'hakkai', isIrregular: true },
      { count: 9, kanji: '九階', hiragana: 'きゅうかい', romaji: 'kyuu-kai' },
      { count: 10, kanji: '十階', hiragana: 'じゅっかい', romaji: 'jukkai', isIrregular: true }
    ],
    exampleSentences: [
      { japanese: '事務所[じむしょ]は 三階[さんがい]に あります。', hiragana: 'じむしょは さんがいに あります。', english: 'The office is on the third floor.' }
    ]
  },

  // 10. 杯 (はい / ぱい / ばい) - Cups and Glasses of Drink
  {
    id: 'hai',
    kanji: '杯',
    hiragana: 'はい',
    romaji: 'hai',
    english: 'Cups, Bowls & Glasses',
    targetDescription: 'Counting cups of coffee, glasses of water, bowls of ramen/rice.',
    soundRuleNotes: 'Takes ぱい for 1, 6, 8, 10; takes ばい for 3; others take はい.',
    items: [
      { count: 1, kanji: '一杯', hiragana: 'いっぱい', romaji: 'ippai', isIrregular: true, soundChangeNote: 'Takes ぱい (p)' },
      { count: 2, kanji: '二杯', hiragana: 'にはい', romaji: 'ni-hai' },
      { count: 3, kanji: '三杯', hiragana: 'さんばい', romaji: 'san-bai', isIrregular: true, soundChangeNote: 'Takes ばい (b)' },
      { count: 4, kanji: '四杯', hiragana: 'よんはい', romaji: 'yon-hai' },
      { count: 5, kanji: '五杯', hiragana: 'ごはい', romaji: 'go-hai' },
      { count: 6, kanji: '六杯', hiragana: 'ろっぱい', romaji: 'roppai', isIrregular: true, soundChangeNote: 'Takes ぱい (p)' },
      { count: 7, kanji: '七杯', hiragana: 'ななはい', romaji: 'nana-hai' },
      { count: 8, kanji: '八杯', hiragana: 'はっぱい', romaji: 'happai', isIrregular: true, soundChangeNote: 'Takes ぱい (p)' },
      { count: 9, kanji: '九杯', hiragana: 'きゅうはい', romaji: 'kyuu-hai' },
      { count: 10, kanji: '十杯', hiragana: 'じゅっぱい', romaji: 'juppai', isIrregular: true, soundChangeNote: 'Takes ぱい (p)' }
    ],
    exampleSentences: [
      { japanese: 'コーヒーを 二杯[にはい] 飲[の]みました。', hiragana: 'こーひーを にはい のみました。', english: 'I drank two cups of coffee.' }
    ]
  },

  // 11. 歳 (さい) - Age in Years
  {
    id: 'sai',
    kanji: '歳 / 才',
    hiragana: 'さい',
    romaji: 'sai',
    english: 'Age (Years Old)',
    targetDescription: 'Counting people\'s age.',
    soundRuleNotes: '1歳 is いっさい, 8歳 is はっさい, 10歳 is じゅっさい. Crucial: 20 years old is called はたち (special reading).',
    items: [
      { count: 1, kanji: '一歳', hiragana: 'いっさい', romaji: 'issai', isIrregular: true },
      { count: 2, kanji: '二歳', hiragana: 'にさい', romaji: 'ni-sai' },
      { count: 3, kanji: '三歳', hiragana: 'さんさい', romaji: 'san-sai' },
      { count: 4, kanji: '四歳', hiragana: 'よんさい', romaji: 'yon-sai' },
      { count: 5, kanji: '五歳', hiragana: 'ごさい', romaji: 'go-sai' },
      { count: 6, kanji: '六歳', hiragana: 'ろくさい', romaji: 'roku-sai' },
      { count: 7, kanji: '七歳', hiragana: 'ななさい', romaji: 'nana-sai' },
      { count: 8, kanji: '八歳', hiragana: 'はっさい', romaji: 'hassai', isIrregular: true },
      { count: 9, kanji: '九歳', hiragana: 'きゅうさい', romaji: 'kyuu-sai' },
      { count: 10, kanji: '十歳', hiragana: 'じゅっさい', romaji: 'jussai', isIrregular: true },
      { count: 20, kanji: '二十歳', hiragana: 'はたち / にじゅっさい', romaji: 'hatachi', isIrregular: true, soundChangeNote: 'Classic irregular Japanese age' }
    ],
    exampleSentences: [
      { japanese: '田中[たなか]さんは 二十歳[はたち] です。', hiragana: 'たなかさんは はたち です。', english: 'Tanaka-san is 20 years old.' }
    ]
  },

  // 12. 着 (ちゃく) - Suits, Jackets & Outfits
  {
    id: 'chaku',
    kanji: '着',
    hiragana: 'ちゃく',
    romaji: 'chaku',
    english: 'Clothing & Suits',
    targetDescription: 'Counting suits, coats, dresses, jackets, kimonos.',
    soundRuleNotes: '1, 8, 10 change with double consonant (いっちゃく, はっちゃく, じゅっちゃく).',
    items: [
      { count: 1, kanji: '一着', hiragana: 'いっちゃく', romaji: 'icchaku', isIrregular: true },
      { count: 2, kanji: '二着', hiragana: 'にちゃく', romaji: 'ni-chaku' },
      { count: 3, kanji: '三着', hiragana: 'さんちゃく', romaji: 'san-chaku' },
      { count: 4, kanji: '四着', hiragana: 'よんちゃく', romaji: 'yon-chaku' },
      { count: 5, kanji: '五着', hiragana: 'ごちゃく', romaji: 'go-chaku' },
      { count: 6, kanji: '六着', hiragana: 'ろくちゃく', romaji: 'roku-chaku' },
      { count: 7, kanji: '七着', hiragana: 'ななちゃく', romaji: 'nana-chaku' },
      { count: 8, kanji: '八着', hiragana: 'はっちゃく', romaji: 'hacchaku', isIrregular: true },
      { count: 9, kanji: '九着', hiragana: 'きゅうちゃく', romaji: 'kyuu-chaku' },
      { count: 10, kanji: '十着', hiragana: 'じゅっちゃく', romaji: 'jucchaku', isIrregular: true }
    ],
    exampleSentences: [
      { japanese: '新[あたら]しい スーツを 一着[いっちゃく] 買[か]いました。', hiragana: 'あたらしい すーつを いっちゃく かいました。', english: 'I bought one new suit.' }
    ]
  },

  // 13. 足 (そく / ぞく) - Pairs of Footwear
  {
    id: 'soku',
    kanji: '足',
    hiragana: 'そく',
    romaji: 'soku',
    english: 'Pairs of Footwear & Socks',
    targetDescription: 'Counting shoes, boots, socks, slippers, sandals.',
    soundRuleNotes: '1, 8, 10 take double consonant; 3 pairs is usually さんぞく (voiced).',
    items: [
      { count: 1, kanji: '一足', hiragana: 'いっそく', romaji: 'issoku', isIrregular: true },
      { count: 2, kanji: '二足', hiragana: 'にそく', romaji: 'ni-soku' },
      { count: 3, kanji: '三足', hiragana: 'さんぞく / さんそく', romaji: 'san-zoku', isIrregular: true, soundChangeNote: 'Voiced as ぞく' },
      { count: 4, kanji: '四足', hiragana: 'よんそく', romaji: 'yon-soku' },
      { count: 5, kanji: '五足', hiragana: 'ごそく', romaji: 'go-soku' },
      { count: 6, kanji: '六足', hiragana: 'ろくそく', romaji: 'roku-soku' },
      { count: 7, kanji: '七足', hiragana: 'ななそく', romaji: 'nana-soku' },
      { count: 8, kanji: '八足', hiragana: 'はっそく', romaji: 'hassoku', isIrregular: true },
      { count: 9, kanji: '九足', hiragana: 'きゅうそく', romaji: 'kyuu-soku' },
      { count: 10, kanji: '十足', hiragana: 'じゅっそく', romaji: 'jussoku', isIrregular: true }
    ],
    exampleSentences: [
      { japanese: '靴[くつ]が 二足[にそく] あります。', hiragana: 'くつが にそく あります。', english: 'There are two pairs of shoes.' }
    ]
  },

  // 14. 羽 (わ / ば) - Birds & Rabbits
  {
    id: 'wa',
    kanji: '羽',
    hiragana: 'わ',
    romaji: 'wa',
    english: 'Birds & Rabbits',
    targetDescription: 'Counting winged creatures (birds, chickens) and traditionally rabbits.',
    soundRuleNotes: 'Generally regular (いちわ, にわ), 3 is sometimes said as さんば.',
    items: [
      { count: 1, kanji: '一羽', hiragana: 'いちわ', romaji: 'ichi-wa' },
      { count: 2, kanji: '二羽', hiragana: 'にわ', romaji: 'ni-wa' },
      { count: 3, kanji: '三羽', hiragana: 'さんわ / さんば', romaji: 'san-wa / san-ba', isIrregular: true },
      { count: 4, kanji: '四羽', hiragana: 'よんわ', romaji: 'yon-wa' },
      { count: 5, kanji: '五羽', hiragana: 'ごわ', romaji: 'go-wa' },
      { count: 6, kanji: '六羽', hiragana: 'ろくわ / ろっぱ', romaji: 'roku-wa' },
      { count: 7, kanji: '七羽', hiragana: 'ななわ / しちわ', romaji: 'nana-wa' },
      { count: 8, kanji: '八羽', hiragana: 'はちわ / はっぱ', romaji: 'hachi-wa' },
      { count: 9, kanji: '九羽', hiragana: 'きゅうわ', romaji: 'kyuu-wa' },
      { count: 10, kanji: '十羽', hiragana: 'じゅうわ / じっぱ', romaji: 'juu-wa' }
    ],
    exampleSentences: [
      { japanese: '公園[こうえん]に 鳥[とり]が 四羽[よんわ] います。', hiragana: 'こうえんに とりが よんわ います。', english: 'There are four birds in the park.' }
    ]
  },

  // General Native Japanese Counter (つ - tsu)
  {
    id: 'tsu',
    kanji: 'つ (一つ〜十)',
    hiragana: 'つ',
    romaji: 'tsu',
    english: 'General Objects (Native Japanese System)',
    targetDescription: 'Universal fallback counter for any inanimate object (orders in restaurant, ideas, items). Works from 1 to 10.',
    soundRuleNotes: '10 has NO つ suffix (とお). Beyond 10, standard Arabic numbers with 個 (こ) or direct numbers are used.',
    items: [
      { count: 1, kanji: '一つ', hiragana: 'ひとつ', romaji: 'hitotsu', isIrregular: true },
      { count: 2, kanji: '二つ', hiragana: 'ふたつ', romaji: 'futatsu', isIrregular: true },
      { count: 3, kanji: '三つ', hiragana: 'みっつ', romaji: 'mittsu', isIrregular: true },
      { count: 4, kanji: '四つ', hiragana: 'よっつ', romaji: 'yottsu', isIrregular: true },
      { count: 5, kanji: '五つ', hiragana: 'いつつ', romaji: 'itsutsu', isIrregular: true },
      { count: 6, kanji: '六つ', hiragana: 'むっつ', romaji: 'muttsu', isIrregular: true },
      { count: 7, kanji: '七つ', hiragana: 'ななつ', romaji: 'nanatsu', isIrregular: true },
      { count: 8, kanji: '八つ', hiragana: 'やっつ', romaji: 'yattsu', isIrregular: true },
      { count: 9, kanji: '九つ', hiragana: 'ここのつ', romaji: 'kokonotsu', isIrregular: true },
      { count: 10, kanji: '十', hiragana: 'とお', romaji: 'too', isIrregular: true, soundChangeNote: 'Does not end with つ!' }
    ],
    exampleSentences: [
      { japanese: 'これを 二つ[ふたつ] ください。', hiragana: 'これを ふたつ ください。', english: 'Please give me two of these.' },
      { japanese: '質問[しつもん]が 一つ[ひとつ] あります。', hiragana: 'しつもんが ひとつ あります。', english: 'I have one question.' }
    ]
  }
];

// ============================================================================
// Category C: Japanese Time (Hours, Minutes, Seconds, AM/PM, Phrases)
// ============================================================================

export const JAPANESE_HOURS: TimeItem[] = [
  { type: 'hour', kanji: '一時', hiragana: 'いちじ', romaji: 'ichi-ji', english: '1 o\'clock' },
  { type: 'hour', kanji: '二時', hiragana: 'にじ', romaji: 'ni-ji', english: '2 o\'clock' },
  { type: 'hour', kanji: '三時', hiragana: 'さんじ', romaji: 'san-ji', english: '3 o\'clock' },
  { type: 'hour', kanji: '四時', hiragana: 'よじ', romaji: 'yo-ji', english: '4 o\'clock', isIrregular: true, notes: 'Strictly よじ (NEVER よんじ or しじ).' },
  { type: 'hour', kanji: '五時', hiragana: 'ごじ', romaji: 'go-ji', english: '5 o\'clock' },
  { type: 'hour', kanji: '六時', hiragana: 'ろくじ', romaji: 'roku-ji', english: '6 o\'clock' },
  { type: 'hour', kanji: '七時', hiragana: 'しちじ / ななじ', romaji: 'shichi-ji', english: '7 o\'clock', isIrregular: true, notes: 'Standard is しちじ.' },
  { type: 'hour', kanji: '八時', hiragana: 'はちじ', romaji: 'hachi-ji', english: '8 o\'clock' },
  { type: 'hour', kanji: '九時', hiragana: 'くじ', romaji: 'ku-ji', english: '9 o\'clock', isIrregular: true, notes: 'Strictly くじ (NEVER きゅうじ).' },
  { type: 'hour', kanji: '十時', hiragana: 'じゅうじ', romaji: 'juu-ji', english: '10 o\'clock' },
  { type: 'hour', kanji: '十一時', hiragana: 'じゅういちじ', romaji: 'juu-ichi-ji', english: '11 o\'clock' },
  { type: 'hour', kanji: '十二時', hiragana: 'じゅうにじ', romaji: 'juu-ni-ji', english: '12 o\'clock' }
];

export const JAPANESE_MINUTES: TimeItem[] = [
  { type: 'minute', kanji: '一分', hiragana: 'いっぷん', romaji: 'ippun', english: '1 minute', isIrregular: true },
  { type: 'minute', kanji: '二分', hiragana: 'にふん', romaji: 'ni-fun', english: '2 minutes' },
  { type: 'minute', kanji: '三分', hiragana: 'さんぷん', romaji: 'san-pun', english: '3 minutes', isIrregular: true },
  { type: 'minute', kanji: '四分', hiragana: 'よんぷん', romaji: 'yon-pun', english: '4 minutes', isIrregular: true },
  { type: 'minute', kanji: '五分', hiragana: 'ごふん', romaji: 'go-fun', english: '5 minutes' },
  { type: 'minute', kanji: '六分', hiragana: 'ろっぷん', romaji: 'roppun', english: '6 minutes', isIrregular: true },
  { type: 'minute', kanji: '七分', hiragana: 'ななふん / しちふん', romaji: 'nana-fun', english: '7 minutes' },
  { type: 'minute', kanji: '八分', hiragana: 'はっぷん / はちふん', romaji: 'happun', english: '8 minutes', isIrregular: true },
  { type: 'minute', kanji: '九分', hiragana: 'きゅうふん', romaji: 'kyuu-fun', english: '9 minutes' },
  { type: 'minute', kanji: '十分', hiragana: 'じゅっぷん / じっぷん', romaji: 'juppun', english: '10 minutes', isIrregular: true },
  { type: 'minute', kanji: '十五分', hiragana: 'じゅうごふん', romaji: 'juu-go-fun', english: '15 minutes' },
  { type: 'minute', kanji: '三十分 / 半', hiragana: 'さんじゅっぷん / はん', romaji: 'sanjuppun / han', english: '30 minutes / Half past', isIrregular: true, notes: '時 + 半 means half-past (e.g. 2時半 = 2:30)' },
  { type: 'minute', kanji: '四十五分', hiragana: 'よんじゅうごふん', romaji: 'yon-juu-go-fun', english: '45 minutes' }
];

export const JAPANESE_TIME_PHRASES: TimeItem[] = [
  { type: 'ampm', kanji: '午前', hiragana: 'ごぜん', romaji: 'gozen', english: 'A.M. (Morning)' },
  { type: 'ampm', kanji: '午後', hiragana: 'ごご', romaji: 'gogo', english: 'P.M. (Afternoon/Evening)' },
  { type: 'phrase', kanji: '今何時ですか', hiragana: 'いま なんじ ですか', romaji: 'Ima nan-ji desu ka', english: 'What time is it now?' },
  { type: 'phrase', kanji: '〜時ちょうど', hiragana: '〜じ ちょうど', romaji: '...ji choudo', english: 'Exactly ... o\'clock' },
  { type: 'phrase', kanji: '〜時〜分前', hiragana: '〜じ 〜ふんまえ', romaji: '...ji ...fun mae', english: '... minutes before ...' }
];

// ============================================================================
// Category D: Japanese Months (1月 to 12月)
// ============================================================================

export const JAPANESE_MONTHS: MonthItem[] = [
  { month: 1, kanji: '一月', hiragana: 'いちがつ', romaji: 'ichi-gatsu', english: 'January' },
  { month: 2, kanji: '二月', hiragana: 'にがつ', romaji: 'ni-gatsu', english: 'February' },
  { month: 3, kanji: '三月', hiragana: 'さんがつ', romaji: 'san-gatsu', english: 'March' },
  { month: 4, kanji: '四月', hiragana: 'しがつ', romaji: 'shi-gatsu', english: 'April', isIrregular: true, notes: 'Strictly しがつ (NEVER よんがつ).' },
  { month: 5, kanji: '五月', hiragana: 'ごがつ', romaji: 'go-gatsu', english: 'May' },
  { month: 6, kanji: '六月', hiragana: 'ろくがつ', romaji: 'roku-gatsu', english: 'June' },
  { month: 7, kanji: '七月', hiragana: 'しちがつ', romaji: 'shichi-gatsu', english: 'July', isIrregular: true, notes: 'Strictly しちがつ (NEVER なながつ).' },
  { month: 8, kanji: '八月', hiragana: 'はちがつ', romaji: 'hachi-gatsu', english: 'August' },
  { month: 9, kanji: '九月', hiragana: 'くがつ', romaji: 'ku-gatsu', english: 'September', isIrregular: true, notes: 'Strictly くがつ (NEVER きゅうがつ).' },
  { month: 10, kanji: '十月', hiragana: 'じゅうがつ', romaji: 'juu-gatsu', english: 'October' },
  { month: 11, kanji: '十一月', hiragana: 'じゅういちがつ', romaji: 'juu-ichi-gatsu', english: 'November' },
  { month: 12, kanji: '十二月', hiragana: 'じゅうにがつ', romaji: 'juu-ni-gatsu', english: 'December' }
];

// ============================================================================
// Category E: Japanese Dates (1st to 31st) & Days of the Week
// ============================================================================

export const JAPANESE_DATES: DateDayItem[] = [
  { dayNumber: 1, kanji: '一日', hiragana: 'ついたち', romaji: 'tsuitachi', english: '1st of the month', isIrregular: true, notes: 'Special reading: ついたち (From 月立ち tsukitachi)' },
  { dayNumber: 2, kanji: '二日', hiragana: 'ふつか', romaji: 'futsuka', english: '2nd of the month', isIrregular: true },
  { dayNumber: 3, kanji: '三日', hiragana: 'みっか', romaji: 'mikka', english: '3rd of the month', isIrregular: true },
  { dayNumber: 4, kanji: '四日', hiragana: 'よっか', romaji: 'yokka', english: '4th of the month', isIrregular: true },
  { dayNumber: 5, kanji: '五日', hiragana: 'いつか', romaji: 'itsuka', english: '5th of the month', isIrregular: true },
  { dayNumber: 6, kanji: '六日', hiragana: 'むいか', romaji: 'muika', english: '6th of the month', isIrregular: true },
  { dayNumber: 7, kanji: '七日', hiragana: 'なのか', romaji: 'nanoka', english: '7th of the month', isIrregular: true },
  { dayNumber: 8, kanji: '八日', hiragana: 'ようか', romaji: 'youka', english: '8th of the month', isIrregular: true },
  { dayNumber: 9, kanji: '九日', hiragana: 'ここのか', romaji: 'kokonoka', english: '9th of the month', isIrregular: true },
  { dayNumber: 10, kanji: '十日', hiragana: 'とおか', romaji: 'tooka', english: '10th of the month', isIrregular: true },
  { dayNumber: 11, kanji: '十一日', hiragana: 'じゅういちにち', romaji: 'juu-ichi-nichi', english: '11th of the month' },
  { dayNumber: 12, kanji: '十二日', hiragana: 'じゅうににち', romaji: 'juu-ni-nichi', english: '12th of the month' },
  { dayNumber: 13, kanji: '十三日', hiragana: 'じゅうさんにち', romaji: 'juu-san-nichi', english: '13th of the month' },
  { dayNumber: 14, kanji: '十四日', hiragana: 'じゅうよっか', romaji: 'juu-yokka', english: '14th of the month', isIrregular: true, notes: 'Follows 4th pattern: じゅう + よっか' },
  { dayNumber: 15, kanji: '十五日', hiragana: 'じゅうごにち', romaji: 'juu-go-nichi', english: '15th of the month' },
  { dayNumber: 16, kanji: '十六日', hiragana: 'じゅうろくにち', romaji: 'juu-roku-nichi', english: '16th of the month' },
  { dayNumber: 17, kanji: '十七日', hiragana: 'じゅうしちにち / じゅうななにち', romaji: 'juu-shichi-nichi', english: '17th of the month' },
  { dayNumber: 18, kanji: '十八日', hiragana: 'じゅうはちにち', romaji: 'juu-hachi-nichi', english: '18th of the month' },
  { dayNumber: 19, kanji: '十九日', hiragana: 'じゅうくにち / じゅうきゅうにち', romaji: 'juu-ku-nichi', english: '19th of the month' },
  { dayNumber: 20, kanji: '二十日', hiragana: 'はつか', romaji: 'hatsuka', english: '20th of the month', isIrregular: true, notes: 'Special reading: はつか' },
  { dayNumber: 21, kanji: '二十一日', hiragana: 'にじゅういちにち', romaji: 'ni-juu-ichi-nichi', english: '21st of the month' },
  { dayNumber: 22, kanji: '二十二日', hiragana: 'にじゅうににち', romaji: 'ni-juu-ni-nichi', english: '22nd of the month' },
  { dayNumber: 23, kanji: '二十三日', hiragana: 'にじゅうさんにち', romaji: 'ni-juu-san-nichi', english: '23rd of the month' },
  { dayNumber: 24, kanji: '二十四日', hiragana: 'にじゅうよっか', romaji: 'ni-juu-yokka', english: '24th of the month', isIrregular: true, notes: 'Follows 4th pattern: にじゅう + よっか' },
  { dayNumber: 25, kanji: '二十五日', hiragana: 'にじゅうごにち', romaji: 'ni-juu-go-nichi', english: '25th of the month' },
  { dayNumber: 26, kanji: '二十六日', hiragana: 'にじゅうろくにち', romaji: 'ni-juu-roku-nichi', english: '26th of the month' },
  { dayNumber: 27, kanji: '二十七日', hiragana: 'にじゅうしちにち / にじゅうななにち', romaji: 'ni-juu-shichi-nichi', english: '27th of the month' },
  { dayNumber: 28, kanji: '二十八日', hiragana: 'にじゅうはちにち', romaji: 'ni-juu-hachi-nichi', english: '28th of the month' },
  { dayNumber: 29, kanji: '二十九日', hiragana: 'にじゅうくにち', romaji: 'ni-juu-ku-nichi', english: '29th of the month' },
  { dayNumber: 30, kanji: '三十日', hiragana: 'さんじゅうにち', romaji: 'san-juu-nichi', english: '30th of the month' },
  { dayNumber: 31, kanji: '三十一日', hiragana: 'さんじゅういちにち', romaji: 'san-juu-ichi-nichi', english: '31st of the month' }
];

export const JAPANESE_DAYS_OF_WEEK: DateDayItem[] = [
  { dayNumber: 1, kanji: '月曜日', hiragana: 'げつようび', romaji: 'getsuyoubi', english: 'Monday (Moon Day)' },
  { dayNumber: 2, kanji: '火曜日', hiragana: 'かようび', romaji: 'kayoubi', english: 'Tuesday (Fire Day)' },
  { dayNumber: 3, kanji: '水曜日', hiragana: 'すいようび', romaji: 'suiyoubi', english: 'Wednesday (Water Day)' },
  { dayNumber: 4, kanji: '木曜日', hiragana: 'もくようび', romaji: 'mokuyoubi', english: 'Thursday (Wood/Tree Day)' },
  { dayNumber: 5, kanji: '金曜日', hiragana: 'きんようび', romaji: 'kinyoubi', english: 'Friday (Gold/Metal Day)' },
  { dayNumber: 6, kanji: '土曜日', hiragana: 'どようび', romaji: 'doyoubi', english: 'Saturday (Earth/Soil Day)' },
  { dayNumber: 7, kanji: '日曜日', hiragana: 'にちようび', romaji: 'nichiyoubi', english: 'Sunday (Sun Day)' }
];

// ============================================================================
// Category F: Japanese Duration & Frequency Counting
// ============================================================================

export const JAPANESE_DURATION_ITEMS: DurationItem[] = [
  { type: 'hour_duration', kanji: '一時間', hiragana: 'いちじかん', romaji: 'ichi-jikan', english: '1 hour (duration)', notes: '時 (point in time) vs 時間 (duration)' },
  { type: 'hour_duration', kanji: '四時間', hiragana: 'よじかん', romaji: 'yo-jikan', english: '4 hours (duration)' },
  { type: 'minute_duration', kanji: '十分間', hiragana: 'じゅっぷんかん', romaji: 'juppun-kan', english: '10 minutes (duration)' },
  { type: 'day_duration', kanji: '一日 (いちにち)', hiragana: 'いちにち', romaji: 'ichi-nichi', english: '1 day (duration)', notes: 'ついたち is the 1st day of month; いちにち is 1 day duration.' },
  { type: 'day_duration', kanji: '三日間', hiragana: 'みっかかん', romaji: 'mikka-kan', english: '3 days (duration)' },
  { type: 'week_duration', kanji: '一週間', hiragana: 'いっしゅうかん', romaji: 'isshuukan', english: '1 week (duration)' },
  { type: 'week_duration', kanji: '二週間', hiragana: 'にしゅうかん', romaji: 'ni-shuukan', english: '2 weeks (duration)' },
  { type: 'month_duration', kanji: '一ヶ月', hiragana: 'いっかげつ', romaji: 'ikkagetsu', english: '1 month (duration)', notes: '一月 (いちがつ) is January; 一ヶ月 (いっかげつ) is 1 month duration.' },
  { type: 'month_duration', kanji: '三ヶ月', hiragana: 'さんかげつ', romaji: 'san-kagetsu', english: '3 months (duration)' },
  { type: 'year_duration', kanji: '一年間', hiragana: 'いちねんかん', romaji: 'ichi-nenkan', english: '1 year (duration)' },
  { type: 'frequency', kanji: '一日に二回', hiragana: 'いちにちに にかい', romaji: 'ichi-nichi ni ni-kai', english: 'Twice a day' },
  { type: 'frequency', kanji: '一週間に一回', hiragana: 'いっしゅうかんに いっかい', romaji: 'isshuukan ni ikkai', english: 'Once a week' },
  { type: 'frequency', kanji: '一ヶ月に三回', hiragana: 'いっかげつに さんかい', romaji: 'ikkagetsu ni san-kai', english: 'Three times a month' }
];

