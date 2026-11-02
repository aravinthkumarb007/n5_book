// =========================================================================
// Minna no Nihongo I - Summary Lessons & Appendices Reference Data
// Primary Reference: 3A Corporation Textbook Pages 183–209
// =========================================================================

export interface ParticleSummaryItem {
  particle: string;
  usages: {
    category: string;
    description: string;
    lesson: number;
    examples: { ja: string; en: string }[];
  }[];
}

export interface VerbConjugationEntry {
  dictionary: string;
  masu: string;
  te: string;
  nai: string;
  ta: string;
  meaning: string;
  group: 'I' | 'II' | 'III';
  lesson: number;
}

export interface CounterEntry {
  counter: string;
  kanji: string;
  usage: string;
  items: { count: number; reading: string; romaji: string }[];
  questionWord: string;
}

// -------------------------------------------------------------------------
// SUMMARY LESSON I: Comprehensive Particle Reference (Pages 183–186)
// -------------------------------------------------------------------------
export const MINNA_PARTICLES_SUMMARY: ParticleSummaryItem[] = [
  {
    particle: 'は (wa)',
    usages: [
      {
        category: 'Topic Marker',
        description: 'Marks the topic of the sentence (what the speaker wants to talk about).',
        lesson: 1,
        examples: [
          { ja: 'わたしは マイク・ミラーです。', en: 'I am Mike Miller. (L.1)' },
          { ja: '朝６時に 起きます。', en: 'I get up at six in the morning. (L.4)' },
          { ja: '桜は きれいです。', en: 'Cherry blossoms are beautiful. (L.8)' }
        ]
      },
      {
        category: 'Contrast / Emphasis on Negative',
        description: 'Placed after nouns to highlight contrast or emphasize negatives.',
        lesson: 10,
        examples: [
          { ja: 'ニューヨークは 今 何時ですか。', en: 'What time is it now in New York? (L.4)' },
          { ja: '日曜日は 友達と 奈良へ 行きました。', en: 'On Sunday I went to Nara with a friend. (L.6)' }
        ]
      }
    ]
  },
  {
    particle: 'も (mo)',
    usages: [
      {
        category: 'Inclusion ("also / too")',
        description: 'Added after a topic instead of は when the statement is the same as previous.',
        lesson: 1,
        examples: [
          { ja: 'マリアさんも ブラジル人です。', en: 'Maria is Brazilian, too. (L.1)' },
          { ja: 'この荷物も お願いします。', en: 'Please send this parcel, too. (L.11)' },
          { ja: 'どちらも 好きです。', en: 'I like both. (L.12)' }
        ]
      },
      {
        category: 'Total Negation with Interrogatives',
        description: 'Interrogative + も with negative verb expresses total denial.',
        lesson: 5,
        examples: [
          { ja: 'どこ[へ]も 行きませんでした。', en: 'I did not go anywhere. (L.5)' },
          { ja: '何も 食べませんでした。', en: 'I did not eat anything. (L.6)' },
          { ja: 'だれも いませんでした。', en: 'There was no one. (L.10)' }
        ]
      }
    ]
  },
  {
    particle: 'の (no)',
    usages: [
      {
        category: 'Possession / Affiliation / Modification',
        description: 'Connects two nouns; N1 modifies, specifies, or possesses N2.',
        lesson: 1,
        examples: [
          { ja: 'あの方は IMCの 社員です。', en: 'That person is an employee of IMC. (L.1)' },
          { ja: 'これは コンピューターの 本です。', en: 'This is a book on computers. (L.2)' },
          { ja: 'これは わたしの 傘です。', en: 'That is my umbrella. (L.2)' }
        ]
      }
    ]
  },
  {
    particle: 'を (o)',
    usages: [
      {
        category: 'Direct Object',
        description: 'Marks the direct object of a transitive verb.',
        lesson: 6,
        examples: [
          { ja: 'ジュースを 飲みます。', en: 'I drink juice. (L.6)' }
        ]
      },
      {
        category: 'Spatial Motion / Passage',
        description: 'Marks the space through which or out of which motion takes place.',
        lesson: 13,
        examples: [
          { ja: '公園を 散歩します。', en: 'I take a walk in the park. (L.13)' },
          { ja: '道を 渡ります。', en: 'Please cross that street. (L.23)' },
          { ja: '交差点を 右へ 曲がります。', en: 'Turn right at the intersection. (L.23)' }
        ]
      }
    ]
  },
  {
    particle: 'が (ga)',
    usages: [
      {
        category: 'Object of Ability / Desire / Preference',
        description: 'Marks objects of verbs of ability (わかります, できます), existence (あります, います), and adjectives of desire (欲しい) or like/dislike (好き, 嫌い).',
        lesson: 9,
        examples: [
          { ja: 'イタリア料理が 好きです。', en: 'I like Italian food. (L.9)' },
          { ja: '日本語が 少し わかります。', en: 'I understand Japanese a little. (L.9)' },
          { ja: 'パソコンが 欲しいです。', en: 'I want a personal computer. (L.13)' }
        ]
      },
      {
        category: 'Natural Phenomena / New Subject',
        description: 'Marks the subject of an observed natural event or new information.',
        lesson: 14,
        examples: [
          { ja: '雨が 降って います。', en: 'It is raining now. (L.14)' },
          { ja: '音が 小さいです。', en: 'The volume is low. (L.23)' }
        ]
      },
      {
        category: 'Subordinate Clause Subject',
        description: 'The subject in subordinate clauses (〜たら, 〜ても, 〜とき, 〜まえに) takes が.',
        lesson: 16,
        examples: [
          { ja: '友達が 来る まえに、部屋を 掃除します。', en: 'I will clean my room before my friends come. (L.18)' },
          { ja: '妻が 病気の とき、会社を 休みます。', en: 'When my wife is sick, I take a day off work. (L.23)' }
        ]
      }
    ]
  },
  {
    particle: 'に (ni)',
    usages: [
      {
        category: 'Specific Time of Action',
        description: 'Marks the exact time or day with numbers when an action occurs.',
        lesson: 4,
        examples: [
          { ja: '朝６時に 起きます。', en: 'I get up at six o\'clock in the morning. (L.4)' },
          { ja: '３月25日に 日本へ 来ました。', en: 'I came to Japan on March 25th. (L.5)' }
        ]
      },
      {
        category: 'Indirect Object / Beneficiary',
        description: 'Marks recipient of an action (あげます, かします, おしえます).',
        lesson: 7,
        examples: [
          { ja: '木村さんに 花を あげました。', en: 'I gave flowers to Ms. Kimura. (L.7)' },
          { ja: '友達に 手紙を 書きます。', en: 'I write letters to my friends. (L.7)' }
        ]
      },
      {
        category: 'Location of Existence / Destination',
        description: 'Marks the location where something exists or the goal of arrival.',
        lesson: 10,
        examples: [
          { ja: '机の 上に 写真が あります。', en: 'There is a picture on the desk. (L.10)' },
          { ja: '大阪に 住んで います。', en: 'Maria lives in Osaka. (L.15)' },
          { ja: '喫茶店に 入りましょう。', en: 'Let\'s go in that coffee shop. (L.13)' }
        ]
      },
      {
        category: 'Frequency per Time Unit',
        description: 'Marks the period unit within which an action is repeated.',
        lesson: 11,
        examples: [
          { ja: '１週間に ２回 テニスを します。', en: 'I play tennis twice a week. (L.11)' }
        ]
      },
      {
        category: 'Purpose of Movement',
        description: 'Follows verb stem or action noun to indicate purpose of going/coming.',
        lesson: 13,
        examples: [
          { ja: '日本へ 経済の 勉強に 来ました。', en: 'I came to Japan to study economics. (L.13)' },
          { ja: '京都へ 花見に 行きます。', en: 'I will go to Kyoto for cherry blossom viewing. (L.13)' }
        ]
      }
    ]
  },
  {
    particle: 'へ (e)',
    usages: [
      {
        category: 'Direction of Movement',
        description: 'Indicates the direction toward which motion is headed (pronounced "e").',
        lesson: 5,
        examples: [
          { ja: '京都へ 行きます。', en: 'I will go to Kyoto. (L.5)' },
          { ja: 'フランスへ 料理を 習いに 行きます。', en: 'I will go to France to study cooking. (L.13)' }
        ]
      }
    ]
  },
  {
    particle: 'で (de)',
    usages: [
      {
        category: 'Means / Instrument / Language',
        description: 'Indicates the vehicle, tool, material, or language used.',
        lesson: 5,
        examples: [
          { ja: 'タクシーで 帰ります。', en: 'I go home by taxi. (L.5)' },
          { ja: 'ファクスで データを 送ります。', en: 'I send the data by fax. (L.7)' },
          { ja: '日本語で レポートを 書きます。', en: 'I write reports in Japanese. (L.7)' }
        ]
      },
      {
        category: 'Location of Action',
        description: 'Indicates where an dynamic action or event takes place.',
        lesson: 6,
        examples: [
          { ja: '駅で 新聞を 買います。', en: 'I buy a newspaper at the station. (L.6)' },
          { ja: '東京で サッカーの 試合が あります。', en: 'A football game will be held in Tokyo. (L.21)' }
        ]
      }
    ]
  },
  {
    particle: 'と (to)',
    usages: [
      {
        category: 'Accompaniment ("with")',
        description: 'Marks the companion with whom an action is performed.',
        lesson: 5,
        examples: [
          { ja: '家族と 日本へ 来ました。', en: 'I came to Japan with my family. (L.5)' }
        ]
      },
      {
        category: 'Exhaustive Listing ("and")',
        description: 'Connects nouns in an exhaustive coordinate list.',
        lesson: 4,
        examples: [
          { ja: '銀行の 休みは 土曜日と 日曜日です。', en: 'The bank is closed on Saturdays and Sundays. (L.4)' }
        ]
      },
      {
        category: 'Quotation / Natural Result',
        description: 'Marks quoted speech, opinion, or inevitable mechanical consequence.',
        lesson: 21,
        examples: [
          { ja: 'あした 雨が 降ると 思います。', en: 'I think it will rain tomorrow. (L.21)' },
          { ja: 'ボタンを 押すと、切符が 出ます。', en: 'Press this button, and a ticket will come out. (L.23)' }
        ]
      }
    ]
  },
  {
    particle: 'や (ya)',
    usages: [
      {
        category: 'Non-Exhaustive Listing',
        description: 'Enumerates representative nouns in coordinate relation (often with など).',
        lesson: 10,
        examples: [
          { ja: '箱の 中に 手紙や 写真などが あります。', en: 'There are letters, pictures, and so on in the box. (L.10)' }
        ]
      }
    ]
  },
  {
    particle: 'から / まで (kara / made)',
    usages: [
      {
        category: 'Starting Point & Endpoint (Time / Place)',
        description: 'から marks the origin/starting point; まで marks the limit/destination.',
        lesson: 4,
        examples: [
          { ja: '９時から ５時まで 働きます。', en: 'I work from nine to five. (L.4)' },
          { ja: '大阪から 東京まで ３時間 かかります。', en: 'It takes three hours from Osaka to Tokyo. (L.11)' }
        ]
      }
    ]
  },
  {
    particle: 'までに (made ni)',
    usages: [
      {
        category: 'Deadline / Time Limit',
        description: 'Indicates the latest point in time by which an action must be done.',
        lesson: 17,
        examples: [
          { ja: '土曜日までに 本を 返さなければ なりません。', en: 'I must return the book by Saturday. (L.17)' }
        ]
      }
    ]
  },
  {
    particle: 'より (yori)',
    usages: [
      {
        category: 'Comparison Standard ("than")',
        description: 'Marks the baseline standard of comparison.',
        lesson: 12,
        examples: [
          { ja: '北海道は 九州より 大きいです。', en: 'Hokkaido is bigger than Kyushu. (L.12)' }
        ]
      }
    ]
  },
  {
    particle: 'でも (demo)',
    usages: [
      {
        category: 'Exemplification / Invitation ("or something")',
        description: 'Gives an example of a class of items when making a suggestion.',
        lesson: 21,
        examples: [
          { ja: 'ちょっと ビールでも 飲みませんか。', en: 'Shall we drink beer or something? (L.21)' }
        ]
      }
    ]
  }
];

