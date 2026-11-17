import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PROFILE } from '../data/portfolio';

interface NavbarProps {
  onOpenContact: () => void;
}

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Stack', href: '#stack' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onOpenContact }: NavbarProps) {
  const [activeId, setActiveId] = useState<string>('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const sections = ['home', 'work', 'stack', 'capabilities', 'journey', 'contact']
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const onScroll = () => {
      const scrollPos = window.scrollY + 140;
      let current = 'home';
      for (const sec of sections) {
        if (sec.offsetTop <= scrollPos) {
          current = sec.id;
        }
      }
      setActiveId(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-[#f8f8fa]/85 backdrop-blur-md dark:border-zinc-800/80 dark:bg-[#050505]/85">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-6">
        {/* Zone 1: Single text element Brand Wordmark */}
        <a
          href="#home"
          className="font-display shrink-0 whitespace-nowrap text-lg font-semibold tracking-tight text-zinc-950 transition-opacity hover:opacity-80 dark:text-zinc-50"
        >
          {PROFILE.brand}
        </a>

        {/* Zone 2: 5 clean single-line text nav links */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          {NAV_LINKS.map((link) => {
            const targetId = link.href.slice(1);
            const isActive = activeId === targetId;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative whitespace-nowrap shrink-0 py-1 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-zinc-950 dark:text-white'
                    : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100'
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-[1.5px] bg-zinc-950 dark:bg-zinc-100"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary CTA button + mobile menu trigger */}
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={onOpenContact}
            className="hidden whitespace-nowrap shrink-0 rounded-lg bg-zinc-950 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 md:inline-flex dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white dark:focus-visible:outline-white"
          >
            Say Hi
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 text-zinc-800 transition-colors hover:bg-zinc-100 md:hidden dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-zinc-200 bg-[#f8f8fa] px-6 py-4 md:hidden dark:border-zinc-800 dark:bg-[#050505]">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-200/60 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenContact();
              }}
              className="mt-2 w-full rounded-lg bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white dark:bg-zinc-100 dark:text-zinc-950"
            >
              Say Hi
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
