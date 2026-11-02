import { KanjiRecord } from '../../types/kanji';

export const LEVEL_4_TO_6_KANJI: KanjiRecord[] = [
  // LEVEL 4: Position, Size & Life (Kanji 31 - 40)
  {
    id: 31,
    kanji_number: 31,
    character: '上',
    meaning: 'Up, Above, Top',
    level: 4,
    onyomi_readings: ['ジョウ', 'ショウ'],
    kunyomi_readings: ['うえ', 'あがる', 'のぼる'],
    onyomi_romaji: ['jou', 'shou'],
    kunyomi_romaji: ['ue', 'agaru', 'noboru'],
    hiragana_reading: 'じょう, うえ',
    stroke_count: 3,
    radicals: '一 (one)',
    stroke_order_data: { count: 3, directions: ['Center vertical', 'Short right horizontal line', 'Long foundation bottom line'] },
    mnemonic: 'An indicator pointing upwards above a base horizon line.',
    vocabulary: [
      { word: '上', hiragana: 'うえ', romaji: 'ue', meaning: 'Above / on top', readingType: 'kunyomi' },
      { word: '上手', hiragana: 'じょうず', romaji: 'jouzu', meaning: 'Skillful / good at', readingType: 'onyomi' },
      { word: '屋上', hiragana: 'おくじょう', romaji: 'okujou', meaning: 'Rooftop', readingType: 'onyomi' },
      { word: '上がる', hiragana: 'あがる', romaji: 'agaru', meaning: 'To go up / rise', readingType: 'kunyomi' }
    ],
    example_sentences: [
      { japanese: '机の上にノートがあります。', hiragana: 'つくえの うえに のーとが あります。', romaji: 'Tsukue no ue ni nooto ga arimasu.', english: 'There is a notebook on the desk.' },
      { japanese: 'エレベーターで屋上に上がりました。', hiragana: 'えれべーたーで おくじょうに あがりました。', romaji: 'Erebeetaa de okujou ni agarimashita.', english: 'I went up to the rooftop by elevator.' }
    ]
  },
  {
    id: 32,
    kanji_number: 32,
    character: '下',
    meaning: 'Down, Below, Under',
    level: 4,
    onyomi_readings: ['カ', 'ゲ'],
    kunyomi_readings: ['した', 'さがる', 'くだる'],
    onyomi_romaji: ['ka', 'ge'],
    kunyomi_romaji: ['shita', 'sagaru', 'kudaru'],
    hiragana_reading: 'か, した',
    stroke_count: 3,
    radicals: '一 (one)',
    stroke_order_data: { count: 3, directions: ['Top horizontal roof line', 'Center vertical stroke going down', 'Right downward indicator stroke'] },
    mnemonic: 'An indicator mark pointing downward underneath a ceiling bar.',
    vocabulary: [
      { word: '下', hiragana: 'した', romaji: 'shita', meaning: 'Under / below', readingType: 'kunyomi' },
      { word: '下手', hiragana: 'へた', romaji: 'heta', meaning: 'Clumsy / poor at', readingType: 'onyomi' },
      { word: '地下鉄', hiragana: 'ちかてつ', romaji: 'chikatetsu', meaning: 'Subway', readingType: 'onyomi' },
      { word: '下がる', hiragana: 'さがる', romaji: 'sagaru', meaning: 'To drop / go down', readingType: 'kunyomi' },
      { word: '靴下', hiragana: 'くつした', romaji: 'kutsushita', meaning: 'Socks', readingType: 'kunyomi' }
    ],
    example_sentences: [
      { japanese: '椅子の下に猫が眠っています。', hiragana: 'いすの したに ねこが ねむっています。', romaji: 'Isu no shita ni neko ga nemutte imasu.', english: 'A cat is sleeping under the chair.' },
      { japanese: '地下鉄で会社へ通勤します。', hiragana: 'ちかてつで かいしゃへ つうきんします。', romaji: 'Chikatetsu de kaisha e tsuukin shimasu.', english: 'I commute to work by subway.' }
    ]
  },
  {
    id: 33,
    kanji_number: 33,
    character: '中',
    meaning: 'Middle, Inside, Center',
    level: 4,
    onyomi_readings: ['チュウ', 'ジュウ'],
    kunyomi_readings: ['なか'],
    onyomi_romaji: ['chuu', 'juu'],
    kunyomi_romaji: ['naka'],
    hiragana_reading: 'ちゅう, なか',
    stroke_count: 4,
    radicals: '丨 (line) / 口 (box)',
    stroke_order_data: { count: 4, directions: ['Left vertical', 'Top-right corner', 'Bottom closing horizontal', 'Center vertical piercing through middle'] },
    mnemonic: 'An arrow piercing right through the exact center of a target box.',
    vocabulary: [
      { word: '中', hiragana: 'なか', romaji: 'naka', meaning: 'Inside / center', readingType: 'kunyomi' },
      { word: '中国', hiragana: 'ちゅうごく', romaji: 'chuugoku', meaning: 'China', readingType: 'onyomi' },
      { word: '一日中', hiragana: 'いちにちじゅう', romaji: 'ichinichijuu', meaning: 'All day long', readingType: 'onyomi' },
      { word: '中学校', hiragana: 'ちゅうがっこう', romaji: 'chuugakkou', meaning: 'Middle school', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: 'カバンの中に財布があります。', hiragana: 'かばんの なかに さいふが あります。', romaji: 'Kaban no naka ni saifu ga arimasu.', english: 'There is a wallet inside the bag.' },
      { japanese: '休日は一日中家で本を読みました。', hiragana: 'きゅうじつは いちにちじゅう いえで ほんを よみました。', romaji: 'Kyuujitsu wa ichinichijuu ie de hon o yomimashita.', english: 'I read books at home all day on the day off.' }
    ]
  },
  {
    id: 34,
    kanji_number: 34,
    character: '大',
    meaning: 'Big, Large',
    level: 4,
    onyomi_readings: ['ダイ', 'タイ'],
    kunyomi_readings: ['おお', 'おおきい'],
    onyomi_romaji: ['dai', 'tai'],
    kunyomi_romaji: ['oo', 'ookii'],
    hiragana_reading: 'だい, おおきい',
    stroke_count: 3,
    radicals: '大 (big)',
    stroke_order_data: { count: 3, directions: ['Horizontal bar', 'Left diagonal curve down', 'Right diagonal slant down'] },
    mnemonic: 'A person standing wide with arms and legs spread out as big as possible.',
    vocabulary: [
      { word: '大きい', hiragana: 'おおきい', romaji: 'ookii', meaning: 'Big / large', readingType: 'kunyomi' },
      { word: '大学', hiragana: 'だいがく', romaji: 'daigaku', meaning: 'University', readingType: 'onyomi' },
      { word: '大人', hiragana: 'おとな', romaji: 'otona', meaning: 'Adult', readingType: 'irregular' },
      { word: '大切', hiragana: 'たいせつ', romaji: 'taisetsu', meaning: 'Important / precious', readingType: 'onyomi' },
      { word: '大変', hiragana: 'たいへん', romaji: 'taihen', meaning: 'Tough / very / terrible', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: 'このビルはとても大きいです。', hiragana: 'この びるは とても おおきいです。', romaji: 'Kono biru wa totemo ookii desu.', english: 'This building is very large.' },
      { japanese: '家族は私にとって一番大切です。', hiragana: 'かぞくは わたしにとって いちばん たいせつです。', romaji: 'Kazoku wa watashi ni totte ichiban taisetsu desu.', english: 'Family is the most important to me.' }
    ]
  },
  {
    id: 35,
    kanji_number: 35,
    character: '小',
    meaning: 'Small, Little',
    level: 4,
    onyomi_readings: ['ショウ'],
    kunyomi_readings: ['ちいさい', 'こ-', 'お-'],
    onyomi_romaji: ['shou'],
    kunyomi_romaji: ['chiisai', 'ko-', 'o-'],
    hiragana_reading: 'しょう, ちいさい',
    stroke_count: 3,
    radicals: '小 (small)',
    stroke_order_data: { count: 3, directions: ['Center vertical with hook', 'Left small dot stroke', 'Right small dot stroke'] },
    mnemonic: 'A tiny central hook dividing small drops or grains to the left and right.',
    vocabulary: [
      { word: '小さい', hiragana: 'ちいさい', romaji: 'chiisai', meaning: 'Small / little', readingType: 'kunyomi' },
      { word: '小学校', hiragana: 'しょうがっこう', romaji: 'shougakkou', meaning: 'Elementary school', readingType: 'onyomi' },
      { word: '小川', hiragana: 'おがわ', romaji: 'ogawa', meaning: 'Small stream / brook', readingType: 'kunyomi' },
      { word: '小鳥', hiragana: 'ことり', romaji: 'kotori', meaning: 'Little bird', readingType: 'kunyomi' }
    ],
    example_sentences: [
      { japanese: '机の上に小さい花瓶があります。', hiragana: 'つくえの うえに ちいさい かびんが あります。', romaji: 'Tsukue no ue ni chiisai kabin ga arimasu.', english: 'There is a small flower vase on the desk.' },
      { japanese: '庭の木で小鳥が歌っています。', hiragana: 'にわの きで ことりが うたっています。', romaji: 'Niwa no ki de kotori ga utatte imasu.', english: 'A little bird is singing in the garden tree.' }
    ]
  },
  {
    id: 36,
    kanji_number: 36,
    character: '本',
    meaning: 'Book, Origin, Main',
    level: 4,
    onyomi_readings: ['ホン'],
    kunyomi_readings: ['もと'],
    onyomi_romaji: ['hon'],
    kunyomi_romaji: ['moto'],
    hiragana_reading: 'ほん, もと',
    stroke_count: 5,
    radicals: '木 (tree) + 一 (marker)',
    stroke_order_data: { count: 5, directions: ['Horizontal tree branch', 'Vertical tree trunk', 'Left root slant', 'Right root slant', 'Horizontal base origin marker'] },
    mnemonic: 'A tree (木) with a horizontal line marking its roots at the bottom—the origin and source of paper for books.',
    vocabulary: [
      { word: '本', hiragana: 'ほん', romaji: 'hon', meaning: 'Book', readingType: 'onyomi' },
      { word: '日本', hiragana: 'にほん', romaji: 'nihon', meaning: 'Japan (origin of the sun)', readingType: 'onyomi' },
      { word: '本当', hiragana: 'ほんとう', romaji: 'hontou', meaning: 'Truth / real', readingType: 'onyomi' },
      { word: '本屋', hiragana: 'ほんや', romaji: 'honya', meaning: 'Bookstore', readingType: 'onyomi' },
      { word: '一本', hiragana: 'いっぽん', romaji: 'ippon', meaning: 'One long cylindrical object', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '図書館で面白い本を借りました。', hiragana: 'としょかんで おもしろい ほんを かりました。', romaji: 'Toshokan de omoshiroi hon o karimashita.', english: 'I borrowed an interesting book from the library.' },
      { japanese: 'そのニュースは本当ですか。', hiragana: 'その にゅーすは ほんとうですか。', romaji: 'Sono nyuusu wa hontou desu ka.', english: 'Is that news really true?' }
    ]
  },
  {
    id: 37,
    kanji_number: 37,
    character: '半',
    meaning: 'Half, Middle',
    level: 4,
    onyomi_readings: ['ハン'],
    kunyomi_readings: ['なかば'],
    onyomi_romaji: ['han'],
    kunyomi_romaji: ['nakaba'],
    hiragana_reading: 'はん',
    stroke_count: 5,
    radicals: '十 (ten) / 八 (divide)',
    stroke_order_data: { count: 5, directions: ['Top-left dot', 'Top-right dot', 'Upper horizontal line', 'Lower longer horizontal line', 'Center vertical cut line'] },
    mnemonic: 'A vertical cut splitting an object exactly into two equal halves.',
    vocabulary: [
      { word: '半分', hiragana: 'はんぶん', romaji: 'hanbun', meaning: 'Half', readingType: 'onyomi' },
      { word: '一時半', hiragana: 'いちじはん', romaji: 'ichijihan', meaning: 'Half past one (1:30)', readingType: 'onyomi' },
      { word: '半年', hiragana: 'はんとし / はんねん', romaji: 'hantoshi', meaning: 'Half a year', readingType: 'onyomi' },
      { word: '半日', hiragana: 'はんにち', romaji: 'hannichi', meaning: 'Half a day', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: 'リンゴを半分に切って分けました。', hiragana: 'りんごを はんぶんに きって わけました。', romaji: 'Ringo o hanbun ni kitte wakemashita.', english: 'I cut the apple in half and shared it.' },
      { japanese: '映画は七時半に始まります。', hiragana: 'えいがは しちじはんに はじまります。', romaji: 'Eiga wa shichijihan ni hajimarimasu.', english: 'The movie begins at seven-thirty.' }
    ]
  },
  {
    id: 38,
    kanji_number: 38,
    character: '分',
    meaning: 'Part, Minute, Divide, Understand',
    level: 4,
    onyomi_readings: ['ブン', 'フン', 'ブ'],
    kunyomi_readings: ['わける', 'わかる'],
    onyomi_romaji: ['bun', 'fun', 'bu'],
    kunyomi_romaji: ['wakeru', 'wakaru'],
    hiragana_reading: 'ぶん, ふん, わかる',
    stroke_count: 4,
    radicals: '八 (divide) + 刀 (knife)',
    stroke_order_data: { count: 4, directions: ['Top left slant', 'Top right slant', 'Bottom knife horizontal curve', 'Bottom knife hook'] },
    mnemonic: 'Using a sharp blade (刀) to divide (八) something into distinct parts or understand clearly.',
    vocabulary: [
      { word: '五分', hiragana: 'ごふん', romaji: 'gofun', meaning: 'Five minutes', readingType: 'onyomi' },
      { word: '分かる', hiragana: 'わかる', romaji: 'wakaru', meaning: 'To understand', readingType: 'kunyomi' },
      { word: '自分', hiragana: 'じぶん', romaji: 'jibun', meaning: 'Oneself', readingType: 'onyomi' },
      { word: '気分', hiragana: 'きぶん', romaji: 'kibun', meaning: 'Feeling / mood', readingType: 'onyomi' },
      { word: '分ける', hiragana: 'わける', romaji: 'wakeru', meaning: 'To separate / divide', readingType: 'kunyomi' }
    ],
    example_sentences: [
      { japanese: '日本語の文法がよく分かります。', hiragana: 'にほんごの ぶんぽうが よく わかります。', romaji: 'Nihongo no bunpou ga yoku wakarimasu.', english: 'I understand Japanese grammar well.' },
      { japanese: 'あと十分で電車が到着します。', hiragana: 'あと じゅっぷんで でんしゃが とうちゃくします。', romaji: 'Ato juppun de densha ga touchaku shimasu.', english: 'The train will arrive in ten minutes.' }
    ]
  },
  {
    id: 39,
    kanji_number: 39,
    character: '先',
    meaning: 'Previous, Ahead, Future',
    level: 4,
    onyomi_readings: ['セン'],
    kunyomi_readings: ['さき'],
    onyomi_romaji: ['sen'],
    kunyomi_romaji: ['saki'],
    hiragana_reading: 'せん, さき',
    stroke_count: 6,
    radicals: '儿 (legs) / 𠂉',
    stroke_order_data: { count: 6, directions: ['Top slant', 'Upper horizontal', 'Center vertical', 'Lower longer horizontal', 'Left leg curve', 'Right leg hook'] },
    mnemonic: 'Legs walking ahead in front of everyone else, reaching ahead first.',
    vocabulary: [
      { word: '先生', hiragana: 'せんせい', romaji: 'sensei', meaning: 'Teacher / instructor', readingType: 'onyomi' },
      { word: '先週', hiragana: 'せんしゅう', romaji: 'senshuu', meaning: 'Last week', readingType: 'onyomi' },
      { word: '先月', hiragana: 'せんげつ', romaji: 'sengetsu', meaning: 'Last month', readingType: 'onyomi' },
      { word: 'お先に', hiragana: 'おさきに', romaji: 'osakini', meaning: 'Ahead of you / before', readingType: 'kunyomi' }
    ],
    example_sentences: [
      { japanese: '田中先生はとても優しいです。', hiragana: 'たなかせんせいは とても やさしいです。', romaji: 'Tanaka-sensei wa totemo yasashii desu.', english: 'Tanaka-sensei is very kind.' },
      { japanese: '先週友達と京都へ旅行しました。', hiragana: 'せんしゅう ともだちと きょうとへ りょこうしました。', romaji: 'Senshuu tomodachi to Kyouto e ryokou shimashita.', english: 'Last week I traveled to Kyoto with a friend.' }
    ]
  },
  {
    id: 40,
    kanji_number: 40,
    character: '生',
    meaning: 'Life, Birth, Be Born, Raw',
    level: 4,
    onyomi_readings: ['セイ', 'ショウ'],
    kunyomi_readings: ['いきる', 'うまれる', 'なま'],
    onyomi_romaji: ['sei', 'shou'],
    kunyomi_romaji: ['ikiru', 'umareru', 'nama'],
    hiragana_reading: 'せい, うまれる, なま',
    stroke_count: 5,
    radicals: '生 (life)',
    stroke_order_data: { count: 5, directions: ['Left slant', 'Upper horizontal', 'Center vertical stem', 'Middle horizontal', 'Bottom foundation horizontal'] },
    mnemonic: 'A green plant sprout bursting forth with vibrant life from the ground.',
    vocabulary: [
      { word: '学生', hiragana: 'がくせい', romaji: 'gakusei', meaning: 'Student', readingType: 'onyomi' },
      { word: '生活', hiragana: 'せいかつ', romaji: 'seikatsu', meaning: 'Daily life / living', readingType: 'onyomi' },
      { word: '誕生日', hiragana: 'たんじょうび', romaji: 'tanjoubi', meaning: 'Birthday', readingType: 'onyomi' },
      { word: '生まれる', hiragana: 'うまれる', romaji: 'umareru', meaning: 'To be born', readingType: 'kunyomi' },
      { word: '生ビール', hiragana: 'なまびーる', romaji: 'namabiiru', meaning: 'Draft beer', readingType: 'kunyomi' }
    ],
    example_sentences: [
      { japanese: '私は東京の大学の学生です。', hiragana: 'わたしは とうきょうの だいがくの がくせいです。', romaji: 'Watashi wa Toukyou no daigaku no gakusei desu.', english: 'I am a student at a university in Tokyo.' },
      { japanese: '来週の月曜日は私の誕生日です。', hiragana: 'らいしゅうの げつようびは わたしの たんじょうびです。', romaji: 'Raishuu no getsuyoubi wa watashi no tanjoubi desu.', english: 'Next Monday is my birthday.' }
    ]
  },

  // LEVEL 5: Time, Intervals & Routine (Kanji 41 - 50)
  {
    id: 41,
    kanji_number: 41,
    character: '年',
    meaning: 'Year, Age',
    level: 5,
    onyomi_readings: ['ネン'],
    kunyomi_readings: ['とし'],
    onyomi_romaji: ['nen'],
    kunyomi_romaji: ['toshi'],
    hiragana_reading: 'ねん, とし',
    stroke_count: 6,
    radicals: '干 (dry)',
    stroke_order_data: { count: 6, directions: ['Left slant', 'Upper horizontal', 'Left short vertical', 'Middle horizontal', 'Bottom long horizontal', 'Center vertical down'] },
    mnemonic: 'A yearly harvest bundle tied together and harvested each year.',
    vocabulary: [
      { word: '今年', hiragana: 'ことし', romaji: 'kotoshi', meaning: 'This year', readingType: 'irregular' },
      { word: '来年', hiragana: 'らいねん', romaji: 'rainen', meaning: 'Next year', readingType: 'onyomi' },
      { word: '去年', hiragana: 'きょねん', romaji: 'kyonen', meaning: 'Last year', readingType: 'onyomi' },
      { word: '毎年', hiragana: 'まいとし / まいねん', romaji: 'maitoshi', meaning: 'Every year', readingType: 'kunyomi' },
      { word: '年齢', hiragana: 'ねんれい', romaji: 'nenrei', meaning: 'Age', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '今年、日本語能力試験N5に合格したいです。', hiragana: 'ことし、にほんごのうりょくしけん えぬごに ごうかくしたいです。', romaji: 'Kotoshi, Nihongo Nouryoku Shiken N5 ni goukaku shitai desu.', english: 'I want to pass the JLPT N5 this year.' },
      { japanese: '来年日本へ旅行に行きます。', hiragana: 'らいねん にほんへ りょこうに いきます。', romaji: 'Rainen Nihon e ryokou ni ikimasu.', english: 'I am going to travel to Japan next year.' }
    ]
  },
  {
    id: 42,
    kanji_number: 42,
    character: '今',
    meaning: 'Now, Present',
    level: 5,
    onyomi_readings: ['コン', 'キン'],
    kunyomi_readings: ['いま'],
    onyomi_romaji: ['kon', 'kin'],
    kunyomi_romaji: ['ima'],
    hiragana_reading: 'こん, いま',
    stroke_count: 4,
    radicals: '人 (person) / 亼 (gather)',
    stroke_order_data: { count: 4, directions: ['Top roof left slant', 'Top roof right slant', 'Inner horizontal stroke', 'Lower curved horizontal hook'] },
    mnemonic: 'A roof clock sheltering the exact current moment: NOW.',
    vocabulary: [
      { word: '今', hiragana: 'いま', romaji: 'ima', meaning: 'Now', readingType: 'kunyomi' },
      { word: '今日', hiragana: 'きょう', romaji: 'kyou', meaning: 'Today', readingType: 'irregular' },
      { word: '今週', hiragana: 'こんしゅう', romaji: 'konshuu', meaning: 'This week', readingType: 'onyomi' },
      { word: '今晩', hiragana: 'こんばん', romaji: 'konban', meaning: 'Tonight', readingType: 'onyomi' },
      { word: '今朝', hiragana: 'けさ', romaji: 'kesa', meaning: 'This morning', readingType: 'irregular' }
    ],
    example_sentences: [
      { japanese: '今、何時ですか。', hiragana: 'いま、なんじですか。', romaji: 'Ima, nan-ji desu ka.', english: 'What time is it now?' },
      { japanese: '今晩、一緒にラーメンを食べませんか。', hiragana: 'こんばん、いっしょに らーめんを たべませんか。', romaji: 'Konban, isshoni raamen o tabemasen ka.', english: 'Would you like to eat ramen together tonight?' }
    ]
  },
  {
    id: 43,
    kanji_number: 43,
    character: '毎',
    meaning: 'Every, Each',
    level: 5,
    onyomi_readings: ['マイ'],
    kunyomi_readings: ['ごと'],
    onyomi_romaji: ['mai'],
    kunyomi_romaji: ['goto'],
    hiragana_reading: 'まい',
    stroke_count: 6,
    radicals: '母 (mother) / 𠂉',
    stroke_order_data: { count: 6, directions: ['Top slant', 'Horizontal bar', 'Mother radical frame', 'Middle horizontal', 'Two inner dots'] },
    mnemonic: 'A devoted mother who prepares meals every single day with love.',
    vocabulary: [
      { word: '毎日', hiragana: 'まいにち', romaji: 'mainichi', meaning: 'Every day', readingType: 'onyomi' },
      { word: '毎週', hiragana: 'まいしゅう', romaji: 'maishuu', meaning: 'Every week', readingType: 'onyomi' },
      { word: '毎月', hiragana: 'まいつき / まいげつ', romaji: 'maitsuki', meaning: 'Every month', readingType: 'kunyomi' },
      { word: '毎朝', hiragana: 'まいあさ', romaji: 'maiasa', meaning: 'Every morning', readingType: 'kunyomi' },
      { word: '毎晩', hiragana: 'まいばん', romaji: 'maiban', meaning: 'Every night', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '毎日漢字を勉強しています。', hiragana: 'まいにち かんじを べんきょうしています。', romaji: 'Mainichi kanji o benkyou shite imasu.', english: 'I study kanji every day.' },
      { japanese: '毎朝コーヒーを一杯飲みます。', hiragana: 'まいあさ こーひーを いっぱい のみます。', romaji: 'Maiasa koohii o ippai nomimasu.', english: 'I drink a cup of coffee every morning.' }
    ]
  },
  {
    id: 44,
    kanji_number: 44,
    character: '何',
    meaning: 'What, How Many',
    level: 5,
    onyomi_readings: ['カ'],
    kunyomi_readings: ['なに', 'なん'],
    onyomi_romaji: ['ka'],
    kunyomi_romaji: ['nani', 'nan'],
    hiragana_reading: 'なに, なん',
    stroke_count: 7,
    radicals: '亻 (person) + 可 (can/possible)',
    stroke_order_data: { count: 7, directions: ['Person radical 亻 (2 strokes)', 'Top horizontal', 'Inner mouth 口 (3 strokes)', 'Right vertical hook'] },
    mnemonic: 'A person carrying a curious question on a backpack asking: "WHAT is this?"',
    vocabulary: [
      { word: '何', hiragana: 'なに / なん', romaji: 'nani / nan', meaning: 'What', readingType: 'kunyomi' },
      { word: '何時', hiragana: 'なんじ', romaji: 'nanji', meaning: 'What time', readingType: 'kunyomi' },
      { word: '何人', hiragana: 'なんにん', romaji: 'nannin', meaning: 'How many people', readingType: 'kunyomi' },
      { word: '何か', hiragana: 'なにか', romaji: 'nanika', meaning: 'Something', readingType: 'kunyomi' },
      { word: '何度', hiragana: 'なんど', romaji: 'nando', meaning: 'How many times / what temperature', readingType: 'kunyomi' }
    ],
    example_sentences: [
      { japanese: 'お昼ご飯に何を食べましたか。', hiragana: 'おひるごはんに なにを たべましたか。', romaji: 'Ohirugohan ni nani o tabemashita ka.', english: 'What did you eat for lunch?' },
      { japanese: '明日の会議は何時からですか。', hiragana: 'あしたの かいぎは なんじからですか。', romaji: 'Ashita no kaigi wa nanji kara desu ka.', english: 'What time does tomorrow\'s meeting start?' }
    ]
  },
  {
    id: 45,
    kanji_number: 45,
    character: '時',
    meaning: 'Time, Hour',
    level: 5,
    onyomi_readings: ['ジ'],
    kunyomi_readings: ['とき'],
    onyomi_romaji: ['ji'],
    kunyomi_romaji: ['toki'],
    hiragana_reading: 'じ, とき',
    stroke_count: 10,
    radicals: '日 (sun) + 寺 (temple)',
    stroke_order_data: { count: 10, directions: ['Left sun 日 (4 strokes)', 'Right temple 寺 (6 strokes)'] },
    mnemonic: 'Watching the sun (日) pass over the Buddhist temple (寺) to measure the hour and time.',
    vocabulary: [
      { word: '時', hiragana: 'とき', romaji: 'toki', meaning: 'Time / when', readingType: 'kunyomi' },
      { word: '時間', hiragana: 'じかん', romaji: 'jikan', meaning: 'Time / hours', readingType: 'onyomi' },
      { word: '時計', hiragana: 'とけい', romaji: 'tokei', meaning: 'Watch / clock', readingType: 'onyomi' },
      { word: '一時', hiragana: 'いちじ', romaji: 'ichiji', meaning: 'One o\'clock', readingType: 'onyomi' },
      { word: '時々', hiragana: 'ときどき', romaji: 'tokidoki', meaning: 'Sometimes', readingType: 'kunyomi' }
    ],
    example_sentences: [
      { japanese: '今は勉強する時間です。', hiragana: 'いまは べんきょうする じかんです。', romaji: 'Ima wa benkyou suru jikan desu.', english: 'Now is the time to study.' },
      { japanese: '子供の時、よくこの公園で遊びました。', hiragana: 'こどもの とき、よく この こうえんで あそびました。', romaji: 'Kodomo no toki, yoku kono kouen de asobimashita.', english: 'When I was a child, I often played in this park.' }
    ]
  },
  {
    id: 46,
    kanji_number: 46,
    character: '間',
    meaning: 'Interval, Space, Between',
    level: 5,
    onyomi_readings: ['カン', 'ケン'],
    kunyomi_readings: ['あいだ', 'ま'],
    onyomi_romaji: ['kan', 'ken'],
    kunyomi_romaji: ['aida', 'ma'],
    hiragana_reading: 'かん, あいだ',
    stroke_count: 12,
    radicals: '門 (gate) + 日 (sun)',
    stroke_order_data: { count: 12, directions: ['Gate 門 outer frame (8 strokes)', 'Inner sun 日 (4 strokes)'] },
    mnemonic: 'The sunlight (日) peeking through the narrow gap between double gates (門).',
    vocabulary: [
      { word: '間', hiragana: 'あいだ', romaji: 'aida', meaning: 'Between / space', readingType: 'kunyomi' },
      { word: '時間', hiragana: 'じかん', romaji: 'jikan', meaning: 'Time', readingType: 'onyomi' },
      { word: '間に合う', hiragana: 'まにあう', romaji: 'maniau', meaning: 'To be on time', readingType: 'kunyomi' },
      { word: '一週間', hiragana: 'いっしゅうかん', romaji: 'isshuukan', meaning: 'For one week', readingType: 'onyomi' },
      { word: '人間', hiragana: 'にんげん', romaji: 'ningen', meaning: 'Human being', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '駅と学校の間にコンビニがあります。', hiragana: 'えきと がっこうの あいだに こんばにが あります。', romaji: 'Eki to gakkou no aida ni konbini ga arimasu.', english: 'There is a convenience store between the station and school.' },
      { japanese: '急げば電車に間に合います。', hiragana: 'いそげば でんしゃに まにあいます。', romaji: 'Isogeba densha ni maniaimasu.', english: 'If we hurry, we will be on time for the train.' }
    ]
  },
  {
    id: 47,
    kanji_number: 47,
    character: '午',
    meaning: 'Noon, Sign of the Horse',
    level: 5,
    onyomi_readings: ['ゴ'],
    kunyomi_readings: [],
    onyomi_romaji: ['go'],
    kunyomi_romaji: [],
    hiragana_reading: 'ご',
    stroke_count: 4,
    radicals: '十 (ten) / 𠂉',
    stroke_order_data: { count: 4, directions: ['Left slant', 'Upper horizontal', 'Lower longer horizontal', 'Vertical stroke through center without extending above'] },
    mnemonic: 'The sundial rod aligned vertically at exact noon (12:00).',
    vocabulary: [
      { word: '午前', hiragana: 'ごぜん', romaji: 'gozen', meaning: 'A.M. / morning', readingType: 'onyomi' },
      { word: '午後', hiragana: 'ごご', romaji: 'gogo', meaning: 'P.M. / afternoon', readingType: 'onyomi' },
      { word: '正午', hiragana: 'しょうご', romaji: 'shougo', meaning: 'High noon', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '午前九時に事務所へ来てください。', hiragana: 'ごぜん くじに じむしょへ きてください。', romaji: 'Gozen ku-ji ni jimusho e kite kudasai.', english: 'Please come to the office at 9:00 AM.' },
      { japanese: '午後は雨が降る予報です。', hiragana: 'ごごは あめが ふる よほうです。', romaji: 'Gogo wa ame ga furu yohou desu.', english: 'Rain is forecast for the afternoon.' }
    ]
  },
  {
    id: 48,
    kanji_number: 48,
    character: '前',
    meaning: 'Before, Front, In Advance',
    level: 5,
    onyomi_readings: ['ゼン'],
    kunyomi_readings: ['まえ'],
    onyomi_romaji: ['zen'],
    kunyomi_romaji: ['mae'],
    hiragana_reading: 'ぜん, まえ',
    stroke_count: 9,
    radicals: '刀 (knife) / 刂',
    stroke_order_data: { count: 9, directions: ['Top horns (2 strokes)', 'Middle horizontal', 'Left moon frame (4 strokes)', 'Right knife 刂 (2 strokes)'] },
    mnemonic: 'Stepping forward boldly with boots and equipment in front of everyone.',
    vocabulary: [
      { word: '前', hiragana: 'まえ', romaji: 'mae', meaning: 'In front / before', readingType: 'kunyomi' },
      { word: '午前', hiragana: 'ごぜん', romaji: 'gozen', meaning: 'Morning / A.M.', readingType: 'onyomi' },
      { word: '名前', hiragana: 'なまえ', romaji: 'namae', meaning: 'Name', readingType: 'kunyomi' },
      { word: '駅前', hiragana: 'えきまえ', romaji: 'ekimae', meaning: 'In front of station', readingType: 'kunyomi' },
      { word: '前半', hiragana: 'ぜんはん', romaji: 'zenhan', meaning: 'First half', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '駅の前で友達を待ちました。', hiragana: 'えきの まえで ともだちを まちました。', romaji: 'Eki no mae de tomodachi o machimashita.', english: 'I waited for my friend in front of the station.' },
      { japanese: 'お名前をここに書いてください。', hiragana: 'おなまえを ここに かいてください。', romaji: 'Onamae o koko ni kaite kudasai.', english: 'Please write your name here.' }
    ]
  },
  {
    id: 49,
    kanji_number: 49,
    character: '後',
    meaning: 'After, Behind, Later',
    level: 5,
    onyomi_readings: ['ゴ', 'コウ'],
    kunyomi_readings: ['のち', 'うしろ', 'あと'],
    onyomi_romaji: ['go', 'kou'],
    kunyomi_romaji: ['nochi', 'ushiro', 'ato'],
    hiragana_reading: 'ご, あと, うしろ',
    stroke_count: 9,
    radicals: '彳 (step) + 幺 (short) + 夂 (follow)',
    stroke_order_data: { count: 9, directions: ['Left step 彳 (3 strokes)', 'Top right cocoon 幺 (3 strokes)', 'Bottom right walking legs 夂 (3 strokes)'] },
    mnemonic: 'Walking step by step (彳) behind someone, following after them.',
    vocabulary: [
      { word: '午後', hiragana: 'ごご', romaji: 'gogo', meaning: 'Afternoon / P.M.', readingType: 'onyomi' },
      { word: '後ろ', hiragana: 'うしろ', romaji: 'ushiro', meaning: 'Behind / back', readingType: 'kunyomi' },
      { word: '後で', hiragana: 'あとで', romaji: 'atode', meaning: 'Later', readingType: 'kunyomi' },
      { word: '最後', hiragana: 'さいご', romaji: 'saigo', meaning: 'Last / final', readingType: 'onyomi' },
      { word: '後半', hiragana: 'こうはん', romaji: 'kouhan', meaning: 'Second half', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '仕事の後にジムへ行きます。', hiragana: 'しごとの あとに じむへ いきます。', romaji: 'Shigoto no ato ni jimu e ikimasu.', english: 'I go to the gym after work.' },
      { japanese: '後ろを振り返ると誰もいませんでした。', hiragana: 'うしろを ふりかえると だれも いませんでした。', romaji: 'Ushiro o furikaeru to dare mo imasen deshita.', english: 'When I looked behind, nobody was there.' }
    ]
  },
  {
    id: 50,
    kanji_number: 50,
    character: '朝',
    meaning: 'Morning, Dynasty',
    level: 5,
    onyomi_readings: ['チョウ'],
    kunyomi_readings: ['あさ'],
    onyomi_romaji: ['chou'],
    kunyomi_romaji: ['asa'],
    hiragana_reading: 'ちょう, あさ',
    stroke_count: 12,
    radicals: '十 (sun/cross) + 日 (sun) + 月 (moon)',
    stroke_order_data: { count: 12, directions: ['Left component: cross, sun, cross (8 strokes)', 'Right moon 月 (4 strokes)'] },
    mnemonic: 'The morning sun rising through the grass while the pale moon still lingers in the sky.',
    vocabulary: [
      { word: '朝', hiragana: 'あさ', romaji: 'asa', meaning: 'Morning', readingType: 'kunyomi' },
      { word: '朝ご飯', hiragana: 'あさごはん', romaji: 'asagohan', meaning: 'Breakfast', readingType: 'kunyomi' },
      { word: '今朝', hiragana: 'けさ', romaji: 'kesa', meaning: 'This morning', readingType: 'irregular' },
      { word: '毎朝', hiragana: 'まいあさ', romaji: 'maiasa', meaning: 'Every morning', readingType: 'kunyomi' },
      { word: '朝食', hiragana: 'ちょうしょく', romaji: 'choushoku', meaning: 'Breakfast (formal)', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '朝の空気はとても澄んでいて気持ちがいいです。', hiragana: 'あさの くうきは とても すんでいて きもちがいいです。', romaji: 'Asa no kuuki wa totemo sunde ite kimochi ga ii desu.', english: 'The morning air is crisp and feels great.' },
      { japanese: '今朝は早く起きて散歩をしました。', hiragana: 'けさは はやく おきて さんぽを しました。', romaji: 'Kesa wa hayaku okite sanpo o shimashita.', english: 'This morning I woke up early and took a walk.' }
    ]
  },

  // LEVEL 6: Directions, School & Basics (Kanji 51 - 60)
  {
    id: 51,
    kanji_number: 51,
    character: '昼',
    meaning: 'Daytime, Noon',
    level: 6,
    onyomi_readings: ['チュウ'],
    kunyomi_readings: ['ひる'],
    onyomi_romaji: ['chuu'],
    kunyomi_romaji: ['hiru'],
    hiragana_reading: 'ちゅう, ひる',
    stroke_count: 9,
    radicals: '日 (sun)',
    stroke_order_data: { count: 9, directions: ['Top brush roof strokes (5 strokes)', 'Bottom sun 日 (4 strokes)'] },
    mnemonic: 'The bright midday sun high above the roof during daytime.',
    vocabulary: [
      { word: '昼', hiragana: 'ひる', romaji: 'hiru', meaning: 'Daytime / midday', readingType: 'kunyomi' },
      { word: '昼ご飯', hiragana: 'ひるごはん', romaji: 'hirugohan', meaning: 'Lunch', readingType: 'kunyomi' },
      { word: '昼休み', hiragana: 'ひるやすみ', romaji: 'hiruyasumi', meaning: 'Lunch break', readingType: 'kunyomi' },
      { word: '昼食', hiragana: 'ちゅうしょく', romaji: 'chuushoku', meaning: 'Lunch (formal)', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '昼休みに同僚とランチを食べます。', hiragana: 'ひるやすみに どうりょうと らんちを たべます。', romaji: 'Hiruyasumi ni douryou to ranchi o tabemasu.', english: 'I eat lunch with my coworkers during lunch break.' },
      { japanese: '昼頃に荷物が届く予定です。', hiragana: 'ひるごろに にもつが とどく よていです。', romaji: 'Hirugoro ni nimotsu ga todoku yotei desu.', english: 'The package is scheduled to arrive around noon.' }
    ]
  },
  {
    id: 52,
    kanji_number: 52,
    character: '夜',
    meaning: 'Night, Evening',
    level: 6,
    onyomi_readings: ['ヤ'],
    kunyomi_readings: ['よる', 'よ'],
    onyomi_romaji: ['ya'],
    kunyomi_romaji: ['yoru', 'yo'],
    hiragana_reading: 'や, よる',
    stroke_count: 8,
    radicals: '夕 (evening) / 亠',
    stroke_order_data: { count: 8, directions: ['Top lid 亠 (2 strokes)', 'Left person 亻 (2 strokes)', 'Right evening 夕 (3 strokes)', 'Right leg slant (1 stroke)'] },
    mnemonic: 'A person walking home under the crescent moon in the night sky.',
    vocabulary: [
      { word: '夜', hiragana: 'よる', romaji: 'yoru', meaning: 'Night', readingType: 'kunyomi' },
      { word: '夜ご飯', hiragana: 'よるごはん', romaji: 'yorugohan', meaning: 'Dinner', readingType: 'kunyomi' },
      { word: '今夜', hiragana: 'こんや', romaji: 'konya', meaning: 'Tonight', readingType: 'onyomi' },
      { word: '夜中', hiragana: 'よなか', romaji: 'yonaka', meaning: 'Middle of the night', readingType: 'kunyomi' },
      { word: '夜景', hiragana: 'やけい', romaji: 'yakei', meaning: 'Night view', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '夜十一時にベッドに入ります。', hiragana: 'よる じゅういちじに べっどに はいります。', romaji: 'Yoru juuichi-ji ni beddo ni hairimasu.', english: 'I get into bed at 11 PM.' },
      { japanese: '今夜は星が綺麗に見えます。', hiragana: 'こんやは ほしが きれいに みえます。', romaji: 'Konya wa hoshi ga kirei ni miemasu.', english: 'The stars look beautiful tonight.' }
    ]
  },
  {
    id: 53,
    kanji_number: 53,
    character: '東',
    meaning: 'East',
    level: 6,
    onyomi_readings: ['トウ'],
    kunyomi_readings: ['ひがし'],
    onyomi_romaji: ['tou'],
    kunyomi_romaji: ['higashi'],
    hiragana_reading: 'とう, ひがし',
    stroke_count: 8,
    radicals: '木 (tree) + 日 (sun)',
    stroke_order_data: { count: 8, directions: ['Top horizontal', 'Sun 日 component (4 strokes)', 'Tree horizontal and legs (3 strokes)'] },
    mnemonic: 'The bright sun (日) rising through the branches of a tree (木) in the EAST.',
    vocabulary: [
      { word: '東', hiragana: 'ひがし', romaji: 'higashi', meaning: 'East', readingType: 'kunyomi' },
      { word: '東京', hiragana: 'とうきょう', romaji: 'toukyou', meaning: 'Tokyo (Eastern Capital)', readingType: 'onyomi' },
      { word: '東口', hiragana: 'ひがしぐち', romaji: 'higashiguchi', meaning: 'East exit', readingType: 'kunyomi' },
      { word: '中東', hiragana: 'ちゅうとう', romaji: 'chuutou', meaning: 'Middle East', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '太陽は東の空から昇ります。', hiragana: 'たいようは ひがしの そらから のぼります。', romaji: 'Taiyou wa higashi no sora kara noborimasu.', english: 'The sun rises in the eastern sky.' },
      { japanese: '東京には観光地がたくさんあります。', hiragana: 'とうきょうには かんこうちが たくさん あります。', romaji: 'Toukyou ni wa kankouchi ga takusan arimasu.', english: 'Tokyo has many sightseeing spots.' }
    ]
  },
  {
    id: 54,
    kanji_number: 54,
    character: '西',
    meaning: 'West',
    level: 6,
    onyomi_readings: ['セイ', 'サイ'],
    kunyomi_readings: ['にし'],
    onyomi_romaji: ['sei', 'sai'],
    kunyomi_romaji: ['nishi'],
    hiragana_reading: 'せい, にし',
    stroke_count: 6,
    radicals: '西 (west)',
    stroke_order_data: { count: 6, directions: ['Top horizontal', 'Left vertical', 'Top-right corner', 'Inner vertical', 'Inner curved slant', 'Bottom closing base'] },
    mnemonic: 'A bird sitting in its cozy nest settling down as the sun sets in the WEST.',
    vocabulary: [
      { word: '西', hiragana: 'にし', romaji: 'nishi', meaning: 'West', readingType: 'kunyomi' },
      { word: '西口', hiragana: 'にしぐち', romaji: 'nishiguchi', meaning: 'West exit', readingType: 'kunyomi' },
      { word: '東西', hiragana: 'とうざい', romaji: 'touzai', meaning: 'East and west', readingType: 'onyomi' },
      { word: '西洋', hiragana: 'せいよう', romaji: 'seiyou', meaning: 'The West / Western countries', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '夕日が西の空を赤く染めました。', hiragana: 'ゆうひが にしの そらを あかく そめました。', romaji: 'Yuuhi ga nishi no sora o akaku somemashita.', english: 'The setting sun dyed the western sky red.' },
      { japanese: '駅の西口で待ち合わせをします。', hiragana: 'えきの にしぐちで まちあわせを します。', romaji: 'Eki no nishiguchi de machiawase o shimasu.', english: 'We will meet at the west exit of the station.' }
    ]
  },
  {
    id: 55,
    kanji_number: 55,
    character: '南',
    meaning: 'South',
    level: 6,
    onyomi_readings: ['ナン'],
    kunyomi_readings: ['みなみ'],
    onyomi_romaji: ['nan'],
    kunyomi_romaji: ['minami'],
    hiragana_reading: 'なん, みなみ',
    stroke_count: 9,
    radicals: '十 (ten) / 冂 (box)',
    stroke_order_data: { count: 9, directions: ['Top cross 十 (2 strokes)', 'Outer frame 冂 (2 strokes)', 'Inner two vertical horns and cross (5 strokes)'] },
    mnemonic: 'A sunny southern bell or gazebo welcoming the warm southern breeze.',
    vocabulary: [
      { word: '南', hiragana: 'みなみ', romaji: 'minami', meaning: 'South', readingType: 'kunyomi' },
      { word: '南口', hiragana: 'みなみぐち', romaji: 'minamiguchi', meaning: 'South exit', readingType: 'kunyomi' },
      { word: '南米', hiragana: 'なんべい', romaji: 'nanbei', meaning: 'South America', readingType: 'onyomi' },
      { word: '東南アジア', hiragana: 'とうなんあじあ', romaji: 'tounan ajia', meaning: 'Southeast Asia', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '南の島へバカンスに行きたいです。', hiragana: 'みなみの しまへ ばかんすに いきたいです。', romaji: 'Minami no shima e bakansu ni ikitai desu.', english: 'I want to go to a southern island for vacation.' },
      { japanese: '南向きの部屋は日当たりがとても良いです。', hiragana: 'みなみむきの へやは ひあたりが とても いいです。', romaji: 'Minamimuki no heya wa hiatari ga totemo ii desu.', english: 'The south-facing room has great sunlight.' }
    ]
  },
  {
    id: 56,
    kanji_number: 56,
    character: '北',
    meaning: 'North',
    level: 6,
    onyomi_readings: ['ホク'],
    kunyomi_readings: ['きた'],
    onyomi_romaji: ['hoku'],
    kunyomi_romaji: ['kita'],
    hiragana_reading: 'ほく, きた',
    stroke_count: 5,
    radicals: '匕 (spoon) / 北 (north)',
    stroke_order_data: { count: 5, directions: ['Left vertical stroke', 'Left horizontal rising', 'Left slant down', 'Right vertical with hook', 'Right spoon stroke'] },
    mnemonic: 'Two people sitting back-to-back shivering against the freezing NORTH wind.',
    vocabulary: [
      { word: '北', hiragana: 'きた', romaji: 'kita', meaning: 'North', readingType: 'kunyomi' },
      { word: '北海道', hiragana: 'ほっかいどう', romaji: 'hokkaidou', meaning: 'Hokkaido', readingType: 'onyomi' },
      { word: '北口', hiragana: 'きたぐち', romaji: 'kitaguchi', meaning: 'North exit', readingType: 'kunyomi' },
      { word: '南北', hiragana: 'なんぼく', romaji: 'nanboku', meaning: 'South and north', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '冬に北海道へスキーに行きました。', hiragana: 'ふゆに ほっかいどうへ すきーに いきました。', romaji: 'Fuyu ni Hokkaidou e sukii ni ikimashita.', english: 'I went skiing in Hokkaido in winter.' },
      { japanese: '北風が冷たく吹いています。', hiragana: 'きたかぜが つめたく ふいています。', romaji: 'Kitakaze ga tsumetaku fuite imasu.', english: 'A cold northern wind is blowing.' }
    ]
  },
  {
    id: 57,
    kanji_number: 57,
    character: '学',
    meaning: 'Study, Learn, Science',
    level: 6,
    onyomi_readings: ['ガク'],
    kunyomi_readings: ['まなぶ'],
    onyomi_romaji: ['gaku'],
    kunyomi_romaji: ['manabu'],
    hiragana_reading: 'がく, まなぶ',
    stroke_count: 8,
    radicals: '子 (child) + 宀 (roof)',
    stroke_order_data: { count: 8, directions: ['Three top sparks (3 strokes)', 'Roof 宀 (2 strokes)', 'Child 子 (3 strokes)'] },
    mnemonic: 'A child (子) studying under the school roof (宀) with ideas sparking overhead.',
    vocabulary: [
      { word: '学生', hiragana: 'がくせい', romaji: 'gakusei', meaning: 'Student', readingType: 'onyomi' },
      { word: '学校', hiragana: 'がっこう', romaji: 'gakkou', meaning: 'School', readingType: 'onyomi' },
      { word: '大学', hiragana: 'だいがく', romaji: 'daigaku', meaning: 'University', readingType: 'onyomi' },
      { word: '学ぶ', hiragana: 'まなぶ', romaji: 'manabu', meaning: 'To learn / study', readingType: 'kunyomi' },
      { word: '文学', hiragana: 'ぶんがく', romaji: 'bungaku', meaning: 'Literature', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '新しい言語を学ぶのは楽しいです。', hiragana: 'あたらしい げんごを まなぶのは たのしいです。', romaji: 'Atarashii gengo o manabu no wa tanoshii desu.', english: 'Learning a new language is enjoyable.' },
      { japanese: '多くの留学生が日本で学んでいます。', hiragana: 'おおくの りゅうがくせいが にほんで まなんでいます。', romaji: 'Ooku no ryuugakusei ga Nihon de manande imasu.', english: 'Many international students are studying in Japan.' }
    ]
  },
  {
    id: 58,
    kanji_number: 58,
    character: '校',
    meaning: 'School, Exam, Proof',
    level: 6,
    onyomi_readings: ['コウ'],
    kunyomi_readings: [],
    onyomi_romaji: ['kou'],
    kunyomi_romaji: [],
    hiragana_reading: 'こう',
    stroke_count: 10,
    radicals: '木 (tree) + 交 (mingle)',
    stroke_order_data: { count: 10, directions: ['Left tree 木 (4 strokes)', 'Right mingle 交 (6 strokes)'] },
    mnemonic: 'A wooden school building (木) where students exchange knowledge and socialize (交).',
    vocabulary: [
      { word: '学校', hiragana: 'がっこう', romaji: 'gakkou', meaning: 'School', readingType: 'onyomi' },
      { word: '高校', hiragana: 'こうこう', romaji: 'koukou', meaning: 'High school', readingType: 'onyomi' },
      { word: '校長', hiragana: 'こうちょう', romaji: 'kouchou', meaning: 'Principal / headmaster', readingType: 'onyomi' },
      { word: '中学校', hiragana: 'ちゅうがっこう', romaji: 'chuugakkou', meaning: 'Junior high school', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '毎朝歩いて学校に通っています。', hiragana: 'まいあさ あるいて がっこうに かよっています。', romaji: 'Maiasa aruite gakkou ni kayotte imasu.', english: 'I commute on foot to school every morning.' },
      { japanese: '私の高校は緑が豊かで静かです。', hiragana: 'わたしの こうこうは みどりが ゆたかで しずかです。', romaji: 'Watashi no koukou wa midori ga yutaka de shizuka desu.', english: 'My high school has abundant greenery and is quiet.' }
    ]
  },
  {
    id: 59,
    kanji_number: 59,
    character: '名',
    meaning: 'Name, Reputation',
    level: 6,
    onyomi_readings: ['メイ', 'ミョウ'],
    kunyomi_readings: ['な'],
    onyomi_romaji: ['mei', 'myou'],
    kunyomi_romaji: ['na'],
    hiragana_reading: 'めい, な',
    stroke_count: 6,
    radicals: '夕 (evening) + 口 (mouth)',
    stroke_order_data: { count: 6, directions: ['Top-left evening 夕 (3 strokes)', 'Bottom-right mouth 口 (3 strokes)'] },
    mnemonic: 'In the evening darkness (夕), you must call out your name with your mouth (口) so people recognize you.',
    vocabulary: [
      { word: '名前', hiragana: 'なまえ', romaji: 'namae', meaning: 'Name', readingType: 'kunyomi' },
      { word: '有名', hiragana: 'ゆうめい', romaji: 'yuumei', meaning: 'Famous', readingType: 'onyomi' },
      { word: '名刺', hiragana: 'めいし', romaji: 'meishi', meaning: 'Business card', readingType: 'onyomi' },
      { word: '苗字', hiragana: 'みょうじ', romaji: 'myouji', meaning: 'Surname / family name', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '京都は歴史的な神社で有名です。', hiragana: 'きょうとは れきしてきな じんじゃで ゆうめいです。', romaji: 'Kyouto wa rekishiteki na jinja de yuumei desu.', english: 'Kyoto is famous for its historic shrines.' },
      { japanese: 'ビジネスで初対面の人と名刺を交換しました。', hiragana: 'びじねすで しょたいめんの ひとと めいしを こうかんしました。', romaji: 'Bijinesu de shotaimen no hito to meishi o koukan shimashita.', english: 'I exchanged business cards with someone I met for the first time in business.' }
    ]
  },
  {
    id: 60,
    kanji_number: 60,
    character: '白',
    meaning: 'White',
    level: 6,
    onyomi_readings: ['ハク', 'ビャク'],
    kunyomi_readings: ['しろ', 'しろい'],
    onyomi_romaji: ['haku', 'byaku'],
    kunyomi_romaji: ['shiro', 'shiroi'],
    hiragana_reading: 'はく, しろい',
    stroke_count: 5,
    radicals: '白 (white)',
    stroke_order_data: { count: 5, directions: ['Top spark dot', 'Left vertical', 'Top and right perimeter', 'Center horizontal', 'Bottom closing base'] },
    mnemonic: 'A pure ray of brilliant white sunlight gleaming through the sky.',
    vocabulary: [
      { word: '白い', hiragana: 'しろい', romaji: 'shiroi', meaning: 'White (adj)', readingType: 'kunyomi' },
      { word: '白', hiragana: 'しろ', romaji: 'shiro', meaning: 'White color', readingType: 'kunyomi' },
      { word: '面白い', hiragana: 'おもしろい', romaji: 'omoshiroi', meaning: 'Interesting / fun', readingType: 'kunyomi' },
      { word: '告白', hiragana: 'こくはく', romaji: 'kokuhaku', meaning: 'Confession', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '雪が降って街が白くなりました。', hiragana: 'ゆきが ふって まちが しろくなりました。', romaji: 'Yuki ga futte machi ga shiroku narimashita.', english: 'Snow fell and the town turned white.' },
      { japanese: 'この小説は展開がとても面白いです。', hiragana: 'この しょうせつは てんかいが とても おもしろいです。', romaji: 'Kono shousetsu wa tenkai ga totemo omoshiroi desu.', english: 'This novel has a very interesting development.' }
    ]
  }
];
