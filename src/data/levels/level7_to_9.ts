import { KanjiRecord } from '../../types/kanji';

export const LEVEL_7_TO_9_KANJI: KanjiRecord[] = [
  // LEVEL 7: Colors, Nature & Quantities (Kanji 61 - 70)
  {
    id: 61,
    kanji_number: 61,
    character: '黒',
    meaning: 'Black, Dark',
    level: 7,
    onyomi_readings: ['コク'],
    kunyomi_readings: ['くろ', 'くろい'],
    onyomi_romaji: ['koku'],
    kunyomi_romaji: ['kuro', 'kuroi'],
    hiragana_reading: 'こく, くろい',
    stroke_count: 11,
    radicals: '黒 (black) / 灬 (fire)',
    stroke_order_data: { count: 11, directions: ['Top field / chimney component (7 strokes)', 'Bottom four fire sparks 灬 (4 strokes)'] },
    mnemonic: 'Soot from a roaring fire (灬) blackening the chimney above into deep black.',
    vocabulary: [
      { word: '黒い', hiragana: 'くろい', romaji: 'kuroi', meaning: 'Black (adj)', readingType: 'kunyomi' },
      { word: '黒板', hiragana: 'こくばん', romaji: 'kokuban', meaning: 'Blackboard', readingType: 'onyomi' },
      { word: '白黒', hiragana: 'しろくろ', romaji: 'shirokuro', meaning: 'Black and white', readingType: 'kunyomi' },
      { word: '真っ黒', hiragana: 'まっくろ', romaji: 'makkuro', meaning: 'Pitch black', readingType: 'kunyomi' }
    ],
    example_sentences: [
      { japanese: '彼はいつもスタイリッシュな黒い服を着ています。', hiragana: 'かれは いつも すたいりっしゅな くろい ふくを きています。', romaji: 'Kare wa itsumo sutairisshu na kuroi fuku o kite imasu.', english: 'He always wears stylish black clothes.' },
      { japanese: '先生が黒板に漢字を書きました。', hiragana: 'せんせいが こくばんに かんじを かきました。', romaji: 'Sensei ga kokuban ni kanji o kakimashita.', english: 'The teacher wrote kanji on the blackboard.' }
    ]
  },
  {
    id: 62,
    kanji_number: 62,
    character: '赤',
    meaning: 'Red, Crimson',
    level: 7,
    onyomi_readings: ['セキ', 'シャク'],
    kunyomi_readings: ['あか', 'あかい'],
    onyomi_romaji: ['seki', 'shaku'],
    kunyomi_romaji: ['aka', 'akai'],
    hiragana_reading: 'せき, あかい',
    stroke_count: 7,
    radicals: '赤 (red)',
    stroke_order_data: { count: 7, directions: ['Top earth 土 (3 strokes)', 'Left diagonal slant', 'Center curved hook', 'Right two bottom strokes'] },
    mnemonic: 'Bright red burning coals glowing vividly under the soil.',
    vocabulary: [
      { word: '赤い', hiragana: 'あかい', romaji: 'akai', meaning: 'Red (adj)', readingType: 'kunyomi' },
      { word: '赤ちゃん', hiragana: 'あかちゃん', romaji: 'akachan', meaning: 'Baby', readingType: 'kunyomi' },
      { word: '赤信号', hiragana: 'あかしんごう', romaji: 'akashingou', meaning: 'Red traffic light', readingType: 'kunyomi' },
      { word: '赤十字', hiragana: 'せきじゅうじ', romaji: 'sekijuuji', meaning: 'Red Cross', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '秋になると山の木々が赤くなります。', hiragana: 'あきになると やまの きぎが あかく なります。', romaji: 'Aki ni naruto yama no kigi ga akaku narimasu.', english: 'When autumn comes, the mountain trees turn red.' },
      { japanese: '赤ちゃんがすやすやと眠っています。', hiragana: 'あかちゃんが すやすやと ねむっています。', romaji: 'Akachan ga suyasuya to nemutte imasu.', english: 'The baby is sleeping peacefully.' }
    ]
  },
  {
    id: 63,
    kanji_number: 63,
    character: '青',
    meaning: 'Blue, Green (unripe)',
    level: 7,
    onyomi_readings: ['セイ', 'ショウ'],
    kunyomi_readings: ['あお', 'あおい'],
    onyomi_romaji: ['sei', 'shou'],
    kunyomi_romaji: ['ao', 'aoi'],
    hiragana_reading: 'せい, あおい',
    stroke_count: 8,
    radicals: '青 (blue)',
    stroke_order_data: { count: 8, directions: ['Top sprout/vegetation 生 (4 strokes)', 'Bottom moon 月 (4 strokes)'] },
    mnemonic: 'Young green vegetation sprouting under the pure azure blue moonlit sky.',
    vocabulary: [
      { word: '青い', hiragana: 'あおい', romaji: 'aoi', meaning: 'Blue (adj)', readingType: 'kunyomi' },
      { word: '青空', hiragana: 'あおぞら', romaji: 'aozora', meaning: 'Blue sky', readingType: 'kunyomi' },
      { word: '青年', hiragana: 'せいねん', romaji: 'seinen', meaning: 'Youth / young man', readingType: 'onyomi' },
      { word: '青信号', hiragana: 'あおしんごう', romaji: 'aoshingou', meaning: 'Green traffic light (go signal)', readingType: 'kunyomi' }
    ],
    example_sentences: [
      { japanese: '今日は雲一つない綺麗な青空です。', hiragana: 'きょうは くもひとつない きれいな あおぞらです。', romaji: 'Kyou wa kumo hitotsu nai kirei na aozora desu.', english: 'Today is a beautiful blue sky without a single cloud.' },
      { japanese: '海の水が深く青く輝いています。', hiragana: 'うみの みずが ふかく あおく かがやいています。', romaji: 'Umi no mizu ga fukaku aoku kagayaite imasu.', english: 'The ocean water is shining deep blue.' }
    ]
  },
  {
    id: 64,
    kanji_number: 64,
    character: '雨',
    meaning: 'Rain',
    level: 7,
    onyomi_readings: ['ウ'],
    kunyomi_readings: ['あめ', 'あま-'],
    onyomi_romaji: ['u'],
    kunyomi_romaji: ['ame', 'ama-'],
    hiragana_reading: 'う, あめ',
    stroke_count: 8,
    radicals: '雨 (rain)',
    stroke_order_data: { count: 8, directions: ['Top cloud horizontal', 'Center stem', 'Outer box frame (2 strokes)', 'Four inner falling rain drops (4 strokes)'] },
    mnemonic: 'Raindrops falling from a heavy storm cloud through a window frame.',
    vocabulary: [
      { word: '雨', hiragana: 'あめ', romaji: 'ame', meaning: 'Rain', readingType: 'kunyomi' },
      { word: '大雨', hiragana: 'おおあめ', romaji: 'ooame', meaning: 'Heavy rain / downpour', readingType: 'kunyomi' },
      { word: '雨季', hiragana: 'うき', romaji: 'uki', meaning: 'Rainy season', readingType: 'onyomi' },
      { word: '梅雨', hiragana: 'つゆ', romaji: 'tsuyu', meaning: 'Rainy season in Japan', readingType: 'irregular' }
    ],
    example_sentences: [
      { japanese: '外は雨が激しく降っています。', hiragana: 'そとは あめが はげしく ふっています。', romaji: 'Soto wa ame ga hageshiku futte imasu.', english: 'Rain is falling heavily outside.' },
      { japanese: '雨が降ってきたので傘をさしました。', hiragana: 'あめが ふってきたので かさを さしました。', romaji: 'Ame ga futte kita node kasa o sashimashita.', english: 'Since it started raining, I opened my umbrella.' }
    ]
  },
  {
    id: 65,
    kanji_number: 65,
    character: '天',
    meaning: 'Heaven, Sky',
    level: 7,
    onyomi_readings: ['テン'],
    kunyomi_readings: ['あめ', 'あま'],
    onyomi_romaji: ['ten'],
    kunyomi_romaji: ['ame', 'ama'],
    hiragana_reading: 'てん',
    stroke_count: 4,
    radicals: '大 (big) / 一 (one)',
    stroke_order_data: { count: 4, directions: ['Top horizontal line', 'Lower horizontal line', 'Left sweeping curve', 'Right diagonal slant'] },
    mnemonic: 'The vast heavens stretching above the head of a tall person (大).',
    vocabulary: [
      { word: '天気', hiragana: 'てんき', romaji: 'tenki', meaning: 'Weather', readingType: 'onyomi' },
      { word: '天ぷら', hiragana: 'てんぷら', romaji: 'tenpura', meaning: 'Tempura', readingType: 'onyomi' },
      { word: '天才', hiragana: 'てんさい', romaji: 'tensai', meaning: 'Genius', readingType: 'onyomi' },
      { word: '天国', hiragana: 'てんごく', romaji: 'tengoku', meaning: 'Heaven / paradise', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '明日の天気は晴れるでしょう。', hiragana: 'あしたの てんきは はれるでしょう。', romaji: 'Ashita no tenki wa hareru deshou.', english: 'Tomorrow\'s weather will probably be clear.' },
      { japanese: '彼女はピアノを弾く天才です。', hiragana: 'かのじょは ぴあのを ひく てんさいです。', romaji: 'Kanojo wa piano o hiku tensai desu.', english: 'She is a genius at playing piano.' }
    ]
  },
  {
    id: 66,
    kanji_number: 66,
    character: '気',
    meaning: 'Spirit, Mind, Energy, Air',
    level: 7,
    onyomi_readings: ['キ', 'ケ'],
    kunyomi_readings: ['いき'],
    onyomi_romaji: ['ki', 'ke'],
    kunyomi_romaji: ['iki'],
    hiragana_reading: 'き',
    stroke_count: 6,
    radicals: '气 (steam)',
    stroke_order_data: { count: 6, directions: ['Top slant', 'Upper horizontal', 'Middle horizontal', 'Curved sweeping hook', 'Inner slant down', 'Inner spark'] },
    mnemonic: 'Rising vapors of steam and life energy radiating dynamic force.',
    vocabulary: [
      { word: '元気', hiragana: 'げんき', romaji: 'genki', meaning: 'Energetic / healthy', readingType: 'onyomi' },
      { word: '天気', hiragana: 'てんき', romaji: 'tenki', meaning: 'Weather', readingType: 'onyomi' },
      { word: '気持ち', hiragana: 'きもち', romaji: 'kimochi', meaning: 'Feeling / sensation', readingType: 'onyomi' },
      { word: '気をつける', hiragana: 'きをつける', romaji: 'ki o tsukeru', meaning: 'To be careful', readingType: 'onyomi' },
      { word: '人気', hiragana: 'にんき', romaji: 'ninki', meaning: 'Popularity', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: 'お元気ですか。はい、元気です。', hiragana: 'おげんきですか。はい、げんきです。', romaji: 'Ogenki desu ka. Hai, genki desu.', english: 'How are you? Yes, I am doing well.' },
      { japanese: '道が滑りやすいので気をつけてください。', hiragana: 'みちが すべりやすいので きをつけて ください。', romaji: 'Michi ga suberiyasui node ki o tsukete kudasai.', english: 'Please be careful because the road is slippery.' }
    ]
  },
  {
    id: 67,
    kanji_number: 67,
    character: '円',
    meaning: 'Yen, Circle, Round',
    level: 7,
    onyomi_readings: ['エン'],
    kunyomi_readings: ['まるい'],
    onyomi_romaji: ['en'],
    kunyomi_romaji: ['marui'],
    hiragana_reading: 'えん, まるい',
    stroke_count: 4,
    radicals: '冂 (box)',
    stroke_order_data: { count: 4, directions: ['Left vertical', 'Top and right frame with hook', 'Inner left vertical line', 'Bottom horizontal cross'] },
    mnemonic: 'A stylized round coin encased in an exchange box.',
    vocabulary: [
      { word: '百円', hiragana: 'ひゃくえん', romaji: 'hyakuen', meaning: '100 Yen', readingType: 'onyomi' },
      { word: '千円', hiragana: 'せんえん', romaji: 'sen\'en', meaning: '1,000 Yen', readingType: 'onyomi' },
      { word: '一万円', hiragana: 'いちまんえん', romaji: 'ichiman\'en', meaning: '10,000 Yen', readingType: 'onyomi' },
      { word: '円高', hiragana: 'えんだか', romaji: 'endaka', meaning: 'Strong yen', readingType: 'onyomi' },
      { word: '円形', hiragana: 'えんけい', romaji: 'enkei', meaning: 'Circular shape', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: 'このノートは二百円でした。', hiragana: 'この のーとは にひゃくえんでした。', romaji: 'Kono nooto wa nihyakuen deshita.', english: 'This notebook was 200 yen.' },
      { japanese: '財布に五千円札が一枚入っています。', hiragana: 'さいふに ごせんえんさつが いちまい はいっています。', romaji: 'Saifu ni gosen\'ensatsu ga ichimai haitte imasu.', english: 'There is one 5,000-yen bill in my wallet.' }
    ]
  },
  {
    id: 68,
    kanji_number: 68,
    character: '万',
    meaning: 'Ten Thousand, Myriad',
    level: 7,
    onyomi_readings: ['マン', 'バン'],
    kunyomi_readings: ['よろず'],
    onyomi_romaji: ['man', 'ban'],
    kunyomi_romaji: ['yorozu'],
    hiragana_reading: 'まん, ばん',
    stroke_count: 3,
    radicals: '一 (one)',
    stroke_order_data: { count: 3, directions: ['Top horizontal line', 'Curved stroke down with bottom-left hook', 'Left slashing curve downward'] },
    mnemonic: 'A sweeping brush mark holding 10,000 possibilities.',
    vocabulary: [
      { word: '一万', hiragana: 'いちまん', romaji: 'ichiman', meaning: '10,000', readingType: 'onyomi' },
      { word: '万年筆', hiragana: 'まんねんひつ', romaji: 'mannenhitsu', meaning: 'Fountain pen', readingType: 'onyomi' },
      { word: '万歳', hiragana: 'ばんざい', romaji: 'banzai', meaning: 'Banzai! / Cheers / Long live', readingType: 'onyomi' },
      { word: '十万', hiragana: 'じゅうまん', romaji: 'juuman', meaning: '100,000', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: 'このパソコンは十万円でした。', hiragana: 'この ぱそこんは じゅうまんえんでした。', romaji: 'Kono pasokon wa juuman\'en deshita.', english: 'This computer cost 100,000 yen.' },
      { japanese: '万年筆で美しい手紙を書きました。', hiragana: 'まんねんひつで うつくしい てがみを かきました。', romaji: 'Mannenhitsu de utsukushii tegami o kakimashita.', english: 'I wrote a beautiful letter with a fountain pen.' }
    ]
  },
  {
    id: 69,
    kanji_number: 69,
    character: '百',
    meaning: 'Hundred',
    level: 7,
    onyomi_readings: ['ヒャク'],
    kunyomi_readings: ['もも'],
    onyomi_romaji: ['hyaku'],
    kunyomi_romaji: ['momo'],
    hiragana_reading: 'ひゃく',
    stroke_count: 6,
    radicals: '白 (white) + 一 (one)',
    stroke_order_data: { count: 6, directions: ['Top horizontal line', 'Slanted center mark', 'Left vertical', 'Top and right box', 'Inner horizontal', 'Bottom closing base'] },
    mnemonic: 'The number one (一) atop white (白)—multiplying into a pure one HUNDRED.',
    vocabulary: [
      { word: '百', hiragana: 'ひゃく', romaji: 'hyaku', meaning: 'Hundred', readingType: 'onyomi' },
      { word: '三百', hiragana: 'さんびゃく', romaji: 'sanbyaku', meaning: '300', readingType: 'onyomi' },
      { word: '六百', hiragana: 'ろっぴゃく', romaji: 'roppyaku', meaning: '600', readingType: 'onyomi' },
      { word: '八百', hiragana: 'はっぴゃく', romaji: 'happyaku', meaning: '800', readingType: 'onyomi' },
      { word: '百科事典', hiragana: 'ひゃっかじてん', romaji: 'hyakkajiten', meaning: 'Encyclopedia', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: 'テストで百点を取ってとても嬉しいです。', hiragana: 'てすとで ひゃくてんを とって とても うれしいです。', romaji: 'Tesuto de hyakuten o totte totemo ureshii desu.', english: 'I got 100 points on the test and am very happy.' },
      { japanese: '本屋まであと三百メートルあります。', hiragana: 'ほんやまで あと さんびゃくめーとる あります。', romaji: 'Honya made ato sanbyakumootoru arimasu.', english: 'There are still 300 meters left to the bookstore.' }
    ]
  },
  {
    id: 70,
    kanji_number: 70,
    character: '千',
    meaning: 'Thousand',
    level: 7,
    onyomi_readings: ['セン'],
    kunyomi_readings: ['ち'],
    onyomi_romaji: ['sen'],
    kunyomi_romaji: ['chi'],
    hiragana_reading: 'せん, ち',
    stroke_count: 3,
    radicals: '十 (ten) + 丿 (slant)',
    stroke_order_data: { count: 3, directions: ['Top slanted stroke', 'Horizontal cross stroke', 'Vertical straight stroke down'] },
    mnemonic: 'A ten (十) with a slash over it, multiplying ten a hundred times into one THOUSAND.',
    vocabulary: [
      { word: '千', hiragana: 'せん', romaji: 'sen', meaning: 'Thousand', readingType: 'onyomi' },
      { word: '三千', hiragana: 'さんぜん', romaji: 'sanzen', meaning: '3,000', readingType: 'onyomi' },
      { word: '八千', hiragana: 'はっせん', romaji: 'hassen', meaning: '8,000', readingType: 'onyomi' },
      { word: '千円', hiragana: 'せんえん', romaji: 'sen\'en', meaning: '1,000 Yen', readingType: 'onyomi' },
      { word: '千葉県', hiragana: 'ちばけん', romaji: 'Chiba-ken', meaning: 'Chiba Prefecture', readingType: 'kunyomi' }
    ],
    example_sentences: [
      { japanese: 'チケットの値段は三千円です。', hiragana: 'ちけっとの ねだんは さんぜんえんです。', romaji: 'Chiketto no nedan wa sanzen\'en desu.', english: 'The ticket price is 3,000 yen.' },
      { japanese: 'この古い木は樹齢千年以上と言われています。', hiragana: 'この ふるいきは じゅれい せんねんいじょうと いわれています。', romaji: 'Kono furui ki wa jurei sennen ijou to iwarete imasu.', english: 'This old tree is said to be over a thousand years old.' }
    ]
  },

  // LEVEL 8: Movement & Action Verbs I (Kanji 71 - 80)
  {
    id: 71,
    kanji_number: 71,
    character: '行',
    meaning: 'Go, Act, Conduct',
    level: 8,
    onyomi_readings: ['コウ', 'ギョウ'],
    kunyomi_readings: ['いく', 'ゆく', 'おこなう'],
    onyomi_romaji: ['kou', 'gyou'],
    kunyomi_romaji: ['iku', 'yuku', 'okonau'],
    hiragana_reading: 'こう, いく',
    stroke_count: 6,
    radicals: '行 (go)',
    stroke_order_data: { count: 6, directions: ['Left step 彳 (3 strokes)', 'Right step strokes (3 strokes)'] },
    mnemonic: 'Crossroads in a city where pedestrians go and move in every direction.',
    vocabulary: [
      { word: '行く', hiragana: 'いく', romaji: 'iku', meaning: 'To go', readingType: 'kunyomi' },
      { word: '銀行', hiragana: 'ぎんこう', romaji: 'ginkou', meaning: 'Bank', readingType: 'onyomi' },
      { word: '旅行', hiragana: 'りょこう', romaji: 'ryokou', meaning: 'Travel / trip', readingType: 'onyomi' },
      { word: '行う', hiragana: 'おこなう', romaji: 'okonau', meaning: 'To conduct / carry out', readingType: 'kunyomi' }
    ],
    example_sentences: [
      { japanese: '明日新幹線で大阪へ行きます。', hiragana: 'あした しんかんせんで おおさかへ いきます。', romaji: 'Ashita shinkansen de Oosaka e ikimasu.', english: 'I will go to Osaka tomorrow by Shinkansen.' },
      { japanese: 'お金を下ろしに銀行へ寄りました。', hiragana: 'おかねを おろしに ぎんこうへ よりました。', romaji: 'Okane o oroshi ni ginkou e yorimashita.', english: 'I stopped by the bank to withdraw money.' }
    ]
  },
  {
    id: 72,
    kanji_number: 72,
    character: '来',
    meaning: 'Come, Next, Due',
    level: 8,
    onyomi_readings: ['ライ'],
    kunyomi_readings: ['くる', 'きたる'],
    onyomi_romaji: ['rai'],
    kunyomi_romaji: ['kuru', 'kitaru'],
    hiragana_reading: 'らい, くる',
    stroke_count: 7,
    radicals: '木 (tree) / 一',
    stroke_order_data: { count: 7, directions: ['Top horizontal line', 'Center dot', 'Left dot', 'Right dot', 'Center horizontal', 'Vertical stem down', 'Left and right slants'] },
    mnemonic: 'Ripe wheat ears coming into fruition and arriving ready for harvest.',
    vocabulary: [
      { word: '来る', hiragana: 'くる', romaji: 'kuru', meaning: 'To come', readingType: 'kunyomi' },
      { word: '来年', hiragana: 'らいねん', romaji: 'rainen', meaning: 'Next year', readingType: 'onyomi' },
      { word: '来週', hiragana: 'らいしゅう', romaji: 'raishuu', meaning: 'Next week', readingType: 'onyomi' },
      { word: '将来', hiragana: 'しょうらい', romaji: 'shourai', meaning: 'Future', readingType: 'onyomi' },
      { word: '来月', hiragana: 'らいげつ', romaji: 'raigetsu', meaning: 'Next month', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '友達が私の家に遊びに来ました。', hiragana: 'ともだちが わたしの いえに あそびに きました。', romaji: 'Tomodachi ga watashi no ie ni asobi ni kimashita.', english: 'A friend came over to my house to hang out.' },
      { japanese: '来週の会議の資料を準備してください。', hiragana: 'らいしゅうの かいぎの しりょうを じゅんびして ください。', romaji: 'Raishuu no kaigi no shiryou o junbi shite kudasai.', english: 'Please prepare the materials for next week\'s meeting.' }
    ]
  },
  {
    id: 73,
    kanji_number: 73,
    character: '出',
    meaning: 'Exit, Leave, Take Out',
    level: 8,
    onyomi_readings: ['シュツ', 'スイ'],
    kunyomi_readings: ['でる', 'だす'],
    onyomi_romaji: ['shutsu', 'sui'],
    kunyomi_romaji: ['deru', 'dasu'],
    hiragana_reading: 'しゅつ, でる, だす',
    stroke_count: 5,
    radicals: '凵 (container) / 山 (mountain)',
    stroke_order_data: { count: 5, directions: ['Center vertical', 'Left corner fold', 'Right vertical', 'Lower left corner fold', 'Bottom right vertical'] },
    mnemonic: 'One mountain sprouting up and emerging out from another mountain.',
    vocabulary: [
      { word: '出る', hiragana: 'でる', romaji: 'deru', meaning: 'To go out / exit', readingType: 'kunyomi' },
      { word: '出す', hiragana: 'だす', romaji: 'dasu', meaning: 'To take out / submit', readingType: 'kunyomi' },
      { word: '出口', hiragana: 'でぐち', romaji: 'deguchi', meaning: 'Exit', readingType: 'kunyomi' },
      { word: '出発', hiragana: 'しゅっぱつ', romaji: 'shuppatsu', meaning: 'Departure', readingType: 'onyomi' },
      { word: '思い出', hiragana: 'おもいで', romaji: 'omoide', meaning: 'Memory / recollection', readingType: 'kunyomi' }
    ],
    example_sentences: [
      { japanese: '毎朝七時に家を出ます。', hiragana: 'まいあさ しちじに いえを でます。', romaji: 'Maiasa shichi-ji ni ie o demasu.', english: 'I leave the house at 7 AM every morning.' },
      { japanese: '宿題を先生に出しました。', hiragana: 'しゅくだいを せんせいに だしました。', romaji: 'Shukudai o sensei ni dashimashita.', english: 'I submitted the homework to the teacher.' }
    ]
  },
  {
    id: 74,
    kanji_number: 74,
    character: '入',
    meaning: 'Enter, Insert',
    level: 8,
    onyomi_readings: ['ニュウ'],
    kunyomi_readings: ['はいる', 'いれる'],
    onyomi_romaji: ['nyuu'],
    kunyomi_romaji: ['hairu', 'ireru'],
    hiragana_reading: 'にゅう, はいる, いれる',
    stroke_count: 2,
    radicals: '入 (enter)',
    stroke_order_data: { count: 2, directions: ['Left short diagonal stroke', 'Right longer stroke overlapping and sweeping down'] },
    mnemonic: 'Entering into a teepee tent entrance flap.',
    vocabulary: [
      { word: '入る', hiragana: 'はいる', romaji: 'hairu', meaning: 'To enter / go in', readingType: 'kunyomi' },
      { word: '入れる', hiragana: 'いれる', romaji: 'ireru', meaning: 'To put into / insert', readingType: 'kunyomi' },
      { word: '入口', hiragana: 'いりぐち', romaji: 'iriguchi', meaning: 'Entrance', readingType: 'kunyomi' },
      { word: '入学', hiragana: 'にゅうがく', romaji: 'nyuugaku', meaning: 'School admission / enrollment', readingType: 'onyomi' },
      { word: '輸入', hiragana: 'ゆにゅう', romaji: 'yunyuu', meaning: 'Importation', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '部屋に入る前に靴を脱ぎます。', hiragana: 'へやに はいるまえに くつを ぬぎます。', romaji: 'Heya ni hairu mae ni kutsu o nugimasu.', english: 'I take off my shoes before entering the room.' },
      { japanese: 'コーヒーに砂糖を少し入れました。', hiragana: 'こーひーに さとうを すこし いれました。', romaji: 'Koohii ni satou o sukoshi iremashita.', english: 'I put a little sugar into the coffee.' }
    ]
  },
  {
    id: 75,
    kanji_number: 75,
    character: '見',
    meaning: 'See, Look, View',
    level: 8,
    onyomi_readings: ['ケン'],
    kunyomi_readings: ['みる', 'みえる', 'みせる'],
    onyomi_romaji: ['ken'],
    kunyomi_romaji: ['miru', 'mieru', 'miseru'],
    hiragana_reading: 'けん, みる',
    stroke_count: 7,
    radicals: '目 (eye) + 儿 (legs)',
    stroke_order_data: { count: 7, directions: ['Top eye 目 (5 strokes)', 'Bottom walking legs 儿 (2 strokes)'] },
    mnemonic: 'An eye (目) walking on legs (儿) to see the wonderful world.',
    vocabulary: [
      { word: '見る', hiragana: 'みる', romaji: 'miru', meaning: 'To see / watch', readingType: 'kunyomi' },
      { word: '見える', hiragana: 'みえる', romaji: 'mieru', meaning: 'To be visible / can see', readingType: 'kunyomi' },
      { word: '見せる', hiragana: 'みせる', romaji: 'miseru', meaning: 'To show', readingType: 'kunyomi' },
      { word: '意見', hiragana: 'いけん', romaji: 'iken', meaning: 'Opinion / view', readingType: 'onyomi' },
      { word: '見学', hiragana: 'けんがく', romaji: 'kengaku', meaning: 'Inspection / field study trip', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '週末に映画館で最新の映画を見ました。', hiragana: 'しゅうまつに えいがかんで さいしんの えいがを みました。', romaji: 'Shuumatsu ni eigakan de saishin no eiga o mimashita.', english: 'I watched the latest movie at the theater over the weekend.' },
      { japanese: '窓から青い海が見えます。', hiragana: 'まどから あおい うみが みえます。', romaji: 'Mado kara aoi umi ga miemasu.', english: 'The blue ocean is visible from the window.' }
    ]
  },
  {
    id: 76,
    kanji_number: 76,
    character: '聞',
    meaning: 'Hear, Listen, Ask',
    level: 8,
    onyomi_readings: ['ブン', 'モン'],
    kunyomi_readings: ['きく', 'きこえる'],
    onyomi_romaji: ['bun', 'mon'],
    kunyomi_romaji: ['kiku', 'kikoeru'],
    hiragana_reading: 'ぶん, きく',
    stroke_count: 14,
    radicals: '門 (gate) + 耳 (ear)',
    stroke_order_data: { count: 14, directions: ['Outer gate 門 (8 strokes)', 'Inner ear 耳 (6 strokes)'] },
    mnemonic: 'Putting your ear (耳) up to the door gates (門) to listen carefully.',
    vocabulary: [
      { word: '聞く', hiragana: 'きく', romaji: 'kiku', meaning: 'To hear / listen / ask', readingType: 'kunyomi' },
      { word: '聞こえる', hiragana: 'きこえる', romaji: 'kikoeru', meaning: 'To be audible', readingType: 'kunyomi' },
      { word: '新聞', hiragana: 'しんぶん', romaji: 'shinbun', meaning: 'Newspaper', readingType: 'onyomi' },
      { word: '聞き手', hiragana: 'ききて', romaji: 'kikite', meaning: 'Listener / audience', readingType: 'kunyomi' }
    ],
    example_sentences: [
      { japanese: '毎朝通勤中にラジオニュースを聞きます。', hiragana: 'まいあさ つうきんちゅうに らじおにゅーすを ききます。', romaji: 'Maiasa tsuukinchuu ni rajio nyuusu o kikimasu.', english: 'I listen to radio news every morning during my commute.' },
      { japanese: '隣の部屋から楽しそうな声が聞こえます。', hiragana: 'となりの へやから たのしそうな こえが きこえます。', romaji: 'Tonari no heya kara tanoshisou na koe ga kikoemasu.', english: 'I can hear cheerful voices coming from next door.' }
    ]
  },
  {
    id: 77,
    kanji_number: 77,
    character: '書',
    meaning: 'Write, Book, Document',
    level: 8,
    onyomi_readings: ['ショ'],
    kunyomi_readings: ['かく'],
    onyomi_romaji: ['sho'],
    kunyomi_romaji: ['kaku'],
    hiragana_reading: 'しょ, かく',
    stroke_count: 10,
    radicals: '日 (sun) / 聿 (brush)',
    stroke_order_data: { count: 10, directions: ['Top brush 聿 strokes (6 strokes)', 'Bottom sun 日 (4 strokes)'] },
    mnemonic: 'A hand holding a fine calligraphy brush (聿) writing scriptures on bright sunny paper (日).',
    vocabulary: [
      { word: '書く', hiragana: 'かく', romaji: 'kaku', meaning: 'To write', readingType: 'kunyomi' },
      { word: '辞書', hiragana: 'じしょ', romaji: 'jisho', meaning: 'Dictionary', readingType: 'onyomi' },
      { word: '図書館', hiragana: 'としょかん', romaji: 'toshokan', meaning: 'Library', readingType: 'onyomi' },
      { word: '教科書', hiragana: 'きょうかしょ', romaji: 'kyoukasho', meaning: 'Textbook', readingType: 'onyomi' },
      { word: '読書', hiragana: 'どくしょ', romaji: 'dokusho', meaning: 'Reading books', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: 'ノートに新しい漢字を丁寧に書きました。', hiragana: 'のーとに あたらしい かんじを ていねいに かきました。', romaji: 'Nooto ni atarashii kanji o teinei ni kakimashita.', english: 'I neatly wrote the new kanji in my notebook.' },
      { japanese: 'わからない単語は辞書で調べます。', hiragana: 'わからない たんごは じしょで しらべます。', romaji: 'Wakaranai tango wa jisho de shirabemasu.', english: 'I look up words I don\'t understand in the dictionary.' }
    ]
  },
  {
    id: 78,
    kanji_number: 78,
    character: '読',
    meaning: 'Read',
    level: 8,
    onyomi_readings: ['ドク', 'トク'],
    kunyomi_readings: ['よむ'],
    onyomi_romaji: ['doku', 'toku'],
    kunyomi_romaji: ['yomu'],
    hiragana_reading: 'どく, よむ',
    stroke_count: 14,
    radicals: '言 (word/speech) + 売 (sell)',
    stroke_order_data: { count: 14, directions: ['Left words 言 (7 strokes)', 'Right sell 売 (7 strokes)'] },
    mnemonic: 'Speaking words (言) aloud as you read sales notices (売) or books.',
    vocabulary: [
      { word: '読む', hiragana: 'よむ', romaji: 'yomu', meaning: 'To read', readingType: 'kunyomi' },
      { word: '読書', hiragana: 'どくしょ', romaji: 'dokusho', meaning: 'Reading books', readingType: 'onyomi' },
      { word: '読み方', hiragana: 'よみかた', romaji: 'yomikata', meaning: 'Reading way / pronunciation', readingType: 'kunyomi' },
      { word: '読者', hiragana: 'どくしゃ', romaji: 'dokusha', meaning: 'Reader / subscriber', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '寝る前にベッドで本を読みます。', hiragana: 'ねるまえに べっどで ほんを よみます。', romaji: 'Neru mae ni beddo de hon o yomimasu.', english: 'I read books in bed before sleeping.' },
      { japanese: 'この漢字の読み方を教えてください。', hiragana: 'この かんじの よみかたを おしえて ください。', romaji: 'Kono kanji no yomikata o oshiete kudasai.', english: 'Please tell me how to read this kanji.' }
    ]
  },
  {
    id: 79,
    kanji_number: 79,
    character: '話',
    meaning: 'Talk, Speak, Story',
    level: 8,
    onyomi_readings: ['ワ'],
    kunyomi_readings: ['はなす', 'はなし'],
    onyomi_romaji: ['wa'],
    kunyomi_romaji: ['hanasu', 'hanashi'],
    hiragana_reading: 'わ, はなす, はなし',
    stroke_count: 13,
    radicals: '言 (words) + 舌 (tongue)',
    stroke_order_data: { count: 13, directions: ['Left words 言 (7 strokes)', 'Right tongue 舌 (6 strokes)'] },
    mnemonic: 'Using your tongue (舌) to articulate spoken words (言) when you talk.',
    vocabulary: [
      { word: '話す', hiragana: 'はなす', romaji: 'hanasu', meaning: 'To talk / speak', readingType: 'kunyomi' },
      { word: '話', hiragana: 'はなし', romaji: 'hanashi', meaning: 'Story / talk', readingType: 'kunyomi' },
      { word: '電話', hiragana: 'でんわ', romaji: 'denwa', meaning: 'Telephone', readingType: 'onyomi' },
      { word: '会話', hiragana: 'かいわ', romaji: 'kaiwa', meaning: 'Conversation', readingType: 'onyomi' },
      { word: '世話', hiragana: 'せわ', romaji: 'sewa', meaning: 'Care / looking after', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '日本語で先生と楽しく話しました。', hiragana: 'にほんごで せんせいと たのしく はなしました。', romaji: 'Nihongo de sensei to tanoshiku hanashimashita.', english: 'I talked cheerfully with the teacher in Japanese.' },
      { japanese: '後で電話をかけ直しますね。', hiragana: 'あとで でんわを かけなおしますね。', romaji: 'Ato de denwa o kakenaoshimasu ne.', english: 'I will call you back later, okay?' }
    ]
  },
  {
    id: 80,
    kanji_number: 80,
    character: '語',
    meaning: 'Word, Language, Discourse',
    level: 8,
    onyomi_readings: ['ゴ'],
    kunyomi_readings: ['かたる'],
    onyomi_romaji: ['go'],
    kunyomi_romaji: ['kataru'],
    hiragana_reading: 'ご, かたる',
    stroke_count: 14,
    radicals: '言 (word) + 五 (five) + 口 (mouth)',
    stroke_order_data: { count: 14, directions: ['Left words 言 (7 strokes)', 'Top right five 五 (4 strokes)', 'Bottom right mouth 口 (3 strokes)'] },
    mnemonic: 'Words (言) coming from five (五) mouths (口) creating a shared language.',
    vocabulary: [
      { word: '日本語', hiragana: 'にほんご', romaji: 'nihongo', meaning: 'Japanese language', readingType: 'onyomi' },
      { word: '英語', hiragana: 'えいご', romaji: 'eigo', meaning: 'English language', readingType: 'onyomi' },
      { word: '単語', hiragana: 'たんご', romaji: 'tango', meaning: 'Vocabulary word', readingType: 'onyomi' },
      { word: '語学', hiragana: 'ごがく', romaji: 'gogaku', meaning: 'Language study', readingType: 'onyomi' },
      { word: '物語', hiragana: 'ものがたり', romaji: 'monogatari', meaning: 'Tale / story', readingType: 'kunyomi' }
    ],
    example_sentences: [
      { japanese: '日本語の単語を毎日十個覚えています。', hiragana: 'にほんごの たんごを まいにち じゅっこ おぼえています。', romaji: 'Nihongo no tango o mainichi jukko oboete imasu.', english: 'I memorize ten Japanese vocabulary words every day.' },
      { japanese: '日本の昔話や物語が大好きです。', hiragana: 'にほんの むかしばなしや ものがたりが だいすきです。', romaji: 'Nihon no mukashibanashi ya monogatari ga daisuki desu.', english: 'I love Japanese folklore and tales.' }
    ]
  },

  // LEVEL 9: Living, Sustenance & Social Verbs (Kanji 81 - 90)
  {
    id: 81,
    kanji_number: 81,
    character: '食',
    meaning: 'Eat, Food, Meal',
    level: 9,
    onyomi_readings: ['ショク', 'ジキ'],
    kunyomi_readings: ['たべる', 'くらう'],
    onyomi_romaji: ['shoku', 'jiki'],
    kunyomi_romaji: ['taberu', 'kurau'],
    hiragana_reading: 'しょく, たべる',
    stroke_count: 9,
    radicals: '食 (food/eat)',
    stroke_order_data: { count: 9, directions: ['Top roof (2 strokes)', 'Middle horizontal and vertical frame', 'Bottom right hook stroke'] },
    mnemonic: 'A sheltered dish with tasty good food ready to be eaten.',
    vocabulary: [
      { word: '食べる', hiragana: 'たべる', romaji: 'taberu', meaning: 'To eat', readingType: 'kunyomi' },
      { word: '食べ物', hiragana: 'たべもの', romaji: 'tabemono', meaning: 'Food', readingType: 'kunyomi' },
      { word: '食堂', hiragana: 'しょくどう', romaji: 'shokudou', meaning: 'Cafeteria / dining hall', readingType: 'onyomi' },
      { word: '食事', hiragana: 'しょくじ', romaji: 'shokuji', meaning: 'Meal', readingType: 'onyomi' },
      { word: '朝食', hiragana: 'ちょうしょく', romaji: 'choushoku', meaning: 'Breakfast', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '昼休みに美味しい寿司を食べました。', hiragana: 'ひるやすみに おいしい すしを たべました。', romaji: 'Hiruyasumi ni oishii sushi o tabemashita.', english: 'I ate delicious sushi during lunch break.' },
      { japanese: 'バランスの良い食事を心がけています。', hiragana: 'ばらんすの よい しょくじを こころがけて います。', romaji: 'Baransu no yoi shokuji o kokorogakete imasu.', english: 'I keep a well-balanced diet in mind.' }
    ]
  },
  {
    id: 82,
    kanji_number: 82,
    character: '飲',
    meaning: 'Drink',
    level: 9,
    onyomi_readings: ['イン'],
    kunyomi_readings: ['のむ'],
    onyomi_romaji: ['in'],
    kunyomi_romaji: ['nomu'],
    hiragana_reading: 'いん, のむ',
    stroke_count: 12,
    radicals: '食 (food) + 欠 (yawn/open mouth)',
    stroke_order_data: { count: 12, directions: ['Left food 食 (8 strokes)', 'Right open mouth 欠 (4 strokes)'] },
    mnemonic: 'Opening your mouth (欠) to drink nutritious nourishment (食).',
    vocabulary: [
      { word: '飲む', hiragana: 'のむ', romaji: 'nomu', meaning: 'To drink', readingType: 'kunyomi' },
      { word: '飲み物', hiragana: 'のみもの', romaji: 'nomimono', meaning: 'Drink / beverage', readingType: 'kunyomi' },
      { word: '飲食店', hiragana: 'いんしょくてん', romaji: 'inshokuten', meaning: 'Restaurant / eatery', readingType: 'onyomi' },
      { word: '飲み会', hiragana: 'のみかい', romaji: 'nomikai', meaning: 'Drinking party', readingType: 'kunyomi' }
    ],
    example_sentences: [
      { japanese: '緑茶をゆっくり飲みながらリラックスします。', hiragana: 'りょくちゃを ゆっくり のみながら りらっくすします。', romaji: 'Ryokucha o yukkuri nominagara rirakkusu shimasu.', english: 'I relax while slowly drinking green tea.' },
      { japanese: '冷たい飲み物を自販機で買いました。', hiragana: 'つめたい のみものを じはんきで かいました。', romaji: 'Tsumetai nomimono o jihanki de kaimashita.', english: 'I bought a cold drink from the vending machine.' }
    ]
  },
  {
    id: 83,
    kanji_number: 83,
    character: '休',
    meaning: 'Rest, Vacation, Day Off',
    level: 9,
    onyomi_readings: ['キュウ'],
    kunyomi_readings: ['やすむ', 'やすまる'],
    onyomi_romaji: ['kyuu'],
    kunyomi_romaji: ['yasumu', 'yasumaru'],
    hiragana_reading: 'きゅう, やすむ',
    stroke_count: 6,
    radicals: '亻 (person) + 木 (tree)',
    stroke_order_data: { count: 6, directions: ['Left person 亻 (2 strokes)', 'Right tree 木 (4 strokes)'] },
    mnemonic: 'A weary person (亻) leaning peacefully against a shady tree (木) to rest.',
    vocabulary: [
      { word: '休む', hiragana: 'やすむ', romaji: 'yasumu', meaning: 'To rest / take time off', readingType: 'kunyomi' },
      { word: '休み', hiragana: 'やすみ', romaji: 'yasumi', meaning: 'Rest / break / holiday', readingType: 'kunyomi' },
      { word: '休日', hiragana: 'きゅうじつ', romaji: 'kyuujitsu', meaning: 'Holiday / day off', readingType: 'onyomi' },
      { word: '夏休み', hiragana: 'なつやすみ', romaji: 'natsuyasumi', meaning: 'Summer vacation', readingType: 'kunyomi' }
    ],
    example_sentences: [
      { japanese: '少し疲れたのでカフェで休みましょう。', hiragana: 'すこし つかれたので かふぇで やすみましょう。', romaji: 'Sukoshi tsukareta node kafe de yasumimashou.', english: 'Since we are a bit tired, let\'s take a rest at the cafe.' },
      { japanese: '明日は待ちに待った休日です。', hiragana: 'あしたは まちにまった きゅうじつです。', romaji: 'Ashita wa machinimat-ta kyuujitsu desu.', english: 'Tomorrow is the long-awaited holiday.' }
    ]
  },
  {
    id: 84,
    kanji_number: 84,
    character: '買',
    meaning: 'Buy, Purchase',
    level: 9,
    onyomi_readings: ['バイ'],
    kunyomi_readings: ['かう'],
    onyomi_romaji: ['bai'],
    kunyomi_romaji: ['kau'],
    hiragana_reading: 'ばい, かう',
    stroke_count: 12,
    radicals: '貝 (shell/money) + 罒 (net)',
    stroke_order_data: { count: 12, directions: ['Top eye/net 罒 (5 strokes)', 'Bottom shell 貝 (7 strokes)'] },
    mnemonic: 'Using cowrie shell money (貝) under the marketplace net to BUY treasures.',
    vocabulary: [
      { word: '買う', hiragana: 'かう', romaji: 'kau', meaning: 'To buy', readingType: 'kunyomi' },
      { word: '買い物', hiragana: 'かいもの', romaji: 'kaimono', meaning: 'Shopping', readingType: 'kunyomi' },
      { word: '売買', hiragana: 'ばいばい', romaji: 'baibai', meaning: 'Trade / buying and selling', readingType: 'onyomi' },
      { word: '買い手', hiragana: 'かいて', romaji: 'kaite', meaning: 'Buyer', readingType: 'kunyomi' }
    ],
    example_sentences: [
      { japanese: 'スーパーで野菜と果物を買いました。', hiragana: 'すーぱーで やさいと くだものを かいました。', romaji: 'Suupaa de yasai to kudamono o kaimashita.', english: 'I bought vegetables and fruit at the supermarket.' },
      { japanese: '週末にデパートへ買い物に行きます。', hiragana: 'しゅうまつに でぱーとへ かいものに いきます。', romaji: 'Shuumatsu ni depaato e kaimono ni ikimasu.', english: 'I will go shopping at the department store over the weekend.' }
    ]
  },
  {
    id: 85,
    kanji_number: 85,
    character: '売',
    meaning: 'Sell',
    level: 9,
    onyomi_readings: ['バイ'],
    kunyomi_readings: ['うる', 'うれる'],
    onyomi_romaji: ['bai'],
    kunyomi_romaji: ['uru', 'ureru'],
    hiragana_reading: 'ばい, うる',
    stroke_count: 7,
    radicals: '士 (scholar) / 兀 (legs)',
    stroke_order_data: { count: 7, directions: ['Top scholar 士 (3 strokes)', 'Middle roof-cross (2 strokes)', 'Bottom legs (2 strokes)'] },
    mnemonic: 'A vendor standing tall displaying merchandise on legs to SELL to the crowd.',
    vocabulary: [
      { word: '売る', hiragana: 'うる', romaji: 'uru', meaning: 'To sell', readingType: 'kunyomi' },
      { word: '売り場', hiragana: 'うりば', romaji: 'uriba', meaning: 'Sales counter / sales floor', readingType: 'kunyomi' },
      { word: '売店', hiragana: 'ばいてん', romaji: 'baiten', meaning: 'Kiosk / stall', readingType: 'onyomi' },
      { word: '売り切れ', hiragana: 'うりきれ', romaji: 'urikire', meaning: 'Sold out', readingType: 'kunyomi' }
    ],
    example_sentences: [
      { japanese: 'この店は美味しいパンを売っています。', hiragana: 'この みせは おいしい ぱんを うっています。', romaji: 'Kono mise wa oishii pan o utte imasu.', english: 'This shop sells delicious bread.' },
      { japanese: '人気の商品はすぐに売り切れました。', hiragana: 'にんきの しょうひんは すぐに うりきれました。', romaji: 'Ninki no shouhin wa sugu ni urikiremashita.', english: 'The popular product sold out immediately.' }
    ]
  },
  {
    id: 86,
    kanji_number: 86,
    character: '立',
    meaning: 'Stand, Establish',
    level: 9,
    onyomi_readings: ['リツ', 'リュウ'],
    kunyomi_readings: ['たつ', 'たてる'],
    onyomi_romaji: ['ritsu', 'ryuu'],
    kunyomi_romaji: ['tatsu', 'tateru'],
    hiragana_reading: 'りつ, たつ',
    stroke_count: 5,
    radicals: '立 (stand)',
    stroke_order_data: { count: 5, directions: ['Top dot', 'Upper horizontal', 'Two inner slanted legs (2 strokes)', 'Bottom wide ground line'] },
    mnemonic: 'A person standing firmly with two feet planted solidly on the ground.',
    vocabulary: [
      { word: '立つ', hiragana: 'たつ', romaji: 'tatsu', meaning: 'To stand up', readingType: 'kunyomi' },
      { word: '立てる', hiragana: 'たてる', romaji: 'tateru', meaning: 'To set up / build', readingType: 'kunyomi' },
      { word: '国立', hiragana: 'こくりつ', romaji: 'kokuritsu', meaning: 'National / state-run', readingType: 'onyomi' },
      { word: '役に立つ', hiragana: 'やくにたつ', romaji: 'yaku ni tatsu', meaning: 'To be useful / helpful', readingType: 'kunyomi' }
    ],
    example_sentences: [
      { japanese: '電車でお年寄りに席を譲るため立ちました。', hiragana: 'でんしゃで おとしよりに せきを ゆずるため たちました。', romaji: 'Densha de otoshiyori ni seki o yuzuru tame tachimashita.', english: 'I stood up on the train to give my seat to an elderly person.' },
      { japanese: 'このアプリは日本語学習にとても役に立ちます。', hiragana: 'この あぷりは にほんごがくしゅうに とても やくにたちます。', romaji: 'Kono apuri wa nihongo gakushuu ni totemo yaku ni tachimasu.', english: 'This app is very helpful for learning Japanese.' }
    ]
  },
  {
    id: 87,
    kanji_number: 87,
    character: '会',
    meaning: 'Meet, Society, Association',
    level: 9,
    onyomi_readings: ['カイ', 'エ'],
    kunyomi_readings: ['あう'],
    onyomi_romaji: ['kai', 'e'],
    kunyomi_romaji: ['au'],
    hiragana_reading: 'かい, あう',
    stroke_count: 6,
    radicals: '人 (person) / 亼 (gather)',
    stroke_order_data: { count: 6, directions: ['Top roof slant left', 'Top roof slant right', 'Two inner horizontal bars (2 strokes)', 'Lower corner stroke', 'Bottom horizontal'] },
    mnemonic: 'People gathering together under one roof to MEET and talk.',
    vocabulary: [
      { word: '会う', hiragana: 'あう', romaji: 'au', meaning: 'To meet', readingType: 'kunyomi' },
      { word: '会社', hiragana: 'かいしゃ', romaji: 'kaisha', meaning: 'Company / corporation', readingType: 'onyomi' },
      { word: '会話', hiragana: 'かいわ', romaji: 'kaiwa', meaning: 'Conversation', readingType: 'onyomi' },
      { word: '会議', hiragana: 'かいぎ', romaji: 'kaigi', meaning: 'Meeting / conference', readingType: 'onyomi' },
      { word: '教会', hiragana: 'きょうかい', romaji: 'kyoukai', meaning: 'Church', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '明日の午後、カフェで友達に会います。', hiragana: 'あしたの ごご、かふぇで ともだちに あいます。', romaji: 'Ashita no gogo, kafe de tomodachi ni aimasu.', english: 'Tomorrow afternoon I will meet my friend at the cafe.' },
      { japanese: '三時から重要なプロジェクトの会議があります。', hiragana: 'さんじから じゅうような ぷろじぇくとの かいぎが あります。', romaji: 'San-ji kara juuyou na purojekuto no kaigi ga arimasu.', english: 'There is an important project meeting starting at 3 o\'clock.' }
    ]
  },
  {
    id: 88,
    kanji_number: 88,
    character: '社',
    meaning: 'Company, Society, Shrine',
    level: 9,
    onyomi_readings: ['シャ'],
    kunyomi_readings: ['やしろ'],
    onyomi_romaji: ['sha'],
    kunyomi_romaji: ['yashiro'],
    hiragana_reading: 'しゃ',
    stroke_count: 7,
    radicals: '示 / 礻 (altar) + 土 (earth)',
    stroke_order_data: { count: 7, directions: ['Left altar 礻 (4 strokes)', 'Right earth 土 (3 strokes)'] },
    mnemonic: 'An altar (礻) built on local soil (土) where the community and company gather together.',
    vocabulary: [
      { word: '会社', hiragana: 'かいしゃ', romaji: 'kaisha', meaning: 'Company / workplace', readingType: 'onyomi' },
      { word: '社員', hiragana: 'しゃいん', romaji: 'shain', meaning: 'Company employee', readingType: 'onyomi' },
      { word: '社会', hiragana: 'しゃかい', romaji: 'shakai', meaning: 'Society', readingType: 'onyomi' },
      { word: '神社', hiragana: 'じんじゃ', romaji: 'jinja', meaning: 'Shinto shrine', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '毎朝八時半に会社に出社します。', hiragana: 'まいあさ はちじはんに かいしゃに しゅっしゃします。', romaji: 'Maiasa hachijihan ni kaisha ni shussha shimasu.', english: 'I arrive at the company at 8:30 every morning.' },
      { japanese: '初詣でお正月に神社へ参拝に行きました。', hiragana: 'はつもうでで おしょうがつに じんじゃへ さんぱいに いきました。', romaji: 'Hatsumoude de oshougatsu ni jinja e sanpai ni ikimashita.', english: 'I went to pray at the shrine for New Year\'s Hatsumoude.' }
    ]
  },
  {
    id: 89,
    kanji_number: 89,
    character: '店',
    meaning: 'Shop, Store',
    level: 9,
    onyomi_readings: ['テン'],
    kunyomi_readings: ['みせ'],
    onyomi_romaji: ['ten'],
    kunyomi_romaji: ['mise'],
    hiragana_reading: 'てん, みせ',
    stroke_count: 8,
    radicals: '广 (cliff roof) + 占 (fortune/occupy)',
    stroke_order_data: { count: 8, directions: ['Roof 广 (3 strokes)', 'Inner fortune 占 (5 strokes)'] },
    mnemonic: 'A storefront shelter (广) occupied (占) by welcoming shopkeepers.',
    vocabulary: [
      { word: '店', hiragana: 'みせ', romaji: 'mise', meaning: 'Shop / store', readingType: 'kunyomi' },
      { word: '店員', hiragana: 'てんいん', romaji: 'ten\'in', meaning: 'Shop clerk / salesperson', readingType: 'onyomi' },
      { word: '喫茶店', hiragana: 'きっさてん', romaji: 'kissaten', meaning: 'Coffee shop / tea house', readingType: 'onyomi' },
      { word: '書店', hiragana: 'しょてん', romaji: 'shoten', meaning: 'Bookshop', readingType: 'onyomi' },
      { word: '売店', hiragana: 'ばいてん', romaji: 'baiten', meaning: 'Kiosk / stall', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: '駅前の美味しい喫茶店でコーヒーを飲みました。', hiragana: 'えきまえの おいしい きっさてんで こーひーを のみました。', romaji: 'Ekimae no oishii kissaten de koohii o nomimashita.', english: 'I drank coffee at a delicious cafe in front of the station.' },
      { japanese: 'その店の店員さんはとても丁寧でした。', hiragana: 'その みせの てんいんさんは とても ていねいでした。', romaji: 'Sono mise no ten\'in-san wa totemo teinei deshita.', english: 'The store clerk at that shop was very polite.' }
    ]
  },
  {
    id: 90,
    kanji_number: 90,
    character: '国',
    meaning: 'Country, Nation',
    level: 9,
    onyomi_readings: ['コク'],
    kunyomi_readings: ['くに'],
    onyomi_romaji: ['koku'],
    kunyomi_romaji: ['kuni'],
    hiragana_reading: 'こく, くに',
    stroke_count: 8,
    radicals: '囗 (enclosure) + 玉 (jewel)',
    stroke_order_data: { count: 8, directions: ['Outer left vertical', 'Top and right enclosure frame', 'Inner jewel 玉 (4 strokes)', 'Bottom closing foundation horizontal'] },
    mnemonic: 'Enclosed borders (囗) protecting the precious jade jewel (玉) of a sovereign NATION.',
    vocabulary: [
      { word: '国', hiragana: 'くに', romaji: 'kuni', meaning: 'Country', readingType: 'kunyomi' },
      { word: '外国', hiragana: 'がいこく', romaji: 'gaikoku', meaning: 'Foreign country', readingType: 'onyomi' },
      { word: '中国', hiragana: 'ちゅうごく', romaji: 'chuugoku', meaning: 'China', readingType: 'onyomi' },
      { word: '韓国', hiragana: 'かんこく', romaji: 'kankoku', meaning: 'South Korea', readingType: 'onyomi' },
      { word: '国際', hiragana: 'こくさい', romaji: 'kokusai', meaning: 'International', readingType: 'onyomi' }
    ],
    example_sentences: [
      { japanese: 'お国はどちらですか。', hiragana: 'おくには どちらですか。', romaji: 'Okuni wa dochira desu ka.', english: 'Which country are you from?' },
      { japanese: '将来、世界中のいろいろな国を旅行したいです。', hiragana: 'しょうらい、せかいじゅうの いろいろな くにを りょこうしたいです。', romaji: 'Shourai, sekaijuu no iroiro na kuni o ryokou shitai desu.', english: 'In the future, I want to travel to various countries around the world.' }
    ]
  }
];
