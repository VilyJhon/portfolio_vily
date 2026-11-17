import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Minus, Plus } from 'lucide-react';
import { CAPABILITIES, PROJECTS, type ProjectItem } from '../data/portfolio';

interface CapabilitiesSectionProps {
  onOpenProject: (project: ProjectItem) => void;
  onInquire: () => void;
}

export default function CapabilitiesSection({
  onOpenProject,
  onInquire,
}: CapabilitiesSectionProps) {
  const [expandedIndex, setExpandedIndex] = useState<string>('01');

  return (
    <section
      id="capabilities"
      className="relative z-10 border-t border-zinc-200/80 py-20 sm:py-24 dark:border-zinc-800/80"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono-num text-xs font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
              03. Capabilities & Practice
            </p>
            <h2 className="font-display mt-2 text-balance text-3xl font-semibold tracking-tight text-zinc-950 sm:text-[2.75rem] sm:leading-[1.1] dark:text-zinc-50">
              How I bring <span className="font-normal text-zinc-500 dark:text-zinc-400">ideas</span> to life
            </h2>
          </div>

          <button
            type="button"
            onClick={onInquire}
            className="inline-flex items-center gap-2 self-start rounded-lg border border-zinc-300 bg-white px-4 py-2 text-xs font-semibold text-zinc-900 transition-colors hover:border-zinc-950 whitespace-nowrap shrink-0 md:self-auto dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-400"
          >
            <span>Discuss a Project</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Numbered Editorial Accordion List */}
        <div className="mt-10 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
          {CAPABILITIES.map((cap, idx) => {
            const isOpen = expandedIndex === cap.index;
            const proofProject = PROJECTS.find((p) => p.id === cap.proofProjectId);

            return (
              <motion.div
                key={cap.index}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="py-2"
              >
                <button
                  type="button"
                  onClick={() => setExpandedIndex(isOpen ? '' : cap.index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:opacity-85"
                >
                  <div className="flex items-baseline gap-5 sm:gap-8">
                    <span className="font-mono-num text-xs text-zinc-400 dark:text-zinc-500">
                      {cap.index}
                    </span>
                    <span className="font-display text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl dark:text-zinc-50">
                      {cap.title}
                    </span>
                  </div>

                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition-colors dark:border-zinc-800 dark:text-zinc-300">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="grid grid-cols-1 gap-6 pb-7 pl-0 sm:pl-12 lg:grid-cols-12"
                    >
                      <div className="lg:col-span-7">
                        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                          {cap.summary}
                        </p>
                        <p className="mt-4 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                          Core Focus: {cap.deliverables.join(' · ')}
                        </p>
                      </div>

                      {proofProject && (
                        <div className="lg:col-span-5">
                          <div className="flex items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-[#0b0b0e]">
                            <div>
                              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                Applied in
                              </div>
                              <div className="mt-0.5 text-sm font-semibold text-zinc-950 dark:text-zinc-100">
                                {proofProject.title}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => onOpenProject(proofProject)}
                              className="inline-flex items-center gap-1 rounded-lg bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-zinc-800 whitespace-nowrap shrink-0 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
                            >
                              <span>View Proof</span>
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
