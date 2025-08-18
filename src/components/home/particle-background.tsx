'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import {
  ParticleSystemConfig,
  PerformanceMetrics,
  ParticlePreset,
  createConfig,
  applyMobileAdjustments,
  applyReducedMotion,
  ParticlePool,
  PerformanceMonitor,
  MouseTracker,
  createParticle,
  updateParticle,
  isParticleOutOfBounds,
  shouldSpawnParticle,
  selectParticleType,
  applyParallaxToParticle,
  debounce
} from '@/lib/particle-system';

interface ParticleBackgroundProps {
  preset?: ParticlePreset;
  customConfig?: Partial<ParticleSystemConfig>;
  onPerformanceChange?: (metrics: PerformanceMetrics) => void;
  className?: string;
}

export function ParticleBackground({
  preset = 'balanced',
  customConfig,
  onPerformanceChange,
  className = ''
}: ParticleBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [config, setConfig] = useState<ParticleSystemConfig>(() => {
    let baseConfig = createConfig(preset);
    
    if (customConfig) {
      baseConfig = { ...baseConfig, ...customConfig };
    }
    
    return baseConfig;
  });
  
  const particlePoolRef = useRef<ParticlePool | null>(null);
  const performanceMonitorRef = useRef<PerformanceMonitor | null>(null);
  const mouseTrackerRef = useRef<MouseTracker | null>(null);
  const activeParticlesRef = useRef<Map<string, NonNullable<ReturnType<ParticlePool['acquire']>>>>(new Map());
  const animationFrameRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);

  // Initialize systems
  const initializeSystems = useCallback(() => {
    if (!containerRef.current) return;

    // Apply device-specific adjustments
    let adjustedConfig = { ...config };
    
    if (PerformanceMonitor.isMobileDevice()) {
      adjustedConfig = applyMobileAdjustments(adjustedConfig);
    }
    
    if (PerformanceMonitor.hasReducedMotionPreference()) {
      adjustedConfig = applyReducedMotion(adjustedConfig);
      setIsVisible(adjustedConfig.accessibility.staticFallback);
      return;
    }

    setConfig(adjustedConfig);

    // Initialize particle pool
    particlePoolRef.current = new ParticlePool(containerRef.current, adjustedConfig.maxParticles * 2);
    
    // Initialize performance monitor
    performanceMonitorRef.current = new PerformanceMonitor(adjustedConfig);
    performanceMonitorRef.current.onPerformanceChange((metrics) => {
      onPerformanceChange?.(metrics);
    });
    performanceMonitorRef.current.start();
    
    // Initialize mouse tracker
    if (adjustedConfig.enableParallax || adjustedConfig.enableClickEffects) {
      mouseTrackerRef.current = new MouseTracker(containerRef.current);
    }

    // Update container bounds
    const rect = containerRef.current.getBoundingClientRect();
    adjustedConfig.bounds = {
      width: rect.width,
      height: rect.height,
      padding: adjustedConfig.bounds.padding
    };

    // Start animation loop inline to avoid dependency issues
    const animate = (timestamp: number) => {
      if (!particlePoolRef.current || !performanceMonitorRef.current || !containerRef.current) {
        return;
      }

      const deltaTime = timestamp - lastUpdateTimeRef.current;
      lastUpdateTimeRef.current = timestamp;

      // Update performance metrics
      performanceMonitorRef.current.updateActiveParticles(activeParticlesRef.current.size);

      // Get mouse state for parallax/interactions
      const mouseState = mouseTrackerRef.current?.getState();

      // Spawn new particles
      if (shouldSpawnParticle(
        activeParticlesRef.current.size,
        adjustedConfig.maxParticles,
        adjustedConfig.spawnRate,
        deltaTime
      )) {
        const particleTypeConfig = selectParticleType(adjustedConfig.particleTypes);
        const poolItem = particlePoolRef.current.acquire(particleTypeConfig.type);
        
        if (poolItem) {
          const particleData = createParticle(particleTypeConfig.type, particleTypeConfig, adjustedConfig.bounds);
          Object.assign(poolItem.particle, particleData, {
            id: poolItem.particle.id,
            isActive: true,
            element: poolItem.element
          });
          activeParticlesRef.current.set(poolItem.particle.id, poolItem);
        }
      }

      // Update existing particles
      const particlesToRemove: string[] = [];
      activeParticlesRef.current.forEach((poolItem, particleId) => {
        if (!poolItem) return;
        
        const particle = poolItem.particle;
        
        // Calculate additional forces
        const additionalForces = [];
        
        // Parallax effect
        if (adjustedConfig.enableParallax && mouseState && mouseTrackerRef.current) {
          const parallaxOffset = mouseTrackerRef.current.getParallaxOffset(
            particle.position,
            adjustedConfig.parallaxStrength
          );
          const parallaxForce = applyParallaxToParticle(particle, parallaxOffset, 0.1);
          additionalForces.push(parallaxForce);
        }

        // Click effects
        if (adjustedConfig.enableClickEffects && mouseState && mouseTrackerRef.current) {
          const clickEffect = mouseTrackerRef.current.getClickEffect(particle.position);
          if (clickEffect) {
            additionalForces.push(clickEffect.force);
          }
        }

        // Update particle physics
        updateParticle(particle, deltaTime, adjustedConfig.bounds, adjustedConfig.gravity, additionalForces);
        
        // Update visual representation
        particlePoolRef.current?.updateElement(poolItem);
        
        // Check if particle should be removed
        if (isParticleOutOfBounds(particle, adjustedConfig.bounds)) {
          particlesToRemove.push(particleId);
        }
      });

      // Remove expired particles
      particlesToRemove.forEach(particleId => {
        const poolItem = activeParticlesRef.current.get(particleId);
        if (poolItem && particlePoolRef.current) {
          particlePoolRef.current.release(poolItem);
          activeParticlesRef.current.delete(particleId);
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    lastUpdateTimeRef.current = performance.now();
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [config, onPerformanceChange]);


  // Handle resize
  const handleResize = useCallback(
    debounce(() => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      setConfig(prev => ({
        ...prev,
        bounds: {
          ...prev.bounds,
          width: rect.width,
          height: rect.height
        }
      }));
    }, 250),
    []
  );

  // Cleanup function
  const cleanup = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    particlePoolRef.current?.cleanup();
    performanceMonitorRef.current?.cleanup();
    mouseTrackerRef.current?.cleanup();
    
    activeParticlesRef.current.clear();
  }, []);

  // Mount effect
  useEffect(() => {
    setIsMounted(true);
    
    const timer = setTimeout(() => {
      initializeSystems();
    }, 100); // Small delay to ensure DOM is ready

    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      cleanup();
    };
  }, []); // Run only on mount

  // Configuration change effect
  useEffect(() => {
    if (!isMounted) return;
    
    cleanup();
    setTimeout(() => {
      initializeSystems();
    }, 50);
  }, [preset, customConfig, isMounted]);

  if (!isMounted || !isVisible) {
    return (
      <div className={`particle-background particle-background--static ${className}`}>
        <div className="particle-background__fallback" />
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`particle-background ${className}`}
      aria-hidden="true"
    />
  );
}