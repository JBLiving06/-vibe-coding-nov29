/**
 * Telemetry utilities for performance monitoring
 *
 * Tracks:
 * - Frame rate (FPS)
 * - Draw calls
 * - Worker tick time
 * - Memory usage (when available)
 * - Safari/iOS crash guards
 */

import { getDeviceProfile, isSafari, isIOS } from './deviceProfile';

export interface TelemetryData {
  fps: number;
  droppedFrames: number;
  drawCalls: number;
  workerTickTime: number;
  memoryUsage: number | null;
  profile: 'high' | 'medium' | 'low';
  timestamp: number;
}

export interface TelemetryConfig {
  sampleInterval: number; // ms between samples
  maxSamples: number; // max samples to keep in history
  fpsThreshold: number; // fps below which to trigger quality reduction
  crashGuardEnabled: boolean;
}

const DEFAULT_CONFIG: TelemetryConfig = {
  sampleInterval: 1000,
  maxSamples: 60,
  fpsThreshold: 20,
  crashGuardEnabled: true,
};

/**
 * Telemetry collector class
 */
export class TelemetryCollector {
  private config: TelemetryConfig;
  private samples: TelemetryData[] = [];
  private currentDrawCalls = 0;
  private currentWorkerTickTime = 0;
  private frameCount = 0;
  private droppedFrames = 0;
  private lastFrameTime = 0;
  private lastSampleTime = 0;
  private animationId: number | null = null;
  private onQualityChange?: (newProfile: 'high' | 'medium' | 'low') => void;
  private consecutiveLowFps = 0;

  constructor(config: Partial<TelemetryConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Start collecting telemetry
   */
  start(onQualityChange?: (newProfile: 'high' | 'medium' | 'low') => void) {
    this.onQualityChange = onQualityChange;
    this.lastFrameTime = performance.now();
    this.lastSampleTime = performance.now();
    this.tick();
  }

  /**
   * Stop collecting telemetry
   */
  stop() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  /**
   * Record draw calls for current frame
   */
  recordDrawCalls(count: number) {
    this.currentDrawCalls = count;
  }

  /**
   * Record worker tick time
   */
  recordWorkerTick(timeMs: number) {
    this.currentWorkerTickTime = timeMs;
  }

  /**
   * Get current telemetry samples
   */
  getSamples(): TelemetryData[] {
    return [...this.samples];
  }

  /**
   * Get average FPS over last N samples
   */
  getAverageFps(sampleCount = 5): number {
    const recent = this.samples.slice(-sampleCount);
    if (recent.length === 0) return 60;
    return recent.reduce((sum, s) => sum + s.fps, 0) / recent.length;
  }

  /**
   * Get memory usage if available
   */
  private getMemoryUsage(): number | null {
    if (typeof performance !== 'undefined' && 'memory' in performance) {
      const memory = (performance as Performance & { memory?: { usedJSHeapSize: number } }).memory;
      return memory ? memory.usedJSHeapSize / 1024 / 1024 : null; // MB
    }
    return null;
  }

  /**
   * Main tick loop
   */
  private tick = () => {
    const now = performance.now();
    const delta = now - this.lastFrameTime;
    this.lastFrameTime = now;

    this.frameCount++;

    // Count dropped frames (frames taking > 25ms / 40fps)
    if (delta > 25) {
      this.droppedFrames += Math.floor(delta / 16.67) - 1;
    }

    // Sample at interval
    if (now - this.lastSampleTime >= this.config.sampleInterval) {
      const fps = Math.round(this.frameCount * 1000 / (now - this.lastSampleTime));

      const sample: TelemetryData = {
        fps,
        droppedFrames: this.droppedFrames,
        drawCalls: this.currentDrawCalls,
        workerTickTime: this.currentWorkerTickTime,
        memoryUsage: this.getMemoryUsage(),
        profile: getDeviceProfile(),
        timestamp: now,
      };

      this.samples.push(sample);

      // Trim old samples
      if (this.samples.length > this.config.maxSamples) {
        this.samples = this.samples.slice(-this.config.maxSamples);
      }

      // Check for quality degradation
      this.checkQualityThresholds(fps);

      // Reset counters
      this.frameCount = 0;
      this.droppedFrames = 0;
      this.lastSampleTime = now;
    }

    this.animationId = requestAnimationFrame(this.tick);
  };

  /**
   * Check if we should reduce quality
   */
  private checkQualityThresholds(fps: number) {
    if (!this.config.crashGuardEnabled || !this.onQualityChange) return;

    if (fps < this.config.fpsThreshold) {
      this.consecutiveLowFps++;

      // After 3 consecutive low FPS readings, reduce quality
      if (this.consecutiveLowFps >= 3) {
        const currentProfile = getDeviceProfile();
        if (currentProfile === 'high') {
          this.onQualityChange('medium');
        } else if (currentProfile === 'medium') {
          this.onQualityChange('low');
        }
        this.consecutiveLowFps = 0;
      }
    } else {
      this.consecutiveLowFps = 0;
    }
  }
}

/**
 * Safari/iOS crash guard
 * Monitors for signs of GPU stress and preemptively reduces quality
 */
export class SafariCrashGuard {
  private isEnabled: boolean;
  private contextLossCount = 0;
  private lastContextLoss = 0;
  private onCrashRisk?: () => void;

