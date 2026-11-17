import { useEffect, useState, type MouseEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowDownRight, ArrowUpRight, Eye } from 'lucide-react';
import { HIGHLIGHTS, PROFILE } from '../data/portfolio';

interface HeroProps {
  onOpenContact: () => void;
}

export default function Hero({ onOpenContact }: HeroProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isColorRevealed, setIsColorRevealed] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const timer = window.setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % PROFILE.rotatingRoles.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, []);

  const handlePointerMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -6, y: px * 6 });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsColorRevealed(false);
  };

  return (
    <section id="home" className="relative z-10 pt-14 pb-20 sm:pt-20 sm:pb-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Split Hero Grid */}
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Editorial Typography & Actions */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <div className="mb-5 flex flex-wrap items-center gap-2 text-xs font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
              <span>Portfolio</span>
              <span aria-hidden="true">·</span>
              <span>{PROFILE.location}</span>
              <span aria-hidden="true">·</span>
              <span>{PROFILE.university}</span>
            </div>

            <h1 className="font-display text-balance text-4xl font-semibold tracking-[-0.03em] text-zinc-950 sm:text-5xl lg:text-[3.75rem] lg:leading-[1.06] dark:text-zinc-50">
              {PROFILE.fullName}
            </h1>

            <div className="mt-4 flex flex-wrap items-baseline gap-x-2 text-lg text-zinc-600 sm:text-2xl dark:text-zinc-400">
              <span className="font-normal">A</span>
              <div className="relative min-h-[2rem] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={PROFILE.rotatingRoles[roleIndex]}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28 }}
                    className="font-display inline-block font-semibold text-zinc-950 underline decoration-zinc-300 decoration-1 underline-offset-8 dark:text-zinc-100 dark:decoration-zinc-700"
                  >
                    {PROFILE.rotatingRoles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="text-base text-zinc-500 sm:text-lg dark:text-zinc-400">
                based in Manila, PH.
              </span>
            </div>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-600 sm:text-[1.0625rem] dark:text-zinc-400">
              {PROFILE.lead}
            </p>

            {/* Primary CTA Row */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-zinc-800 whitespace-nowrap shrink-0 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
              >
                Explore Work
                <ArrowDownRight className="h-4 w-4" />
              </a>

              <a
                href="#stack"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-800 transition-colors hover:border-zinc-900 hover:text-zinc-950 whitespace-nowrap shrink-0 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:text-white"
              >
                Tech Stack
              </a>

              <button
                type="button"
                onClick={onOpenContact}
                className="inline-flex items-center gap-2 rounded-lg border border-transparent px-4 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 whitespace-nowrap shrink-0 dark:text-zinc-400 dark:hover:text-white"
              >
                Contact Me
              </button>
            </div>

            {/* Quiet Unboxed Social Links */}
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-zinc-200/80 pt-5 text-xs font-medium text-zinc-500 dark:border-zinc-800/80 dark:text-zinc-400">
              {PROFILE.socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-1 transition-colors hover:text-zinc-950 dark:hover:text-zinc-100"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Graphite-to-Color Portrait Card */}
          <div className="lg:col-span-5">
            <div
              onMouseMove={handlePointerMove}
              onMouseEnter={() => setIsColorRevealed(true)}
              onMouseLeave={handlePointerLeave}
              className="group relative flex h-full min-h-[380px] flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 transition-transform duration-200 ease-out dark:border-zinc-800 dark:bg-[#0d0d10]"
              style={{
                transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              }}
            >
              {/* Card Top Metadata */}
              <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                <span className="font-mono-num">00 · Portrait</span>
                <button
                  type="button"
                  onClick={() => setIsColorRevealed((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
                  aria-pressed={isColorRevealed}
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>{isColorRevealed ? 'Color Portrait' : 'Graphite Mode'}</span>
                </button>
              </div>

              {/* Portrait Frame */}
              <div className="relative my-4 flex-1 overflow-hidden rounded-xl border border-zinc-200/80 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950">
                {!imgError ? (
                  <img
                    src={PROFILE.portrait}
                    alt="Portrait of Vily Jhon M. Amen"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className={`h-full min-h-[290px] w-full object-cover object-top transition-all duration-500 ${
                      isColorRevealed
                        ? 'grayscale-0 contrast-100 brightness-100 scale-[1.02]'
                        : 'grayscale contrast-125 brightness-95'
                    }`}
                  />
                ) : (
                  <div className="flex h-full min-h-[290px] items-center justify-center bg-zinc-200 text-sm text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
                    Vily Jhon M. Amen
                  </div>
                )}

                {/* Subtle bottom scrim */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-4 text-white">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium tracking-wide">
                      {isColorRevealed ? 'Original Studio Portrait' : 'Hover or click to reveal color'}
                    </span>
                    <span className="font-mono-num text-zinc-300">{PROFILE.handle}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Line */}
              <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                <span>Open to learning & collaborations</span>
                <span className="font-mono-num">2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Highlights Strip Below Hero Split */}
        <div className="mt-14 grid grid-cols-1 divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 dark:divide-zinc-800 dark:border-zinc-800 dark:bg-[#0b0b0e]">
          {HIGHLIGHTS.map((item, idx) => (
            <div key={item.label + idx} className="flex flex-col justify-between p-6">
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-display font-mono-num text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                  {item.value}
                </span>
                <span className="font-mono-num text-xs text-zinc-400 dark:text-zinc-500">
                  0{idx + 1}
                </span>
              </div>
              <div className="mt-4">
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {item.label}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
