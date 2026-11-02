'use client';

import React, { useRef, useState, useEffect } from 'react';
import { 
  RotateCcw, Eye, EyeOff, Sparkles, Undo2, 
  Play, Pause, AlertTriangle, CheckCircle2, ChevronRight, 
  HelpCircle, Info, RefreshCw, Zap, ArrowRight, PlayCircle, StopCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface StrokeCanvasProps {
  character: string;
  strokeCount: number;
  strokeDirections?: string[];
}

interface KanjiVgData {
  paths: string[];
  numbers: { x: number; y: number; num: string }[];
}

const CIRCLED_NUMBERS = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩', '⑪', '⑫', '⑬', '⑭', '⑮', '⑯'];

// In-memory cache for KanjiVG SVGs so fetch happens only once per character
const svgCache = new Map<string, KanjiVgData>();

// Standard stroke type hints based on position and direction keywords
function getStrokeBadge(directionText?: string, strokeIndex?: number) {
  if (!directionText) {
    return {
      symbol: CIRCLED_NUMBERS[strokeIndex ?? 0] || `#${(strokeIndex ?? 0) + 1}`,
      arrow: '→',
      tip: 'Left to right (横)',
      expectedDirection: 'horizontal_lr'
    };
  }

  const d = directionText.toLowerCase();
  let arrow = '→';
  let tip = 'Horizontal: Left to Right (横)';
  let expectedDirection = 'horizontal_lr';

  if (d.includes('vertical') || d.includes('down') || d.includes('downward')) {
    arrow = '↓';
    tip = 'Vertical: Top to Bottom (縦)';
    expectedDirection = 'vertical_tb';
  } else if (d.includes('diagonal') || d.includes('left-falling') || d.includes('slant')) {
    arrow = '↙';
    tip = 'Slant: Top-Right to Bottom-Left (払い)';
    expectedDirection = 'slant_left';
  } else if (d.includes('right-falling') || d.includes('down and right')) {
    arrow = '↘';
    tip = 'Slant: Top-Left to Bottom-Right (払い)';
    expectedDirection = 'slant_right';
  } else if (d.includes('hook') || d.includes('turn') || d.includes('corner')) {
    arrow = '⮑';
    tip = 'Corner Hook: Across and down (折・跳ね)';
    expectedDirection = 'hook';
  } else if (d.includes('dot')) {
    arrow = '•';
    tip = 'Dot Stroke (点)';
    expectedDirection = 'dot';
  }

  return {
    symbol: CIRCLED_NUMBERS[strokeIndex ?? 0] || `#${(strokeIndex ?? 0) + 1}`,
    arrow,
    tip,
    expectedDirection
  };
}

export const StrokeCanvas: React.FC<StrokeCanvasProps> = ({
  character,
  strokeCount,
  strokeDirections = []
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stripContainerRef = useRef<HTMLDivElement | null>(null);

  // Drawing state
  const [isDrawing, setIsDrawing] = useState(false);
  const [showGhost, setShowGhost] = useState(true);
  const [currentStrokeIndex, setCurrentStrokeIndex] = useState(0); // 0-indexed expected stroke
  const [validSnapshots, setValidSnapshots] = useState<ImageData[]>([]);
  const startPointRef = useRef<{ x: number; y: number } | null>(null);
  const strokePathRef = useRef<{ x: number; y: number }[]>([]);
  const preStrokeSnapshotRef = useRef<ImageData | null>(null);

  // KanjiVG SVG Data for authentic Jisho frame diagrams & Live Animation
  const [kanjiVgData, setKanjiVgData] = useState<KanjiVgData | null>(null);
  const [isLoadingSvg, setIsLoadingSvg] = useState(false);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Validation feedback
  const [feedbackBanner, setFeedbackBanner] = useState<{
    type: 'error' | 'success' | 'complete' | null;
    message: string;
    details?: string;
  } | null>(null);
  const [isCanvasShaking, setIsCanvasShaking] = useState(false);

  // Live Auto-Drawing Sequence Demonstration
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);
  const [demoStrokeIndex, setDemoStrokeIndex] = useState(0);
  const [demoProgress, setDemoProgress] = useState(0);
  const animFrameIdRef = useRef<number | null>(null);

  // Stroke items metadata
  const strokeItems = Array.from({ length: strokeCount }, (_, idx) => {
    const dir = strokeDirections[idx] || (idx === 0 ? 'Top horizontal opening stroke' : `Stroke ${idx + 1} continuation`);
    const badge = getStrokeBadge(dir, idx);
    return {
      index: idx,
      number: idx + 1,
      symbol: badge.symbol,
      arrow: badge.arrow,
      direction: dir,
      tip: badge.tip,
      expectedDirection: badge.expectedDirection
    };
  });

  // Fetch authentic KanjiVG SVG paths (like Jisho & Takoboto)
  useEffect(() => {
    let isMounted = true;
    async function loadSvg() {
      if (!character) return;
      if (svgCache.has(character)) {
        setKanjiVgData(svgCache.get(character)!);
        return;
      }

      setIsLoadingSvg(true);
      try {
        const codePoint = character.codePointAt(0);
        if (!codePoint) return;
        const hex = codePoint.toString(16).padStart(5, '0');
        const res = await fetch(`https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg/kanji/${hex}.svg`);
        if (res.ok) {
          const text = await res.text();
          const pathRegex = /<path[^>]*d="([^"]+)"/g;
          const paths: string[] = [];
          let pMatch;
          while ((pMatch = pathRegex.exec(text)) !== null) {
            paths.push(pMatch[1]);
          }

          const textRegex = /<text transform="matrix\(1 0 0 1 ([0-9.]+) ([0-9.]+)\)">(\d+)<\/text>/g;
          const numbers: { x: number; y: number; num: string }[] = [];
          let tMatch;
          while ((tMatch = textRegex.exec(text)) !== null) {
            numbers.push({
              x: parseFloat(tMatch[1]),
              y: parseFloat(tMatch[2]),
              num: tMatch[3]
            });
          }

          const data = { paths, numbers };
          svgCache.set(character, data);
          if (isMounted) setKanjiVgData(data);
        }
      } catch (err) {
        console.warn('KanjiVG fetch failed, fallback mode:', err);
      } finally {
        if (isMounted) setIsLoadingSvg(false);
      }
    }

    loadSvg();
    return () => {
      isMounted = false;
    };
  }, [character]);

  // Reset when character changes
  useEffect(() => {
    clearCanvas();
    stopLiveDemo();
  }, [character]);

  // Clean animation frame on unmount
  useEffect(() => {
    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, []);

  // Smooth HORIZONTAL-ONLY scroll inside the top frame strip container
  // (Prevents parent modal / window from jumping or scrolling up!)
  useEffect(() => {
    const activeIdx = isPlayingDemo ? demoStrokeIndex : currentStrokeIndex;
    const container = stripContainerRef.current;
    const target = frameRefs.current[activeIdx];
    if (container && target) {
      const targetLeft = target.offsetLeft - container.offsetLeft;
      const scrollPosition = targetLeft - (container.clientWidth / 2) + (target.clientWidth / 2);
      container.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: 'smooth'
      });
    }
  }, [currentStrokeIndex, demoStrokeIndex, isPlayingDemo]);

  // ----------------------------------------------------
  // Live Automated Stroke Drawing Engine
  // ----------------------------------------------------
  const togglePlaySequence = () => {
    if (isPlayingDemo) {
      stopLiveDemo();
    } else {
      startLiveDemo();
    }
  };

  const stopLiveDemo = () => {
    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = null;
    }
    setIsPlayingDemo(false);
    setDemoProgress(0);
  };

  const startLiveDemo = () => {
    // Clear user drawings so the demonstration is 100% clean
    clearCanvas();
    setIsPlayingDemo(true);
    setDemoStrokeIndex(0);
    setDemoProgress(0);
    setFeedbackBanner({
      type: 'success',
      message: '🎬 Live Stroke Order Demonstration',
      details: `Watch Sensei write 「${character}」 live stroke by stroke. Observe how each stroke starts and curves!`
    });

    let currentStroke = 0;
    let progress = 0;
    let pauseCounter = 0;

    const animate = () => {
      if (pauseCounter > 0) {
        pauseCounter--;
        animFrameIdRef.current = requestAnimationFrame(animate);
        return;
      }

      // Smooth calligraphy speed (~700ms per stroke)
      progress += 2.4;

      if (progress >= 100) {
        progress = 100;
        setDemoProgress(100);

        if (currentStroke + 1 >= strokeCount) {
          // Finished all strokes!
          setDemoStrokeIndex(strokeCount);
          setIsPlayingDemo(false);
          setFeedbackBanner({
            type: 'complete',
            message: `🎉 Demonstration Complete!`,
            details: `Now it's your turn! Touch or click the canvas below to practice drawing 「${character}」 from Stroke #1.`
          });
          return;
        } else {
          // Pause slightly between strokes for natural brush rhythm
          pauseCounter = 16;
          currentStroke++;
          setDemoStrokeIndex(currentStroke);
          progress = 0;
          setDemoProgress(0);
        }
      } else {
        setDemoProgress(progress);
      }

      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);
  };

  // ----------------------------------------------------
  // Canvas Drawing & Stroke Order Validation
  // ----------------------------------------------------
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    // If live demonstration is currently running, stop it so user can draw
    if (isPlayingDemo) {
      stopLiveDemo();
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Save pre-stroke snapshot for undo
    preStrokeSnapshotRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    startPointRef.current = { x, y };
    strokePathRef.current = [{ x, y }];

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 12;
    ctx.strokeStyle = '#1c1917'; // Sumi black ink
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    strokePathRef.current.push({ x, y });
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const path = strokePathRef.current;
    const startPt = startPointRef.current;

    // Ignore accidental clicks / micro-taps (< 12px)
    if (!startPt || path.length < 3) {
      if (preStrokeSnapshotRef.current) {
        ctx.putImageData(preStrokeSnapshotRef.current, 0, 0);
      }
      return;
    }

    const endPt = path[path.length - 1];
    const dx = endPt.x - startPt.x;
    const dy = endPt.y - startPt.y;
    const totalDist = Math.sqrt(dx * dx + dy * dy);

    if (totalDist < 14) {
      if (preStrokeSnapshotRef.current) {
        ctx.putImageData(preStrokeSnapshotRef.current, 0, 0);
      }
      return;
    }

    // Check if user already finished all strokes
    if (currentStrokeIndex >= strokeCount) {
      triggerWrongStroke('Stroke Limit Reached', `This kanji only has ${strokeCount} strokes!`);
      return;
    }

    const expectedStroke = strokeItems[currentStrokeIndex];
    const width = canvas.width;
    const height = canvas.height;

    // ==========================================
    // STROKE ORDER VALIDATION RULES
    // ==========================================
    let isWrongOrder = false;
    let errorReason = '';

    // Rule 1: Japanese strokes follow Top-to-Bottom and Left-to-Right
    if (expectedStroke.expectedDirection === 'horizontal_lr') {
      // Must draw generally Left-to-Right
      if (dx < -28) {
        isWrongOrder = true;
        errorReason = `Drawn in reverse! Stroke #${expectedStroke.number} must be drawn from Left to Right (→).`;
      }
    } else if (expectedStroke.expectedDirection === 'vertical_tb') {
      // Must draw Top-to-Bottom
      if (dy < -28) {
        isWrongOrder = true;
        errorReason = `Drawn upward! Stroke #${expectedStroke.number} must be drawn downwards from Top to Bottom (↓).`;
      }
    }

    // Rule 2: Top-most opening stroke check (Stroke 1 should start in upper/left area)
    if (currentStrokeIndex === 0 && strokeCount > 1) {
      if (startPt.y > height * 0.72) {
        isWrongOrder = true;
        errorReason = `Started too low! Stroke #1 starts in the upper quadrant, not at the bottom.`;
      }
    }

    // ==========================================
    // HANDLE RESULT: FULL RESET ON WRONG STROKE
    // ==========================================
    if (isWrongOrder) {
      triggerWrongStroke('Wrong Stroke Order! (書き順エラー)', errorReason);
    } else {
      // Correct Stroke!
      acceptCorrectStroke(ctx, canvas);
    }
  };

  /**
   * FULL RESET: When a stroke is drawn wrong, clear the entire canvas so
   * the user restarts the kanji from Stroke 1.
   */
  const triggerWrongStroke = (title: string, reason: string) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      // CLEAR THE ENTIRE CANVAS COMPLETELY
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Reset progress completely back to Stroke 1
    setValidSnapshots([]);
    setCurrentStrokeIndex(0);

    // Physical shake animation feedback
    setIsCanvasShaking(true);
    setTimeout(() => setIsCanvasShaking(false), 600);

    setFeedbackBanner({
      type: 'error',
      message: title,
      details: `${reason} Entire canvas has been reset! Please start over from Stroke #1 (follow Step 1 in the top strip).`
    });
  };

  const acceptCorrectStroke = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const nextIdx = currentStrokeIndex + 1;
    setCurrentStrokeIndex(nextIdx);

    // Save snapshot of valid drawing
    const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setValidSnapshots(prev => [...prev, snapshot]);

    if (nextIdx >= strokeCount) {
      // Completed all strokes correctly!
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      setFeedbackBanner({
        type: 'complete',
        message: `🎉 Perfect! Kanji 「${character}」 Mastered!`,
        details: `All ${strokeCount} strokes completed in 100% correct Japanese stroke order (書き順).`
      });
    } else {
      setFeedbackBanner({
        type: 'success',
        message: `✓ Stroke #${currentStrokeIndex + 1} Correct!`,
        details: `Great job! Now look at Step #${nextIdx + 1} above: ${strokeItems[nextIdx]?.tip || 'Next stroke'}.`
      });
    }
  };

  const undoLastStroke = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (validSnapshots.length === 0) {
      clearCanvas();
      return;
    }

    const prevSnapshots = validSnapshots.slice(0, -1);
    setValidSnapshots(prevSnapshots);

    if (prevSnapshots.length > 0) {
      ctx.putImageData(prevSnapshots[prevSnapshots.length - 1], 0, 0);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    const newIndex = Math.max(0, currentStrokeIndex - 1);
    setCurrentStrokeIndex(newIndex);
    setFeedbackBanner(null);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
    setValidSnapshots([]);
    setCurrentStrokeIndex(0);
    setFeedbackBanner(null);
  };

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      {/* ======================================================== */}
      {/* 1. TOP SECTION: JISHO / TAKOBOTO STROKE ORDER STRIP     */}
      {/* ======================================================== */}
      <div className="w-full bg-white dark:bg-stone-850 p-3.5 sm:p-4 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
        {/* Strip Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 border-b border-stone-100 dark:border-stone-800 pb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-red-600 text-white font-japanese font-bold text-xs flex items-center justify-center shadow-xs shrink-0">
              順
            </div>
            <div>
              <h4 className="font-bold text-xs text-stone-900 dark:text-white flex items-center gap-1.5">
                Stroke Order Diagram (書き順 コマ送り)
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                  {strokeCount} Strokes
                </span>
              </h4>
              <p className="text-[11px] text-stone-500">
                Follow each step in this top strip to draw on the canvas below
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={togglePlaySequence}
              className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer shadow-xs ${
                isPlayingDemo
                  ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
                  : 'bg-red-50 hover:bg-red-100 dark:bg-red-950/60 dark:hover:bg-red-900/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/60'
              }`}
              title={isPlayingDemo ? 'Stop Live Demonstration' : 'Auto-Draw Live Demonstration'}
            >
              {isPlayingDemo ? <Pause size={12} className="fill-current" /> : <Play size={12} className="fill-current" />}
              <span>{isPlayingDemo ? 'Stop Demo' : 'Play Live Demo'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                stopLiveDemo();
                clearCanvas();
              }}
              className="p-1.5 rounded-xl text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer"
              title="Reset"
            >
              <RotateCcw size={13} />
            </button>
          </div>
        </div>

        {/* Jisho Horizontal Scrollable Frame Strip */}
        <div 
          ref={stripContainerRef}
          className="flex items-stretch gap-2.5 overflow-x-auto pb-2 pt-1 scrollbar-none px-0.5 max-w-full"
        >
          {strokeItems.map((s, idx) => {
            const isPast = isPlayingDemo ? idx < demoStrokeIndex : idx < currentStrokeIndex;
            const isCurrent = isPlayingDemo ? idx === demoStrokeIndex : idx === currentStrokeIndex;
            const isHighlighted = isCurrent;

            return (
              <div
                key={s.index}
                ref={el => { frameRefs.current[idx] = el; }}
                onClick={() => {
                  stopLiveDemo();
                }}
                className={`shrink-0 w-22 sm:w-24 p-2 rounded-2xl border transition-all flex flex-col items-center justify-between text-center select-none cursor-pointer ${
                  isHighlighted
                    ? 'bg-red-50/90 dark:bg-red-950/40 border-red-500 shadow-md ring-2 ring-red-500/30 scale-[1.02]'
                    : isPast
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/70'
                    : 'bg-stone-50/60 dark:bg-stone-900/60 border-stone-200 dark:border-stone-800 hover:border-stone-300'
                }`}
              >
                {/* Step Badge */}
                <div className="w-full flex items-center justify-between text-[10px] font-bold mb-1">
                  <span className={`px-1.5 py-0.5 rounded-md ${
                    isHighlighted
                      ? 'bg-red-600 text-white'
                      : isPast
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                  }`}>
                    Step {idx + 1}
                  </span>

                  {isPast ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-black">✓</span>
                  ) : isCurrent ? (
                    <span className="text-red-600 font-bold text-[9px] uppercase tracking-wider animate-pulse">Now</span>
                  ) : (
                    <span className="text-stone-400 text-[9px]">#{idx + 1}</span>
                  )}
                </div>

                {/* Jisho Rice-Grid Diagram Box */}
                <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700/80 overflow-hidden flex items-center justify-center shadow-2xs">
                  {/* Red Dashed Rice Grid */}
                  <div className="absolute inset-0 pointer-events-none opacity-25">
                    <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-red-500" />
                    <div className="absolute left-1/2 top-0 bottom-0 border-l border-dashed border-red-500" />
                  </div>

                  {kanjiVgData && kanjiVgData.paths.length > 0 ? (
                    <svg viewBox="0 0 109 109" className="w-full h-full p-1">
                      {/* Previous strokes in dark gray */}
                      {kanjiVgData.paths.slice(0, idx).map((p, pIdx) => (
                        <path
                          key={pIdx}
                          d={p}
                          fill="none"
                          stroke="#52525b"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      ))}

                      {/* Current stroke for this frame in VIBRANT RED (Jisho style) */}
                      {kanjiVgData.paths[idx] && (
                        <path
                          d={kanjiVgData.paths[idx]}
                          fill="none"
                          stroke="#dc2626"
                          strokeWidth="5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      )}

                      {/* Starting Number circle badge */}
                      {kanjiVgData.numbers[idx] && (
                        <g transform={`translate(${kanjiVgData.numbers[idx].x}, ${kanjiVgData.numbers[idx].y})`}>
                          <circle cx="0" cy="-3" r="5.5" fill="#dc2626" />
                          <text
                            x="0"
                            y="-0.8"
                            textAnchor="middle"
                            fontSize="7.5"
                            fontWeight="bold"
                            fill="#ffffff"
                          >
                            {idx + 1}
                          </text>
                        </g>
                      )}
                    </svg>
                  ) : (
                    // Clean fallback preview
                    <div className="relative flex items-center justify-center">
                      <span className="font-japanese text-3xl font-black text-stone-900 dark:text-white">
                        {character}
                      </span>
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                    </div>
                  )}
                </div>

                {/* Direction Tip */}
                <div className="w-full pt-1.5 mt-1 border-t border-stone-100 dark:border-stone-800 text-[10px] text-stone-600 dark:text-stone-300 truncate">
                  <span className="font-bold text-red-600 dark:text-red-400 mr-0.5">{s.arrow}</span>
                  <span className="text-[9px]">{s.tip.split(':')[0]}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. WRITING FEEDBACK BANNER (FULL RESET NOTIFICATION)     */}
      {/* ======================================================== */}
      {feedbackBanner && (
        <div
          className={`w-full p-3.5 rounded-2xl border text-xs flex items-start gap-3 transition-all shadow-sm ${
            feedbackBanner.type === 'error'
              ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-900 text-rose-800 dark:text-rose-200 animate-fadeIn'
              : feedbackBanner.type === 'complete'
              ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-900 text-emerald-800 dark:text-emerald-200'
              : 'bg-blue-50 dark:bg-blue-950/50 border-blue-300 dark:border-blue-900 text-blue-800 dark:text-blue-200'
          }`}
        >
          {feedbackBanner.type === 'error' ? (
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5 animate-pulse" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <p className="font-bold text-sm">
              {feedbackBanner.message}
            </p>
            {feedbackBanner.details && (
              <p className="mt-0.5 text-xs opacity-90 leading-relaxed">
                {feedbackBanner.details}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. CURRENT TARGET GUIDANCE (LIVE DEMO OR USER DRAWING)   */}
      {/* ======================================================== */}
      <div className="w-full bg-white dark:bg-stone-850 p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm flex items-center justify-between gap-3 text-xs">
        {isPlayingDemo ? (
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-xl bg-red-600 text-white font-japanese font-black flex items-center justify-center text-sm shadow-xs animate-pulse">
              {CIRCLED_NUMBERS[demoStrokeIndex] || `#${demoStrokeIndex + 1}`}
            </span>
            <div>
              <span className="font-bold text-red-600 dark:text-red-400 block">
                {demoStrokeIndex < strokeCount
                  ? `Sensei Live Demo: Drawing Stroke #${demoStrokeIndex + 1} of ${strokeCount}...`
                  : `Demonstration Complete!`}
              </span>
              <span className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1">
                <span className="font-bold text-red-600">{strokeItems[demoStrokeIndex]?.arrow}</span>
                <span>{strokeItems[demoStrokeIndex]?.direction || 'Finished'}</span>
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-xl bg-red-600 text-white font-japanese font-black flex items-center justify-center text-sm shadow-xs">
              {CIRCLED_NUMBERS[currentStrokeIndex] || `#${currentStrokeIndex + 1}`}
            </span>
            <div>
              <span className="font-bold text-stone-900 dark:text-white block">
                {currentStrokeIndex < strokeCount
                  ? `Draw Stroke #${currentStrokeIndex + 1} of ${strokeCount}`
                  : `All ${strokeCount} strokes completed!`}
              </span>
              <span className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1">
                <span className="font-bold text-red-600">{strokeItems[currentStrokeIndex]?.arrow}</span>
                <span>{strokeItems[currentStrokeIndex]?.direction || 'Finished'}</span>
              </span>
            </div>
          </div>
        )}

        <div className="text-right">
          <span className="font-mono font-bold text-stone-700 dark:text-stone-300 text-sm">
            {isPlayingDemo ? `${demoStrokeIndex} / ${strokeCount}` : `${currentStrokeIndex} / ${strokeCount}`}
          </span>
          <span className="text-[10px] text-stone-400 block">
            {isPlayingDemo ? 'Demo Progress' : 'Strokes Validated'}
          </span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. RICE GRID (田字格) INTERACTIVE DRAWING CANVAS        */}
      {/* ======================================================== */}
      <div
        className={`relative w-72 h-72 rounded-3xl overflow-hidden bg-amber-50/40 dark:bg-stone-900/40 shadow-inner border-2 transition-all ${
          isCanvasShaking
            ? 'border-rose-500 ring-4 ring-rose-500/20 scale-[0.98]'
            : isPlayingDemo
            ? 'border-red-500 ring-2 ring-red-500/20'
            : currentStrokeIndex >= strokeCount
            ? 'border-emerald-500 ring-2 ring-emerald-500/20'
            : 'border-dashed border-red-300 dark:border-red-900/60'
        }`}
      >
        {/* Japanese Rice Grid (田字格) Guidelines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-red-200 dark:border-stone-800" />
          <div className="absolute left-1/2 top-0 bottom-0 border-l border-dashed border-red-200 dark:border-stone-800" />
          <svg className="w-full h-full opacity-15 stroke-red-500">
            <line x1="0" y1="0" x2="100%" y2="100%" strokeDasharray="4 4" />
            <line x1="100%" y1="0" x2="0" y2="100%" strokeDasharray="4 4" />
          </svg>
          {/* Quadrant Watermarks */}
          <span className="absolute top-2 left-2 text-[10px] font-japanese font-bold text-stone-400/30">左上</span>
          <span className="absolute top-2 right-2 text-[10px] font-japanese font-bold text-stone-400/30">右上</span>
          <span className="absolute bottom-2 left-2 text-[10px] font-japanese font-bold text-stone-400/30">左下</span>
          <span className="absolute bottom-2 right-2 text-[10px] font-japanese font-bold text-stone-400/30">右下</span>
        </div>

        {/* Tracing Guide: Authentic KanjiVG paths with numbers or Font Ghost */}
        {showGhost && !isPlayingDemo && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            {kanjiVgData && kanjiVgData.paths.length > 0 ? (
              <svg viewBox="0 0 109 109" className="w-full h-full p-6 opacity-25 dark:opacity-30">
                {kanjiVgData.paths.map((p, pIdx) => (
                  <path
                    key={pIdx}
                    d={p}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ))}
                {kanjiVgData.numbers.map((n, nIdx) => (
                  <g key={nIdx} transform={`translate(${n.x}, ${n.y})`}>
                    <circle cx="0" cy="-3" r="5" fill="#dc2626" />
                    <text x="0" y="-0.5" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#ffffff">
                      {n.num}
                    </text>
                  </g>
                ))}
              </svg>
            ) : (
              <span className="font-japanese text-[160px] text-red-200/40 dark:text-stone-800/80 font-bold leading-none">
                {character}
              </span>
            )}
          </div>
        )}

        {/* Beacon pointing to next stroke (manual practice mode) */}
        {!isPlayingDemo && currentStrokeIndex < strokeCount && (
          <div className="absolute top-3 left-3 pointer-events-none z-20">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-900/80 text-white text-[11px] font-bold backdrop-blur-xs shadow-md">
              <span>Start Stroke {CIRCLED_NUMBERS[currentStrokeIndex]}</span>
              <span className="text-red-400 font-bold">{strokeItems[currentStrokeIndex]?.arrow}</span>
            </span>
          </div>
        )}

        {/* ======================================================== */}
        {/* LIVE AUTO-DRAWING ANIMATED DEMONSTRATION LAYER           */}
        {/* ======================================================== */}
        {isPlayingDemo && kanjiVgData && kanjiVgData.paths.length > 0 && (
          <div className="absolute inset-0 pointer-events-none z-15 flex items-center justify-center">
            <svg viewBox="0 0 109 109" className="w-full h-full p-6">
              {/* Completed strokes in dark calligraphy black ink */}
              {kanjiVgData.paths.slice(0, demoStrokeIndex).map((p, idx) => (
                <path
                  key={idx}
                  d={p}
                  fill="none"
                  stroke="#1c1917"
                  className="dark:stroke-stone-100"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}

              {/* Currently live-drawn animating stroke in vibrant red */}
              {kanjiVgData.paths[demoStrokeIndex] && (
                <path
                  d={kanjiVgData.paths[demoStrokeIndex]}
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength={100}
                  strokeDasharray={100}
                  strokeDashoffset={100 - demoProgress}
                />
              )}

              {/* Number circle badge on current stroke start */}
              {kanjiVgData.numbers[demoStrokeIndex] && (
                <g transform={`translate(${kanjiVgData.numbers[demoStrokeIndex].x}, ${kanjiVgData.numbers[demoStrokeIndex].y})`}>
                  <circle cx="0" cy="-3" r="5.5" fill="#dc2626" />
                  <text x="0" y="-0.8" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#ffffff">
                    {demoStrokeIndex + 1}
                  </text>
                </g>
              )}
            </svg>
          </div>
        )}

        {/* Interactive Drawing Canvas */}
        <canvas
          ref={canvasRef}
          width={288}
          height={288}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="relative z-10 w-full h-full cursor-crosshair touch-none"
        />
      </div>

      {/* Action buttons (Undo, Guide Toggle, Reset) */}
      <div className="flex items-center justify-between w-full max-w-sm px-2 text-xs">
        <button
          type="button"
          onClick={undoLastStroke}
          disabled={validSnapshots.length === 0 || isPlayingDemo}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 font-bold transition disabled:opacity-40 cursor-pointer"
          title="Undo last stroke"
        >
          <Undo2 size={13} />
          <span>Undo Stroke</span>
        </button>

        <button
          type="button"
          onClick={() => setShowGhost(prev => !prev)}
          disabled={isPlayingDemo}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 font-bold transition cursor-pointer disabled:opacity-40"
        >
          {showGhost ? <EyeOff size={13} /> : <Eye size={13} />}
          <span>{showGhost ? 'Hide Guide' : 'Show Guide'}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            stopLiveDemo();
            clearCanvas();
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-bold transition border border-rose-200 dark:border-rose-900 cursor-pointer"
        >
          <RotateCcw size={13} />
          <span>Reset Canvas</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* 5. BEGINNER-FRIENDLY STROKE ORDER GOLDEN RULES           */}
      {/* ======================================================== */}
      <div className="w-full p-4 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 text-xs space-y-2">
        <h5 className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
          Golden Rules of Japanese Stroke Order (書き順の基本原則):
        </h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-stone-600 dark:text-stone-400 pt-1">
          <div className="p-2 rounded-xl bg-white dark:bg-stone-800 border border-stone-200/60 dark:border-stone-700">
            <strong className="text-stone-900 dark:text-white">1. Top to Bottom (上から下へ):</strong> Start with upper strokes before lower strokes (e.g. 三, 言).
          </div>
          <div className="p-2 rounded-xl bg-white dark:bg-stone-800 border border-stone-200/60 dark:border-stone-700">
            <strong className="text-stone-900 dark:text-white">2. Left to Right (左から右へ):</strong> Left radicals come before right elements (e.g. 休, 話).
          </div>
          <div className="p-2 rounded-xl bg-white dark:bg-stone-800 border border-stone-200/60 dark:border-stone-700">
            <strong className="text-stone-900 dark:text-white">3. Horizontal before Vertical (横先縦後):</strong> In crosses like 十, horizontal line goes first!
          </div>
          <div className="p-2 rounded-xl bg-white dark:bg-stone-800 border border-stone-200/60 dark:border-stone-700">
            <strong className="text-stone-900 dark:text-white">4. Outside before Closing (中先閉後):</strong> In frames like 日, 口, fill the inside before sealing!
          </div>
        </div>
      </div>
    </div>
  );
};
