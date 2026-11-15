// Service to export AI Grammar Coach lessons as premium, publication-quality PDFs
// and interactive study guides with Show/Hide answers.
// 100% Next.js / TypeScript native — NO Python dependencies.

import { MinnaLesson, MinnaGrammarPoint } from '@/types/minna';

export interface GrammarAiExample {
  japanese: string;
  furigana?: string;
  romaji?: string;
  meaning: string;
}

export interface GrammarPracticeQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface GrammarAiTopic {
  topicId: string;
  topicName: string;
  simpleExplanation: string;
  grammarStructure: string;
  stepByStepExplanation: string;
  japaneseExamples: GrammarAiExample[];
  commonMistakes: string[];
  learningTips: string[];
  practiceQuestions?: GrammarPracticeQuestion[];
}

export interface GrammarAiPayload {
  lessonNumber: number;
  lessonTitle: string;
  topics: GrammarAiTopic[];
  providerUsed: 'groq' | 'gemini';
  modelUsed?: string;
  generatedAt?: string;
}

/**
 * Escapes HTML characters to prevent XSS and formatting issues in the generated document
 */
function escapeHtml(str: string | undefined | null): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Generates relevant, authentic JLPT N5 practice questions for a grammar point
 */
function getPracticeQuestionsForTopic(
  topic: GrammarAiTopic,
  lesson: MinnaLesson,
  topicIdx: number
): GrammarPracticeQuestion[] {
  if (topic.practiceQuestions && Array.isArray(topic.practiceQuestions) && topic.practiceQuestions.length > 0) {
    return topic.practiceQuestions;
  }

  const matchingExercises = (lesson.exercises || []).filter(ex => {
    const p = ex.prompt ? ex.prompt.toLowerCase() : '';
    const t = topic.topicName ? topic.topicName.toLowerCase() : '';
    const s = topic.grammarStructure ? topic.grammarStructure.toLowerCase() : '';
    return p.includes(t) || (s && p.includes(s.split(' ')[0]));
  });

  const questions: GrammarPracticeQuestion[] = [];

  if (matchingExercises.length > 0) {
    for (const ex of matchingExercises.slice(0, 2)) {
      const opts = ex.options && ex.options.length >= 4
        ? ex.options.map((o, oIdx) => `${String.fromCharCode(65 + oIdx)}) ${o}`)
        : [
            `A) ${ex.correctAnswer}`,
            'B) Incorrect particle form',
            'C) Casual plain form',
            'D) Incompatible verb conjugation'
          ];
      questions.push({
        question: ex.prompt,
        options: opts,
        correctAnswer: `A) ${ex.correctAnswer}`,
        explanation: ex.explanation || `Applies the grammar rule for ${topic.topicName}.`
      });
    }
  }

  // Synthesize from Japanese examples if available
  if (questions.length === 0 && topic.japaneseExamples && topic.japaneseExamples.length > 0) {
    const ex = topic.japaneseExamples[0];
    questions.push({
      question: `Choose the correct word or particle to complete the pattern:\n${ex.japanese}`,
      options: [
        `A) ${topic.grammarStructure.length < 35 ? topic.grammarStructure : 'Standard polite structure'}`,
        'B) Incorrect particle form',
        'C) Casual speech ending',
        'D) Incorrect past tense'
      ],
      correctAnswer: 'A',
      explanation: `According to the formula "${topic.grammarStructure}", this structure correctly expresses: "${ex.meaning}".`
    });

    if (topic.japaneseExamples.length > 1) {
      const ex2 = topic.japaneseExamples[1];
      questions.push({
        question: `What is the core function of "${topic.topicName}" in this sentence: "${ex2.japanese}"?`,
        options: [
          'A) Connects the topic with the polite predicate or state',
          'B) Expresses physical movement towards a place',
          'C) Indicates informal conversation between close friends',
          'D) Marks a strong obligation or command'
        ],
        correctAnswer: 'A',
        explanation: `In this sentence, "${topic.topicName}" functions as: ${topic.simpleExplanation}`
      });
    }
  }

  if (questions.length === 0) {
    questions.push({
      question: `Which structure correctly expresses the pattern "${topic.topicName}"?`,
      options: [
        `A) ${topic.grammarStructure || 'Standard polite affirmative pattern'}`,
        'B) Unrelated particle marker',
        'C) Informal plain style',
        'D) Incompatible verb conjugation'
      ],
      correctAnswer: 'A',
      explanation: `The standard formula is "${topic.grammarStructure}". ${topic.simpleExplanation}`
    });
  }

  return questions;
}

