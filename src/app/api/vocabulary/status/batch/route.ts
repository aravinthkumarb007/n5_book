import { NextResponse } from 'next/server';
import { getServerSupabaseClient } from '@/services/serverSupabase';
import { VocabLearningStatus } from '@/types/minna';

export const dynamic = 'force-dynamic';

const DEFAULT_USER_ID = '00000000-0000-0000-0000-000000000001';

export async function POST(request: Request) {
  try {
    const supabase = getServerSupabaseClient();
    const body = await request.json();
    const { updates, userId = DEFAULT_USER_ID } = body;

    if (!Array.isArray(updates) || updates.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Expected "updates" array of { vocabId, lessonNumber, status }'
      }, { status: 400 });
    }

    const updatedAt = new Date().toISOString();
    const validStatuses: VocabLearningStatus[] = ['learned', 'not_sure', 'not_learned'];

    const cacheRows = [];
    const tableRows = [];
    const lessonUpdatesMap = new Map<number, { learnedToAdd: string[]; learnedToRemove: string[]; weakToAdd: string[]; weakToRemove: string[] }>();

    for (const item of updates) {
      if (!item.vocabId) continue;
      const status = item.status;
      const lNum = Number(item.lessonNumber) || 0;

      if (!status || status === 'unmarked') {
        // Queue delete from cache & table
        await supabase
          .from('content_cache')
          .delete()
          .eq('cache_key', `vocab_status_${userId}_${item.vocabId}`);

        try {
          await supabase
            .from('vocabulary_learning_status')
            .delete()
            .eq('user_id', userId)
            .eq('vocab_id', item.vocabId);
        } catch {}

        continue;
      }

      if (!validStatuses.includes(status)) continue;

      cacheRows.push({
        cache_key: `vocab_status_${userId}_${item.vocabId}`,
        content_type: 'vocabulary_status',
        payload: {
          vocabId: item.vocabId,
          lessonNumber: lNum,
          status,
          updatedAt,
          userId
        },
        updated_at: updatedAt
      });

      tableRows.push({
        user_id: userId,
        vocab_id: item.vocabId,
        lesson_number: lNum,
        status,
        updated_at: updatedAt
      });

      if (lNum >= 1 && lNum <= 50) {
        if (!lessonUpdatesMap.has(lNum)) {
          lessonUpdatesMap.set(lNum, {
            learnedToAdd: [],
            learnedToRemove: [],
            weakToAdd: [],
            weakToRemove: []
          });
        }
        const mapEntry = lessonUpdatesMap.get(lNum)!;
        if (status === 'learned') {
          mapEntry.learnedToAdd.push(item.vocabId);
          mapEntry.weakToRemove.push(item.vocabId);
        } else {
          mapEntry.weakToAdd.push(item.vocabId);
          mapEntry.learnedToRemove.push(item.vocabId);
        }
      }
    }

    if (cacheRows.length > 0) {
      await supabase
        .from('content_cache')
        .upsert(cacheRows, { onConflict: 'cache_key' });
    }

    if (tableRows.length > 0) {
      try {
        await supabase
          .from('vocabulary_learning_status')
          .upsert(tableRows, { onConflict: 'user_id,vocab_id' });
      } catch {}
    }

    // Synchronize minna_user_progress for all affected lessons
    for (const [lessonNumber, changes] of lessonUpdatesMap.entries()) {
      try {
        const { data: existingProg } = await supabase
          .from('minna_user_progress')
          .select('*')
          .eq('user_id', userId)
          .eq('lesson_number', lessonNumber)
          .maybeSingle();

        let learned = new Set<string>(existingProg?.learned_vocab_ids || []);
        let weak = new Set<string>(existingProg?.weak_vocab_ids || []);

        changes.learnedToAdd.forEach(id => learned.add(id));
        changes.learnedToRemove.forEach(id => learned.delete(id));
        changes.weakToAdd.forEach(id => weak.add(id));
        changes.weakToRemove.forEach(id => weak.delete(id));

        await supabase
          .from('minna_user_progress')
          .upsert({
            user_id: userId,
            lesson_number: lessonNumber,
            status: existingProg?.status || 'in_progress',
            learned_vocab_ids: Array.from(learned),
            weak_vocab_ids: Array.from(weak),
            last_studied_at: updatedAt,
            updated_at: updatedAt
          }, { onConflict: 'user_id,lesson_number' });
      } catch (e) {
        console.warn(`Could not sync lesson ${lessonNumber} in batch:`, e);
      }
    }

    return NextResponse.json({
      success: true,
      processedCount: updates.length,
      savedCount: cacheRows.length
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Batch update error'
    }, { status: 500 });
  }
}
