import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';
import { PROJECTS, TECH_STACK, type ProjectItem, type TechItem } from '../data/portfolio';

interface TechStackSectionProps {
  onOpenProject: (project: ProjectItem) => void;
}

const CATEGORIES: Array<'All' | TechItem['category']> = [
  'All',
  'Web Foundations',
  'Browser & APIs',
  'Practice & Workflow',
];

const MARQUEE_ITEMS = [
  'HTML5',
  'CSS3',
  'JavaScript',
  'localStorage',
  'Tesseract.js OCR',
  'Google Maps Embed',
  'Responsive Layouts',
  'Form Validation',
  'Netlify Hosting',
  'Problem Solving',
];

export default function TechStackSection({ onOpenProject }: TechStackSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'All' | TechItem['category']>('All');
  const [inspectedTech, setInspectedTech] = useState<TechItem | null>(null);

  const filteredTech =
    activeCategory === 'All'
      ? TECH_STACK
      : TECH_STACK.filter((item) => item.category === activeCategory);

  const getLinkedProjects = (tech: TechItem) =>
    PROJECTS.filter((project) => tech.projectIds.includes(project.id));

  return (
    <section
      id="stack"
      className="relative z-10 border-t border-zinc-200/80 py-20 sm:py-24 dark:border-zinc-800/80"
    >
      {/* Subtle Marquee Ribbon Divider */}
      <div className="mb-16 overflow-hidden border-y border-zinc-200/80 bg-white/70 py-3.5 dark:border-zinc-800/80 dark:bg-zinc-950/60">
        <div className="animate-marquee flex items-center gap-8 text-xs font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={item + i} className="inline-flex items-center gap-8 whitespace-nowrap">
              <span>{item}</span>
              <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">
                /
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono-num text-xs font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
              02. Tech Stack & Ecosystem
            </p>
            <h2 className="font-display mt-2 text-balance text-3xl font-semibold tracking-tight text-zinc-950 sm:text-[2.75rem] sm:leading-[1.1] dark:text-zinc-50">
              Tools & <span className="font-normal text-zinc-500 dark:text-zinc-400">technologies</span> I build with
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Honest tools I have learned and applied across real web projects—no inflated skill bars.
              Click any card to inspect where it was used.
            </p>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div
          className="mt-8 inline-flex flex-wrap gap-1 rounded-lg border border-zinc-200 bg-zinc-100 p-1 dark:border-zinc-800 dark:bg-zinc-900"
          role="tablist"
          aria-label="Filter technologies by category"
        >
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(category)}
                className={`relative rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-zinc-950 dark:text-white'
                    : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="tech-filter-pill"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    className="absolute inset-0 rounded-md bg-white shadow-xs dark:bg-zinc-800"
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            );
          })}
        </div>

        {/* Tech Cards Grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredTech.map((tech, idx) => {
            const linked = getLinkedProjects(tech);
            return (
              <motion.button
                key={tech.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                type="button"
                onClick={() => setInspectedTech(tech)}
                className="group flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 text-left transition-colors duration-200 hover:-translate-y-0.5 hover:border-zinc-400 focus-visible:outline-2 focus-visible:outline-zinc-950 dark:border-zinc-800 dark:bg-[#0b0b0e] dark:hover:border-zinc-600 dark:focus-visible:outline-white"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                    <span>{tech.category}</span>
                    <span className="font-medium text-zinc-700 transition-colors group-hover:text-zinc-950 dark:text-zinc-300 dark:group-hover:text-white">
                      Inspect
                    </span>
                  </div>

                  <h3 className="font-display mt-3 text-xl font-semibold text-zinc-950 sm:text-2xl dark:text-zinc-50">
                    {tech.name}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    {tech.role}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {tech.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-zinc-200/80 pt-4 text-xs text-zinc-500 dark:border-zinc-800/80 dark:text-zinc-400">
                  <span className="truncate">
                    {linked.map((p) => p.title).join(' · ')}
                  </span>
                  <span className="font-mono-num shrink-0 pl-2 font-medium text-zinc-700 dark:text-zinc-300">
                    {linked.length} {linked.length === 1 ? 'project' : 'projects'}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Technology Inspector Modal */}
      <AnimatePresence>
        {inspectedTech && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs"
            onClick={() => setInspectedTech(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="tech-inspector-title"
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl sm:p-7 dark:border-zinc-800 dark:bg-[#0b0b0e]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {inspectedTech.category} · {inspectedTech.role}
                  </p>
                  <h3
                    id="tech-inspector-title"
                    className="font-display mt-1.5 text-2xl font-semibold text-zinc-950 sm:text-3xl dark:text-zinc-50"
                  >
                    {inspectedTech.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setInspectedTech(null)}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
                  aria-label="Close technology inspector"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                {inspectedTech.description}
              </p>

              <div className="mt-6">
                <h4 className="text-xs font-semibold tracking-wide text-zinc-500 dark:text-zinc-400">
                  Verified Builds Using {inspectedTech.name}
                </h4>

                <div className="mt-3 divide-y divide-zinc-200 rounded-xl border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
                  {getLinkedProjects(inspectedTech).map((proj) => (
                    <div
                      key={proj.id}
                      className="flex items-center justify-between gap-4 p-3.5"
                    >
                      <div>
                        <div className="text-sm font-semibold text-zinc-950 dark:text-zinc-100">
                          {proj.title}
                        </div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                          {proj.category}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setInspectedTech(null);
                          onOpenProject(proj);
                        }}
                        className="inline-flex items-center gap-1 rounded-md border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-800 transition-colors hover:border-zinc-950 whitespace-nowrap shrink-0 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-400"
                      >
                        <span>Open Case</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
