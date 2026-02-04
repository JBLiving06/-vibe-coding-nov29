/**
 * InstancedNodes - Efficient WebGL rendering of many nodes
 * Uses InstancedMesh for performance
 */

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import type { ConstellationNode, NodePosition } from './types';
import { STATUS_COLORS, STATUS_GLOW_COLORS } from './types';
import { prefersReducedMotion } from '../../lib/deviceProfile';

interface InstancedNodesProps {
  nodes: ConstellationNode[];
  positions: Map<string, NodePosition>;
  selectedId?: string | null;
  hoveredId?: string | null;
  onNodeClick?: (nodeId: string) => void;
  onNodeHover?: (nodeId: string | null) => void;
  animated?: boolean;
}

// Temp objects for matrix updates (avoid GC)
const tempObject = new THREE.Object3D();
const tempColor = new THREE.Color();

export default function InstancedNodes({
  nodes,
  positions,
  selectedId,
  hoveredId,
  onNodeClick,
  onNodeHover,
  animated = true,
}: InstancedNodesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const prevPositionsRef = useRef<Map<string, NodePosition>>(new Map());
  const reducedMotion = useMemo(() => prefersReducedMotion(), []);

  // Create geometry and material
  const geometry = useMemo(() => new THREE.SphereGeometry(1, 16, 16), []);

  // Node ID to index mapping for raycasting
  const nodeIndexMap = useMemo(() => {
    const map = new Map<number, string>();
    nodes.forEach((node, index) => {
      map.set(index, node.id);
    });
    return map;
  }, [nodes]);

  // Update instance matrices and colors
  useEffect(() => {
    if (!meshRef.current) return;

    nodes.forEach((node, index) => {
      const pos = positions.get(node.id);
      if (!pos) return;

      // Calculate size based on score
      const baseSize = 0.5 + (node.score / 100) * 0.5;
      const size = node.id === selectedId ? baseSize * 1.3 : baseSize;

      tempObject.position.set(pos.x, pos.y, pos.z);
      tempObject.scale.setScalar(size);
      tempObject.updateMatrix();

      meshRef.current!.setMatrixAt(index, tempObject.matrix);

      // Set color based on status
      const isSelected = node.id === selectedId;
      const isHovered = node.id === hoveredId;
      const color = isSelected || isHovered
        ? STATUS_GLOW_COLORS[node.status]
        : STATUS_COLORS[node.status];

      tempColor.set(color);
      meshRef.current!.setColorAt(index, tempColor);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [nodes, positions, selectedId, hoveredId]);

  // Smooth position interpolation
  useFrame((_, delta) => {
    if (!meshRef.current || !animated || reducedMotion) return;

    let needsUpdate = false;

    nodes.forEach((node, index) => {
      const targetPos = positions.get(node.id);
      const prevPos = prevPositionsRef.current.get(node.id);

      if (!targetPos) return;

      // Initialize prev position if needed
      if (!prevPos) {
        prevPositionsRef.current.set(node.id, { ...targetPos });
        return;
      }

      // Lerp towards target
      const lerpFactor = 1 - Math.pow(0.001, delta);
      const newX = prevPos.x + (targetPos.x - prevPos.x) * lerpFactor;
      const newY = prevPos.y + (targetPos.y - prevPos.y) * lerpFactor;
      const newZ = prevPos.z + (targetPos.z - prevPos.z) * lerpFactor;

      // Only update if significant change
      if (
        Math.abs(newX - prevPos.x) > 0.01 ||
        Math.abs(newY - prevPos.y) > 0.01 ||
        Math.abs(newZ - prevPos.z) > 0.01
      ) {
        prevPos.x = newX;
        prevPos.y = newY;
        prevPos.z = newZ;

        const baseSize = 0.5 + (node.score / 100) * 0.5;
        const size = node.id === selectedId ? baseSize * 1.3 : baseSize;

        tempObject.position.set(newX, newY, newZ);
        tempObject.scale.setScalar(size);
        tempObject.updateMatrix();

        meshRef.current!.setMatrixAt(index, tempObject.matrix);
        needsUpdate = true;
      }
    });

    if (needsUpdate) {
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  // Handle click on instance
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    if (event.instanceId !== undefined) {
      const nodeId = nodeIndexMap.get(event.instanceId);
      if (nodeId && onNodeClick) {
        onNodeClick(nodeId);
      }
    }
  };

  // Handle pointer over/out
  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    if (event.instanceId !== undefined) {
      const nodeId = nodeIndexMap.get(event.instanceId);
      if (nodeId && onNodeHover) {
        onNodeHover(nodeId);
        document.body.style.cursor = 'pointer';
      }
    }
  };

  const handlePointerOut = () => {
    if (onNodeHover) {
      onNodeHover(null);
      document.body.style.cursor = 'auto';
    }
  };

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, undefined, nodes.length]}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <meshStandardMaterial
        vertexColors
        roughness={0.3}
        metalness={0.1}
        emissive="#ffffff"
        emissiveIntensity={0.1}
      />
    </instancedMesh>
  );
}
