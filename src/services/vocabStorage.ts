import { VocabLearningStatus, VocabStatusRecord, MinnaVocabularyItem } from '@/types/minna';
import { ALL_MINNA_LESSONS } from '@/data/minnaNoNihongo';

const VOCAB_STATUS_STORAGE_KEY = 'n5_vocab_statuses_v1';
const DEFAULT_USER_ID = '00000000-0000-0000-0000-000000000001';

// In-memory cache for fast sync access
let inMemoryStatuses: Record<string, VocabStatusRecord> | null = null;

// Build master index of vocabulary items
const MASTER_VOCAB_MAP = new Map<string, MinnaVocabularyItem>();
for (const lesson of ALL_MINNA_LESSONS) {
  for (const v of lesson.vocabulary) {
    MASTER_VOCAB_MAP.set(v.id, v);
    MASTER_VOCAB_MAP.set(`m_${v.id}`, v);
  }
}

export function getMasterVocabItem(vocabId: string): MinnaVocabularyItem | undefined {
  return MASTER_VOCAB_MAP.get(vocabId);
}

// ---------------------------------------------------------------------------
// Local Cache Management (Offline-first, instant response)
// ---------------------------------------------------------------------------

export function getStoredVocabStatuses(): Record<string, VocabStatusRecord> {
  if (inMemoryStatuses) return inMemoryStatuses;

  if (typeof window === 'undefined') return {};

  try {
    const raw = localStorage.getItem(VOCAB_STATUS_STORAGE_KEY);
    if (!raw) {
      // Fallback: check if existing minna progress had learnedVocabIds to migrate seamlessly
      const legacyRaw = localStorage.getItem('minna_user_progress_v1');
      const migrated: Record<string, VocabStatusRecord> = {};
      if (legacyRaw) {
        try {
          const parsed = JSON.parse(legacyRaw);
          if (Array.isArray(parsed)) {
            parsed.forEach((l: any) => {
              const lNum = Number(l.lessonNumber) || 0;
              (l.learnedVocabIds || []).forEach((vId: string) => {
                migrated[vId] = {
                  vocabId: vId,
                  lessonNumber: lNum,
                  status: 'learned',
                  updatedAt: new Date().toISOString()
                };
              });
              (l.weakVocabIds || []).forEach((vId: string) => {
                migrated[vId] = {
                  vocabId: vId,
                  lessonNumber: lNum,
                  status: 'not_sure',
                  updatedAt: new Date().toISOString()
                };
              });
            });
            localStorage.setItem(VOCAB_STATUS_STORAGE_KEY, JSON.stringify(migrated));
          }
        } catch {}
      }
      inMemoryStatuses = migrated;
      return migrated;
    }

    inMemoryStatuses = JSON.parse(raw);
    return inMemoryStatuses || {};
  } catch (err) {
    console.error('Error reading vocabulary statuses from localStorage:', err);
    return {};
  }
}

function persistLocally(statuses: Record<string, VocabStatusRecord>) {
  inMemoryStatuses = statuses;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(VOCAB_STATUS_STORAGE_KEY, JSON.stringify(statuses));
    } catch (e) {
      console.warn('Error saving vocabulary statuses to localStorage:', e);
    }
  }
}

function notifyVocabUpdated(vocabId?: string, status?: VocabLearningStatus | null) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('vocab-status-updated', {
      detail: { vocabId, status, timestamp: Date.now() }
    }));
  }
}

// ---------------------------------------------------------------------------
// Public Query Methods
// ---------------------------------------------------------------------------

export function getVocabStatus(vocabId: string): VocabLearningStatus | null {
  const map = getStoredVocabStatuses();
  return map[vocabId]?.status || null;
}

export function getAllVocabStatuses(): Record<string, VocabStatusRecord> {
  return getStoredVocabStatuses();
}

export function getMarkedVocabCount(): number {
  const map = getStoredVocabStatuses();
  return Object.keys(map).length;
}

