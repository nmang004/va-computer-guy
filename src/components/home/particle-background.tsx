'use client';

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  direction: 'up' | 'diagonal-up' | 'float';
}

export function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const generateParticles = () => {
      const particleCount = window.innerWidth < 768 ? 20 : 40;
      const newParticles: Particle[] = [];

      for (let i = 0; i < particleCount; i++) {
        const directions: Particle['direction'][] = ['up', 'diagonal-up', 'float'];
        newParticles.push({
          id: i,
          size: Math.random() * 4 + 3, // 3-7px for better visibility
          x: Math.random() * 100, // 0-100%
          y: Math.random() * 100, // 0-100% spread throughout hero
          duration: Math.random() * 20 + 25, // 25-45s much slower
          delay: Math.random() * 3, // 0-3s delay
          direction: directions[Math.floor(Math.random() * directions.length)]
        });
      }

      setParticles(newParticles);
    };

    generateParticles();

    const handleResize = () => {
      generateParticles();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="particle-background">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`particle particle--${particle.direction}`}
          style={{
            '--particle-size': `${particle.size}px`,
            '--particle-x': `${particle.x}%`,
            '--particle-y': `${particle.y}%`,
            '--particle-duration': `${particle.duration}s`,
            '--particle-delay': `${particle.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}