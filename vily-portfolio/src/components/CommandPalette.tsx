import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUp, Command, Moon, Search, Sun, X } from 'lucide-react';
import { PROJECTS, type ProjectItem } from '../data/portfolio';

interface CommandPaletteProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onSelectProject: (project: ProjectItem) => void;
  onOpenContact: () => void;
}

const SECTION_COMMANDS = [
  { id: 'home', label: 'Hero & Portrait', hint: 'Section 00' },
  { id: 'work', label: 'Featured Case Studies', hint: 'Section 01' },
  { id: 'stack', label: 'Tech Stack & Tools', hint: 'Section 02' },
  { id: 'capabilities', label: 'Capabilities & Approach', hint: 'Section 03' },
  { id: 'journey', label: 'About, ID Pass & Timeline', hint: 'Section 04' },
  { id: 'contact', label: 'Collaborate & Contact', hint: 'Section 05' },
];

export default function CommandPalette({
  theme,
  onToggleTheme,
  onSelectProject,
  onOpenContact,
}: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 520);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const normalized = query.trim().toLowerCase();
  const matchingSections = SECTION_COMMANDS.filter((s) =>
    s.label.toLowerCase().includes(normalized)
  );
  const matchingProjects = PROJECTS.filter(
    (p) =>
      p.title.toLowerCase().includes(normalized) ||
      p.category.toLowerCase().includes(normalized)
  );

  const jumpToSection = (id: string) => {
    setOpen(false);
    setQuery('');
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Floating Bottom Utility Controls (Desktop/Tablet subtle corners, compact on mobile) */}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30 flex items-center justify-between px-4 sm:px-6">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="pointer-events-auto hidden items-center gap-2 rounded-lg border border-zinc-200 bg-white/90 px-3 py-2 text-xs font-medium text-zinc-700 shadow-sm backdrop-blur-md transition-colors hover:border-zinc-400 hover:text-zinc-950 sm:inline-flex dark:border-zinc-800 dark:bg-[#0b0b0e]/90 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:text-white"
          aria-label="Open quick jump menu (Ctrl+K)"
        >
          <Command className="h-3.5 w-3.5" />
          <span>Quick Jump</span>
          <span className="font-mono-num text-[11px] text-zinc-400">K</span>
        </button>

        <div className="pointer-events-auto ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-zinc-200 bg-white/90 px-3 text-xs font-medium text-zinc-700 shadow-sm backdrop-blur-md transition-colors hover:border-zinc-400 hover:text-zinc-950 dark:border-zinc-800 dark:bg-[#0b0b0e]/90 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:text-white"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>

          {showTop && (
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-white/90 text-zinc-700 shadow-sm backdrop-blur-md transition-colors hover:border-zinc-400 hover:text-zinc-950 dark:border-zinc-800 dark:bg-[#0b0b0e]/90 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:text-white"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Quick Jump Command Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 px-4 pt-24 backdrop-blur-xs"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Quick navigation palette"
          >
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-[#0b0b0e]"
            >
              <div className="flex items-center gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
                <Search className="h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Jump to section or project..."
                  className="w-full bg-transparent text-sm text-zinc-950 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
                />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md p-1 text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
                  aria-label="Close quick jump"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto p-2">
                {matchingSections.length > 0 && (
                  <div className="mb-2">
                    <div className="px-3 py-1.5 text-[11px] font-medium text-zinc-400">
                      Sections
                    </div>
                    {matchingSections.map((sec) => (
                      <button
                        key={sec.id}
                        type="button"
                        onClick={() => jumpToSection(sec.id)}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-zinc-800 transition-colors hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
                      >
                        <span>{sec.label}</span>
                        <span className="font-mono-num text-xs text-zinc-400">{sec.hint}</span>
                      </button>
                    ))}
                  </div>
                )}

                {matchingProjects.length > 0 && (
                  <div>
                    <div className="px-3 py-1.5 text-[11px] font-medium text-zinc-400">
                      Projects
                    </div>
                    {matchingProjects.map((proj) => (
                      <button
                        key={proj.id}
                        type="button"
                        onClick={() => {
                          setOpen(false);
                          setQuery('');
                          onSelectProject(proj);
                        }}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-zinc-800 transition-colors hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
                      >
                        <span>{proj.title}</span>
                        <span className="text-xs text-zinc-400">{proj.category}</span>
                      </button>
                    ))}
                  </div>
                )}

                <div className="mt-2 border-t border-zinc-200 pt-2 dark:border-zinc-800">
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      onToggleTheme();
                    }}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
                  >
                    <span>Toggle Light / Dark Theme</span>
                    <span className="text-xs text-zinc-400">
                      Current: {theme === 'dark' ? 'Dark' : 'Light'}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      onOpenContact();
                    }}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
                  >
                    <span>Open Direct Inquiry Form</span>
                    <span className="text-xs text-zinc-400">Contact</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
