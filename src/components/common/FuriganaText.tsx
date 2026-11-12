'use client';

import React from 'react';
import { parseFurigana } from '@/utils/japaneseWordDisplay';

interface FuriganaTextProps {
  kanji?: string;
  reading?: string;
  showFurigana?: boolean;
  className?: string;
  rubyClassName?: string;
  rtClassName?: string;
}

/**
 * Renders Japanese text with Furigana (振り仮名) above Kanji characters.
 * When `showFurigana` is false or no Kanji is present, renders clean text.
 */
export function FuriganaText({
  kanji,
  reading,
  showFurigana = true,
  className = '',
  rubyClassName = '',
  rtClassName = ''
}: FuriganaTextProps) {
  if (!kanji && !reading) return null;

  // If Furigana is disabled by user, display base text
  if (!showFurigana) {
    return <span className={className}>{kanji || reading}</span>;
  }

  const segments = parseFurigana(kanji, reading);

  return (
    <span className={`inline-flex flex-wrap items-baseline justify-center max-w-full text-center ${className}`}>
      {segments.map((seg, idx) => {
        if (!seg.rt) {
          return <span key={idx} className="break-words">{seg.ruby}</span>;
        }
        return (
          <ruby key={idx} className={`ruby-position-over max-w-full ${rubyClassName}`}>
            {seg.ruby}
            <rt className={`text-[0.45em] leading-tight font-normal text-stone-500 dark:text-stone-400 select-none ${rtClassName}`}>
              {seg.rt}
            </rt>
          </ruby>
        );
      })}
    </span>
  );
}

