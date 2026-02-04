/**
 * ConstellationCanvas - Main WebGL constellation component
 *
 * Features:
 * - React Three Fiber rendering
 * - Force-directed layout via Web Worker
 * - Instanced mesh for nodes
 * - On-demand rendering (not continuous)
 * - Device-aware quality settings
 * - Performance telemetry
 * - Safari/iOS crash guards
 */

import { Suspense, useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import InstancedNodes from './InstancedNodes';
import ConnectionLines from './ConnectionLines';
import { useForceLayout } from './useForceLayout';
import type { ConstellationCanvasProps } from './types';
import {
  getDeviceProfile,
  getProfileConfig,
  prefersReducedMotion,
  isSafari,
  isIOS,
} from '../../lib/deviceProfile';
import {
  useTelemetry,
  shouldUseReducedGraphics,
  SafariCrashGuard,
} from '../../lib/telemetry';

// Loading fallback
function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#0d9488" wireframe />
    </mesh>
  );
}

// Telemetry tracker component (inside Canvas)
function TelemetryTracker({
  recordDrawCalls,
}: {
  recordDrawCalls: (count: number) => void;
}) {
  const { gl } = useThree();

  useEffect(() => {
    // Track draw calls via WebGL renderer info
    const checkDrawCalls = () => {
      const info = gl.info;
      recordDrawCalls(info.render?.calls ?? 0);
    };

    // Check after each frame
    const interval = setInterval(checkDrawCalls, 1000);
    return () => clearInterval(interval);
  }, [gl, recordDrawCalls]);

  return null;
}

// Scene content (inside Canvas)
function SceneContent({
  data,
  selectedId,
  hoveredId,
  onNodeClick,
  onNodeHover,
  is3D,
  showLinks,
  animated,
  onTickTime,
}: ConstellationCanvasProps & { hoveredId: string | null; onTickTime?: (ms: number) => void }) {
  const { positions } = useForceLayout({
    nodes: data.nodes,
    links: data.links,
    is3D,
    onTickTime,
  });

  const reducedMotion = useMemo(() => prefersReducedMotion(), []);
  const effectiveAnimated = animated && !reducedMotion;

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} />

      {/* Nodes */}
      <InstancedNodes
        nodes={data.nodes}
        positions={positions}
        selectedId={selectedId}
        hoveredId={hoveredId}
        onNodeClick={onNodeClick}
        onNodeHover={onNodeHover}
        animated={effectiveAnimated}
      />

      {/* Connections */}
      {showLinks && (
        <ConnectionLines
          links={data.links}
          positions={positions}
          selectedId={selectedId}
          hoveredId={hoveredId}
          animated={effectiveAnimated}
        />
      )}

      {/* Camera controls */}
      <OrbitControls
        enablePan
        enableZoom
        enableRotate={is3D}
        minDistance={10}
        maxDistance={200}
        dampingFactor={0.05}
        rotateSpeed={0.5}
        zoomSpeed={0.8}
      />
    </>
  );
}

/**
 * Main ConstellationCanvas component
 */