  constructor() {
    this.isEnabled = isSafari() || isIOS();
  }

  /**
   * Initialize crash guard with a canvas
   */
  init(canvas: HTMLCanvasElement, onCrashRisk: () => void) {
    if (!this.isEnabled) return;

    this.onCrashRisk = onCrashRisk;

    // Listen for WebGL context loss
    canvas.addEventListener('webglcontextlost', this.handleContextLoss);
    canvas.addEventListener('webglcontextrestored', this.handleContextRestored);
  }

  /**
   * Cleanup listeners
   */
  destroy(canvas: HTMLCanvasElement) {
    canvas.removeEventListener('webglcontextlost', this.handleContextLoss);
    canvas.removeEventListener('webglcontextrestored', this.handleContextRestored);
  }

  /**
   * Handle context loss
   */
  private handleContextLoss = (event: Event) => {
    event.preventDefault();
    this.contextLossCount++;
    this.lastContextLoss = performance.now();

    // If we've lost context multiple times, trigger crash risk
    if (this.contextLossCount >= 2) {
      this.onCrashRisk?.();
    }
  };

  /**
   * Handle context restoration
   */
  private handleContextRestored = () => {
    // Context restored, but stay vigilant
    console.log('[SafariCrashGuard] WebGL context restored');
  };

  /**
   * Check if we should be extra cautious
   */
  shouldReduceQuality(): boolean {
    if (!this.isEnabled) return false;

    // If we've had context loss recently, be cautious
    if (this.contextLossCount > 0 && performance.now() - this.lastContextLoss < 60000) {
      return true;
    }

    // Safari on older iOS versions is risky
    if (isIOS()) {
      const ua = navigator.userAgent;
      const iosMatch = ua.match(/OS (\d+)_/);
      if (iosMatch && parseInt(iosMatch[1]) < 15) {
        return true;
      }
    }

    return false;
  }
}

/**
 * Check for reduced graphics query param
 */
export function shouldUseReducedGraphics(): boolean {
  if (typeof window === 'undefined') return false;

  const params = new URLSearchParams(window.location.search);
  return params.get('reduced-graphics') === '1';
}

/**
 * Create a debug overlay for telemetry (dev only)
 */
export function createDebugOverlay(): {
  update: (data: Partial<TelemetryData>) => void;
  destroy: () => void;
} {
  if (typeof document === 'undefined') {
    return { update: () => {}, destroy: () => {} };
  }

  const overlay = document.createElement('div');
  overlay.id = 'telemetry-debug';
  overlay.style.cssText = `
    position: fixed;
    bottom: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.8);
    color: #0f0;
    font-family: monospace;
    font-size: 12px;
    padding: 8px 12px;
    border-radius: 4px;
    z-index: 9999;
    pointer-events: none;
  `;
  document.body.appendChild(overlay);

  return {
    update: (data: Partial<TelemetryData>) => {
      const lines = [
        `FPS: ${data.fps ?? '--'}`,
        `Dropped: ${data.droppedFrames ?? '--'}`,
        `Draw calls: ${data.drawCalls ?? '--'}`,
        `Worker: ${data.workerTickTime?.toFixed(1) ?? '--'}ms`,
        data.memoryUsage ? `Memory: ${data.memoryUsage.toFixed(1)}MB` : null,
        `Profile: ${data.profile ?? '--'}`,
      ].filter(Boolean);

      overlay.textContent = lines.join('\n');
    },
    destroy: () => {
      overlay.remove();
    },
  };
}

/**
 * React hook for telemetry
 */
import { useEffect, useRef, useCallback, useState } from 'react';

export function useTelemetry(enabled = true) {
  const collectorRef = useRef<TelemetryCollector | null>(null);
  const [currentFps, setCurrentFps] = useState(60);
  const [profile, setProfile] = useState<'high' | 'medium' | 'low'>('medium');

  useEffect(() => {
    if (!enabled) return;

    collectorRef.current = new TelemetryCollector();
    collectorRef.current.start((newProfile) => {
      setProfile(newProfile);
    });

    // Update FPS display periodically
    const interval = setInterval(() => {
      if (collectorRef.current) {
        setCurrentFps(collectorRef.current.getAverageFps());
      }
    }, 1000);

    return () => {
      collectorRef.current?.stop();
      clearInterval(interval);
    };
  }, [enabled]);

  const recordDrawCalls = useCallback((count: number) => {
    collectorRef.current?.recordDrawCalls(count);
  }, []);

  const recordWorkerTick = useCallback((timeMs: number) => {
    collectorRef.current?.recordWorkerTick(timeMs);
  }, []);

  return {
    fps: currentFps,
    profile,
    recordDrawCalls,
    recordWorkerTick,
    getSamples: () => collectorRef.current?.getSamples() ?? [],
  };
}

/**
 * React hook for Safari crash guard
 */
export function useSafariCrashGuard(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  onCrashRisk: () => void
) {
  const guardRef = useRef<SafariCrashGuard | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    guardRef.current = new SafariCrashGuard();
    guardRef.current.init(canvasRef.current, onCrashRisk);

    return () => {
      if (canvasRef.current) {
        guardRef.current?.destroy(canvasRef.current);
      }
    };
  }, [canvasRef, onCrashRisk]);

  return {
    shouldReduceQuality: () => guardRef.current?.shouldReduceQuality() ?? false,
  };
}
