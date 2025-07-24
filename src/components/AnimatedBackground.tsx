import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  fadeInProgress: number; // For fade-in animation
}

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const lastSpawnTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 8000));
      
      for (let i = 0; i < particleCount; i++) {
        createParticle(true); // Pass true for initial particles
      }
    };

    const createParticle = (isInitial = false) => {
      const edge = Math.floor(Math.random() * 4);
      let startX, startY;

      // Define starting positions at edges
      switch (edge) {
        case 0: // top
          startX = Math.random() * canvas.width;
          startY = -10;
          break;
        case 1: // right
          startX = canvas.width + 10;
          startY = Math.random() * canvas.height;
          break;
        case 2: // bottom
          startX = Math.random() * canvas.width;
          startY = canvas.height + 10;
          break;
        default: // left
          startX = -10;
          startY = Math.random() * canvas.height;
      }

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Calculate path from edge to center
      const dx = centerX - startX;
      const dy = centerY - startY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = 0.15 + Math.random() * 0.25; // Increased speed slightly
      
      let x, y;
      if (isInitial) {
        // For initial particles, start them partway through their journey
        const progress = 0.3 + Math.random() * 0.4; // Random between 30% and 70% complete
        x = startX + dx * progress;
        y = startY + dy * progress;
      } else {
        // For new particles, start at the edge
        x = startX;
        y = startY;
      }

      particlesRef.current.push({
        x,
        y,
        vx: (dx / distance) * speed,
        vy: (dy / distance) * speed,
        size: 0.5 + Math.random() * 1,
        opacity: 0.6 + Math.random() * 0.4,
        life: 1.0,
        fadeInProgress: isInitial ? 0 : 1, // Initial particles fade in, new ones are visible
      });
    };

    const updateParticles = (currentTime: number) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Update fade-in progress only if not fully faded in
        if (particle.fadeInProgress < 1) {
          particle.fadeInProgress = Math.min(1, particle.fadeInProgress + 0.02); // Fade in over ~50 frames
        }

        // Calculate distance to center
        const distanceToCenter = Math.sqrt(
          (particle.x - centerX) ** 2 + (particle.y - centerY) ** 2
        );

        // Fade as approaching center
        particle.life = Math.max(0, distanceToCenter / Math.min(centerX, centerY));
        
        // Remove if too close to center or out of bounds
        return particle.life > 0.05;
      });

      // Continuously spawn new particles from borders based on time
      const spawnInterval = 100; // Spawn new particle every 100ms for smoother flow
      if (currentTime - lastSpawnTimeRef.current > spawnInterval) {
        createParticle(false); // Always spawn from borders (not initial)
        lastSpawnTimeRef.current = currentTime;
      }
    };

    const drawParticles = () => {
      particlesRef.current.forEach((particle) => {
        ctx.save();
        
        // Apply fade-in effect combined with other opacity factors
        const finalOpacity = particle.opacity * particle.life * particle.fadeInProgress;
        ctx.globalAlpha = finalOpacity;
        
        // Simple white dot particles
        ctx.fillStyle = `rgba(255, 255, 255, ${finalOpacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      });
    };

    const animate = (currentTime: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updateParticles(currentTime);
      drawParticles();
      animationRef.current = requestAnimationFrame(animate);
    };

    initParticles();
    lastSpawnTimeRef.current = performance.now();
    animate(performance.now());

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* Rotating Circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Big Circle - Clockwise */}
        <div className="big-circle"></div>
        
        {/* Small Circle - Anticlockwise */}
        <div className="small-circle"></div>
      </div>
      
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
}; 