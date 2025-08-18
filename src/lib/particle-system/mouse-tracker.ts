import { MouseState, Vector2D } from './types';

export class MouseTracker {
  private mouseState: MouseState;
  private container: HTMLElement;
  private isTracking = false;
  private updateCallbacks: ((state: MouseState) => void)[] = [];
  private lastUpdateTime = 0;
  private throttleInterval = 16; // ~60fps
  private clickEffectDuration = 1000; // ms

  constructor(container: HTMLElement) {
    this.container = container;
    this.mouseState = {
      position: { x: 0, y: 0 },
      isActive: false,
      velocity: { x: 0, y: 0 }
    };
    
    this.bindEvents();
  }

  private bindEvents(): void {
    this.container.addEventListener('mouseenter', this.handleMouseEnter);
    this.container.addEventListener('mouseleave', this.handleMouseLeave);
    this.container.addEventListener('mousemove', this.handleMouseMove);
    this.container.addEventListener('click', this.handleClick);
    
    // Touch events for mobile
    this.container.addEventListener('touchstart', this.handleTouchStart);
    this.container.addEventListener('touchmove', this.handleTouchMove);
    this.container.addEventListener('touchend', this.handleTouchEnd);
  }

  private handleMouseEnter = (): void => {
    this.mouseState.isActive = true;
    this.notifyCallbacks();
  };

  private handleMouseLeave = (): void => {
    this.mouseState.isActive = false;
    this.mouseState.velocity = { x: 0, y: 0 };
    this.notifyCallbacks();
  };

  private handleMouseMove = (event: MouseEvent): void => {
    this.updateMousePosition(event.clientX, event.clientY);
  };

  private handleClick = (event: MouseEvent): void => {
    const rect = this.container.getBoundingClientRect();
    this.mouseState.clickPosition = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
    this.mouseState.clickTime = Date.now();
    this.notifyCallbacks();

    // Clear click effect after duration
    setTimeout(() => {
      if (this.mouseState.clickTime && Date.now() - this.mouseState.clickTime >= this.clickEffectDuration) {
        this.mouseState.clickPosition = undefined;
        this.mouseState.clickTime = undefined;
        this.notifyCallbacks();
      }
    }, this.clickEffectDuration);
  };

  private handleTouchStart = (event: TouchEvent): void => {
    event.preventDefault();
    const touch = event.touches[0];
    if (touch) {
      this.mouseState.isActive = true;
      this.updateMousePosition(touch.clientX, touch.clientY);
    }
  };

  private handleTouchMove = (event: TouchEvent): void => {
    event.preventDefault();
    const touch = event.touches[0];
    if (touch) {
      this.updateMousePosition(touch.clientX, touch.clientY);
    }
  };

  private handleTouchEnd = (): void => {
    this.mouseState.isActive = false;
    this.mouseState.velocity = { x: 0, y: 0 };
    this.notifyCallbacks();
  };

  private updateMousePosition(clientX: number, clientY: number): void {
    const now = performance.now();
    if (now - this.lastUpdateTime < this.throttleInterval) return;

    const rect = this.container.getBoundingClientRect();
    const newPosition = {
      x: clientX - rect.left,
      y: clientY - rect.top
    };

    // Calculate velocity
    const deltaTime = now - this.lastUpdateTime;
    if (deltaTime > 0) {
      this.mouseState.velocity = {
        x: (newPosition.x - this.mouseState.position.x) / deltaTime * 1000,
        y: (newPosition.y - this.mouseState.position.y) / deltaTime * 1000
      };
    }

    this.mouseState.position = newPosition;
    this.lastUpdateTime = now;
    this.notifyCallbacks();
  }

  getState(): MouseState {
    return { ...this.mouseState };
  }

