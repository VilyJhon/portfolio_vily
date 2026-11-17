import { useRef, useState, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { RotateCw } from 'lucide-react';
import { PROFILE } from '../data/portfolio';

export default function UmakIdBadge() {
  const [flipped, setFlipped] = useState(false);
  const [glare, setGlare] = useState({ x: 50, y: 35, active: false });
  const dragMovedRef = useRef(false);

  // Drag physics values for natural hanging lanyard swing
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  const springX = useSpring(dragX, { stiffness: 210, damping: 17, mass: 0.9 });
  const springY = useSpring(dragY, { stiffness: 210, damping: 17, mass: 0.9 });

  // Pendulum swing rotation derived from horizontal drag
  const pendulumRotate = useTransform(springX, [-160, 160], [16, -16]);
  const pointerTiltX = useMotionValue(0);
  const pointerTiltY = useMotionValue(0);
  const smoothTiltX = useSpring(pointerTiltX, { stiffness: 260, damping: 24 });
  const smoothTiltY = useSpring(pointerTiltY, { stiffness: 260, damping: 24 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    pointerTiltX.set((py - 0.5) * -14);
    pointerTiltY.set((px - 0.5) * 14);
    setGlare({ x: px * 100, y: py * 100, active: true });
  };

  const handleMouseLeave = () => {
    pointerTiltX.set(0);
    pointerTiltY.set(0);
    setGlare((prev) => ({ ...prev, active: false }));
  };

  const handleCardClick = () => {
    if (dragMovedRef.current) {
      dragMovedRef.current = false;
      return;
    }
    setFlipped((prev) => !prev);
  };

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Subtle overhead ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 h-48 w-64 rounded-full bg-zinc-400/15 blur-3xl dark:bg-white/5"
      />

      {/* Hanging Pendulum Container */}
      <motion.div
        drag
        dragConstraints={{ left: -90, right: 90, top: -20, bottom: 45 }}
        dragElastic={0.35}
        dragSnapToOrigin
        onDragStart={() => {
          dragMovedRef.current = false;
        }}
        onDrag={(_, info) => {
          if (Math.abs(info.offset.x) > 5 || Math.abs(info.offset.y) > 5) {
            dragMovedRef.current = true;
          }
        }}
        style={{
          x: springX,
          y: springY,
          rotate: pendulumRotate,
          transformOrigin: 'top center',
        }}
        animate={{
          rotate: [0, 1.1, 0, -1.1, 0],
        }}
        transition={{
          rotate: {
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
        whileDrag={{ cursor: 'grabbing', scale: 1.015 }}
        className="relative flex cursor-grab flex-col items-center"
      >
        {/* UMak Woven Black Lanyard Strap */}
        <div
          className="relative flex h-28 w-10 flex-col items-center justify-between overflow-hidden border-x border-zinc-700/60 shadow-md"
          style={{
            backgroundColor: '#121215',
            backgroundImage:
              'repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 4px)',
          }}
        >
          {/* Vertical UMak Lanyard Print matching real strap */}
          <div className="flex h-full flex-col items-center justify-center gap-0.5 py-1.5">
            <span className="text-[7px] font-semibold tracking-[0.22em] text-zinc-300/90 [writing-mode:vertical-rl]">
              UNIVERSITY OF MAKATI
            </span>
            <span
              className="font-display text-[13px] font-bold tracking-[0.14em] text-transparent [writing-mode:vertical-rl]"
              style={{
                WebkitTextStroke: '0.8px rgba(255,255,255,0.9)',
              }}
            >
              UMAK
            </span>
          </div>

          {/* Top metallic snap rivet */}
          <div className="absolute bottom-1.5 h-2.5 w-2.5 rounded-full border border-zinc-500 bg-gradient-to-br from-zinc-300 via-zinc-500 to-zinc-700 shadow-inner" />
        </div>

        {/* Matte Black Side-Release Buckle */}
        <div className="relative flex h-8 w-11 flex-col items-center justify-between rounded-sm border border-zinc-700 bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-950 px-1 py-1 shadow-md">
          <div className="h-1 w-full rounded-[1px] bg-zinc-700/80" />
          <div className="flex w-full items-center justify-between">
            <span className="h-2.5 w-1 rounded-l-xs bg-zinc-700" />
            <span className="h-2 w-4 rounded-[1px] bg-zinc-800 ring-1 ring-zinc-700/70" />
            <span className="h-2.5 w-1 rounded-r-xs bg-zinc-700" />
          </div>
          <div className="h-1 w-full rounded-[1px] bg-zinc-700/80" />
        </div>

        {/* Lower Lanyard Loop + Rivet */}
        <div className="relative flex h-5 w-9 items-center justify-center border-x border-zinc-700/60 bg-[#121215]">
          <div className="h-2.5 w-2.5 rounded-full border border-zinc-500 bg-gradient-to-br from-zinc-300 via-zinc-500 to-zinc-700 shadow-inner" />
        </div>

        {/* Steel D-Ring & Swivel Lobster Clasp SVG */}
        <svg
          width="36"
          height="38"
          viewBox="0 0 36 38"
          fill="none"
          aria-hidden="true"
          className="-mt-0.5 -mb-2.5 z-10 drop-shadow-md"
        >
          <defs>
            <linearGradient id="metalGrad" x1="0" y1="0" x2="36" y2="38" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#e4e4e7" />
              <stop offset="50%" stopColor="#a1a1aa" />
              <stop offset="100%" stopColor="#52525b" />
            </linearGradient>
          </defs>
          {/* D-ring */}
          <path
            d="M8 3H28C29.5 3 30 4.5 29 6L24 12H12L7 6C6 4.5 6.5 3 8 3Z"
            stroke="url(#metalGrad)"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          {/* Swivel post */}
          <rect x="15.5" y="12" width="5" height="5" rx="1.5" fill="url(#metalGrad)" />
          {/* Lobster clasp */}
          <path
            d="M18 17C14 17 12.5 22 13 27C13.5 31.5 15.5 35 18 35C20.5 35 22.5 31.5 23 27C23.5 22.5 22 19 19 18"
            stroke="url(#metalGrad)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path d="M13 23L16 21" stroke="#d4d4d8" strokeWidth="1.8" strokeLinecap="round" />
        </svg>

        {/* Clear PVC Sleeve + Laminated UMak Student ID Card */}
        <div className="rounded-[20px] border border-zinc-300/60 bg-gradient-to-b from-white/45 via-white/15 to-white/30 p-2.5 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.45)] backdrop-blur-xs dark:border-zinc-500/30 dark:from-white/15 dark:via-white/5 dark:to-white/10">
          {/* Clear PVC Top Punch-Slot Header */}
          <div className="mb-2 flex items-center justify-center pt-0.5">
            <div className="h-2 w-12 rounded-full border border-zinc-400/60 bg-zinc-900/10 shadow-inner dark:border-zinc-400/35 dark:bg-black/40" />
          </div>

          {/* Interactive 3D Flip Container */}
          <div
            className="perspective-1200 w-[274px] sm:w-[292px]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleCardClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setFlipped((prev) => !prev);
              }
            }}
            aria-label="University of Makati student ID pass. Drag to swing or click to flip."
          >
            <motion.div
              className="preserve-3d relative h-[402px] w-full"
              style={{
                rotateX: smoothTiltX,
                rotateY: smoothTiltY,
              }}
              animate={{
                rotateY: flipped ? 180 : 0,
              }}
              transition={{
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* FRONT FACE: Realistic University of Makati Student ID */}
              <div className="backface-hidden absolute inset-0 flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-300/80 bg-[#f6f7fa] text-zinc-900 shadow-inner">
                {/* Subtle Security Micro-Grid Pattern */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage:
                      'radial-gradient(#1b365d 1px, transparent 1px)',
                    backgroundSize: '10px 10px',
                  }}
                />

                {/* Top UMak Royal Navy & Gold Header */}
                <div className="relative bg-[#13294b] px-4 py-3 text-white">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      {/* Minimalist UMak-inspired Crest */}
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#e0b84c]/70 bg-[#1b3a6b]">
                        <span className="font-display text-[10px] font-bold tracking-wider text-[#f3cf68]">
                          UMak
                        </span>
                      </div>
                      <div>
                        <div className="font-display text-[11px] font-bold tracking-wide text-white">
                          UNIVERSITY OF MAKATI
                        </div>
                        <div className="text-[9px] tracking-wider text-blue-100/75">
                          J.P. Rizal Ext., West Rembo
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Gold Accent Rule */}
                  <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-[#c7992c] via-[#f5d57a] to-[#c7992c]" />
                </div>

                {/* ID Body: Photo + Student Identity */}
                <div className="relative flex flex-1 flex-col items-center px-4 pt-4 pb-3 text-center">
                  <div className="font-mono-num text-[10px] font-medium tracking-[0.18em] text-[#13294b]/75">
                    STUDENT IDENTIFICATION
                  </div>

                  {/* Official Portrait Frame */}
                  <div className="mt-2.5 h-[142px] w-[124px] overflow-hidden rounded-lg border-2 border-[#13294b]/20 bg-white shadow-xs">
                    <img
                      src={PROFILE.portrait}
                      alt="Vily Jhon M. Amen UMak Student Photo"
                      referrerPolicy="no-referrer"
                      draggable={false}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>

                  {/* Student Details */}
                  <div className="mt-3 w-full">
                    <h4 className="font-display text-lg font-bold tracking-tight text-[#0f172a]">
                      VILY JHON M. AMEN
                    </h4>
                    <p className="mt-0.5 text-[11px] font-semibold tracking-wide text-[#1b3a6b]">
                      Student &amp; Aspiring Web Developer
                    </p>
                  </div>

                  {/* ID Number & Validation Strip */}
                  <div className="mt-3 grid w-full grid-cols-2 divide-x divide-zinc-200 rounded-md border border-zinc-200 bg-white/90 py-1.5 text-left">
                    <div className="px-2.5">
                      <div className="text-[8px] font-semibold tracking-wider text-zinc-400">
                        STUDENT NO.
                      </div>
                      <div className="font-mono-num text-[11px] font-semibold text-zinc-900">
                        A12654117
                      </div>
                    </div>
                    <div className="px-2.5">
                      <div className="text-[8px] font-semibold tracking-wider text-zinc-400">
                        CAMPUS
                      </div>
                      <div className="text-[11px] font-semibold text-zinc-900">
                        Makati, PH
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Barcode Strip */}
                <div className="relative flex items-center justify-between border-t border-zinc-200 bg-white px-4 py-2">
                  {/* Crisp CSS Barcode */}
                  <div className="flex h-5 items-stretch gap-[1.5px]" aria-hidden="true">
                    {[2, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 2, 3, 1, 1, 2].map((w, i) => (
                      <span
                        key={i}
                        className="bg-zinc-900"
                        style={{ width: `${w}px` }}
                      />
                    ))}
                  </div>
                  <span className="font-mono-num text-[9px] font-medium text-zinc-500">
                    SY 2025–2026
                  </span>
                </div>

                {/* Dynamic Pointer-Tracked Laminated Glare Overlay */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 transition-opacity duration-200"
                  style={{
                    opacity: glare.active ? 0.55 : 0.14,
                    background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.08) 42%, transparent 72%)`,
                  }}
                />
              </div>

              {/* BACK FACE: Official UMak Card Back */}
              <div className="backface-hidden rotate-y-180 absolute inset-0 flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-700 bg-[#0d111a] text-zinc-100 shadow-inner">
                {/* Magnetic Stripe */}
                <div className="mt-4 h-8 w-full bg-zinc-950 ring-1 ring-zinc-800/80" />

                <div className="flex flex-1 flex-col justify-between px-5 py-4">
                  <div className="flex items-center justify-between text-[10px] text-zinc-400">
                    <span className="font-display font-semibold tracking-wide text-white">
                      UNIVERSITY OF MAKATI
                    </span>
                    <span className="font-mono-num">A12654117</span>
                  </div>

                  <div className="space-y-3 text-left text-xs">
                    <div>
                      <div className="text-[9px] font-semibold tracking-wider text-zinc-500">
                        HOLDER
                      </div>
                      <div className="mt-0.5 font-medium text-zinc-100">
                        {PROFILE.fullName}
                      </div>
                    </div>

                    <div>
                      <div className="text-[9px] font-semibold tracking-wider text-zinc-500">
                        FOCUS &amp; STACK
                      </div>
                      <div className="mt-0.5 text-zinc-300">
                        HTML5, CSS3, JavaScript, Responsive Web Utilities
                      </div>
                    </div>

                    <div>
                      <div className="text-[9px] font-semibold tracking-wider text-zinc-500">
                        CONTACT
                      </div>
                      <div className="font-mono-num mt-0.5 text-zinc-200">
                        {PROFILE.email}
                      </div>
                    </div>
                  </div>

                  {/* Signature Strip */}
                  <div>
                    <div className="rounded bg-zinc-200/90 px-2.5 py-1.5 text-zinc-900">
                      <div className="font-display text-xs font-semibold italic tracking-wide">
                        V. J. Amen
                      </div>
                    </div>
                    <p className="mt-1.5 text-[9px] leading-snug text-zinc-500">
                      This digital student pass is part of Vily Jhon M. Amen&apos;s portfolio.
                      Click to return to the front side.
                    </p>
                  </div>
                </div>

                {/* Subtle Back Glare */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 transition-opacity duration-200"
                  style={{
                    opacity: glare.active ? 0.35 : 0.08,
                    background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.45) 0%, transparent 60%)`,
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Interactive Affordance Hint */}
      <div className="mt-5 flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
        <span>Drag pass to swing</span>
        <span aria-hidden="true">·</span>
        <button
          type="button"
          onClick={() => setFlipped((prev) => !prev)}
          className="inline-flex items-center gap-1.5 font-medium text-zinc-800 underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-zinc-950 dark:text-zinc-200 dark:decoration-zinc-700 dark:hover:text-white"
        >
          <RotateCw className="h-3 w-3" />
          <span>{flipped ? 'Show Front' : 'Flip Pass'}</span>
        </button>
      </div>
    </div>
  );
}
