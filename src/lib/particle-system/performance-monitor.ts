import { PerformanceMetrics, ParticleSystemConfig } from './types';

export class PerformanceMonitor {
  private config: ParticleSystemConfig;
  private metrics: PerformanceMetrics;
  private frameHistory: number[] = [];
  private frameHistorySize = 60;
  private lastFrameTime = 0;
  private adaptationCount = 0;
  private callbacks: ((metrics: PerformanceMetrics) => void)[] = [];
  private isRunning = false;
  private animationFrame?: number;

  constructor(config: ParticleSystemConfig) {
    this.config = config;
    this.metrics = {
      fps: 60,
      averageFPS: 60,
      frameTime: 16.67,
      activeParticles: 0,
      adaptationLevel: 0
    };
  }

  start(): void {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.lastFrameTime = performance.now();
    this.scheduleNextFrame();
  }

  stop(): void {
    this.isRunning = false;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = undefined;
    }
  }

  private scheduleNextFrame(): void {
    if (!this.isRunning) return;
    
    this.animationFrame = requestAnimationFrame((timestamp) => {
      this.updateMetrics(timestamp);
      this.checkPerformance();
      this.notifyCallbacks();
      this.scheduleNextFrame();
    });
  }

  private updateMetrics(timestamp: number): void {
    const deltaTime = timestamp - this.lastFrameTime;
    this.lastFrameTime = timestamp;
    
    const currentFPS = deltaTime > 0 ? 1000 / deltaTime : 60;
    this.frameHistory.push(currentFPS);
    
    if (this.frameHistory.length > this.frameHistorySize) {
      this.frameHistory.shift();
    }
    
    this.metrics.fps = currentFPS;
    this.metrics.frameTime = deltaTime;
    this.metrics.averageFPS = this.frameHistory.reduce((sum, fps) => sum + fps, 0) / this.frameHistory.length;
    
    if ('memory' in performance) {
      const perfWithMemory = performance as Performance & { memory?: { usedJSHeapSize: number } };
      this.metrics.memoryUsage = perfWithMemory.memory?.usedJSHeapSize || 0;
    }
  }

  private checkPerformance(): void {
    if (!this.config.performance.adaptiveQuality) return;
    if (this.adaptationCount >= this.config.performance.maxAdaptations) return;
    if (this.frameHistory.length < this.frameHistorySize / 2) return;

    const targetFPS = this.config.performance.targetFPS;
    const tolerance = targetFPS * 0.1;
    
    if (this.metrics.averageFPS < targetFPS - tolerance) {
      this.adaptDown();
    } else if (this.metrics.averageFPS > targetFPS + tolerance && this.metrics.adaptationLevel > 0) {
      this.adaptUp();
    }
  }

  private adaptDown(): void {
    if (this.adaptationCount >= this.config.performance.maxAdaptations) return;
    
    this.adaptationCount++;
    this.metrics.adaptationLevel++;
    
    this.config.maxParticles = Math.max(5, Math.floor(this.config.maxParticles * 0.7));
    this.config.spawnRate = Math.max(0.1, this.config.spawnRate * 0.8);
    
    if (this.metrics.adaptationLevel > 1) {
      this.config.enableParallax = false;
      this.config.enableTrails = false;
    }
    
    if (this.metrics.adaptationLevel > 2) {
      this.config.enableClickEffects = false;
    }
    
    this.resetFrameHistory();
  }

  private adaptUp(): void {
    if (this.metrics.adaptationLevel <= 0) return;
    
    this.metrics.adaptationLevel--;
    
    this.config.maxParticles = Math.floor(this.config.maxParticles * 1.3);
    this.config.spawnRate = this.config.spawnRate * 1.2;
    
    if (this.metrics.adaptationLevel <= 2) {
      this.config.enableClickEffects = true;
    }
    
    if (this.metrics.adaptationLevel <= 1) {
      this.config.enableParallax = true;
      this.config.enableTrails = true;
    }
    
    this.resetFrameHistory();
  }

  private resetFrameHistory(): void {
    this.frameHistory = [];
  }

  updateActiveParticles(count: number): void {
    this.metrics.activeParticles = count;
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  onPerformanceChange(callback: (metrics: PerformanceMetrics) => void): void {
    this.callbacks.push(callback);
  }

  private notifyCallbacks(): void {
    this.callbacks.forEach(callback => callback(this.metrics));
  }

  getOptimalParticleCount(): number {
    const baseCount = this.config.maxParticles;
    const fpsRatio = this.metrics.averageFPS / this.config.performance.targetFPS;
    
    if (fpsRatio < 0.8) {
      return Math.max(5, Math.floor(baseCount * 0.6));
    } else if (fpsRatio > 1.2) {
      return Math.min(100, Math.floor(baseCount * 1.2));
    }
    
    return baseCount;
  }

  shouldReduceQuality(): boolean {
    return this.metrics.averageFPS < this.config.performance.targetFPS * 0.8;
  }

  shouldIncreaseQuality(): boolean {
    return this.metrics.averageFPS > this.config.performance.targetFPS * 1.1 && this.metrics.adaptationLevel > 0;
  }

  getPerformanceGrade(): 'excellent' | 'good' | 'fair' | 'poor' {
    const fpsRatio = this.metrics.averageFPS / this.config.performance.targetFPS;
    
    if (fpsRatio >= 0.95) return 'excellent';
    if (fpsRatio >= 0.8) return 'good';
    if (fpsRatio >= 0.6) return 'fair';
    return 'poor';
  }

  cleanup(): void {
    this.stop();
    this.callbacks.length = 0;
    this.frameHistory.length = 0;
  }

  static isMobileDevice(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           ('ontouchstart' in window) ||
           (navigator.maxTouchPoints > 0);
  }

  static hasReducedMotionPreference(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  static estimateDevicePerformance(): 'high' | 'medium' | 'low' {
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    const navWithMemory = navigator as Navigator & { deviceMemory?: number };
    const memory = navWithMemory.deviceMemory || 4;
    const isMobile = PerformanceMonitor.isMobileDevice();
    
    if (isMobile) {
      if (hardwareConcurrency >= 8 && memory >= 4) return 'medium';
      return 'low';
    }
    
    if (hardwareConcurrency >= 8 && memory >= 8) return 'high';
    if (hardwareConcurrency >= 4 && memory >= 4) return 'medium';
    return 'low';
  }
}