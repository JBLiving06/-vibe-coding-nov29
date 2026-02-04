/**
 * ConstellationCanvas - Lazy-loaded WebGL constellation
 *
 * This wrapper handles:
 * - Dynamic import to avoid SSR issues
 * - Loading state
 * - Error boundary fallback to SVG
 * - Device capability check
 */

import { lazy, Suspense, useState, useEffect } from 'react';
import type { ConstellationCanvasProps, ConstellationData } from './types';
import { getDeviceProfile } from '../../lib/deviceProfile';

// Lazy load the WebGL component
const ConstellationCanvasWebGL = lazy(() => import('./ConstellationCanvas'));

// Loading placeholder
function LoadingPlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-warm-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-warm-300 border-t-accent-primary rounded-full animate-spin" />
        <p className="text-sm text-warm-500">Loading visualization...</p>
      </div>
    </div>
  );
}

// Simple SVG fallback for low-end devices or WebGL failures
function SVGFallback({
  data,
  selectedId,
  onNodeClick,
}: {
  data: ConstellationData;
  selectedId?: string | null;
  onNodeClick?: (nodeId: string) => void;
}) {
  const statusColors = {
    healthy: '#0d9488',
    attention: '#d97706',
    alert: '#dc2626',
  };

  // Simple circular layout
  const nodeRadius = 8;
  const layoutRadius = 120;
  const centerX = 200;
  const centerY = 150;

  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full h-full"
      role="img"
      aria-label="Signal constellation visualization"
    >
      {/* Background */}
      <rect width="400" height="300" fill="#fafaf9" />

      {/* Connection lines */}
      {data.links.map((link, i) => {
        const sourceIndex = data.nodes.findIndex((n) => n.id === link.source);
        const targetIndex = data.nodes.findIndex((n) => n.id === link.target);
        if (sourceIndex === -1 || targetIndex === -1) return null;

        const sourceAngle = (sourceIndex / data.nodes.length) * Math.PI * 2;
        const targetAngle = (targetIndex / data.nodes.length) * Math.PI * 2;

        const x1 = centerX + Math.cos(sourceAngle) * layoutRadius;
        const y1 = centerY + Math.sin(sourceAngle) * layoutRadius;
        const x2 = centerX + Math.cos(targetAngle) * layoutRadius;
        const y2 = centerY + Math.sin(targetAngle) * layoutRadius;

        return (
          <line
            key={`link-${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#d6d3d1"
            strokeWidth="1"
            opacity="0.5"
          />
        );
      })}

      {/* Nodes */}
      {data.nodes.map((node, i) => {
        const angle = (i / data.nodes.length) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * layoutRadius;
        const y = centerY + Math.sin(angle) * layoutRadius;
        const isSelected = node.id === selectedId;

        return (
          <g
            key={node.id}
            transform={`translate(${x}, ${y})`}
            onClick={() => onNodeClick?.(node.id)}
            style={{ cursor: 'pointer' }}
          >
            <circle
              r={isSelected ? nodeRadius * 1.5 : nodeRadius}
              fill={statusColors[node.status]}
              opacity={isSelected ? 1 : 0.8}
            />
            {isSelected && (
              <circle
                r={nodeRadius * 2}
                fill="none"
                stroke={statusColors[node.status]}
                strokeWidth="2"
                opacity="0.3"
              />
            )}
            <title>{node.label}</title>
          </g>
        );
      })}
    </svg>
  );
}

// Error boundary component
interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Need to import React for class component
import React from 'react';

/**
 * Main exported component with fallback handling
 */
export default function ConstellationCanvas(props: ConstellationCanvasProps) {
  const [shouldUseWebGL, setShouldUseWebGL] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if we should use WebGL
    const profile = getDeviceProfile();

    // Check query param for forced reduced graphics
    const params = new URLSearchParams(window.location.search);
    const forceReduced = params.get('reduced-graphics') === '1';

    // Use SVG fallback for low profile or reduced motion preference
    const useWebGL = profile !== 'low' && !forceReduced;
    setShouldUseWebGL(useWebGL);
  }, []);

  // Still determining
  if (shouldUseWebGL === null) {
    return <LoadingPlaceholder />;
  }

  // Use SVG fallback
  if (!shouldUseWebGL) {
    return (
      <SVGFallback
        data={props.data}
        selectedId={props.selectedId}
        onNodeClick={props.onNodeClick}
      />
    );
  }

  // Use WebGL with error boundary
  return (
    <WebGLErrorBoundary
      fallback={
        <SVGFallback
          data={props.data}
          selectedId={props.selectedId}
          onNodeClick={props.onNodeClick}
        />
      }
    >
      <Suspense fallback={<LoadingPlaceholder />}>
        <ConstellationCanvasWebGL {...props} />
      </Suspense>
    </WebGLErrorBoundary>
  );
}

// Re-export types
export * from './types';
