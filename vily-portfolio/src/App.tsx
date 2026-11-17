import { useCallback, useEffect, useState } from 'react';
import Preloader from './components/Preloader';
import StarfieldCanvas from './components/StarfieldCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectsSection from './components/ProjectsSection';
import TechStackSection from './components/TechStackSection';
import CapabilitiesSection from './components/CapabilitiesSection';
import AboutJourneySection from './components/AboutJourneySection';
import ContactSection from './components/ContactSection';
import CommandPalette from './components/CommandPalette';
import type { ProjectItem } from './data/portfolio';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('vj-portfolio-theme');
      return saved === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  const [preloaderDone, setPreloaderDone] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [prefilledTopic, setPrefilledTopic] = useState<string | undefined>(undefined);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('vj-portfolio-theme', theme);
    } catch {
      // Ignore storage errors in restricted environments
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const handleOpenContact = useCallback(() => {
    setPrefilledTopic(undefined);
    setInquiryOpen(true);
  }, []);

  const handleInquireProject = useCallback((projectTitle: string) => {
    setPrefilledTopic(projectTitle);
    setInquiryOpen(true);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#f8f8fa] text-zinc-950 transition-colors duration-300 dark:bg-[#050505] dark:text-zinc-50">
      {!preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}

      <StarfieldCanvas theme={theme} />

      <Navbar onOpenContact={handleOpenContact} />

      <main id="main">
        <Hero onOpenContact={handleOpenContact} />

        <ProjectsSection
          selectedProject={selectedProject}
          onSelectProject={setSelectedProject}
          onInquireProject={handleInquireProject}
        />

        <TechStackSection onOpenProject={setSelectedProject} />

        <CapabilitiesSection
          onOpenProject={setSelectedProject}
          onInquire={handleOpenContact}
        />

        <AboutJourneySection onOpenContact={handleOpenContact} />

        <ContactSection
          inquiryOpen={inquiryOpen}
          onSetInquiryOpen={setInquiryOpen}
          prefilledTopic={prefilledTopic}
        />
      </main>

      <CommandPalette
        theme={theme}
        onToggleTheme={toggleTheme}
        onSelectProject={setSelectedProject}
        onOpenContact={handleOpenContact}
      />
    </div>
  );
}
