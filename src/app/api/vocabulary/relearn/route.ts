import { NextResponse } from 'next/server';
import { getDatabase, cloudAuthorized, OWNER_ID } from '@/services/serverDatabase';
import { ALL_MINNA_LESSONS } from '@/data/minnaNoNihongo';
import { MarkedVocabItemWithMeta, MinnaVocabularyItem, VocabLearningStatus } from '@/types/minna';

export const dynamic = 'force-dynamic';


const MASTER_VOCAB_MAP = new Map<string, MinnaVocabularyItem>();
for (const lesson of ALL_MINNA_LESSONS) {
  for (const v of lesson.vocabulary) {
    MASTER_VOCAB_MAP.set(v.id, v);
    MASTER_VOCAB_MAP.set(`m_${v.id}`, v);
  }
}

// GET: Fetch all vocabulary marked as "not_learned" or "not_sure"
export async function GET(request: Request) {
  if (!cloudAuthorized(request)) return NextResponse.json({ success: false, error: 'Unlock cloud access in Settings.' }, { status: 401 });
  try {
    const db = getDatabase();
    const { searchParams } = new URL(request.url);
    const userId = OWNER_ID;
    const filterStatus = searchParams.get('status'); // 'not_learned' | 'not_sure' | 'all'
    const filterLesson = searchParams.get('lessonNumber');
    const searchQuery = (searchParams.get('q') || '').trim().toLowerCase();

    // Custom lessons vocabulary lookup
    const { data: customLessonsData } = await db
      .from('custom_lessons')
      .select('vocabulary')
      .eq('user_id', userId);

    const customVocabMap = new Map<string, MinnaVocabularyItem>();
    if (customLessonsData && Array.isArray(customLessonsData)) {
      for (const row of customLessonsData) {
        if (Array.isArray(row.vocabulary)) {
          for (const item of row.vocabulary) {
            if (item && item.id) {
              customVocabMap.set(item.id, item);
            }
          }
        }
      }
    }

    // Try vocabulary_learning_status table first, fallback to content_cache
    let recordsList: Array<{ vocabId: string; lessonNumber: number; status: VocabLearningStatus; updatedAt: string }> = [];

    try {
      const { data: tableData, error: tableErr } = await db
        .from('vocabulary_learning_status')
        .select('*')
        .eq('user_id', userId)
        .in('status', ['not_learned', 'not_sure']);

      if (!tableErr && Array.isArray(tableData) && tableData.length > 0) {
        recordsList = tableData.map(r => ({
          vocabId: r.vocab_id,
          lessonNumber: Number(r.lesson_number) || 0,
          status: r.status,
          updatedAt: r.updated_at
        }));
      }
    } catch {}

    if (recordsList.length === 0) {
      const prefix = `vocab_status_${userId}_`;
      const { data: cacheData, error: cacheErr } = await db
        .from('content_cache')
        .select('cache_key, payload, updated_at')
        .eq('content_type', 'vocabulary_status')
        .ilike('cache_key', `${prefix}%`);

      if (cacheErr) {
        console.warn('Database error querying relearn vocabulary:', cacheErr.message);
        return NextResponse.json({
          success: false,
          error: cacheErr.message,
          items: [],
          counts: { total: 0, notSure: 0, notLearned: 0 }
        }, { status: 200 });
      }

      if (cacheData && Array.isArray(cacheData)) {
        for (const row of cacheData) {
          const payload = row.payload as any;
          if (!payload || !payload.vocabId || !payload.status) continue;
          if (payload.status === 'not_learned' || payload.status === 'not_sure') {
            recordsList.push({
              vocabId: payload.vocabId,
              lessonNumber: Number(payload.lessonNumber) || 0,
              status: payload.status,
              updatedAt: payload.updatedAt || row.updated_at
            });
          }
        }
      }
    }

    const counts = {
      total: 0,
      notSure: 0,
      notLearned: 0
    };

    const items: MarkedVocabItemWithMeta[] = [];

    for (const record of recordsList) {
      const status = record.status;
      // Strictly filter to NOT LEARNED and NOT SURE only
      if (status !== 'not_learned' && status !== 'not_sure') {
        continue;
      }

      if (status === 'not_sure') counts.notSure++;
      if (status === 'not_learned') counts.notLearned++;
      counts.total++;

      if (filterStatus && filterStatus !== 'all' && status !== filterStatus) {
        continue;
      }

      if (filterLesson && Number(filterLesson) !== Number(record.lessonNumber)) {
        continue;
      }

      const vocabId = record.vocabId;
      const baseVocab = MASTER_VOCAB_MAP.get(vocabId) || customVocabMap.get(vocabId);
      if (!baseVocab) continue;

      if (searchQuery) {
        const matchKanji = baseVocab.kanji.toLowerCase().includes(searchQuery);
        const matchHiragana = baseVocab.hiragana.toLowerCase().includes(searchQuery);
        const matchRomaji = baseVocab.romaji.toLowerCase().includes(searchQuery);
        const matchEnglish = baseVocab.english.toLowerCase().includes(searchQuery);
        if (!matchKanji && !matchHiragana && !matchRomaji && !matchEnglish) {
          continue;
        }
      }

      items.push({
        ...baseVocab,
        learningStatus: status,
        status,
        statusUpdatedAt: record.updatedAt
      });
    }

    items.sort((a, b) => {
      // Prioritize "not_learned" before "not_sure", then by lesson number
      if (a.status !== b.status) {
        return a.status === 'not_learned' ? -1 : 1;
      }
      if (a.lessonNumber !== b.lessonNumber) return a.lessonNumber - b.lessonNumber;
      return a.id.localeCompare(b.id);
    });

    return NextResponse.json({
      success: true,
      items,
      count: items.length,
      counts
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Error fetching re-learning vocabulary',
      items: [],
      counts: { total: 0, notSure: 0, notLearned: 0 }
    }, { status: 200 });
  }
}
