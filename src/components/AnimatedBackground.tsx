import React, { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  fadeInProgress: number;
  depth: number;
}

// Particle pool to avoid GC pressure — reuse dead particles instead of allocating new ones
const MAX_PARTICLES = 100;
const SPAWN_INTERVAL = 80; // ms between spawns (was 50)
const MOUSE_THROTTLE = 50; // ms between mouse updates

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const lastSpawnTimeRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isVisibleRef = useRef(true);
  const isInViewRef = useRef(true);
  const lastMouseUpdateRef = useRef<number>(0);

  // Throttled mouse handler — updates ref directly, no React re-renders
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = performance.now();
    if (now - lastMouseUpdateRef.current < MOUSE_THROTTLE) return;
    lastMouseUpdateRef.current = now;

    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    mouseRef.current.x = x;
    mouseRef.current.y = y;

    // Update 3D tilt directly on DOM — avoids React re-render entirely
    if (tiltRef.current) {
      tiltRef.current.style.transform = `rotateX(${y * -5}deg) rotateY(${x * 5}deg)`;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // --- Resize (debounced) ---
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const resizeCanvas = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }, 150);
    };
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // --- Visibility API: pause when tab is hidden ---
    const handleVisibility = () => {
      isVisibleRef.current = !document.hidden;
      if (!document.hidden && !animationRef.current) {
        lastSpawnTimeRef.current = performance.now();
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // --- IntersectionObserver: pause when scrolled out of viewport ---
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !animationRef.current) {
          lastSpawnTimeRef.current = performance.now();
          animationRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0 }
    );
    observer.observe(container);

    // --- Mouse ---
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // --- Particle creation ---
    const createParticle = (isInitial: boolean): Particle => {
      const edge = Math.floor(Math.random() * 4);
      let startX: number, startY: number;

      switch (edge) {
        case 0: startX = Math.random() * canvas.width; startY = -10; break;
        case 1: startX = canvas.width + 10; startY = Math.random() * canvas.height; break;
        case 2: startX = Math.random() * canvas.width; startY = canvas.height + 10; break;
        default: startX = -10; startY = Math.random() * canvas.height;
      }

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const dx = centerX - startX;
      const dy = centerY - startY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = 0.15 + Math.random() * 0.25;
      const depth = 0.2 + Math.random() * 1.5;

      let x: number, y: number;
      if (isInitial) {
        const progress = 0.3 + Math.random() * 0.4;
        x = startX + dx * progress;
        y = startY + dy * progress;
      } else {
        x = startX;
        y = startY;
      }

      return {
        x,
        y,
        vx: (dx / distance) * speed,
        vy: (dy / distance) * speed,
        size: (0.5 + Math.random() * 1) * depth,
        opacity: 0.4 + Math.random() * 0.6,
        life: 1.0,
        fadeInProgress: isInitial ? 0 : 1,
        depth
      };
    };

    // --- Init particles ---
    const particleCount = Math.min(MAX_PARTICLES, Math.floor((canvas.width * canvas.height) / 8000));
    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(createParticle(true));
    }

    // --- Update ---
    const updateParticles = (currentTime: number) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const particles = particlesRef.current;

      // Filter in-place to avoid new array allocation
      let writeIdx = 0;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.fadeInProgress < 1) {
          p.fadeInProgress += 0.02;
        }

        const distToCenter = Math.sqrt(
          (p.x - centerX) ** 2 + (p.y - centerY) ** 2
        );
        p.life = Math.max(0, distToCenter / Math.min(centerX, centerY));

        if (p.life > 0.05) {
          particles[writeIdx++] = p;
        }
      }
      particles.length = writeIdx;

      // Spawn new particle (with cap)
      if (particles.length < MAX_PARTICLES && currentTime - lastSpawnTimeRef.current > SPAWN_INTERVAL) {
        particles.push(createParticle(false));
        lastSpawnTimeRef.current = currentTime;
      }
    };

    // --- Draw (optimized: no save/restore, no shadowBlur per particle) ---
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const parallaxX = mouseRef.current.x * 20;
      const parallaxY = mouseRef.current.y * 20;
      const particles = particlesRef.current;

      // Single composite operation for all particles — no per-particle save/restore
      ctx.globalCompositeOperation = 'lighter';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const offsetX = parallaxX * p.depth;
        const offsetY = parallaxY * p.depth;
        const alpha = p.opacity * p.life * p.fadeInProgress;

        if (alpha < 0.01) continue; // Skip invisible particles

        ctx.globalAlpha = alpha;
        ctx.fillStyle = `rgba(180, 180, 255, 1)`;

        ctx.beginPath();
        ctx.arc(p.x + offsetX, p.y + offsetY, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Soft glow: draw a larger, dimmer circle behind — much cheaper than shadowBlur
        if (p.depth > 0.6) {
          ctx.globalAlpha = alpha * 0.25;
          ctx.beginPath();
          ctx.arc(p.x + offsetX, p.y + offsetY, p.size * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Reset
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    };

    // --- Animation loop ---
    const animate = (currentTime: number) => {
      // Bail out if not visible or not in viewport
      if (!isVisibleRef.current || !isInViewRef.current) {
        animationRef.current = 0;
        return;
      }

      updateParticles(currentTime);
      drawParticles();
      animationRef.current = requestAnimationFrame(animate);
    };

    lastSpawnTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(animate);

    // --- Cleanup ---
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibility);
      observer.disconnect();
      clearTimeout(resizeTimeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = 0;
      }
    };
  }, [handleMouseMove]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden bg-black">
      {/* Deep Space Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black z-0"></div>

      {/* Rotating Circles with 3D Tilt — DOM updated via ref, no React re-renders */}
      <div
        ref={tiltRef}
        className="absolute inset-0 flex items-center justify-center will-change-transform"
        style={{ transition: 'transform 0.15s ease-out' }}
      >
        {/* Big Circle */}
        <div className="big-circle opacity-30 animate-plasma-spin" style={{ filter: 'blur(40px)' }}></div>

        {/* Small Circle */}
        <div className="small-circle opacity-40 animate-plasma-spin" style={{ animationDirection: 'reverse', filter: 'blur(20px)' }}></div>
      </div>

      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
      />
    </div>
  );
};
