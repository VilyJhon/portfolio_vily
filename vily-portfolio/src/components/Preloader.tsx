import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

const WORDS = ['Design', 'Create', 'Inspire'];

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setVisible(false);
      onComplete();
      return;
    }

    let rafId = 0;
    const duration = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const ratio = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - ratio, 3);
      const nextVal = Math.round(eased * 100);
      setProgress(nextVal);

      if (ratio < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setVisible(false);
          onComplete();
        }, 220);
      }
    };

    rafId = requestAnimationFrame(tick);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        cancelAnimationFrame(rafId);
        setVisible(false);
        onComplete();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setVisible(false);
    onComplete();
  };

  const wordIndex = progress < 38 ? 0 : progress < 76 ? 1 : 2;
  const formattedCount = String(progress).padStart(3, '0');

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#050505] px-6 py-7 text-zinc-100 sm:px-10 sm:py-9"
          role="dialog"
          aria-label="Loading portfolio"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between text-xs tracking-wide text-zinc-400">
            <div className="flex items-center gap-3">
              <span className="font-medium text-zinc-200">Portfolio</span>
              <span aria-hidden="true">·</span>
              <span>Vily Jhon M. Amen</span>
            </div>
            <button
              type="button"
              onClick={handleSkip}
              className="rounded-md px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Skip
            </button>
          </div>

          {/* Center animated word */}
          <div className="flex flex-1 items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={WORDS[wordIndex]}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
                className="font-display text-4xl font-semibold tracking-tight text-white sm:text-6xl"
              >
                {WORDS[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Bottom progress row */}
          <div>
            <div className="mb-3 flex items-end justify-between">
              <span className="text-xs tracking-wider text-zinc-500">
                Preparing experience
              </span>
              <span className="font-mono-num text-4xl font-light tracking-tight text-zinc-100 sm:text-6xl">
                {formattedCount}
              </span>
            </div>
            <div className="h-[2px] w-full overflow-hidden bg-zinc-800">
              <div
                className="h-full bg-zinc-100 transition-[width] duration-75 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
