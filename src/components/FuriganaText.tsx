'use client';

import React from 'react';
import { ALL_120_KANJI } from '@/data/kanjiDatabase';
import { ALL_MINNA_LESSONS } from '@/data/minnaNoNihongo';

// 1. Comprehensive standalone readings for all 120 N5 Kanji
const STANDALONE_120_KANJI_DICT: Record<string, string> = {
  // Level 1 (1–10): 人 日 一 二 三 四 五 六 七 八
  '人': 'ひと', '日': 'ひ', '一': 'いち', '二': 'に', '三': 'さん',
  '四': 'よん', '五': 'ご', '六': 'ろく', '七': 'なな', '八': 'はち',

  // Level 2 (11–20): 九 十 月 火 水 木 金 土 百 千
  '九': 'きゅう', '十': 'じゅう', '月': 'つき', '火': 'ひ', '水': 'みず',
  '木': 'き', '金': 'かね', '土': 'つち', '百': 'ひゃく', '千': 'せん',

  // Level 3 (21–30): 万 円 行 来 休 見 今 大 小 上
  '万': 'まん', '円': 'えん', '行': 'い', '来': 'く', '休': 'やす',
  '見': 'み', '今': 'いま', '大': 'おお', '小': 'ちい', '上': 'うえ',

  // Level 4 (31–40): 下 中 右 左 山 川 白 本 子 男
  '下': 'した', '中': 'なか', '右': 'みぎ', '左': 'ひだり', '山': 'やま',
  '川': 'かわ', '白': 'しろ', '本': 'ほん', '子': 'こ', '男': 'おとこ',

  // Level 5 (41–50): 女 父 母 友 先 生 学 校 何 時
  '女': 'おんな', '父': 'ちち', '母': 'はは', '友': 'とも', '先': 'さき',
  '生': 'せい', '学': 'がく', '校': 'こう', '何': 'なに', '時': 'じ',

  // Level 6 (51–60): 間 分 半 毎 年 前 後 午 名 車
  '間': 'あいだ', '分': 'ふん', '半': 'はん', '毎': 'まい', '年': 'とし',
  '前': 'まえ', '後': 'あと', '午': 'ご', '名': 'な', '車': 'くるま',

  // Level 7 (61–70): 天 気 電 話 食 聞 書 読 国 外
  '天': 'てん', '気': 'き', '電': 'でん', '話': 'はなし', '食': 'た',
  '聞': 'き', '書': 'か', '読': 'よ', '国': 'くに', '外': 'そと',

  // Level 8 (71–80): 語 入 出 雨 東 西 南 北 長 高
  '語': 'ご', '入': 'はい', '出': 'で', '雨': 'あめ', '東': 'ひがし',
  '西': 'にし', '南': 'みなみ', '北': 'きた', '長': 'なが', '高': 'たか',

  // Level 9 (81–90): 口 目 手 足 近 有 花 赤 紙 買
  '口': 'くち', '目': 'め', '手': 'て', '足': 'あし', '近': 'ちか',
  '有': 'あ', '花': 'はな', '赤': 'あか', '紙': 'かみ', '買': 'か',

  // Level 10 (91–100): 朝 昼 夕 夜 私 家 会 社 店 飲
  '朝': 'あさ', '昼': 'ひる', '夕': 'ゆう', '夜': 'よる', '私': 'わたし',
  '家': 'いえ', '会': 'あ', '社': 'しゃ', '店': 'みせ', '飲': 'の',

  // Level 11 (101–110): 多 少 古 新 広 安 立 知 言 思
  '多': 'おお', '少': 'すく', '古': 'ふる', '新': 'あたら', '広': 'ひろ',
  '安': 'やす', '立': 'た', '知': 'し', '言': 'い', '思': 'おも',

  // Level 12 (111–120): 歩 走 住 空 週 魚 耳 銀 道 駅
  '歩': 'ある', '走': 'はし', '住': 'す', '空': 'そら', '週': 'しゅう',
  '魚': 'さかな', '耳': 'みみ', '銀': 'ぎん', '道': 'みち', '駅': 'えき',

  // Other Common JLPT / Minna No Nihongo Kanji
  '田': 'た', '力': 'ちから', '黒': 'くろ', '青': 'あお', '売': 'う',
  '肉': 'にく', '犬': 'いぬ', '鳥': 'とり', '町': 'まち', '京': 'きょう',
  '都': 'と', '門': 'もん', '海': 'うみ', '早': 'はや',
  '誰': 'だれ', '僕': 'ぼく', '君': 'きみ', '兄': 'あに',
  '姉': 'あね', '弟': 'おとうと', '妹': 'いもうと', '彼': 'かれ', '彼女': 'かのじょ',
  '音': 'おと', '文': 'ぶん', '字': 'じ', '薬': 'くすり', '橋': 'はし'
};

