'use client';

import { useState, useRef, useEffect } from 'react';

export interface UseSwipeCardOptions {
  onSwipeRight: () => void; // Swipe right -> Learned
  onSwipeLeft: () => void;  // Swipe left -> Vocabulary Re-learning Hub
  onTap?: () => void;       // Tap -> Flip card
  threshold?: number;       // Pixels needed to trigger swipe action (default: 75)
  disabled?: boolean;
}

/**
 * Custom hook to enable mobile & desktop swipe gestures on flashcards:
 * - Swipe Right -> Mark as Learned & advance to next card
 * - Swipe Left  -> Add to Vocabulary Re-learning Hub & advance to next card
 * - Clean Tap   -> Flip card between question and answer
 */
export function useSwipeCard({
  onSwipeRight,
  onSwipeLeft,
  onTap,
  threshold = 75,
  disabled = false
}: UseSwipeCardOptions) {
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [flyOut, setFlyOut] = useState<'left' | 'right' | null>(null);

  const startPos = useRef<{ x: number; y: number; time: number } | null>(null);
  const isHorizontalGesture = useRef<boolean | null>(null);
  const currentDragOffset = useRef(0);

  currentDragOffset.current = dragOffset;

  useEffect(() => {
    if (disabled) {
      setDragOffset(0);
      setIsDragging(false);
      setFlyOut(null);
    }
  }, [disabled]);

  const handleStart = (clientX: number, clientY: number, target?: EventTarget | null) => {
    if (disabled || flyOut) return;
    if (target && (target as HTMLElement).closest && (target as HTMLElement).closest('button, a, input, select, textarea')) {
      return;
    }
    startPos.current = { x: clientX, y: clientY, time: Date.now() };
    isHorizontalGesture.current = null;
    setIsDragging(true);
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!startPos.current || disabled || flyOut) return;

    const deltaX = clientX - startPos.current.x;
    const deltaY = clientY - startPos.current.y;

    // Detect horizontal swipe vs vertical scroll
    if (isHorizontalGesture.current === null) {
      if (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8) {
        isHorizontalGesture.current = Math.abs(deltaX) >= Math.abs(deltaY);
      }
    }

    if (isHorizontalGesture.current === true) {
      // Damped horizontal movement for pleasant drag feel
      const damped = Math.sign(deltaX) * Math.pow(Math.abs(deltaX), 0.94);
      setDragOffset(damped);
    }
  };

  const handleEnd = () => {
    if (!startPos.current) return;

    const offset = currentDragOffset.current;
    const duration = Date.now() - startPos.current.time;
    const isQuickFlick = duration < 240 && Math.abs(offset) > 35;
    const isTap = Math.abs(offset) < 8 && duration < 300;

    startPos.current = null;
    isHorizontalGesture.current = null;
    setIsDragging(false);

    // Clean tap without drag triggers flip
    if (isTap) {
      setDragOffset(0);
      onTap?.();
      return;
    }

    // Swipe Right -> Learned
    if (offset > threshold || (isQuickFlick && offset > 0)) {
      setFlyOut('right');
      setTimeout(() => {
        setFlyOut(null);
        setDragOffset(0);
        onSwipeRight();
      }, 230);
    }
    // Swipe Left -> Vocabulary Re-learning Hub
    else if (offset < -threshold || (isQuickFlick && offset < 0)) {
      setFlyOut('left');
      setTimeout(() => {
        setFlyOut(null);
        setDragOffset(0);
        onSwipeLeft();
      }, 230);
    }
    // Release without reaching threshold -> Snap back smoothly
    else {
      setDragOffset(0);
    }
  };

  // Window listeners for mouse drag on desktop
  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const onMouseUp = () => {
      handleEnd();
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging]);

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY, e.target);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const onTouchEnd = () => {
    handleEnd();
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    handleStart(e.clientX, e.clientY, e.target);
  };

  // Dynamic visual styling
  let transform = 'translateX(0px) rotate(0deg)';
  let transition = 'transform 0.28s cubic-bezier(0.175, 0.885, 0.32, 1.15), opacity 0.22s ease';

  if (flyOut === 'right') {
    transform = 'translateX(120%) rotate(16deg)';
    transition = 'transform 0.22s ease-out, opacity 0.22s ease-out';
  } else if (flyOut === 'left') {
    transform = 'translateX(-120%) rotate(-16deg)';
    transition = 'transform 0.22s ease-out, opacity 0.22s ease-out';
  } else if (isDragging) {
    const rotation = dragOffset * 0.05;
    transform = `translateX(${dragOffset}px) rotate(${rotation}deg)`;
    transition = 'none';
  }

  const rightOpacity = dragOffset > 15
    ? Math.min((dragOffset - 15) / (threshold - 15), 1)
    : flyOut === 'right' ? 1 : 0;

  const leftOpacity = dragOffset < -15
    ? Math.min((-dragOffset - 15) / (threshold - 15), 1)
    : flyOut === 'left' ? 1 : 0;

  return {
    handlers: {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onMouseDown
    },
    cardStyle: {
      transform,
      transition,
      opacity: flyOut ? 0 : 1,
      touchAction: 'pan-y' as const,
      willChange: 'transform, opacity' as const,
    },
    isDragging,
    dragOffset,
    rightOpacity,
    leftOpacity,
    flyOut
  };
}
