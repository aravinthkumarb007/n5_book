'use client';

import { useState, useRef, useEffect } from 'react';

export interface UseSwipeCardOptions {
  onSwipeRight: () => void; // Swipe right -> Learned
  onSwipeLeft: () => void;  // Swipe left -> Vocabulary Re-learning Hub
  onSwipeUp?: () => void;   // Swipe up -> Move to next card
  onTap?: () => void;       // Tap -> Flip card
  threshold?: number;       // Pixels needed to trigger swipe action (default: 75)
  disabled?: boolean;
}

/**
 * Custom hook to enable mobile & desktop swipe gestures on flashcards:
 * - Swipe Right -> Mark as Learned & advance to next card
 * - Swipe Left  -> Add to Vocabulary Re-learning Hub & advance to next card
 * - Swipe Up    -> Move directly to the next card
 * - Clean Tap   -> Flip card between question and answer
 */
export function useSwipeCard({
  onSwipeRight,
  onSwipeLeft,
  onSwipeUp,
  onTap,
  threshold = 75,
  disabled = false
}: UseSwipeCardOptions) {
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [flyOut, setFlyOut] = useState<'left' | 'right' | 'up' | null>(null);

  const startPos = useRef<{ x: number; y: number; time: number } | null>(null);
  const gestureType = useRef<'horizontal' | 'up' | null>(null);
  const currentDragOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  currentDragOffset.current = dragOffset;

  useEffect(() => {
    if (disabled) {
      setDragOffset({ x: 0, y: 0 });
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
    gestureType.current = null;
    setIsDragging(true);
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!startPos.current || disabled || flyOut) return;

    const deltaX = clientX - startPos.current.x;
    const deltaY = clientY - startPos.current.y;

    // Detect gesture direction once displacement exceeds 8px
    if (gestureType.current === null) {
      if (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8) {
        if (Math.abs(deltaX) >= Math.abs(deltaY)) {
          gestureType.current = 'horizontal';
        } else if (deltaY < -8 && onSwipeUp) {
          gestureType.current = 'up';
        }
      }
    }

    if (gestureType.current === 'horizontal') {
      // Damped horizontal movement for pleasant drag feel
      const dampedX = Math.sign(deltaX) * Math.pow(Math.abs(deltaX), 0.94);
      setDragOffset({ x: dampedX, y: 0 });
    } else if (gestureType.current === 'up') {
      // Damped vertical movement for upward swipe
      const dampedY = deltaY < 0 
        ? -Math.pow(Math.abs(deltaY), 0.94) 
        : Math.pow(deltaY, 0.8) * 0.25;
      setDragOffset({ x: 0, y: dampedY });
    }
  };

  const handleEnd = () => {
    if (!startPos.current) return;

    const offset = currentDragOffset.current;
    const duration = Date.now() - startPos.current.time;
    const totalDist = Math.sqrt(offset.x * offset.x + offset.y * offset.y);
    const isQuickFlickX = duration < 240 && Math.abs(offset.x) > 35;
    const isQuickFlickY = duration < 240 && offset.y < -35;
    const isTap = totalDist < 8 && duration < 300;

    startPos.current = null;
    gestureType.current = null;
    setIsDragging(false);

    // Clean tap without drag triggers flip
    if (isTap) {
      setDragOffset({ x: 0, y: 0 });
      onTap?.();
      return;
    }

    // 1. Swipe Up -> Move to next card
    if (onSwipeUp && (offset.y < -threshold || (isQuickFlickY && Math.abs(offset.y) > Math.abs(offset.x)))) {
      setFlyOut('up');
      setTimeout(() => {
        setFlyOut(null);
        setDragOffset({ x: 0, y: 0 });
        onSwipeUp();
      }, 230);
    }
    // 2. Swipe Right -> Learned
    else if (offset.x > threshold || (isQuickFlickX && offset.x > 0)) {
      setFlyOut('right');
      setTimeout(() => {
        setFlyOut(null);
        setDragOffset({ x: 0, y: 0 });
        onSwipeRight();
      }, 230);
    }
    // 3. Swipe Left -> Vocabulary Re-learning Hub
    else if (offset.x < -threshold || (isQuickFlickX && offset.x < 0)) {
      setFlyOut('left');
      setTimeout(() => {
        setFlyOut(null);
        setDragOffset({ x: 0, y: 0 });
        onSwipeLeft();
      }, 230);
    }
    // 4. Release without reaching threshold -> Snap back smoothly
    else {
      setDragOffset({ x: 0, y: 0 });
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
  let transform = 'translate(0px, 0px) rotate(0deg) scale(1)';
  let transition = 'transform 0.28s cubic-bezier(0.175, 0.885, 0.32, 1.15), opacity 0.22s ease';

  if (flyOut === 'up') {
    transform = 'translateY(-130%) scale(0.88) rotate(-3deg)';
    transition = 'transform 0.22s ease-out, opacity 0.22s ease-out';
  } else if (flyOut === 'right') {
    transform = 'translateX(120%) rotate(16deg)';
    transition = 'transform 0.22s ease-out, opacity 0.22s ease-out';
  } else if (flyOut === 'left') {
    transform = 'translateX(-120%) rotate(-16deg)';
    transition = 'transform 0.22s ease-out, opacity 0.22s ease-out';
  } else if (isDragging) {
    if (dragOffset.y < 0) {
      const scale = Math.max(0.92, 1 - Math.abs(dragOffset.y) * 0.0006);
      transform = `translateY(${dragOffset.y}px) scale(${scale})`;
    } else {
      const rotation = dragOffset.x * 0.05;
      transform = `translateX(${dragOffset.x}px) rotate(${rotation}deg)`;
    }
    transition = 'none';
  }

  const rightOpacity = dragOffset.x > 15
    ? Math.min((dragOffset.x - 15) / (threshold - 15), 1)
    : flyOut === 'right' ? 1 : 0;

  const leftOpacity = dragOffset.x < -15
    ? Math.min((-dragOffset.x - 15) / (threshold - 15), 1)
    : flyOut === 'left' ? 1 : 0;

  const upOpacity = dragOffset.y < -15
    ? Math.min((-dragOffset.y - 15) / (threshold - 15), 1)
    : flyOut === 'up' ? 1 : 0;

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
      touchAction: 'none' as const,
      willChange: 'transform, opacity' as const,
    },
    isDragging,
    dragOffset,
    rightOpacity,
    leftOpacity,
    upOpacity,
    flyOut
  };
}
