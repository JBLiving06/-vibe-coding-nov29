/**
 * ConnectionLines - Renders links between nodes
 * Uses THREE.Line for simple, performant connections
 */

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { ConstellationLink, NodePosition } from './types';
import { prefersReducedMotion } from '../../lib/deviceProfile';

interface ConnectionLinesProps {
  links: ConstellationLink[];
  positions: Map<string, NodePosition>;
  selectedId?: string | null;
  hoveredId?: string | null;
  animated?: boolean;
}

export default function ConnectionLines({
  links,
  positions,
  selectedId,
  hoveredId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  animated: _animated = true,
}: ConnectionLinesProps) {
  const lineRef = useRef<THREE.LineSegments>(null);
  const reducedMotion = useMemo(() => prefersReducedMotion(), []);

  // Create geometry for all lines
  const { geometry, positionAttribute, colorAttribute } = useMemo(() => {
    // Each link needs 2 vertices (start and end)
    const vertices = new Float32Array(links.length * 6); // 3 coords per vertex, 2 vertices per link
    const colors = new Float32Array(links.length * 6);  // RGB per vertex

    const geo = new THREE.BufferGeometry();
    const posAttr = new THREE.BufferAttribute(vertices, 3);
    const colAttr = new THREE.BufferAttribute(colors, 3);

    posAttr.setUsage(THREE.DynamicDrawUsage);
    colAttr.setUsage(THREE.DynamicDrawUsage);

    geo.setAttribute('position', posAttr);
    geo.setAttribute('color', colAttr);

    return {
      geometry: geo,
      positionAttribute: posAttr,
      colorAttribute: colAttr,
    };
  }, [links.length]);

  // Update line positions and colors
  useFrame(() => {
    if (!lineRef.current) return;

    const posArray = positionAttribute.array as Float32Array;
    const colArray = colorAttribute.array as Float32Array;
    let needsUpdate = false;

    links.forEach((link, index) => {
      const sourcePos = positions.get(link.source);
      const targetPos = positions.get(link.target);

      if (!sourcePos || !targetPos) return;

      const offset = index * 6;

      // Check if this link involves selected/hovered node
      const isHighlighted =
        link.source === selectedId ||
        link.target === selectedId ||
        link.source === hoveredId ||
        link.target === hoveredId;

      // Update positions
      const newSourceX = sourcePos.x;
      const newSourceY = sourcePos.y;
      const newSourceZ = sourcePos.z;
      const newTargetX = targetPos.x;
      const newTargetY = targetPos.y;
      const newTargetZ = targetPos.z;

      if (
        posArray[offset] !== newSourceX ||
        posArray[offset + 1] !== newSourceY ||
        posArray[offset + 2] !== newSourceZ ||
        posArray[offset + 3] !== newTargetX ||
        posArray[offset + 4] !== newTargetY ||
        posArray[offset + 5] !== newTargetZ
      ) {
        posArray[offset] = newSourceX;
        posArray[offset + 1] = newSourceY;
        posArray[offset + 2] = newSourceZ;
        posArray[offset + 3] = newTargetX;
        posArray[offset + 4] = newTargetY;
        posArray[offset + 5] = newTargetZ;
        needsUpdate = true;
      }

      // Update colors
      // Highlighted: teal, normal: warm gray
      const r = isHighlighted ? 0.05 : 0.47;
      const g = isHighlighted ? 0.58 : 0.44;
      const b = isHighlighted ? 0.55 : 0.40;
      const alpha = isHighlighted ? 0.6 : 0.2;

      // Apply alpha by reducing color intensity
      const finalR = r * alpha;
      const finalG = g * alpha;
      const finalB = b * alpha;

      // Source vertex color
      colArray[offset] = finalR;
      colArray[offset + 1] = finalG;
      colArray[offset + 2] = finalB;

      // Target vertex color
      colArray[offset + 3] = finalR;
      colArray[offset + 4] = finalG;
      colArray[offset + 5] = finalB;
    });

    if (needsUpdate || !reducedMotion) {
      positionAttribute.needsUpdate = true;
      colorAttribute.needsUpdate = true;
    }
  });

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.8}
        linewidth={1}
      />
    </lineSegments>
  );
}
