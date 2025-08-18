'use client';

import { ParticleBackground } from './particle-background';

interface AnimatedHeroProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedHero({ children, className = '' }: AnimatedHeroProps) {
  return (
    <section className={`animated-hero ${className}`}>
      {/* Animated gradient background */}
      <div className="animated-hero__gradient" />
      
      {/* Particle background */}
      <ParticleBackground preset="rich" />
      
      {/* Content overlay for better text contrast */}
      <div className="animated-hero__overlay" />
      
      {/* Main content */}
      <div className="animated-hero__content">
        {children}
      </div>
    </section>
  );
}