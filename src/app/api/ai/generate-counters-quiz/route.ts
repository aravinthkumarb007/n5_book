import { NextResponse } from 'next/server';
import { callUnifiedAi } from '@/services/aiRouter';
import { CountersTestCategory, CountersTestQuestion } from '@/types/counters';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const category: CountersTestCategory = body.category || 'mixed';
    const count: number = Math.min(20, Math.max(5, body.count || 8));
    const difficulty: 'easy' | 'medium' | 'hard' = body.difficulty || 'medium';
    const provider = body.provider === 'groq' || body.provider === 'gemini' ? body.provider : undefined;
    const pastFingerprints: string[] = Array.isArray(body.pastQuestionFingerprints)
      ? body.pastQuestionFingerprints
      : [];

    const categoryNames: Record<CountersTestCategory, string> = {
      numbers: 'Japanese Numbers & Pronunciations',
      counters: 'Japanese Counters (14 Core Types)',
      time: 'Japanese Time & Clock Expressions',
      months: 'Japanese Months (1月〜12月)',
      dates: 'Japanese Calendar Dates (1日〜31日)',
      days_of_week: 'Days of the Week (曜日)',
      minutes_hours: 'Hours & Minutes (時・分)',
      mixed: 'Mixed Counters & Numbers Assessment',
      full: 'Full Comprehensive Counters & Time Examination'
    };

    const systemPrompt = `You are a Japanese Language Proficiency Test specialist testing Japanese Counters, Numbers, Time, and Dates at JLPT N5 beginner level.
Category: "${categoryNames[category]}" (${category}).

RULES:
1. Generate authentic, high-quality Japanese counter, number, date, or time questions.
2. Focus heavily on classic N5 sound changes, euphonic shifts, and irregular readings:
   - Counters: 1人 (ひとり), 2人 (ふたり), 4人 (よにん); 1本 (いっぽん), 3本 (さんぼん), 6本 (ろっぽん), 8本 (はっぽん); 3匹 (さんびき); 3階 (さんがい); 20歳 (はたち); etc.
   - Time: 4時 (よじ), 7時 (しちじ), 9時 (くじ); 1分 (いっぷん), 3分 (さんぷん), 6分 (ろっぷん), 8分 (はっぷん), 10分 (じゅっぷん).
   - Months: 4月 (しがつ), 7月 (しちがつ), 9月 (くがつ).
   - Dates: 1日 (ついたち), 2日 (ふつか), 3日 (みっか), 4日 (よっか), 8日 (ようか), 14日 (じゅうよっか), 20日 (はつか), 24日 (にじゅうよっか).
   - Duration vs Clock: 2時間 (duration) vs 2時 (time of day).
3. Always provide bracket Furigana for Kanji characters: 漢字[かんじ].
4. Exactly FOUR (4) options per question with exactly ONE correct answer.
5. Provide a helpful, clear explanation in English.

Return valid JSON with a "questions" array matching:
{
  "questions": [
    {
      "id": "cq1",
      "category": "${category}",
      "categoryName": "${categoryNames[category]}",
      "prompt": "The question prompt with bracket furigana",
      "contextSentence": "Optional example context sentence",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "correctAnswer": "Exact string of correct option",
      "explanation": "Clear explanation of counter rule or sound change",
      "targetItem": "The counter or number tested (e.g. 3本 or 4日)"
    }
  ]
}`;

    let difficultyRules = '';
    if (difficulty === 'easy') {
      difficultyRules = `DIFFICULTY: EASY (初級)
      - Focus on basic regular numbers(1 - 100) or regular counters without complex sound changes(e.g.枚 for flat objects, 台 for machines, 人 for 3 + people).
- Keep context sentences short and direct.`;
    } else if (difficulty === 'hard') {
      difficultyRules = `DIFFICULTY: HARD(上級) - MANDATORY RULES:
    - DO NOT generate simple straightforward numbers or easy regular counters!
      - Focus intensely on deceptive irregular readings and pronunciation traps:
  * Irregular dates: 4日(よっか vs よんにち), 8日(ようか vs はちのひ), 14日(じゅうよっか), 20日(はつか), 24日(にじゅうよっか).
  * Counters with rendaku / gemination: 3本(さんぼん), 1本(いっぽん), 3匹(さんびき), 6匹(ろっぴき), 3階(さんがい), 1足(いっそく), 20歳(はたち).
  * Time traps: 4時(よじ, NOT よんじ / しじ), 9時(くじ, NOT きゅうじ), 30分(さんじゅっぷん / はん).
  * Duration vs Clock time: 2時間(2 hours) vs 2時(2:00).
- Distractors MUST be plausible pronunciation traps that students typically confuse.`;
    } else {
      difficultyRules = `DIFFICULTY: MEDIUM(中級)
      - Focus on standard N5 sound changes: 1本(いっぽん), 3本(さんぼん), 8本(はっぽん), 1分(いっぷん), 3分(さんぷん), 4月(しがつ), 9月(くがつ).`;
    }

    const userPrompt = `Generate ${ count } questions strictly at ${ difficulty.toUpperCase() } difficulty for category "${categoryNames[category]}".

      ${ difficultyRules }

Avoid these recent prompts:
${ JSON.stringify(pastFingerprints.slice(-10)) } `;

    const aiResult = await callUnifiedAi({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      provider,
      temperature: difficulty === 'hard' ? 0.35 : 0.25,
      max_tokens: 2500,
      jsonMode: true,
      timeoutMs: 25000,
      allowFallback: true
    });

    if (aiResult.success) {
      try {
        const parsed = JSON.parse(aiResult.content);
        const rawQuestions: any[] = parsed.questions || [];

        const validQuestions: CountersTestQuestion[] = rawQuestions
          .filter(q => {
            if (!q.prompt || !q.options || !Array.isArray(q.options) || q.options.length !== 4) return false;
            if (!q.correctAnswer || !q.options.includes(q.correctAnswer)) return false;
            return true;
          })
          .map((q, idx) => ({
            id: `counters_q_${ Date.now() }_${ idx + 1 } `,
            category,
            categoryName: categoryNames[category],
            prompt: q.prompt,
            contextSentence: q.contextSentence,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation || 'Japanese counter standard usage rule.',
            targetItem: q.targetItem
          }));

        if (validQuestions.length >= 4) {
          return NextResponse.json({
            success: true,
            source: aiResult.fallbackOccurred ? `${ aiResult.providerUsed } _fallback` : `${ aiResult.providerUsed } _ai`,
            providerUsed: aiResult.providerUsed,
            model: aiResult.modelUsed,
            difficulty,
            questions: validQuestions
          });
        }
      } catch (e) {
        console.warn('Counters AI json parse fallback:', e);
      }
    }

    // High quality fallback questions (including 1 sample question)
    const fallbackQuestions: CountersTestQuestion[] = [
      {
        id: 'cq_dev_sample',
        category,
        categoryName: categoryNames[category],
        prompt: '机[つくえ]の 上[うえ]に ペンが **3本[さんぼん]** あります。どう 読[よ]みますか。',
        contextSentence: '「本」 is the counter for long cylindrical objects.',
        options: ['さんぼん', 'さんほん', 'さんぽん', 'みっほん'],
        correctAnswer: 'さんぼん',
        explanation: 'For the counter 本 (ほん), 3 takes the voiced reading ぼん (さんぼん).',
        targetItem: '三本 (さんぼん)'
      },
      {
        id: 'cq_fb_2',
        category,
        categoryName: categoryNames[category],
        prompt: '「4月[しがつ] 4日[よっか]」の 正[ただ]しい 読[よ]み方[かた]を 選[えら]んでください。',
        options: ['しがつ よっか', 'よんがつ よっか', 'しがつ よんにち', 'よんがつ よんにち'],
        correctAnswer: 'しがつ よっか',
        explanation: 'April is always しがつ (never よんがつ), and the 4th day of the month is always よっか.',
        targetItem: '4月4日'
      },
      {
        id: 'cq_fb_3',
        category,
        categoryName: categoryNames[category],
        prompt: '猫[ねこ]が **1匹[いっぴき]** います。太字[ふとじ]の 読[よ]み方[かた]は どれですか。',
        options: ['いっぴき', 'いちひき', 'いちびき', 'いっひき'],
        correctAnswer: 'いっぴき',
        explanation: '1 small animal takes the double consonant and p-sound: いっぴき (1匹).',
        targetItem: '一匹 (いっぴき)'
      },
      {
        id: 'cq_fb_4',
        category,
        categoryName: categoryNames[category],
        prompt: '「今[いま]、ちょうど **9時[くじ]** です。」',
        options: ['くじ', 'きゅうじ', 'ここのじ', 'きゅじ'],
        correctAnswer: 'くじ',
        explanation: '9 o\'clock is strictly pronounced くじ in Japanese (never きゅうじ).',
        targetItem: '九時 (くじ)'
      },
      {
        id: 'cq_fb_5',
        category,
        categoryName: categoryNames[category],
        prompt: '兄[あに]は **20歳[はたち]** に なりました。',
        options: ['はたち', 'にじゅっさい', 'ふつか', 'はつか'],
        correctAnswer: 'はたち',
        explanation: '20 years of age has the special historical native Japanese reading はたち.',
        targetItem: '二十歳 (はたち)'
      },
      {
        id: 'cq_fb_6',
        category,
        categoryName: categoryNames[category],
        prompt: '会議[かいぎ]は **3階[さんがい]** の 部屋[へや]で 行[おこな]われます。',
        options: ['さんがい', 'さんかい', 'さんっかい', 'みっかい'],
        correctAnswer: 'さんがい',
        explanation: 'The 3rd floor in Japanese is pronounced with the voiced sound がい (さんがい).',
        targetItem: '三階 (さんがい)'
      }
    ];

    return NextResponse.json({
      success: true,
      source: 'curated_fallback',
      questions: fallbackQuestions
    });

  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Failed to generate counters quiz questions'
    }, { status: 500 });
  }
}

