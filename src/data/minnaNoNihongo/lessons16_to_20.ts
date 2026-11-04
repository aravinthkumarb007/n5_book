import { MinnaLesson } from '@/types/minna';

export const MINNA_LESSONS_16_TO_20: MinnaLesson[] = [
  // =========================================================================
  // LESSON 16: Sequential Actions, V-てから, Adjective Chaining, Physical Features
  // Textbook Reference: Pages 122–127
  // =========================================================================
  {
    id: 16,
    lessonNumber: 16,
    level: 'N5',
    title: 'Lesson 16: Sequential Actions, Connecting Adjectives & Physical Features',
    titleJapanese: '第１６課：動作の継起（〜て、〜て）・〜てから・形容詞の接続（〜くて・〜で）・特徴（N1はN2がA）',
    theme: '朝ジョギングをしてシャワーを浴びて会社へ行きます、国へ帰ってから働きます、マリアさんは髪が長いです',
    description: 'Learn connecting multiple actions sequentially with the Te-Form, using 〜てから (after doing V1, do V2), joining adjectives and nouns (くて / で), describing physical attributes (N1 は N2 が adj), and asking methods with どうやって.',
    keyPhrases: [
      '朝 ジョギングを して、シャワーを 浴びて、会社へ 行きます。 (In the morning I jog, take a shower and go to the office.)',
      'コンサートが 終わってから、レストランで 食事しました。 (We dined at a restaurant after the concert was over.)',
      '大阪は 食べ物が おいしいです。 (The food is delicious in Osaka.)',
      'この パソコンは 軽くて、便利です。 (This personal computer is light and handy.)',
      'マリアさんは 髪が 長いです。 (Maria has long hair.)',
      '大学まで どうやって 行きますか。 (How do you go to your university?)'
    ],
    vocabulary: [
      { id: 'l16_v1', lessonNumber: 16, kanji: '乗ります I', hiragana: 'のります', romaji: 'norimasu', english: 'ride, get on [a train]', partOfSpeech: 'verb-1', category: 'Verbs', notes: '[電車に〜] get on [a train]' },
      { id: 'l16_v2', lessonNumber: 16, kanji: '降ります II', hiragana: 'おります', romaji: 'orimasu', english: 'get off [a train]', partOfSpeech: 'verb-2', category: 'Verbs', notes: '[電車を〜] get off [a train]' },
      { id: 'l16_v3', lessonNumber: 16, kanji: '乗り換えます II', hiragana: 'のりかえます', romaji: 'norikaemasu', english: 'change, transfer (trains, etc.)', partOfSpeech: 'verb-2', category: 'Verbs' },
      { id: 'l16_v4', lessonNumber: 16, kanji: '浴びます II', hiragana: 'あびます', romaji: 'abimasu', english: 'take [a shower]', partOfSpeech: 'verb-2', category: 'Verbs', notes: '[シャワーを〜] take [a shower]' },
      { id: 'l16_v5', lessonNumber: 16, kanji: '入れます II', hiragana: 'いれます', romaji: 'iremasu', english: 'put in, insert', partOfSpeech: 'verb-2', category: 'Verbs' },
      { id: 'l16_v6', lessonNumber: 16, kanji: '出します I', hiragana: 'だします', romaji: 'dashimasu', english: 'take out, withdraw (money)', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l16_v7', lessonNumber: 16, kanji: '入ります I', hiragana: 'はいります', romaji: 'hairimasu', english: 'enter [university]', partOfSpeech: 'verb-1', category: 'Verbs', notes: '[大学に〜] enter [university]' },
      { id: 'l16_v8', lessonNumber: 16, kanji: '出ます II', hiragana: 'でます', romaji: 'demasu', english: 'graduate from [university]', partOfSpeech: 'verb-2', category: 'Verbs', notes: '[大学を〜] graduate from [university]' },
      { id: 'l16_v9', lessonNumber: 16, kanji: 'やめます II', hiragana: 'やめます', romaji: 'yamemasu', english: 'quit or retire from [a company], stop', partOfSpeech: 'verb-2', category: 'Verbs', notes: '[会社を〜] quit [a company]' },
      { id: 'l16_v10', lessonNumber: 16, kanji: '押します I', hiragana: 'おします', romaji: 'oshimasu', english: 'push, press', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l16_v11', lessonNumber: 16, kanji: '若い', hiragana: 'わかい', romaji: 'wakai', english: 'young', partOfSpeech: 'i-adjective', category: 'Descriptions' },
      { id: 'l16_v12', lessonNumber: 16, kanji: '長い', hiragana: 'ながい', romaji: 'nagai', english: 'long', partOfSpeech: 'i-adjective', category: 'Descriptions' },
      { id: 'l16_v13', lessonNumber: 16, kanji: '短い', hiragana: 'みじかい', romaji: 'mijikai', english: 'short', partOfSpeech: 'i-adjective', category: 'Descriptions' },
      { id: 'l16_v14', lessonNumber: 16, kanji: '明るい', hiragana: 'あかるい', romaji: 'akarui', english: 'bright, light', partOfSpeech: 'i-adjective', category: 'Descriptions' },
      { id: 'l16_v15', lessonNumber: 16, kanji: '暗い', hiragana: 'くらい', romaji: 'kurai', english: 'dark', partOfSpeech: 'i-adjective', category: 'Descriptions' },
      { id: 'l16_v16', lessonNumber: 16, kanji: '背が 高い', hiragana: 'せが たかい', romaji: 'se ga takai', english: 'tall (referring to person)', partOfSpeech: 'phrase', category: 'Descriptions' },
      { id: 'l16_v17', lessonNumber: 16, kanji: '頭が いい', hiragana: 'あたまが いい', romaji: 'atama ga ii', english: 'clever, smart', partOfSpeech: 'phrase', category: 'Descriptions' },
      { id: 'l16_v18', lessonNumber: 16, kanji: '体', hiragana: 'からだ', romaji: 'karada', english: 'body, health', partOfSpeech: 'noun', category: 'Body' },
      { id: 'l16_v19', lessonNumber: 16, kanji: '頭', hiragana: 'あたま', romaji: 'atama', english: 'head', partOfSpeech: 'noun', category: 'Body' },
      { id: 'l16_v20', lessonNumber: 16, kanji: '髪', hiragana: 'かみ', romaji: 'kami', english: 'hair', partOfSpeech: 'noun', category: 'Body' },
      { id: 'l16_v21', lessonNumber: 16, kanji: '顔', hiragana: 'かお', romaji: 'kao', english: 'face', partOfSpeech: 'noun', category: 'Body' },
      { id: 'l16_v22', lessonNumber: 16, kanji: '目', hiragana: 'め', romaji: 'me', english: 'eye', partOfSpeech: 'noun', category: 'Body' },
      { id: 'l16_v23', lessonNumber: 16, kanji: '耳', hiragana: 'みみ', romaji: 'mimi', english: 'ear', partOfSpeech: 'noun', category: 'Body' },
      { id: 'l16_v24', lessonNumber: 16, kanji: '口', hiragana: 'くち', romaji: 'kuchi', english: 'mouth', partOfSpeech: 'noun', category: 'Body' },
      { id: 'l16_v25', lessonNumber: 16, kanji: '歯', hiragana: 'は', romaji: 'ha', english: 'tooth', partOfSpeech: 'noun', category: 'Body' },
      { id: 'l16_v26', lessonNumber: 16, kanji: 'お腹', hiragana: 'おなか', romaji: 'onaka', english: 'stomach', partOfSpeech: 'noun', category: 'Body' },
      { id: 'l16_v27', lessonNumber: 16, kanji: '足', hiragana: 'あし', romaji: 'ashi', english: 'leg, foot', partOfSpeech: 'noun', category: 'Body' },
      { id: 'l16_v28', lessonNumber: 16, kanji: 'サービス', hiragana: 'サービス', romaji: 'saabisu', english: 'service', partOfSpeech: 'noun', category: 'General' },
      { id: 'l16_v29', lessonNumber: 16, kanji: 'ジョギング', hiragana: 'ジョギング', romaji: 'jogingu', english: 'jogging (~を します: jog)', partOfSpeech: 'noun', category: 'Sports' },
      { id: 'l16_v30', lessonNumber: 16, kanji: 'シャワー', hiragana: 'シャワー', romaji: 'shawaa', english: 'shower', partOfSpeech: 'noun', category: 'Daily Life' },
      { id: 'l16_v31', lessonNumber: 16, kanji: '緑', hiragana: 'みどり', romaji: 'midori', english: 'green, greenery', partOfSpeech: 'noun', category: 'Colors & Nature' },
      { id: 'l16_v32', lessonNumber: 16, kanji: '[お]寺', hiragana: '[お]てら', romaji: '[o]tera', english: 'Buddhist temple', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l16_v33', lessonNumber: 16, kanji: '神社', hiragana: 'じんじゃ', romaji: 'jinja', english: 'Shinto shrine', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l16_v34', lessonNumber: 16, kanji: '留学生', hiragana: 'りゅうがくせい', romaji: 'ryuugakusei', english: 'foreign student', partOfSpeech: 'noun', category: 'People' },
      { id: 'l16_v35', lessonNumber: 16, kanji: '〜番', hiragana: '〜ばん', romaji: '-ban', english: 'number ~', partOfSpeech: 'counter', category: 'Numbers' },
      { id: 'l16_v36', lessonNumber: 16, kanji: 'どうやって', hiragana: 'どうやって', romaji: 'dou yatte', english: 'in what way, how', partOfSpeech: 'phrase', category: 'Question Words' },
      { id: 'l16_v37', lessonNumber: 16, kanji: 'どの 〜', hiragana: 'どの 〜', romaji: 'dono ~', english: 'which ~ (used for three or more)', partOfSpeech: 'phrase', category: 'Question Words' },
      { id: 'l16_v38', lessonNumber: 16, kanji: '[いいえ、] まだまだです。', hiragana: '[いいえ、] まだまだです。', romaji: '[Iie,] madamada desu.', english: '[No,] I still have a long way to go.', partOfSpeech: 'phrase', category: 'Conversations' },
      { id: 'l16_v39', lessonNumber: 16, kanji: 'お引き出しですか。', hiragana: 'おひきだしですか。', romaji: 'Ohikidashi desu ka.', english: 'Are you making a withdrawal?', partOfSpeech: 'phrase', category: 'Conversations' },
      { id: 'l16_v40', lessonNumber: 16, kanji: 'まず', hiragana: 'まず', romaji: 'mazu', english: 'first of all', partOfSpeech: 'adverb', category: 'Manner' },
      { id: 'l16_v41', lessonNumber: 16, kanji: 'キャッシュカード', hiragana: 'キャッシュカード', romaji: 'kyasshu kaado', english: 'cash dispensing card, ATM card', partOfSpeech: 'noun', category: 'Banking' },
      { id: 'l16_v42', lessonNumber: 16, kanji: '暗証番号', hiragana: 'あんしょうばんごう', romaji: 'anshou bangou', english: 'personal identification number, PIN', partOfSpeech: 'noun', category: 'Banking' },
      { id: 'l16_v43', lessonNumber: 16, kanji: '次に', hiragana: 'つぎに', romaji: 'tsugi ni', english: 'next, as a next step', partOfSpeech: 'adverb', category: 'Manner' },
      { id: 'l16_v44', lessonNumber: 16, kanji: '金額', hiragana: 'きんがく', romaji: 'kingaku', english: 'amount of money', partOfSpeech: 'noun', category: 'Banking' },
      { id: 'l16_v45', lessonNumber: 16, kanji: '確認', hiragana: 'かくにん', romaji: 'kakunin', english: 'confirmation (~を します: confirm)', partOfSpeech: 'noun', category: 'Banking' },
      { id: 'l16_v46', lessonNumber: 16, kanji: 'ボタン', hiragana: 'ボタン', romaji: 'botan', english: 'button', partOfSpeech: 'noun', category: 'Technology' }
    ],
    grammar: [
      {
        id: 'l16_g1',
        lessonNumber: 16,
        title: 'V て-form、[V て-form]、〜 (Sequential Actions)',
        structure: 'Verb 1 [て-form]、Verb 2 [て-form]、Verb 3 [Final Form]',
        explanation: 'Used to connect two or more actions taking place in chronological succession. The tense of the entire sentence is determined by the final verb.',
        rules: [
          '朝 ジョギングを して、シャワーを 浴びて、会社へ 行きます (In the morning I jog, shower, and go to the office).',
          '神戸へ 行って、映画を 見て、お茶を 飲みました (Went to Kobe, saw a movie, and drank tea - past tense).'
        ],
        examples: [
          { japanese: '朝 ジョギングを して、シャワーを 浴びて、会社へ 行きます。', hiragana: 'あさ じょぎんぐを して、しゃわーを あびて、かいしゃへ いきます。', romaji: 'Asa jogingu o shite, shawaa o abite, kaisha e ikimasu.', english: 'In the morning I go jogging, take a shower and go to the office.' },
          { japanese: '神戸へ 行って、映画を 見て、お茶を 飲みました。', hiragana: 'こうべへ いって、えいがを みて、おちゃを のみました。', romaji: 'Koube e itte, eiga o mite, ocha o nomimashita.', english: 'I went to Kobe, saw a movie and drank tea.' }
        ]
      },
      {
        id: 'l16_g2',
        lessonNumber: 16,
        title: 'い形容詞の接続：〜くて (Joining I-Adjectives)',
        structure: 'い-adjective (drop final い) + くて、〜',
        explanation: 'When joining an い-adjective sentence to another sentence, drop the final い and attach くて.',
        rules: [
          'おおきい → おおきくて (big and...)',
          'ちいさい → ちいさくて (small and...)',
          'いい → よくて (good and...) *EXCEPTION: いい becomes よくて!'
        ],
        examples: [
          { japanese: 'ミラーさんは 若くて、元気です。', hiragana: 'みらーさんは わかくて、げんきです。', romaji: 'Miraa-san wa wakakute, genki desu.', english: 'Mr. Miller is young and lively.' },
          { japanese: 'きのうは 天気が よくて、暑かったです。', hiragana: 'きのうは てんきが よくて、あつかったです。', romaji: 'Kinou wa tenki ga yokute, atsukatta desu.', english: 'Yesterday was fine and hot.' }
        ]
      },
      {
        id: 'l16_g3',
        lessonNumber: 16,
        title: 'な形容詞・名詞の接続：〜で (Joining Na-Adjectives & Nouns)',
        structure: 'Noun / Na-adjective [stem] + で、〜',
        explanation: 'When joining noun sentences or な-adjective sentences, です changes to で.',
        rules: [
          'カリナさんは インドネシア人で、京都大学の 留学生です (Ms. Karina is Indonesian and a student at Kyoto University).',
          'ミラーさんは ハンサムで、親切です (Mr. Miller is handsome and kind).',
          '奈良は 静かで、きれいな 町です (Nara is a quiet and beautiful city).',
          'Note: Cannot be used to connect contradictory statements (use が instead: この部屋は 狭いですが、きれいです).'
        ],
        examples: [
          { japanese: 'カリナさんは インドネシア人で、京都大学の 留学生です。', hiragana: 'かりなさんは いんどねしあじんで、きょうとだいがくの りゅうがくせいです。', romaji: 'Karina-san wa Indoneshia-jin de, Kyouto daigaku no ryuugakusei desu.', english: 'Ms. Karina is an Indonesian and a student of Kyoto University.' },
          { japanese: '奈良は 静かで、きれいな 町です。', hiragana: 'ならは しずかで、きれいな まちです。', romaji: 'Nara wa shizuka de, kirei na machi desu.', english: 'Nara is a quiet and beautiful city.' }
        ]
      },
      {
        id: 'l16_g4',
        lessonNumber: 16,
        title: 'V1 て-form から、V2 (After doing V1, then V2)',
        structure: 'Verb 1 [て-form] + から、Verb 2',
        explanation: 'Indicates that upon completion of the action denoted by V1, the action of V2 is conducted. The tense of the sentence is determined by the last verb.',
        rules: [
          '国へ 帰ってから、父の 会社で 働きます (After going back to my country, I will work at my father\'s company).',
          'コンサートが 終わってから、レストランで 食事しました (We dined after the concert was over).'
        ],
        examples: [
          { japanese: '国へ 帰ってから、父の 会社で 働きます。', hiragana: 'くにへ かえってから、ちちの かいしゃで はたらきます。', romaji: 'Kuni e kaette kara, chichi no kaisha de hatarakimasu.', english: "I will work for my father's company after going back to my country." },
          { japanese: 'コンサートが 終わってから、レストランで 食事しました。', hiragana: 'こんさーとが おわってから、れすとらんで しょくじしました。', romaji: 'Konsaato ga owatte kara, resutoran de shokujishimashita.', english: 'We ate at a restaurant after the concert was over.' }
        ]
      },
      {
        id: 'l16_g5',
        lessonNumber: 16,
        title: 'N1 は N2 が 形容詞 (Describing Attributes & Physical Features)',
        structure: 'Noun 1 + は + Noun 2 + が + Adjective',
        explanation: 'Used to describe an attribute or feature of a person, place, or thing. N1 is the topic of the sentence, and N2 is the specific attribute being evaluated.',
        rules: [
          '大阪は 食べ物が おいしいです (Food is tasty in Osaka).',
          'マリアさんは 髪が 長いです (Maria has long hair).',
          'あのかたは 背が 高くて、頭が いいです (That person is tall and smart).'
        ],
        examples: [
          { japanese: '大阪は 食べ物が おいしいです。', hiragana: 'おおさかは たべものが おいしいです。', romaji: 'Oosaka wa tabemono ga oishii desu.', english: 'Food is tasty in Osaka.' },
          { japanese: 'マリアさんは 髪が 長いです。', hiragana: 'まりあさんは かみが ながいです。', romaji: 'Maria-san wa kami ga nagai desu.', english: 'Maria has long hair.' }
        ]
      },
      {
        id: 'l16_g6',
        lessonNumber: 16,
        title: 'どうやって (In What Way / How to Go)',
        structure: 'どうやって + Verb か',
        explanation: 'Used to ask the method, route, or steps for doing something (especially transit routes).',
        rules: [
          '大学まで どうやって 行きますか。…京都駅から 16番の バスに 乗って、大学前で 降ります。'
        ],
        examples: [
          { japanese: '大学まで どうやって 行きますか。…京都駅から 16番の バスに 乗って、大学前で 降ります。', hiragana: 'だいがくまで どうやって いきますか。…きょうとえきから じゅうろくばんの ばすに のって、だいがくまえで おります。', romaji: 'Daigaku made dou yatte ikimasu ka. ...Kyouto-eki kara juuroku-ban no basu ni notte, daigaku-mae de orimasu.', english: 'How do you go to your university? ...I take a No. 16 bus from Kyoto Station and get off at Daigaku-mae.' }
        ]
      },
      {
        id: 'l16_g7',
        lessonNumber: 16,
        title: 'どの N (Which N, Among Three or More)',
        structure: 'どの + Noun',
        explanation: 'Belongs to the この、その、あの demonstrative family. どの modifies a noun directly when asking the listener to pick one from three or more choices.',
        rules: [
          'サントスさんは どの 人ですか。…あの 背が 高くて、髪が 黒い 人です。'
        ],
        examples: [
          { japanese: 'サントスさんは どの 人ですか。…あの 背が 高くて、髪が 黒い 人です。', hiragana: 'さんとすさんは どの ひとですか。…あの せが たかくて、かみが くろい ひとです。', romaji: 'Santosu-san wa dono hito desu ka. ...Ano se ga takakute, kami ga kuroi hito desu.', english: 'Which one is Mr. Santos? ...That tall man with black hair is.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l16_ex1',
        lessonNumber: 16,
        type: 'mcq',
        category: 'grammar',
        prompt: 'Choose the correct form to connect the adjective いい (good) with other phrases:',
        options: ['よくて', 'いくて', 'いいで', 'いいて'],
        correctAnswer: 'よくて',
        explanation: 'いい is irregular; its connecting te-form is よくて.'
      },
      {
        id: 'l16_ex2',
        lessonNumber: 16,
        type: 'fill_blank',
        category: 'grammar',
        prompt: 'Fill in the blank: マリアさんは 髪 [ ? ] 長いです。 (Maria has long hair.)',
        options: ['が', 'は', 'を', 'に'],
        correctAnswer: 'が',
        explanation: 'In the attribute pattern "N1 は N2 が Adj", the specific attribute N2 is marked with が.'
      },
      {
        id: 'l16_ex3',
        lessonNumber: 16,
        type: 'mcq',
        category: 'grammar',
        prompt: 'What does "国へ 帰ってから、父の 会社で 働きます" mean?',
        options: [
          'After returning to my country, I will work at my father\'s company.',
          'Before returning to my country, I worked at my father\'s company.',
          'Because I return to my country, I work at my father\'s company.',
          'While returning to my country, I work.'
        ],
        correctAnswer: 'After returning to my country, I will work at my father\'s company.',
        explanation: 'V-てから means "after doing V".'
      }
    ],
    dialogue: {
      title: '使い方を教えてください (Tell me how to use this machine)',
      situation: 'Ms. Maria visits a bank in Japan to withdraw cash using an ATM and asks a bank clerk for instructions.',
      lines: [
        { speaker: 'マリア', japanese: 'すみません。ちょっと この 機械の 使い方を 教えて ください。', hiragana: 'すみません。ちょっと この きかいの つかいかたを おしえて ください。', english: 'Excuse me. Could you tell me how to use this machine?' },
        { speaker: '銀行員', japanese: 'お引き出しですか。', hiragana: 'おひきだしですか。', english: 'You want to make a withdrawal?' },
        { speaker: 'マリア', japanese: 'そうです。', hiragana: 'そうです。', english: 'Yes.' },
        { speaker: '銀行員', japanese: 'じゃ、まず ここを 押して ください。キャッシュカードは ありますか。', hiragana: 'じゃ、まず ここを おして ください。きゃっしゅかーどは ありますか。', english: 'Then, please push this button, first. Do you have a cash card?' },
        { speaker: 'マリア', japanese: 'はい、これです。', hiragana: 'はい、これです。', english: 'Yes, here it is.' },
        { speaker: '銀行員', japanese: 'それを ここに 入れて、暗証番号を 押して ください。', hiragana: 'それを ここに いれて、あんしょうばんごうを おして ください。', english: 'Put it in here, and enter the code number.' },
        { speaker: 'マリア', japanese: 'はい。', hiragana: 'はい。', english: 'Yes.' },
        { speaker: '銀行員', japanese: '次に 金額を 押して ください。５万円なら、「５」「万」「円」と 押します。', hiragana: 'つぎに きんがくを おして ください。ごまんえんなら、「ご」「まん」「えん」と おします。', english: 'Next, enter the sum. Fifty thousand yen, push "Go", "Man", and "En".' },
        { speaker: '銀行員', japanese: 'そして、この「確認」ボタンを 押して ください。', hiragana: 'そして、この「かくにん」ぼたんを おして ください。', english: 'And then push this "Kakunin" button.' },
        { speaker: 'マリア', japanese: 'わかりました。どうも ありがとう ございました。', hiragana: 'わかりました。どうも ありがとう ございました。', english: 'Got it. Thank you very much.' }
      ]
    }
  },

  // =========================================================================
  // LESSON 17: Nai-Form Conjugation, V-ないでください, V-なければなりません
  // Textbook Reference: Pages 128–133
  // =========================================================================
  {
    id: 17,
    lessonNumber: 17,
    level: 'N5',
    title: 'Lesson 17: Nai-Form, Prohibitions (〜ないで), Obligations (〜なければなりません) & Deadlines',
    titleJapanese: '第１７課：ない形・〜ないでください・〜なければなりません・〜なくてもいいです・〜までに',
    theme: '写真を撮らないでください、パスポートを見せなければなりません、土曜日までに本を返します',
    description: 'Learn the negative Nai-form (ない形), instruct someone not to do an action (〜ないでください), express strict obligation/duty (〜なければなりません), lack of obligation (〜なくてもいいです), and deadlines with 〜までに.',
    keyPhrases: [
      'ここで 写真を 撮らないで ください。 (Please don\'t take photographs here.)',
      'パスポートを 見せなければ なりません。 (You must show your passport.)',
      'レポートを 出さなくても いいです。 (You do not have to submit the report.)',
      '薬を 飲まなければ なりません。 (I must take medicine.)',
      'あした 来なくても いいです。 (You don\'t have to come tomorrow.)',
      '土曜日までに 本を 返さなければ なりません。 (I must return the book by Saturday.)'
    ],
    vocabulary: [
      { id: 'l17_v1', lessonNumber: 17, kanji: '覚えます II', hiragana: 'おぼえます', romaji: 'oboemasu', english: 'memorize, learn by heart', partOfSpeech: 'verb-2', category: 'Verbs' },
      { id: 'l17_v2', lessonNumber: 17, kanji: '忘れます II', hiragana: 'わすれます', romaji: 'wasuremasu', english: 'forget', partOfSpeech: 'verb-2', category: 'Verbs' },
      { id: 'l17_v3', lessonNumber: 17, kanji: 'なくします I', hiragana: 'なくします', romaji: 'nakushimasu', english: 'lose (something)', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l17_v4', lessonNumber: 17, kanji: '出します I', hiragana: 'だします', romaji: 'dashimasu', english: 'hand in [a report], submit', partOfSpeech: 'verb-1', category: 'Verbs', notes: '[レポートを〜] hand in [a report]' },
      { id: 'l17_v5', lessonNumber: 17, kanji: '払います I', hiragana: 'はらいます', romaji: 'haraimasu', english: 'pay', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l17_v6', lessonNumber: 17, kanji: '返します I', hiragana: 'かえします', romaji: 'kaeshimasu', english: 'give back, return (items)', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l17_v7', lessonNumber: 17, kanji: '出かけます II', hiragana: 'でかけます', romaji: 'dekakemasu', english: 'go out', partOfSpeech: 'verb-2', category: 'Verbs' },
      { id: 'l17_v8', lessonNumber: 17, kanji: '脱ぎます I', hiragana: 'ぬぎます', romaji: 'nugimasu', english: 'take off (clothes, shoes, etc.)', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l17_v9', lessonNumber: 17, kanji: '持って 行きます I', hiragana: 'もって いきます', romaji: 'motte ikimasu', english: 'take (something along)', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l17_v10', lessonNumber: 17, kanji: '持って 来ます III', hiragana: 'もって きます', romaji: 'motte kimasu', english: 'bring (something along)', partOfSpeech: 'verb-3', category: 'Verbs' },
      { id: 'l17_v11', lessonNumber: 17, kanji: '心配します III', hiragana: 'しんぱいします', romaji: 'shinpaishimasu', english: 'worry, be concerned', partOfSpeech: 'verb-3', category: 'Verbs' },
      { id: 'l17_v12', lessonNumber: 17, kanji: '残業します III', hiragana: 'ざんぎょうします', romaji: 'zangyoushimasu', english: 'work overtime', partOfSpeech: 'verb-3', category: 'Verbs' },
      { id: 'l17_v13', lessonNumber: 17, kanji: '出張します III', hiragana: 'しゅっちょうします', romaji: 'shucchoushimasu', english: 'go on a business trip', partOfSpeech: 'verb-3', category: 'Verbs' },
      { id: 'l17_v14', lessonNumber: 17, kanji: '飲みます I', hiragana: 'のみます', romaji: 'nomimasu', english: 'take [medicine]', partOfSpeech: 'verb-1', category: 'Verbs', notes: '[薬を〜] take [medicine]' },
      { id: 'l17_v15', lessonNumber: 17, kanji: '入ります I', hiragana: 'はいります', romaji: 'hairimasu', english: 'take [a bath]', partOfSpeech: 'verb-1', category: 'Verbs', notes: '[お風呂に〜] take [a bath]' },
      { id: 'l17_v16', lessonNumber: 17, kanji: '大切[な]', hiragana: 'たいせつ[な]', romaji: 'taisetsu[na]', english: 'important, precious', partOfSpeech: 'na-adjective', category: 'Adjectives' },
      { id: 'l17_v17', lessonNumber: 17, kanji: '大丈夫[な]', hiragana: 'だいじょうぶ[な]', romaji: 'daijoubu[na]', english: 'all right, OK', partOfSpeech: 'na-adjective', category: 'Adjectives' },
      { id: 'l17_v18', lessonNumber: 17, kanji: '危ない', hiragana: 'あぶない', romaji: 'abunai', english: 'dangerous', partOfSpeech: 'i-adjective', category: 'Adjectives' },
      { id: 'l17_v19', lessonNumber: 17, kanji: '問題', hiragana: 'もんだい', romaji: 'mondai', english: 'question, problem, trouble', partOfSpeech: 'noun', category: 'General' },
      { id: 'l17_v20', lessonNumber: 17, kanji: '答え', hiragana: 'こたえ', romaji: 'kotae', english: 'answer', partOfSpeech: 'noun', category: 'General' },
      { id: 'l17_v21', lessonNumber: 17, kanji: '禁煙', hiragana: 'きんえん', romaji: 'kin\'en', english: 'no smoking', partOfSpeech: 'noun', category: 'Signs' },
      { id: 'l17_v22', lessonNumber: 17, kanji: '[健康] 保険証', hiragana: '[けんこう] ほけんしょう', romaji: '[kenkou] hokenshou', english: '[health] insurance card', partOfSpeech: 'noun', category: 'Medical' },
      { id: 'l17_v23', lessonNumber: 17, kanji: 'かぜ', hiragana: 'かぜ', romaji: 'kaze', english: 'cold, flu', partOfSpeech: 'noun', category: 'Medical' },
      { id: 'l17_v24', lessonNumber: 17, kanji: '熱', hiragana: 'ねつ', romaji: 'netsu', english: 'fever', partOfSpeech: 'noun', category: 'Medical' },
      { id: 'l17_v25', lessonNumber: 17, kanji: '病気', hiragana: 'びょうき', romaji: 'byouki', english: 'illness, disease', partOfSpeech: 'noun', category: 'Medical' },
      { id: 'l17_v26', lessonNumber: 17, kanji: '薬', hiragana: 'くすり', romaji: 'kusuri', english: 'medicine', partOfSpeech: 'noun', category: 'Medical' },
      { id: 'l17_v27', lessonNumber: 17, kanji: '[お]風呂', hiragana: '[お]ふろ', romaji: '[o]furo', english: 'bath', partOfSpeech: 'noun', category: 'Daily Life' },
      { id: 'l17_v28', lessonNumber: 17, kanji: '上着', hiragana: 'うわぎ', romaji: 'uwagi', english: 'jacket, outerwear', partOfSpeech: 'noun', category: 'Clothes' },
      { id: 'l17_v29', lessonNumber: 17, kanji: '下着', hiragana: 'したぎ', romaji: 'shitagi', english: 'underwear', partOfSpeech: 'noun', category: 'Clothes' },
      { id: 'l17_v30', lessonNumber: 17, kanji: '先生', hiragana: 'せんせい', romaji: 'sensei', english: 'doctor (when addressing a medical doctor)', partOfSpeech: 'noun', category: 'Medical' },
      { id: 'l17_v31', lessonNumber: 17, kanji: '２、３日', hiragana: 'に、さんにち', romaji: 'ni, san-nichi', english: 'a few days', partOfSpeech: 'phrase', category: 'Time' },
      { id: 'l17_v32', lessonNumber: 17, kanji: '２、３ 〜', hiragana: 'に、さん 〜', romaji: 'ni, san ~', english: 'a few ~ (counter suffix)', partOfSpeech: 'phrase', category: 'Quantities' },
      { id: 'l17_v33', lessonNumber: 17, kanji: '〜までに', hiragana: '〜までに', romaji: '-made ni', english: 'before ~, by ~ (indicating time limit/deadline)', partOfSpeech: 'particle', category: 'Time' },
      { id: 'l17_v34', lessonNumber: 17, kanji: 'ですから', hiragana: 'ですから', romaji: 'desukara', english: 'therefore, so', partOfSpeech: 'conjunction', category: 'Conjunctions' },
      { id: 'l17_v35', lessonNumber: 17, kanji: 'どう しましたか。', hiragana: 'どう しましたか。', romaji: 'Dou shimashita ka.', english: "What's the matter? / What seems to be the problem?", partOfSpeech: 'phrase', category: 'Medical' },
      { id: 'l17_v36', lessonNumber: 17, kanji: '[〜が] 痛いです。', hiragana: '[〜が] いたいです。', romaji: '[~ ga] itai desu.', english: '(I) have a pain [in my ~].', partOfSpeech: 'phrase', category: 'Medical' },
      { id: 'l17_v37', lessonNumber: 17, kanji: 'のど', hiragana: 'のど', romaji: 'nodo', english: 'throat', partOfSpeech: 'noun', category: 'Body' },
      { id: 'l17_v38', lessonNumber: 17, kanji: 'お大事に。', hiragana: 'おだいじに。', romaji: 'Odaiji ni.', english: 'Take care of yourself. (to sick person)', partOfSpeech: 'phrase', category: 'Greetings' }
    ],
    grammar: [
      {
        id: 'l17_g1',
        lessonNumber: 17,
        title: '動詞の ない形 (Nai-form Conjugation)',
        structure: 'Group I: [い-line] -> [あ-line] + ない | Group II: drop ます + ない | Group III: しない / こない',
        explanation: 'The verb form used with ない is called the ない-form.',
        rules: [
          'Group I: Replace the sound of the い-line before ます with the corresponding あ-line sound and add ない: かきます→かかない、のみます→のまない、とります→とらない、いそぎます→いそばない、はなします→はなさない.',
          '*EXCEPTION for verbs ending in い: Replace with わ (NOT あ): すいます→すわない、かいます→かわない.',
          'Group II: Simply drop ます and attach ない: たべます→たべない、みます→みない.',
          'Group III: します→しない (べんきょうします→べんきょうしない)、来ます (きます) → こない (pronounced konai).'
        ],
        examples: [
          { japanese: 'かきます（書きます）→ かかない', hiragana: 'かきます → かかない', romaji: 'kakimasu -> kakanai', english: 'write -> not write' },
          { japanese: 'すいます（吸います）→ すわない', hiragana: 'すいます → すわない', romaji: 'suimasu -> suwanai', english: 'smoke/inhale -> not smoke' },
          { japanese: 'きます（来ます）→ こない', hiragana: 'きます → こない', romaji: 'kimasu -> konai', english: 'come -> not come' }
        ]
      },
      {
        id: 'l17_g2',
        lessonNumber: 17,
        title: 'V ない-form ないで ください (Negative Request: Please don\'t...)',
        structure: 'Verb [ない-form] + で ください',
        explanation: 'Used when asking or instructing someone to refrain from doing a certain action.',
        rules: [
          'わたしは 元気ですから、心配しないで ください (I am fine, so please don\'t worry about me).',
          'ここで 写真を 撮らないで ください (Please don\'t take photographs here).'
        ],
        examples: [
          { japanese: 'わたしは 元気ですから、心配しないで ください。', hiragana: 'わたしは げんきですから、しんぱいしないで ください。', romaji: 'Watashi wa genki desu kara, shinpai shinaide kudasai.', english: "I am fine, so please don't worry about me." },
          { japanese: 'ここで 写真を 撮らないで ください。', hiragana: 'ここで しゃしんを とらないで ください。', romaji: 'Koko de shashin o toranaide kudasai.', english: "Please don't take pictures here." }
        ]
      },
      {
        id: 'l17_g3',
        lessonNumber: 17,
        title: 'V ない-form なければ なりません (Obligation / Must / Have to)',
        structure: 'Verb [ない-form, drop い] + ければ なりません',
        explanation: 'Expresses that something must be done regardless of the will of the actor. Note that although it contains double negative morphology, the meaning is strictly positive obligation.',
        rules: [
          'のまない → のまなければ なりません (must drink / take).',
          '薬を 飲まなければ なりません (I must take medicine).',
          '土曜日までに 本を 返さなければ なりません (I must return the book by Saturday).'
        ],
        examples: [
          { japanese: '薬を 飲まなければ なりません。', hiragana: 'くすりを のまなければ なりません。', romaji: 'Kusuri o nomanakereba narimasen.', english: 'I must take medicine.' },
          { japanese: 'パスポートを 見せなければ なりません。', hiragana: 'ぱすぽーとを みせなければ なりません。', romaji: 'Pasupooto o misenakereba narimasen.', english: 'You must show your passport.' }
        ]
      },
      {
        id: 'l17_g4',
        lessonNumber: 17,
        title: 'V ない-form なくても いいです (Lack of Obligation: Need not / Do not have to)',
        structure: 'Verb [ない-form, drop い] + くても いいです',
        explanation: 'Indicates that the action described by the verb is optional and does not have to be done.',
        rules: [
          'あした 来なくても いいです (You don\'t have to come tomorrow).',
          '名前を 書かなくても いいです (You need not write your name).'
        ],
        examples: [
          { japanese: 'あした 来なくても いいです。', hiragana: 'あした こなくても いいです。', romaji: 'Ashita konakutemo ii desu.', english: "You don't have to come tomorrow." },
          { japanese: '子どもは お金を 払わなくても いいです。', hiragana: 'こどもは おかねを はらわなくても いいです。', romaji: 'Kodomo wa okane o harawanakutemo ii desu.', english: 'Children do not have to pay.' }
        ]
      },
      {
        id: 'l17_g5',
        lessonNumber: 17,
        title: 'N (time) までに V (Deadline / Time Limit)',
        structure: 'Noun (Time / Date) + までに + Verb',
        explanation: 'Indicates the time limit by which an action must be completed. Distinguish carefully from まで (which indicates continuous continuation until that time).',
        rules: [
          '土曜日までに 本を 返します (Return the book BY Saturday).',
          '５時まで 働きます (Work UNTIL five o\'clock).'
        ],
        examples: [
          { japanese: '土曜日までに 本を 返さなければ なりません。', hiragana: 'どようびまでに ほんを かえさなければ なりません。', romaji: 'Doyoubi made ni hon o kaesanakereba narimasen.', english: 'I must return the book by Saturday.' },
          { japanese: '会議は ５時までに 終わります。', hiragana: 'かいぎは ごじまでに おわります。', romaji: 'Kaigi wa go-ji made ni owarimasu.', english: 'The meeting will be over by five.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l17_ex1',
        lessonNumber: 17,
        type: 'mcq',
        category: 'grammar',
        prompt: 'What is the correct ない-form of the verb 買います (to buy)?',
        options: ['かわない', 'かかない', 'かあない', 'かいらない'],
        correctAnswer: 'かわない',
        explanation: 'Verbs ending in い before ます change to わ in the ない-form: 買います → 買わない.'
      },
      {
        id: 'l17_ex2',
        lessonNumber: 17,
        type: 'fill_blank',
        category: 'grammar',
        prompt: 'Fill in the blank: レポートは 金曜日 [ ? ] 出して ください。 (Please submit the report by Friday.)',
        options: ['までに', 'まで', 'から', 'に'],
        correctAnswer: 'までに',
        explanation: '〜までに indicates the deadline or time limit by which an action must occur.'
      },
      {
        id: 'l17_ex3',
        lessonNumber: 17,
        type: 'mcq',
        category: 'grammar',
        prompt: 'How do you say "You don\'t have to worry" in Japanese?',
        options: [
          '心配しないで ください。',
          '心配しなければ なりません。',
          '心配しなくても いいです。',
          '心配しては いけません。'
        ],
        correctAnswer: '心配しなくても いいです。',
        explanation: '〜なくてもいいです means "do not have to / need not". (心配しないでください means "please don\'t worry").'
      }
    ],
    dialogue: {
      title: 'どう しましたか (What seems to be the problem?)',
      situation: 'Mr. Matsumoto feels ill and visits the doctor with a cold, sore throat, and slight temperature.',
      lines: [
        { speaker: '医者', japanese: 'どう しましたか。', hiragana: 'どう しましたか。', english: 'What seems to be the problem?' },
        { speaker: '松本', japanese: 'きのうから のどが 痛くて、熱も 少し あります。', hiragana: 'きのうから のどが いたくて、ねつも すこし あります。', english: 'I have had a sore throat and a slight temperature since yesterday.' },
        { speaker: '医者', japanese: 'そうですか。ちょっと 口を 開けて ください。', hiragana: 'そうですか。ちょっと くちを あけて ください。', english: 'Well, please open your mouth.' },
        { speaker: '医者', japanese: '風邪ですね。ゆっくり 休んで ください。', hiragana: 'かぜですね。ゆっくり やすんで ください。', english: 'You have a cold. You need a good rest.' },
        { speaker: '松本', japanese: 'あのう、あしたから 東京へ 出張しなければ なりませんが……。', hiragana: 'あのう、あしたから とうきょうへ しゅっちょうしなければ なりませんが……。', english: 'Doctor, I have to go to Tokyo on business from tomorrow...' },
        { speaker: '医者', japanese: 'じゃ、今日は 薬を 飲んで、早く 寝て ください。', hiragana: 'じゃ、きょうは くすりを のんで、はやく ねて ください。', english: 'Well then, take this medicine and go to bed early today.' },
        { speaker: '松本', japanese: 'はい、わかりました。', hiragana: 'はい、わかりました。', english: 'Yes, doctor.' },
        { speaker: '医者', japanese: 'それから、今晩は お風呂に 入らないで ください。', hiragana: 'それから、こんばんは おふろに はいらないで ください。', english: 'And do not take a bath tonight.' },
        { speaker: '医者', japanese: 'お大事に。', hiragana: 'おだいじに。', english: 'Please take care.' },
        { speaker: '松本', japanese: 'どうも ありがとう ございました。', hiragana: 'どうも ありがとう ございました。', english: 'Thank you very much, doctor.' }
      ]
    }
  },

  // =========================================================================
  // LESSON 18: Dictionary Form, Ability (ことができます), Hobbies, Before (まえに)
  // Textbook Reference: Pages 134–139
  // =========================================================================
  {
    id: 18,
    lessonNumber: 18,
    level: 'N5',
    title: 'Lesson 18: Verb Dictionary Form, Potential/Ability & Hobbies',
    titleJapanese: '第１８課：辞書形・〜ことができます・趣味は〜ことです・〜まえに・ぜひ',
    theme: 'ミラーさんは漢字を読むことができます、わたしの趣味は写真を撮ることです、寝るまえに本を読みます',
    description: 'Learn the basic Dictionary Form (辞書形) of Japanese verbs, express ability and potential with 〜ことができます, state hobbies with 趣味は〜ことです, describe actions before other events with 〜まえに, and express strong desire with ぜひ.',
    keyPhrases: [
      'ミラーさんは 漢字を 読むことが できます。 (Mr. Miller can read Kanji.)',
      'わたしの 趣味は 映画を 見る ことです。 (My hobby is watching films.)',
      '寝る まえに、日記を 書きます。 (I write in my diary before I go to bed.)',
      'スキーが できますか。…はい、できます。 (Can you ski? ...Yes, I can.)',
      'カードで 払うことが できますか。…すみませんが、現金で お願いします。 (Can I pay by credit card? ...Sorry, cash please.)',
      'ぜひ 北海道へ 行きたいです。 (I am very eager to go to Hokkaido.)'
    ],
    vocabulary: [
      { id: 'l18_v1', lessonNumber: 18, kanji: 'できます II', hiragana: 'できます', romaji: 'dekimasu', english: 'be able to, can', partOfSpeech: 'verb-2', category: 'Verbs' },
      { id: 'l18_v2', lessonNumber: 18, kanji: '洗います I', hiragana: 'あらいます', romaji: 'araimasu', english: 'wash', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l18_v3', lessonNumber: 18, kanji: '弾きます I', hiragana: 'ひきます', romaji: 'hikimasu', english: 'play (stringed instrument or piano, etc.)', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l18_v4', lessonNumber: 18, kanji: '歌います I', hiragana: 'うたいます', romaji: 'utaimasu', english: 'sing', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l18_v5', lessonNumber: 18, kanji: '集めます II', hiragana: 'あつめます', romaji: 'atsumemasu', english: 'collect, gather', partOfSpeech: 'verb-2', category: 'Verbs' },
      { id: 'l18_v6', lessonNumber: 18, kanji: '捨てます II', hiragana: 'すてます', romaji: 'sutemasu', english: 'throw away', partOfSpeech: 'verb-2', category: 'Verbs' },
      { id: 'l18_v7', lessonNumber: 18, kanji: '換えます II', hiragana: 'かえます', romaji: 'kaemasu', english: 'exchange, change', partOfSpeech: 'verb-2', category: 'Verbs' },
      { id: 'l18_v8', lessonNumber: 18, kanji: '運転します III', hiragana: 'うんてんします', romaji: 'untenshimasu', english: 'drive', partOfSpeech: 'verb-3', category: 'Verbs' },
      { id: 'l18_v9', lessonNumber: 18, kanji: '予約します III', hiragana: 'よやくします', romaji: 'yoyakushimasu', english: 'reserve, book', partOfSpeech: 'verb-3', category: 'Verbs' },
      { id: 'l18_v10', lessonNumber: 18, kanji: '見学します III', hiragana: 'けんがくします', romaji: 'kengakushimasu', english: 'visit some place for study / inspection', partOfSpeech: 'verb-3', category: 'Verbs' },
      { id: 'l18_v11', lessonNumber: 18, kanji: 'ピアノ', hiragana: 'ピアノ', romaji: 'piano', english: 'piano', partOfSpeech: 'noun', category: 'Music' },
      { id: 'l18_v12', lessonNumber: 18, kanji: '〜メートル', hiragana: '〜メートル', romaji: '-meetoru', english: '- meter', partOfSpeech: 'counter', category: 'Measures' },
      { id: 'l18_v13', lessonNumber: 18, kanji: '国際〜', hiragana: 'こくさい〜', romaji: 'kokusai~', english: 'international ~', partOfSpeech: 'noun', category: 'General' },
      { id: 'l18_v14', lessonNumber: 18, kanji: '現金', hiragana: 'げんきん', romaji: 'genkin', english: 'cash', partOfSpeech: 'noun', category: 'Money' },
      { id: 'l18_v15', lessonNumber: 18, kanji: '趣味', hiragana: 'しゅみ', romaji: 'shumi', english: 'hobby', partOfSpeech: 'noun', category: 'Hobbies' },
      { id: 'l18_v16', lessonNumber: 18, kanji: '日記', hiragana: 'にっき', romaji: 'nikki', english: 'diary', partOfSpeech: 'noun', category: 'General' },
      { id: 'l18_v17', lessonNumber: 18, kanji: '[お]祈り', hiragana: '[お]いのり', romaji: '[o]inori', english: 'prayer (~を します: pray)', partOfSpeech: 'noun', category: 'Religion' },
      { id: 'l18_v18', lessonNumber: 18, kanji: '課長', hiragana: 'かちょう', romaji: 'kachou', english: 'section chief', partOfSpeech: 'noun', category: 'Occupations' },
      { id: 'l18_v19', lessonNumber: 18, kanji: '部長', hiragana: 'ぶちょう', romaji: 'buchou', english: 'department chief', partOfSpeech: 'noun', category: 'Occupations' },
      { id: 'l18_v20', lessonNumber: 18, kanji: '社長', hiragana: 'しゃちょう', romaji: 'shachou', english: 'president of a company', partOfSpeech: 'noun', category: 'Occupations' },
      { id: 'l18_v21', lessonNumber: 18, kanji: '動物', hiragana: 'どうぶつ', romaji: 'doubutsu', english: 'animal', partOfSpeech: 'noun', category: 'Nature' },
      { id: 'l18_v22', lessonNumber: 18, kanji: '馬', hiragana: 'うま', romaji: 'uma', english: 'horse', partOfSpeech: 'noun', category: 'Nature' },
      { id: 'l18_v23', lessonNumber: 18, kanji: 'へえ', hiragana: 'へえ', romaji: 'Hee', english: 'Really! (expressing surprise)', partOfSpeech: 'phrase', category: 'Conversations' },
      { id: 'l18_v24', lessonNumber: 18, kanji: 'それは おもしろいですね。', hiragana: 'それは おもしろいですね。', romaji: 'Sore wa omoshiroi desu ne.', english: 'That must be interesting.', partOfSpeech: 'phrase', category: 'Conversations' },
      { id: 'l18_v25', lessonNumber: 18, kanji: 'なかなか', hiragana: 'なかなか', romaji: 'nakanaka', english: 'not easily (used with negatives)', partOfSpeech: 'adverb', category: 'Degree' },
      { id: 'l18_v26', lessonNumber: 18, kanji: '牧場', hiragana: 'ぼくじょう', romaji: 'bokujou', english: 'ranch, stock farm', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l18_v27', lessonNumber: 18, kanji: 'ほんとうですか。', hiragana: 'ほんとうですか。', romaji: 'Hontou desu ka.', english: 'Really? / Is that true?', partOfSpeech: 'phrase', category: 'Conversations' },
      { id: 'l18_v28', lessonNumber: 18, kanji: 'ぜひ', hiragana: 'ぜひ', romaji: 'zehi', english: 'by all means, certainly', partOfSpeech: 'adverb', category: 'Manner' },
      { id: 'l18_v29', lessonNumber: 18, kanji: 'ビートルズ', hiragana: 'ビートルズ', romaji: 'Biitoruzu', english: 'The Beatles', partOfSpeech: 'noun', category: 'Music' }
    ],
    grammar: [
      {
        id: 'l18_g1',
        lessonNumber: 18,
        title: '動詞の 辞書形 (Dictionary Form Conjugation)',
        structure: 'Group I: [い-line] -> [う-line] | Group II: drop ます + る | Group III: する / くる',
        explanation: 'The dictionary form (辞書形) is the plain citation form of verbs found in dictionaries.',
        rules: [
          'Group I: The syllable of the い-line before ます changes into the corresponding sound of the う-line: かきます→かく、のみます→のむ、いきます→いく、あそびます→あそぶ、まちます→まつ、とります→とる、はなします→はなす.',
          'Group II: Attach る to the ます-stem: たべます→たべる、みます→みる、おきます→おきる.',
          'Group III: します→する (べんきょうします→べんきょうする)、来ます (きます) → 来る (くる).'
        ],
        examples: [
          { japanese: 'かきます（書きます）→ かく', hiragana: 'かきます → かく', romaji: 'kakimasu -> kaku', english: 'write -> write (dictionary form)' },
          { japanese: 'たべます（食べます）→ たべる', hiragana: 'たべます → たべる', romaji: 'tabemasu -> taberu', english: 'eat -> eat (dictionary form)' },
          { japanese: 'きます（来ます）→ くる', hiragana: 'きます → くる', romaji: 'kimasu -> kuru', english: 'come -> come (dictionary form)' }
        ]
      },
      {
        id: 'l18_g2',
        lessonNumber: 18,
        title: 'N が できます / V 辞書形 こと が できます (Ability & Possibility)',
        structure: 'Noun / [Verb 辞書形 + こと] + が できます',
        explanation: 'できます expresses ability ("can do") or possibility ("is possible"). When expressing ability with a verb, attach こと to turn the verb into a noun phrase (nominalization).',
        rules: [
          'ミラーさんは 日本語が できます (Mr. Miller can speak Japanese).',
          'ミラーさんは 漢字を 読むことが できます (Mr. Miller can read Kanji).',
          'カードで 払うことが できます (You can pay by card).'
        ],
        examples: [
          { japanese: 'ミラーさんは 漢字を 読むことが できます。', hiragana: 'みらーさんは かんじを よむことが できます。', romaji: 'Miraa-san wa kanji o yomu koto ga dekimasu.', english: 'Mr. Miller can read Kanji.' },
          { japanese: 'ここで カードで 払うことが できますか。', hiragana: 'ここで かーどで はらうことが できますか。', romaji: 'Koko de kaado de harau koto ga dekimasu ka.', english: 'Can I pay by credit card here?' }
        ]
      },
      {
        id: 'l18_g3',
        lessonNumber: 18,
        title: 'わたしの 趣味は N / V 辞書形 こと です (Expressing Hobbies)',
        structure: 'わたしの 趣味は + [Noun / Verb 辞書形 + こと] + です',
        explanation: 'Expresses what your hobbies are. Using V-辞書形 + こと allows describing activities in specific detail.',
        rules: [
          'わたしの 趣味は 音楽です (My hobby is music).',
          'わたしの 趣味は 音楽を 聞くことです (My hobby is listening to music).'
        ],
        examples: [
          { japanese: 'わたしの 趣味は 映画を 見る ことです。', hiragana: 'わたしの しゅみは えいがを みる ことです。', romaji: 'Watashi no shumi wa eiga o miru koto desu.', english: 'My hobby is watching films.' },
          { japanese: '趣味は 何ですか。…古い 時計を 集める ことです。', hiragana: 'しゅみは なんですか。…ふるい とけいを あつめる ことです。', romaji: 'Shumi wa nan desu ka. ...Furui tokei o atsumeru koto desu.', english: 'What is your hobby? ...Collecting old clocks and watches.' }
        ]
      },
      {
        id: 'l18_g4',
        lessonNumber: 18,
        title: 'V1 辞書形 / N の / 期間 まえに、V2 (Before doing...)',
        structure: '[Verb 辞書形 / Noun + の / Quantifier of Time] + まえに、Verb 2',
        explanation: 'Indicates that action V2 occurs prior to V1 or prior to a stated time.',
        rules: [
          '日本へ 来る まえに、日本語を 勉強しました (I studied Japanese before coming to Japan). Note: V1 is always in dictionary form, even for past events!',
          '食事の まえに、手を 洗います (Wash hands before meals).',
          '田中さんは １時間まえに 出かけました (Mr. Tanaka left an hour ago).'
        ],
        examples: [
          { japanese: '寝る まえに、本を 読みます。', hiragana: 'ねる まえに、ほんを よみます。', romaji: 'Neru mae ni, hon o yomimasu.', english: 'I read a book before I go to bed.' },
          { japanese: '日本へ 来る まえに、日本語を 勉強しました。', hiragana: 'にほんへ くる まえに、にほんごを べんきょうしました。', romaji: 'Nihon e kuru mae ni, nihongo o benkyoushimashita.', english: 'I studied Japanese before I came to Japan.' }
        ]
      },
      {
        id: 'l18_g5',
        lessonNumber: 18,
        title: 'ぜひ (By All Means / Eagerly)',
        structure: 'ぜひ + [〜たいです / 〜てください]',
        explanation: 'Used with expressions of desire (たいです、欲しいです) or invitation/requests (てください) to strongly emphasize enthusiasm.',
        rules: [
          'ぜひ 北海道へ 行きたいです (I really want to go to Hokkaido).',
          'ぜひ 遊びに 来て ください (Please do come and visit me).'
        ],
        examples: [
          { japanese: 'ぜひ 北海道へ 行きたいです。', hiragana: 'ぜひ ほっかいどうへ いきたいです。', romaji: 'Zehi Hokkaidou e ikitai desu.', english: 'I want to go to Hokkaido very much.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l18_ex1',
        lessonNumber: 18,
        type: 'mcq',
        category: 'grammar',
        prompt: 'What is the dictionary form of 飲みます (nomimasu)?',
        options: ['のむ', 'のま', 'のめる', 'のまる'],
        correctAnswer: 'のむ',
        explanation: 'Group I verb: い-line before ます changes to the う-line (み → む).'
      },
      {
        id: 'l18_ex2',
        lessonNumber: 18,
        type: 'fill_blank',
        category: 'grammar',
        prompt: 'Fill in the blank: ご飯を [ ? ] まえに、手を 洗います。 (Before eating meals, I wash my hands.)',
        options: ['食べる', '食べた', '食べて', '食べない'],
        correctAnswer: '食べる',
        explanation: 'Before まえに, verbs always take the non-past dictionary form (辞書形).'
      },
      {
        id: 'l18_ex3',
        lessonNumber: 18,
        type: 'mcq',
        category: 'grammar',
        prompt: 'How do you say "Can you drive a car?" in Japanese?',
        options: [
          '車の 運転が できますか。',
          '車を 運転する ことが できますか。',
          'Both A and B are correct.',
          '車を 運転に なりますか。'
        ],
        correctAnswer: 'Both A and B are correct.',
        explanation: 'Both "Noun が できます" and "Verb 辞書形 こと が できます" are completely correct.'
      }
    ],
    dialogue: {
      title: '趣味は何ですか (What is your hobby?)',
      situation: 'Mr. Santos and Mr. Yamada chat about Santos\'s hobby of photographing animals, especially horses in Hokkaido.',
      lines: [
        { speaker: '山田', japanese: 'サントスさんの 趣味は 何ですか。', hiragana: 'さんとすさんの しゅみは なんですか。', english: 'What is your hobby, Mr. Santos?' },
        { speaker: 'サントス', japanese: '写真です。', hiragana: 'しゃしんです。', english: 'Photography.' },
        { speaker: '山田', japanese: 'どんな 写真を 撮りますか。', hiragana: 'どんな しゃしんを とりますか。', english: 'What kind of photos do you take?' },
        { speaker: 'サントス', japanese: '動物の 写真です。特に 馬が 好きです。', hiragana: 'どうぶつの しゃしんです。とくに うまが すきです。', english: 'Photos of animals. I like those of horses, especially.' },
        { speaker: '山田', japanese: 'へえ、それは おもしろいですね。日本へ 来てから、馬の 写真を 撮りましたか。', hiragana: 'へえ、それは おもしろいですね。にほんへ きてから、うまの しゃしんを とりましたか。', english: 'Really! That must be interesting. Have you taken photos of horses since coming to Japan?' },
        { speaker: 'サントス', japanese: 'いいえ。日本では なかなか 馬を 見ることが できません。', hiragana: 'いいえ。にほんでは なかなか うまを みることが できません。', english: 'No. You can hardly ever see horses in Japan.' },
        { speaker: '山田', japanese: '北海道には 牧場が たくさん ありますよ。', hiragana: 'ほっかいどうには ぼくじょうが たくさん ありますよ。', english: 'There is a lot of pastureland for horses in Hokkaido.' },
        { speaker: 'サントス', japanese: '本当ですか。じゃ、夏休みに ぜひ 行きたいです。', hiragana: 'ほんとうですか。じゃ、なつやすみに ぜひ いきたいです。', english: 'Really? Then I would really like to go there on summer vacation.' }
      ]
    }
  },

  // =========================================================================
  // LESSON 19: Ta-Form, Past Experience (たことがあります), Listing (たり〜たり), Changes (〜になる)
  // Textbook Reference: Pages 140–145
  // =========================================================================
  {
    id: 19,
    lessonNumber: 19,
    level: 'N5',
    title: 'Lesson 19: Ta-Form, Past Experience (〜たことがあります) & Actions Listing (〜たり〜たり)',
    titleJapanese: '第１９課：た形・〜たことがあります・〜たり〜たりします・〜くなります／〜になります',
    theme: '相撲を見たことがあります、日曜日はテニスをしたり映画を見たりします、寒くなります',
    description: 'Learn the past plain Ta-form (た形), express past personal experiences with 〜たことがあります, list multiple non-exhaustive actions with 〜たり〜たりします, and describe changes in conditions with 〜になります.',
    keyPhrases: [
      '相撲を 見た ことが あります。 (I have been to see sumo.)',
      '休みの 日は テニスを したり、散歩に 行ったり します。 (On holidays I play tennis, take walks and so on.)',
      'これから だんだん 暑く なります。 (It\'s going to get hotter and hotter from now on.)',
      '北海道へ 行った ことが ありますか。…はい、一度 あります。 (Have you been to Hokkaido? ...Yes, once.)',
      '馬に 乗った ことが ありますか。…いいえ、一度も ありません。 (Have you ever ridden a horse? ...No, never.)',
      '寒く なりましたね。…そうですね。 (It\'s got cold, hasn\'t it? ...Yes, it has.)'
    ],
    vocabulary: [
      { id: 'l19_v1', lessonNumber: 19, kanji: '登ります I', hiragana: 'のぼります', romaji: 'noborimasu', english: 'climb [a mountain]', partOfSpeech: 'verb-1', category: 'Verbs', notes: '[山に〜] climb [a mountain]' },
      { id: 'l19_v2', lessonNumber: 19, kanji: '泊まります I', hiragana: 'とまります', romaji: 'tomarimasu', english: 'stay [at a hotel]', partOfSpeech: 'verb-1', category: 'Verbs', notes: '[ホテルに〜] stay [at a hotel]' },
      { id: 'l19_v3', lessonNumber: 19, kanji: '掃除します III', hiragana: 'そうじします', romaji: 'soujishimasu', english: 'clean (a room)', partOfSpeech: 'verb-3', category: 'Verbs' },
      { id: 'l19_v4', lessonNumber: 19, kanji: '洗濯します III', hiragana: 'せんたくします', romaji: 'sentakushimasu', english: 'wash (clothes)', partOfSpeech: 'verb-3', category: 'Verbs' },
      { id: 'l19_v5', lessonNumber: 19, kanji: '練習します III', hiragana: 'れんしゅうします', romaji: 'renshuushimasu', english: 'practice', partOfSpeech: 'verb-3', category: 'Verbs' },
      { id: 'l19_v6', lessonNumber: 19, kanji: 'なります I', hiragana: 'なります', romaji: 'narimasu', english: 'become', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l19_v7', lessonNumber: 19, kanji: '眠い', hiragana: 'ねむい', romaji: 'nemui', english: 'sleepy', partOfSpeech: 'i-adjective', category: 'Feelings' },
      { id: 'l19_v8', lessonNumber: 19, kanji: '強い', hiragana: 'つよい', romaji: 'tsuyoi', english: 'strong', partOfSpeech: 'i-adjective', category: 'Descriptions' },
      { id: 'l19_v9', lessonNumber: 19, kanji: '弱い', hiragana: 'よわい', romaji: 'yowai', english: 'weak', partOfSpeech: 'i-adjective', category: 'Descriptions' },
      { id: 'l19_v10', lessonNumber: 19, kanji: '調子が いい', hiragana: 'ちょうしが いい', romaji: 'choushi ga ii', english: 'be in good condition', partOfSpeech: 'phrase', category: 'Health' },
      { id: 'l19_v11', lessonNumber: 19, kanji: '調子が 悪い', hiragana: 'ちょうしが わるい', romaji: 'choushi ga warui', english: 'be in bad condition', partOfSpeech: 'phrase', category: 'Health' },
      { id: 'l19_v12', lessonNumber: 19, kanji: '調子', hiragana: 'ちょうし', romaji: 'choushi', english: 'condition', partOfSpeech: 'noun', category: 'Health' },
      { id: 'l19_v13', lessonNumber: 19, kanji: 'ゴルフ', hiragana: 'ゴルフ', romaji: 'gorufu', english: 'golf (~を します: play golf)', partOfSpeech: 'noun', category: 'Sports' },
      { id: 'l19_v14', lessonNumber: 19, kanji: '相撲', hiragana: 'すもう', romaji: 'sumou', english: 'sumo wrestling', partOfSpeech: 'noun', category: 'Sports' },
      { id: 'l19_v15', lessonNumber: 19, kanji: 'パチンコ', hiragana: 'パチンコ', romaji: 'pachinko', english: 'pinball game (~を します: play pachinko)', partOfSpeech: 'noun', category: 'Hobbies' },
      { id: 'l19_v16', lessonNumber: 19, kanji: 'お茶', hiragana: 'おちゃ', romaji: 'ocha', english: 'tea ceremony', partOfSpeech: 'noun', category: 'Culture' },
      { id: 'l19_v17', lessonNumber: 19, kanji: '日', hiragana: 'ひ', romaji: 'hi', english: 'day, date', partOfSpeech: 'noun', category: 'Time' },
      { id: 'l19_v18', lessonNumber: 19, kanji: '一度', hiragana: 'いちど', romaji: 'ichido', english: 'once', partOfSpeech: 'adverb', category: 'Frequency' },
      { id: 'l19_v19', lessonNumber: 19, kanji: '一度も', hiragana: 'いちども', romaji: 'ichidomo', english: 'not once, never (with negatives)', partOfSpeech: 'adverb', category: 'Frequency' },
      { id: 'l19_v20', lessonNumber: 19, kanji: 'だんだん', hiragana: 'だんだん', romaji: 'dandan', english: 'gradually', partOfSpeech: 'adverb', category: 'Degree' },
      { id: 'l19_v21', lessonNumber: 19, kanji: 'もうすぐ', hiragana: 'もうすぐ', romaji: 'mousugu', english: 'soon', partOfSpeech: 'adverb', category: 'Time' },
      { id: 'l19_v22', lessonNumber: 19, kanji: 'おかげさまで', hiragana: 'おかげさまで', romaji: 'okagesama de', english: 'Thank you (expressing gratitude for help received)', partOfSpeech: 'phrase', category: 'Greetings' },
      { id: 'l19_v23', lessonNumber: 19, kanji: '乾杯', hiragana: 'かんぱい', romaji: 'kanpai', english: 'Bottoms up! / Cheers!', partOfSpeech: 'phrase', category: 'Social' },
      { id: 'l19_v24', lessonNumber: 19, kanji: '実は', hiragana: 'じつは', romaji: 'jitsu wa', english: 'actually, to tell the truth', partOfSpeech: 'adverb', category: 'Conversations' },
      { id: 'l19_v25', lessonNumber: 19, kanji: 'ダイエット', hiragana: 'ダイエット', romaji: 'daietto', english: 'diet (~を します: go on a diet)', partOfSpeech: 'noun', category: 'Health' },
      { id: 'l19_v26', lessonNumber: 19, kanji: '何回も', hiragana: 'なんかいも', romaji: 'nan-kai mo', english: 'many times', partOfSpeech: 'adverb', category: 'Frequency' },
      { id: 'l19_v27', lessonNumber: 19, kanji: 'しかし', hiragana: 'しかし', romaji: 'shikashi', english: 'but, however', partOfSpeech: 'conjunction', category: 'Conjunctions' },
      { id: 'l19_v28', lessonNumber: 19, kanji: '無理[な]', hiragana: 'むり[な]', romaji: 'muri[na]', english: 'excessive, impossible', partOfSpeech: 'na-adjective', category: 'Adjectives' },
      { id: 'l19_v29', lessonNumber: 19, kanji: '体に いい', hiragana: 'からだに いい', romaji: 'karada ni ii', english: 'good for one\'s health', partOfSpeech: 'phrase', category: 'Health' },
      { id: 'l19_v30', lessonNumber: 19, kanji: 'ケーキ', hiragana: 'ケーキ', romaji: 'keeki', english: 'cake', partOfSpeech: 'noun', category: 'Food' }
    ],
    grammar: [
      {
        id: 'l19_g1',
        lessonNumber: 19,
        title: '動詞の た形 (Verb Ta-form Conjugation)',
        structure: 'Same rules as て-form: replace て with た, and で with だ',
        explanation: 'The verb た-form is the plain past form. Conjugation follows the exact same patterns as the て-form learned in Lesson 14.',
        rules: [
          'Group I: かいて→かいた、のんで→のんだ、いって→いった、まって→まった.',
          'Group II: たべて→たべた、みて→みた.',
          'Group III: して→した、きて→きた.'
        ],
        examples: [
          { japanese: 'かきます → かいて → かいた', hiragana: 'かきます → かいて → かいた', romaji: 'kakimasu -> kaite -> kaita', english: 'write -> wrote (plain)' },
          { japanese: 'のみます → のんで → のんだ', hiragana: 'のみます → のんで → のんだ', romaji: 'nomimasu -> nonde -> nonda', english: 'drink -> drank (plain)' }
        ]
      },
      {
        id: 'l19_g2',
        lessonNumber: 19,
        title: 'V た-form ことが あります (Past Life Experience)',
        structure: 'Verb [た-form] + ことが あります',
        explanation: 'Used to describe what one has experienced in the past. It differs from simple past tense in that it treats the event as a life experience.',
        rules: [
          '馬に 乗った ことが あります (I have ridden a horse).',
          '一度も ありません (Never / not even once).'
        ],
        examples: [
          { japanese: '馬に 乗った ことが あります。', hiragana: 'うまに のった ことが あります。', romaji: 'Uma ni notta koto ga arimasu.', english: 'I have ridden a horse.' },
          { japanese: '北海道へ 行った ことが ありますか。…いいえ、一度も ありません。', hiragana: 'ほっかいどうへ いった ことが ありますか。…いいえ、いちども ありません。', romaji: 'Hokkaidou e itta koto ga arimasu ka. ...Iie, ichidomo arimasen.', english: 'Have you ever been to Hokkaido? ...No, not once.' }
        ]
      },
      {
        id: 'l19_g3',
        lessonNumber: 19,
        title: 'V1 た-form り、V2 た-form り します (Listing Representative Actions)',
        structure: 'V1 [た-form] + り、V2 [た-form] + り + します / しました',
        explanation: 'Used to list representative actions among several. Unlike the 〜て sequence from Lesson 16, there is no strict chronological order implied.',
        rules: [
          '日曜日は テニスを したり、映画を 見たり します (On Sundays I play tennis, watch movies, and so on).',
          'Past tense is indicated at the end: 〜たり 映画を 見たり しました.'
        ],
        examples: [
          { japanese: '日曜日は テニスを したり、映画を 見たり します。', hiragana: 'にちようびは てにすを したり、えいがを みたり します。', romaji: 'Nichiyoubi wa tenisu o shitari, eiga o mitari shimasu.', english: 'On Sundays I play tennis, see a movie and so on.' },
          { japanese: 'きのうは 買い物を したり、友達と 話したり しました。', hiragana: 'きのうは かいものを したり、ともだちと はなしたり しました。', romaji: 'Kinou wa kaimono o shitari, tomodachi to hanashitari shimashita.', english: 'Yesterday I did some shopping, chatted with friends and so on.' }
        ]
      },
      {
        id: 'l19_g4',
        lessonNumber: 19,
        title: '〜くなります / 〜になります (Becoming / Change of State)',
        structure: 'い-adj: 〜く | な-adj: 〜に | Noun: 〜に + なります',
        explanation: 'なります means "become" and indicates changes in a state or condition.',
        rules: [
          'さむい → さむく なります (become cold).',
          '元気[な] → 元気に なります (become energetic / recover).',
          '25歳 → 25歳に なります (become 25 years old).'
        ],
        examples: [
          { japanese: 'これから だんだん 寒く なります。', hiragana: 'これから だんだん さむく なります。', romaji: 'Korekara dandan samuku narimasu.', english: "It's going to get colder and colder from now on." },
          { japanese: 'テレサちゃんは 10歳に なりました。', hiragana: 'てれさちゃんは じゅっさいに なりました。', romaji: 'Teresa-chan wa jus-sai ni narimashita.', english: 'Teresa became 10 years old.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l19_ex1',
        lessonNumber: 19,
        type: 'mcq',
        category: 'grammar',
        prompt: 'Which sentence correctly means "I have eaten sushi before"?',
        options: [
          '寿司を 食べた ことが あります。',
          '寿司を 食べる ことが あります。',
          '寿司を 食べて ことが あります。',
          '寿司を 食べたい ことが あります。'
        ],
        correctAnswer: '寿司を 食べた ことが あります。',
        explanation: 'Past experience uses [Ta-form] + ことが あります.'
      },
      {
        id: 'l19_ex2',
        lessonNumber: 19,
        type: 'fill_blank',
        category: 'grammar',
        prompt: 'Fill in the blank: 週末は 部屋を 掃除し [ ? ]、洗濯し [ ? ] します。 (On weekends I clean my room, do laundry, etc.)',
        options: ['たり / たり', 'て / て', 'から / から', 'まえ / まえ'],
        correctAnswer: 'たり / たり',
        explanation: 'Representative action listing uses 〜たり、〜たり します.'
      },
      {
        id: 'l19_ex3',
        lessonNumber: 19,
        type: 'mcq',
        category: 'grammar',
        prompt: 'How do you say "It became warm" in Japanese using あたたかい?',
        options: [
          '暖かく なりました。',
          '暖かいに なりました。',
          '暖かくで なりました。',
          '暖かくて なりました。'
        ],
        correctAnswer: '暖かく なりました。',
        explanation: 'For い-adjectives, change the final い to く before なります.'
      }
    ],
    dialogue: {
      title: 'ダイエットは あしたから (As for my diet, I\'ll start it tomorrow)',
      situation: 'Ms. Maria visits the Matsumoto family for dinner. Although she says she is on a diet, she cannot resist Mrs. Matsumoto\'s delicious cake.',
      lines: [
        { speaker: '全員', japanese: '乾杯！', hiragana: 'かんぱい！', english: 'Cheers!' },
        { speaker: '松本夫人', japanese: 'マリアさん、あまり 食べませんね。', hiragana: 'まりあさん、あまり たべませんね。', english: "Why, Ms. Maria, you're not eating much." },
        { speaker: 'マリア', japanese: 'ええ。実は きのうから ダイエットを して います。', hiragana: 'ええ。じつは きのうから だいえっとを して います。', english: 'No. To tell the truth, I have been on a diet since yesterday.' },
        { speaker: '松本夫人', japanese: 'そうですか。わたしも 何回も ダイエットを した ことが ありますよ。', hiragana: 'そうですか。わたしも なんかいも だいえっとを した ことが ありますよ。', english: 'Have you? I have tried being on a diet many times, too.' },
        { speaker: 'マリア', japanese: 'どんな ダイエットですか。', hiragana: 'どんな だいえっとですか。', english: 'What kind of diets have you tried?' },
        { speaker: '松本夫人', japanese: '毎日 りんごだけ 食べたり、水を たくさん 飲んだり しました。', hiragana: 'まいにち りんごだけ たべたり、みずを たくさん のんだり しました。', english: 'I tried eating only apples, and drinking a lot of water, and so on.' },
        { speaker: '松本', japanese: 'しかし、無理な ダイエットは 体に よくありませんよ。', hiragana: 'しかし、むりな だいえっとは からだに よくありませんよ。', english: "I'm afraid strict diets are not good for your health." },
        { speaker: '松本夫人', japanese: 'マリアさん、この ケーキ、おいしいですよ。', hiragana: 'まりあさん、この けーき、おいしいですよ。', english: 'Ms. Maria, this cake is delicious.' },
        { speaker: 'マリア', japanese: 'そうですか。……じゃ、ダイエットは あしたから します。', hiragana: 'そうですか。……じゃ、だいえっとは あしたから します。', english: "Is it? ...Well, I'll start dieting again tomorrow." }
      ]
    }
  },

  // =========================================================================
  // LESSON 20: Polite Style vs Plain Style (普通体) & Casual Speech
  // Textbook Reference: Pages 146–151
  // =========================================================================
  {
    id: 20,
    lessonNumber: 20,
    level: 'N5',
    title: 'Lesson 20: Polite Style vs Plain Style (普通体) & Casual Conversation',
    titleJapanese: '第２０課：普通体（常体）・丁寧体との対比・日常会話での省略規則・〜けど',
    theme: 'あした東京へ行く、今晩暇？、うん、飲む、辞書持ってる？',
    description: 'Learn the distinction between Polite Style (丁寧体: です／ます) and Plain Style (普通体), understand social contexts of use, master plain conversation patterns (omitting か, dropping だ in questions, dropping particles), and express contrasts with 〜けど.',
    keyPhrases: [
      'サントスさんは パーティーに 来なかった。 (Mr. Santos did not come to the party.)',
      '日本は 物価が 高い。 (Things are expensive in Japan.)',
      '沖縄の 海は きれいだった。 (The sea around Okinawa was beautiful.)',
      '今日は わたしの 誕生日だ。 (Today is my birthday.)',
      'コーヒーを 飲む？…うん、飲む。 (Do you want a coffee? ...Yes, I do.)',
      '今晩 暇？…ううん、暇じゃない。 (Are you free tonight? ...No, I am not.)'
    ],
    vocabulary: [
      { id: 'l20_v1', lessonNumber: 20, kanji: '要ります I', hiragana: 'いります', romaji: 'irimasu', english: 'need, require [a visa]', partOfSpeech: 'verb-1', category: 'Verbs', notes: '[ビザが〜] need [a visa]' },
      { id: 'l20_v2', lessonNumber: 20, kanji: '調べます II', hiragana: 'しらべます', romaji: 'shirabemasu', english: 'check, investigate', partOfSpeech: 'verb-2', category: 'Verbs' },
      { id: 'l20_v3', lessonNumber: 20, kanji: '直します I', hiragana: 'なおします', romaji: 'naoshimasu', english: 'repair, correct', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l20_v4', lessonNumber: 20, kanji: '修理します III', hiragana: 'しゅうりします', romaji: 'shuurishimasu', english: 'repair, fix', partOfSpeech: 'verb-3', category: 'Verbs' },
      { id: 'l20_v5', lessonNumber: 20, kanji: '電話します III', hiragana: 'でんわします', romaji: 'denwashimasu', english: 'phone, make a phone call', partOfSpeech: 'verb-3', category: 'Verbs' },
      { id: 'l20_v6', lessonNumber: 20, kanji: '僕', hiragana: 'ぼく', romaji: 'boku', english: 'I (informal equivalent of わたし used by men)', partOfSpeech: 'pronoun', category: 'Pronouns' },
      { id: 'l20_v7', lessonNumber: 20, kanji: '君', hiragana: 'きみ', romaji: 'kimi', english: 'you (informal equivalent of あなた used by men)', partOfSpeech: 'pronoun', category: 'Pronouns' },
      { id: 'l20_v8', lessonNumber: 20, kanji: '〜君', hiragana: '〜くん', romaji: '-kun', english: 'Mr. (informal suffix added to boy/man\'s name)', partOfSpeech: 'phrase', category: 'Suffixes' },
      { id: 'l20_v9', lessonNumber: 20, kanji: 'うん', hiragana: 'うん', romaji: 'un', english: 'yes (informal equivalent of はい)', partOfSpeech: 'phrase', category: 'Conversations' },
      { id: 'l20_v10', lessonNumber: 20, kanji: 'ううん', hiragana: 'ううん', romaji: 'uun', english: 'no (informal equivalent of いいえ)', partOfSpeech: 'phrase', category: 'Conversations' },
      { id: 'l20_v11', lessonNumber: 20, kanji: 'サラリーマン', hiragana: 'サラリーマン', romaji: 'sarariiman', english: 'salaried worker, office worker', partOfSpeech: 'noun', category: 'Occupations' },
      { id: 'l20_v12', lessonNumber: 20, kanji: 'ことば', hiragana: 'ことば', romaji: 'kotoba', english: 'word, language', partOfSpeech: 'noun', category: 'General' },
      { id: 'l20_v13', lessonNumber: 20, kanji: '物価', hiragana: 'ぶっか', romaji: 'bukka', english: 'commodity prices', partOfSpeech: 'noun', category: 'Society' },
      { id: 'l20_v14', lessonNumber: 20, kanji: '着物', hiragana: 'きもの', romaji: 'kimono', english: 'kimono (traditional Japanese attire)', partOfSpeech: 'noun', category: 'Culture' },
      { id: 'l20_v15', lessonNumber: 20, kanji: 'ビザ', hiragana: 'ビザ', romaji: 'biza', english: 'visa', partOfSpeech: 'noun', category: 'Travel' },
      { id: 'l20_v16', lessonNumber: 20, kanji: '初め', hiragana: 'はじめ', romaji: 'hajime', english: 'the beginning', partOfSpeech: 'noun', category: 'Time' },
      { id: 'l20_v17', lessonNumber: 20, kanji: '終わり', hiragana: 'おわり', romaji: 'owari', english: 'the end', partOfSpeech: 'noun', category: 'Time' },
      { id: 'l20_v18', lessonNumber: 20, kanji: 'こっち', hiragana: 'こっち', romaji: 'kocchi', english: 'this way, this place (informal こちら)', partOfSpeech: 'pronoun', category: 'Demonstratives' },
      { id: 'l20_v19', lessonNumber: 20, kanji: 'そっち', hiragana: 'そっち', romaji: 'socchi', english: 'that way, that place (informal そちら)', partOfSpeech: 'pronoun', category: 'Demonstratives' },
      { id: 'l20_v20', lessonNumber: 20, kanji: 'あっち', hiragana: 'あっち', romaji: 'acchi', english: 'that way over there (informal あちら)', partOfSpeech: 'pronoun', category: 'Demonstratives' },
      { id: 'l20_v21', lessonNumber: 20, kanji: 'どっち', hiragana: 'どっち', romaji: 'docchi', english: 'which one (between two), which way (informal どちら)', partOfSpeech: 'pronoun', category: 'Question Words' },
      { id: 'l20_v22', lessonNumber: 20, kanji: 'この間', hiragana: 'このあいだ', romaji: 'kono aida', english: 'the other day, recently', partOfSpeech: 'noun', category: 'Time' },
      { id: 'l20_v23', lessonNumber: 20, kanji: 'みんなで', hiragana: 'みんなで', romaji: 'minna de', english: 'all together', partOfSpeech: 'adverb', category: 'Quantities' },
      { id: 'l20_v24', lessonNumber: 20, kanji: '〜けど', hiragana: '〜けど', romaji: '-kedo', english: '~, but (informal equivalent of が)', partOfSpeech: 'conjunction', category: 'Conjunctions' },
      { id: 'l20_v25', lessonNumber: 20, kanji: '国へ 帰るの？', hiragana: 'くにへ かえるの？', romaji: 'Kuni e kaeru no?', english: 'Are you going back to your country?', partOfSpeech: 'phrase', category: 'Conversations' },
      { id: 'l20_v26', lessonNumber: 20, kanji: 'どう するの？', hiragana: 'どう するの？', romaji: 'Dou suru no?', english: 'What will you do?', partOfSpeech: 'phrase', category: 'Conversations' },
      { id: 'l20_v27', lessonNumber: 20, kanji: 'どう しようかな。', hiragana: 'どう しようかな。', romaji: 'Dou shiyou ka na.', english: 'What shall I do?', partOfSpeech: 'phrase', category: 'Conversations' },
      { id: 'l20_v28', lessonNumber: 20, kanji: 'よかったら', hiragana: 'よかったら', romaji: 'yokattara', english: 'if you like', partOfSpeech: 'phrase', category: 'Conversations' },
      { id: 'l20_v29', lessonNumber: 20, kanji: 'いろいろ', hiragana: 'いろいろ', romaji: 'iroiro', english: 'various', partOfSpeech: 'adverb', category: 'Descriptions' }
    ],
    grammar: [
      {
        id: 'l20_g1',
        lessonNumber: 20,
        title: '丁寧体と普通体 (Polite Style vs. Plain Style)',
        structure: 'Polite (です/ます) vs. Plain (辞書形/ない形/た形/だ)',
        explanation: 'Japanese has two primary styles of speech: Polite style (丁寧体) and Plain style (普通体).',
        rules: [
          'Verbs non-past: 行きます (Polite) -> 行く (Plain), 行きません -> 行かない',
          'Verbs past: 行きました -> 行った, 行きませんでした -> 行かなかった',
          'い-adj non-past: 忙しいです -> 忙しい, 忙しくないです -> 忙しくない',
          'い-adj past: 忙しかったです -> 忙しかった, 忙しくなかったです -> 忙しくなかった',
          'Noun/な-adj non-past: 暇です -> 暇だ, 暇じゃありません -> 暇じゃない',
          'Noun/な-adj past: 暇でした -> 暇だった, 暇じゃありませんでした -> 暇じゃなかった'
        ],
        examples: [
          { japanese: 'あした 東京へ 行きます。 → あした 東京へ 行く。', hiragana: 'あした とうきょうへ いきます。 → あした とうきょうへ いく。', romaji: 'Ashita Toukyou e ikimasu. -> Ashita Toukyou e iku.', english: 'I will go to Tokyo tomorrow (Polite -> Plain).' },
          { japanese: '相撲が 好きです。 → 相撲が 好きだ。', hiragana: 'すもうが すきです。 → すもうが すきだ。', romaji: 'Sumou ga suki desu. -> Sumou ga suki da.', english: 'I like sumo (Polite -> Plain).' }
        ]
      },
      {
        id: 'l20_g2',
        lessonNumber: 20,
        title: '普通体の会話規則 (Plain Style in Daily Conversation)',
        structure: 'Plain form with rising intonation (?), particle omission, and 〜けど',
        explanation: 'In casual conversation among close friends and family, certain rules apply to plain style sentences.',
        rules: [
          '1) Questions omit the question particle か and end with rising intonation: コーヒーを 飲む？ (Do you want coffee?).',
          '2) In Noun and な-adj questions, だ is omitted: 今晩 暇？ (Are you free tonight?). Answer: うん、暇 / 暇だよ (men) / 暇よ (women). Negative: ううん、暇じゃない.',
          '3) Particles は, が, を are frequently dropped if clear from context: ごはん[を] 食べる？、あした 京都[へ] 行かない？',
          '4) In V-ています, the い is often dropped: 辞書 持って[い]る？ (Do you have a dictionary?).',
          '5) 〜けど replaces が as a casual conjunctive particle: そのカレーライスはおいしい？…うん、辛いけど、おいしい。'
        ],
        examples: [
          { japanese: 'コーヒーを 飲む？…うん、飲む。', hiragana: 'こーひーを のむ？…うん、のむ。', romaji: 'Koohii o nomu? ...Un, nomu.', english: 'Do you want a coffee? ...Yes, I do.' },
          { japanese: '辞書、持ってる？…ううん、持ってない。', hiragana: 'じしょ、もってる？…ううん、もってない。', romaji: 'Jisho, motteru? ...Uun, mottenai.', english: "Do you have a dictionary? ...No, I don't." }
        ]
      }
    ],
    exercises: [
      {
        id: 'l20_ex1',
        lessonNumber: 20,
        type: 'mcq',
        category: 'grammar',
        prompt: 'What is the plain style past negative form of 食べます (to eat)?',
        options: ['食べなかった', '食べないだった', '食べませんでした', '食べたじゃない'],
        correctAnswer: '食べなかった',
        explanation: 'The plain past negative is formed by taking ない-form and changing ない to なかった: 食べない → 食べなかった.'
      },
      {
        id: 'l20_ex2',
        lessonNumber: 20,
        type: 'mcq',
        category: 'grammar',
        prompt: 'In casual conversation, what is the informal equivalent of はい (yes)?',
        options: ['うん', 'ううん', 'ええと', 'そう'],
        correctAnswer: 'うん',
        explanation: 'うん is casual "yes", while ううん is casual "no".'
      },
      {
        id: 'l20_ex3',
        lessonNumber: 20,
        type: 'fill_blank',
        category: 'grammar',
        prompt: 'Fill in the blank: カレーライスは 辛い [ ? ]、おいしい。 (The curry is spicy, but delicious.)',
        options: ['けど', 'から', 'ので', 'のに'],
        correctAnswer: 'けど',
        explanation: '〜けど is the casual conversational equivalent of が (but).'
      }
    ],
    dialogue: {
      title: '夏休みはどうするの？ (What will you do for the summer vacation?)',
      situation: 'Kobayashi and Thawaphon talk informally in plain style about climbing Mt. Fuji together during the summer vacation.',
      lines: [
        { speaker: '小林', japanese: '夏休みは 国へ 帰るの？', hiragana: 'なつやすみは くにへ かえるの？', english: 'Are you going home for the summer vacation?' },
        { speaker: 'タワポン', japanese: 'ううん、帰りたいけど、帰らない。小林君は どう するの？', hiragana: 'ううん、かえりたいけど、かえらない。こばやしくんは どう するの？', english: "No, I won't. Though I want to... What about you, Kobayashi?" },
        { speaker: '小林', japanese: 'どう しようかな。富士山に 登った こと ある？', hiragana: 'どう しようかな。ふじさんに のぼった こと ある？', english: 'Well, what shall I do? Have you ever climbed Mt. Fuji?' },
        { speaker: 'タワポン', japanese: 'ううん、ない。', hiragana: 'ううん、ない。', english: "No, I haven't." },
        { speaker: '小林', japanese: 'じゃ、よかったら、いっしょに 行かない？', hiragana: 'じゃ、よかったら、いっしょに いかない？', english: "Then, if you'd like, shall we go together?" },
        { speaker: 'タワポン', japanese: 'うん、行く。いつごろ？', hiragana: 'うん、いく。いつごろ？', english: 'Yes, okay. Around when?' },
        { speaker: '小林', japanese: '８月の 初めは どう？', hiragana: 'はちがつの はじめは どう？', english: 'How about the beginning of August?' },
        { speaker: 'タワポン', japanese: 'いいね。', hiragana: 'いいね。', english: 'Sounds good.' },
        { speaker: '小林', japanese: 'じゃ、いろいろ 調べて、また 電話するよ。', hiragana: 'じゃ、いろいろ しらべて、また でんわするよ。', english: 'Then, I will check up on various things and call you later.' },
        { speaker: 'タワポン', japanese: 'ありがとう。待ってるよ。', hiragana: 'ありがとう。まってるよ。', english: "Thanks. I'll be waiting." }
      ]
    }
  }
];
