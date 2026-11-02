import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'N5 KANJI MASTER – AI-Powered Learn, Practice & Master 120 Japanese Kanji',
  description: 'Master all 120 foundational Japanese N5 kanji, Onyomi, Kunyomi, vocabulary, and sentences through intelligent progressive learning and Groq AI tutoring.',
  keywords: 'JLPT N5, Kanji Master, Japanese Learning, Onyomi, Kunyomi, Spaced Repetition, Groq AI, Learn Kanji',
  authors: [{ name: 'N5 Kanji Master' }]
};

export const viewport: Viewport = {
  themeColor: '#d90429',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-red-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
