/**
 * Hook for managing the force layout worker
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import type { ConstellationNode, ConstellationLink, NodePosition } from './types';

interface UseForceLayoutOptions {
  nodes: ConstellationNode[];
  links: ConstellationLink[];
  is3D?: boolean;
  onPositionsUpdate?: (positions: NodePosition[]) => void;
  onTickTime?: (timeMs: number) => void;
}

interface UseForceLayoutReturn {
  positions: Map<string, NodePosition>;
  isSimulating: boolean;
  alpha: number;
  start: () => void;
  stop: () => void;
  reheat: (alpha?: number) => void;
  pinNode: (nodeId: string, position?: { x: number; y: number; z: number }) => void;
}

export function useForceLayout({
  nodes,
  links,
  is3D = true,
  onPositionsUpdate,
  onTickTime,
}: UseForceLayoutOptions): UseForceLayoutReturn {
  const workerRef = useRef<Worker | null>(null);
  const [positions, setPositions] = useState<Map<string, NodePosition>>(new Map());
  const [isSimulating, setIsSimulating] = useState(false);
  const [alpha, setAlpha] = useState(1);
  const [isReady, setIsReady] = useState(false);

  // Initialize worker
  useEffect(() => {
    // Create worker
    workerRef.current = new Worker(
      new URL('../../workers/force.worker.ts', import.meta.url),
      { type: 'module' }
    );

    // Handle messages
    workerRef.current.onmessage = (event) => {
      const msg = event.data;

      switch (msg.type) {
        case 'loaded':
          // Worker is loaded
          break;

        case 'ready':
          setIsReady(true);
          break;

        case 'positions':
          // Update positions
          const newPositions = new Map<string, NodePosition>();
          msg.nodes.forEach((node: NodePosition) => {
            newPositions.set(node.id, node);
          });
          setPositions(newPositions);
          setAlpha(msg.alpha);
          setIsSimulating(msg.alpha > 0.001);
          onPositionsUpdate?.(msg.nodes);
          // Report tick time for telemetry
          if (msg.tickTime !== undefined) {
            onTickTime?.(msg.tickTime);
          }
          break;
      }
    };

    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, []);

  // Initialize simulation when data changes
  useEffect(() => {
    if (!workerRef.current) return;

    workerRef.current.postMessage({
      type: 'init',
      nodes: nodes.map((n) => ({
        id: n.id,
        group: n.group,
        size: n.size ?? 5 + n.score / 20,
      })),
      links: links.map((l) => ({
        source: l.source,
        target: l.target,
        strength: l.strength ?? 0.5,
      })),
      dimensions: is3D ? 3 : 2,
      alpha: 1,
    });
  }, [nodes, links, is3D]);

  // Start simulation when ready
  useEffect(() => {
    if (isReady && workerRef.current) {
      workerRef.current.postMessage({ type: 'start' });
      setIsSimulating(true);
    }
  }, [isReady]);

  const start = useCallback(() => {
    workerRef.current?.postMessage({ type: 'start' });
    setIsSimulating(true);
  }, []);

  const stop = useCallback(() => {
    workerRef.current?.postMessage({ type: 'stop' });
    setIsSimulating(false);
  }, []);

  const reheat = useCallback((newAlpha = 0.5) => {
    workerRef.current?.postMessage({ type: 'reheat', alpha: newAlpha });
    setIsSimulating(true);
  }, []);

  const pinNode = useCallback(
    (nodeId: string, position?: { x: number; y: number; z: number }) => {
      workerRef.current?.postMessage({
        type: 'pin',
        nodeId,
        position,
      });
    },
    []
  );

  return {
    positions,
    isSimulating,
    alpha,
    start,
    stop,
    reheat,
    pinNode,
  };
}