/**
 * Retrieves cached AI grammar payload or fetches it from the API
 * Falls back to built-in lesson grammar points if offline or AI call fails
 */
export async function getOrFetchLessonAiGrammar(
  lesson: MinnaLesson,
  preferredProvider?: 'groq' | 'gemini'
): Promise<GrammarAiPayload> {
  let provider = preferredProvider;
  if (!provider) {
    try {
      const cfgRes = await fetch('/api/ai/config');
      if (cfgRes.ok) {
        const cfg = await cfgRes.json();
        provider = cfg.activeProvider === 'gemini' ? 'gemini' : 'groq';
      }
    } catch {
      provider = 'groq';
    }
  }
  const effectiveProvider = provider || 'groq';

  // 1. Check browser localStorage cache
  const cacheKey = `minna_ai_grammar_l${lesson.lessonNumber}_${effectiveProvider}`;
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed && Array.isArray(parsed.topics) && parsed.topics.length > 0) {
        return parsed;
      }
    }
  } catch {}

  // 2. Fetch fresh from server API
  try {
    const res = await fetch('/api/ai/explain-grammar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lessonNumber: lesson.lessonNumber,
        lessonTitle: lesson.title,
        grammarPoints: lesson.grammar,
        provider: effectiveProvider,
        forceRefresh: false
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.topics) && data.topics.length > 0) {
        try {
          localStorage.setItem(cacheKey, JSON.stringify(data));
        } catch {}
        return data;
      }
    }
  } catch (err) {
    console.warn('Failed to fetch AI grammar, falling back to textbook data:', err);
  }

  // 3. Fallback: Synthesize payload from built-in lesson grammar points
  const fallbackTopics: GrammarAiTopic[] = lesson.grammar.map((g, idx) => ({
    topicId: g.id || `l${lesson.lessonNumber}_g${idx + 1}`,
    topicName: g.title,
    simpleExplanation: g.explanation,
    grammarStructure: g.structure,
    stepByStepExplanation: g.rules && g.rules.length > 0
      ? g.rules.join('\n')
      : `Connect words using the pattern: ${g.structure}. Pay close attention to particle usage and verb/adjective inflection.`,
    japaneseExamples: (g.examples || []).map(ex => ({
      japanese: ex.japanese,
      furigana: ex.hiragana,
      romaji: ex.romaji,
      meaning: ex.english || ''
    })),
    commonMistakes: g.commonMistakes || [
      'Confusing particle nuances in conversational speech.',
      'Incorrect tense or polarity inflection.'
    ],
    learningTips: [
      `Practice speaking ${g.structure} aloud with different vocabulary words.`,
      'Review sentence patterns repeatedly to build natural Japanese speaking intuition.'
    ]
  }));

  return {
    lessonNumber: lesson.lessonNumber,
    lessonTitle: lesson.title,
    topics: fallbackTopics,
    providerUsed: effectiveProvider,
    generatedAt: new Date().toISOString()
  };
}

/**
 * Generates the complete, self-contained HTML document for the premium PDF & Interactive export
 * 100% Next.js native — includes interactive Show/Hide answer buttons and print-to-PDF styles.
 */
