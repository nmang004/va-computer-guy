import { ParticleSystemConfig, ParticleTypeConfig, ParticlePresets } from './types';

export const DEFAULT_PARTICLE_TYPES: ParticleTypeConfig[] = [
  {
    type: 'dot',
    minSize: 3,
    maxSize: 6,
    minOpacity: 0.5,
    maxOpacity: 0.9,
    minSpeed: 0.2,
    maxSpeed: 0.8,
    lifespan: 18,
    rotationSpeed: 0,
    colors: ['rgba(255, 255, 255, 0.8)', 'rgba(97, 206, 112, 0.6)', 'rgba(1, 112, 185, 0.4)'],
    blurAmount: 0,
    glowIntensity: 2,
    weight: 0.5
  },
  {
    type: 'orb',
    minSize: 8,
    maxSize: 16,
    minOpacity: 0.4,
    maxOpacity: 0.8,
    minSpeed: 0.1,
    maxSpeed: 0.6,
    lifespan: 22,
    rotationSpeed: 0,
    colors: ['rgba(1, 112, 185, 0.4)', 'rgba(64, 84, 178, 0.3)', 'rgba(97, 206, 112, 0.3)'],
    blurAmount: 1,
    glowIntensity: 4,
    weight: 0.35
  },
  {
    type: 'geometric',
    minSize: 3,
    maxSize: 8,
    minOpacity: 0.4,
    maxOpacity: 0.7,
    minSpeed: 0.3,
    maxSpeed: 1,
    lifespan: 16,
    rotationSpeed: 0.5,
    colors: ['rgba(1, 112, 185, 0.6)', 'rgba(64, 84, 178, 0.5)'],
    blurAmount: 0,
    glowIntensity: 1,
    weight: 0.1
  },
  {
    type: 'streak',
    minSize: 1,
    maxSize: 3,
    minOpacity: 0.5,
    maxOpacity: 0.9,
    minSpeed: 0.5,
    maxSpeed: 1.2,
    lifespan: 14,
    rotationSpeed: 0,
    colors: ['rgba(255, 255, 255, 0.7)', 'rgba(97, 206, 112, 0.5)'],
    blurAmount: 2,
    glowIntensity: 3,
    weight: 0.05
  }
];

export const DEFAULT_CONFIG: ParticleSystemConfig = {
  maxParticles: 60,
  spawnRate: 8,
  particleTypes: DEFAULT_PARTICLE_TYPES,
  enableParallax: true,
  parallaxStrength: 0.3,
  enableClickEffects: true,
  enableTrails: false,
  trailLength: 5,
  gravity: { x: 0, y: 0.02 },
  bounds: {
    width: 1200,
    height: 800,
    padding: 20
  },
  performance: {
    targetFPS: 60,
    adaptiveQuality: true,
    maxAdaptations: 3
  },
  accessibility: {
    reducedMotion: false,
    staticFallback: true,
    respectUserPreferences: true
  }
};

export const PARTICLE_PRESETS: ParticlePresets = {
  minimal: {
    maxParticles: 30,
    spawnRate: 4,
    enableParallax: false,
    enableClickEffects: false,
    enableTrails: false,
    particleTypes: [
      {
        ...DEFAULT_PARTICLE_TYPES[0],
        weight: 1.0,
        minOpacity: 0.4,
        maxOpacity: 0.7
      }
    ]
  },
  balanced: {
    maxParticles: 50,
    spawnRate: 6,
    enableParallax: true,
    enableClickEffects: true,
    enableTrails: false,
    parallaxStrength: 0.2,
    particleTypes: DEFAULT_PARTICLE_TYPES.slice(0, 2)
  },
  rich: {
    maxParticles: 80,
    spawnRate: 10,
    enableParallax: true,
    enableClickEffects: true,
    enableTrails: true,
    parallaxStrength: 0.4,
    trailLength: 8,
    particleTypes: DEFAULT_PARTICLE_TYPES
  }
};

export const MOBILE_ADJUSTMENTS = {
  maxParticles: 0.7,
  spawnRate: 0.8,
  parallaxStrength: 0.5,
  performance: {
    targetFPS: 30,
    adaptiveQuality: true,
    maxAdaptations: 5
  }
};

export const REDUCED_MOTION_CONFIG: Partial<ParticleSystemConfig> = {
  maxParticles: 0,
  spawnRate: 0,
  enableParallax: false,
  enableClickEffects: false,
  enableTrails: false,
  accessibility: {
    reducedMotion: true,
    staticFallback: true,
    respectUserPreferences: true
  }
};

export function createConfig(preset: keyof ParticlePresets | 'custom' = 'balanced'): ParticleSystemConfig {
  const baseConfig = { ...DEFAULT_CONFIG };
  
  if (preset === 'custom') {
    return baseConfig;
  }
  
  const presetConfig = PARTICLE_PRESETS[preset];
  
  return {
    ...baseConfig,
    ...presetConfig,
    particleTypes: presetConfig.particleTypes || baseConfig.particleTypes,
    performance: {
      ...baseConfig.performance,
      ...presetConfig.performance
    },
    accessibility: {
      ...baseConfig.accessibility,
      ...presetConfig.accessibility
    },
    bounds: {
      ...baseConfig.bounds,
      ...presetConfig.bounds
    }
  };
}

export function applyMobileAdjustments(config: ParticleSystemConfig): ParticleSystemConfig {
  return {
    ...config,
    maxParticles: Math.floor(config.maxParticles * MOBILE_ADJUSTMENTS.maxParticles),
    spawnRate: config.spawnRate * MOBILE_ADJUSTMENTS.spawnRate,
    parallaxStrength: config.parallaxStrength * MOBILE_ADJUSTMENTS.parallaxStrength,
    performance: {
      ...config.performance,
      ...MOBILE_ADJUSTMENTS.performance
    }
  };
}

export function applyReducedMotion(config: ParticleSystemConfig): ParticleSystemConfig {
  return {
    ...config,
    ...REDUCED_MOTION_CONFIG,
    accessibility: {
      ...config.accessibility,
      ...REDUCED_MOTION_CONFIG.accessibility
    }
  };
}