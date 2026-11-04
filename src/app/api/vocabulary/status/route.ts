import { NextResponse } from 'next/server';
import { getServerSupabaseClient } from '@/services/serverSupabase';
import { VocabLearningStatus, VocabStatusRecord } from '@/types/minna';

export const dynamic = 'force-dynamic';

const DEFAULT_USER_ID = '00000000-0000-0000-0000-000000000001';

// GET: Retrieve all vocabulary statuses for a user (or filtered by lesson/status)
export async function GET(request: Request) {
  try {
    const supabase = getServerSupabaseClient();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || DEFAULT_USER_ID;
    const lessonParam = searchParams.get('lessonNumber');
    const statusParam = searchParams.get('status') as VocabLearningStatus | null;

    const statuses: Record<string, VocabStatusRecord> = {};
    const list: VocabStatusRecord[] = [];

    // 1. Try reading from dedicated vocabulary_learning_status table first
    try {
      const { data: vlsData, error: vlsErr } = await supabase
        .from('vocabulary_learning_status')
        .select('*')
        .eq('user_id', userId);

      if (!vlsErr && Array.isArray(vlsData) && vlsData.length > 0) {
        for (const row of vlsData) {
          if (lessonParam && Number(lessonParam) !== Number(row.lesson_number)) continue;
          if (statusParam && row.status !== statusParam) continue;

          const record: VocabStatusRecord = {
            vocabId: row.vocab_id,
            lessonNumber: Number(row.lesson_number) || 0,
            status: row.status,
            updatedAt: row.updated_at || new Date().toISOString(),
            userId
          };
          statuses[record.vocabId] = record;
          list.push(record);
        }

        return NextResponse.json({
          success: true,
          statuses,
          list,
          count: list.length,
          source: 'vocabulary_learning_status'
        });
      }
    } catch {}

    // 2. Fallback to content_cache
    const prefix = `vocab_status_${userId}_`;
    const { data, error } = await supabase
      .from('content_cache')
      .select('cache_key, payload, updated_at')
      .eq('content_type', 'vocabulary_status')
      .ilike('cache_key', `${prefix}%`);

    if (error) {
      console.warn('Error fetching vocabulary statuses from content_cache:', error.message);
      return NextResponse.json({
        success: false,
        error: error.message,
        statuses: {},
        list: []
      }, { status: 200 });
    }

    if (data && Array.isArray(data)) {
      for (const row of data) {
        const payload = row.payload as any;
        if (!payload || !payload.vocabId || !payload.status) continue;

        if (lessonParam && Number(lessonParam) !== Number(payload.lessonNumber)) {
          continue;
        }

        if (statusParam && payload.status !== statusParam) {
          continue;
        }

        const record: VocabStatusRecord = {
          vocabId: payload.vocabId,
          lessonNumber: Number(payload.lessonNumber) || 0,
          status: payload.status,
          updatedAt: payload.updatedAt || row.updated_at || new Date().toISOString(),
          userId
        };

        statuses[record.vocabId] = record;
        list.push(record);
      }
    }

    return NextResponse.json({
      success: true,
      statuses,
      list,
      count: list.length,
      source: 'content_cache'
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Failed to fetch vocabulary statuses',
      statuses: {},
      list: []
    }, { status: 200 });
  }
}

