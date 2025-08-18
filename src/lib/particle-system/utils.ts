import { Vector2D, ParticleState, ParticleTypeConfig, ParticleType } from './types';

export function generateUniqueId(): string {
  return `particle_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function randomColor(colors: string[]): string {
  return colors[Math.floor(Math.random() * colors.length)];
}

export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function distance(a: Vector2D, b: Vector2D): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

export function normalize(vector: Vector2D): Vector2D {
  const magnitude = Math.sqrt(vector.x ** 2 + vector.y ** 2);
  if (magnitude === 0) return { x: 0, y: 0 };
  return { x: vector.x / magnitude, y: vector.y / magnitude };
}

export function vectorMultiply(vector: Vector2D, scalar: number): Vector2D {
  return { x: vector.x * scalar, y: vector.y * scalar };
}

export function vectorAdd(a: Vector2D, b: Vector2D): Vector2D {
  return { x: a.x + b.x, y: a.y + b.y };
}

export function vectorSubtract(a: Vector2D, b: Vector2D): Vector2D {
  return { x: a.x - b.x, y: a.y - b.y };
}

export function createParticle(
  type: ParticleType,
  config: ParticleTypeConfig,
  bounds: { width: number; height: number; padding: number }
): Omit<ParticleState, 'id' | 'element' | 'isActive'> {
  const spawnEdge = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
  let position: Vector2D;
  let velocity: Vector2D;

  // Spawn particles at screen edges with inward velocity
  switch (spawnEdge) {
    case 0: // top
      position = { x: randomBetween(0, bounds.width), y: -bounds.padding };
      velocity = { x: randomBetween(-0.5, 0.5), y: randomBetween(config.minSpeed, config.maxSpeed) };
      break;
    case 1: // right
      position = { x: bounds.width + bounds.padding, y: randomBetween(0, bounds.height) };
      velocity = { x: -randomBetween(config.minSpeed, config.maxSpeed), y: randomBetween(-0.5, 0.5) };
      break;
    case 2: // bottom
      position = { x: randomBetween(0, bounds.width), y: bounds.height + bounds.padding };
      velocity = { x: randomBetween(-0.5, 0.5), y: -randomBetween(config.minSpeed, config.maxSpeed) };
      break;
    case 3: // left
    default:
      position = { x: -bounds.padding, y: randomBetween(0, bounds.height) };
      velocity = { x: randomBetween(config.minSpeed, config.maxSpeed), y: randomBetween(-0.5, 0.5) };
      break;
  }

  return {
    type,
    position,
    velocity,
    size: randomBetween(config.minSize, config.maxSize),
    opacity: randomBetween(config.minOpacity, config.maxOpacity),
    rotation: randomBetween(0, 360),
    rotationSpeed: randomBetween(-config.rotationSpeed, config.rotationSpeed),
    lifespan: config.lifespan + randomBetween(-2, 2),
    age: 0,
    depth: randomBetween(1, 10)
  };
}

export function updateParticle(
  particle: ParticleState,
  deltaTime: number,
  bounds: { width: number; height: number; padding: number },
  gravity: Vector2D = { x: 0, y: 0.1 },
  additionalForces: Vector2D[] = []
): void {
  if (!particle.isActive) return;

  // Age the particle
  particle.age += deltaTime / 1000;

  // Apply gravity
  particle.velocity.x += gravity.x * deltaTime / 1000;
  particle.velocity.y += gravity.y * deltaTime / 1000;

  // Apply additional forces (parallax, click effects, etc.)
  additionalForces.forEach(force => {
    particle.velocity.x += force.x * deltaTime / 1000;
    particle.velocity.y += force.y * deltaTime / 1000;
  });

  // Update position
  particle.position.x += particle.velocity.x * deltaTime / 16.67; // Normalize to 60fps
  particle.position.y += particle.velocity.y * deltaTime / 16.67;

  // Update rotation
  particle.rotation += particle.rotationSpeed * deltaTime / 16.67;

  // Update opacity based on age and lifespan
  const lifeProgress = particle.age / particle.lifespan;
  if (lifeProgress < 0.1) {
    // Fade in
    particle.opacity = lerp(0, 1, lifeProgress / 0.1);
  } else if (lifeProgress > 0.9) {
    // Fade out
    particle.opacity = lerp(1, 0, (lifeProgress - 0.9) / 0.1);
  }

  // Apply some natural movement variation
  const time = Date.now() / 1000;
  const wave = Math.sin(time + particle.position.x * 0.01) * 0.1;
  particle.velocity.y += wave;
}

export function isParticleOutOfBounds(
  particle: ParticleState,
  bounds: { width: number; height: number; padding: number }
): boolean {
  const buffer = bounds.padding * 2;
  return (
    particle.position.x < -buffer ||
    particle.position.x > bounds.width + buffer ||
    particle.position.y < -buffer ||
    particle.position.y > bounds.height + buffer ||
    particle.age >= particle.lifespan
  );
}

export function shouldSpawnParticle(
  currentCount: number,
  maxParticles: number,
  spawnRate: number,
  deltaTime: number
): boolean {
  if (currentCount >= maxParticles) return false;
  
  const spawnProbability = (spawnRate * deltaTime) / 1000;
  return Math.random() < spawnProbability;
}

export function selectParticleType(types: ParticleTypeConfig[]): ParticleTypeConfig {
  const totalWeight = types.reduce((sum, type) => sum + type.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const type of types) {
    random -= type.weight;
    if (random <= 0) {
      return type;
    }
  }
  
  return types[0]; // Fallback
}

export function applyParallaxToParticle(
  particle: ParticleState,
  parallaxOffset: Vector2D,
  strength: number
): Vector2D {
  // Apply parallax based on particle depth
  const depthFactor = particle.depth / 10; // Normalize depth
  return {
    x: parallaxOffset.x * depthFactor * strength,
    y: parallaxOffset.y * depthFactor * strength
  };
}

export function createTrailEffect(
  particle: ParticleState,
  trailLength: number
): Vector2D[] {
  const trail: Vector2D[] = [];
  const step = 5; // Distance between trail points
  
  for (let i = 1; i <= trailLength; i++) {
    const trailPos = {
      x: particle.position.x - (particle.velocity.x * i * step) / 60,
      y: particle.position.y - (particle.velocity.y * i * step) / 60
    };
    trail.push(trailPos);
  }
  
  return trail;
}

export function calculateOptimalSpawnRate(
  currentFPS: number,
  targetFPS: number,
  baseSpawnRate: number
): number {
  const fpsRatio = currentFPS / targetFPS;
  
  if (fpsRatio < 0.8) {
    return baseSpawnRate * 0.5;
  } else if (fpsRatio > 1.2) {
    return baseSpawnRate * 1.2;
  }
  
  return baseSpawnRate;
}

export function getColorWithDepth(baseColor: string, depth: number): string {
  // Extract RGB values from the color string
  const match = baseColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!match) return baseColor;
  
  const [, r, g, b, a] = match;
  const alpha = a ? parseFloat(a) : 1;
  
  // Adjust alpha based on depth (farther = more transparent)
  const depthAlpha = alpha * (0.3 + (depth / 10) * 0.7);
  
  return `rgba(${r}, ${g}, ${b}, ${depthAlpha})`;
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}