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
  { level: 1, title: 'Level 1: People, Day & Foundational Numbers', subtitle: 'Essential person, day and numbers 1 to 8', kanjiRange: 'Kanji 1–10', theme: '人 日 一 二 三 四 五 六 七 八', kanjiIds: [1,2,3,4,5,6,7,8,9,10] },
  { level: 2, title: 'Level 2: Numbers, Weekdays & Quantities', subtitle: 'Days of the week, 9, 10, hundred and thousand', kanjiRange: 'Kanji 11–20', theme: '九 十 月 火 水 木 金 土 百 千', kanjiIds: [11,12,13,14,15,16,17,18,19,20] },
  { level: 3, title: 'Level 3: Money, Basic Verbs & Dimensions', subtitle: 'Ten thousand, yen, action verbs and sizes', kanjiRange: 'Kanji 21–30', theme: '万 円 行 来 休 見 今 大 小 上', kanjiIds: [21,22,23,24,25,26,27,28,29,30] },
  { level: 4, title: 'Level 4: Positions, Nature & Identity', subtitle: 'Directions, nature, origin, children and men', kanjiRange: 'Kanji 31–40', theme: '下 中 右 左 山 川 白 本 子 男', kanjiIds: [31,32,33,34,35,36,37,38,39,40] },
  { level: 5, title: 'Level 5: Family, Relationships & School', subtitle: 'Family members, friends, school and time', kanjiRange: 'Kanji 41–50', theme: '女 父 母 友 先 生 学 校 何 時', kanjiIds: [41,42,43,44,45,46,47,48,49,50] },
  { level: 6, title: 'Level 6: Time Intervals, Schedule & Travel', subtitle: 'Minutes, half hours, years, sequence and cars', kanjiRange: 'Kanji 51–60', theme: '間 分 半 毎 年 前 後 午 名 車', kanjiIds: [51,52,53,54,55,56,57,58,59,60] },
  { level: 7, title: 'Level 7: Weather, Senses, Actions & World', subtitle: 'Atmosphere, electricity, eating, reading and countries', kanjiRange: 'Kanji 61–70', theme: '天 気 電 話 食 聞 書 読 国 外', kanjiIds: [61,62,63,64,65,66,67,68,69,70] },
  { level: 8, title: 'Level 8: Language, Movement & Directions', subtitle: 'Entering, exiting, rain, compass points and height', kanjiRange: 'Kanji 71–80', theme: '語 入 出 雨 東 西 南 北 長 高', kanjiIds: [71,72,73,74,75,76,77,78,79,80] },
  { level: 9, title: 'Level 9: Body Parts, Commerce & Nature', subtitle: 'Anatomy, proximity, existence, color and shopping', kanjiRange: 'Kanji 81–90', theme: '口 目 手 足 近 有 花 赤 紙 買', kanjiIds: [81,82,83,84,85,86,87,88,89,90] },
  { level: 10, title: 'Level 10: Daily Cycle, Society & Living', subtitle: 'Times of day, home, company, stores and drinking', kanjiRange: 'Kanji 91–100', theme: '朝 昼 夕 夜 私 家 会 社 店 飲', kanjiIds: [91,92,93,94,95,96,97,98,99,100] },
  { level: 11, title: 'Level 11: Adjectives, Mind & Expression', subtitle: 'Opposites, quality, standing, knowing, speaking and thinking', kanjiRange: 'Kanji 101–110', theme: '多 少 古 新 広 安 立 知 言 思', kanjiIds: [101,102,103,104,105,106,107,108,109,110] },
  { level: 12, title: 'Level 12: Movement, Environment & Town Places', subtitle: 'Walking, running, living, sky, weeks, fish, ears, banks, roads and stations', kanjiRange: 'Kanji 111–120', theme: '歩 走 住 空 週 魚 耳 銀 道 駅', kanjiIds: [111,112,113,114,115,116,117,118,119,120] }
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
