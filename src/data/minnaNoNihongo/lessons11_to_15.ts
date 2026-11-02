import { MinnaLesson } from '@/types/minna';

export const MINNA_LESSONS_11_TO_15: MinnaLesson[] = [
  // =========================================================================
  // LESSON 11: Counters, Quantities, Periods & Frequency
  // =========================================================================
  {
    id: 11,
    lessonNumber: 11,
    level: 'N5',
    title: 'Lesson 11: Counters, Quantities & Periods of Time',
    titleJapanese: '第１１課：助数詞（ひとつ・ふたつ・まい・だい・人・回）・期間・頻度',
    theme: 'りんごを４つ買いました、１か月に２回映画を見ます、どのくらい',
    description: 'Master Japanese numerical counters (一つ、二つ、〜枚、〜台、〜人、〜回), asking "how many / how long" (いくつ、どのくらい), and stating frequency per period.',
    keyPhrases: [
      'りんごを ２つ ください。 (Two apples, please.)',
      '切手を ３枚 買いました。 (I bought three stamps.)',
      '１週間に ２回 テニスを します。 (I play tennis twice a week.)',
      '国から 日本まで 飛行機で どのくらい かかりますか。 (How long does it take by plane?)'
    ],
    vocabulary: [
      { id: 'l11_v1', lessonNumber: 11, kanji: '一つ', hiragana: 'ひとつ', romaji: 'hitotsu', english: 'one thing', partOfSpeech: 'counter', category: 'Counters', exampleSentence: { japanese: 'りんごを一つください。', hiragana: 'りんごを ひとつ ください。', romaji: 'Ringo o hitotsu kudasai.', english: 'One apple, please.' } },
      { id: 'l11_v2', lessonNumber: 11, kanji: '二つ', hiragana: 'ふたつ', romaji: 'futatsu', english: 'two things', partOfSpeech: 'counter', category: 'Counters', exampleSentence: { japanese: 'ビールを二つお願いします。', hiragana: 'びーるを ふたつ おねがいします。', romaji: 'Biiru o futatsu onegaishimasu.', english: 'Two beers, please.' } },
      { id: 'l11_v3', lessonNumber: 11, kanji: '三つ', hiragana: 'みっつ', romaji: 'mittsu', english: 'three things', partOfSpeech: 'counter', category: 'Counters', exampleSentence: { japanese: 'ケーキを三つ買いました。', hiragana: 'けーきを みっつ かいました。', romaji: 'Keeki o mittsu kaimashita.', english: 'I bought three cakes.' } },
      { id: 'l11_v4', lessonNumber: 11, kanji: 'いくつ', hiragana: 'いくつ', romaji: 'ikutsu', english: 'how many (general items)', partOfSpeech: 'phrase', category: 'Question Words', exampleSentence: { japanese: 'みかんをいくつ買いましたか。', hiragana: 'みかんを いくつ かいましたか。', romaji: 'Mikan o ikutsu kaimashita ka.', english: 'How many oranges did you buy?' } },
      { id: 'l11_v5', lessonNumber: 11, kanji: '〜人', hiragana: '〜にん', romaji: '-nin', english: 'counter for people (一人=hitori, 二人=futari)', partOfSpeech: 'counter', category: 'Counters', exampleSentence: { japanese: '家族は４人です。', hiragana: 'かぞくは よにんです。', romaji: 'Kazoku wa yo-nin desu.', english: 'My family has 4 people.' } },
      { id: 'l11_v6', lessonNumber: 11, kanji: '〜枚', hiragana: '〜まい', romaji: '-mai', english: 'counter for flat, thin objects (paper, shirts, plates)', partOfSpeech: 'counter', category: 'Counters', exampleSentence: { japanese: 'シャツを２枚買いました。', hiragana: 'しゃつを にまい かいました。', romaji: 'Shatsu o ni-mai kaimashita.', english: 'I bought two shirts.' } },
      { id: 'l11_v7', lessonNumber: 11, kanji: '〜台', hiragana: '〜だい', romaji: '-dai', english: 'counter for machines, vehicles, electronics', partOfSpeech: 'counter', category: 'Counters', exampleSentence: { japanese: '車が３台あります。', hiragana: 'くるまが さんだい あります。', romaji: 'Kuruma ga san-dai arimasu.', english: 'There are three cars.' } },
      { id: 'l11_v8', lessonNumber: 11, kanji: '〜回', hiragana: '〜かい', romaji: '-kai', english: 'times, frequency', partOfSpeech: 'counter', category: 'Counters', exampleSentence: { japanese: '１週間に３回泳ぎます。', hiragana: 'いっしゅうかんに さんかい およぎます。', romaji: 'Isshuukan ni san-kai oyogimasu.', english: 'I swim three times a week.' } },
      { id: 'l11_v9', lessonNumber: 11, kanji: '〜時間', hiragana: '〜じかん', romaji: '-jikan', english: 'hours (duration)', partOfSpeech: 'counter', category: 'Time', exampleSentence: { japanese: '毎日８時間働きます。', hiragana: 'まいにち はちじかん はたらきます。', romaji: 'Mainichi hachi-jikan hatarakimasu.', english: 'I work 8 hours every day.' } },
      { id: 'l11_v10', lessonNumber: 11, kanji: '〜週間', hiragana: '〜しゅうかん', romaji: '-shuukan', english: 'weeks (duration)', partOfSpeech: 'counter', category: 'Time', exampleSentence: { japanese: '２週間旅行しました。', hiragana: 'にしゅうかん りょこうしました。', romaji: 'Ni-shuukan ryokoushimashita.', english: 'I traveled for two weeks.' } },
      { id: 'l11_v11', lessonNumber: 11, kanji: '〜か月', hiragana: '〜かげつ', romaji: '-kagetsu', english: 'months (duration)', partOfSpeech: 'counter', category: 'Time', exampleSentence: { japanese: '３か月日本語を勉強しました。', hiragana: 'さんかげつ にほんごを べんきょうしました。', romaji: 'San-kagetsu nihongo o benkyoushimashita.', english: 'I studied Japanese for three months.' } },
      { id: 'l11_v12', lessonNumber: 11, kanji: 'どのくらい', hiragana: 'どのくらい', romaji: 'dono kurai', english: 'how long / how much', partOfSpeech: 'phrase', category: 'Question Words', exampleSentence: { japanese: '東京までどのくらいかかりますか。', hiragana: 'とうきょうまで どのくらい かかりますか。', romaji: 'Toukyou made dono kurai kakarimasu ka.', english: 'How long does it take to Tokyo?' } }
    ],
    grammar: [
      {
        id: 'l11_g1',
        lessonNumber: 11,
        title: '数量詞の位置 (Position of Quantitative Counters)',
        structure: 'Noun + を / が + [Quantity/Counter] + Verb',
        explanation: 'In Japanese, counters generally come directly before the verb, NOT before the noun.',
        rules: [
          'りんごを２つ買いました (Bought 2 apples).',
          'Notice: No particle between the counter and the verb!'
        ],
        examples: [
          { japanese: '切手を５枚買いました。', hiragana: 'きってを ごまい かいました。', romaji: 'Kitte o go-mai kaimashita.', english: 'I bought 5 stamps.' }
        ]
      },
      {
        id: 'l11_g2',
        lessonNumber: 11,
        title: '[Period] に [Frequency] 回 (Frequency in a Given Period)',
        structure: '[Time Period] + に + [Frequency / Counter] + Verb',
        explanation: 'Particle に expresses the unit period within which an action is repeated.',
        rules: [
          '１日に３回薬を飲みます (Take medicine 3 times a day).',
          '１か月に２回映画を見ます (Watch movies twice a month).'
        ],
        examples: [
          { japanese: '１年に１回国へ帰ります。', hiragana: 'いちねんに いっかい くにへ かえります。', romaji: 'Ichi-nen ni ikkai kuni e kaerimasu.', english: 'I return to my home country once a year.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l11_ex1',
        lessonNumber: 11,
        type: 'mcq',
        category: 'grammar',
        prompt: 'Which sentence has the correct counter placement for "I bought 3 apples"?',
        options: [
          'りんごを３つ買いました。',
          '３つのりんごを買いました。',
          'りんごが３つを買いました。',
          'りんごに３つ買いました。'
        ],
        correctAnswer: 'りんごを３つ買いました。',
        explanation: 'In natural Japanese, the quantity counter precedes the verb without an intervening particle.'
      }
    ]
  },

  // =========================================================================
  // LESSON 12: Comparisons & Superlatives (〜より〜、いちばん〜)
  // =========================================================================
  {
    id: 12,
    lessonNumber: 12,
    level: 'N5',
    title: 'Lesson 12: Comparisons, Choices & Superlatives',
    titleJapanese: '第１２課：比較（〜より〜・どちらが〜）・最上級（いちばん）・形容詞過去形',
    theme: '新幹線は飛行機より速いですか、日本料理の中で寿司がいちばん好きです',
    description: 'Learn comparative sentences (N1 は N2 より), asking which of two options is more adjective (どちらが), and superlatives (いちばん), plus past tense of adjectives.',
    keyPhrases: [
      '東京は 京都より 大きいです。 (Tokyo is bigger than Kyoto.)',
      '海と山と どちらが 好きですか。 (Which do you like better, the sea or the mountains?)',
      '季節の中で 春が いちばん 好きです。 (Among seasons, I like spring the best.)',
      '昨日は 寒かったです。 (Yesterday was cold.)'
    ],
    vocabulary: [
      { id: 'l12_v1', lessonNumber: 12, kanji: '簡単', hiragana: 'かんたん[な]', romaji: 'kantan[na]', english: 'simple, easy', partOfSpeech: 'na-adjective', category: 'Adjectives', exampleSentence: { japanese: 'このテストは簡単です。', hiragana: 'このてすとは かんたんです。', romaji: 'Kono tesuto wa kantan desu.', english: 'This test is simple.' } },
      { id: 'l12_v2', lessonNumber: 12, kanji: '近い', hiragana: 'ちかい', romaji: 'chikai', english: 'near, close', partOfSpeech: 'i-adjective', category: 'Adjectives', exampleSentence: { japanese: '駅が近いです。', hiragana: 'えきが ちかいです。', romaji: 'The station is close.' } },
      { id: 'l12_v3', lessonNumber: 12, kanji: '遠い', hiragana: 'とおい', romaji: 'tooi', english: 'far, distant', partOfSpeech: 'i-adjective', category: 'Adjectives', exampleSentence: { japanese: '学校は家から遠いです。', hiragana: 'がっこうは うちから とおいです。', romaji: 'Gakkou wa uchi kara tooi desu.', english: 'School is far from my house.' } },
      { id: 'l12_v4', lessonNumber: 12, kanji: '速い / 早い', hiragana: 'はやい', romaji: 'hayai', english: 'fast, quick / early', partOfSpeech: 'i-adjective', category: 'Adjectives', exampleSentence: { japanese: '新幹線は速いです。', hiragana: 'しんかんせんは はやいです。', romaji: 'Shinkansen is fast.' } },
      { id: 'l12_v5', lessonNumber: 12, kanji: '遅い', hiragana: 'おそい', romaji: 'osoi', english: 'slow, late', partOfSpeech: 'i-adjective', category: 'Adjectives', exampleSentence: { japanese: '足が遅いです。', hiragana: 'あしが おそいです。', romaji: 'Ashi ga osoi desu.', english: 'I run slowly.' } },
      { id: 'l12_v6', lessonNumber: 12, kanji: '多い', hiragana: 'おおい', romaji: 'ooi', english: 'many, much (people, things)', partOfSpeech: 'i-adjective', category: 'Adjectives', exampleSentence: { japanese: '人が多いです。', hiragana: 'ひとが おおいです。', romaji: 'Hito ga ooi desu.', english: 'There are many people.' } },
      { id: 'l12_v7', lessonNumber: 12, kanji: '少ない', hiragana: 'すくない', romaji: 'sukunai', english: 'few, little', partOfSpeech: 'i-adjective', category: 'Adjectives', exampleSentence: { japanese: '雨が少ないです。', hiragana: 'あめが すくないです。', romaji: 'Ame ga sukunai desu.', english: 'There is little rain.' } },
      { id: 'l12_v8', lessonNumber: 12, kanji: '暖かい / 温かい', hiragana: 'あたたかい', romaji: 'atatakai', english: 'warm (weather / food, drinks)', partOfSpeech: 'i-adjective', category: 'Adjectives', exampleSentence: { japanese: '春は暖かいです。', hiragana: 'はるは あたたかいです。', romaji: 'Haru wa atatakai desu.', english: 'Spring is warm.' } },
      { id: 'l12_v9', lessonNumber: 12, kanji: '涼しい', hiragana: 'すずしい', romaji: 'suzushii', english: 'cool (weather)', partOfSpeech: 'i-adjective', category: 'Adjectives', exampleSentence: { japanese: '秋は涼しいです。', hiragana: 'あきは すずしいです。', romaji: 'Aki wa suzushii desu.', english: 'Autumn is pleasantly cool.' } },
      { id: 'l12_v10', lessonNumber: 12, kanji: '甘い', hiragana: 'あまい', romaji: 'amai', english: 'sweet (taste)', partOfSpeech: 'i-adjective', category: 'Taste', exampleSentence: { japanese: 'このケーキは甘いです。', hiragana: 'このけーきは あまいです。', romaji: 'Kono keeki wa amai desu.', english: 'This cake is sweet.' } },
      { id: 'l12_v11', lessonNumber: 12, kanji: '辛い', hiragana: 'からい', romaji: 'karai', english: 'spicy, hot (taste)', partOfSpeech: 'i-adjective', category: 'Taste', exampleSentence: { japanese: '四川料理は辛いです。', hiragana: 'しせんりょうりは からいです。', romaji: 'Shisen ryouri wa karai desu.', english: 'Sichuan cuisine is spicy.' } },
      { id: 'l12_v12', lessonNumber: 12, kanji: '重い', hiragana: 'おもい', romaji: 'omoi', english: 'heavy', partOfSpeech: 'i-adjective', category: 'Physical Attributes', exampleSentence: { japanese: 'この荷物は重いです。', hiragana: 'このにもつは おもいです。', romaji: 'Kono nimotsu wa omoi desu.', english: 'This luggage is heavy.' } },
      { id: 'l12_v13', lessonNumber: 12, kanji: '軽い', hiragana: 'かるい', romaji: 'karui', english: 'light (weight)', partOfSpeech: 'i-adjective', category: 'Physical Attributes', exampleSentence: { japanese: '軽いパソコンです。', hiragana: 'かるい ぱそこんです。', romaji: 'Karui pasokon desu.', english: 'It is a lightweight laptop.' } },
      { id: 'l12_v14', lessonNumber: 12, kanji: '一番', hiragana: 'いちばん', romaji: 'ichiban', english: 'the most, number one, best', partOfSpeech: 'adverb', category: 'Degree', exampleSentence: { japanese: '富士山がいちばん高いです。', hiragana: 'ふじさんが いちばん たかいです。', romaji: 'Fujisan ga ichiban takai desu.', english: 'Mt. Fuji is the highest.' } }
    ],
    grammar: [
      {
        id: 'l12_g1',
        lessonNumber: 12,
        title: 'N1 は N2 より 形容詞 です (Comparative)',
        structure: 'Noun 1 + は + Noun 2 + より + Adjective + です',
        explanation: 'Compares two nouns, expressing that Noun 1 is more [adjective] than Noun 2.',
        rules: [
          'より means "than".',
          '東京は京都より大きいです (Tokyo is bigger than Kyoto).'
        ],
        examples: [
          { japanese: '飛行機は新幹線より速いです。', hiragana: 'ひこうきは しんかんせんより はやいです。', romaji: 'Hikouki wa shinkansen yori hayai desu.', english: 'Airplanes are faster than bullet trains.' }
        ]
      },
      {
        id: 'l12_g2',
        lessonNumber: 12,
        title: 'N1 と N2 と どちらが 形容詞 ですか (Choice Between Two)',
        structure: 'Noun 1 + と + Noun 2 + と + どちらが + Adjective + ですか',
        explanation: 'Asks which of two options possesses more of an attribute. Answer with "[Choice] の ほうが [Adj] です".',
        rules: [
          'Answer formula: Noun の ほうが [Adj] です (Noun is more [adj]).',
          'If equal: どちらも [Adj] です (Both are [adj]).'
        ],
        examples: [
          { japanese: '肉と魚とどちらが好きですか。― 肉のほうが好きです。', hiragana: 'にくと さかなと どちらが すきですか。― にくのほうが すきです。', romaji: 'Niku to sakana to dochira ga suki desu ka. ― Niku no hou ga suki desu.', english: 'Which do you like better, meat or fish? ― I like meat better.' }
        ]
      },
      {
        id: 'l12_g3',
        lessonNumber: 12,
        title: '[Category] の 中で 何/だれ/どこ/いつ が いちばん 形容詞 ですか (Superlative)',
        structure: '[Group / Category] + の中で + [Question Word] + が + いちばん + Adjective + ですか',
        explanation: 'Asks for the extreme/superlative within a group or category.',
        rules: [
          '何 for things, だれ for people, どこ for places, いつ for time.',
          'Answer with: [Selection] が いちばん [Adj] です.'
        ],
        examples: [
          { japanese: 'スポーツの中で何がいちばん面白いですか。― サッカーがいちばん面白いです。', hiragana: 'すぽーつの なかで なにが いちばん おもしろいですか。― さっかーが いちばん おもしろいです。', romaji: 'Supootsu no naka de nani ga ichiban omoshiroi desu ka. ― Sakkaa ga ichiban omoshiroi desu.', english: 'Among sports, what is the most interesting? ― Soccer is the most interesting.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l12_ex1',
        lessonNumber: 12,
        type: 'mcq',
        category: 'grammar',
        prompt: 'Fill in the blank: 北海道は 九州 [ ? ] 寒いです。 (Hokkaido is colder than Kyushu)',
        options: ['より', 'から', 'まで', 'ほど'],
        correctAnswer: 'より',
        explanation: 'より means "than" in comparison.'
      }
    ]
  },

  // =========================================================================
  // LESSON 13: Desires (欲しい、〜たい) & Purpose of Movement (〜に行く)
  // =========================================================================
  {
    id: 13,
    lessonNumber: 13,
    level: 'N5',
    title: 'Lesson 13: Desires (〜たい・欲しい) & Purpose of Movement',
    titleJapanese: '第１３課：願望（〜が欲しい・〜たい）・移動の目的（〜へ〜に行きます）',
    theme: '新しい車が欲しいです、日本へ行きたいです、デパートへ買い物に行きます',
    description: 'Learn expressing personal desires for things (〜が欲しい) and actions (〜たい), along with stating the purpose of movement using [Verb-stem / Noun] に 行きます／来ます.',
    keyPhrases: [
      '友達が 欲しいです。 (I want friends.)',
      '日本へ 行きたいです。 (I want to go to Japan.)',
      '神戸へ 牛肉を 食べに 行きます。 (I am going to Kobe to eat beef.)',
      'どこか 行きましたか。 (Did you go somewhere?)'
    ],
    vocabulary: [
      { id: 'l13_v1', lessonNumber: 13, kanji: '欲しい', hiragana: 'ほしい', romaji: 'hoshii', english: 'want, desire (something)', partOfSpeech: 'i-adjective', category: 'Desires', exampleSentence: { japanese: '新しいパソコンが欲しいです。', hiragana: 'あたらしい ぱそこんが ほしいです。', romaji: 'Atarashii pasokon ga hoshii desu.', english: 'I want a new computer.' } },
      { id: 'l13_v2', lessonNumber: 13, kanji: '寂しい', hiragana: 'さびしい', romaji: 'sabishii', english: 'lonely', partOfSpeech: 'i-adjective', category: 'Feelings', exampleSentence: { japanese: '一人は寂しいです。', hiragana: 'ひとりは さびしいです。', romaji: 'Hitori wa sabishii desu.', english: 'Being alone is lonely.' } },
      { id: 'l13_v3', lessonNumber: 13, kanji: '広い', hiragana: 'ひろい', romaji: 'hiroi', english: 'spacious, wide', partOfSpeech: 'i-adjective', category: 'Descriptions', exampleSentence: { japanese: '広い部屋に住みたいです。', hiragana: 'ひろい へやに すみたいです。', romaji: 'Hiroi heya ni sumitai desu.', english: 'I want to live in a spacious room.' } },
      { id: 'l13_v4', lessonNumber: 13, kanji: '狭い', hiragana: 'せまい', romaji: 'semai', english: 'narrow, cramped', partOfSpeech: 'i-adjective', category: 'Descriptions', exampleSentence: { japanese: 'この道は狭いです。', hiragana: 'このみちは せまいです。', romaji: 'Kono michi wa semai desu.', english: 'This street is narrow.' } },
      { id: 'l13_v5', lessonNumber: 13, kanji: 'プール', hiragana: 'ぷーる', romaji: 'puuru', english: 'swimming pool', partOfSpeech: 'noun', category: 'Places', exampleSentence: { japanese: 'プールへ泳ぎに行きます。', hiragana: 'ぷーるへ およぎに いきます。', romaji: 'Puuru e oyogi ni ikimasu.', english: 'I go to the pool to swim.' } },
      { id: 'l13_v6', lessonNumber: 13, kanji: '川', hiragana: 'かわ', romaji: 'kawa', english: 'river', partOfSpeech: 'noun', category: 'Nature', exampleSentence: { japanese: '川で魚を釣ります。', hiragana: 'かわで さかなを つります。', romaji: 'Kawa de sakana o tsurimasu.', english: 'I fish in the river.' } },
      { id: 'l13_v7', lessonNumber: 13, kanji: '美術', hiragana: 'びじゅつ', romaji: 'bijutsu', english: 'fine arts', partOfSpeech: 'noun', category: 'Culture', exampleSentence: { japanese: '美術を勉強したいです。', hiragana: 'びじゅつを べんきょうしたいです。', romaji: 'Bijutsu o benkyoushitai desu.', english: 'I want to study fine arts.' } },
      { id: 'l13_v8', lessonNumber: 13, kanji: '釣り', hiragana: 'つり', romaji: 'tsuri', english: 'fishing', partOfSpeech: 'noun', category: 'Hobbies', exampleSentence: { japanese: '釣りが趣味です。', hiragana: 'つりが しゅみです。', romaji: 'Tsuri ga shumi desu.', english: 'Fishing is my hobby.' } },
      { id: 'l13_v9', lessonNumber: 13, kanji: 'スキー', hiragana: 'すきー', romaji: 'sukii', english: 'skiing', partOfSpeech: 'noun', category: 'Sports', exampleSentence: { japanese: '冬はスキーに行きます。', hiragana: 'ふゆは すきーに いきます。', romaji: 'Fuyu wa sukii ni ikimasu.', english: 'I go skiing in winter.' } },
      { id: 'l13_v10', lessonNumber: 13, kanji: '週末', hiragana: 'しゅうまつ', romaji: 'shuumatsu', english: 'weekend', partOfSpeech: 'noun', category: 'Time', exampleSentence: { japanese: '良い週末を！', hiragana: 'よい しゅうまつを！', romaji: 'Yoi shuumatsu o!', english: 'Have a great weekend!' } },
      { id: 'l13_v11', lessonNumber: 13, kanji: 'お腹が空きました', hiragana: 'おなかがすきました', romaji: 'onaka ga sukimashita', english: 'I am hungry (lit. stomach has emptied)', partOfSpeech: 'phrase', category: 'Expressions', exampleSentence: { japanese: 'お腹が空きましたね。何か食べましょう。', hiragana: 'おなかが すきましたね。なにか たべましょう。', romaji: 'Onaka ga sukimashita ne. Nanika tabemashou.', english: 'I\'m hungry. Let\'s eat something.' } },
      { id: 'l13_v12', lessonNumber: 13, kanji: '喉が渇きました', hiragana: 'のどがかわきました', romaji: 'nodo ga kawakimashita', english: 'I am thirsty (lit. throat has dried)', partOfSpeech: 'phrase', category: 'Expressions', exampleSentence: { japanese: '喉が渇きました。お茶を飲みたいです。', hiragana: 'のどが かわきました。おちゃを のみたいです。', romaji: 'Nodo ga kawakimashita. Ocha o nomitai desu.', english: 'I\'m thirsty. I want to drink tea.' } }
    ],
    grammar: [
      {
        id: 'l13_g1',
        lessonNumber: 13,
        title: 'N が 欲しいです (Wanting a Thing / Noun)',
        structure: 'Noun + が + 欲しいです',
        explanation: 'Expresses the speaker\'s desire to have or possess an object.',
        rules: [
          'Negative: 欲しくないです (Do not want).',
          'Only used for 1st person (I want) or questions to 2nd person (Do you want?). NEVER used directly to state what a 3rd person wants!'
        ],
        examples: [
          { japanese: '今、何がいちばん欲しいですか。― 車が欲しいです。', hiragana: 'いま、なにが いちばん ほしいですか。― くるまが ほしいです。', romaji: 'Ima, nani ga ichiban hoshii desu ka. ― Kuruma ga hoshii desu.', english: 'What do you want most right now? ― I want a car.' }
        ]
      },
      {
        id: 'l13_g2',
        lessonNumber: 13,
        title: 'V-たいです (Wanting to Do an Action)',
        structure: 'Verb [ます-Stem] + たいです',
        explanation: 'Expresses the speaker\'s desire to perform an action. Conjugates like an い-adjective.',
        rules: [
          'Negative: Verb-たくないです (Do not want to do).',
          'Past: Verb-たかったです (Wanted to do).',
          'Past Negative: Verb-たくなかったです (Didn\'t want to do).',
          'Object particle can be either を or が.'
        ],
        examples: [
          { japanese: '日本へ行きたいです。', hiragana: 'にほんへ いきたいです。', romaji: 'Nihon e ikitai desu.', english: 'I want to go to Japan.' },
          { japanese: '今日は何も食べたくないです。', hiragana: 'きょうは なにも たべたくないです。', romaji: 'Kyou wa nani mo tabetakunai desu.', english: 'I don\'t want to eat anything today.' }
        ]
      },
      {
        id: 'l13_g3',
        lessonNumber: 13,
        title: '[Place] へ [V-Stem / Noun] に 行きます / 来ます / 帰ります (Purpose of Movement)',
        structure: '[Destination] + へ + [Verb Stem / Action Noun] + に + 行きます / 来ます / 帰ります',
        explanation: 'Particle に denotes the purpose for which the subject moves to a destination.',
        rules: [
          'Drop ます from the verb: 食べます → 食べに 行きます (go to eat).',
          'Action nouns attach directly: 買い物に 行きます (go for shopping).'
        ],
        examples: [
          { japanese: 'デパートへ買い物に行きます。', hiragana: 'でぱーとへ かいものに いきます。', romaji: 'Depaato e kaimono ni ikimasu.', english: 'I go to the department store to shop.' },
          { japanese: '日本へ日本語を勉強しに来ました。', hiragana: 'にほんへ にほんごを べんきょうしに きました。', romaji: 'Nihon e nihongo o benkyoushi ni kimashita.', english: 'I came to Japan to study Japanese.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l13_ex1',
        lessonNumber: 13,
        type: 'fill_blank',
        category: 'grammar',
        prompt: '喉が渇きました。冷たい水が [ ? ] です。',
        options: ['飲みたい', '飲みます', '飲む', '飲みたいです'],
        correctAnswer: '飲みたい',
        explanation: 'Verb stem 飲み + たいです expresses the desire to drink.'
      }
    ]
  },

  // =========================================================================
  // LESSON 14: Verb Te-Form (て形), Requests & Actions in Progress
  // =========================================================================
  {
    id: 14,
    lessonNumber: 14,
    level: 'N5',
    title: 'Lesson 14: Verb Te-Form (て形), Requests & Progressive (〜ています)',
    titleJapanese: '第１４課：動詞のテ形・指示・依頼（〜てください）・進行（〜ています）',
    theme: 'ちょっと待ってください、今雨が降っています、手伝いましょうか',
    description: 'The monumental core of Japanese grammar: the Verb Te-Form (て形) across Group 1, Group 2, and Group 3 verbs. Learn polite requests (〜てください), actions in progress (〜ています), and offering assistance (〜ましょうか).',
    keyPhrases: [
      'ちょっと 待って ください。 (Please wait a moment.)',
      '今 雨が 降っています。 (It is raining right now.)',
      '荷物を 持ちましょうか。 (Shall I carry your luggage?)'
    ],
    vocabulary: [
      { id: 'l14_v1', lessonNumber: 14, kanji: 'つけます', hiragana: 'つけます', romaji: 'tsukemasu', english: 'turn on, switch on (lights, AC)', partOfSpeech: 'verb-2', category: 'Verbs', exampleSentence: { japanese: '電気をつけてください。', hiragana: 'でんきを つけて ください。', romaji: 'Denki o tsukete kudasai.', english: 'Please turn on the light.' } },
      { id: 'l14_v2', lessonNumber: 14, kanji: '消します', hiragana: 'けします', romaji: 'keshimasu', english: 'turn off (lights), erase', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: 'エアコンを消しましょうか。', hiragana: 'えあこんを けしましょうか。', romaji: 'Eakon o keshimashou ka.', english: 'Shall I turn off the air conditioner?' } },
      { id: 'l14_v3', lessonNumber: 14, kanji: '開けます', hiragana: 'あけます', romaji: 'akemasu', english: 'open (door, window)', partOfSpeech: 'verb-2', category: 'Verbs', exampleSentence: { japanese: '窓を開けてください。', hiragana: 'まどを あけて ください。', romaji: 'Mado o akete kudasai.', english: 'Please open the window.' } },
      { id: 'l14_v4', lessonNumber: 14, kanji: '閉めます', hiragana: 'しめます', romaji: 'shimemasu', english: 'close, shut', partOfSpeech: 'verb-2', category: 'Verbs', exampleSentence: { japanese: 'ドアを閉めてください。', hiragana: 'どあを しめて ください。', romaji: 'Doa o shimete kudasai.', english: 'Please close the door.' } },
      { id: 'l14_v5', lessonNumber: 14, kanji: '急ぎます', hiragana: 'いそぎます', romaji: 'isogimasu', english: 'hurry', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: '急いでください。', hiragana: 'いそいで ください。', romaji: 'Isoide kudasai.', english: 'Please hurry.' } },
      { id: 'l14_v6', lessonNumber: 14, kanji: '待ちます', hiragana: 'まちます', romaji: 'machimasu', english: 'wait', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: 'ちょっと待ってください。', hiragana: 'ちょっと まって ください。', romaji: 'Chotto matte kudasai.', english: 'Please wait a moment.' } },
      { id: 'l14_v7', lessonNumber: 14, kanji: '持ちます', hiragana: 'もちます', romaji: 'mochimasu', english: 'hold, carry', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: '荷物を持ちましょうか。', hiragana: 'にもつを もちましょうか。', romaji: 'Nimotsu o mochimashou ka.', english: 'Shall I carry your bag?' } },
      { id: 'l14_v8', lessonNumber: 14, kanji: '手伝います', hiragana: 'てつだいます', romaji: 'tetsudaimasu', english: 'help, assist', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: '仕事を手伝ってください。', hiragana: 'しごとを てつだって ください。', romaji: 'Shigoto o tetsudatte kudasai.', english: 'Please help with the work.' } },
      { id: 'l14_v9', lessonNumber: 14, kanji: '呼びます', hiragana: 'よびます', romaji: 'yobimasu', english: 'call (someone), hail (taxi)', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: 'タクシーを呼びましょうか。', hiragana: 'たくしーを よびましょうか。', romaji: 'Takushii o yobimashou ka.', english: 'Shall I call a taxi?' } },
      { id: 'l14_v10', lessonNumber: 14, kanji: '話します', hiragana: 'はなします', romaji: 'hanashimasu', english: 'speak, talk', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: '先生と日本語で話します。', hiragana: 'せんせいと にほんごで はなします。', romaji: 'Sensei to nihongo de hanashimasu.', english: 'I speak with the teacher in Japanese.' } },
      { id: 'l14_v11', lessonNumber: 14, kanji: '使います', hiragana: 'つかいます', romaji: 'tsukaimasu', english: 'use', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: 'この辞書を使ってもいいですか。', hiragana: 'このじしょを つかっても いいですか。', romaji: 'Kono jisho o tsukatte mo ii desu ka.', english: 'May I use this dictionary?' } },
      { id: 'l14_v12', lessonNumber: 14, kanji: '止めます', hiragana: 'とめます', romaji: 'tomemasu', english: 'stop, park', partOfSpeech: 'verb-2', category: 'Verbs', exampleSentence: { japanese: 'ここに車を止めないでください。', hiragana: 'ここに くるまを とめないで ください。', romaji: 'Koko ni kuruma o tomenaide kudasai.', english: 'Please do not park your car here.' } },
      { id: 'l14_v13', lessonNumber: 14, kanji: '見せます', hiragana: 'みせます', romaji: 'misemasu', english: 'show', partOfSpeech: 'verb-2', category: 'Verbs', exampleSentence: { japanese: 'パスポートを見せてください。', hiragana: 'ぱすぽーとを みせて ください。', romaji: 'Pasupooto o misete kudasai.', english: 'Please show your passport.' } },
      { id: 'l14_v14', lessonNumber: 14, kanji: '教えます', hiragana: 'おしえます', romaji: 'oshiemasu', english: 'tell, give (address, phone number)', partOfSpeech: 'verb-2', category: 'Verbs', exampleSentence: { japanese: '電話番号を教えてください。', hiragana: 'でんわばんごうを おしえて ください。', romaji: 'Denwa bangou o oshiete kudasai.', english: 'Please tell me your phone number.' } },
      { id: 'l14_v15', lessonNumber: 14, kanji: '雨が降ります', hiragana: 'あめがふります', romaji: 'ame ga furimasu', english: 'rain (verb)', partOfSpeech: 'verb-1', category: 'Weather', exampleSentence: { japanese: '雨が降っています。', hiragana: 'あめが ふっています。', romaji: 'Ame ga futte imasu.', english: 'It is raining.' } }
    ],
    grammar: [
      {
        id: 'l14_g1',
        lessonNumber: 14,
        title: '動詞のテ形（Te-Form Rules）',
        structure: 'Group 1, Group 2, Group 3 conjugation rules',
        explanation: 'The Te-Form is the connective form of Japanese verbs, essential for requests, progressive actions, permission, and chaining sentences.',
        rules: [
          'Group 1: い・ち・り → って (買います→買って, 待ちます→待って, 帰ります→帰って)',
          'Group 1: み・び・に → んで (飲みます→飲んで, 呼びます→呼んで, 死にます→死んで)',
          'Group 1: き → いて (書きます→書いて; EXCEPTION: 行きます→行って)',
          'Group 1: ぎ → いで (急ぎます→急いで)',
          'Group 1: し → して (話します→話して)',
          'Group 2: Drop ます, add て (食べます→食べて, 見ます→見て)',
          'Group 3: します→して, 来ます→来て (きて)'
        ],
        examples: [
          { japanese: 'ちょっと待ってください。', hiragana: 'ちょっと まって ください。', romaji: 'Chotto matte kudasai.', english: 'Please wait a moment.' }
        ]
      },
      {
        id: 'l14_g2',
        lessonNumber: 14,
        title: 'V-て ください (Polite Request)',
        structure: 'Verb [Te-Form] + ください',
        explanation: 'Politely asks or instructs the listener to perform an action.',
        rules: [
          'More polite than plain imperative.',
          'Never use towards superiors when telling them what to do unless invited.'
        ],
        examples: [
          { japanese: '名前を書いてください。', hiragana: 'なまえを かいて ください。', romaji: 'Namae o kaite kudasai.', english: 'Please write your name.' }
        ]
      },
      {
        id: 'l14_g3',
        lessonNumber: 14,
        title: 'V-て います (Action in Progress)',
        structure: 'Verb [Te-Form] + います',
        explanation: 'Expresses that an ongoing action is happening right now (continuous progressive).',
        rules: [
          '今雨が降っています = "It is raining now."',
          '今テレビを見ています = "I am watching TV now."'
        ],
        examples: [
          { japanese: 'ミラーさんは今電話をかけています。', hiragana: 'みらーさんは いま でんわを かけて います。', romaji: 'Miraa-san wa ima denwa o kakete imasu.', english: 'Mr. Miller is making a phone call right now.' }
        ]
      },
      {
        id: 'l14_g4',
        lessonNumber: 14,
        title: 'V-ましょうか (Offering Assistance / "Shall I...?")',
        structure: 'Verb [ます-Stem] + ましょうか',
        explanation: 'Used when the speaker proposes to do something to assist the listener.',
        rules: [
          'Accept with: ええ、お願いします (Yes, please).',
          'Decline politely with: いいえ、けっこうです (No, thank you).'
        ],
        examples: [
          { japanese: '傘を貸しましょうか。― ええ、お願いします。', hiragana: 'かさを かしましょうか。― ええ、おねがいします。', romaji: 'Kasa o kashimashou ka. ― Ee, onegaishimasu.', english: 'Shall I lend you an umbrella? ― Yes, please.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l14_ex1',
        lessonNumber: 14,
        type: 'mcq',
        category: 'grammar',
        prompt: 'What is the correct Te-Form of 待ちます (machimasu = wait)?',
        options: ['待って', '待ちて', '待いで', '待んで'],
        correctAnswer: '待って',
        explanation: 'Group 1 verbs ending in ち change to って in the Te-Form.'
      }
    ]
  },

  // =========================================================================
  // LESSON 15: Permission (〜てもいいですか) & Prohibition (〜てはいけません)
  // =========================================================================
  {
    id: 15,
    lessonNumber: 15,
    level: 'N5',
    title: 'Lesson 15: Permission, Prohibition & Continuing States',
    titleJapanese: '第１５課：許可（〜てもいいですか）・禁止（〜てはいけません）・状態（〜ています）',
    theme: '写真を撮ってもいいですか、ここではタバコを吸ってはいけません、結婚しています',
    description: 'Learn asking for permission (〜てもいいですか), stating prohibitions (〜てはいけません), and using 〜ています to describe persistent states (marital status, occupation, residence).',
    keyPhrases: [
      '写真を 撮っても いいですか。 (May I take a photo?)',
      'ここで タバコを 吸っては いけません。 (You must not smoke here.)',
      '私は 結婚しています。 (I am married.)',
      'IMCで 働いています。 (I work at IMC.)'
    ],
    vocabulary: [
      { id: 'l15_v1', lessonNumber: 15, kanji: '置きます', hiragana: 'おきます', romaji: 'okimasu', english: 'put, place', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: 'ここに荷物を置いてください。', hiragana: 'ここに にもつを おいて ください。', romaji: 'Koko ni nimotsu o oite kudasai.', english: 'Please place your luggage here.' } },
      { id: 'l15_v2', lessonNumber: 15, kanji: '作ります', hiragana: 'つくります', romaji: 'tsukurimasu', english: 'make, produce', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: '晩ご飯を作ります。', hiragana: 'ばんごはんを つくります。', romaji: 'Bangohan o tsukurimasu.', english: 'I make dinner.' } },
      { id: 'l15_v3', lessonNumber: 15, kanji: '売ります', hiragana: 'うります', romaji: 'urimasu', english: 'sell', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: '古い車を売りました。', hiragana: 'ふるい くるまを うりました。', romaji: 'Furui kuruma o urimashita.', english: 'I sold my old car.' } },
      { id: 'l15_v4', lessonNumber: 15, kanji: '知ります', hiragana: 'しります', romaji: 'shirimasu', english: 'get to know, find out', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: '彼の名前を知っています。', hiragana: 'かれの なまえを しっています。', romaji: 'Kare no namae o shitte imasu.', english: 'I know his name.' } },
      { id: 'l15_v5', lessonNumber: 15, kanji: '住みます', hiragana: 'すみます', romaji: 'sumimasu', english: 'live, reside', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: '東京に住んでいます。', hiragana: 'とうきょうに すんでいます。', romaji: 'Toukyou ni sunde imasu.', english: 'I live in Tokyo.' } },
      { id: 'l15_v6', lessonNumber: 15, kanji: '研究します', hiragana: 'けんきゅうします', romaji: 'kenkyuushimasu', english: 'do research', partOfSpeech: 'verb-3', category: 'Verbs', exampleSentence: { japanese: '日本の歴史を研究しています。', hiragana: 'にほんの れきしを けんきゅうして います。', romaji: 'Nihon no rekishi o kenkyuushite imasu.', english: 'I am researching Japanese history.' } },
      { id: 'l15_v7', lessonNumber: 15, kanji: '知っています', hiragana: 'しっています', romaji: 'shitte imasu', english: 'know (state)', partOfSpeech: 'phrase', category: 'Verbs', exampleSentence: { japanese: 'あの人を知っていますか。― いいえ、知りません。', hiragana: 'あのひとを しっていますか。― いいえ、しりません。', romaji: 'Ano hito o shitte imasu ka. ― Iie, shirimasen.', english: 'Do you know that person? ― No, I do not know them.' } },
      { id: 'l15_v8', lessonNumber: 15, kanji: '資料', hiragana: 'しりょう', romaji: 'shiryou', english: 'materials, data, handout', partOfSpeech: 'noun', category: 'Work', exampleSentence: { japanese: '会議の資料を配ります。', hiragana: 'かいぎの しりょうを くばります。', romaji: 'Kaigi no shiryou o kubarimasu.', english: 'I distribute the meeting materials.' } },
      { id: 'l15_v9', lessonNumber: 15, kanji: 'カタログ', hiragana: 'かたろぐ', romaji: 'katarogu', english: 'catalog', partOfSpeech: 'noun', category: 'Objects', exampleSentence: { japanese: 'カタログを見てもいいですか。', hiragana: 'かたろぐを みても いいですか。', romaji: 'Katarogu o mite mo ii desu ka.', english: 'May I look at the catalog?' } },
      { id: 'l15_v10', lessonNumber: 15, kanji: '時刻表', hiragana: 'じこくひょう', romaji: 'jikokuhyou', english: 'timetable, train schedule', partOfSpeech: 'noun', category: 'Travel', exampleSentence: { japanese: '電車の時刻表を調べます。', hiragana: 'でんしゃの じこくひょうを しらべます。', romaji: 'Densha no jikokuhyou o shirabemasu.', english: 'I check the train timetable.' } },
      { id: 'l15_v11', lessonNumber: 15, kanji: '服', hiragana: 'ふく', romaji: 'fuku', english: 'clothes', partOfSpeech: 'noun', category: 'Clothing', exampleSentence: { japanese: '新しい服を買いました。', hiragana: 'あたらしい ふくを かいました。', romaji: 'Atarashii fuku o kaimashita.', english: 'I bought new clothes.' } },
      { id: 'l15_v12', lessonNumber: 15, kanji: '製品', hiragana: 'せいひん', romaji: 'seihin', english: 'manufactured products, goods', partOfSpeech: 'noun', category: 'Business', exampleSentence: { japanese: '日本の電化製品です。', hiragana: 'にほんの でんかせいひんです。', romaji: 'Nihon no denka seihin desu.', english: 'It is a Japanese electric product.' } },
      { id: 'l15_v13', lessonNumber: 15, kanji: '専門', hiragana: 'せんもん', romaji: 'senmon', english: 'specialty, field of study', partOfSpeech: 'noun', category: 'Education', exampleSentence: { japanese: '私の専門は経済です。', hiragana: 'わたしの せんもんは けいざいです。', romaji: 'Watashi no senmon wa keizai desu.', english: 'My major is economics.' } },
      { id: 'l15_v14', lessonNumber: 15, kanji: '歯医者', hiragana: 'はいしゃ', romaji: 'haisha', english: 'dentist', partOfSpeech: 'noun', category: 'Occupations', exampleSentence: { japanese: '歯医者へ行きます。', hiragana: 'はいしゃへ いきます。', romaji: 'Haisha e ikimasu.', english: 'I go to the dentist.' } },
      { id: 'l15_v15', lessonNumber: 15, kanji: '独身', hiragana: 'どくしん', romaji: 'dokushin', english: 'single, unmarried', partOfSpeech: 'noun', category: 'Status', exampleSentence: { japanese: '私は独身です。', hiragana: 'わたしは どくしんです。', romaji: 'Watashi wa dokushin desu.', english: 'I am single.' } }
    ],
    grammar: [
      {
        id: 'l15_g1',
        lessonNumber: 15,
        title: 'V-ても いいですか (Asking for Permission / "May I...?")',
        structure: 'Verb [Te-Form] + も + いいですか',
        explanation: 'Used to politely ask for permission to perform an action.',
        rules: [
          'Grant permission with: ええ、いいですよ / どうぞ。',
          'Refuse gently with: すみません、ちょっと... (I\'m sorry, that\'s a bit...).'
        ],
        examples: [
          { japanese: 'ここで写真を撮ってもいいですか。― ええ、いいですよ。', hiragana: 'ここで しゃしんを とっても いいですか。― ええ、いいですよ。', romaji: 'Koko de shashin o totte mo ii desu ka. ― Ee, ii desu yo.', english: 'May I take a photo here? ― Yes, you may.' }
        ]
      },
      {
        id: 'l15_g2',
        lessonNumber: 15,
        title: 'V-ては いけません (Prohibition / "You must not...")',
        structure: 'Verb [Te-Form] + は (pronounced "wa") + いけません',
        explanation: 'Expresses a strict prohibition by rule, law, or authority.',
        rules: [
          'Used on signs, regulations, or parents/teachers speaking to juniors.',
          'Soft refusal to permission: いいえ、いけません.'
        ],
        examples: [
          { japanese: 'ここでタバコを吸ってはいけません。', hiragana: 'ここで たばこを すっては いけません。', romaji: 'Koko de tabako o sutte wa ikemasen.', english: 'You must not smoke here.' }
        ]
      },
      {
        id: 'l15_g3',
        lessonNumber: 15,
        title: 'V-て います (Continuing Resulting State)',
        structure: 'Verb [Te-Form] + います',
        explanation: 'When used with instantaneous change-of-state verbs, 〜ています expresses that the result of an past action remains in effect now.',
        rules: [
          '結婚しています (is married)',
          '東京に住んでいます (lives in Tokyo)',
          '持っています (possesses/owns)',
          '知っています (knows; negative is 知りません, NOT 知っていません!)'
        ],
        examples: [
          { japanese: '山田さんを知っていますか。― いいえ、知りません。', hiragana: 'やまださんを しっていますか。― いいえ、しりません。', romaji: 'Yamada-san o shitte imasu ka. ― Iie, shirimasen.', english: 'Do you know Mr. Yamada? ― No, I do not know him.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l15_ex1',
        lessonNumber: 15,
        type: 'mcq',
        category: 'grammar',
        prompt: 'If someone asks "山田さんの電話番号を知っていますか", what is the correct negative reply?',
        options: [
          'いいえ、知りません。',
          'いいえ、知っていません。',
          'いいえ、知りませんでした。',
          'いいえ、知るじゃありません。'
        ],
        correctAnswer: 'いいえ、知りません。',
        explanation: 'The negative of 知っています is always 知りません (shirimasen).'
      }
    ]
  }
];
