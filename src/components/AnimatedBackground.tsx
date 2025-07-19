import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
}

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

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
        createParticle();
      }
    };

    const createParticle = () => {
      const edge = Math.floor(Math.random() * 4);
      let x, y;

      // Spawn from edges
      switch (edge) {
        case 0: // top
          x = Math.random() * canvas.width;
          y = -10;
          break;
        case 1: // right
          x = canvas.width + 10;
          y = Math.random() * canvas.height;
          break;
        case 2: // bottom
          x = Math.random() * canvas.width;
          y = canvas.height + 10;
          break;
        default: // left
          x = -10;
          y = Math.random() * canvas.height;
      }

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const dx = centerX - x;
      const dy = centerY - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = 0.1 + Math.random() * 0.2; // Much slower

      particlesRef.current.push({
        x,
        y,
        vx: (dx / distance) * speed,
        vy: (dy / distance) * speed,
        size: 0.5 + Math.random() * 1, // Much smaller
        opacity: 0.6 + Math.random() * 0.4,
        life: 1.0,
      });
    };

    const updateParticles = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Calculate distance to center
        const distanceToCenter = Math.sqrt(
          (particle.x - centerX) ** 2 + (particle.y - centerY) ** 2
        );

        // Fade as approaching center
        particle.life = Math.max(0, distanceToCenter / Math.min(centerX, centerY));
        
        // Remove if too close to center or out of bounds
        return particle.life > 0.05;
      });

      // Maintain particle count
      while (particlesRef.current.length < Math.min(30, Math.floor((canvas.width * canvas.height) / 20000))) {
        createParticle();
      }
    };

    const drawParticles = () => {
      particlesRef.current.forEach((particle) => {
        ctx.save();
        ctx.globalAlpha = particle.opacity * particle.life;
        
        // Simple white dot particles
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * particle.life})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updateParticles();
      drawParticles();
      animationRef.current = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

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