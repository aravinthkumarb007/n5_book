import { KanjiRecord } from '../../types/kanji';

export const LEVEL_1_TO_3_KANJI: KanjiRecord[] = [
  // LEVEL 1: Numbers & Core Basics (Kanji 1 - 10)
  {
    id: 1,
    kanji_number: 1,
    character: '一',
    meaning: 'One',
    level: 1,
    onyomi_readings: ['イチ', 'イツ'],
    kunyomi_readings: ['ひと', 'ひとつ'],
    onyomi_romaji: ['ichi', 'itsu'],
    kunyomi_romaji: ['hito', 'hitotsu'],
    hiragana_reading: 'いち, ひと',
    stroke_count: 1,
    radicals: '一 (one)',
    stroke_order_data: { count: 1, directions: ['Horizontal stroke from left to right'] },
    mnemonic: 'A single horizontal line representing the number one, just like holding up one finger.',
    vocabulary: [
      { word: '一つ', hiragana: 'ひとつ', romaji: 'hitotsu', meaning: 'One thing', readingType: 'kunyomi' },
      { word: '一人', hiragana: 'ひとり', romaji: 'hitori', meaning: 'One person / alone', readingType: 'irregular' },
      { word: '一日', hiragana: 'いちにち', romaji: 'ichinichi', meaning: 'One day', readingType: 'onyomi' },
      { word: '一年', hiragana: 'いちねん', romaji: 'ichinen', meaning: 'One year', readingType: 'onyomi' },
      { word: '一番', hiragana: 'いちばん', romaji: 'ichiban', meaning: 'Number one / best', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: 'リンゴを一つください。', hiragana: 'りんごを ひとつ ください。', romaji: 'Ringo o hitotsu kudasai.', english: 'Please give me one apple.' },
      { japanese: '彼は一人で日本へ行きました。', hiragana: 'かれは ひとりでにほんへ いきました。', romaji: 'Kare wa hitori de Nihon e ikimashita.', english: 'He went to Japan alone.' }
    ]
  },
  {
    id: 2,
    kanji_number: 2,
    character: '二',
    meaning: 'Two',
    level: 1,
    onyomi_readings: ['ニ', 'ジ'],
    kunyomi_readings: ['ふた', 'ふたつ'],
    onyomi_romaji: ['ni', 'ji'],
    kunyomi_romaji: ['futa', 'futatsu'],
    hiragana_reading: 'に, ふた',
    stroke_count: 2,
    radicals: '二 (two)',
    stroke_order_data: { count: 2, directions: ['Top shorter horizontal stroke', 'Bottom longer horizontal stroke'] },
    mnemonic: 'Two horizontal lines stacked parallel to represent two.',
    vocabulary: [
      { word: '二つ', hiragana: 'ふたつ', romaji: 'futatsu', meaning: 'Two things', readingType: 'kunyomi' },
      { word: '二人', hiragana: 'ふたり', romaji: 'futari', meaning: 'Two people', readingType: 'irregular' },
      { word: '二月', hiragana: 'にがつ', romaji: 'nigatsu', meaning: 'February', readingType: 'onyomi' },
      { word: '二階', hiragana: 'にかい', romaji: 'nikai', meaning: 'Second floor', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: 'コーヒーを二つお願いします。', hiragana: 'こーひーを ふたつ おねがいします。', romaji: 'Koohii o futatsu onegaishimasu.', english: 'Two coffees, please.' },
      { japanese: '二人は友達です。', hiragana: 'ふたりは ともだちです。', romaji: 'Futari wa tomodachi desu.', english: 'The two are friends.' }
    ]
  },
  {
    id: 3,
    kanji_number: 3,
    character: '三',
    meaning: 'Three',
    level: 1,
    onyomi_readings: ['サン'],
    kunyomi_readings: ['み', 'みっつ'],
    onyomi_romaji: ['san'],
    kunyomi_romaji: ['mi', 'mittsu'],
    hiragana_reading: 'さん, み',
    stroke_count: 3,
    radicals: '一 (one)',
    stroke_order_data: { count: 3, directions: ['Top horizontal stroke', 'Middle shorter horizontal stroke', 'Bottom longest horizontal stroke'] },
    mnemonic: 'Three horizontal strokes symbolizing three fingers or items.',
    vocabulary: [
      { word: '三つ', hiragana: 'みっつ', romaji: 'mittsu', meaning: 'Three things', readingType: 'kunyomi' },
      { word: '三人', hiragana: 'さんにん', romaji: 'sannin', meaning: 'Three people', readingType: 'onyomi' },
      { word: '三月', hiragana: 'さんがつ', romaji: 'sangatsu', meaning: 'March', readingType: 'onyomi' },
      { word: '三日', hiragana: 'みっか', romaji: 'mikka', meaning: 'Third day of month / 3 days', readingType: 'kunyomi' }
    ],
    example_sentences: [
      { japanese: '三時にお茶を飲みます。', hiragana: 'さんじに おちゃを のみます。', romaji: 'San-ji ni ocha o nomimasu.', english: 'I drink tea at three o\'clock.' },
      { japanese: '箱の中にリンゴが三つあります。', hiragana: 'はこのなかに りんごが みっつ あります。', romaji: 'Hako no naka ni ringo ga mittsu arimasu.', english: 'There are three apples in the box.' }
    ]
  },
  {
    id: 4,
    kanji_number: 4,
    character: '四',
    meaning: 'Four',
    level: 1,
    onyomi_readings: ['シ'],
    kunyomi_readings: ['よ', 'よつ', 'よっつ', 'よん'],
    onyomi_romaji: ['shi'],
    kunyomi_romaji: ['yo', 'yotsu', 'yottsu', 'yon'],
    hiragana_reading: 'し, よん',
    stroke_count: 5,
    radicals: '囗 (enclosure)',
    stroke_order_data: { count: 5, directions: ['Left vertical', 'Top-right corner stroke', 'Inner left curve', 'Inner right curve', 'Bottom closing horizontal'] },
    mnemonic: 'A window enclosure showing four window panes or curtains hanging inside.',
    vocabulary: [
      { word: '四つ', hiragana: 'よっつ', romaji: 'yottsu', meaning: 'Four things', readingType: 'kunyomi' },
      { word: '四人', hiragana: 'よにん', romaji: 'yonin', meaning: 'Four people', readingType: 'kunyomi' },
      { word: '四月', hiragana: 'しがつ', romaji: 'shigatsu', meaning: 'April', readingType: 'onyomi' },
      { word: '四季', hiragana: 'しき', romaji: 'shiki', meaning: 'Four seasons', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '部屋に椅子が四つあります。', hiragana: 'へやに いすが よっつ あります。', romaji: 'Heya ni isu ga yottsu arimasu.', english: 'There are four chairs in the room.' },
      { japanese: '四月は桜がとても綺麗です。', hiragana: 'しがつは さくらが とても きれいです。', romaji: 'Shigatsu wa sakura ga totemo kirei desu.', english: 'In April, the cherry blossoms are very beautiful.' }
    ]
  },
  {
    id: 5,
    kanji_number: 5,
    character: '五',
    meaning: 'Five',
    level: 1,
    onyomi_readings: ['ゴ'],
    kunyomi_readings: ['いつ', 'いつつ'],
    onyomi_romaji: ['go'],
    kunyomi_romaji: ['itsu', 'itsutsu'],
    hiragana_reading: 'ご, いつ',
    stroke_count: 4,
    radicals: '二 (two)',
    stroke_order_data: { count: 4, directions: ['Top horizontal', 'Vertical left-angle', 'Horizontal folded line', 'Bottom horizontal'] },
    mnemonic: 'Five tally marks intertwined, or five lines joined together to show 5.',
    vocabulary: [
      { word: '五つ', hiragana: 'いつつ', romaji: 'itsutsu', meaning: 'Five things', readingType: 'kunyomi' },
      { word: '五人', hiragana: 'ごにん', romaji: 'gonin', meaning: 'Five people', readingType: 'onyomi' },
      { word: '五月', hiragana: 'ごがつ', romaji: 'gogatsu', meaning: 'May', readingType: 'onyomi' },
      { word: '五日', hiragana: 'いつか', romaji: 'itsuka', meaning: 'Fifth day / 5 days', readingType: 'kunyomi' }
    ],
    example_sentences: [
      { japanese: '会議は五時に終わります。', hiragana: 'かいぎは ごじに おわります。', romaji: 'Kaigi wa go-ji ni owarimasu.', english: 'The meeting ends at five o\'clock.' },
      { japanese: 'オレンジを五つ買いました。', hiragana: 'おれんじを いつつ かいました。', romaji: 'Orenji o itsutsu kaimashita.', english: 'I bought five oranges.' }
    ]
  },
  {
    id: 6,
    kanji_number: 6,
    character: '六',
    meaning: 'Six',
    level: 1,
    onyomi_readings: ['ロク'],
    kunyomi_readings: ['む', 'むっつ', 'むい'],
    onyomi_romaji: ['roku'],
    kunyomi_romaji: ['mu', 'muttsu', 'mui'],
    hiragana_reading: 'ろく, む',
    stroke_count: 4,
    radicals: '八 (eight) / 亠 (lid)',
    stroke_order_data: { count: 4, directions: ['Top dot', 'Horizontal bar', 'Left diagonal falling', 'Right diagonal falling'] },
    mnemonic: 'A person wearing a hat and extending legs, counting up to six.',
    vocabulary: [
      { word: '六つ', hiragana: 'むっつ', romaji: 'muttsu', meaning: 'Six things', readingType: 'kunyomi' },
      { word: '六人', hiragana: 'ろくにん', romaji: 'rokunin', meaning: 'Six people', readingType: 'onyomi' },
      { word: '六月', hiragana: 'ろくがつ', romaji: 'rokugatsu', meaning: 'June', readingType: 'onyomi' },
      { word: '六日', hiragana: 'むいか', romaji: 'muika', meaning: 'Sixth day / 6 days', readingType: 'kunyomi' }
    ],
    example_sentences: [
      { japanese: '毎朝六時に起きます。', hiragana: 'まいあさ ろくじに おきます。', romaji: 'Maiasa roku-ji ni okimasu.', english: 'I wake up at six every morning.' },
      { japanese: '卵が六つ残っています。', hiragana: 'たまごが むっつ のこっています。', romaji: 'Tamago ga muttsu nokotte imasu.', english: 'Six eggs are left.' }
    ]
  },
  {
    id: 7,
    kanji_number: 7,
    character: '七',
    meaning: 'Seven',
    level: 1,
    onyomi_readings: ['シチ'],
    kunyomi_readings: ['なな', 'ななつ', 'なの'],
    onyomi_romaji: ['shichi'],
    kunyomi_romaji: ['nana', 'nanatsu', 'nano'],
    hiragana_reading: 'しち, なな',
    stroke_count: 2,
    radicals: '一 (one)',
    stroke_order_data: { count: 2, directions: ['Horizontal rising stroke', 'Vertical curve with hook'] },
    mnemonic: 'Looks like an upside down number 7 or a cut line through seven.',
    vocabulary: [
      { word: '七つ', hiragana: 'ななつ', romaji: 'nanatsu', meaning: 'Seven things', readingType: 'kunyomi' },
      { word: '七人', hiragana: 'しちにん / ななにん', romaji: 'shichinin / nananin', meaning: 'Seven people', readingType: 'onyomi' },
      { word: '七月', hiragana: 'しちがつ', romaji: 'shichigatsu', meaning: 'July', readingType: 'onyomi' },
      { word: '七日', hiragana: 'なのか', romaji: 'nanoka', meaning: 'Seventh day / 7 days', readingType: 'kunyomi' }
    ],
    example_sentences: [
      { japanese: '七時に夜ご飯を食べます。', hiragana: 'しちじに よるごはんを たべます。', romaji: 'Shichi-ji ni yorugohan o tabemasu.', english: 'I eat dinner at seven o\'clock.' },
      { japanese: '星が七つ見えます。', hiragana: 'ほしが ななつ みえます。', romaji: 'Hoshi ga nanatsu miemasu.', english: 'I can see seven stars.' }
    ]
  },
  {
    id: 8,
    kanji_number: 8,
    character: '八',
    meaning: 'Eight',
    level: 1,
    onyomi_readings: ['ハチ'],
    kunyomi_readings: ['や', 'やっつ', 'よう'],
    onyomi_romaji: ['hachi'],
    kunyomi_romaji: ['ya', 'yattsu', 'you'],
    hiragana_reading: 'はち, や',
    stroke_count: 2,
    radicals: '八 (eight)',
    stroke_order_data: { count: 2, directions: ['Left diagonal stroke downward', 'Right diagonal longer downward stroke'] },
    mnemonic: 'Two strokes spreading outward like Mt. Fuji, symbolizing prosperity and opening eight paths.',
    vocabulary: [
      { word: '八つ', hiragana: 'やっつ', romaji: 'yattsu', meaning: 'Eight things', readingType: 'kunyomi' },
      { word: '八人', hiragana: 'はちにん', romaji: 'hachinin', meaning: 'Eight people', readingType: 'onyomi' },
      { word: '八月', hiragana: 'はちがつ', romaji: 'hachigatsu', meaning: 'August', readingType: 'onyomi' },
      { word: '八日', hiragana: 'ようか', romaji: 'youka', meaning: 'Eighth day / 8 days', readingType: 'kunyomi' },
      { word: '八百屋', hiragana: 'やおや', romaji: 'yaoya', meaning: 'Greengrocer (vegetable store)', readingType: 'kunyomi' }
    ],
    example_sentences: [
      { japanese: '八月はとても暑いです。', hiragana: 'はちがつは とても あついです。', romaji: 'Hachigatsu wa totemo atsui desu.', english: 'August is very hot.' },
      { japanese: '八つの机を並べました。', hiragana: 'やっつの つくえを ならべました。', romaji: 'Yattsu no tsukue o narabemashita.', english: 'I lined up eight desks.' }
    ]
  },
  {
    id: 9,
    kanji_number: 9,
    character: '九',
    meaning: 'Nine',
    level: 1,
    onyomi_readings: ['キュウ', 'ク'],
    kunyomi_readings: ['ここの', 'ここのつ'],
    onyomi_romaji: ['kyuu', 'ku'],
    kunyomi_romaji: ['kokono', 'kokonotsu'],
    hiragana_reading: 'きゅう, ここの',
    stroke_count: 2,
    radicals: '乙 (second)',
    stroke_order_data: { count: 2, directions: ['Left diagonal downward', 'Horizontal-bend down with hook'] },
    mnemonic: 'A person bending an arm up to show muscles with 9 fingers curled.',
    vocabulary: [
      { word: '九つ', hiragana: 'ここのつ', romaji: 'kokonotsu', meaning: 'Nine things', readingType: 'kunyomi' },
      { word: '九人', hiragana: 'きゅうにん / くにん', romaji: 'kyuunin', meaning: 'Nine people', readingType: 'onyomi' },
      { word: '九月', hiragana: 'くがつ', romaji: 'kugatsu', meaning: 'September', readingType: 'onyomi' },
      { word: '九日', hiragana: 'ここのか', romaji: 'kokonoka', meaning: 'Ninth day / 9 days', readingType: 'kunyomi' }
    ],
    example_sentences: [
      { japanese: '新学期は九月に始まります。', hiragana: 'しんがっきは くがつに はじまります。', romaji: 'Shingakki wa kugatsu ni hajimarimasu.', english: 'The new semester begins in September.' },
      { japanese: '九時にオフィスに着きます。', hiragana: 'くじに おふぃすに つきます。', romaji: 'Ku-ji ni ofisu ni tsukimasu.', english: 'I arrive at the office at 9 o\'clock.' }
    ]
  },
  {
    id: 10,
    kanji_number: 10,
    character: '十',
    meaning: 'Ten',
    level: 1,
    onyomi_readings: ['ジュウ', 'ジッ'],
    kunyomi_readings: ['とお', 'と'],
    onyomi_romaji: ['juu', 'ji-'],
    kunyomi_romaji: ['too', 'to'],
    hiragana_reading: 'じゅう, とお',
    stroke_count: 2,
    radicals: '十 (ten)',
    stroke_order_data: { count: 2, directions: ['Horizontal bar', 'Vertical intersecting bar'] },
    mnemonic: 'A cross mark representing ten fingers crossed or Roman X rotated.',
    vocabulary: [
      { word: '十', hiragana: 'じゅう / とお', romaji: 'juu / too', meaning: 'Ten', readingType: 'onyomi' },
      { word: '十月', hiragana: 'じゅうがつ', romaji: 'juugatsu', meaning: 'October', readingType: 'onyomi' },
      { word: '十日', hiragana: 'とおか', romaji: 'tooka', meaning: 'Tenth day / 10 days', readingType: 'kunyomi' },
      { word: '十分', hiragana: 'じゅっぷん', romaji: 'juppun', meaning: 'Ten minutes', readingType: 'onyomi' },
      { word: '十分', hiragana: 'じゅうぶん', romaji: 'juubun', meaning: 'Enough / sufficient', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '会議は十時にスタートします。', hiragana: 'かいぎは じゅうじに すたーとします。', romaji: 'Kaigi wa juu-ji ni sutaato shimasu.', english: 'The meeting starts at ten o\'clock.' },
      { japanese: 'この箱には鉛筆が十本あります。', hiragana: 'このはこには えんぴつが じゅっぽん あります。', romaji: 'Kono hako ni wa enpitsu ga juppon arimasu.', english: 'There are ten pencils in this box.' }
    ]
  },

  // LEVEL 2: Nature, Calendar & Cosmic Elements (Kanji 11 - 20)
  {
    id: 11,
    kanji_number: 11,
    character: '日',
    meaning: 'Sun, Day',
    level: 2,
    onyomi_readings: ['ニチ', 'ジツ'],
    kunyomi_readings: ['ひ', '-び', '-か'],
    onyomi_romaji: ['nichi', 'jitsu'],
    kunyomi_romaji: ['hi', '-bi', '-ka'],
    hiragana_reading: 'にち, ひ',
    stroke_count: 4,
    radicals: '日 (sun/day)',
    stroke_order_data: { count: 4, directions: ['Left vertical', 'Top and right box corner', 'Middle horizontal', 'Bottom closing horizontal'] },
    mnemonic: 'A circular sun with a sunspot in the ancient pictograph, squared off into a box with a middle ray.',
    vocabulary: [
      { word: '日曜日', hiragana: 'にちようび', romaji: 'nichiyoubi', meaning: 'Sunday', readingType: 'onyomi' },
      { word: '日本', hiragana: 'にほん', romaji: 'nihon', meaning: 'Japan', readingType: 'onyomi' },
      { word: '今日', hiragana: 'きょう', romaji: 'kyou', meaning: 'Today', readingType: 'irregular' },
      { word: '毎日', hiragana: 'まいにち', romaji: 'mainichi', meaning: 'Every day', readingType: 'onyomi' },
      { word: '休日', hiragana: 'きゅうじつ', romaji: 'kyuujitsu', meaning: 'Holiday', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '日曜日に買い物へ行きます。', hiragana: 'にちようびに かいものへ いきます。', romaji: 'Nichiyoubi ni kaimono e ikimasu.', english: 'I go shopping on Sunday.' },
      { japanese: '今日は天気がとてもいい日です。', hiragana: 'きょうは てんきが とてもいい ひです。', romaji: 'Kyou wa tenki ga totemo ii hi desu.', english: 'Today is a very nice day with great weather.' }
    ]
  },
  {
    id: 12,
    kanji_number: 12,
    character: '月',
    meaning: 'Moon, Month',
    level: 2,
    onyomi_readings: ['ゲツ', 'ガツ'],
    kunyomi_readings: ['つき'],
    onyomi_romaji: ['getsu', 'gatsu'],
    kunyomi_romaji: ['tsuki'],
    hiragana_reading: 'げつ, つき',
    stroke_count: 4,
    radicals: '月 (moon)',
    stroke_order_data: { count: 4, directions: ['Left vertical curve', 'Top-right corner with hook', 'First inner horizontal', 'Second inner horizontal'] },
    mnemonic: 'A crescent moon in the night sky with clouds passing across it.',
    vocabulary: [
      { word: '月曜日', hiragana: 'げつようび', romaji: 'getsuyoubi', meaning: 'Monday', readingType: 'onyomi' },
      { word: '今月', hiragana: 'こんげつ', romaji: 'kongetsu', meaning: 'This month', readingType: 'onyomi' },
      { word: '毎月', hiragana: 'まいつき / まいげつ', romaji: 'maitsuki', meaning: 'Every month', readingType: 'kunyomi' },
      { word: '月', hiragana: 'つき', romaji: 'tsuki', meaning: 'Moon', readingType: 'kunyomi' },
      { word: '一月', hiragana: 'いちがつ', romaji: 'ichigatsu', meaning: 'January', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '今夜は月がとても明るいです。', hiragana: 'こんやは つきが とても あかるいです。', romaji: 'Konya wa tsuki ga totemo akarui desu.', english: 'The moon is very bright tonight.' },
      { japanese: '月曜日の朝にミーティングがあります。', hiragana: 'げつようびの あさに みーてぃんぐが あります。', romaji: 'Getsuyoubi no asa ni miitingu ga arimasu.', english: 'There is a meeting on Monday morning.' }
    ]
  },
  {
    id: 13,
    kanji_number: 13,
    character: '火',
    meaning: 'Fire',
    level: 2,
    onyomi_readings: ['カ'],
    kunyomi_readings: ['ひ', '-び', 'ほ-'],
    onyomi_romaji: ['ka'],
    kunyomi_romaji: ['hi', '-bi', 'ho-'],
    hiragana_reading: 'か, ひ',
    stroke_count: 4,
    radicals: '火 (fire)',
    stroke_order_data: { count: 4, directions: ['Left spark dot', 'Right spark stroke', 'Center curved trunk', 'Right sweeping leg'] },
    mnemonic: 'Sparks flying off the left and right sides of a crackling campfire flame.',
    vocabulary: [
      { word: '火曜日', hiragana: 'かようび', romaji: 'kayoubi', meaning: 'Tuesday', readingType: 'onyomi' },
      { word: '火', hiragana: 'ひ', romaji: 'hi', meaning: 'Fire / flame', readingType: 'kunyomi' },
      { word: '花火', hiragana: 'はなび', romaji: 'hanabi', meaning: 'Fireworks (flower fire)', readingType: 'kunyomi' },
      { word: '火事', hiragana: 'かじ', romaji: 'kaji', meaning: 'Fire incident / conflagration', readingType: 'onyomi' },
      { word: '火山', hiragana: 'かざん', romaji: 'kazan', meaning: 'Volcano', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '火曜日にレポートを提出します。', hiragana: 'かようびに れぽーとを ていしゅつします。', romaji: 'Kayoubi ni repooto o teishutsu shimasu.', english: 'I will submit the report on Tuesday.' },
      { japanese: '夏休みに友達と花火を見ました。', hiragana: 'なつやすみに ともだちと はなびを みました。', romaji: 'Natsuyasumi ni tomodachi to hanabi o mimashita.', english: 'I watched fireworks with my friends during summer vacation.' }
    ]
  },
  {
    id: 14,
    kanji_number: 14,
    character: '水',
    meaning: 'Water',
    level: 2,
    onyomi_readings: ['スイ'],
    kunyomi_readings: ['みず'],
    onyomi_romaji: ['sui'],
    kunyomi_romaji: ['mizu'],
    hiragana_reading: 'すい, みず',
    stroke_count: 4,
    radicals: '水 (water)',
    stroke_order_data: { count: 4, directions: ['Center vertical with hook', 'Left angled stroke', 'Right downward stroke', 'Right diagonal sweep'] },
    mnemonic: 'Water splashing out to the left and right from a central waterfall stream.',
    vocabulary: [
      { word: '水曜日', hiragana: 'すいようび', romaji: 'suiyoubi', meaning: 'Wednesday', readingType: 'onyomi' },
      { word: '水', hiragana: 'みず', romaji: 'mizu', meaning: 'Water', readingType: 'kunyomi' },
      { word: 'お水', hiragana: 'おみず', romaji: 'omizu', meaning: 'Water (polite)', readingType: 'kunyomi' },
      { word: '水泳', hiragana: 'すいえい', romaji: 'suiei', meaning: 'Swimming', readingType: 'onyomi' },
      { word: '海水', hiragana: 'かいすい', romaji: 'kaisui', meaning: 'Seawater', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '冷たい水を一杯飲みたいです。', hiragana: 'つめたい みずを いっぱい のみたいです。', romaji: 'Tsumetai mizu o ippai nomitai desu.', english: 'I want to drink a cup of cold water.' },
      { japanese: '水曜日にプールで泳ぎます。', hiragana: 'すいようびに ぷーるで およぎます。', romaji: 'Suiyoubi ni puuru de oyogimasu.', english: 'I swim in the pool on Wednesdays.' }
    ]
  },
  {
    id: 15,
    kanji_number: 15,
    character: '木',
    meaning: 'Tree, Wood',
    level: 2,
    onyomi_readings: ['モク', 'ボク'],
    kunyomi_readings: ['き', 'こ-'],
    onyomi_romaji: ['moku', 'boku'],
    kunyomi_romaji: ['ki', 'ko-'],
    hiragana_reading: 'もく, き',
    stroke_count: 4,
    radicals: '木 (tree)',
    stroke_order_data: { count: 4, directions: ['Horizontal branch', 'Vertical trunk', 'Left root slant', 'Right root slant'] },
    mnemonic: 'A tree with its horizontal trunk branches and roots spreading out into the earth.',
    vocabulary: [
      { word: '木曜日', hiragana: 'もくようび', romaji: 'mokuyoubi', meaning: 'Thursday', readingType: 'onyomi' },
      { word: '木', hiragana: 'き', romaji: 'ki', meaning: 'Tree / wood', readingType: 'kunyomi' },
      { word: '木材', hiragana: 'もくざい', romaji: 'mokuzai', meaning: 'Lumber / timber', readingType: 'onyomi' },
      { word: '大木', hiragana: 'たいぼく', romaji: 'taiboku', meaning: 'Large tree', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '庭に大きな木があります。', hiragana: 'にわに おおきな きが あります。', romaji: 'Niwa ni ookina ki ga arimasu.', english: 'There is a big tree in the garden.' },
      { japanese: '木曜日は定休日です。', hiragana: 'もくようびは ていきゅうびです。', romaji: 'Mokuyoubi wa teikyuubi desu.', english: 'Thursday is the regular closing day.' }
    ]
  },
  {
    id: 16,
    kanji_number: 16,
    character: '金',
    meaning: 'Gold, Money, Metal',
    level: 2,
    onyomi_readings: ['キン', 'コン'],
    kunyomi_readings: ['かね', 'かな-'],
    onyomi_romaji: ['kin', 'kon'],
    kunyomi_romaji: ['kane', 'kana-'],
    hiragana_reading: 'きん, かね',
    stroke_count: 8,
    radicals: '金 (gold/metal)',
    stroke_order_data: { count: 8, directions: ['Roof slant left', 'Roof slant right', 'Upper horizontal', 'Lower horizontal', 'Center vertical', 'Left nugget', 'Right nugget', 'Bottom closing base'] },
    mnemonic: 'Under a mountain roof, golden nuggets of treasure are stored safely in the earth.',
    vocabulary: [
      { word: '金曜日', hiragana: 'きんようび', romaji: 'kinyoubi', meaning: 'Friday', readingType: 'onyomi' },
      { word: 'お金', hiragana: 'おかね', romaji: 'okane', meaning: 'Money', readingType: 'kunyomi' },
      { word: '料金', hiragana: 'りょうきん', romaji: 'ryoukin', meaning: 'Fee / charge', readingType: 'onyomi' },
      { word: '金メダル', hiragana: 'きんめだる', romaji: 'kin medaru', meaning: 'Gold medal', readingType: 'onyomi' },
      { word: '現金', hiragana: 'げんきん', romaji: 'genkin', meaning: 'Cash', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '金曜日の夜に映画を見ます。', hiragana: 'きんようびの よるに えいがを みます。', romaji: 'Kinyoubi no yoru ni eiga o mimasu.', english: 'I watch movies on Friday night.' },
      { japanese: '財布にお金があまりありません。', hiragana: 'さいふに おかねが あまり ありません。', romaji: 'Saifu ni okane ga amari arimasen.', english: 'I don\'t have much money in my wallet.' }
    ]
  },
  {
    id: 17,
    kanji_number: 17,
    character: '土',
    meaning: 'Soil, Earth, Ground',
    level: 2,
    onyomi_readings: ['ド', 'ト'],
    kunyomi_readings: ['つち'],
    onyomi_romaji: ['do', 'to'],
    kunyomi_romaji: ['tsuchi'],
    hiragana_reading: 'ど, つち',
    stroke_count: 3,
    radicals: '土 (earth)',
    stroke_order_data: { count: 3, directions: ['Top shorter horizontal', 'Center vertical', 'Bottom longer foundation horizontal'] },
    mnemonic: 'A young plant sprouting vertically out of the fertile earth base.',
    vocabulary: [
      { word: '土曜日', hiragana: 'どようび', romaji: 'doyoubi', meaning: 'Saturday', readingType: 'onyomi' },
      { word: '土', hiragana: 'つち', romaji: 'tsuchi', meaning: 'Soil / dirt / ground', readingType: 'kunyomi' },
      { word: '土地', hiragana: 'とち', romaji: 'tochi', meaning: 'Land / plot', readingType: 'onyomi' },
      { word: 'お土産', hiragana: 'おみやげ', romaji: 'omiyage', meaning: 'Souvenir', readingType: 'irregular' }
    ],
    example_sentences: [
      { japanese: '土曜日は一日中休みです。', hiragana: 'どようびは いちにちじゅう やすみです。', romaji: 'Doyoubi wa ichinichijuu yasumi desu.', english: 'Saturday is an all-day break.' },
      { japanese: '植木鉢に新しい土を入れました。', hiragana: 'うえきばちに あたらしい つちを いれました。', romaji: 'Uekibachi ni atarashii tsuchi o iremashita.', english: 'I put fresh soil into the flowerpot.' }
    ]
  },
  {
    id: 18,
    kanji_number: 18,
    character: '山',
    meaning: 'Mountain',
    level: 2,
    onyomi_readings: ['サン', 'ザン'],
    kunyomi_readings: ['やま'],
    onyomi_romaji: ['san', 'zan'],
    kunyomi_romaji: ['yama'],
    hiragana_reading: 'さん, やま',
    stroke_count: 3,
    radicals: '山 (mountain)',
    stroke_order_data: { count: 3, directions: ['Center tallest vertical peak', 'Left vertical and horizontal base', 'Right vertical peak'] },
    mnemonic: 'Three rising peaks of a grand mountain range.',
    vocabulary: [
      { word: '富士山', hiragana: 'ふじさん', romaji: 'Fujisan', meaning: 'Mt. Fuji', readingType: 'onyomi' },
      { word: '山', hiragana: 'やま', romaji: 'yama', meaning: 'Mountain', readingType: 'kunyomi' },
      { word: '山登り', hiragana: 'やまのぼり', romaji: 'yamanobori', meaning: 'Mountain climbing', readingType: 'kunyomi' },
      { word: '火山', hiragana: 'かざん', romaji: 'kazan', meaning: 'Volcano', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '週末に山へハイキングに行きました。', hiragana: 'しゅうまつに やまへ はいきんぐに いきました。', romaji: 'Shuumatsu ni yama e haikingu ni ikimashita.', english: 'I went hiking in the mountains over the weekend.' },
      { japanese: '新幹線から美しい富士山が見えました。', hiragana: 'しんかんせんから うつくしい ふじさんが みえました。', romaji: 'Shinkansen kara utsukushii Fujisan ga miemashita.', english: 'I could see beautiful Mt. Fuji from the Shinkansen.' }
    ]
  },
  {
    id: 19,
    kanji_number: 19,
    character: '川',
    meaning: 'River, Stream',
    level: 2,
    onyomi_readings: ['セン'],
    kunyomi_readings: ['かわ', '-がわ'],
    onyomi_romaji: ['sen'],
    kunyomi_romaji: ['kawa', '-gawa'],
    hiragana_reading: 'せん, かわ',
    stroke_count: 3,
    radicals: '川 (river)',
    stroke_order_data: { count: 3, directions: ['Left curved bank', 'Center short current line', 'Right straight riverbank'] },
    mnemonic: 'Three parallel curves of water flowing between riverbanks.',
    vocabulary: [
      { word: '川', hiragana: 'かわ', romaji: 'kawa', meaning: 'River', readingType: 'kunyomi' },
      { word: '小川', hiragana: 'おがわ', romaji: 'ogawa', meaning: 'Brook / stream', readingType: 'kunyomi' },
      { word: '河川', hiragana: 'かせん', romaji: 'kasen', meaning: 'Rivers / waterways', readingType: 'onyomi' },
      { word: 'ナイル川', hiragana: 'ないるがわ', romaji: 'Nairu-gawa', meaning: 'Nile River', readingType: 'kunyomi' }
    ],
    example_sentences: [
      { japanese: 'この川には魚がたくさんいます。', hiragana: 'このかわには さかなが たくさん います。', romaji: 'Kono kawa ni wa sakana ga takusan imasu.', english: 'There are a lot of fish in this river.' },
      { japanese: '川の近くを静かに散歩しました。', hiragana: 'かわの ちかくを しずかに さんぽしました。', romaji: 'Kawa no chikaku o shizuka ni sanpo shimashita.', english: 'I took a quiet walk near the river.' }
    ]
  },
  {
    id: 20,
    kanji_number: 20,
    character: '田',
    meaning: 'Rice Field, Paddy',
    level: 2,
    onyomi_readings: ['デン'],
    kunyomi_readings: ['た', '-だ'],
    onyomi_romaji: ['den'],
    kunyomi_romaji: ['ta', '-da'],
    hiragana_reading: 'でん, た',
    stroke_count: 5,
    radicals: '田 (rice field)',
    stroke_order_data: { count: 5, directions: ['Left vertical', 'Top and right perimeter stroke', 'Middle vertical divider', 'Middle horizontal divider', 'Bottom closing base'] },
    mnemonic: 'An aerial view of four irrigated rice paddy plots partitioned by footpaths.',
    vocabulary: [
      { word: '田んぼ', hiragana: 'たんぼ', romaji: 'tanbo', meaning: 'Rice paddy', readingType: 'kunyomi' },
      { word: '水田', hiragana: 'すいでん', romaji: 'suiden', meaning: 'Water-filled paddy field', readingType: 'onyomi' },
      { word: '山田さん', hiragana: 'やまださん', romaji: 'Yamada-san', meaning: 'Mr./Ms. Yamada', readingType: 'kunyomi' },
      { word: '油田', hiragana: 'ゆでん', romaji: 'yuden', meaning: 'Oil field', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '電車の窓から広大な田んぼが見えます。', hiragana: 'でんしゃの まどから こうだいな たんぼが みえます。', romaji: 'Densha no mado kara koudai na tanbo ga miemasu.', english: 'I can see vast rice fields from the train window.' },
      { japanese: '山田さんはとても親切な先生です。', hiragana: 'やまださんは とても しんせつな せんせいです。', romaji: 'Yamada-san wa totemo shinsetsu na sensei desu.', english: 'Mr. Yamada is a very kind teacher.' }
    ]
  },

  // LEVEL 3: People, Body & Human Essence (Kanji 21 - 30)
  {
    id: 21,
    kanji_number: 21,
    character: '人',
    meaning: 'Person, Human',
    level: 3,
    onyomi_readings: ['ジン', 'ニン'],
    kunyomi_readings: ['ひと'],
    onyomi_romaji: ['jin', 'nin'],
    kunyomi_romaji: ['hito'],
    hiragana_reading: 'じん, ひと',
    stroke_count: 2,
    radicals: '人 (person)',
    stroke_order_data: { count: 2, directions: ['Left diagonal stroke downward', 'Right supporting diagonal stroke'] },
    mnemonic: 'Two legs of a human walking forward, or two people supporting each other.',
    vocabulary: [
      { word: '日本人', hiragana: 'にほんじん', romaji: 'nihonjin', meaning: 'Japanese person', readingType: 'onyomi' },
      { word: '外国人', hiragana: 'がいこくじん', romaji: 'gaikokujin', meaning: 'Foreigner', readingType: 'onyomi' },
      { word: '人', hiragana: 'ひと', romaji: 'hito', meaning: 'Person / someone', readingType: 'kunyomi' },
      { word: '大人', hiragana: 'おとな', romaji: 'otona', meaning: 'Adult', readingType: 'irregular' },
      { word: '人気', hiragana: 'にんき', romaji: 'ninki', meaning: 'Popularity', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: 'あそこに親切な人が立っています。', hiragana: 'あそこに しんせつな ひとが たっています。', romaji: 'Asoko ni shinsetsu na hito ga tatte imasu.', english: 'A kind person is standing over there.' },
      { japanese: 'このカフェは若い人にとても人気です。', hiragana: 'この かふぇは わかい ひとに とても にんきです。', romaji: 'Kono kafe wa wakai hito ni totemo ninki desu.', english: 'This cafe is very popular with young people.' }
    ]
  },
  {
    id: 22,
    kanji_number: 22,
    character: '子',
    meaning: 'Child',
    level: 3,
    onyomi_readings: ['シ', 'ス'],
    kunyomi_readings: ['こ'],
    onyomi_romaji: ['shi', 'su'],
    kunyomi_romaji: ['ko'],
    hiragana_reading: 'し, こ',
    stroke_count: 3,
    radicals: '子 (child)',
    stroke_order_data: { count: 3, directions: ['Top horizontal curved stroke', 'Center hook curve down', 'Horizontal cross stroke'] },
    mnemonic: 'A baby wrapped in swaddling clothes with cute outstretched arms.',
    vocabulary: [
      { word: '子ども', hiragana: 'こども', romaji: 'kodomo', meaning: 'Child / children', readingType: 'kunyomi' },
      { word: '男の子', hiragana: 'おとこのこ', romaji: 'otokonoko', meaning: 'Boy', readingType: 'kunyomi' },
      { word: '女の子', hiragana: 'おんなのこ', romaji: 'onnanoko', meaning: 'Girl', readingType: 'kunyomi' },
      { word: 'お菓子', hiragana: 'おかし', romaji: 'okashi', meaning: 'Sweets / snacks', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '公園で子どもたちが元気に遊んでいます。', hiragana: 'こうえんで こどもたちが げんきに あそんでいます。', romaji: 'Kouen de kodomo-tachi ga genki ni asonde imasu.', english: 'Children are playing energetically in the park.' },
      { japanese: 'あの女の子は私の妹です。', hiragana: 'あの おんなのこは わたしの いもうとです。', romaji: 'Ano onnanoko wa watashi no imouto desu.', english: 'That girl is my younger sister.' }
    ]
  },
  {
    id: 23,
    kanji_number: 23,
    character: '女',
    meaning: 'Woman, Female',
    level: 3,
    onyomi_readings: ['ジョ', 'ニョ'],
    kunyomi_readings: ['おんな', 'め'],
    onyomi_romaji: ['jo', 'nyo'],
    kunyomi_romaji: ['onna', 'me'],
    hiragana_reading: 'じょ, おんな',
    stroke_count: 3,
    radicals: '女 (woman)',
    stroke_order_data: { count: 3, directions: ['Left-slant folding angle', 'Right diagonal curve', 'Center horizontal bar'] },
    mnemonic: 'A graceful woman kneeling or sitting with arms crossed serenely.',
    vocabulary: [
      { word: '女の人', hiragana: 'おんなのひと', romaji: 'onna no hito', meaning: 'Woman', readingType: 'kunyomi' },
      { word: '女性', hiragana: 'じょせい', romaji: 'josei', meaning: 'Woman / female gender', readingType: 'onyomi' },
      { word: '彼女', hiragana: 'かのじょ', romaji: 'kanojo', meaning: 'She / girlfriend', readingType: 'onyomi' },
      { word: '長女', hiragana: 'ちょうじょ', romaji: 'choujo', meaning: 'Eldest daughter', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: 'あの女の人は誰ですか。', hiragana: 'あの おんなのひとは だれですか。', romaji: 'Ano onna no hito wa dare desu ka.', english: 'Who is that woman?' },
      { japanese: '彼女は英語がとても上手です。', hiragana: 'かのじょは えいごが とても じょうずです。', romaji: 'Kanojo wa eigo ga totemo jouzu desu.', english: 'She is very good at English.' }
    ]
  },
  {
    id: 24,
    kanji_number: 24,
    character: '男',
    meaning: 'Man, Male',
    level: 3,
    onyomi_readings: ['ダン', 'ナン'],
    kunyomi_readings: ['おとこ'],
    onyomi_romaji: ['dan', 'nan'],
    kunyomi_romaji: ['otoko'],
    hiragana_reading: 'だん, おとこ',
    stroke_count: 7,
    radicals: '田 (rice field) + 力 (power)',
    stroke_order_data: { count: 7, directions: ['Rice field top (5 strokes)', 'Power symbol bottom (2 strokes)'] },
    mnemonic: 'The person who provides strong physical power (力) to work the rice fields (田) is a man.',
    vocabulary: [
      { word: '男の人', hiragana: 'おとこのひと', romaji: 'otoko no hito', meaning: 'Man', readingType: 'kunyomi' },
      { word: '男性', hiragana: 'だんせい', romaji: 'dansei', meaning: 'Male / gentleman', readingType: 'onyomi' },
      { word: '彼氏', hiragana: 'かれし', romaji: 'kareshi', meaning: 'Boyfriend', readingType: 'onyomi' },
      { word: '長男', hiragana: 'ちょうなん', romaji: 'chounan', meaning: 'Eldest son', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '親切な男の人が駅の道を教えてくれました。', hiragana: 'しんせつな おとこのひとが えきの みちを おしえてくれました。', romaji: 'Shinsetsu na otoko no hito ga eki no michi o oshiete kuremashita.', english: 'A kind man showed me the way to the station.' },
      { japanese: '男性も女性もこのセミナーに参加できます。', hiragana: 'だんせいも じょせいも この せみなーに さんかできます。', romaji: 'Dansei mo josei mo kono seminaa ni sanka dekimasu.', english: 'Both men and women can attend this seminar.' }
    ]
  },
  {
    id: 25,
    kanji_number: 25,
    character: '目',
    meaning: 'Eye',
    level: 3,
    onyomi_readings: ['モク', 'ボク'],
    kunyomi_readings: ['め', 'ま-'],
    onyomi_romaji: ['moku', 'boku'],
    kunyomi_romaji: ['me', 'ma-'],
    hiragana_reading: 'もく, め',
    stroke_count: 5,
    radicals: '目 (eye)',
    stroke_order_data: { count: 5, directions: ['Left vertical', 'Top and right perimeter stroke', 'First horizontal iris line', 'Second horizontal iris line', 'Bottom closing base'] },
    mnemonic: 'An open eyeball standing vertically showing pupil lines inside.',
    vocabulary: [
      { word: '目', hiragana: 'め', romaji: 'me', meaning: 'Eye / eyesight', readingType: 'kunyomi' },
      { word: '一番目', hiragana: 'いちばんめ', romaji: 'ichibanme', meaning: 'First in order', readingType: 'kunyomi' },
      { word: '目的', hiragana: 'もくてき', romaji: 'mokuteki', meaning: 'Purpose / objective', readingType: 'onyomi' },
      { word: '目薬', hiragana: 'めぐすり', romaji: 'megusuri', meaning: 'Eye drops', readingType: 'kunyomi' }
    ],
    example_sentences: [
      { japanese: 'パソコンの使いすぎで目が疲れました。', hiragana: 'ぱそこんの つかいすぎで めが つかれました。', romaji: 'Pasokon no tsukaisugi de me ga tsukaremashita.', english: 'My eyes are tired from using the computer too much.' },
      { japanese: 'この研究の目的は何ですか。', hiragana: 'この けんきゅうの もくてきは なんですか。', romaji: 'Kono kenkyuu no mokuteki wa nan desu ka.', english: 'What is the purpose of this research?' }
    ]
  },
  {
    id: 26,
    kanji_number: 26,
    character: '口',
    meaning: 'Mouth, Opening',
    level: 3,
    onyomi_readings: ['コウ', 'ク'],
    kunyomi_readings: ['くち', '-ぐち'],
    onyomi_romaji: ['kou', 'ku'],
    kunyomi_romaji: ['kuchi', '-guchi'],
    hiragana_reading: 'こう, くち',
    stroke_count: 3,
    radicals: '口 (mouth)',
    stroke_order_data: { count: 3, directions: ['Left vertical', 'Top-right corner stroke', 'Bottom closing horizontal'] },
    mnemonic: 'A wide open rectangular mouth ready to speak or eat.',
    vocabulary: [
      { word: '口', hiragana: 'くち', romaji: 'kuchi', meaning: 'Mouth / opening', readingType: 'kunyomi' },
      { word: '出口', hiragana: 'でぐち', romaji: 'deguchi', meaning: 'Exit', readingType: 'kunyomi' },
      { word: '入口', hiragana: 'いりぐち', romaji: 'iriguchi', meaning: 'Entrance', readingType: 'kunyomi' },
      { word: '人口', hiragana: 'じんこう', romaji: 'jinkou', meaning: 'Population', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '駅の東口で待ち合わせをしましょう。', hiragana: 'えきの ひがしぐちで まちあわせを しましょう。', romaji: 'Eki no higashiguchi de machiawase o shimashou.', english: 'Let\'s meet at the east exit of the station.' },
      { japanese: '東京の人口はとても多いです。', hiragana: 'とうきょうの じんこうは とても おおいです。', romaji: 'Toukyou no jinkou wa totemo ooi desu.', english: 'The population of Tokyo is very large.' }
    ]
  },
  {
    id: 27,
    kanji_number: 27,
    character: '耳',
    meaning: 'Ear',
    level: 3,
    onyomi_readings: ['ジ'],
    kunyomi_readings: ['みみ'],
    onyomi_romaji: ['ji'],
    kunyomi_romaji: ['mimi'],
    hiragana_reading: 'じ, みみ',
    stroke_count: 6,
    radicals: '耳 (ear)',
    stroke_order_data: { count: 6, directions: ['Top horizontal', 'Left vertical down', 'Two inner horizontals', 'Bottom horizontal extending right', 'Right vertical extending downward'] },
    mnemonic: 'A stylized ear with the ear lobe hanging down.',
    vocabulary: [
      { word: '耳', hiragana: 'みみ', romaji: 'mimi', meaning: 'Ear / hearing', readingType: 'kunyomi' },
      { word: '初耳', hiragana: 'はつみみ', romaji: 'hatsumimi', meaning: 'Hearing something for the first time', readingType: 'kunyomi' },
      { word: '耳鼻科', hiragana: 'じびか', romaji: 'jibika', meaning: 'Ear, nose and throat clinic (ENT)', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: 'イヤホンで音楽を聴きすぎて耳が痛いです。', hiragana: 'いやほんで おんがくを ききすぎて みみが いたいです。', romaji: 'Iyahon de ongaku o kikisugite mimi ga itai desu.', english: 'My ears hurt from listening to music too much with earphones.' },
      { japanese: 'その話は私にとって初耳でした。', hiragana: 'その はなしは わたしにとって はつみみでした。', romaji: 'Sono hanashi wa watashi ni totte hatsumimi deshita.', english: 'That news was completely new to me.' }
    ]
  },
  {
    id: 28,
    kanji_number: 28,
    character: '手',
    meaning: 'Hand',
    level: 3,
    onyomi_readings: ['シュ'],
    kunyomi_readings: ['て', 'た-'],
    onyomi_romaji: ['shu'],
    kunyomi_romaji: ['te', 'ta-'],
    hiragana_reading: 'しゅ, て',
    stroke_count: 4,
    radicals: '手 (hand)',
    stroke_order_data: { count: 4, directions: ['Top slanted stroke', 'Upper horizontal finger line', 'Lower longer horizontal line', 'Center curved vertical hook'] },
    mnemonic: 'The palm of an open hand showing wrist lines and curved fingers.',
    vocabulary: [
      { word: '手', hiragana: 'て', romaji: 'te', meaning: 'Hand', readingType: 'kunyomi' },
      { word: '上手', hiragana: 'じょうず', romaji: 'jouzu', meaning: 'Skillful / good at', readingType: 'onyomi' },
      { word: '下手', hiragana: 'へた', romaji: 'heta', meaning: 'Unskillful / poor at', readingType: 'onyomi' },
      { word: '手紙', hiragana: 'てがみ', romaji: 'tegami', meaning: 'Letter', readingType: 'kunyomi' },
      { word: '運転手', hiragana: 'うんてんしゅ', romaji: 'untenshu', meaning: 'Driver', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '食事の前にしっかりと手を洗います。', hiragana: 'しょくじの まえに しっかりと てを あらいます。', romaji: 'Shokuji no mae ni shikkari to te o araimasu.', english: 'I wash my hands thoroughly before meals.' },
      { japanese: '祖母に感謝の手紙を書きました。', hiragana: 'そぼに かんしゃの てがみを かきました。', romaji: 'Sobo ni kansha no tegami o kakimashita.', english: 'I wrote a thank-you letter to my grandmother.' }
    ]
  },
  {
    id: 29,
    kanji_number: 29,
    character: '足',
    meaning: 'Foot, Leg, Be Sufficient',
    level: 3,
    onyomi_readings: ['ソク'],
    kunyomi_readings: ['あし', 'たりる', 'たす'],
    onyomi_romaji: ['soku'],
    kunyomi_romaji: ['ashi', 'tariru', 'tasu'],
    hiragana_reading: 'そく, あし',
    stroke_count: 7,
    radicals: '足 (foot)',
    stroke_order_data: { count: 7, directions: ['Top mouth radical 口 (3 strokes)', 'Lower leg and foot base (4 strokes)'] },
    mnemonic: 'A knee/thigh (口) with the lower calf and foot planted on the ground.',
    vocabulary: [
      { word: '足', hiragana: 'あし', romaji: 'ashi', meaning: 'Foot / leg', readingType: 'kunyomi' },
      { word: '足りる', hiragana: 'たりる', romaji: 'tariru', meaning: 'To be enough / sufficient', readingType: 'kunyomi' },
      { word: '一足', hiragana: 'いっそく', romaji: 'issoku', meaning: 'One pair of shoes/socks', readingType: 'onyomi' },
      { word: '遠足', hiragana: 'えんそく', romaji: 'ensoku', meaning: 'Excursion / school trip', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: 'たくさん歩いたので足が痛くなりました。', hiragana: 'たくさん あるいたので あしが いたくなりました。', romaji: 'Takusan aruita node ashi ga itaku narimashita.', english: 'My legs became sore because I walked a lot.' },
      { japanese: '時間は十分足りますか。', hiragana: 'じかんは じゅうぶん たりますか。', romaji: 'Jikan wa juubun tarimasu ka.', english: 'Do you have enough time?' }
    ]
  },
  {
    id: 30,
    kanji_number: 30,
    character: '力',
    meaning: 'Power, Strength',
    level: 3,
    onyomi_readings: ['リョク', 'リキ'],
    kunyomi_readings: ['ちから'],
    onyomi_romaji: ['ryoku', 'riki'],
    kunyomi_romaji: ['chikara'],
    hiragana_reading: 'りょく, ちから',
    stroke_count: 2,
    radicals: '力 (power)',
    stroke_order_data: { count: 2, directions: ['Horizontal bend down with hook', 'Left slashing curve through'] },
    mnemonic: 'A flexed muscular arm tensed with strength.',
    vocabulary: [
      { word: '力', hiragana: 'ちから', romaji: 'chikara', meaning: 'Power / strength', readingType: 'kunyomi' },
      { word: '電力', hiragana: 'でんりょく', romaji: 'denryoku', meaning: 'Electric power', readingType: 'onyomi' },
      { word: '体力', hiragana: 'たいりょく', romaji: 'tairyoku', meaning: 'Physical stamina', readingType: 'onyomi' },
      { word: '全力', hiragana: 'ぜんりょく', romaji: 'zenryoku', meaning: 'Full power / all one\'s best', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '彼は重い荷物を力強く持ち上げました。', hiragana: 'かれは おもい にもつを ちからづよく もちあげました。', romaji: 'Kare wa omoi nimotsu o chikarazuyoku mochiagemashita.', english: 'He powerfully lifted the heavy luggage.' },
      { japanese: '試験で全力を尽くしました。', hiragana: 'しけんで ぜんりょくを つくしました。', romaji: 'Shiken de zenryoku o tsukushimashita.', english: 'I did my absolute best on the exam.' }
    ]
  }
];
