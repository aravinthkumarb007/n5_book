import { MinnaLesson } from '@/types/minna';

export const MINNA_LESSONS_1_TO_5: MinnaLesson[] = [
  // =========================================================================
  // LESSON 1: Self-Introductions, Nationalities, Occupations
  // =========================================================================
  {
    id: 1,
    lessonNumber: 1,
    level: 'N5',
    title: 'Lesson 1: Self-Introductions & Nationalities',
    titleJapanese: '第１課：自己紹介・国籍・職業',
    theme: 'わたし、〜さん、〜です、〜じゃありません',
    description: 'Learn foundational Japanese sentence structures: equating topics with nouns, negative copula, question particles, and introductions.',
    keyPhrases: [
      'わたしは [Name] です。 (I am [Name].)',
      '〜じゃありません。 (is not / am not)',
      '〜ですか。 (Question particle)',
      '〜も 〜です。 (also / too)'
    ],
    vocabulary: [
      { id: 'l1_v1', lessonNumber: 1, kanji: '私', hiragana: 'わたし', romaji: 'watashi', english: 'I, me', partOfSpeech: 'pronoun', category: 'Pronouns', exampleSentence: { japanese: '私は学生です。', hiragana: 'わたしは がくせいです。', romaji: 'Watashi wa gakusei desu.', english: 'I am a student.' } },
      { id: 'l1_v2', lessonNumber: 1, kanji: 'あなた', hiragana: 'あなた', romaji: 'anata', english: 'you', partOfSpeech: 'pronoun', category: 'Pronouns', exampleSentence: { japanese: 'あなたは先生ですか。', hiragana: 'あなたは せんせいですか。', romaji: 'Anata wa sensei desu ka.', english: 'Are you a teacher?' } },
      { id: 'l1_v3', lessonNumber: 1, kanji: 'あの人', hiragana: 'あのひと', romaji: 'ano hito', english: 'that person', partOfSpeech: 'pronoun', category: 'People', exampleSentence: { japanese: 'あの人は誰ですか。', hiragana: 'あのひとは だれですか。', romaji: 'Ano hito wa dare desu ka.', english: 'Who is that person?' } },
      { id: 'l1_v4', lessonNumber: 1, kanji: 'あの方', hiragana: 'あのかた', romaji: 'ano kata', english: 'that person (polite)', partOfSpeech: 'pronoun', category: 'People', exampleSentence: { japanese: 'あの方はミラーさんです。', hiragana: 'あのかたは みらーさんです。', romaji: 'Ano kata wa Miraa-san desu.', english: 'That person (polite) is Mr. Miller.' } },
      { id: 'l1_v5', lessonNumber: 1, kanji: '先生', hiragana: 'せんせい', romaji: 'sensei', english: 'teacher, instructor', partOfSpeech: 'noun', category: 'Occupations', exampleSentence: { japanese: '田中先生は日本人です。', hiragana: 'たなかせんせいは にほんじんです。', romaji: 'Tanaka-sensei wa nihonjin desu.', english: 'Teacher Tanaka is Japanese.' } },
      { id: 'l1_v6', lessonNumber: 1, kanji: '教師', hiragana: 'きょうし', romaji: 'kyoushi', english: 'teacher (one\'s own occupation)', partOfSpeech: 'noun', category: 'Occupations', exampleSentence: { japanese: '私は教師です。', hiragana: 'わたしは きょうしです。', romaji: 'Watashi wa kyoushi desu.', english: 'I am a school teacher.' } },
      { id: 'l1_v7', lessonNumber: 1, kanji: '学生', hiragana: 'がくせい', romaji: 'gakusei', english: 'student', partOfSpeech: 'noun', category: 'Occupations', exampleSentence: { japanese: 'マイクさんは学生です。', hiragana: 'まいくさんは がくせいです。', romaji: 'Maiku-san wa gakusei desu.', english: 'Mike is a student.' } },
      { id: 'l1_v8', lessonNumber: 1, kanji: '会社員', hiragana: 'かいしゃいん', romaji: 'kaishain', english: 'company employee', partOfSpeech: 'noun', category: 'Occupations', exampleSentence: { japanese: 'ミラーさんは会社員です。', hiragana: 'みらーさんは かいしゃいんです。', romaji: 'Miraa-san wa kaishain desu.', english: 'Mr. Miller is a company employee.' } },
      { id: 'l1_v9', lessonNumber: 1, kanji: '社員', hiragana: 'しゃいん', romaji: 'shain', english: 'employee of ~ company', partOfSpeech: 'noun', category: 'Occupations', exampleSentence: { japanese: 'IMCの社員です。', hiragana: 'あいえむしーの しゃいんです。', romaji: 'IMC no shain desu.', english: 'I am an employee of IMC.' } },
      { id: 'l1_v10', lessonNumber: 1, kanji: '銀行員', hiragana: 'ぎんこういん', romaji: 'ginkouin', english: 'bank employee', partOfSpeech: 'noun', category: 'Occupations', exampleSentence: { japanese: '山田さんは銀行員です。', hiragana: 'やまださんは ぎんこういんです。', romaji: 'Yamada-san wa ginkouin desu.', english: 'Mr. Yamada is a bank employee.' } },
      { id: 'l1_v11', lessonNumber: 1, kanji: '医者', hiragana: 'いしゃ', romaji: 'isha', english: 'medical doctor', partOfSpeech: 'noun', category: 'Occupations', exampleSentence: { japanese: '父は医者です。', hiragana: 'ちは いしゃです。', romaji: 'Chichi wa isha desu.', english: 'My father is a doctor.' } },
      { id: 'l1_v12', lessonNumber: 1, kanji: '研究者', hiragana: 'けんきゅうしゃ', romaji: 'kenkyuusha', english: 'researcher, scholar', partOfSpeech: 'noun', category: 'Occupations', exampleSentence: { japanese: 'ワンさんは研究者です。', hiragana: 'わんさんは けんきゅうしゃです。', romaji: 'Wan-san wa kenkyuusha desu.', english: 'Mr. Wang is a researcher.' } },
      { id: 'l1_v13', lessonNumber: 1, kanji: '大学', hiragana: 'だいがく', romaji: 'daigaku', english: 'university, college', partOfSpeech: 'noun', category: 'Places', exampleSentence: { japanese: 'さくら大学の学生です。', hiragana: 'さくらだいがくの がくせいです。', romaji: 'Sakura daigaku no gakusei desu.', english: 'I am a student of Sakura University.' } },
      { id: 'l1_v14', lessonNumber: 1, kanji: '病院', hiragana: 'びょういん', romaji: 'byouin', english: 'hospital', partOfSpeech: 'noun', category: 'Places', exampleSentence: { japanese: '神戸病院の医者です。', hiragana: 'こうべびょういんの いしゃです。', romaji: 'Koube byouin no isha desu.', english: 'He is a doctor at Kobe Hospital.' } },
      { id: 'l1_v15', lessonNumber: 1, kanji: '誰', hiragana: 'だれ', romaji: 'dare', english: 'who', partOfSpeech: 'pronoun', category: 'Question Words', exampleSentence: { japanese: 'あの方は誰ですか。', hiragana: 'あのかたは だれですか。', romaji: 'Ano kata wa dare desu ka.', english: 'Who is that person?' } },
      { id: 'l1_v16', lessonNumber: 1, kanji: '何歳', hiragana: 'なんさい', romaji: 'nansai', english: 'how old', partOfSpeech: 'phrase', category: 'Question Words', exampleSentence: { japanese: 'テレサちゃんは何歳ですか。', hiragana: 'てれさちゃんは なんさいですか。', romaji: 'Teresa-chan wa nansai desu ka.', english: 'How old is Teresa?' } },
      { id: 'l1_v17', lessonNumber: 1, kanji: '日本', hiragana: 'にほん', romaji: 'nihon', english: 'Japan', partOfSpeech: 'noun', category: 'Countries', exampleSentence: { japanese: '日本へ来ました。', hiragana: 'にほんへ きました。', romaji: 'Nihon e kimashita.', english: 'I came to Japan.' } },
      { id: 'l1_v18', lessonNumber: 1, kanji: 'アメリカ', hiragana: 'あめりか', romaji: 'amerika', english: 'USA, America', partOfSpeech: 'noun', category: 'Countries', exampleSentence: { japanese: 'ミラーさんはアメリカ人です。', hiragana: 'みらーさんは あめりかじんです。', romaji: 'Miraa-san wa amerika-jin desu.', english: 'Mr. Miller is an American.' } },
      { id: 'l1_v19', lessonNumber: 1, kanji: '初めまして', hiragana: 'はじめまして', romaji: 'hajimemashite', english: 'How do you do? / Nice to meet you', partOfSpeech: 'phrase', category: 'Greetings', exampleSentence: { japanese: '初めまして、マイク・ミラーです。', hiragana: 'はじめまして、まいく・みらーです。', romaji: 'Hajimemashite, Maiku Miraa desu.', english: 'Nice to meet you, I am Mike Miller.' } },
      { id: 'l1_v20', lessonNumber: 1, kanji: 'どうぞよろしくお願いします', hiragana: 'どうぞよろしくおねがいします', romaji: 'douzo yoroshiku onegaishimasu', english: 'Pleased to meet you / Looking forward to working with you', partOfSpeech: 'phrase', category: 'Greetings', exampleSentence: { japanese: 'どうぞよろしくお願いします。', hiragana: 'どうぞよろしくおねがいします。', romaji: 'Douzo yoroshiku onegaishimasu.', english: 'Pleased to meet you.' } }
    ],
    grammar: [
      {
        id: 'l1_g1',
        lessonNumber: 1,
        title: 'N1 は N2 です (N1 is N2)',
        structure: 'Noun 1 [Topic] + は (pronounced "wa") + Noun 2 [Attribute/Predicate] + です',
        explanation: 'Particle は indicates that Noun 1 is the topic of the sentence. です functions as the polite affirmative copula (is, am, are).',
        rules: [
          'は is written with the hiragana character "ha" but always pronounced "wa" when used as a grammatical particle.',
          'です indicates polite affirmation and completes the predicate.'
        ],
        examples: [
          { japanese: '私はマイク・ミラーです。', hiragana: 'わたしは まいく・みらーです。', romaji: 'Watashi wa Maiku Miraa desu.', english: 'I am Mike Miller.' },
          { japanese: 'ミラーさんはアメリカ人です。', hiragana: 'みらーさんは あめりかじんです。', romaji: 'Miraa-san wa amerika-jin desu.', english: 'Mr. Miller is American.' }
        ]
      },
      {
        id: 'l1_g2',
        lessonNumber: 1,
        title: 'N1 は N2 じゃありません (N1 is not N2)',
        structure: 'Noun 1 + は + Noun 2 + じゃありません / ではありません',
        explanation: 'じゃありません is the polite negative of です. In formal writing and formal speech, ではありません is commonly used.',
        rules: [
          'じゃありません is conversational polite speech.',
          'ではありません is slightly more formal and often preferred in official correspondence.'
        ],
        examples: [
          { japanese: 'サントスさんは学生じゃありません。', hiragana: 'さんとすさんは がくせいじゃありません。', romaji: 'Santosu-san wa gakusei ja arimasen.', english: 'Mr. Santos is not a student.' },
          { japanese: '私は医者ではありません。', hiragana: 'わたしは いしゃではありません。', romaji: 'Watashi wa isha dewa arimasen.', english: 'I am not a doctor.' }
        ]
      },
      {
        id: 'l1_g3',
        lessonNumber: 1,
        title: '〜ですか (Question Particle)',
        structure: 'Sentence + か',
        explanation: 'The particle か placed at the end of a sentence turns it into a question. In Japanese, no question mark is strictly needed, though modern text often includes one.',
        rules: [
          'Answer "Yes" with: はい、〜です。',
          'Answer "No" with: いいえ、〜じゃありません。'
        ],
        examples: [
          { japanese: 'ミラーさんは会社員ですか。', hiragana: 'みらーさんは かいしゃいんですか。', romaji: 'Miraa-san wa kaishain desu ka.', english: 'Is Mr. Miller a company employee?' },
          { japanese: 'はい、会社員です。', hiragana: 'はい、かいしゃいんです。', romaji: 'Hai, kaishain desu.', english: 'Yes, he is a company employee.' },
          { japanese: 'いいえ、会社員じゃありません。', hiragana: 'いいえ、かいしゃいんじゃありません。', romaji: 'Iie, kaishain ja arimasen.', english: 'No, he is not a company employee.' }
        ]
      },
      {
        id: 'l1_g4',
        lessonNumber: 1,
        title: 'N も (Also / Too)',
        structure: 'Noun + も',
        explanation: 'Particle も replaces は when a statement applies to another subject as well, translating to "also" or "too".',
        rules: [
          'Do NOT use は and も together (never say "はも").',
          'も directly replaces は or が.'
        ],
        examples: [
          { japanese: 'ミラーさんはアメリカ人です。スミスさんもアメリカ人です。', hiragana: 'みらーさんは あめりかじんです。すみすさんも あめりかじんです。', romaji: 'Miraa-san wa amerika-jin desu. Sumisu-san mo amerika-jin desu.', english: 'Mr. Miller is American. Mr. Smith is also American.' }
        ]
      },
      {
        id: 'l1_g5',
        lessonNumber: 1,
        title: 'N1 の N2 (Possessive / Modifier)',
        structure: 'Noun 1 + の + Noun 2',
        explanation: 'Particle の connects two nouns. Noun 1 modifies, specifies, or owns Noun 2.',
        rules: [
          'Translates as possessive (\'s) or specifies affiliation (e.g., IMC company employee).',
          'Order is always Modifier/Owner の Thing/Affiliation.'
        ],
        examples: [
          { japanese: 'ミラーさんはIMCの社員です。', hiragana: 'みらーさんは あいえむしーの しゃいんです。', romaji: 'Miraa-san wa IMC no shain desu.', english: 'Mr. Miller is an employee of IMC.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l1_ex1',
        lessonNumber: 1,
        type: 'mcq',
        category: 'grammar',
        prompt: 'Choose the correct particle: わたし [ ? ] マイク・ミラーです。',
        options: ['は', 'が', 'の', 'も'],
        correctAnswer: 'は',
        explanation: 'Particle は indicates the topic of the sentence ("As for me...").'
      },
      {
        id: 'l1_ex2',
        lessonNumber: 1,
        type: 'fill_blank',
        category: 'grammar',
        prompt: 'Fill in the blank with the negative form: 山田さんは学生 [ ? ]。',
        options: ['じゃありません', 'でした', 'です', 'あります'],
        correctAnswer: 'じゃありません',
        explanation: 'じゃありません is the polite negative copula ("is not").'
      },
      {
        id: 'l1_ex3',
        lessonNumber: 1,
        type: 'sentence_formation',
        category: 'grammar',
        prompt: 'Form the sentence: "Mr. Miller is an employee of IMC."',
        wordTiles: ['ミラーさんは', 'IMCの', '社員', 'です'],
        correctAnswer: 'ミラーさんは IMCの 社員 です',
        explanation: 'Topic (ミラーさんは) + Affiliation (IMCの) + Position (社員) + Copula (です).'
      },
      {
        id: 'l1_ex4',
        lessonNumber: 1,
        type: 'matching',
        category: 'vocabulary',
        prompt: 'Match occupations with their meanings',
        options: ['医者 = Doctor', '銀行員 = Bank employee', '先生 = Teacher', '研究者 = Researcher'],
        correctAnswer: '医者 = Doctor',
        explanation: '医者 (いしゃ) means medical doctor.'
      }
    ],
    dialogue: {
      title: '初めまして (Nice to Meet You)',
      situation: 'Mike Miller introduces himself to Mr. Sato at a company orientation.',
      lines: [
        { speaker: 'ミラー', japanese: '初めまして。マイク・ミラーです。アメリカから来ました。どうぞよろしくお願いします。', hiragana: 'はじめまして。まいく・みらーです。あめりかから きました。どうぞよろしくおねがいします。', english: 'How do you do? I am Mike Miller. I came from America. Pleased to meet you.' },
        { speaker: '佐藤', japanese: '佐藤けい子です。どうぞよろしくお願いします。', hiragana: 'さとう けいこです。どうぞよろしくおねがいします。', english: 'I am Keiko Sato. Pleased to meet you too.' }
      ]
    }
  },

  // =========================================================================
  // LESSON 2: Demonstratives for Things (これ、それ、あれ、この、その、あの)
  // =========================================================================
  {
    id: 2,
    lessonNumber: 2,
    level: 'N5',
    title: 'Lesson 2: Demonstratives for Things & Possessions',
    titleJapanese: '第２課：指示詞（これ・それ・あれ・この・その・あの）',
    theme: 'これ、それ、あれ、本、辞書、〜の〜',
    description: 'Master Japanese spatial demonstratives: things close to speaker (これ), listener (それ), or far from both (あれ), and noun qualifiers (この、その、あの).',
    keyPhrases: [
      'これは [Noun] です。 (This is [Noun].)',
      'それは何ですか。 (What is that?)',
      'この本は 私の です。 (This book is mine.)',
      'そうです / そうじゃありません。 (That is right / wrong.)'
    ],
    vocabulary: [
      { id: 'l2_v1', lessonNumber: 2, kanji: 'これ', hiragana: 'これ', romaji: 'kore', english: 'this (thing here near speaker)', partOfSpeech: 'pronoun', category: 'Demonstratives', exampleSentence: { japanese: 'これは辞書です。', hiragana: 'これは じしょです。', romaji: 'Kore wa jisho desu.', english: 'This is a dictionary.' } },
      { id: 'l2_v2', lessonNumber: 2, kanji: 'それ', hiragana: 'それ', romaji: 'sore', english: 'that (thing near listener)', partOfSpeech: 'pronoun', category: 'Demonstratives', exampleSentence: { japanese: 'それは傘ですか。', hiragana: 'それは かさですか。', romaji: 'Sore wa kasa desu ka.', english: 'Is that an umbrella?' } },
      { id: 'l2_v3', lessonNumber: 2, kanji: 'あれ', hiragana: 'あれ', romaji: 'are', english: 'that (thing far from both speaker and listener)', partOfSpeech: 'pronoun', category: 'Demonstratives', exampleSentence: { japanese: 'あれは私の車です。', hiragana: 'あれは わたしのくるまです。', romaji: 'Are wa watashi no kuruma desu.', english: 'That over there is my car.' } },
      { id: 'l2_v4', lessonNumber: 2, kanji: 'この', hiragana: 'この', romaji: 'kono', english: 'this ~ (must be followed by noun)', partOfSpeech: 'pronoun', category: 'Demonstratives', exampleSentence: { japanese: 'この本は面白いです。', hiragana: 'このほんは おもしろいです。', romaji: 'Kono hon wa omoshiroi desu.', english: 'This book is interesting.' } },
      { id: 'l2_v5', lessonNumber: 2, kanji: 'その', hiragana: 'その', romaji: 'sono', english: 'that ~ (near listener, followed by noun)', partOfSpeech: 'pronoun', category: 'Demonstratives', exampleSentence: { japanese: 'その鍵は誰のですか。', hiragana: 'そのかぎは だれのですか。', romaji: 'Sono kagi wa dare no desu ka.', english: 'Whose key is that?' } },
      { id: 'l2_v6', lessonNumber: 2, kanji: 'あの', hiragana: 'あの', romaji: 'ano', english: 'that ~ (far from both, followed by noun)', partOfSpeech: 'pronoun', category: 'Demonstratives', exampleSentence: { japanese: 'あの時計は高そうです。', hiragana: 'あのとけいは たかそうです。', romaji: 'Ano tokei wa taka sou desu.', english: 'That watch over there looks expensive.' } },
      { id: 'l2_v7', lessonNumber: 2, kanji: '本', hiragana: 'ほん', romaji: 'hon', english: 'book', partOfSpeech: 'noun', category: 'Objects', exampleSentence: { japanese: '日本語の本です。', hiragana: 'にほんごの ほんです。', romaji: 'Nihongo no hon desu.', english: 'It is a Japanese book.' } },
      { id: 'l2_v8', lessonNumber: 2, kanji: '辞書', hiragana: 'じしょ', romaji: 'jisho', english: 'dictionary', partOfSpeech: 'noun', category: 'Objects', exampleSentence: { japanese: '電子辞書を買いました。', hiragana: 'でんしじしょを かいました。', romaji: 'Denshi jisho o kaimashita.', english: 'I bought an electronic dictionary.' } },
      { id: 'l2_v9', lessonNumber: 2, kanji: '雑誌', hiragana: 'ざっし', romaji: 'zasshi', english: 'magazine', partOfSpeech: 'noun', category: 'Objects', exampleSentence: { japanese: '車の雑誌です。', hiragana: 'くるまの ざっしです。', romaji: 'Kuruma no zasshi desu.', english: 'It is a car magazine.' } },
      { id: 'l2_v10', lessonNumber: 2, kanji: '新聞', hiragana: 'しんぶん', romaji: 'shinbun', english: 'newspaper', partOfSpeech: 'noun', category: 'Objects', exampleSentence: { japanese: '日本の新聞を読みます。', hiragana: 'にほんの しんぶんを よみます。', romaji: 'Nihon no shinbun o yomimasu.', english: 'I read Japanese newspapers.' } },
      { id: 'l2_v11', lessonNumber: 2, kanji: '手帳', hiragana: 'てちょう', romaji: 'techou', english: 'pocket notebook, personal planner', partOfSpeech: 'noun', category: 'Objects', exampleSentence: { japanese: 'これは私の手帳です。', hiragana: 'これは わたしのてちょうです。', romaji: 'Kore wa watashi no techou desu.', english: 'This is my personal planner.' } },
      { id: 'l2_v12', lessonNumber: 2, kanji: '名刺', hiragana: 'めいし', romaji: 'meishi', english: 'business card', partOfSpeech: 'noun', category: 'Objects', exampleSentence: { japanese: '名刺を交換します。', hiragana: 'めいしを こうかんします。', romaji: 'Meishi o koukan shimasu.', english: 'We exchange business cards.' } },
      { id: 'l2_v13', lessonNumber: 2, kanji: '時計', hiragana: 'とけい', romaji: 'tokei', english: 'clock, watch', partOfSpeech: 'noun', category: 'Objects', exampleSentence: { japanese: 'これはスイスの時計です。', hiragana: 'これは すいすの とけいです。', romaji: 'Kore wa Suisu no tokei desu.', english: 'This is a Swiss watch.' } },
      { id: 'l2_v14', lessonNumber: 2, kanji: '傘', hiragana: 'かさ', romaji: 'kasa', english: 'umbrella', partOfSpeech: 'noun', category: 'Objects', exampleSentence: { japanese: 'この傘は誰のですか。', hiragana: 'このかさは だれのですか。', romaji: 'Kono kasa wa dare no desu ka.', english: 'Whose umbrella is this?' } },
      { id: 'l2_v15', lessonNumber: 2, kanji: '鞄', hiragana: 'かばん', romaji: 'kaban', english: 'bag, briefcase', partOfSpeech: 'noun', category: 'Objects', exampleSentence: { japanese: '黒い鞄を持っています。', hiragana: 'くろいかばんを もっています。', romaji: 'Kuroi kaban o motte imasu.', english: 'I have a black bag.' } },
      { id: 'l2_v16', lessonNumber: 2, kanji: '鍵', hiragana: 'かぎ', romaji: 'kagi', english: 'key', partOfSpeech: 'noun', category: 'Objects', exampleSentence: { japanese: '車の鍵を忘れました。', hiragana: 'くるまのかぎを わすれました。', romaji: 'Kuruma no kagi o wasuremashita.', english: 'I forgot my car keys.' } },
      { id: 'l2_v17', lessonNumber: 2, kanji: '何', hiragana: 'なん / なに', romaji: 'nan / nani', english: 'what', partOfSpeech: 'pronoun', category: 'Question Words', exampleSentence: { japanese: 'それは何ですか。', hiragana: 'それは なんですか。', romaji: 'Sore wa nan desu ka.', english: 'What is that?' } },
      { id: 'l2_v18', lessonNumber: 2, kanji: 'そうです', hiragana: 'そうです', romaji: 'sou desu', english: 'That is right / Yes, it is', partOfSpeech: 'phrase', category: 'Responses', exampleSentence: { japanese: 'はい、そうです。', hiragana: 'はい、そうです。', romaji: 'Hai, sou desu.', english: 'Yes, that is right.' } },
      { id: 'l2_v19', lessonNumber: 2, kanji: '違います', hiragana: 'ちがいます', romaji: 'chigaimasu', english: 'No, it isn\'t / You are mistaken', partOfSpeech: 'verb-1', category: 'Responses', exampleSentence: { japanese: 'いいえ、違います。', hiragana: 'いいえ、ちがいます。', romaji: 'Iie, chigaimasu.', english: 'No, that is incorrect.' } },
      { id: 'l2_v20', lessonNumber: 2, kanji: 'どうぞ', hiragana: 'どうぞ', romaji: 'douzo', english: 'Please / Here you are', partOfSpeech: 'adverb', category: 'Etiquette', exampleSentence: { japanese: 'お茶をどうぞ。', hiragana: 'おちゃを どうぞ。', romaji: 'Ocha o douzo.', english: 'Please have some tea.' } }
    ],
    grammar: [
      {
        id: 'l2_g1',
        lessonNumber: 2,
        title: 'これ / それ / あれ (Demonstrative Pronouns)',
        structure: 'これ / それ / あれ + は + Noun + です',
        explanation: 'これ refers to things near the speaker. それ refers to things near the listener. あれ refers to things far from both.',
        rules: [
          'These stand alone as nouns (cannot be immediately followed by a noun without の).',
          'Question form: これ / それ / あれ は 何ですか。'
        ],
        examples: [
          { japanese: 'これは辞書です。', hiragana: 'これは じしょです。', romaji: 'Kore wa jisho desu.', english: 'This is a dictionary.' },
          { japanese: 'それは何ですか。', hiragana: 'それは なんですか。', romaji: 'Sore wa nan desu ka.', english: 'What is that?' },
          { japanese: 'あれは私の傘です。', hiragana: 'あれは わたしの かさです。', romaji: 'Are wa watashi no kasa desu.', english: 'That over there is my umbrella.' }
        ]
      },
      {
        id: 'l2_g2',
        lessonNumber: 2,
        title: 'この N / その N / あの N (Demonstrative Modifiers)',
        structure: 'この / その / あの + Noun + は ...',
        explanation: 'この, その, あの MUST always be followed immediately by a noun.',
        rules: [
          'この本 = "this book"',
          'その傘 = "that umbrella (near you)"',
          'あの人 = "that person (over there)"'
        ],
        examples: [
          { japanese: 'この本は私のです。', hiragana: 'このほんは わたしのです。', romaji: 'Kono hon wa watashi no desu.', english: 'This book is mine.' }
        ]
      },
      {
        id: 'l2_g3',
        lessonNumber: 2,
        title: 'そうです / そうじゃありません (Affirming/Denying Identifications)',
        structure: 'はい、そうです。 / いいえ、そうじゃありません (or 違います)。',
        explanation: 'Used when confirming a noun identification question (e.g. "Is this a dictionary?").',
        rules: [
          'For noun questions, reply with "はい、そうです" or "いいえ、違います".',
          'Do not use そうです for verb action questions.'
        ],
        examples: [
          { japanese: 'それはテレホンカードですか。― はい、そうです。', hiragana: 'それは てれほんかーどですか。― はい、そうです。', romaji: 'Sore wa terehonkaado desu ka. ― Hai, sou desu.', english: 'Is that a telephone card? ― Yes, it is.' }
        ]
      },
      {
        id: 'l2_g4',
        lessonNumber: 2,
        title: '〜か、〜か (Alternative Questions)',
        structure: 'Sentence 1 か、Sentence 2 か',
        explanation: 'Asks the listener to choose between two alternatives. Do not answer with はい or いいえ; state the chosen alternative directly.',
        rules: [
          'Do not answer with はい or いいえ.',
          'State the correct alternative.'
        ],
        examples: [
          { japanese: 'これは「9」ですか、「7」ですか。―「9」です。', hiragana: 'これは「きゅう」ですか、「なな」ですか。―「きゅう」です。', romaji: 'Kore wa "kyuu" desu ka, "nana" desu ka. ― "Kyuu" desu.', english: 'Is this a "9" or a "7"? ― It\'s a "9".' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l2_ex1',
        lessonNumber: 2,
        type: 'mcq',
        category: 'grammar',
        prompt: 'Point to a watch on the listener\'s wrist. Which word should you use?',
        options: ['それ', 'これ', 'あれ', 'どれ'],
        correctAnswer: 'それ',
        explanation: 'それ refers to objects in the listener\'s physical domain.'
      },
      {
        id: 'l2_ex2',
        lessonNumber: 2,
        type: 'fill_blank',
        category: 'grammar',
        prompt: '[ ? ] 傘は山田さんのですか。 (Fill with modifier for "this")',
        options: ['この', 'これ', 'ここ', 'その'],
        correctAnswer: 'この',
        explanation: 'この directly modifies the following noun 傘 (kasa).'
      },
      {
        id: 'l2_ex3',
        lessonNumber: 2,
        type: 'sentence_formation',
        category: 'grammar',
        prompt: 'Form the sentence: "Whose book is that?"',
        wordTiles: ['それは', '誰の', '本', 'ですか'],
        correctAnswer: 'それは 誰の 本 ですか',
        explanation: 'それは + 誰の (whose) + 本 (book) + ですか (is it?).'
      }
    ],
    dialogue: {
      title: 'ほんの気持ちです (A Small Token)',
      situation: 'Mr. Miller moves into his new apartment and greets his Japanese neighbor Mr. Yamada with a small welcome gift.',
      lines: [
        { speaker: 'ミラー', japanese: 'あのう、これ、ほんの気持ちです。コーヒーです。どうぞ。', hiragana: 'あのう、これ、ほんのきもちです。こーひーです。どうぞ。', english: 'Um, this is just a small token of my appreciation. It is coffee. Here you are.' },
        { speaker: '山田', japanese: 'どうもありがとうございます。', hiragana: 'どうもありがとうございます。', english: 'Thank you very much.' }
      ]
    }
  },

  // =========================================================================
  // LESSON 3: Places, Locations, Directions & Prices
  // =========================================================================
  {
    id: 3,
    lessonNumber: 3,
    level: 'N5',
    title: 'Lesson 3: Places, Locations, Directions & Prices',
    titleJapanese: '第３課：場所・位置・方角・値段（ここ・そこ・あそこ・どこ）',
    theme: 'ここ、そこ、あそこ、受付、事務所、いくら',
    description: 'Learn location demonstratives (ここ、そこ、あそこ、どこ), polite directions (こちら、そちら、あちら、どちら), asking for prices (いくら), and origins of products.',
    keyPhrases: [
      'ここは [Place] です。 (Here is [Place].)',
      'お手洗いは どこですか。 (Where is the restroom?)',
      'これは どこの [Product] ですか。 (Where is this product made?)',
      'これは いくらですか。 (How much is this?)'
    ],
    vocabulary: [
      { id: 'l3_v1', lessonNumber: 3, kanji: 'ここ', hiragana: 'ここ', romaji: 'koko', english: 'here, this place', partOfSpeech: 'pronoun', category: 'Locations', exampleSentence: { japanese: 'ここは教室です。', hiragana: 'ここは きょうしつです。', romaji: 'Koko wa kyoushitsu desu.', english: 'Here is the classroom.' } },
      { id: 'l3_v2', lessonNumber: 3, kanji: 'そこ', hiragana: 'そこ', romaji: 'soko', english: 'there, that place near you', partOfSpeech: 'pronoun', category: 'Locations', exampleSentence: { japanese: 'そこは事務所です。', hiragana: 'そこは じむしょです。', romaji: 'Soko wa jimusho desu.', english: 'There is the office.' } },
      { id: 'l3_v3', lessonNumber: 3, kanji: 'あそこ', hiragana: 'あそこ', romaji: 'asoko', english: 'that place over there', partOfSpeech: 'pronoun', category: 'Locations', exampleSentence: { japanese: 'あそこは食堂です。', hiragana: 'あそこは しょくどうです。', romaji: 'Asoko wa shokudou desu.', english: 'Over there is the cafeteria.' } },
      { id: 'l3_v4', lessonNumber: 3, kanji: 'どこ', hiragana: 'どこ', romaji: 'doko', english: 'where, what place', partOfSpeech: 'pronoun', category: 'Question Words', exampleSentence: { japanese: 'お手洗いはどこですか。', hiragana: 'おてあらいは どこですか。', romaji: 'Otearai wa doko desu ka.', english: 'Where is the restroom?' } },
      { id: 'l3_v5', lessonNumber: 3, kanji: 'こちら', hiragana: 'こちら', romaji: 'kochira', english: 'this way, this direction (polite koko)', partOfSpeech: 'pronoun', category: 'Directions', exampleSentence: { japanese: '電話はこちらです。', hiragana: 'でんわは こちらです。', romaji: 'Denwa wa kochira desu.', english: 'The telephone is this way.' } },
      { id: 'l3_v6', lessonNumber: 3, kanji: 'そちら', hiragana: 'そちら', romaji: 'sochira', english: 'that way, that direction (polite soko)', partOfSpeech: 'pronoun', category: 'Directions', exampleSentence: { japanese: 'そちらは受付です。', hiragana: 'そちらは うけつけです。', romaji: 'Sochira wa uketsuke desu.', english: 'That way is the reception desk.' } },
      { id: 'l3_v7', lessonNumber: 3, kanji: 'あちら', hiragana: 'あちら', romaji: 'achira', english: 'that way over there (polite asoko)', partOfSpeech: 'pronoun', category: 'Directions', exampleSentence: { japanese: 'あちらはエレベーターです。', hiragana: 'あちらは えれべーたーです。', romaji: 'Achira wa erebeetaa desu.', english: 'That way is the elevator.' } },
      { id: 'l3_v8', lessonNumber: 3, kanji: 'どちら', hiragana: 'どちら', romaji: 'dochira', english: 'which way, where (polite doko)', partOfSpeech: 'pronoun', category: 'Question Words', exampleSentence: { japanese: 'お国はどちらですか。', hiragana: 'おくには どちらですか。', romaji: 'Okuni wa dochira desu ka.', english: 'Where are you from? (Which country?)' } },
      { id: 'l3_v9', lessonNumber: 3, kanji: '教室', hiragana: 'きょうしつ', romaji: 'kyoushitsu', english: 'classroom', partOfSpeech: 'noun', category: 'Places', exampleSentence: { japanese: '教室は二階です。', hiragana: 'きょうしつは にかいです。', romaji: 'Kyoushitsu wa nikai desu.', english: 'The classroom is on the second floor.' } },
      { id: 'l3_v10', lessonNumber: 3, kanji: '食堂', hiragana: 'しょくどう', romaji: 'shokudou', english: 'cafeteria, dining hall', partOfSpeech: 'noun', category: 'Places', exampleSentence: { japanese: '食堂で昼ご飯を食べます。', hiragana: 'しょくどうで ひるごはんを たべます。', romaji: 'Shokudou de hirugohan o tabemasu.', english: 'I eat lunch in the cafeteria.' } },
      { id: 'l3_v11', lessonNumber: 3, kanji: '事務所', hiragana: 'じむしょ', romaji: 'jimusho', english: 'office', partOfSpeech: 'noun', category: 'Places', exampleSentence: { japanese: '事務所はあそこです。', hiragana: 'じむしょは あそこです。', romaji: 'Jimusho wa asoko desu.', english: 'The office is over there.' } },
      { id: 'l3_v12', lessonNumber: 3, kanji: '会議室', hiragana: 'かいぎしつ', romaji: 'kaigishitsu', english: 'conference room, meeting room', partOfSpeech: 'noun', category: 'Places', exampleSentence: { japanese: '会議室は三階です。', hiragana: 'かいぎしつは さんがいです。', romaji: 'Kaigishitsu wa sangai desu.', english: 'The conference room is on the third floor.' } },
      { id: 'l3_v13', lessonNumber: 3, kanji: '受付', hiragana: 'うけつけ', romaji: 'uketsuke', english: 'reception desk, information desk', partOfSpeech: 'noun', category: 'Places', exampleSentence: { japanese: '受付で聞きます。', hiragana: 'うけつけで ききます。', romaji: 'Uketsuke de kikimasu.', english: 'I will ask at the reception.' } },
      { id: 'l3_v14', lessonNumber: 3, kanji: '部屋', hiragana: 'へや', romaji: 'heya', english: 'room', partOfSpeech: 'noun', category: 'Places', exampleSentence: { japanese: '私の部屋はここです。', hiragana: 'わたしのへやは ここです。', romaji: 'Watashi no heya wa koko desu.', english: 'My room is here.' } },
      { id: 'l3_v15', lessonNumber: 3, kanji: 'お手洗い', hiragana: 'おてあらい', romaji: 'otearai', english: 'restroom, toilet', partOfSpeech: 'noun', category: 'Places', exampleSentence: { japanese: 'お手洗いは地下です。', hiragana: 'おてあらいは ちかです。', romaji: 'Otearai wa chika desu.', english: 'The restroom is in the basement.' } },
      { id: 'l3_v16', lessonNumber: 3, kanji: '階段', hiragana: 'かいだん', romaji: 'kaidan', english: 'stairs, staircase', partOfSpeech: 'noun', category: 'Places', exampleSentence: { japanese: '階段を上がります。', hiragana: 'かいだんを あがります。', romaji: 'Kaidan o agarimasu.', english: 'I go up the stairs.' } },
      { id: 'l3_v17', lessonNumber: 3, kanji: '会社', hiragana: 'かいしゃ', romaji: 'kaisha', english: 'company', partOfSpeech: 'noun', category: 'Places', exampleSentence: { japanese: '会社は東京にあります。', hiragana: 'かいしゃは とうきょうに あります。', romaji: 'Kaisha wa Toukyou ni arimasu.', english: 'The company is in Tokyo.' } },
      { id: 'l3_v18', lessonNumber: 3, kanji: '国', hiragana: 'くに', romaji: 'kuni', english: 'country', partOfSpeech: 'noun', category: 'Geography', exampleSentence: { japanese: 'お国はどちらですか。', hiragana: 'おくには どちらですか。', romaji: 'Okuni wa dochira desu ka.', english: 'Which country are you from?' } },
      { id: 'l3_v19', lessonNumber: 3, kanji: 'いくら', hiragana: 'いくら', romaji: 'ikura', english: 'how much (price)', partOfSpeech: 'phrase', category: 'Question Words', exampleSentence: { japanese: 'この靴はいくらですか。', hiragana: 'このくつは いくらですか。', romaji: 'Kono kutsu wa ikura desu ka.', english: 'How much are these shoes?' } },
      { id: 'l3_v20', lessonNumber: 3, kanji: '円', hiragana: 'えん', romaji: 'en', english: 'yen (currency)', partOfSpeech: 'counter', category: 'Money', exampleSentence: { japanese: 'これは三千円です。', hiragana: 'これは さんぜんえんです。', romaji: 'Kore wa sanzen-en desu.', english: 'This is 3,000 yen.' } }
    ],
    grammar: [
      {
        id: 'l3_g1',
        lessonNumber: 3,
        title: 'ここ / そこ / あそこ / どこ (Location Demonstratives)',
        structure: '[Place] は ここ / そこ / あそこ です',
        explanation: 'Used to state or ask where places or things are located.',
        rules: [
          'ここ = place where speaker is.',
          'そこ = place where listener is.',
          'あそこ = place away from both.',
          'どこ = where.'
        ],
        examples: [
          { japanese: '受付はあそこです。', hiragana: 'うけつけは あそこです。', romaji: 'Uketsuke wa asoko desu.', english: 'The reception desk is over there.' },
          { japanese: 'お手洗いはどこですか。', hiragana: 'おてあらいは どこですか。', romaji: 'Otearai wa doko desu ka.', english: 'Where is the restroom?' }
        ]
      },
      {
        id: 'l3_g2',
        lessonNumber: 3,
        title: 'こちら / そちら / あちら / どちら (Polite Direction / Location)',
        structure: 'Noun は こちら / そちら / あちら / どちら です',
        explanation: 'Polite counterparts to koko, soko, asoko, and doko. They can refer to directions, locations, or even institutions/countries.',
        rules: [
          'お国はどちらですか is the standard polite way to ask someone\'s home country or company.'
        ],
        examples: [
          { japanese: 'エレベーターはあちらです。', hiragana: 'えれべーたーは あちらです。', romaji: 'Erebeetaa wa achira desu.', english: 'The elevator is in that direction.' },
          { japanese: 'お国はどちらですか。', hiragana: 'おくには どちらですか。', romaji: 'Okuni wa dochira desu ka.', english: 'Where are you from?' }
        ]
      },
      {
        id: 'l3_g3',
        lessonNumber: 3,
        title: 'N1 の N2 (Origin / Manufacturer)',
        structure: '[Country/Company] の [Product]',
        explanation: 'In this lesson, particle の is also used to indicate the maker or country of origin of a product.',
        rules: [
          '日本の車 = "Japanese car / car made in Japan"',
          'どこのカメラですか = "Where was this camera made? / What brand is this camera?"'
        ],
        examples: [
          { japanese: 'これは日本のカメラです。', hiragana: 'これは にほんの かめらです。', romaji: 'Kore wa Nihon no kamera desu.', english: 'This is a camera made in Japan.' }
        ]
      },
      {
        id: 'l3_g4',
        lessonNumber: 3,
        title: 'いくら (Asking Prices)',
        structure: 'Noun は いくらですか',
        explanation: 'Used to ask the price of goods or services.',
        rules: [
          'State amount followed by 円 (えん).',
          'Use Japanese numbers: 百 (ひゃく = 100), 千 (せん = 1,000), 万 (まん = 10,000).'
        ],
        examples: [
          { japanese: 'このワインはいくらですか。―二千八百円です。', hiragana: 'このわいんは いくらですか。―にせんはっぴゃくえんです。', romaji: 'Kono wain wa ikura desu ka. ― Nisen happyaku-en desu.', english: 'How much is this wine? ― It is 2,800 yen.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l3_ex1',
        lessonNumber: 3,
        type: 'mcq',
        category: 'grammar',
        prompt: 'How do you politely ask a foreign colleague what country they are from?',
        options: ['お国はどちらですか。', 'お国はこれですか。', 'お国はいくらですか。', 'お国はだれですか。',],
        correctAnswer: 'お国はどちらですか。',
        explanation: 'どちら is the polite interrogative for location and country of origin.'
      },
      {
        id: 'l3_ex2',
        lessonNumber: 3,
        type: 'fill_blank',
        category: 'vocabulary',
        prompt: 'このワインは [ ? ] ですか。― 1,500円です。',
        options: ['いくら', 'どこ', 'なんさい', 'どちら'],
        correctAnswer: 'いくら',
        explanation: 'いくら is used to ask for the price.'
      },
      {
        id: 'l3_ex3',
        lessonNumber: 3,
        type: 'sentence_formation',
        category: 'grammar',
        prompt: 'Form the sentence: "The meeting room is on the 3rd floor."',
        wordTiles: ['会議室は', '三階', 'です'],
        correctAnswer: '会議室は 三階 です',
        explanation: 'Topic (会議室は) + Location/Floor (三階) + です.'
      }
    ]
  },

  // =========================================================================
  // LESSON 4: Time, Days of Week, Routine Verbs (〜ます / 〜ません)
  // =========================================================================
  {
    id: 4,
    lessonNumber: 4,
    level: 'N5',
    title: 'Lesson 4: Time, Days of the Week & Verb Conjugations',
    titleJapanese: '第４課：時間・曜日・動詞（〜ます・〜ません・〜ました）',
    theme: '今 〜時〜分、起きます、寝ます、〜から〜まで',
    description: 'Learn telling time, days of the week, polite present and past verb conjugations (ます、ません、ました、ませんでした), and time particles (に、から、まで).',
    keyPhrases: [
      '今 何時ですか。 (What time is it now?)',
      '毎朝 6時に 起きます。 (I wake up at 6 every morning.)',
      '9時から 5時まで 働きます。 (I work from 9 to 5.)',
      '昨日は 勉強しませんでした。 (I did not study yesterday.)'
    ],
    vocabulary: [
      { id: 'l4_v1', lessonNumber: 4, kanji: '起きます', hiragana: 'おきます', romaji: 'okimasu', english: 'wake up, get up', partOfSpeech: 'verb-2', category: 'Verbs', exampleSentence: { japanese: '毎朝６時に起きます。', hiragana: 'まいあさ ろくじに おきます。', romaji: 'Maiasa roku-ji ni okimasu.', english: 'I wake up at 6:00 every morning.' } },
      { id: 'l4_v2', lessonNumber: 4, kanji: '寝ます', hiragana: 'ねます', romaji: 'nemasu', english: 'sleep, go to bed', partOfSpeech: 'verb-2', category: 'Verbs', exampleSentence: { japanese: '夜１１時に寝ます。', hiragana: 'よる じゅういちじに ねます。', romaji: 'Yoru juuichi-ji ni nemasu.', english: 'I go to bed at 11:00 PM.' } },
      { id: 'l4_v3', lessonNumber: 4, kanji: '働きます', hiragana: 'はたらきます', romaji: 'hatarakimasu', english: 'work', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: '月曜日から金曜日まで働きます。', hiragana: 'げつようびから きんようびまで はたらきます。', romaji: 'Getsuyoubi kara kinyoubi made hatarakimasu.', english: 'I work from Monday to Friday.' } },
      { id: 'l4_v4', lessonNumber: 4, kanji: '休みます', hiragana: 'やすみます', romaji: 'yasumimasu', english: 'take a rest, take a holiday', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: '日曜日は休みます。', hiragana: 'にちようびは やすみます。', romaji: 'Nichiyoubi wa yasumimasu.', english: 'I rest on Sundays.' } },
      { id: 'l4_v5', lessonNumber: 4, kanji: '勉強します', hiragana: 'べんきょうします', romaji: 'benkyoushimasu', english: 'study', partOfSpeech: 'verb-3', category: 'Verbs', exampleSentence: { japanese: '毎晩日本語を勉強します。', hiragana: 'まいばん にほんごを べんきょうします。', romaji: 'Maiban nihongo o benkyoushimasu.', english: 'I study Japanese every night.' } },
      { id: 'l4_v6', lessonNumber: 4, kanji: '終わります', hiragana: 'おわります', romaji: 'owarimasu', english: 'finish, end', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: '仕事は５時に終わります。', hiragana: 'しごとは ごじに おわります。', romaji: 'Shigoto wa go-ji ni owarimasu.', english: 'Work finishes at 5:00.' } },
      { id: 'l4_v7', lessonNumber: 4, kanji: 'デパート', hiragana: 'でぱーと', romaji: 'depaato', english: 'department store', partOfSpeech: 'noun', category: 'Places', exampleSentence: { japanese: 'デパートは10時に開きます。', hiragana: 'でぱーとは じゅうじに あきます。', romaji: 'Depaato wa juu-ji ni akimasu.', english: 'The department store opens at 10.' } },
      { id: 'l4_v8', lessonNumber: 4, kanji: '銀行', hiragana: 'ぎんこう', romaji: 'ginkou', english: 'bank', partOfSpeech: 'noun', category: 'Places', exampleSentence: { japanese: '銀行は９時から３時までです。', hiragana: 'ぎんこうは くじから さんじまでです。', romaji: 'Ginkou wa ku-ji kara san-ji made desu.', english: 'The bank is open from 9 to 3.' } },
      { id: 'l4_v9', lessonNumber: 4, kanji: '郵便局', hiragana: 'ゆうびんきょく', romaji: 'yuubinkyoku', english: 'post office', partOfSpeech: 'noun', category: 'Places', exampleSentence: { japanese: '郵便局へ行きます。', hiragana: 'ゆうびんきょくへ いきます。', romaji: 'Yuubinkyoku e ikimasu.', english: 'I go to the post office.' } },
      { id: 'l4_v10', lessonNumber: 4, kanji: '図書館', hiragana: 'としょかん', romaji: 'toshokan', english: 'library', partOfSpeech: 'noun', category: 'Places', exampleSentence: { japanese: '図書館で勉強します。', hiragana: 'としょかんで べんきょうします。', romaji: 'Toshokan de benkyoushimasu.', english: 'I study at the library.' } },
      { id: 'l4_v11', lessonNumber: 4, kanji: '美術館', hiragana: 'びじゅつかん', romaji: 'bijutsukan', english: 'art museum', partOfSpeech: 'noun', category: 'Places', exampleSentence: { japanese: '美術館は休みです。', hiragana: 'びじゅつかんは やすみです。', romaji: 'Bijutsukan wa yasumi desu.', english: 'The art museum is closed.' } },
      { id: 'l4_v12', lessonNumber: 4, kanji: '今', hiragana: 'いま', romaji: 'ima', english: 'now', partOfSpeech: 'noun', category: 'Time', exampleSentence: { japanese: '今、４時半です。', hiragana: 'いま、よじはんです。', romaji: 'Ima, yo-ji han desu.', english: 'It is 4:30 now.' } },
      { id: 'l4_v13', lessonNumber: 4, kanji: '〜時', hiragana: '〜じ', romaji: '-ji', english: "o'clock", partOfSpeech: 'counter', category: 'Time', exampleSentence: { japanese: '会議は３時からです。', hiragana: 'かいぎは さんじからです。', romaji: 'Kaigi wa san-ji kara desu.', english: 'The meeting is from 3:00.' } },
      { id: 'l4_v14', lessonNumber: 4, kanji: '〜分', hiragana: '〜ふん / 〜ぷん', romaji: '-fun / -pun', english: 'minute(s)', partOfSpeech: 'counter', category: 'Time', exampleSentence: { japanese: 'あと１０分です。', hiragana: 'あと じゅっぷんです。', romaji: 'Ato juppun desu.', english: '10 minutes remaining.' } },
      { id: 'l4_v15', lessonNumber: 4, kanji: '半', hiragana: 'はん', romaji: 'han', english: 'half (past the hour)', partOfSpeech: 'noun', category: 'Time', exampleSentence: { japanese: '７時半に朝ご飯を食べます。', hiragana: 'しちじはんに あさごはんを たべます。', romaji: 'Shichi-ji han ni asagohan o tabemasu.', english: 'I eat breakfast at 7:30.' } },
      { id: 'l4_v16', lessonNumber: 4, kanji: '何時', hiragana: 'なんじ', romaji: 'nanji', english: 'what time', partOfSpeech: 'phrase', category: 'Question Words', exampleSentence: { japanese: '今、何時ですか。', hiragana: 'いま、なんじですか。', romaji: 'Ima, nanji desu ka.', english: 'What time is it right now?' } },
      { id: 'l4_v17', lessonNumber: 4, kanji: '何分', hiragana: 'なんぷん', romaji: 'nanpun', english: 'what minute', partOfSpeech: 'phrase', category: 'Question Words', exampleSentence: { japanese: '電車は何分に出ますか。', hiragana: 'でんしゃは なんぷんに でますか。', romaji: 'Densha wa nanpun ni demasu ka.', english: 'What minute does the train depart?' } },
      { id: 'l4_v18', lessonNumber: 4, kanji: '午前', hiragana: 'ごぜん', romaji: 'gozen', english: 'morning, A.M.', partOfSpeech: 'noun', category: 'Time', exampleSentence: { japanese: '午前９時に始まります。', hiragana: 'ごぜん くじに はじまります。', romaji: 'Gozen ku-ji ni hajimarimasu.', english: 'It starts at 9:00 AM.' } },
      { id: 'l4_v19', lessonNumber: 4, kanji: '午後', hiragana: 'ごご', romaji: 'gogo', english: 'afternoon, P.M.', partOfSpeech: 'noun', category: 'Time', exampleSentence: { japanese: '午後から雨が降ります。', hiragana: 'ごごから あめが ふります。', romaji: 'Gogo kara ame ga furimasu.', english: 'It will rain from the afternoon.' } },
      { id: 'l4_v20', lessonNumber: 4, kanji: '昨日', hiragana: 'きのう', romaji: 'kinou', english: 'yesterday', partOfSpeech: 'noun', category: 'Time', exampleSentence: { japanese: '昨日は勉強しました。', hiragana: 'きのうは べんきょうしました。', romaji: 'Kinou wa benkyoushimashita.', english: 'I studied yesterday.' } }
    ],
    grammar: [
      {
        id: 'l4_g1',
        lessonNumber: 4,
        title: '今 〜時〜分です (Telling Time)',
        structure: '今 + [Hour] 時 + [Minute] 分 + です',
        explanation: 'Used to state the current time. Hours use 〜時 (ji) and minutes use 〜分 (fun/pun). Half past is 〜時半 (ji han).',
        rules: [
          '4:00 is よじ (yo-ji), 7:00 is しちじ (shichi-ji), 9:00 is くじ (ku-ji).',
          'Notice euphonic sound changes for minutes: 1分 (ippun), 3分 (sanpun), 6分 (roppun), 8分 (happun), 10分 (juppun).'
        ],
        examples: [
          { japanese: '今、何時ですか。―７時１５分です。', hiragana: 'いま、なんじですか。―しちじ じゅうごふんです。', romaji: 'Ima, nanji desu ka. ― Shichi-ji juugo-fun desu.', english: 'What time is it now? ― It is 7:15.' }
        ]
      },
      {
        id: 'l4_g2',
        lessonNumber: 4,
        title: '動詞：〜ます・〜ません・〜ました・〜ませんでした (Polite Verb Tenses)',
        structure: 'Verb Stem + ます (Non-past aff.) / ません (Non-past neg.) / ました (Past aff.) / ませんでした (Past neg.)',
        explanation: 'Polite forms of Japanese verbs indicate affirmation or negation in present/future and past tenses.',
        rules: [
          'Non-past Affirmative: 働きます (I work / will work)',
          'Non-past Negative: 働きません (I do not work / will not work)',
          'Past Affirmative: 働きました (I worked)',
          'Past Negative: 働きませんでした (I did not work)'
        ],
        examples: [
          { japanese: '毎朝６時に起きます。', hiragana: 'まいあさ ろくじに おきます。', romaji: 'Maiasa roku-ji ni okimasu.', english: 'I wake up at 6 every morning.' },
          { japanese: '昨日は勉強しませんでした。', hiragana: 'きのうは べんきょうしませんでした。', romaji: 'Kinou wa benkyoushimasen deshita.', english: 'I did not study yesterday.' }
        ]
      },
      {
        id: 'l4_g3',
        lessonNumber: 4,
        title: '時間 に 動詞 (Specific Point in Time)',
        structure: '[Specific Time with Number] + に + Verb',
        explanation: 'Particle に indicates the specific point in time at which an action takes place.',
        rules: [
          'Use に when time includes a number (e.g. 6時に, 月曜日に, 5月5日に).',
          'Do NOT use に with relative time words (e.g. 今日, 明日, 毎朝, 今).'
        ],
        examples: [
          { japanese: '７時に起きます。', hiragana: 'しちじに おきます。', romaji: 'Shichi-ji ni okimasu.', english: 'I wake up at 7:00.' },
          { japanese: '明日勉強します。(No に)', hiragana: 'あした べんきょうします。', romaji: 'Ashita benkyoushimasu.', english: 'I will study tomorrow.' }
        ]
      },
      {
        id: 'l4_g4',
        lessonNumber: 4,
        title: '〜から 〜まで (From ~ To / Until ~)',
        structure: '[Time/Place 1] + から + [Time/Place 2] + まで',
        explanation: 'から indicates the starting point (from), and まで indicates the finishing point (until/to).',
        rules: [
          'Can be used with time (9時から5時まで) or places (東京から大阪まで).',
          'Can end with です when describing working hours or store schedules.'
        ],
        examples: [
          { japanese: '９時から５時まで働きます。', hiragana: 'くじから ごじまで はたらきます。', romaji: 'Ku-ji kara go-ji made hatarakimasu.', english: 'I work from 9:00 to 5:00.' },
          { japanese: '銀行は９時から３時までです。', hiragana: 'ぎんこうは くじから さんじまでです。', romaji: 'Ginkou wa ku-ji kara san-ji made desu.', english: 'The bank is open from 9:00 to 3:00.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l4_ex1',
        lessonNumber: 4,
        type: 'mcq',
        category: 'grammar',
        prompt: 'Which sentence correctly uses the time particle に?',
        options: [
          '毎朝６時に起きます。',
          '昨日にお酒を飲みました。',
          '今日に東京へ行きます。',
          '明日何時に会いますか。'
        ],
        correctAnswer: '毎朝６時に起きます。',
        explanation: 'に is used with specific numeric times like ６時. Relative words like 今日 and 昨日 do NOT take に.'
      },
      {
        id: 'l4_ex2',
        lessonNumber: 4,
        type: 'fill_blank',
        category: 'grammar',
        prompt: '昨晩は１２時 [ ? ] 勉強しました。 (studied until 12:00)',
        options: ['まで', 'から', 'に', 'へ'],
        correctAnswer: 'まで',
        explanation: 'まで means "until / up to".'
      },
      {
        id: 'l4_ex3',
        lessonNumber: 4,
        type: 'grammar_correction',
        category: 'grammar',
        prompt: 'Correct the error: 明日に学校へ行きます。',
        options: ['明日学校へ行きます。(Remove に)', '明日へ学校に行きます。', '明日で学校に行きます。', '明日も学校に行きます。'],
        correctAnswer: '明日学校へ行きます。(Remove に)',
        explanation: '明日 (ashita) is a relative time word and cannot take the particle に.'
      }
    ]
  },

  // =========================================================================
  // LESSON 5: Movement Verbs, Destinations & Transportation
  // =========================================================================
  {
    id: 5,
    lessonNumber: 5,
    level: 'N5',
    title: 'Lesson 5: Movement Verbs, Travel & Means of Transport',
    titleJapanese: '第５課：移動動詞（行きます・来ます・帰ります）・交通手段',
    theme: '〜へ 行きます、〜で 行きます、〜と 行きます、いつ',
    description: 'Learn destination particle へ with verbs of motion (行きます、来ます、帰ります), means of transit particle で (by train, by bus), and companions with と.',
    keyPhrases: [
      '京都へ 行きます。 (I go to Kyoto.)',
      '新幹線で 来ました。 (I came by Shinkansen bullet train.)',
      '家族と 日本へ 来ました。 (I came to Japan with my family.)',
      '歩いて 帰ります。 (I return on foot - no で!)'
    ],
    vocabulary: [
      { id: 'l5_v1', lessonNumber: 5, kanji: '行きます', hiragana: 'いきます', romaji: 'ikimasu', english: 'go', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: '明日京都へ行きます。', hiragana: 'あした きょうとへ いきます。', romaji: 'Ashita Kyouto e ikimasu.', english: 'I will go to Kyoto tomorrow.' } },
      { id: 'l5_v2', lessonNumber: 5, kanji: '来ます', hiragana: 'きます', romaji: 'kimasu', english: 'come', partOfSpeech: 'verb-3', category: 'Verbs', exampleSentence: { japanese: '友達が家へ来ます。', hiragana: 'ともだちが うちへ きます。', romaji: 'Tomodachi ga uchi e kimasu.', english: 'A friend is coming to my home.' } },
      { id: 'l5_v3', lessonNumber: 5, kanji: '帰ります', hiragana: 'かえります', romaji: 'kaerimasu', english: 'return, go home', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: '７時に国へ帰ります。', hiragana: 'しちじに くにへ かえります。', romaji: 'Shichi-ji ni kuni e kaerimasu.', english: 'I return to my home country at 7.' } },
      { id: 'l5_v4', lessonNumber: 5, kanji: '学校', hiragana: 'がっこう', romaji: 'gakkou', english: 'school', partOfSpeech: 'noun', category: 'Places', exampleSentence: { japanese: '毎朝学校へ行きます。', hiragana: 'まいあさ がっこうへ いきます。', romaji: 'Maiasa gakkou e ikimasu.', english: 'I go to school every morning.' } },
      { id: 'l5_v5', lessonNumber: 5, kanji: 'スーパー', hiragana: 'すーぱー', romaji: 'suupaa', english: 'supermarket', partOfSpeech: 'noun', category: 'Places', exampleSentence: { japanese: 'スーパーで買い物をします。', hiragana: 'すーぱーで かいものを します。', romaji: 'Suupaa de kaimono o shimasu.', english: 'I shop at the supermarket.' } },
      { id: 'l5_v6', lessonNumber: 5, kanji: '駅', hiragana: 'えき', romaji: 'eki', english: 'station, railway station', partOfSpeech: 'noun', category: 'Places', exampleSentence: { japanese: '駅で友達と会います。', hiragana: 'えきで ともだちと あいます。', romaji: 'Eki de tomodachi to aimasu.', english: 'I meet my friend at the station.' } },
      { id: 'l5_v7', lessonNumber: 5, kanji: '飛行機', hiragana: 'ひこうき', romaji: 'hikouki', english: 'airplane', partOfSpeech: 'noun', category: 'Vehicles', exampleSentence: { japanese: '飛行機で日本へ行きます。', hiragana: 'ひこうきで にほんへ いきます。', romaji: 'Hikouki de Nihon e ikimasu.', english: 'I go to Japan by airplane.' } },
      { id: 'l5_v8', lessonNumber: 5, kanji: '船', hiragana: 'ふね', romaji: 'fune', english: 'ship, boat', partOfSpeech: 'noun', category: 'Vehicles', exampleSentence: { japanese: '船で島へ行きました。', hiragana: 'ふねで しまへ いきました。', romaji: 'Fune de shima e ikimashita.', english: 'I went to the island by ship.' } },
      { id: 'l5_v9', lessonNumber: 5, kanji: '電車', hiragana: 'でんしゃ', romaji: 'densha', english: 'electric train', partOfSpeech: 'noun', category: 'Vehicles', exampleSentence: { japanese: '電車で会社へ通います。', hiragana: 'でんしゃで かいしゃへ かよいます。', romaji: 'Densha de kaisha e kayoimasu.', english: 'I commute to the company by train.' } },
      { id: 'l5_v10', lessonNumber: 5, kanji: '地下鉄', hiragana: 'ちかてつ', romaji: 'chikatetsu', english: 'subway, metro', partOfSpeech: 'noun', category: 'Vehicles', exampleSentence: { japanese: '地下鉄はとても便利です。', hiragana: 'ちかてつは とても べんりです。', romaji: 'Chikatetsu wa totemo benri desu.', english: 'The subway is very convenient.' } },
      { id: 'l5_v11', lessonNumber: 5, kanji: '新幹線', hiragana: 'しんかんせん', romaji: 'shinkansen', english: 'bullet train (Shinkansen)', partOfSpeech: 'noun', category: 'Vehicles', exampleSentence: { japanese: '新幹線で大阪へ行きました。', hiragana: 'しんかんせんで おおさかへ いきました。', romaji: 'Shinkansen de Oosaka e ikimashita.', english: 'I went to Osaka by bullet train.' } },
      { id: 'l5_v12', lessonNumber: 5, kanji: 'バス', hiragana: 'ばす', romaji: 'basu', english: 'bus', partOfSpeech: 'noun', category: 'Vehicles', exampleSentence: { japanese: 'バスに乗ります。', hiragana: 'ばすに のります。', romaji: 'Basu ni norimasu.', english: 'I board the bus.' } },
      { id: 'l5_v13', lessonNumber: 5, kanji: 'タクシー', hiragana: 'たくしー', romaji: 'takushii', english: 'taxi', partOfSpeech: 'noun', category: 'Vehicles', exampleSentence: { japanese: 'タクシーでホテルへ帰りました。', hiragana: 'たくしーで ほてるへ かえりました。', romaji: 'Takushii de hoteru e kaerimashita.', english: 'I returned to the hotel by taxi.' } },
      { id: 'l5_v14', lessonNumber: 5, kanji: '自転車', hiragana: 'じてんしゃ', romaji: 'jitensha', english: 'bicycle', partOfSpeech: 'noun', category: 'Vehicles', exampleSentence: { japanese: '自転車で駅へ行きます。', hiragana: 'じてんしゃで えきへ いきます。', romaji: 'Jitensha de eki e ikimasu.', english: 'I go to the station by bicycle.' } },
      { id: 'l5_v15', lessonNumber: 5, kanji: '歩いて', hiragana: 'あるいて', romaji: 'aruite', english: 'on foot', partOfSpeech: 'phrase', category: 'Travel', exampleSentence: { japanese: '歩いて家へ帰ります。', hiragana: 'あるいて うちへ かえります。', romaji: 'Aruite uchi e kaerimasu.', english: 'I return home on foot.' } },
      { id: 'l5_v16', lessonNumber: 5, kanji: '人', hiragana: 'ひと', romaji: 'hito', english: 'person, people', partOfSpeech: 'noun', category: 'People', exampleSentence: { japanese: 'たくさんの人がいます。', hiragana: 'たくさんの ひとが います。', romaji: 'Takusan no hito ga imasu.', english: 'There are many people.' } },
      { id: 'l5_v17', lessonNumber: 5, kanji: '友達', hiragana: 'ともだち', romaji: 'tomodachi', english: 'friend', partOfSpeech: 'noun', category: 'People', exampleSentence: { japanese: '友達と京都へ行きました。', hiragana: 'ともだちと きょうとへ いきました。', romaji: 'Tomodachi to Kyouto e ikimashita.', english: 'I went to Kyoto with a friend.' } },
      { id: 'l5_v18', lessonNumber: 5, kanji: '彼', hiragana: 'かれ', romaji: 'kare', english: 'he, boyfriend', partOfSpeech: 'pronoun', category: 'People', exampleSentence: { japanese: '彼はアメリカ人です。', hiragana: 'かれは あめりかじんです。', romaji: 'Kare wa amerika-jin desu.', english: 'He is an American.' } },
      { id: 'l5_v19', lessonNumber: 5, kanji: '彼女', hiragana: 'かのじょ', romaji: 'kanojo', english: 'she, girlfriend', partOfSpeech: 'pronoun', category: 'People', exampleSentence: { japanese: '彼女は親切です。', hiragana: 'かのじょは しんせつです。', romaji: 'Kanojo wa shinsetsu desu.', english: 'She is kind.' } },
      { id: 'l5_v20', lessonNumber: 5, kanji: 'いつ', hiragana: 'いつ', romaji: 'itsu', english: 'when', partOfSpeech: 'phrase', category: 'Question Words', exampleSentence: { japanese: '日本へいつ来ましたか。', hiragana: 'にほんへ いつ きましたか。', romaji: 'Nihon e itsu kimashita ka.', english: 'When did you come to Japan?' } }
    ],
    grammar: [
      {
        id: 'l5_g1',
        lessonNumber: 5,
        title: '[Place] へ 行きます / 来ます / 帰ります (Destination Particle へ)',
        structure: '[Place] + へ (pronounced "e") + 行きます / 来ます / 帰ります',
        explanation: 'Particle へ indicates the direction and destination of motion verbs.',
        rules: [
          'Written as the hiragana "he", but pronounced "e" as a grammatical particle.',
          'Common verbs: 行きます (go), 来ます (come), 帰ります (return/go home).'
        ],
        examples: [
          { japanese: '京都へ行きます。', hiragana: 'きょうとへ いきます。', romaji: 'Kyouto e ikimasu.', english: 'I will go to Kyoto.' },
          { japanese: '国へ帰ります。', hiragana: 'くにへ かえります。', romaji: 'Kuni e kaerimasu.', english: 'I will return to my country.' }
        ]
      },
      {
        id: 'l5_g2',
        lessonNumber: 5,
        title: 'どこ[へ]も 行きません (Total Negation)',
        structure: 'どこ + [へ] + も + 行きません / 行きませんでした',
        explanation: 'When interrogative words are followed by も and a negative verb, all possibilities are denied ("not go anywhere").',
        rules: [
          'どこへも行きません = "I do not go anywhere."',
          'The particle へ can be omitted (どこも行きません).'
        ],
        examples: [
          { japanese: '日曜日はどこへも行きませんでした。', hiragana: 'にちようびは どこへも いきませんでした。', romaji: 'Nichiyoubi wa doko e mo ikimasen deshita.', english: 'I didn\'t go anywhere on Sunday.' }
        ]
      },
      {
        id: 'l5_g3',
        lessonNumber: 5,
        title: '[Vehicle] で 行きます (Means of Transportation)',
        structure: '[Vehicle / Method] + で + Verb of Motion',
        explanation: 'Particle で indicates the vehicle, tool, or means used to travel.',
        rules: [
          '電車で行きます (by train), バスで行きます (by bus).',
          'EXCEPTION: For "on foot", say 歩いて (aruite) WITHOUT particle で!'
        ],
        examples: [
          { japanese: '新幹線で大阪へ行きます。', hiragana: 'しんかんせんで おおさかへ いきます。', romaji: 'Shinkansen de Oosaka e ikimasu.', english: 'I go to Osaka by Shinkansen bullet train.' },
          { japanese: '駅から歩いて帰りました。', hiragana: 'えきから あるいて かえりました。', romaji: 'Eki kara aruite kaerimashita.', english: 'I walked home from the station on foot.' }
        ]
      },
      {
        id: 'l5_g4',
        lessonNumber: 5,
        title: '[Person] と 動詞 (Companions / "With")',
        structure: '[Person / Animal] + と + Verb',
        explanation: 'Particle と marks the companion with whom the subject carries out an action.',
        rules: [
          '家族と日本へ来ました (I came to Japan with my family).',
          'For "alone", use 一人で (hitori de) WITHOUT particle と!'
        ],
        examples: [
          { japanese: '友達と日本へ来ました。', hiragana: 'ともだちと にほんへ きました。', romaji: 'Tomodachi to Nihon e kimashita.', english: 'I came to Japan with a friend.' },
          { japanese: '一人で東京へ行きました。', hiragana: 'ひとりで とうきょうへ いきました。', romaji: 'Hitori de Toukyou e ikimashita.', english: 'I went to Tokyo alone.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l5_ex1',
        lessonNumber: 5,
        type: 'mcq',
        category: 'grammar',
        prompt: 'Choose the correct sentence: "I went to school on foot."',
        options: [
          '歩いて学校へ行きました。',
          '歩きで行きました。',
          '歩いてで学校へ行きました。',
          '歩くで学校へ行きました。'
        ],
        correctAnswer: '歩いて学校へ行きました。',
        explanation: '歩いて (on foot) does not take particle で.'
      },
      {
        id: 'l5_ex2',
        lessonNumber: 5,
        type: 'fill_blank',
        category: 'grammar',
        prompt: '何 [ ? ] 東京へ行きますか。― 新幹線で行きます。',
        options: ['で', 'へ', 'を', 'に'],
        correctAnswer: 'で',
        explanation: '何で (nan de) asks "by what means of transit?".'
      },
      {
        id: 'l5_ex3',
        lessonNumber: 5,
        type: 'sentence_formation',
        category: 'grammar',
        prompt: 'Form the sentence: "I did not go anywhere on Sunday."',
        wordTiles: ['日曜日は', 'どこへも', '行きませんでした'],
        correctAnswer: '日曜日は どこへも 行きませんでした',
        explanation: 'Time (日曜日は) + Total negation (どこへも) + Negative past (行きませんでした).'
      }
    ]
  }
];
