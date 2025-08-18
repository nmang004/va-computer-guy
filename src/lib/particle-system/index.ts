export * from './types';
export * from './config';
export * from './particle-pool';
export * from './performance-monitor';
export * from './mouse-tracker';
export * from './utils';

export { ParticlePool } from './particle-pool';
export { PerformanceMonitor } from './performance-monitor';
export { MouseTracker } from './mouse-tracker';
export { 
  createConfig, 
  applyMobileAdjustments, 
  applyReducedMotion,
  DEFAULT_CONFIG,
  PARTICLE_PRESETS 
} from './config';