import { ParticleState, ParticlePoolItem, ParticleType } from './types';
import { generateUniqueId } from './utils';

export class ParticlePool {
  private pool: Map<ParticleType, ParticlePoolItem[]> = new Map();
  private container: HTMLElement;
  private maxPoolSize: number;

  constructor(container: HTMLElement, maxPoolSize: number = 100) {
    this.container = container;
    this.maxPoolSize = maxPoolSize;
    this.initializePools();
  }

  private initializePools(): void {
    const particleTypes: ParticleType[] = ['dot', 'orb', 'geometric', 'streak'];
    
    particleTypes.forEach(type => {
      this.pool.set(type, []);
    });
  }

  private createParticleElement(type: ParticleType): HTMLElement {
    const element = document.createElement('div');
    element.className = `particle particle--${type}`;
    element.setAttribute('aria-hidden', 'true');
    
    element.style.position = 'absolute';
    element.style.pointerEvents = 'none';
    element.style.borderRadius = type === 'geometric' ? '2px' : '50%';
    element.style.willChange = 'transform, opacity';
    element.style.contain = 'layout style paint';
    
    this.container.appendChild(element);
    return element;
  }

  acquire(type: ParticleType): ParticlePoolItem | null {
    const typePool = this.pool.get(type);
    if (!typePool) return null;

    let poolItem = typePool.find(item => !item.isInUse);
    
    if (!poolItem && typePool.length < this.maxPoolSize / 4) {
      const element = this.createParticleElement(type);
      const particle: ParticleState = {
        id: generateUniqueId(),
        type,
        position: { x: 0, y: 0 },
        velocity: { x: 0, y: 0 },
        size: 5,
        opacity: 1,
        rotation: 0,
        rotationSpeed: 0,
        lifespan: 10,
        age: 0,
        depth: 1,
        isActive: false,
        element
      };

      poolItem = {
        particle,
        element,
        isInUse: false
      };
      
      typePool.push(poolItem);
    }

    if (poolItem) {
      poolItem.isInUse = true;
      poolItem.particle.isActive = true;
      poolItem.particle.id = generateUniqueId();
      poolItem.particle.age = 0;
      
      poolItem.element.style.display = 'block';
      poolItem.element.style.opacity = '1';
      return poolItem;
    }

    return null;
  }

  release(poolItem: ParticlePoolItem): void {
    if (!poolItem.isInUse) return;

    poolItem.isInUse = false;
    poolItem.particle.isActive = false;
    
    poolItem.element.style.display = 'none';
    poolItem.element.style.transform = '';
    poolItem.element.style.opacity = '0';
  }

  updateElement(poolItem: ParticlePoolItem): void {
    const { particle, element } = poolItem;
    if (!particle.isActive || !element) return;

    const { position, size, opacity, rotation, depth } = particle;
    
    element.style.transform = `
      translate3d(${position.x}px, ${position.y}px, 0)
      scale(${size / 10})
      rotate(${rotation}deg)
      translateZ(${depth}px)
    `;
    element.style.opacity = opacity.toString();
    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.zIndex = Math.floor(depth).toString();
  }

  getActiveCount(): number {
    let count = 0;
    this.pool.forEach(typePool => {
      count += typePool.filter(item => item.isInUse).length;
    });
    return count;
  }

  getTotalPoolSize(): number {
    let count = 0;
    this.pool.forEach(typePool => {
      count += typePool.length;
    });
    return count;
  }

  cleanup(): void {
    this.pool.forEach(typePool => {
      typePool.forEach(poolItem => {
        if (poolItem.element && poolItem.element.parentNode) {
          poolItem.element.parentNode.removeChild(poolItem.element);
        }
      });
      typePool.length = 0;
    });
    this.pool.clear();
  }

  optimizePool(): void {
    this.pool.forEach((typePool) => {
      const inactiveItems = typePool.filter(item => !item.isInUse);
      const optimalSize = Math.max(5, Math.min(inactiveItems.length, this.maxPoolSize / 8));
      
      if (inactiveItems.length > optimalSize) {
        const itemsToRemove = inactiveItems.slice(optimalSize);
        itemsToRemove.forEach(item => {
          if (item.element && item.element.parentNode) {
            item.element.parentNode.removeChild(item.element);
          }
          const index = typePool.indexOf(item);
          if (index > -1) {
            typePool.splice(index, 1);
          }
        });
      }
    });
  }

  getPoolStats() {
    const stats = {
      total: 0,
      active: 0,
      byType: {} as Record<ParticleType, { total: number; active: number }>
    };

    this.pool.forEach((typePool, type) => {
      const total = typePool.length;
      const active = typePool.filter(item => item.isInUse).length;
      
      stats.byType[type] = { total, active };
      stats.total += total;
      stats.active += active;
    });

    return stats;
  }
}