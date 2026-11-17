import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FileText, Printer, X } from 'lucide-react';
import { JOURNEY, PROFILE, PROJECTS, TECH_STACK, type JourneyItem } from '../data/portfolio';
import UmakIdBadge from './UmakIdBadge';

interface AboutJourneySectionProps {
  onOpenContact: () => void;
}

const STAGES: Array<'All' | JourneyItem['stage']> = [
  'All',
  'Education',
  'Self-Directed',
  'Milestones',
];

export default function AboutJourneySection({ onOpenContact }: AboutJourneySectionProps) {
  const [stageFilter, setStageFilter] = useState<'All' | JourneyItem['stage']>('All');
  const [resumeOpen, setResumeOpen] = useState(false);

  const filteredJourney =
    stageFilter === 'All'
      ? JOURNEY
      : JOURNEY.filter((item) => item.stage === stageFilter);

  return (
    <section
      id="journey"
      className="relative z-10 border-t border-zinc-200/80 py-20 sm:py-24 dark:border-zinc-800/80"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* About + Interactive Flip ID Badge Split */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left Column: About Narrative */}
          <div className="lg:col-span-7">
            <p className="font-mono-num text-xs font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
              04. About & Journey
            </p>
            <h2 className="font-display mt-2 text-balance text-3xl font-semibold tracking-tight text-zinc-950 sm:text-[2.75rem] sm:leading-[1.1] dark:text-zinc-50">
              Crafting practical tools with{' '}
              <span className="font-normal text-zinc-500 dark:text-zinc-400">clarity &amp; purpose</span>
            </h2>

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
              <p>
                I&apos;m <strong className="font-semibold text-zinc-900 dark:text-zinc-100">{PROFILE.fullName}</strong>,
                a student who got hooked on technology and programming. What keeps me going is the
                idea that a few thoughtful lines of code can solve a real problem for a real person.
              </p>
              <p>
                Right now I&apos;m strengthening my foundations in web development—how pages are
                structured, styled, and made interactive—growing from following tutorials to shipping
                complete utilities that people actually use.
              </p>
              <p>
                I enjoy understanding how systems work under the hood, and I&apos;m always glad to
                ask questions and iterate until everything clicks.
              </p>
            </div>

            {/* Clean Editorial Quote (no thick left border) */}
            <div className="mt-7 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-[#0b0b0e]">
              <p className="font-display text-lg font-medium text-zinc-800 dark:text-zinc-200">
                &ldquo;{PROFILE.quote}&rdquo;
              </p>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setResumeOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 whitespace-nowrap shrink-0 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
              >
                <FileText className="h-4 w-4" />
                <span>Printable Resume / CV</span>
              </button>

              <button
                type="button"
                onClick={onOpenContact}
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-800 transition-colors hover:border-zinc-950 whitespace-nowrap shrink-0 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-400"
              >
                <span>{PROFILE.email}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Realistic Hanging UMak Lanyard & Interactive PVC ID Pass */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center lg:col-span-5"
          >
            <UmakIdBadge />
          </motion.div>
        </div>

        {/* Education & Learning Timeline */}
        <div className="mt-20">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h3 className="font-display text-2xl font-semibold text-zinc-950 sm:text-3xl dark:text-zinc-50">
                Education &amp; <span className="font-normal text-zinc-500 dark:text-zinc-400">learning milestones</span>
              </h3>
            </div>

            <div
              className="inline-flex flex-wrap gap-1 rounded-lg border border-zinc-200 bg-zinc-100 p-1 dark:border-zinc-800 dark:bg-zinc-900"
              role="tablist"
              aria-label="Filter timeline stages"
            >
              {STAGES.map((stage) => {
                const isActive = stageFilter === stage;
                return (
                  <button
                    key={stage}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setStageFilter(stage)}
                    className={`relative rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'text-zinc-950 dark:text-white'
                        : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="journey-filter-pill"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        className="absolute inset-0 rounded-md bg-white shadow-xs dark:bg-zinc-800"
                      />
                    )}
                    <span className="relative z-10">{stage}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {filteredJourney.map((entry, idx) => (
              <motion.div
                key={entry.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-[#0b0b0e] dark:hover:border-zinc-700"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                    <span>{entry.stage}</span>
                    <span className="font-mono-num">{entry.period}</span>
                  </div>
                  <h4 className="font-display mt-2.5 text-xl font-semibold text-zinc-950 dark:text-zinc-50">
                    {entry.title}
                  </h4>
                  <p className="mt-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    {entry.place}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {entry.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Printable Resume / CV Modal */}
      <AnimatePresence>
        {resumeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs"
            onClick={() => setResumeOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl sm:p-8 dark:border-zinc-800 dark:bg-[#0b0b0e]"
            >
              {/* Modal Controls */}
              <div className="mb-6 flex items-center justify-between gap-4 border-b border-zinc-200 pb-4 dark:border-zinc-800">
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  Interactive Resume Preview
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-950 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    <span>Print / Save PDF</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setResumeOpen(false)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900"
                    aria-label="Close resume modal"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Printable Sheet */}
              <div id="printable-resume" className="space-y-6">
                <div className="border-b border-zinc-200 pb-5 dark:border-zinc-800">
                  <h3
                    id="resume-modal-title"
                    className="font-display text-3xl font-semibold text-zinc-950 dark:text-zinc-50"
                  >
                    {PROFILE.fullName}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    Student & Aspiring Web Developer · {PROFILE.university}
                  </p>
                  <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                    {PROFILE.location} · {PROFILE.email} · Instagram {PROFILE.handle}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold tracking-wide text-zinc-500 dark:text-zinc-400">
                    Profile Summary
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {PROFILE.lead} Currently focused on building strong fundamentals in web
                    development, clean UI architecture, and practical browser-based applications.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold tracking-wide text-zinc-500 dark:text-zinc-400">
                    Featured Projects
                  </h4>
                  <div className="mt-3 space-y-3">
                    {PROJECTS.map((proj) => (
                      <div key={proj.id}>
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <span className="text-sm font-semibold text-zinc-950 dark:text-zinc-100">
                            {proj.title}
                          </span>
                          <span className="font-mono-num text-xs text-zinc-500 dark:text-zinc-400">
                            {proj.tools.join(' · ')}
                          </span>
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                          {proj.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="text-xs font-semibold tracking-wide text-zinc-500 dark:text-zinc-400">
                      Technical & Soft Skills
                    </h4>
                    <ul className="mt-2 space-y-1 text-xs text-zinc-700 dark:text-zinc-300">
                      {TECH_STACK.map((t) => (
                        <li key={t.id}>
                          {t.name} — {t.role}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold tracking-wide text-zinc-500 dark:text-zinc-400">
                      Education
                    </h4>
                    <p className="mt-2 text-sm font-semibold text-zinc-950 dark:text-zinc-100">
                      {PROFILE.university}
                    </p>
                    <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                      Current Student · Self-directed practice in frontend web development &
                      interactive utilities.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