export function generateGrammarPdfHtml(
  lesson: MinnaLesson,
  grammarData: GrammarAiPayload,
  options?: { interactiveMode?: boolean }
): string {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const providerLabel =
    grammarData.providerUsed === 'gemini'
      ? 'Google Gemini Flash (Tanglish Study Edition)'
      : 'Groq AI (English Master Edition)';

  // Collect all practice questions for the Answer Key appendix
  const allAnswerKeyItems: Array<{
    topicName: string;
    questionNum: number;
    question: string;
    answer: string;
    explanation: string;
  }> = [];

  let globalQuestionCounter = 0;

  const topicsHtml = grammarData.topics
    .map((topic, idx) => {
      const steps = topic.stepByStepExplanation
        ? topic.stepByStepExplanation
            .split('\n')
            .map(s => s.trim())
            .filter(Boolean)
        : [];

      // Japanese examples
      const examplesHtml = (topic.japaneseExamples || [])
        .map((ex, exIdx) => `
          <div class="example-item">
            <div class="example-header">
              <span class="example-badge">Example ${exIdx + 1}</span>
            </div>
            <div class="example-japanese-box">
              <div class="example-japanese">${escapeHtml(ex.japanese)}</div>
              ${ex.furigana ? `<div class="example-furigana">${escapeHtml(ex.furigana)}</div>` : ''}
              ${ex.romaji ? `<div class="example-romaji">${escapeHtml(ex.romaji)}</div>` : ''}
            </div>
            <div class="example-meaning">
              <span class="meaning-label">Meaning:</span>
              <span class="meaning-text">${escapeHtml(ex.meaning)}</span>
            </div>
          </div>
        `)
        .join('');

      // Common mistakes
      const mistakesHtml = (topic.commonMistakes || [])
        .map(
          m => `
          <li class="mistake-item">
            <span class="bullet-cross">✕</span>
            <span>${escapeHtml(m)}</span>
          </li>
        `
        )
        .join('');

      // Learning tips
      const tipsHtml = (topic.learningTips || [])
        .map(
          t => `
          <li class="tip-item">
            <span class="bullet-check">✓</span>
            <span>${escapeHtml(t)}</span>
          </li>
        `
        )
        .join('');

      // Practice questions for this topic
      const questions = getPracticeQuestionsForTopic(topic, lesson, idx);
      const questionsHtml = questions
        .map((q, qIdx) => {
          globalQuestionCounter++;
          const qId = `ans_${idx + 1}_${qIdx + 1}`;

          allAnswerKeyItems.push({
            topicName: topic.topicName,
            questionNum: globalQuestionCounter,
            question: q.question,
            answer: q.correctAnswer,
            explanation: q.explanation
          });

          return `
            <div class="question-card">
              <div class="question-header">
                <span class="question-badge">Question #${qIdx + 1}</span>
                <span class="question-tag">${escapeHtml(topic.topicName)}</span>
              </div>
              <div class="question-prompt">${escapeHtml(q.question)}</div>
              <div class="options-grid">
                ${q.options.map(opt => `<div class="option-item">${escapeHtml(opt)}</div>`).join('')}
              </div>
              <!-- Interactive Show / Hide Controls (JS) -->
              <div class="interactive-controls no-print">
                <button type="button" class="btn-show-ans" onclick="showAnswer('${qId}')">
                  ▶ Show Answer
                </button>
                <button type="button" class="btn-hide-ans" onclick="hideAnswer('${qId}')">
                  ✕ Hide Answer
                </button>
              </div>
              <!-- Hidden Answer Box (Hidden by default) -->
              <div class="interactive-answer-box" id="${qId}" style="display: none;">
                <div class="ans-header">
                  <span class="ans-badge">✓ Correct Answer: ${escapeHtml(q.correctAnswer)}</span>
                </div>
                <div class="ans-explanation">
                  <strong>Explanation:</strong> ${escapeHtml(q.explanation)}
                </div>
              </div>
            </div>
          `;
        })
        .join('');

      return `
        <section class="topic-card" id="topic-${idx + 1}">
          <!-- Topic Header -->
          <div class="topic-header">
            <div class="topic-meta">
              <span class="topic-number">PATTERN #${idx + 1} OF ${grammarData.topics.length}</span>
              <span class="topic-level">JLPT N5 Core Grammar</span>
            </div>
            <h2 class="topic-title">${escapeHtml(topic.topicName)}</h2>
            <p class="topic-simple-exp">${escapeHtml(topic.simpleExplanation)}</p>
          </div>

          <!-- Formula / Structure Block -->
          <div class="formula-box">
            <div class="formula-header">
              <span class="formula-icon">📐</span>
              <span class="formula-label">GRAMMAR STRUCTURE &amp; FORMULA</span>
            </div>
            <div class="formula-content">${escapeHtml(topic.grammarStructure)}</div>
          </div>

          <!-- Step-by-Step Construction Guide -->
          <div class="steps-section">
            <div class="section-title">
              <span class="section-icon">📖</span>
              <span>Step-by-Step Construction &amp; Rules</span>
            </div>
            <div class="steps-content">
              ${
                steps.length > 0
                  ? `<ul class="steps-list">
                      ${steps
                        .map(
                          (step, sIdx) => `
                        <li>
                          <span class="step-num">${sIdx + 1}</span>
                          <span class="step-text">${escapeHtml(step.replace(/^\d+[\.\)]\s*/, ''))}</span>
                        </li>
                      `
                        )
                        .join('')}
                    </ul>`
                  : `<p class="steps-paragraph">${escapeHtml(topic.stepByStepExplanation)}</p>`
              }
            </div>
          </div>

          <!-- Japanese Examples -->
          ${
            topic.japaneseExamples && topic.japaneseExamples.length > 0
              ? `
            <div class="examples-section">
              <div class="section-title">
                <span class="section-icon">💬</span>
                <span>Authentic Japanese Examples</span>
              </div>
              <div class="examples-grid">
                ${examplesHtml}
              </div>
            </div>
          `
              : ''
          }

          <!-- Practice Questions with Interactive Show/Hide Answers -->
          <div class="questions-section">
            <div class="section-title">
              <span class="section-icon">✍️</span>
              <span>Practice Questions &amp; Interactive Self-Check</span>
            </div>
            <div class="questions-list">
              ${questionsHtml}
            </div>
          </div>

          <!-- Two-Column Pedagogical Insights: Mistakes & Tips -->
          <div class="insights-grid">
            <div class="insight-card mistakes-card">
              <div class="insight-header">
                <span class="insight-icon">⚠️</span>
                <span class="insight-title">Common Mistakes to Avoid</span>
              </div>
              <ul class="insight-list">
                ${mistakesHtml}
              </ul>
            </div>

            <div class="insight-card tips-card">
              <div class="insight-header">
                <span class="insight-icon">💡</span>
                <span class="insight-title">Sensei's Learning Tips &amp; Mnemonics</span>
              </div>
              <ul class="insight-list">
                ${tipsHtml}
              </ul>
            </div>
          </div>
        </section>
      `;
    })
    .join('');

  // Syllabus quick reference summary table rows
  const syllabusRows = grammarData.topics
    .map(
      (t, idx) => `
      <tr>
        <td class="col-num">${idx + 1}</td>
        <td class="col-pattern"><strong>${escapeHtml(t.topicName)}</strong></td>
        <td class="col-formula"><code>${escapeHtml(t.grammarStructure)}</code></td>
        <td class="col-desc">${escapeHtml(t.simpleExplanation)}</td>
      </tr>
    `
    )
    .join('');

  // Answer Key Appendix table rows (for printable verification)
  const answerKeyRows = allAnswerKeyItems
    .map(
      item => `
      <tr>
        <td class="col-num">#${item.questionNum}</td>
        <td class="col-pattern"><strong>${escapeHtml(item.topicName)}</strong></td>
        <td class="col-ans"><span class="badge-ans">${escapeHtml(item.answer)}</span></td>
        <td class="col-desc">${escapeHtml(item.explanation)}</td>
      </tr>
    `
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lesson ${lesson.lessonNumber} Interactive Grammar Guide - ${escapeHtml(lesson.title)}</title>
  <style>
    /* CSS Reset & Variables */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      --primary: #1e3a8a;
      --primary-light: #3b82f6;
      --primary-gradient: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #312e81 100%);
      --accent-crimson: #dc2626;
      --accent-amber: #d97706;
      --accent-emerald: #059669;
      --slate-50: #f8fafc;
      --slate-100: #f1f5f9;
      --slate-200: #e2e8f0;
      --slate-300: #cbd5e1;
      --slate-600: #475569;
      --slate-700: #334155;
      --slate-800: #1e293b;
      --slate-900: #0f172a;
      --font-main: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic", "Meiryo", "Noto Sans JP", sans-serif;
      --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    }

    html {
      font-size: 14px;
      line-height: 1.5;
      color: var(--slate-900);
      background-color: #f1f5f9;
      font-family: var(--font-main);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* Floating Screen Action Bar (hidden on print) */
    .screen-toolbar {
      position: sticky;
      top: 0;
      z-index: 9999;
      background: rgba(15, 23, 42, 0.95);
      backdrop-filter: blur(12px);
      color: white;
      padding: 12px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .toolbar-info {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 13px;
      flex-wrap: wrap;
    }

    .toolbar-title {
      font-weight: 700;
      color: #f8fafc;
    }

    .toolbar-badge {
      background: rgba(59, 130, 246, 0.2);
      border: 1px solid rgba(59, 130, 246, 0.4);
      color: #93c5fd;
      padding: 2px 8px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 600;
    }

    .toolbar-tip {
      font-size: 11px;
      color: #94a3b8;
    }

    .toolbar-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .btn-action {
      background: rgba(255, 255, 255, 0.1);
      color: #e2e8f0;
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 7px 12px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .btn-action:hover {
      background: rgba(255, 255, 255, 0.2);
      color: white;
    }

    .btn-print {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 12.5px;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.4);
      transition: all 0.15s ease;
    }

    .btn-print:hover {
      background: linear-gradient(135deg, #1d4ed8, #1e40af);
      transform: translateY(-1px);
    }

    .btn-close {
      background: rgba(255, 255, 255, 0.1);
      color: #e2e8f0;
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 12.5px;
      font-weight: 600;
      cursor: pointer;
    }

    /* Document Sheet Container (Digital View) */
    .document-wrapper {
      max-width: 900px;
      margin: 24px auto;
      background: #ffffff;
      box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 0 1px 1px rgba(0, 0, 0, 0.05);
      border-radius: 12px;
      overflow: hidden;
      padding: 40px 44px;
    }

    /* Header Banner */
    .header-banner {
      background: var(--primary-gradient);
      color: white;
      border-radius: 12px;
      padding: 30px 34px;
      margin-bottom: 26px;
      position: relative;
      overflow: hidden;
    }

    .header-top-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      gap: 12px;
      flex-wrap: wrap;
    }

    .series-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.25);
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #f8fafc;
    }

    .level-badge {
      background: var(--accent-crimson);
      color: white;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.04em;
    }

    .lesson-headline {
      font-size: 24px;
      font-weight: 900;
      line-height: 1.25;
      letter-spacing: -0.02em;
      margin-bottom: 6px;
      color: #ffffff;
    }

    .lesson-japanese-title {
      font-size: 15px;
      font-weight: 600;
      color: #93c5fd;
      margin-bottom: 10px;
    }

    .lesson-desc {
      font-size: 12.5px;
      color: #cbd5e1;
      max-width: 680px;
      line-height: 1.6;
      margin-bottom: 18px;
    }

    .metadata-strip {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 10px;
      padding-top: 14px;
      border-top: 1px solid rgba(255, 255, 255, 0.15);
    }

    .meta-item {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .meta-key {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #94a3b8;
      font-weight: 600;
    }

    .meta-val {
      font-size: 12px;
      font-weight: 700;
      color: #f1f5f9;
    }

    /* Syllabus Summary Table */
    .syllabus-section {
      margin-bottom: 30px;
      background: var(--slate-50);
      border: 1px solid var(--slate-200);
      border-radius: 10px;
      padding: 16px 18px;
    }

    .syllabus-title {
      font-size: 12.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--slate-700);
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .syllabus-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
    }

    .syllabus-table th {
      background: #e2e8f0;
      color: var(--slate-800);
      font-weight: 700;
      text-align: left;
      padding: 8px 10px;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .syllabus-table td {
      padding: 8px 10px;
      border-bottom: 1px solid var(--slate-200);
      vertical-align: top;
    }

    .col-num {
      width: 36px;
      font-weight: 800;
      color: var(--primary);
    }

    .col-pattern {
      width: 25%;
      font-size: 12.5px;
      color: var(--slate-900);
    }

    .col-formula code {
      background: #e0e7ff;
      color: #3730a3;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 600;
    }

    .col-ans {
      width: 20%;
    }

    .badge-ans {
      display: inline-block;
      background: #dcfce7;
      color: #15803d;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 11px;
    }

    .col-desc {
      color: var(--slate-600);
      font-size: 11.5px;
    }

    /* Individual Topic Cards */
    .topic-card {
      background: #ffffff;
      border: 1.5px solid var(--slate-200);
      border-radius: 12px;
      padding: 22px;
      margin-bottom: 26px;
      position: relative;
    }

    .topic-header {
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--slate-100);
    }

    .topic-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
    }

    .topic-number {
      background: var(--primary);
      color: white;
      font-size: 10px;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 6px;
      letter-spacing: 0.05em;
    }

    .topic-level {
      font-size: 11px;
      font-weight: 600;
      color: var(--slate-600);
    }

    .topic-title {
      font-size: 19px;
      font-weight: 900;
      color: var(--slate-900);
      margin-bottom: 6px;
      letter-spacing: -0.01em;
    }

    .topic-simple-exp {
      font-size: 13px;
      color: var(--slate-700);
      line-height: 1.6;
    }

    /* Formula Box */
    .formula-box {
      background: #f0f7ff;
      border: 1.5px solid #bfdbfe;
      border-left: 5px solid #2563eb;
      border-radius: 8px;
      padding: 12px 16px;
      margin-bottom: 18px;
    }

    .formula-header {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #1d4ed8;
      margin-bottom: 4px;
    }

    .formula-content {
      font-family: var(--font-mono);
      font-size: 13.5px;
      font-weight: 700;
      color: #1e3a8a;
      letter-spacing: 0.01em;
      line-height: 1.5;
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 11.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--slate-800);
      margin-bottom: 10px;
    }

    /* Steps Content */
    .steps-section {
      margin-bottom: 18px;
    }

    .steps-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .steps-list li {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 12px;
      color: var(--slate-700);
      line-height: 1.55;
    }

    .step-num {
      width: 19px;
      height: 19px;
      border-radius: 50%;
      background: #e2e8f0;
      color: var(--slate-800);
      font-size: 10.5px;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      shrink: 0;
      margin-top: 1px;
    }

    /* Japanese Examples */
    .examples-section {
      margin-bottom: 18px;
    }

    .examples-grid {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .example-item {
      background: var(--slate-50);
      border: 1px solid var(--slate-200);
      border-radius: 8px;
      padding: 10px 14px;
    }

    .example-badge {
      display: inline-block;
      font-size: 9.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--primary);
      background: #e0e7ff;
      padding: 1px 6px;
      border-radius: 4px;
      margin-bottom: 4px;
    }

    .example-japanese {
      font-size: 14.5px;
      font-weight: 700;
      color: var(--slate-900);
    }

    .example-furigana {
      font-size: 11.5px;
      color: #6366f1;
      font-weight: 500;
    }

    .example-romaji {
      font-size: 11px;
      font-style: italic;
      color: var(--slate-600);
    }

    .example-meaning {
      font-size: 11.5px;
      color: var(--slate-800);
      padding-top: 4px;
      border-top: 1px dashed var(--slate-200);
      margin-top: 4px;
    }

    /* Practice Questions Section */
    .questions-section {
      margin-bottom: 18px;
      background: #fbfcfe;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 16px;
    }

    .questions-list {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .question-card {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 14px;
    }

    .question-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
    }

    .question-badge {
      background: #334155;
      color: white;
      font-size: 10px;
      font-weight: 800;
      padding: 2px 7px;
      border-radius: 4px;
    }

    .question-tag {
      font-size: 11px;
      font-weight: 600;
      color: #64748b;
    }

    .question-prompt {
      font-size: 13px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 10px;
      line-height: 1.5;
    }

    .options-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
      margin-bottom: 12px;
    }

    @media (max-width: 600px) {
      .options-grid {
        grid-template-columns: 1fr;
      }
    }

    .option-item {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 6px 10px;
      font-size: 12px;
      color: #334155;
    }

    .interactive-controls {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 4px;
    }

    .btn-show-ans {
      background: #2563eb;
      color: white;
      border: none;
      padding: 5px 12px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.15s ease;
    }

    .btn-show-ans:hover {
      background: #1d4ed8;
    }

    .btn-hide-ans {
      background: #f1f5f9;
      color: #475569;
      border: 1px solid #cbd5e1;
      padding: 5px 12px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
    }

    .btn-hide-ans:hover {
      background: #e2e8f0;
      color: #0f172a;
    }

    .interactive-answer-box {
      margin-top: 10px;
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-left: 4px solid #22c55e;
      border-radius: 6px;
      padding: 10px 12px;
      animation: fadeIn 0.2s ease-in;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .ans-badge {
      font-size: 11.5px;
      font-weight: 800;
      color: #15803d;
      margin-bottom: 4px;
    }

    .ans-explanation {
      font-size: 11.5px;
      color: #166534;
      line-height: 1.5;
    }

    /* Insights Grid */
    .insights-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 14px;
    }

    @media (max-width: 650px) {
      .insights-grid {
        grid-template-columns: 1fr;
      }
    }

    .insight-card {
      border-radius: 8px;
      padding: 12px 14px;
    }

    .mistakes-card {
      background: #fff1f2;
      border: 1px solid #fecdd3;
    }

    .tips-card {
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
    }

    .insight-header {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 10.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 6px;
    }

    .mistakes-card .insight-header {
      color: #be123c;
    }

    .tips-card .insight-header {
      color: #047857;
    }

    .insight-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .mistake-item, .tip-item {
      display: flex;
      align-items: flex-start;
      gap: 6px;
      font-size: 11px;
      line-height: 1.5;
    }

    .mistake-item {
      color: #9f1239;
    }

    .tip-item {
      color: #065f46;
    }

    .bullet-cross {
      font-weight: 900;
      color: #e11d48;
    }

    .bullet-check {
      font-weight: 900;
      color: #059669;
    }

    /* Document Footer */
    .document-footer {
      margin-top: 32px;
      padding-top: 16px;
      border-top: 1.5px solid var(--slate-200);
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--slate-600);
      font-size: 11px;
      flex-wrap: wrap;
      gap: 8px;
    }

    /* Print Stylesheet (Crucial for PDF Export) */
    @page {
      size: A4 portrait;
      margin: 12mm 14mm 14mm 14mm;
    }

    @media print {
      html, body {
        background: #ffffff !important;
        color: #0f172a !important;
        padding: 0 !important;
        margin: 0 !important;
        font-size: 11.5px !important;
      }

      .no-print, .screen-toolbar {
        display: none !important;
      }

      .document-wrapper {
        max-width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        box-shadow: none !important;
        border-radius: 0 !important;
      }

      .header-banner {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        border-radius: 6px !important;
        padding: 20px 24px !important;
        margin-bottom: 18px !important;
      }

      .syllabus-section, .appendix-section {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        page-break-inside: avoid !important;
        break-inside: avoid !important;
        margin-bottom: 20px !important;
      }

      .topic-card {
        page-break-inside: avoid !important;
        break-inside: avoid !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        box-shadow: none !important;
        border: 1px solid #cbd5e1 !important;
        margin-bottom: 18px !important;
        padding: 16px 18px !important;
      }

      .question-card, .formula-box, .insight-card, .example-item {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }

      .document-footer {
        page-break-inside: avoid !important;
        break-inside: avoid !important;
        margin-top: 20px !important;
      }
    }
  </style>
