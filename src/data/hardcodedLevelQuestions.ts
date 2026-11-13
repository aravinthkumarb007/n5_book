import { QuizQuestion } from '@/types/kanji';

export interface LevelHardcodedTest {
  level: number;
  title: string;
  subtitle: string;
  questions: QuizQuestion[];
}

export const HARDCODED_LEVEL_TESTS: Record<number, QuizQuestion[]> = {
  // ==========================================
  // LEVEL 1 (人 日 一 二 三 四 五 六 七 八)
  // ==========================================
  1: [
    {
      id: 'hardcoded_l1_q1',
      kanjiId: 1,
      kanjiCharacter: '人',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '人[ひと]',
      secondaryPrompt: 'What is the English meaning of this Kanji?',
      options: ['Person / Human', 'Day / Sun', 'Big / Great', 'Tree / Wood'],
      correctAnswer: 'Person / Human',
      explanation: '「人」 means "Person / Human". Kunyomi reading is ひと (hito), Onyomi reading is ジン, ニン (jin, nin).',
      englishMeaning: 'Person / Human'
    },
    {
      id: 'hardcoded_l1_q2',
      kanjiId: 2,
      kanjiCharacter: '日',
      type: 'kanji_to_onyomi',
      difficulty: 'medium',
      prompt: '日[にち]',
      secondaryPrompt: 'Which of the following is the Onyomi reading of 「日」?',
      options: ['ニチ, ジツ', 'ジン, ニン', 'サン', 'イチ'],
      correctAnswer: 'ニチ, ジツ',
      explanation: 'The Onyomi reading of 「日」 is ニチ (nichi) or ジツ (jitsu). Kunyomi reading is ひ (hi) or か (ka).',
      englishMeaning: 'Day / Sun'
    },
    {
      id: 'hardcoded_l1_q3',
      kanjiId: 3,
      kanjiCharacter: '一',
      type: 'english_to_kanji',
      difficulty: 'medium',
      prompt: 'One (number 1)',
      secondaryPrompt: 'Select the correct Kanji character for "One":',
      options: ['一', '二', '三', '八'],
      correctAnswer: '一',
      explanation: '「一」 represents the number 1 (イチ / ひとつ).',
      englishMeaning: 'One'
    },
    {
      id: 'hardcoded_l1_q4',
      kanjiId: 4,
      kanjiCharacter: '二',
      type: 'kanji_to_kunyomi',
      difficulty: 'medium',
      prompt: '二[ふた]つ',
      secondaryPrompt: 'What is the Kunyomi reading for the Kanji in 「二つ」?',
      options: ['ふた', 'ひと', 'みっ', 'よっ'],
      correctAnswer: 'ふた',
      explanation: 'The native Japanese Kunyomi reading of 「二」 is ふた (futa) as in 二つ (futatsu = two things).',
      englishMeaning: 'Two'
    },
    {
      id: 'hardcoded_l1_q5',
      kanjiId: 5,
      kanjiCharacter: '三',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '三[さん]日[か]',
      secondaryPrompt: 'What is the reading and meaning of 「三日」?',
      options: ['みっか (3rd day of the month / 3 days)', 'ふつか (2nd day of the month)', 'ついたち (1st day of the month)', 'よっか (4th day of the month)'],
      correctAnswer: 'みっか (3rd day of the month / 3 days)',
      explanation: '「三日」 is read as みっか (mikka) and means the 3rd day of the month or a duration of three days.',
      englishMeaning: 'Three'
    },
    {
      id: 'hardcoded_l1_q6',
      kanjiId: 6,
      kanjiCharacter: '四',
      type: 'kanji_to_kunyomi',
      difficulty: 'medium',
      prompt: '四[よん]',
      secondaryPrompt: 'Select the common Kunyomi readings for 「四」:',
      options: ['よ, よっ, よん', 'み, みっ', 'いつ', 'む, むっ'],
      correctAnswer: 'よ, よっ, よん',
      explanation: '「四」 has the Kunyomi readings よ (yo), よっ (yot-), and よん (yon). Its Onyomi is シ (shi).',
      englishMeaning: 'Four'
    },
    {
      id: 'hardcoded_l1_q7',
      kanjiId: 7,
      kanjiCharacter: '五',
      type: 'english_to_kanji',
      difficulty: 'medium',
      prompt: 'Five (number 5)',
      secondaryPrompt: 'Select the correct Kanji character representing "Five":',
      options: ['五', '四', '六', '八'],
      correctAnswer: '五',
      explanation: '「五」 is the Kanji for five (Onyomi: ゴ, Kunyomi: いつ / いつつ).',
      englishMeaning: 'Five'
    },
    {
      id: 'hardcoded_l1_q8',
      kanjiId: 8,
      kanjiCharacter: '六',
      type: 'kanji_to_onyomi',
      difficulty: 'medium',
      prompt: '六[ろく]',
      secondaryPrompt: 'What is the Onyomi reading of 「六」?',
      options: ['ロク', 'シチ', 'ハチ', 'サン'],
      correctAnswer: 'ロク',
      explanation: '「六」 has the Onyomi reading ロク (roku) and Kunyomi readings む, むっ, むい.',
      englishMeaning: 'Six'
    },
    {
      id: 'hardcoded_l1_q9',
      kanjiId: 9,
      kanjiCharacter: '七',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '七[なな]人[にん]',
      secondaryPrompt: 'What does 「七人」 mean?',
      options: ['7 people', '8 people', '5 people', '3 people'],
      correctAnswer: '7 people',
      explanation: '「七人」 is read as しちにん (shichinin) or ななにん (nananin), meaning "7 people".',
      englishMeaning: 'Seven'
    },
    {
      id: 'hardcoded_l1_q10',
      kanjiId: 10,
      kanjiCharacter: '八',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '八[はち]',
      secondaryPrompt: 'What is the number represented by 「八」?',
      options: ['Eight (8)', 'Six (6)', 'Seven (7)', 'Nine (9)'],
      correctAnswer: 'Eight (8)',
      explanation: '「八」 represents the number 8 (Onyomi: ハチ, Kunyomi: や, やっ, よう).',
      englishMeaning: 'Eight'
    }
  ],

  // ==========================================
  // LEVEL 2 (九 十 月 火 水 木 金 土 百 千)
  // ==========================================
  2: [
    {
      id: 'hardcoded_l2_q1',
      kanjiId: 11,
      kanjiCharacter: '九',
      type: 'kanji_to_onyomi',
      difficulty: 'medium',
      prompt: '九[きゅう]',
      secondaryPrompt: 'What are the Onyomi readings for 「九」?',
      options: ['キュウ, ク', 'ジュウ, ジッ', 'ヒャク', 'セン'],
      correctAnswer: 'キュウ, ク',
      explanation: '「九」 has the Onyomi readings キュウ (kyuu) and ク (ku). Kunyomi reading is ここの (kokono).',
      englishMeaning: 'Nine'
    },
    {
      id: 'hardcoded_l2_q2',
      kanjiId: 12,
      kanjiCharacter: '十',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '十[じゅう]',
      secondaryPrompt: 'What number does 「十」 represent?',
      options: ['Ten (10)', 'Hundred (100)', 'Thousand (1,000)', 'Nine (9)'],
      correctAnswer: 'Ten (10)',
      explanation: '「十」 is the Kanji for 10 (Onyomi: ジュウ / Kunyomi: とお).',
      englishMeaning: 'Ten'
    },
    {
      id: 'hardcoded_l2_q3',
      kanjiId: 13,
      kanjiCharacter: '月',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '月[げつ]曜[よう]日[び]',
      secondaryPrompt: 'What day of the week is represented by 「月曜日」?',
      options: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
      correctAnswer: 'Monday',
      explanation: '「月曜日」 (getsuyoubi) is Monday. 「月」 means Moon / Month.',
      englishMeaning: 'Moon / Month'
    },
    {
      id: 'hardcoded_l2_q4',
      kanjiId: 14,
      kanjiCharacter: '火',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '火[ひ]',
      secondaryPrompt: 'What is the primary English meaning of 「火」?',
      options: ['Fire', 'Water', 'Wood', 'Gold'],
      correctAnswer: 'Fire',
      explanation: '「火」 means "Fire". Onyomi: カ (ka), Kunyomi: ひ (hi). Used in 火曜日 (Tuesday).',
      englishMeaning: 'Fire'
    },
    {
      id: 'hardcoded_l2_q5',
      kanjiId: 15,
      kanjiCharacter: '水',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '水[みず]',
      secondaryPrompt: 'What does the word 「水」 mean in Japanese?',
      options: ['Water', 'Fire', 'Soil', 'Tree'],
      correctAnswer: 'Water',
      explanation: '「水」 (mizu) means "Water". In compounds, its Onyomi is スイ as in 水曜日 (Wednesday).',
      englishMeaning: 'Water'
    },
    {
      id: 'hardcoded_l2_q6',
      kanjiId: 16,
      kanjiCharacter: '木',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '木[き]',
      secondaryPrompt: 'What is the meaning of 「木」?',
      options: ['Tree / Wood', 'Book / Origin', 'Mountain', 'River'],
      correctAnswer: 'Tree / Wood',
      explanation: '「木」 means "Tree / Wood". Kunyomi is き (ki), Onyomi is モク, ボク (moku, boku).',
      englishMeaning: 'Tree / Wood'
    },
    {
      id: 'hardcoded_l2_q7',
      kanjiId: 17,
      kanjiCharacter: '金',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: 'お[お]金[かね]',
      secondaryPrompt: 'What does 「お金」 mean?',
      options: ['Money', 'Fire', 'Water', 'Gold ring only'],
      correctAnswer: 'Money',
      explanation: '「お金」 (okane) means "Money". 「金」 also means Gold (Onyomi: キン, Kunyomi: かね).',
      englishMeaning: 'Gold / Money'
    },
    {
      id: 'hardcoded_l2_q8',
      kanjiId: 18,
      kanjiCharacter: '土',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '土[ど]曜[よう]日[び]',
      secondaryPrompt: 'Which day of the week is 「土曜日」?',
      options: ['Saturday', 'Sunday', 'Thursday', 'Tuesday'],
      correctAnswer: 'Saturday',
      explanation: '「土曜日」 (doyoubi) is Saturday. 「土」 means Soil / Earth (Onyomi: ド, ト; Kunyomi: つち).',
      englishMeaning: 'Soil / Earth'
    },
    {
      id: 'hardcoded_l2_q9',
      kanjiId: 19,
      kanjiCharacter: '百',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '百[ひゃく]',
      secondaryPrompt: 'What numerical value does 「百」 represent?',
      options: ['100 (Hundred)', '1,000 (Thousand)', '10,000 (Ten Thousand)', '10 (Ten)'],
      correctAnswer: '100 (Hundred)',
      explanation: '「百」 is the Kanji for 100 (ヒャク / hyaku).',
      englishMeaning: 'Hundred'
    },
    {
      id: 'hardcoded_l2_q10',
      kanjiId: 20,
      kanjiCharacter: '千',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '三[さん]千[ぜん]',
      secondaryPrompt: 'What does 「三千」 mean?',
      options: ['3,000 (Three Thousand)', '300 (Three Hundred)', '30,000 (Thirty Thousand)', '30 (Thirty)'],
      correctAnswer: '3,000 (Three Thousand)',
      explanation: '「三千」 is read as さんぜん (sanzen) and means 3,000.',
      englishMeaning: 'Thousand'
    }
  ],

  // ==========================================
  // LEVEL 3 (万 円 行 来 休 見 今 大 小 上)
  // ==========================================
  3: [
    {
      id: 'hardcoded_l3_q1',
      kanjiId: 21,
      kanjiCharacter: '万',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '万[まん]',
      secondaryPrompt: 'What number does 「万」 represent in Japanese counting?',
      options: ['10,000 (Ten Thousand)', '1,000 (One Thousand)', '100,000 (One Hundred Thousand)', '1,000,000 (One Million)'],
      correctAnswer: '10,000 (Ten Thousand)',
      explanation: '「万」 represents 10,000 (マン / man). 一万 is 10,000.',
      englishMeaning: 'Ten Thousand'
    },
    {
      id: 'hardcoded_l3_q2',
      kanjiId: 22,
      kanjiCharacter: '円',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '千[せん]円[えん]',
      secondaryPrompt: 'What does 「千円」 mean?',
      options: ['1,000 Yen', '10,000 Yen', '100 Yen', '100 Dollars'],
      correctAnswer: '1,000 Yen',
      explanation: '「千円」 (sen-en) means 1,000 Japanese Yen. 「円」 represents Yen / Circle.',
      englishMeaning: 'Yen / Circle'
    },
    {
      id: 'hardcoded_l3_q3',
      kanjiId: 23,
      kanjiCharacter: '行',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '行[い]きます',
      secondaryPrompt: 'What does the verb 「行きます」 mean?',
      options: ['To go', 'To come', 'To see', 'To rest'],
      correctAnswer: 'To go',
      explanation: '「行く / 行きます」 (iku / ikimasu) means "to go". Onyomi is コウ, ギョウ.',
      englishMeaning: 'To go'
    },
    {
      id: 'hardcoded_l3_q4',
      kanjiId: 24,
      kanjiCharacter: '来',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '来[き]ます',
      secondaryPrompt: 'What is the meaning of 「来ます」?',
      options: ['To come', 'To go', 'To return', 'To wait'],
      correctAnswer: 'To come',
      explanation: '「来る / 来ます」 (kuru / kimasu) means "to come". Onyomi is ライ as in 来年 (next year).',
      englishMeaning: 'To come'
    },
    {
      id: 'hardcoded_l3_q5',
      kanjiId: 25,
      kanjiCharacter: '休',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '休[やす]み',
      secondaryPrompt: 'What does 「休み」 mean?',
      options: ['Rest / Holiday / Break', 'Work / Labor', 'Meeting / Gathering', 'Travel / Journey'],
      correctAnswer: 'Rest / Holiday / Break',
      explanation: '「休み」 (yasumi) means rest, break, or holiday. The verb is 休む (yasumu = to rest).',
      englishMeaning: 'To rest'
    },
    {
      id: 'hardcoded_l3_q6',
      kanjiId: 26,
      kanjiCharacter: '見',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '見[み]ます',
      secondaryPrompt: 'What is the meaning of the verb 「見ます」?',
      options: ['To see / watch / look', 'To listen / hear', 'To speak / talk', 'To write / draw'],
      correctAnswer: 'To see / watch / look',
      explanation: '「見る / 見ます」 (miru / mimasu) means "to see, look, or watch". Onyomi is ケン.',
      englishMeaning: 'To see'
    },
    {
      id: 'hardcoded_l3_q7',
      kanjiId: 27,
      kanjiCharacter: '今',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '今[いま]',
      secondaryPrompt: 'What does 「今」 mean?',
      options: ['Now', 'Yesterday', 'Tomorrow', 'Last year'],
      correctAnswer: 'Now',
      explanation: '「今」 (ima) means "now". In compounds, Onyomi is コン as in 今月 (this month).',
      englishMeaning: 'Now'
    },
    {
      id: 'hardcoded_l3_q8',
      kanjiId: 28,
      kanjiCharacter: '大',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '大[おお]きい',
      secondaryPrompt: 'What is the meaning of the adjective 「大きい」?',
      options: ['Big / Large', 'Small / Tiny', 'High / Tall', 'Wide / Spacious'],
      correctAnswer: 'Big / Large',
      explanation: '「大きい」 (ookii) means "big" or "large". Onyomi: ダイ, タイ.',
      englishMeaning: 'Big / Large'
    },
    {
      id: 'hardcoded_l3_q9',
      kanjiId: 29,
      kanjiCharacter: '小',
      type: 'kanji_to_kunyomi',
      difficulty: 'medium',
      prompt: '小[ちい]さい',
      secondaryPrompt: 'What is the reading of 「小」 in 「小さい」?',
      options: ['ちい', 'おお', 'すく', 'ふる'],
      correctAnswer: 'ちい',
      explanation: '「小さい」 is read as ちいさい (chiisai = small). Onyomi is ショウ.',
      englishMeaning: 'Small'
    },
    {
      id: 'hardcoded_l3_q10',
      kanjiId: 30,
      kanjiCharacter: '上',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '上[うえ]',
      secondaryPrompt: 'What positional direction is indicated by 「上」?',
      options: ['Up / Above / On top', 'Down / Below', 'Inside / Middle', 'Left side'],
      correctAnswer: 'Up / Above / On top',
      explanation: '「上」 (ue) means "up, above, or on top". Onyomi is ジョウ.',
      englishMeaning: 'Up / Above'
    }
  ],

  // ==========================================
  // LEVEL 4 (下 中 右 左 山 川 白 本 子 男)
  // ==========================================
  4: [
    {
      id: 'hardcoded_l4_q1',
      kanjiId: 31,
      kanjiCharacter: '下',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '下[した]',
      secondaryPrompt: 'What does 「下」 mean?',
      options: ['Down / Below / Under', 'Up / Above', 'Right side', 'Front / Before'],
      correctAnswer: 'Down / Below / Under',
      explanation: '「下」 (shita) means "down, below, or under". Onyomi: カ, ゲ.',
      englishMeaning: 'Down / Below'
    },
    {
      id: 'hardcoded_l4_q2',
      kanjiId: 32,
      kanjiCharacter: '中',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '中[なか]',
      secondaryPrompt: 'What does 「中」 mean in positional terms?',
      options: ['Inside / Middle', 'Outside', 'Near', 'Under'],
      correctAnswer: 'Inside / Middle',
      explanation: '「中」 (naka) means "inside, in, or middle". Onyomi is チュウ (as in 中国 / 一日中).',
      englishMeaning: 'Middle / Inside'
    },
    {
      id: 'hardcoded_l4_q3',
      kanjiId: 33,
      kanjiCharacter: '右',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '右[みぎ]',
      secondaryPrompt: 'Which direction does 「右」 represent?',
      options: ['Right', 'Left', 'North', 'South'],
      correctAnswer: 'Right',
      explanation: '「右」 (migi) is the right side. Onyomi is ウ, ユウ.',
      englishMeaning: 'Right'
    },
    {
      id: 'hardcoded_l4_q4',
      kanjiId: 34,
      kanjiCharacter: '左',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '左[ひだり]',
      secondaryPrompt: 'Which direction does 「左」 represent?',
      options: ['Left', 'Right', 'East', 'West'],
      correctAnswer: 'Left',
      explanation: '「左」 (hidari) is the left side. Onyomi is サ.',
      englishMeaning: 'Left'
    },
    {
      id: 'hardcoded_l4_q5',
      kanjiId: 35,
      kanjiCharacter: '山',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '富[ふ]士[じ]山[さん]',
      secondaryPrompt: 'What geographical feature is represented by 「山」 in 「富士山」?',
      options: ['Mountain', 'River', 'Lake', 'Ocean'],
      correctAnswer: 'Mountain',
      explanation: '「山」 means "Mountain". Kunyomi is やま (yama), Onyomi is サン (san).',
      englishMeaning: 'Mountain'
    },
    {
      id: 'hardcoded_l4_q6',
      kanjiId: 36,
      kanjiCharacter: '川',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '川[かわ]',
      secondaryPrompt: 'What is the meaning of 「川」?',
      options: ['River', 'Mountain', 'Rain', 'Forest'],
      correctAnswer: 'River',
      explanation: '「川」 (kawa / gawa) means "River". Onyomi is セン.',
      englishMeaning: 'River'
    },
    {
      id: 'hardcoded_l4_q7',
      kanjiId: 37,
      kanjiCharacter: '白',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '白[しろ]い',
      secondaryPrompt: 'What color is represented by 「白い」?',
      options: ['White', 'Red', 'Blue', 'Black'],
      correctAnswer: 'White',
      explanation: '「白い」 (shiroi) means "white". Onyomi is ハク, ビャク.',
      englishMeaning: 'White'
    },
    {
      id: 'hardcoded_l4_q8',
      kanjiId: 38,
      kanjiCharacter: '本',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '日[に]本[ほん]',
      secondaryPrompt: 'What does 「日本」 mean?',
      options: ['Japan', 'Today', 'Main book', 'Sunlight'],
      correctAnswer: 'Japan',
      explanation: '「日本」 (nihon / nippon) means "Japan". 「本」 also means "Book" or "Origin".',
      englishMeaning: 'Book / Origin'
    },
    {
      id: 'hardcoded_l4_q9',
      kanjiId: 39,
      kanjiCharacter: '子',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '子[こ]供[ども]',
      secondaryPrompt: 'What does 「子供」 mean?',
      options: ['Child / Children', 'Parent', 'Friend', 'Teacher'],
      correctAnswer: 'Child / Children',
      explanation: '「子供」 (kodomo) means "child / children". 「子」 means child (Onyomi: シ, ス; Kunyomi: こ).',
      englishMeaning: 'Child'
    },
    {
      id: 'hardcoded_l4_q10',
      kanjiId: 40,
      kanjiCharacter: '男',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '男[おとこ]の[の]人[ひと]',
      secondaryPrompt: 'What does 「男の人」 mean?',
      options: ['Man', 'Woman', 'Boy child', 'Old person'],
      correctAnswer: 'Man',
      explanation: '「男の人」 (otoko no hito) means "man". 「男」 means male / man (Onyomi: ダン, ナン; Kunyomi: おとこ).',
      englishMeaning: 'Man'
    }
  ],

  // ==========================================
  // LEVEL 5 (女 父 母 友 先 生 学 校 何 時)
  // ==========================================
  5: [
    {
      id: 'hardcoded_l5_q1',
      kanjiId: 41,
      kanjiCharacter: '女',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '女[おんな]の[の]人[ひと]',
      secondaryPrompt: 'What does 「女の人」 mean?',
      options: ['Woman', 'Man', 'Girl child', 'Teacher'],
      correctAnswer: 'Woman',
      explanation: '「女の人」 (onna no hito) means "woman". 「女」 means female / woman.',
      englishMeaning: 'Woman'
    },
    {
      id: 'hardcoded_l5_q2',
      kanjiId: 42,
      kanjiCharacter: '父',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '父[ちち]',
      secondaryPrompt: 'What family member does 「父」 represent?',
      options: ['Father (humble / one\'s own father)', 'Mother', 'Grandfather', 'Older brother'],
      correctAnswer: 'Father (humble / one\'s own father)',
      explanation: '「父」 (chichi) refers to one\'s own father. When talking politely about someone else\'s father, お父さん (otousan) is used.',
      englishMeaning: 'Father'
    },
    {
      id: 'hardcoded_l5_q3',
      kanjiId: 43,
      kanjiCharacter: '母',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '母[はは]',
      secondaryPrompt: 'What family member does 「母」 represent?',
      options: ['Mother (humble / one\'s own mother)', 'Father', 'Grandmother', 'Older sister'],
      correctAnswer: 'Mother (humble / one\'s own mother)',
      explanation: '「母」 (haha) refers to one\'s own mother. Polite form is お母さん (okaasan).',
      englishMeaning: 'Mother'
    },
    {
      id: 'hardcoded_l5_q4',
      kanjiId: 44,
      kanjiCharacter: '友',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '友[とも]達[だち]',
      secondaryPrompt: 'What does the word 「友達」 mean?',
      options: ['Friend', 'Family', 'Student', 'Coworker'],
      correctAnswer: 'Friend',
      explanation: '「友達」 (tomodachi) means "friend". 「友」 means friend / companion (Onyomi: ユウ, Kunyomi: とも).',
      englishMeaning: 'Friend'
    },
    {
      id: 'hardcoded_l5_q5',
      kanjiId: 45,
      kanjiCharacter: '先',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '先[せん]生[せい]',
      secondaryPrompt: 'What does 「先生」 mean?',
      options: ['Teacher / Doctor', 'Student', 'Friend', 'Principal'],
      correctAnswer: 'Teacher / Doctor',
      explanation: '「先生」 (sensei) means "teacher" or "doctor" (literally: born before).',
      englishMeaning: 'Previous / Ahead'
    },
    {
      id: 'hardcoded_l5_q6',
      kanjiId: 46,
      kanjiCharacter: '生',
      type: 'kanji_to_onyomi',
      difficulty: 'medium',
      prompt: '学[がく]生[せい]',
      secondaryPrompt: 'What is the reading of 「生」 in 「学生」?',
      options: ['せい (sei)', 'しょう (shou)', 'なま (nama)', 'い (i)'],
      correctAnswer: 'せい (sei)',
      explanation: 'In 「学生」 (gakusei = student), 「生」 takes the Onyomi reading せい (sei).',
      englishMeaning: 'Life / Birth'
    },
    {
      id: 'hardcoded_l5_q7',
      kanjiId: 47,
      kanjiCharacter: '学',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '大[だい]学[がく]',
      secondaryPrompt: 'What kind of educational institution is 「大学」?',
      options: ['University / College', 'High school', 'Elementary school', 'Kindergarten'],
      correctAnswer: 'University / College',
      explanation: '「大学」 (daigaku) means university or college (literally: big learning).',
      englishMeaning: 'Study / Learn'
    },
    {
      id: 'hardcoded_l5_q8',
      kanjiId: 48,
      kanjiCharacter: '校',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '学[がっ]校[こう]',
      secondaryPrompt: 'What does the compound word 「学校」 mean?',
      options: ['School', 'Hospital', 'Library', 'Station'],
      correctAnswer: 'School',
      explanation: '「学校」 (gakkou) means "school". 「校」 represents school or exam.',
      englishMeaning: 'School'
    },
    {
      id: 'hardcoded_l5_q9',
      kanjiId: 49,
      kanjiCharacter: '何',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '何[なに]',
      secondaryPrompt: 'What question word is represented by 「何」?',
      options: ['What', 'Where', 'Who', 'When'],
      correctAnswer: 'What',
      explanation: '「何」 is read as なに (nani) or なん (nan) and means "What". Onyomi is カ.',
      englishMeaning: 'What'
    },
    {
      id: 'hardcoded_l5_q10',
      kanjiId: 50,
      kanjiCharacter: '時',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '時[と]計[けい]',
      secondaryPrompt: 'What object is a 「時計」?',
      options: ['Clock / Watch', 'Calendar', 'Book', 'Mirror'],
      correctAnswer: 'Clock / Watch',
      explanation: '「時計」 (tokei) means a clock or watch. 「時」 represents time / hour (Onyomi: ジ, Kunyomi: とき).',
      englishMeaning: 'Time / Hour'
    }
  ],

  // ==========================================
  // LEVEL 6 (間 分 半 毎 年 前 後 午 名 車)
  // ==========================================
  6: [
    {
      id: 'hardcoded_l6_q1',
      kanjiId: 51,
      kanjiCharacter: '間',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '時[じ]間[かん]',
      secondaryPrompt: 'What does 「時間」 mean?',
      options: ['Time / Hours', 'Space / Room', 'Distance', 'Schedule'],
      correctAnswer: 'Time / Hours',
      explanation: '「時間」 (jikan) means "time" or a span of hours. 「間」 means interval or space.',
      englishMeaning: 'Interval / Between'
    },
    {
      id: 'hardcoded_l6_q2',
      kanjiId: 52,
      kanjiCharacter: '分',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '十分[じゅっぷん]',
      secondaryPrompt: 'What time duration is represented by 「十分」 (じゅっぷん)?',
      options: ['10 minutes', '10 hours', '10 days', '10 seconds'],
      correctAnswer: '10 minutes',
      explanation: '「十分」 (juppun / jippun) means 10 minutes. 「分」 means minute or divide (フン, ブン / わ).',
      englishMeaning: 'Minute / Divide'
    },
    {
      id: 'hardcoded_l6_q3',
      kanjiId: 53,
      kanjiCharacter: '半',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '二[に]時[じ]半[はん]',
      secondaryPrompt: 'What time is 「二時半」?',
      options: ['2:30', '2:15', '2:45', '12:30'],
      correctAnswer: '2:30',
      explanation: '「二時半」 (nijihan) means 2:30 (half past two). 「半」 means half (ハン).',
      englishMeaning: 'Half'
    },
    {
      id: 'hardcoded_l6_q4',
      kanjiId: 54,
      kanjiCharacter: '毎',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '毎[まい]日[にち]',
      secondaryPrompt: 'What does 「毎日」 mean?',
      options: ['Every day', 'Every week', 'Every month', 'Every year'],
      correctAnswer: 'Every day',
      explanation: '「毎日」 (mainichi) means "every day". 「毎」 means every (Onyomi: マイ).',
      englishMeaning: 'Every'
    },
    {
      id: 'hardcoded_l6_q5',
      kanjiId: 55,
      kanjiCharacter: '年',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '来[らい]年[ねん]',
      secondaryPrompt: 'What does 「来年」 mean?',
      options: ['Next year', 'This year', 'Last year', 'Two years ago'],
      correctAnswer: 'Next year',
      explanation: '「来年」 (rainen) means "next year". 「年」 means year (Onyomi: ネン, Kunyomi: とし).',
      englishMeaning: 'Year'
    },
    {
      id: 'hardcoded_l6_q6',
      kanjiId: 56,
      kanjiCharacter: '前',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '前[まえ]',
      secondaryPrompt: 'What positional and time concept is represented by 「前」?',
      options: ['Front / Before', 'Back / After', 'Inside / During', 'Next to'],
      correctAnswer: 'Front / Before',
      explanation: '「前」 (mae) means "front" or "before". Onyomi is ゼン.',
      englishMeaning: 'Front / Before'
    },
    {
      id: 'hardcoded_l6_q7',
      kanjiId: 57,
      kanjiCharacter: '後',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '後[うし]ろ',
      secondaryPrompt: 'What does 「後ろ」 mean in positional orientation?',
      options: ['Behind / Back', 'In front / Ahead', 'Above', 'Beside'],
      correctAnswer: 'Behind / Back',
      explanation: '「後ろ」 (ushiro) means "behind / back". 「後」 also means after (あと / ゴ, コウ).',
      englishMeaning: 'Back / After'
    },
    {
      id: 'hardcoded_l6_q8',
      kanjiId: 58,
      kanjiCharacter: '午',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '午[ご]前[ぜん]',
      secondaryPrompt: 'What part of the day is 「午前」?',
      options: ['A.M. / Morning', 'P.M. / Afternoon', 'Evening', 'Midnight'],
      correctAnswer: 'A.M. / Morning',
      explanation: '「午前」 (gozen) means "A.M." or morning (before noon). 「午」 represents noon.',
      englishMeaning: 'Noon'
    },
    {
      id: 'hardcoded_l6_q9',
      kanjiId: 59,
      kanjiCharacter: '名',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '名[な]前[まえ]',
      secondaryPrompt: 'What does 「名前」 mean?',
      options: ['Name', 'Title', 'Address', 'Signature'],
      correctAnswer: 'Name',
      explanation: '「名前」 (namae) means "name". 「名」 means name / reputation (Onyomi: メイ, ミョウ; Kunyomi: な).',
      englishMeaning: 'Name'
    },
    {
      id: 'hardcoded_l6_q10',
      kanjiId: 60,
      kanjiCharacter: '車',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '車[くるま]',
      secondaryPrompt: 'What vehicle is represented by 「車」?',
      options: ['Car / Automobile', 'Train', 'Airplane', 'Bicycle'],
      correctAnswer: 'Car / Automobile',
      explanation: '「車」 (kuruma) means car or vehicle. Onyomi is シャ as in 電車 (densha = train).',
      englishMeaning: 'Car'
    }
  ],

  // ==========================================
  // LEVEL 7 (天 気 電 話 食 聞 書 読 国 外)
  // ==========================================
  7: [
    {
      id: 'hardcoded_l7_q1',
      kanjiId: 61,
      kanjiCharacter: '天',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '天[てん]気[き]',
      secondaryPrompt: 'What does 「天気」 mean?',
      options: ['Weather', 'Electricity', 'Sky / Heaven', 'Air condition'],
      correctAnswer: 'Weather',
      explanation: '「天気」 (tenki) means "weather". 「天」 means heaven / sky (テン / あめ).',
      englishMeaning: 'Heaven / Sky'
    },
    {
      id: 'hardcoded_l7_q2',
      kanjiId: 62,
      kanjiCharacter: '気',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '元[げん]気[き]',
      secondaryPrompt: 'What does the common greeting term 「元気」 mean?',
      options: ['Healthy / Energetic / Well', 'Sick / Tired', 'Busy', 'Quiet'],
      correctAnswer: 'Healthy / Energetic / Well',
      explanation: '「元気」 (genki) means healthy, energetic, or lively. 「気」 represents spirit or energy.',
      englishMeaning: 'Spirit / Energy'
    },
    {
      id: 'hardcoded_l7_q3',
      kanjiId: 63,
      kanjiCharacter: '電',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '電[でん]気[き]',
      secondaryPrompt: 'What does 「電気」 mean?',
      options: ['Electricity / Electric light', 'Train', 'Phone', 'Weather'],
      correctAnswer: 'Electricity / Electric light',
      explanation: '「電気」 (denki) means electricity or electric light. 「電」 means electricity (デン).',
      englishMeaning: 'Electricity'
    },
    {
      id: 'hardcoded_l7_q4',
      kanjiId: 64,
      kanjiCharacter: '話',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '電[でん]話[わ]',
      secondaryPrompt: 'What device is a 「電話」?',
      options: ['Telephone / Phone call', 'Television', 'Radio', 'Computer'],
      correctAnswer: 'Telephone / Phone call',
      explanation: '「電話」 (denwa) means telephone. 「話」 means speech / talk (Onyomi: ワ, Kunyomi: はな).',
      englishMeaning: 'Talk / Speech'
    },
    {
      id: 'hardcoded_l7_q5',
      kanjiId: 65,
      kanjiCharacter: '食',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '食[た]べます',
      secondaryPrompt: 'What daily action is 「食べます」?',
      options: ['To eat', 'To drink', 'To cook', 'To buy'],
      correctAnswer: 'To eat',
      explanation: '「食べる / 食べます」 (taberu / tabemasu) means "to eat". Onyomi is ショク.',
      englishMeaning: 'Eat / Food'
    },
    {
      id: 'hardcoded_l7_q6',
      kanjiId: 66,
      kanjiCharacter: '聞',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '新[しん]聞[ぶん]',
      secondaryPrompt: 'What publication is a 「新聞」?',
      options: ['Newspaper', 'Magazine', 'Novel', 'Dictionary'],
      correctAnswer: 'Newspaper',
      explanation: '「新聞」 (shinbun) means "newspaper". The verb 聞く (kiku) means "to listen / hear / ask".',
      englishMeaning: 'Hear / Listen'
    },
    {
      id: 'hardcoded_l7_q7',
      kanjiId: 67,
      kanjiCharacter: '書',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '書[か]きます',
      secondaryPrompt: 'What does the verb 「書きます」 mean?',
      options: ['To write / draw', 'To read', 'To speak', 'To buy'],
      correctAnswer: 'To write / draw',
      explanation: '「書く / 書きます」 (kaku / kakimasu) means "to write". Onyomi is ショ as in 辞書 (jisho = dictionary).',
      englishMeaning: 'Write / Book'
    },
    {
      id: 'hardcoded_l7_q8',
      kanjiId: 68,
      kanjiCharacter: '読',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '本[ほん]を[を] 読[よ]みます',
      secondaryPrompt: 'What does 「本を読みます」 mean?',
      options: ['Read a book', 'Write a book', 'Buy a book', 'Borrow a book'],
      correctAnswer: 'Read a book',
      explanation: '「読む / 読みます」 (yomu / yomimasu) means "to read". Onyomi is ドク.',
      englishMeaning: 'Read'
    },
    {
      id: 'hardcoded_l7_q9',
      kanjiId: 69,
      kanjiCharacter: '国',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '外[がい]国[こく]',
      secondaryPrompt: 'What does 「外国」 mean?',
      options: ['Foreign country', 'Home country', 'Island nation', 'City'],
      correctAnswer: 'Foreign country',
      explanation: '「外国」 (gaikoku) means "foreign country". 「国」 means country / nation (Onyomi: コク, Kunyomi: くに).',
      englishMeaning: 'Country'
    },
    {
      id: 'hardcoded_l7_q10',
      kanjiId: 70,
      kanjiCharacter: '外',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '外[そと]',
      secondaryPrompt: 'What location is represented by 「外」?',
      options: ['Outside', 'Inside', 'Upstairs', 'Center'],
      correctAnswer: 'Outside',
      explanation: '「外」 (soto) means "outside". Onyomi is ガイ, ゲ as in 外国 (foreign country).',
      englishMeaning: 'Outside'
    }
  ],

  // ==========================================
  // LEVEL 8 (語 入 出 雨 東 西 南 北 長 高)
  // ==========================================
  8: [
    {
      id: 'hardcoded_l8_q1',
      kanjiId: 71,
      kanjiCharacter: '語',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '日[に]本[ほん]語[ご]',
      secondaryPrompt: 'What does 「日本語」 mean?',
      options: ['Japanese language', 'Japanese person', 'Japanese book', 'Japanese culture'],
      correctAnswer: 'Japanese language',
      explanation: '「日本語」 (nihongo) means the Japanese language. 「語」 means word or language (ゴ / かた).',
      englishMeaning: 'Language / Word'
    },
    {
      id: 'hardcoded_l8_q2',
      kanjiId: 72,
      kanjiCharacter: '入',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '入[い]り[り]口[ぐち]',
      secondaryPrompt: 'What is an 「入り口」 (or 入口)?',
      options: ['Entrance', 'Exit', 'Doorway only', 'Window'],
      correctAnswer: 'Entrance',
      explanation: '「入り口 / 入口」 (iriguchi) means "entrance". 「入」 means enter (Onyomi: ニュウ, Kunyomi: はい, い).',
      englishMeaning: 'Enter'
    },
    {
      id: 'hardcoded_l8_q3',
      kanjiId: 73,
      kanjiCharacter: '出',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '出[で]口[ぐち]',
      secondaryPrompt: 'What does 「出口」 mean at a station or building?',
      options: ['Exit', 'Entrance', 'Ticket gate', 'Information desk'],
      correctAnswer: 'Exit',
      explanation: '「出口」 (deguchi) means "exit". 「出」 means exit / leave (Onyomi: シュツ, Kunyomi: で, だ).',
      englishMeaning: 'Exit'
    },
    {
      id: 'hardcoded_l8_q4',
      kanjiId: 74,
      kanjiCharacter: '雨',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '雨[あめ]',
      secondaryPrompt: 'What weather phenomenon is 「雨」?',
      options: ['Rain', 'Snow', 'Cloud', 'Wind'],
      correctAnswer: 'Rain',
      explanation: '「雨」 (ame) means "rain". Onyomi is ウ.',
      englishMeaning: 'Rain'
    },
    {
      id: 'hardcoded_l8_q5',
      kanjiId: 75,
      kanjiCharacter: '東',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '東[とう]京[きょう]',
      secondaryPrompt: 'Which compass direction is 「東」?',
      options: ['East', 'West', 'South', 'North'],
      correctAnswer: 'East',
      explanation: '「東」 means "East". Kunyomi is ひがし (higashi), Onyomi is トウ as in 東京 (Tokyo).',
      englishMeaning: 'East'
    },
    {
      id: 'hardcoded_l8_q6',
      kanjiId: 76,
      kanjiCharacter: '西',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '西[にし]',
      secondaryPrompt: 'Which compass direction is 「西」?',
      options: ['West', 'East', 'North', 'South'],
      correctAnswer: 'West',
      explanation: '「西」 (nishi) means "West". Onyomi is セイ, サイ.',
      englishMeaning: 'West'
    },
    {
      id: 'hardcoded_l8_q7',
      kanjiId: 77,
      kanjiCharacter: '南',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '南[みなみ]',
      secondaryPrompt: 'Which direction does 「南」 indicate?',
      options: ['South', 'North', 'East', 'West'],
      correctAnswer: 'South',
      explanation: '「南」 (minami) means "South". Onyomi is ナン.',
      englishMeaning: 'South'
    },
    {
      id: 'hardcoded_l8_q8',
      kanjiId: 78,
      kanjiCharacter: '北',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '北[きた]',
      secondaryPrompt: 'Which direction does 「北」 indicate?',
      options: ['North', 'South', 'East', 'West'],
      correctAnswer: 'North',
      explanation: '「北」 (kita) means "North". Onyomi is ホク.',
      englishMeaning: 'North'
    },
    {
      id: 'hardcoded_l8_q9',
      kanjiId: 79,
      kanjiCharacter: '長',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '長[なが]い',
      secondaryPrompt: 'What is the meaning of the adjective 「長い」?',
      options: ['Long', 'Short', 'High', 'Wide'],
      correctAnswer: 'Long',
      explanation: '「長い」 (nagai) means "long". Onyomi is チョウ as in 社長 (shachou = company president).',
      englishMeaning: 'Long'
    },
    {
      id: 'hardcoded_l8_q10',
      kanjiId: 80,
      kanjiCharacter: '高',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '高[たか]い',
      secondaryPrompt: 'What are the two common meanings of the adjective 「高い」 in Japanese?',
      options: ['Tall/High AND Expensive', 'Cheap AND Low', 'New AND Bright', 'Heavy AND Fast'],
      correctAnswer: 'Tall/High AND Expensive',
      explanation: '「高い」 (takai) means both "tall / high" (altitude/height) and "expensive" (price). Onyomi: コウ.',
      englishMeaning: 'Tall / High / Expensive'
    }
  ],

  // ==========================================
  // LEVEL 9 (口 目 手 足 近 有 花 赤 紙 買)
  // ==========================================
  9: [
    {
      id: 'hardcoded_l9_q1',
      kanjiId: 81,
      kanjiCharacter: '口',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '口[くち]',
      secondaryPrompt: 'What body part is represented by 「口」?',
      options: ['Mouth', 'Eye', 'Ear', 'Hand'],
      correctAnswer: 'Mouth',
      explanation: '「口」 (kuchi / guchi) means "mouth". Onyomi is コウ, ク.',
      englishMeaning: 'Mouth'
    },
    {
      id: 'hardcoded_l9_q2',
      kanjiId: 82,
      kanjiCharacter: '目',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '目[め]',
      secondaryPrompt: 'What body part is represented by 「目」?',
      options: ['Eye', 'Ear', 'Hand', 'Foot'],
      correctAnswer: 'Eye',
      explanation: '「目」 (me) means "eye". Onyomi is モク, ボク.',
      englishMeaning: 'Eye'
    },
    {
      id: 'hardcoded_l9_q3',
      kanjiId: 83,
      kanjiCharacter: '手',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '手[て]紙[がみ]',
      secondaryPrompt: 'What object is a 「手紙」?',
      options: ['Letter (mail)', 'Notebook', 'Newspaper', 'Textbook'],
      correctAnswer: 'Letter (mail)',
      explanation: '「手紙」 (tegami) means "letter" (mail). 「手」 means hand and 「紙」 means paper.',
      englishMeaning: 'Hand'
    },
    {
      id: 'hardcoded_l9_q4',
      kanjiId: 84,
      kanjiCharacter: '足',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '足[あし]',
      secondaryPrompt: 'What body part is 「足」?',
      options: ['Foot / Leg', 'Arm / Hand', 'Head', 'Stomach'],
      correctAnswer: 'Foot / Leg',
      explanation: '「足」 (ashi) means "foot" or "leg". Onyomi is ソク.',
      englishMeaning: 'Foot / Leg'
    },
    {
      id: 'hardcoded_l9_q5',
      kanjiId: 85,
      kanjiCharacter: '近',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '近[ちか]い',
      secondaryPrompt: 'What is the meaning of the adjective 「近い」?',
      options: ['Near / Close', 'Far / Distant', 'Fast / Quick', 'Slow / Late'],
      correctAnswer: 'Near / Close',
      explanation: '「近い」 (chikai) means "near" or "close". Onyomi is キン.',
      englishMeaning: 'Near'
    },
    {
      id: 'hardcoded_l9_q6',
      kanjiId: 86,
      kanjiCharacter: '有',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '有[ゆう]名[めい]',
      secondaryPrompt: 'What does the adjective 「有名」 mean?',
      options: ['Famous / Well-known', 'Quiet / Peaceful', 'Convenient', 'Kind / Gentle'],
      correctAnswer: 'Famous / Well-known',
      explanation: '「有名」 (yuumei) means "famous" (literally: having a name). 「有」 means to exist or possess (ユウ, ウ).',
      englishMeaning: 'Exist / Have'
    },
    {
      id: 'hardcoded_l9_q7',
      kanjiId: 87,
      kanjiCharacter: '花',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '花[はな]',
      secondaryPrompt: 'What does 「花」 mean?',
      options: ['Flower', 'Tree', 'Grass', 'Fruit'],
      correctAnswer: 'Flower',
      explanation: '「花」 (hana) means "flower". Onyomi is カ as in 花火 (hanabi = fireworks).',
      englishMeaning: 'Flower'
    },
    {
      id: 'hardcoded_l9_q8',
      kanjiId: 88,
      kanjiCharacter: '赤',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '赤[あか]い',
      secondaryPrompt: 'What color is 「赤い」?',
      options: ['Red', 'White', 'Blue', 'Black'],
      correctAnswer: 'Red',
      explanation: '「赤い」 (akai) means "red". Onyomi is セキ, シャク.',
      englishMeaning: 'Red'
    },
    {
      id: 'hardcoded_l9_q9',
      kanjiId: 89,
      kanjiCharacter: '紙',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '紙[かみ]',
      secondaryPrompt: 'What material is 「紙」?',
      options: ['Paper', 'Wood', 'Cloth', 'Metal'],
      correctAnswer: 'Paper',
      explanation: '「紙」 (kami) means "paper". Onyomi is シ as in 手紙 (letter).',
      englishMeaning: 'Paper'
    },
    {
      id: 'hardcoded_l9_q10',
      kanjiId: 90,
      kanjiCharacter: '買',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '買[か]い[い]物[もの]',
      secondaryPrompt: 'What activity is 「買い物」?',
      options: ['Shopping', 'Cooking', 'Dining out', 'Reading'],
      correctAnswer: 'Shopping',
      explanation: '「買い物」 (kaimono) means "shopping". 「買う / 買います」 (kau / kaimasu) means to buy. Onyomi is バイ.',
      englishMeaning: 'Buy'
    }
  ],

  // ==========================================
  // LEVEL 10 (朝 昼 夕 夜 私 家 会 社 店 飲)
  // ==========================================
  10: [
    {
      id: 'hardcoded_l10_q1',
      kanjiId: 91,
      kanjiCharacter: '朝',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '朝[あさ]ご[ご]飯[はん]',
      secondaryPrompt: 'What meal is 「朝ご飯」?',
      options: ['Breakfast', 'Lunch', 'Dinner', 'Late snack'],
      correctAnswer: 'Breakfast',
      explanation: '「朝ご飯」 (asagohan) means "breakfast". 「朝」 means morning (Onyomi: チョウ, Kunyomi: あさ).',
      englishMeaning: 'Morning'
    },
    {
      id: 'hardcoded_l10_q2',
      kanjiId: 92,
      kanjiCharacter: '昼',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '昼[ひる]休[やす]み',
      secondaryPrompt: 'What does 「昼休み」 mean?',
      options: ['Lunch break / Noon recess', 'Morning meeting', 'Evening off', 'Weekend rest'],
      correctAnswer: 'Lunch break / Noon recess',
      explanation: '「昼休み」 (hiruyasumi) means "lunch break". 「昼」 means noon or daytime (Onyomi: チュウ, Kunyomi: ひる).',
      englishMeaning: 'Noon / Daytime'
    },
    {
      id: 'hardcoded_l10_q3',
      kanjiId: 93,
      kanjiCharacter: '夕',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '夕[ゆう]方[がた]',
      secondaryPrompt: 'What time of day is 「夕方」?',
      options: ['Evening / Early nightfall', 'Early morning', 'Midday', 'Dawn'],
      correctAnswer: 'Evening / Early nightfall',
      explanation: '「夕方」 (yuugata) means "evening". 「夕」 means evening (Onyomi: セキ, Kunyomi: ゆう).',
      englishMeaning: 'Evening'
    },
    {
      id: 'hardcoded_l10_q4',
      kanjiId: 94,
      kanjiCharacter: '夜',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '夜[よる]',
      secondaryPrompt: 'What does 「夜」 mean?',
      options: ['Night', 'Morning', 'Afternoon', 'Noon'],
      correctAnswer: 'Night',
      explanation: '「夜」 (yoru) means "night". Onyomi is ヤ as in 今夜 (konya = tonight).',
      englishMeaning: 'Night'
    },
    {
      id: 'hardcoded_l10_q5',
      kanjiId: 95,
      kanjiCharacter: '私',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '私[わたし]',
      secondaryPrompt: 'What pronoun is 「私」?',
      options: ['I / Me', 'You', 'He / Him', 'She / Her'],
      correctAnswer: 'I / Me',
      explanation: '「私」 (watashi) is the standard Japanese first-person pronoun ("I / Me"). Onyomi is シ.',
      englishMeaning: 'I / Me'
    },
    {
      id: 'hardcoded_l10_q6',
      kanjiId: 96,
      kanjiCharacter: '家',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '家[いえ]',
      secondaryPrompt: 'What building or place is 「家」?',
      options: ['House / Home', 'Office', 'Store', 'School'],
      correctAnswer: 'House / Home',
      explanation: '「家」 (ie / uchi) means "house / home". Onyomi is カ, ケ as in 家族 (kazoku = family).',
      englishMeaning: 'House / Home'
    },
    {
      id: 'hardcoded_l10_q7',
      kanjiId: 97,
      kanjiCharacter: '会',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '会[あ]います',
      secondaryPrompt: 'What does the verb 「会います」 mean?',
      options: ['To meet / see someone', 'To speak', 'To go', 'To wait'],
      correctAnswer: 'To meet / see someone',
      explanation: '「会う / 会います」 (au / aimasu) means "to meet". Onyomi is カイ as in 会社 (kaisha = company).',
      englishMeaning: 'Meet / Society'
    },
    {
      id: 'hardcoded_l10_q8',
      kanjiId: 98,
      kanjiCharacter: '社',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '会[かい]社[しゃ]',
      secondaryPrompt: 'What organization is a 「会社」?',
      options: ['Company / Corporation', 'School', 'Hospital', 'Library'],
      correctAnswer: 'Company / Corporation',
      explanation: '「会社」 (kaisha) means "company" or "workplace". 「社」 means company or shrine (シャ).',
      englishMeaning: 'Company / Shrine'
    },
    {
      id: 'hardcoded_l10_q9',
      kanjiId: 99,
      kanjiCharacter: '店',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '店[みせ]',
      secondaryPrompt: 'What does 「店」 mean?',
      options: ['Shop / Store', 'House', 'Station', 'Room'],
      correctAnswer: 'Shop / Store',
      explanation: '「店」 (mise) means "shop" or "store". Onyomi is テン as in 店員 (ten\'in = store clerk).',
      englishMeaning: 'Shop / Store'
    },
    {
      id: 'hardcoded_l10_q10',
      kanjiId: 100,
      kanjiCharacter: '飲',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '水[みず]を[を] 飲[の]みます',
      secondaryPrompt: 'What action is 「水を飲みます」?',
      options: ['Drink water', 'Eat food', 'Buy water', 'Pour water'],
      correctAnswer: 'Drink water',
      explanation: '「飲む / 飲みます」 (nomu / nomimasu) means "to drink". Onyomi is イン as in 飲食店.',
      englishMeaning: 'Drink'
    }
  ],

  // ==========================================
  // LEVEL 11 (多 少 古 新 広 安 立 知 言 思)
  // ==========================================
  11: [
    {
      id: 'hardcoded_l11_q1',
      kanjiId: 101,
      kanjiCharacter: '多',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '多[おお]い',
      secondaryPrompt: 'What quantity does the adjective 「多い」 express?',
      options: ['Many / Numerous', 'Few / Little', 'Big / Large', 'Heavy'],
      correctAnswer: 'Many / Numerous',
      explanation: '「多い」 (ooi) means "many" or "numerous". Onyomi is タ as in 多分 (tabun = probably).',
      englishMeaning: 'Many'
    },
    {
      id: 'hardcoded_l11_q2',
      kanjiId: 102,
      kanjiCharacter: '少',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '少[すく]ない',
      secondaryPrompt: 'What does 「少ない」 mean?',
      options: ['Few / Little', 'Many', 'Small', 'Short'],
      correctAnswer: 'Few / Little',
      explanation: '「少ない」 (sukunai) means "few" or "little". Onyomi is ショウ as in 少し (sukoshi).',
      englishMeaning: 'Few / Little'
    },
    {
      id: 'hardcoded_l11_q3',
      kanjiId: 103,
      kanjiCharacter: '古',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '古[ふる]い',
      secondaryPrompt: 'What is the meaning of the adjective 「古い」?',
      options: ['Old (not new)', 'New / Fresh', 'Cheap', 'Expensive'],
      correctAnswer: 'Old (not new)',
      explanation: '「古い」 (furui) means "old" (used for objects, not human age). Onyomi is コ.',
      englishMeaning: 'Old'
    },
    {
      id: 'hardcoded_l11_q4',
      kanjiId: 104,
      kanjiCharacter: '新',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '新[あたら]しい',
      secondaryPrompt: 'What does the adjective 「新しい」 mean?',
      options: ['New / Fresh', 'Old', 'Clean', 'Fast'],
      correctAnswer: 'New / Fresh',
      explanation: '「新しい」 (atarashii) means "new". Onyomi is シン as in 新幹線 (shinkansen).',
      englishMeaning: 'New'
    },
    {
      id: 'hardcoded_l11_q5',
      kanjiId: 105,
      kanjiCharacter: '広',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '広[ひろ]い',
      secondaryPrompt: 'What does the adjective 「広い」 mean when describing a room?',
      options: ['Spacious / Wide', 'Narrow / Tight', 'Tall / High', 'Bright'],
      correctAnswer: 'Spacious / Wide',
      explanation: '「広い」 (hiroi) means "spacious" or "wide". Onyomi is コウ as in 広島 (Hiroshima).',
      englishMeaning: 'Spacious / Wide'
    },
    {
      id: 'hardcoded_l11_q6',
      kanjiId: 106,
      kanjiCharacter: '安',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '安[やす]い',
      secondaryPrompt: 'What does the adjective 「安い」 mean in a shop?',
      options: ['Cheap / Inexpensive', 'Expensive', 'Delicious', 'Rare'],
      correctAnswer: 'Cheap / Inexpensive',
      explanation: '「安い」 (yasui) means "cheap / inexpensive". Onyomi is アン as in 安心 (peace of mind).',
      englishMeaning: 'Cheap / Peaceful'
    },
    {
      id: 'hardcoded_l11_q7',
      kanjiId: 107,
      kanjiCharacter: '立',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '立[た]ち[ち]ます',
      secondaryPrompt: 'What physical action is 「立ちます」?',
      options: ['To stand up', 'To sit down', 'To walk', 'To stop'],
      correctAnswer: 'To stand up',
      explanation: '「立つ / 立ちます」 (tatsu / tachimasu) means "to stand up". Onyomi is リツ.',
      englishMeaning: 'Stand'
    },
    {
      id: 'hardcoded_l11_q8',
      kanjiId: 108,
      kanjiCharacter: '知',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '知[し]って[って]います',
      secondaryPrompt: 'What does 「知っています」 mean?',
      options: ['I know / I am acquainted with', 'I think so', 'I said so', 'I am asking'],
      correctAnswer: 'I know / I am acquainted with',
      explanation: '「知る / 知っています」 (shiru / shitte imasu) means "to know". Onyomi is チ.',
      englishMeaning: 'Know'
    },
    {
      id: 'hardcoded_l11_q9',
      kanjiId: 109,
      kanjiCharacter: '言',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '言[い]います',
      secondaryPrompt: 'What does the verb 「言います」 mean?',
      options: ['To say / speak', 'To hear', 'To write', 'To read'],
      correctAnswer: 'To say / speak',
      explanation: '「言う / 言います」 (iu / iimasu) means "to say / state". Onyomi is ゲン, ゴン.',
      englishMeaning: 'Say'
    },
    {
      id: 'hardcoded_l11_q10',
      kanjiId: 110,
      kanjiCharacter: '思',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '思[おも]います',
      secondaryPrompt: 'What does the verb 「思います」 mean in conversation?',
      options: ['To think / feel / consider', 'To speak', 'To remember', 'To forget'],
      correctAnswer: 'To think / feel / consider',
      explanation: '「思う / 思います」 (omou / omoimasu) means "to think". Onyomi is シ as in 思い出 (memories).',
      englishMeaning: 'Think'
    }
  ],

  // ==========================================
  // LEVEL 12 (歩 走 住 空 週 魚 耳 銀 道 駅)
  // ==========================================
  12: [
    {
      id: 'hardcoded_l12_q1',
      kanjiId: 111,
      kanjiCharacter: '歩',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '歩[ある]きます',
      secondaryPrompt: 'What form of movement is 「歩きます」?',
      options: ['To walk', 'To run', 'To drive', 'To fly'],
      correctAnswer: 'To walk',
      explanation: '「歩く / 歩きます」 (aruku / arukimasu) means "to walk". Onyomi is ホ, ポ.',
      englishMeaning: 'Walk'
    },
    {
      id: 'hardcoded_l12_q2',
      kanjiId: 112,
      kanjiCharacter: '走',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '走[はし]ります',
      secondaryPrompt: 'What form of movement is 「走ります」?',
      options: ['To run', 'To walk', 'To swim', 'To jump'],
      correctAnswer: 'To run',
      explanation: '「走る / 走ります」 (hashiru / hashirimasu) means "to run". Onyomi is ソウ.',
      englishMeaning: 'Run'
    },
    {
      id: 'hardcoded_l12_q3',
      kanjiId: 113,
      kanjiCharacter: '住',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '住[す]んでいます',
      secondaryPrompt: 'What does 「東[とう]京[きょう]に 住[す]んでいます」 mean?',
      options: ['I live in Tokyo', 'I am going to Tokyo', 'I work in Tokyo', 'I was born in Tokyo'],
      correctAnswer: 'I live in Tokyo',
      explanation: '「住む / 住んでいます」 (sumu / sunde imasu) means "to live / reside". Onyomi is ジュウ as in 住所 (address).',
      englishMeaning: 'Reside / Live'
    },
    {
      id: 'hardcoded_l12_q4',
      kanjiId: 114,
      kanjiCharacter: '空',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '空[そら]',
      secondaryPrompt: 'What does 「空」 mean when looking upward?',
      options: ['Sky', 'Cloud', 'Star', 'Moon'],
      correctAnswer: 'Sky',
      explanation: '「空」 (sora) means "sky". Onyomi is クウ as in 空港 (kuukou = airport).',
      englishMeaning: 'Sky / Empty'
    },
    {
      id: 'hardcoded_l12_q5',
      kanjiId: 115,
      kanjiCharacter: '週',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '先[せん]週[しゅう]',
      secondaryPrompt: 'What time period is 「先週」?',
      options: ['Last week', 'Next week', 'This week', 'Two weeks ago'],
      correctAnswer: 'Last week',
      explanation: '「先週」 (senshuu) means "last week". 「週」 represents a week (Onyomi: シュウ).',
      englishMeaning: 'Week'
    },
    {
      id: 'hardcoded_l12_q6',
      kanjiId: 116,
      kanjiCharacter: '魚',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '魚[さかな]',
      secondaryPrompt: 'What animal or food is 「魚」?',
      options: ['Fish', 'Meat', 'Bird', 'Vegetable'],
      correctAnswer: 'Fish',
      explanation: '「魚」 (sakana) means "fish". Onyomi is ギョ as in 金魚 (kingyo = goldfish).',
      englishMeaning: 'Fish'
    },
    {
      id: 'hardcoded_l12_q7',
      kanjiId: 117,
      kanjiCharacter: '耳',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '耳[みみ]',
      secondaryPrompt: 'What body organ is represented by 「耳」?',
      options: ['Ear', 'Eye', 'Mouth', 'Nose'],
      correctAnswer: 'Ear',
      explanation: '「耳」 (mimi) means "ear". Onyomi is ジ.',
      englishMeaning: 'Ear'
    },
    {
      id: 'hardcoded_l12_q8',
      kanjiId: 118,
      kanjiCharacter: '銀',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '銀[ぎん]行[こう]',
      secondaryPrompt: 'What financial facility is a 「銀行」?',
      options: ['Bank', 'Post office', 'Department store', 'Hospital'],
      correctAnswer: 'Bank',
      explanation: '「銀行」 (ginkou) means "bank". 「銀」 means silver (Onyomi: ギン).',
      englishMeaning: 'Silver'
    },
    {
      id: 'hardcoded_l12_q9',
      kanjiId: 119,
      kanjiCharacter: '道',
      type: 'kanji_to_english',
      difficulty: 'medium',
      prompt: '道[みち]',
      secondaryPrompt: 'What does 「道」 mean?',
      options: ['Road / Street / Way', 'Building', 'River', 'Bridge'],
      correctAnswer: 'Road / Street / Way',
      explanation: '「道」 (michi) means "road / street / path". Onyomi is ドウ, トウ as in 北海道 (Hokkaido).',
      englishMeaning: 'Road / Way'
    },
    {
      id: 'hardcoded_l12_q10',
      kanjiId: 120,
      kanjiCharacter: '駅',
      type: 'vocab_recognition',
      difficulty: 'medium',
      prompt: '東[とう]京[きょう]駅[えき]',
      secondaryPrompt: 'What place is 「東京駅」?',
      options: ['Tokyo Station', 'Tokyo Airport', 'Tokyo Tower', 'Tokyo City Hall'],
      correctAnswer: 'Tokyo Station',
      explanation: '「駅」 (eki) means train "station". 東京駅 is Tokyo Station. Onyomi is エキ.',
      englishMeaning: 'Station'
    }
  ]
};

/**
 * Returns predefined, verified hardcoded questions for the specified Kanji level (1 to 12).
 */
export function getHardcodedQuestionsForLevel(level: number): QuizQuestion[] {
  const normalizedLevel = Math.max(1, Math.min(12, level));
  const questions = HARDCODED_LEVEL_TESTS[normalizedLevel];
  if (questions && questions.length > 0) {
    return [...questions];
  }
  return [];
}
