export interface Vector2D {
  x: number;
  y: number;
}

export interface ParticleState {
  id: string;
  type: ParticleType;
  position: Vector2D;
  velocity: Vector2D;
  size: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  lifespan: number;
  age: number;
  depth: number;
  isActive: boolean;
  element?: HTMLElement;
}

export type ParticleType = 'dot' | 'orb' | 'geometric' | 'streak';

export interface ParticleTypeConfig {
  type: ParticleType;
  minSize: number;
  maxSize: number;
  minOpacity: number;
  maxOpacity: number;
  minSpeed: number;
  maxSpeed: number;
  lifespan: number;
  rotationSpeed: number;
  colors: string[];
  blurAmount: number;
  glowIntensity: number;
  weight: number; // Probability weight for spawning this type
}

export interface ParticleSystemConfig {
  maxParticles: number;
  spawnRate: number; // particles per second
  particleTypes: ParticleTypeConfig[];
  enableParallax: boolean;
  parallaxStrength: number;
  enableClickEffects: boolean;
  enableTrails: boolean;
  trailLength: number;
  gravity: Vector2D;
  bounds: {
    width: number;
    height: number;
    padding: number;
  };
  performance: {
    targetFPS: number;
    adaptiveQuality: boolean;
    maxAdaptations: number;
  };
  accessibility: {
    reducedMotion: boolean;
    staticFallback: boolean;
    respectUserPreferences: boolean;
  };
}

export interface PerformanceMetrics {
  fps: number;
  averageFPS: number;
  frameTime: number;
  activeParticles: number;
  adaptationLevel: number;
  memoryUsage?: number;
}

export interface MouseState {
  position: Vector2D;
  isActive: boolean;
  velocity: Vector2D;
  clickPosition?: Vector2D;
  clickTime?: number;
}

export interface ParticlePoolItem {
  particle: ParticleState;
  element: HTMLElement;
  isInUse: boolean;
}

export type ParticlePreset = 'minimal' | 'balanced' | 'rich' | 'custom';

export interface ParticlePresets {
  minimal: Partial<ParticleSystemConfig>;
  balanced: Partial<ParticleSystemConfig>;
  rich: Partial<ParticleSystemConfig>;
}

export interface ParticleSystemCallbacks {
  onParticleSpawn?: (particle: ParticleState) => void;
  onParticleDestroy?: (particle: ParticleState) => void;
  onPerformanceChange?: (metrics: PerformanceMetrics) => void;
  onConfigChange?: (config: ParticleSystemConfig) => void;
}

export interface AnimationFrame {
  timestamp: number;
  deltaTime: number;
  fps: number;
}