// 2. Common Inflected Verb and Adjective Forms
const COMMON_INFLECTIONS_DICT: Record<string, string> = {
  // Eating / Drinking
  '食べる': 'たべる', '食べます': 'たべます', '食べた': 'たべた', '食べて': 'たべて', '食べない': 'たべない',
  '飲む': 'のむ', '飲みます': 'のみます', '飲んだ': 'のんだ', '飲んで': 'のんで', '飲まない': 'のまない',
  // Going / Coming / Returning
  '行く': 'いく', '行きます': 'いきます', '行った': 'いった', '行って': 'いって', '行かない': 'いかない',
  '来る': 'くる', '来ます': 'きます', '来た': 'きた', '来て': 'きて', 'こない': 'こない',
  '帰る': 'かえる', '帰ります': 'かえります', '帰った': 'かえった', '帰って': 'かえって',
  // Seeing / Hearing / Reading / Writing / Speaking
  '見る': 'みる', '見ます': 'みます', '見た': 'みた', '見て': 'みて', '見ない': 'みない',
  '聞く': 'きく', '聞きます': 'ききます', '聞いた': 'きいた', '聞いて': 'きいて',
  '書く': 'かく', '書きます': 'かきます', '書いた': 'かいた', '書いて': 'かいて',
  '読む': 'よむ', '読みます': 'よみます', '読んだ': 'よんだ', '読んで': 'よんで',
  '話す': 'はなす', '話します': 'はなします', '話した': 'はなした', '話して': 'はなして',
  // Buying / Selling / Meeting / Resting
  '買う': 'かう', '買います': 'かいます', '買った': 'かった', '買って': 'かって',
  '売る': 'うる', '売ります': 'うります', '売った': 'うった', '売って': 'うって',
  '会う': 'あう', '会います': 'あいます', '会った': 'あった', '会って': 'あって',
  '休む': 'やすむ', '休みます': 'やすみます', '休んだ': 'やすんだ', '休んで': 'やすんで', '休み': 'やすみ',
  // Standing / Walking / Entering / Leaving
  '立つ': 'たつ', '立ちます': 'たちます', '立った': 'たった', '立って': 'たって',
  '歩く': 'あるく', '歩きます': 'あるきます', '歩いた': 'あるいた', '歩いて': 'あるいて',
  '入る': 'はいる', '入ります': 'はいります', '入った': 'はいった', '入って': 'はいって',
  '出る': 'でる', '出ます': 'でます', '出た': 'でた', '出て': 'でて',
  '待つ': 'まつ', '待ちます': 'まちます', '待った': 'まった', '待って': 'まって',
  '持つ': 'もつ', '持ちます': 'もちます', '持った': 'もった', '持って': 'もって',
  '教える': 'おしえる', '教えます': 'おしえます', '習う': 'ならう', '習います': 'ならいます',
  '作る': 'つくる', '作ります': 'つくります', '使う': 'つかう', '使います': 'つかいます',
  // Adjectives
  '高い': 'たかい', '高く': 'たかく', '高かった': 'たかかった',
  '安い': 'やすい', '安く': 'やすく', '安かった': 'やすかった',
  '新しい': 'あたらしい', '新しく': 'あたらしく', '新しかった': 'あたらしかった',
  '古い': 'ふるい', '古く': 'ふるく', '古かった': 'ふるかった',
  '長い': 'ながい', '長く': 'ながく', '長かった': 'ながかった',
  '多い': 'おおい', '多く': 'おおく', '多かった': 'おおかった',
  '少ない': 'すくない', '少なく': 'すくなく', '少なかった': 'すくなかった',
  '早い': 'はやい', '早く': 'はやく', '早かった': 'はやかった',
  '大きい': 'おおきい', '大きく': 'おおきく', '大きかった': 'おおきかった',
  '小さい': 'ちいさい', '小さく': 'ちいさく', '小さかった': 'ちいさかった',
  '白い': 'しろい', '白く': 'しろく', '黒い': 'くろい', '黒く': 'くろく',
  '赤い': 'あかい', '赤く': 'あかく', '青い': 'あおい', '青く': 'あおく',
  '面白い': 'おもしろい', '楽しい': 'たのしい', '美味しい': 'おいしい', '忙しい': 'いそがしい'
};