export default function ConstellationCanvas({
  data,
  selectedId,
  onNodeClick,
  onNodeHover,
  is3D = true,
  backgroundColor = '#fafaf9',
  showLinks = true,
  animated = true,
  ariaLabel = 'Interactive constellation visualization of market signals',
}: ConstellationCanvasProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const [forceLowQuality, setForceLowQuality] = useState(false);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  // Initialize telemetry
  const { fps, recordDrawCalls, recordWorkerTick } = useTelemetry(true);

  // Check for reduced graphics mode
  const reducedGraphics = useMemo(() => shouldUseReducedGraphics(), []);

  // Get device profile and config
  const baseProfile = useMemo(() => getDeviceProfile(), []);
  const profile = forceLowQuality || reducedGraphics ? 'low' : baseProfile;
  const config = useMemo(() => getProfileConfig(profile), [profile]);

  // Safari/iOS crash guard
  useEffect(() => {
    if (!isSafari() && !isIOS()) return;

    const guard = new SafariCrashGuard();

    // Find the canvas element after it's mounted
    const checkCanvas = () => {
      const canvas = canvasContainerRef.current?.querySelector('canvas');
      if (canvas) {
        guard.init(canvas as HTMLCanvasElement, () => {
          console.warn('[SafariCrashGuard] Crash risk detected, reducing quality');
          setForceLowQuality(true);
        });
        return true;
      }
      return false;
    };

    // Try immediately, then with a small delay if canvas isn't ready
    if (!checkCanvas()) {
      const timeout = setTimeout(checkCanvas, 100);
      return () => clearTimeout(timeout);
    }

    return () => {
      const canvas = canvasContainerRef.current?.querySelector('canvas');
      if (canvas) {
        guard.destroy(canvas as HTMLCanvasElement);
      }
    };
  }, []);

  // Handle hover with callback
  const handleHover = useCallback(
    (nodeId: string | null) => {
      setHoveredId(nodeId);
      onNodeHover?.(nodeId);
    },
    [onNodeHover]
  );

  // Limit nodes based on device profile
  const limitedData = useMemo(() => {
    if (data.nodes.length <= config.maxNodes) {
      return data;
    }

    // Sort by score and take top N
    const sortedNodes = [...data.nodes]
      .sort((a, b) => b.score - a.score)
      .slice(0, config.maxNodes);

    const nodeIds = new Set(sortedNodes.map((n) => n.id));
    const filteredLinks = data.links.filter(
      (l) => nodeIds.has(l.source) && nodeIds.has(l.target)
    );

    return {
      nodes: sortedNodes,
      links: filteredLinks,
    };
  }, [data, config.maxNodes]);

  // Error boundary fallback
  if (hasError) {
    return (
      <div
        className="w-full h-full flex items-center justify-center bg-warm-50"
        role="img"
        aria-label={ariaLabel}
      >
        <div className="text-center p-8">
          <p className="text-warm-600 mb-2">Unable to load 3D visualization</p>
          <p className="text-sm text-warm-500">
            Your browser may not support WebGL
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={canvasContainerRef}
      className="w-full h-full relative"
      role="img"
      aria-label={ariaLabel}
      tabIndex={0}
    >
      <Canvas
        gl={{
          antialias: profile !== 'low',
          alpha: true,
          powerPreference: profile === 'high' ? 'high-performance' : 'default',
          failIfMajorPerformanceCaveat: true,
        }}
        dpr={profile === 'high' ? [1, 2] : [1, 1]}
        frameloop={animated ? 'demand' : 'never'}
        onCreated={({ gl }) => {
          gl.setClearColor(backgroundColor, 1);
        }}
        onError={() => setHasError(true)}
        style={{ background: backgroundColor }}
      >
        <PerspectiveCamera
          makeDefault
          position={[0, 0, is3D ? 80 : 100]}
          fov={50}
          near={0.1}
          far={1000}
        />

        <Suspense fallback={<LoadingFallback />}>
          <SceneContent
            data={limitedData}
            selectedId={selectedId}
            hoveredId={hoveredId}
            onNodeClick={onNodeClick}
            onNodeHover={handleHover}
            is3D={is3D}
            showLinks={showLinks}
            animated={animated && !forceLowQuality}
            onTickTime={recordWorkerTick}
          />
          <TelemetryTracker recordDrawCalls={recordDrawCalls} />
        </Suspense>
      </Canvas>

      {/* Debug overlay for development */}
      {import.meta.env.DEV && (
        <div className="absolute bottom-2 right-2 bg-black/70 text-green-400 font-mono text-xs px-2 py-1 rounded pointer-events-none">
          {fps} FPS | {profile}
        </div>
      )}

      {/* Screen reader description */}
      <div className="sr-only" aria-live="polite">
        {selectedId
          ? `Selected: ${data.nodes.find((n) => n.id === selectedId)?.label}`
          : `${data.nodes.length} nodes in constellation`}
      </div>
    </div>
  );
}
