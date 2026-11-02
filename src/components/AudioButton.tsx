'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { audioService } from '@/services/audio';

interface AudioButtonProps {
  text: string;
  size?: 'sm' | 'md' | 'lg';
  rate?: number;
  label?: string;
  className?: string;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  size = 'md',
  rate = 0.9,
  label,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      audioService.stop();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    const ok = audioService.speak(text, () => setIsPlaying(false), rate);
    if (!ok) {
      setIsPlaying(false);
    }
  };

  const iconSize = size === 'sm' ? 14 : size === 'lg' ? 22 : 18;
  const padding = size === 'sm' ? 'p-1.5' : size === 'lg' ? 'p-3' : 'p-2';

  return (
    <button
      type="button"
      onClick={handleSpeak}
      title={`Listen to Japanese pronunciation of: ${text}`}
      className={`inline-flex items-center gap-1.5 rounded-full transition-all duration-200 cursor-pointer ${
        isPlaying
          ? 'bg-red-600 text-white shadow-md scale-105 animate-pulse'
          : 'bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300'
      } ${padding} ${className}`}
    >
      {isPlaying ? <Volume2 size={iconSize} className="animate-bounce" /> : <Volume2 size={iconSize} />}
      {label && <span className="text-xs font-medium pr-1">{label}</span>}
    </button>
  );
};
