// Service to export AI Grammar Coach lessons as premium, publication-quality PDFs
// Optimized for both digital reading and physical / vector PDF printing.

import { MinnaLesson, MinnaGrammarPoint } from '@/types/minna';

export interface GrammarAiExample {
  japanese: string;
  furigana?: string;
  romaji?: string;
  meaning: string;
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
 * Generates the complete, self-contained HTML document for the premium PDF export
 */
export function generateGrammarPdfHtml(
  lesson: MinnaLesson,
  grammarData: GrammarAiPayload
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

  const topicsHtml = grammarData.topics
    .map((topic, idx) => {
      // Step-by-step split into paragraphs/bullets
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

          <!-- Two-Column Pedagogical Insights: Mistakes & Tips -->
          <div class="insights-grid">
            <!-- Mistakes Box -->
            <div class="insight-card mistakes-card">
              <div class="insight-header">
                <span class="insight-icon">⚠️</span>
                <span class="insight-title">Common Mistakes to Avoid</span>
              </div>
              <ul class="insight-list">
                ${mistakesHtml}
              </ul>
            </div>

            <!-- Sensei Tips Box -->
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

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lesson ${lesson.lessonNumber} Grammar Guide - ${escapeHtml(lesson.title)}</title>
  <style>
    /* CSS Reset & Base Variables */
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

    .toolbar-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .btn-print {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      color: white;
      border: none;
      padding: 8px 18px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.4);
      transition: all 0.15s ease;
    }

    .btn-print:hover {
      background: linear-gradient(135deg, #1d4ed8, #1e40af);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.5);
    }

    .btn-close {
      background: rgba(255, 255, 255, 0.1);
      color: #e2e8f0;
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 8px 14px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.15s ease;
    }

    .btn-close:hover {
      background: rgba(255, 255, 255, 0.2);
      color: white;
    }

    .toolbar-tip {
      font-size: 11px;
      color: #94a3b8;
    }

    /* Document Sheet Container (Digital View) */
    .document-wrapper {
      max-width: 900px;
      margin: 28px auto;
      background: #ffffff;
      box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 0 1px 1px rgba(0, 0, 0, 0.05);
      border-radius: 12px;
      overflow: hidden;
      padding: 44px 48px;
    }

    /* Header Banner */
    .header-banner {
      background: var(--primary-gradient);
      color: white;
      border-radius: 12px;
      padding: 32px 36px;
      margin-bottom: 28px;
      position: relative;
      overflow: hidden;
    }

    .header-banner::before {
      content: "";
      position: absolute;
      top: -40px;
      right: -40px;
      width: 220px;
      height: 220px;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
    }

    .header-top-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 14px;
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
      font-size: 26px;
      font-weight: 900;
      line-height: 1.25;
      letter-spacing: -0.02em;
      margin-bottom: 6px;
      color: #ffffff;
    }

    .lesson-japanese-title {
      font-size: 16px;
      font-weight: 600;
      color: #93c5fd;
      margin-bottom: 12px;
    }

    .lesson-desc {
      font-size: 13px;
      color: #cbd5e1;
      max-width: 680px;
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .metadata-strip {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 10px;
      padding-top: 16px;
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
      margin-bottom: 32px;
      background: var(--slate-50);
      border: 1px solid var(--slate-200);
      border-radius: 10px;
      padding: 18px 20px;
    }

    .syllabus-title {
      font-size: 13px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--slate-700);
      margin-bottom: 12px;
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
      padding: 8px 12px;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    .syllabus-table td {
      padding: 9px 12px;
      border-bottom: 1px solid var(--slate-200);
      vertical-align: top;
    }

    .syllabus-table tr:last-child td {
      border-bottom: none;
    }

    .syllabus-table tr:nth-child(even) td {
      background: rgba(255, 255, 255, 0.6);
    }

    .col-num {
      width: 36px;
      font-weight: 800;
      color: var(--primary);
    }

    .col-pattern {
      width: 25%;
      font-size: 13px;
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

    .col-desc {
      color: var(--slate-600);
      font-size: 12px;
    }

    /* Individual Topic Cards */
    .topic-card {
      background: #ffffff;
      border: 1.5px solid var(--slate-200);
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 28px;
      position: relative;
    }

    .topic-header {
      margin-bottom: 18px;
      padding-bottom: 14px;
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
      font-size: 20px;
      font-weight: 900;
      color: var(--slate-900);
      margin-bottom: 6px;
      letter-spacing: -0.01em;
    }

    .topic-simple-exp {
      font-size: 13.5px;
      color: var(--slate-700);
      line-height: 1.6;
    }

    /* Formula Box */
    .formula-box {
      background: #f0f7ff;
      border: 1.5px solid #bfdbfe;
      border-left: 5px solid #2563eb;
      border-radius: 8px;
      padding: 14px 18px;
      margin-bottom: 20px;
    }

    .formula-header {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 10.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #1d4ed8;
      margin-bottom: 6px;
    }

    .formula-content {
      font-family: var(--font-mono);
      font-size: 14px;
      font-weight: 700;
      color: #1e3a8a;
      letter-spacing: 0.01em;
      line-height: 1.5;
    }

    /* Section Headings */
    .section-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--slate-800);
      margin-bottom: 12px;
    }

    /* Steps Content */
    .steps-section {
      margin-bottom: 20px;
    }

    .steps-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .steps-list li {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 12.5px;
      color: var(--slate-700);
      line-height: 1.6;
    }

    .step-num {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #e2e8f0;
      color: var(--slate-800);
      font-size: 11px;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      shrink: 0;
      margin-top: 2px;
    }

    .steps-paragraph {
      font-size: 12.5px;
      color: var(--slate-700);
      line-height: 1.6;
    }

    /* Japanese Examples */
    .examples-section {
      margin-bottom: 20px;
    }

    .examples-grid {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .example-item {
      background: var(--slate-50);
      border: 1px solid var(--slate-200);
      border-radius: 8px;
      padding: 12px 16px;
    }

    .example-header {
      margin-bottom: 6px;
    }

    .example-badge {
      display: inline-block;
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--primary);
      background: #e0e7ff;
      padding: 1px 7px;
      border-radius: 4px;
    }

    .example-japanese-box {
      margin-bottom: 6px;
    }

    .example-japanese {
      font-size: 15px;
      font-weight: 700;
      color: var(--slate-900);
      letter-spacing: 0.02em;
    }

    .example-furigana {
      font-size: 12px;
      color: #6366f1;
      font-weight: 500;
      margin-top: 1px;
    }

    .example-romaji {
      font-size: 11px;
      font-style: italic;
      color: var(--slate-600);
      margin-top: 1px;
    }

    .example-meaning {
      font-size: 12px;
      color: var(--slate-800);
      padding-top: 4px;
      border-top: 1px dashed var(--slate-200);
    }

    .meaning-label {
      font-weight: 700;
      color: var(--slate-600);
      margin-right: 4px;
    }

    .meaning-text {
      font-weight: 600;
    }

    /* Insights Grid: Mistakes & Tips */
    .insights-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-top: 14px;
    }

    @media (max-width: 650px) {
      .insights-grid {
        grid-template-columns: 1fr;
      }
    }

    .insight-card {
      border-radius: 8px;
      padding: 14px 16px;
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
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 8px;
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
      gap: 6px;
    }

    .mistake-item, .tip-item {
      display: flex;
      align-items: flex-start;
      gap: 6px;
      font-size: 11.5px;
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
      font-size: 11px;
    }

    .bullet-check {
      font-weight: 900;
      color: #059669;
      font-size: 11px;
    }

    /* Document Footer */
    .document-footer {
      margin-top: 36px;
      padding-top: 18px;
      border-top: 1.5px solid var(--slate-200);
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--slate-600);
      font-size: 11px;
      flex-wrap: wrap;
      gap: 8px;
    }