// -------------------------------------------------------------------------
// APPENDIX IV: Master Counters Reference (Pages 196–197)
// -------------------------------------------------------------------------
export const MINNA_COUNTERS_TABLE: CounterEntry[] = [
  {
    counter: 'つ (tsu)',
    kanji: '〜つ',
    usage: 'General objects & things (1–10)',
    questionWord: 'いくつ (ikutsu)',
    items: [
      { count: 1, reading: 'ひとつ', romaji: 'hitotsu' },
      { count: 2, reading: 'ふたつ', romaji: 'futatsu' },
      { count: 3, reading: 'みっつ', romaji: 'mittsu' },
      { count: 4, reading: 'よっつ', romaji: 'yottsu' },
      { count: 5, reading: 'いつつ', romaji: 'itsutsu' },
      { count: 6, reading: 'むっつ', romaji: 'muttsu' },
      { count: 7, reading: 'ななつ', romaji: 'nanatsu' },
      { count: 8, reading: 'やっつ', romaji: 'yattsu' },
      { count: 9, reading: 'ここのつ', romaji: 'kokonotsu' },
      { count: 10, reading: 'とお', romaji: 'too' }
    ]
  },
  {
    counter: '人 (nin)',
    kanji: '〜人',
    usage: 'Persons / People',
    questionWord: '何人 (なんにん)',
    items: [
      { count: 1, reading: 'ひとり', romaji: 'hitori' },
      { count: 2, reading: 'ふたり', romaji: 'futari' },
      { count: 3, reading: 'さんにん', romaji: 'san-nin' },
      { count: 4, reading: 'よにん', romaji: 'yo-nin' },
      { count: 5, reading: 'ごにん', romaji: 'go-nin' },
      { count: 6, reading: 'ろくにん', romaji: 'roku-nin' },
      { count: 7, reading: 'しちにん / ななにん', romaji: 'shichi-nin / nana-nin' },
      { count: 8, reading: 'はちにん', romaji: 'hachi-nin' },
      { count: 9, reading: 'きゅうにん', romaji: 'kyuu-nin' },
      { count: 10, reading: 'じゅうにん', romaji: 'juu-nin' }
    ]
  },
  {
    counter: '枚 (mai)',
    kanji: '〜枚',
    usage: 'Thin & flat objects (paper, stamps, shirts, plates)',
    questionWord: '何枚 (なんまい)',
    items: [
      { count: 1, reading: 'いちまい', romaji: 'ichi-mai' },
      { count: 2, reading: 'にまい', romaji: 'ni-mai' },
      { count: 3, reading: 'さんまい', romaji: 'san-mai' },
      { count: 4, reading: 'よんまい', romaji: 'yon-mai' },
      { count: 5, reading: 'ごまい', romaji: 'go-mai' },
      { count: 6, reading: 'ろくまい', romaji: 'roku-mai' },
      { count: 7, reading: 'ななまい', romaji: 'nana-mai' },
      { count: 8, reading: 'はちまい', romaji: 'hachi-mai' },
      { count: 9, reading: 'きゅうまい', romaji: 'kyuu-mai' },
      { count: 10, reading: 'じゅうまい', romaji: 'juu-mai' }
    ]
  },
  {
    counter: '台 (dai)',
    kanji: '〜台',
    usage: 'Machines, vehicles, electronic equipment',
    questionWord: '何台 (なんだい)',
    items: [
      { count: 1, reading: 'いちだい', romaji: 'ichi-dai' },
      { count: 2, reading: 'にだい', romaji: 'ni-dai' },
      { count: 3, reading: 'さんだい', romaji: 'san-dai' },
      { count: 4, reading: 'よんだい', romaji: 'yon-dai' },
      { count: 5, reading: 'ごだい', romaji: 'go-dai' },
      { count: 6, reading: 'ろくだい', romaji: 'roku-dai' },
      { count: 7, reading: 'ななだい', romaji: 'nana-dai' },
      { count: 8, reading: 'はちだい', romaji: 'hachi-dai' },
      { count: 9, reading: 'きゅうだい', romaji: 'kyuu-dai' },
      { count: 10, reading: 'じゅうだい', romaji: 'juu-dai' }
    ]
  },
  {
    counter: '冊 (satsu)',
    kanji: '〜冊',
    usage: 'Books, notebooks, magazines',
    questionWord: '何冊 (なんさつ)',
    items: [
      { count: 1, reading: 'いっさつ', romaji: 'issatsu' },
      { count: 2, reading: 'にさつ', romaji: 'ni-satsu' },
      { count: 3, reading: 'さんさつ', romaji: 'san-satsu' },
      { count: 4, reading: 'よんさつ', romaji: 'yon-satsu' },
      { count: 5, reading: 'ごさつ', romaji: 'go-satsu' },
      { count: 6, reading: 'ろくさつ', romaji: 'roku-satsu' },
      { count: 7, reading: 'ななさつ', romaji: 'nana-satsu' },
      { count: 8, reading: 'はっさつ', romaji: 'hassatsu' },
      { count: 9, reading: 'きゅうさつ', romaji: 'kyuu-satsu' },
      { count: 10, reading: 'じゅっさつ', romaji: 'jussatsu' }
    ]
  },
  {
    counter: '本 (hon)',
    kanji: '〜本',
    usage: 'Thin & long objects (bottles, pencils, trees, umbrellas)',
    questionWord: '何本 (なんぼん)',
    items: [
      { count: 1, reading: 'いっぽん', romaji: 'ippon' },
      { count: 2, reading: 'にほん', romaji: 'ni-hon' },
      { count: 3, reading: 'さんぼん', romaji: 'san-bon' },
      { count: 4, reading: 'よんほん', romaji: 'yon-hon' },
      { count: 5, reading: 'ごほん', romaji: 'go-hon' },
      { count: 6, reading: 'ろっぽん', romaji: 'roppon' },
      { count: 7, reading: 'ななほん', romaji: 'nana-hon' },
      { count: 8, reading: 'はっぽん', romaji: 'happon' },
      { count: 9, reading: 'きゅうほん', romaji: 'kyuu-hon' },
      { count: 10, reading: 'じゅっぽん', romaji: 'juppon' }
    ]
  },
  {
    counter: '杯 (hai)',
    kanji: '〜杯',
    usage: 'Cups & glasses of drink (water, coffee, tea)',
    questionWord: '何杯 (なんばい)',
    items: [
      { count: 1, reading: 'いっぱい', romaji: 'ippai' },
      { count: 2, reading: 'にはい', romaji: 'ni-hai' },
      { count: 3, reading: 'さんばい', romaji: 'san-bai' },
      { count: 4, reading: 'よんはい', romaji: 'yon-hai' },
      { count: 5, reading: 'ごはい', romaji: 'go-hai' },
      { count: 6, reading: 'ろっぱい', romaji: 'roppai' },
      { count: 7, reading: 'ななはい', romaji: 'nana-hai' },
      { count: 8, reading: 'はっぱい', romaji: 'happai' },
      { count: 9, reading: 'きゅうはい', romaji: 'kyuu-hai' },
      { count: 10, reading: 'じゅっぱい', romaji: 'juppai' }
    ]
  },
  {
    counter: '匹 (hiki)',
    kanji: '〜匹',
    usage: 'Small animals, fish, insects',
    questionWord: '何匹 (なんびき)',
    items: [
      { count: 1, reading: 'いっぴき', romaji: 'ippiki' },
      { count: 2, reading: 'にひき', romaji: 'ni-hiki' },
      { count: 3, reading: 'さんびき', romaji: 'san-biki' },
      { count: 4, reading: 'よんひき', romaji: 'yon-hiki' },
      { count: 5, reading: 'ごひき', romaji: 'go-hiki' },
      { count: 6, reading: 'ろっぴき', romaji: 'roppiki' },
      { count: 7, reading: 'ななひき', romaji: 'nana-hiki' },
      { count: 8, reading: 'はっぴき', romaji: 'happiki' },
      { count: 9, reading: 'きゅうひき', romaji: 'kyuu-hiki' },
      { count: 10, reading: 'じゅっぴき', romaji: 'juppiki' }
    ]
  },
  {
    counter: '階 (kai)',
    kanji: '〜階',
    usage: 'Floors of a building',
    questionWord: '何階 (なんがい)',
    items: [
      { count: 1, reading: 'いっかい', romaji: 'ikkai' },
      { count: 2, reading: 'にかい', romaji: 'ni-kai' },
      { count: 3, reading: 'さんがい', romaji: 'san-gai' },
      { count: 4, reading: 'よんかい', romaji: 'yon-kai' },
      { count: 5, reading: 'ごかい', romaji: 'go-kai' },
      { count: 6, reading: 'ろっかい', romaji: 'rokkai' },
      { count: 7, reading: 'ななかい', romaji: 'nana-kai' },
      { count: 8, reading: 'はっかい', romaji: 'hakkai' },
      { count: 9, reading: 'きゅうかい', romaji: 'kyuu-kai' },
      { count: 10, reading: 'じゅっかい', romaji: 'jukkai' }
    ]
  }
];