export function getRelearnVocabCount(): number {
  const map = getStoredVocabStatuses();
  return Object.values(map).filter(r => r.status === 'not_learned' || r.status === 'not_sure').length;
}

// ---------------------------------------------------------------------------
// Backend Synchronization & Mutation Methods
// ---------------------------------------------------------------------------

/**
 * Update the status of a single vocabulary item.
 * Saves immediately to localStorage and sends to backend API for permanent database persistence.
 */
export async function setVocabStatus(
  vocabId: string,
  lessonNumber: number,
  status: VocabLearningStatus | null,
  userId: string = DEFAULT_USER_ID
): Promise<{ success: boolean; status: VocabLearningStatus | null; error?: string }> {
  const current = { ...getStoredVocabStatuses() };

  if (!status || (status as string) === 'unmarked') {
    delete current[vocabId];
  } else {
    current[vocabId] = {
      vocabId,
      lessonNumber,
      status,
      updatedAt: new Date().toISOString(),
      userId
    };
  }

  // 1. Immediately persist to local cache for instant UI feedback
  persistLocally(current);
  notifyVocabUpdated(vocabId, status);

  // 2. Persist to backend database via API
  try {
    const res = await fetch('/api/vocabulary/status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        vocabId,
        lessonNumber,
        status,
        userId
      })
    });

    const data = await res.json();
    if (!data.success) {
      console.warn('Backend warning saving vocabulary status:', data.error);
      return { success: false, status, error: data.error };
    }

    return { success: true, status };
  } catch (err: any) {
    console.error('Network/database save failure for vocabulary status:', err);
    return { success: false, status, error: err.message };
  }
}

/**
 * Batch update multiple vocabulary statuses (e.g. from flashcard review session).
 */
export async function batchSetVocabStatus(
  updates: Array<{ vocabId: string; lessonNumber: number; status: VocabLearningStatus | null }>,
  userId: string = DEFAULT_USER_ID
): Promise<{ success: boolean; error?: string }> {
  if (updates.length === 0) return { success: true };

  const current = { ...getStoredVocabStatuses() };
  const now = new Date().toISOString();

  for (const item of updates) {
    if (!item.status || (item.status as string) === 'unmarked') {
      delete current[item.vocabId];
    } else {
      current[item.vocabId] = {
        vocabId: item.vocabId,
        lessonNumber: item.lessonNumber,
        status: item.status,
        updatedAt: now,
        userId
      };
    }
  }

  persistLocally(current);
  notifyVocabUpdated();

  // Send batch to backend database
  try {
    const res = await fetch('/api/vocabulary/status/batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ updates, userId })
    });

    const data = await res.json();
    return { success: Boolean(data.success), error: data.error };
  } catch (err: any) {
    console.error('Batch vocabulary save failure:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Fetch and merge vocabulary statuses from the backend Supabase database.
 */
export async function syncVocabStatusesFromBackend(userId: string = DEFAULT_USER_ID): Promise<Record<string, VocabStatusRecord>> {
  try {
    const res = await fetch(`/api/vocabulary/status?userId=${encodeURIComponent(userId)}`);
    if (!res.ok) return getStoredVocabStatuses();

    const data = await res.json();
    if (data.success && data.statuses) {
      const local = getStoredVocabStatuses();
      // Merge: backend is the source of truth, but keep latest local if timestamp is newer
      const merged: Record<string, VocabStatusRecord> = { ...local };

      for (const [vId, remoteRecord] of Object.entries(data.statuses as Record<string, VocabStatusRecord>)) {
        const localRecord = local[vId];
        if (!localRecord || new Date(remoteRecord.updatedAt) >= new Date(localRecord.updatedAt)) {
          merged[vId] = remoteRecord;
        }
      }

      persistLocally(merged);
      notifyVocabUpdated();
      return merged;
    }
  } catch (err) {
    console.warn('Could not sync vocabulary statuses from backend:', err);
  }

  return getStoredVocabStatuses();
}
