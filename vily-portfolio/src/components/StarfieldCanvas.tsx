import { useEffect, useRef } from 'react';

interface StarfieldCanvasProps {
  theme: 'dark' | 'light';
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  twinklePhase: number;
}

export default function StarfieldCanvas({ theme }: StarfieldCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const count = Math.min(72, Math.floor((width * height) / 24000));
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.35 + 0.4,
      vx: (Math.random() - 0.5) * 0.14,
      vy: (Math.random() - 0.5) * 0.14,
      alpha: Math.random() * 0.45 + 0.15,
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    let rafId = 0;

    const renderFrame = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const baseColor = theme === 'dark' ? '244, 244, 245' : '24, 24, 27';

      for (const p of particles) {
        if (!prefersReduced) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }
        const pulse = prefersReduced
          ? p.alpha
          : p.alpha * (0.65 + 0.35 * Math.sin(time * 0.0012 + p.twinklePhase));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${baseColor}, ${pulse.toFixed(3)})`;
        ctx.fill();
      }

      if (!prefersReduced) {
        rafId = requestAnimationFrame(renderFrame);
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      if (prefersReduced) {
        renderFrame(0);
      }
    };

    window.addEventListener('resize', handleResize);
    rafId = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-60 dark:opacity-75"
    />
  );
}
