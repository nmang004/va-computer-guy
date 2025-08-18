import { ParticleSystemConfig, ParticleTypeConfig, ParticlePresets } from './types';

export const DEFAULT_PARTICLE_TYPES: ParticleTypeConfig[] = [
  {
    type: 'dot',
    minSize: 2,
    maxSize: 5,
    minOpacity: 0.3,
    maxOpacity: 0.8,
    minSpeed: 0.5,
    maxSpeed: 2,
    lifespan: 15,
    rotationSpeed: 0,
    colors: ['rgba(255, 255, 255, 0.8)', 'rgba(97, 206, 112, 0.6)', 'rgba(1, 112, 185, 0.4)'],
    blurAmount: 0,
    glowIntensity: 2,
    weight: 0.4
  },
  {
    type: 'orb',
    minSize: 8,
    maxSize: 15,
    minOpacity: 0.2,
    maxOpacity: 0.6,
    minSpeed: 0.3,
    maxSpeed: 1.5,
    lifespan: 20,
    rotationSpeed: 0,
    colors: ['rgba(1, 112, 185, 0.4)', 'rgba(64, 84, 178, 0.3)', 'rgba(97, 206, 112, 0.3)'],
    blurAmount: 1,
    glowIntensity: 4,
    weight: 0.3
  },
  {
    type: 'geometric',
    minSize: 3,
    maxSize: 8,
    minOpacity: 0.4,
    maxOpacity: 0.7,
    minSpeed: 0.8,
    maxSpeed: 2.5,
    lifespan: 12,
    rotationSpeed: 1,
    colors: ['rgba(1, 112, 185, 0.6)', 'rgba(64, 84, 178, 0.5)'],
    blurAmount: 0,
    glowIntensity: 1,
    weight: 0.2
  },
  {
    type: 'streak',
    minSize: 1,
    maxSize: 3,
    minOpacity: 0.5,
    maxOpacity: 0.9,
    minSpeed: 2,
    maxSpeed: 4,
    lifespan: 8,
    rotationSpeed: 0,
    colors: ['rgba(255, 255, 255, 0.7)', 'rgba(97, 206, 112, 0.5)'],
    blurAmount: 2,
    glowIntensity: 3,
    weight: 0.1
  }
];

export const DEFAULT_CONFIG: ParticleSystemConfig = {
  maxParticles: 50,
  spawnRate: 2,
  particleTypes: DEFAULT_PARTICLE_TYPES,
  enableParallax: true,
  parallaxStrength: 0.3,
  enableClickEffects: true,
  enableTrails: false,
  trailLength: 5,
  gravity: { x: 0, y: 0.1 },
  bounds: {
    width: 1200,
    height: 800,
    padding: 50
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
    maxParticles: 20,
    spawnRate: 1,
    enableParallax: false,
    enableClickEffects: false,
    enableTrails: false,
    particleTypes: [
      {
        ...DEFAULT_PARTICLE_TYPES[0],
        weight: 1.0,
        minOpacity: 0.2,
        maxOpacity: 0.5
      }
    ]
  },
  balanced: {
    maxParticles: 40,
    spawnRate: 2,
    enableParallax: true,
    enableClickEffects: true,
    enableTrails: false,
    parallaxStrength: 0.2,
    particleTypes: DEFAULT_PARTICLE_TYPES.slice(0, 2)
  },
  rich: {
    maxParticles: 80,
    spawnRate: 3,
    enableParallax: true,
    enableClickEffects: true,
    enableTrails: true,
    parallaxStrength: 0.4,
    trailLength: 8,
    particleTypes: DEFAULT_PARTICLE_TYPES
  }
};

export const MOBILE_ADJUSTMENTS = {
  maxParticles: 0.5,
  spawnRate: 0.7,
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