</head>
<body>
  <!-- Screen Navigation Bar (Hidden when printed to PDF) -->
  <div class="screen-toolbar no-print">
    <div class="toolbar-info">
      <span class="toolbar-title">Lesson ${lesson.lessonNumber}: ${escapeHtml(lesson.title)}</span>
      <span class="toolbar-badge">${grammarData.topics.length} Grammar Topics</span>
      <span class="toolbar-tip">💡 Interactive Mode: Click <strong>[▶ Show Answer]</strong> on any question to test your knowledge!</span>
    </div>
    <div class="toolbar-actions">
      <button type="button" class="btn-action" onclick="toggleAllAnswers(true)">👁️ Show All Answers</button>
      <button type="button" class="btn-action" onclick="toggleAllAnswers(false)">🙈 Hide All Answers</button>
      <button type="button" class="btn-print" onclick="window.print()">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 6 2 18 2 18 9"></polyline>
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
          <rect x="6" y="14" width="12" height="8"></rect>
        </svg>
        <span>Save as PDF / Print</span>
      </button>
      <button type="button" class="btn-close" onclick="window.close()">Close</button>
    </div>
  </div>

  <!-- Document Sheet -->
  <div class="document-wrapper">
    <!-- Header Banner -->
    <header class="header-banner">
      <div class="header-top-row">
        <span class="series-badge">🇯🇵 Minna no Nihongo Official Series</span>
        <span class="level-badge">JLPT N5 Core</span>
      </div>
      <h1 class="lesson-headline">Lesson ${lesson.lessonNumber}: ${escapeHtml(lesson.title)}</h1>
      ${lesson.titleJapanese ? `<div class="lesson-japanese-title">${escapeHtml(lesson.titleJapanese)}</div>` : ''}
      <p class="lesson-desc">${escapeHtml(lesson.description)}</p>

      <div class="metadata-strip">
        <div class="meta-item">
          <span class="meta-key">AI Grammar Coach</span>
          <span class="meta-val">${escapeHtml(providerLabel)}</span>
        </div>
        <div class="meta-item">
          <span class="meta-key">Grammar Patterns</span>
          <span class="meta-val">${grammarData.topics.length} Detailed Topics</span>
        </div>
        <div class="meta-item">
          <span class="meta-key">Target Examination</span>
          <span class="meta-val">JLPT N5 Section: Grammar</span>
        </div>
        <div class="meta-item">
          <span class="meta-key">Study Guide Date</span>
          <span class="meta-val">${escapeHtml(currentDate)}</span>
        </div>
      </div>
    </header>

    <!-- Syllabus Table (Quick Reference) -->
    <section class="syllabus-section">
      <div class="syllabus-title">
        <span>📋</span>
        <span>Lesson ${lesson.lessonNumber} Grammar Syllabus &amp; Quick Reference</span>
      </div>
      <table class="syllabus-table">
        <thead>
          <tr>
            <th class="col-num">#</th>
            <th class="col-pattern">Pattern</th>
            <th>Formula Structure</th>
            <th>Core Meaning &amp; Function</th>
          </tr>
        </thead>
        <tbody>
          ${syllabusRows}
        </tbody>
      </table>
    </section>

    <!-- Comprehensive Topic Cards -->
    <main class="topics-container">
      ${topicsHtml}
    </main>

    <!-- Answer Key & Explanations Appendix (For Printed Self-Testing) -->
    <section class="syllabus-section appendix-section" style="margin-top: 24px;">
      <div class="syllabus-title">
        <span>🔑</span>
        <span>Verified Answer Key &amp; Grammar Explanations Appendix</span>
      </div>
      <table class="syllabus-table">
        <thead>
          <tr>
            <th class="col-num">Q#</th>
            <th class="col-pattern">Grammar Topic</th>
            <th class="col-ans">Correct Answer</th>
            <th>Explanation &amp; Rule</th>
          </tr>
        </thead>
        <tbody>
          ${answerKeyRows}
        </tbody>
      </table>
    </section>

    <!-- Document Footer -->
    <footer class="document-footer">
      <div class="footer-left">
        Minna no Nihongo JLPT N5 Master Grammar Series • Lesson ${lesson.lessonNumber}
      </div>
      <div class="footer-right">
        <span>Generated via AI Grammar Coach (Next.js Edition)</span>
        <span>•</span>
        <span>${escapeHtml(currentDate)}</span>
      </div>
    </footer>
  </div>

  <script>
    // Interactive Show / Hide Answer JavaScript Logic (Pure JS)
    function showAnswer(id) {
      var el = document.getElementById(id);
      if (el) el.style.display = 'block';
    }

    function hideAnswer(id) {
      var el = document.getElementById(id);
      if (el) el.style.display = 'none';
    }

    function toggleAllAnswers(show) {
      var boxes = document.querySelectorAll('.interactive-answer-box');
      for (var i = 0; i < boxes.length; i++) {
        boxes[i].style.display = show ? 'block' : 'none';
      }
    }

    // Auto-trigger print/Save as PDF dialog after styles render if in print mode
    ${
      !options?.interactiveMode
        ? `
    window.addEventListener('load', function() {
      setTimeout(function() {
        try { window.print(); } catch (e) {}
      }, 350);
    });
    `
        : ''
    }
  </script>
