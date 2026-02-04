/**
 * Device profiling for adaptive graphics quality
 * Detects GPU capability, memory, and sets appropriate limits
 */

export type DeviceProfile = 'high' | 'medium' | 'low';

export interface ProfileConfig {
  maxNodes: number;
  maxParticles: number;
  targetFps: number;
  enableBlur: boolean;
  enableShadows: boolean;
  enablePostProcessing: boolean;
  lodDistance: number;
}

const PROFILE_CONFIGS: Record<DeviceProfile, ProfileConfig> = {
  high: {
    maxNodes: 200,
    maxParticles: 5000,
    targetFps: 60,
    enableBlur: true,
    enableShadows: true,
    enablePostProcessing: true,
    lodDistance: 50,
  },
  medium: {
    maxNodes: 100,
    maxParticles: 2000,
    targetFps: 30,
    enableBlur: true,
    enableShadows: false,
    enablePostProcessing: false,
    lodDistance: 30,
  },
  low: {
    maxNodes: 50,
    maxParticles: 500,
    targetFps: 30,
    enableBlur: false,
    enableShadows: false,
    enablePostProcessing: false,
    lodDistance: 20,
  },
};

/**
 * Detect if running on iOS/Safari (known GPU issues with backdrop-filter)
 */
export function isSafari(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes('safari') && !ua.includes('chrome') && !ua.includes('android');
}

export function isIOS(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if backdrop-filter is supported
 */
export function supportsBackdropFilter(): boolean {
  if (typeof CSS === 'undefined') return false;
  return CSS.supports('backdrop-filter', 'blur(10px)') ||
         CSS.supports('-webkit-backdrop-filter', 'blur(10px)');
}

/**
 * Estimate device memory (returns GB, defaults to 4 if not available)
 */
function getDeviceMemory(): number {
  if (typeof navigator !== 'undefined' && 'deviceMemory' in navigator) {
    return (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 4;
  }
  return 4;
}

/**
 * Estimate hardware concurrency (CPU cores)
 */
function getHardwareConcurrency(): number {
  if (typeof navigator !== 'undefined' && navigator.hardwareConcurrency) {
    return navigator.hardwareConcurrency;
  }
  return 4;
}

/**
 * Check WebGL support and capabilities
 */
function getWebGLInfo(): { supported: boolean; renderer: string; vendor: string } {
  if (typeof document === 'undefined') {
    return { supported: false, renderer: '', vendor: '' };
  }

  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');

    if (!gl) {
      return { supported: false, renderer: '', vendor: '' };
    }

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      : 'Unknown';
    const vendor = debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
      : 'Unknown';

    return { supported: true, renderer, vendor };
  } catch {
    return { supported: false, renderer: '', vendor: '' };
  }
}

/**
 * Check for known low-power GPUs
 */
function isLowPowerGPU(renderer: string): boolean {
  const lowPowerPatterns = [
    /intel.*hd/i,
    /intel.*uhd/i,
    /intel.*iris/i,
    /mali/i,
    /adreno\s*[0-5]/i,
    /powervr/i,
    /apple.*gpu/i, // Older Apple GPUs
    /swiftshader/i, // Software renderer
  ];

  return lowPowerPatterns.some(pattern => pattern.test(renderer));
}

/**
 * Check for high-power GPUs
 */
function isHighPowerGPU(renderer: string): boolean {
  const highPowerPatterns = [
    /nvidia.*rtx/i,
    /nvidia.*gtx\s*1[0-9]{3}/i,
    /radeon.*rx/i,
    /apple.*m[1-3]/i, // Apple Silicon
    /adreno\s*[6-7]/i,
  ];

  return highPowerPatterns.some(pattern => pattern.test(renderer));
}

/**
 * Main device profiling function
 */
export function detectDeviceProfile(): DeviceProfile {
  // Check for reduced graphics query param
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    if (params.get('reduced-graphics') === '1') {
      return 'low';
    }
  }

  // Check reduced motion preference
  if (prefersReducedMotion()) {
    return 'low';
  }

  const memory = getDeviceMemory();
  const cores = getHardwareConcurrency();
  const webgl = getWebGLInfo();

  // No WebGL support = low profile
  if (!webgl.supported) {
    return 'low';
  }

  // iOS/Safari with potential GPU issues
  if (isIOS() || isSafari()) {
    // Still allow medium on newer iOS devices
    if (memory >= 4 && cores >= 4) {
      return 'medium';
    }
    return 'low';
  }

  // Check GPU tier
  if (isHighPowerGPU(webgl.renderer)) {
    return 'high';
  }

  if (isLowPowerGPU(webgl.renderer)) {
    return 'low';
  }

  // Fallback to memory/cores heuristics
  if (memory >= 8 && cores >= 8) {
    return 'high';
  }

  if (memory >= 4 && cores >= 4) {
    return 'medium';
  }

  return 'low';
}

/**
 * Get configuration for current device profile
 */
export function getProfileConfig(profile?: DeviceProfile): ProfileConfig {
  const detected = profile || detectDeviceProfile();
  return PROFILE_CONFIGS[detected];
}

/**
 * Create a performance observer for FPS monitoring
 */
export function createPerformanceMonitor(onUpdate: (fps: number, dropped: number) => void) {
  let frameCount = 0;
  let droppedFrames = 0;
  let lastTime = performance.now();
  let lastFrameTime = performance.now();
  let animationId: number | null = null;

  const TARGET_FRAME_TIME = 1000 / 60; // 16.67ms for 60fps

  function tick() {
    const now = performance.now();
    const delta = now - lastFrameTime;

    frameCount++;

    // Count dropped frames (frames that took too long)
    if (delta > TARGET_FRAME_TIME * 1.5) {
      droppedFrames += Math.floor(delta / TARGET_FRAME_TIME) - 1;
    }

    lastFrameTime = now;

    // Report every second
    if (now - lastTime >= 1000) {
      const fps = Math.round(frameCount * 1000 / (now - lastTime));
      onUpdate(fps, droppedFrames);
      frameCount = 0;
      droppedFrames = 0;
      lastTime = now;
    }

    animationId = requestAnimationFrame(tick);
  }

  return {
    start: () => {
      if (!animationId) {
        lastTime = performance.now();
        lastFrameTime = performance.now();
        animationId = requestAnimationFrame(tick);
      }
    },
    stop: () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    },
  };
}

// Export singleton instance of detected profile
let cachedProfile: DeviceProfile | null = null;

export function getDeviceProfile(): DeviceProfile {
  if (!cachedProfile) {
    cachedProfile = detectDeviceProfile();
  }
  return cachedProfile;
}

export function resetDeviceProfile(): void {
  cachedProfile = null;
}
