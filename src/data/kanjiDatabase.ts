import { KanjiRecord } from '../types/kanji';
import { LEVEL_1_TO_3_KANJI } from './levels/level1_to_3';
import { LEVEL_4_TO_6_KANJI } from './levels/level4_to_6';
import { LEVEL_7_TO_9_KANJI } from './levels/level7_to_9';
import { LEVEL_10_TO_12_KANJI } from './levels/level10_to_12';

// Master curated 120-Kanji Beginner/N5 Study Syllabus
export const ALL_120_KANJI: KanjiRecord[] = [
  ...LEVEL_1_TO_3_KANJI,
  ...LEVEL_4_TO_6_KANJI,
  ...LEVEL_7_TO_9_KANJI,
  ...LEVEL_10_TO_12_KANJI
];

export interface LevelInfo {
  level: number;
  title: string;
  subtitle: string;
  kanjiRange: string;
  theme: string;
  kanjiIds: number[];
}

export const LEVEL_METADATA: LevelInfo[] = [
  { level: 1, title: 'Level 1: Basic Numbers & Foundations', subtitle: 'Numbers 1 to 10', kanjiRange: 'Kanji 1–10', theme: '一 二 三 四 五 六 七 八 九 十', kanjiIds: [1,2,3,4,5,6,7,8,9,10] },
  { level: 2, title: 'Level 2: Nature, Calendar & Cosmic Elements', subtitle: 'Days of the week & natural world', kanjiRange: 'Kanji 11–20', theme: '日 月 火 水 木 金 土 山 川 田', kanjiIds: [11,12,13,14,15,16,17,18,19,20] },
  { level: 3, title: 'Level 3: People, Human Body & Strength', subtitle: 'Human anatomy and identity', kanjiRange: 'Kanji 21–30', theme: '人 子 女 男 目 口 耳 手 足 力', kanjiIds: [21,22,23,24,25,26,27,28,29,30] },
  { level: 4, title: 'Level 4: Directions, Sizes & Origin', subtitle: 'Space, quantity and life', kanjiRange: 'Kanji 31–40', theme: '上 下 中 大 小 本 半 分 先 生', kanjiIds: [31,32,33,34,35,36,37,38,39,40] },
  { level: 5, title: 'Level 5: Time, Intervals & Routine', subtitle: 'Expressing hours, days and sequence', kanjiRange: 'Kanji 41–50', theme: '年 今 毎 何 時 間 午 前 後 朝', kanjiIds: [41,42,43,44,45,46,47,48,49,50] },
  { level: 6, title: 'Level 6: Compass Points, School & Basics', subtitle: 'Directions and academic life', kanjiRange: 'Kanji 51–60', theme: '昼 夜 東 西 南 北 学 校 名 白', kanjiIds: [51,52,53,54,55,56,57,58,59,60] },
  { level: 7, title: 'Level 7: Colors, Weather & Money', subtitle: 'Atmosphere and Japanese currency', kanjiRange: 'Kanji 61–70', theme: '黒 赤 青 雨 天 気 円 万 百 千', kanjiIds: [61,62,63,64,65,66,67,68,69,70] },
  { level: 8, title: 'Level 8: Movement & Communication Verbs', subtitle: 'Going, seeing, speaking and writing', kanjiRange: 'Kanji 71–80', theme: '行 来 出 入 見 聞 書 読 話 語', kanjiIds: [71,72,73,74,75,76,77,78,79,80] },
  { level: 9, title: 'Level 9: Daily Living, Commerce & Society', subtitle: 'Eating, resting, buying and community', kanjiRange: 'Kanji 81–90', theme: '食 飲 休 買 売 立 会 社 店 国', kanjiIds: [81,82,83,84,85,86,87,88,89,90] },
  { level: 10, title: 'Level 10: Travel, Transport & Animals', subtitle: 'Vehicles, stations and nature', kanjiRange: 'Kanji 91–100', theme: '道 車 駅 電 花 魚 肉 犬 鳥 友', kanjiIds: [91,92,93,94,95,96,97,98,99,100] },
  { level: 11, title: 'Level 11: Family, Town & Geography', subtitle: 'Parents, household, town and capital', kanjiRange: 'Kanji 101–110', theme: '父 母 家 町 京 都 門 外 空 海', kanjiIds: [101,102,103,104,105,106,107,108,109,110] },
  { level: 12, title: 'Level 12: Core Descriptors & Adjectives', subtitle: 'Key descriptive words and time units', kanjiRange: 'Kanji 111–120', theme: '高 安 新 古 長 多 少 早 歩 週', kanjiIds: [111,112,113,114,115,116,117,118,119,120] }
];

export const getKanjiById = (id: number): KanjiRecord | undefined => {
  return ALL_120_KANJI.find(k => k.id === id);
};

export const getKanjiByLevel = (level: number): KanjiRecord[] => {
  return ALL_120_KANJI.filter(k => k.level === level);
};

export const searchKanji = (query: string): KanjiRecord[] => {
  const q = query.trim().toLowerCase();
  if (!q) return ALL_120_KANJI;
  
  return ALL_120_KANJI.filter(k => {
    return (
      k.character.includes(q) ||
      k.meaning.toLowerCase().includes(q) ||
      k.hiragana_reading.includes(q) ||
      k.onyomi_readings.some(o => o.includes(q) || o.toLowerCase().includes(q)) ||
      k.kunyomi_readings.some(u => u.includes(q) || u.toLowerCase().includes(q)) ||
      k.onyomi_romaji.some(r => r.toLowerCase().includes(q)) ||
      k.kunyomi_romaji.some(r => r.toLowerCase().includes(q)) ||
      k.vocabulary.some(v => v.word.includes(q) || v.hiragana.includes(q) || v.meaning.toLowerCase().includes(q) || v.romaji.toLowerCase().includes(q))
    );
  });
};