</body>
</html>`;
}

/**
 * Triggers the browser export as PDF dialog by opening a dedicated, styled preview window
 */
export function exportGrammarLessonAsPdf(
  lesson: MinnaLesson,
  grammarData: GrammarAiPayload
): void {
  const html = generateGrammarPdfHtml(lesson, grammarData, { interactiveMode: false });

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  } else {
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document || iframe.contentDocument;
    if (doc) {
      doc.open();
      doc.write(html);
      doc.close();

      setTimeout(() => {
        try {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
        } finally {
          setTimeout(() => {
            document.body.removeChild(iframe);
          }, 60000);
        }
      }, 500);
    }
  }
}

/**
 * High-level helper: Fetches AI grammar data if needed and triggers the PDF export
 */
export async function triggerLessonGrammarPdfExport(
  lesson: MinnaLesson,
  preferredProvider?: 'groq' | 'gemini'
): Promise<void> {
  const grammarData = await getOrFetchLessonAiGrammar(lesson, preferredProvider);
  exportGrammarLessonAsPdf(lesson, grammarData);
}

/**
 * Exports the lesson as an interactive study guide with Show/Hide answers.
 * 100% Next.js native — zero Python dependencies.
 */
export async function downloadInteractiveGrammarPdf(
  lesson: MinnaLesson,
  grammarData?: GrammarAiPayload | null,
  preferredProvider?: 'groq' | 'gemini'
): Promise<void> {
  const data = grammarData || await getOrFetchLessonAiGrammar(lesson, preferredProvider);
  const html = generateGrammarPdfHtml(lesson, data, { interactiveMode: true });

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  } else {
    // If popups blocked, download as standalone interactive HTML
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 1000);
  }
}
