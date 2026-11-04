import { NextResponse } from 'next/server';
import { getServerSupabaseClient } from '@/services/serverSupabase';
import { ALL_MINNA_LESSONS } from '@/data/minnaNoNihongo';
import { MarkedVocabItemWithMeta, MinnaVocabularyItem, VocabLearningStatus } from '@/types/minna';

export const dynamic = 'force-dynamic';

const DEFAULT_USER_ID = '00000000-0000-0000-0000-000000000001';

// Pre-build index of all textbook vocabulary for instant O(1) lookups
const MASTER_VOCAB_MAP = new Map<string, MinnaVocabularyItem>();
for (const lesson of ALL_MINNA_LESSONS) {
  for (const v of lesson.vocabulary) {
    MASTER_VOCAB_MAP.set(v.id, v);
    MASTER_VOCAB_MAP.set(`m_${v.id}`, v);
  }
}

// GET: Fetch all marked vocabulary items from the backend database
export async function GET(request: Request) {
  try {
    const supabase = getServerSupabaseClient();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || DEFAULT_USER_ID;
    const filterStatus = searchParams.get('status') as VocabLearningStatus | 'all' | null;
    const filterLesson = searchParams.get('lessonNumber');
    const searchQuery = (searchParams.get('q') || '').trim().toLowerCase();

    // 1. Fetch custom lessons so custom lesson vocabulary can be matched
    const { data: customLessonsData } = await supabase
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

    // 2. Fetch all marked statuses directly from database (try vocabulary_learning_status first, fallback to content_cache)
    let recordsList: Array<{ vocabId: string; lessonNumber: number; status: VocabLearningStatus; updatedAt: string }> = [];

    try {
      const { data: tableData, error: tableErr } = await supabase
        .from('vocabulary_learning_status')
        .select('*')
        .eq('user_id', userId);

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
      const { data: cacheData, error: cacheErr } = await supabase
        .from('content_cache')
        .select('cache_key, payload, updated_at')
        .eq('content_type', 'vocabulary_status')
        .ilike('cache_key', `${prefix}%`);

      if (cacheErr) {
        console.warn('Database error querying marked vocabulary:', cacheErr.message);
        return NextResponse.json({
          success: false,
          error: cacheErr.message,
          items: [],
          counts: { total: 0, learned: 0, notSure: 0, notLearned: 0 }
        }, { status: 200 });
      }

      if (cacheData && Array.isArray(cacheData)) {
        for (const row of cacheData) {
          const payload = row.payload as any;
          if (!payload || !payload.vocabId || !payload.status) continue;
          recordsList.push({
            vocabId: payload.vocabId,
            lessonNumber: Number(payload.lessonNumber) || 0,
            status: payload.status,
            updatedAt: payload.updatedAt || row.updated_at
          });
        }
      }
    }

    // 3. Process and assemble items
    let counts = {
      total: 0,
      learned: 0,
      notSure: 0,
      notLearned: 0
    };

    const items: MarkedVocabItemWithMeta[] = [];

    for (const record of recordsList) {
      const status = record.status;
      if (status === 'learned') counts.learned++;
      else if (status === 'not_sure') counts.notSure++;
      else if (status === 'not_learned') counts.notLearned++;
      counts.total++;

      // Status filter
      if (filterStatus && filterStatus !== 'all' && status !== filterStatus) {
        continue;
      }

      // Lesson filter
      if (filterLesson && Number(filterLesson) !== Number(record.lessonNumber)) {
        continue;
      }

      // Lookup vocabulary metadata
      const vocabId = record.vocabId;
      const baseVocab = MASTER_VOCAB_MAP.get(vocabId) || customVocabMap.get(vocabId);

      if (!baseVocab) {
        continue;
      }

      // Search query filter
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

    // Sort items by lessonNumber ascending, then by ID
    items.sort((a, b) => {
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
      error: err.message || 'Error fetching marked vocabulary',
      items: [],
      counts: { total: 0, learned: 0, notSure: 0, notLearned: 0 }
    }, { status: 200 });
  }
}
