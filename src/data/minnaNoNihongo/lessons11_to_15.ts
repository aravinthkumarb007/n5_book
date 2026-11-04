import { MinnaLesson } from '@/types/minna';

export const MINNA_LESSONS_11_TO_15: MinnaLesson[] = [
  // =========================================================================
  // LESSON 11: Counters, Quantities, Periods & Frequency
  // Textbook Reference: Pages 92–97
  // =========================================================================
  {
    id: 11,
    lessonNumber: 11,
    level: 'N5',
    title: 'Lesson 11: Numbers, Counters, Quantities & Periods of Time',
    titleJapanese: '第１１課：助数詞（ひとつ・ふたつ・まい・だい・人・回）・期間・頻度・だけ',
    theme: 'りんごを４つ買いました、１か月に２回映画を見ます、どのくらいかかりますか',
    description: 'Master Japanese numerical counters (一つ〜十、〜枚、〜台、〜人、〜回), asking "how many / how long" (いくつ、どのくらい), expressing duration & frequency, and limiting amounts with だけ (only).',
    keyPhrases: [
      '会議室に テーブルが ７つ あります。 (There are seven tables in the meeting room.)',
      'わたしは 日本に １年 います。 (I will stay in Japan for one year.)',
      'りんごを ４つ 買いました。 (I bought four apples.)',
      '80円の 切手を ５枚と はがきを ２枚 ください。 (Give me five 80-yen stamps and two postcards, please.)',
      '１週間に 何回 テニスを しますか。 (How many times a week do you play tennis?)',
      '大阪から 東京まで 新幹線で どのくらい かかりますか。 (How long does it take from Osaka to Tokyo by Shinkansen?)'
    ],
    vocabulary: [
      { id: 'l11_v1', lessonNumber: 11, kanji: 'います', hiragana: 'います', romaji: 'imasu', english: 'have [a child]', partOfSpeech: 'verb-2', category: 'Verbs', notes: '[子どもが〜] have [a child]' },
      { id: 'l11_v2', lessonNumber: 11, kanji: 'います', hiragana: 'います', romaji: 'imasu', english: 'stay, be [in Japan]', partOfSpeech: 'verb-2', category: 'Verbs', notes: '[日本に〜] stay, be [in Japan]' },
      { id: 'l11_v3', lessonNumber: 11, kanji: 'かかります', hiragana: 'かかります', romaji: 'kakarimasu', english: 'take (referring to time or money)', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l11_v4', lessonNumber: 11, kanji: '休みます', hiragana: 'やすみます', romaji: 'yasumimasu', english: 'take a day off [work]', partOfSpeech: 'verb-1', category: 'Verbs', notes: '[会社を〜] take a day off [work]' },
      { id: 'l11_v5', lessonNumber: 11, kanji: '１つ', hiragana: 'ひとつ', romaji: 'hitotsu', english: 'one (used when counting things)', partOfSpeech: 'counter', category: 'Counters' },
      { id: 'l11_v6', lessonNumber: 11, kanji: '２つ', hiragana: 'ふたつ', romaji: 'futatsu', english: 'two (things)', partOfSpeech: 'counter', category: 'Counters' },
      { id: 'l11_v7', lessonNumber: 11, kanji: '３つ', hiragana: 'みっつ', romaji: 'mittsu', english: 'three (things)', partOfSpeech: 'counter', category: 'Counters' },
      { id: 'l11_v8', lessonNumber: 11, kanji: '４つ', hiragana: 'よっつ', romaji: 'yottsu', english: 'four (things)', partOfSpeech: 'counter', category: 'Counters' },
      { id: 'l11_v9', lessonNumber: 11, kanji: '５つ', hiragana: 'いつつ', romaji: 'itsutsu', english: 'five (things)', partOfSpeech: 'counter', category: 'Counters' },
      { id: 'l11_v10', lessonNumber: 11, kanji: '６つ', hiragana: 'むっつ', romaji: 'muttsu', english: 'six (things)', partOfSpeech: 'counter', category: 'Counters' },
      { id: 'l11_v11', lessonNumber: 11, kanji: '７つ', hiragana: 'ななつ', romaji: 'nanatsu', english: 'seven (things)', partOfSpeech: 'counter', category: 'Counters' },
      { id: 'l11_v12', lessonNumber: 11, kanji: '８つ', hiragana: 'やっつ', romaji: 'yattsu', english: 'eight (things)', partOfSpeech: 'counter', category: 'Counters' },
      { id: 'l11_v13', lessonNumber: 11, kanji: '９つ', hiragana: 'ここのつ', romaji: 'kokonotsu', english: 'nine (things)', partOfSpeech: 'counter', category: 'Counters' },
      { id: 'l11_v14', lessonNumber: 11, kanji: '１０', hiragana: 'とお', romaji: 'too', english: 'ten (things)', partOfSpeech: 'counter', category: 'Counters' },
      { id: 'l11_v15', lessonNumber: 11, kanji: 'いくつ', hiragana: 'いくつ', romaji: 'ikutsu', english: 'how many', partOfSpeech: 'phrase', category: 'Question Words' },
      { id: 'l11_v16', lessonNumber: 11, kanji: '１人', hiragana: 'ひとり', romaji: 'hitori', english: 'one person', partOfSpeech: 'counter', category: 'Counters' },
      { id: 'l11_v17', lessonNumber: 11, kanji: '２人', hiragana: 'ふたり', romaji: 'futari', english: 'two persons', partOfSpeech: 'counter', category: 'Counters' },
      { id: 'l11_v18', lessonNumber: 11, kanji: '〜人', hiragana: '〜にん', romaji: '-nin', english: '- people (counter for people)', partOfSpeech: 'counter', category: 'Counters' },
      { id: 'l11_v19', lessonNumber: 11, kanji: '〜台', hiragana: '〜だい', romaji: '-dai', english: 'counter for machines, cars, etc.', partOfSpeech: 'counter', category: 'Counters' },
      { id: 'l11_v20', lessonNumber: 11, kanji: '〜枚', hiragana: '〜まい', romaji: '-mai', english: 'counter for paper, stamps, shirts, flat things', partOfSpeech: 'counter', category: 'Counters' },
      { id: 'l11_v21', lessonNumber: 11, kanji: '〜回', hiragana: '〜かい', romaji: '-kai', english: '- times, frequency', partOfSpeech: 'counter', category: 'Counters' },
      { id: 'l11_v22', lessonNumber: 11, kanji: 'りんご', hiragana: 'りんご', romaji: 'ringo', english: 'apple', partOfSpeech: 'noun', category: 'Food' },
      { id: 'l11_v23', lessonNumber: 11, kanji: 'みかん', hiragana: 'みかん', romaji: 'mikan', english: 'mandarin orange, tangerine', partOfSpeech: 'noun', category: 'Food' },
      { id: 'l11_v24', lessonNumber: 11, kanji: 'サンドイッチ', hiragana: 'サンドイッチ', romaji: 'sandoitchi', english: 'sandwich', partOfSpeech: 'noun', category: 'Food' },
      { id: 'l11_v25', lessonNumber: 11, kanji: 'カレー[ライス]', hiragana: 'カレー[ライス]', romaji: 'karee [raisu]', english: 'curry [and rice]', partOfSpeech: 'noun', category: 'Food' },
      { id: 'l11_v26', lessonNumber: 11, kanji: 'アイスクリーム', hiragana: 'アイスクリーム', romaji: 'aisukuriimu', english: 'ice cream', partOfSpeech: 'noun', category: 'Food' },
      { id: 'l11_v27', lessonNumber: 11, kanji: '切手', hiragana: 'きって', romaji: 'kitte', english: 'postage stamp', partOfSpeech: 'noun', category: 'Post & Office' },
      { id: 'l11_v28', lessonNumber: 11, kanji: 'はがき', hiragana: 'はがき', romaji: 'hagaki', english: 'post card', partOfSpeech: 'noun', category: 'Post & Office' },
      { id: 'l11_v29', lessonNumber: 11, kanji: '封筒', hiragana: 'ふうとう', romaji: 'fuutou', english: 'envelope', partOfSpeech: 'noun', category: 'Post & Office' },
      { id: 'l11_v30', lessonNumber: 11, kanji: '速達', hiragana: 'そくたつ', romaji: 'sokutatsu', english: 'special delivery, express delivery', partOfSpeech: 'noun', category: 'Post & Office' },
      { id: 'l11_v31', lessonNumber: 11, kanji: '書留', hiragana: 'かきとめ', romaji: 'kakitome', english: 'registered mail', partOfSpeech: 'noun', category: 'Post & Office' },
      { id: 'l11_v32', lessonNumber: 11, kanji: '航空便', hiragana: 'こうくうびん (エアメール)', romaji: 'koukuubin (eameeru)', english: 'airmail', partOfSpeech: 'noun', category: 'Post & Office' },
      { id: 'l11_v33', lessonNumber: 11, kanji: '船便', hiragana: 'ふなびん', romaji: 'funabin', english: 'sea mail, surface mail', partOfSpeech: 'noun', category: 'Post & Office' },
      { id: 'l11_v34', lessonNumber: 11, kanji: '両親', hiragana: 'りょうしん', romaji: 'ryoushin', english: 'parents', partOfSpeech: 'noun', category: 'Family' },
      { id: 'l11_v35', lessonNumber: 11, kanji: '兄弟', hiragana: 'きょうだい', romaji: 'kyoudai', english: 'brothers and sisters, siblings', partOfSpeech: 'noun', category: 'Family' },
      { id: 'l11_v36', lessonNumber: 11, kanji: '兄', hiragana: 'あに', romaji: 'ani', english: '(my) elder brother', partOfSpeech: 'noun', category: 'Family' },
      { id: 'l11_v37', lessonNumber: 11, kanji: 'お兄さん', hiragana: 'おにいさん', romaji: 'oniisan', english: "(someone else's) elder brother", partOfSpeech: 'noun', category: 'Family' },
      { id: 'l11_v38', lessonNumber: 11, kanji: '姉', hiragana: 'あね', romaji: 'ane', english: '(my) elder sister', partOfSpeech: 'noun', category: 'Family' },
      { id: 'l11_v39', lessonNumber: 11, kanji: 'お姉さん', hiragana: 'おねえさん', romaji: 'oneesan', english: "(someone else's) elder sister", partOfSpeech: 'noun', category: 'Family' },
      { id: 'l11_v40', lessonNumber: 11, kanji: '弟', hiragana: 'おとうと', romaji: 'otouto', english: '(my) younger brother', partOfSpeech: 'noun', category: 'Family' },
      { id: 'l11_v41', lessonNumber: 11, kanji: '弟さん', hiragana: 'おとうとさん', romaji: 'otoutosan', english: "(someone else's) younger brother", partOfSpeech: 'noun', category: 'Family' },
      { id: 'l11_v42', lessonNumber: 11, kanji: '妹', hiragana: 'いもうと', romaji: 'imouto', english: '(my) younger sister', partOfSpeech: 'noun', category: 'Family' },
      { id: 'l11_v43', lessonNumber: 11, kanji: '妹さん', hiragana: 'いもうとさん', romaji: 'imoutosan', english: "(someone else's) younger sister", partOfSpeech: 'noun', category: 'Family' },
      { id: 'l11_v44', lessonNumber: 11, kanji: '外国', hiragana: 'がいこく', romaji: 'gaikoku', english: 'foreign country', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l11_v45', lessonNumber: 11, kanji: '〜時間', hiragana: '〜じかん', romaji: '-jikan', english: '- hours', partOfSpeech: 'counter', category: 'Time' },
      { id: 'l11_v46', lessonNumber: 11, kanji: '〜週間', hiragana: '〜しゅうかん', romaji: '-shuukan', english: '- weeks', partOfSpeech: 'counter', category: 'Time' },
      { id: 'l11_v47', lessonNumber: 11, kanji: '〜か月', hiragana: '〜かげつ', romaji: '-kagetsu', english: '- months', partOfSpeech: 'counter', category: 'Time' },
      { id: 'l11_v48', lessonNumber: 11, kanji: '〜年', hiragana: '〜ねん', romaji: '-nen', english: '- years', partOfSpeech: 'counter', category: 'Time' },
      { id: 'l11_v49', lessonNumber: 11, kanji: '〜ぐらい', hiragana: '〜ぐらい', romaji: '-gurai', english: 'about ~', partOfSpeech: 'particle', category: 'Degree' },
      { id: 'l11_v50', lessonNumber: 11, kanji: 'どのくらい', hiragana: 'どのくらい', romaji: 'dono kurai', english: 'how long, how much', partOfSpeech: 'phrase', category: 'Question Words' },
      { id: 'l11_v51', lessonNumber: 11, kanji: '全部で', hiragana: 'ぜんぶで', romaji: 'zenbu de', english: 'in total, all together', partOfSpeech: 'adverb', category: 'Quantities' },
      { id: 'l11_v52', lessonNumber: 11, kanji: 'みんな', hiragana: 'みんな', romaji: 'minna', english: 'all, everything, everyone', partOfSpeech: 'adverb', category: 'Quantities' },
      { id: 'l11_v53', lessonNumber: 11, kanji: '〜だけ', hiragana: '〜だけ', romaji: '-dake', english: 'only ~', partOfSpeech: 'particle', category: 'Particles' },
      { id: 'l11_v54', lessonNumber: 11, kanji: 'いらっしゃいませ。', hiragana: 'いらっしゃいませ。', romaji: 'Irasshaimase.', english: 'Welcome! / May I help you? (in shops)', partOfSpeech: 'phrase', category: 'Greetings' },
      { id: 'l11_v55', lessonNumber: 11, kanji: 'いい [お]天気ですね。', hiragana: 'いい [お]てんきですね。', romaji: 'Ii [o]tenki desu ne.', english: "Nice weather, isn't it?", partOfSpeech: 'phrase', category: 'Conversations' },
      { id: 'l11_v56', lessonNumber: 11, kanji: 'お出かけですか。', hiragana: 'おでかけですか。', romaji: 'Odekake desu ka.', english: 'Are you going out?', partOfSpeech: 'phrase', category: 'Conversations' },
      { id: 'l11_v57', lessonNumber: 11, kanji: 'ちょっと 〜まで。', hiragana: 'ちょっと 〜まで。', romaji: 'Chotto ~ made.', english: "I'm just going to ~.", partOfSpeech: 'phrase', category: 'Conversations' },
      { id: 'l11_v58', lessonNumber: 11, kanji: '行って いらっしゃい。', hiragana: 'いって いらっしゃい。', romaji: 'Itte irasshai.', english: 'So long. (lit. Go and come back.)', partOfSpeech: 'phrase', category: 'Conversations' },
      { id: 'l11_v59', lessonNumber: 11, kanji: '行って まいります。', hiragana: 'いって まいります。', romaji: 'Itte mairimasu.', english: "So long. (lit. I'm going and coming back.)", partOfSpeech: 'phrase', category: 'Conversations' },
      { id: 'l11_v60', lessonNumber: 11, kanji: 'それから', hiragana: 'それから', romaji: 'sorekara', english: 'and, furthermore, after that', partOfSpeech: 'conjunction', category: 'Conjunctions' },
      { id: 'l11_v61', lessonNumber: 11, kanji: 'オーストラリア', hiragana: 'オーストラリア', romaji: 'Oosutoraria', english: 'Australia', partOfSpeech: 'noun', category: 'Countries' }
    ],
    grammar: [
      {
        id: 'l11_g1',
        lessonNumber: 11,
        title: '助数詞と数量詞の位置 (Position of Quantifiers in a Sentence)',
        structure: 'Noun + を/が + [Quantifier] + Verb',
        explanation: 'In Japanese, quantifiers (numbers with counter suffixes) are usually placed immediately before the verbs they modify, NOT directly before the noun as in English.',
        rules: [
          'General counting system: ひとつ(1), ふたつ(2), みっつ(3), よっつ(4), いつつ(5), むっつ(6), ななつ(7), やっつ(8), ここのつ(9), とお(10). From 11 onward, regular Arabic numbers are used (じゅういち, etc.).',
          'Counter suffixes: 〜人 (people: ひとり, ふたり, さんにん...), 〜台 (machines, vehicles), 〜枚 (flat thin items like sheets, stamps, shirts), 〜回 (times/frequency), 〜時間 (hours), 〜日 (days), 〜週間 (weeks), 〜か月 (months), 〜年 (years).',
          'Notice: No particle is placed between the quantifier and the verb!'
        ],
        examples: [
          { japanese: 'りんごを ４つ 買いました。', hiragana: 'りんごを よっつ かいました。', romaji: 'Ringo o yottsu kaimashita.', english: 'We bought four apples.' },
          { japanese: '外国人の 学生が ２人 います。', hiragana: 'がいこくじんの がくせいが ふたり います。', romaji: 'Gaikokujin no gakusei ga futari imasu.', english: 'There are two foreign students.' },
          { japanese: '国で ２か月 日本語を 勉強しました。', hiragana: 'くにで にかげつ にほんごを べんきょうしました。', romaji: 'Kuni de ni-kagetsu nihongo o benkyoushimashita.', english: 'I studied Japanese for two months in my country.' }
        ]
      },
      {
        id: 'l11_g2',
        lessonNumber: 11,
        title: '疑問詞：いくつ・何＋助数詞・どのくらい (Interrogatives for Quantities & Length of Time)',
        structure: '[いくつ / 何+Counter / どのくらい] + Verb か',
        explanation: 'Different question words are used depending on what is being counted or measured.',
        rules: [
          'いくつ: asks "how many" for items counted with ひとつ, ふたつ.',
          '何 + Counter suffix: 何人 (how many people), 何枚 (how many sheets), 何時間 (how many hours).',
          'どのくらい: asks the length of time an action takes or how long someone stays.',
          '〜ぐらい: attached after quantifiers to mean "about / approximately".'
        ],
        examples: [
          { japanese: 'みかんを いくつ 買いましたか。…８つ 買いました。', hiragana: 'みかんを いくつ かいましたか。…やっつ かいました。', romaji: 'Mikan o ikutsu kaimashita ka. ...Yattsu kaimashita.', english: 'How many mandarin oranges did you buy? ...I bought eight.' },
          { japanese: '毎晩 何時間 日本語を 勉強しますか。…２時間 勉強します。', hiragana: 'まいばん なんじかん にほんごを べんきょうしますか。…にじかん べんきょうします。', romaji: 'Mainban nan-jikan nihongo o benkyoushimasu ka. ...Ni-jikan benkyoushimasu.', english: 'How many hours do you study Japanese every night? ...Two hours.' },
          { japanese: '大阪から 東京まで どのくらい かかりますか。…新幹線で ２時間半 かかります。', hiragana: 'おおさかから とうきょうまで どのくらい かかりますか。…しんかんせんで にじかんはん かかります。', romaji: 'Oosaka kara Toukyou made dono kurai kakarimasu ka. ...Shinkansen de ni-jikan-han kakarimasu.', english: 'How long does it take from Osaka to Tokyo? ...It takes two and a half hours by Shinkansen.' }
        ]
      },
      {
        id: 'l11_g3',
        lessonNumber: 11,
        title: '期間 に 〜回 動詞 (Frequency Within a Time Period)',
        structure: 'Quantifier (period) + に + [Frequency / 回] + Verb',
        explanation: 'With this expression you can state how often you perform an activity within a specific time unit (per day, week, month, year).',
        rules: [
          '１週間に２回 (twice a week).',
          '１か月に２回 映画を 見ます (I go to see movies twice a month).',
          '１年に１回 国へ 帰ります (I return to my home country once a year).'
        ],
        examples: [
          { japanese: '１か月に ２回 映画を 見ます。', hiragana: 'いっかげつに にかい えいがを みます。', romaji: 'Ik-kagetsu ni ni-kai eiga o mimasu.', english: 'I go to see movies twice a month.' },
          { japanese: '１週間に 何回 テニスを しますか。…２回ぐらい します。', hiragana: 'いっしゅうかんに なんかい てにすを しますか。…にかいぐらい します。', romaji: 'Is-shuukan ni nan-kai tenisu o shimasu ka. ...Ni-kai gurai shimasu.', english: 'How many times a week do you play tennis? ...I play about twice a week.' }
        ]
      },
      {
        id: 'l11_g4',
        lessonNumber: 11,
        title: '数量詞 だけ / 名詞 だけ ("Only")',
        structure: 'Quantifier / Noun + だけ',
        explanation: 'だけ means "only". It is added after quantifiers or nouns to express that there is no more or nothing else.',
        rules: [
          'Power Electric に 外国人の 社員が １人だけ います (There is only one foreign employee in Power Electric).',
          '休みは 日曜日だけです (I only have Sundays off).'
        ],
        examples: [
          { japanese: 'パワー電気に 外国人の 社員が １人だけ います。', hiragana: 'ぱわーでんきに がいこくじんの しゃいんが ひとりだけ います。', romaji: 'Pawaa-denki ni gaikokujin no shain ga hitori dake imasu.', english: 'There is only one foreign employee in Power Electric.' },
          { japanese: '休みは 日曜日だけです。', hiragana: 'やすみは にちようびだけです。', romaji: 'Yasumi wa nichiyoubi dake desu.', english: 'I only have Sundays off.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l11_ex1',
        lessonNumber: 11,
        type: 'mcq',
        category: 'grammar',
        prompt: 'Which sentence has the correct word order for "I bought four apples"?',
        options: [
          'りんごを ４つ 買いました。',
          '４つの りんごを 買いました。',
          'りんごが ４つを 買いました。',
          'りんごに ４つ 買いました。'
        ],
        correctAnswer: 'りんごを ４つ 買いました。',
        explanation: 'In Japanese, the quantifier (４つ) is placed directly before the verb without any intervening particle.'
      },
      {
        id: 'l11_ex2',
        lessonNumber: 11,
        type: 'fill_blank',
        category: 'grammar',
        prompt: 'Fill in the blank: １か月 [ ? ] ２回 映画を 見ます。 (I watch movies twice a month.)',
        options: ['に', 'で', 'を', 'へ'],
        correctAnswer: 'に',
        explanation: 'Particle に marks the time unit for frequency (１か月に２回).'
      },
      {
        id: 'l11_ex3',
        lessonNumber: 11,
        type: 'mcq',
        category: 'vocabulary',
        prompt: 'What counter is used for flat, thin items such as paper, stamps, or shirts?',
        options: ['〜枚 (まい)', '〜台 (だい)', '〜本 (ほん)', '〜冊 (さつ)'],
        correctAnswer: '〜枚 (まい)',
        explanation: '〜枚 (まい) counts thin flat objects like paper, postcards, stamps, and shirts.'
      }
    ],
    dialogue: {
      title: 'これをお願いします (Please send this by sea mail)',
      situation: 'Mr. Wang leaves the dormitory, greets the janitor, and visits the post office to send letters and packages.',
      lines: [
        { speaker: '管理人', japanese: 'いい天気ですね。お出かけですか。', hiragana: 'いいてんきですね。おでかけですか。', english: "Nice weather, isn't it? Are you going out?" },
        { speaker: 'ワン', japanese: 'ええ、ちょっと 郵便局まで。', hiragana: 'ええ、ちょっと ゆうびんきょくまで。', english: "Yes, I'm just going to the post office." },
        { speaker: '管理人', japanese: 'そうですか。行って いらっしゃい。', hiragana: 'そうですか。いって いらっしゃい。', english: 'Really? See you later.' },
        { speaker: 'ワン', japanese: '行って まいります。', hiragana: 'いって まいります。', english: 'See you.' },
        { speaker: '局員', japanese: 'いらっしゃいませ。', hiragana: 'いらっしゃいませ。', english: 'Welcome. May I help you?' },
        { speaker: 'ワン', japanese: 'これ、速達で お願いします。', hiragana: 'これ、そくたつで おねがいします。', english: 'I would like to send this by special delivery.' },
        { speaker: '局員', japanese: 'はい、オーストラリアですね。370円です。', hiragana: 'はい、おーすとらりあですね。さんびゃくななじゅうえんです。', english: "Sure. To Australia? That's 370 yen." },
        { speaker: 'ワン', japanese: 'それから、この荷物も お願いします。船便は いくらですか。', hiragana: 'それから、このにもつも おねがいします。ふなびんは いくらですか。', english: 'And also this parcel. How much is sea mail?' },
        { speaker: '局員', japanese: '500円です。', hiragana: 'ごひゃくえんです。', english: "It's 500 yen." },
        { speaker: 'ワン', japanese: 'どのくらい かかりますか。', hiragana: 'どのくらい かかりますか。', english: 'How long will it take?' },
        { speaker: '局員', japanese: '１か月ぐらいです。', hiragana: 'いっかげつぐらいです。', english: 'It will take about one month.' },
        { speaker: 'ワン', japanese: 'じゃ、船便で お願いします。', hiragana: 'じゃ、ふなびんで おねがいします。', english: 'Well, please send it by sea mail.' }
      ]
    }
  },

  // =========================================================================
  // LESSON 12: Past Tense of Adjectives & Nouns, Comparisons & Superlatives
  // Textbook Reference: Pages 98–103
  // =========================================================================
  {
    id: 12,
    lessonNumber: 12,
    level: 'N5',
    title: 'Lesson 12: Past Tense of Adjectives & Nouns, Comparisons & Superlatives',
    titleJapanese: '第１２課：名詞・形容詞の過去形・比較（〜より〜・どちらが〜）・最上級（いちばん）',
    theme: 'きのうは雨でした、北海道は九州より大きいです、日本料理で何がいちばん好きですか',
    description: 'Learn past affirmative and past negative forms of noun and adjective sentences, compare two things with より and どちらが, and express superlatives with いちばん.',
    keyPhrases: [
      'きのうは 雨でした。 (It was rainy yesterday.)',
      'きのうは 寒かったです。 (It was cold yesterday.)',
      '北海道は 九州より 大きいです。 (Hokkaido is bigger than Kyushu.)',
      'わたしは １年で 夏が いちばん 好きです。 (I like summer best of the year.)',
      '京都は 静かでしたか。…いいえ、静かじゃ ありませんでした。 (Was Kyoto quiet? ...No, it wasn\'t.)',
      '海と 山と どちらが 好きですか。…どちらも 好きです。 (Which do you prefer, the sea or the mountains? ...I like both.)'
    ],
    vocabulary: [
      { id: 'l12_v1', lessonNumber: 12, kanji: '簡単[な]', hiragana: 'かんたん[な]', romaji: 'kantan[na]', english: 'easy, simple', partOfSpeech: 'na-adjective', category: 'Adjectives' },
      { id: 'l12_v2', lessonNumber: 12, kanji: '近い', hiragana: 'ちかい', romaji: 'chikai', english: 'near, close', partOfSpeech: 'i-adjective', category: 'Adjectives' },
      { id: 'l12_v3', lessonNumber: 12, kanji: '遠い', hiragana: 'とおい', romaji: 'tooi', english: 'far, distant', partOfSpeech: 'i-adjective', category: 'Adjectives' },
      { id: 'l12_v4', lessonNumber: 12, kanji: '速い、早い', hiragana: 'はやい', romaji: 'hayai', english: 'fast, early', partOfSpeech: 'i-adjective', category: 'Adjectives' },
      { id: 'l12_v5', lessonNumber: 12, kanji: '遅い', hiragana: 'おそい', romaji: 'osoi', english: 'slow, late', partOfSpeech: 'i-adjective', category: 'Adjectives' },
      { id: 'l12_v6', lessonNumber: 12, kanji: '多い', hiragana: 'おおい', romaji: 'ooi', english: 'many [people], much', partOfSpeech: 'i-adjective', category: 'Adjectives', notes: '[人が〜] many [people]' },
      { id: 'l12_v7', lessonNumber: 12, kanji: '少ない', hiragana: 'すくない', romaji: 'sukunai', english: 'few [people], a little', partOfSpeech: 'i-adjective', category: 'Adjectives', notes: '[人が〜] few [people]' },
      { id: 'l12_v8', lessonNumber: 12, kanji: '暖かい、温かい', hiragana: 'あたたかい', romaji: 'atatakai', english: 'warm', partOfSpeech: 'i-adjective', category: 'Adjectives' },
      { id: 'l12_v9', lessonNumber: 12, kanji: '涼しい', hiragana: 'すずしい', romaji: 'suzushii', english: 'cool (weather)', partOfSpeech: 'i-adjective', category: 'Adjectives' },
      { id: 'l12_v10', lessonNumber: 12, kanji: '甘い', hiragana: 'あまい', romaji: 'amai', english: 'sweet', partOfSpeech: 'i-adjective', category: 'Adjectives' },
      { id: 'l12_v11', lessonNumber: 12, kanji: '辛い', hiragana: 'からい', romaji: 'karai', english: 'hot (taste), spicy', partOfSpeech: 'i-adjective', category: 'Adjectives' },
      { id: 'l12_v12', lessonNumber: 12, kanji: '重い', hiragana: 'おもい', romaji: 'omoi', english: 'heavy', partOfSpeech: 'i-adjective', category: 'Adjectives' },
      { id: 'l12_v13', lessonNumber: 12, kanji: '軽い', hiragana: 'かるい', romaji: 'karui', english: 'light (weight)', partOfSpeech: 'i-adjective', category: 'Adjectives' },
      { id: 'l12_v14', lessonNumber: 12, kanji: 'いい', hiragana: 'いい', romaji: 'ii', english: 'prefer [coffee]', partOfSpeech: 'i-adjective', category: 'Adjectives', notes: '[コーヒーが〜] prefer [coffee]' },
      { id: 'l12_v15', lessonNumber: 12, kanji: '季節', hiragana: 'きせつ', romaji: 'kisetsu', english: 'season', partOfSpeech: 'noun', category: 'Seasons' },
      { id: 'l12_v16', lessonNumber: 12, kanji: '春', hiragana: 'はる', romaji: 'haru', english: 'spring', partOfSpeech: 'noun', category: 'Seasons' },
      { id: 'l12_v17', lessonNumber: 12, kanji: '夏', hiragana: 'なつ', romaji: 'natsu', english: 'summer', partOfSpeech: 'noun', category: 'Seasons' },
      { id: 'l12_v18', lessonNumber: 12, kanji: '秋', hiragana: 'あき', romaji: 'aki', english: 'autumn, fall', partOfSpeech: 'noun', category: 'Seasons' },
      { id: 'l12_v19', lessonNumber: 12, kanji: '冬', hiragana: 'ふゆ', romaji: 'fuyu', english: 'winter', partOfSpeech: 'noun', category: 'Seasons' },
      { id: 'l12_v20', lessonNumber: 12, kanji: '天気', hiragana: 'てんき', romaji: 'tenki', english: 'weather', partOfSpeech: 'noun', category: 'Weather' },
      { id: 'l12_v21', lessonNumber: 12, kanji: '雨', hiragana: 'あめ', romaji: 'ame', english: 'rain, rainy', partOfSpeech: 'noun', category: 'Weather' },
      { id: 'l12_v22', lessonNumber: 12, kanji: '雪', hiragana: 'ゆき', romaji: 'yuki', english: 'snow, snowy', partOfSpeech: 'noun', category: 'Weather' },
      { id: 'l12_v23', lessonNumber: 12, kanji: '曇り', hiragana: 'くもり', romaji: 'kumori', english: 'cloudy', partOfSpeech: 'noun', category: 'Weather' },
      { id: 'l12_v24', lessonNumber: 12, kanji: 'ホテル', hiragana: 'ホテル', romaji: 'hoteru', english: 'hotel', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l12_v25', lessonNumber: 12, kanji: '空港', hiragana: 'くうこう', romaji: 'kuukou', english: 'airport', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l12_v26', lessonNumber: 12, kanji: '海', hiragana: 'うみ', romaji: 'umi', english: 'sea, ocean', partOfSpeech: 'noun', category: 'Nature' },
      { id: 'l12_v27', lessonNumber: 12, kanji: '世界', hiragana: 'せかい', romaji: 'sekai', english: 'world', partOfSpeech: 'noun', category: 'General' },
      { id: 'l12_v28', lessonNumber: 12, kanji: 'パーティー', hiragana: 'パーティー', romaji: 'paatii', english: 'party (~を します: give a party)', partOfSpeech: 'noun', category: 'Social' },
      { id: 'l12_v29', lessonNumber: 12, kanji: '[お]祭り', hiragana: '[お]まつり', romaji: '[o]matsuri', english: 'festival', partOfSpeech: 'noun', category: 'Culture' },
      { id: 'l12_v30', lessonNumber: 12, kanji: '試験', hiragana: 'しけん', romaji: 'shiken', english: 'examination, test', partOfSpeech: 'noun', category: 'School' },
      { id: 'l12_v31', lessonNumber: 12, kanji: 'すき焼き', hiragana: 'すきやき', romaji: 'sukiyaki', english: 'sukiyaki (beef and vegetable hot pot)', partOfSpeech: 'noun', category: 'Food' },
      { id: 'l12_v32', lessonNumber: 12, kanji: '刺身', hiragana: 'さしみ', romaji: 'sashimi', english: 'sashimi (sliced raw fish)', partOfSpeech: 'noun', category: 'Food' },
      { id: 'l12_v33', lessonNumber: 12, kanji: '[お]すし', hiragana: '[お]すし', romaji: '[o]sushi', english: 'sushi (vinegared rice topped with raw fish)', partOfSpeech: 'noun', category: 'Food' },
      { id: 'l12_v34', lessonNumber: 12, kanji: 'てんぷら', hiragana: 'てんぷら', romaji: 'tenpura', english: 'tempura (deep-fried seafood and vegetables)', partOfSpeech: 'noun', category: 'Food' },
      { id: 'l12_v35', lessonNumber: 12, kanji: '生け花', hiragana: 'いけばな', romaji: 'ikebana', english: 'flower arrangement (~を します: practice flower arrangement)', partOfSpeech: 'noun', category: 'Culture' },
      { id: 'l12_v36', lessonNumber: 12, kanji: '紅葉', hiragana: 'もみじ', romaji: 'momiji', english: 'maple, red leaves of autumn', partOfSpeech: 'noun', category: 'Nature' },
      { id: 'l12_v37', lessonNumber: 12, kanji: 'どちら', hiragana: 'どちら', romaji: 'dochira', english: 'which one (between two things)', partOfSpeech: 'phrase', category: 'Question Words' },
      { id: 'l12_v38', lessonNumber: 12, kanji: 'どちらも', hiragana: 'どちらも', romaji: 'dochira mo', english: 'both', partOfSpeech: 'phrase', category: 'Expressions' },
      { id: 'l12_v39', lessonNumber: 12, kanji: 'ずっと', hiragana: 'ずっと', romaji: 'zutto', english: 'by far, much more', partOfSpeech: 'adverb', category: 'Degree' },
      { id: 'l12_v40', lessonNumber: 12, kanji: '初めて', hiragana: 'はじめて', romaji: 'hajimete', english: 'for the first time', partOfSpeech: 'adverb', category: 'Time' },
      { id: 'l12_v41', lessonNumber: 12, kanji: 'ただいま。', hiragana: 'ただいま。', romaji: 'Tadaima.', english: "I'm home.", partOfSpeech: 'phrase', category: 'Greetings' },
      { id: 'l12_v42', lessonNumber: 12, kanji: 'お帰りなさい。', hiragana: 'おかえりなさい。', romaji: 'Okaerinasai.', english: 'Welcome home.', partOfSpeech: 'phrase', category: 'Greetings' },
      { id: 'l12_v43', lessonNumber: 12, kanji: 'すごいですね。', hiragana: 'すごいですね。', romaji: 'Sugoi desu ne.', english: "That's amazing!", partOfSpeech: 'phrase', category: 'Expressions' },
      { id: 'l12_v44', lessonNumber: 12, kanji: 'でも', hiragana: 'でも', romaji: 'demo', english: 'but, however', partOfSpeech: 'conjunction', category: 'Conjunctions' },
      { id: 'l12_v45', lessonNumber: 12, kanji: '疲れました。', hiragana: 'つかれました。', romaji: 'Tsukaremashita.', english: "(I'm) tired.", partOfSpeech: 'phrase', category: 'Expressions' },
      { id: 'l12_v46', lessonNumber: 12, kanji: '祇園祭', hiragana: 'ぎおんまつり', romaji: 'Gion-matsuri', english: 'Gion Festival (famous Kyoto festival)', partOfSpeech: 'noun', category: 'Culture' },
      { id: 'l12_v47', lessonNumber: 12, kanji: 'ホンコン', hiragana: 'ホンコン', romaji: 'Honkon', english: 'Hong Kong', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l12_v48', lessonNumber: 12, kanji: 'シンガポール', hiragana: 'シンガポール', romaji: 'Shingapooru', english: 'Singapore', partOfSpeech: 'noun', category: 'Places' }
    ],
    grammar: [
      {
        id: 'l12_g1',
        lessonNumber: 12,
        title: '名詞文・な形容詞文の過去形 (Past Tense of Noun & Na-Adjective Sentences)',
        structure: 'Noun / Na-adj: [Affirmative] でした | [Negative] じゃ ありませんでした (では ありませんでした)',
        explanation: 'In the past tense, です becomes でした, and じゃ ありません becomes じゃ ありませんでした.',
        rules: [
          'Present Affirmative: 雨です / 静かです',
          'Past Affirmative: 雨でした (It was rainy) / 静かでした (It was quiet)',
          'Present Negative: 雨じゃ ありません / 静かじゃ ありません',
          'Past Negative: 雨じゃ ありませんでした / 静かじゃ ありませんでした'
        ],
        examples: [
          { japanese: 'きのうは 雨でした。', hiragana: 'きのうは あめでした。', romaji: 'Kinou wa ame deshita.', english: 'It was rainy yesterday.' },
          { japanese: 'きのうの 試験は 簡単じゃ ありませんでした。', hiragana: 'きのうの しけんは かんたんじゃ ありませんでした。', romaji: 'Kinou no shiken wa kantan ja arimasen deshita.', english: "Yesterday's exam was not easy." }
        ]
      },
      {
        id: 'l12_g2',
        lessonNumber: 12,
        title: 'い形容詞文の過去形 (Past Tense of I-Adjective Sentences)',
        structure: '[Affirmative] 〜かったです | [Negative] 〜くなかったです',
        explanation: 'To form the past tense of an い-adjective, replace the final 〜い with 〜かったです (affirmative) or 〜くなかったです (negative).',
        rules: [
          'あつい (hot) -> あつかったです (was hot) / あつくなかったです (was not hot).',
          'さむい (cold) -> さむかったです / さむくなかったです.',
          'IMPORTANT EXCEPTION: いい (good) -> よかったです (was good) / よくなかったです (was not good).'
        ],
        examples: [
          { japanese: 'きのうは 暑かったです。', hiragana: 'きのうは あつかったです。', romaji: 'Kinou wa atsukatta desu.', english: 'It was hot yesterday.' },
          { japanese: 'きのうの パーティーは あまり 楽しくなかったです。', hiragana: 'きのうの ぱーてぃーは あまり たのしくなかったです。', romaji: 'Kinou no paatii wa amari tanoshikunakatta desu.', english: "I didn't enjoy yesterday's party very much." }
        ]
      },
      {
        id: 'l12_g3',
        lessonNumber: 12,
        title: 'N1 は N2 より 形容詞 です (Comparative: N1 is more ~ than N2)',
        structure: 'Noun 1 + は + Noun 2 + より + Adjective + です',
        explanation: 'This sentence pattern describes the quality or state of N1 in comparison with N2. より means "than".',
        rules: [
          '北海道は 九州より 大きいです (Hokkaido is bigger than Kyushu).',
          'この 車は あの 車より 大きいです (This car is bigger than that car).'
        ],
        examples: [
          { japanese: '北海道は 九州より 大きいです。', hiragana: 'ほっかいどうは きゅうしゅうより おおきいです。', romaji: 'Hokkaidou wa Kyuushuu yori ookii desu.', english: 'Hokkaido is bigger than Kyushu.' },
          { japanese: '東京は ニューヨークより 人が 多いですか。…はい、ずっと 多いです。', hiragana: 'とうきょうは にゅーよーくより ひとが おおいですか。…はい、ずっと おおいです。', romaji: 'Toukyou wa Nyuuyooku yori hito ga ooi desu ka. ...Hai, zutto ooi desu.', english: 'Are there more people in Tokyo than in New York? ...Yes, a lot more.' }
        ]
      },
      {
        id: 'l12_g4',
        lessonNumber: 12,
        title: 'N1 と N2 と どちらが 形容詞 ですか (Comparison Between Two)',
        structure: 'N1 + と + N2 + と + どちらが + Adjective + ですか。… [N1 / N2] の ほうが Adjective です。',
        explanation: 'Asks the listener to choose between two items. The interrogative used is always どちら. The answer uses 〜の ほうが (is more...). If both are equal, use どちらも (both).',
        rules: [
          'サッカーと 野球と どちらが おもしろいですか。…サッカーの ほうが おもしろいです。',
          '海と 山と どちらが 好きですか。…どちらも 好きです。'
        ],
        examples: [
          { japanese: 'サッカーと 野球と どちらが おもしろいですか。…サッカーの ほうが おもしろいです。', hiragana: 'さっかーと やきゅうと どちらが おもしろいですか。…さっかーの ほうが おもしろいです。', romaji: 'Sakkaa to yakyuu to dochira ga omoshiroi desu ka. ...Sakkaa no hou ga omoshiroi desu.', english: 'Which is more interesting, baseball or soccer? ...Soccer is.' },
          { japanese: '海と 山と どちらが 好きですか。…どちらも 好きです。', hiragana: 'うみと やまと どちらが すきですか。…どちらも すきです。', romaji: 'Umi to yama to dochira ga suki desu ka. ...Dochira mo suki desu.', english: 'Which do you prefer, the sea or the mountains? ...I like both.' }
        ]
      },
      {
        id: 'l12_g5',
        lessonNumber: 12,
        title: 'N1 [の 中] で 何/どこ/だれ/いつ が いちばん 形容詞 ですか (Superlative)',
        structure: 'N1 [の なかで] + [何 / どこ / だれ / いつ] が + いちばん + Adjective + ですか。… N2 が いちばん Adjective です。',
        explanation: 'Asks the listener to choose the item that is the "most [adjective]" from a whole group or category denoted by N1.',
        rules: [
          'Question word depends on category: 何 (things), どこ (places), だれ (people), いつ (time).',
          'Subject of the superlative is marked by が: てんぷらが いちばん おいしいです。'
        ],
        examples: [
          { japanese: '日本料理[の 中]で 何が いちばん おいしいですか。…てんぷらが いちばん おいしいです。', hiragana: 'にほんりょうり[の なかで] なにが いちばん おいしいですか。…てんぷらが いちばん おいしいです。', romaji: 'Nihon ryouri [no naka de] nani ga ichiban oishii desu ka. ...Tenpura ga ichiban oishii desu.', english: 'Among Japanese dishes, what is the most delicious? ...Tempura is.' },
          { japanese: 'ヨーロッパで どこが いちばん よかったですか。…スイスが いちばん よかったです。', hiragana: 'よーろっぱで どこが いちばん よかったですか。…すいすが いちばん よかったです。', romaji: 'Yooroppa de doko ga ichiban yokatta desu ka. ...Suisu ga ichiban yokatta desu.', english: 'In Europe, where did you like best? ...I liked Switzerland best.' },
          { japanese: '家族で だれが いちばん 背が 高いですか。…弟が いちばん 背が 高いです。', hiragana: 'かぞくで だれが いちばん せが たかいですか。…おとうとが いちばん せが たかいです。', romaji: 'Kazoku de dare ga ichiban se ga takai desu ka. ...Otouto ga ichiban se ga takai desu.', english: 'Who is the tallest in your family? ...My younger brother is.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l12_ex1',
        lessonNumber: 12,
        type: 'mcq',
        category: 'grammar',
        prompt: 'Choose the correct past affirmative form of いい (good):',
        options: ['よかったです', 'いかったです', 'いいでした', 'よくでした'],
        correctAnswer: 'よかったです',
        explanation: 'The adjective いい irregular past form is よかったです (and negative is よくなかったです).'
      },
      {
        id: 'l12_ex2',
        lessonNumber: 12,
        type: 'fill_blank',
        category: 'grammar',
        prompt: 'Fill in the blank: 北海道は 九州 [ ? ] 大きいです。 (Hokkaido is bigger than Kyushu.)',
        options: ['より', 'のほう', 'どちら', 'いちばん'],
        correctAnswer: 'より',
        explanation: 'より means "than" in comparative sentences (N1 は N2 より Adj です).'
      },
      {
        id: 'l12_ex3',
        lessonNumber: 12,
        type: 'mcq',
        category: 'grammar',
        prompt: 'Which sentence correctly answers "肉と 魚と どちらが 好きですか"?',
        options: [
          '肉の ほうが 好きです。',
          '肉より 好きです。',
          '肉が いちばん どちらです。',
          '肉は 魚が好きです。'
        ],
        correctAnswer: '肉の ほうが 好きです。',
        explanation: 'In response to どちらが, you use "[Choice] の ほうが [Adj] です".'
      }
    ],
    dialogue: {
      title: '祇園祭はどうでしたか (How was the Festival?)',
      situation: 'Mr. Miller returns home to his apartment and gives a Kyoto souvenir to the janitor, discussing the Gion Festival.',
      lines: [
        { speaker: 'ミラー', japanese: 'ただいま。', hiragana: 'ただいま。', english: "Hello. (I'm home.)" },
        { speaker: '管理人', japanese: 'お帰りなさい。', hiragana: 'おかえりなさい。', english: 'Hello. (Welcome home.)' },
        { speaker: 'ミラー', japanese: 'これ、京都の お土産です。', hiragana: 'これ、きょうとの おみやげです。', english: 'This is a souvenir from Kyoto.' },
        { speaker: '管理人', japanese: 'どうも ありがとう ございます。祇園祭は どうでしたか。', hiragana: 'どうも ありがとう ございます。ぎおんまつりは どうでしたか。', english: 'Thank you. How was the Gion Festival?' },
        { speaker: 'ミラー', japanese: 'とても おもしろかったです。外国人も 多かったですよ。', hiragana: 'とても おもしろかったです。がいこくじんも おおかったですよ。', english: 'It was very interesting. There were a lot of foreign visitors.' },
        { speaker: '管理人', japanese: '祇園祭は 京都の 祭りで いちばん 有名ですからね。', hiragana: 'ぎおんまつりは きょうとの まつりで いちばん ゆうめいですかね。', english: 'The Gion Festival is the most famous of all festivals in Kyoto.' },
        { speaker: 'ミラー', japanese: 'そうですか。写真、100枚ぐらい 撮りましたよ。', hiragana: 'そうですか。しゃしん、ひゃくまいぐらい とりましたよ。', english: 'Is that so? I took about a hundred photos.' },
        { speaker: '管理人', japanese: 'すごいですね！', hiragana: 'すごいですね！', english: 'Amazing!' },
        { speaker: 'ミラー', japanese: 'ええ。でも、ちょっと 疲れました。', hiragana: 'ええ。でも、ちょっと つかれました。', english: 'Yes. But it made me a bit tired.' }
      ]
    }
  },

  // =========================================================================
  // LESSON 13: Desires (欲しい、〜たい) & Purpose of Movement (〜に行く)
  // Textbook Reference: Pages 104–109
  // =========================================================================
  {
    id: 13,
    lessonNumber: 13,
    level: 'N5',
    title: 'Lesson 13: Desires (〜が欲しい・〜たい) & Purpose of Movement',
    titleJapanese: '第１３課：願望（〜が欲しい・〜たい）・移動の目的（〜へ〜に行きます）',
    theme: 'わたしはパソコンが欲しいです、てんぷらを食べたいです、フランスへ料理を習いに行きます',
    description: 'Learn expressing desires for objects with 欲しい and actions with V-たい, along with expressing the purpose of movement using [Verb-stem / Noun] に 行きます／来ます／帰ります.',
    keyPhrases: [
      'わたしは パソコンが 欲しいです。 (I want a personal computer.)',
      'わたしは てんぷらを 食べたいです。 (I want to eat tempura.)',
      'わたしは フランスへ 料理を 習いに 行きます。 (I will go to France to study cooking.)',
      '今 何が いちばん 欲しいですか。…うちが 欲しいです。 (What do you want most now? ...I want a house.)',
      '夏休みに どこへ 行きたいですか。…沖縄へ 行きたいです。 (Where do you want to go on summer vacation? ...I want to go to Okinawa.)',
      'のどが かわきましたから、何か 飲みたいです。 (I am thirsty, so I want to drink something.)'
    ],
    vocabulary: [
      { id: 'l13_v1', lessonNumber: 13, kanji: '遊びます', hiragana: 'あそびます', romaji: 'asobimasu', english: 'enjoy oneself, play', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l13_v2', lessonNumber: 13, kanji: '泳ぎます', hiragana: 'およぎます', romaji: 'oyogimasu', english: 'swim', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l13_v3', lessonNumber: 13, kanji: '迎えます', hiragana: 'むかえます', romaji: 'mukaemasu', english: 'go to meet, welcome', partOfSpeech: 'verb-2', category: 'Verbs' },
      { id: 'l13_v4', lessonNumber: 13, kanji: '疲れます', hiragana: 'つかれます', romaji: 'tsukaremasu', english: 'get tired', partOfSpeech: 'verb-2', category: 'Verbs' },
      { id: 'l13_v5', lessonNumber: 13, kanji: '出します', hiragana: 'だします', romaji: 'dashimasu', english: 'send [a letter]', partOfSpeech: 'verb-1', category: 'Verbs', notes: '[手紙を〜] send [a letter]' },
      { id: 'l13_v6', lessonNumber: 13, kanji: '入ります', hiragana: 'はいります', romaji: 'hairimasu', english: 'enter [a coffee shop]', partOfSpeech: 'verb-1', category: 'Verbs', notes: '[喫茶店に〜] enter [a coffee shop]' },
      { id: 'l13_v7', lessonNumber: 13, kanji: '出ます', hiragana: 'でます', romaji: 'demasu', english: 'go out [of a coffee shop]', partOfSpeech: 'verb-2', category: 'Verbs', notes: '[喫茶店を〜] go out [of a coffee shop]' },
      { id: 'l13_v8', lessonNumber: 13, kanji: '結婚します', hiragana: 'けっこんします', romaji: 'kekkonshimasu', english: 'marry, get married', partOfSpeech: 'verb-3', category: 'Verbs' },
      { id: 'l13_v9', lessonNumber: 13, kanji: '買い物します', hiragana: 'かいものします', romaji: 'kaimonoshimasu', english: 'do shopping', partOfSpeech: 'verb-3', category: 'Verbs' },
      { id: 'l13_v10', lessonNumber: 13, kanji: '食事します', hiragana: 'しょくじします', romaji: 'shokujishimasu', english: 'have a meal, dine', partOfSpeech: 'verb-3', category: 'Verbs' },
      { id: 'l13_v11', lessonNumber: 13, kanji: '散歩します', hiragana: 'さんぽします', romaji: 'sanposhimasu', english: 'take a walk [in a park]', partOfSpeech: 'verb-3', category: 'Verbs', notes: '[公園を〜] take a walk [in a park]' },
      { id: 'l13_v12', lessonNumber: 13, kanji: '大変[な]', hiragana: 'たいへん[な]', romaji: 'taihen[na]', english: 'hard, tough, severe, awful', partOfSpeech: 'na-adjective', category: 'Adjectives' },
      { id: 'l13_v13', lessonNumber: 13, kanji: '欲しい', hiragana: 'ほしい', romaji: 'hoshii', english: 'want (something)', partOfSpeech: 'i-adjective', category: 'Desires' },
      { id: 'l13_v14', lessonNumber: 13, kanji: '寂しい', hiragana: 'さびしい', romaji: 'sabishii', english: 'lonely', partOfSpeech: 'i-adjective', category: 'Adjectives' },
      { id: 'l13_v15', lessonNumber: 13, kanji: '広い', hiragana: 'ひろい', romaji: 'hiroi', english: 'wide, spacious', partOfSpeech: 'i-adjective', category: 'Adjectives' },
      { id: 'l13_v16', lessonNumber: 13, kanji: '狭い', hiragana: 'せまい', romaji: 'semai', english: 'narrow, small (room, etc.)', partOfSpeech: 'i-adjective', category: 'Adjectives' },
      { id: 'l13_v17', lessonNumber: 13, kanji: '市役所', hiragana: 'しやくしょ', romaji: 'shiyakusho', english: 'municipal office, city hall', partOfSpeech: 'noun', category: 'Town' },
      { id: 'l13_v18', lessonNumber: 13, kanji: 'プール', hiragana: 'プール', romaji: 'puuru', english: 'swimming pool', partOfSpeech: 'noun', category: 'Town' },
      { id: 'l13_v19', lessonNumber: 13, kanji: '川', hiragana: 'かわ', romaji: 'kawa', english: 'river', partOfSpeech: 'noun', category: 'Nature' },
      { id: 'l13_v20', lessonNumber: 13, kanji: '経済', hiragana: 'けいざい', romaji: 'keizai', english: 'economy, economics', partOfSpeech: 'noun', category: 'Subjects' },
      { id: 'l13_v21', lessonNumber: 13, kanji: '美術', hiragana: 'びじゅつ', romaji: 'bijutsu', english: 'fine arts', partOfSpeech: 'noun', category: 'Subjects' },
      { id: 'l13_v22', lessonNumber: 13, kanji: '釣り', hiragana: 'つり', romaji: 'tsuri', english: 'fishing (~を します: fish, angle)', partOfSpeech: 'noun', category: 'Hobbies' },
      { id: 'l13_v23', lessonNumber: 13, kanji: 'スキー', hiragana: 'スキー', romaji: 'sukii', english: 'skiing (~を します: ski)', partOfSpeech: 'noun', category: 'Hobbies' },
      { id: 'l13_v24', lessonNumber: 13, kanji: '会議', hiragana: 'かいぎ', romaji: 'kaigi', english: 'meeting, conference (~を します: hold a conference)', partOfSpeech: 'noun', category: 'Business' },
      { id: 'l13_v25', lessonNumber: 13, kanji: '登録', hiragana: 'とうろく', romaji: 'touroku', english: 'registration (~を します: register)', partOfSpeech: 'noun', category: 'General' },
      { id: 'l13_v26', lessonNumber: 13, kanji: '週末', hiragana: 'しゅうまつ', romaji: 'shuumatsu', english: 'weekend', partOfSpeech: 'noun', category: 'Time' },
      { id: 'l13_v27', lessonNumber: 13, kanji: '〜ごろ', hiragana: '〜ごろ', romaji: '-goro', english: 'about (time)', partOfSpeech: 'particle', category: 'Time' },
      { id: 'l13_v28', lessonNumber: 13, kanji: '何か', hiragana: 'なにか', romaji: 'nanika', english: 'something', partOfSpeech: 'phrase', category: 'Expressions' },
      { id: 'l13_v29', lessonNumber: 13, kanji: 'どこか', hiragana: 'どこか', romaji: 'dokoka', english: 'somewhere, some place', partOfSpeech: 'phrase', category: 'Expressions' },
      { id: 'l13_v30', lessonNumber: 13, kanji: 'お腹が すきました。', hiragana: 'おなかが すきました。', romaji: 'Onaka ga sukimashita.', english: "(I'm) hungry.", partOfSpeech: 'phrase', category: 'Expressions' },
      { id: 'l13_v31', lessonNumber: 13, kanji: 'お腹が いっぱいです。', hiragana: 'おなかが いっぱいです。', romaji: 'Onaka ga ippai desu.', english: "(I'm) full.", partOfSpeech: 'phrase', category: 'Expressions' },
      { id: 'l13_v32', lessonNumber: 13, kanji: 'のどが かわきました。', hiragana: 'のどが かわきました。', romaji: 'Nodo ga kawakimashita.', english: "(I'm) thirsty.", partOfSpeech: 'phrase', category: 'Expressions' },
      { id: 'l13_v33', lessonNumber: 13, kanji: 'そうですね。', hiragana: 'そうですね。', romaji: 'Sou desu ne.', english: 'I agree with you.', partOfSpeech: 'phrase', category: 'Conversations' },
      { id: 'l13_v34', lessonNumber: 13, kanji: 'そう しましょう。', hiragana: 'そう しましょう。', romaji: 'Sou shimashou.', english: "Let's do that. (agreeing with suggestion)", partOfSpeech: 'phrase', category: 'Conversations' },
      { id: 'l13_v35', lessonNumber: 13, kanji: 'ご注文は？', hiragana: 'ごちゅうもんは？', romaji: 'Gochuumon wa?', english: 'May I take your order?', partOfSpeech: 'phrase', category: 'Conversations' },
      { id: 'l13_v36', lessonNumber: 13, kanji: '定食', hiragana: 'ていしょく', romaji: 'teishoku', english: 'set meal', partOfSpeech: 'noun', category: 'Food' },
      { id: 'l13_v37', lessonNumber: 13, kanji: '牛どん', hiragana: 'ぎゅうどん', romaji: 'gyuudon', english: 'bowl of rice topped with beef', partOfSpeech: 'noun', category: 'Food' },
      { id: 'l13_v38', lessonNumber: 13, kanji: '[少々] お待ちください。', hiragana: '[しょうしょう] おまちください。', romaji: '[Shoushou] omachi kudasai.', english: 'Please wait [a moment].', partOfSpeech: 'phrase', category: 'Conversations' },
      { id: 'l13_v39', lessonNumber: 13, kanji: '別々に', hiragana: 'べつべつに', romaji: 'betsubetsu ni', english: 'separately', partOfSpeech: 'adverb', category: 'Expressions' },
      { id: 'l13_v40', lessonNumber: 13, kanji: 'ロシア', hiragana: 'ロシア', romaji: 'Roshia', english: 'Russia', partOfSpeech: 'noun', category: 'Countries' }
    ],
    grammar: [
      {
        id: 'l13_g1',
        lessonNumber: 13,
        title: 'N が 欲しいです (Desire for an Object)',
        structure: 'Noun + が + 欲しいです',
        explanation: 'Used to express the speaker\'s desire to possess or have an object. The target of desire is marked with particle が. ほしい inflects as an い-adjective (欲しくないです、欲しかったです).',
        rules: [
          'わたしは 友達が 欲しいです (I want friends).',
          '今 何が いちばん 欲しいですか (What do you want most now?).',
          'Note: Cannot be used directly to describe a third person\'s desire.'
        ],
        examples: [
          { japanese: 'わたしは 友達が 欲しいです。', hiragana: 'わたしは ともだちが ほしいです。', romaji: 'Watashi wa tomodachi ga hoshii desu.', english: 'I want a friend.' },
          { japanese: '今 何が いちばん 欲しいですか。…車が 欲しいです。', hiragana: 'いま なにが いちばん ほしいですか。…くるまが ほしいです。', romaji: 'Ima nani ga ichiban hoshii desu ka. ...Kuruma ga hoshii desu.', english: 'What do you want most now? ...I want a car.' }
        ]
      },
      {
        id: 'l13_g2',
        lessonNumber: 13,
        title: 'V ます-form たいです (Desire to Do an Action)',
        structure: 'Verb [ます-stem] + たいです',
        explanation: 'Expresses the speaker\'s desire to do something. The verb ます-form without ます is called the ます-stem. The particle を can be replaced by が before 〜たいです.',
        rules: [
          'たべます -> たべたいです (want to eat).',
          'いきます -> いきたいです (want to go).',
          'てんぷらを 食べたいです / てんぷらが 食べたいです (Both are acceptable).',
          'Other particles (に、へ、で) cannot be replaced by が.',
          'Inflects like an い-adjective: 食べたくないです (do not want to eat).'
        ],
        examples: [
          { japanese: 'わたしは 沖縄へ 行きたいです。', hiragana: 'わたしは おきなわへ いきたいです。', romaji: 'Watashi wa Okinawa e ikitai desu.', english: 'I want to go to Okinawa.' },
          { japanese: 'わたしは てんぷらを 食べたいです。', hiragana: 'わたしは てんぷらを たべたいです。', romaji: 'Watashi wa tenpura o tabetai desu.', english: 'I want to eat tempura.' },
          { japanese: 'お腹が 痛いですから、何も 食べたくないです。', hiragana: 'おなかが いたいですから、なにも たべたくないです。', romaji: 'Onaka ga itai desu kara, nani mo tabetakunai desu.', english: "Because I have a stomachache, I don't want to eat anything." }
        ]
      },
      {
        id: 'l13_g3',
        lessonNumber: 13,
        title: 'N (place) へ V ます-form / N に 行きます/来ます/帰ります (Purpose of Movement)',
        structure: 'Place + へ + [Verb ます-stem / Action Noun] + に + 行きます / 来ます / 帰ります',
        explanation: 'Indicates the purpose for which someone goes, comes, or returns. The purpose is marked with the particle に.',
        rules: [
          '神戸へ インド料理を 食べに 行きます (I go to Kobe to eat Indian food).',
          '神戸へ 買い物に 行きます (I go to Kobe for shopping).',
          '日本へ 美術の 勉強に 来ました (I came to Japan to study art).',
          'Events like festivals or concerts can also be used: 京都の お祭りに 行きます.'
        ],
        examples: [
          { japanese: '神戸へ インド料理を 食べに 行きます。', hiragana: 'こうべへ いんどりょうりを たべに いきます。', romaji: 'Koube e Indo ryouri o tabe ni ikimasu.', english: "I'm going to Kobe to eat Indian food." },
          { japanese: '日本へ 美術の 勉強に 来ました。', hiragana: 'にほんへ びじゅつの べんきょうに きました。', romaji: 'Nihon e bijutsu no benkyou ni kimashita.', english: 'I came to Japan to study art.' },
          { japanese: 'あした 京都の お祭りに 行きます。', hiragana: 'あした きょうとの おまつりに いきます。', romaji: 'Ashita Kyouto no omatsuri ni ikimasu.', english: "I'll go to the festival in Kyoto tomorrow." }
        ]
      },
      {
        id: 'l13_g4',
        lessonNumber: 13,
        title: 'N に 入ります / N を 出ます (Goal に vs Starting Point を)',
        structure: 'Place + に + 入ります | Place + を + 出ます',
        explanation: 'Particle に marks the goal/destination of entering (はいります), while を marks the starting point/place left behind (でます).',
        rules: [
          '喫茶店に 入ります (Enter a coffee shop).',
          '７時に うちを 出ます (Leave my house at 7 o\'clock).'
        ],
        examples: [
          { japanese: 'あの 喫茶店に 入りましょう。', hiragana: 'あの きっさてんに はいりましょう。', romaji: 'Ano kissaten ni hairimashou.', english: "Let's go into that coffee shop." },
          { japanese: '７時に うちを 出ます。', hiragana: 'しちじに うちを でます。', romaji: 'Shichi-ji ni uchi o demasu.', english: 'I leave my house at 7 o\'clock.' }
        ]
      },
      {
        id: 'l13_g5',
        lessonNumber: 13,
        title: 'どこか / 何か (Somewhere / Something)',
        structure: 'どこか [へ] / 何か [を]',
        explanation: 'どこか means "somewhere / anywhere" and 何か means "something / anything". The particles へ and を are frequently omitted after them.',
        rules: [
          '冬休みは どこか [へ] 行きましたか (Did you go anywhere during winter vacation?).',
          'のどが かわきましたから、何か [を] 飲みたいです (I am thirsty, so I want to drink something).'
        ],
        examples: [
          { japanese: '冬休みは どこか 行きましたか。…はい、行きました。', hiragana: 'ふゆやすみは どこか いきましたか。…はい、いきました。', romaji: 'Fuyuyasumi wa dokoka ikimashita ka. ...Hai, ikimashita.', english: 'Did you go anywhere during winter vacation? ...Yes, I did.' },
          { japanese: 'のどが かわきましたから、何か 飲みたいです。', hiragana: 'のどが かわきましたから、なにか のみたいです。', romaji: 'Nodo ga kawakimashita kara, nanika nomitai desu.', english: "I'm thirsty, so I want to drink something." }
        ]
      }
    ],
    exercises: [
      {
        id: 'l13_ex1',
        lessonNumber: 13,
        type: 'mcq',
        category: 'grammar',
        prompt: 'Choose the correct sentence meaning "I want to buy a camera":',
        options: [
          'カメラを 買いたいです。',
          'カメラを 買いますたいです。',
          'カメラが 買いたいです。',
          'Both A and C are correct.'
        ],
        correctAnswer: 'Both A and C are correct.',
        explanation: 'With 〜たいです, the direct object particle can be either を or が.'
      },
      {
        id: 'l13_ex2',
        lessonNumber: 13,
        type: 'fill_blank',
        category: 'grammar',
        prompt: 'Fill in the blank: デパートへ 買い物 [ ? ] 行きます。 (I go to the department store to shop.)',
        options: ['に', 'を', 'で', 'へ'],
        correctAnswer: 'に',
        explanation: 'Purpose of movement is marked by particle に after a noun or verb-stem.'
      },
      {
        id: 'l13_ex3',
        lessonNumber: 13,
        type: 'mcq',
        category: 'vocabulary',
        prompt: 'What does "お腹が すきました" mean?',
        options: ['I am hungry', 'I am thirsty', 'I am tired', 'I am sick'],
        correctAnswer: 'I am hungry',
        explanation: 'おなかが すきました means "I am hungry" (lit. my stomach became empty).'
      }
    ],
    dialogue: {
      title: '別々に お願いします (Charge us separately)',
      situation: 'Mr. Yamada and Mr. Miller go to a Japanese restaurant "Tsuru-ya" for lunch and ask to pay separately at the cashier.',
      lines: [
        { speaker: '山田', japanese: 'もう 12時ですね。昼ごはんを 食べに 行きませんか。', hiragana: 'もう じゅうにじですね。ひるごはんを たべに いきませんか。', english: "Why, it's already twelve. Shall we go for lunch?" },
        { speaker: 'ミラー', japanese: 'ええ。どこへ 行きますか。', hiragana: 'ええ。どこへ いきますか。', english: 'Sure. Where shall we go?' },
        { speaker: '山田', japanese: 'そうですね。今日は 日本料理が 食べたいですね。', hiragana: 'そうですね。きょうは にほんりょうりが たべたいですね。', english: 'Let me see. Today I want to eat Japanese food.' },
        { speaker: 'ミラー', japanese: 'じゃ、「つるや」へ 行きましょう。', hiragana: 'じゃ、「つるや」へ いきましょう。', english: 'Then, let\'s go to "Tsuru-ya".' },
        { speaker: '店員', japanese: 'ご注文は？', hiragana: 'ごちゅうもんは？', english: 'May I take your order?' },
        { speaker: 'ミラー', japanese: 'わたしは てんぷら定食。', hiragana: 'わたしは てんぷらていしょく。', english: "I'll have the tempura set lunch." },
        { speaker: '山田', japanese: 'わたしは 牛どんに します。', hiragana: 'わたしは ぎゅうどんに します。', english: "I'll have the gyudon." },
        { speaker: '店員', japanese: '少々 お待ちください。', hiragana: 'しょうしょう おまちください。', english: 'Please wait a moment.' },
        { speaker: 'レジ係', japanese: '全部で 1,680円で ございます。', hiragana: 'ぜんぶで せんろっぴゃくはちじゅうえんで ございます。', english: '1,680 yen altogether, sir.' },
        { speaker: 'ミラー', japanese: 'すみません。別々に お願いします。', hiragana: 'すみません。べつべつに おねがいします。', english: 'Excuse me. Please charge us separately.' },
        { speaker: 'レジ係', japanese: 'はい。てんぷら定食は 980円、牛どんは 700円です。', hiragana: 'はい。てんぷらていしょくは きゅうひゃくはちじゅうえん、ぎゅうどんは ななひゃくえんです。', english: 'Right. 980 yen for the tempura set lunch, 700 yen for the gyudon.' }
      ]
    }
  },

  // =========================================================================
  // LESSON 14: Verb Groups, Te-Form, Requests (てください), Ongoing Actions (ています)
  // Textbook Reference: Pages 110–115
  // =========================================================================
  {
    id: 14,
    lessonNumber: 14,
    level: 'N5',
    title: 'Lesson 14: Verb Groups, Te-Form Conjugation & Requests (〜てください)',
    titleJapanese: '第１４課：動詞のグループ・て形・〜てください・〜ています・〜ましょうか',
    theme: 'ちょっと待ってください、ミラーさんは今電話をかけています、窓を開けましょうか',
    description: 'Learn the foundational 3 Verb Groups of Japanese, conjugate the essential Te-form (て形), make polite requests with 〜てください, describe actions in progress with 〜ています, and offer help with 〜ましょうか.',
    keyPhrases: [
      'ちょっと 待って ください。 (Wait a moment, please.)',
      'ミラーさんは 今 電話を かけて います。 (Mr. Miller is making a telephone call now.)',
      'ここに 名前と 住所を 書いて ください。 (Please write your name and address here.)',
      'あの シャツを 見せて ください。 (Please show me that shirt.)',
      '窓を 開けましょうか。…ええ、お願いします。 (Shall I open the window? ...Yes, please.)',
      '雨が 降って います。 (It is raining.)'
    ],
    vocabulary: [
      { id: 'l14_v1', lessonNumber: 14, kanji: 'つけます II', hiragana: 'つけます', romaji: 'tsukemasu', english: 'turn on (lights, appliances)', partOfSpeech: 'verb-2', category: 'Verbs' },
      { id: 'l14_v2', lessonNumber: 14, kanji: '消します I', hiragana: 'けします', romaji: 'keshimasu', english: 'turn off (lights, appliances)', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l14_v3', lessonNumber: 14, kanji: '開けます II', hiragana: 'あけます', romaji: 'akemasu', english: 'open (door, window)', partOfSpeech: 'verb-2', category: 'Verbs' },
      { id: 'l14_v4', lessonNumber: 14, kanji: '閉めます II', hiragana: 'しめます', romaji: 'shimemasu', english: 'close, shut', partOfSpeech: 'verb-2', category: 'Verbs' },
      { id: 'l14_v5', lessonNumber: 14, kanji: '急ぎます I', hiragana: 'いそぎます', romaji: 'isogimasu', english: 'hurry', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l14_v6', lessonNumber: 14, kanji: '待ちます I', hiragana: 'まちます', romaji: 'machimasu', english: 'wait', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l14_v7', lessonNumber: 14, kanji: '止めます II', hiragana: 'とめます', romaji: 'tomemasu', english: 'stop, park (car)', partOfSpeech: 'verb-2', category: 'Verbs' },
      { id: 'l14_v8', lessonNumber: 14, kanji: '曲がります I', hiragana: 'まがります', romaji: 'magarimasu', english: 'turn [to the right]', partOfSpeech: 'verb-1', category: 'Verbs', notes: '[右へ〜] turn [to the right]' },
      { id: 'l14_v9', lessonNumber: 14, kanji: '持ちます I', hiragana: 'もちます', romaji: 'mochimasu', english: 'hold, have', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l14_v10', lessonNumber: 14, kanji: '取ります I', hiragana: 'とります', romaji: 'torimasu', english: 'take, pass (salt, sugar)', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l14_v11', lessonNumber: 14, kanji: '手伝います I', hiragana: 'てつだいます', romaji: 'tetsudaimasu', english: 'help (with a task)', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l14_v12', lessonNumber: 14, kanji: '呼びます I', hiragana: 'よびます', romaji: 'yobimasu', english: 'call (taxi, person)', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l14_v13', lessonNumber: 14, kanji: '話します I', hiragana: 'はなします', romaji: 'hanashimasu', english: 'speak, talk', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l14_v14', lessonNumber: 14, kanji: '見せます II', hiragana: 'みせます', romaji: 'misemasu', english: 'show', partOfSpeech: 'verb-2', category: 'Verbs' },
      { id: 'l14_v15', lessonNumber: 14, kanji: '教えます II', hiragana: 'おしえます', romaji: 'oshiemasu', english: 'tell [an address], teach', partOfSpeech: 'verb-2', category: 'Verbs', notes: '[住所を〜] tell [an address]' },
      { id: 'l14_v16', lessonNumber: 14, kanji: '始めます II', hiragana: 'はじめます', romaji: 'hajimemasu', english: 'start, begin', partOfSpeech: 'verb-2', category: 'Verbs' },
      { id: 'l14_v17', lessonNumber: 14, kanji: '降ります I', hiragana: 'ふります', romaji: 'furimasu', english: 'rain, fall [rain, snow]', partOfSpeech: 'verb-1', category: 'Verbs', notes: '[雨が〜] rain' },
      { id: 'l14_v18', lessonNumber: 14, kanji: 'コピーします III', hiragana: 'コピーします', romaji: 'kopiishimasu', english: 'copy, photocopy', partOfSpeech: 'verb-3', category: 'Verbs' },
      { id: 'l14_v19', lessonNumber: 14, kanji: 'エアコン', hiragana: 'エアコン', romaji: 'eakon', english: 'air conditioner', partOfSpeech: 'noun', category: 'Objects' },
      { id: 'l14_v20', lessonNumber: 14, kanji: 'パスポート', hiragana: 'パスポート', romaji: 'pasupooto', english: 'passport', partOfSpeech: 'noun', category: 'Objects' },
      { id: 'l14_v21', lessonNumber: 14, kanji: '名前', hiragana: 'なまえ', romaji: 'namae', english: 'name', partOfSpeech: 'noun', category: 'General' },
      { id: 'l14_v22', lessonNumber: 14, kanji: '住所', hiragana: 'じゅうしょ', romaji: 'juusho', english: 'address', partOfSpeech: 'noun', category: 'General' },
      { id: 'l14_v23', lessonNumber: 14, kanji: '地図', hiragana: 'ちず', romaji: 'chizu', english: 'map', partOfSpeech: 'noun', category: 'Objects' },
      { id: 'l14_v24', lessonNumber: 14, kanji: '塩', hiragana: 'しお', romaji: 'shio', english: 'salt', partOfSpeech: 'noun', category: 'Food' },
      { id: 'l14_v25', lessonNumber: 14, kanji: '砂糖', hiragana: 'さとう', romaji: 'satou', english: 'sugar', partOfSpeech: 'noun', category: 'Food' },
      { id: 'l14_v26', lessonNumber: 14, kanji: '読み方', hiragana: 'よみかた', romaji: 'yomikata', english: 'how to read, way of reading', partOfSpeech: 'noun', category: 'General' },
      { id: 'l14_v27', lessonNumber: 14, kanji: '〜方', hiragana: '〜かた', romaji: '-kata', english: 'how to ~, way of ~ing', partOfSpeech: 'phrase', category: 'Grammar' },
      { id: 'l14_v28', lessonNumber: 14, kanji: 'ゆっくり', hiragana: 'ゆっくり', romaji: 'yukkuri', english: 'slowly, leisurely', partOfSpeech: 'adverb', category: 'Manner' },
      { id: 'l14_v29', lessonNumber: 14, kanji: 'すぐ', hiragana: 'すぐ', romaji: 'sugu', english: 'immediately, at once', partOfSpeech: 'adverb', category: 'Time' },
      { id: 'l14_v30', lessonNumber: 14, kanji: 'また', hiragana: 'また', romaji: 'mata', english: 'again', partOfSpeech: 'adverb', category: 'Frequency' },
      { id: 'l14_v31', lessonNumber: 14, kanji: 'あとで', hiragana: 'あとで', romaji: 'ato de', english: 'later', partOfSpeech: 'adverb', category: 'Time' },
      { id: 'l14_v32', lessonNumber: 14, kanji: 'もう少し', hiragana: 'もうすこし', romaji: 'mou sukoshi', english: 'a little more', partOfSpeech: 'adverb', category: 'Degree' },
      { id: 'l14_v33', lessonNumber: 14, kanji: 'もう 〜', hiragana: 'もう 〜', romaji: 'mou ~', english: '~ more, another ~', partOfSpeech: 'adverb', category: 'Degree' },
      { id: 'l14_v34', lessonNumber: 14, kanji: 'いいですよ。', hiragana: 'いいですよ。', romaji: 'Ii desu yo.', english: 'Sure. / Certainly.', partOfSpeech: 'phrase', category: 'Conversations' },
      { id: 'l14_v35', lessonNumber: 14, kanji: 'さあ', hiragana: 'さあ', romaji: 'saa', english: 'right, come on (encouraging action)', partOfSpeech: 'phrase', category: 'Conversations' },
      { id: 'l14_v36', lessonNumber: 14, kanji: 'あれ？', hiragana: 'あれ？', romaji: 'Are?', english: 'Oh! (in surprise or wonder)', partOfSpeech: 'phrase', category: 'Conversations' },
      { id: 'l14_v37', lessonNumber: 14, kanji: '信号を 右へ 曲がって ください。', hiragana: 'しんごうを みぎへ まがって ください。', romaji: 'Shingou o migi e magatte kudasai.', english: 'Turn to the right at the signal.', partOfSpeech: 'phrase', category: 'Conversations' },
      { id: 'l14_v38', lessonNumber: 14, kanji: 'まっすぐ', hiragana: 'まっすぐ', romaji: 'massugu', english: 'straight ahead', partOfSpeech: 'adverb', category: 'Directions' },
      { id: 'l14_v39', lessonNumber: 14, kanji: 'これで お願いします。', hiragana: 'これで おねがいします。', romaji: 'Kore de onegaishimasu.', english: "I'd like to pay with this.", partOfSpeech: 'phrase', category: 'Conversations' },
      { id: 'l14_v40', lessonNumber: 14, kanji: 'お釣り', hiragana: 'おつり', romaji: 'otsuri', english: 'change (money returned)', partOfSpeech: 'noun', category: 'Money' },
      { id: 'l14_v41', lessonNumber: 14, kanji: '梅田', hiragana: 'うめだ', romaji: 'Umeda', english: 'Umeda (famous commercial district in Osaka)', partOfSpeech: 'noun', category: 'Places' }
    ],
    grammar: [
      {
        id: 'l14_g1',
        lessonNumber: 14,
        title: '動詞のグループとて形の作り方 (Verb Groups & Te-form Conjugation)',
        structure: 'Group I: [い-line] -> [って/んで/いて/いで/して] | Group II: -ます -> -て | Group III: して/きて',
        explanation: 'Japanese verbs are categorized into three groups based on their conjugation patterns.',
        rules: [
          'Group I (五段動詞): The syllable before ます belongs to the い-line. Conjugation to て-form:',
          '  ・ い, ち, り + ます -> って (買います->買って, 待ちます->待って, 取ります->取って)',
          '  ・ み, び, に + ます -> んで (飲みます->飲んで, 呼びます->呼んで)',
          '  ・ き + ます -> いて (書きます->書いて) *EXCEPTION: 行きます -> 行って',
          '  ・ ぎ + ます -> いで (急ぎます->急いで)',
          '  ・ し + ます -> して (話します->話して)',
          'Group II (一段動詞): The syllable before ます belongs to the え-line (食べます, 閉めます) OR special exceptions on the い-line (見ます, います, 起きます, 借ります, 降ります). Formed by attaching て directly to the stem: たべて, みて.',
          'Group III (不規則動詞): します -> して, 来ます (きます) -> 来て (きて).'
        ],
        examples: [
          { japanese: 'かきます（書きます）→ かいて', hiragana: 'かきます → かいて', romaji: 'kakimasu -> kaite', english: 'write -> write (te-form)' },
          { japanese: 'のみます（飲みます）→ のんで', hiragana: 'のみます → のんで', romaji: 'nomimasu -> nonde', english: 'drink -> drink (te-form)' },
          { japanese: 'いきます（行きます）→ いって [例外]', hiragana: 'いきます → いって', romaji: 'ikimasu -> itte [exception]', english: 'go -> go (te-form, exception)' }
        ]
      },
      {
        id: 'l14_g2',
        lessonNumber: 14,
        title: 'V て-form ください (Polite Request: Please do...)',
        structure: 'Verb [て-form] + ください',
        explanation: 'Used to ask, instruct, or encourage the listener to do something. For added politeness, prepend すみませんが (Excuse me, but...).',
        rules: [
          'ここに 名前を 書いて ください (Please write your name here).',
          'ちょっと 待って ください (Please wait a moment).',
          'Note: Do not use this pattern to superiors when giving direct instructions.'
        ],
        examples: [
          { japanese: 'すみませんが、この 漢字の 読み方を 教えて ください。', hiragana: 'すみませんが、この かんじの よみかたを おしえて ください。', romaji: 'Sumimasen ga, kono kanji no yomikata o oshiete kudasai.', english: 'Excuse me, could you tell me how to read this kanji, please?' },
          { japanese: 'ここに 住所と 名前を 書いて ください。', hiragana: 'ここに じゅうしょと なまえを かいて ください。', romaji: 'Koko ni juusho to namae o kaite kudasai.', english: 'Please write your name and address here.' }
        ]
      },
      {
        id: 'l14_g3',
        lessonNumber: 14,
        title: 'V て-form います (Action in Progress / Present Continuous)',
        structure: 'Verb [て-form] + います',
        explanation: 'Indicates that a certain action or motion is actively currently in progress (equivalent to English "-ing").',
        rules: [
          '今 電話を かけて います (Making a phone call right now).',
          '今 雨が 降って いますか。…はい、降って います (Is it raining now? ...Yes, it is).'
        ],
        examples: [
          { japanese: 'ミラーさんは 今 電話を かけて います。', hiragana: 'みらーさんは いま でんわを かけて います。', romaji: 'Miraa-san wa ima denwa o kakete imasu.', english: 'Mr. Miller is making a phone call now.' },
          { japanese: '今 雨が 降って いますか。…いいえ、降って いません。', hiragana: 'いま あめが ふって いますか。…いいえ、ふって いません。', romaji: 'Ima ame ga futte imasu ka. ...Iie, futte imasen.', english: 'Is it raining now? ...No, it is not.' }
        ]
      },
      {
        id: 'l14_g4',
        lessonNumber: 14,
        title: 'V ます-form ましょうか (Shall I...? Offering Assistance)',
        structure: 'Verb [ます-stem] + ましょうか',
        explanation: 'Used when the speaker is offering to do something for the listener.',
        rules: [
          '傘を 貸しましょうか。…ありがとうございます。お願いします (Shall I lend you an umbrella? ...Thank you. Please do).',
          '荷物を 持ちましょうか。…いいえ、結構です (Shall I carry your parcel? ...No, thank you).'
        ],
        examples: [
          { japanese: '暑いですね。窓を 開けましょうか。…ええ、お願いします。', hiragana: 'あついですね。まどを あけましょうか。…ええ、おねがいします。', romaji: 'Atsui desu ne. Mado o akemashou ka. ...Ee, onegaishimasu.', english: 'It is hot, isn\'t it? Shall I open the window? ...Yes, please.' },
          { japanese: '駅まで 迎えに 行きましょうか。…いいえ、結構です。タクシーで 行きますから。', hiragana: 'えきまで むかえに いきましょうか。…いいえ、けっこうです。たくしーで いきますから。', romaji: 'Eki made mukae ni ikimashou ka. ...Iie, kekkou desu. Takushii de ikimasu kara.', english: 'Shall I come to the station to pick you up? ...No, thank you. I will come by taxi.' }
        ]
      },
      {
        id: 'l14_g5',
        lessonNumber: 14,
        title: 'N が V (Subject of Natural Phenomena)',
        structure: 'Noun (Nature / Phenomenon) + が + Verb',
        explanation: 'When describing a natural phenomenon as an objective scene, the subject is marked by が rather than は.',
        rules: [
          '雨が 降って います (It is raining).',
          '雪が 降って います (It is snowing).'
        ],
        examples: [
          { japanese: '雨が 降って います。', hiragana: 'あめが ふって います。', romaji: 'Ame ga futte imasu.', english: 'It is raining.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l14_ex1',
        lessonNumber: 14,
        type: 'mcq',
        category: 'grammar',
        prompt: 'What is the correct Te-form of the irregular verb 行きます (to go)?',
        options: ['いって', 'いきて', 'いんで', 'いて'],
        correctAnswer: 'いって',
        explanation: '行きます (ikimasu) is an exception to the き->いて rule; its Te-form is 行って (itte).'
      },
      {
        id: 'l14_ex2',
        lessonNumber: 14,
        type: 'fill_blank',
        category: 'grammar',
        prompt: 'Fill in the blank: ちょっと 待って [ ? ]。 (Please wait a moment.)',
        options: ['ください', 'います', 'きましょう', 'たいです'],
        correctAnswer: 'ください',
        explanation: 'V-て + ください forms a polite request.'
      },
      {
        id: 'l14_ex3',
        lessonNumber: 14,
        type: 'mcq',
        category: 'grammar',
        prompt: 'How do you say "Shall I lend you an umbrella?" politely?',
        options: [
          '傘を 貸しましょうか。',
          '傘を 貸してください。',
          '傘を 貸しています。',
          '傘を 借りたいですか。'
        ],
        correctAnswer: '傘を 貸しましょうか。',
        explanation: '〜ましょうか is used to offer assistance to the listener.'
      }
    ],
    dialogue: {
      title: '梅田まで お願いします (To Umeda, please)',
      situation: 'Ms. Karina takes a taxi to Umeda, directs the driver at the intersection, and pays the fare.',
      lines: [
        { speaker: 'カリナ', japanese: '梅田まで お願いします。', hiragana: 'うめだまで おねがいします。', english: 'To Umeda, please.' },
        { speaker: '運転手', japanese: 'はい。', hiragana: 'はい。', english: 'Yes, ma\'am.' },
        { speaker: 'カリナ', japanese: 'すみません。あの信号を 右へ 曲がって ください。', hiragana: 'すみません。あのしんごうを みぎへ まがって ください。', english: 'Excuse me. Turn to the right at that traffic light.' },
        { speaker: '運転手', japanese: '右ですね。', hiragana: 'みぎですね。', english: 'To the right?' },
        { speaker: 'カリナ', japanese: 'ええ。それから、まっすぐ 行って ください。', hiragana: 'ええ。それから、まっすぐ いって ください。', english: 'Yes. Then go straight.' },
        { speaker: 'カリナ', japanese: 'あの 花屋の 前で 止めて ください。', hiragana: 'あの はなやの まえで とめて ください。', english: 'Stop in front of that flower shop.' },
        { speaker: '運転手', japanese: 'はい。1,800円です。', hiragana: 'はい。せんはっぴゃくえんです。', english: 'Yes. 1,800 yen, please.' },
        { speaker: 'カリナ', japanese: 'これで お願いします。', hiragana: 'これで おねがいします。', english: 'Here you are. (5,000 yen)' },
        { speaker: '運転手', japanese: '3,200円の お釣りです。ありがとう ございました。', hiragana: 'さんぜんにひゃくえんの おつりです。ありがとう ございました。', english: "That's 3,200 yen change. Thank you very much." }
      ]
    }
  },

  // =========================================================================
  // LESSON 15: Permission (てもいいです), Prohibition (てはいけません), Resultant State (ています)
  // Textbook Reference: Pages 116–121
  // =========================================================================
  {
    id: 15,
    lessonNumber: 15,
    level: 'N5',
    title: 'Lesson 15: Permission (〜てもいいです), Prohibition (〜てはいけません) & Resultant States',
    titleJapanese: '第１５課：許可（〜てもいいです）・禁止（〜てはいけません）・結果の状態・職業（〜ています）',
    theme: '写真を撮ってもいいです、ここでタバコを吸ってはいけません、わたしは大阪に住んでいます',
    description: 'Grant or ask permission with 〜てもいいですか, express prohibitions with 〜てはいけません, and describe continuing resultant states (住んでいます、結婚しています、知っています) and habitual occupations with 〜ています.',
    keyPhrases: [
      '写真を 撮っても いいです。 (You may take photographs.)',
      'ここで たばこを 吸っては いけません。 (You must not smoke here.)',
      'サントスさんは パソコンを 持って います。 (Mr. Santos has a personal computer.)',
      'この カタログを もらっても いいですか。…ええ、いいですよ。 (May I keep this catalog? ...Sure, please do.)',
      '市役所の 電話番号を 知って いますか。…いいえ、知りません。 (Do you know the city hall number? ...No, I don\'t.)',
      'マリアさんは どこに 住んで いますか。…大阪に 住んで います。 (Where do you live, Ms. Maria? ...I live in Osaka.)'
    ],
    vocabulary: [
      { id: 'l15_v1', lessonNumber: 15, kanji: '立ちます I', hiragana: 'たちます', romaji: 'tachimasu', english: 'stand up', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l15_v2', lessonNumber: 15, kanji: '座ります I', hiragana: 'すわります', romaji: 'suwarimasu', english: 'sit down', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l15_v3', lessonNumber: 15, kanji: '使います I', hiragana: 'つかいます', romaji: 'tsukaimasu', english: 'use', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l15_v4', lessonNumber: 15, kanji: '置きます I', hiragana: 'おきます', romaji: 'okimasu', english: 'put, place', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l15_v5', lessonNumber: 15, kanji: '作ります、造ります I', hiragana: 'つくります', romaji: 'tsukurimasu', english: 'make, produce', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l15_v6', lessonNumber: 15, kanji: '売ります I', hiragana: 'うります', romaji: 'urimasu', english: 'sell', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l15_v7', lessonNumber: 15, kanji: '知ります I', hiragana: 'しります', romaji: 'shirimasu', english: 'get to know', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l15_v8', lessonNumber: 15, kanji: '住みます I', hiragana: 'すみます', romaji: 'sumimasu', english: 'be going to live', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l15_v9', lessonNumber: 15, kanji: '研究します III', hiragana: 'けんきゅうします', romaji: 'kenkyuushimasu', english: 'do research', partOfSpeech: 'verb-3', category: 'Verbs' },
      { id: 'l15_v10', lessonNumber: 15, kanji: '知って います', hiragana: 'しって います', romaji: 'shitte imasu', english: 'know (state of knowing)', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l15_v11', lessonNumber: 15, kanji: '住んで います', hiragana: 'すんで います', romaji: 'sunde imasu', english: 'live [in Osaka]', partOfSpeech: 'verb-1', category: 'Verbs', notes: '[大阪に〜] live [in Osaka]' },
      { id: 'l15_v12', lessonNumber: 15, kanji: '資料', hiragana: 'しりょう', romaji: 'shiryou', english: 'materials, data', partOfSpeech: 'noun', category: 'Office' },
      { id: 'l15_v13', lessonNumber: 15, kanji: 'カタログ', hiragana: 'カタログ', romaji: 'katarogu', english: 'catalog', partOfSpeech: 'noun', category: 'Office' },
      { id: 'l15_v14', lessonNumber: 15, kanji: '時刻表', hiragana: 'じこくひょう', romaji: 'jikokuhyou', english: 'timetable', partOfSpeech: 'noun', category: 'Travel' },
      { id: 'l15_v15', lessonNumber: 15, kanji: '服', hiragana: 'ふく', romaji: 'fuku', english: 'clothes', partOfSpeech: 'noun', category: 'Clothes' },
      { id: 'l15_v16', lessonNumber: 15, kanji: '製品', hiragana: 'せいひん', romaji: 'seihin', english: 'products, manufactured goods', partOfSpeech: 'noun', category: 'Business' },
      { id: 'l15_v17', lessonNumber: 15, kanji: 'ソフト', hiragana: 'ソフト', romaji: 'sofuto', english: 'software', partOfSpeech: 'noun', category: 'Technology' },
      { id: 'l15_v18', lessonNumber: 15, kanji: '専門', hiragana: 'せんもん', romaji: 'senmon', english: 'speciality, field of study', partOfSpeech: 'noun', category: 'School' },
      { id: 'l15_v19', lessonNumber: 15, kanji: '歯医者', hiragana: 'はいしゃ', romaji: 'haisha', english: "dentist, dentist's", partOfSpeech: 'noun', category: 'Occupations' },
      { id: 'l15_v20', lessonNumber: 15, kanji: '床屋', hiragana: 'とこや', romaji: 'tokoya', english: "barber, barber's", partOfSpeech: 'noun', category: 'Occupations' },
      { id: 'l15_v21', lessonNumber: 15, kanji: 'プレイガイド', hiragana: 'プレイガイド', romaji: 'pureigaido', english: '(theater) ticket agency', partOfSpeech: 'noun', category: 'Town' },
      { id: 'l15_v22', lessonNumber: 15, kanji: '独身', hiragana: 'どくしん', romaji: 'dokushin', english: 'single, unmarried', partOfSpeech: 'noun', category: 'Family' },
      { id: 'l15_v23', lessonNumber: 15, kanji: '特に', hiragana: 'とくに', romaji: 'tokuni', english: 'especially, particularly', partOfSpeech: 'adverb', category: 'Degree' },
      { id: 'l15_v24', lessonNumber: 15, kanji: '思い出す I', hiragana: 'おもいだします', romaji: 'omoidashimasu', english: 'remember, recollect', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l15_v25', lessonNumber: 15, kanji: 'ご家族', hiragana: 'ごかぞく', romaji: 'gokazoku', english: 'your family (polite)', partOfSpeech: 'noun', category: 'Family' },
      { id: 'l15_v26', lessonNumber: 15, kanji: 'いらっしゃいます I', hiragana: 'いらっしゃいます', romaji: 'irasshaimasu', english: 'be (honorific equivalent of います)', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l15_v27', lessonNumber: 15, kanji: '高校', hiragana: 'こうこう', romaji: 'koukou', english: 'senior high school', partOfSpeech: 'noun', category: 'School' },
      { id: 'l15_v28', lessonNumber: 15, kanji: '日本橋', hiragana: 'にっぽんばし', romaji: 'Nipponbashi', english: 'Nipponbashi (shopping district in Osaka)', partOfSpeech: 'noun', category: 'Places' }
    ],
    grammar: [
      {
        id: 'l15_g1',
        lessonNumber: 15,
        title: 'V て-form も いいです (Granting or Asking Permission)',
        structure: 'Verb [て-form] + も いいです[か]',
        explanation: 'Used to grant permission ("You may do...") or to ask for permission ("May I do...?").',
        rules: [
          '写真を 撮っても いいです (You may take photos).',
          'カタログを もらっても いいですか (May I take a catalog?) -> ええ、いいですよ / すみません、ちょっと… (polite refusal).'
        ],
        examples: [
          { japanese: '写真を 撮っても いいです。', hiragana: 'しゃしんを とっても いいです。', romaji: 'Shashin o tottemo ii desu.', english: 'You may take photographs.' },
          { japanese: 'この カタログを もらっても いいですか。…ええ、いいですよ。どうぞ。', hiragana: 'この かたろぐを もらっても いいですか。…ええ、いいですよ。どうぞ。', romaji: 'Kono katarogu o morattemo ii desu ka. ...Ee, ii desu yo. Douzo.', english: 'May I keep this catalog? ...Sure, please do.' }
        ]
      },
      {
        id: 'l15_g2',
        lessonNumber: 15,
        title: 'V て-form は いけません (Prohibition: You must not do...)',
        structure: 'Verb [て-form] + は いけません',
        explanation: 'Used to express strong prohibition or rules. This pattern cannot be used by an inferior to a superior.',
        rules: [
          'ここで たばこを 吸っては いけません (You must not smoke here).',
          'ここで 写真を 撮っては いけません (Taking pictures is not allowed here).'
        ],
        examples: [
          { japanese: 'ここで たばこを 吸っては いけません。禁煙ですから。', hiragana: 'ここで たばこを すっては いけません。きんえんですから。', romaji: 'Koko de tabako o sutte wa ikemasen. Kin\'en desu kara.', english: 'You must not smoke here. Because this is a no-smoking area.' },
          { japanese: '先生、ここで 遊んでも いいですか。…いいえ、いけません。', hiragana: 'せんせい、ここで あそんでも いいですか。…いいえ、いけません。', romaji: 'Sensei, koko de asondemo ii desu ka. ...Iie, ikemasen.', english: "Teacher, may we play here? ...No, you must not." }
        ]
      },
      {
        id: 'l15_g3',
        lessonNumber: 15,
        title: 'V て-form います (Resultant Continuous State)',
        structure: 'Verb [て-form] + います',
        explanation: 'Describes a continuous state resulting from an action completed in the past, rather than an action currently taking place.',
        rules: [
          '結婚して います (I am married).',
          '大阪に 住んで います (I live in Osaka).',
          'カメラを 持って います (I have / possess a camera).',
          '田中さんを 知って います (I know Mr. Tanaka).'
        ],
        examples: [
          { japanese: 'わたしは 結婚して います。', hiragana: 'わたしは けっこんして います。', romaji: 'Watashi wa kekkonshite imasu.', english: "I'm married." },
          { japanese: 'わたしは 大阪に 住んで います。', hiragana: 'わたしは おおさかに すんで います。', romaji: 'Watashi wa Oosaka ni sunde imasu.', english: 'I live in Osaka.' },
          { japanese: 'サントスさんは パソコンを 持って います。', hiragana: 'さんとすさんは ぱそこんを もって います。', romaji: 'Santosu-san wa pasokon o motte imasu.', english: 'Mr. Santos has a personal computer.' }
        ]
      },
      {
        id: 'l15_g4',
        lessonNumber: 15,
        title: 'V て-form います (Habitual Actions & Occupations)',
        structure: 'Noun (Company) + で + 働いて います | Noun + を + 作って/売って います',
        explanation: 'Used to describe habitual repeated activities over a long period of time, such as employment and manufacturing.',
        rules: [
          'IMC は コンピューターソフトを 作って います (IMC makes computer software).',
          'ミラーさんは IMC で 働いて います (Mr. Miller works for IMC).',
          '妹は 大学で 勉強して います (My younger sister is studying at university).'
        ],
        examples: [
          { japanese: 'IMCは コンピューターソフトを 作って います。', hiragana: 'あいえむしーは こんぴゅーたーそふとを つくって います。', romaji: 'IMC wa konpyuutaa sofuto o tsukutte imasu.', english: 'IMC makes computer software.' },
          { japanese: 'ミラーさんは IMCで 働いて います。', hiragana: 'みらーさんは あいえむしーで はたらいて います。', romaji: 'Miraa-san wa IMC de hataraite imasu.', english: 'Mr. Miller works for IMC.' }
        ]
      },
      {
        id: 'l15_g5',
        lessonNumber: 15,
        title: '「知っています」の否定形は「知りません」 (Negative of 知っています)',
        structure: '知って いますか。…はい、知って います / いいえ、知りません。',
        explanation: 'CRITICAL RULE: The negative form of 知って います is 知りません, NEVER 知っていません.',
        rules: [
          'Q: 市役所の 電話番号を 知って いますか。',
          'A+: はい、知って います (Yes, I know).',
          'A-: いいえ、知りません (No, I don\'t know).'
        ],
        examples: [
          { japanese: '市役所の 電話番号を 知って いますか。…いいえ、知りません。', hiragana: 'しやくしょの でんわばんごうを しって いますか。…いいえ、しりません。', romaji: 'Shiyakusho no denwa-bangou o shitte imasu ka. ...Iie, shirimasen.', english: "Do you know the telephone number of the city hall? ...No, I don't." }
        ]
      }
    ],
    exercises: [
      {
        id: 'l15_ex1',
        lessonNumber: 15,
        type: 'mcq',
        category: 'grammar',
        prompt: 'What is the correct negative response to "田中さんの 住所を 知って いますか"?',
        options: [
          'いいえ、知りません。',
          'いいえ、知っていません。',
          'いいえ、知りませんでした。',
          'いいえ、知るではありません。'
        ],
        correctAnswer: 'いいえ、知りません。',
        explanation: 'The negative of 知っています is always 知りません.'
      },
      {
        id: 'l15_ex2',
        lessonNumber: 15,
        type: 'fill_blank',
        category: 'grammar',
        prompt: 'Fill in the blank: ここで 写真を 撮って [ ? ] いけません。 (You must not take photos here.)',
        options: ['は', 'も', 'が', 'を'],
        correctAnswer: 'は',
        explanation: 'Prohibition is expressed with 〜ては いけません.'
      },
      {
        id: 'l15_ex3',
        lessonNumber: 15,
        type: 'mcq',
        category: 'grammar',
        prompt: 'How do you ask "May I smoke here?" politely?',
        options: [
          'ここで たばこを 吸っても いいですか。',
          'ここで たばこを 吸っては いけませんか。',
          'ここで たばこを 吸いたいです。',
          'ここで たばこを 吸ってください。'
        ],
        correctAnswer: 'ここで たばこを 吸っても いいですか。',
        explanation: 'Permission request is formed with [Te-form] + も いいですか.'
      }
    ],
    dialogue: {
      title: 'ご家族について (Tell me about your family)',
      situation: 'After watching a movie together, Mr. Miller and Ms. Kimura talk in a cafe about their respective families.',
      lines: [
        { speaker: 'ミラー', japanese: '今日の 映画は よかったですね。', hiragana: 'きょうの えいがは よかったですね。', english: "Today's movie was good, wasn't it?" },
        { speaker: '木村', japanese: 'ええ。特にお父さんが よかったですね。', hiragana: 'ええ。とくにおとうさんが よかったですね。', english: 'Yes, it was. The father was particularly good, wasn\'t he?' },
        { speaker: 'ミラー', japanese: 'ええ。わたしは 家族を 思い出しました。', hiragana: 'ええ。わたしは かぞくを おもいだしました。', english: 'Yes. I was reminded of my family.' },
        { speaker: '木村', japanese: 'ミラーさんの ご家族は？', hiragana: 'みらーさんの ごかぞくは？', english: 'Tell me about your family, Mr. Miller.' },
        { speaker: 'ミラー', japanese: '両親と 姉が １人 います。', hiragana: 'りょうしんと あねが ひとり います。', english: 'I have my parents and an elder sister.' },
        { speaker: '木村', japanese: 'どちらに いらっしゃいますか。', hiragana: 'どちらに いらっしゃいますか。', english: 'Where do they live?' },
        { speaker: 'ミラー', japanese: '両親は ニューヨークの 近くに 住んで います。姉は ロンドンです。木村さんの ご家族は？', hiragana: 'りょうしんは にゅーよーくの ちかくに すんで います。あねは ろんどんです。きむらさんの ごかぞくは？', english: 'My parents live near New York City. My sister is in London. How about your family, Ms. Kimura?' },
        { speaker: '木村', japanese: '３人です。父は 銀行員で、母は 高校で 英語を 教えて います。', hiragana: 'さんにんです。ちは ぎんこういんで、ははは こうこうで えいごを おしえて います。', english: 'There are three of us. My father works for a bank, and my mother teaches English at a high school.' }
      ]
    }
  }
];