// 3. Common multi-kanji compound dictionary
export const N5_FURIGANA_DICT: Record<string, string> = {
  '外国人登録証': 'がいこくじんとうろくしょう',
  '新幹線': 'しんかんせん',
  '留学生': 'りゅうがくせい',
  '会社員': 'かいしゃいん',
  '銀行員': 'ぎんこういん',
  '図書館': 'としょかん',
  '郵便局': 'ゆうびんきょく',
  '市役所': 'しやくしょ',
  '警察署': 'けいさつしょ',
  '美術館': 'びじゅつかん',
  '博物館': 'はくぶつかん',
  '会議室': 'かいぎしつ',
  '教室': 'きょうしつ',
  '食堂': 'しょくどう',
  '事務所': 'じむしょ',
  '受付': 'うけつけ',
  '部屋': 'へや',
  '地下鉄': 'ちかてつ',
  '自転車': 'じてんしゃ',
  '自動車': 'じどうしゃ',
  '飛行機': 'ひこうき',
  '日本語': 'にほんご',
  '大学': 'だいがく',
  '高校': 'こうこう',
  '学校': 'がっこう',
  '病院': 'びょういん',
  '医者': 'いしゃ',
  '先生': 'せんせい',
  '学生': 'がくせい',
  '会社': 'かいしゃ',
  '銀行': 'ぎんこう',
  '電話': 'でんわ',
  '電気': 'でんき',
  '電車': 'でんしゃ',
  '友達': 'ともだち',
  '家族': 'かぞく',
  '両親': 'りょうしん',
  '兄弟': 'きょうだい',
  'お兄さん': 'おにいさん',
  'お姉さん': 'おねえさん',
  '弟さん': 'おとうとさん',
  '妹さん': 'いもうとさん',
  '昨日': 'きのう',
  '今日': 'きょう',
  '明日': 'あした',
  '明後日': 'あさって',
  '一昨日': 'おととい',
  '毎日': 'まいにち',
  '毎朝': 'まいあさ',
  '毎晩': 'まいばん',
  '毎週': 'まいしゅう',
  '毎月': 'まいつき',
  '毎年': 'まいとし',
  '先週': 'せんしゅう',
  '今週': 'こんしゅう',
  '来週': 'らいしゅう',
  '先月': 'せんげつ',
  '今月': 'こんげつ',
  '来月': 'らいげつ',
  '去年': 'きょねん',
  '今年': 'ことし',
  '来年': 'らいねん',
  '月曜日': 'げつようび',
  '火曜日': 'かようび',
  '水曜日': 'すいようび',
  '木曜日': 'もくようび',
  '金曜日': '金ようび',
  '土曜日': 'どようび',
  '日曜日': 'にちようび',
  '何曜日': 'なんようび',
  '朝ごはん': 'あさごはん',
  '昼ごはん': 'ひるごはん',
  '晩ごはん': 'ばんごはん',
  '写真': 'しゃしん',
  '手紙': 'てがみ',
  '切手': 'きって',
  '宿題': 'しゅくだい',
  '料理': 'りょうり',
  '音楽': 'おんがく',
  '旅行': 'りょこう',
  '散歩': 'さんぽ',
  '買い物': 'かいもの',
  '食事': 'しょくじ',
  '見学': 'けんがく',
  '勉強': 'べんきょう',
  '練習': 'れんしゅう',
  '質問': 'しつもん',
  '問題': 'もんだい',
  '答え': 'こたえ',
  '意味': 'いみ',
  '約束': 'やくそく',
  '用事': 'ようじ',
  '時間': 'じかん',
  '世界': 'せかい',
  '天気': 'てんき',
  '季節': 'きせつ',
  '春': 'はる',
  '夏': 'なつ',
  '秋': 'あき',
  '冬': 'ふゆ',
  '海': 'うみ',
  '山': 'やま',
  '川': 'かわ',
  '一番': 'いちばん',
  '一人': 'ひとり',
  '二人': 'ふたり',
  '三人': 'さんにん',
  '四人': 'よにん',
  '五人': 'ごにん',
  '一つ': 'ひとつ',
  '二つ': 'ふたつ',
  '三つ': 'みっつ',
  '四つ': 'よっつ',
  '五つ': 'いつつ',
  '六つ': 'むっつ',
  '七つ': 'ななつ',
  '八つ': 'やっつ',
  '九つ': 'ここのつ',
  '十': 'とお',
  '一本': 'いっぽん',
  '二本': 'にほん',
  '三本': 'さんぼん',
  '一杯': 'いっぱい',
  '二杯': 'にはい',
  '三杯': 'さんばい',
  '一枚': 'いちまい',
  '二枚': 'にまい',
  '一台': 'いちだい',
  '二台': 'にだい',
  '一回': 'いっかい',
  '二回': 'にかい',
  '一分': 'いっぷん',
  '二分': 'にふん',
  '三分': 'さんぷん',
  '一時': 'いちじ',
  '二時': 'にじ',
  '三時': 'さんじ',
  '四時': 'よじ',
  '七時': 'しちじ',
  '九時': 'くじ',
  '何時': 'なんじ',
  '何分': 'なんぷん',
  '一日': 'ついたち',
  '二日': 'ふつか',
  '三日': 'みっか',
  '四日': 'よっか',
  '五日': 'いつか',
  '六日': 'むいか',
  '七日': 'なのか',
  '八日': 'ようか',
  '九日': 'ここのか',
  '十日': 'とおか',
  '病気': 'びょうき',
  '薬': 'くすり',
  '熱': 'ねつ',
  '頭痛': 'ずつう',
  '趣味': 'しゅみ',
  '日記': 'にっき',
  '物価': 'ぶっか',
  '着物': 'きもの',
  '交差点': 'こうさてん',
  '信号': 'しんごう',
  '道': 'みち',
  '角': 'かど',
  '橋': 'はし',
  '駐車場': 'ちゅうしゃじょう',
  '田舎': 'いなか',
  '大使館': 'たいしかん',
  'お茶': 'おちゃ',
  '紅茶': 'こうちゃ',
  '牛乳': 'ぎゅうにゅう',
  'お酒': 'おさけ',
  '名前': 'なまえ',
  '住所': 'じゅうしょ',
  '地図': 'ちず',
  '漢字': 'かんじ',
  '英語': 'えいご',
  '外国': 'がいこく',
  '男の子': 'おとこのこ',
  '女の子': 'おんなのこ',
  '音読み': 'おんよみ',
  '訓読み': 'くんよみ'
};

