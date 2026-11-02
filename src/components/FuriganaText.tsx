'use client';

import React from 'react';

// Common N5 Kanji Compound and Word Dictionary for automatic Furigana annotation
export const N5_FURIGANA_DICT: Record<string, string> = {
  // Common multi-kanji compounds (longest first for greedy matching)
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
  '金曜日': 'きんようび',
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
  '首相': 'しゅしょう',
  '大統領': 'だいとうりょう',
  '政治': 'せいじ',
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
  '私': 'わたし',
  '僕': 'ぼく',
  '君': 'きみ',
  '父': 'ちち',
  '母': 'はは',
  '兄': 'あに',
  '姉': 'あね',
  '弟': 'おとうと',
  '妹': 'いもうと',
  '男': 'おとこ',
  '女': 'おんな',
  '男の子': 'おとこのこ',
  '女の子': 'おんなのこ',
  '犬': 'いぬ',
  '猫': 'ねこ',
  '魚': 'さかな',
  '鳥': 'とり',
  '車': 'くるま',
  '本': 'ほん',
  '水': 'みず',
  '火': 'ひ',
  '雨': 'あめ',
  '雪': 'ゆき',
  '風': 'かぜ',
  '花': 'はな',
  '手': 'て',
  '足': 'あし',
  '目': 'め',
  '耳': 'みみ',
  '口': 'くち',
  '頭': 'あたま',
  '顔': 'かお',
  '体': 'からだ',
  '誰': 'だれ',
  '何': 'なに'
};

import { ALL_MINNA_LESSONS } from '@/data/minnaNoNihongo';

// Extract all vocab items from ALL_MINNA_LESSONS for comprehensive coverage
const MINNA_VOCAB_DICT: Record<string, string> = {};
for (const lesson of ALL_MINNA_LESSONS) {
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

export const COMBINED_FURIGANA_DICT: Record<string, string> = {
  ...MINNA_VOCAB_DICT,
  ...N5_FURIGANA_DICT
};

// Sort keys by descending length for greedy matching
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
      nodes.push(<span key={`${keyPrefix}_c_${segKey++}`}>{remaining[0]}</span>);
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

  // Bracket annotation regex: 漢字[かんじ] or 漢字(かんじ) or 漢字（かんじ）
  const bracketMatches = Array.from(text.matchAll(/([一-龯々]+)[\[(（]([ぁ-んァ-ヶー]+)[\])）]/g));

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