// POST: Save or update a single vocabulary status
export async function POST(request: Request) {
  try {
    const supabase = getServerSupabaseClient();
    const body = await request.json();
    const {
      vocabId,
      lessonNumber,
      status, // 'learned' | 'not_sure' | 'not_learned' | null (to delete)
      userId = DEFAULT_USER_ID
    } = body;

    if (!vocabId) {
      return NextResponse.json({
        success: false,
        error: 'Missing required field: vocabId'
      }, { status: 400 });
    }

    const lNum = Number(lessonNumber) || 0;
    const cacheKey = `vocab_status_${userId}_${vocabId}`;
    const updatedAt = new Date().toISOString();

    // 1. If status is null or 'unmarked', delete the status entry
    if (!status || status === 'unmarked') {
      await supabase
        .from('content_cache')
        .delete()
        .eq('cache_key', cacheKey);

      // Also delete from vocabulary_learning_status table if it exists
      try {
        await supabase
          .from('vocabulary_learning_status')
          .delete()
          .eq('user_id', userId)
          .eq('vocab_id', vocabId);
      } catch {}

      // Also clean up from minna_user_progress if it corresponds to standard lesson
      if (lNum >= 1 && lNum <= 50) {
        try {
          const { data: existingProg } = await supabase
            .from('minna_user_progress')
            .select('*')
            .eq('user_id', userId)
            .eq('lesson_number', lNum)
            .maybeSingle();

          if (existingProg) {
            const nextLearned = (existingProg.learned_vocab_ids || []).filter((id: string) => id !== vocabId);
            const nextWeak = (existingProg.weak_vocab_ids || []).filter((id: string) => id !== vocabId);
            await supabase
              .from('minna_user_progress')
              .update({
                learned_vocab_ids: nextLearned,
                weak_vocab_ids: nextWeak,
                updated_at: updatedAt
              })
              .eq('user_id', userId)
              .eq('lesson_number', lNum);
          }
        } catch (e) {
          console.warn('Could not clean minna_user_progress on unmark:', e);
        }
      }

      return NextResponse.json({
        success: true,
        vocabId,
        status: null,
        message: 'Vocabulary status removed successfully'
      });
    }

    // 2. Validate valid status value
    const validStatuses: VocabLearningStatus[] = ['learned', 'not_sure', 'not_learned'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({
        success: false,
        error: `Invalid status "${status}". Allowed values: ${validStatuses.join(', ')}`
      }, { status: 400 });
    }

    // 3. Upsert into content_cache
    const payload = {
      vocabId,
      lessonNumber: lNum,
      status,
      updatedAt,
      userId
    };

    await supabase
      .from('content_cache')
      .upsert({
        cache_key: cacheKey,
        content_type: 'vocabulary_status',
        payload,
        updated_at: updatedAt
      }, { onConflict: 'cache_key' });

    // 4. Also upsert into vocabulary_learning_status table if created
    try {
      await supabase
        .from('vocabulary_learning_status')
        .upsert({
          user_id: userId,
          vocab_id: vocabId,
          lesson_number: lNum,
          status,
          updated_at: updatedAt
        }, { onConflict: 'user_id,vocab_id' });
    } catch {}

    // 5. Also synchronize minna_user_progress for consistency
    if (lNum >= 1 && lNum <= 50) {
      try {
        const { data: existingProg } = await supabase
          .from('minna_user_progress')
          .select('*')
          .eq('user_id', userId)
          .eq('lesson_number', lNum)
          .maybeSingle();

        let currentLearned: string[] = existingProg?.learned_vocab_ids || [];
        let currentWeak: string[] = existingProg?.weak_vocab_ids || [];

        if (status === 'learned') {
          if (!currentLearned.includes(vocabId)) currentLearned = [...currentLearned, vocabId];
          currentWeak = currentWeak.filter(id => id !== vocabId);
        } else if (status === 'not_sure' || status === 'not_learned') {
          currentLearned = currentLearned.filter(id => id !== vocabId);
          if (!currentWeak.includes(vocabId)) currentWeak = [...currentWeak, vocabId];
        }

        const progRow = {
          user_id: userId,
          lesson_number: lNum,
          status: existingProg?.status || 'in_progress',
          learned_vocab_ids: currentLearned,
          weak_vocab_ids: currentWeak,
          last_studied_at: updatedAt,
          updated_at: updatedAt
        };

        await supabase
          .from('minna_user_progress')
          .upsert(progRow, { onConflict: 'user_id,lesson_number' });
      } catch (e) {
        console.warn('Error syncing minna_user_progress table:', e);
      }
    }

    return NextResponse.json({
      success: true,
      vocabId,
      lessonNumber: lNum,
      status,
      updatedAt
    });
  } catch (err: any) {
    console.error('API /api/vocabulary/status error:', err);
    return NextResponse.json({
      success: false,
      error: err.message || 'Internal server error saving vocabulary status'
    }, { status: 500 });
  }
}