// 4. Extract all vocabulary from 120 Kanji Database
const KANJI_DB_VOCAB_DICT: Record<string, string> = {};
for (const k of ALL_120_KANJI) {
  if (k.vocabulary && Array.isArray(k.vocabulary)) {
    for (const v of k.vocabulary) {
      const cleanWord = v.word.replace(/[（(].*?[)）]/g, '').trim();
      const cleanHira = v.hiragana.replace(/[（(].*?[)）]/g, '').trim();
      if (cleanWord && cleanHira && /[一-龯々]/.test(cleanWord)) {
        KANJI_DB_VOCAB_DICT[cleanWord] = cleanHira;
      }
    }
  }
}

// 5. Extract all vocabulary from Minna no Nihongo Lessons
const MINNA_VOCAB_DICT: Record<string, string> = {};
for (const lesson of ALL_MINNA_LESSONS) {
        if (lesson.vocabulary && Array.isArray(lesson.vocabulary)) {
          for (const v of lesson.vocabulary) {
            if (v.kanji && v.kanji !== v.hiragana && !v.kanji.startsWith('～') && !v.kanji.startsWith('-')) {
              const cleanKanji = v.kanji.replace(/[（(].*?[)）]/g, '').trim();
              const cleanHira = v.hiragana.replace(/[（(].*?[)）]/g, '').trim();
              if (cleanKanji && cleanHira && /[一-龯々]/.test(cleanKanji)) {
                MINNA_VOCAB_DICT[cleanKanji] = cleanHira;
              }
            }
          }
        }
      }

      // Master combined Furigana dictionary
      export const COMBINED_FURIGANA_DICT: Record<string, string> = {
        ...STANDALONE_120_KANJI_DICT,
        ...N5_FURIGANA_DICT,
        ...KANJI_DB_VOCAB_DICT,
        ...MINNA_VOCAB_DICT,
  ...COMMON_INFLECTIONS_DICT
      };

      // Sort keys descending by length so compound words match before single kanji
      const DICT_KEYS_DESC = Object.keys(COMBINED_FURIGANA_DICT).sort((a, b) => b.length - a.length);

      interface FuriganaTextProps {
        text: string;
        className?: string;
        rtClassName?: string;
      }

      // Annotate arbitrary substring using the dictionary for unbracketed Kanji
      function annotateStringWithDict(
        str: string,
        keyPrefix: string,
        rtClassName: string
      ): React.ReactNode[] {
        if (!/[一-龯々]/.test(str)) {
          return [<span key={`${keyPrefix}_raw`}>{str}</span>];
        }

        const nodes: React.ReactNode[] = [];
        let remaining = str;
        let segKey = 0;

        while (remaining.length > 0) {
          let matched = false;

          // Check against dictionary with greedy longest match first
          for (const word of DICT_KEYS_DESC) {
            if (remaining.startsWith(word)) {
              const furigana = COMBINED_FURIGANA_DICT[word];
              nodes.push(
                <ruby
                  key={`${keyPrefix}_rb_${segKey++}`}
                  className="inline-flex flex-col items-center leading-none mx-[1px] align-middle"
                >
                  <rt className={rtClassName}>{furigana}</rt>
                  <span className="font-japanese leading-tight">{word}</span>
                </ruby>
              );
              remaining = remaining.substring(word.length);
              matched = true;
              break;
            }
          }

          if (!matched) {
            // Check if the current single character has an explicit entry
            const char = remaining[0];
            const singleFurigana = COMBINED_FURIGANA_DICT[char];
            if (singleFurigana && /[一-龯々]/.test(char)) {
              nodes.push(
                <ruby
                  key={`${keyPrefix}_rb_${segKey++}`}
                  className="inline-flex flex-col items-center leading-none mx-[1px] align-middle"
                >
                  <rt className={rtClassName}>{singleFurigana}</rt>
                  <span className="font-japanese leading-tight">{char}</span>
                </ruby>
              );
            } else {
              nodes.push(<span key={`${keyPrefix}_c_${segKey++}`}>{char}</span>);
            }
            remaining = remaining.substring(1);
          }
        }

        return nodes;
      }

      export const FuriganaText: React.FC<FuriganaTextProps> = ({
        text,
        className = '',
        rtClassName = 'text-[0.62em] font-normal leading-none text-rose-500 dark:text-rose-400 select-none pb-0.5'
      }) => {
        if (!text) return null;

        // Bracket annotation regex: supports 漢字[かんじ], 漢字(かんじ), 漢字（かんじ）, 漢字【かんじ】
        const bracketRegex = /([一-龯々]+)\s*[\[(（【<]\s*([ぁ-んァ-ヶー]+)\s*[\])）】>]/g;
        const bracketMatches = Array.from(text.matchAll(bracketRegex));

        if (bracketMatches.length > 0) {
          const nodes: React.ReactNode[] = [];
          let lastIndex = 0;

          for (let i = 0; i < bracketMatches.length; i++) {
            const match = bracketMatches[i];
            const matchStart = match.index!;
            const matchEnd = matchStart + match[0].length;

            // Text before match: run through dictionary annotation
            if (matchStart > lastIndex) {
              const beforeText = text.substring(lastIndex, matchStart);
              nodes.push(...annotateStringWithDict(beforeText, `seg_${i}`, rtClassName));
            }

            const kanji = match[1];
            const furigana = match[2];

            nodes.push(
              <ruby
                key={`rb_explicit_${i}_${matchStart}`}
                className="inline-flex flex-col items-center leading-none mx-[1px] align-middle"
              >
                <rt className={rtClassName}>{furigana}</rt>
                <span className="font-japanese leading-tight">{kanji}</span>
              </ruby>
            );

            lastIndex = matchEnd;
          }

          if (lastIndex < text.length) {
            const afterText = text.substring(lastIndex);
            nodes.push(...annotateStringWithDict(afterText, `seg_end`, rtClassName));
          }

          return <span className={className}>{nodes}</span>;
        }

        // Text without bracket annotations: run through dictionary annotation
        return <span className={className}>{annotateStringWithDict(text, 'plain', rtClassName)}</span>;
      };

      export default FuriganaText;
