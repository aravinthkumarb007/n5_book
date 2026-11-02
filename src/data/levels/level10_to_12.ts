import { KanjiRecord } from '../../types/kanji';

export const LEVEL_10_TO_12_KANJI: KanjiRecord[] = [
  // LEVEL 10: Travel, Transport & Nature/Living Creatures (Kanji 91 - 100)
  {
    id: 91,
    kanji_number: 91,
    character: '道',
    meaning: 'Road, Way, Street, Path',
    level: 10,
    onyomi_readings: ['ドウ', 'トウ'],
    kunyomi_readings: ['みち'],
    onyomi_romaji: ['dou', 'tou'],
    kunyomi_romaji: ['michi'],
    hiragana_reading: 'どう, みち',
    stroke_count: 12,
    radicals: '辶 (road/walk) + 首 (head)',
    stroke_order_data: { count: 12, directions: ['Right head 首 (9 strokes)', 'Left road road-walk 辶 (3 strokes)'] },
    mnemonic: 'Following your head (首) along the path and road (辶) of wisdom.',
    vocabulary: [
      { word: '道', hiragana: 'みち', romaji: 'michi', meaning: 'Road / path', readingType: 'kunyomi' },
      { word: '歩道', hiragana: 'ほどう', romaji: 'hodou', meaning: 'Sidewalk / pedestrian walk', readingType: 'onyomi' },
      { word: '車道', hiragana: 'しゃどう', romaji: 'shadou', meaning: 'Roadway for cars', readingType: 'onyomi' },
      { word: '北海道', hiragana: 'ほっかいどう', romaji: 'hokkaidou', meaning: 'Hokkaido', readingType: 'onyomi' },
      { word: '柔道', hiragana: 'じゅうどう', romaji: 'juudou', meaning: 'Judo', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: 'この道をまっすぐ行くと駅があります。', hiragana: 'この みちを まっすぐ いくと えきが あります。', romaji: 'Kono michi o massugu iku to eki ga arimasu.', english: 'If you go straight along this road, there is the station.' },
      { japanese: '親切な人が警察署への道を教えてくれました。', hiragana: 'しんせつな ひとが けいさつしょへの みちを おしえてくれました。', romaji: 'Shinsetsu na hito ga keisatsusho e no michi o oshiete kuremashita.', english: 'A kind person showed me the way to the police station.' }
    ]
  },
  {
    id: 92,
    kanji_number: 92,
    character: '車',
    meaning: 'Car, Vehicle, Wheel',
    level: 10,
    onyomi_readings: ['シャ'],
    kunyomi_readings: ['くるま'],
    onyomi_romaji: ['sha'],
    kunyomi_romaji: ['kuruma'],
    hiragana_reading: 'しゃ, くるま',
    stroke_count: 7,
    radicals: '車 (car/cart)',
    stroke_order_data: { count: 7, directions: ['Top horizontal', 'Left vertical of cabin', 'Right fold and base of cabin', 'Middle horizontal', 'Bottom wider axle bar', 'Center vertical axle down'] },
    mnemonic: 'An overhead view of a two-wheeled chariot or car with an axle running down the middle.',
    vocabulary: [
      { word: '車', hiragana: 'くるま', romaji: 'kuruma', meaning: 'Car / vehicle', readingType: 'kunyomi' },
      { word: '電車', hiragana: 'でんしゃ', romaji: 'densha', meaning: 'Train', readingType: 'onyomi' },
      { word: '自転車', hiragana: 'じてんしゃ', romaji: 'jitensha', meaning: 'Bicycle', readingType: 'onyomi' },
      { word: '自動車', hiragana: 'じどうしゃ', romaji: 'jidousha', meaning: 'Automobile', readingType: 'onyomi' },
      { word: '駐車場', hiragana: 'ちゅうしゃじょう', romaji: 'chuushajou', meaning: 'Parking lot', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '父は新しい白い車を買いました。', hiragana: 'ちちは あたらしい しろい くるまを かいました。', romaji: 'Chichi wa atarashii shiroi kuruma o kaimashita.', english: 'My father bought a new white car.' },
      { japanese: '毎朝満員電車に乗って通勤します。', hiragana: 'まいあさ まんいんでんしゃに のって つうきんします。', romaji: 'Maiasa man\'indensha ni notte tsuukin shimasu.', english: 'Every morning I commute riding the crowded train.' }
    ]
  },
  {
    id: 93,
    kanji_number: 93,
    character: '駅',
    meaning: 'Train Station',
    level: 10,
    onyomi_readings: ['エキ'],
    kunyomi_readings: [],
    onyomi_romaji: ['eki'],
    kunyomi_romaji: [],
    hiragana_reading: 'えき',
    stroke_count: 14,
    radicals: '馬 (horse) + 尺 (measure)',
    stroke_order_data: { count: 14, directions: ['Left horse 馬 (10 strokes)', 'Right ruler/station 尺 (4 strokes)'] },
    mnemonic: 'Post relay horses (馬) stationed at measured intervals (尺) where modern train STATIONS now stand.',
    vocabulary: [
      { word: '駅', hiragana: 'えき', romaji: 'eki', meaning: 'Station', readingType: 'onyomi' },
      { word: '駅員', hiragana: 'えきいん', romaji: 'eki\'in', meaning: 'Station attendant', readingType: 'onyomi' },
      { word: '駅前', hiragana: 'えきまえ', romaji: 'ekimae', meaning: 'In front of station', readingType: 'onyomi' },
      { word: '東京駅', hiragana: 'とうきょうえき', romaji: 'toukyoueki', meaning: 'Tokyo Station', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '私の家は駅から歩いて五分です。', hiragana: 'わたしの いえは えきから あるいて ごふんです。', romaji: 'Watashi no ie wa eki kara aruite gofun desu.', english: 'My home is a five-minute walk from the station.' },
      { japanese: '駅の改札口で友達と待ち合わせました。', hiragana: 'えきの かいさつぐちで ともだちと まちあわせました。', romaji: 'Eki no kaisatsuguchi de tomodachi to machiawasemashita.', english: 'I met up with my friend at the station ticket gate.' }
    ]
  },
  {
    id: 94,
    kanji_number: 94,
    character: '電',
    meaning: 'Electricity, Electric',
    level: 10,
    onyomi_readings: ['デン'],
    kunyomi_readings: [],
    onyomi_romaji: ['den'],
    kunyomi_romaji: [],
    hiragana_reading: 'でん',
    stroke_count: 13,
    radicals: '雨 (rain) + 申 (lightning/flash)',
    stroke_order_data: { count: 13, directions: ['Top rain 雨 (8 strokes)', 'Bottom lightning flash 申 (5 strokes)'] },
    mnemonic: 'Lightning flashes (申) during a thunderstorm (雨) producing ELECTRICITY.',
    vocabulary: [
      { word: '電車', hiragana: 'でんしゃ', romaji: 'densha', meaning: 'Train', readingType: 'onyomi' },
      { word: '電話', hiragana: 'でんわ', romaji: 'denwa', meaning: 'Telephone', readingType: 'onyomi' },
      { word: '電気', hiragana: 'でんき', romaji: 'denki', meaning: 'Electricity / light', readingType: 'onyomi' },
      { word: '電力', hiragana: 'でんりょく', romaji: 'denryoku', meaning: 'Electric power', readingType: 'onyomi' },
      { word: '電子メール', hiragana: 'でんしめーる', romaji: 'denshi meeru', meaning: 'E-mail', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '暗くなったので部屋の電気をつけました。', hiragana: 'くらくなったので へやの でんきを つけました。', romaji: 'Kuraku natta node heya no denki o tsukemashita.', english: 'Since it became dark, I turned on the room light.' },
      { japanese: 'スマートフォンで電話をかけました。', hiragana: 'すまーとふぉんで でんわを かけました。', romaji: 'Sumaatofon de denwa o kakemashita.', english: 'I made a phone call using my smartphone.' }
    ]
  },
  {
    id: 95,
    kanji_number: 95,
    character: '花',
    meaning: 'Flower, Blossom',
    level: 10,
    onyomi_readings: ['カ'],
    kunyomi_readings: ['はな'],
    onyomi_romaji: ['ka'],
    kunyomi_romaji: ['hana'],
    hiragana_reading: 'か, はな',
    stroke_count: 7,
    radicals: '艹 (grass) + 化 (change/transform)',
    stroke_order_data: { count: 7, directions: ['Top grass 艹 (3 strokes)', 'Left slant and vertical (2 strokes)', 'Right curved spoon stroke (2 strokes)'] },
    mnemonic: 'Grass and plant stems (艹) transformed (化) into gorgeous blooming FLOWERS.',
    vocabulary: [
      { word: '花', hiragana: 'はな', romaji: 'hana', meaning: 'Flower', readingType: 'kunyomi' },
      { word: '花火', hiragana: 'はなび', romaji: 'hanabi', meaning: 'Fireworks', readingType: 'kunyomi' },
      { word: '花見', hiragana: 'はなみ', romaji: 'hanami', meaning: 'Cherry blossom viewing', readingType: 'kunyomi' },
      { word: '花屋', hiragana: 'はなや', romaji: 'hanaya', meaning: 'Flower shop / florist', readingType: 'kunyomi' }
    ],
    example_sentences: [
      { japanese: '庭に色鮮やかで綺麗な花が咲いています。', hiragana: 'にわに いろあざやかで きれいな はなが さいています。', romaji: 'Niwa ni iroazayaka de kirei na hana ga saite imasu.', english: 'Vivid and beautiful flowers are blooming in the garden.' },
      { japanese: '春には桜の木の下でお花見を楽しみます。', hiragana: 'はるには さくらの きのしたで おはなみを たのしみます。', romaji: 'Haru ni wa sakura no ki no shita de ohanami o tanoshimimasu.', english: 'In spring, we enjoy flower viewing under the cherry trees.' }
    ]
  },
  {
    id: 96,
    kanji_number: 96,
    character: '魚',
    meaning: 'Fish',
    level: 10,
    onyomi_readings: ['ギョ'],
    kunyomi_readings: ['さかな', 'うお'],
    onyomi_romaji: ['gyo'],
    kunyomi_romaji: ['sakana', 'uo'],
    hiragana_reading: 'ぎょ, さかな',
    stroke_count: 11,
    radicals: '魚 (fish)',
    stroke_order_data: { count: 11, directions: ['Top head angle (2 strokes)', 'Middle scaled body box 田 (5 strokes)', 'Bottom four fin strokes 灬 (4 strokes)'] },
    mnemonic: 'A swimming fish with pointed head, scaled body, and fluttering tail fins.',
    vocabulary: [
      { word: '魚', hiragana: 'さかな', romaji: 'sakana', meaning: 'Fish', readingType: 'kunyomi' },
      { word: '魚屋', hiragana: 'さかなや', romaji: 'sakanaya', meaning: 'Fishmonger / fish market', readingType: 'kunyomi' },
      { word: '金魚', hiragana: 'きんぎょ', romaji: 'kingyo', meaning: 'Goldfish', readingType: 'onyomi' },
      { word: '焼き魚', hiragana: 'やきざかな', romaji: 'yakizakana', meaning: 'Grilled fish', readingType: 'kunyomi' }
    ],
    example_sentences: [
      { japanese: '和食の朝ご飯に焼き魚を食べました。', hiragana: 'わしょくの あさごはんに やきざかなを たべました。', romaji: 'Washoku no asagohan ni yakizakana o tabemashita.', english: 'I ate grilled fish for a traditional Japanese breakfast.' },
      { japanese: '池の中を色鮮やかな金魚が泳いでいます。', hiragana: 'いけの なかを いろあざやかな きんぎょが およいでいます。', romaji: 'Ike no naka o iroazayaka na kingyo ga oyoide imasu.', english: 'Colorful goldfish are swimming in the pond.' }
    ]
  },
  {
    id: 97,
    kanji_number: 97,
    character: '肉',
    meaning: 'Meat, Flesh',
    level: 10,
    onyomi_readings: ['ニク'],
    kunyomi_readings: ['しし'],
    onyomi_romaji: ['niku'],
    kunyomi_romaji: ['shishi'],
    hiragana_reading: 'にく',
    stroke_count: 6,
    radicals: '肉 (meat)',
    stroke_order_data: { count: 6, directions: ['Left vertical', 'Top and right perimeter frame', 'First inner person 人 stroke', 'Second inner person 人 stroke'] },
    mnemonic: 'A slab of cut meat showing marbling ridges of fat inside.',
    vocabulary: [
      { word: '肉', hiragana: 'にく', romaji: 'niku', meaning: 'Meat', readingType: 'onyomi' },
      { word: '牛肉', hiragana: 'ぎゅうにく', romaji: 'gyuuniku', meaning: 'Beef', readingType: 'onyomi' },
      { word: '豚肉', hiragana: 'ぶたにく', romaji: 'butaniku', meaning: 'Pork', readingType: 'onyomi' },
      { word: '鳥肉 / 鶏肉', hiragana: 'とりにく', romaji: 'toriniku', meaning: 'Chicken meat', readingType: 'onyomi' },
      { word: '肉屋', hiragana: 'にくや', romaji: 'nikuya', meaning: 'Butcher shop', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '今夜は牛肉と玉ねぎでカレーを作ります。', hiragana: 'こんやは ぎゅうにくと たまねぎで かれーを つくります。', romaji: 'Konya wa gyuuniku to tamanegi de karee o tsukurimasu.', english: 'Tonight I will make curry with beef and onions.' },
      { japanese: '健康のために野菜とお肉をバランスよく食べます。', hiragana: 'けんこうのために やさいと おにくを ばらんすよく たべます。', romaji: 'Kenkou no tame ni yasai to oniku o baransu yoku tabemasu.', english: 'I eat vegetables and meat in good balance for my health.' }
    ]
  },
  {
    id: 98,
    kanji_number: 98,
    character: '犬',
    meaning: 'Dog',
    level: 10,
    onyomi_readings: ['ケン'],
    kunyomi_readings: ['いぬ'],
    onyomi_romaji: ['ken'],
    kunyomi_romaji: ['inu'],
    hiragana_reading: 'けん, いぬ',
    stroke_count: 4,
    radicals: '犬 (dog) / 大 (big) + 丶 (dot)',
    stroke_order_data: { count: 4, directions: ['Horizontal bar', 'Left curve down', 'Right slant down', 'Top right dot (ear)'] },
    mnemonic: 'A big creature (大) with an alert cocked ear (丶) wagging its tail: a friendly DOG.',
    vocabulary: [
      { word: '犬', hiragana: 'いぬ', romaji: 'inu', meaning: 'Dog', readingType: 'kunyomi' },
      { word: '子犬', hiragana: 'こいぬ', romaji: 'koinu', meaning: 'Puppy', readingType: 'kunyomi' },
      { word: '番犬', hiragana: 'ばんけん', romaji: 'banken', meaning: 'Watchdog / guard dog', readingType: 'onyomi' },
      { word: '盲導犬', hiragana: 'もうどうけん', romaji: 'moudouken', meaning: 'Guide dog', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '夕方に公園で犬の散歩をしました。', hiragana: 'ゆうがたに こうえんで いぬの さんぽを しました。', romaji: 'Yuugata ni kouen de inu no sanpo o shimashita.', english: 'I took the dog for a walk in the park in the evening.' },
      { japanese: '可愛い子犬がしっぽを振っています。', hiragana: 'かわいい こいぬが しっぽを ふっています。', romaji: 'Kawaii koinu ga shippo o futte imasu.', english: 'The cute puppy is wagging its tail.' }
    ]
  },
  {
    id: 99,
    kanji_number: 99,
    character: '鳥',
    meaning: 'Bird, Poultry',
    level: 10,
    onyomi_readings: ['チョウ'],
    kunyomi_readings: ['とり'],
    onyomi_romaji: ['chou'],
    kunyomi_romaji: ['tori'],
    hiragana_reading: 'ちょう, とり',
    stroke_count: 11,
    radicals: '鳥 (bird)',
    stroke_order_data: { count: 11, directions: ['Top crest stroke', 'Upper head and eye (3 strokes)', 'Body and wings (3 strokes)', 'Bottom four claw/feather strokes 灬 (4 strokes)'] },
    mnemonic: 'A feathered bird with crest feathers, sharp eye, plump body, and tail feathers.',
    vocabulary: [
      { word: '鳥', hiragana: 'とり', romaji: 'tori', meaning: 'Bird', readingType: 'kunyomi' },
      { word: '小鳥', hiragana: 'ことり', romaji: 'kotori', meaning: 'Small bird', readingType: 'kunyomi' },
      { word: '鳥肉', hiragana: 'とりにく', romaji: 'toriniku', meaning: 'Chicken meat', readingType: 'kunyomi' },
      { word: '白鳥', hiragana: 'はくちょう', romaji: 'hakuchou', meaning: 'Swan (white bird)', readingType: 'onyomi' },
      { word: '焼き鳥', hiragana: 'やきとり', romaji: 'yakitori', meaning: 'Yakitori (grilled chicken skewers)', readingType: 'kunyomi' }
    ],
    example_sentences: [
      { japanese: '朝の森で鳥たちの美しいさえずりが聞こえます。', hiragana: 'あさの もりで とりたちの うつくしい さえずりが きこえます。', romaji: 'Asa no mori de tori-tachi no utsukushii saezuri ga kikoemasu.', english: 'In the morning forest, the beautiful chirping of birds can be heard.' },
      { japanese: '仕事の帰りに友達と焼き鳥を食べに行きました。', hiragana: 'しごとの かえりに ともだちと やきとりを たべに いきました。', romaji: 'Shigoto no kaeri ni tomodachi to yakitori o tabeni ikimashita.', english: 'On the way home from work, I went to eat yakitori with a friend.' }
    ]
  },
  {
    id: 100,
    kanji_number: 100,
    character: '友',
    meaning: 'Friend, Companion',
    level: 10,
    onyomi_readings: ['ユウ'],
    kunyomi_readings: ['とも'],
    onyomi_romaji: ['yuu'],
    kunyomi_romaji: ['tomo'],
    hiragana_reading: 'ゆう, とも',
    stroke_count: 4,
    radicals: '又 (right hand / again)',
    stroke_order_data: { count: 4, directions: ['Top horizontal line', 'Left slant down', 'Horizontal and bend hook', 'Right diagonal crossing stroke'] },
    mnemonic: 'Two friendly hands joining together in mutual support and friendship.',
    vocabulary: [
      { word: '友達', hiragana: 'ともだち', romaji: 'tomodachi', meaning: 'Friend / friends', readingType: 'kunyomi' },
      { word: '友人', hiragana: 'ゆうじん', romaji: 'yuujin', meaning: 'Friend (formal)', readingType: 'onyomi' },
      { word: '親友', hiragana: 'しんゆう', romaji: 'shin\'yuu', meaning: 'Best friend', readingType: 'onyomi' },
      { word: '友情', hiragana: 'ゆうじょう', romaji: 'yuujou', meaning: 'Friendship', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '週末に昔からの友達とカフェで話しました。', hiragana: 'しゅうまつに むかしからの ともだちと かふぇで はなしました。', romaji: 'Shuumatsu ni mukashi kara no tomodachi to kafe de hanashimashita.', english: 'Over the weekend I talked with an old friend at a cafe.' },
      { japanese: '彼女は私のかけがえのない親友です。', hiragana: 'かのじょは わたしの かけがえのない しんゆうです。', romaji: 'Kanojo wa watashi no kakegae no nai shin\'yuu desu.', english: 'She is my irreplaceable best friend.' }
    ]
  },

  // LEVEL 11: Family, Town & Atmosphere (Kanji 101 - 110)
  {
    id: 101,
    kanji_number: 101,
    character: '父',
    meaning: 'Father',
    level: 11,
    onyomi_readings: ['フ'],
    kunyomi_readings: ['ちち', 'とう'],
    onyomi_romaji: ['fu'],
    kunyomi_romaji: ['chichi', 'tou'],
    hiragana_reading: 'ふ, ちち',
    stroke_count: 4,
    radicals: '父 (father)',
    stroke_order_data: { count: 4, directions: ['Left top slant', 'Right top slant', 'Slanted center cross', 'Right diagonal cross'] },
    mnemonic: 'Two strong crossed hands of the protective family patriarch: FATHER.',
    vocabulary: [
      { word: '父', hiragana: 'ちち', romaji: 'chichi', meaning: 'Father (my father)', readingType: 'kunyomi' },
      { word: 'お父さん', hiragana: 'おとうさん', romaji: 'otousan', meaning: 'Father (someone else\'s / polite)', readingType: 'kunyomi' },
      { word: '父親', hiragana: 'ちちおや', romaji: 'chichioya', meaning: 'Father / male parent', readingType: 'kunyomi' },
      { word: '父母', hiragana: 'ふぼ', romaji: 'fubo', meaning: 'Father and mother / parents', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '父は毎朝早く起きて庭の手入れをします。', hiragana: 'ちちは まいあさ はやく おきて にわの ていれを します。', romaji: 'Chichi wa maiasa hayaku okite niwa no teire o shimasu.', english: 'My father wakes up early every morning and tends the garden.' },
      { japanese: 'お父さんは会社員として真面目に働いています。', hiragana: 'おとうさんは かいしゃいんとして まじめに はたらいています。', romaji: 'Otousan wa kaishain to shite majime ni hataraite imasu.', english: 'Father works diligently as a company employee.' }
    ]
  },
  {
    id: 102,
    kanji_number: 102,
    character: '母',
    meaning: 'Mother',
    level: 11,
    onyomi_readings: ['ボ'],
    kunyomi_readings: ['はは', 'かあ'],
    onyomi_romaji: ['bo'],
    kunyomi_romaji: ['haha', 'kaa'],
    hiragana_reading: 'ぼ, はは',
    stroke_count: 5,
    radicals: '母 (mother)',
    stroke_order_data: { count: 5, directions: ['Left vertical', 'Top and right frame with bottom hook', 'Center horizontal bar', 'Upper nurturing dot', 'Lower nurturing dot'] },
    mnemonic: 'A mother embracing a child with two nurturing breasts providing life milk.',
    vocabulary: [
      { word: '母', hiragana: 'はは', romaji: 'haha', meaning: 'Mother (my mother)', readingType: 'kunyomi' },
      { word: 'お母さん', hiragana: 'おかあさん', romaji: 'okaasan', meaning: 'Mother (someone else\'s / polite)', readingType: 'kunyomi' },
      { word: '母親', hiragana: 'ははおや', romaji: 'hahaoya', meaning: 'Mother / female parent', readingType: 'kunyomi' },
      { word: '母国語', hiragana: 'ぼこくご', romaji: 'bokokugo', meaning: 'Mother tongue / native language', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '母の作る手料理はいつもとても美味しいです。', hiragana: 'ははの つくる てりょうりは いつも とても おいしいです。', romaji: 'Haha no tsukuru teryouri wa itsumo totemo oishii desu.', english: 'The homemade food my mother cooks is always delicious.' },
      { japanese: '母の日に感謝の気持ちを込めて花束を贈りました。', hiragana: 'ははのひに かんしゃの きもちを こめて はなたばを おくりました。', romaji: 'Haha no hi ni kansha no kimochi o komete hanataba o okurimashita.', english: 'I gave a bouquet of flowers on Mother\'s Day with gratitude.' }
    ]
  },
  {
    id: 103,
    kanji_number: 103,
    character: '家',
    meaning: 'House, Home, Family',
    level: 11,
    onyomi_readings: ['カ', 'ケ'],
    kunyomi_readings: ['いえ', 'や'],
    onyomi_romaji: ['ka', 'ke'],
    kunyomi_romaji: ['ie', 'ya'],
    hiragana_reading: 'か, いえ',
    stroke_count: 10,
    radicals: '宀 (roof) + 豕 (pig/domesticated animal)',
    stroke_order_data: { count: 10, directions: ['Roof 宀 (3 strokes)', 'Inner pig/domesticated livestock 豕 (7 strokes)'] },
    mnemonic: 'A roof (宀) sheltering domestic livestock (豕)—the ancient symbol of a secure HOME.',
    vocabulary: [
      { word: '家', hiragana: 'いえ / うち', romaji: 'ie / uchi', meaning: 'House / home', readingType: 'kunyomi' },
      { word: '家族', hiragana: 'かぞく', romaji: 'kazoku', meaning: 'Family', readingType: 'onyomi' },
      { word: '家庭', hiragana: 'かてい', romaji: 'katei', meaning: 'Household / home', readingType: 'onyomi' },
      { word: '作家', hiragana: 'さっか', romaji: 'sakka', meaning: 'Author / writer', readingType: 'onyomi' },
      { word: '帰家', hiragana: 'きか', romaji: 'kika', meaning: 'Returning home', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '仕事が終わったらすぐに家に帰ります。', hiragana: 'しごとが おわったら すぐに いえに かえります。', romaji: 'Shigoto ga owattara sugu ni ie ni kaerimasu.', english: 'As soon as work finishes, I return home.' },
      { japanese: '私の家族はみんな元気で仲が良いです。', hiragana: 'わたしの かぞくは みんな げんきで なかが いいです。', romaji: 'Watashi no kazoku wa minna genki de naka ga ii desu.', english: 'Everyone in my family is healthy and gets along well.' }
    ]
  },
  {
    id: 104,
    kanji_number: 104,
    character: '町',
    meaning: 'Town, Neighborhood, Block',
    level: 11,
    onyomi_readings: ['チョウ'],
    kunyomi_readings: ['まち'],
    onyomi_romaji: ['chou'],
    kunyomi_romaji: ['machi'],
    hiragana_reading: 'ちょう, まち',
    stroke_count: 7,
    radicals: '田 (rice field) + 丁 (block/nail)',
    stroke_order_data: { count: 7, directions: ['Left rice field 田 (5 strokes)', 'Right street corner 丁 (2 strokes)'] },
    mnemonic: 'Paddy fields (田) divided by street corner signposts (丁) into a bustling TOWN.',
    vocabulary: [
      { word: '町', hiragana: 'まち', romaji: 'machi', meaning: 'Town / block', readingType: 'kunyomi' },
      { word: '下町', hiragana: 'したまち', romaji: 'shitamachi', meaning: 'Downtown / traditional district', readingType: 'kunyomi' },
      { word: '町長', hiragana: 'ちょうちょう', romaji: 'chouchou', meaning: 'Town mayor', readingType: 'onyomi' },
      { word: '城下町', hiragana: 'じょうかまち', romaji: 'joukamachi', meaning: 'Castle town', readingType: 'kunyomi' }
    ],
    example_sentences: [
      { japanese: 'この町は静かでとても住みやすいです。', hiragana: 'この まちは しずかで とても すみやすいです。', romaji: 'Kono machi wa shizuka de totemo sumiyasui desu.', english: 'This town is quiet and very comfortable to live in.' },
      { japanese: '東京の下町を散策して美味しいものを食べました。', hiragana: 'とうきょうの したまちを さんさくして おいしいものを たべました。', romaji: 'Toukyou no shitamachi o sansaku shite oishii mono o tabemashita.', english: 'I strolled through the downtown area of Tokyo and ate delicious foods.' }
    ]
  },
  {
    id: 105,
    kanji_number: 105,
    character: '京',
    meaning: 'Capital, Metropolis',
    level: 11,
    onyomi_readings: ['キョウ', 'ケイ'],
    kunyomi_readings: ['みやこ'],
    onyomi_romaji: ['kyou', 'kei'],
    kunyomi_romaji: ['miyako'],
    hiragana_reading: 'きょう, けい',
    stroke_count: 8,
    radicals: '亠 (lid) + 口 (mouth) + 小 (small)',
    stroke_order_data: { count: 8, directions: ['Top lid 亠 (2 strokes)', 'Middle mouth 口 (3 strokes)', 'Bottom small legs 小 (3 strokes)'] },
    mnemonic: 'A grand watchtower overlooking the imperial CAPITAL gates.',
    vocabulary: [
      { word: '東京', hiragana: 'とうきょう', romaji: 'toukyou', meaning: 'Tokyo (Eastern Capital)', readingType: 'onyomi' },
      { word: '京都', hiragana: 'きょうと', romaji: 'kyouto', meaning: 'Kyoto (Capital City)', readingType: 'onyomi' },
      { word: '上京', hiragana: 'じょうきょう', romaji: 'joukyou', meaning: 'Going to the capital (Tokyo)', readingType: 'onyomi' },
      { word: '京浜', hiragana: 'けいひん', romaji: 'keihin', meaning: 'Tokyo-Yokohama area', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '秋に京都のお寺へ紅葉を見に行きました。', hiragana: 'あきに きょうとの おてらへ こうようを みに いきました。', romaji: 'Aki ni Kyouto no otera e kouyou o mi ni ikimashita.', english: 'In autumn I went to temples in Kyoto to see the autumn leaves.' },
      { japanese: '大学に入るために地方から上京しました。', hiragana: 'だいがくに はいるために ちほうから じょうきょうしました。', romaji: 'Daigaku ni hairu tame ni chihou kara joukyou shimashita.', english: 'I moved up to Tokyo from the countryside to enter university.' }
    ]
  },
  {
    id: 106,
    kanji_number: 106,
    character: '都',
    meaning: 'Metropolis, Capital, All',
    level: 11,
    onyomi_readings: ['ト', 'ツ'],
    kunyomi_readings: ['みやこ'],
    onyomi_romaji: ['to', 'tsu'],
    kunyomi_romaji: ['miyako'],
    hiragana_reading: 'と, つ, みやこ',
    stroke_count: 11,
    radicals: '者 (someone) + 阝 (city/district)',
    stroke_order_data: { count: 11, directions: ['Left person/scholar 者 (8 strokes)', 'Right city radical 阝 (3 strokes)'] },
    mnemonic: 'Where many distinguished scholars and citizens (者) gather in a grand imperial district (阝): the METROPOLIS.',
    vocabulary: [
      { word: '京都', hiragana: 'きょうと', romaji: 'kyouto', meaning: 'Kyoto', readingType: 'onyomi' },
      { word: '都会', hiragana: 'とかい', romaji: 'tokai', meaning: 'Big city / urban metropolis', readingType: 'onyomi' },
      { word: '東京都', hiragana: 'とうきょうと', romaji: 'toukyouto', meaning: 'Tokyo Metropolis', readingType: 'onyomi' },
      { word: '都合', hiragana: 'つごう', romaji: 'tsugou', meaning: 'Convenience / circumstances', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '明日の午後、ご都合はいかがでしょうか。', hiragana: 'あしたの ごご、ごつごうは いかがでしょうか。', romaji: 'Ashita no gogo, gotsugou wa ikaga deshou ka.', english: 'How is your availability tomorrow afternoon?' },
      { japanese: '大都会の夜景は息をのむほど綺麗です。', hiragana: 'だいとかいの やけいは いきをのむほど きれいです。', romaji: 'Daitokai no yakei wa iki o nomu hodo kirei desu.', english: 'The night view of the big metropolis is breathtakingly beautiful.' }
    ]
  },
  {
    id: 107,
    kanji_number: 107,
    character: '門',
    meaning: 'Gate, Gateway',
    level: 11,
    onyomi_readings: ['モン'],
    kunyomi_readings: ['かど'],
    onyomi_romaji: ['mon'],
    kunyomi_romaji: ['kado'],
    hiragana_reading: 'もん, かど',
    stroke_count: 8,
    radicals: '門 (gate)',
    stroke_order_data: { count: 8, directions: ['Left door post (3 strokes)', 'Right door post and bar (5 strokes)'] },
    mnemonic: 'Two sturdy hinged doors swinging open at a grand entrance GATE.',
    vocabulary: [
      { word: '門', hiragana: 'もん', romaji: 'mon', meaning: 'Gate', readingType: 'onyomi' },
      { word: '正門', hiragana: 'せいもん', romaji: 'seimon', meaning: 'Main gate', readingType: 'onyomi' },
      { word: '専門', hiragana: 'せんもん', romaji: 'senmon', meaning: 'Specialty / major field', readingType: 'onyomi' },
      { word: '門限', hiragana: 'もんげん', romaji: 'mongen', meaning: 'Curfew', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '大学の正門前で集合しましょう。', hiragana: 'だいがくの せいもんまえで しゅうごうしましょう。', romaji: 'Daigaku no seimon mae de shuugou shimashou.', english: 'Let\'s gather in front of the university\'s main gate.' },
      { japanese: '彼の大学での専門分野は経済学です。', hiragana: 'かれの だいがくでの せんもんぶんやは けいざいがくです。', romaji: 'Kare no daigaku de no senmon bunya wa keizaigaku desu.', english: 'His field of specialization in college is economics.' }
    ]
  },
  {
    id: 108,
    kanji_number: 108,
    character: '外',
    meaning: 'Outside, Exterior, Foreign',
    level: 11,
    onyomi_readings: ['ガイ', 'ゲ'],
    kunyomi_readings: ['そと', 'ほか', 'はずす'],
    onyomi_romaji: ['gai', 'ge'],
    kunyomi_romaji: ['soto', 'hoka', 'hazusu'],
    hiragana_reading: 'がい, そと',
    stroke_count: 5,
    radicals: '夕 (evening) + 卜 (divination)',
    stroke_order_data: { count: 5, directions: ['Left evening 夕 (3 strokes)', 'Right divination 卜 (2 strokes)'] },
    mnemonic: 'In the evening (夕), people step OUTSIDE to divine the stars (卜).',
    vocabulary: [
      { word: '外', hiragana: 'そと', romaji: 'soto', meaning: 'Outside', readingType: 'kunyomi' },
      { word: '外国', hiragana: 'がいこく', romaji: 'gaikoku', meaning: 'Foreign country', readingType: 'onyomi' },
      { word: '外国人', hiragana: 'がいこくじん', romaji: 'gaikokujin', meaning: 'Foreigner', readingType: 'onyomi' },
      { word: '海外', hiragana: 'かいがい', romaji: 'kaigai', meaning: 'Overseas', readingType: 'onyomi' },
      { word: '以外', hiragana: 'いがい', romaji: 'igai', meaning: 'Except / other than', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '天気がいいので外に出て散歩しましょう。', hiragana: 'てんきが いいので そとに でて さんぽしましょう。', romaji: 'Tenki ga ii node soto ni dete sanpo shimashou.', english: 'Since the weather is nice, let\'s step outside and take a walk.' },
      { japanese: '来年の夏休みに海外旅行へ行く予定です。', hiragana: 'らいねんの なつやすみに かいがいりょこうへ いく よていです。', romaji: 'Rainen no natsuyasumi ni kaigairyokou e iku yotei desu.', english: 'I plan to go on an overseas trip next summer vacation.' }
    ]
  },
  {
    id: 109,
    kanji_number: 109,
    character: '空',
    meaning: 'Sky, Empty, Air',
    level: 11,
    onyomi_readings: ['クウ'],
    kunyomi_readings: ['そら', 'から', 'あく'],
    onyomi_romaji: ['kuu'],
    kunyomi_romaji: ['sora', 'kara', 'aku'],
    hiragana_reading: 'くう, そら',
    stroke_count: 8,
    radicals: '穴 (cave) + 工 (work/craft)',
    stroke_order_data: { count: 8, directions: ['Top cave 穴 (5 strokes)', 'Bottom craft 工 (3 strokes)'] },
    mnemonic: 'Carving an opening through a cave ceiling reveals the vast, wide-open SKY.',
    vocabulary: [
      { word: '空', hiragana: 'そら', romaji: 'sora', meaning: 'Sky', readingType: 'kunyomi' },
      { word: '青空', hiragana: 'あおぞら', romaji: 'aozora', meaning: 'Blue sky', readingType: 'kunyomi' },
      { word: '空気', hiragana: 'くうき', romaji: 'kuuki', meaning: 'Air / atmosphere', readingType: 'onyomi' },
      { word: '空港', hiragana: 'くうこう', romaji: 'kuukou', meaning: 'Airport', readingType: 'onyomi' },
      { word: '空く', hiragana: 'あく', romaji: 'aku', meaning: 'To become empty / vacant', readingType: 'kunyomi' }
    ],
    example_sentences: [
      { japanese: '見上げると青い空に白い雲が浮かんでいました。', hiragana: 'みあげると あおい そらに しろいくもが うかんでいました。', romaji: 'Miageru to aoi sora ni shiroi kumo ga ukande imashita.', english: 'When I looked up, white clouds were floating in the blue sky.' },
      { japanese: '山頂の澄んだ空気を胸いっぱいに吸いました。', hiragana: 'さんちょうの すんだ くうきを むねいっぱいに すいました。', romaji: 'Sanchou no sunda kuuki o mune ippai ni suimashita.', english: 'I breathed in the fresh mountain air deeply.' }
    ]
  },
  {
    id: 110,
    kanji_number: 110,
    character: '海',
    meaning: 'Sea, Ocean',
    level: 11,
    onyomi_readings: ['カイ'],
    kunyomi_readings: ['うみ'],
    onyomi_romaji: ['kai'],
    kunyomi_romaji: ['umi'],
    hiragana_reading: 'かい, うみ',
    stroke_count: 9,
    radicals: '氵 (water) + 毎 (every)',
    stroke_order_data: { count: 9, directions: ['Left water 氵 (3 strokes)', 'Right every 毎 (6 strokes)'] },
    mnemonic: 'Water (氵) flowing every (毎) day and collecting into the great vast SEA.',
    vocabulary: [
      { word: '海', hiragana: 'うみ', romaji: 'umi', meaning: 'Sea / ocean', readingType: 'kunyomi' },
      { word: '海外', hiragana: 'かいがい', romaji: 'kaigai', meaning: 'Overseas / abroad', readingType: 'onyomi' },
      { word: '海岸', hiragana: 'かいがん', romaji: 'kaigan', meaning: 'Coast / seashore', readingType: 'onyomi' },
      { word: '海水浴', hiragana: 'かいすいよく', romaji: 'kaisuiyoku', meaning: 'Sea bathing / swimming in the ocean', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '夏休みに家族と一緒に海で泳ぎました。', hiragana: 'なつやすみに かぞくと いっしょに うみで およぎました。', romaji: 'Natsuyasumi ni kazoku to isshoni umi de oyogimashita.', english: 'During summer vacation, I swam in the sea with my family.' },
      { japanese: '海岸沿いのカフェで波の音を聞きました。', hiragana: 'かいがんぞいの かふぇで なみの おとを ききました。', romaji: 'Kaiganzoi no kafe de nami no oto o kikimashita.', english: 'I listened to the sound of waves at a seaside cafe.' }
    ]
  },

  // LEVEL 12: Core Descriptors & Adjectives (Kanji 111 - 120)
  {
    id: 111,
    kanji_number: 111,
    character: '高',
    meaning: 'Tall, High, Expensive',
    level: 12,
    onyomi_readings: ['コウ'],
    kunyomi_readings: ['たかい'],
    onyomi_romaji: ['kou'],
    kunyomi_romaji: ['takai'],
    hiragana_reading: 'こう, たかい',
    stroke_count: 10,
    radicals: '高 (tall/high)',
    stroke_order_data: { count: 10, directions: ['Top lid 亠 (2 strokes)', 'Upper mouth 口 (3 strokes)', 'Lower frame 冂 (2 strokes)', 'Bottom mouth 口 (3 strokes)'] },
    mnemonic: 'A towering pagoda pavilion reaching tall into the high clouds.',
    vocabulary: [
      { word: '高い', hiragana: 'たかい', romaji: 'takai', meaning: 'High / tall / expensive', readingType: 'kunyomi' },
      { word: '高校', hiragana: 'こうこう', romaji: 'koukou', meaning: 'High school', readingType: 'onyomi' },
      { word: '最高', hiragana: 'さいこう', romaji: 'saikou', meaning: 'The best / highest', readingType: 'onyomi' },
      { word: '円高', hiragana: 'えんだか', romaji: 'endaka', meaning: 'Strong yen', readingType: 'kunyomi' }
    ],
    example_sentences: [
      { japanese: '東京スカイツリーはとても高い建物です。', hiragana: 'とうきょうすかいつりーは とても たかい たてものです。', romaji: 'Toukyou Sukai Tsurii wa totemo takai tatemono desu.', english: 'Tokyo Skytree is a very tall building.' },
      { japanese: 'このレストランの料理は最高に美味しいです。', hiragana: 'この れすとらんの りょうりは さいこうに おいしいです。', romaji: 'Kono resutoran no ryouri wa saikou ni oishii desu.', english: 'The food at this restaurant is superbly delicious.' }
    ]
  },
  {
    id: 112,
    kanji_number: 112,
    character: '安',
    meaning: 'Cheap, Relaxed, Peaceful, Safe',
    level: 12,
    onyomi_readings: ['アン'],
    kunyomi_readings: ['やすい'],
    onyomi_romaji: ['an'],
    kunyomi_romaji: ['yasui'],
    hiragana_reading: 'あん, やすい',
    stroke_count: 6,
    radicals: '宀 (roof) + 女 (woman)',
    stroke_order_data: { count: 6, directions: ['Top roof 宀 (3 strokes)', 'Bottom woman 女 (3 strokes)'] },
    mnemonic: 'A woman (女) safe and peaceful under her cozy home roof (宀), bringing peace and ease.',
    vocabulary: [
      { word: '安い', hiragana: 'やすい', romaji: 'yasui', meaning: 'Cheap / inexpensive', readingType: 'kunyomi' },
      { word: '安心', hiragana: 'あんしん', romaji: 'anshin', meaning: 'Peace of mind / relief', readingType: 'onyomi' },
      { word: '安全', hiragana: 'あんぜん', romaji: 'anzen', meaning: 'Safety / security', readingType: 'onyomi' },
      { word: '不安', hiragana: 'ふあん', romaji: 'fuan', meaning: 'Anxiety / uneasy', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: 'このスーパーの商品は新鮮でとても安いです。', hiragana: 'この すーぱーの しょうひんは しんせんで とても やすいです。', romaji: 'Kono suupaa no shouhin wa shinsen de totemo yasui desu.', english: 'The products at this supermarket are fresh and very cheap.' },
      { japanese: '無事に到着したと聞いて安心しました。', hiragana: 'ぶじに とうちゃくしたと きいて あんしんしました。', romaji: 'Buji ni touchaku shita to kiite anshin shimashita.', english: 'I was relieved to hear that you arrived safely.' }
    ]
  },
  {
    id: 113,
    kanji_number: 113,
    character: '新',
    meaning: 'New, Fresh',
    level: 12,
    onyomi_readings: ['シン'],
    kunyomi_readings: ['あたらしい', 'あらた'],
    onyomi_romaji: ['shin'],
    kunyomi_romaji: ['atarashii', 'arata'],
    hiragana_reading: 'しん, あたらしい',
    stroke_count: 13,
    radicals: '立 (stand) + 木 (tree) + 斤 (axe)',
    stroke_order_data: { count: 13, directions: ['Left stand and tree 親 variant (9 strokes)', 'Right axe 斤 (4 strokes)'] },
    mnemonic: 'Using an axe (斤) on fresh standing wood (木) to create NEW timber.',
    vocabulary: [
      { word: '新しい', hiragana: 'あたらしい', romaji: 'atarashii', meaning: 'New (adj)', readingType: 'kunyomi' },
      { word: '新聞', hiragana: 'しんぶん', romaji: 'shinbun', meaning: 'Newspaper', readingType: 'onyomi' },
      { word: '新幹線', hiragana: 'しんかんせん', romaji: 'shinkansen', meaning: 'Bullet train (Shinkansen)', readingType: 'onyomi' },
      { word: '新年', hiragana: 'しんねん', romaji: 'shinnen', meaning: 'New year', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '新しいカバンを買って気分がいいです。', hiragana: 'あたらしい かばんを かって きぶんが いいです。', romaji: 'Atarashii kaban o katte kibun ga ii desu.', english: 'I bought a new bag and feel great.' },
      { japanese: '朝一番の新幹線に乗って出張へ向かいました。', hiragana: 'あさいちばんの しんかんせんに のって しゅっちょうへ むかいました。', romaji: 'Asaichiban no shinkansen ni notte shucchou e mukaimashita.', english: 'I took the first bullet train in the morning and headed on a business trip.' }
    ]
  },
  {
    id: 114,
    kanji_number: 114,
    character: '古',
    meaning: 'Old, Ancient',
    level: 12,
    onyomi_readings: ['コ'],
    kunyomi_readings: ['ふるい'],
    onyomi_romaji: ['ko'],
    kunyomi_romaji: ['furui'],
    hiragana_reading: 'こ, ふるい',
    stroke_count: 5,
    radicals: '十 (ten) + 口 (mouth)',
    stroke_order_data: { count: 5, directions: ['Top cross 十 (2 strokes)', 'Bottom mouth 口 (3 strokes)'] },
    mnemonic: 'Stories passed down through ten (十) mouths (口) across ancient generations: OLD lore.',
    vocabulary: [
      { word: '古い', hiragana: 'ふるい', romaji: 'furui', meaning: 'Old (for things)', readingType: 'kunyomi' },
      { word: '古本', hiragana: 'ふるほん', romaji: 'furuhon', meaning: 'Secondhand book', readingType: 'kunyomi' },
      { word: '古代', hiragana: 'こだい', romaji: 'kodai', meaning: 'Ancient times', readingType: 'onyomi' },
      { word: '中古', hiragana: 'ちゅうこ', romaji: 'chuuko', meaning: 'Used / secondhand', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '京都には歴史ある古いお寺がたくさんあります。', hiragana: 'きょうとには れきしある ふるい おてらが たくさん あります。', romaji: 'Kyouto ni wa rekishi aru furui otera ga takusan arimasu.', english: 'Kyoto has many historic, old temples.' },
      { japanese: '古本屋で懐かしい本を見つけました。', hiragana: 'ふるほんやで なつかしい ほんを みつけました。', romaji: 'Furuhon\'ya de natsukashii hon o mitsukemashita.', english: 'I found a nostalgic book at a secondhand bookstore.' }
    ]
  },
  {
    id: 115,
    kanji_number: 115,
    character: '長',
    meaning: 'Long, Leader, Superior',
    level: 12,
    onyomi_readings: ['チョウ'],
    kunyomi_readings: ['ながい'],
    onyomi_romaji: ['chou'],
    kunyomi_romaji: ['nagai'],
    hiragana_reading: 'ちょう, ながい',
    stroke_count: 8,
    radicals: '長 (long/leader)',
    stroke_order_data: { count: 8, directions: ['Top vertical and horizontal strokes', 'Four long parallel horizontal locks', 'Bottom walking legs sweep'] },
    mnemonic: 'An elder chieftain with LONG flowing hair and wisdom.',
    vocabulary: [
      { word: '長い', hiragana: 'ながい', romaji: 'nagai', meaning: 'Long', readingType: 'kunyomi' },
      { word: '社長', hiragana: 'しゃちょう', romaji: 'shachou', meaning: 'Company president', readingType: 'onyomi' },
      { word: '部長', hiragana: 'ぶちょう', romaji: 'buchou', meaning: 'Department manager', readingType: 'onyomi' },
      { word: '校長', hiragana: 'こうちょう', romaji: 'kouchou', meaning: 'Principal', readingType: 'onyomi' },
      { word: '長所', hiragana: 'ちょうしょ', romaji: 'chousho', meaning: 'Strong point / merit', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '夏休みは長くてとても楽しい思い出ができました。', hiragana: 'なつやすみは ながくて とても たのしい おもいでが できました。', romaji: 'Natsuyasumi wa nagakute totemo tanoshii omoide ga dekimashita.', english: 'Summer vacation was long and I made very fun memories.' },
      { japanese: '社長からのスピーチを全員真剣に聞きました。', hiragana: 'しゃちょうからの すぴーちを ぜんいん しんけんに ききました。', romaji: 'Shachou kara no supiichi o zen\'in shinken ni kikimashita.', english: 'Everyone listened seriously to the company president\'s speech.' }
    ]
  },
  {
    id: 116,
    kanji_number: 116,
    character: '多',
    meaning: 'Many, Much, Frequent',
    level: 12,
    onyomi_readings: ['タ'],
    kunyomi_readings: ['おおい'],
    onyomi_romaji: ['ta'],
    kunyomi_romaji: ['ooi'],
    hiragana_reading: 'た, おおい',
    stroke_count: 6,
    radicals: '夕 (evening)',
    stroke_order_data: { count: 6, directions: ['Upper evening 夕 (3 strokes)', 'Lower evening 夕 (3 strokes)'] },
    mnemonic: 'One moonlit evening (夕) piled atop another evening (夕): MANY nights.',
    vocabulary: [
      { word: '多い', hiragana: 'おおい', romaji: 'ooi', meaning: 'Many / numerous', readingType: 'kunyomi' },
      { word: '多少', hiragana: 'たしょう', romaji: 'tashou', meaning: 'A little / somewhat / more or less', readingType: 'onyomi' },
      { word: '多数', hiragana: 'たすう', romaji: 'tasuu', meaning: 'Large number / majority', readingType: 'onyomi' },
      { word: '多忙', hiragana: 'たぼう', romaji: 'tabou', meaning: 'Very busy', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '休日の渋谷には人が本当に多いです。', hiragana: 'きゅうじつの しぶやには ひとが ほんとうに おおいです。', romaji: 'Kyuujitsu no Shibuya ni wa hito ga hontou ni ooi desu.', english: 'There are really a lot of people in Shibuya on holidays.' },
      { japanese: '予定に多少の変更があるかもしれません。', hiragana: 'よていに たしょうの へんこうが あるかもしれません。', romaji: 'Yotei ni tashou no henkou ga aru kamoshiremasen.', english: 'There may be some slight changes to the schedule.' }
    ]
  },
  {
    id: 117,
    kanji_number: 117,
    character: '少',
    meaning: 'Few, Little',
    level: 12,
    onyomi_readings: ['ショウ'],
    kunyomi_readings: ['すくない', 'すこし'],
    onyomi_romaji: ['shou'],
    kunyomi_romaji: ['sukunai', 'sukoshi'],
    hiragana_reading: 'しょう, すこし, すくない',
    stroke_count: 4,
    radicals: '小 (small) + 丿 (slash)',
    stroke_order_data: { count: 4, directions: ['Small radical center hook', 'Left small dot', 'Right small dot', 'Long curved sweeping slash down'] },
    mnemonic: 'Cutting small (小) into an even smaller FEW drops with a slash.',
    vocabulary: [
      { word: '少し', hiragana: 'すこし', romaji: 'sukoshi', meaning: 'A little / a bit', readingType: 'kunyomi' },
      { word: '少ない', hiragana: 'すくない', romaji: 'sukunai', meaning: 'Few / scarce', readingType: 'kunyomi' },
      { word: '少年', hiragana: 'しょうねん', romaji: 'shounen', meaning: 'Boy / youth', readingType: 'onyomi' },
      { word: '少女', hiragana: 'しょうじょ', romaji: 'shoujo', meaning: 'Girl / young lady', readingType: 'onyomi' },
      { word: '少数', hiragana: 'しょうすう', romaji: 'shousuu', meaning: 'Minority / small number', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '日本語を少し話すことができます。', hiragana: 'にほんごを すこし はなすことが できます。', romaji: 'Nihongo o sukoshi hanasu koto ga dekimasu.', english: 'I can speak a little Japanese.' },
      { japanese: '雨の日は外出する人が少ないです。', hiragana: 'あめのひは がいしゅつする ひとが すくないです。', romaji: 'Ame no hi wa gaishutsu suru hito ga sukunai desu.', english: 'On rainy days, few people go out.' }
    ]
  },
  {
    id: 118,
    kanji_number: 118,
    character: '早',
    meaning: 'Early, Fast',
    level: 12,
    onyomi_readings: ['ソウ', 'サッ'],
    kunyomi_readings: ['はやい'],
    onyomi_romaji: ['sou', 'sa-'],
    kunyomi_romaji: ['hayai'],
    hiragana_reading: 'そう, はやい',
    stroke_count: 6,
    radicals: '日 (sun) + 十 (cross)',
    stroke_order_data: { count: 6, directions: ['Top sun 日 (4 strokes)', 'Bottom cross 十 (2 strokes)'] },
    mnemonic: 'The morning sun (日) rising above the tree crosshairs at an EARLY hour.',
    vocabulary: [
      { word: '早い', hiragana: 'はやい', romaji: 'hayai', meaning: 'Early / fast', readingType: 'kunyomi' },
      { word: '早く', hiragana: 'はやく', romaji: 'hayaku', meaning: 'Early / quickly', readingType: 'kunyomi' },
      { word: '早朝', hiragana: 'そうちょう', romaji: 'souchou', meaning: 'Early morning', readingType: 'onyomi' },
      { word: '早速', hiragana: 'さっそく', romaji: 'sassoku', meaning: 'Immediately / right away', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '明日は朝早く起きて空港へ向かいます。', hiragana: 'あしたは あさはやく おきて くうこうへ むかいます。', romaji: 'Ashita wa asa hayaku okite kuukou e mukaimasu.', english: 'Tomorrow I will wake up early in the morning and head to the airport.' },
      { japanese: '早速新しいアプリを使ってみました。', hiragana: 'さっそく あたらしい あぷりを つかってみました。', romaji: 'Sassoku atarashii apuri o tsukatte mimashita.', english: 'I tried using the new app right away.' }
    ]
  },
  {
    id: 119,
    kanji_number: 119,
    character: '歩',
    meaning: 'Walk, Step',
    level: 12,
    onyomi_readings: ['ホ', 'ブ'],
    kunyomi_readings: ['あるく', 'あゆむ'],
    onyomi_romaji: ['ho', 'bu'],
    kunyomi_romaji: ['aruku', 'ayumu'],
    hiragana_reading: 'ほ, あるく',
    stroke_count: 8,
    radicals: '止 (stop) + 少 (few) variant',
    stroke_order_data: { count: 8, directions: ['Top stop 止 (4 strokes)', 'Bottom step feet strokes (4 strokes)'] },
    mnemonic: 'Stepping one foot, pausing (止), then stepping the other foot forward to WALK.',
    vocabulary: [
      { word: '歩く', hiragana: 'あるく', romaji: 'aruku', meaning: 'To walk', readingType: 'kunyomi' },
      { word: '散歩', hiragana: 'さんぽ', romaji: 'sanpo', meaning: 'A walk / stroll', readingType: 'onyomi' },
      { word: '歩道', hiragana: 'ほどう', romaji: 'hodou', meaning: 'Sidewalk', readingType: 'onyomi' },
      { word: '一歩', hiragana: 'いっぽ', romaji: 'ippo', meaning: 'One step', readingType: 'onyomi' },
      { word: '進歩', hiragana: 'しんぽ', romaji: 'shinpo', meaning: 'Progress / advancement', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '夕方に川沿いをゆっくり歩きました。', hiragana: 'ゆうがたに かわぞいを ゆっくり あるきました。', romaji: 'Yuugata ni kawazoi o yukkuri arukimashita.', english: 'In the evening I slowly walked along the river.' },
      { japanese: '毎日コツコツ勉強することが成功への第一歩です。', hiragana: 'まいにち こつこつ べんきょうすることが せいこうへの だいいっぽです。', romaji: 'Mainichi kotsukotsu benkyou suru koto ga seikou e no daiippo desu.', english: 'Studying steadily every day is the first step toward success.' }
    ]
  },
  {
    id: 120,
    kanji_number: 120,
    character: '週',
    meaning: 'Week',
    level: 12,
    onyomi_readings: ['シュウ'],
    kunyomi_readings: [],
    onyomi_romaji: ['shuu'],
    kunyomi_romaji: [],
    hiragana_reading: 'しゅう',
    stroke_count: 11,
    radicals: '辶 (road/cycle) + 周 (circuit/circumference)',
    stroke_order_data: { count: 11, directions: ['Right circuit 周 (8 strokes)', 'Left movement 辶 (3 strokes)'] },
    mnemonic: 'Cycling around the full 7-day circular lap (周) of the road (辶): a complete WEEK.',
    vocabulary: [
      { word: '今週', hiragana: 'こんしゅう', romaji: 'konshuu', meaning: 'This week', readingType: 'onyomi' },
      { word: '来週', hiragana: 'らいしゅう', romaji: 'raishuu', meaning: 'Next week', readingType: 'onyomi' },
      { word: '先週', hiragana: 'せんしゅう', romaji: 'senshuu', meaning: 'Last week', readingType: 'onyomi' },
      { word: '毎週', hiragana: 'まいしゅう', romaji: 'maishuu', meaning: 'Every week', readingType: 'onyomi' },
      { word: '一週間', hiragana: 'いっしゅうかん', romaji: 'isshuukan', meaning: 'One week', readingType: 'onyomi' },
      { word: '週末', hiragana: 'しゅうまつ', romaji: 'shuumatsu', meaning: 'Weekend', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '今週の金曜日に歓迎会が開かれます。', hiragana: 'こんしゅうの きんようびに かんげいかいが ひらかれます。', romaji: 'Konshuu no kinyoubi ni kangeikai ga hirakaremasu.', english: 'A welcome party will be held this Friday.' },
      { japanese: '一週間に三回ジムで運動しています。', hiragana: 'いっしゅうかんに さんかい じむで うんどうしています。', romaji: 'Isshuukan ni sankai jimu de undou shite imasu.', english: 'I exercise at the gym three times a week.' }
    ]
  }
];
