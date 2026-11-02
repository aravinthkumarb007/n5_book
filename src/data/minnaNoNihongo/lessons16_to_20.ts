import { MinnaLesson } from '@/types/minna';

export const MINNA_LESSONS_16_TO_20: MinnaLesson[] = [
  // =========================================================================
  // LESSON 16: Sequential Actions, V-てから, Adjective Chaining
  // =========================================================================
  {
    id: 16,
    lessonNumber: 16,
    level: 'N5',
    title: 'Lesson 16: Sequential Actions (V-てから) & Joining Adjectives',
    titleJapanese: '第１６課：動作の継起（〜て、〜て）・〜てから・形容詞の接続（〜くて・〜で）',
    theme: '朝ジョギングをしてシャワーを浴びます、お金を入れてからボタンを押します、マリアさんは髪が長いです',
    description: 'Learn connecting multiple actions sequentially with the Te-Form, using 〜てから (after doing V1, do V2), joining adjectives (くて / で), and describing physical features (N1 は N2 が adj).',
    keyPhrases: [
      '朝 ジョギングを して、シャワーを 浴びて、会社へ 行きます。 (In the morning I jog, take a shower, and go to work.)',
      '国へ 帰ってから、父の 会社で 働きます。 (After returning to my country, I will work at my father\'s company.)',
      'ミラーさんは 若くて、元気です。 (Mr. Miller is young and energetic.)',
      'マリアさんは 目が 大きいです。 (Maria has big eyes.)'
    ],
    vocabulary: [
      { id: 'l16_v1', lessonNumber: 16, kanji: '乗ります', hiragana: 'のります', romaji: 'norimasu', english: 'get on, ride (train, bus)', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: '電車に乗ります。', hiragana: 'でんしゃに のります。', romaji: 'Densha ni norimasu.', english: 'I get on the train.' } },
      { id: 'l16_v2', lessonNumber: 16, kanji: '降ります', hiragana: 'おります', romaji: 'orimasu', english: 'get off (train, bus)', partOfSpeech: 'verb-2', category: 'Verbs', exampleSentence: { japanese: '駅で電車を降ります。', hiragana: 'えきで でんしゃを おります。', romaji: 'Eki de densha o orimasu.', english: 'I get off the train at the station.' } },
      { id: 'l16_v3', lessonNumber: 16, kanji: '乗り換えます', hiragana: 'のりかえます', romaji: 'norikaemasu', english: 'change, transfer (trains)', partOfSpeech: 'verb-2', category: 'Verbs', exampleSentence: { japanese: '東京駅で新幹線に乗り換えます。', hiragana: 'とうきょうえきで しんかんせんに のりかえます。', romaji: 'Toukyou-eki de shinkansen ni norikaemasu.', english: 'I transfer to the Shinkansen at Tokyo Station.' } },
      { id: 'l16_v4', lessonNumber: 16, kanji: '浴びます', hiragana: 'あびます', romaji: 'abimasu', english: 'take (a shower)', partOfSpeech: 'verb-2', category: 'Verbs', exampleSentence: { japanese: '毎朝シャワーを浴びます。', hiragana: 'まいあさ しゃわーを あびます。', romaji: 'Maiasa shawaa o abimasu.', english: 'I take a shower every morning.' } },
      { id: 'l16_v5', lessonNumber: 16, kanji: '入れます', hiragana: 'いれます', romaji: 'iremasu', english: 'put in, insert', partOfSpeech: 'verb-2', category: 'Verbs', exampleSentence: { japanese: 'お金を入れてください。', hiragana: 'おかねを いれて ください。', romaji: 'Okane o irete kudasai.', english: 'Please insert the money.' } },
      { id: 'l16_v6', lessonNumber: 16, kanji: '出します', hiragana: 'だします', romaji: 'dashimasu', english: 'take out, withdraw (money), submit', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: '銀行でお金を下ろします。', hiragana: 'ぎんこうで おかねを おろします。', romaji: 'Ginkou de okane o oroshimasu.', english: 'I withdraw money from the bank.' } },
      { id: 'l16_v7', lessonNumber: 16, kanji: '押します', hiragana: 'おします', romaji: 'oshimasu', english: 'push, press (a button)', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: 'ボタンを押してください。', hiragana: 'ぼたんを おして ください。', romaji: 'Botan o oshite kudasai.', english: 'Please press the button.' } },
      { id: 'l16_v8', lessonNumber: 16, kanji: '若い', hiragana: 'わかい', romaji: 'wakai', english: 'young', partOfSpeech: 'i-adjective', category: 'Descriptions', exampleSentence: { japanese: 'ワット先生は若いです。', hiragana: 'わっとせんせいは わかいです。', romaji: 'Watto-sensei wa wakai desu.', english: 'Professor Watt is young.' } },
      { id: 'l16_v9', lessonNumber: 16, kanji: '長い', hiragana: 'ながい', romaji: 'nagai', english: 'long', partOfSpeech: 'i-adjective', category: 'Descriptions', exampleSentence: { japanese: '髪が長いです。', hiragana: 'かみが ながいです。', romaji: 'Kami ga nagai desu.', english: 'Her hair is long.' } },
      { id: 'l16_v10', lessonNumber: 16, kanji: '短い', hiragana: 'みじかい', romaji: 'mijikai', english: 'short (length)', partOfSpeech: 'i-adjective', category: 'Descriptions', exampleSentence: { japanese: 'スカートが短いです。', hiragana: 'すかーとが みじかいです。', romaji: 'The skirt is short.' } },
      { id: 'l16_v11', lessonNumber: 16, kanji: '明るい', hiragana: 'あかるい', romaji: 'akarui', english: 'bright, cheerful', partOfSpeech: 'i-adjective', category: 'Descriptions', exampleSentence: { japanese: '部屋が明るいです。', hiragana: 'へやが あかるいです。', romaji: 'The room is bright.' } },
      { id: 'l16_v12', lessonNumber: 16, kanji: '暗い', hiragana: 'くらい', romaji: 'kurai', english: 'dark, gloomy', partOfSpeech: 'i-adjective', category: 'Descriptions', exampleSentence: { japanese: '外はもう暗いです。', hiragana: 'そとは もう くらいです。', romaji: 'Outside is already dark.' } },
      { id: 'l16_v13', lessonNumber: 16, kanji: '背が高い', hiragana: 'せがたかい', romaji: 'se ga takai', english: 'tall (stature of people)', partOfSpeech: 'phrase', category: 'Body', exampleSentence: { japanese: '彼は背が高いです。', hiragana: 'かれは せが たかいです。', romaji: 'Kare wa se ga takai desu.', english: 'He is tall.' } },
      { id: 'l16_v14', lessonNumber: 16, kanji: '頭がいい', hiragana: 'あたまがいい', romaji: 'atama ga ii', english: 'clever, smart', partOfSpeech: 'phrase', category: 'Body', exampleSentence: { japanese: 'マリアさんは頭がいいです。', hiragana: 'まりあさんは あたまが いいです。', romaji: 'Maria-san wa atama ga ii desu.', english: 'Maria is very smart.' } },
      { id: 'l16_v15', lessonNumber: 16, kanji: '体', hiragana: 'からだ', romaji: 'karada', english: 'body, health', partOfSpeech: 'noun', category: 'Body', exampleSentence: { japanese: '体に気をつけてください。', hiragana: 'からだに きをつけて ください。', romaji: 'Karada ni ki o tsukete kudasai.', english: 'Please take care of your health.' } }
    ],
    grammar: [
      {
        id: 'l16_g1',
        lessonNumber: 16,
        title: 'V1-て、V2-て、V3 (Connecting Actions Chronologically)',
        structure: 'Verb 1 [Te-Form]、Verb 2 [Te-Form]、Verb 3 [Final Form]',
        explanation: 'Used to link two or more actions in the chronological order in which they happen. The tense of the sentence is determined entirely by the final verb.',
        rules: [
          '朝起きて、ご飯を食べて、学校へ行きました (Past tense decided by 行きました).'
        ],
        examples: [
          { japanese: '神戸へ行って、映画を見て、お茶を飲みました。', hiragana: 'こうべへ いって、えいがを みて、おちゃを のみました。', romaji: 'Koube e itte, eiga o mite, ocha o nomimashita.', english: 'I went to Kobe, watched a movie, and drank tea.' }
        ]
      },
      {
        id: 'l16_g2',
        lessonNumber: 16,
        title: 'V1-て から、V2 (After doing V1, do V2)',
        structure: 'Verb 1 [Te-Form] + から、Verb 2',
        explanation: 'Explicitly emphasizes that action 2 takes place only after action 1 has concluded.',
        rules: [
          'Tense is determined by the main verb at the end of the sentence.'
        ],
        examples: [
          { japanese: '仕事が終わってから、泳ぎに行きます。', hiragana: 'しごとが おわってから、およぎに いきます。', romaji: 'Shigoto ga owatte kara, oyogi ni ikimasu.', english: 'After work finishes, I will go swimming.' }
        ]
      },
      {
        id: 'l16_g3',
        lessonNumber: 16,
        title: '形容詞の接続（〜くて・〜で） (Connecting Adjectives)',
        structure: 'い-adj: Drop い → くて / な-adj: Drop な → で',
        explanation: 'Links two or more adjectives together ("both X and Y").',
        rules: [
          '大きくて、広いです (big and spacious)',
          '親切で、きれいです (kind and beautiful)'
        ],
        examples: [
          { japanese: 'ミラーさんは若くて、親切です。', hiragana: 'みらーさんは わかくて、しんせつです。', romaji: 'Miraa-san wa wakakute, shinsetsu desu.', english: 'Mr. Miller is young and kind.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l16_ex1',
        lessonNumber: 16,
        type: 'mcq',
        category: 'grammar',
        prompt: 'How do you connect 安い (cheap) and 美味しい (delicious)?',
        options: ['安くて、美味しいです。', '安いで、美味しいです。', '安くと、美味しいです。', '安いて、美味しいです。'],
        correctAnswer: '安くて、美味しいです。',
        explanation: 'For い-adjectives, drop final い and append くて.'
      }
    ]
  },

  // =========================================================================
  // LESSON 17: Nai-Form (ない形), Negative Requests & Obligations
  // =========================================================================
  {
    id: 17,
    lessonNumber: 17,
    level: 'N5',
    title: 'Lesson 17: Nai-Form (ない形), Obligations & Negative Requests',
    titleJapanese: '第１７課：動詞のナイ形・禁止依頼（〜ないでください）・義務（〜なければなりません）',
    theme: '写真を撮らないでください、薬を飲まなければなりません、無理をしなくてもいいです',
    description: 'Learn the Verb Nai-Form (ない形), polite negative requests (〜ないでください), expressing necessity/obligation ("must do": 〜なければなりません), and expressing lack of necessity ("need not": 〜なくてもいいです).',
    keyPhrases: [
      'ここで 写真を 撮らないで ください。 (Please do not take photos here.)',
      '薬を 飲まなければ なりません。 (I must take medicine.)',
      '明日は 来なくても いいです。 (You don\'t have to come tomorrow.)',
      'パスポートを 見せなければ なりません。 (You must show your passport.)'
    ],
    vocabulary: [
      { id: 'l17_v1', lessonNumber: 17, kanji: '覚えます', hiragana: 'おぼえます', romaji: 'oboemasu', english: 'memorize, remember', partOfSpeech: 'verb-2', category: 'Verbs', exampleSentence: { japanese: '漢字を覚えます。', hiragana: 'かんじを おぼえます。', romaji: 'Kanji o oboemasu.', english: 'I memorize kanji.' } },
      { id: 'l17_v2', lessonNumber: 17, kanji: '忘れます', hiragana: 'わすれます', romaji: 'wasuremasu', english: 'forget', partOfSpeech: 'verb-2', category: 'Verbs', exampleSentence: { japanese: '傘を忘れました。', hiragana: 'かさを わすれました。', romaji: 'Kasa o wasuremashita.', english: 'I forgot my umbrella.' } },
      { id: 'l17_v3', lessonNumber: 17, kanji: 'なくします', hiragana: 'なくします', romaji: 'nakushimasu', english: 'lose (something)', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: 'パスポートをなくしました。', hiragana: 'ぱすぽーとを なくしました。', romaji: 'Pasupooto o nakushimashita.', english: 'I lost my passport.' } },
      { id: 'l17_v4', lessonNumber: 17, kanji: '払います', hiragana: 'はらいます', romaji: 'haraimasu', english: 'pay', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: 'お金を払います。', hiragana: 'おかねを はらいます。', romaji: 'Okane o haraimasu.', english: 'I pay the money.' } },
      { id: 'l17_v5', lessonNumber: 17, kanji: '返します', hiragana: 'かえします', romaji: 'kaeshimasu', english: 'give back, return (something borrowed)', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: '図書館に本を返します。', hiragana: 'としょかんに ほんを かえします。', romaji: 'Toshokan ni hon o kaeshimasu.', english: 'I return the book to the library.' } },
      { id: 'l17_v6', lessonNumber: 17, kanji: '出かけます', hiragana: 'でかけます', romaji: 'dekakemasu', english: 'go out', partOfSpeech: 'verb-2', category: 'Verbs', exampleSentence: { japanese: '今から出かけます。', hiragana: 'いまから でかけます。', romaji: 'Ima kara dekakemasu.', english: 'I am going out now.' } },
      { id: 'l17_v7', lessonNumber: 17, kanji: '脱ぎます', hiragana: 'ぬぎます', romaji: 'nugimasu', english: 'take off (shoes, clothes)', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: '靴を脱いでください。', hiragana: 'くつを ぬいで ください。', romaji: 'Kutsu o nuide kudasai.', english: 'Please take off your shoes.' } },
      { id: 'l17_v8', lessonNumber: 17, kanji: '持って行きます', hiragana: 'もっていきます', romaji: 'motte ikimasu', english: 'take (something along)', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: '保険証を持って行きます。', hiragana: 'ほけんしょうを もって いきます。', romaji: 'Hokenshou o motte ikimasu.', english: 'I take my health insurance card.' } },
      { id: 'l17_v9', lessonNumber: 17, kanji: '持って来ます', hiragana: 'もってきます', romaji: 'motte kimasu', english: 'bring (something along)', partOfSpeech: 'verb-3', category: 'Verbs', exampleSentence: { japanese: '傘を持って来ました。', hiragana: 'かさを もって きました。', romaji: 'Kasa o motte kimashita.', english: 'I brought an umbrella.' } },
      { id: 'l17_v10', lessonNumber: 17, kanji: '心配します', hiragana: 'しんぱいします', romaji: 'shinpaishimasu', english: 'worry', partOfSpeech: 'verb-3', category: 'Verbs', exampleSentence: { japanese: '心配しないでください。', hiragana: 'しんぱいしないで ください。', romaji: 'Shinpai shinaide kudasai.', english: 'Please do not worry.' } },
      { id: 'l17_v11', lessonNumber: 17, kanji: '残業します', hiragana: 'ざんぎょうします', romaji: 'zangyoushimasu', english: 'work overtime', partOfSpeech: 'verb-3', category: 'Work', exampleSentence: { japanese: '今日は残業しなければなりません。', hiragana: 'きょうは ざんぎょうしなければ なりません。', romaji: 'Kyou wa zangyou shinakereba narimasen.', english: 'I must work overtime today.' } },
      { id: 'l17_v12', lessonNumber: 17, kanji: '出張します', hiragana: 'しゅっちょうします', romaji: 'shucchoushimasu', english: 'go on a business trip', partOfSpeech: 'verb-3', category: 'Work', exampleSentence: { japanese: '明日から出張します。', hiragana: 'あしたから しゅっちょうします。', romaji: 'Ashita kara shucchoushimasu.', english: 'I will go on a business trip from tomorrow.' } },
      { id: 'l17_v13', lessonNumber: 17, kanji: '薬', hiragana: 'くすり', romaji: 'kusuri', english: 'medicine', partOfSpeech: 'noun', category: 'Health', exampleSentence: { japanese: '風邪の薬を飲みました。', hiragana: 'かぜの くすりを のみました。', romaji: 'Kaze no kusuri o nomimashita.', english: 'I took cold medicine.' } },
      { id: 'l17_v14', lessonNumber: 17, kanji: '保険証', hiragana: 'ほけんしょう', romaji: 'hokenshou', english: 'health insurance card', partOfSpeech: 'noun', category: 'Health', exampleSentence: { japanese: '健康保険証を見せてください。', hiragana: 'けんこうほけんしょうを みせて ください。', romaji: 'Kenkou hokenshou o misete kudasai.', english: 'Please show your health insurance card.' } }
    ],
    grammar: [
      {
        id: 'l17_g1',
        lessonNumber: 17,
        title: '動詞ナイ形（Nai-Form Rules）',
        structure: 'Group 1: -i ます → -a ない / Group 2: -e ます → -ない / Group 3: します→しない, 来ます→こない',
        explanation: 'The Nai-Form is the plain negative form of Japanese verbs.',
        rules: [
          'Group 1: 書きます → 書かない (kakanai), 読みます → 読まない (yomanai), 会います → 会わない (awanai - Note "wa" for verbs ending in -i!)',
          'Group 2: 食べます → 食べない (tabenai), 見ます → 見ない (minai)',
          'Group 3: します → しない (shinai), 来ます → こない (konai)'
        ],
        examples: [
          { japanese: '心配しないでください。', hiragana: 'しんぱいしないで ください。', romaji: 'Shinpai shinaide kudasai.', english: 'Please do not worry.' }
        ]
      },
      {
        id: 'l17_g2',
        lessonNumber: 17,
        title: 'V-ないで ください (Please Don\'t...)',
        structure: 'Verb [Nai-Form] + で + ください',
        explanation: 'Politely requests or instructs someone to refrain from doing something.',
        rules: [
          'ここで写真を撮らないでください (Please do not take photos here).'
        ],
        examples: [
          { japanese: 'タバコを吸わないでください。', hiragana: 'たばこを すわないで ください。', romaji: 'Tabako o suwanaide kudasai.', english: 'Please do not smoke.' }
        ]
      },
      {
        id: 'l17_g3',
        lessonNumber: 17,
        title: 'V-なければ なりません (Must Do / Obligation)',
        structure: 'Verb [Nai-Form with drop -い] + ければなりません',
        explanation: 'Expresses that doing an action is necessary or obligatory ("must do / have to do").',
        rules: [
          '飲まない → 飲まなければなりません (Must drink / take).',
          '行かない → 行かなければなりません (Must go).'
        ],
        examples: [
          { japanese: '薬を飲まなければなりません。', hiragana: 'くすりを のまなければ なりません。', romaji: 'Kusuri o nomanakereba narimasen.', english: 'I must take my medicine.' }
        ]
      },
      {
        id: 'l17_g4',
        lessonNumber: 17,
        title: 'V-なくても いいです (Need Not Do)',
        structure: 'Verb [Nai-Form with drop -い] + くてもいいです',
        explanation: 'Indicates that performing the action is not required ("do not have to do").',
        rules: [
          '払わなくてもいいです = "You don\'t have to pay."'
        ],
        examples: [
          { japanese: '明日は来なくてもいいです。', hiragana: 'あしたは こなくても いいです。', romaji: 'Ashita wa konakute mo ii desu.', english: 'You don\'t have to come tomorrow.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l17_ex1',
        lessonNumber: 17,
        type: 'mcq',
        category: 'grammar',
        prompt: 'What is the Nai-Form of 買います (kaimasu = buy)?',
        options: ['買わない', '買かない', '買いない', '買あない'],
        correctAnswer: '買わない',
        explanation: 'Group 1 verbs ending in an "i" vowel sound change to "wa" (not "a") before ない: 買います → 買わない.'
      }
    ]
  },

  // =========================================================================
  // LESSON 18: Dictionary Form (辞書形), Potential & Hobbies
  // =========================================================================
  {
    id: 18,
    lessonNumber: 18,
    level: 'N5',
    title: 'Lesson 18: Dictionary Form (辞書形), Potential & Hobbies',
    titleJapanese: '第１８課：動詞の辞書形・可能（〜ことができる）・趣味・動作の前（〜前に）',
    theme: '漢字を読むことができます、趣味は写真を撮ることです、寝る前に本を読みます',
    description: 'Learn the foundational Verb Dictionary Form (辞書形), expressing ability or potential (〜ことができます), stating hobbies (趣味は〜ことです), and actions performed before another (〜前に).',
    keyPhrases: [
      'ミラーさんは 漢字を 読むことが できます。 (Mr. Miller can read kanji.)',
      '私の 趣味は 映画を 見る ことです。 (My hobby is watching movies.)',
      '寝る 前に、日記を 書きます。 (Before going to bed, I write in my diary.)',
      '日本で なかなか 馬を 見ることが できません。 (In Japan, one rarely gets to see horses.)'
    ],
    vocabulary: [
      { id: 'l18_v1', lessonNumber: 18, kanji: 'できます', hiragana: 'できます', romaji: 'dekimasu', english: 'be able to, can do', partOfSpeech: 'verb-2', category: 'Verbs', exampleSentence: { japanese: '日本語ができます。', hiragana: 'にほんごが できます。', romaji: 'Nihongo ga dekimasu.', english: 'I can speak Japanese.' } },
      { id: 'l18_v2', lessonNumber: 18, kanji: '洗います', hiragana: 'あらいます', romaji: 'araimasu', english: 'wash', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: '手を洗います。', hiragana: 'てを あらいます。', romaji: 'Te o araimasu.', english: 'I wash my hands.' } },
      { id: 'l18_v3', lessonNumber: 18, kanji: '弾きます', hiragana: 'ひきます', romaji: 'hikimasu', english: 'play (piano, guitar, string instruments)', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: 'ピアノを弾くことができます。', hiragana: 'ぴあのを ひくことが できます。', romaji: 'Piano o hiku koto ga dekimasu.', english: 'I can play the piano.' } },
      { id: 'l18_v4', lessonNumber: 18, kanji: '歌います', hiragana: 'うたいます', romaji: 'utaimasu', english: 'sing', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: '日本の歌を歌います。', hiragana: 'にほんの うたを うたいます。', romaji: 'Nihon no uta o utaimasu.', english: 'I sing Japanese songs.' } },
      { id: 'l18_v5', lessonNumber: 18, kanji: '集めます', hiragana: 'あつめます', romaji: 'atsumemasu', english: 'collect, gather', partOfSpeech: 'verb-2', category: 'Verbs', exampleSentence: { japanese: '古い切手を集めています。', hiragana: 'ふるい きってを あつめて います。', romaji: 'Furui kitte o atsumete imasu.', english: 'I collect old stamps.' } },
      { id: 'l18_v6', lessonNumber: 18, kanji: '捨てます', hiragana: 'すてます', romaji: 'sutemasu', english: 'throw away, discard', partOfSpeech: 'verb-2', category: 'Verbs', exampleSentence: { japanese: 'ゴミを捨てないでください。', hiragana: 'ごみを すてないで ください。', romaji: 'Gomi o sutenaide kudasai.', english: 'Please do not throw away trash.' } },
      { id: 'l18_v7', lessonNumber: 18, kanji: '換えます', hiragana: 'かえます', romaji: 'kaemasu', english: 'exchange, change', partOfSpeech: 'verb-2', category: 'Verbs', exampleSentence: { japanese: 'お金を換えます。', hiragana: 'おかねを かえます。', romaji: 'Okane o kaemasu.', english: 'I exchange currency.' } },
      { id: 'l18_v8', lessonNumber: 18, kanji: '運転します', hiragana: 'うんてんします', romaji: 'untenshimasu', english: 'drive (vehicle)', partOfSpeech: 'verb-3', category: 'Verbs', exampleSentence: { japanese: '車を運転することができますか。', hiragana: 'くるまを うんてんする ことが できますか。', romaji: 'Kuruma o unten suru koto ga dekimasu ka.', english: 'Can you drive a car?' } },
      { id: 'l18_v9', lessonNumber: 18, kanji: '予約します', hiragana: 'よやくします', romaji: 'yoyakushimasu', english: 'reserve, book', partOfSpeech: 'verb-3', category: 'Verbs', exampleSentence: { japanese: 'ホテルを予約しました。', hiragana: 'ほてるを よやくしました。', romaji: 'Hoteru o yoyakushimashita.', english: 'I booked a hotel.' } },
      { id: 'l18_v10', lessonNumber: 18, kanji: 'ピアノ', hiragana: 'ぴあの', romaji: 'piano', english: 'piano', partOfSpeech: 'noun', category: 'Music', exampleSentence: { japanese: 'ピアノを練習します。', hiragana: 'ぴあのを れんしゅうします。', romaji: 'Piano o renshuushimasu.', english: 'I practice the piano.' } },
      { id: 'l18_v11', lessonNumber: 18, kanji: 'メートル', hiragana: 'めーとる', romaji: 'meetoru', english: 'meter(s)', partOfSpeech: 'counter', category: 'Units', exampleSentence: { japanese: '100メートル泳ぐことができます。', hiragana: 'ひゃくめーとる およぐことが できます。', romaji: 'Hyaku meetoru oyogu koto ga dekimasu.', english: 'I can swim 100 meters.' } },
      { id: 'l18_v12', lessonNumber: 18, kanji: '現金', hiragana: 'げんきん', romaji: 'genkin', english: 'cash', partOfSpeech: 'noun', category: 'Money', exampleSentence: { japanese: '現金で払います。', hiragana: 'げんきんで はらいます。', romaji: 'Genkin de haraimasu.', english: 'I pay with cash.' } },
      { id: 'l18_v13', lessonNumber: 18, kanji: '趣味', hiragana: 'しゅみ', romaji: 'shumi', english: 'hobby, pastime', partOfSpeech: 'noun', category: 'Hobbies', exampleSentence: { japanese: '趣味は何ですか。', hiragana: 'しゅみは なんですか。', romaji: 'Shumi wa nan desu ka.', english: 'What is your hobby?' } },
      { id: 'l18_v14', lessonNumber: 18, kanji: '日記', hiragana: 'にっき', romaji: 'nikki', english: 'diary, journal', partOfSpeech: 'noun', category: 'Writing', exampleSentence: { japanese: '毎日日記を書きます。', hiragana: 'まいにち にっきを かきます。', romaji: 'Mainichi nikki o kakimasu.', english: 'I write in my diary every day.' } }
    ],
    grammar: [
      {
        id: 'l18_g1',
        lessonNumber: 18,
        title: '動詞辞書形（Dictionary Form Rules）',
        structure: 'Group 1: -i ます → -u / Group 2: -e ます → -る / Group 3: します→する, 来ます→くる',
        explanation: 'The Dictionary Form is the plain non-past form of Japanese verbs as listed in dictionaries.',
        rules: [
          'Group 1: 書きます → 書く (kaku), 読みます → 読む (yomu), 買います → 買う (kau)',
          'Group 2: 食べます → 食べる (taberu), 見ます → 見る (miru)',
          'Group 3: します → する (suru), 来ます → くる (kuru)'
        ],
        examples: [
          { japanese: '漢字を読むことができます。', hiragana: 'かんじを よむことが できます。', romaji: 'Kanji o yomu koto ga dekimasu.', english: 'I can read kanji.' }
        ]
      },
      {
        id: 'l18_g2',
        lessonNumber: 18,
        title: 'V-辞書形 ことが できます (Potential / Ability)',
        structure: 'Verb [Dictionary Form] + こと + が + できます',
        explanation: 'Nominalizes the verb with こと to express ability or situational possibility ("can do").',
        rules: [
          '運転することができます = "can drive"',
          'カードで払うことができます = "can pay with credit card"'
        ],
        examples: [
          { japanese: 'スミスさんは日本語を話すことができます。', hiragana: 'すみすさんは にほんごを はなすことが できます。', romaji: 'Sumisu-san wa nihongo o hanasu koto ga dekimasu.', english: 'Mr. Smith can speak Japanese.' }
        ]
      },
      {
        id: 'l18_g3',
        lessonNumber: 18,
        title: '私の趣味は V-辞書形 ことです (Stating Hobbies)',
        structure: '私の趣味は + Verb [Dictionary Form] + ことです',
        explanation: 'Turns the verb into a noun phrase to state one\'s hobby.',
        rules: [
          '私の趣味は映画を見ることです = "My hobby is watching movies."'
        ],
        examples: [
          { japanese: '趣味は写真を撮ることです。', hiragana: 'しゅみは しゃしんを とることです。', romaji: 'Shumi wa shashin o toru koto desu.', english: 'My hobby is taking photographs.' }
        ]
      },
      {
        id: 'l18_g4',
        lessonNumber: 18,
        title: 'V1-辞書形 / N の 前に、V2 (Before doing V1)',
        structure: 'Verb 1 [Dictionary Form] / Noun + の + 前に、Verb 2',
        explanation: 'Expresses that Action 2 occurs prior to Action 1.',
        rules: [
          'Notice that Verb 1 is ALWAYS in the non-past dictionary form even if the main sentence is past tense!'
        ],
        examples: [
          { japanese: '寝る前に、本を読みます。', hiragana: 'ねるまえに、ほんを よみます。', romaji: 'Neru mae ni, hon o yomimasu.', english: 'Before going to sleep, I read a book.' },
          { japanese: '食事の前に、手を洗いました。', hiragana: 'しょくじの まえに、てを あらいました。', romaji: 'Shokuji no mae ni, te o araimashita.', english: 'Before the meal, I washed my hands.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l18_ex1',
        lessonNumber: 18,
        type: 'mcq',
        category: 'grammar',
        prompt: 'Choose the correct form: ご飯を [ ? ] 前に、手を洗います。',
        options: ['食べる', '食べた', '食べて', '食べない'],
        correctAnswer: '食べる',
        explanation: '前に is always preceded by the dictionary form of the verb: 食べる前に.'
      }
    ]
  },

  // =========================================================================
  // LESSON 19: Ta-Form (た形), Past Experiences & Non-Exhaustive Actions
  // =========================================================================
  {
    id: 19,
    lessonNumber: 19,
    level: 'N5',
    title: 'Lesson 19: Ta-Form (た形), Experience (〜たことがある) & 〜たり',
    titleJapanese: '第１９課：動詞のタ形・経験（〜たことがあります）・例示（〜たり〜たりします）・変化',
    theme: '馬に乗ったことがあります、休みの日はテニスをしたり映画を見たりします、寒くなります',
    description: 'Learn the Verb Ta-Form (た形), expressing past life experience (〜たことがあります), listing illustrative actions without strict sequence (〜たり〜たりします), and expressing change of state with なります.',
    keyPhrases: [
      '富士山に 登った ことが あります。 (I have climbed Mt. Fuji.)',
      '休みの日は 買い物したり 散歩したり します。 (On holidays, I do things like shopping and walking.)',
      '寒く なりました。 (It has become cold.)'
    ],
    vocabulary: [
      { id: 'l19_v1', lessonNumber: 19, kanji: '登ります', hiragana: 'のぼります', romaji: 'noborimasu', english: 'climb (mountain)', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: '富士山に登りました。', hiragana: 'ふじさんに のぼりました。', romaji: 'Fujisan ni noborimashita.', english: 'I climbed Mt. Fuji.' } },
      { id: 'l19_v2', lessonNumber: 19, kanji: '泊まります', hiragana: 'とまります', romaji: 'tomarimasu', english: 'stay (at hotel, inn)', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: 'ホテルに泊まります。', hiragana: 'ほてるに とまります。', romaji: 'Hoteru ni tomarimasu.', english: 'I stay at a hotel.' } },
      { id: 'l19_v3', lessonNumber: 19, kanji: '掃除します', hiragana: 'そうじします', romaji: 'soujishimasu', english: 'clean (a room)', partOfSpeech: 'verb-3', category: 'Verbs', exampleSentence: { japanese: '部屋を掃除しました。', hiragana: 'へやを そうじしました。', romaji: 'Heya o soujishimashita.', english: 'I cleaned my room.' } },
      { id: 'l19_v4', lessonNumber: 19, kanji: '洗濯します', hiragana: 'せんたくします', romaji: 'sentakushimasu', english: 'do laundry, wash clothes', partOfSpeech: 'verb-3', category: 'Verbs', exampleSentence: { japanese: '週末に洗濯します。', hiragana: 'しゅうまつに せんたくします。', romaji: 'Shuumatsu ni sentakushimasu.', english: 'I do laundry on weekends.' } },
      { id: 'l19_v5', lessonNumber: 19, kanji: '練習します', hiragana: 'れんしゅうします', romaji: 'renshuushimasu', english: 'practice, rehearse', partOfSpeech: 'verb-3', category: 'Verbs', exampleSentence: { japanese: '毎日会話を練習します。', hiragana: 'まいにち かいわを れんしゅうします。', romaji: 'Mainichi kaiwa o renshuushimasu.', english: 'I practice conversation every day.' } },
      { id: 'l19_v6', lessonNumber: 19, kanji: 'なります', hiragana: 'なります', romaji: 'narimasu', english: 'become', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: '医者になりたいです。', hiragana: 'いしゃに なりたいです。', romaji: 'Isha ni naritai desu.', english: 'I want to become a doctor.' } },
      { id: 'l19_v7', lessonNumber: 19, kanji: '眠い', hiragana: 'ねむい', romaji: 'nemui', english: 'sleepy', partOfSpeech: 'i-adjective', category: 'Feelings', exampleSentence: { japanese: 'とても眠いです。', hiragana: 'とても ねむいです。', romaji: 'Totemo nemui desu.', english: 'I am very sleepy.' } },
      { id: 'l19_v8', lessonNumber: 19, kanji: '強い', hiragana: 'つよい', romaji: 'tsuyoi', english: 'strong', partOfSpeech: 'i-adjective', category: 'Attributes', exampleSentence: { japanese: '体が強いです。', hiragana: 'からだが つよいです。', romaji: 'Karada ga tsuyoi desu.', english: 'My body is strong.' } },
      { id: 'l19_v9', lessonNumber: 19, kanji: '弱い', hiragana: 'よわい', romaji: 'yowai', english: 'weak', partOfSpeech: 'i-adjective', category: 'Attributes', exampleSentence: { japanese: 'お酒に弱いです。', hiragana: 'おさけに よわいです。', romaji: 'Osake ni yowai desu.', english: 'I cannot drink alcohol well (weak tolerance).' } },
      { id: 'l19_v10', lessonNumber: 19, kanji: 'お茶', hiragana: 'おちゃ', romaji: 'ocha', english: 'tea, tea ceremony', partOfSpeech: 'noun', category: 'Culture', exampleSentence: { japanese: 'お茶を習いました。', hiragana: 'おちゃを ならいました。', romaji: 'Ocha o naraimashita.', english: 'I learned the tea ceremony.' } },
      { id: 'l19_v11', lessonNumber: 19, kanji: '日', hiragana: 'ひ', romaji: 'hi', english: 'day, date', partOfSpeech: 'noun', category: 'Time', exampleSentence: { japanese: '天気がいい日です。', hiragana: 'てんきが いい ひです。', romaji: 'Tenki ga ii hi desu.', english: 'It is a day with good weather.' } },
      { id: 'l19_v12', lessonNumber: 19, kanji: '一度', hiragana: 'いちど', romaji: 'ichido', english: 'once, one time', partOfSpeech: 'adverb', category: 'Frequency', exampleSentence: { japanese: '一度日本へ行きたいです。', hiragana: 'いちど にほんへ いきたいです。', romaji: 'Ichido Nihon e ikitai desu.', english: 'I want to go to Japan at least once.' } },
      { id: 'l19_v13', lessonNumber: 19, kanji: '一度も', hiragana: 'いちども', romaji: 'ichido mo', english: 'never, not even once (with negative)', partOfSpeech: 'adverb', category: 'Frequency', exampleSentence: { japanese: '一度も刺身を食べたことがありません。', hiragana: 'いちども さしみを たべたことが ありません。', romaji: 'Ichido mo sashimi o tabeta koto ga arimasen.', english: 'I have never eaten sashimi even once.' } }
    ],
    grammar: [
      {
        id: 'l19_g1',
        lessonNumber: 19,
        title: '動詞タ形（Ta-Form Rules）',
        structure: 'Follows EXACT same phonetic rules as the Te-Form, replacing "te/de" with "ta/da"',
        explanation: 'Conjugating into the plain past (Ta-Form) is identical to the Te-Form.',
        rules: [
          '食べた (tabeta), 飲んだ (nonda), 行った (itta), 書いた (kaita), した (shita), 来た (kita).'
        ],
        examples: [
          { japanese: '寿司を食べたことがあります。', hiragana: 'すしを たべたことが あります。', romaji: 'Sushi o tabeta koto ga arimasu.', english: 'I have eaten sushi before.' }
        ]
      },
      {
        id: 'l19_g2',
        lessonNumber: 19,
        title: 'V-た ことが あります (Past Life Experience)',
        structure: 'Verb [Ta-Form] + こと + が + あります',
        explanation: 'Expresses that one has had the experience of doing something at least once in their past.',
        rules: [
          'Negative: Verb-たことがありません (Have never done).',
          'Never used for regular daily habits (e.g. do not say "I ate breakfast today" with this pattern).'
        ],
        examples: [
          { japanese: '馬に乗ったことがあります。', hiragana: 'うまに のったことが あります。', romaji: 'Uma ni notta koto ga arimasu.', english: 'I have ridden a horse before.' }
        ]
      },
      {
        id: 'l19_g3',
        lessonNumber: 19,
        title: 'V1-たり、V2-たり します (Listing Representative Actions)',
        structure: 'Verb 1 [Ta-Form] + り、Verb 2 [Ta-Form] + り + します / しました',
        explanation: 'Lists two or three illustrative activities without implying a fixed chronological sequence.',
        rules: [
          'Contrast with 〜て、〜て (which implies strict chronological order).'
        ],
        examples: [
          { japanese: '日曜日はテニスをしたり、映画を見たりします。', hiragana: 'にちようびは てにすを したり、えいがを みたり します。', romaji: 'Nichiyoubi wa tenisu o shitari, eiga o mitari shimasu.', english: 'On Sundays I do things like playing tennis and watching movies.' }
        ]
      },
      {
        id: 'l19_g4',
        lessonNumber: 19,
        title: 'い-adj く / な-adj に / N に なります (Becoming / Change of State)',
        structure: 'い-adj (drop い) + く / な-adj (drop な) + に / Noun + に + なります',
        explanation: 'Indicates a change from one condition to another ("become / turn").',
        rules: [
          '寒くなります (becomes cold)',
          '元気になります (becomes healthy/energetic)',
          '医者になります (becomes a doctor)'
        ],
        examples: [
          { japanese: 'もうすぐ春になります。', hiragana: 'もうすぐ はるに なります。', romaji: 'Mousugu haru ni narimasu.', english: 'It will soon become spring.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l19_ex1',
        lessonNumber: 19,
        type: 'mcq',
        category: 'grammar',
        prompt: 'Form the sentence: "I have climbed Mt. Fuji before."',
        options: [
          '富士山に登ったことがあります。',
          '富士山に登るのが好きです。',
          '富士山に登ってから行きます。',
          '富士山に登るまえです。'
        ],
        correctAnswer: '富士山に登ったことがあります。',
        explanation: '登った (Ta-Form) + ことがあります expresses past life experience.'
      }
    ]
  },

  // =========================================================================
  // LESSON 20: Plain Form / Informal Speech (普通形)
  // =========================================================================
  {
    id: 20,
    lessonNumber: 20,
    level: 'N5',
    title: 'Lesson 20: Plain Form & Conversational Casual Speech',
    titleJapanese: '第２０課：普通形（常体）・親しい会話・助詞の省略',
    theme: '明日暇？ うん、暇だよ。 東京へ行く？ ううん、行かない。',
    description: 'Learn the Plain Form (普通形) for verbs, nouns, and adjectives, and how Japanese people speak casually with close friends, family, and peers.',
    keyPhrases: [
      '明日 暇？ (Are you free tomorrow?)',
      'うん、行く。 / ううん、行かない。 (Yeah, I\'ll go. / Nah, I won\'t.)',
      'これ 美味しいよ。 (This is delicious!)'
    ],
    vocabulary: [
      { id: 'l20_v1', lessonNumber: 20, kanji: '要ります', hiragana: 'いります', romaji: 'irimasu', english: 'need, require', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: 'ビザが要ります。', hiragana: 'びざが いります。', romaji: 'Biza ga irimasu.', english: 'A visa is needed.' } },
      { id: 'l20_v2', lessonNumber: 20, kanji: '調べます', hiragana: 'しらべます', romaji: 'shirabemasu', english: 'investigate, check, look up', partOfSpeech: 'verb-2', category: 'Verbs', exampleSentence: { japanese: '辞書で調べます。', hiragana: 'じしょで しらべます。', romaji: 'Jisho de shirabemasu.', english: 'I look it up in the dictionary.' } },
      { id: 'l20_v3', lessonNumber: 20, kanji: '直します', hiragana: 'なおします', romaji: 'naoshimasu', english: 'repair, correct', partOfSpeech: 'verb-1', category: 'Verbs', exampleSentence: { japanese: '車を直します。', hiragana: 'くるまを なおします。', romaji: 'Kuruma o naoshimasu.', english: 'I repair the car.' } },
      { id: 'l20_v4', lessonNumber: 20, kanji: '修理します', hiragana: 'しゅうりします', romaji: 'shuurishimasu', english: 'repair, fix', partOfSpeech: 'verb-3', category: 'Verbs', exampleSentence: { japanese: 'パソコンを修理します。', hiragana: 'ぱそこんを しゅうりします。', romaji: 'Pasokon o shuurishimasu.', english: 'I repair the PC.' } },
      { id: 'l20_v5', lessonNumber: 20, kanji: '電話します', hiragana: 'でんわします', romaji: 'denwashimasu', english: 'phone, make a call', partOfSpeech: 'verb-3', category: 'Verbs', exampleSentence: { japanese: '後で電話するね。', hiragana: 'あとで でんわするね。', romaji: 'Ato de denwa suru ne.', english: 'I\'ll call you later.' } },
      { id: 'l20_v6', lessonNumber: 20, kanji: '僕', hiragana: 'ぼく', romaji: 'boku', english: 'I, me (used casually by males)', partOfSpeech: 'pronoun', category: 'Pronouns', exampleSentence: { japanese: '僕も行くよ。', hiragana: 'ぼくも いくよ。', romaji: 'Boku mo iku yo.', english: 'I will go too.' } },
      { id: 'l20_v7', lessonNumber: 20, kanji: '君', hiragana: 'きみ', romaji: 'kimi', english: 'you (used casually to peers/juniors)', partOfSpeech: 'pronoun', category: 'Pronouns', exampleSentence: { japanese: '君はどうする？', hiragana: 'きみは どうする？', romaji: 'Kimi wa dou suru?', english: 'What will you do?' } },
      { id: 'l20_v8', lessonNumber: 20, kanji: 'うん', hiragana: 'うん', romaji: 'un', english: 'yeah, uh-huh (casual "yes")', partOfSpeech: 'phrase', category: 'Casual', exampleSentence: { japanese: 'うん、わかった。', hiragana: 'うん、わかった。', romaji: 'Un, wakatta.', english: 'Yeah, got it.' } },
      { id: 'l20_v9', lessonNumber: 20, kanji: 'ううん', hiragana: 'ううん', romaji: 'uun', english: 'nah, no (casual "no")', partOfSpeech: 'phrase', category: 'Casual', exampleSentence: { japanese: 'ううん、知らない。', hiragana: 'ううん、しらない。', romaji: 'Uun, shiranai.', english: 'Nah, I don\'t know.' } },
      { id: 'l20_v10', lessonNumber: 20, kanji: 'サラリーマン', hiragana: 'さらりーまん', romaji: 'sarariiman', english: 'office worker, salaried employee', partOfSpeech: 'noun', category: 'People', exampleSentence: { japanese: '父はサラリーマンです。', hiragana: 'ちは さらりーまんです。', romaji: 'Chichi wa sarariiman desu.', english: 'My father is an office worker.' } }
    ],
    grammar: [
      {
        id: 'l20_g1',
        lessonNumber: 20,
        title: '普通形（Plain Style System）',
        structure: 'Verbs: 辞書形 / ない形 / た形 / なかった形',
        explanation: 'Plain form is used in casual conversation with close acquaintances, and serves as building blocks for complex grammar patterns.',
        rules: [
          '行きます → 行く',
          '行きません → 行かない',
          '行きました → 行った',
          '行きませんでした → 行かなかった'
        ],
        examples: [
          { japanese: '今日どこか行く？― ううん、行かない。', hiragana: 'きょう どこか いく？― ううん、いかない。', romaji: 'Kyou dokoka iku? ― Uun, ikanai.', english: 'Going anywhere today? ― Nah, not going.' }
        ]
      },
      {
        id: 'l20_g2',
        lessonNumber: 20,
        title: '名詞・な形容詞の普通形 (Plain Noun & Na-Adjective Forms)',
        structure: '〜だ (aff.) / 〜じゃない (neg.) / 〜だった (past aff.) / 〜じゃなかった (past neg.)',
        explanation: 'Nouns and na-adjectives replace です with だ in casual speech, though in questions the だ is usually omitted.',
        rules: [
          '暇ですか → 暇？ (Raise intonation at the end without か!)',
          '暇です → 暇だよ / 暇だ'
        ],
        examples: [
          { japanese: '明日暇？― うん、暇だよ。', hiragana: 'あした ひま？― うん、ひまだよ。', romaji: 'Ashita hima? ― Un, hima da yo.', english: 'Free tomorrow? ― Yeah, I am free!' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l20_ex1',
        lessonNumber: 20,
        type: 'mcq',
        category: 'grammar',
        prompt: 'What is the plain casual equivalent of "食べませんでした"?',
        options: ['食べなかった', '食べない', '食べた', '食べるじゃない'],
        correctAnswer: '食べなかった',
        explanation: 'Negative past in plain form ends in -なかった: 食べなかった (tabenakatta).'
      }
    ]
  }
];
