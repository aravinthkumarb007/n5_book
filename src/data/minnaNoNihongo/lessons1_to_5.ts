import { MinnaLesson } from '@/types/minna';

export const MINNA_LESSONS_1_TO_5: MinnaLesson[] = [
  // =========================================================================
  // LESSON 1: Self-Introductions, Nationalities, Occupations
  // Reference: Minna no Nihongo I, Lesson 1 (Pages 12-17 / Book pages 32-37)
  // =========================================================================
  {
    id: 1,
    lessonNumber: 1,
    level: 'N5',
    title: 'Lesson 1: Self-Introductions, Nationalities & Occupations',
    titleJapanese: '第１課：自己紹介・国籍・職業',
    theme: 'わたしは マイク・ミラーです。サントスさんは 学生じゃ ありません。',
    description: 'Master self-introductions, polite affirmative and negative copulas (です / じゃありません), question particles (か), particle も (also), and noun affiliation with の.',
    keyPhrases: [
      'わたしは マイク・ミラーです。 (I am Mike Miller.)',
      'サントスさんは 学生じゃ ありません。 (Mr. Santos is not a student.)',
      'ミラーさんは 会社員ですか。 (Is Mr. Miller a company employee?)',
      'サントスさんも 会社員です。 (Mr. Santos is also a company employee.)',
      'ミラーさんは IMCの 社員です。 (Mr. Miller is an employee of IMC.)',
      '初めまして。どうぞ よろしく [お願いします]。 (How do you do? Pleased to meet you.)'
    ],
    vocabulary: [
      { id: 'l1_v1', lessonNumber: 1, kanji: '私', hiragana: 'わたし', romaji: 'watashi', english: 'I, me', partOfSpeech: 'pronoun', category: 'People' },
      { id: 'l1_v2', lessonNumber: 1, kanji: '私たち', hiragana: 'わたしたち', romaji: 'watashitachi', english: 'we', partOfSpeech: 'pronoun', category: 'People' },
      { id: 'l1_v3', lessonNumber: 1, kanji: 'あなた', hiragana: 'あなた', romaji: 'anata', english: 'you', partOfSpeech: 'pronoun', category: 'People' },
      { id: 'l1_v4', lessonNumber: 1, kanji: 'あの人', hiragana: 'あのひと', romaji: 'ano hito', english: 'that person, he, she', partOfSpeech: 'pronoun', category: 'People' },
      { id: 'l1_v5', lessonNumber: 1, kanji: 'あの方', hiragana: 'あのかた', romaji: 'ano kata', english: 'that person (polite equivalent of あの人)', partOfSpeech: 'pronoun', category: 'People' },
      { id: 'l1_v6', lessonNumber: 1, kanji: '皆さん', hiragana: 'みなさん', romaji: 'minasan', english: 'ladies and gentlemen, all of you', partOfSpeech: 'noun', category: 'People' },
      { id: 'l1_v7', lessonNumber: 1, kanji: '〜さん', hiragana: '〜さん', romaji: '~san', english: 'Mr., Ms. (title of respect)', partOfSpeech: 'phrase', category: 'Suffixes' },
      { id: 'l1_v8', lessonNumber: 1, kanji: '〜ちゃん', hiragana: '〜ちゃん', romaji: '~chan', english: 'suffix often added to a child\'s name', partOfSpeech: 'phrase', category: 'Suffixes' },
      { id: 'l1_v9', lessonNumber: 1, kanji: '〜君', hiragana: '〜くん', romaji: '~kun', english: 'suffix often added to a boy\'s name', partOfSpeech: 'phrase', category: 'Suffixes' },
      { id: 'l1_v10', lessonNumber: 1, kanji: '〜人', hiragana: '〜じん', romaji: '~jin', english: 'suffix meaning "a national of" (e.g. アメリカ人)', partOfSpeech: 'counter', category: 'Suffixes' },
      { id: 'l1_v11', lessonNumber: 1, kanji: '先生', hiragana: 'せんせい', romaji: 'sensei', english: 'teacher, instructor (not used when referring to own job)', partOfSpeech: 'noun', category: 'Occupations' },
      { id: 'l1_v12', lessonNumber: 1, kanji: '教師', hiragana: 'きょうし', romaji: 'kyoushi', english: 'teacher, instructor (used when referring to own job)', partOfSpeech: 'noun', category: 'Occupations' },
      { id: 'l1_v13', lessonNumber: 1, kanji: '学生', hiragana: 'がくせい', romaji: 'gakusei', english: 'student', partOfSpeech: 'noun', category: 'Occupations' },
      { id: 'l1_v14', lessonNumber: 1, kanji: '会社員', hiragana: 'かいしゃいん', romaji: 'kaishain', english: 'company employee', partOfSpeech: 'noun', category: 'Occupations' },
      { id: 'l1_v15', lessonNumber: 1, kanji: '社員', hiragana: 'しゃいん', romaji: 'shain', english: 'employee of ~ Company (e.g. IMCの社員)', partOfSpeech: 'noun', category: 'Occupations' },
      { id: 'l1_v16', lessonNumber: 1, kanji: '銀行員', hiragana: 'ぎんこういん', romaji: 'ginkouin', english: 'bank employee', partOfSpeech: 'noun', category: 'Occupations' },
      { id: 'l1_v17', lessonNumber: 1, kanji: '医者', hiragana: 'いしゃ', romaji: 'isha', english: 'medical doctor', partOfSpeech: 'noun', category: 'Occupations' },
      { id: 'l1_v18', lessonNumber: 1, kanji: '研究者', hiragana: 'けんきゅうしゃ', romaji: 'kenkyuusha', english: 'researcher, scholar', partOfSpeech: 'noun', category: 'Occupations' },
      { id: 'l1_v19', lessonNumber: 1, kanji: 'エンジニア', hiragana: 'エンジニア', romaji: 'enjinia', english: 'engineer', partOfSpeech: 'noun', category: 'Occupations' },
      { id: 'l1_v20', lessonNumber: 1, kanji: '大学', hiragana: 'だいがく', romaji: 'daigaku', english: 'university', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l1_v21', lessonNumber: 1, kanji: '病院', hiragana: 'びょういん', romaji: 'byouin', english: 'hospital', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l1_v22', lessonNumber: 1, kanji: '電気', hiragana: 'でんき', romaji: 'denki', english: 'electricity, light', partOfSpeech: 'noun', category: 'General' },
      { id: 'l1_v23', lessonNumber: 1, kanji: '誰', hiragana: 'だれ', romaji: 'dare', english: 'who', partOfSpeech: 'pronoun', category: 'Question Words' },
      { id: 'l1_v24', lessonNumber: 1, kanji: 'どなた', hiragana: 'どなた', romaji: 'donata', english: 'who (polite equivalent of だれ)', partOfSpeech: 'pronoun', category: 'Question Words' },
      { id: 'l1_v25', lessonNumber: 1, kanji: '〜歳', hiragana: '〜さい', romaji: '~sai', english: '- years old', partOfSpeech: 'counter', category: 'Numbers' },
      { id: 'l1_v26', lessonNumber: 1, kanji: '何歳', hiragana: 'なんさい', romaji: 'nansai', english: 'how old', partOfSpeech: 'phrase', category: 'Question Words' },
      { id: 'l1_v27', lessonNumber: 1, kanji: 'おいくつ', hiragana: 'おいくつ', romaji: 'oikutsu', english: 'how old (polite equivalent of なんさい)', partOfSpeech: 'phrase', category: 'Question Words' },
      { id: 'l1_v28', lessonNumber: 1, kanji: 'はい', hiragana: 'はい', romaji: 'hai', english: 'yes', partOfSpeech: 'phrase', category: 'Expressions' },
      { id: 'l1_v29', lessonNumber: 1, kanji: 'いいえ', hiragana: 'いいえ', romaji: 'iie', english: 'no', partOfSpeech: 'phrase', category: 'Expressions' },
      { id: 'l1_v30', lessonNumber: 1, kanji: '失礼ですが', hiragana: 'しつれいですが', romaji: 'shitsurei desu ga', english: 'Excuse me, but', partOfSpeech: 'phrase', category: 'Greetings' },
      { id: 'l1_v31', lessonNumber: 1, kanji: 'お名前は？', hiragana: 'おなまえは？', romaji: 'onamae wa?', english: 'May I have your name?', partOfSpeech: 'phrase', category: 'Greetings' },
      { id: 'l1_v32', lessonNumber: 1, kanji: '初めまして', hiragana: 'はじめまして', romaji: 'hajimemashite', english: 'How do you do? (first meeting greeting)', partOfSpeech: 'phrase', category: 'Greetings' },
      { id: 'l1_v33', lessonNumber: 1, kanji: 'どうぞ よろしく [お願いします]', hiragana: 'どうぞよろしく[おねがいします]', romaji: 'douzo yoroshiku [onegaishimasu]', english: 'Pleased to meet you (at the end of self-introduction)', partOfSpeech: 'phrase', category: 'Greetings' },
      { id: 'l1_v34', lessonNumber: 1, kanji: 'こちらは 〜さんです', hiragana: 'こちらは 〜さんです', romaji: 'kochira wa ~san desu', english: 'This is Mr./Ms. ~', partOfSpeech: 'phrase', category: 'Greetings' },
      { id: 'l1_v35', lessonNumber: 1, kanji: '〜から 来ました', hiragana: '〜から きました', romaji: '~kara kimashita', english: 'I came from ~', partOfSpeech: 'phrase', category: 'Greetings' },
      { id: 'l1_v36', lessonNumber: 1, kanji: 'アメリカ', hiragana: 'アメリカ', romaji: 'amerika', english: 'U.S.A.', partOfSpeech: 'noun', category: 'Countries' },
      { id: 'l1_v37', lessonNumber: 1, kanji: 'イギリス', hiragana: 'イギリス', romaji: 'igirisu', english: 'U.K.', partOfSpeech: 'noun', category: 'Countries' },
      { id: 'l1_v38', lessonNumber: 1, kanji: 'インド', hiragana: 'インド', romaji: 'indo', english: 'India', partOfSpeech: 'noun', category: 'Countries' },
      { id: 'l1_v39', lessonNumber: 1, kanji: 'インドネシア', hiragana: 'インドネシア', romaji: 'indoneshia', english: 'Indonesia', partOfSpeech: 'noun', category: 'Countries' },
      { id: 'l1_v40', lessonNumber: 1, kanji: '韓国', hiragana: 'かんこく', romaji: 'kankoku', english: 'South Korea', partOfSpeech: 'noun', category: 'Countries' },
      { id: 'l1_v41', lessonNumber: 1, kanji: 'タイ', hiragana: 'タイ', romaji: 'tai', english: 'Thailand', partOfSpeech: 'noun', category: 'Countries' },
      { id: 'l1_v42', lessonNumber: 1, kanji: '中国', hiragana: 'ちゅうごく', romaji: 'chuugoku', english: 'China', partOfSpeech: 'noun', category: 'Countries' },
      { id: 'l1_v43', lessonNumber: 1, kanji: 'ドイツ', hiragana: 'ドイツ', romaji: 'doitsu', english: 'Germany', partOfSpeech: 'noun', category: 'Countries' },
      { id: 'l1_v44', lessonNumber: 1, kanji: '日本', hiragana: 'にほん', romaji: 'nihon', english: 'Japan', partOfSpeech: 'noun', category: 'Countries' },
      { id: 'l1_v45', lessonNumber: 1, kanji: 'フランス', hiragana: 'フランス', romaji: 'furansu', english: 'France', partOfSpeech: 'noun', category: 'Countries' },
      { id: 'l1_v46', lessonNumber: 1, kanji: 'ブラジル', hiragana: 'ブラジル', romaji: 'burajiru', english: 'Brazil', partOfSpeech: 'noun', category: 'Countries' }
    ],
    grammar: [
      {
        id: 'l1_g1',
        lessonNumber: 1,
        title: '1. N1 は N2 です (N1 is N2)',
        structure: 'Noun 1 は Noun 2 です',
        explanation: 'The particle は indicates that N1 is the topic of the sentence. The speaker selects N1 as the topic and makes a statement about it. です works as the polite predicate affirming judgement or assertion.',
        rules: [
          'The particle は is written with the hiragana character は (ha), but is ALWAYS pronounced わ (wa).',
          'です indicates judgement/assertion and conveys polite attitude towards the listener.'
        ],
        examples: [
          { japanese: 'わたしは マイク・ミラーです。', hiragana: 'わたしは まいく・みらーです。', romaji: 'Watashi wa Maiku Miraa desu.', english: 'I am Mike Miller.' },
          { japanese: 'わたしは エンジニアです。', hiragana: 'わたしは えんじにあです。', romaji: 'Watashi wa enjinia desu.', english: 'I am an engineer.' }
        ]
      },
      {
        id: 'l1_g2',
        lessonNumber: 1,
        title: '2. N1 は N2 じゃ ありません (N1 is not N2)',
        structure: 'Noun 1 は Noun 2 じゃ ありません / では ありません',
        explanation: 'じゃ ありません is the negative form of です. It is the form used in daily conversation. For formal speech or writing, では ありません is used instead.',
        rules: [
          'じゃ ありません: colloquial/conversational polite negative.',
          'では ありません: formal polite negative (は in では is pronounced wa).'
        ],
        examples: [
          { japanese: 'サントスさんは 学生じゃ ありません。', hiragana: 'さんとすさんは がくせいじゃ ありません。', romaji: 'Santosu-san wa gakusei ja arimasen.', english: 'Mr. Santos is not a student.' }
        ]
      },
      {
        id: 'l1_g3',
        lessonNumber: 1,
        title: '3. S か (Question Particle)',
        structure: 'Sentence + か',
        explanation: 'The particle か expresses the speaker\'s doubt, question, or uncertainty. A question is formed by simply adding か to the end of a sentence. In answer to a question asking whether a statement is correct, begin with はい or いいえ.',
        rules: [
          'Word order does not change in questions; simply attach か at the end with rising intonation.',
          'Interrogatives (だれ, どなた, 何歳, おいくつ) replace the unknown part of the sentence: あの方は どなたですか。'
        ],
        examples: [
          { japanese: 'ミラーさんは アメリカ人ですか。', hiragana: 'みらーさんは あめりかじんですか。', romaji: 'Miraa-san wa amerika-jin desu ka.', english: 'Is Mr. Miller an American?' },
          { japanese: 'はい、アメリカ人です。', hiragana: 'はい、あめりかじんです。', romaji: 'Hai, amerika-jin desu.', english: 'Yes, he is.' },
          { japanese: 'ミラーさんは 先生ですか。・・・いいえ、先生じゃ ありません。', hiragana: 'みらーさんは せんせいですか。・・・いいえ、せんせいじゃ ありません。', romaji: 'Miraa-san wa sensei desu ka? ...Iie, sensei ja arimasen.', english: 'Is Mr. Miller a teacher? ...No, he is not.' },
          { japanese: 'あの方は どなたですか。・・・[あの方は] ミラーさんです。', hiragana: 'あのかたは どなたですか。・・・みらーさんです。', romaji: 'Ano kata wa donata desu ka? ...Miraa-san desu.', english: 'Who is that man? ...That is Mr. Miller.' }
        ]
      },
      {
        id: 'l1_g4',
        lessonNumber: 1,
        title: '4. N も (Also / Too)',
        structure: 'Noun + も',
        explanation: 'も is added after a topic instead of は when the statement about this topic is the same as the previous topic.',
        rules: [
          'Replaces は completely: ミラーさんは 会社員です。グプタさんも 会社員です。'
        ],
        examples: [
          { japanese: 'ミラーさんは 会社員です。', hiragana: 'みらーさんは かいしゃいんです。', romaji: 'Miraa-san wa kaishain desu.', english: 'Mr. Miller is a company employee.' },
          { japanese: 'グプタさんも 会社員です。', hiragana: 'ぐぷたさんも かいしゃいんです。', romaji: 'Guputa-san mo kaishain desu.', english: 'Mr. Gupta is also a company employee.' }
        ]
      },
      {
        id: 'l1_g5',
        lessonNumber: 1,
        title: '5. N1 の N2 (Connecting Nouns / Affiliation)',
        structure: 'Noun 1 の Noun 2',
        explanation: 'Particle の connects two nouns. N1 modifies N2. In Lesson 1, N1 is an organization or some kind of group to which N2 belongs.',
        rules: [
          'ミラーさんは IMCの 社員です (Mr. Miller is an employee of IMC).'
        ],
        examples: [
          { japanese: 'ミラーさんは IMCの 社員です。', hiragana: 'みらーさんは あいえむしーの しゃいんです。', romaji: 'Miraa-san wa IMC no shain desu.', english: 'Mr. Miller is an IMC employee.' }
        ]
      },
      {
        id: 'l1_g6',
        lessonNumber: 1,
        title: '6. 〜さん & Politeness in Address',
        structure: 'Name + さん',
        explanation: 'さん is added to the name of the listener or a third person to show respect. It should NEVER be used with the speaker\'s own name. When referring directly to the listener, あなた is rarely used if you already know their name; use their family name followed by さん instead.',
        rules: [
          'Never attach 〜さん to yourself: わたしは ミラーです (Correct) / NOT *わたしは ミラーさんです.',
          'Use family name + さん instead of あなた: 鈴木さん、ミラーさんは 学生ですか。'
        ],
        examples: [
          { japanese: 'あの方は ミラーさんです。', hiragana: 'あのかたは みらーさんです。', romaji: 'Ano kata wa Miraa-san desu.', english: 'That is Mr. Miller.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l1_ex1',
        lessonNumber: 1,
        type: 'mcq',
        category: 'grammar',
        prompt: 'Choose the correct polite negative form: "Mr. Santos is not a student."',
        contextSentence: 'サントスさんは 学生（　　）。',
        options: ['じゃ ありません', 'です', 'じゃ あります', 'でした'],
        correctAnswer: 'じゃ ありません',
        explanation: 'じゃ ありません is the polite negative of です.'
      },
      {
        id: 'l1_ex2',
        lessonNumber: 1,
        type: 'fill_blank',
        category: 'grammar',
        prompt: 'Choose the correct particle for "also/too":',
        contextSentence: 'ミラーさんは 会社員です。グプタさん（　　）会社員です。',
        options: ['も', 'は', 'の', 'か'],
        correctAnswer: 'も',
        explanation: 'Particle も replaces は to mean "also / too".'
      },
      {
        id: 'l1_ex3',
        lessonNumber: 1,
        type: 'sentence_formation',
        category: 'grammar',
        prompt: 'Arrange the tiles to say: "Mr. Miller is an IMC employee."',
        wordTiles: ['ミラーさんは', 'IMCの', '社員です'],
        correctAnswer: 'ミラーさんは IMCの 社員です',
        explanation: 'Particle の connects the company (IMC) with the position (社員).'
      }
    ],
    dialogue: {
      title: '初めまして (How do you do?)',
      situation: 'Sato introducing Mike Miller to Yamada at the company.',
      lines: [
        { speaker: '佐藤', japanese: 'おはようございます。', hiragana: 'おはよう ございます。', english: 'Good morning.' },
        { speaker: '山田', japanese: 'おはようございます。', hiragana: 'おはよう ございます。', english: 'Good morning.' },
        { speaker: '佐藤', japanese: '山田さん、こちらは マイク・ミラーさんです。', hiragana: 'やまださん、こちらは まいく・みらーさんです。', english: 'Ms. Sato, this is Mr. Mike Miller.' },
        { speaker: 'ミラー', japanese: '初めまして。マイク・ミラーです。アメリカから 来ました。どうぞ よろしく。', hiragana: 'はじめまして。まいく・みらーです。あめりかから きました。どうぞ よろしく。', english: 'How do you do? I am Mike Miller. I came from America. Nice to meet you.' },
        { speaker: '佐藤', japanese: '佐藤けい子です。どうぞ よろしく。', hiragana: 'さとうけいこです。どうぞ よろしく。', english: 'I am Keiko Sato. Nice to meet you.' }
      ]
    }
  },

  // =========================================================================
  // LESSON 2: Demonstratives, Everyday Possessions
  // Reference: Minna no Nihongo I, Lesson 2 (Pages 18-23 / Book pages 38-43)
  // =========================================================================
  {
    id: 2,
    lessonNumber: 2,
    level: 'N5',
    title: 'Lesson 2: Demonstratives (これ/それ/あれ) & Belongings',
    titleJapanese: '第２課：指示詞（これ・それ・あれ・この・その・あの）・持ち物',
    theme: 'これは 辞書です。それは だれのかばんですか。',
    description: 'Master Japanese demonstrative pronouns (これ・それ・あれ), demonstrative determiners (この・その・あの), asking alternative questions (S1か、S2か), and expressing possession with の.',
    keyPhrases: [
      'これは 辞書です。 (This is a dictionary.)',
      'これは コンピューターの 本です。 (This is a book on computers.)',
      'それは わたしの 傘です。 (That is my umbrella.)',
      'この 傘は わたしのです。 (This umbrella is mine.)',
      'ほんの 気持ちです。どうぞ。 (It\'s a small token. Here you are.)'
    ],
    vocabulary: [
      { id: 'l2_v1', lessonNumber: 2, kanji: 'これ', hiragana: 'これ', romaji: 'kore', english: 'this (thing here near speaker)', partOfSpeech: 'pronoun', category: 'Demonstratives' },
      { id: 'l2_v2', lessonNumber: 2, kanji: 'それ', hiragana: 'それ', romaji: 'sore', english: 'that (thing near listener)', partOfSpeech: 'pronoun', category: 'Demonstratives' },
      { id: 'l2_v3', lessonNumber: 2, kanji: 'あれ', hiragana: 'あれ', romaji: 'are', english: 'that (thing over there, far from both)', partOfSpeech: 'pronoun', category: 'Demonstratives' },
      { id: 'l2_v4', lessonNumber: 2, kanji: 'この〜', hiragana: 'この〜', romaji: 'kono~', english: 'this ~, this ~ here (precedes noun)', partOfSpeech: 'phrase', category: 'Demonstratives' },
      { id: 'l2_v5', lessonNumber: 2, kanji: 'その〜', hiragana: 'その〜', romaji: 'sono~', english: 'that ~, that ~ near you (precedes noun)', partOfSpeech: 'phrase', category: 'Demonstratives' },
      { id: 'l2_v6', lessonNumber: 2, kanji: 'あの〜', hiragana: 'あの〜', romaji: 'ano~', english: 'that ~, that ~ over there (precedes noun)', partOfSpeech: 'phrase', category: 'Demonstratives' },
      { id: 'l2_v7', lessonNumber: 2, kanji: '本', hiragana: 'ほん', romaji: 'hon', english: 'book', partOfSpeech: 'noun', category: 'Everyday Objects' },
      { id: 'l2_v8', lessonNumber: 2, kanji: '辞書', hiragana: 'じしょ', romaji: 'jisho', english: 'dictionary', partOfSpeech: 'noun', category: 'Everyday Objects' },
      { id: 'l2_v9', lessonNumber: 2, kanji: '雑誌', hiragana: 'ざっし', romaji: 'zasshi', english: 'magazine', partOfSpeech: 'noun', category: 'Everyday Objects' },
      { id: 'l2_v10', lessonNumber: 2, kanji: '新聞', hiragana: 'しんぶん', romaji: 'shinbun', english: 'newspaper', partOfSpeech: 'noun', category: 'Everyday Objects' },
      { id: 'l2_v11', lessonNumber: 2, kanji: 'ノート', hiragana: 'ノート', romaji: 'nooto', english: 'notebook', partOfSpeech: 'noun', category: 'Everyday Objects' },
      { id: 'l2_v12', lessonNumber: 2, kanji: '手帳', hiragana: 'てちょう', romaji: 'techou', english: 'pocket notebook', partOfSpeech: 'noun', category: 'Everyday Objects' },
      { id: 'l2_v13', lessonNumber: 2, kanji: '名刺', hiragana: 'めいし', romaji: 'meishi', english: 'business card', partOfSpeech: 'noun', category: 'Everyday Objects' },
      { id: 'l2_v14', lessonNumber: 2, kanji: 'カード', hiragana: 'カード', romaji: 'kaado', english: 'card', partOfSpeech: 'noun', category: 'Everyday Objects' },
      { id: 'l2_v15', lessonNumber: 2, kanji: 'テレホンカード', hiragana: 'テレホンカード', romaji: 'terehon-kaado', english: 'telephone card', partOfSpeech: 'noun', category: 'Everyday Objects' },
      { id: 'l2_v16', lessonNumber: 2, kanji: '鉛筆', hiragana: 'えんぴつ', romaji: 'enpitsu', english: 'pencil', partOfSpeech: 'noun', category: 'Stationery' },
      { id: 'l2_v17', lessonNumber: 2, kanji: 'ボールペン', hiragana: 'ボールペン', romaji: 'boorupen', english: 'ballpoint pen', partOfSpeech: 'noun', category: 'Stationery' },
      { id: 'l2_v18', lessonNumber: 2, kanji: 'シャープペンシル', hiragana: 'シャープペンシル', romaji: 'shaapupenshiru', english: 'mechanical pencil', partOfSpeech: 'noun', category: 'Stationery' },
      { id: 'l2_v19', lessonNumber: 2, kanji: '鍵', hiragana: 'かぎ', romaji: 'kagi', english: 'key', partOfSpeech: 'noun', category: 'Everyday Objects' },
      { id: 'l2_v20', lessonNumber: 2, kanji: '時計', hiragana: 'とけい', romaji: 'tokei', english: 'watch, clock', partOfSpeech: 'noun', category: 'Everyday Objects' },
      { id: 'l2_v21', lessonNumber: 2, kanji: '傘', hiragana: 'かさ', romaji: 'kasa', english: 'umbrella', partOfSpeech: 'noun', category: 'Everyday Objects' },
      { id: 'l2_v22', lessonNumber: 2, kanji: '鞄', hiragana: 'かばん', romaji: 'kaban', english: 'bag, briefcase', partOfSpeech: 'noun', category: 'Everyday Objects' },
      { id: 'l2_v23', lessonNumber: 2, kanji: 'テレビ', hiragana: 'テレビ', romaji: 'terebi', english: 'television', partOfSpeech: 'noun', category: 'Appliances' },
      { id: 'l2_v24', lessonNumber: 2, kanji: 'ラジオ', hiragana: 'ラジオ', romaji: 'rajio', english: 'radio', partOfSpeech: 'noun', category: 'Appliances' },
      { id: 'l2_v25', lessonNumber: 2, kanji: 'カメラ', hiragana: 'カメラ', romaji: 'kamera', english: 'camera', partOfSpeech: 'noun', category: 'Appliances' },
      { id: 'l2_v26', lessonNumber: 2, kanji: 'コンピューター', hiragana: 'コンピューター', romaji: 'konpyuutaa', english: 'computer', partOfSpeech: 'noun', category: 'Appliances' },
      { id: 'l2_v27', lessonNumber: 2, kanji: '自動車', hiragana: 'じどうしゃ', romaji: 'jidousha', english: 'automobile, car', partOfSpeech: 'noun', category: 'Vehicles' },
      { id: 'l2_v28', lessonNumber: 2, kanji: '机', hiragana: 'つくえ', romaji: 'tsukue', english: 'desk', partOfSpeech: 'noun', category: 'Furniture' },
      { id: 'l2_v29', lessonNumber: 2, kanji: '椅子', hiragana: 'いす', romaji: 'isu', english: 'chair', partOfSpeech: 'noun', category: 'Furniture' },
      { id: 'l2_v30', lessonNumber: 2, kanji: 'チョコレート', hiragana: 'チョコレート', romaji: 'chokoreeto', english: 'chocolate', partOfSpeech: 'noun', category: 'Food' },
      { id: 'l2_v31', lessonNumber: 2, kanji: 'コーヒー', hiragana: 'コーヒー', romaji: 'koohii', english: 'coffee', partOfSpeech: 'noun', category: 'Food' },
      { id: 'l2_v32', lessonNumber: 2, kanji: '英語', hiragana: 'えいご', romaji: 'eigo', english: 'the English language', partOfSpeech: 'noun', category: 'Languages' },
      { id: 'l2_v33', lessonNumber: 2, kanji: '日本語', hiragana: 'にほんご', romaji: 'nihongo', english: 'the Japanese language', partOfSpeech: 'noun', category: 'Languages' },
      { id: 'l2_v34', lessonNumber: 2, kanji: '何', hiragana: 'なん', romaji: 'nan', english: 'what', partOfSpeech: 'pronoun', category: 'Question Words' },
      { id: 'l2_v35', lessonNumber: 2, kanji: 'そう', hiragana: 'そう', romaji: 'sou', english: 'so (affirmative agreement)', partOfSpeech: 'adverb', category: 'Expressions' },
      { id: 'l2_v36', lessonNumber: 2, kanji: '違います', hiragana: 'ちがいます', romaji: 'chigaimasu', english: 'No, it isn\'t / You are wrong', partOfSpeech: 'verb-1', category: 'Expressions' },
      { id: 'l2_v37', lessonNumber: 2, kanji: 'そうですか', hiragana: 'そうですか', romaji: 'sou desu ka', english: 'I see / Is that so?', partOfSpeech: 'phrase', category: 'Expressions' },
      { id: 'l2_v38', lessonNumber: 2, kanji: 'あのう', hiragana: 'あのう', romaji: 'anou', english: 'well, err (used to show hesitation)', partOfSpeech: 'phrase', category: 'Expressions' },
      { id: 'l2_v39', lessonNumber: 2, kanji: 'ほんの気持ちです', hiragana: 'ほんのきもちです', romaji: 'hon no kimochi desu', english: 'It\'s a small token of my gratitude', partOfSpeech: 'phrase', category: 'Expressions' },
      { id: 'l2_v40', lessonNumber: 2, kanji: 'どうぞ', hiragana: 'どうぞ', romaji: 'douzo', english: 'Please / Here you are (when offering)', partOfSpeech: 'phrase', category: 'Expressions' },
      { id: 'l2_v41', lessonNumber: 2, kanji: 'どうも', hiragana: 'どうも', romaji: 'doumo', english: 'Well, thanks', partOfSpeech: 'phrase', category: 'Expressions' },
      { id: 'l2_v42', lessonNumber: 2, kanji: '[どうも] ありがとうございます', hiragana: '[どうも]ありがとうございます', romaji: '[doumo] arigatou gozaimasu', english: 'Thank you [very much]', partOfSpeech: 'phrase', category: 'Greetings' }
    ],
    grammar: [
      {
        id: 'l2_g1',
        lessonNumber: 2,
        title: '1. これ / それ / あれ (Demonstrative Pronouns)',
        structure: 'これ / それ / あれ は Noun です',
        explanation: 'Demonstratives work as nouns. これ refers to something near the speaker. それ refers to something near the listener. あれ refers to something far from both.',
        rules: [
          'これ: near speaker.',
          'それ: near listener.',
          'あれ: far from both speaker and listener.'
        ],
        examples: [
          { japanese: 'それは 辞書ですか。', hiragana: 'それは じしょですか。', romaji: 'Sore wa jisho desu ka.', english: 'Is that a dictionary?' },
          { japanese: 'これは 辞書です。', hiragana: 'これは じしょです。', romaji: 'Kore wa jisho desu.', english: 'This is a dictionary.' }
        ]
      },
      {
        id: 'l2_g2',
        lessonNumber: 2,
        title: '2. この N / その N / あの N (Demonstrative Determiners)',
        structure: 'この / その / あの + Noun',
        explanation: 'この, その, and あの modify nouns directly. "この N" refers to a thing/person near the speaker; "その N" near the listener; "あの N" far from both.',
        rules: [
          'Never use この/その/あの alone without a noun immediately following!'
        ],
        examples: [
          { japanese: 'この 本は わたしのです。', hiragana: 'この ほんは わたしのです。', romaji: 'Kono hon wa watashi no desu.', english: 'This book is mine.' },
          { japanese: 'あの方は どなたですか。', hiragana: 'あのかたは どなたですか。', romaji: 'Ano kata wa donata desu ka.', english: 'Who is that person over there?' }
        ]
      },
      {
        id: 'l2_g3',
        lessonNumber: 2,
        title: '3. そうです / そうじゃ ありません (ちがいます)',
        structure: 'はい、そうです。 / いいえ、そうじゃ ありません (違います)。',
        explanation: 'In noun sentences, the word そう is often used to answer questions requiring affirmative confirmation. To answer negatively, say いいえ、そうじゃ ありません or いいえ、違います (No, it isn\'t / You are mistaken).',
        rules: [
          'はい、そうです: Yes, it is.',
          'いいえ、違います: No, it isn\'t.'
        ],
        examples: [
          { japanese: 'それは テレホンカードですか。・・・はい、そうです。', hiragana: 'それは てれほんかーどですか。・・・はい、そうです。', romaji: 'Sore wa terehon-kaado desu ka? ...Hai, sou desu.', english: 'Is that a telephone card? ...Yes, it is.' },
          { japanese: 'それは テレホンカードですか。・・・いいえ、違います。', hiragana: 'それは てれほんかーどですか。・・・いいえ、ちがいます。', romaji: 'Sore wa terehon-kaado desu ka? ...Iie, chigaimasu.', english: 'Is that a telephone card? ...No, it isn\'t.' }
        ]
      },
      {
        id: 'l2_g4',
        lessonNumber: 2,
        title: '4. S1 か、S2 か (Alternative Questions)',
        structure: 'Sentence 1 か、Sentence 2 か',
        explanation: 'Asks the listener to choose between alternatives S1 and S2. Neither はい nor いいえ is used in response; the chosen option is stated directly.',
        rules: [
          'Do NOT answer with はい or いいえ! State the chosen alternative directly.'
        ],
        examples: [
          { japanese: 'これは 「９」ですか、「７」ですか。・・・「９」です。', hiragana: 'これは 「きゅう」ですか、「なな」ですか。・・・「きゅう」です。', romaji: 'Kore wa "kyuu" desu ka, "nana" desu ka? ..."Kyuu" desu.', english: 'Is this a "9" or a "7"? ...It\'s a "9".' }
        ]
      },
      {
        id: 'l2_g5',
        lessonNumber: 2,
        title: '5. N1 の N2 (Topic / Ownership / Omission)',
        structure: 'Noun 1 の Noun 2',
        explanation: '1) N1 explains what N2 is about (コンピューターの本). 2) N1 explains who owns N2 (わたしの本). N2 is often omitted when obvious, acting as a possessive pronoun ("mine", "Sato\'s"), though NOT when N2 means a person.',
        rules: [
          'あれは だれの 鞄ですか。・・・佐藤さんの [鞄] です (That is Ms. Sato\'s).',
          'Note: When N2 refers to a person, you CANNOT omit it: ミラーさんは IMCの 社員です (Never omit 社員).'
        ],
        examples: [
          { japanese: 'これは コンピューターの 本です。', hiragana: 'これは こんぴゅーたーの ほんです。', romaji: 'Kore wa konpyuutaa no hon desu.', english: 'This is a book on computers.' },
          { japanese: 'あれは だれの 鞄ですか。・・・佐藤さんのです。', hiragana: 'あれは だれの かばんですか。・・・さとうさんのです。', romaji: 'Are wa dare no kaban desu ka? ...Satou-san no desu.', english: 'Whose bag is that? ...It is Ms. Sato\'s.' }
        ]
      },
      {
        id: 'l2_g6',
        lessonNumber: 2,
        title: '6. そうですか (I see / Acknowledgment)',
        structure: 'そうですか (falling intonation)',
        explanation: 'Used when the speaker receives new information and indicates understanding or acknowledgment ("I see" / "Is that so?").',
        rules: [
          'Pronounced with falling intonation (↘).'
        ],
        examples: [
          { japanese: 'この 傘は あなたのですか。・・・いいえ、違います。シュミットさんのです。・・・そうですか。', hiragana: 'この かさは あなたのですか。・・・いいえ、ちがいます。しゅみっとさんのです。・・・そうですか。', romaji: 'Kono kasa wa anata no desu ka? ...Iie, chigaimasu. Shumitto-san no desu. ...Sou desu ka.', english: 'Is this umbrella yours? ...No, it isn\'t. It\'s Mr. Schmidt\'s. ...I see.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l2_ex1',
        lessonNumber: 2,
        type: 'mcq',
        category: 'grammar',
        prompt: 'Choose the correct demonstrative to modify the noun ほん (book):',
        contextSentence: '（　　）本は わたしのです。',
        options: ['この', 'これ', 'ここ', 'こちら'],
        correctAnswer: 'この',
        explanation: 'この must be followed directly by a noun: この本 (this book).'
      },
      {
        id: 'l2_ex2',
        lessonNumber: 2,
        type: 'fill_blank',
        category: 'grammar',
        prompt: 'Choose the correct response when someone asks if something is a dictionary and it is NOT:',
        contextSentence: 'それは 辞書ですか。・・・いいえ、（　　）。',
        options: ['違います', 'そうです', 'ありません', 'でした'],
        correctAnswer: '違います',
        explanation: 'いいえ、違います means "No, it isn\'t / You are mistaken".'
      },
      {
        id: 'l2_ex3',
        lessonNumber: 2,
        type: 'sentence_formation',
        category: 'grammar',
        prompt: 'Arrange the tiles to say: "Whose bag is that over there?"',
        wordTiles: ['あれは', 'だれの', 'かばんですか'],
        correctAnswer: 'あれは だれの かばんですか',
        explanation: 'あれは (that over there) + だれの (whose) + かばんですか (is the bag?).'
      }
    ],
    dialogue: {
      title: 'ほんの気持ちです (A small token)',
      situation: 'Santos moving into apartment 408 and greeting Yamada with a small welcoming gift.',
      lines: [
        { speaker: '山田', japanese: 'はい。どなたですか。', hiragana: 'はい。どなたですか。', english: 'Yes. Who is it?' },
        { speaker: 'サントス', japanese: '408号室の サントスです。こんにちは。サントスです。', hiragana: 'よんまるはちごうしつの さんとすです。こんにちは。さんとすです。', english: 'I am Santos from 408. Hello, I am Santos.' },
        { speaker: 'サントス', japanese: 'これから お世話になります。どうぞ よろしく お願いします。', hiragana: 'これから おせわになります。どうぞ よろしく おねがいします。', english: 'I hope for your kind assistance hereafter. Pleased to meet you.' },
        { speaker: '山田', japanese: 'こちらこそ よろしく。', hiragana: 'こちらこそ よろしく。', english: 'The pleasure is mine.' },
        { speaker: 'サントス', japanese: 'あのう、これ、ほんの 気持ちです。コーヒーです。どうぞ。', hiragana: 'あのう、これ、ほんの きもちです。こーひーです。どうぞ。', english: 'Er, this is just a little something. It\'s coffee. Please.' },
        { speaker: '山田', japanese: 'どうも ありがとう ございます。', hiragana: 'どうも ありがとう ございます。', english: 'Thank you very much.' }
      ]
    }
  },

  // =========================================================================
  // LESSON 3: Places, Locations, Prices, Department Stores
  // Reference: Minna no Nihongo I, Lesson 3 (Pages 24-29 / Book pages 44-49)
  // =========================================================================
  {
    id: 3,
    lessonNumber: 3,
    level: 'N5',
    title: 'Lesson 3: Places, Directions, Prices & Shopping',
    titleJapanese: '第３課：場所・方角・値段（ここ・そこ・あそこ・どこ・いくら）',
    theme: 'ここは 教室です。事務所は どちらですか。これは いくらですか。',
    description: 'Learn to ask and explain locations (ここ・そこ・あそこ・どこ), polite directions (こちら・そちら・あちら・どちら), origin of products, and department store floors and prices.',
    keyPhrases: [
      'ここは 食堂です。 (This is a dining hall.)',
      '電話は あそこです。 (The telephone is over there.)',
      '事務所は どちらですか。 (Where is the office? [Polite])',
      'これは 日本の コンピューターです。 (This is a computer made in Japan.)',
      'この 時計は いくらですか。 (How much is this watch?)',
      'これを ください。 (Please give me this.)'
    ],
    vocabulary: [
      { id: 'l3_v1', lessonNumber: 3, kanji: 'ここ', hiragana: 'ここ', romaji: 'koko', english: 'here, this place', partOfSpeech: 'pronoun', category: 'Locations' },
      { id: 'l3_v2', lessonNumber: 3, kanji: 'そこ', hiragana: 'そこ', romaji: 'sore', english: 'there, that place near you', partOfSpeech: 'pronoun', category: 'Locations' },
      { id: 'l3_v3', lessonNumber: 3, kanji: 'あそこ', hiragana: 'あそこ', romaji: 'asoko', english: 'that place over there', partOfSpeech: 'pronoun', category: 'Locations' },
      { id: 'l3_v4', lessonNumber: 3, kanji: 'どこ', hiragana: 'どこ', romaji: 'doko', english: 'where, what place', partOfSpeech: 'pronoun', category: 'Locations' },
      { id: 'l3_v5', lessonNumber: 3, kanji: 'こちら', hiragana: 'こちら', romaji: 'kochira', english: 'this way, this place (polite equivalent of ここ)', partOfSpeech: 'pronoun', category: 'Directions' },
      { id: 'l3_v6', lessonNumber: 3, kanji: 'そちら', hiragana: 'そちら', romaji: 'sochira', english: 'that way, that place (polite equivalent of そこ)', partOfSpeech: 'pronoun', category: 'Directions' },
      { id: 'l3_v7', lessonNumber: 3, kanji: 'あちら', hiragana: 'あちら', romaji: 'achira', english: 'that way, that place over there (polite of あそこ)', partOfSpeech: 'pronoun', category: 'Directions' },
      { id: 'l3_v8', lessonNumber: 3, kanji: 'どちら', hiragana: 'どちら', romaji: 'dochira', english: 'which way, where (polite equivalent of どこ)', partOfSpeech: 'pronoun', category: 'Directions' },
      { id: 'l3_v9', lessonNumber: 3, kanji: '教室', hiragana: 'きょうしつ', romaji: 'kyoushitsu', english: 'classroom', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l3_v10', lessonNumber: 3, kanji: '食堂', hiragana: 'しょくどう', romaji: 'shokudou', english: 'dining hall, canteen', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l3_v11', lessonNumber: 3, kanji: '事務所', hiragana: 'じむしょ', romaji: 'jimusho', english: 'office', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l3_v12', lessonNumber: 3, kanji: '会議室', hiragana: 'かいぎしつ', romaji: 'kaigishitsu', english: 'conference room, assembly room', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l3_v13', lessonNumber: 3, kanji: '受付', hiragana: 'うけつけ', romaji: 'uketsuke', english: 'reception desk', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l3_v14', lessonNumber: 3, kanji: 'ロビー', hiragana: 'ロビー', romaji: 'robii', english: 'lobby', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l3_v15', lessonNumber: 3, kanji: '部屋', hiragana: 'へや', romaji: 'heya', english: 'room', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l3_v16', lessonNumber: 3, kanji: 'トイレ', hiragana: 'トイレ', romaji: 'toire', english: 'toilet, rest room (also お手洗い おてあらい)', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l3_v17', lessonNumber: 3, kanji: '階段', hiragana: 'かいだん', romaji: 'kaidan', english: 'staircase', partOfSpeech: 'noun', category: 'Facilities' },
      { id: 'l3_v18', lessonNumber: 3, kanji: 'エレベーター', hiragana: 'エレベーター', romaji: 'erebeetaa', english: 'elevator, lift', partOfSpeech: 'noun', category: 'Facilities' },
      { id: 'l3_v19', lessonNumber: 3, kanji: 'エスカレーター', hiragana: 'エスカレーター', romaji: 'esukareetaa', english: 'escalator', partOfSpeech: 'noun', category: 'Facilities' },
      { id: 'l3_v20', lessonNumber: 3, kanji: '[お]国', hiragana: '[お]くに', romaji: '[o]kuni', english: 'country', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l3_v21', lessonNumber: 3, kanji: '会社', hiragana: 'かいしゃ', romaji: 'kaisha', english: 'company', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l3_v22', lessonNumber: 3, kanji: '家', hiragana: 'うち', romaji: 'uchi', english: 'house, home', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l3_v23', lessonNumber: 3, kanji: '電話', hiragana: 'でんわ', romaji: 'denwa', english: 'telephone, telephone call', partOfSpeech: 'noun', category: 'Objects' },
      { id: 'l3_v24', lessonNumber: 3, kanji: '靴', hiragana: 'くつ', romaji: 'kutsu', english: 'shoes', partOfSpeech: 'noun', category: 'Clothing' },
      { id: 'l3_v25', lessonNumber: 3, kanji: 'ネクタイ', hiragana: 'ネクタイ', romaji: 'nekutai', english: 'necktie', partOfSpeech: 'noun', category: 'Clothing' },
      { id: 'l3_v26', lessonNumber: 3, kanji: 'ワイン', hiragana: 'ワイン', romaji: 'wain', english: 'wine', partOfSpeech: 'noun', category: 'Food' },
      { id: 'l3_v27', lessonNumber: 3, kanji: 'たばこ', hiragana: 'たばこ', romaji: 'tabako', english: 'tobacco, cigarette', partOfSpeech: 'noun', category: 'Objects' },
      { id: 'l3_v28', lessonNumber: 3, kanji: '売り場', hiragana: 'うりば', romaji: 'uriba', english: 'department, counter (in store)', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l3_v29', lessonNumber: 3, kanji: '地下', hiragana: 'ちか', romaji: 'chika', english: 'basement', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l3_v30', lessonNumber: 3, kanji: '〜階', hiragana: '〜かい (〜がい)', romaji: '-kai (-gai)', english: '-th floor', partOfSpeech: 'counter', category: 'Counters' },
      { id: 'l3_v31', lessonNumber: 3, kanji: '何階', hiragana: 'なんがい', romaji: 'nangai', english: 'what floor', partOfSpeech: 'phrase', category: 'Question Words' },
      { id: 'l3_v32', lessonNumber: 3, kanji: '〜円', hiragana: '〜えん', romaji: '-en', english: '- yen', partOfSpeech: 'counter', category: 'Numbers' },
      { id: 'l3_v33', lessonNumber: 3, kanji: 'いくら', hiragana: 'いくら', romaji: 'ikura', english: 'how much (price)', partOfSpeech: 'phrase', category: 'Question Words' },
      { id: 'l3_v34', lessonNumber: 3, kanji: '百', hiragana: 'ひゃく', romaji: 'hyaku', english: 'hundred', partOfSpeech: 'counter', category: 'Numbers' },
      { id: 'l3_v35', lessonNumber: 3, kanji: '千', hiragana: 'せん', romaji: 'sen', english: 'thousand', partOfSpeech: 'counter', category: 'Numbers' },
      { id: 'l3_v36', lessonNumber: 3, kanji: '万', hiragana: 'まん', romaji: 'man', english: 'ten thousand', partOfSpeech: 'counter', category: 'Numbers' },
      { id: 'l3_v37', lessonNumber: 3, kanji: 'すみません', hiragana: 'すみません', romaji: 'sumimasen', english: 'Excuse me', partOfSpeech: 'phrase', category: 'Greetings' },
      { id: 'l3_v38', lessonNumber: 3, kanji: '〜で ございます', hiragana: '〜で ございます', romaji: '~de gozaimasu', english: '(polite equivalent of です)', partOfSpeech: 'phrase', category: 'Expressions' },
      { id: 'l3_v39', lessonNumber: 3, kanji: '見せてください', hiragana: 'みせてください', romaji: 'misete kudasai', english: 'Please show me [~]', partOfSpeech: 'phrase', category: 'Expressions' },
      { id: 'l3_v40', lessonNumber: 3, kanji: 'じゃ', hiragana: 'じゃ', romaji: 'ja', english: 'well, then, in that case', partOfSpeech: 'conjunction', category: 'Expressions' },
      { id: 'l3_v41', lessonNumber: 3, kanji: 'ください', hiragana: 'ください', romaji: 'kudasai', english: 'Give me [~], please', partOfSpeech: 'phrase', category: 'Expressions' }
    ],
    grammar: [
      {
        id: 'l3_g1',
        lessonNumber: 3,
        title: '1. ここ / そこ / あそこ / こちら / そちら / あちら',
        structure: 'ここ / そこ / あそこ は Noun(place) です',
        explanation: 'Demonstratives referring to place. ここ is where speaker is; そこ is where listener is; あそこ is far from both. こちら, そちら, and あちら refer to direction, and are also used to refer to location as the polite equivalents of ここ, そこ, and あそこ.',
        rules: [
          'ここ: place near speaker.',
          'そこ: place near listener.',
          'あそこ: place distant from both.',
          'こちら / そちら / あちら / どちら: polite equivalents.'
        ],
        examples: [
          { japanese: 'お風呂は あそこです。', hiragana: 'おふろは あそこです。', romaji: 'Ofuro wa asoko desu.', english: 'The bath is over there.' },
          { japanese: 'エレベーターは あちらです。', hiragana: 'えれべーたーは あちらです。', romaji: 'Erebeetaa wa achira desu.', english: 'The elevator is in that direction.' }
        ]
      },
      {
        id: 'l3_g2',
        lessonNumber: 3,
        title: '2. N1 は N2(place) です (Explaining Location)',
        structure: 'Noun 1 は Noun 2(place) です',
        explanation: 'Using this sentence pattern, you can explain where a place, a thing, or a person is located.',
        rules: [
          '電話は 2階です (The telephone is on the 2nd floor).',
          '山田さんは 事務所です (Mr. Yamada is in the office).'
        ],
        examples: [
          { japanese: 'お手洗いは あそこです。', hiragana: 'おてあらいは あそこです。', romaji: 'Otearai wa asoko desu.', english: 'The rest room is over there.' },
          { japanese: '山田さんは 事務所です。', hiragana: 'やまださんは じむしょです。', romaji: 'Yamada-san wa jimusho desu.', english: 'Mr. Yamada is in the office.' }
        ]
      },
      {
        id: 'l3_g3',
        lessonNumber: 3,
        title: '3. どこ / どちら (Asking Where / Which Direction)',
        structure: 'N は どこ / どちら ですか',
        explanation: 'どこ means "where", and どちら means "which direction" (also "where" in polite speech). どこ or どちら is also used to ask the name of a country, company, school, or organization a person belongs to (you CANNOT use なん here).',
        rules: [
          '学校は どこですか (What\'s the name of your school?). NEVER say *学校は何ですか.',
          '会社は どちらですか (What company do you work for?).'
        ],
        examples: [
          { japanese: 'お手洗いは どこですか。・・・あそこです。', hiragana: 'おてあらいは どこですか。・・・あそこです。', romaji: 'Otearai wa doko desu ka? ...Asoko desu.', english: 'Where is the restroom? ...It\'s over there.' },
          { japanese: '会社は どちらですか。', hiragana: 'かいしゃは どちらですか。', romaji: 'Kaisha wa dochira desu ka.', english: 'What company do you work for?' }
        ]
      },
      {
        id: 'l3_g4',
        lessonNumber: 3,
        title: '4. N1 の N2 (Country / Maker of Product)',
        structure: 'Country/Company(N1) の Product(N2)',
        explanation: 'When N1 is the name of a country and N2 is a product, it means N2 is made in that country. When N1 is a company name, N2 is made by that company. どこ is used to ask where or by whom N2 was produced.',
        rules: [
          'これは どこの コンピューターですか。・・・日本の コンピューターです。'
        ],
        examples: [
          { japanese: 'これは どこの コンピューターですか。・・・日本の コンピューターです。', hiragana: 'これは どこの こんぴゅーたーですか。・・・にほんの こんぴゅーたーです。', romaji: 'Kore wa doko no konpyuutaa desu ka? ...Nihon no konpyuutaa desu.', english: 'Where is this computer made? ...It is made in Japan.' }
        ]
      },
      {
        id: 'l3_g5',
        lessonNumber: 3,
        title: '5. The こ / そ / あ / ど Demonstrative System',
        structure: 'こ (near speaker) / そ (near listener) / あ (far) / ど (question)',
        explanation: 'Comprehensive demonstrative system: things (これ・それ・あれ・どれ), determiners (このN・そのN・あのN・どのN), places (ここ・そこ・あそこ・どこ), directions/polite places (こちら・そちら・あちら・どちら).',
        rules: [
          'Consistent prefix consonants: ko- (proximal), so- (mesial), a- (distal), do- (interrogative).'
        ],
        examples: [
          { japanese: 'この 時計は いくらですか。・・・18,600円です。', hiragana: 'この とけいは いくらですか。・・・いちまんはっせんろっぴゃくえんです。', romaji: 'Kono tokei wa ikura desu ka? ...Ichiman hassen roppyaku-en desu.', english: 'How much is this watch? ...It is 18,600 yen.' }
        ]
      },
      {
        id: 'l3_g6',
        lessonNumber: 3,
        title: '6. お国 (Polite Prefix お〜)',
        structure: 'お + Noun',
        explanation: 'The prefix お is added to words concerning the listener or a third person in order to express the speaker\'s respect.',
        rules: [
          '[お]国は どちらですか (Where are you from?).'
        ],
        examples: [
          { japanese: '[お]国は どちらですか。', hiragana: 'おくには どちらですか。', romaji: '[O]kuni wa dochira desu ka.', english: 'Where are you from?' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l3_ex1',
        lessonNumber: 3,
        type: 'mcq',
        category: 'grammar',
        prompt: 'To ask what company someone works for politely, which question word is used?',
        contextSentence: '会社は（　　）ですか。',
        options: ['どちら', '何', 'だれ', 'いつ'],
        correctAnswer: 'どちら',
        explanation: 'Use どちら (or どこ) to ask for company/school affiliation, never 何.'
      },
      {
        id: 'l3_ex2',
        lessonNumber: 3,
        type: 'fill_blank',
        category: 'grammar',
        prompt: 'Fill in the blank to say "The conference room is on the 3rd floor":',
        contextSentence: '会議室は ３（　　）です。',
        options: ['階', '時', '歳', '人'],
        correctAnswer: '階',
        explanation: '階 (かい/がい) is the counter for building floors: 3階 (さんがい).'
      },
      {
        id: 'l3_ex3',
        lessonNumber: 3,
        type: 'sentence_formation',
        category: 'grammar',
        prompt: 'Arrange the tiles to say: "How much is this watch?"',
        wordTiles: ['この時計は', 'いくらですか'],
        correctAnswer: 'この時計は いくらですか',
        explanation: 'この時計は (This watch) + いくらですか (how much is it?).'
      }
    ],
    dialogue: {
      title: 'これを ください (I\'ll take it)',
      situation: 'Maria Santos shopping for wine at a department store.',
      lines: [
        { speaker: 'マリア', japanese: 'すみません。ワイン売り場は どこですか。', hiragana: 'すみません。わいんうりばは どこですか。', english: 'Excuse me. Where is the wine department?' },
        { speaker: '店員A', japanese: '地下1階で ございます。', hiragana: 'ちかいっかいで ございます。', english: 'It is on the first basement floor.' },
        { speaker: 'マリア', japanese: 'すみません。その ワインを 見せて ください。', hiragana: 'すみません。その わいんを みせて ください。', english: 'Excuse me. Could you please show me that wine?' },
        { speaker: '店員B', japanese: 'はい、どうぞ。フランスの ワインです。', hiragana: 'はい、どうぞ。ふらんすの わいんです。', english: 'Certainly. Here you are. It is French wine.' },
        { speaker: 'マリア', japanese: 'いくらですか。', hiragana: 'いくらですか。', english: 'How much is it?' },
        { speaker: '店員B', japanese: '2,500円です。', hiragana: 'にせんごひゃくえんです。', english: 'It is 2,500 yen.' },
        { speaker: 'マリア', japanese: 'じゃ、これを ください。', hiragana: 'じゃ、これを ください。', english: 'Well, I\'ll take it.' }
      ]
    }
  },

  // =========================================================================
  // LESSON 4: Time, Daily Schedules, Days of the Week, V-ます Tenses
  // Reference: Minna no Nihongo I, Lesson 4 (Pages 30-35 / Book pages 50-55)
  // =========================================================================
  {
    id: 4,
    lessonNumber: 4,
    level: 'N5',
    title: 'Lesson 4: Time, Daily Schedules & Verb Tenses',
    titleJapanese: '第４課：時刻・日常の動詞（起きます・寝ます・働きます）・〜から〜まで',
    theme: '今 4時5分です。わたしは 毎朝 6時に 起きます。',
    description: 'Learn telling time and minutes (時・分), asking "what time" (何時・何分), days of the week (月〜日), verb tense conjugations (ます・ません・ました・ませんでした), time particle に, and time span から〜まで.',
    keyPhrases: [
      '今 4時5分です。 (It is five past four now.)',
      'わたしは 9時から 5時まで 働きます。 (I work from nine to five.)',
      '毎朝 6時に 起きます。 (I get up at six every morning.)',
      'きのう 勉強しました。 (I studied yesterday.)',
      'そちらは 何時までですか。 (Until what time are you open?)'
    ],
    vocabulary: [
      { id: 'l4_v1', lessonNumber: 4, kanji: '起きます', hiragana: 'おきます', romaji: 'okimasu', english: 'get up, wake up', partOfSpeech: 'verb-2', category: 'Daily Actions' },
      { id: 'l4_v2', lessonNumber: 4, kanji: '寝ます', hiragana: 'ねます', romaji: 'nemasu', english: 'sleep, go to bed', partOfSpeech: 'verb-2', category: 'Daily Actions' },
      { id: 'l4_v3', lessonNumber: 4, kanji: '働きます', hiragana: 'はたらきます', romaji: 'hatarakimasu', english: 'work', partOfSpeech: 'verb-1', category: 'Daily Actions' },
      { id: 'l4_v4', lessonNumber: 4, kanji: '休みます', hiragana: 'やすみます', romaji: 'yasumimasu', english: 'take a rest, take a holiday', partOfSpeech: 'verb-1', category: 'Daily Actions' },
      { id: 'l4_v5', lessonNumber: 4, kanji: '勉強します', hiragana: 'べんきょうします', romaji: 'benkyoushimasu', english: 'study', partOfSpeech: 'verb-3', category: 'Daily Actions' },
      { id: 'l4_v6', lessonNumber: 4, kanji: '終わります', hiragana: 'おわります', romaji: 'owarimasu', english: 'finish', partOfSpeech: 'verb-1', category: 'Daily Actions' },
      { id: 'l4_v7', lessonNumber: 4, kanji: 'デパート', hiragana: 'デパート', romaji: 'depaato', english: 'department store', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l4_v8', lessonNumber: 4, kanji: '銀行', hiragana: 'ぎんこう', romaji: 'ginkou', english: 'bank', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l4_v9', lessonNumber: 4, kanji: '郵便局', hiragana: 'ゆうびんきょく', romaji: 'yuubinkyoku', english: 'post office', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l4_v10', lessonNumber: 4, kanji: '図書館', hiragana: 'としょかん', romaji: 'toshokan', english: 'library', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l4_v11', lessonNumber: 4, kanji: '美術館', hiragana: 'びじゅつかん', romaji: 'bijutsukan', english: 'art museum', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l4_v12', lessonNumber: 4, kanji: '今', hiragana: 'いま', romaji: 'ima', english: 'now', partOfSpeech: 'noun', category: 'Time' },
      { id: 'l4_v13', lessonNumber: 4, kanji: '〜時', hiragana: '〜じ', romaji: '-ji', english: '- o\'clock', partOfSpeech: 'counter', category: 'Time' },
      { id: 'l4_v14', lessonNumber: 4, kanji: '〜分', hiragana: '〜ふん (〜ぷん)', romaji: '-fun (-pun)', english: '- minute', partOfSpeech: 'counter', category: 'Time' },
      { id: 'l4_v15', lessonNumber: 4, kanji: '半', hiragana: 'はん', romaji: 'han', english: 'half (e.g. 2時半 = 2:30)', partOfSpeech: 'noun', category: 'Time' },
      { id: 'l4_v16', lessonNumber: 4, kanji: '何時', hiragana: 'なんじ', romaji: 'nanji', english: 'what time', partOfSpeech: 'phrase', category: 'Time' },
      { id: 'l4_v17', lessonNumber: 4, kanji: '何分', hiragana: 'なんぷん', romaji: 'nanpun', english: 'what minute', partOfSpeech: 'phrase', category: 'Time' },
      { id: 'l4_v18', lessonNumber: 4, kanji: '午前', hiragana: 'ごぜん', romaji: 'gozen', english: 'a.m., morning', partOfSpeech: 'noun', category: 'Time' },
      { id: 'l4_v19', lessonNumber: 4, kanji: '午後', hiragana: 'ごご', romaji: 'gogo', english: 'p.m., afternoon', partOfSpeech: 'noun', category: 'Time' },
      { id: 'l4_v20', lessonNumber: 4, kanji: '朝', hiragana: 'あさ', romaji: 'asa', english: 'morning', partOfSpeech: 'noun', category: 'Time' },
      { id: 'l4_v21', lessonNumber: 4, kanji: '昼', hiragana: 'ひる', romaji: 'hiru', english: 'daytime, noon', partOfSpeech: 'noun', category: 'Time' },
      { id: 'l4_v22', lessonNumber: 4, kanji: '晩', hiragana: 'ばん (よる)', romaji: 'ban (yoru)', english: 'night, evening', partOfSpeech: 'noun', category: 'Time' },
      { id: 'l4_v23', lessonNumber: 4, kanji: '一昨日', hiragana: 'おととい', romaji: 'ototoi', english: 'the day before yesterday', partOfSpeech: 'noun', category: 'Days' },
      { id: 'l4_v24', lessonNumber: 4, kanji: '昨日', hiragana: 'きのう', romaji: 'kinou', english: 'yesterday', partOfSpeech: 'noun', category: 'Days' },
      { id: 'l4_v25', lessonNumber: 4, kanji: '今日', hiragana: 'きょう', romaji: 'kyou', english: 'today', partOfSpeech: 'noun', category: 'Days' },
      { id: 'l4_v26', lessonNumber: 4, kanji: '明日', hiragana: 'あした', romaji: 'ashita', english: 'tomorrow', partOfSpeech: 'noun', category: 'Days' },
      { id: 'l4_v27', lessonNumber: 4, kanji: '明後日', hiragana: 'あさって', romaji: 'asatte', english: 'the day after tomorrow', partOfSpeech: 'noun', category: 'Days' },
      { id: 'l4_v28', lessonNumber: 4, kanji: '今朝', hiragana: 'けさ', romaji: 'kesa', english: 'this morning', partOfSpeech: 'noun', category: 'Time' },
      { id: 'l4_v29', lessonNumber: 4, kanji: '今晩', hiragana: 'こんばん', romaji: 'konban', english: 'this evening, tonight', partOfSpeech: 'noun', category: 'Time' },
      { id: 'l4_v30', lessonNumber: 4, kanji: '休み', hiragana: 'やすみ', romaji: 'yasumi', english: 'rest, a holiday, a day off', partOfSpeech: 'noun', category: 'General' },
      { id: 'l4_v31', lessonNumber: 4, kanji: '昼休み', hiragana: 'ひるやすみ', romaji: 'hiruyasumi', english: 'lunchtime', partOfSpeech: 'noun', category: 'Time' },
      { id: 'l4_v32', lessonNumber: 4, kanji: '毎朝', hiragana: 'まいあさ', romaji: 'maiasa', english: 'every morning', partOfSpeech: 'noun', category: 'Frequency' },
      { id: 'l4_v33', lessonNumber: 4, kanji: '毎晩', hiragana: 'まいばん', romaji: 'maiban', english: 'every night', partOfSpeech: 'noun', category: 'Frequency' },
      { id: 'l4_v34', lessonNumber: 4, kanji: '毎日', hiragana: 'まいにち', romaji: 'mainichi', english: 'every day', partOfSpeech: 'noun', category: 'Frequency' },
      { id: 'l4_v35', lessonNumber: 4, kanji: '月曜日', hiragana: 'げつようび', romaji: 'getsuyoubi', english: 'Monday', partOfSpeech: 'noun', category: 'Days of Week' },
      { id: 'l4_v36', lessonNumber: 4, kanji: '火曜日', hiragana: 'かようび', romaji: 'kayoubi', english: 'Tuesday', partOfSpeech: 'noun', category: 'Days of Week' },
      { id: 'l4_v37', lessonNumber: 4, kanji: '水曜日', hiragana: 'すいようび', romaji: 'suiyoubi', english: 'Wednesday', partOfSpeech: 'noun', category: 'Days of Week' },
      { id: 'l4_v38', lessonNumber: 4, kanji: '木曜日', hiragana: 'もくようび', romaji: 'mokuyoubi', english: 'Thursday', partOfSpeech: 'noun', category: 'Days of Week' },
      { id: 'l4_v39', lessonNumber: 4, kanji: '金曜日', hiragana: 'きんようび', romaji: 'kinyoubi', english: 'Friday', partOfSpeech: 'noun', category: 'Days of Week' },
      { id: 'l4_v40', lessonNumber: 4, kanji: '土曜日', hiragana: 'どようび', romaji: 'doyoubi', english: 'Saturday', partOfSpeech: 'noun', category: 'Days of Week' },
      { id: 'l4_v41', lessonNumber: 4, kanji: '日曜日', hiragana: 'にちようび', romaji: 'nichiyoubi', english: 'Sunday', partOfSpeech: 'noun', category: 'Days of Week' },
      { id: 'l4_v42', lessonNumber: 4, kanji: '何曜日', hiragana: 'なんようび', romaji: 'nanyoubi', english: 'what day of the week', partOfSpeech: 'phrase', category: 'Days of Week' },
      { id: 'l4_v43', lessonNumber: 4, kanji: '番号', hiragana: 'ばんごう', romaji: 'bangou', english: 'number', partOfSpeech: 'noun', category: 'Numbers' },
      { id: 'l4_v44', lessonNumber: 4, kanji: '何番', hiragana: 'なんばん', romaji: 'nanban', english: 'what number', partOfSpeech: 'phrase', category: 'Numbers' },
      { id: 'l4_v45', lessonNumber: 4, kanji: '〜から', hiragana: '〜から', romaji: '~kara', english: 'from ~', partOfSpeech: 'particle', category: 'Particles' },
      { id: 'l4_v46', lessonNumber: 4, kanji: '〜まで', hiragana: '〜まで', romaji: '~made', english: 'up to ~, until ~', partOfSpeech: 'particle', category: 'Particles' },
      { id: 'l4_v47', lessonNumber: 4, kanji: '〜と〜', hiragana: '〜と〜', romaji: '~to~', english: 'and (used to connect nouns)', partOfSpeech: 'particle', category: 'Particles' },
      { id: 'l4_v48', lessonNumber: 4, kanji: '大変ですね', hiragana: 'たいへんですね', romaji: 'taihen desu ne', english: 'That\'s tough, isn\'t it?', partOfSpeech: 'phrase', category: 'Expressions' }
    ],
    grammar: [
      {
        id: 'l4_g1',
        lessonNumber: 4,
        title: '1. 今 ー時ー分です (Expressing Time)',
        structure: '今 [Hour] 時 [Minute] 分 です',
        explanation: 'To express time, the counter suffixes 時 (o\'clock) and 分 (minutes) are used. The interrogative 何 is combined with them to ask: 何時 (what time) and 何分 (what minute).',
        rules: [
          '分 is read ふん after 2, 5, 7, 9, and ぷん after 1, 3, 4, 6, 8, 10 (1分: いっぷん, 3分: さんぷん, 6分: ろっぷん, 8分: はっぷん, 10分: じゅっぷん).',
          '半 (はん) means half: 7時半 (7:30).'
        ],
        examples: [
          { japanese: '今 何時ですか。・・・7時10分です。', hiragana: 'いま なんじですか。・・・しちじじゅっぷんです。', romaji: 'Ima nanji desu ka? ...Shichiji juppun desu.', english: 'What time is it now? ...It\'s seven ten.' },
          { japanese: 'ニューヨークは 今 何時ですか。・・・午前 4時です。', hiragana: 'にゅーよーくは いま なんじですか。・・・ごぜん よじです。', romaji: 'Nyuuyooku wa ima nanji desu ka? ...Gozen yoji desu.', english: 'In New York what time is it now? ...It\'s 4 a.m.' }
        ]
      },
      {
        id: 'l4_g2',
        lessonNumber: 4,
        title: '2. V ます (Verb Predicates)',
        structure: 'Verb + ます',
        explanation: 'A verb ending with ます works as a predicate and makes the sentence polite towards the listener.',
        rules: [
          'Affirmative polite ending for present/future habitual actions.'
        ],
        examples: [
          { japanese: 'わたしは 毎日 勉強します。', hiragana: 'わたしは まいにち べんきょうします。', romaji: 'Watashi wa mainichi benkyoushimasu.', english: 'I study every day.' }
        ]
      },
      {
        id: 'l4_g3',
        lessonNumber: 4,
        title: '3. Verb Tense System (ます / ません / ました / ませんでした)',
        structure: 'Non-past: ます / ません | Past: ました / ませんでした',
        explanation: 'ます expresses non-past (future or habitual truth). ません is non-past negative. ました is past affirmative. ませんでした is past negative.',
        rules: [
          '起きる: 起きます (get up) / 起きません (do not get up) / 起きました (got up) / 起きませんでした (did not get up).',
          'In questions, repeat the verb: 勉強しましたか。・・・はい、勉強しました。 / いいえ、勉強しませんでした。'
        ],
        examples: [
          { japanese: '毎朝 6時に 起きます。', hiragana: 'まいあさ ろくじに おきます。', romaji: 'Maiasa rokuji ni okimasu.', english: 'I get up at six every morning.' },
          { japanese: 'きのう 勉強しましたか。・・・はい、勉強しました。', hiragana: 'きのう べんきょうしましたか。・・・はい、べんきょうしました。', romaji: 'Kinou benkyoushimashita ka? ...Hai, benkyoushimashita.', english: 'Did you study yesterday? ...Yes, I did.' }
        ]
      },
      {
        id: 'l4_g4',
        lessonNumber: 4,
        title: '4. N(time) に V (Point of Time Marker)',
        structure: 'Specific Time + に + Verb',
        explanation: 'When a verb denotes a momentary action, the time at which it occurs is marked with particle に. に is added when the time noun uses a numeral (clock time, dates). It is NOT added to relative times (きのう, きょう, あした, まいあさ).',
        rules: [
          'Use に with numerals: 6時半に 起きます (Correct).',
          'Do NOT use に with relative time words: *あしたに 行きます (INCORRECT! Say あした 行きます).'
        ],
        examples: [
          { japanese: '6時半に 起きます。', hiragana: 'ろくじはんに おきます。', romaji: 'Rokujihan ni okimasu.', english: 'I get up at six thirty.' },
          { japanese: '日曜日[に] 奈良へ 行きます。', hiragana: 'にちようび[に] ならへ いきます。', romaji: 'Nichiyoubi [ni] Nara e ikimasu.', english: 'I\'m going to Nara on Sunday.' }
        ]
      },
      {
        id: 'l4_g5',
        lessonNumber: 4,
        title: '5. N1 から N2 まで (Starting & Finishing Limits)',
        structure: 'N1 から N2 まで',
        explanation: 'から indicates the starting time or place, and まで indicates the finishing time or place. They can be used together or separately.',
        rules: [
          '9時から 5時まで 働きます (I work from 9 to 5).',
          '銀行は 9時から 3時までです (Can be followed directly by です).'
        ],
        examples: [
          { japanese: '9時から 5時まで 働きます。', hiragana: 'くじから ごじまで はたらきます。', romaji: 'Kuji kara goji made hatarakimasu.', english: 'I work from nine to five.' },
          { japanese: '昼休みは 12時からです。', hiragana: 'ひるやすみは じゅうにじからです。', romaji: 'Hiruyasumi wa juuniji kara desu.', english: 'Lunchtime starts at twelve.' }
        ]
      },
      {
        id: 'l4_g6',
        lessonNumber: 4,
        title: '6. N1 と N2 (Connecting Nouns in Coordinate Relation)',
        structure: 'Noun 1 と Noun 2',
        explanation: 'The particle と connects two nouns in coordinate relation ("and").',
        rules: [
          '銀行の 休みは 土曜日と 日曜日です。'
        ],
        examples: [
          { japanese: '銀行の 休みは 土曜日と 日曜日です。', hiragana: 'ぎんこうの やすみは どようびと にちようびです。', romaji: 'Ginkou no yasumi wa doyoubi to nichiyoubi desu.', english: 'The bank is closed on Saturdays and Sundays.' }
        ]
      },
      {
        id: 'l4_g7',
        lessonNumber: 4,
        title: '7. S ね (Confirmation / Sympathy)',
        structure: 'Sentence + ね',
        explanation: 'ね is attached to the end of a sentence to add feeling. It shows the speaker\'s sympathy or expectation that the listener will agree ("..., right?").',
        rules: [
          '大変ですね (That must be tough!).',
          '871の 6813ですね (871-6813, right?).'
        ],
        examples: [
          { japanese: '毎日 10時ごろまで 勉強します。・・・大変ですね。', hiragana: 'まいにち じゅうじごろまで べんきょうします。・・・たいへんですね。', romaji: 'Mainichi juuji goro made benkyoushimasu. ...Taihen desu ne.', english: 'I study till about ten every day. ...That must be hard.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l4_ex1',
        lessonNumber: 4,
        type: 'mcq',
        category: 'grammar',
        prompt: 'Choose the correct particle for specific time: "I get up at 6:00."',
        contextSentence: 'わたしは 6時（　　）起きます。',
        options: ['に', 'で', 'を', 'へ'],
        correctAnswer: 'に',
        explanation: 'Specific clock times with numerals take particle に.'
      },
      {
        id: 'l4_ex2',
        lessonNumber: 4,
        type: 'fill_blank',
        category: 'grammar',
        prompt: 'Choose the correct past negative form: "I did not study yesterday."',
        contextSentence: 'きのう 勉強（　　）。',
        options: ['しませんでした', 'しません', 'しました', 'しない'],
        correctAnswer: 'しませんでした',
        explanation: 'Past negative of します is しませんでした.'
      },
      {
        id: 'l4_ex3',
        lessonNumber: 4,
        type: 'sentence_formation',
        category: 'grammar',
        prompt: 'Arrange the tiles to say: "I work from 9:00 to 5:00."',
        wordTiles: ['9時から', '5時まで', '働きます'],
        correctAnswer: '9時から 5時まで 働きます',
        explanation: 'N1 から N2 まで denotes span: from 9:00 to 5:00.'
      }
    ],
    dialogue: {
      title: 'そちらは 何時までですか (What are your opening hours?)',
      situation: 'Karina calling directory assistance and inquiry at Yamato Art Museum.',
      lines: [
        { speaker: '104', japanese: '104の 石田です。', hiragana: 'いちまるよんの いしだです。', english: 'Hello, this is Ishida of the 104 Service.' },
        { speaker: 'カリナ', japanese: '大和美術館の 電話番号を お願いします。', hiragana: 'やまとびじゅつかんの でんわばんごうを おねがいします。', english: 'Could you tell me the phone number of the Yamato Art Museum, please?' },
        { speaker: '美術館員', japanese: 'はい、大和美術館です。', hiragana: 'はい、やまとびじゅつかんです。', english: 'Hello, Yamato Art Museum.' },
        { speaker: 'カリナ', japanese: 'すみません。そちらは 何時から 何時までですか。', hiragana: 'すみません。そちらは なんじから なんじまでですか。', english: 'Excuse me. What are your opening hours?' },
        { speaker: '美術館員', japanese: '9時から 4時までです。月曜日は 休みです。', hiragana: 'くじから よじまでです。げつようびは やすみです。', english: 'We are open from nine to four. We are closed on Mondays.' }
      ]
    }
  },

  // =========================================================================
  // LESSON 5: Movement Verbs, Transit Means, Dates, Calendar
  // Reference: Minna no Nihongo I, Lesson 5 (Pages 36-41 / Book pages 56-61)
  // =========================================================================
  {
    id: 5,
    lessonNumber: 5,
    level: 'N5',
    title: 'Lesson 5: Movement Verbs (行きます/来ます/帰ります), Transit & Calendar',
    titleJapanese: '第５課：移動動詞（行きます・来ます・帰ります）・交通手段・日付',
    theme: '京都へ 行きます。新幹線で 行きます。家族と 来ました。',
    description: 'Learn destination particle へ with verbs of motion, transit means particle で (train, bus, plane), companion particle と (with person), dates of the month, and interrogative いつ (when).',
    keyPhrases: [
      'わたしは 京都へ 行きます。 (I will go to Kyoto.)',
      'タクシーで うちへ 帰ります。 (I will go home by taxi.)',
      '家族と 日本へ 来ました。 (I came to Japan with my family.)',
      'いつ 日本へ 来ましたか。 (When did you come to Japan?)',
      'この 電車は 甲子園へ 行きますか。 (Does this train go to Koshien?)'
    ],
    vocabulary: [
      { id: 'l5_v1', lessonNumber: 5, kanji: '行きます', hiragana: 'いきます', romaji: 'ikimasu', english: 'go', partOfSpeech: 'verb-1', category: 'Motion Verbs' },
      { id: 'l5_v2', lessonNumber: 5, kanji: '来ます', hiragana: 'きます', romaji: 'kimasu', english: 'come', partOfSpeech: 'verb-3', category: 'Motion Verbs' },
      { id: 'l5_v3', lessonNumber: 5, kanji: '帰ります', hiragana: 'かえります', romaji: 'kaerimasu', english: 'go home, return', partOfSpeech: 'verb-1', category: 'Motion Verbs' },
      { id: 'l5_v4', lessonNumber: 5, kanji: '学校', hiragana: 'がっこう', romaji: 'gakkou', english: 'school', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l5_v5', lessonNumber: 5, kanji: 'スーパー', hiragana: 'スーパー', romaji: 'suupaa', english: 'supermarket', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l5_v6', lessonNumber: 5, kanji: '駅', hiragana: 'えき', romaji: 'eki', english: 'station', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l5_v7', lessonNumber: 5, kanji: '飛行機', hiragana: 'ひこうき', romaji: 'hikouki', english: 'airplane', partOfSpeech: 'noun', category: 'Vehicles' },
      { id: 'l5_v8', lessonNumber: 5, kanji: '船', hiragana: 'ふね', romaji: 'fune', english: 'ship', partOfSpeech: 'noun', category: 'Vehicles' },
      { id: 'l5_v9', lessonNumber: 5, kanji: '電車', hiragana: 'でんしゃ', romaji: 'densha', english: 'electric train', partOfSpeech: 'noun', category: 'Vehicles' },
      { id: 'l5_v10', lessonNumber: 5, kanji: '地下鉄', hiragana: 'ちかてつ', romaji: 'chikatetsu', english: 'subway, underground', partOfSpeech: 'noun', category: 'Vehicles' },
      { id: 'l5_v11', lessonNumber: 5, kanji: '新幹線', hiragana: 'しんかんせん', romaji: 'shinkansen', english: 'the Shinkansen, bullet train', partOfSpeech: 'noun', category: 'Vehicles' },
      { id: 'l5_v12', lessonNumber: 5, kanji: 'バス', hiragana: 'バス', romaji: 'basu', english: 'bus', partOfSpeech: 'noun', category: 'Vehicles' },
      { id: 'l5_v13', lessonNumber: 5, kanji: 'タクシー', hiragana: 'タクシー', romaji: 'takushii', english: 'taxi', partOfSpeech: 'noun', category: 'Vehicles' },
      { id: 'l5_v14', lessonNumber: 5, kanji: '自転車', hiragana: 'じてんしゃ', romaji: 'jitensha', english: 'bicycle', partOfSpeech: 'noun', category: 'Vehicles' },
      { id: 'l5_v15', lessonNumber: 5, kanji: '歩いて', hiragana: 'あるいて', romaji: 'aruite', english: 'on foot', partOfSpeech: 'adverb', category: 'Vehicles' },
      { id: 'l5_v16', lessonNumber: 5, kanji: '人', hiragana: 'ひと', romaji: 'hito', english: 'person, people', partOfSpeech: 'noun', category: 'People' },
      { id: 'l5_v17', lessonNumber: 5, kanji: '友達', hiragana: 'ともだち', romaji: 'tomodachi', english: 'friend', partOfSpeech: 'noun', category: 'People' },
      { id: 'l5_v18', lessonNumber: 5, kanji: '彼', hiragana: 'かれ', romaji: 'kare', english: 'he, boyfriend', partOfSpeech: 'pronoun', category: 'People' },
      { id: 'l5_v19', lessonNumber: 5, kanji: '彼女', hiragana: 'かのじょ', romaji: 'kanojo', english: 'she, girlfriend', partOfSpeech: 'pronoun', category: 'People' },
      { id: 'l5_v20', lessonNumber: 5, kanji: '家族', hiragana: 'かぞく', romaji: 'kazoku', english: 'family', partOfSpeech: 'noun', category: 'People' },
      { id: 'l5_v21', lessonNumber: 5, kanji: '一人で', hiragana: 'ひとりで', romaji: 'hitori de', english: 'alone, by oneself', partOfSpeech: 'adverb', category: 'Expressions' },
      { id: 'l5_v22', lessonNumber: 5, kanji: '先週', hiragana: 'せんしゅう', romaji: 'senshuu', english: 'last week', partOfSpeech: 'noun', category: 'Time' },
      { id: 'l5_v23', lessonNumber: 5, kanji: '今週', hiragana: 'こんしゅう', romaji: 'konshuu', english: 'this week', partOfSpeech: 'noun', category: 'Time' },
      { id: 'l5_v24', lessonNumber: 5, kanji: '来週', hiragana: 'らいしゅう', romaji: 'raishuu', english: 'next week', partOfSpeech: 'noun', category: 'Time' },
      { id: 'l5_v25', lessonNumber: 5, kanji: '先月', hiragana: 'せんげつ', romaji: 'sengetsu', english: 'last month', partOfSpeech: 'noun', category: 'Time' },
      { id: 'l5_v26', lessonNumber: 5, kanji: '今月', hiragana: 'こんげつ', romaji: 'kongetsu', english: 'this month', partOfSpeech: 'noun', category: 'Time' },
      { id: 'l5_v27', lessonNumber: 5, kanji: '来月', hiragana: 'らいげつ', romaji: 'raigetsu', english: 'next month', partOfSpeech: 'noun', category: 'Time' },
      { id: 'l5_v28', lessonNumber: 5, kanji: '去年', hiragana: 'きょねん', romaji: 'kyonen', english: 'last year', partOfSpeech: 'noun', category: 'Time' },
      { id: 'l5_v29', lessonNumber: 5, kanji: '今年', hiragana: 'ことし', romaji: 'kotoshi', english: 'this year', partOfSpeech: 'noun', category: 'Time' },
      { id: 'l5_v30', lessonNumber: 5, kanji: '来年', hiragana: 'らいねん', romaji: 'rainen', english: 'next year', partOfSpeech: 'noun', category: 'Time' },
      { id: 'l5_v31', lessonNumber: 5, kanji: '〜月', hiragana: '〜がつ', romaji: '-gatsu', english: '-th month of the year', partOfSpeech: 'counter', category: 'Calendar' },
      { id: 'l5_v32', lessonNumber: 5, kanji: '何月', hiragana: 'なんがつ', romaji: 'nangatsu', english: 'what month', partOfSpeech: 'phrase', category: 'Calendar' },
      { id: 'l5_v33', lessonNumber: 5, kanji: '1日', hiragana: 'ついたち', romaji: 'tsuitachi', english: 'first day of the month', partOfSpeech: 'counter', category: 'Calendar' },
      { id: 'l5_v34', lessonNumber: 5, kanji: '2日', hiragana: 'ふつか', romaji: 'futsuka', english: 'second, two days', partOfSpeech: 'counter', category: 'Calendar' },
      { id: 'l5_v35', lessonNumber: 5, kanji: '3日', hiragana: 'みっか', romaji: 'mikka', english: 'third, three days', partOfSpeech: 'counter', category: 'Calendar' },
      { id: 'l5_v36', lessonNumber: 5, kanji: '4日', hiragana: 'よっか', romaji: 'yokka', english: 'fourth, four days', partOfSpeech: 'counter', category: 'Calendar' },
      { id: 'l5_v37', lessonNumber: 5, kanji: '5日', hiragana: 'いつか', romaji: 'itsuka', english: 'fifth, five days', partOfSpeech: 'counter', category: 'Calendar' },
      { id: 'l5_v38', lessonNumber: 5, kanji: '6日', hiragana: 'むいか', romaji: 'muika', english: 'sixth, six days', partOfSpeech: 'counter', category: 'Calendar' },
      { id: 'l5_v39', lessonNumber: 5, kanji: '7日', hiragana: 'なのか', romaji: 'nanoka', english: 'seventh, seven days', partOfSpeech: 'counter', category: 'Calendar' },
      { id: 'l5_v40', lessonNumber: 5, kanji: '8日', hiragana: 'ようか', romaji: 'youka', english: 'eighth, eight days', partOfSpeech: 'counter', category: 'Calendar' },
      { id: 'l5_v41', lessonNumber: 5, kanji: '9日', hiragana: 'ここのか', romaji: 'kokonoka', english: 'ninth, nine days', partOfSpeech: 'counter', category: 'Calendar' },
      { id: 'l5_v42', lessonNumber: 5, kanji: '10日', hiragana: 'とおか', romaji: 'tooka', english: 'tenth, ten days', partOfSpeech: 'counter', category: 'Calendar' },
      { id: 'l5_v43', lessonNumber: 5, kanji: '14日', hiragana: 'じゅうよっか', romaji: 'juuyokka', english: 'fourteenth, fourteen days', partOfSpeech: 'counter', category: 'Calendar' },
      { id: 'l5_v44', lessonNumber: 5, kanji: '20日', hiragana: 'はつか', romaji: 'hatsuka', english: 'twentieth, twenty days', partOfSpeech: 'counter', category: 'Calendar' },
      { id: 'l5_v45', lessonNumber: 5, kanji: '24日', hiragana: 'にじゅうよっか', romaji: 'nijuuyokka', english: 'twenty-fourth, 24 days', partOfSpeech: 'counter', category: 'Calendar' },
      { id: 'l5_v46', lessonNumber: 5, kanji: '何日', hiragana: 'なんにち', romaji: 'nannichi', english: 'which day of the month, how many days', partOfSpeech: 'phrase', category: 'Calendar' },
      { id: 'l5_v47', lessonNumber: 5, kanji: 'いつ', hiragana: 'いつ', romaji: 'itsu', english: 'when', partOfSpeech: 'phrase', category: 'Question Words' },
      { id: 'l5_v48', lessonNumber: 5, kanji: '誕生日', hiragana: 'たんじょうび', romaji: 'tanjoubi', english: 'birthday', partOfSpeech: 'noun', category: 'Events' },
      { id: 'l5_v49', lessonNumber: 5, kanji: '普通', hiragana: 'ふつう', romaji: 'futsuu', english: 'local train', partOfSpeech: 'noun', category: 'Trains' },
      { id: 'l5_v50', lessonNumber: 5, kanji: '急行', hiragana: 'きゅうこう', romaji: 'kyuukou', english: 'rapid train', partOfSpeech: 'noun', category: 'Trains' },
      { id: 'l5_v51', lessonNumber: 5, kanji: '特急', hiragana: 'とっきゅう', romaji: 'tokkyuu', english: 'express train', partOfSpeech: 'noun', category: 'Trains' },
      { id: 'l5_v52', lessonNumber: 5, kanji: '次の', hiragana: 'つぎの', romaji: 'tsugi no', english: 'next', partOfSpeech: 'phrase', category: 'Expressions' },
      { id: 'l5_v53', lessonNumber: 5, kanji: 'どういたしまして', hiragana: 'どういたしまして', romaji: 'dou itashimashite', english: 'You\'re welcome / Don\'t mention it', partOfSpeech: 'phrase', category: 'Greetings' },
      { id: 'l5_v54', lessonNumber: 5, kanji: '〜番線', hiragana: '〜ばんせん', romaji: '-bansen', english: 'platform -, -th platform', partOfSpeech: 'counter', category: 'Trains' }
    ],
    grammar: [
      {
        id: 'l5_g1',
        lessonNumber: 5,
        title: '1. N(place) へ 行きます / 来ます / 帰ります (Destination Particle へ)',
        structure: 'Noun (place) + へ (pronounced "e") + 行きます / 来ます / 帰ります',
        explanation: 'When a verb indicates movement to a certain place, the particle へ is put after the place noun to show the direction of the movement.',
        rules: [
          'The particle へ is written with the hiragana character へ (he), but is ALWAYS pronounced え (e).',
          '行きます = go (away from current place); 来ます = come (towards speaker\'s place); 帰ります = return home.'
        ],
        examples: [
          { japanese: '京都へ 行きます。', hiragana: 'きょうとへ いきます。', romaji: 'Kyouto e ikimasu.', english: 'I will go to Kyoto.' },
          { japanese: '日本へ 来ました。', hiragana: 'にほんへ きました。', romaji: 'Nihon e kimashita.', english: 'I came to Japan.' },
          { japanese: 'うちへ 帰ります。', hiragana: 'うちへ かえります。', romaji: 'Uchi e kaerimasu.', english: 'I will go home.' }
        ]
      },
      {
        id: 'l5_g2',
        lessonNumber: 5,
        title: '2. どこ [へ] も 行きません / 行きませんでした (Total Denial)',
        structure: 'Interrogative + [Particle] + も + Negative Verb',
        explanation: 'When an interrogative takes the particle も and the following verb is negative, all that is represented by the interrogative is denied ("not anywhere", "nothing").',
        rules: [
          'どこ [へ] も 行きません: I don\'t go anywhere.',
          '何 も 食べません (Lesson 6): I don\'t eat anything.',
          'だれ も いません (Lesson 10): Nobody is there.'
        ],
        examples: [
          { japanese: 'どこ [へ] も 行きませんでした。', hiragana: 'どこ [へ] も いきませんでした。', romaji: 'Doko [e] mo ikimasen deshita.', english: 'I didn\'t go anywhere.' }
        ]
      },
      {
        id: 'l5_g3',
        lessonNumber: 5,
        title: '3. N(vehicle) で 行きます / 来ます / 帰ります (Means of Transportation)',
        structure: 'Noun (vehicle) + で + Movement Verb',
        explanation: 'The particle で indicates a means or a method. When movement verbs are used with で, で indicates a means of transportation. Note: when you walk, use the adverb 歩いて (あるいて) without で.',
        rules: [
          '電車で 行きます (go by train).',
          'タクシーで 来ました (came by taxi).',
          '歩いて: on foot (do NOT say *歩いてで).'
        ],
        examples: [
          { japanese: '電車で 行きます。', hiragana: 'でんしゃで いきます。', romaji: 'Densha de ikimasu.', english: 'I\'ll go by train.' },
          { japanese: '駅から 歩いて 帰りました。', hiragana: 'えきから あるいて かえりました。', romaji: 'Eki kara aruite kaerimashita.', english: 'I walked home from the station.' }
        ]
      },
      {
        id: 'l5_g4',
        lessonNumber: 5,
        title: '4. N(person/animal) と V (Companion Particle と)',
        structure: 'Noun (person/animal) + と + Verb',
        explanation: 'When you do something together with a person (or an animal), that companion is marked with the particle と ("with"). When doing something alone, use 一人で (ひとりで) without と.',
        rules: [
          '家族と 日本へ 来ました (I came to Japan with my family).',
          '一人で 東京へ 行きます (I\'ll go to Tokyo alone).'
        ],
        examples: [
          { japanese: '家族と 日本へ 来ました。', hiragana: 'かぞくと にほんへ きました。', romaji: 'Kazoku to Nihon e kimashita.', english: 'I came to Japan with my family.' },
          { japanese: '一人で 東京へ 行きます。', hiragana: 'ひとりで とうきょうへ いきます。', romaji: 'Hitori de Toukyou e ikimasu.', english: 'I\'ll go to Tokyo alone.' }
        ]
      },
      {
        id: 'l5_g5',
        lessonNumber: 5,
        title: '5. いつ (When - Interrogative of Time)',
        structure: 'いつ + Sentence (No に)',
        explanation: 'To ask about time in general, the interrogative いつ (when) is used. Unlike specific numbers with o\'clock or days, いつ does NOT take the particle に.',
        rules: [
          'いつ 日本へ 来ましたか (When did you come to Japan?). NEVER attach に: *いつに.'
        ],
        examples: [
          { japanese: 'いつ 日本へ 来ましたか。・・・3月25日に 来ました。', hiragana: 'いつ にほんへ きましたか。・・・さんがつにじゅうごにちに きました。', romaji: 'Itsu Nihon e kimashita ka? ...Sangatsu nijuugonichi ni kimashita.', english: 'When did you come to Japan? ...I came on March 25th.' }
        ]
      },
      {
        id: 'l5_g6',
        lessonNumber: 5,
        title: '6. S よ (Emphatic Assertion)',
        structure: 'Sentence + よ',
        explanation: 'よ is placed at the end of a sentence to emphasize information which the listener does not know, or to show that you are giving your judgment assertively.',
        rules: [
          '次の 普通ですよ (It\'s the next local train, you know).'
        ],
        examples: [
          { japanese: 'この 電車は 甲子園へ 行きますか。・・・いいえ、行きません。次の 普通ですよ。', hiragana: 'この でんしゃは こうしえんへ いきますか。・・・いいえ、いきません。つぎの ふつうですよ。', romaji: 'Kono densha wa Koushien e ikimasu ka? ...Iie, ikimasen. Tsugi no futsuu desu yo.', english: 'Does this train go to Koshien? ...No, it doesn\'t. The next local train does.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l5_ex1',
        lessonNumber: 5,
        type: 'mcq',
        category: 'grammar',
        prompt: 'Choose the correct particle for destination: "I will go to Kyoto."',
        contextSentence: 'わたしは 京都（　　）行きます。',
        options: ['へ', 'で', 'を', 'から'],
        correctAnswer: 'へ',
        explanation: 'Direction of movement is marked with particle へ (pronounced "e").'
      },
      {
        id: 'l5_ex2',
        lessonNumber: 5,
        type: 'fill_blank',
        category: 'grammar',
        prompt: 'Fill in the blank for transit means: "I go home by taxi."',
        contextSentence: 'タクシー（　　）うちへ 帰ります。',
        options: ['で', 'へ', 'に', 'と'],
        correctAnswer: 'で',
        explanation: 'Means of transportation is marked with particle で.'
      },
      {
        id: 'l5_ex3',
        lessonNumber: 5,
        type: 'sentence_formation',
        category: 'grammar',
        prompt: 'Arrange the tiles to say: "I came to Japan with my family."',
        wordTiles: ['家族と', '日本へ', '来ました'],
        correctAnswer: '家族と 日本へ 来ました',
        explanation: '家族と (with family) + 日本へ (to Japan) + 来ました (came).'
      }
    ],
    dialogue: {
      title: '甲子園へ 行きますか (Does this train go to Koshien?)',
      situation: 'Santos asking a station employee and passenger at the platform about trains to Koshien Stadium.',
      lines: [
        { speaker: 'サントス', japanese: 'すみません。甲子園まで いくらですか。', hiragana: 'すみません。こうしえんまで いくらですか。', english: 'Excuse me. How much is it to Koshien?' },
        { speaker: '女性', japanese: '350円です。', hiragana: 'さんびゃくごじゅうえんです。', english: 'It\'s 350 yen.' },
        { speaker: 'サントス', japanese: 'すみません。甲子園は何番線ですか。', hiragana: 'すみません。こうしえんは なんばんせんですか。', english: 'Excuse me. What platform is it for Koshien?' },
        { speaker: '駅員', japanese: '5番線です。', hiragana: 'ごばんせんです。', english: 'Platform 5.' },
        { speaker: 'サントス', japanese: 'あのう、この電車は甲子園へ行きますか。', hiragana: 'あのう、この でんしゃは こうしえんへ いきますか。', english: 'Excuse me. Does this train go to Koshien?' },
        { speaker: '男性', japanese: 'いいえ、行きません。次の「普通」ですよ。', hiragana: 'いいえ、いきません。つぎの 「ふつう」ですよ。', english: 'No, it doesn\'t. The next "local train" does.' }
      ]
    }
  }
];
