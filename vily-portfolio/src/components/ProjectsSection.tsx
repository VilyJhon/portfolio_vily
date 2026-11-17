import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, LayoutGrid, List, X } from 'lucide-react';
import { PROJECTS, type ProjectItem } from '../data/portfolio';

interface ProjectsSectionProps {
  selectedProject: ProjectItem | null;
  onSelectProject: (project: ProjectItem | null) => void;
  onInquireProject: (projectTitle: string) => void;
}

export default function ProjectsSection({
  selectedProject,
  onSelectProject,
  onInquireProject,
}: ProjectsSectionProps) {
  const [viewMode, setViewMode] = useState<'bento' | 'list'>('bento');
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [modalTab, setModalTab] = useState<'overview' | 'objectives' | 'outcome'>('overview');

  useEffect(() => {
    setModalTab('overview');
  }, [selectedProject]);

  useEffect(() => {
    if (!selectedProject) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onSelectProject(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedProject, onSelectProject]);

  const handleGridKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev + 1) % PROJECTS.length);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
    } else if (e.key === 'Enter' && !selectedProject) {
      const target = e.target as HTMLElement;
      if (target.closest('[data-project-card]')) return;
      onSelectProject(PROJECTS[focusedIndex]);
    }
  };

  return (
    <section
      id="work"
      className="relative z-10 border-t border-zinc-200/80 py-20 sm:py-24 dark:border-zinc-800/80"
      onKeyDown={handleGridKeyDown}
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono-num text-xs font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
              01. Selected Works
            </p>
            <h2 className="font-display mt-2 text-balance text-3xl font-semibold tracking-tight text-zinc-950 sm:text-[2.75rem] sm:leading-[1.1] dark:text-zinc-50">
              Featured <span className="font-normal text-zinc-500 dark:text-zinc-400">case studies</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Three live web projects designed and built independently. Click any card to inspect
              its objectives, tools, and live deployment.
            </p>
          </div>

          {/* Segmented View Switcher */}
          <div
            className="inline-flex shrink-0 self-start rounded-lg border border-zinc-200 bg-zinc-100 p-1 md:self-auto dark:border-zinc-800 dark:bg-zinc-900"
            role="group"
            aria-label="Project layout view"
          >
            <button
              type="button"
              onClick={() => setViewMode('bento')}
              className={`relative inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                viewMode === 'bento'
                  ? 'text-zinc-950 dark:text-white'
                  : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              {viewMode === 'bento' && (
                <motion.span
                  layoutId="project-view-pill"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="absolute inset-0 rounded-md bg-white shadow-xs dark:bg-zinc-800"
                />
              )}
              <LayoutGrid className="relative z-10 h-3.5 w-3.5" />
              <span className="relative z-10">Bento Grid</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`relative inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                viewMode === 'list'
                  ? 'text-zinc-950 dark:text-white'
                  : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              {viewMode === 'list' && (
                <motion.span
                  layoutId="project-view-pill"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="absolute inset-0 rounded-md bg-white shadow-xs dark:bg-zinc-800"
                />
              )}
              <List className="relative z-10 h-3.5 w-3.5" />
              <span className="relative z-10">Compact List</span>
            </button>
          </div>
        </div>

        {/* Projects Layout */}
        {viewMode === 'bento' ? (
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {PROJECTS.map((project, idx) => (
              <motion.article
                key={project.id}
                data-project-card
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`group flex flex-col justify-between overflow-hidden rounded-2xl border bg-white transition-all duration-200 dark:bg-[#0b0b0e] ${
                  project.featuredSpan ? 'lg:col-span-2' : ''
                } ${
                  focusedIndex === idx
                    ? 'border-zinc-400 dark:border-zinc-600'
                    : 'border-zinc-200 hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600'
                }`}
              >
                <div
                  className={`grid h-full grid-cols-1 ${
                    project.featuredSpan ? 'lg:grid-cols-12' : ''
                  }`}
                >
                  {/* Visual Preview */}
                  <button
                    type="button"
                    onClick={() => {
                      setFocusedIndex(idx);
                      onSelectProject(project);
                    }}
                    className={`relative block overflow-hidden bg-zinc-100 text-left focus-visible:outline-2 focus-visible:outline-zinc-950 dark:bg-zinc-950 dark:focus-visible:outline-white ${
                      project.featuredSpan ? 'lg:col-span-7' : ''
                    }`}
                  >
                    <div
                      className={`w-full overflow-hidden ${
                        project.featuredSpan ? 'aspect-[16/10] lg:h-full' : 'aspect-[16/10]'
                      }`}
                    >
                      <img
                        src={project.image}
                        alt={project.alt}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  </button>

                  {/* Card Details */}
                  <div
                    className={`flex flex-col justify-between p-6 sm:p-7 ${
                      project.featuredSpan ? 'lg:col-span-5' : ''
                    }`}
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                        <span className="font-mono-num">{project.index}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-num">{project.year}</span>
                      </div>

                      <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl dark:text-zinc-50">
                        {project.title}
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {project.summary}
                      </p>

                      <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
                        {project.tools.join(' · ')}
                      </p>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-200/80 pt-4 dark:border-zinc-800/80">
                      <button
                        type="button"
                        onClick={() => onSelectProject(project)}
                        className="text-sm font-semibold text-zinc-950 underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-zinc-950 dark:text-zinc-100 dark:decoration-zinc-700 dark:hover:decoration-zinc-100"
                      >
                        Inspect Case Study
                      </button>

                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                      >
                        <span>Visit Live Site</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="mt-10 divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-[#0b0b0e]">
            {PROJECTS.map((project, idx) => (
              <div
                key={project.id}
                className="flex flex-col justify-between gap-4 p-6 transition-colors hover:bg-zinc-50 sm:flex-row sm:items-center dark:hover:bg-zinc-900/40"
              >
                <div className="flex items-start gap-4 sm:items-center">
                  <span className="font-mono-num text-xs text-zinc-400 dark:text-zinc-500">
                    {project.index}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                      <span>{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-num">{project.year}</span>
                    </div>
                    <h3 className="font-display mt-1 text-xl font-semibold text-zinc-950 dark:text-zinc-50">
                      {project.title}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
                      {project.summary}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setFocusedIndex(idx);
                      onSelectProject(project);
                    }}
                    className="rounded-lg border border-zinc-300 px-3.5 py-2 text-xs font-semibold text-zinc-900 transition-colors hover:border-zinc-950 whitespace-nowrap shrink-0 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-zinc-400"
                  >
                    Details
                  </button>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg bg-zinc-950 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-zinc-800 whitespace-nowrap shrink-0 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
                  >
                    <span>Live</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs sm:p-6"
            onClick={() => onSelectProject(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
          >
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl sm:p-8 dark:border-zinc-800 dark:bg-[#0b0b0e]"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="font-mono-num">{selectedProject.index}</span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedProject.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedProject.status}</span>
                  </div>
                  <h3
                    id="case-study-title"
                    className="font-display mt-2 text-2xl font-semibold text-zinc-950 sm:text-4xl dark:text-zinc-50"
                  >
                    {selectedProject.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectProject(null)}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
                  aria-label="Close case study modal"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Showcase Image */}
              <div className="mt-6 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.alt}
                  referrerPolicy="no-referrer"
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>

              {/* Modal Section Tabs */}
              <div
                className="mt-6 flex flex-wrap gap-1 rounded-lg border border-zinc-200 bg-zinc-100 p-1 dark:border-zinc-800 dark:bg-zinc-900"
                role="tablist"
              >
                {[
                  { id: 'overview', label: '01 · Overview' },
                  { id: 'objectives', label: '02 · Challenge & Solution' },
                  { id: 'outcome', label: '03 · Role & Outcome' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={modalTab === tab.id}
                    onClick={() => setModalTab(tab.id as typeof modalTab)}
                    className={`flex-1 rounded-md px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap ${
                      modalTab === tab.id
                        ? 'bg-white text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-white'
                        : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Modal Tab Content */}
              <div className="mt-5 min-h-[110px]">
                {modalTab === 'overview' && (
                  <div className="space-y-4">
                    <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {selectedProject.summary}
                    </p>
                    <div>
                      <h4 className="text-xs font-semibold tracking-wide text-zinc-500 dark:text-zinc-400">
                        Technologies Used
                      </h4>
                      <p className="mt-1.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {selectedProject.tools.join(' · ')}
                      </p>
                    </div>
                  </div>
                )}

                {modalTab === 'objectives' && (
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <h4 className="text-xs font-semibold tracking-wide text-zinc-500 dark:text-zinc-400">
                        The Challenge
                      </h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                        {selectedProject.objectives}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold tracking-wide text-zinc-500 dark:text-zinc-400">
                        The Solution
                      </h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                        {selectedProject.solution}
                      </p>
                    </div>
                  </div>
                )}

                {modalTab === 'outcome' && (
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <h4 className="text-xs font-semibold tracking-wide text-zinc-500 dark:text-zinc-400">
                        My Contribution
                      </h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                        {selectedProject.contribution}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold tracking-wide text-zinc-500 dark:text-zinc-400">
                        Live Outcome
                      </h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                        {selectedProject.outcome}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Actions */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 pt-5 dark:border-zinc-800">
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 whitespace-nowrap shrink-0 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
                >
                  <span>Open Live Site</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>

                <button
                  type="button"
                  onClick={() => {
                    const title = selectedProject.title;
                    onSelectProject(null);
                    onInquireProject(title);
                  }}
                  className="rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-800 transition-colors hover:border-zinc-950 whitespace-nowrap shrink-0 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-400"
                >
                  Inquire About Similar Project
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
