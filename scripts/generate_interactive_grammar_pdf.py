#!/usr/bin/env python3
"""
Interactive PDF Generator for AI Grammar Coach (Minna no Nihongo JLPT N5)
Embeds AcroForm pushbuttons and read-only text fields with PDF JavaScript:
- Show Answer: this.getField("ans_X").display = display.visible;
- Hide Answer: this.getField("ans_X").display = display.hidden;
Uses PyMuPDF (fitz) and embeds Noto Sans CJK JP for full Japanese glyph support.
"""

import os
import sys
import json
import argparse
import fitz

class InteractiveGrammarPdfGenerator:
    def __init__(self, font_path=None):
        self.doc = fitz.open()
        self.page_width = 595.28  # A4 width in points (210mm)
        self.page_height = 841.89 # A4 height in points (297mm)
        self.margin_x = 40
        self.content_width = self.page_width - (2 * self.margin_x) # 515.28 pt
        self.current_y = 40
        self.page_num = 0
        self.q_counter = 0

        # Resolve Japanese Font
        script_dir = os.path.dirname(os.path.abspath(__file__))
        project_root = os.path.dirname(script_dir)
        
        candidates = [
            font_path,
            os.path.join(project_root, "src", "assets", "fonts", "NotoSansJP-Regular.ttf"),
            os.path.join(project_root, "public", "fonts", "NotoSansJP-Regular.ttf"),
            r"C:\Windows\Fonts\msgothic.ttc",
            r"C:\Windows\Fonts\meiryo.ttc",
            r"C:\Windows\Fonts\BIZ-UDGothicR.ttc"
        ]
        
        self.font_path = None
        for c in candidates:
            if c and os.path.exists(c):
                self.font_path = c
                break
                
        if not self.font_path:
            raise FileNotFoundError("Could not find a valid Japanese font (Noto Sans JP or system font).")

        self.current_page = None

    def new_page(self, is_cover=False, lesson_data=None):
        self.page_num += 1
        self.current_page = self.doc.new_page(width=self.page_width, height=self.page_height)
        
        if not is_cover:
            self.draw_page_header(lesson_data)
            self.current_y = 60
        else:
            self.current_y = 40
            
        return self.current_page

    def draw_page_header(self, lesson_data):
        p = self.current_page
        p.draw_line(
            fitz.Point(self.margin_x, 42),
            fitz.Point(self.page_width - self.margin_x, 42),
            color=(0.85, 0.88, 0.92),
            width=0.75
        )
        title = lesson_data.get("title", "Grammar Guide") if lesson_data else "AI Grammar Coach"
        num = lesson_data.get("lessonNumber", 1) if lesson_data else 1
        header_text = f"JLPT N5 • Minna no Nihongo Lesson {num} • {title}"
        p.insert_text(
            fitz.Point(self.margin_x, 35),
            header_text,
            fontfile=self.font_path,
            fontsize=8.5,
            color=(0.35, 0.4, 0.5)
        )
        p.insert_text(
            fitz.Point(self.page_width - self.margin_x - 135, 35),
            "Interactive Practice Guide (JS)",
            fontfile=self.font_path,
            fontsize=8.5,
            color=(0.15, 0.38, 0.85)
        )

    def draw_footer(self, total_pages, lesson_num):
        for idx in range(total_pages):
            p = self.doc[idx]
            footer_y = self.page_height - 28
            p.draw_line(
                fitz.Point(self.margin_x, footer_y - 12),
                fitz.Point(self.page_width - self.margin_x, footer_y - 12),
                color=(0.85, 0.88, 0.92),
                width=0.75
            )
            p.insert_text(
                fitz.Point(self.margin_x, footer_y),
                f"Minna no Nihongo JLPT N5 Master Series • Lesson {lesson_num} Interactive PDF",
                fontfile=self.font_path,
                fontsize=8,
                color=(0.5, 0.55, 0.6)
            )
            page_str = f"Page {idx + 1} of {total_pages}"
            p.insert_text(
                fitz.Point(self.page_width - self.margin_x - 55, footer_y),
                page_str,
                fontfile=self.font_path,
                fontsize=8,
                color=(0.5, 0.55, 0.6)
            )

    def check_space(self, required_height, lesson_data):
        if self.current_y + required_height > self.page_height - 50:
            self.new_page(is_cover=False, lesson_data=lesson_data)

    def draw_cover_banner(self, lesson_data):
        p = self.current_page
        banner_height = 142
        banner_rect = fitz.Rect(self.margin_x, self.current_y, self.page_width - self.margin_x, self.current_y + banner_height)
        
        # Deep Indigo royal banner
        p.draw_rect(banner_rect, fill=(0.07, 0.12, 0.32), color=(0.05, 0.09, 0.25), radius=0.06)

        # Top Badge: Series & Level
        p.draw_rect(fitz.Rect(self.margin_x + 16, self.current_y + 14, self.margin_x + 195, self.current_y + 30),
                    fill=(0.18, 0.28, 0.6), color=None, radius=0.3)
        p.insert_text(fitz.Point(self.margin_x + 22, self.current_y + 25),
                      "🇯🇵 MINNA NO NIHONGO • JLPT N5",
                      fontfile=self.font_path, fontsize=8, color=(1, 1, 1))

        p.draw_rect(fitz.Rect(self.page_width - self.margin_x - 130, self.current_y + 14, self.page_width - self.margin_x - 16, self.current_y + 30),
                    fill=(0.86, 0.15, 0.15), color=None, radius=0.3)
        p.insert_text(fitz.Point(self.page_width - self.margin_x - 122, self.current_y + 25),
                      "INTERACTIVE PDF (JS)",
                      fontfile=self.font_path, fontsize=8, color=(1, 1, 1))

        # Main Headline
        lesson_num = lesson_data.get("lessonNumber", 1)
        title = lesson_data.get("title", "")
        jp_title = lesson_data.get("titleJapanese", "")
        
        p.insert_text(fitz.Point(self.margin_x + 16, self.current_y + 54),
                      f"LESSON {lesson_num}: {title}",
                      fontfile=self.font_path, fontsize=15.5, color=(1, 1, 1))

        if jp_title:
            p.insert_text(fitz.Point(self.margin_x + 16, self.current_y + 73),
                          f"第{lesson_num}課: {jp_title}",
                          fontfile=self.font_path, fontsize=11.5, color=(0.6, 0.8, 1))

        desc = lesson_data.get("description", "Master Japanese grammar patterns with structured explanations, authentic examples, and interactive practice questions.")
        p.insert_textbox(
            fitz.Rect(self.margin_x + 16, self.current_y + 82, self.page_width - self.margin_x - 16, self.current_y + 106),
            desc,
            fontfile=self.font_path,
            fontsize=8.5,
            color=(0.82, 0.88, 0.96)
        )

        # Interactive Notice Bar
        notice_rect = fitz.Rect(self.margin_x + 16, self.current_y + 110, self.page_width - self.margin_x - 16, self.current_y + 132)
        p.draw_rect(notice_rect, fill=(0.12, 0.22, 0.5), color=None, radius=0.2)
        p.insert_text(
            fitz.Point(self.margin_x + 22, self.current_y + 124),
            "💡 Interactive Feature: Click [▶ Show Answer] to reveal answers and [✕ Hide Answer] to hide. Best viewed in Adobe Acrobat Reader.",
            fontfile=self.font_path,
            fontsize=7.5,
            color=(0.95, 0.9, 0.6)
        )

        self.current_y += banner_height + 16

    def draw_grammar_section(self, section_idx, total_sections, topic_data, lesson_data):
        self.check_space(145, lesson_data)
        p = self.current_page
        
        topic_title = topic_data.get("topicName", f"Grammar Topic #{section_idx}")
        formula = topic_data.get("grammarStructure", "")
        explanation = topic_data.get("simpleExplanation", "")
        examples = topic_data.get("japaneseExamples", [])
        
        # Section Heading Bar
        head_rect = fitz.Rect(self.margin_x, self.current_y, self.page_width - self.margin_x, self.current_y + 26)
        p.draw_rect(head_rect, fill=(0.94, 0.96, 1.0), color=(0.8, 0.86, 0.98), radius=0.15)
        
        badge_rect = fitz.Rect(self.margin_x + 6, self.current_y + 4, self.margin_x + 72, self.current_y + 22)
        p.draw_rect(badge_rect, fill=(0.15, 0.35, 0.85), color=None, radius=0.3)
        p.insert_text(fitz.Point(self.margin_x + 11, self.current_y + 16),
                      f"TOPIC {section_idx}/{total_sections}",
                      fontfile=self.font_path, fontsize=7.5, color=(1, 1, 1))
        
        p.insert_text(fitz.Point(self.margin_x + 80, self.current_y + 17),
                      topic_title,
                      fontfile=self.font_path, fontsize=11, color=(0.1, 0.15, 0.3))
        
        self.current_y += 32
        
        # Formula Callout Box
        if formula:
            formula_rect = fitz.Rect(self.margin_x + 6, self.current_y, self.page_width - self.margin_x - 6, self.current_y + 26)
            p.draw_rect(formula_rect, fill=(0.98, 0.99, 1.0), color=(0.28, 0.52, 0.92), width=1.2, radius=0.15)
            p.insert_text(fitz.Point(self.margin_x + 14, self.current_y + 17),
                          f"📐 FORMULA:  {formula}",
                          fontfile=self.font_path, fontsize=9.5, color=(0.12, 0.25, 0.65))
            self.current_y += 32
            
        # Explanation Textbox
        if explanation:
            exp_rect = fitz.Rect(self.margin_x + 6, self.current_y, self.page_width - self.margin_x - 6, self.current_y + 36)
            p.insert_textbox(exp_rect, f"Explanation: {explanation}", fontfile=self.font_path, fontsize=9, color=(0.2, 0.25, 0.3))
            self.current_y += 38
            
        # Japanese Examples
        if examples:
            ex_box_height = min(len(examples) * 22 + 18, 85)
            self.check_space(ex_box_height + 20, lesson_data)
            p = self.current_page
            
            ex_rect = fitz.Rect(self.margin_x + 6, self.current_y, self.page_width - self.margin_x - 6, self.current_y + ex_box_height)
            p.draw_rect(ex_rect, fill=(0.97, 0.98, 0.99), color=(0.88, 0.9, 0.94), radius=0.1)
            p.insert_text(fitz.Point(self.margin_x + 14, self.current_y + 14),
                          "💬 AUTHENTIC EXAMPLES:",
                          fontfile=self.font_path, fontsize=8, color=(0.3, 0.4, 0.55))
            
            sub_y = self.current_y + 27
            for ex in examples[:2]:
                jp = ex.get("japanese", "")
                kana = ex.get("furigana", "")
                meaning = ex.get("meaning", "")
                ex_text = f"• {jp}  [{kana}]  →  \"{meaning}\"" if kana else f"• {jp}  →  \"{meaning}\""
                p.insert_text(fitz.Point(self.margin_x + 18, sub_y), ex_text, fontfile=self.font_path, fontsize=8.5, color=(0.15, 0.2, 0.3))
                sub_y += 19
                
            self.current_y += ex_box_height + 14

    def draw_question_with_interactive_answer(self, q_data, lesson_data):
        self.check_space(180, lesson_data)
        p = self.current_page
        self.q_counter += 1
        q_num = self.q_counter
        
        q_text = q_data.get("question", "")
        options = q_data.get("options", ["A) Option A", "B) Option B", "C) Option C", "D) Option D"])
        correct_ans = q_data.get("correctAnswer", "A")
        explanation = q_data.get("explanation", "Review the grammar pattern above.")
        
        card_start_y = self.current_y
        card_height = 172
        card_rect = fitz.Rect(self.margin_x + 6, card_start_y, self.page_width - self.margin_x - 6, card_start_y + card_height)
        p.draw_rect(card_rect, fill=(1, 1, 1), color=(0.85, 0.88, 0.94), radius=0.08)
        
        # Question Header Badge
        p.draw_rect(fitz.Rect(self.margin_x + 14, card_start_y + 8, self.margin_x + 82, card_start_y + 24),
                    fill=(0.2, 0.25, 0.35), color=None, radius=0.3)
        p.insert_text(fitz.Point(self.margin_x + 20, card_start_y + 19),
                      f"QUESTION #{q_num}",
                      fontfile=self.font_path, fontsize=7.5, color=(1, 1, 1))
        
        # Question Prompt
        p.insert_textbox(
            fitz.Rect(self.margin_x + 90, card_start_y + 6, self.page_width - self.margin_x - 14, card_start_y + 28),
            q_text,
            fontfile=self.font_path,
            fontsize=9.5,
            color=(0.1, 0.15, 0.25)
        )
        
        # 4 Options list
        opt_y = card_start_y + 34
        for opt in options[:4]:
            p.insert_text(
                fitz.Point(self.margin_x + 20, opt_y + 9),
                opt,
                fontfile=self.font_path,
                fontsize=9,
                color=(0.15, 0.2, 0.3)
            )
            opt_y += 15
            
        # Pushbuttons: [Show Answer] & [Hide Answer]
        btn_y = card_start_y + 102
        field_id = f"ans_{q_num}"
        btn_show_id = f"btn_show_{q_num}"
        btn_hide_id = f"btn_hide_{q_num}"
        
        # Show Button
        btn_show = fitz.Widget()
        btn_show.rect = fitz.Rect(self.margin_x + 18, btn_y, self.margin_x + 115, btn_y + 22)
        btn_show.field_type = fitz.PDF_WIDGET_TYPE_BUTTON
        btn_show.field_name = btn_show_id
        btn_show.field_flags = fitz.PDF_BTN_FIELD_IS_PUSHBUTTON
        btn_show.button_caption = "▶ Show Answer"
        btn_show.script = f'this.getField("{field_id}").display = display.visible;'
        btn_show.fill_color = (0.12, 0.35, 0.85) # Vibrant Blue
        btn_show.text_color = (1, 1, 1)
        btn_show.text_fontsize = 8
        p.add_widget(btn_show)
        
        # Hide Button
        btn_hide = fitz.Widget()
        btn_hide.rect = fitz.Rect(self.margin_x + 125, btn_y, self.margin_x + 215, btn_y + 22)
        btn_hide.field_type = fitz.PDF_WIDGET_TYPE_BUTTON
        btn_hide.field_name = btn_hide_id
        btn_hide.field_flags = fitz.PDF_BTN_FIELD_IS_PUSHBUTTON
        btn_hide.button_caption = "✕ Hide Answer"
        btn_hide.script = f'this.getField("{field_id}").display = display.hidden;'
        btn_hide.fill_color = (0.9, 0.92, 0.96) # Slate Gray
        btn_hide.text_color = (0.25, 0.3, 0.4)
        btn_hide.text_fontsize = 8
        p.add_widget(btn_hide)
        
        # Hidden Answer Box (Read-Only AcroForm Text Widget)
        # Hidden by default via field_display = 1 (display.hidden)
        tf_y = btn_y + 26
        tf = fitz.Widget()
        tf.rect = fitz.Rect(self.margin_x + 18, tf_y, self.page_width - self.margin_x - 18, tf_y + 36)
        tf.field_type = fitz.PDF_WIDGET_TYPE_TEXT
        tf.field_name = field_id
        tf.field_value = f"✓ Correct Answer: {correct_ans}\nExplanation: {explanation}"
        tf.field_flags = fitz.PDF_FIELD_IS_READ_ONLY | fitz.PDF_TX_FIELD_IS_MULTILINE
        tf.field_display = 1 # 1 = display.hidden
        tf.fill_color = (0.94, 0.98, 0.94) # Soft emerald
        tf.text_color = (0.05, 0.4, 0.15) # Dark green
        tf.border_color = (0.4, 0.8, 0.5)
        tf.border_width = 1
        tf.text_fontsize = 8.5
        p.add_widget(tf)
        
        self.current_y += card_height + 14

    def build_lesson_pdf(self, lesson_data, output_path):
        self.new_page(is_cover=True, lesson_data=lesson_data)
        self.draw_cover_banner(lesson_data)
        
        topics = lesson_data.get("topics", [])
        total_topics = len(topics)
        
        for idx, topic in enumerate(topics, start=1):
            self.draw_grammar_section(idx, total_topics, topic, lesson_data)
            
            # Practice questions for this grammar section
            questions = topic.get("practiceQuestions", [])
            if not questions:
                questions = self.synthesize_questions_for_topic(topic, idx)
                
            for q in questions:
                self.draw_question_with_interactive_answer(q, lesson_data)
                
        # Draw running footers on all generated pages
        self.draw_footer(len(self.doc), lesson_data.get("lessonNumber", 1))
        
        self.doc.save(output_path, deflate=True, garbage=4, clean=True)
        return output_path

    def synthesize_questions_for_topic(self, topic, idx):
        topic_name = topic.get("topicName", "")
        structure = topic.get("grammarStructure", "")
        examples = topic.get("japaneseExamples", [])
        
        q_list = []
        if examples and len(examples) > 0:
            ex = examples[0]
            jp = ex.get("japanese", "")
            meaning = ex.get("meaning", "")
            
            # Question 1: Sentence Completion
            q_list.append({
                "question": f"Fill in the blank for the pattern '{topic_name}':\n{jp}",
                "options": [
                    "A) " + (structure if len(structure) < 35 else "Correct pattern form"),
                    "B) Incorrect particle form",
                    "C) Casual plain form",
                    "D) Incompatible verb tense"
                ],
                "correctAnswer": "A",
                "explanation": f"According to the pattern '{structure}', this option correctly conveys: \"{meaning}\"."
            })
            
            # Question 2: Function & Meaning
            q_list.append({
                "question": f"What is the grammatical function of '{topic_name}' in this sentence?",
                "options": [
                    "A) Connects the topic with the polite predicate or state",
                    "B) Indicates direct physical movement towards a place",
                    "C) Expresses informal past tense among close friends",
                    "D) Expresses an obligation or strong command"
                ],
                "correctAnswer": "A",
                "explanation": f"'{topic_name}' functions as: {topic.get('simpleExplanation', 'Polite grammar structure')}."
            })
        else:
            q_list.append({
                "question": f"Which structure correctly forms the pattern '{topic_name}'?",
                "options": [
                    f"A) {structure or 'Standard polite structure'}",
                    "B) Unrelated particle marker",
                    "C) Casual plain form",
                    "D) Incorrect tense conjugation"
                ],
                "correctAnswer": "A",
                "explanation": f"The standard formula is '{structure}'."
            })
            
        return q_list


def main():
    parser = argparse.ArgumentParser(description="Generate Interactive PDF with Show/Hide Answers for AI Grammar Coach")
    parser.add_argument("--payload", help="JSON payload file or inline JSON string", default=None)
    parser.add_argument("--output", help="Output PDF file path", default="interactive_grammar_lesson.pdf")
    parser.add_argument("--font", help="Path to Japanese font", default=None)
    
    args = parser.parse_args()
    
    if args.payload:
        if os.path.exists(args.payload):
            with open(args.payload, "r", encoding="utf-8") as f:
                lesson_data = json.load(f)
        else:
            lesson_data = json.loads(args.payload)
    else:
        raw = sys.stdin.read()
        if raw.strip():
            lesson_data = json.loads(raw)
        else:
            raise ValueError("No payload provided via --payload or stdin.")
            
    generator = InteractiveGrammarPdfGenerator(font_path=args.font)
    out = generator.build_lesson_pdf(lesson_data, args.output)
    print(f"SUCCESS:{out}")

if __name__ == "__main__":
    main()