  getParallaxOffset(particlePosition: Vector2D, strength: number = 0.3): Vector2D {
    if (!this.mouseState.isActive) {
      return { x: 0, y: 0 };
    }

    const containerRect = this.container.getBoundingClientRect();
    const centerX = containerRect.width / 2;
    const centerY = containerRect.height / 2;

    // Calculate distance from center as a percentage
    const distanceFromCenterX = (this.mouseState.position.x - centerX) / centerX;
    const distanceFromCenterY = (this.mouseState.position.y - centerY) / centerY;

    // Apply parallax effect - particles move in opposite direction to cursor
    const parallaxX = -distanceFromCenterX * strength * 20;
    const parallaxY = -distanceFromCenterY * strength * 20;

    return { x: parallaxX, y: parallaxY };
  }

  getClickEffect(particlePosition: Vector2D): { force: Vector2D; intensity: number } | null {
    if (!this.mouseState.clickPosition || !this.mouseState.clickTime) {
      return null;
    }

    const timeSinceClick = Date.now() - this.mouseState.clickTime;
    if (timeSinceClick > this.clickEffectDuration) {
      return null;
    }

    const distance = Math.sqrt(
      Math.pow(particlePosition.x - this.mouseState.clickPosition.x, 2) +
      Math.pow(particlePosition.y - this.mouseState.clickPosition.y, 2)
    );

    const maxEffectRadius = 150;
    if (distance > maxEffectRadius) {
      return null;
    }

    // Calculate force direction (away from click)
    const angle = Math.atan2(
      particlePosition.y - this.mouseState.clickPosition.y,
      particlePosition.x - this.mouseState.clickPosition.x
    );

    // Calculate intensity based on distance and time
    const distanceIntensity = Math.max(0, 1 - distance / maxEffectRadius);
    const timeIntensity = Math.max(0, 1 - timeSinceClick / this.clickEffectDuration);
    const intensity = distanceIntensity * timeIntensity;

    const force = {
      x: Math.cos(angle) * intensity * 5,
      y: Math.sin(angle) * intensity * 5
    };

    return { force, intensity };
  }

  getMagneticEffect(particlePosition: Vector2D, strength: number = 0.1): Vector2D {
    if (!this.mouseState.isActive) {
      return { x: 0, y: 0 };
    }

    const distance = Math.sqrt(
      Math.pow(particlePosition.x - this.mouseState.position.x, 2) +
      Math.pow(particlePosition.y - this.mouseState.position.y, 2)
    );

    const maxMagnetRadius = 100;
    if (distance > maxMagnetRadius || distance < 5) {
      return { x: 0, y: 0 };
    }

    // Calculate attraction force towards cursor
    const angle = Math.atan2(
      this.mouseState.position.y - particlePosition.y,
      this.mouseState.position.x - particlePosition.x
    );

    const intensity = Math.max(0, 1 - distance / maxMagnetRadius) * strength;
    
    return {
      x: Math.cos(angle) * intensity,
      y: Math.sin(angle) * intensity
    };
  }

  onUpdate(callback: (state: MouseState) => void): void {
    this.updateCallbacks.push(callback);
  }

  private notifyCallbacks(): void {
    this.updateCallbacks.forEach(callback => callback(this.mouseState));
  }

  cleanup(): void {
    this.container.removeEventListener('mouseenter', this.handleMouseEnter);
    this.container.removeEventListener('mouseleave', this.handleMouseLeave);
    this.container.removeEventListener('mousemove', this.handleMouseMove);
    this.container.removeEventListener('click', this.handleClick);
    this.container.removeEventListener('touchstart', this.handleTouchStart);
    this.container.removeEventListener('touchmove', this.handleTouchMove);
    this.container.removeEventListener('touchend', this.handleTouchEnd);
    
    this.updateCallbacks.length = 0;
  }

  // Utility methods
  static normalizeToViewport(position: Vector2D, containerSize: Vector2D): Vector2D {
    return {
      x: position.x / containerSize.x,
      y: position.y / containerSize.y
    };
  }

  static denormalizeFromViewport(normalizedPosition: Vector2D, containerSize: Vector2D): Vector2D {
    return {
      x: normalizedPosition.x * containerSize.x,
      y: normalizedPosition.y * containerSize.y
    };
  }
}