    .footer-left {
      font-weight: 600;
    }

    .footer-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* Print Stylesheet (Crucial for PDF Export) */
    @page {
      size: A4 portrait;
      margin: 14mm 14mm 16mm 14mm;
    }

    @media print {
      html, body {
        background: #ffffff !important;
        color: #0f172a !important;
        padding: 0 !important;
        margin: 0 !important;
        font-size: 12px !important;
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
        border-radius: 8px !important;
        padding: 24px 28px !important;
        margin-bottom: 20px !important;
      }

      .syllabus-section {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        page-break-inside: avoid !important;
        break-inside: avoid !important;
        margin-bottom: 24px !important;
      }

      .topic-card {
        page-break-inside: avoid !important;
        break-inside: avoid !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        box-shadow: none !important;
        border: 1px solid #cbd5e1 !important;
        margin-bottom: 20px !important;
        padding: 18px 20px !important;
      }

      .formula-box, .insight-card, .example-item {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }

      .document-footer {
        page-break-inside: avoid !important;
        break-inside: avoid !important;
        margin-top: 24px !important;
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
      <span class="toolbar-tip">💡 Tip: In the print dialog, set <strong>Destination</strong> to <strong>'Save as PDF'</strong> and check <strong>'Background graphics'</strong>.</span>
    </div>
    <div class="toolbar-actions">
      <button class="btn-print" onclick="window.print()">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 6 2 18 2 18 9"></polyline>
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
          <rect x="6" y="14" width="12" height="8"></rect>
        </svg>
        <span>Save as PDF / Print</span>
      </button>
      <button class="btn-close" onclick="window.close()">Close</button>
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

    <!-- Document Footer -->
    <footer class="document-footer">
      <div class="footer-left">
        Minna no Nihongo JLPT N5 Master Grammar Series • Lesson ${lesson.lessonNumber}
      </div>
      <div class="footer-right">
        <span>Generated via AI Grammar Coach</span>
        <span>•</span>
        <span>${escapeHtml(currentDate)}</span>
      </div>
    </footer>
  </div>

  <script>
    // Automatically trigger the print/Save as PDF dialog after styles and layout render
    window.addEventListener('load', () => {
      setTimeout(() => {
        try {
          window.print();
        } catch (e) {
          console.warn('Auto print triggered error:', e);
        }
      }, 350);
    });
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
  const html = generateGrammarPdfHtml(lesson, grammarData);

  // Open printable window
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  } else {
    // Fallback if popup is blocked: use hidden iframe
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
