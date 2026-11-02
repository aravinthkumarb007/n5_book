import { MinnaLesson } from '@/types/minna';

export const MINNA_LESSONS_6_TO_10: MinnaLesson[] = [
  // =========================================================================
  // LESSON 6: Transitive Actions, Place of Action, Invitations
  // =========================================================================
  {
    id: 6,
    lessonNumber: 6,
    level: 'N5',
    title: 'Lesson 6: Transitive Verbs, Direct Objects & Invitations',
    titleJapanese: '第６課：他動詞（〜を〜ます）・動作の場所（〜で）・勧誘（〜ませんか・〜ましょう）',
    theme: 'ご飯を食べます、公園で遊びます、いっしょに飲みませんか',
    description: 'Learn direct object particle を, location of action particle で, inviting someone politely with ませんか, and actively proposing with ましょう.',
    keyPhrases: [
      'ご飯を 食べます。 (I eat a meal.)',
      '図書館で 本を 読みます。 (I read books in the library.)',
      'いっしょに 京都へ 行きませんか。 (Won\'t you go to Kyoto together with me?)',
      'ちょっと 休みましょう。 (Let\'s take a short break.)'
    ],
    vocabulary: [
      { id: 'l6_v1', lessonNumber: 6, kanji: '食べます', hiragana: 'たべます', romaji: 'tabemasu', english: 'eat', partOfSpeech: 'verb-2', category: 'Verbs', exampleSentence: { japanese: 'パンを食べます。', hiragana: 'ぱんを たべます。', romaji: 'Pan o tabemasu.', english: 'I eat bread.' } },
      { id: 'l6_v2', lessonNumber: 6, kanji: '飲みます', hiragana: 'のみます', romaji: 'nomimasu', english: 'drink', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: 'お茶を飲みます。', hiragana: 'おちゃを のみます。', romaji: 'Ocha o nomimasu.', english: 'I drink green tea.' } },
      { id: 'l6_v3', lessonNumber: 6, kanji: '吸います', hiragana: 'すいます', romaji: 'suimasu', english: 'smoke (tobacco), breathe in', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: 'たばこを吸いません。', hiragana: 'たばこを すいません。', romaji: 'Tabako o suimasen.', english: 'I do not smoke cigarettes.' } },
      { id: 'l6_v4', lessonNumber: 6, kanji: '見ます', hiragana: 'みます', romaji: 'mimasu', english: 'see, watch, look', partOfSpeech: 'verb-2', category: 'Verbs', exampleSentence: { japanese: 'テレビを見ます。', hiragana: 'てれびを みます。', romaji: 'Terebi o mimasu.', english: 'I watch television.' } },
      { id: 'l6_v5', lessonNumber: 6, kanji: '聞きます', hiragana: 'ききます', romaji: 'kikimasu', english: 'hear, listen to', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: '音楽を聞きます。', hiragana: 'おんがくを ききます。', romaji: 'Ongaku o kikimasu.', english: 'I listen to music.' } },
      { id: 'l6_v6', lessonNumber: 6, kanji: '読みます', hiragana: 'よみます', romaji: 'yomimasu', english: 'read', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: '新聞を読みます。', hiragana: 'しんぶんを よみます。', romaji: 'Shinbun o yomimasu.', english: 'I read the newspaper.' } },
      { id: 'l6_v7', lessonNumber: 6, kanji: '書きます', hiragana: 'かきます', romaji: 'kakimasu', english: 'write, draw', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: '手紙を書きます。', hiragana: 'てがみを かきます。', romaji: 'Tegami o kakimasu.', english: 'I write a letter.' } },
      { id: 'l6_v8', lessonNumber: 6, kanji: '買います', hiragana: 'かいます', romaji: 'kaimasu', english: 'buy', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: '本を買いました。', hiragana: 'ほんを かいました。', romaji: 'Hon o kaimashita.', english: 'I bought a book.' } },
      { id: 'l6_v9', lessonNumber: 6, kanji: '撮ります', hiragana: 'とります', romaji: 'torimasu', english: 'take (a photo)', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: '写真を撮ります。', hiragana: 'しゃしんを とります。', romaji: 'Shashin o torimasu.', english: 'I take a photograph.' } },
      { id: 'l6_v10', lessonNumber: 6, kanji: 'します', hiragana: 'します', romaji: 'shimasu', english: 'do, play (sports, games)', partOfSpeech: 'verb-3', category: 'Verbs', exampleSentence: { japanese: 'サッカーをします。', hiragana: 'さっかーを します。', romaji: 'Sakkaa o shimasu.', english: 'I play soccer.' } },
      { id: 'l6_v11', lessonNumber: 6, kanji: '会います', hiragana: 'あいます', romaji: 'aimasu', english: 'meet', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: '駅で友達に会います。', hiragana: 'えきで ともだちに あいます。', romaji: 'Eki de tomodachi ni aimasu.', english: 'I meet a friend at the station.' } },
      { id: 'l6_v12', lessonNumber: 6, kanji: 'ご飯', hiragana: 'ごはん', romaji: 'gohan', english: 'meal, cooked rice', partOfSpeech: 'noun', category: 'Food', exampleSentence: { japanese: '朝ご飯を食べました。', hiragana: 'あさごはんを たべました。', romaji: 'Asagohan o tabemashita.', english: 'I ate breakfast.' } },
      { id: 'l6_v13', lessonNumber: 6, kanji: '朝ご飯', hiragana: 'あさごはん', romaji: 'asagohan', english: 'breakfast', partOfSpeech: 'noun', category: 'Food', exampleSentence: { japanese: '朝ご飯は何でしたか。', hiragana: 'あさごはんは なんでしたか。', romaji: 'Asagohan wa nan deshita ka.', english: 'What was your breakfast?' } },
      { id: 'l6_v14', lessonNumber: 6, kanji: '昼ご飯', hiragana: 'ひるごはん', romaji: 'hirugohan', english: 'lunch', partOfSpeech: 'noun', category: 'Food', exampleSentence: { japanese: '昼ご飯を食堂で食べます。', hiragana: 'ひるごはんを しょくどうで たべます。', romaji: 'Hirugohan o shokudou de tabemasu.', english: 'I eat lunch in the cafeteria.' } },
      { id: 'l6_v15', lessonNumber: 6, kanji: '晩ご飯', hiragana: 'ばんごはん', romaji: 'bangohan', english: 'dinner, supper', partOfSpeech: 'noun', category: 'Food', exampleSentence: { japanese: '家族と晩ご飯を食べます。', hiragana: 'かぞくと ばんごはんを たべます。', romaji: 'Kazoku to bangohan o tabemasu.', english: 'I eat dinner with my family.' } },
      { id: 'l6_v16', lessonNumber: 6, kanji: 'パン', hiragana: 'ぱん', romaji: 'pan', english: 'bread', partOfSpeech: 'noun', category: 'Food', exampleSentence: { japanese: 'パンと卵を食べます。', hiragana: 'ぱんと たまごを たべます。', romaji: 'Pan to tamago o tabemasu.', english: 'I eat bread and eggs.' } },
      { id: 'l6_v17', lessonNumber: 6, kanji: '肉', hiragana: 'にく', romaji: 'niku', english: 'meat', partOfSpeech: 'noun', category: 'Food', exampleSentence: { japanese: '肉が好きです。', hiragana: 'にくが すきです。', romaji: 'Niku ga suki desu.', english: 'I like meat.' } },
      { id: 'l6_v18', lessonNumber: 6, kanji: '魚', hiragana: 'さかな', romaji: 'sakana', english: 'fish', partOfSpeech: 'noun', category: 'Food', exampleSentence: { japanese: '新鮮な魚です。', hiragana: 'しんせんな さかなです。', romaji: 'Shinsenna sakana desu.', english: 'It is fresh fish.' } },
      { id: 'l6_v19', lessonNumber: 6, kanji: '野菜', hiragana: 'やさい', romaji: 'yasai', english: 'vegetables', partOfSpeech: 'noun', category: 'Food', exampleSentence: { japanese: '毎日野菜を食べます。', hiragana: 'まいにち やさいを たべます。', romaji: 'Mainichi yasai o tabemasu.', english: 'I eat vegetables every day.' } },
      { id: 'l6_v20', lessonNumber: 6, kanji: '果物', hiragana: 'くだもの', romaji: 'kudamono', english: 'fruit', partOfSpeech: 'noun', category: 'Food', exampleSentence: { japanese: '果物を買いました。', hiragana: 'くだものを かいました。', romaji: 'Kudamono o kaimashita.', english: 'I bought fruits.' } }
    ],
    grammar: [
      {
        id: 'l6_g1',
        lessonNumber: 6,
        title: 'N を V (Direct Object Particle を)',
        structure: 'Noun [Direct Object] + を (pronounced "o") + Transitive Verb',
        explanation: 'Particle を indicates the direct object of an action verb.',
        rules: [
          'Written as the hiragana "wo", but pronounced as "o" in modern standard Japanese.',
          'Examples: 水を飲みます (drink water), 本を読みます (read a book).'
        ],
        examples: [
          { japanese: 'ジュースを飲みます。', hiragana: 'じゅーすを のみます。', romaji: 'Juusu o nomimasu.', english: 'I drink juice.' },
          { japanese: '日本語を勉強します。', hiragana: 'にほんごを べんきょうします。', romaji: 'Nihongo o benkyoushimasu.', english: 'I study Japanese.' }
        ]
      },
      {
        id: 'l6_g2',
        lessonNumber: 6,
        title: '[Place] で V (Location of Action Particle で)',
        structure: '[Place] + で + Verb of Action',
        explanation: 'Particle で indicates the location where an event or action occurs.',
        rules: [
          'Contrast with へ (destination of motion) and に (existence of being).',
          '図書館で本を読みます = "I read books at the library."'
        ],
        examples: [
          { japanese: 'レストランで昼ご飯を食べました。', hiragana: 'れすとらんで ひるごはんを たべました。', romaji: 'Resutoran de hirugohan o tabemashita.', english: 'I ate lunch at a restaurant.' }
        ]
      },
      {
        id: 'l6_g3',
        lessonNumber: 6,
        title: 'V-ませんか (Polite Invitation / "Won\'t you...?")',
        structure: 'Verb Stem + ませんか',
        explanation: 'Used to politely invite the listener to perform an action together.',
        rules: [
          'More polite and considerate than V-ましょう because it allows the listener to decline easily.'
        ],
        examples: [
          { japanese: 'いっしょに京都へ行きませんか。― ええ、行きましょう。', hiragana: 'いっしょに きょうとへ いきませんか。― ええ、いきましょう。', romaji: 'Issho ni Kyouto e ikimasen ka. ― Ee, ikimashou.', english: 'Won\'t you go to Kyoto with me? ― Yes, let\'s go!' }
        ]
      },
      {
        id: 'l6_g4',
        lessonNumber: 6,
        title: 'V-ましょう (Positive Proposal / "Let\'s...")',
        structure: 'Verb Stem + ましょう',
        explanation: 'Used when positively proposing to do something together or readily accepting an invitation.',
        rules: [
          'Can also be used by a speaker offering to do something for the group (e.g. 休みましょう = "Let\'s take a break").'
        ],
        examples: [
          { japanese: 'ちょっと休みましょう。', hiragana: 'ちょっと やすみましょう。', romaji: 'Chotto yasumimashou.', english: 'Let\'s take a short break.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l6_ex1',
        lessonNumber: 6,
        type: 'mcq',
        category: 'grammar',
        prompt: 'Choose the correct particle: レストラン [ ? ] 晩ご飯を食べます。',
        options: ['で', 'を', 'に', 'へ'],
        correctAnswer: 'で',
        explanation: 'で indicates the physical location where the action occurs.'
      },
      {
        id: 'l6_ex2',
        lessonNumber: 6,
        type: 'fill_blank',
        category: 'grammar',
        prompt: 'いっしょにお茶を [ ? ]。― ええ、飲みましょう。',
        options: ['飲みませんか', '飲みました', '飲みません', '飲む'],
        correctAnswer: '飲みませんか',
        explanation: '〜ませんか is the standard polite invitation form.'
      }
    ]
  },

  // =========================================================================
  // LESSON 7: Tools, Giving & Receiving, "Already / Not Yet"
  // =========================================================================
  {
    id: 7,
    lessonNumber: 7,
    level: 'N5',
    title: 'Lesson 7: Tools, Means, Giving & Receiving',
    titleJapanese: '第７課：手段・道具（〜で）・授受（あげます・もらいます）・もう〜ました',
    theme: '箸で食べます、英語で書きます、花をあげます、もう食べました',
    description: 'Learn tool/means particle で (using chopsticks, in English), giving and receiving verbs (あげます、もらいます), and already/not yet (もう〜ました / まだです).',
    keyPhrases: [
      'はしで 食べます。 (I eat with chopsticks.)',
      '日本語で レポートを 書きます。 (I write the report in Japanese.)',
      '山田さんに 花を あげました。 (I gave flowers to Ms. Yamada.)',
      'もう 荷物を 送りましたか。 (Have you already sent the parcel?)'
    ],
    vocabulary: [
      { id: 'l7_v1', lessonNumber: 7, kanji: '切ります', hiragana: 'きります', romaji: 'kirimasu', english: 'cut, slice', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: 'ナイフで切ります。', hiragana: 'ないふで きります。', romaji: 'Naifu de kirimasu.', english: 'I cut it with a knife.' } },
      { id: 'l7_v2', lessonNumber: 7, kanji: '送ります', hiragana: 'おくります', romaji: 'okurimasu', english: 'send, mail', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: '荷物を送りました。', hiragana: 'にもつを おくりました。', romaji: 'Nimotsu o okurimashita.', english: 'I sent the luggage.' } },
      { id: 'l7_v3', lessonNumber: 7, kanji: 'あげます', hiragana: 'あげます', romaji: 'agemasu', english: 'give (to someone)', partOfSpeech: 'verb-2', category: 'Verbs', exampleSentence: { japanese: '母に花をあげます。', hiragana: 'ははに はなを あげます。', romaji: 'Haha ni hana o agemasu.', english: 'I give flowers to my mother.' } },
      { id: 'l7_v4', lessonNumber: 7, kanji: 'もらいます', hiragana: 'もらいます', romaji: 'moraimasu', english: 'receive (from someone)', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: '先生に本をもらいました。', hiragana: 'せんせいに ほんを もらいました。', romaji: 'Sensei ni hon o moraimashita.', english: 'I received a book from my teacher.' } },
      { id: 'l7_v5', lessonNumber: 7, kanji: '貸します', hiragana: 'かします', romaji: 'kashimasu', english: 'lend', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: '友達に傘を貸しました。', hiragana: 'ともだちに かさを かしました。', romaji: 'Tomodachi ni kasa o kashimashita.', english: 'I lent an umbrella to my friend.' } },
      { id: 'l7_v6', lessonNumber: 7, kanji: '借ります', hiragana: 'かります', romaji: 'karimasu', english: 'borrow', partOfSpeech: 'verb-2', category: 'Verbs', exampleSentence: { japanese: '図書館で本を借ります。', hiragana: 'としょかんで ほんを かります。', romaji: 'Toshokan de hon o karimasu.', english: 'I borrow books from the library.' } },
      { id: 'l7_v7', lessonNumber: 7, kanji: '教えます', hiragana: 'おしえます', romaji: 'oshiemasu', english: 'teach, tell', partOfSpeech: 'verb-2', category: 'Verbs', exampleSentence: { japanese: '英語を教えます。', hiragana: 'えいごを おしえます。', romaji: 'Eigo o oshiemasu.', english: 'I teach English.' } },
      { id: 'l7_v8', lessonNumber: 7, kanji: '習います', hiragana: 'ならいます', romaji: 'naraimasu', english: 'learn', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: '生け花を習います。', hiragana: 'いけばなを ならいます。', romaji: 'Ikebana o naraimasu.', english: 'I learn flower arrangement.' } },
      { id: 'l7_v9', lessonNumber: 7, kanji: '箸', hiragana: 'はし', romaji: 'hashi', english: 'chopsticks', partOfSpeech: 'noun', category: 'Utensils', exampleSentence: { japanese: '箸でご飯を食べます。', hiragana: 'はしで ごはんを たべます。', romaji: 'Hashi de gohan o tabemasu.', english: 'I eat with chopsticks.' } },
      { id: 'l7_v10', lessonNumber: 7, kanji: 'スプーン', hiragana: 'すぷーん', romaji: 'supuun', english: 'spoon', partOfSpeech: 'noun', category: 'Utensils', exampleSentence: { japanese: 'スプーンでカレーを食べます。', hiragana: 'すぷーんで かれーを たべます。', romaji: 'Supuun de karee o tabemasu.', english: 'I eat curry with a spoon.' } },
      { id: 'l7_v11', lessonNumber: 7, kanji: '手', hiragana: 'て', romaji: 'te', english: 'hand', partOfSpeech: 'noun', category: 'Body', exampleSentence: { japanese: '手で食べます。', hiragana: 'てで たべます。', romaji: 'Te de tabemasu.', english: 'I eat with my hands.' } },
      { id: 'l7_v12', lessonNumber: 7, kanji: '荷物', hiragana: 'にもつ', romaji: 'nimotsu', english: 'luggage, parcel', partOfSpeech: 'noun', category: 'Objects', exampleSentence: { japanese: '重い荷物です。', hiragana: 'おもい にもつです。', romaji: 'Omoi nimotsu desu.', english: 'It is heavy luggage.' } },
      { id: 'l7_v13', lessonNumber: 7, kanji: 'お金', hiragana: 'おかね', romaji: 'okane', english: 'money', partOfSpeech: 'noun', category: 'Money', exampleSentence: { japanese: 'お金がありません。', hiragana: 'おかねが ありません。', romaji: 'Okane ga arimasen.', english: 'I do not have money.' } },
      { id: 'l7_v14', lessonNumber: 7, kanji: '切符', hiragana: 'きっぷ', romaji: 'kippu', english: 'ticket (train, transit)', partOfSpeech: 'noun', category: 'Objects', exampleSentence: { japanese: '新幹線の切符を買いました。', hiragana: 'しんかんせんの きっぷを かいました。', romaji: 'Shinkansen no kippu o kaimashita.', english: 'I bought a Shinkansen ticket.' } },
      { id: 'l7_v15', lessonNumber: 7, kanji: 'もう', hiragana: 'もう', romaji: 'mou', english: 'already', partOfSpeech: 'adverb', category: 'Time', exampleSentence: { japanese: 'もう宿題をしました。', hiragana: 'もう しゅくだいを しました。', romaji: 'Mou shukudai o shimashita.', english: 'I already did my homework.' } },
      { id: 'l7_v16', lessonNumber: 7, kanji: 'まだ', hiragana: 'まだ', romaji: 'mada', english: 'not yet, still', partOfSpeech: 'adverb', category: 'Time', exampleSentence: { japanese: 'いいえ、まだです。', hiragana: 'いいえ、まだです。', romaji: 'Iie, mada desu.', english: 'No, not yet.' } }
    ],
    grammar: [
      {
        id: 'l7_g1',
        lessonNumber: 7,
        title: '[Tool / Means] で V (Means / Instrument Particle で)',
        structure: '[Tool / Language / Medium] + で + Verb',
        explanation: 'Particle で denotes the tool, instrument, or language used to perform an action.',
        rules: [
          'はしで食べます (eat with chopsticks)',
          '日本語でレポートを書きます (write report in Japanese)'
        ],
        examples: [
          { japanese: 'ハサミで紙を切ります。', hiragana: 'はさみで かみを きります。', romaji: 'Hasami de kami o kirimasu.', english: 'I cut paper with scissors.' }
        ]
      },
      {
        id: 'l7_g2',
        lessonNumber: 7,
        title: '[Person] に あげます / もらいます (Giving & Receiving)',
        structure: 'Recipient + に + [Thing] を + あげます / Giver + に + [Thing] を + もらいます',
        explanation: 'に marks the recipient for あげます (give) and the giver/source for もらいます (receive).',
        rules: [
          'Giver can also use から with もらいます (先生からもらいました).'
        ],
        examples: [
          { japanese: '木村さんに本をあげました。', hiragana: 'きむらさんに ほんを あげました。', romaji: 'Kimura-san ni hon o agemashita.', english: 'I gave a book to Ms. Kimura.' },
          { japanese: 'カリナさんに花をもらいました。', hiragana: 'かりなさんに はなを もらいました。', romaji: 'Karina-san ni hana o moraimashita.', english: 'I received flowers from Karina.' }
        ]
      },
      {
        id: 'l7_g3',
        lessonNumber: 7,
        title: 'もう V-ました / まだです (Already vs Not Yet)',
        structure: 'もう + Verb-ましたか。― はい、もう ました。 / いいえ、まだです。',
        explanation: 'Used to ask or express whether an expected action has already been completed.',
        rules: [
          'When answering negative, do NOT say "〜ませんでした" (which means you never did it). Use "いいえ、まだです" (not yet).'
        ],
        examples: [
          { japanese: 'もう昼ご飯を食べましたか。― いいえ、まだです。', hiragana: 'もう ひるごはんを たべましたか。― いいえ、まだです。', romaji: 'Mou hirugohan o tabemashita ka. ― Iie, mada desu.', english: 'Have you already eaten lunch? ― No, not yet.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l7_ex1',
        lessonNumber: 7,
        type: 'mcq',
        category: 'grammar',
        prompt: 'If someone asks "もう荷物を送りましたか", how do you reply if you have NOT sent it yet?',
        options: ['いいえ、まだです。', 'いいえ、送りませんでした。', 'はい、まだです。', 'いいえ、送ります。'],
        correctAnswer: 'いいえ、まだです。',
        explanation: '"いいえ、まだです" is the correct fixed natural reply for "No, not yet".'
      }
    ]
  },

  // =========================================================================
  // LESSON 8: Adjectives (i-adjectives and na-adjectives)
  // =========================================================================
  {
    id: 8,
    lessonNumber: 8,
    level: 'N5',
    title: 'Lesson 8: Adjectives (い-Adjectives & な-Adjectives)',
    titleJapanese: '第８課：形容詞（い形容詞・な形容詞）・名詞修飾',
    theme: '富士山は高いです、桜はきれいです、おいしい料理',
    description: 'Learn the two major classes of Japanese adjectives: い-adjectives (e.g., 高い、おいしい) and な-adjectives (e.g., きれい、親切), including negative forms and noun modification.',
    keyPhrases: [
      '富士山は 高いです。 (Mt. Fuji is high/tall.)',
      '京都は 静かじゃありません。 (Kyoto is not quiet.)',
      'これは おいしい 料理です。 (This is delicious cuisine.)',
      'とても / あまり (very / not very)'
    ],
    vocabulary: [
      { id: 'l8_v1', lessonNumber: 8, kanji: '親切', hiragana: 'しんせつ[な]', romaji: 'shinsetsu[na]', english: 'kind, helpful', partOfSpeech: 'na-adjective', category: 'Adjectives', exampleSentence: { japanese: '田中さんは親切な人です。', hiragana: 'たなかさんは しんせつな ひとです。', romaji: 'Tanaka-san wa shinsetsu na hito desu.', english: 'Mr. Tanaka is a kind person.' } },
      { id: 'l8_v2', lessonNumber: 8, kanji: '便利', hiragana: 'べんり[な]', romaji: 'benri[na]', english: 'convenient', partOfSpeech: 'na-adjective', category: 'Adjectives', exampleSentence: { japanese: '地下鉄はとても便利です。', hiragana: 'ちかてつは とても べんりです。', romaji: 'Chikatetsu wa totemo benri desu.', english: 'The subway is very convenient.' } },
      { id: 'l8_v3', lessonNumber: 8, kanji: '静か', hiragana: 'しずか[な]', romaji: 'shizuka[na]', english: 'quiet', partOfSpeech: 'na-adjective', category: 'Adjectives', exampleSentence: { japanese: 'この町は静かです。', hiragana: 'このまちは しずかです。', romaji: 'Kono machi wa shizuka desu.', english: 'This town is quiet.' } },
      { id: 'l8_v4', lessonNumber: 8, kanji: '有名', hiragana: 'ゆうめい[な]', romaji: 'yuumei[na]', english: 'famous', partOfSpeech: 'na-adjective', category: 'Adjectives', exampleSentence: { japanese: '京都は有名な町です。', hiragana: 'きょうとは ゆうめいな まちです。', romaji: 'Kyouto wa yuumei na machi desu.', english: 'Kyoto is a famous city.' } },
      { id: 'l8_v5', lessonNumber: 8, kanji: '綺麗', hiragana: 'きれい[な]', romaji: 'kirei[na]', english: 'beautiful, clean', partOfSpeech: 'na-adjective', category: 'Adjectives', exampleSentence: { japanese: '桜がとても綺麗です。', hiragana: 'さくらが とても きれいです。', romaji: 'Sakura ga totemo kirei desu.', english: 'The cherry blossoms are very beautiful.' } },
      { id: 'l8_v6', lessonNumber: 8, kanji: '大きい', hiragana: 'おおきい', romaji: 'ookii', english: 'big, large', partOfSpeech: 'i-adjective', category: 'Adjectives', exampleSentence: { japanese: '大きい部屋です。', hiragana: 'おおきい へやです。', romaji: 'Ookii heya desu.', english: 'It is a large room.' } },
      { id: 'l8_v7', lessonNumber: 8, kanji: '小さい', hiragana: 'ちいさい', romaji: 'chiisai', english: 'small, little', partOfSpeech: 'i-adjective', category: 'Adjectives', exampleSentence: { japanese: '小さい車に乗ります。', hiragana: 'ちいさい くるまに のります。', romaji: 'Chiisai kuruma ni norimasu.', english: 'I ride a small car.' } },
      { id: 'l8_v8', lessonNumber: 8, kanji: '新しい', hiragana: 'あたらしい', romaji: 'atarashii', english: 'new, fresh', partOfSpeech: 'i-adjective', category: 'Adjectives', exampleSentence: { japanese: '新しい時計を買いました。', hiragana: 'あたらしい とけいを かいました。', romaji: 'Atarashii tokei o kaimashita.', english: 'I bought a new watch.' } },
      { id: 'l8_v9', lessonNumber: 8, kanji: '古い', hiragana: 'ふるい', romaji: 'furui', english: 'old (not for people)', partOfSpeech: 'i-adjective', category: 'Adjectives', exampleSentence: { japanese: '古いお寺を見ました。', hiragana: 'ふるい おてらを みました。', romaji: 'Furui otera o mimashita.', english: 'I saw an old temple.' } },
      { id: 'l8_v10', lessonNumber: 8, kanji: 'いい / よい', hiragana: 'いい / よい', romaji: 'ii / yoi', english: 'good', partOfSpeech: 'i-adjective', category: 'Adjectives', exampleSentence: { japanese: '天気がいいです。', hiragana: 'てんきが いいです。', romaji: 'Tenki ga ii desu.', english: 'The weather is good.' } },
      { id: 'l8_v11', lessonNumber: 8, kanji: '悪い', hiragana: 'わるい', romaji: 'warui', english: 'bad', partOfSpeech: 'i-adjective', category: 'Adjectives', exampleSentence: { japanese: '気分が悪いです。', hiragana: 'きぶんが わるいです。', romaji: 'Kibun ga warui desu.', english: 'I feel sick / unwell.' } },
      { id: 'l8_v12', lessonNumber: 8, kanji: '暑い', hiragana: 'あつい', romaji: 'atsui', english: 'hot (weather)', partOfSpeech: 'i-adjective', category: 'Adjectives', exampleSentence: { japanese: '日本の夏は暑いです。', hiragana: 'にほんの なつは あついです。', romaji: 'Nihon no natsu wa atsui desu.', english: 'Japanese summer is hot.' } },
      { id: 'l8_v13', lessonNumber: 8, kanji: '寒い', hiragana: 'さむい', romaji: 'samui', english: 'cold (weather)', partOfSpeech: 'i-adjective', category: 'Adjectives', exampleSentence: { japanese: '北海道は寒いです。', hiragana: 'ほっかいどうは さむいです。', romaji: 'Hokkaidou wa samui desu.', english: 'Hokkaido is cold.' } },
      { id: 'l8_v14', lessonNumber: 8, kanji: '高い', hiragana: 'たかい', romaji: 'takai', english: 'high, expensive', partOfSpeech: 'i-adjective', category: 'Adjectives', exampleSentence: { japanese: '富士山は高い山です。', hiragana: 'ふじさんは たかい やまです。', romaji: 'Fujisan wa takai yama desu.', english: 'Mt. Fuji is a high mountain.' } },
      { id: 'l8_v15', lessonNumber: 8, kanji: '安い', hiragana: 'やすい', romaji: 'yasui', english: 'inexpensive, cheap', partOfSpeech: 'i-adjective', category: 'Adjectives', exampleSentence: { japanese: 'この靴は安いです。', hiragana: 'このくつは やすいです。', romaji: 'Kono kutsu wa yasui desu.', english: 'These shoes are inexpensive.' } },
      { id: 'l8_v16', lessonNumber: 8, kanji: '美味しい', hiragana: 'おいしい', romaji: 'oishii', english: 'delicious, tasty', partOfSpeech: 'i-adjective', category: 'Adjectives', exampleSentence: { japanese: '日本料理は美味しいです。', hiragana: 'にほんりょうりは おいしいです。', romaji: 'Nihon ryouri wa oishii desu.', english: 'Japanese food is delicious.' } }
    ],
    grammar: [
      {
        id: 'l8_g1',
        lessonNumber: 8,
        title: 'な-形容詞：肯定と否定 (Na-Adjective Predicates)',
        structure: 'Noun は な-adj です / な-adj じゃありません',
        explanation: 'Na-adjectives conjugate similarly to nouns in the predicate: add です for affirmative, じゃありません for negative.',
        rules: [
          'きれい is a NA-adjective despite ending in "i" phonetically!',
          '静かです (quiet) → 静かじゃありません (not quiet).'
        ],
        examples: [
          { japanese: 'ワット先生は親切です。', hiragana: 'わっとせんせいは しんせつです。', romaji: 'Watto-sensei wa shinsetsu desu.', english: 'Professor Watt is kind.' },
          { japanese: 'ここは静かじゃありません。', hiragana: 'ここは しずかじゃありません。', romaji: 'Koko wa shizuka ja arimasen.', english: 'Here is not quiet.' }
        ]
      },
      {
        id: 'l8_g2',
        lessonNumber: 8,
        title: 'い-形容詞：肯定と否定 (I-Adjective Predicates)',
        structure: 'Noun は い-adj です / [Stem] + くないです',
        explanation: 'For negative of い-adjectives, drop the final い and add くないです.',
        rules: [
          '高いです (expensive) → 高くないです (not expensive).',
          'EXCEPTION: いい (good) becomes よくないです in the negative!'
        ],
        examples: [
          { japanese: '富士山は高いです。', hiragana: 'ふじさんは たかいです。', romaji: 'Fujisan wa takai desu.', english: 'Mt. Fuji is high.' },
          { japanese: 'この本は面白くないです。', hiragana: 'このほんは おもしろくないです。', romaji: 'Kono hon wa omoshirokunai desu.', english: 'This book is not interesting.' }
        ]
      },
      {
        id: 'l8_g3',
        lessonNumber: 8,
        title: '形容詞の名詞修飾 (Adjectives Modifying Nouns)',
        structure: 'な-adj + な + Noun / い-adj + Noun',
        explanation: 'Na-adjectives attach to a noun with な. I-adjectives attach directly.',
        rules: [
          '静かな町 (a quiet town) - MUST keep な!',
          'おいしい料理 (delicious food) - directly attaches.'
        ],
        examples: [
          { japanese: '奈良は静かな町です。', hiragana: 'ならは しずかな まちです。', romaji: 'Nara wa shizuka na machi desu.', english: 'Nara is a quiet town.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l8_ex1',
        lessonNumber: 8,
        type: 'mcq',
        category: 'grammar',
        prompt: 'What is the negative form of 高いです (takai desu)?',
        options: ['高くないです', '高いじゃありません', '高いくない', '高くないでした'],
        correctAnswer: '高くないです',
        explanation: 'I-adjectives drop final い and add くないです for the polite negative.'
      }
    ]
  },

  // =========================================================================
  // LESSON 9: Likes, Dislikes, Skills, Reason (から)
  // =========================================================================
  {
    id: 9,
    lessonNumber: 9,
    level: 'N5',
    title: 'Lesson 9: Likes, Dislikes, Skills & Reasons (から)',
    titleJapanese: '第９課：好悪・巧拙・所有（〜が好きです・上手です・あります・〜から）',
    theme: 'イタリア料理が好きです、日本語がわかります、時間がないから',
    description: 'Learn expressing preferences (好き／嫌い), skills (上手／下手), understanding (わかります), possession (あります), with particle が and reason particle から.',
    keyPhrases: [
      'スポーツが 好きです。 (I like sports.)',
      '日本語が わかります。 (I understand Japanese.)',
      '時間がないから、早く 行きましょう。 (Because there is no time, let\'s go quickly.)',
      'どうして ですか。 (Why is that?)'
    ],
    vocabulary: [
      { id: 'l9_v1', lessonNumber: 9, kanji: '分かります', hiragana: 'わかります', romaji: 'wakarimasu', english: 'understand, comprehend', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: '日本語が分かります。', hiragana: 'にほんごが わかります。', romaji: 'Nihongo ga wakarimasu.', english: 'I understand Japanese.' } },
      { id: 'l9_v2', lessonNumber: 9, kanji: 'あります', hiragana: 'あります', romaji: 'arimasu', english: 'have, possess (inanimate)', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: 'お金がありません。', hiragana: 'おかねが ありません。', romaji: 'Okane ga arimasen.', english: 'I have no money.' } },
      { id: 'l9_v3', lessonNumber: 9, kanji: '好き', hiragana: 'すき[な]', romaji: 'suki[na]', english: 'like, fond of', partOfSpeech: 'na-adjective', category: 'Preferences', exampleSentence: { japanese: '猫が好きです。', hiragana: 'ねこが すきです。', romaji: 'Neko ga suki desu.', english: 'I like cats.' } },
      { id: 'l9_v4', lessonNumber: 9, kanji: '嫌い', hiragana: 'きらい[な]', romaji: 'kirai[na]', english: 'dislike, hate', partOfSpeech: 'na-adjective', category: 'Preferences', exampleSentence: { japanese: '魚が嫌いです。', hiragana: 'さかなが きらいです。', romaji: 'Sakana ga kirai desu.', english: 'I dislike fish.' } },
      { id: 'l9_v5', lessonNumber: 9, kanji: '上手', hiragana: 'じょうず[な]', romaji: 'jouzu[na]', english: 'skillful, good at', partOfSpeech: 'na-adjective', category: 'Skills', exampleSentence: { japanese: 'マリアさんは料理が上手です。', hiragana: 'まりあさんは りょうりが じょうずです。', romaji: 'Maria-san wa ryouri ga jouzu desu.', english: 'Maria is good at cooking.' } },
      { id: 'l9_v6', lessonNumber: 9, kanji: '下手', hiragana: 'へた[な]', romaji: 'heta[na]', english: 'unskillful, poor at', partOfSpeech: 'na-adjective', category: 'Skills', exampleSentence: { japanese: '歌が下手です。', hiragana: 'うたが へたです。', romaji: 'Uta ga heta desu.', english: 'I am poor at singing.' } },
      { id: 'l9_v7', lessonNumber: 9, kanji: '料理', hiragana: 'りょうり', romaji: 'ryouri', english: 'cooking, cuisine', partOfSpeech: 'noun', category: 'Activities', exampleSentence: { japanese: '日本料理を作ります。', hiragana: 'にほんりょうりを つくります。', romaji: 'Nihon ryouri o tsukurimasu.', english: 'I make Japanese cuisine.' } },
      { id: 'l9_v8', lessonNumber: 9, kanji: 'スポーツ', hiragana: 'すぽーつ', romaji: 'supootsu', english: 'sports', partOfSpeech: 'noun', category: 'Activities', exampleSentence: { japanese: 'スポーツが好きです。', hiragana: 'すぽーつが すきです。', romaji: 'Supootsu ga suki desu.', english: 'I like sports.' } },
      { id: 'l9_v9', lessonNumber: 9, kanji: '音楽', hiragana: 'おんがく', romaji: 'ongaku', english: 'music', partOfSpeech: 'noun', category: 'Activities', exampleSentence: { japanese: 'クラシック音楽を聞きます。', hiragana: 'くらしく おんがくを ききます。', romaji: 'Kurashikku ongaku o kikimasu.', english: 'I listen to classical music.' } },
      { id: 'l9_v10', lessonNumber: 9, kanji: '歌', hiragana: 'うた', romaji: 'uta', english: 'song', partOfSpeech: 'noun', category: 'Activities', exampleSentence: { japanese: '日本の歌を歌います。', hiragana: 'にほんの うたを うたいます。', romaji: 'Nihon no uta o utaimasu.', english: 'I sing Japanese songs.' } },
      { id: 'l9_v11', lessonNumber: 9, kanji: '絵', hiragana: 'え', romaji: 'e', english: 'painting, picture', partOfSpeech: 'noun', category: 'Art', exampleSentence: { japanese: '絵画館で絵を見ます。', hiragana: 'かいがかんで えを みます。', romaji: 'Kaigakan de e o mimasu.', english: 'I look at paintings in the gallery.' } },
      { id: 'l9_v12', lessonNumber: 9, kanji: '字', hiragana: 'じ', romaji: 'ji', english: 'letter, character', partOfSpeech: 'noun', category: 'Language', exampleSentence: { japanese: '漢字を勉強します。', hiragana: 'かんじを べんきょうします。', romaji: 'Kanji o benkyoushimasu.', english: 'I study kanji characters.' } },
      { id: 'l9_v13', lessonNumber: 9, kanji: '細かいお金', hiragana: 'こまかいおかね', romaji: 'komakai okane', english: 'small change, coins', partOfSpeech: 'phrase', category: 'Money', exampleSentence: { japanese: '細かいお金がありません。', hiragana: 'こまかい おかねが ありません。', romaji: 'Komakai okane ga arimasen.', english: 'I have no small change.' } },
      { id: 'l9_v14', lessonNumber: 9, kanji: '時間', hiragana: 'じかん', romaji: 'jikan', english: 'time', partOfSpeech: 'noun', category: 'Time', exampleSentence: { japanese: '時間がありません。', hiragana: 'じかんが ありません。', romaji: 'Jikan ga arimasen.', english: 'I don\'t have time.' } },
      { id: 'l9_v15', lessonNumber: 9, kanji: '用事', hiragana: 'ようじ', romaji: 'youji', english: 'errand, business to attend to', partOfSpeech: 'noun', category: 'Daily Life', exampleSentence: { japanese: '今日は用事があります。', hiragana: 'きょうは ようじが あります。', romaji: 'Kyou wa youji ga arimasu.', english: 'I have errands to run today.' } },
      { id: 'l9_v16', lessonNumber: 9, kanji: 'どうして', hiragana: 'どうして', romaji: 'doushite', english: 'why', partOfSpeech: 'phrase', category: 'Question Words', exampleSentence: { japanese: 'どうして遅れましたか。', hiragana: 'どうして おくれましたか。', romaji: 'Doushite okuremashita ka.', english: 'Why were you late?' } }
    ],
    grammar: [
      {
        id: 'l9_g1',
        lessonNumber: 9,
        title: 'N が 好きです / 嫌いです / 上手です / 下手です (Object with が)',
        structure: 'Noun + が + 好きです / 嫌いです / 上手です / 下手です',
        explanation: 'The object of these psychological states and ability descriptions takes particle が instead of を.',
        rules: [
          'スポーツが好きです (I like sports - NOT スポーツを好きです).',
          '日本語が上手です (Good at Japanese - NEVER use 上手 for yourself!).'
        ],
        examples: [
          { japanese: 'イタリア料理が好きです。', hiragana: 'いたりありょうりが すきです。', romaji: 'Itaria ryouri ga suki desu.', english: 'I like Italian cuisine.' },
          { japanese: 'ミラーさんは歌が上手です。', hiragana: 'みらーさんは うたが じょうずです。', romaji: 'Miraa-san wa uta ga jouzu desu.', english: 'Mr. Miller is good at singing.' }
        ]
      },
      {
        id: 'l9_g2',
        lessonNumber: 9,
        title: 'N が 分かります / あります (Understanding & Possession)',
        structure: 'Noun + が + 分かります / あります',
        explanation: '分かります (understand) and あります (have/possess) take particle が for their objects.',
        rules: [
          'ひらがなが分かります (I understand hiragana).',
          '車があります (I have a car).'
        ],
        examples: [
          { japanese: '英語が少し分かります。', hiragana: 'えいごが すこし わかります。', romaji: 'Eigo ga sukoshi wakarimasu.', english: 'I understand English a little.' }
        ]
      },
      {
        id: 'l9_g3',
        lessonNumber: 9,
        title: '〜から (Reason Clause / "Because...")',
        structure: 'Reason Sentence + から、Result Sentence',
        explanation: 'から attaches to the reason clause to mean "because" or "since".',
        rules: [
          'Order: Reason + から + Result.',
          'Answer どうしてですか (Why?) with [Reason] + からです.'
        ],
        examples: [
          { japanese: '時間がないから、タクシーで行きます。', hiragana: 'じかんがないから、たくしーで いきます。', romaji: 'Jikan ga nai kara, takushii de ikimasu.', english: 'Because I don\'t have time, I will go by taxi.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l9_ex1',
        lessonNumber: 9,
        type: 'mcq',
        category: 'grammar',
        prompt: 'Choose the correct particle: わたしは サッカー [ ? ] 好きです。',
        options: ['が', 'を', 'に', 'で'],
        correctAnswer: 'が',
        explanation: '好き (suki) takes particle が to mark the object of liking.'
      }
    ]
  },

  // =========================================================================
  // LESSON 10: Existence of Living Things & Inanimate Objects (あります／います)
  // =========================================================================
  {
    id: 10,
    lessonNumber: 10,
    level: 'N5',
    title: 'Lesson 10: Existence of Animate & Inanimate (あります・います)',
    titleJapanese: '第１０課：存在表現（あります・います）・位置関係詞（上・下・前・後ろ）',
    theme: '机の上に本があります、公園に子供がいます、隣、近く',
    description: 'Master the fundamental distinction between あります (inanimate objects, plants) and います (living, moving beings: people and animals), plus location words (上、下、前、後ろ、中、隣).',
    keyPhrases: [
      '部屋に 机が あります。 (There is a desk in the room.)',
      '庭に 犬が います。 (There is a dog in the garden.)',
      '本は 机の 上に あります。 (The book is on top of the desk.)',
      '銀行の 隣に コンビニが あります。 (There is a convenience store next to the bank.)'
    ],
    vocabulary: [
      { id: 'l10_v1', lessonNumber: 10, kanji: 'あります', hiragana: 'あります', romaji: 'arimasu', english: 'exist, be (inanimate things)', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: '机の上に鍵があります。', hiragana: 'つくえの うえに かぎが あります。', romaji: 'Tsukue no ue ni kagi ga arimasu.', english: 'There is a key on the desk.' } },
      { id: 'l10_v2', lessonNumber: 10, kanji: 'います', hiragana: 'います', romaji: 'imasu', english: 'exist, be (living people & animals)', partOfSpeech: 'verb-2', category: 'Verbs', exampleSentence: { japanese: 'あそこに佐藤さんがいます。', hiragana: 'あそこに さとうさんが います。', romaji: 'Asoko ni Satou-san ga imasu.', english: 'Ms. Sato is over there.' } },
      { id: 'l10_v3', lessonNumber: 10, kanji: '犬', hiragana: 'いぬ', romaji: 'inu', english: 'dog', partOfSpeech: 'noun', category: 'Animals', exampleSentence: { japanese: '公園に犬がいます。', hiragana: 'こうえんに いぬが います。', romaji: 'Kouen ni inu ga imasu.', english: 'There is a dog in the park.' } },
      { id: 'l10_v4', lessonNumber: 10, kanji: '猫', hiragana: 'ねこ', romaji: 'neko', english: 'cat', partOfSpeech: 'noun', category: 'Animals', exampleSentence: { japanese: '庭に猫がいます。', hiragana: 'にわに ねこが います。', romaji: 'Niwa ni neko ga imasu.', english: 'There is a cat in the garden.' } },
      { id: 'l10_v5', lessonNumber: 10, kanji: '木', hiragana: 'き', romaji: 'ki', english: 'tree, wood', partOfSpeech: 'noun', category: 'Nature', exampleSentence: { japanese: '大きな木があります。', hiragana: 'おおきな きが あります。', romaji: 'Ookina ki ga arimasu.', english: 'There is a big tree.' } },
      { id: 'l10_v6', lessonNumber: 10, kanji: '物', hiragana: 'もの', romaji: 'mono', english: 'thing, object', partOfSpeech: 'noun', category: 'Objects', exampleSentence: { japanese: 'いろいろな物があります。', hiragana: 'いろいろな ものが あります。', romaji: 'Iroirona mono ga arimasu.', english: 'There are various things.' } },
      { id: 'l10_v7', lessonNumber: 10, kanji: '上', hiragana: 'うえ', romaji: 'ue', english: 'on, above, top', partOfSpeech: 'noun', category: 'Positions', exampleSentence: { japanese: '机の上に本があります。', hiragana: 'つくえの うえに ほんが あります。', romaji: 'Tsukue no ue ni hon ga arimasu.', english: 'The book is on the desk.' } },
      { id: 'l10_v8', lessonNumber: 10, kanji: '下', hiragana: 'した', romaji: 'shita', english: 'under, below, bottom', partOfSpeech: 'noun', category: 'Positions', exampleSentence: { japanese: '椅子の下に猫がいます。', hiragana: 'いすの したに ねこが います。', romaji: 'Isu no shita ni neko ga imasu.', english: 'There is a cat under the chair.' } },
      { id: 'l10_v9', lessonNumber: 10, kanji: '前', hiragana: 'まえ', romaji: 'mae', english: 'front, before', partOfSpeech: 'noun', category: 'Positions', exampleSentence: { japanese: '駅の前に交番があります。', hiragana: 'えきの まえに こうばんが あります。', romaji: 'Eki no mae ni kouban ga arimasu.', english: 'There is a police box in front of the station.' } },
      { id: 'l10_v10', lessonNumber: 10, kanji: '後ろ', hiragana: 'うしろ', romaji: 'ushiro', english: 'back, behind', partOfSpeech: 'noun', category: 'Positions', exampleSentence: { japanese: '私の後ろに立っています。', hiragana: 'わたしの うしろに たっています。', romaji: 'Watashi no ushiro ni tatte imasu.', english: 'He is standing behind me.' } },
      { id: 'l10_v11', lessonNumber: 10, kanji: '右', hiragana: 'みぎ', romaji: 'migi', english: 'right (side)', partOfSpeech: 'noun', category: 'Positions', exampleSentence: { japanese: '右に曲がります。', hiragana: 'みぎに まがります。', romaji: 'Migi ni magarimasu.', english: 'Turn to the right.' } },
      { id: 'l10_v12', lessonNumber: 10, kanji: '左', hiragana: 'ひだり', romaji: 'hidari', english: 'left (side)', partOfSpeech: 'noun', category: 'Positions', exampleSentence: { japanese: '左に銀行があります。', hiragana: 'ひだりに ぎんこうが あります。', romaji: 'Hidari ni ginkou ga arimasu.', english: 'There is a bank on the left.' } },
      { id: 'l10_v13', lessonNumber: 10, kanji: '中', hiragana: 'なか', romaji: 'naka', english: 'inside, middle', partOfSpeech: 'noun', category: 'Positions', exampleSentence: { japanese: '鞄の中に財布があります。', hiragana: 'かばんの なかに さいふが あります。', romaji: 'Kaban no naka ni saifu ga arimasu.', english: 'There is a wallet inside the bag.' } },
      { id: 'l10_v14', lessonNumber: 10, kanji: '外', hiragana: 'そと', romaji: 'soto', english: 'outside', partOfSpeech: 'noun', category: 'Positions', exampleSentence: { japanese: '外で遊びます。', hiragana: 'そとで あそびます。', romaji: 'Soto de asobimasu.', english: 'Play outside.' } },
      { id: 'l10_v15', lessonNumber: 10, kanji: '隣', hiragana: 'となり', romaji: 'tonari', english: 'next to, neighboring', partOfSpeech: 'noun', category: 'Positions', exampleSentence: { japanese: '銀行の隣に薬屋があります。', hiragana: 'ぎんこうの となりに くすりやが あります。', romaji: 'Ginkou no tonari ni kusuriya ga arimasu.', english: 'There is a pharmacy next to the bank.' } },
      { id: 'l10_v16', lessonNumber: 10, kanji: '間', hiragana: 'あいだ', romaji: 'aida', english: 'between, among', partOfSpeech: 'noun', category: 'Positions', exampleSentence: { japanese: '本屋とパン屋の間にあります。', hiragana: 'ほんやと ぱんやの あいだに あります。', romaji: 'Honya to panya no aida ni arimasu.', english: 'It is between the bookstore and the bakery.' } }
    ],
    grammar: [
      {
        id: 'l10_g1',
        lessonNumber: 10,
        title: '[Place] に N が あります / います (Existence)',
        structure: '[Location] + に + [Thing/Person] + が + あります / います',
        explanation: 'Stating that an item or person exists in a certain location.',
        rules: [
          'Use あります for inanimate things (desk, book, car) and plants.',
          'Use います for animate beings that can move autonomously (people, dogs, cats).'
        ],
        examples: [
          { japanese: '部屋に机があります。', hiragana: 'へやに つくえが あります。', romaji: 'Heya ni tsukue ga arimasu.', english: 'There is a desk in the room.' },
          { japanese: '庭に男の人がいます。', hiragana: 'にわに おとこのひとが います。', romaji: 'Niwa ni otoko no hito ga imasu.', english: 'There is a man in the garden.' }
        ]
      },
      {
        id: 'l10_g2',
        lessonNumber: 10,
        title: 'N は [Place] に あります / います (Location of Topic)',
        structure: '[Topic] + は + [Location] + に + あります / います',
        explanation: 'When the topic is already known and you are informing where it is located.',
        rules: [
          '佐藤さんはどこですか。― 事務所にいます。'
        ],
        examples: [
          { japanese: '東京ディズニーランドは千葉県にあります。', hiragana: 'とうきょうでぃずにーらんどは ちばけんに あります。', romaji: 'Toukyou Dizuniirando wa Chiba-ken ni arimasu.', english: 'Tokyo Disneyland is located in Chiba prefecture.' }
        ]
      },
      {
        id: 'l10_g3',
        lessonNumber: 10,
        title: 'N1 [Place/Object] の N2 [Position] (Relative Spatial Position)',
        structure: '[Reference Noun] + の + [上 / 下 / 前 / 後ろ / 中 / 隣 / 間] + に',
        explanation: 'Specifying exact positions relative to another landmark or object.',
        rules: [
          '机の上 (on the desk)',
          '椅子の下 (under the chair)',
          '本屋と銀行の間 (between the bookstore and bank)'
        ],
        examples: [
          { japanese: '机の上にペンがあります。', hiragana: 'つくえの うえに ぺんが あります。', romaji: 'Tsukue no ue ni pen ga arimasu.', english: 'There is a pen on the desk.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l10_ex1',
        lessonNumber: 10,
        type: 'mcq',
        category: 'grammar',
        prompt: 'Choose the correct verb: あそこに 猫が [ ? ]。',
        options: ['います', 'あります', 'します', '行きます'],
        correctAnswer: 'います',
        explanation: '猫 (cat) is a living animal, so います is strictly required.'
      }
    ]
  }
];