// -------------------------------------------------------------------------
// APPENDIX V: Complete Verb Conjugation Tables (Pages 198–209)
// -------------------------------------------------------------------------
export const MINNA_VERBS_CONJUGATION_TABLE: VerbConjugationEntry[] = [
  // Group I Verbs
  { dictionary: 'あう (会う)', masu: 'あいます', te: 'あって', nai: 'あわない', ta: 'あった', meaning: 'meet [a friend]', group: 'I', lesson: 6 },
  { dictionary: 'あそぶ (遊ぶ)', masu: 'あそびます', te: 'あそんで', nai: 'あそばない', ta: 'あそんだ', meaning: 'enjoy oneself, play', group: 'I', lesson: 13 },
  { dictionary: 'あらう (洗う)', masu: 'あらいます', te: 'あらって', nai: 'あらわない', ta: 'あらった', meaning: 'wash', group: 'I', lesson: 18 },
  { dictionary: 'ある', masu: 'あります', te: 'あって', nai: 'ない', ta: 'あった', meaning: 'have / exist (inanimate)', group: 'I', lesson: 9 },
  { dictionary: 'あるく (歩く)', masu: 'あるきます', te: 'あるいて', nai: 'あるかない', ta: 'あるいた', meaning: 'walk [along a road]', group: 'I', lesson: 23 },
  { dictionary: 'いう (言う)', masu: 'いいます', te: 'いって', nai: 'いわない', ta: 'いった', meaning: 'say', group: 'I', lesson: 21 },
  { dictionary: 'いく (行く)', masu: 'いきます', te: 'いって', nai: 'いかない', ta: 'いった', meaning: 'go', group: 'I', lesson: 5 },
  { dictionary: 'いそぐ (急ぐ)', masu: 'いそぎます', te: 'いそいで', nai: 'いそばない', ta: 'いそいだ', meaning: 'hurry', group: 'I', lesson: 14 },
  { dictionary: 'いる (要る)', masu: 'いります', te: 'いって', nai: 'いらない', ta: 'いった', meaning: 'need, require [a visa]', group: 'I', lesson: 20 },
  { dictionary: 'うごく (動く)', masu: 'うごきます', te: 'うごいて', nai: 'うごかない', ta: 'うごいた', meaning: 'move, work [a watch]', group: 'I', lesson: 23 },
  { dictionary: 'うたう (歌う)', masu: 'うたいます', te: 'うたって', nai: 'うたわない', ta: 'うたった', meaning: 'sing', group: 'I', lesson: 18 },
  { dictionary: 'うる (売る)', masu: 'うります', te: 'うって', nai: 'うらない', ta: 'うった', meaning: 'sell', group: 'I', lesson: 15 },
  { dictionary: 'おく (置く)', masu: 'おきます', te: 'おいて', nai: 'おかない', ta: 'おいた', meaning: 'put, place', group: 'I', lesson: 15 },
  { dictionary: 'おくる (送る)', masu: 'おくります', te: 'おくって', nai: 'おくらない', ta: 'おくった', meaning: 'send / escort', group: 'I', lesson: 7 },
  { dictionary: 'おす (押す)', masu: 'おします', te: 'おして', nai: 'おさない', ta: 'おした', meaning: 'push, press', group: 'I', lesson: 16 },
  { dictionary: 'おもう (思う)', masu: 'おもいます', te: 'おもって', nai: 'おもわない', ta: 'おもった', meaning: 'think', group: 'I', lesson: 21 },
  { dictionary: 'おもいだす (思い出す)', masu: 'おもいだします', te: 'おもいだして', nai: 'おもいださない', ta: 'おもいだした', meaning: 'remember, recollect', group: 'I', lesson: 15 },
  { dictionary: 'およぐ (泳ぐ)', masu: 'およぎます', te: 'およいで', nai: 'およがない', ta: 'およいだ', meaning: 'swim', group: 'I', lesson: 13 },
  { dictionary: 'おわる (終わる)', masu: 'おわります', te: 'おわって', nai: 'おわらない', ta: 'おわった', meaning: 'finish', group: 'I', lesson: 4 },
  { dictionary: 'かう (買う)', masu: 'かいます', te: 'かって', nai: 'かわない', ta: 'かった', meaning: 'buy', group: 'I', lesson: 6 },
  { dictionary: 'かえす (返す)', masu: 'かえします', te: 'かえして', nai: 'かえさない', ta: 'かえした', meaning: 'give back, return', group: 'I', lesson: 17 },
  { dictionary: 'かえる (帰る)', masu: 'かえります', te: 'かえって', nai: 'かえらない', ta: 'かえった', meaning: 'go home, return', group: 'I', lesson: 5 },
  { dictionary: 'かかる', masu: 'かかります', te: 'かかって', nai: 'かからない', ta: 'かかった', meaning: 'take (time, money)', group: 'I', lesson: 11 },
  { dictionary: 'かく (書く)', masu: 'かきます', te: 'かいて', nai: 'かかない', ta: 'かいた', meaning: 'write, draw', group: 'I', lesson: 6 },
  { dictionary: 'かす (貸す)', masu: 'かします', te: 'かして', nai: 'かさない', ta: 'かした', meaning: 'lend', group: 'I', lesson: 7 },
  { dictionary: 'かつ (勝つ)', masu: 'かちます', te: 'かって', nai: 'かたない', ta: 'かった', meaning: 'win', group: 'I', lesson: 21 },
  { dictionary: 'きく (聞く)', masu: 'ききます', te: 'きいて', nai: 'きかない', ta: 'きいた', meaning: 'hear, listen / ask', group: 'I', lesson: 6 },
  { dictionary: 'きる (切る)', masu: 'きります', te: 'きって', nai: 'きらない', ta: 'きった', meaning: 'cut, slice', group: 'I', lesson: 7 },
  { dictionary: 'けす (消す)', masu: 'けします', te: 'けして', nai: 'けさない', ta: 'けした', meaning: 'turn off', group: 'I', lesson: 14 },
  { dictionary: 'すう (吸う)', masu: 'すいます', te: 'すって', nai: 'すわない', ta: 'すった', meaning: 'smoke, inhale', group: 'I', lesson: 6 },
  { dictionary: 'すむ (住む)', masu: 'すみます', te: 'すんで', nai: 'すまない', ta: 'すんだ', meaning: 'live, reside', group: 'I', lesson: 15 },
  { dictionary: 'すわる (座る)', masu: 'すわります', te: 'すわって', nai: 'すわらない', ta: 'すわった', meaning: 'sit down', group: 'I', lesson: 15 },
  { dictionary: 'たつ (立つ)', masu: 'たちます', te: 'たって', nai: 'たたない', ta: 'たった', meaning: 'stand up', group: 'I', lesson: 15 },
  { dictionary: 'だす (出す)', masu: 'だします', te: 'だして', nai: 'ださない', ta: 'だした', meaning: 'take out, send, withdraw', group: 'I', lesson: 13 },
  { dictionary: 'つかう (使う)', masu: 'つかいます', te: 'つかって', nai: 'つかわない', ta: 'つかった', meaning: 'use', group: 'I', lesson: 15 },
  { dictionary: 'つく (着く)', masu: 'つきます', te: 'ついて', nai: 'つかない', ta: 'ついた', meaning: 'arrive [at station]', group: 'I', lesson: 25 },
  { dictionary: 'つくる (作る)', masu: 'つくります', te: 'つくって', nai: 'つくらない', ta: 'つくった', meaning: 'make, produce', group: 'I', lesson: 15 },
  { dictionary: 'てつだう (手伝う)', masu: 'てつだいます', te: 'てつだって', nai: 'てつだわない', ta: 'てつだった', meaning: 'help (with task)', group: 'I', lesson: 14 },
  { dictionary: 'とまる (泊まる)', masu: 'とまります', te: 'とまって', nai: 'とまらない', ta: 'とまった', meaning: 'stay [at hotel]', group: 'I', lesson: 19 },
  { dictionary: 'とる (取る/撮る)', masu: 'とります', te: 'とって', nai: 'とらない', ta: 'とった', meaning: 'take, pass / photograph', group: 'I', lesson: 6 },
  { dictionary: 'なおす (直す)', masu: 'なおします', te: 'なおして', nai: 'なおさない', ta: 'なおした', meaning: 'repair, correct', group: 'I', lesson: 20 },
  { dictionary: 'ならう (習う)', masu: 'ならいます', te: 'ならって', nai: 'ならわない', ta: 'ならった', meaning: 'learn', group: 'I', lesson: 7 },
  { dictionary: 'なる', masu: 'なります', te: 'なって', nai: 'ならない', ta: 'なった', meaning: 'become', group: 'I', lesson: 19 },
  { dictionary: 'ぬぐ (脱ぐ)', masu: 'ぬぎます', te: 'ぬいで', nai: 'ぬがない', ta: 'ぬいだ', meaning: 'take off clothes', group: 'I', lesson: 17 },
  { dictionary: 'のぼる (登る)', masu: 'のぼります', te: 'のぼって', nai: 'のぼらない', ta: 'のぼった', meaning: 'climb [a mountain]', group: 'I', lesson: 19 },
  { dictionary: 'のむ (飲む)', masu: 'のみます', te: 'のんで', nai: 'のまない', ta: 'のんだ', meaning: 'drink, take medicine', group: 'I', lesson: 6 },
  { dictionary: 'のる (乗る)', masu: 'のります', te: 'のって', nai: 'のらない', ta: 'のった', meaning: 'ride, get on [train]', group: 'I', lesson: 16 },
  { dictionary: 'はいる (入る)', masu: 'はいります', te: 'はいって', nai: 'はいらない', ta: 'はいった', meaning: 'enter', group: 'I', lesson: 13 },
  { dictionary: 'はく (履く)', masu: 'はきます', te: 'はいて', nai: 'はかない', ta: 'はいた', meaning: 'put on shoes/pants', group: 'I', lesson: 22 },
  { dictionary: 'はたらく (働く)', masu: 'はたらきます', te: 'はたらいて', nai: 'はたらかない', ta: 'はたらいた', meaning: 'work', group: 'I', lesson: 4 },
  { dictionary: 'はなす (話す)', masu: 'はなします', te: 'はなして', nai: 'はなさない', ta: 'はなした', meaning: 'speak, talk', group: 'I', lesson: 14 },
  { dictionary: 'まつ (待つ)', masu: 'まちます', te: 'まって', nai: 'またない', ta: 'まった', meaning: 'wait', group: 'I', lesson: 14 },
  { dictionary: 'もつ (持つ)', masu: 'もちます', te: 'もって', nai: 'もたない', ta: 'もった', meaning: 'hold, carry', group: 'I', lesson: 14 },
  { dictionary: 'もらう', masu: 'もらいます', te: 'もらって', nai: 'もらわない', ta: 'もらった', meaning: 'receive', group: 'I', lesson: 7 },
  { dictionary: 'やすむ (休む)', masu: 'やすみます', te: 'やすんで', nai: 'やすまない', ta: 'やすんだ', meaning: 'rest, take day off', group: 'I', lesson: 4 },
  { dictionary: 'よぶ (呼ぶ)', masu: 'よびます', te: 'よんで', nai: 'よばない', ta: 'よんだ', meaning: 'call, invite', group: 'I', lesson: 14 },
  { dictionary: 'よむ (読む)', masu: 'よみます', te: 'よんで', nai: 'よまない', ta: 'よんだ', meaning: 'read', group: 'I', lesson: 6 },
  { dictionary: 'わかる', masu: 'わかります', te: 'わかって', nai: 'わからない', ta: 'わかった', meaning: 'understand', group: 'I', lesson: 9 },
  { dictionary: 'わたる (渡る)', masu: 'わたります', te: 'わたって', nai: 'わたらない', ta: 'わたった', meaning: 'cross [a bridge]', group: 'I', lesson: 23 },

  // Group II Verbs
  { dictionary: 'あける (開ける)', masu: 'あけます', te: 'あけて', nai: 'あけない', ta: 'あけた', meaning: 'open', group: 'II', lesson: 14 },
  { dictionary: 'あげる', masu: 'あげます', te: 'あげて', nai: 'あげない', ta: 'あげた', meaning: 'give', group: 'II', lesson: 7 },
  { dictionary: 'あつめる (集める)', masu: 'あつめます', te: 'あつめて', nai: 'あつめない', ta: 'あつめた', meaning: 'collect, gather', group: 'II', lesson: 18 },
  { dictionary: 'あびる (浴びる)', masu: 'あびます', te: 'あびて', nai: 'あびない', ta: 'あびた', meaning: 'take [a shower]', group: 'II', lesson: 16 },
  { dictionary: 'いる (居る)', masu: 'います', te: 'いて', nai: 'いない', ta: 'いた', meaning: 'exist (animate)', group: 'II', lesson: 10 },
  { dictionary: 'いれる (入れる)', masu: 'いれます', te: 'いれて', nai: 'いれない', ta: 'いれた', meaning: 'put in, insert', group: 'II', lesson: 16 },
  { dictionary: 'うまれる (生まれる)', masu: 'うまれます', te: 'うまれて', nai: 'うまれない', ta: 'うまれた', meaning: 'be born', group: 'II', lesson: 22 },
  { dictionary: 'おきる (起きる)', masu: 'おきます', te: 'おきて', nai: 'おきない', ta: 'おきた', meaning: 'get up, wake up', group: 'II', lesson: 4 },
  { dictionary: 'おしえる (教える)', masu: 'おしえます', te: 'おしえて', nai: 'おしえない', ta: 'おしえた', meaning: 'teach, tell', group: 'II', lesson: 7 },
  { dictionary: 'おぼえる (覚える)', masu: 'おぼえます', te: 'おぼえて', nai: 'おぼえない', ta: 'おぼえた', meaning: 'memorize', group: 'II', lesson: 17 },
  { dictionary: 'おりる (降りる)', masu: 'おります', te: 'おりて', nai: 'おりない', ta: 'おりた', meaning: 'get off [a train]', group: 'II', lesson: 16 },
  { dictionary: 'かえる (換える/変える)', masu: 'かえます', te: 'かえて', nai: 'かえない', ta: 'かえた', meaning: 'exchange, change', group: 'II', lesson: 18 },
  { dictionary: 'かける', masu: 'かけます', te: 'かけて', nai: 'かけない', ta: 'かけた', meaning: 'make [phone call] / wear glasses', group: 'II', lesson: 7 },
  { dictionary: 'かりる (借りる)', masu: 'かります', te: 'かりて', nai: 'かりない', ta: 'かりた', meaning: 'borrow', group: 'II', lesson: 7 },
  { dictionary: 'かんがえる (考える)', masu: 'かんがえます', te: 'かんがえて', nai: 'かんがえない', ta: 'かんがえた', meaning: 'think, consider', group: 'II', lesson: 25 },
  { dictionary: 'きる (着る)', masu: 'きます', te: 'きて', nai: 'きない', ta: 'きた', meaning: 'wear [shirt, suit]', group: 'II', lesson: 22 },
  { dictionary: 'くれる', masu: 'くれます', te: 'くれて', nai: 'くれない', ta: 'くれた', meaning: 'give (to me)', group: 'II', lesson: 24 },
  { dictionary: 'しめる (閉める)', masu: 'しめます', te: 'しめて', nai: 'しめない', ta: 'しめた', meaning: 'close, shut', group: 'II', lesson: 14 },
  { dictionary: 'しらべる (調べる)', masu: 'しらべます', te: 'しらべて', nai: 'しらべない', ta: 'しらべた', meaning: 'check, investigate', group: 'II', lesson: 20 },
  { dictionary: 'すてる (捨てる)', masu: 'すてます', te: 'すてて', nai: 'すてない', ta: 'すてた', meaning: 'throw away', group: 'II', lesson: 18 },
  { dictionary: 'たべる (食べる)', masu: 'たべます', te: 'たべて', nai: 'たべない', ta: 'たべた', meaning: 'eat', group: 'II', lesson: 6 },
  { dictionary: 'たりる (足りる)', masu: 'たります', te: 'たりて', nai: 'たりない', ta: 'たりた', meaning: 'be enough', group: 'II', lesson: 21 },
  { dictionary: 'つかれる (疲れる)', masu: 'つかれます', te: 'つかれて', nai: 'つかれない', ta: 'つかれた', meaning: 'get tired', group: 'II', lesson: 13 },
  { dictionary: 'つける', masu: 'つけます', te: 'つけて', nai: 'つけない', ta: 'つけた', meaning: 'turn on', group: 'II', lesson: 14 },
  { dictionary: 'でかける (出かける)', masu: 'でかけます', te: 'でかけて', nai: 'でかけない', ta: 'でかけた', meaning: 'go out', group: 'II', lesson: 17 },
  { dictionary: 'できる', masu: 'できます', te: 'できて', nai: 'できない', ta: 'できた', meaning: 'can do, be able to', group: 'II', lesson: 18 },
  { dictionary: 'でる (出る)', masu: 'でます', te: 'でて', nai: 'でない', ta: 'でた', meaning: 'go out, exit, graduate', group: 'II', lesson: 13 },
  { dictionary: 'とめる (止める)', masu: 'とめます', te: 'とめて', nai: 'とめない', ta: 'とめた', meaning: 'stop, park', group: 'II', lesson: 14 },
  { dictionary: 'ねる (寝る)', masu: 'ねます', te: 'ねて', nai: 'ねない', ta: 'ねた', meaning: 'sleep, go to bed', group: 'II', lesson: 4 },
  { dictionary: 'のりかえる (乗り換える)', masu: 'のりかえます', te: 'のりかえて', nai: 'のりかえない', ta: 'のりかえた', meaning: 'transfer trains', group: 'II', lesson: 16 },
  { dictionary: 'はじめる (始める)', masu: 'はじめます', te: 'はじめて', nai: 'はじめない', ta: 'はじめた', meaning: 'start, begin', group: 'II', lesson: 14 },
  { dictionary: 'まける (負ける)', masu: 'まけます', te: 'まけて', nai: 'まけない', ta: 'まけた', meaning: 'lose, be defeated', group: 'II', lesson: 21 },
  { dictionary: 'みせる (見せる)', masu: 'みせます', te: 'みせて', nai: 'みせない', ta: 'みせた', meaning: 'show', group: 'II', lesson: 14 },
  { dictionary: 'みる (見る)', masu: 'みます', te: 'みて', nai: 'みない', ta: 'みた', meaning: 'see, watch', group: 'II', lesson: 6 },
  { dictionary: 'むかえる (迎える)', masu: 'むかえます', te: 'むかえて', nai: 'むかえない', ta: 'むかえた', meaning: 'welcome, meet', group: 'II', lesson: 13 },
  { dictionary: 'やめる', masu: 'やめます', te: 'やめて', nai: 'やめない', ta: 'やめた', meaning: 'quit, stop', group: 'II', lesson: 16 },
  { dictionary: 'わすれる (忘れる)', masu: 'わすれます', te: 'わすれて', nai: 'わすれない', ta: 'わすれた', meaning: 'forget', group: 'II', lesson: 17 },

  // Group III Verbs (Irregular)
  { dictionary: 'くる (来る)', masu: 'きます', te: 'きて', nai: 'こない', ta: 'きた', meaning: 'come', group: 'III', lesson: 5 },
  { dictionary: 'する', masu: 'します', te: 'して', nai: 'しない', ta: 'した', meaning: 'do', group: 'III', lesson: 6 },
  { dictionary: 'べんきょうする (勉強する)', masu: 'べんきょうします', te: 'べんきょうして', nai: 'べんきょうしない', ta: 'べんきょうした', meaning: 'study', group: 'III', lesson: 4 },
  { dictionary: 'うんてんする (運転する)', masu: 'うんてんします', te: 'うんてんして', nai: 'うんてんしない', ta: 'うんてんした', meaning: 'drive', group: 'III', lesson: 18 },
  { dictionary: 'かいものする (買い物する)', masu: 'かいものします', te: 'かいものして', nai: 'かいものしない', ta: 'かいものした', meaning: 'do shopping', group: 'III', lesson: 13 },
  { dictionary: 'けっこんする (結婚する)', masu: 'けっこんします', te: 'けっこんして', nai: 'けっこんしない', ta: 'けっこんした', meaning: 'marry', group: 'III', lesson: 13 },
  { dictionary: 'けんきゅうする (研究する)', masu: 'けんきゅうします', te: 'けんきゅうして', nai: 'けんきゅうしない', ta: 'けんきゅうした', meaning: 'do research', group: 'III', lesson: 15 },
  { dictionary: 'コピーする', masu: 'コピーします', te: 'コピーして', nai: 'コピーしない', ta: 'コピーした', meaning: 'photocopy', group: 'III', lesson: 14 },
  { dictionary: 'さんぽする (散歩する)', masu: 'さんぽします', te: 'さんぽして', nai: 'さんぽしない', ta: 'さんぽした', meaning: 'take a walk', group: 'III', lesson: 13 },
  { dictionary: 'ざんぎょうする (残業する)', masu: 'ざんぎょうします', te: 'ざんぎょうして', nai: 'ざんぎょうしない', ta: 'ざんぎょうした', meaning: 'work overtime', group: 'III', lesson: 17 },
  { dictionary: 'しゅうりする (修理する)', masu: 'しゅうりします', te: 'しゅうりして', nai: 'しゅうりしない', ta: 'しゅうりした', meaning: 'repair', group: 'III', lesson: 20 },
  { dictionary: 'しゅっちょうする (出張する)', masu: 'しゅっちょうします', te: 'しゅっちょうして', nai: 'しゅっちょうしない', ta: 'しゅっちょうした', meaning: 'go on business trip', group: 'III', lesson: 17 },
  { dictionary: 'しょうかいする (紹介する)', masu: 'しょうかいします', te: 'しょうかいして', nai: 'しょうかいしない', ta: 'しょうかいした', meaning: 'introduce', group: 'III', lesson: 24 },
  { dictionary: 'しょくじする (食事する)', masu: 'しょくじします', te: 'しょくじして', nai: 'しょくじしない', ta: 'しょくじした', meaning: 'have a meal', group: 'III', lesson: 13 },
  { dictionary: 'しんぱいする (心配する)', masu: 'しんぱいします', te: 'しんぱいして', nai: 'しんぱいしない', ta: 'しんぱいした', meaning: 'worry', group: 'III', lesson: 17 },
  { dictionary: 'そうじする (掃除する)', masu: 'そうじします', te: 'そうじして', nai: 'そうじしない', ta: 'そうじした', meaning: 'clean a room', group: 'III', lesson: 19 },
  { dictionary: 'つれてくる (連れて来る)', masu: 'つれてきます', te: 'つれてきて', nai: 'つれてこない', ta: 'つれてきた', meaning: 'bring someone', group: 'III', lesson: 24 },
  { dictionary: 'でんわする (電話する)', masu: 'でんわします', te: 'でんわして', nai: 'でんわしない', ta: 'でんわした', meaning: 'call, phone', group: 'III', lesson: 20 },
  { dictionary: 'ひっこしする (引っ越しする)', masu: 'ひっこしします', te: 'ひっこしして', nai: 'ひっこししない', ta: 'ひっこしした', meaning: 'move house', group: 'III', lesson: 23 },
  { dictionary: 'もってくる (持って来る)', masu: 'もってきます', te: 'もってきて', nai: 'もってこない', ta: 'もってきた', meaning: 'bring something', group: 'III', lesson: 17 },
  { dictionary: 'よやくする (予約する)', masu: 'よやくします', te: 'よやくして', nai: 'よやくしない', ta: 'よやくした', meaning: 'reserve, book', group: 'III', lesson: 18 },
  { dictionary: 'りゅうがくする (留学する)', masu: 'りゅうがくします', te: 'りゅうがくして', nai: 'りゅうがくしない', ta: 'りゅうがくした', meaning: 'study abroad', group: 'III', lesson: 25 },
  { dictionary: 'れんしゅうする (練習する)', masu: 'れんしゅうします', te: 'れんしゅうして', nai: 'れんしゅうしない', ta: 'れんしゅうした', meaning: 'practice', group: 'III', lesson: 19 }
];
