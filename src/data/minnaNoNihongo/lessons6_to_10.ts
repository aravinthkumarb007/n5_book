import { MinnaLesson } from '@/types/minna';

export const MINNA_LESSONS_6_TO_10: MinnaLesson[] = [
  // =========================================================================
  // LESSON 6: Transitive Verbs (〜を), Action Locations (〜で), Invitations
  // Reference: Minna no Nihongo I, Lesson 6 (Pages 42-47 / Book pages 62-67)
  // =========================================================================
  {
    id: 6,
    lessonNumber: 6,
    level: 'N5',
    title: 'Lesson 6: Transitive Verbs, Action Locations & Invitations',
    titleJapanese: '第６課：他動詞（〜を Vます）・動作の場所（〜で）・勧誘（〜ませんか・〜ましょう）',
    theme: 'ジュースを 飲みます。駅で 新聞を 買います。いっしょに 京都へ 行きませんか。',
    description: 'Learn direct object particle を, action venue particle で, asking "what did you do" (何をしましたか), inviting someone politely with 〜ませんか, and positive suggestions with 〜ましょう.',
    keyPhrases: [
      'ジュースを 飲みます。 (I drink juice.)',
      '駅で 新聞を 買います。 (I buy a newspaper at the station.)',
      'いっしょに 神戸へ 行きませんか。 (Won\'t you come to Kobe with me?)',
      'ちょっと 休みましょう。 (Let\'s take a short break.)',
      'いっしょに お花見を しませんか。 (Won\'t you join us for cherry blossom viewing?)'
    ],
    vocabulary: [
      { id: 'l6_v1', lessonNumber: 6, kanji: '食べます', hiragana: 'たべます', romaji: 'tabemasu', english: 'eat', partOfSpeech: 'verb-2', category: 'Daily Actions' },
      { id: 'l6_v2', lessonNumber: 6, kanji: '飲みます', hiragana: 'のみます', romaji: 'nomimasu', english: 'drink', partOfSpeech: 'verb-1', category: 'Daily Actions' },
      { id: 'l6_v3', lessonNumber: 6, kanji: '吸います', hiragana: 'すいます', romaji: 'suimasu', english: 'smoke [a cigarette]', partOfSpeech: 'verb-1', category: 'Daily Actions' },
      { id: 'l6_v4', lessonNumber: 6, kanji: '見ます', hiragana: 'みます', romaji: 'mimasu', english: 'see, look at, watch', partOfSpeech: 'verb-2', category: 'Daily Actions' },
      { id: 'l6_v5', lessonNumber: 6, kanji: '聞きます', hiragana: 'ききます', romaji: 'kikimasu', english: 'hear, listen', partOfSpeech: 'verb-1', category: 'Daily Actions' },
      { id: 'l6_v6', lessonNumber: 6, kanji: '読みます', hiragana: 'よみます', romaji: 'yomimasu', english: 'read', partOfSpeech: 'verb-1', category: 'Daily Actions' },
      { id: 'l6_v7', lessonNumber: 6, kanji: '書きます', hiragana: 'かきます', romaji: 'kakimasu', english: 'write, draw, paint', partOfSpeech: 'verb-1', category: 'Daily Actions' },
      { id: 'l6_v8', lessonNumber: 6, kanji: '買います', hiragana: 'かいます', romaji: 'kaimasu', english: 'buy', partOfSpeech: 'verb-1', category: 'Daily Actions' },
      { id: 'l6_v9', lessonNumber: 6, kanji: '撮ります', hiragana: 'とります', romaji: 'torimasu', english: 'take [a photograph]', partOfSpeech: 'verb-1', category: 'Daily Actions' },
      { id: 'l6_v10', lessonNumber: 6, kanji: 'します', hiragana: 'します', romaji: 'shimasu', english: 'do, play', partOfSpeech: 'verb-3', category: 'Daily Actions' },
      { id: 'l6_v11', lessonNumber: 6, kanji: '会います', hiragana: 'あいます', romaji: 'aimasu', english: 'meet [a friend: 友達に]', partOfSpeech: 'verb-1', category: 'Daily Actions' },
      { id: 'l6_v12', lessonNumber: 6, kanji: 'ご飯', hiragana: 'ごはん', romaji: 'gohan', english: 'a meal, cooked rice', partOfSpeech: 'noun', category: 'Food' },
      { id: 'l6_v13', lessonNumber: 6, kanji: '朝ご飯', hiragana: 'あさごはん', romaji: 'asagohan', english: 'breakfast', partOfSpeech: 'noun', category: 'Food' },
      { id: 'l6_v14', lessonNumber: 6, kanji: '昼ご飯', hiragana: 'ひるごはん', romaji: 'hirugohan', english: 'lunch', partOfSpeech: 'noun', category: 'Food' },
      { id: 'l6_v15', lessonNumber: 6, kanji: '晩ご飯', hiragana: 'ばんごはん', romaji: 'bangohan', english: 'supper, dinner', partOfSpeech: 'noun', category: 'Food' },
      { id: 'l6_v16', lessonNumber: 6, kanji: 'パン', hiragana: 'ぱん', romaji: 'pan', english: 'bread', partOfSpeech: 'noun', category: 'Food' },
      { id: 'l6_v17', lessonNumber: 6, kanji: '卵', hiragana: 'たまご', romaji: 'tamago', english: 'egg', partOfSpeech: 'noun', category: 'Food' },
      { id: 'l6_v18', lessonNumber: 6, kanji: '肉', hiragana: 'にく', romaji: 'niku', english: 'meat', partOfSpeech: 'noun', category: 'Food' },
      { id: 'l6_v19', lessonNumber: 6, kanji: '魚', hiragana: 'さかな', romaji: 'sakana', english: 'fish', partOfSpeech: 'noun', category: 'Food' },
      { id: 'l6_v20', lessonNumber: 6, kanji: '野菜', hiragana: 'やさい', romaji: 'yasai', english: 'vegetable', partOfSpeech: 'noun', category: 'Food' },
      { id: 'l6_v21', lessonNumber: 6, kanji: '果物', hiragana: 'くだもの', romaji: 'kudamono', english: 'fruit', partOfSpeech: 'noun', category: 'Food' },
      { id: 'l6_v22', lessonNumber: 6, kanji: '水', hiragana: 'みず', romaji: 'mizu', english: 'water', partOfSpeech: 'noun', category: 'Beverages' },
      { id: 'l6_v23', lessonNumber: 6, kanji: 'お茶', hiragana: 'おちゃ', romaji: 'ocha', english: 'tea, green tea', partOfSpeech: 'noun', category: 'Beverages' },
      { id: 'l6_v24', lessonNumber: 6, kanji: '紅茶', hiragana: 'こうちゃ', romaji: 'koucha', english: 'black tea', partOfSpeech: 'noun', category: 'Beverages' },
      { id: 'l6_v25', lessonNumber: 6, kanji: '牛乳', hiragana: 'ぎゅうにゅう (みるく)', romaji: 'gyuunyuu (miruku)', english: 'milk', partOfSpeech: 'noun', category: 'Beverages' },
      { id: 'l6_v26', lessonNumber: 6, kanji: 'ジュース', hiragana: 'じゅーす', romaji: 'juusu', english: 'juice', partOfSpeech: 'noun', category: 'Beverages' },
      { id: 'l6_v27', lessonNumber: 6, kanji: 'ビール', hiragana: 'びーる', romaji: 'biiru', english: 'beer', partOfSpeech: 'noun', category: 'Beverages' },
      { id: 'l6_v28', lessonNumber: 6, kanji: '[お]酒', hiragana: '[お]さけ', romaji: '[o]sake', english: 'alcohol, Japanese rice wine', partOfSpeech: 'noun', category: 'Beverages' },
      { id: 'l6_v29', lessonNumber: 6, kanji: '映画', hiragana: 'えいが', romaji: 'eiga', english: 'movie', partOfSpeech: 'noun', category: 'Entertainment' },
      { id: 'l6_v30', lessonNumber: 6, kanji: '手紙', hiragana: 'てがみ', romaji: 'tegami', english: 'letter', partOfSpeech: 'noun', category: 'Objects' },
      { id: 'l6_v31', lessonNumber: 6, kanji: 'レポート', hiragana: 'れぽーと', romaji: 'repooto', english: 'report', partOfSpeech: 'noun', category: 'Objects' },
      { id: 'l6_v32', lessonNumber: 6, kanji: '写真', hiragana: 'しゃしん', romaji: 'shashin', english: 'photograph', partOfSpeech: 'noun', category: 'Objects' },
      { id: 'l6_v33', lessonNumber: 6, kanji: '店', hiragana: 'みせ', romaji: 'mise', english: 'store, shop', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l6_v34', lessonNumber: 6, kanji: 'レストラン', hiragana: 'れすとらん', romaji: 'resutoran', english: 'restaurant', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l6_v35', lessonNumber: 6, kanji: '庭', hiragana: 'にわ', romaji: 'niwa', english: 'garden', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l6_v36', lessonNumber: 6, kanji: '宿題', hiragana: 'しゅくだい', romaji: 'shukudai', english: 'homework (~を します: do homework)', partOfSpeech: 'noun', category: 'Study' },
      { id: 'l6_v37', lessonNumber: 6, kanji: 'テニス', hiragana: 'てにす', romaji: 'tenisu', english: 'tennis (~を します: play tennis)', partOfSpeech: 'noun', category: 'Sports' },
      { id: 'l6_v38', lessonNumber: 6, kanji: 'サッカー', hiragana: 'さっかー', romaji: 'sakkaa', english: 'soccer, football (~を します: play soccer)', partOfSpeech: 'noun', category: 'Sports' },
      { id: 'l6_v39', lessonNumber: 6, kanji: '[お]花見', hiragana: '[お]はなみ', romaji: '[o]hanami', english: 'cherry-blossom viewing', partOfSpeech: 'noun', category: 'Culture' },
      { id: 'l6_v40', lessonNumber: 6, kanji: '何', hiragana: 'なに (なん)', romaji: 'nani (nan)', english: 'what', partOfSpeech: 'pronoun', category: 'Question Words' },
      { id: 'l6_v41', lessonNumber: 6, kanji: '一緒に', hiragana: 'いっしょに', romaji: 'issho ni', english: 'together', partOfSpeech: 'adverb', category: 'Expressions' },
      { id: 'l6_v42', lessonNumber: 6, kanji: 'ちょっと', hiragana: 'ちょっと', romaji: 'chotto', english: 'a little while, a little bit', partOfSpeech: 'adverb', category: 'Expressions' },
      { id: 'l6_v43', lessonNumber: 6, kanji: 'いつも', hiragana: 'いつも', romaji: 'itsumo', english: 'always, usually', partOfSpeech: 'adverb', category: 'Frequency' },
      { id: 'l6_v44', lessonNumber: 6, kanji: '時々', hiragana: 'ときどき', romaji: 'tokidoki', english: 'sometimes', partOfSpeech: 'adverb', category: 'Frequency' },
      { id: 'l6_v45', lessonNumber: 6, kanji: 'それから', hiragana: 'それから', romaji: 'sorekara', english: 'after that, and then', partOfSpeech: 'conjunction', category: 'Conjunctions' },
      { id: 'l6_v46', lessonNumber: 6, kanji: 'ええ', hiragana: 'ええ', romaji: 'ee', english: 'yes (casual)', partOfSpeech: 'phrase', category: 'Expressions' },
      { id: 'l6_v47', lessonNumber: 6, kanji: 'いいですね', hiragana: 'いいですね', romaji: 'ii desu ne', english: 'That\'s good / That sounds nice', partOfSpeech: 'phrase', category: 'Expressions' },
      { id: 'l6_v48', lessonNumber: 6, kanji: '分かりました', hiragana: 'わかりました', romaji: 'wakarimashita', english: 'I see / Understood', partOfSpeech: 'phrase', category: 'Expressions' }
    ],
    grammar: [
      {
        id: 'l6_g1',
        lessonNumber: 6,
        title: '1. N を V (transitive) - Direct Object Marker',
        structure: 'Noun (object) + を (pronounced "o") + Transitive Verb',
        explanation: 'The particle を indicates the direct object of a transitive verb. Note: を is pronounced the same as お, but is used strictly in writing as the accusative particle.',
        rules: [
          'ジュースを 飲みます (drink juice).',
          '本を 読みます (read a book).'
        ],
        examples: [
          { japanese: 'ジュースを 飲みます。', hiragana: 'じゅーすを のみます。', romaji: 'Juusu o nomimasu.', english: 'I drink juice.' },
          { japanese: '駅で 新聞を 買います。', hiragana: 'えきで しんぶんを かいます。', romaji: 'Eki de shinbun o kaimasu.', english: 'I buy a newspaper at the station.' }
        ]
      },
      {
        id: 'l6_g2',
        lessonNumber: 6,
        title: '2. N を します (Doing Sports, Gatherings, Events)',
        structure: 'Noun + を + します',
        explanation: 'The verb します covers a broad range of meanings: 1) play sports/games (サッカーをします), 2) hold gatherings (パーティーをします), 3) do tasks (宿題をします, 仕事をします).',
        rules: [
          'サッカー・トランプ を します (play football/cards).',
          'パーティー・会議 を します (hold party/meeting).',
          '宿題・仕事 を します (do homework/work).'
        ],
        examples: [
          { japanese: 'サッカーを します。', hiragana: 'さっかーを します。', romaji: 'Sakkaa o shimasu.', english: 'I play football.' },
          { japanese: '宿題を します。', hiragana: 'しゅくだいを します。', romaji: 'Shukudai o shimasu.', english: 'I do my homework.' }
        ]
      },
      {
        id: 'l6_g3',
        lessonNumber: 6,
        title: '3. 何を しますか (What will/did you do?)',
        structure: '何を しますか / 何を しましたか',
        explanation: 'Question pattern used to ask what action someone performs. You can add a time expression as the topic using は (e.g. 月曜日は 何を しますか).',
        rules: [
          '月曜日 何を しますか (or 月曜日は 何を しますか).'
        ],
        examples: [
          { japanese: 'きのう 何を しましたか。・・・サッカーを しました。', hiragana: 'きのう なにを しましたか。・・・さっかーを しました。', romaji: 'Kinou nani o shimashita ka? ...Sakkaa o shimashita.', english: 'What did you do yesterday? ...I played football.' }
        ]
      },
      {
        id: 'l6_g4',
        lessonNumber: 6,
        title: '4. なん and なに (Usage Rules)',
        structure: 'なん vs なに',
        explanation: 'Both mean "what". なん is used: 1) when preceding a word whose first mora is in the た, だ, or な row (何ですか, 何の本ですか, 何と言いますか); 2) when followed by a counter suffix (何歳, 何時, 何番). なに is used in all other cases (何を買いま﻿すか).',
        rules: [
          'なん: before d/t/n sounds and counters (何ですか, 何時).',
          'なに: in all other cases (何をしますか, なにを見ますか).'
        ],
        examples: [
          { japanese: 'それは 何ですか。', hiragana: 'それは なんですか。', romaji: 'Sore wa nan desu ka.', english: 'What is that?' },
          { japanese: '何を 買いますか。', hiragana: 'なにを かいますか。', romaji: 'Nani o kaimasu ka.', english: 'What will you buy?' }
        ]
      },
      {
        id: 'l6_g5',
        lessonNumber: 6,
        title: '5. N(place) で V (Location of Action)',
        structure: 'Place + で + Action Verb',
        explanation: 'When added after a place noun, particle で indicates the place where an action occurs.',
        rules: [
          'Distinguish from へ (direction of motion) and に (existence at a place): で marks dynamic action taking place.'
        ],
        examples: [
          { japanese: '駅で 新聞を 買います。', hiragana: 'えきで しんぶんを かいます。', romaji: 'Eki de shinbun o kaimasu.', english: 'I buy the newspaper at the station.' },
          { japanese: 'レストランで 昼ご飯を 食べます。', hiragana: 'れすとらんで ひるごはんを たべます。', romaji: 'Resutoran de hirugohan o tabemasu.', english: 'I eat lunch at a restaurant.' }
        ]
      },
      {
        id: 'l6_g6',
        lessonNumber: 6,
        title: '6. V ませんか (Invitation: Won\'t you...?)',
        structure: 'Verb [ます-stem] + ませんか',
        explanation: 'Used when inviting someone to do something. It shows polite consideration towards the listener\'s wishes ("Won\'t you join me?").',
        rules: [
          'Positive response: ええ、いいですね (Yes, sounds great).',
          'Considerate refusal: すみません、ちょっと・・・ (I\'m sorry, but it\'s a bit difficult...).'
        ],
        examples: [
          { japanese: 'いっしょに 京都へ 行きませんか。・・・ええ、いいですね。', hiragana: 'いっしょに きょうとへ いきませんか。・・・ええ、いいですね。', romaji: 'Issho ni Kyouto e ikimasen ka? ...Ee, ii desu ne.', english: 'Won\'t you come to Kyoto with me? ...Yes, sounds great.' }
        ]
      },
      {
        id: 'l6_g7',
        lessonNumber: 6,
        title: '7. V ましょう (Proposal / Let\'s...)',
        structure: 'Verb [ます-stem] + ましょう',
        explanation: 'Used when the speaker is positively inviting or suggesting an action together, or responding enthusiastically to an invitation.',
        rules: [
          'ちょっと 休みましょう (Let\'s take a rest).',
          'いっしょに 昼ご飯を 食べませんか。・・・ええ、食べましょう (Won\'t you eat with me? Yes, let\'s eat!).'
        ],
        examples: [
          { japanese: 'ちょっと 休みましょう。', hiragana: 'ちょっと やすみましょう。', romaji: 'Chotto yasumimashou.', english: 'Let\'s have a short break.' }
        ]
      },
      {
        id: 'l6_g8',
        lessonNumber: 6,
        title: '8. お〜 (Polite Prefix on Nouns)',
        structure: 'お + Noun',
        explanation: 'The prefix お is attached to certain nouns when speaking politely (e.g. [お]酒, [お]花見, [お]茶, [お]金).',
        rules: [
          'Some words almost always take お (お茶, お金).'
        ],
        examples: [
          { japanese: 'お酒を 飲みますか。', hiragana: 'おさけを のみますか。', romaji: 'Osake o nomimasu ka.', english: 'Do you drink alcohol?' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l6_ex1',
        lessonNumber: 6,
        type: 'mcq',
        category: 'grammar',
        prompt: 'Choose the correct particle for action location: "I buy newspapers at the station."',
        contextSentence: '駅（　　）新聞を 買います。',
        options: ['で', 'に', 'へ', 'を'],
        correctAnswer: 'で',
        explanation: 'Particle で marks the location where an action takes place.'
      },
      {
        id: 'l6_ex2',
        lessonNumber: 6,
        type: 'fill_blank',
        category: 'grammar',
        prompt: 'Choose the correct invitation pattern: "Won\'t you have a drink of beer with me?"',
        contextSentence: 'いっしょに ビールを（　　）。',
        options: ['飲みませんか', '飲みます', '飲みました', '飲む'],
        correctAnswer: '飲みませんか',
        explanation: 'V-ませんか is the standard polite invitation form.'
      },
      {
        id: 'l6_ex3',
        lessonNumber: 6,
        type: 'sentence_formation',
        category: 'grammar',
        prompt: 'Arrange the tiles to say: "Let\'s take a short break."',
        wordTiles: ['ちょっと', '休みましょう'],
        correctAnswer: 'ちょっと 休みましょう',
        explanation: 'ちょっと (a little) + 休みましょう (let\'s rest).'
      }
    ],
    dialogue: {
      title: 'いっしょに 行きませんか (Won\'t you join us?)',
      situation: 'Sato inviting Miller to cherry blossom viewing at Osaka Castle Park.',
      lines: [
        { speaker: '佐藤', japanese: 'ミラーさん。', hiragana: 'みらーさん。', english: 'Mr. Miller.' },
        { speaker: 'ミラー', japanese: '何ですか。', hiragana: 'なんですか。', english: 'Yes?' },
        { speaker: '佐藤', japanese: 'あした 友達と 大阪城公園で お花見を します。ミラーさんも いっしょに 行きませんか。', hiragana: 'あした ともだちと おおさかじょうこうえんで おはなみを します。みらーさんも いっしょに いきませんか。', english: 'I\'m going cherry-blossom viewing at Osaka Castle Park with friends tomorrow. Won\'t you join us, Mr. Miller?' },
        { speaker: 'ミラー', japanese: 'いいですね。何時ですか。', hiragana: 'いいですね。なんじですか。', english: 'That sounds nice. What time?' },
        { speaker: '佐藤', japanese: '10時です。大阪城公園駅で 会いましょう。', hiragana: 'じゅうじです。おおさかじょうこうえんえきで あいましょう。', english: 'Ten o\'clock. Let\'s meet at Osaka-jo Koen Station.' },
        { speaker: 'ミラー', japanese: '分かりました。じゃ、また あした。', hiragana: 'わかりました。じゃ、また あした。', english: 'Understood. Well, see you tomorrow.' }
      ]
    }
  },

  // =========================================================================
  // LESSON 7: Instruments, Giving and Receiving, もう V-ました
  // Reference: Minna no Nihongo I, Lesson 7 (Pages 48-53 / Book pages 68-73)
  // =========================================================================
  {
    id: 7,
    lessonNumber: 7,
    level: 'N5',
    title: 'Lesson 7: Tools & Means, Giving & Receiving, Already Done (もう)',
    titleJapanese: '第７課：手段・道具（〜で）・授受（あげます・もらいます）・もう〜ました',
    theme: 'はしで 食べます。木村さんに 花を あげます。もう 荷物を 送りました。',
    description: 'Learn tool/instrument particle で (with chopsticks, in Japanese), giving actions (あげます) and receiving actions (もらいます), and expressing completion with もう Vました.',
    keyPhrases: [
      'わたしは ワープロで 手紙を 書きます。 (I write letters with a word processor.)',
      '木村さんに 花を あげます。 (I will give some flowers to Ms. Kimura.)',
      'カリナさんに チョコレートを もらいました。 (I received some chocolate from Ms. Karina.)',
      'もう 新幹線の 切符を 買いましたか。 (Have you already bought your Shinkansen ticket?)',
      '「ありがとう」は 英語で 何ですか。 (What is "Arigatou" in English?)'
    ],
    vocabulary: [
      { id: 'l7_v1', lessonNumber: 7, kanji: '切ります', hiragana: 'きります', romaji: 'kirimasu', english: 'cut, slice', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l7_v2', lessonNumber: 7, kanji: '送ります', hiragana: 'おくります', romaji: 'okurimasu', english: 'send', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l7_v3', lessonNumber: 7, kanji: 'あげます', hiragana: 'あげます', romaji: 'agemasu', english: 'give', partOfSpeech: 'verb-2', category: 'Verbs' },
      { id: 'l7_v4', lessonNumber: 7, kanji: 'もらいます', hiragana: 'もらいます', romaji: 'moraimasu', english: 'receive', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l7_v5', lessonNumber: 7, kanji: '貸します', hiragana: 'かします', romaji: 'kashimasu', english: 'lend', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l7_v6', lessonNumber: 7, kanji: '借ります', hiragana: 'かります', romaji: 'karimasu', english: 'borrow', partOfSpeech: 'verb-2', category: 'Verbs' },
      { id: 'l7_v7', lessonNumber: 7, kanji: '教えます', hiragana: 'おしえます', romaji: 'oshiemasu', english: 'teach', partOfSpeech: 'verb-2', category: 'Verbs' },
      { id: 'l7_v8', lessonNumber: 7, kanji: '習います', hiragana: 'ならいます', romaji: 'naraimasu', english: 'learn', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l7_v9', lessonNumber: 7, kanji: 'かけます', hiragana: 'かけます', romaji: 'kakemasu', english: 'make [a telephone call: 電話を〜]', partOfSpeech: 'verb-2', category: 'Verbs' },
      { id: 'l7_v10', lessonNumber: 7, kanji: '手', hiragana: 'て', romaji: 'te', english: 'hand, arm', partOfSpeech: 'noun', category: 'Body' },
      { id: 'l7_v11', lessonNumber: 7, kanji: '箸', hiragana: 'はし', romaji: 'hashi', english: 'chopsticks', partOfSpeech: 'noun', category: 'Utensils' },
      { id: 'l7_v12', lessonNumber: 7, kanji: 'スプーン', hiragana: 'すぷーん', romaji: 'supuun', english: 'spoon', partOfSpeech: 'noun', category: 'Utensils' },
      { id: 'l7_v13', lessonNumber: 7, kanji: 'ナイフ', hiragana: 'ないふ', romaji: 'naifu', english: 'knife', partOfSpeech: 'noun', category: 'Utensils' },
      { id: 'l7_v14', lessonNumber: 7, kanji: 'フォーク', hiragana: 'ふぉーく', romaji: 'fooku', english: 'fork', partOfSpeech: 'noun', category: 'Utensils' },
      { id: 'l7_v15', lessonNumber: 7, kanji: '鋏', hiragana: 'はさみ', romaji: 'hasami', english: 'scissors', partOfSpeech: 'noun', category: 'Tools' },
      { id: 'l7_v16', lessonNumber: 7, kanji: 'ファクス', hiragana: 'ふぁくす', romaji: 'fakusu', english: 'fax', partOfSpeech: 'noun', category: 'Office' },
      { id: 'l7_v17', lessonNumber: 7, kanji: 'ワープロ', hiragana: 'わーぷろ', romaji: 'waapuro', english: 'word processor', partOfSpeech: 'noun', category: 'Office' },
      { id: 'l7_v18', lessonNumber: 7, kanji: 'パソコン', hiragana: 'ぱそこん', romaji: 'pasokon', english: 'personal computer', partOfSpeech: 'noun', category: 'Office' },
      { id: 'l7_v19', lessonNumber: 7, kanji: 'パンチ', hiragana: 'ぱんち', romaji: 'panchi', english: 'hole punch', partOfSpeech: 'noun', category: 'Stationery' },
      { id: 'l7_v20', lessonNumber: 7, kanji: 'ホッチキス', hiragana: 'ほっちきす', romaji: 'hotchikisu', english: 'stapler', partOfSpeech: 'noun', category: 'Stationery' },
      { id: 'l7_v21', lessonNumber: 7, kanji: 'セロテープ', hiragana: 'せろてーぷ', romaji: 'seroteepu', english: 'Scotch tape, clear adhesive tape', partOfSpeech: 'noun', category: 'Stationery' },
      { id: 'l7_v22', lessonNumber: 7, kanji: '消しゴム', hiragana: 'けしごむ', romaji: 'keshigomu', english: 'eraser', partOfSpeech: 'noun', category: 'Stationery' },
      { id: 'l7_v23', lessonNumber: 7, kanji: '紙', hiragana: 'かみ', romaji: 'kami', english: 'paper', partOfSpeech: 'noun', category: 'Stationery' },
      { id: 'l7_v24', lessonNumber: 7, kanji: '花', hiragana: 'はな', romaji: 'hana', english: 'flower, blossom', partOfSpeech: 'noun', category: 'Nature' },
      { id: 'l7_v25', lessonNumber: 7, kanji: 'シャツ', hiragana: 'しゃつ', romaji: 'shatsu', english: 'shirt', partOfSpeech: 'noun', category: 'Clothing' },
      { id: 'l7_v26', lessonNumber: 7, kanji: 'プレゼント', hiragana: 'ぷれぜんと', romaji: 'purezento', english: 'present, gift', partOfSpeech: 'noun', category: 'Objects' },
      { id: 'l7_v27', lessonNumber: 7, kanji: '荷物', hiragana: 'にもつ', romaji: 'nimotsu', english: 'baggage, parcel', partOfSpeech: 'noun', category: 'Objects' },
      { id: 'l7_v28', lessonNumber: 7, kanji: 'お金', hiragana: 'おかね', romaji: 'okane', english: 'money', partOfSpeech: 'noun', category: 'Objects' },
      { id: 'l7_v29', lessonNumber: 7, kanji: '切符', hiragana: 'きっぷ', romaji: 'kippu', english: 'ticket', partOfSpeech: 'noun', category: 'Objects' },
      { id: 'l7_v30', lessonNumber: 7, kanji: 'クリスマス', hiragana: 'くりすます', romaji: 'kurisumasu', english: 'Christmas', partOfSpeech: 'noun', category: 'Events' },
      { id: 'l7_v31', lessonNumber: 7, kanji: '父', hiragana: 'ちち', romaji: 'chichi', english: '(my) father', partOfSpeech: 'noun', category: 'Family' },
      { id: 'l7_v32', lessonNumber: 7, kanji: '母', hiragana: 'はは', romaji: 'haha', english: '(my) mother', partOfSpeech: 'noun', category: 'Family' },
      { id: 'l7_v33', lessonNumber: 7, kanji: 'お父さん', hiragana: 'おとうさん', romaji: 'otousan', english: '(someone else\'s) father', partOfSpeech: 'noun', category: 'Family' },
      { id: 'l7_v34', lessonNumber: 7, kanji: 'お母さん', hiragana: 'おかあさん', romaji: 'okaasan', english: '(someone else\'s) mother', partOfSpeech: 'noun', category: 'Family' },
      { id: 'l7_v35', lessonNumber: 7, kanji: 'もう', hiragana: 'もう', romaji: 'mou', english: 'already', partOfSpeech: 'adverb', category: 'Time' },
      { id: 'l7_v36', lessonNumber: 7, kanji: 'まだ', hiragana: 'まだ', romaji: 'mada', english: 'not yet', partOfSpeech: 'adverb', category: 'Time' },
      { id: 'l7_v37', lessonNumber: 7, kanji: 'これから', hiragana: 'これから', romaji: 'korekara', english: 'from now on, soon', partOfSpeech: 'adverb', category: 'Time' },
      { id: 'l7_v38', lessonNumber: 7, kanji: 'すてきですね', hiragana: 'すてきですね', romaji: 'suteki desu ne', english: 'What a nice [~]!', partOfSpeech: 'phrase', category: 'Expressions' },
      { id: 'l7_v39', lessonNumber: 7, kanji: 'ごめんください', hiragana: 'ごめんください', romaji: 'gomen kudasai', english: 'Excuse me / Anybody home? (visitor expression)', partOfSpeech: 'phrase', category: 'Greetings' },
      { id: 'l7_v40', lessonNumber: 7, kanji: 'いらっしゃい', hiragana: 'いらっしゃい', romaji: 'irasshai', english: 'Welcome! / How nice of you to come', partOfSpeech: 'phrase', category: 'Greetings' },
      { id: 'l7_v41', lessonNumber: 7, kanji: 'どうぞ お上がりください', hiragana: 'どうぞ おあがりください', romaji: 'douzo oagarikudasai', english: 'Do come in', partOfSpeech: 'phrase', category: 'Greetings' },
      { id: 'l7_v42', lessonNumber: 7, kanji: '失礼します', hiragana: 'しつれいします', romaji: 'shitsureishimasu', english: 'Thank you / Excuse me (entering)', partOfSpeech: 'phrase', category: 'Greetings' },
      { id: 'l7_v43', lessonNumber: 7, kanji: 'いただきます', hiragana: 'いただきます', romaji: 'itadakimasu', english: 'Thank you / I accept (before eating or drinking)', partOfSpeech: 'phrase', category: 'Greetings' }
    ],
    grammar: [
      {
        id: 'l7_g1',
        lessonNumber: 7,
        title: '1. N(tool/means) で V (Instrument / Medium)',
        structure: 'Noun (tool/means/language) + で + Verb',
        explanation: 'Particle で indicates a method or mean used for an action (instruments, utensils, languages).',
        rules: [
          'はしで 食べます (eat with chopsticks).',
          '日本語で レポートを 書きます (write a report in Japanese).'
        ],
        examples: [
          { japanese: 'はしで 食べます。', hiragana: 'はしで たべます。', romaji: 'Hashi de tabemasu.', english: 'I eat with chopsticks.' },
          { japanese: '日本語で レポートを 書きます。', hiragana: 'にほんごで れぽーとを かきます。', romaji: 'Nihongo de repooto o kakemasu.', english: 'I write a report in Japanese.' }
        ]
      },
      {
        id: 'l7_g2',
        lessonNumber: 7,
        title: '2. "Word / Sentence" は 〜語で 何ですか',
        structure: '「Word」は [Language] で 何ですか',
        explanation: 'Used to ask how to say a word or sentence in another language.',
        rules: [
          '「ありがとう」は 英語で 何ですか。・・・"Thank you" です。'
        ],
        examples: [
          { japanese: '「ありがとう」は 英語で 何ですか。・・・「Thank you」です。', hiragana: '「ありがとう」は えいごで なんですか。・・・「Thank you」です。', romaji: '"Arigatou" wa eigo de nan desu ka? ..."Thank you" desu.', english: 'What\'s "Arigatou" in English? ...It\'s "Thank you".' }
        ]
      },
      {
        id: 'l7_g3',
        lessonNumber: 7,
        title: '3. N(person) に あげます / 貸します / 教えます (Giving to Person)',
        structure: 'Person (recipient) に + Object を + あげます / 貸します / 教えます',
        explanation: 'Verbs like あげます (give), かします (lend), おしえます (teach) need a person to whom the action is directed. The recipient is marked with particle に.',
        rules: [
          '山田さんは 木村さんに 花を あげました。',
          'Note: With verbs like 送ります or 電話をかけます, place nouns can replace person with へ: 会社へ 電話をかけます.'
        ],
        examples: [
          { japanese: '木村さんに 花を あげました。', hiragana: 'きむらさんに はなを あげました。', romaji: 'Kimura-san ni hana o agemashita.', english: 'I gave some flowers to Ms. Kimura.' },
          { japanese: '太郎君に 英語を 教えます。', hiragana: 'たろうくんに えいごを おしえます。', romaji: 'Tarou-kun ni eigo o oshiemasu.', english: 'I teach Taro English.' }
        ]
      },
      {
        id: 'l7_g4',
        lessonNumber: 7,
        title: '4. N(person) に もらいます / 借ります / 習います (Receiving from Person)',
        structure: 'Person (giver) に (or から) + Object を + もらいます / 借ります / 習います',
        explanation: 'Verbs like もらいます (receive), かります (borrow), and ならいます (learn) express actions from the receiving side. The giver is marked with に. から is sometimes used instead of に, especially when receiving from an organization or company.',
        rules: [
          '木村さんは 山田さんに 花を もらいました。',
          '銀行から お金を 借りました (When receiving from institutions, use から).'
        ],
        examples: [
          { japanese: 'カリナさんに CDを 借りました。', hiragana: 'かりなさんに しーでぃーを かかりました。', romaji: 'Karina-san ni CD o karimashita.', english: 'I borrowed a CD from Ms. Karina.' },
          { japanese: '銀行から お金を 借りました。', hiragana: 'ぎんこうから おかねを かりました。', romaji: 'Ginkou kara okane o karimashita.', english: 'I borrowed money from the bank.' }
        ]
      },
      {
        id: 'l7_g5',
        lessonNumber: 7,
        title: '5. もう V ました (Already Finished)',
        structure: 'もう + Verb [ました]',
        explanation: 'もう means "already". In answer to "もう V ましたか", say: はい、[もう] V ました (Yes, I already did). In giving a negative answer, say: いいえ、まだです (No, not yet), NEVER say *V ませんでした (which means you did not do it at all).',
        rules: [
          'もう 荷物を 送りましたか。',
          'はい、[もう] 送りました (Yes, I already sent it).',
          'いいえ、まだです (No, not yet. NOT *送りませんでした).'
        ],
        examples: [
          { japanese: 'もう 荷物を 送りましたか。・・・いいえ、まだです。', hiragana: 'もう にもつを おくりましたか。・・・いいえ、まだです。', romaji: 'Mou nimotsu o okurimashita ka? ...Iie, mada desu.', english: 'Have you sent the parcel yet? ...No, not yet.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l7_ex1',
        lessonNumber: 7,
        type: 'mcq',
        category: 'grammar',
        prompt: 'Choose the correct particle for tool: "I eat with chopsticks."',
        contextSentence: 'はし（　　）食べます。',
        options: ['で', 'に', 'を', 'と'],
        correctAnswer: 'で',
        explanation: 'Tool or means used is marked with particle で.'
      },
      {
        id: 'l7_ex2',
        lessonNumber: 7,
        type: 'fill_blank',
        category: 'grammar',
        prompt: 'How do you correctly answer "No, not yet" to "もう 昼ご飯を 食べましたか"?',
        contextSentence: 'いいえ、（　　）。',
        options: ['まだです', '食べませんでした', '食べません', 'ありません'],
        correctAnswer: 'まだです',
        explanation: 'To indicate an action has not been done yet, always use いいえ、まだです.'
      },
      {
        id: 'l7_ex3',
        lessonNumber: 7,
        type: 'sentence_formation',
        category: 'grammar',
        prompt: 'Arrange the tiles to say: "I gave flowers to Ms. Kimura."',
        wordTiles: ['木村さんに', '花を', 'あげました'],
        correctAnswer: '木村さんに 花を あげました',
        explanation: 'Target recipient takes particle に: 木村さんに 花を あげました.'
      }
    ],
    dialogue: {
      title: 'ごめんください (Hello, anybody home?)',
      situation: 'Jose Santos visiting the Yamada household to deliver souvenirs.',
      lines: [
        { speaker: 'サントス', japanese: 'ごめんください。', hiragana: 'ごめんください。', english: 'Hello, anybody home?' },
        { speaker: '山田一郎', japanese: 'いらっしゃい。どうぞ お上がりください。', hiragana: 'いらっしゃい。どうぞ おあがりください。', english: 'Welcome! Do come in.' },
        { speaker: 'サントス', japanese: '失礼します。', hiragana: 'しつれいします。', english: 'Thank you.' },
        { speaker: '山田友子', japanese: 'コーヒーは いかがですか。', hiragana: 'こーひーは いかがですか。', english: 'How about a cup of coffee?' },
        { speaker: 'マリア', japanese: 'ありがとうございます。この スプーン、すてきですね。', hiragana: 'ありがとうございます。この すぷーん、すてきですね。', english: 'Thank you. This spoon is lovely, isn\'t it?' },
        { speaker: '山田友子', japanese: 'ええ。会社の 同僚に もらいました。ヨーロッパの お土産です。', hiragana: 'ええ。かいしゃの どうりょうに もらいました。よーろっぱの おみやげです。', english: 'Yes. I received it from my colleague. It\'s a souvenir from Europe.' }
      ]
    }
  },

  // =========================================================================
  // LESSON 8: Adjectives (い-Adjectives & な-Adjectives), Degree Adverbs
  // Reference: Minna no Nihongo I, Lesson 8 (Pages 54-59 / Book pages 74-79)
  // =========================================================================
  {
    id: 8,
    lessonNumber: 8,
    level: 'N5',
    title: 'Lesson 8: Adjectives (い & な), Degree Adverbs & Descriptions',
    titleJapanese: '第８課：形容詞（い形容詞・な形容詞）・程度副詞（とても・あまり）・〜が、〜',
    theme: '桜は きれいです。富士山は 高いです。日本の 食べ物は おいしいですが、高いです。',
    description: 'Learn the two classes of Japanese adjectives (い-adjectives and な-adjectives), predicate and noun-modifying forms, negative conjugations, degree adverbs とても & あまり, and linking sentences with が.',
    keyPhrases: [
      '桜は きれいです。 (Cherry blossoms are beautiful.)',
      '富士山は 高い 山です。 (Mt. Fuji is a high mountain.)',
      'この 本は おもしろくないです。 (This book is not interesting.)',
      'あそこは 静かじゃ ありません。 (It is not quiet there.)',
      '日本の 食べ物は どうですか。・・・おいしいですが、高いです。 (How is Japanese food? ...It\'s delicious, but expensive.)'
    ],
    vocabulary: [
      { id: 'l8_v1', lessonNumber: 8, kanji: 'ハンサム[な]', hiragana: 'はんさむ[な]', romaji: 'hansamu[na]', english: 'handsome', partOfSpeech: 'na-adjective', category: 'Descriptions' },
      { id: 'l8_v2', lessonNumber: 8, kanji: 'きれい[な]', hiragana: 'きれい[な]', romaji: 'kirei[na]', english: 'beautiful, clean', partOfSpeech: 'na-adjective', category: 'Descriptions' },
      { id: 'l8_v3', lessonNumber: 8, kanji: '静か[な]', hiragana: 'しずか[な]', romaji: 'shizuka[na]', english: 'quiet', partOfSpeech: 'na-adjective', category: 'Descriptions' },
      { id: 'l8_v4', lessonNumber: 8, kanji: 'にぎやか[な]', hiragana: 'にぎやか[な]', romaji: 'nigiyaka[na]', english: 'lively', partOfSpeech: 'na-adjective', category: 'Descriptions' },
      { id: 'l8_v5', lessonNumber: 8, kanji: '有名[な]', hiragana: 'ゆうめい[な]', romaji: 'yuumei[na]', english: 'famous', partOfSpeech: 'na-adjective', category: 'Descriptions' },
      { id: 'l8_v6', lessonNumber: 8, kanji: '親切[な]', hiragana: 'しんせつ[な]', romaji: 'shinsetsu[na]', english: 'kind', partOfSpeech: 'na-adjective', category: 'Descriptions' },
      { id: 'l8_v7', lessonNumber: 8, kanji: '元気[な]', hiragana: 'げんき[な]', romaji: 'genki[na]', english: 'healthy, sound, cheerful', partOfSpeech: 'na-adjective', category: 'Descriptions' },
      { id: 'l8_v8', lessonNumber: 8, kanji: '暇[な]', hiragana: 'ひま[な]', romaji: 'hima[na]', english: 'free (time)', partOfSpeech: 'na-adjective', category: 'Descriptions' },
      { id: 'l8_v9', lessonNumber: 8, kanji: '便利[な]', hiragana: 'べんり[な]', romaji: 'benri[na]', english: 'convenient', partOfSpeech: 'na-adjective', category: 'Descriptions' },
      { id: 'l8_v10', lessonNumber: 8, kanji: 'すてき[な]', hiragana: 'すてき[な]', romaji: 'suteki[na]', english: 'fine, nice, wonderful', partOfSpeech: 'na-adjective', category: 'Descriptions' },
      { id: 'l8_v11', lessonNumber: 8, kanji: '大きい', hiragana: 'おおきい', romaji: 'ookii', english: 'big, large', partOfSpeech: 'i-adjective', category: 'Descriptions' },
      { id: 'l8_v12', lessonNumber: 8, kanji: '小さい', hiragana: 'ちいさい', romaji: 'chiisai', english: 'small, little', partOfSpeech: 'i-adjective', category: 'Descriptions' },
      { id: 'l8_v13', lessonNumber: 8, kanji: '新しい', hiragana: 'あたらしい', romaji: 'atarashii', english: 'new', partOfSpeech: 'i-adjective', category: 'Descriptions' },
      { id: 'l8_v14', lessonNumber: 8, kanji: '古い', hiragana: 'ふるい', romaji: 'furui', english: 'old (not of age)', partOfSpeech: 'i-adjective', category: 'Descriptions' },
      { id: 'l8_v15', lessonNumber: 8, kanji: 'いい (よい)', hiragana: 'いい (よい)', romaji: 'ii (yoi)', english: 'good', partOfSpeech: 'i-adjective', category: 'Descriptions' },
      { id: 'l8_v16', lessonNumber: 8, kanji: '悪い', hiragana: 'わるい', romaji: 'warui', english: 'bad', partOfSpeech: 'i-adjective', category: 'Descriptions' },
      { id: 'l8_v17', lessonNumber: 8, kanji: '暑い', hiragana: 'あつい', romaji: 'atsui', english: 'hot (weather / climate)', partOfSpeech: 'i-adjective', category: 'Descriptions' },
      { id: 'l8_v18', lessonNumber: 8, kanji: '熱い', hiragana: 'あつい', romaji: 'atsui', english: 'hot (to touch / food)', partOfSpeech: 'i-adjective', category: 'Descriptions' },
      { id: 'l8_v19', lessonNumber: 8, kanji: '寒い', hiragana: 'さむい', romaji: 'samui', english: 'cold (weather / climate)', partOfSpeech: 'i-adjective', category: 'Descriptions' },
      { id: 'l8_v20', lessonNumber: 8, kanji: '冷たい', hiragana: 'つめたい', romaji: 'tsumetai', english: 'cold (to touch / food)', partOfSpeech: 'i-adjective', category: 'Descriptions' },
      { id: 'l8_v21', lessonNumber: 8, kanji: '難しい', hiragana: 'むずかしい', romaji: 'muzukashii', english: 'difficult', partOfSpeech: 'i-adjective', category: 'Descriptions' },
      { id: 'l8_v22', lessonNumber: 8, kanji: '易しい', hiragana: 'やさしい', romaji: 'yasashii', english: 'easy', partOfSpeech: 'i-adjective', category: 'Descriptions' },
      { id: 'l8_v23', lessonNumber: 8, kanji: '高い', hiragana: 'たかい', romaji: 'takai', english: 'expensive, tall, high', partOfSpeech: 'i-adjective', category: 'Descriptions' },
      { id: 'l8_v24', lessonNumber: 8, kanji: '安い', hiragana: 'やすい', romaji: 'yasui', english: 'inexpensive, cheap', partOfSpeech: 'i-adjective', category: 'Descriptions' },
      { id: 'l8_v25', lessonNumber: 8, kanji: '低い', hiragana: 'ひくい', romaji: 'hikui', english: 'low', partOfSpeech: 'i-adjective', category: 'Descriptions' },
      { id: 'l8_v26', lessonNumber: 8, kanji: '面白い', hiragana: 'おもしろい', romaji: 'omoshiroi', english: 'interesting', partOfSpeech: 'i-adjective', category: 'Descriptions' },
      { id: 'l8_v27', lessonNumber: 8, kanji: 'おいしい', hiragana: 'おいしい', romaji: 'oishii', english: 'delicious, tasty', partOfSpeech: 'i-adjective', category: 'Descriptions' },
      { id: 'l8_v28', lessonNumber: 8, kanji: '忙しい', hiragana: 'いそがしい', romaji: 'isogashii', english: 'busy', partOfSpeech: 'i-adjective', category: 'Descriptions' },
      { id: 'l8_v29', lessonNumber: 8, kanji: '楽しい', hiragana: 'たのしい', romaji: 'tanoshii', english: 'enjoyable, fun', partOfSpeech: 'i-adjective', category: 'Descriptions' },
      { id: 'l8_v30', lessonNumber: 8, kanji: '白い', hiragana: 'しろい', romaji: 'shiroi', english: 'white', partOfSpeech: 'i-adjective', category: 'Colors' },
      { id: 'l8_v31', lessonNumber: 8, kanji: '黒い', hiragana: 'くろい', romaji: 'kuroi', english: 'black', partOfSpeech: 'i-adjective', category: 'Colors' },
      { id: 'l8_v32', lessonNumber: 8, kanji: '赤い', hiragana: 'あかい', romaji: 'akai', english: 'red', partOfSpeech: 'i-adjective', category: 'Colors' },
      { id: 'l8_v33', lessonNumber: 8, kanji: '青い', hiragana: 'あおい', romaji: 'aoi', english: 'blue', partOfSpeech: 'i-adjective', category: 'Colors' },
      { id: 'l8_v34', lessonNumber: 8, kanji: '桜', hiragana: 'さくら', romaji: 'sakura', english: 'cherry (blossom)', partOfSpeech: 'noun', category: 'Nature' },
      { id: 'l8_v35', lessonNumber: 8, kanji: '山', hiragana: 'やま', romaji: 'yama', english: 'mountain', partOfSpeech: 'noun', category: 'Nature' },
      { id: 'l8_v36', lessonNumber: 8, kanji: '町', hiragana: 'まち', romaji: 'machi', english: 'town, city', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l8_v37', lessonNumber: 8, kanji: '食べ物', hiragana: 'たべもの', romaji: 'tabemono', english: 'food', partOfSpeech: 'noun', category: 'Food' },
      { id: 'l8_v38', lessonNumber: 8, kanji: '車', hiragana: 'くるま', romaji: 'kuruma', english: 'car, vehicle', partOfSpeech: 'noun', category: 'Vehicles' },
      { id: 'l8_v39', lessonNumber: 8, kanji: '所', hiragana: 'ところ', romaji: 'tokoro', english: 'place', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l8_v40', lessonNumber: 8, kanji: '寮', hiragana: 'りょう', romaji: 'ryou', english: 'dormitory', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l8_v41', lessonNumber: 8, kanji: '勉強', hiragana: 'べんきょう', romaji: 'benkyou', english: 'study', partOfSpeech: 'noun', category: 'Study' },
      { id: 'l8_v42', lessonNumber: 8, kanji: '生活', hiragana: 'せいかつ', romaji: 'seikatsu', english: 'life, daily life', partOfSpeech: 'noun', category: 'Life' },
      { id: 'l8_v43', lessonNumber: 8, kanji: '[お]仕事', hiragana: '[お]しごと', romaji: '[o]shigoto', english: 'work, business (~をします: work)', partOfSpeech: 'noun', category: 'Work' },
      { id: 'l8_v44', lessonNumber: 8, kanji: 'どう', hiragana: 'どう', romaji: 'dou', english: 'how', partOfSpeech: 'phrase', category: 'Question Words' },
      { id: 'l8_v45', lessonNumber: 8, kanji: 'どんな〜', hiragana: 'どんな〜', romaji: 'donna~', english: 'what kind of ~', partOfSpeech: 'phrase', category: 'Question Words' },
      { id: 'l8_v46', lessonNumber: 8, kanji: 'どれ', hiragana: 'どれ', romaji: 'dore', english: 'which one (of three or more)', partOfSpeech: 'pronoun', category: 'Question Words' },
      { id: 'l8_v47', lessonNumber: 8, kanji: 'とても', hiragana: 'とても', romaji: 'totemo', english: 'very', partOfSpeech: 'adverb', category: 'Degree' },
      { id: 'l8_v48', lessonNumber: 8, kanji: 'あまり', hiragana: 'あまり', romaji: 'amari', english: 'not so (used with negative verbs/adjectives)', partOfSpeech: 'adverb', category: 'Degree' },
      { id: 'l8_v49', lessonNumber: 8, kanji: 'そして', hiragana: 'そして', romaji: 'soshite', english: 'and (used to connect sentences)', partOfSpeech: 'conjunction', category: 'Conjunctions' },
      { id: 'l8_v50', lessonNumber: 8, kanji: '〜が、〜', hiragana: '〜が、〜', romaji: '~ga, ~', english: '~, but ~', partOfSpeech: 'conjunction', category: 'Conjunctions' }
    ],
    grammar: [
      {
        id: 'l8_g1',
        lessonNumber: 8,
        title: '1. Adjectives (い-adjectives & な-adjectives)',
        structure: 'い-adj (~い) / な-adj [な]',
        explanation: 'Japanese adjectives inflect. They are divided into two groups: 1) い-adjectives, which always end in い (e.g. 高い, 寒い, いい); 2) な-adjectives, which require な when modifying a noun (e.g. 静か[な], 親切[な]).',
        rules: [
          'い-adjectives: drop い and add くないです for negative.',
          'な-adjectives: drop な and add じゃ ありません for negative.',
          'Special exception: いい (good) becomes よくないです in the negative!'
        ],
        examples: [
          { japanese: 'ワット先生は 親切です。', hiragana: 'わっとせんせいは しんせつです。', romaji: 'Watto-sensei wa shinsetsu desu.', english: 'Mr. Watt is kind.' },
          { japanese: '富士山は 高いです。', hiragana: 'ふじさんは たかいです。', romaji: 'Fujisan wa takai desu.', english: 'Mt. Fuji is high.' }
        ]
      },
      {
        id: 'l8_g2',
        lessonNumber: 8,
        title: '2. Negative Forms of Adjectives',
        structure: 'な-adj: じゃ ありません | い-adj: 〜くないです',
        explanation: 'Negative predicate of な-adjectives is formed with じゃ ありません. Negative predicate of い-adjectives is formed by changing the final い to くない followed by です.',
        rules: [
          'あそこは 静かじゃ ありません (It is not quiet there).',
          'この 本は おもしろくないです (This book is not interesting).'
        ],
        examples: [
          { japanese: '琵琶湖の 水は きれいですか。・・・いいえ、きれいじゃ ありません。', hiragana: 'びわこの みずは きれいですか。・・・いいえ、きれいじゃ ありません。', romaji: 'Biwako no mizu wa kirei desu ka? ...Iie, kirei ja arimasen.', english: 'Is the water of Lake Biwa clean? ...No, it is not.' }
        ]
      },
      {
        id: 'l8_g3',
        lessonNumber: 8,
        title: '3. Noun Modification (な-adj な N / い-adj N)',
        structure: 'な-adj + な + Noun | い-adj + Noun',
        explanation: 'An adjective is placed before a noun to modify it. A な-adjective requires な before the noun; an い-adjective precedes directly with its final い.',
        rules: [
          'ワット先生は 親切な 先生です (Mr. Watt is a kind teacher).',
          '富士山は 高い 山です (Mt. Fuji is a high mountain).'
        ],
        examples: [
          { japanese: 'ワット先生は 親切な 先生です。', hiragana: 'わっとせんせいは しんせつな せんせいです。', romaji: 'Watto-sensei wa shinsetsu na sensei desu.', english: 'Mr. Watt is a kind teacher.' },
          { japanese: '富士山は 高い 山です。', hiragana: 'ふじさんは たかい やまです。', romaji: 'Fujisan wa takai yama desu.', english: 'Mt. Fuji is a high mountain.' }
        ]
      },
      {
        id: 'l8_g4',
        lessonNumber: 8,
        title: '4. とても / あまり (Adverbs of Degree)',
        structure: 'とても + Affirmative | あまり + Negative',
        explanation: 'とても means "very" and modifies affirmative adjectives. あまり means "not very / not so" and ALWAYS takes a negative adjective or verb.',
        rules: [
          '北京は とても 寒いです (Beijing is very cold).',
          '上海は あまり 寒くないです (Shanghai is not very cold).'
        ],
        examples: [
          { japanese: 'これは とても 有名な 映画です。', hiragana: 'これは とても ゆうめいな えいがです。', romaji: 'Kore wa totemo yuumei na eiga desu.', english: 'This is a very famous movie.' },
          { japanese: '上海は あまり 寒くないです。', hiragana: 'しゃんはいは あまり さむくないです。', romaji: 'Shanhai wa amari samukunai desu.', english: 'Shanghai is not very cold.' }
        ]
      },
      {
        id: 'l8_g5',
        lessonNumber: 8,
        title: '5. N は どうですか (Asking Impressions / Opinions)',
        structure: 'Noun は どうですか',
        explanation: 'Used to ask the listener\'s impression or opinion about a thing, place, or person they have experienced, visited, or met.',
        rules: [
          '日本の 生活は どうですか。・・・楽しいです (How is life in Japan? It is enjoyable).'
        ],
        examples: [
          { japanese: '日本の 生活は どうですか。・・・楽しいです。', hiragana: 'にほんの せいかつは どうですか。・・・たのしいです。', romaji: 'Nihon no seikatsu wa dou desu ka? ...Tanoshii desu.', english: 'How is life in Japan? ...It\'s enjoyable.' }
        ]
      },
      {
        id: 'l8_g6',
        lessonNumber: 8,
        title: '6. N1 は どんな N2 ですか (Describing Category)',
        structure: 'N1 は どんな N2 ですか',
        explanation: 'When the speaker wants the listener to describe or explain N1, this pattern is used. N2 denotes the category N1 belongs to.',
        rules: [
          '奈良は どんな 町ですか。・・・古い 町です (What kind of town is Nara? It is an old town).'
        ],
        examples: [
          { japanese: '奈良は どんな 町ですか。・・・古い 町です。', hiragana: 'ならは どんな まちですか。・・・ふるい まちです。', romaji: 'Nara wa donna machi desu ka? ...Furui machi desu.', english: 'What kind of town is Nara? ...It is an old town.' }
        ]
      },
      {
        id: 'l8_g7',
        lessonNumber: 8,
        title: '7. S1 が、S2 (Conjunctive Particle "but")',
        structure: 'Sentence 1 + が、+ Sentence 2',
        explanation: 'が is a conjunctive particle meaning "but". It links two contrasting clauses into a single sentence.',
        rules: [
          '日本の 食べ物は おいしいですが、高いです (Japanese food is delicious, but expensive).'
        ],
        examples: [
          { japanese: '日本の 食べ物は おいしいですが、高いです。', hiragana: 'にほんの たべものは おいしいですが、たかいです。', romaji: 'Nihon no tabemono wa oishii desu ga, takai desu.', english: 'Japanese food is delicious, but expensive.' }
        ]
      },
      {
        id: 'l8_g8',
        lessonNumber: 8,
        title: '8. どれ (Which one of three or more)',
        structure: 'どれ が [Noun] ですか',
        explanation: 'Used to ask the listener to choose or designate one item from among three or more things concretely shown or named.',
        rules: [
          'ミラーさんの 傘は どれですか。・・・あの 青い 傘です。'
        ],
        examples: [
          { japanese: 'ミラーさんの 傘は どれですか。・・・あの 青い 傘です。', hiragana: 'みらーさんの かさは どれですか。・・・あの あおい かさです。', romaji: 'Miraa-san no kasa wa dore desu ka? ...Ano aoi kasa desu.', english: 'Which is Mr. Miller\'s umbrella? ...That blue one.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l8_ex1',
        lessonNumber: 8,
        type: 'mcq',
        category: 'grammar',
        prompt: 'Choose the correct negative form of the i-adjective おもしろい (interesting):',
        contextSentence: 'この 本は（　　）。',
        options: ['おもしろくないです', 'おもしろいじゃありません', 'おもしろいでした', 'おもしろくないでした'],
        correctAnswer: 'おもしろくないです',
        explanation: 'い-adjectives drop い and take くないです for polite negative.'
      },
      {
        id: 'l8_ex2',
        lessonNumber: 8,
        type: 'fill_blank',
        category: 'grammar',
        prompt: 'Choose the correct connector when a na-adjective modifies a noun: "A kind teacher"',
        contextSentence: 'ワット先生は 親切（　　）先生です。',
        options: ['な', 'の', 'い', 'だ'],
        correctAnswer: 'な',
        explanation: 'な-adjectives require な when modifying a noun: 親切な 先生.'
      },
      {
        id: 'l8_ex3',
        lessonNumber: 8,
        type: 'sentence_formation',
        category: 'grammar',
        prompt: 'Arrange the tiles to say: "Japanese food is delicious, but expensive."',
        wordTiles: ['日本の食べ物は', 'おいしいですが、', '高いです'],
        correctAnswer: '日本の食べ物は おいしいですが、 高いです',
        explanation: 'が connects two sentences contrasting each other: おいしいですが (delicious, but).'
      }
    ],
    dialogue: {
      title: 'そろそろ 失礼します (It\'s almost time to leave)',
      situation: 'Jose and Maria Santos visiting the Yamadas for an evening chat.',
      lines: [
        { speaker: '山田一郎', japanese: '日本の 生活に 慣れましたか。', hiragana: 'にほんの せいかつに なれましたか。', english: 'Have you got accustomed to living in Japan?' },
        { speaker: 'マリア', japanese: 'はい。毎日 とても 楽しいです。', hiragana: 'はい。まいにち とても たのしいです。', english: 'Yes. It is very enjoyable every day.' },
        { speaker: 'サントス', japanese: 'もう 8時ですね。そろそろ 失礼します。', hiragana: 'もう はちじですね。そろそろ しつれいします。', english: 'It\'s already 8 o\'clock. It\'s almost time to leave.' },
        { speaker: '山田友子', japanese: 'そうですか。今日は どうも ありがとう ございました。また いらっしゃって ください。', hiragana: 'そうですか。きょうは どうも ありがとう ございました。また いらっしゃって ください。', english: 'Is that so? Thank you very much for today. Please come again.' }
      ]
    }
  },

  // =========================================================================
  // LESSON 9: Abilities, Preferences, Reasons (から), どうして
  // Reference: Minna no Nihongo I, Lesson 9 (Pages 60-65 / Book pages 80-85)
  // =========================================================================
  {
    id: 9,
    lessonNumber: 9,
    level: 'N5',
    title: 'Lesson 9: Preferences, Abilities, Reasons (から) & Interrogative どうして',
    titleJapanese: '第９課：好悪・能力・所有（〜が好き・〜が分かります・〜があります）・理由（〜から）・どうして',
    theme: 'イタリア料理が 好きです。日本語が 少し 分かります。用事が ありますから、早く 帰ります。',
    description: 'Master stating preferences (好き・嫌い), abilities (上手・下手・分かります), and possession (あります) with particle が, stating reasons with から, and asking why with どうして.',
    keyPhrases: [
      'わたしは イタリア料理が 好きです。 (I like Italian food.)',
      '日本語が 少し 分かります。 (I understand Japanese a little.)',
      '時間が ありませんから、新聞を 読みません。 (Because I have no time, I do not read the newspaper.)',
      'どうして きのう 早く 帰りましたか。・・・用事が ありましたから。 (Why did you go home early yesterday? ...Because I had an errand.)'
    ],
    vocabulary: [
      { id: 'l9_v1', lessonNumber: 9, kanji: '分かります', hiragana: 'わかります', romaji: 'wakarimasu', english: 'understand, comprehend', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l9_v2', lessonNumber: 9, kanji: 'あります', hiragana: 'あります', romaji: 'arimasu', english: 'have, possess', partOfSpeech: 'verb-1', category: 'Verbs' },
      { id: 'l9_v3', lessonNumber: 9, kanji: '好き[な]', hiragana: 'すき[な]', romaji: 'suki[na]', english: 'like, fond of', partOfSpeech: 'na-adjective', category: 'Preferences' },
      { id: 'l9_v4', lessonNumber: 9, kanji: '嫌い[な]', hiragana: 'きらい[な]', romaji: 'kirai[na]', english: 'dislike, distasteful', partOfSpeech: 'na-adjective', category: 'Preferences' },
      { id: 'l9_v5', lessonNumber: 9, kanji: '上手[な]', hiragana: 'じょうず[な]', romaji: 'jouzu[na]', english: 'good at, skilled', partOfSpeech: 'na-adjective', category: 'Abilities' },
      { id: 'l9_v6', lessonNumber: 9, kanji: '下手[な]', hiragana: 'へた[な]', romaji: 'heta[na]', english: 'poor at, unskillful', partOfSpeech: 'na-adjective', category: 'Abilities' },
      { id: 'l9_v7', lessonNumber: 9, kanji: '料理', hiragana: 'りょうり', romaji: 'ryouri', english: 'dish, cuisine, cooking', partOfSpeech: 'noun', category: 'Food' },
      { id: 'l9_v8', lessonNumber: 9, kanji: '飲み物', hiragana: 'のみもの', romaji: 'nomimono', english: 'drinks, beverages', partOfSpeech: 'noun', category: 'Food' },
      { id: 'l9_v9', lessonNumber: 9, kanji: 'スポーツ', hiragana: 'すぽーつ', romaji: 'supootsu', english: 'sport (~を します: play sports)', partOfSpeech: 'noun', category: 'Sports' },
      { id: 'l9_v10', lessonNumber: 9, kanji: '野球', hiragana: 'やきゅう', romaji: 'yakyuu', english: 'baseball (~を します: play baseball)', partOfSpeech: 'noun', category: 'Sports' },
      { id: 'l9_v11', lessonNumber: 9, kanji: 'ダンス', hiragana: 'だんす', romaji: 'dansu', english: 'dance (~を します: dance)', partOfSpeech: 'noun', category: 'Arts' },
      { id: 'l9_v12', lessonNumber: 9, kanji: '音楽', hiragana: 'おんがく', romaji: 'ongaku', english: 'music', partOfSpeech: 'noun', category: 'Arts' },
      { id: 'l9_v13', lessonNumber: 9, kanji: '歌', hiragana: 'うた', romaji: 'uta', english: 'song', partOfSpeech: 'noun', category: 'Arts' },
      { id: 'l9_v14', lessonNumber: 9, kanji: 'クラシック', hiragana: 'くらしっく', romaji: 'kurashikku', english: 'classical music', partOfSpeech: 'noun', category: 'Music' },
      { id: 'l9_v15', lessonNumber: 9, kanji: 'ジャズ', hiragana: 'じゃず', romaji: 'jazu', english: 'jazz', partOfSpeech: 'noun', category: 'Music' },
      { id: 'l9_v16', lessonNumber: 9, kanji: 'コンサート', hiragana: 'こんさーと', romaji: 'konsaato', english: 'concert', partOfSpeech: 'noun', category: 'Events' },
      { id: 'l9_v17', lessonNumber: 9, kanji: 'カラオケ', hiragana: 'からおけ', romaji: 'karaoke', english: 'karaoke', partOfSpeech: 'noun', category: 'Entertainment' },
      { id: 'l9_v18', lessonNumber: 9, kanji: '歌舞伎', hiragana: 'かぶき', romaji: 'kabuki', english: 'Kabuki (traditional Japanese drama)', partOfSpeech: 'noun', category: 'Culture' },
      { id: 'l9_v19', lessonNumber: 9, kanji: '絵', hiragana: 'え', romaji: 'e', english: 'picture, drawing', partOfSpeech: 'noun', category: 'Arts' },
      { id: 'l9_v20', lessonNumber: 9, kanji: '字', hiragana: 'じ', romaji: 'ji', english: 'letter, character', partOfSpeech: 'noun', category: 'Language' },
      { id: 'l9_v21', lessonNumber: 9, kanji: '漢字', hiragana: 'かんじ', romaji: 'kanji', english: 'Chinese characters', partOfSpeech: 'noun', category: 'Language' },
      { id: 'l9_v22', lessonNumber: 9, kanji: '細かい お金', hiragana: 'こまかい おかね', romaji: 'komakai okane', english: 'small change (coins)', partOfSpeech: 'noun', category: 'Money' },
      { id: 'l9_v23', lessonNumber: 9, kanji: 'チケット', hiragana: 'ちけっと', romaji: 'chiketto', english: 'ticket', partOfSpeech: 'noun', category: 'Objects' },
      { id: 'l9_v24', lessonNumber: 9, kanji: '時間', hiragana: 'じかん', romaji: 'jikan', english: 'time', partOfSpeech: 'noun', category: 'Time' },
      { id: 'l9_v25', lessonNumber: 9, kanji: '用事', hiragana: 'ようじ', romaji: 'youji', english: 'something to do, errand', partOfSpeech: 'noun', category: 'Daily Life' },
      { id: 'l9_v26', lessonNumber: 9, kanji: '約束', hiragana: 'やくそく', romaji: 'yakusoku', english: 'appointment, promise', partOfSpeech: 'noun', category: 'Daily Life' },
      { id: 'l9_v27', lessonNumber: 9, kanji: 'ご主人', hiragana: 'ごしゅじん', romaji: 'goshujin', english: '(someone else\'s) husband', partOfSpeech: 'noun', category: 'Family' },
      { id: 'l9_v28', lessonNumber: 9, kanji: '夫 / 主人', hiragana: 'おっと / しゅじん', romaji: 'otto / shujin', english: '(my) husband', partOfSpeech: 'noun', category: 'Family' },
      { id: 'l9_v29', lessonNumber: 9, kanji: '奥さん', hiragana: 'おくさん', romaji: 'okusan', english: '(someone else\'s) wife', partOfSpeech: 'noun', category: 'Family' },
      { id: 'l9_v30', lessonNumber: 9, kanji: '妻 / 家内', hiragana: 'つま / かない', romaji: 'tsuma / kanai', english: '(my) wife', partOfSpeech: 'noun', category: 'Family' },
      { id: 'l9_v31', lessonNumber: 9, kanji: '子ども', hiragana: 'こども', romaji: 'kodomo', english: 'child', partOfSpeech: 'noun', category: 'Family' },
      { id: 'l9_v32', lessonNumber: 9, kanji: 'よく', hiragana: 'よく', romaji: 'yoku', english: 'well, much', partOfSpeech: 'adverb', category: 'Degree' },
      { id: 'l9_v33', lessonNumber: 9, kanji: 'だいたい', hiragana: 'だいたい', romaji: 'daitai', english: 'mostly, roughly', partOfSpeech: 'adverb', category: 'Degree' },
      { id: 'l9_v34', lessonNumber: 9, kanji: 'たくさん', hiragana: 'たくさん', romaji: 'takusan', english: 'many, much', partOfSpeech: 'adverb', category: 'Amount' },
      { id: 'l9_v35', lessonNumber: 9, kanji: '少し', hiragana: 'すこし', romaji: 'sukoshi', english: 'a little, a few', partOfSpeech: 'adverb', category: 'Degree' },
      { id: 'l9_v36', lessonNumber: 9, kanji: '全然', hiragana: 'ぜんぜん', romaji: 'zenzen', english: 'not at all (used with negatives)', partOfSpeech: 'adverb', category: 'Degree' },
      { id: 'l9_v37', lessonNumber: 9, kanji: '早く、速く', hiragana: 'はやく', romaji: 'hayaku', english: 'early, quickly, fast', partOfSpeech: 'adverb', category: 'Speed' },
      { id: 'l9_v38', lessonNumber: 9, kanji: '〜から', hiragana: '〜から', romaji: '~kara', english: 'because ~', partOfSpeech: 'particle', category: 'Conjunctions' },
      { id: 'l9_v39', lessonNumber: 9, kanji: 'どうして', hiragana: 'どうして', romaji: 'doushite', english: 'why', partOfSpeech: 'phrase', category: 'Question Words' },
      { id: 'l9_v40', lessonNumber: 9, kanji: '残念です[ね]', hiragana: 'ざんねんです[ね]', romaji: 'zannen desu [ne]', english: 'I\'m sorry (to hear that) / That\'s a pity', partOfSpeech: 'phrase', category: 'Expressions' }
    ],
    grammar: [
      {
        id: 'l9_g1',
        lessonNumber: 9,
        title: '1. N が あります / わかります / 好きです / 嫌いです / 上手です / 下手です',
        structure: 'Noun + が + あります / わかります / 好きです / etc.',
        explanation: 'In Japanese, the object of verbs of ability/possession (あります, わかります) and adjectives of preference/skill (好き, 嫌い, 上手, 下手) is marked with particle が, NOT を.',
        rules: [
          'わたしは イタリア料理が 好きです (I like Italian cuisine).',
          '日本語が わかります (I understand Japanese).',
          '車が あります (I have a car).'
        ],
        examples: [
          { japanese: 'わたしは イタリア料理が 好きです。', hiragana: 'わたしは いたりありょうりが すきです。', romaji: 'Watashi wa Itaria-ryouri ga suki desu.', english: 'I like Italian food.' },
          { japanese: 'わたしは 日本語が わかります。', hiragana: 'わたしは にほんごが わかります。', romaji: 'Watashi wa Nihongo ga wakarimasu.', english: 'I understand Japanese.' },
          { japanese: 'わたしは 車が あります。', hiragana: 'わたしは くるまが あります。', romaji: 'Watashi wa kuruma ga arimasu.', english: 'I have a car.' }
        ]
      },
      {
        id: 'l9_g2',
        lessonNumber: 9,
        title: '2. どんな N (Asking for Specific Preference in a Group)',
        structure: 'どんな + Noun + が 好きですか',
        explanation: 'Used to ask the listener to name a specific item from a category or group.',
        rules: [
          'どんな スポーツが 好きですか。・・・サッカーが 好きです。'
        ],
        examples: [
          { japanese: 'どんな スポーツが 好きですか。・・・サッカーが 好きです。', hiragana: 'どんな すぽーつが すきですか。・・・さっかーが すきです。', romaji: 'Donna supootsu ga suki desu ka? ...Sakkaa ga suki desu.', english: 'What sports do you like? ...I like football.' }
        ]
      },
      {
        id: 'l9_g3',
        lessonNumber: 9,
        title: '3. Degree & Amount Adverbs (よく / だいたい / たくさん / 少し / あまり / 全然)',
        structure: 'Adverb + Verb',
        explanation: 'Degree adverbs: よく (well), だいたい (mostly), すこし (a little), あまり〜ません (not so well), ぜんぜん〜ません (not at all). Amount adverbs: たくさん (many), すこし (a few), あまり〜ません, ぜんぜん〜ません.',
        rules: [
          '英語が よく わかります (I understand English very well).',
          'お金が 全然 ありません (I don\'t have any money at all).'
        ],
        examples: [
          { japanese: '英語が 少し わかります。', hiragana: 'えいごが すこし わかります。', romaji: 'Eigo ga sukoshi wakarimasu.', english: 'I understand English a little.' },
          { japanese: 'お金が たくさん あります。', hiragana: 'おかねが たくさん あります。', romaji: 'Okane ga takusan arimasu.', english: 'I have a lot of money.' }
        ]
      },
      {
        id: 'l9_g4',
        lessonNumber: 9,
        title: '4. S1 から、S2 (Cause / Reason)',
        structure: 'Sentence 1 (reason) + から、Sentence 2 (result)',
        explanation: 'から connects two sentences together to denote a causal relationship. S1 is the reason for S2 ("Because S1, S2").',
        rules: [
          '時間が ありませんから、新聞を 読みません (Because I don\'t have time, I don\'t read the newspaper).'
        ],
        examples: [
          { japanese: '時間が ありませんから、新聞を 読みません。', hiragana: 'じかんが ありませんから、しんぶんを よみません。', romaji: 'Jikan ga arimasen kara, shinbun o yomimasen.', english: 'Because I don\'t have time, I don\'t read the newspaper.' }
        ]
      },
      {
        id: 'l9_g5',
        lessonNumber: 9,
        title: '5. どうして (Asking Reason: Why?)',
        structure: 'どうして 〜か。・・・〜から。',
        explanation: 'The interrogative どうして is used to ask for a reason. The answering sentence always ends with から.',
        rules: [
          'どうして 早く 帰りますか。・・・子どもの 誕生日ですから。'
        ],
        examples: [
          { japanese: 'どうして きのう 早く 帰りましたか。・・・子どもの 誕生日でしたから。', hiragana: 'どうして きのう はやく かえりましたか。・・・こどもの たんじょうびでしたから。', romaji: 'Doushite kinou hayaku kaerimashita ka? ...Kodomo no tanjoubi deshita kara.', english: 'Why did you go home early yesterday? ...Because it was my child\'s birthday.' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l9_ex1',
        lessonNumber: 9,
        type: 'mcq',
        category: 'grammar',
        prompt: 'Choose the correct particle for stating preference: "I like Italian food."',
        contextSentence: 'わたしは イタリア料理（　　）好きです。',
        options: ['が', 'を', 'に', 'で'],
        correctAnswer: 'が',
        explanation: 'Preferences with 好きです take particle が, not を.'
      },
      {
        id: 'l9_ex2',
        lessonNumber: 9,
        type: 'fill_blank',
        category: 'grammar',
        prompt: 'Which adverb pairs with a negative verb to mean "not at all"?',
        contextSentence: '英語が（　　）分かりません。',
        options: ['全然', 'よく', 'だいたい', 'たくさん'],
        correctAnswer: '全然',
        explanation: '全然 (zenzen) always pairs with negative forms to mean "not at all".'
      },
      {
        id: 'l9_ex3',
        lessonNumber: 9,
        type: 'sentence_formation',
        category: 'grammar',
        prompt: 'Arrange the tiles to say: "Because I have an errand, I will return early."',
        wordTiles: ['用事がありますから、', '早く', '帰ります'],
        correctAnswer: '用事がありますから、 早く 帰ります',
        explanation: 'S1 から (reason) + S2 (consequence).'
      }
    ],
    dialogue: {
      title: '残念ですが (That\'s a pity)',
      situation: 'Miller inviting Kimura to a concert by conductor Seiji Ozawa.',
      lines: [
        { speaker: 'ミラー', japanese: '木村さん、来週の金曜日の晩、コンサートへ 行きませんか。小沢征爾の コンサートです。', hiragana: 'きむらさん、らいしゅうの きんようびのばん、こんさーとへ いきませんか。おざわせいじの こんさーとです。', english: 'Ms. Kimura, won\'t you go to a concert next Friday evening? It\'s a concert by Seiji Ozawa.' },
        { speaker: '木村', japanese: 'いいですね。金曜日ですか。金曜日の晩は ちょっと……。', hiragana: 'いいですね。きんようびですか。きんようびのばんは ちょっと……。', english: 'Sounds nice. Friday? Friday evening is a bit difficult...' },
        { speaker: 'ミラー', japanese: 'だめですか。', hiragana: 'だめですか。', english: 'So you cannot come?' },
        { speaker: '木村', japanese: 'ええ、友達と 約束が ありますから。残念ですが……。', hiragana: 'ええ、ともだちと やくそくが ありますから。ざんねんですが……。', english: 'Yes, because I have an appointment with a friend. It\'s a pity, but...' },
        { speaker: 'ミラー', japanese: 'そうですか。じゃ、また 今度 お願いします。', hiragana: 'そうですか。じゃ、また こんど おねがいします。', english: 'I see. Well, please invite me again another time.' }
      ]
    }
  },

  // =========================================================================
  // LESSON 10: Existence (あります / います), Positional Relations, 〜や〜など
  // Reference: Minna no Nihongo I, Lesson 10 (Pages 66-71 / Book pages 86-91)
  // =========================================================================
  {
    id: 10,
    lessonNumber: 10,
    level: 'N5',
    title: 'Lesson 10: Existence (あります/います), Positions & Non-Exhaustive Lists (や)',
    titleJapanese: '第１０課：存在（あります・います）・位置関係（上・下・前・後ろ・中・隣）・並立（〜や〜など）',
    theme: '部屋に 机が あります。庭に 犬が います。机の 上に 写真が あります。',
    description: 'Learn the fundamental distinction between inanimate existence (あります) and animate existence (います), locating objects/people in space (に あります), spatial relationship nouns (上・下・前・後ろ・中・外・隣・間), and non-exhaustive listing (〜や〜など).',
    keyPhrases: [
      'あそこに 佐藤さんが います。 (Ms. Sato is over there.)',
      '机の 上に 写真が あります。 (There is a photo on the desk.)',
      '家族は ニューヨークに います。 (My family is in New York.)',
      '箱の 中に 手紙や 写真[など]が あります。 (There are letters, photos and so on in the box.)',
      'チリソースは ありませんか。 (Do you have chili sauce in this store?)'
    ],
    vocabulary: [
      { id: 'l10_v1', lessonNumber: 10, kanji: 'います', hiragana: 'います', romaji: 'imasu', english: 'exist, be (referring to animate beings: humans, animals)', partOfSpeech: 'verb-2', category: 'Existence' },
      { id: 'l10_v2', lessonNumber: 10, kanji: 'あります', hiragana: 'あります', romaji: 'arimasu', english: 'exist, be (referring to inanimate things, plants, places)', partOfSpeech: 'verb-1', category: 'Existence' },
      { id: 'l10_v3', lessonNumber: 10, kanji: 'いろいろ[な]', hiragana: 'いろいろ[な]', romaji: 'iroiro[na]', english: 'various', partOfSpeech: 'na-adjective', category: 'Descriptions' },
      { id: 'l10_v4', lessonNumber: 10, kanji: '男の人', hiragana: 'おとこのひと', romaji: 'otoko no hito', english: 'man', partOfSpeech: 'noun', category: 'People' },
      { id: 'l10_v5', lessonNumber: 10, kanji: '女の人', hiragana: 'おんなのひと', romaji: 'onna no hito', english: 'woman', partOfSpeech: 'noun', category: 'People' },
      { id: 'l10_v6', lessonNumber: 10, kanji: '男の子', hiragana: 'おとこのこ', romaji: 'otoko no ko', english: 'boy', partOfSpeech: 'noun', category: 'People' },
      { id: 'l10_v7', lessonNumber: 10, kanji: '女の子', hiragana: 'おんなのこ', romaji: 'onna no ko', english: 'girl', partOfSpeech: 'noun', category: 'People' },
      { id: 'l10_v8', lessonNumber: 10, kanji: '犬', hiragana: 'いぬ', romaji: 'inu', english: 'dog', partOfSpeech: 'noun', category: 'Animals' },
      { id: 'l10_v9', lessonNumber: 10, kanji: '猫', hiragana: 'ねこ', romaji: 'neko', english: 'cat', partOfSpeech: 'noun', category: 'Animals' },
      { id: 'l10_v10', lessonNumber: 10, kanji: '木', hiragana: 'き', romaji: 'ki', english: 'tree, wood', partOfSpeech: 'noun', category: 'Nature' },
      { id: 'l10_v11', lessonNumber: 10, kanji: '物', hiragana: 'もの', romaji: 'mono', english: 'thing', partOfSpeech: 'noun', category: 'Objects' },
      { id: 'l10_v12', lessonNumber: 10, kanji: 'フィルム', hiragana: 'ふぃるむ', romaji: 'firumu', english: 'film', partOfSpeech: 'noun', category: 'Objects' },
      { id: 'l10_v13', lessonNumber: 10, kanji: '電池', hiragana: 'でんち', romaji: 'denchi', english: 'battery', partOfSpeech: 'noun', category: 'Objects' },
      { id: 'l10_v14', lessonNumber: 10, kanji: '箱', hiragana: 'はこ', romaji: 'hako', english: 'box', partOfSpeech: 'noun', category: 'Objects' },
      { id: 'l10_v15', lessonNumber: 10, kanji: 'スイッチ', hiragana: 'すいっち', romaji: 'suitchi', english: 'switch', partOfSpeech: 'noun', category: 'Objects' },
      { id: 'l10_v16', lessonNumber: 10, kanji: '冷蔵庫', hiragana: 'れいぞうこ', romaji: 'reizouko', english: 'refrigerator', partOfSpeech: 'noun', category: 'Furniture' },
      { id: 'l10_v17', lessonNumber: 10, kanji: 'テーブル', hiragana: 'てーぶる', romaji: 'teeburu', english: 'table', partOfSpeech: 'noun', category: 'Furniture' },
      { id: 'l10_v18', lessonNumber: 10, kanji: 'ベッド', hiragana: 'べっど', romaji: 'beddo', english: 'bed', partOfSpeech: 'noun', category: 'Furniture' },
      { id: 'l10_v19', lessonNumber: 10, kanji: '棚', hiragana: 'たな', romaji: 'tana', english: 'shelf', partOfSpeech: 'noun', category: 'Furniture' },
      { id: 'l10_v20', lessonNumber: 10, kanji: 'ドア', hiragana: 'どあ', romaji: 'doa', english: 'door', partOfSpeech: 'noun', category: 'House' },
      { id: 'l10_v21', lessonNumber: 10, kanji: '窓', hiragana: 'まど', romaji: 'mado', english: 'window', partOfSpeech: 'noun', category: 'House' },
      { id: 'l10_v22', lessonNumber: 10, kanji: 'ポスト', hiragana: 'ぽすと', romaji: 'posuto', english: 'mailbox, postbox', partOfSpeech: 'noun', category: 'Town' },
      { id: 'l10_v23', lessonNumber: 10, kanji: 'ビル', hiragana: 'びる', romaji: 'biru', english: 'building', partOfSpeech: 'noun', category: 'Town' },
      { id: 'l10_v24', lessonNumber: 10, kanji: '公園', hiragana: 'こうえん', romaji: 'kouen', english: 'park', partOfSpeech: 'noun', category: 'Town' },
      { id: 'l10_v25', lessonNumber: 10, kanji: '喫茶店', hiragana: 'きっさてん', romaji: 'kissaten', english: 'coffee shop', partOfSpeech: 'noun', category: 'Town' },
      { id: 'l10_v26', lessonNumber: 10, kanji: '本屋', hiragana: 'ほんや', romaji: 'hon\'ya', english: 'bookstore', partOfSpeech: 'noun', category: 'Town' },
      { id: 'l10_v27', lessonNumber: 10, kanji: '〜屋', hiragana: '〜や', romaji: '~ya', english: '~ store, ~ shop', partOfSpeech: 'counter', category: 'Town' },
      { id: 'l10_v28', lessonNumber: 10, kanji: '乗り場', hiragana: 'のりば', romaji: 'noriba', english: 'a fixed place to catch taxis, trains, etc.', partOfSpeech: 'noun', category: 'Town' },
      { id: 'l10_v29', lessonNumber: 10, kanji: '県', hiragana: 'けん', romaji: 'ken', english: 'prefecture', partOfSpeech: 'noun', category: 'Places' },
      { id: 'l10_v30', lessonNumber: 10, kanji: '上', hiragana: 'うえ', romaji: 'ue', english: 'on, above, over', partOfSpeech: 'noun', category: 'Positions' },
      { id: 'l10_v31', lessonNumber: 10, kanji: '下', hiragana: 'した', romaji: 'shita', english: 'under, below, beneath', partOfSpeech: 'noun', category: 'Positions' },
      { id: 'l10_v32', lessonNumber: 10, kanji: '前', hiragana: 'まえ', romaji: 'mae', english: 'front, before', partOfSpeech: 'noun', category: 'Positions' },
      { id: 'l10_v33', lessonNumber: 10, kanji: '後ろ', hiragana: 'うしろ', romaji: 'ushiro', english: 'back, behind', partOfSpeech: 'noun', category: 'Positions' },
      { id: 'l10_v34', lessonNumber: 10, kanji: '右', hiragana: 'みぎ', romaji: 'migi', english: 'right [side]', partOfSpeech: 'noun', category: 'Positions' },
      { id: 'l10_v35', lessonNumber: 10, kanji: '左', hiragana: 'ひだり', romaji: 'hidari', english: 'left [side]', partOfSpeech: 'noun', category: 'Positions' },
      { id: 'l10_v36', lessonNumber: 10, kanji: '中', hiragana: 'なか', romaji: 'naka', english: 'in, inside', partOfSpeech: 'noun', category: 'Positions' },
      { id: 'l10_v37', lessonNumber: 10, kanji: '外', hiragana: 'そと', romaji: 'soto', english: 'outside', partOfSpeech: 'noun', category: 'Positions' },
      { id: 'l10_v38', lessonNumber: 10, kanji: '隣', hiragana: 'となり', romaji: 'tonari', english: 'next, next door', partOfSpeech: 'noun', category: 'Positions' },
      { id: 'l10_v39', lessonNumber: 10, kanji: '近く', hiragana: 'ちかく', romaji: 'chikaku', english: 'near, vicinity', partOfSpeech: 'noun', category: 'Positions' },
      { id: 'l10_v40', lessonNumber: 10, kanji: '間', hiragana: 'あいだ', romaji: 'aida', english: 'between, among', partOfSpeech: 'noun', category: 'Positions' },
      { id: 'l10_v41', lessonNumber: 10, kanji: '〜や〜[など]', hiragana: '〜や〜[など]', romaji: '~ya~ [nado]', english: '~, ~, and so on (non-exhaustive list)', partOfSpeech: 'particle', category: 'Particles' },
      { id: 'l10_v42', lessonNumber: 10, kanji: 'いちばん〜', hiragana: 'いちばん〜', romaji: 'ichiban~', english: 'the most ~ (e.g. いちばん 上: the very top)', partOfSpeech: 'adverb', category: 'Degree' },
      { id: 'l10_v43', lessonNumber: 10, kanji: 'ー段目', hiragana: 'ーだんめ', romaji: '-danme', english: 'the -th shelf (だん is the counter for shelves)', partOfSpeech: 'counter', category: 'Positions' },
      { id: 'l10_v44', lessonNumber: 10, kanji: 'チリソース', hiragana: 'ちりそーす', romaji: 'chiri-soosu', english: 'chili sauce', partOfSpeech: 'noun', category: 'Food' },
      { id: 'l10_v45', lessonNumber: 10, kanji: '奥', hiragana: 'おく', romaji: 'oku', english: 'the back, innermost part', partOfSpeech: 'noun', category: 'Positions' },
      { id: 'l10_v46', lessonNumber: 10, kanji: 'スパイス・コーナー', hiragana: 'すぱいす・こーなー', romaji: 'supaisu-koonaa', english: 'spice corner', partOfSpeech: 'noun', category: 'Places' }
    ],
    grammar: [
      {
        id: 'l10_g1',
        lessonNumber: 10,
        title: '1. N が あります / います (Existence of Inanimate vs Animate)',
        structure: 'Noun (subject) + が + あります / います',
        explanation: 'Used to indicate the presence or existence of a thing or person. あります is used for inanimate objects, plants, and fixed places. います is used for animate beings (people and animals).',
        rules: [
          'コンピューターが あります (There is a computer).',
          '桜が あります (There are cherry trees).',
          '男の人が います (There is a man).',
          '犬が います (There is a dog).'
        ],
        examples: [
          { japanese: '庭に 犬が います。', hiragana: 'にわに いぬが います。', romaji: 'Niwa ni inu ga imasu.', english: 'There is a dog in the garden.' },
          { japanese: '部屋に 机が あります。', hiragana: 'へやに つくえが あります。', romaji: 'Heya ni tsukue ga arimasu.', english: 'There is a desk in the room.' }
        ]
      },
      {
        id: 'l10_g2',
        lessonNumber: 10,
        title: '2. N1(place) に N2 が あります / います (Location of Existence)',
        structure: 'Place + に + Object/Person + が + あります / います',
        explanation: 'The place where N2 is present is marked by particle に.',
        rules: [
          '地下に 何が ありますか。・・・レストランが あります。',
          '受付に だれが いますか。・・・木村さんが います。'
        ],
        examples: [
          { japanese: '事務所に ミラーさんが います。', hiragana: 'じむしょに みらーさんが います。', romaji: 'Jimusho ni Miraa-san ga imasu.', english: 'Mr. Miller is in the office.' },
          { japanese: '地下に 何が ありますか。・・・レストランが あります。', hiragana: 'ちかに なにが ありますか。・・・れすとらんが あります。', romaji: 'Chika ni nani ga arimasu ka? ...Resutoran ga arimasu.', english: 'What is there in the basement? ...There are restaurants.' }
        ]
      },
      {
        id: 'l10_g3',
        lessonNumber: 10,
        title: '3. N1 は N2(place) に あります / います (Topic Location)',
        structure: 'Noun 1 (topic) + は + Noun 2(place) + に + あります / います',
        explanation: 'In this pattern, N1 is picked up as the known topic, and the speaker explains where N1 is located.',
        rules: [
          '東京ディズニーランドは 千葉県に あります。',
          'ミラーさんは どこに いますか。・・・事務所に います。'
        ],
        examples: [
          { japanese: '東京ディズニーランドは 千葉県に あります。', hiragana: 'とうきょうでぃずにーらんどは ちばけんに あります。', romaji: 'Toukyou Dizuniirando wa Chiba-ken ni arimasu.', english: 'Tokyo Disneyland is in Chiba Prefecture.' }
        ]
      },
      {
        id: 'l10_g4',
        lessonNumber: 10,
        title: '4. N1(thing/person/place) の N2(position)',
        structure: 'N1 の [上 / 下 / 前 / 後ろ / 右 / 左 / 中 / 外 / 隣 / 近く / 間]',
        explanation: 'Spatial relationship nouns denote position relative to N1. They work as place nouns and can be followed by に (location) or で (action venue).',
        rules: [
          '机の 上に 写真が あります (There is a photo on the desk).',
          '郵便局は 銀行の 隣に あります (The post office is next to the bank).'
        ],
        examples: [
          { japanese: '机の 上に 写真が あります。', hiragana: 'つくえの うえに しゃしんが あります。', romaji: 'Tsukue no ue ni shashin ga arimasu.', english: 'There is a picture on the desk.' },
          { japanese: '駅の 近くで 友達に 会いました。', hiragana: 'えきの ちかくで ともだちに あいました。', romaji: 'Eki no chikaku de tomodachi ni aimashita.', english: 'I met a friend near the station.' }
        ]
      },
      {
        id: 'l10_g5',
        lessonNumber: 10,
        title: '5. N1 や N2 [など] (Non-Exhaustive Listing)',
        structure: 'Noun 1 や Noun 2 [など]',
        explanation: 'While と enumerates all items exhaustively, や lists two or three representative items. など is often put after the last noun to explicitly state "and so on".',
        rules: [
          '箱の 中に 手紙や 写真[など]が あります (There are letters, pictures, etc. in the box).'
        ],
        examples: [
          { japanese: '箱の 中に 手紙や 写真が あります。', hiragana: 'はこの なかに てがみや しゃしんが あります。', romaji: 'Hako no naka ni tegami ya shashin ga arimasu.', english: 'There are letters, pictures, and so on in the box.' }
        ]
      },
      {
        id: 'l10_g6',
        lessonNumber: 10,
        title: '6. チリソースは ありませんか (Polite Inquiry)',
        structure: 'Noun は ありませんか',
        explanation: 'In stores or requests, using the negative form ありませんか instead of ありますか sounds indirect and polite, showing that the speaker is prepared for a negative answer.',
        rules: [
          'Shows polite consideration when inquiring about availability.'
        ],
        examples: [
          { japanese: 'すみません、チリソースは ありませんか。', hiragana: 'すみません、ちりそーすは ありませんか。', romaji: 'Sumimasen, chiri-soosu wa arimasen ka.', english: 'Excuse me, do you have chili sauce?' }
        ]
      }
    ],
    exercises: [
      {
        id: 'l10_ex1',
        lessonNumber: 10,
        type: 'mcq',
        category: 'grammar',
        prompt: 'Choose the correct existence verb for a dog (animate animal):',
        contextSentence: '庭に 犬が（　　）。',
        options: ['います', 'あります', 'です', 'します'],
        correctAnswer: 'います',
        explanation: 'Living, animate beings (people, animals) take います.'
      },
      {
        id: 'l10_ex2',
        lessonNumber: 10,
        type: 'fill_blank',
        category: 'grammar',
        prompt: 'Choose the correct particle for non-exhaustive listing ("letters, photos and so on"):',
        contextSentence: '箱の 中に 手紙（　　）写真が あります。',
        options: ['や', 'と', 'も', 'に'],
        correctAnswer: 'や',
        explanation: 'Particle や is used to list representative items (and so on).'
      },
      {
        id: 'l10_ex3',
        lessonNumber: 10,
        type: 'sentence_formation',
        category: 'grammar',
        prompt: 'Arrange the tiles to say: "There is a photo on the desk."',
        wordTiles: ['机の上に', '写真が', 'あります'],
        correctAnswer: '机の上に 写真が あります',
        explanation: '机の上に (on the desk) + 写真が あります (there is a photo).'
      }
    ],
    dialogue: {
      title: 'チリソースは ありませんか (Do you have chili sauce in this store?)',
      situation: 'Miller asking a clerk at Yunyu-ya Supermarket for chili sauce.',
      lines: [
        { speaker: 'ミラー', japanese: 'あのう、すみません。チリソースは ありませんか。', hiragana: 'あのう、すみません。ちりそーすは ありませんか。', english: 'Excuse me, do you have chili sauce?' },
        { speaker: '店員', japanese: 'はい。あちらの 右側の 奥に スパイス・コーナーが ございます。', hiragana: 'はい。あちらの みぎがわの おくに すぱいす・こーなーが ございます。', english: 'Yes. There is a spice corner on the right-hand side at the back.' },
        { speaker: '店員', japanese: 'チリソースは 下から 2段目に ございます。', hiragana: 'ちりそーすは したから にだんめに ございます。', english: 'Chili sauce is on the second shelf from the bottom.' },
        { speaker: 'ミラー', japanese: 'そうですか。どうも ありがとう。', hiragana: 'そうですか。どうも ありがとう。', english: 'I see. Thank you very much.' }
      ]
    }
  }
];
