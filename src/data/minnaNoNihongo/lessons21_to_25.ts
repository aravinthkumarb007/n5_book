import { MinnaLesson } from '@/types/minna';

export const MINNA_LESSONS_21_TO_25: MinnaLesson[] = [
  // =========================================================================
  // LESSON 21: Plain Form Opinions (と思います) & Quotations (と言いました)
  // Textbook Reference: Pages 152–157
  // =========================================================================
  {
    id: 21,
    lessonNumber: 21,
    level: 'N5',
    title: 'Lesson 21: Expressing Opinions (〜と思う) & Quotations (〜と言う)',
    titleJapanese: '第２１課：普通形＋と思います・〜と言いました・〜でしょう？・Nでも',
    theme: 'あした雨が降ると思います、日本は物価が高いと思います、首相は来月アメリカへ行くと言いました',
    description: 'Master expressing personal opinions and conjectures with [Plain Form] + と思います, reporting direct and indirect statements with [Plain Form] + と言いました, confirming with 〜でしょう？, and suggesting options with でも.',
    keyPhrases: [
      'あした 雨が 降ると 思います。 (I think it will rain tomorrow.)',
      '首相は 来月 アメリカへ 行くと 言いました。 (The prime minister said that he would go to the U.S.A. next month.)',
      '日本は 物価が 高いと 思います。 (I think that prices are high in Japan.)',
      'あした パーティーに 行くでしょう？…ええ、行きます。 (You are going to the party tomorrow, aren\'t you? ...Yes, I am.)',
      '東京で 日本と ブラジルの サッカーの 試合が あります。 (A football game between Japan and Brazil will be held in Tokyo.)',
      'ちょっと ビールでも 飲みませんか。 (Shall we drink beer or something?)'
    ],
    vocabulary: [
      { id: 'l21_v1', lessonNumber: 21, kanji: '思います I', hiragana: 'おもいます', romaji: 'omoimasu', english: 'think', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l21_v2', lessonNumber: 21, kanji: '言います I', hiragana: 'いいます', romaji: 'iimasu', english: 'say', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l21_v3', lessonNumber: 21, kanji: '足ります II', hiragana: 'たります', romaji: 'tarimasu', english: 'be enough, be sufficient', partOfSpeech: 'verb-2', category: 'Verbs' },
      { id: 'l21_v4', lessonNumber: 21, kanji: '勝ちます I', hiragana: 'かちます', romaji: 'kachimasu', english: 'win', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l21_v5', lessonNumber: 21, kanji: '負けます II', hiragana: 'まけます', romaji: 'makemasu', english: 'lose, be beaten', partOfSpeech: 'verb-2', category: 'Verbs' },
      { id: 'l21_v6', lessonNumber: 21, kanji: 'あります I', hiragana: 'あります', romaji: 'arimasu', english: '[a festival] be held, take place', partOfSpeech: 'verb-1', category: 'Verbs', notes: '[お祭りが〜] [a festival] be held' },
      { id: 'l21_v7', lessonNumber: 21, kanji: '役に 立ちます I', hiragana: 'やくに たちます', romaji: 'yaku ni tachimasu', english: 'be useful', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l21_v8', lessonNumber: 21, kanji: '無駄[な]', hiragana: 'むだ[な]', romaji: 'muda[na]', english: 'wasteful', partOfSpeech: 'na-adjective', category: 'Adjectives' },
      { id: 'l21_v9', lessonNumber: 21, kanji: '不便[な]', hiragana: 'ふべん[な]', romaji: 'fuben[na]', english: 'inconvenient', partOfSpeech: 'na-adjective', category: 'Adjectives' },
      { id: 'l21_v10', lessonNumber: 21, kanji: '同じ', hiragana: 'おなじ', romaji: 'onaji', english: 'the same', partOfSpeech: 'na-adjective', category: 'Descriptions' },
      { id: 'l21_v11', lessonNumber: 21, kanji: 'すごい', hiragana: 'すごい', romaji: 'sugoi', english: 'awful, great (expresses astonishment or admiration)', partOfSpeech: 'i-adjective', category: 'Descriptions' },
      { id: 'l21_v12', lessonNumber: 21, kanji: '首相', hiragana: 'しゅしょう', romaji: 'shushou', english: 'prime minister', partOfSpeech: 'noun', category: 'Politics' },
      { id: 'l21_v13', lessonNumber: 21, kanji: '大統領', hiragana: 'だいとうりょう', romaji: 'daitouryou', english: 'president', partOfSpeech: 'noun', category: 'Politics' },
      { id: 'l21_v14', lessonNumber: 21, kanji: '政治', hiragana: 'せいじ', romaji: 'seiji', english: 'politics', partOfSpeech: 'noun', category: 'Politics' },
      { id: 'l21_v15', lessonNumber: 21, kanji: 'ニュース', hiragana: 'にゅーす', romaji: 'nyuusu', english: 'news', partOfSpeech: 'noun', category: 'Media' },
      { id: 'l21_v16', lessonNumber: 21, kanji: 'スピーチ', hiragana: 'すぴーち', romaji: 'supiichi', english: 'speech (~を します: make a speech)', partOfSpeech: 'noun', category: 'Communication' },
      { id: 'l21_v17', lessonNumber: 21, kanji: '試合', hiragana: 'しあい', romaji: 'shiai', english: 'game, match', partOfSpeech: 'noun', category: 'Sports' },
      { id: 'l21_v18', lessonNumber: 21, kanji: 'アルバイト', hiragana: 'あるばいと', romaji: 'arubaito', english: 'side job, part-time work (~を します: work part time)', partOfSpeech: 'noun', category: 'Work' },
      { id: 'l21_v19', lessonNumber: 21, kanji: '意見', hiragana: 'いけん', romaji: 'iken', english: 'opinion', partOfSpeech: 'noun', category: 'Communication' },
      { id: 'l21_v20', lessonNumber: 21, kanji: '[お]話', hiragana: '[お]はなし', romaji: '[o]hanashi', english: 'talk, speech, story (~を します: talk, tell a story)', partOfSpeech: 'noun', category: 'Communication' },
      { id: 'l21_v21', lessonNumber: 21, kanji: 'ユーモア', hiragana: 'ゆーもあ', romaji: 'yuumoa', english: 'humor', partOfSpeech: 'noun', category: 'General' },
      { id: 'l21_v22', lessonNumber: 21, kanji: 'むだ', hiragana: 'むだ', romaji: 'muda', english: 'waste', partOfSpeech: 'noun', category: 'General' },
      { id: 'l21_v23', lessonNumber: 21, kanji: 'デザイン', hiragana: 'でざいん', romaji: 'dezain', english: 'design', partOfSpeech: 'noun', category: 'General' },
      { id: 'l21_v24', lessonNumber: 21, kanji: '交通', hiragana: 'こうつう', romaji: 'koutsuu', english: 'transportation, traffic', partOfSpeech: 'noun', category: 'Society' },
      { id: 'l21_v25', lessonNumber: 21, kanji: 'ラッシュ', hiragana: 'らっしゅ', romaji: 'rasshu', english: 'rush hour', partOfSpeech: 'noun', category: 'Society' },
      { id: 'l21_v26', lessonNumber: 21, kanji: '最近', hiragana: 'さいきん', romaji: 'saikin', english: 'recently, these days', partOfSpeech: 'adverb', category: 'Time' },
      { id: 'l21_v27', lessonNumber: 21, kanji: 'たぶん', hiragana: 'たぶん', romaji: 'tabun', english: 'probably, perhaps, maybe', partOfSpeech: 'adverb', category: 'Probability' },
      { id: 'l21_v28', lessonNumber: 21, kanji: 'きっと', hiragana: 'きっと', romaji: 'kitto', english: 'surely, definitely', partOfSpeech: 'adverb', category: 'Probability' },
      { id: 'l21_v29', lessonNumber: 21, kanji: 'ほんとうに', hiragana: 'ほんとうに', romaji: 'hontou ni', english: 'really, truly', partOfSpeech: 'adverb', category: 'Degree' },
      { id: 'l21_v30', lessonNumber: 21, kanji: 'そんなに', hiragana: 'そんなに', romaji: 'sonna ni', english: 'not so much (used with negatives)', partOfSpeech: 'adverb', category: 'Degree' },
      { id: 'l21_v31', lessonNumber: 21, kanji: '〜について', hiragana: '〜について', romaji: '-ni tsuite', english: 'about ~, concerning ~', partOfSpeech: 'particle', category: 'Grammar' },
      { id: 'l21_v32', lessonNumber: 21, kanji: 'しかたが ありません。', hiragana: 'しかたが ありません。', romaji: 'Shikata ga arimasen.', english: "There is no other choice. / It can't be helped.", partOfSpeech: 'phrase', category: 'Expressions' },
      { id: 'l21_v33', lessonNumber: 21, kanji: 'しばらくですね。', hiragana: 'しばらくですね。', romaji: 'Shibaraku desu ne.', english: "It's been a long time. / Long time no see.", partOfSpeech: 'phrase', category: 'Greetings' },
      { id: 'l21_v34', lessonNumber: 21, kanji: '〜でも 飲みませんか。', hiragana: '〜でも のみませんか。', romaji: '~ demo nomimasen ka.', english: 'How about drinking ~ or something?', partOfSpeech: 'phrase', category: 'Conversations' },
      { id: 'l21_v35', lessonNumber: 21, kanji: '見ないと……。', hiragana: 'みないと……。', romaji: 'Minai to...', english: "I've got to watch it.", partOfSpeech: 'phrase', category: 'Conversations' },
      { id: 'l21_v36', lessonNumber: 21, kanji: 'もちろん', hiragana: 'もちろん', romaji: 'mochiron', english: 'of course', partOfSpeech: 'adverb', category: 'Conversations' },
      { id: 'l21_v37', lessonNumber: 21, kanji: 'カンガルー', hiragana: 'かんがるー', romaji: 'kangaruu', english: 'kangaroo', partOfSpeech: 'noun', category: 'Nature' },
      { id: 'l21_v38', lessonNumber: 21, kanji: 'キャプテン・クック', hiragana: 'きゃぷてん・くっく', romaji: 'Kyaputen Kukku', english: 'Captain James Cook (1728–1779)', partOfSpeech: 'noun', category: 'People' }
    ],
    grammar: [
      {
        id: 'l21_g1',
        lessonNumber: 21,
        title: '普通形 ＋ と 思います (Expressing Opinions & Conjectures)',
        structure: '[Plain Form] + と 思います',
        explanation: 'Ideas, conjectures, or personal opinions are marked by the particle と before 思います. Remember that for present affirmative noun and な-adjectives, insert だ before と (e.g., 暇だ と思います).',
        rules: [
          'Conjecture: あした 雨が 降ると 思います (I think it will rain tomorrow).',
          'Negative conjecture: ミラーさんは この ニュースを 知らないと 思います (I don\'t think Mr. Miller knows this news).',
          'Opinion: 日本は 物価が 高いと 思います (I think prices are high in Japan).',
          'Agreement/Disagreement: わたしも そう 思います (I think so, too) / わたしは そう[は] 思いません (I don\'t think so).'
        ],
        examples: [
          { japanese: 'あした 雨が 降ると 思います。', hiragana: 'あした あめが ふると おもいます。', romaji: 'Ashita ame ga furu to omoimasu.', english: 'I think it will rain tomorrow.' },
          { japanese: '日本は 物価が 高いと 思います。', hiragana: 'にほんは ぶっかが たかいと おもいます。', romaji: 'Nihon wa bukka ga takai to omoimasu.', english: 'I think that prices are high in Japan.' },
          { japanese: 'ファクスは 便利ですね。…わたしも そう 思います。', hiragana: 'ふぁくすは べんりですね。…わたしも そう おもいます。', romaji: 'Fakusu wa benri desu ne. ...Watashi mo sou omoimasu.', english: 'Fax machines are convenient, aren\'t they? ...I think so, too.' }
        ]
      },
      {
        id: 'l21_g2',
        lessonNumber: 21,
        title: '「S」と 言います / 普通形 ＋ と 言います (Direct & Indirect Quotations)',
        structure: 'Direct: 「...」と 言いました | Indirect: [Plain Form] + と 言いました',
        explanation: 'Direct quotes repeat the exact spoken words enclosed in brackets 「...」 followed by と 言いました. Indirect quotes use Plain Form before と, and the tense within the quoted clause is unaffected by the main sentence tense.',
        rules: [
          'Direct: 寝る まえに 「お休みなさい」と 言います (We say "Good night" before going to bed).',
          'Indirect: ミラーさんは 来週 東京へ 出張すると 言いました (Mr. Miller said that he would go to Tokyo on a business trip next week).'
        ],
        examples: [
          { japanese: '寝る まえに 「お休みなさい」と 言います。', hiragana: 'ねる まえに 「おやすみなさい」と いいます。', romaji: 'Neru mae ni "Oyasuminasai" to iimasu.', english: 'We say "Good night" before going to bed.' },
          { japanese: 'ミラーさんは 来週 東京へ 出張すると 言いました。', hiragana: 'みらーさんは らいしゅう とうきょうへ しゅっちょうすると いいました。', romaji: 'Miraa-san wa raishuu Toukyou e shucchousuru to iimashita.', english: 'Mr. Miller said that he would go to Tokyo on a business trip next week.' }
        ]
      },
      {
        id: 'l21_g3',
        lessonNumber: 21,
        title: '普通形 ＋ でしょう？ (Seeking Confirmation: ..., isn\'t it?)',
        structure: 'Plain Form (drop だ for nouns & な-adj) + でしょう？',
        explanation: 'Used with a rising intonation when the speaker expects that the listener possesses knowledge on the topic and will agree with the speaker\'s view.',
        rules: [
          'あした パーティーに 行くでしょう？…ええ、行きます (You are going to the party tomorrow, aren\'t you? ...Yes, I am).',
          '北海道は 寒かったでしょう？…いいえ、そんなに 寒くなかったです (It was cold in Hokkaido, wasn\'t it? ...No, it was not that cold).'
        ],
        examples: [
          { japanese: 'あした パーティーに 行くでしょう？…ええ、行きます。', hiragana: 'あした ぱーてぃーに いくでしょう？…ええ、いきます。', romaji: 'Ashita paatii ni iku deshou? ...Ee, ikimasu.', english: 'You are going to the party tomorrow, aren\'t you? ...Yes, I am.' }
        ]
      },
      {
        id: 'l21_g4',
        lessonNumber: 21,
        title: 'N1 (place) で N2 が あります (Events Taking Place)',
        structure: 'Place + で + Event + が あります',
        explanation: 'When N2 is an event such as a party, concert, festival, match, or incident, あります means "to take place" or "to be held". The location is marked by で.',
        rules: [
          '東京で 日本と ブラジルの サッカーの 試合が あります (A soccer match between Japan and Brazil will take place in Tokyo).'
        ],
        examples: [
          { japanese: '東京で 日本と ブラジルの サッカーの 試合が あります。', hiragana: 'とうきょうで にほんと ぶらじるの さっかーの しあいが あります。', romaji: 'Toukyou de Nihon to Burajiru no sakkaa no shiai ga arimasu.', english: 'A football game between Japan and Brazil will be held in Tokyo.' }
        ]
      },
      {
        id: 'l21_g5',
        lessonNumber: 21,
        title: 'N でも V (Suggesting an Example)',
        structure: 'Noun + でも + Verb',
        explanation: 'でも is used to give an example out of things of the same kind when making a polite suggestion or invitation.',
        rules: [
          'ちょっと ビールでも 飲みませんか (Shall we drink beer or something?).'
        ],
        examples: [
          { japanese: 'ちょっと ビールでも 飲みませんか。', hiragana: 'ちょっと びーるでも のみませんか。', romaji: 'Chotto biiru demo nomimasen ka.', english: 'Shall we drink beer or something?' }
        ]
      },
      {
        id: 'l21_g6',
        lessonNumber: 21,
        title: 'V ない-form ないと…… (I Have to... / Colloquial Ellipsis)',
        structure: 'Verb [ない-form] + と……',
        explanation: 'Formed by omitting いけません from V ない-form ないといけません. Expresses informal necessity ("I must / I have to...").',
        rules: [
          'もう 帰らないと…… (I have to go home now).'
        ],
        examples: [
          { japanese: 'もう 帰らないと……。', hiragana: 'もう かえらないと……。', romaji: 'Mou kaeranai to...', english: 'I have to go home now.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l21_ex1',
        lessonNumber: 21,
        type: 'mcq',
        category: 'grammar',
        prompt: 'Which sentence correctly expresses "I think this machine is convenient"?',
        options: [
          'この 機械は 便利だと 思います。',
          'この 機械は 便利と 思います。',
          'この 機械は 便利ですと 思います。',
          'この 機械は 便利であると 思います。'
        ],
        correctAnswer: 'この 機械は 便利だと 思います。',
        explanation: 'For な-adjectives and nouns in non-past affirmative, insert だ before と思います (便利だ と思います).'
      },
      {
        id: 'l21_ex2',
        lessonNumber: 21,
        type: 'fill_blank',
        category: 'grammar',
        prompt: 'Fill in the blank: 東京 [ ? ] サッカーの 試合が あります。 (A soccer match will be held in Tokyo.)',
        options: ['で', 'に', 'へ', 'を'],
        correctAnswer: 'で',
        explanation: 'When あります means an event "takes place / is held", the location is marked by で.'
      },
      {
        id: 'l21_ex3',
        lessonNumber: 21,
        type: 'mcq',
        category: 'grammar',
        prompt: 'What does "ビールでも 飲みませんか" mean?',
        options: [
          'Shall we drink beer or something?',
          'Do you only drink beer?',
          'Even beer cannot be drunk.',
          'Why did you drink beer?'
        ],
        correctAnswer: 'Shall we drink beer or something?',
        explanation: 'N でも suggests an example item when extending an invitation.'
      }
    ],
    dialogue: {
      title: 'わたしも そう 思います (I think so, too)',
      situation: 'Mr. Matsumoto and Mr. Santos meet after a long time and discuss an upcoming soccer match between Japan and Brazil over drinks.',
      lines: [
        { speaker: '松本', japanese: 'サントスさん、しばらくですね。', hiragana: 'さんとすさん、しばらくですね。', english: "Mr. Santos, it's been a long time." },
        { speaker: 'サントス', japanese: 'あ、松本さん。お元気ですか。', hiragana: 'あ、まつもとさん。おげんきですか。', english: 'Mr. Matsumoto, how are you?' },
        { speaker: '松本', japanese: 'ええ、元気です。ちょっと ビールでも 飲みませんか。', hiragana: 'ええ、げんきです。ちょっと びーるでも のみませんか。', english: "I'm fine. How about going for a beer or something?" },
        { speaker: 'サントス', japanese: 'いいですね。', hiragana: 'いいですね。', english: 'That sounds good.' },
        { speaker: 'サントス', japanese: '今晩 10時から 日本と ブラジルの サッカーの 試合が ありますね。', hiragana: 'こんばんは じゅうじから にほんと ぶらじるの さっかーの しあいが ありますね。', english: 'There will be a soccer game between Japan and Brazil from ten tonight.' },
        { speaker: '松本', japanese: 'ええ。見ないと……。どちらが 勝つと 思いますか。', hiragana: 'ええ。みないと……。どちらが かつと おもいますか。', english: 'Yes, there will. I must be sure to watch it. Which team do you think will win?' },
        { speaker: 'サントス', japanese: 'もちろん ブラジルですよ。', hiragana: 'もちろん ぶらじるですよ。', english: 'Of course, Brazil.' },
        { speaker: '松本', japanese: 'でも、最近 日本も 強く なりましたよ。', hiragana: 'でも、さいきん にほんも つよく なりましたよ。', english: 'But I tell you recently Japan have got a lot better.' },
        { speaker: 'サントス', japanese: 'ええ、わたしも そう 思います。あ、もう こんな 時間ですね。帰りましょう。', hiragana: 'ええ、わたしも そう おもいます。あ、もう こんな じかんですね。かえりましょう。', english: 'I think so, too... Oh, look at the time! Let\'s go home.' }
      ]
    }
  },

  // =========================================================================
  // LESSON 22: Noun Modification by Sentences (連体修飾・相対節)
  // Textbook Reference: Pages 158–163
  // =========================================================================
  {
    id: 22,
    lessonNumber: 22,
    level: 'N5',
    title: 'Lesson 22: Noun Modification by Sentences (Relative Clauses)',
    titleJapanese: '第２２課：連体修飾節（文で名詞を修飾する）・修飾節の主語「が」・〜時間／約束／用事',
    theme: 'これはミラーさんが作ったケーキです、あそこで新聞を読んでいる人は誰ですか、朝ごはんを食べる時間がありません',
    description: 'Learn Japanese noun modification by sentences (relative clauses), where modifying verbs are ALWAYS in Plain Form and precede the noun directly without relative pronouns. Master relative clause subjects with が, and express schedules with 時間／約束／用事.',
    keyPhrases: [
      'これは ミラーさんが 作った ケーキです。 (This is a cake Mr. Miller made.)',
      'あそこに いる 人は ミラーさんです。 (That man who is over there is Mr. Miller.)',
      'きのう 習った 言葉を 忘れました。 (I have forgotten the words I learned yesterday.)',
      '買い物に 行く 時間が ありません。 (I have no time to go shopping.)',
      '万里の長城で 撮った 写真です。 (This is a photo I took on the Great Wall of China.)',
      'あそこで 着物を 着て いる 人は 誰ですか。 (Who is that woman wearing the kimono?)'
    ],
    vocabulary: [
      { id: 'l22_v1', lessonNumber: 22, kanji: '着ます II', hiragana: 'きます', romaji: 'kimasu', english: 'put on [a shirt, coat, etc. - upper body]', partOfSpeech: 'verb-2', category: 'Verbs', notes: '[シャツを〜] put on [a shirt, etc.]' },
      { id: 'l22_v2', lessonNumber: 22, kanji: 'はきます I', hiragana: 'はきます', romaji: 'hakimasu', english: 'put on [shoes, trousers, etc. - lower body]', partOfSpeech: 'verb-1', category: 'Verbs', notes: '[靴を〜] put on [shoes, trousers]' },
      { id: 'l22_v3', lessonNumber: 22, kanji: 'かぶります I', hiragana: 'かぶります', romaji: 'kaburimasu', english: 'put on [a hat, etc. - head]', partOfSpeech: 'verb-1', category: 'Verbs', notes: '[帽子を〜] put on [a hat]' },
      { id: 'l22_v4', lessonNumber: 22, kanji: 'かけます II', hiragana: 'かけます', romaji: 'kakemasu', english: 'put on [glasses]', partOfSpeech: 'verb-2', category: 'Verbs', notes: '[眼鏡を〜] put on [glasses]' },
      { id: 'l22_v5', lessonNumber: 22, kanji: '生まれます II', hiragana: 'うまれます', romaji: 'umaremasu', english: 'be born', partOfSpeech: 'verb-2', category: 'Verbs' },
      { id: 'l22_v6', lessonNumber: 22, kanji: 'コート', hiragana: 'こーと', romaji: 'kooto', english: 'coat', partOfSpeech: 'noun', category: 'Clothes' },
      { id: 'l22_v7', lessonNumber: 22, kanji: 'スーツ', hiragana: 'すーつ', romaji: 'suutsu', english: 'suit', partOfSpeech: 'noun', category: 'Clothes' },
      { id: 'l22_v8', lessonNumber: 22, kanji: 'セーター', hiragana: 'せーたー', romaji: 'seetaa', english: 'sweater', partOfSpeech: 'noun', category: 'Clothes' },
      { id: 'l22_v9', lessonNumber: 22, kanji: '帽子', hiragana: 'ぼうし', romaji: 'boushi', english: 'hat, cap', partOfSpeech: 'noun', category: 'Clothes' },
      { id: 'l22_v10', lessonNumber: 22, kanji: '眼鏡', hiragana: 'めがね', romaji: 'megane', english: 'glasses', partOfSpeech: 'noun', category: 'Accessories' },
      { id: 'l22_v11', lessonNumber: 22, kanji: 'よく', hiragana: 'よく', romaji: 'yoku', english: 'often', partOfSpeech: 'adverb', category: 'Frequency' },
      { id: 'l22_v12', lessonNumber: 22, kanji: 'おめでとう ございます。', hiragana: 'おめでとう ございます。', romaji: 'Omedetou gozaimasu.', english: 'Congratulations. (birthdays, weddings, New Year)', partOfSpeech: 'phrase', category: 'Greetings' },
      { id: 'l22_v13', lessonNumber: 22, kanji: 'こちら', hiragana: 'こちら', romaji: 'kochira', english: 'this (polite equivalent of これ)', partOfSpeech: 'pronoun', category: 'Demonstratives' },
      { id: 'l22_v14', lessonNumber: 22, kanji: '家賃', hiragana: 'やちん', romaji: 'yachin', english: 'house rent', partOfSpeech: 'noun', category: 'Housing' },
      { id: 'l22_v15', lessonNumber: 22, kanji: 'うーん。', hiragana: 'うーん。', romaji: 'Uun.', english: 'Let me see. / Well...', partOfSpeech: 'phrase', category: 'Conversations' },
      { id: 'l22_v16', lessonNumber: 22, kanji: 'ダイニングキッチン', hiragana: 'だいにんぐきっちん', romaji: 'dainingu kicchin', english: 'kitchen with dining area (DK)', partOfSpeech: 'noun', category: 'Housing' },
      { id: 'l22_v17', lessonNumber: 22, kanji: '和室', hiragana: 'わしつ', romaji: 'washitsu', english: 'Japanese-style tatami room', partOfSpeech: 'noun', category: 'Housing' },
      { id: 'l22_v18', lessonNumber: 22, kanji: '押し入れ', hiragana: 'おしいれ', romaji: 'oshiire', english: 'Japanese-style closet', partOfSpeech: 'noun', category: 'Housing' },
      { id: 'l22_v19', lessonNumber: 22, kanji: '布団', hiragana: 'ふとん', romaji: 'futon', english: 'Japanese-style mattress and quilt', partOfSpeech: 'noun', category: 'Housing' },
      { id: 'l22_v20', lessonNumber: 22, kanji: 'アパート', hiragana: 'あぱーと', romaji: 'apaato', english: 'apartment', partOfSpeech: 'noun', category: 'Housing' },
      { id: 'l22_v21', lessonNumber: 22, kanji: 'パリ', hiragana: 'ぱり', romaji: 'Pari', english: 'Paris', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l22_v22', lessonNumber: 22, kanji: '万里の長城', hiragana: 'ばんりのちょうじょう', romaji: 'Banri no Choujou', english: 'the Great Wall of China', partOfSpeech: 'noun', category: 'Places' }
    ],
    grammar: [
      {
        id: 'l22_g1',
        lessonNumber: 22,
        title: '文による名詞修飾 (Noun Modification by Sentences / Relative Clauses)',
        structure: '[Sentence in Plain Form] + Noun',
        explanation: 'In Japanese, modifying clauses ALWAYS come before the noun they modify, and there are NO relative pronouns (like who, which, that). The modifying clause predicate must always be in PLAIN FORM.',
        rules: [
          '行く 人 (a person who goes)',
          '行かない 人 (a person who does not go)',
          '行った 人 (a person who went)',
          '行かなかった 人 (a person who did not go)',
          '背が 高くて、髪が 黒い 人 (a person who is tall and has black hair)',
          '親切で、きれいな 人 (a person who is kind and pretty)',
          '65歳の 人 (a person who is 65 years old)'
        ],
        examples: [
          { japanese: 'これは ミラーさんが 作った ケーキです。', hiragana: 'これは みらーさんが つくった けーきです。', romaji: 'Kore wa Miraa-san ga tsukutta keeki desu.', english: 'This is a cake Mr. Miller made.' },
          { japanese: 'あそこに いる 人は ミラーさんです。', hiragana: 'あそこに いる ひとは みらーさんです。', romaji: 'Asoko ni iru hito wa Miraa-san desu.', english: 'That man who is over there is Mr. Miller.' },
          { japanese: 'きのう 習った 言葉を 忘れました。', hiragana: 'きのう ならった ことばを わすれました。', romaji: 'Kinou naratta kotoba o wasuremashita.', english: 'I have forgotten the words I learned yesterday.' }
        ]
      },
      {
        id: 'l22_g2',
        lessonNumber: 22,
        title: '修飾節内の主語「が」 (Subject in Modifying Clause marked with が)',
        structure: '[Subject + が + Modifying Predicate] + Noun',
        explanation: 'When a sentence modifies a noun, the subject inside that subordinate modifying clause is indicated by the particle が, NEVER は.',
        rules: [
          'ミラーさんは ケーキを 作りました → これは [ミラーさんが 作った] ケーキです。',
          'カリナさんは 絵を かきました → わたしは [カリナさんが かいた] 絵が 好きです。'
        ],
        examples: [
          { japanese: 'これは ミラーさんが 作った ケーキです。', hiragana: 'これは みらーさんが つくった けーきです。', romaji: 'Kore wa Miraa-san ga tsukutta keeki desu.', english: 'This is the cake which Mr. Miller baked.' },
          { japanese: 'わたしは カリナさんが かいた 絵が 好きです。', hiragana: 'わたしは かりなさんが かいた えが すきです。', romaji: 'Watashi wa Karina-san ga kaita e ga suki desu.', english: 'I like the picture that Ms. Karina drew.' }
        ]
      },
      {
        id: 'l22_g3',
        lessonNumber: 22,
        title: 'V 辞書形 ＋ 時間／約束／用事 (Expressing Schedules & Commitments)',
        structure: 'Verb [辞書形] + [時間 / 約束 / 用事]',
        explanation: 'When expressing time for doing an action or having an appointment/errand to perform an action, attach the dictionary form of the verb directly before the noun.',
        rules: [
          '朝ごはんを 食べる 時間が ありません (I have no time to eat breakfast).',
          '友達と 映画を 見る 約束が あります (I have an appointment to see a movie with a friend).',
          '今日は 市役所へ 行く 用事が あります (I have something to do at the city hall today).'
        ],
        examples: [
          { japanese: 'わたしは 朝ごはんを 食べる 時間が ありません。', hiragana: 'わたしは あさごはんを たべる じかんが ありません。', romaji: 'Watashi wa asa-gohan o taberu jikan ga arimasen.', english: 'I have no time to eat breakfast.' },
          { japanese: 'わたしは 友達と 映画を 見る 約束が あります。', hiragana: 'わたしは ともだちと えいがを みる やくそくが あります。', romaji: 'Watashi wa tomodachi to eiga o miru yakusoku ga arimasu.', english: 'I have an arrangement to see a movie with a friend of mine.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l22_ex1',
        lessonNumber: 22,
        type: 'mcq',
        category: 'grammar',
        prompt: 'Which particle marks the subject inside a noun-modifying clause?',
        options: ['が', 'は', 'を', 'に'],
        correctAnswer: 'が',
        explanation: 'In relative clauses, the clause subject is marked with が (e.g., ミラーさんが 作った ケーキ).'
      },
      {
        id: 'l22_ex2',
        lessonNumber: 22,
        type: 'fill_blank',
        category: 'grammar',
        prompt: 'Fill in the blank: 映画を [ ? ] 約束が あります。 (I have a promise to watch a movie.)',
        options: ['見る', '見ます', '見て', '見たの'],
        correctAnswer: '見る',
        explanation: 'Nouns like 約束 and 時間 are modified by the verb in dictionary form (見る約束).'
      },
      {
        id: 'l22_ex3',
        lessonNumber: 22,
        type: 'mcq',
        category: 'vocabulary',
        prompt: 'Which verb is used for putting on shoes or pants (lower body attire)?',
        options: ['はきます', 'きます', 'かぶります', 'かけます'],
        correctAnswer: 'はきます',
        explanation: 'はきます is used for lower-body clothing (shoes, pants, skirts).'
      }
    ],
    dialogue: {
      title: 'どんなアパートがいいですか (What kind of apartment would you like?)',
      situation: 'Mr. Wang visits a real estate agent in Japan looking for a suitable apartment close to the station with Japanese features.',
      lines: [
        { speaker: '不動産屋', japanese: 'こちらは いかがですか。家賃は ８万円です。', hiragana: 'こちらは いかがですか。やちんは はちまんえんです。', english: 'How about this one? The rent is 80,000 yen.' },
        { speaker: 'ワン', japanese: 'うーん。駅から 遠いですね。', hiragana: 'うーん。えきから とおいですね。', english: "Ummm. It's far from the station." },
        { speaker: '不動産屋', japanese: 'じゃ、こちらは どうですか。駅から 歩いて ３分ですから、便利ですよ。', hiragana: 'じゃ、こちらは どうですか。えきから あるいて さんぷんですから、べんりですよ。', english: "Then how about this one? It's a three-minute walk from the station, so it's convenient." },
        { speaker: 'ワン', japanese: 'ダイニングキッチンと 和室ですね。すみません、これは 何ですか。', hiragana: 'だいにんぐきっちんと わしつですね。すみません、これは なんですか。', english: 'A kitchen-dining room and a Japanese-style room... Excuse me, what is this?' },
        { speaker: '不動産屋', japanese: '「押し入れ」です。布団を 入れる 所ですよ。', hiragana: '「おしいれ」です。ふとんを いれる ところですよ。', english: "It's an 'oshiire'. It's a place to put futons in." },
        { speaker: 'ワン', japanese: 'そうですか。今日 この アパートを 見ることが できますか。', hiragana: 'そうですか。きょう この あぱーとを みることが できますか。', english: 'I see. Can I take a look at this apartment today?' },
        { speaker: '不動産屋', japanese: 'ええ、今から 行きましょうか。', hiragana: 'ええ、いまから いきましょうか。', english: 'Yes. Shall we go now?' },
        { speaker: 'ワン', japanese: 'はい、お願いします。', hiragana: 'はい、おねがいします。', english: 'Yes, please.' }
      ]
    }
  },

  // =========================================================================
  // LESSON 23: Temporal When (〜とき), Natural Consequence (〜と), Road Directions
  // Textbook Reference: Pages 164–169
  // =========================================================================
  {
    id: 23,
    lessonNumber: 23,
    level: 'N5',
    title: 'Lesson 23: Temporal Clauses (〜とき), Inevitable Consequence (〜と) & Directions',
    titleJapanese: '第２３課：〜とき（辞書形・た形）・〜と（必然的結果）・移動の場所（〜を歩きます／渡ります）',
    theme: '図書館で本を借りるときカードが要ります、ボタンを押すとお釣りが出ます、交差点を右へ曲がります',
    description: 'Learn temporal clauses with 〜とき (distinguishing V-辞書形 とき from V-た とき), natural inevitable consequences with 〜と (if you push this, change comes out), and verbs of spatial motion with を (道を歩きます、橋を渡ります).',
    keyPhrases: [
      '図書館で 本を 借りる とき、カードが 要ります。 (When you borrow books from the library, you need a card.)',
      'この ボタンを 押す と、お釣りが 出ます。 (Push this button, and change will come out.)',
      'これを 回す と、音が 大きく なります。 (Turn this knob to the right, and the volume will go up.)',
      '交差点を 右へ 曲がる と、郵便局が あります。 (Turn to the right at the intersection, and you will find the post office.)',
      '道を 渡ります。 (Cross the road.)',
      '公園を 散歩します。 (Take a walk in the park.)'
    ],
    vocabulary: [
      { id: 'l23_v1', lessonNumber: 23, kanji: '聞きます I', hiragana: 'ききます', romaji: 'kikimasu', english: 'ask [the teacher]', partOfSpeech: 'verb-1', category: 'Verbs', notes: '[先生に〜] ask [the teacher]' },
      { id: 'l23_v2', lessonNumber: 23, kanji: '回します I', hiragana: 'まわします', romaji: 'mawashimasu', english: 'turn, rotate', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l23_v3', lessonNumber: 23, kanji: '引きます I', hiragana: 'ひきます', romaji: 'hikimasu', english: 'pull', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l23_v4', lessonNumber: 23, kanji: '変えます II', hiragana: 'かえます', romaji: 'kaemasu', english: 'change', partOfSpeech: 'verb-2', category: 'Verbs' },
      { id: 'l23_v5', lessonNumber: 23, kanji: '触ります I', hiragana: 'さわります', romaji: 'sawarimasu', english: 'touch [a door]', partOfSpeech: 'verb-1', category: 'Verbs', notes: '[ドアに〜] touch [a door]' },
      { id: 'l23_v6', lessonNumber: 23, kanji: '出ます II', hiragana: 'でます', romaji: 'demasu', english: '[change] come out', partOfSpeech: 'verb-2', category: 'Verbs', notes: '[お釣りが〜] [change] come out' },
      { id: 'l23_v7', lessonNumber: 23, kanji: '動きます I', hiragana: 'うごきます', romaji: 'ugokimasu', english: '[a watch] move, work', partOfSpeech: 'verb-1', category: 'Verbs', notes: '[時計が〜] [a watch] move, work' },
      { id: 'l23_v8', lessonNumber: 23, kanji: '歩きます I', hiragana: 'あるきます', romaji: 'arukimasu', english: 'walk [along a road]', partOfSpeech: 'verb-1', category: 'Verbs', notes: '[道を〜] walk [along a road]' },
      { id: 'l23_v9', lessonNumber: 23, kanji: '渡ります I', hiragana: 'わたります', romaji: 'watarimasu', english: 'cross [a bridge]', partOfSpeech: 'verb-1', category: 'Verbs', notes: '[橋を〜] cross [a bridge]' },
      { id: 'l23_v10', lessonNumber: 23, kanji: '気を つけます II', hiragana: 'きを つけます', romaji: 'ki o tsukemasu', english: 'pay attention [to cars], take care', partOfSpeech: 'verb-2', category: 'Verbs', notes: '[車に〜] pay attention [to cars]' },
      { id: 'l23_v11', lessonNumber: 23, kanji: '引っ越しします III', hiragana: 'ひっこしします', romaji: 'hikkoshishimasu', english: 'move (house)', partOfSpeech: 'verb-3', category: 'Verbs' },
      { id: 'l23_v12', lessonNumber: 23, kanji: '電気屋', hiragana: 'でんきや', romaji: 'denkiya', english: 'electric appliance shop, electrician', partOfSpeech: 'noun', category: 'Shops' },
      { id: 'l23_v13', lessonNumber: 23, kanji: '〜屋', hiragana: '〜や', romaji: '-ya', english: 'person of ~ shop, ~ store', partOfSpeech: 'phrase', category: 'Suffixes' },
      { id: 'l23_v14', lessonNumber: 23, kanji: 'サイズ', hiragana: 'さいず', romaji: 'saizu', english: 'size', partOfSpeech: 'noun', category: 'General' },
      { id: 'l23_v15', lessonNumber: 23, kanji: '音', hiragana: 'おと', romaji: 'oto', english: 'sound', partOfSpeech: 'noun', category: 'General' },
      { id: 'l23_v16', lessonNumber: 23, kanji: '機械', hiragana: 'きかい', romaji: 'kikai', english: 'machine', partOfSpeech: 'noun', category: 'Technology' },
      { id: 'l23_v17', lessonNumber: 23, kanji: 'つまみ', hiragana: 'つまみ', romaji: 'tsumami', english: 'knob', partOfSpeech: 'noun', category: 'Technology' },
      { id: 'l23_v18', lessonNumber: 23, kanji: '故障', hiragana: 'こしょう', romaji: 'koshou', english: 'breakdown (~を します: break down)', partOfSpeech: 'noun', category: 'Technology' },
      { id: 'l23_v19', lessonNumber: 23, kanji: '道', hiragana: 'みち', romaji: 'michi', english: 'road, way', partOfSpeech: 'noun', category: 'Traffic' },
      { id: 'l23_v20', lessonNumber: 23, kanji: '交差点', hiragana: 'こうさてん', romaji: 'kousaten', english: 'crossroad, intersection', partOfSpeech: 'noun', category: 'Traffic' },
      { id: 'l23_v21', lessonNumber: 23, kanji: '信号', hiragana: 'しんごう', romaji: 'shingou', english: 'traffic light', partOfSpeech: 'noun', category: 'Traffic' },
      { id: 'l23_v22', lessonNumber: 23, kanji: '角', hiragana: 'かど', romaji: 'kado', english: 'corner', partOfSpeech: 'noun', category: 'Traffic' },
      { id: 'l23_v23', lessonNumber: 23, kanji: '橋', hiragana: 'はし', romaji: 'hashi', english: 'bridge', partOfSpeech: 'noun', category: 'Traffic' },
      { id: 'l23_v24', lessonNumber: 23, kanji: '駐車場', hiragana: 'ちゅうしゃじょう', romaji: 'chuushajou', english: 'parking lot, car park', partOfSpeech: 'noun', category: 'Traffic' },
      { id: 'l23_v25', lessonNumber: 23, kanji: '〜目', hiragana: '〜め', romaji: '-me', english: 'the -th (indicating order, e.g. ２つ目)', partOfSpeech: 'suffix', category: 'Numbers' },
      { id: 'l23_v26', lessonNumber: 23, kanji: '[お]正月', hiragana: '[お]しょうがつ', romaji: '[o]shougatsu', english: "New Year's Day", partOfSpeech: 'noun', category: 'Culture' },
      { id: 'l23_v27', lessonNumber: 23, kanji: 'ごちそうさま [でした]。', hiragana: 'ごちそうさま [でした]。', romaji: 'Gochisousama [deshita].', english: 'That was delicious. (said after eating/drinking)', partOfSpeech: 'phrase', category: 'Greetings' },
      { id: 'l23_v28', lessonNumber: 23, kanji: '建物', hiragana: 'たてもの', romaji: 'tatemono', english: 'building', partOfSpeech: 'noun', category: 'Town' },
      { id: 'l23_v29', lessonNumber: 23, kanji: '外国人登録証', hiragana: 'がいこくじんとうろくしょう', romaji: 'gaikokujin tourokushou', english: 'alien registration card', partOfSpeech: 'noun', category: 'Official' }
    ],
    grammar: [
      {
        id: 'l23_g1',
        lessonNumber: 23,
        title: '〜とき (When... Temporal Clauses)',
        structure: '[V 辞書形 / V ない / い-adj / な-adj な / N の] + とき、〜',
        explanation: 'とき connects two sentences and expresses the time when the situation described in the main sentence exists or occurs.',
        rules: [
          'Verbs: 図書館で 本を 借りる とき、カードが 要ります (When you borrow books, you need a card).',
          'Verbs negative: 使い方が わからない とき、聞いて ください (When you don\'t know how to use it, ask me).',
          'い-adj: 体の 調子が 悪い とき、病院へ 行きます (When not feeling well, go to hospital).',
          'な-adj: 暇な とき、遊びに 来て ください (When you are free, come and visit).',
          'Noun: 妻が 病気の とき、会社を 休みます (When my wife is sick, I take a day off work).'
        ],
        examples: [
          { japanese: '図書館で 本を 借りる とき、カードが 要ります。', hiragana: 'としょかんで ほんを かりる とき、かーどが いります。', romaji: 'Toshokan de hon o kariru toki, kaado ga irimasu.', english: 'When you borrow books from the library, you need a card.' },
          { japanese: '暇な とき、うちへ 遊びに 来ませんか。', hiragana: 'ひまな とき、うちへ あそびに きませんか。', romaji: 'Hima na toki, uchi e asobi ni kimasen ka.', english: 'Won\'t you come to my place when you are free?' }
        ]
      },
      {
        id: 'l23_g2',
        lessonNumber: 23,
        title: 'V 辞書形 とき vs. V た-form とき (Aspectual Difference)',
        structure: 'V 辞書形 とき (Before completion) vs. V た とき (After completion)',
        explanation: 'When the dictionary form of the verb precedes とき, the action of that verb has not yet completed at the time of the main action. When the た-form precedes とき, the action was already completed.',
        rules: [
          '国へ 帰る とき、かばんを 買いました: Bought the bag before or during the journey home (in Japan or on the plane).',
          '国へ 帰った とき、かばんを 買いました: Bought the bag after having completed the journey home (back in the home country).'
        ],
        examples: [
          { japanese: '国へ 帰る とき、かばんを 買いました。', hiragana: 'くにへ かえる とき、かばんを かいました。', romaji: 'Kuni e kaeru toki, kaban o kaimashita.', english: 'I bought a bag when I was going back to my country (on the way).' },
          { japanese: '国へ 帰った とき、かばんを 買いました。', hiragana: 'くにへ かえった とき、かばんを かいました。', romaji: 'Kuni e kaetta toki, kaban o kaimashita.', english: 'I bought a bag when I went back to my country (after arriving).' }
        ]
      },
      {
        id: 'l23_g3',
        lessonNumber: 23,
        title: 'V 辞書形 ＋ と、〜 (Natural / Inevitable Consequence)',
        structure: 'Verb [辞書形] + と、〜',
        explanation: 'When expressing the situation where, as an inevitable result of a certain action, another action or natural event always happens, と connects the sentences.',
        rules: [
          'この ボタンを 押す と、お釣りが 出ます (Press this button, and the change will come out).',
          'これを 回す と、音が 大きく なります (Turn this, and the volume will increase).',
          'Note: Sentences expressing personal will, hope, invitation, or request cannot be placed after 〜と (use 〜たら instead in Lesson 25).'
        ],
        examples: [
          { japanese: 'この ボタンを 押す と、お釣りが 出ます。', hiragana: 'この ぼたんを おす と、おつりが でます。', romaji: 'Kono botan o osu to, otsuri ga demasu.', english: 'Press this button, and change will come out.' },
          { japanese: 'これを 回す と、音が 大きく なります。', hiragana: 'これを まわす と、おとが おおきく なります。', romaji: 'Kore o mawasu to, oto ga ookiku narimasu.', english: 'Turn this knob, and the volume will go up.' }
        ]
      },
      {
        id: 'l23_g4',
        lessonNumber: 23,
        title: 'N (place) を 動詞 (Movement Through / Across Space)',
        structure: 'Place + を + [歩きます / 渡ります / 散歩します / 曲がります]',
        explanation: 'Particle を is used to denote the space through which or across which a person or vehicle moves.',
        rules: [
          '公園を 散歩します (Walk through the park).',
          '道を 渡ります (Cross the road).',
          '交差点を 右へ 曲がります (Turn right at the intersection).'
        ],
        examples: [
          { japanese: '公園を 散歩します。', hiragana: 'こうえんを さんぽします。', romaji: 'Kouen o sanposhimasu.', english: 'I take a walk in the park.' },
          { japanese: '交差点を 右へ 曲がります。', hiragana: 'こうさてんを みぎへ まがります。', romaji: 'Kousaten o migi e magarimasu.', english: 'I turn right at the intersection.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l23_ex1',
        lessonNumber: 23,
        type: 'mcq',
        category: 'grammar',
        prompt: 'Which sentence indicates you bought a souvenir AFTER arriving back in your home country?',
        options: [
          '国へ 帰った とき、お土産を 買いました。',
          '国へ 帰る とき、お土産を 買いました。',
          '国へ 帰ると、お土産を 買いました。',
          '国へ 帰れば、お土産を 買いました。'
        ],
        correctAnswer: '国へ 帰った とき、お土産を 買いました。',
        explanation: 'V-たとき indicates that the action of returning was already completed before buying.'
      },
      {
        id: 'l23_ex2',
        lessonNumber: 23,
        type: 'fill_blank',
        category: 'grammar',
        prompt: 'Fill in the blank: あの 橋 [ ? ] 渡って ください。 (Please cross that bridge.)',
        options: ['を', 'に', 'で', 'へ'],
        correctAnswer: 'を',
        explanation: 'Verbs of motion through or across space take particle を (橋を渡ります).'
      },
      {
        id: 'l23_ex3',
        lessonNumber: 23,
        type: 'mcq',
        category: 'grammar',
        prompt: 'What kind of consequence does "V 辞書形 + と" indicate?',
        options: [
          'An inevitable or natural result',
          'A personal wish or hope',
          'A polite request to the listener',
          'An obligation to superiors'
        ],
        correctAnswer: 'An inevitable or natural result',
        explanation: '〜と expresses automatic, mechanical, or natural inevitable results.'
      }
    ],
    dialogue: {
      title: 'どうやって行きますか (How can I get there?)',
      situation: 'Ms. Karina calls Midori Library to ask for directions and borrowing requirements.',
      lines: [
        { speaker: '図書館員', japanese: 'はい、みどり図書館です。', hiragana: 'はい、みどりとしょかんです。', english: 'Hello. This is Midori Library.' },
        { speaker: 'カリナ', japanese: 'あのう、そちらまで どうやって 行きますか。', hiragana: 'あのう、そちらまで どうやって いきますか。', english: 'Er, could you tell me how to get there?' },
        { speaker: '図書館員', japanese: '本田駅から 12番の バスに 乗って、図書館前で 降りて ください。３つ目ですよ。', hiragana: 'ほんだえきから じゅうにばんの ばすに のって、としょかんまえで おりて ください。みっつめですよ。', english: 'Take a No. 12 bus from Honda Station, and get off at Toshokan-mae. It is the third stop.' },
        { speaker: 'カリナ', japanese: '３つ目ですね。', hiragana: 'みっつめですね。', english: 'The third stop, right?' },
        { speaker: '図書館員', japanese: 'ええ。バスを 降りると、前に 公園が あります。図書館は その 公園の中の 白い 建物です。', hiragana: 'ええ。ばすを おりると、まえに こうえんが あります。としょかんは その こうえんのなかの しろい たてものです。', english: 'Yes. When you get off the bus, you will see a park in front of you. Our library is the white building in the park.' },
        { speaker: 'カリナ', japanese: 'わかりました。本を 借りる とき、何か 要りますか。', hiragana: 'わかりました。ほんを かりる とき、なにか いりますか。', english: 'I see. Is anything required when I borrow books?' },
        { speaker: '図書館員', japanese: '外国のかたですか。じゃ、外国人登録証を 持って 来て ください。', hiragana: 'がいこくのかたですか。じゃ、がいこくじんとうろくしょうを もって きて ください。', english: 'Are you a foreigner? Then, please bring your alien registration card.' },
        { speaker: 'カリナ', japanese: 'はい、わかりました。ありがとう ございました。', hiragana: 'はい、わかりました。ありがとう ございました。', english: 'Yes, I will. Thank you very much.' }
      ]
    }
  },

  // =========================================================================
  // LESSON 24: Giving and Receiving Favors (〜てあげる／もらう／くれる)
  // Textbook Reference: Pages 170–175
  // =========================================================================
  {
    id: 24,
    lessonNumber: 24,
    level: 'N5',
    title: 'Lesson 24: Giving & Receiving of Favors (〜てあげる・〜てもらう・〜てくれる)',
    titleJapanese: '第２４課：授受動詞（くれます）・授受の補助動詞（〜てあげます・〜てもらいます・〜てくれます）',
    theme: '佐藤さんはわたしにクリスマスカードをくれました、木村さんに本を貸してあげました、母はセーターを送ってくれました',
    description: 'Learn the verb くれます (giving to the speaker), and master the benefactive auxiliary verbs of Japanese: 〜てあげます (doing a favor for someone), 〜てもらいます (receiving a favor), and 〜てくれます (someone doing a favor for me with gratitude).',
    keyPhrases: [
      '佐藤さんは わたしに クリスマスカードを くれました。 (Ms. Sato gave me a Christmas card.)',
      'わたしは 木村さんに 本を 貸して あげました。 (I lent Ms. Kimura a book.)',
      'わたしは 山田さんに 図書館の 電話番号を 教えて もらいました。 (I was told the telephone number of the library by Mr. Yamada.)',
      '母は [わたしに] セーターを 送って くれました。 (My mother sent me a sweater.)',
      'すてきな ネクタイですね。…ええ、佐藤さんが くれました。 (That\'s a nice tie. ...Yes, Ms. Sato gave it to me.)',
      'だれが 手伝いに 行きますか。…カリナさんが 行きます。 (Who will go to give him a hand? ...Ms. Karina will.)'
    ],
    vocabulary: [
      { id: 'l24_v1', lessonNumber: 24, kanji: 'くれます II', hiragana: 'くれます', romaji: 'kuremasu', english: 'give (me / my family)', partOfSpeech: 'verb-2', category: 'Verbs' },
      { id: 'l24_v2', lessonNumber: 24, kanji: '連れて 行きます I', hiragana: 'つれて いきます', romaji: 'tsurete ikimasu', english: 'take (someone along)', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l24_v3', lessonNumber: 24, kanji: '連れて 来ます III', hiragana: 'つれて きます', romaji: 'tsurete kimasu', english: 'bring (someone along)', partOfSpeech: 'verb-3', category: 'Verbs' },
      { id: 'l24_v4', lessonNumber: 24, kanji: '送ります I', hiragana: 'おくります', romaji: 'okurimasu', english: 'escort [someone], go with, see off', partOfSpeech: 'verb-1', category: 'Verbs', notes: '[人を〜] escort [someone]' },
      { id: 'l24_v5', lessonNumber: 24, kanji: '紹介します III', hiragana: 'しょうかいします', romaji: 'shoukaishimasu', english: 'introduce', partOfSpeech: 'verb-3', category: 'Verbs' },
      { id: 'l24_v6', lessonNumber: 24, kanji: '案内します III', hiragana: 'あんないします', romaji: 'annaishimasu', english: 'show around, show the way, guide', partOfSpeech: 'verb-3', category: 'Verbs' },
      { id: 'l24_v7', lessonNumber: 24, kanji: '説明します III', hiragana: 'せつめいします', romaji: 'setsumeishimasu', english: 'explain', partOfSpeech: 'verb-3', category: 'Verbs' },
      { id: 'l24_v8', lessonNumber: 24, kanji: 'いれます II', hiragana: 'いれます', romaji: 'iremasu', english: 'make [coffee]', partOfSpeech: 'verb-2', category: 'Verbs', notes: '[コーヒーを〜] make [coffee]' },
      { id: 'l24_v9', lessonNumber: 24, kanji: 'おじいさん / おじいちゃん', hiragana: 'おじいさん / おじいちゃん', romaji: 'ojiisan / ojiichan', english: 'grandfather, old man', partOfSpeech: 'noun', category: 'Family' },
      { id: 'l24_v10', lessonNumber: 24, kanji: 'おばあさん / おばあちゃん', hiragana: 'おばあさん / おばあちゃん', romaji: 'obaasan / obaachan', english: 'grandmother, old woman', partOfSpeech: 'noun', category: 'Family' },
      { id: 'l24_v11', lessonNumber: 24, kanji: '準備', hiragana: 'じゅんび', romaji: 'junbi', english: 'preparation (~を します: prepare)', partOfSpeech: 'noun', category: 'General' },
      { id: 'l24_v12', lessonNumber: 24, kanji: '意味', hiragana: 'いみ', romaji: 'imi', english: 'meaning', partOfSpeech: 'noun', category: 'General' },
      { id: 'l24_v13', lessonNumber: 24, kanji: '[お]菓子', hiragana: '[お]かし', romaji: '[o]kashi', english: 'sweets, snacks', partOfSpeech: 'noun', category: 'Food' },
      { id: 'l24_v14', lessonNumber: 24, kanji: '全部', hiragana: 'ぜんぶ', romaji: 'zenbu', english: 'all', partOfSpeech: 'noun', category: 'Quantities' },
      { id: 'l24_v15', lessonNumber: 24, kanji: '自分で', hiragana: 'じぶんで', romaji: 'jibun de', english: 'by oneself', partOfSpeech: 'adverb', category: 'Manner' },
      { id: 'l24_v16', lessonNumber: 24, kanji: 'ほかに', hiragana: 'ほかに', romaji: 'hoka ni', english: 'besides, in addition', partOfSpeech: 'adverb', category: 'Conversations' },
      { id: 'l24_v17', lessonNumber: 24, kanji: 'ワゴン車', hiragana: 'わごんしゃ', romaji: 'wagonsha', english: 'station wagon, van', partOfSpeech: 'noun', category: 'Vehicles' },
      { id: 'l24_v18', lessonNumber: 24, kanji: '[お]弁当', hiragana: '[お]べんとう', romaji: '[o]bentou', english: 'box lunch', partOfSpeech: 'noun', category: 'Food' },
      { id: 'l24_v19', lessonNumber: 24, kanji: '母の日', hiragana: 'ははのひ', romaji: 'Haha no Hi', english: "Mother's Day", partOfSpeech: 'noun', category: 'Events' }
    ],
    grammar: [
      {
        id: 'l24_g1',
        lessonNumber: 24,
        title: 'くれます (Giving to Me or In-Group)',
        structure: 'Giver + は + わたしに + Object + を + くれます',
        explanation: 'In Lesson 7 you learned あげます ("give"). But when somebody else gives something to the speaker or to the speaker\'s in-group family, くれます must be used instead.',
        rules: [
          'わたしは 佐藤さんに 花を あげました (I gave flowers to Ms. Sato).',
          '佐藤さんは わたしに クリスマスカードを くれました (Ms. Sato gave me a Christmas card. NEVER あげました!).',
          '佐藤さんは 妹に お菓子を くれました (Ms. Sato gave my younger sister candies).'
        ],
        examples: [
          { japanese: '佐藤さんは わたしに クリスマスカードを くれました。', hiragana: 'さとうさんは わたしに くりすますかーどを くれました。', romaji: 'Satou-san wa watashi ni Kurisumasu kaado o kuremashita.', english: 'Ms. Sato gave me a Christmas card.' },
          { japanese: '佐藤さんは 妹に お菓子を くれました。', hiragana: 'さとうさんは いもうとに おかしを くれました。', romaji: 'Satou-san wa imouto ni okashi o kuremashita.', english: 'Ms. Sato gave candies to my younger sister.' }
        ]
      },
      {
        id: 'l24_g2',
        lessonNumber: 24,
        title: 'V て-form あげます / もらいます / くれます (Giving & Receiving Favors)',
        structure: 'V て-form + あげます / もらいます / くれます',
        explanation: 'Used to refer to giving and receiving of actions (favors). They indicate who is doing the act for whom, conveying feelings of goodwill and gratitude.',
        rules: [
          'V て-form あげます: Speaker does a favor for someone (わたしは 木村さんに 本を 貸して あげました). Avoid using directly to superiors to prevent sounding patronizing.',
          'V て-form もらいます: Subject receives a favor with gratitude (わたしは 山田さんに 図書館の 電話番号を 教えて もらいました).',
          'V て-form くれます: Another person voluntarily does a favor for the speaker/in-group (母は セーターを 送って くれました).'
        ],
        examples: [
          { japanese: 'わたしは 木村さんに 本を 貸して あげました。', hiragana: 'わたしは きむらさんに ほんを かして あげました。', romaji: 'Watashi wa Kimura-san ni hon o kashite agemashita.', english: 'I lent Ms. Kimura a book.' },
          { japanese: 'わたしは 山田さんに 図書館の 電話番号を 教えて もらいました。', hiragana: 'わたしは やまださんに としょかんの でんわばんごうを おしえて もらいました。', romaji: 'Watashi wa Yamada-san ni toshokan no denwa-bangou o oshiete moraimashita.', english: 'Mr. Yamada told me the telephone number of the library.' },
          { japanese: '母は セーターを 送って くれました。', hiragana: 'ははは せーたーを おくって くれました。', romaji: 'Haha wa seetaa o okutte kuremashita.', english: 'My mother sent me a sweater.' }
        ]
      },
      {
        id: 'l24_g3',
        lessonNumber: 24,
        title: 'N (person) が V / 疑問詞 が V (Who Performed the Favor)',
        structure: 'Person / Interrogative + が + Verb',
        explanation: 'When the subject is the new information or questioned in giving/receiving sentences, it is marked by particle が.',
        rules: [
          'すてきな ネクタイですね。…ええ、佐藤さんが くれました (That\'s a nice tie. ...Yes, Ms. Sato gave it to me).',
          'だれが 手伝いに 行きますか。…カリナさんが 行きます (Who will go to give him a hand? ...Ms. Karina will).'
        ],
        examples: [
          { japanese: 'すてきな ネクタイですね。…ええ、佐藤さんが くれました。', hiragana: 'すてきな ねくたいですね。…ええ、さとうさんが くれました。', romaji: 'Suteki na nekutai desu ne. ...Ee, Satou-san ga kuremashita.', english: "That's a nice tie, isn't it? ...Yes. Ms. Sato gave it to me." },
          { japanese: 'だれが 手伝いに 行きますか。…カリナさんが 行きます。', hiragana: 'だれが てつだいに いきますか。…かりなさんが いきます。', romaji: 'Dare ga tetsudai ni ikimasu ka. ...Karina-san ga ikimasu.', english: 'Who will go to give him a hand? ...Ms. Karina will.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l24_ex1',
        lessonNumber: 24,
        type: 'mcq',
        category: 'grammar',
        prompt: 'Which sentence correctly says "Mr. Miller lent me an umbrella"?',
        options: [
          'ミラーさんは わたしに 傘を 貸して くれました。',
          'ミラーさんは わたしに 傘を 貸して あげました。',
          'わたしは ミラーさんに 傘を 貸して くれました。',
          'ミラーさんは わたしに 傘を 借りました。'
        ],
        correctAnswer: 'ミラーさんは わたしに 傘を 貸して くれました。',
        explanation: 'When someone else does a favor for the speaker, use 〜て くれました.'
      },
      {
        id: 'l24_ex2',
        lessonNumber: 24,
        type: 'fill_blank',
        category: 'grammar',
        prompt: 'Fill in the blank: わたしは 田中さんに 英語を 教えて [ ? ]。 (I received the favor of English teaching from Mr. Tanaka.)',
        options: ['もらいました', 'あげました', 'くれました', 'やりました'],
        correctAnswer: 'もらいました',
        explanation: 'With the receiver as the topic "わたしは 〜に", use 〜て もらいました.'
      },
      {
        id: 'l24_ex3',
        lessonNumber: 24,
        type: 'mcq',
        category: 'grammar',
        prompt: 'Why is "佐藤さんは わたしに プレゼントを あげました" incorrect?',
        options: [
          'Because when someone gives something to the speaker, くれます must be used instead of あげます.',
          'Because プレゼント requires the particle に.',
          'Because 佐藤さん must be marked by を.',
          'Because あげました is only used for food.'
        ],
        correctAnswer: 'Because when someone gives something to the speaker, くれます must be used instead of あげます.',
        explanation: 'あげます cannot be used when the receiver is the speaker (わたし) or their in-group; use くれます.'
      }
    ],
    dialogue: {
      title: '手伝いに 行きましょうか (Will you help me?)',
      situation: 'Ms. Karina offers to help Mr. Wang move to a new apartment tomorrow, and arranges transport with Mr. Yamada.',
      lines: [
        { speaker: 'カリナ', japanese: 'ワンさん、あした 引っ越しですね。手伝いに 行きましょうか。', hiragana: 'わんさん、あした ひっこしですね。てつだいに いきましょうか。', english: "Mr. Wang, you are moving tomorrow, aren't you? Shall I come to help you?" },
        { speaker: 'ワン', japanese: 'ありがとうございます。じゃ、９時ごろ お願いできますか。', hiragana: 'ありがとうございます。じゃ、くじごろ おねがいできますか。', english: 'Thank you. Well, then, will you come around 9 o\'clock?' },
        { speaker: 'カリナ', japanese: 'ほかに だれが 手伝いに 来ますか。', hiragana: 'ほかに だれが てつだいに きますか。', english: 'Who else will come to help you?' },
        { speaker: 'ワン', japanese: '山田さんと ミラーさんが 来て くれます。', hiragana: 'やまださんと みらーさんが きて くれます。', english: 'Mr. Yamada and Mr. Miller are coming to help.' },
        { speaker: 'カリナ', japanese: '車は？', hiragana: 'くるまは？', english: 'What about a car?' },
        { speaker: 'ワン', japanese: '山田さんが ワゴン車を 貸して くれます。', hiragana: 'やまださんが わごんしゃを かして くれます。', english: 'Mr. Yamada will lend me his station wagon.' },
        { speaker: 'カリナ', japanese: '昼ごはんは どう しますか。', hiragana: 'ひるごはんは どう しますか。', english: 'What about lunch?' },
        { speaker: 'ワン', japanese: 'ええと……。', hiragana: 'ええと……。', english: 'Well...' },
        { speaker: 'カリナ', japanese: 'じゃ、わたしが お弁当を 持って 行きましょうか。', hiragana: 'じゃ、わたしが おべんとうを もって いきましょうか。', english: 'Shall I bring lunch box for everyone?' },
        { speaker: 'ワン', japanese: 'すみません。お願いします。', hiragana: 'すみません。おねがいします。', english: 'Thank you. Please do.' },
        { speaker: 'カリナ', japanese: 'じゃ、また あした。', hiragana: 'じゃ、また あした。', english: 'Then see you tomorrow.' }
      ]
    }
  },

  // =========================================================================
  // LESSON 25: Conditionals (〜たら), Concessives (〜ても), もし & いくら
  // Textbook Reference: Pages 176–181
  // =========================================================================
  {
    id: 25,
    lessonNumber: 25,
    level: 'N5',
    title: 'Lesson 25: Conditionals (〜たら), Concessives (〜ても) & Life Milestones',
    titleJapanese: '第２５課：仮定・確定条件（〜たら）・逆接条件（〜ても）・もし・いくら',
    theme: '雨が降ったら出かけません、１億円あったら旅行したいです、雨が降っても洗濯します',
    description: 'Learn the primary Japanese conditional 〜たら (if / when), understand certainty timing with V-たら (when/after), express concessive conditions with 〜ても (even if), strengthen suppositions with もし and degrees with いくら.',
    keyPhrases: [
      '雨が 降ったら、出かけません。 (If it rains, I will not go out.)',
      '雨が 降っても、出かけます。 (Even if it rains, I will go out.)',
      'もし １億円 あったら、いろいろな 国を 旅行したいです。 (If I had 100 million yen, I would want to travel to various countries.)',
      'いくら 考えても、わかりません。 (No matter how much I think, I can\'t understand this.)',
      '10時に なったら、出かけましょう。 (Let\'s go out when it gets to ten.)',
      'いろいろ お世話に なりました。 (Thank you for everything you have done for me.)'
    ],
    vocabulary: [
      { id: 'l25_v1', lessonNumber: 25, kanji: '考えます II', hiragana: 'かんがえます', romaji: 'kangaemasu', english: 'think, consider', partOfSpeech: 'verb-2', category: 'Verbs' },
      { id: 'l25_v2', lessonNumber: 25, kanji: '着きます I', hiragana: 'つきます', romaji: 'tsukimasu', english: 'arrive [at the station]', partOfSpeech: 'verb-1', category: 'Verbs', notes: '[駅に〜] arrive [at the station]' },
      { id: 'l25_v3', lessonNumber: 25, kanji: '留学します III', hiragana: 'りゅうがくします', romaji: 'ryuugakushimasu', english: 'study abroad', partOfSpeech: 'verb-3', category: 'Verbs' },
      { id: 'l25_v4', lessonNumber: 25, kanji: '取ります I', hiragana: 'とります', romaji: 'torimasu', english: 'grow old [get older]', partOfSpeech: 'verb-1', category: 'Verbs', notes: '[年を〜] grow old' },
      { id: 'l25_v5', lessonNumber: 25, kanji: '田舎', hiragana: 'いなか', romaji: 'inaka', english: 'countryside, hometown', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l25_v6', lessonNumber: 25, kanji: '大使館', hiragana: 'たいしかん', romaji: 'taishikan', english: 'embassy', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l25_v7', lessonNumber: 25, kanji: 'グループ', hiragana: 'ぐるーぷ', romaji: 'guruupu', english: 'group', partOfSpeech: 'noun', category: 'General' },
      { id: 'l25_v8', lessonNumber: 25, kanji: 'チャンス', hiragana: 'ちゃんす', romaji: 'chansu', english: 'chance, opportunity', partOfSpeech: 'noun', category: 'General' },
      { id: 'l25_v9', lessonNumber: 25, kanji: '億', hiragana: 'おく', romaji: 'oku', english: 'hundred million (100,000,000)', partOfSpeech: 'counter', category: 'Numbers' },
      { id: 'l25_v10', lessonNumber: 25, kanji: 'もし [〜たら]', hiragana: 'もし [〜たら]', romaji: 'moshi [~tara]', english: 'if ~ (hypothetical emphasis)', partOfSpeech: 'adverb', category: 'Conjunctions' },
      { id: 'l25_v11', lessonNumber: 25, kanji: 'いくら [〜ても]', hiragana: 'いくら [〜ても]', romaji: 'ikura [~temo]', english: 'however ~, even if ~ (degree emphasis)', partOfSpeech: 'adverb', category: 'Conjunctions' },
      { id: 'l25_v12', lessonNumber: 25, kanji: '転勤', hiragana: 'てんきん', romaji: 'tenkin', english: 'job transfer (~を します: be transferred to another office)', partOfSpeech: 'noun', category: 'Work' },
      { id: 'l25_v13', lessonNumber: 25, kanji: 'こと', hiragana: 'こと', romaji: 'koto', english: 'thing, matter (~の こと: thing about ~)', partOfSpeech: 'noun', category: 'General' },
      { id: 'l25_v14', lessonNumber: 25, kanji: '一杯 飲みましょう。', hiragana: 'いっぱい のみましょう。', romaji: 'Ippai nomimashou.', english: "Let's have a drink together.", partOfSpeech: 'phrase', category: 'Conversations' },
      { id: 'l25_v15', lessonNumber: 25, kanji: '[いろいろ] お世話に なりました。', hiragana: '[いろいろ] おせわに なりました。', romaji: '[Iroiro] osewa ni narimashita.', english: 'Thank you for everything you have done for me.', partOfSpeech: 'phrase', category: 'Greetings' },
      { id: 'l25_v16', lessonNumber: 25, kanji: '頑張ります I', hiragana: 'がんばります', romaji: 'ganbarimasu', english: "do one's best", partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l25_v17', lessonNumber: 25, kanji: 'どうぞ お元気で。', hiragana: 'どうぞ おげんきで。', romaji: 'Douzo ogenki de.', english: 'Best of luck. (parting wish for long separation)', partOfSpeech: 'phrase', category: 'Greetings' }
    ],
    grammar: [
      {
        id: 'l25_g1',
        lessonNumber: 25,
        title: '普通形過去 ＋ ら、〜 (Conditional: If...)',
        structure: '[Plain Past Form (た-form / 〜かった / 〜だった)] + ら、〜',
        explanation: 'When ら is attached to the past tense plain form of verbs, adjectives, or nouns, it changes the preceding clause into a conditional expression ("if...").',
        rules: [
          'Verbs: お金が あったら、旅行します (If I had money, I would travel).',
          'Verbs negative: 時間が なかったら、テレビを 見ません (If I don\'t have time, I don\'t watch TV).',
          'い-adj: 安かったら、パソコンを 買いたいです (If it is inexpensive, I want to buy a computer).',
          'な-adj: 暇だったら、手伝って ください (If you are free, please lend me a hand).',
          'Noun: いい 天気だったら、散歩しませんか (If the weather is fine, won\'t you take a walk?).'
        ],
        examples: [
          { japanese: 'お金が あったら、旅行します。', hiragana: 'おかねが あったら、りょこうします。', romaji: 'Okane ga attara, ryokoushimasu.', english: 'If I had money, I would travel.' },
          { japanese: '安かったら、パソコンを 買いたいです。', hiragana: 'やすかったら、ぱそこんを かいたいです。', romaji: 'Yasukattara, pasokon o kaitai desu.', english: 'If it is inexpensive, I want to buy a personal computer.' },
          { japanese: '暇だったら、手伝って ください。', hiragana: 'ひまだったら、てつだって ください。', romaji: 'Hima dattara, tetsudatte kudasai.', english: 'If you are free, please give me a hand.' }
        ]
      },
      {
        id: 'l25_g2',
        lessonNumber: 25,
        title: 'V た-form ら、〜 (When / Once... Definite Future Condition)',
        structure: 'Verb [た-form] + ら、〜',
        explanation: 'When applied to an event that is certain to happen in the future, 〜たら means "when" or "after". The main clause is in non-past tense.',
        rules: [
          '10時に なったら、出かけましょう (Let\'s go out when it gets to ten o\'clock).',
          'うちへ 帰ったら、すぐ シャワーを 浴びます (I take a shower soon after I return home).'
        ],
        examples: [
          { japanese: '10時に なったら、出かけましょう。', hiragana: 'じゅうじに なったら、でかけましょう。', romaji: 'Juu-ji ni nattara, dekakemashou.', english: "Let's go out when it gets to ten." },
          { japanese: 'うちへ 帰ったら、すぐ シャワーを 浴びます。', hiragana: 'うちへ かえったら、すぐ しゃわーを あびます。', romaji: 'Uchi e kaettara, sugu shawaa o abimasu.', english: 'I take a shower soon after I return home.' }
        ]
      },
      {
        id: 'l25_g3',
        lessonNumber: 25,
        title: 'V て-form / い-adj 〜くて / な-adj で / N で ＋ も、〜 (Concessive: Even if...)',
        structure: '[て-form / 〜くて / 〜で] + も、〜',
        explanation: 'Used to present a reverse condition ("even if..."). Contrary to what is expected naturally under the condition, the action is still taken or the result remains unchanged.',
        rules: [
          '雨が 降っても、洗濯します (Even if it rains, I will do laundry).',
          '安くても、わたしは グループ旅行が 嫌いです (Even if group tours are inexpensive, I don\'t like them).',
          '便利でも、パソコンを 使いません (Even if a PC is useful, I won\'t use it).',
          '日曜日でも、働きます (Even if it is Sunday, I work).'
        ],
        examples: [
          { japanese: '雨が 降っても、洗濯します。', hiragana: 'あめが ふっても、せんたくします。', romaji: 'Ame ga futtemo, sentakushimasu.', english: 'Even if it rains, I\'ll do the laundry.' },
          { japanese: '安くても、わたしは グループ旅行が 嫌いです。', hiragana: 'やすくても、わたしは ぐるーぷりょこうが きらいです。', romaji: 'Yasukutemo, watashi wa guruupu ryokou ga kirai desu.', english: 'Even if group tours are inexpensive, I don\'t like them.' }
        ]
      },
      {
        id: 'l25_g4',
        lessonNumber: 25,
        title: 'もし ＋ 〜たら / いくら ＋ 〜ても (Emphasis of Supposition & Degree)',
        structure: 'もし + [...たら] | いくら + [...ても]',
        explanation: 'もし signals beforehand that a conditional clause is coming and emphasizes hypothetical supposition. いくら is paired with 〜ても to emphasize the degree ("no matter how much...").',
        rules: [
          'もし １億円 あったら、いろいろな 国を 旅行したいです (If I had 100 million yen, I would want to travel to various countries).',
          'いくら 考えても、わかりません (No matter how much I think, I can\'t understand it).'
        ],
        examples: [
          { japanese: 'もし １億円 あったら、いろいろな 国を 旅行したいです。', hiragana: 'もし いちおくえん あったら、いろいろな くにを りょこうしたいです。', romaji: 'Moshi ichi-oku-en attara, iroiro na kuni o ryokoushitai desu.', english: 'If I had 100 million yen, I would want to travel in various countries.' },
          { japanese: 'いくら 考えても、わかりません。', hiragana: 'いくら かんがえても、わかりません。', romaji: 'Ikura kangaetemo, wakarimasen.', english: 'No matter how much I think, I can\'t understand this.' }
        ]
      },
      {
        id: 'l25_g5',
        lessonNumber: 25,
        title: '従属節の主語「が」 (Subject in Subordinate Clauses Marked by が)',
        structure: 'Subject + が + [〜たら / 〜ても / 〜とき / 〜まえに / 〜から]',
        explanation: 'The subject in all Japanese subordinate clauses (using たら, ても, とき, まえに, から) is always marked by が, never は.',
        rules: [
          '友達が 来る まえに、部屋を 掃除します (Before my friend comes, I clean the room).',
          '妻が 病気の とき、会社を 休みます (When my wife is sick, I take off work).',
          '友達が 約束の 時間に 来なかったら、どう しますか (If your friend doesn\'t come on time, what will you do?).'
        ],
        examples: [
          { japanese: '友達が 約束の 時間に 来なかったら、どう しますか。', hiragana: 'ともだちが やくそくの じかんに こなかったら、どう しますか。', romaji: 'Tomodachi ga yakusoku no jikan ni konakattara, dou shimasu ka.', english: "If your friend doesn't come on time, what will you do?" }
        ]
      }
    ],
    exercises: [
      {
        id: 'l25_ex1',
        lessonNumber: 25,
        type: 'mcq',
        category: 'grammar',
        prompt: 'Which sentence correctly means "Even if it is Sunday, I work"?',
        options: [
          '日曜日でも、働きます。',
          '日曜日ても、働きます。',
          '日曜日にても、働きます。',
          '日曜日ならでも、働きます。'
        ],
        correctAnswer: '日曜日でも、働きます。',
        explanation: 'For nouns and な-adjectives, the concessive "even if" form is [Noun/Na-adj] + でも.'
      },
      {
        id: 'l25_ex2',
        lessonNumber: 25,
        type: 'fill_blank',
        category: 'grammar',
        prompt: 'Fill in the blank: [ ? ] 考えても、わかりません。 (No matter how much I think, I cannot understand.)',
        options: ['いくら', 'もし', 'たぶん', 'ぜひ'],
        correctAnswer: 'いくら',
        explanation: 'いくら is paired with 〜ても to mean "no matter how (much)".'
      },
      {
        id: 'l25_ex3',
        lessonNumber: 25,
        type: 'mcq',
        category: 'grammar',
        prompt: 'How do you say "When you arrive at the station, please call me" using つきます?',
        options: [
          '駅に 着いたら、電話して ください。',
          '駅に 着くたら、電話して ください。',
          '駅に 着いても、電話して ください。',
          '駅に 着きなら、電話して ください。'
        ],
        correctAnswer: '駅に 着いたら、電話して ください。',
        explanation: '着きます (Group I) past form is 着いた, so the conditional is 着いたら.'
      }
    ],
    dialogue: {
      title: 'いろいろ お世話に なりました (Thank you for having been kind to me)',
      situation: 'Mr. Miller is transferred to the Tokyo branch from Osaka, and his colleagues (Yamada, Kimura, Santos, Sato) bid him farewell.',
      lines: [
        { speaker: '山田', japanese: 'ミラーさん、東京本社への 転勤、おめでとう ございます。', hiragana: 'みらーさん、とうきょうほんしゃへの てんきん、おめでとう ございます。', english: 'Congratulations, Mr. Miller! You are going to be transferred to the Tokyo head office.' },
        { speaker: 'ミラー', japanese: 'ありがとう ございます。', hiragana: 'ありがとう ございます。', english: 'Thank you.' },
        { speaker: '木村', japanese: 'ミラーさんが 東京へ 行ったら、寂しく なりますね。', hiragana: 'みらーさんが とうきょうへ いったら、さびしく なりますね。', english: 'When you leave for Tokyo, we will miss you.' },
        { speaker: '木村', japanese: '東京へ 行っても、大阪のことを 忘れないで くださいね。', hiragana: 'とうきょうへ いっても、おおさかのことを わすれないで くださいね。', english: "Even after you go to Tokyo, don't forget about Osaka." },
        { speaker: 'ミラー', japanese: 'もちろん。木村さんも 東京へ 来たら、ぜひ 連絡して ください。', hiragana: 'もちろん。きむらさんも とうきょうへ きたら、ぜひ れんらくして ください。', english: 'Of course. Ms. Kimura, if you come to Tokyo, please be sure to contact me.' },
        { speaker: 'サントス', japanese: 'ミラーさん、東京へ 行ったら、たまには 一杯 飲みましょう。', hiragana: 'みらーさん、とうきょうへ いったら、たまには いっぱい のみましょう。', english: "Mr. Miller, when you go to Tokyo, let's have a drink together sometimes." },
        { speaker: 'ミラー', japanese: 'ええ、ぜひ。皆さん、本当に いろいろ お世話に なりました。', hiragana: 'ええ、ぜひ。みなさん、ほんとうに いろいろ おせわに なりました。', english: "I'd love to. Thank you very much, all of you, for everything you have done for me." },
        { speaker: '佐藤', japanese: '体に 気をつけて、頑張って ください。', hiragana: 'からだに きをつけて、がんばって ください。', english: 'Please take care of yourself and do your best.' },
        { speaker: 'ミラー', japanese: 'はい、頑張ります。皆さん、どうぞ お元気で！', hiragana: 'はい、がんばります。みなさん、どうぞ おげんきで！', english: 'Yes, I will do my best. Best of luck, all of you!' }
      ]
    }
  }
];
