import { NextResponse } from 'next/server';
import { callGroqChat } from '@/services/groqService';
import { 
  OFFICIAL_N5_EXAM_CONFIGS, 
  SAMPLE_DEV_N5_QUESTION 
} from '@/services/mockExamAiEngine';
import { MockExamMode, MockExamQuestion } from '@/types/mockExam';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const mode: MockExamMode = body.mode || 'full';
    const pastFingerprints: string[] = Array.isArray(body.pastQuestionFingerprints) 
      ? body.pastQuestionFingerprints 
      : [];

    const examConfig = OFFICIAL_N5_EXAM_CONFIGS[mode] || OFFICIAL_N5_EXAM_CONFIGS.full;

    // Build the request plan based on requested sections
    const targetSections = examConfig.sections;

    const systemPrompt = `You are the Official JLPT N5 (Japanese Language Proficiency Test) Examination Board Author.
Your mission is to generate authentic, high-quality, official-standard JLPT N5 examination questions.

CRITICAL RULES:
1. LEVEL: STRICTLY JLPT N5 difficulty (Elementary Japanese, basic ~120 Kanji, ~800 vocabulary words, core particles は/が/を/に/で/へ/から/まで/と/も, verb forms: て/た/ない/ます/辞書形/たい).
2. NEVER use N4, N3, N2, or N1 vocabulary or advanced grammar patterns!
3. MANDATORY FURIGANA REQUIREMENT:
   Every Japanese Kanji character in "prompt", "subPrompt", "contextPassage", "audioScript", "options", and "correctAnswer" MUST be annotated with bracket Furigana:
   Format: 漢字[かんじ]
   Examples:
   - "日曜日[にちようび]に 友達[ともだち]と 図書館[としょかん]へ 行[い]きました。"
   - "これ[これ]は 私[わたし]の 傘[かさ]です。"
4. OPTIONS: Exactly FOUR (4) clear multiple-choice options per question. Only ONE option must be completely correct. The other three must be plausible N5-level distractors.
5. NO DUPLICATES: Generate completely fresh questions. Do not repeat prompts.

OFFICIAL QUESTION CATEGORIES:
- Section: 'vocabulary'
  * 'kanji_reading': Kanji underlined with prompt asking for reading in Hiragana.
  * 'orthography': Hiragana word asking for correct Kanji writing among 4 choices.
  * 'context_expressions': Contextual sentence with blank (______), asking for the natural word fitting the context.
  * 'paraphrases': A sentence followed by 4 sentences, choose the sentence with the closest identical meaning.

- Section: 'grammar_reading'
  * 'correct_grammar': Complete sentence with blank for particle, verb form, or conjunction.
  * 'sentence_composition': Star composition (★): "わたしは ______ __★__ ______ ______ たべました。" (Options are 4 word fragments).
  * 'text_grammar': Short passage with a numbered blank fitting the flow of thought.
  * 'short_passage': 80-120 character note/announcement/email with a comprehension question.
  * 'mid_passage': 150-200 character story/diary with a question.
  * 'information_retrieval': A mini flyer/store notice with opening hours, prices, or conditions with a question.

- Section: 'listening'
  * 'task_comprehension': Dialogue with clear task question (e.g. 「男[おとこ]の 人[ひと]は これから 何[なに]を しますか。」). Must include dialogue in "audioScript".
  * 'point_comprehension': Dialogue focusing on key reason, place, or time. Must include dialogue in "audioScript".
  * 'verbal_expressions': Situation illustration (e.g. 「人[ひと]の 家[いえ]に 入[はい]ります。何[なん]と 言[い]いますか。」).
  * 'quick_response': Short statement/question with 4 choices for the most natural reply.

Return a JSON object matching this schema:
{
  "questions": [
    {
      "id": "q1",
      "section": "vocabulary" | "grammar_reading" | "listening",
      "category": "kanji_reading" | "orthography" | "context_expressions" | "paraphrases" | "correct_grammar" | "sentence_composition" | "text_grammar" | "short_passage" | "mid_passage" | "information_retrieval" | "task_comprehension" | "point_comprehension" | "verbal_expressions" | "quick_response",
      "categoryNameJa": "Category in Japanese",
      "categoryNameEn": "Category in English",
      "prompt": "The question prompt with bracket furigana 漢字[かんじ]",
      "subPrompt": "Clear instructions in English",
      "contextPassage": "Optional passage for reading questions",
      "audioScript": "Dialogue or monologue transcript for listening questions",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "correctAnswer": "Exact string of correct option",
      "explanation": "Clear explanation of grammar/vocab principle in English",
      "marks": 1 or 2
    }
  ]
}`;

    const requestedCategoriesDesc = targetSections.map(s => 
      `Section "${s.section}" (${s.titleEn}): ${s.categories.map(c => `${c.count} questions of category "${c.id}" (${c.nameEn})`).join(', ')}`
    ).join('\n');

    const userPrompt = `Generate a fresh official JLPT N5 Mock Examination for mode "${mode}":
${requestedCategoriesDesc}

Total required questions: ${targetSections.reduce((acc, s) => acc + s.questionCount, 0)} questions.

Avoid these recently tested question prompts if possible:
${JSON.stringify(pastFingerprints.slice(-10))}

Return strictly valid JSON with the "questions" array.`;

    const aiResult = await callGroqChat({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.3,
      max_tokens: 3500,
      response_format: { type: 'json_object' },
      timeoutMs: 30000
    });

    if (aiResult.success) {
      try {
        const parsed = JSON.parse(aiResult.content);
        let rawQuestions: any[] = parsed.questions || [];

        // Validate each generated question
        const validQuestions: MockExamQuestion[] = rawQuestions
          .filter(q => {
            if (!q.prompt || !q.options || !Array.isArray(q.options) || q.options.length !== 4) return false;
            if (!q.correctAnswer || !q.options.includes(q.correctAnswer)) return false;
            if (!q.section) return false;
            return true;
          })
          .map((q, idx) => ({
            id: `mock_q_${Date.now()}_${idx + 1}`,
            section: q.section,
            category: q.category || 'kanji_reading',
            categoryNameJa: q.categoryNameJa || '問題',
            categoryNameEn: q.categoryNameEn || 'Question',
            prompt: q.prompt,
            subPrompt: q.subPrompt,
            contextPassage: q.contextPassage,
            audioScript: q.audioScript,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation || 'Official JLPT N5 standard answer.',
            marks: q.marks || 1
          }));

        if (validQuestions.length >= 5) {
          return NextResponse.json({
            success: true,
            source: 'groq_ai',
            model: aiResult.modelUsed,
            examConfig,
            questions: validQuestions
          });
        }
      } catch (parseErr) {
        console.warn('Failed to parse AI mock exam JSON, falling back:', parseErr);
      }
    }

    // High quality dynamic fallback when AI is offline or key missing
    // Incorporating the authorized single sample question alongside dynamic generative patterns
    const fallbackQuestions: MockExamQuestion[] = [
      SAMPLE_DEV_N5_QUESTION,
      {
        id: 'q_fb_2',
        section: 'vocabulary',
        category: 'orthography',
        categoryNameJa: '表記',
        categoryNameEn: 'Orthography',
        prompt: 'えきまで **あるいて** いきます。',
        subPrompt: 'Choose the correct kanji for the underlined word.',
        options: ['歩いて', '走いて', '待いて', '行いて'],
        correctAnswer: '歩いて',
        explanation: '「あるいて」 is written with the Kanji 「歩」 (walk -> 歩いて あるいて).',
        marks: 1
      },
      {
        id: 'q_fb_3',
        section: 'vocabulary',
        category: 'context_expressions',
        categoryNameJa: '文脈規定',
        categoryNameEn: 'Contextual Usage',
        prompt: 'あしたは 大切[たいせつ]な テストが ありますから、今夜[こんや]は たくさん ______。',
        subPrompt: 'Choose the expression that best completes the sentence.',
        options: ['勉強[べんきょう]します', '泳[およ]ぎます', '散歩[さんぽ]します', '買[か]い物[もの]します'],
        correctAnswer: '勉強[べんきょう]します',
        explanation: 'Before an important test (テスト), the natural action is to study (勉強します).',
        marks: 1
      },
      {
        id: 'q_fb_4',
        section: 'vocabulary',
        category: 'paraphrases',
        categoryNameJa: '言い換え類義',
        categoryNameEn: 'Paraphrases',
        prompt: 'わたしは **会社員[かいしゃいん]** です。',
        subPrompt: 'Choose the sentence with the same meaning as the underlined statement.',
        options: [
          'わたしは 会社[かいしゃ]で 働[はたら]いて います。',
          'わたしは 学校[がっこう]で 勉強[べんきょう]して います。',
          'わたしは 病院[びょういん]に 行[い]きます。',
          'わたしは 店[みせ]で 買[か]い物[もの]を します。'
        ],
        correctAnswer: 'わたしは 会社[かいしゃ]で 働[はたら]いて います。',
        explanation: 'A company employee (会社員) means someone who works at a company (会社で働いています).',
        marks: 1
      },
      {
        id: 'q_fb_5',
        section: 'grammar_reading',
        category: 'correct_grammar',
        categoryNameJa: '文の文法1',
        categoryNameEn: 'Grammar Form',
        prompt: '日曜日[にちようび]に 図書館[としょかん] ______ 本[ほん]を 読[よ]みました。',
        subPrompt: 'Choose the correct particle for the location of an action.',
        options: ['で', 'に', 'へ', 'を'],
        correctAnswer: 'で',
        explanation: 'The particle で indicates the location where an active action (reading a book) takes place.',
        marks: 1
      },
      {
        id: 'q_fb_6',
        section: 'grammar_reading',
        category: 'sentence_composition',
        categoryNameJa: '文の文法2',
        categoryNameEn: 'Sentence Composition (★)',
        prompt: 'きのう スーパーで ______ __★__ ______ ______ かいました。',
        subPrompt: 'Arrange the 4 choices in correct order and choose the option that fits into the ★ position.\nChoices: [1] おいしい  [2] を  [3] りんご  [4] みっつ',
        options: ['おいしい', 'を', 'りんご', 'みっつ'],
        correctAnswer: 'りんご',
        explanation: 'Correct order: おいしい (1) -> りんご (3) -> を (2) -> みっつ (4). The item at ★ position is りんご (3).',
        marks: 2
      },
      {
        id: 'q_fb_7',
        section: 'grammar_reading',
        category: 'short_passage',
        categoryNameJa: '内容理解・短文',
        categoryNameEn: 'Short Reading Comprehension',
        prompt: '田中[たなか]さんは 何時[なんじ]に 駅[えき]へ 行[い]きますか。',
        contextPassage: '【メモ】\n田中さんへ\nきょうの 会議[かいぎ]は 午後[ごご] 3時[さんじ]からです。2時[にじ]半[はん]に 駅[えき]の 西口[にしぐち]で 会[あ]いましょう。\n佐藤[さとう]',
        subPrompt: 'Read the memo above and answer the question.',
        options: ['2時半 (2:30)', '3時 (3:00)', '2時 (2:00)', '3時半 (3:30)'],
        correctAnswer: '2時半 (2:30)',
        explanation: 'The memo explicitly states: 「2時半に 駅の 西口で 会いましょう」 (Let us meet at the West Exit at 2:30).',
        marks: 2
      },
      {
        id: 'q_fb_8',
        section: 'listening',
        category: 'task_comprehension',
        categoryNameJa: '課題理解',
        categoryNameEn: 'Task-based Comprehension',
        prompt: '男[おとこ]の 人[ひと]は これから 何[なに]を しますか。',
        subPrompt: 'Listen to the dialogue or read the script, then select what the man will do next.',
        audioScript: '女の人：すみませんが、この 荷物[にもつ]を 受付[うけつけ]まで 持[も]って 行[い]って くださいませんか。\n男の人：はい、わかりました。すぐ 持って 行きます。',
        options: [
          '荷物[にもつ]を 受付[うけつけ]に 持[も]って 行[い]く',
          '部屋[へや]で 待[ま]つ',
          '女[おんな]の 人[ひと]と 電話[でんわ]する',
          '荷物[にもつ]を 開[あ]ける'
        ],
        correctAnswer: '荷物[にもつ]を 受付[うけつけ]に 持[も]って 行[い]く',
        explanation: 'The woman asks the man to carry the luggage to reception (受付まで持って行ってください), and he replies that he will take it immediately.',
        marks: 2
      },
      {
        id: 'q_fb_9',
        section: 'listening',
        category: 'quick_response',
        categoryNameJa: '即時応答',
        categoryNameEn: 'Quick Response',
        prompt: '「お名前[なまえ]は 何[なん]ですか。」',
        subPrompt: 'Choose the most natural reply to the question.',
        audioScript: '質問：お名前は 何ですか。',
        options: [
          'スミスです。',
          'アメリカからです。',
          '学生[がくせい]です。',
          'どうぞ よろしく。'
        ],
        correctAnswer: 'スミスです。',
        explanation: 'When asked 「お名前は何ですか」 (What is your name?), the appropriate reply is to state your name (スミスです).',
        marks: 1
      }
    ];

    // Filter fallback according to mode
    const filteredFallback = mode === 'full' 
      ? fallbackQuestions 
      : fallbackQuestions.filter(q => q.section === mode);

    return NextResponse.json({
      success: true,
      source: 'curated_fallback',
      examConfig,
      questions: filteredFallback
    });

  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Failed to generate mock exam questions'
    }, { status: 500 });
  }
}

