/**
 * Types for the WebGL Constellation
 */

export interface ConstellationNode {
  id: string;
  label: string;
  shortLabel?: string;
  score: number;
  status: 'healthy' | 'attention' | 'alert';
  group?: number;
  size?: number;
  // Position from force layout
  x?: number;
  y?: number;
  z?: number;
}

export interface ConstellationLink {
  source: string;
  target: string;
  strength?: number;
}

export interface ConstellationData {
  nodes: ConstellationNode[];
  links: ConstellationLink[];
}

export interface ConstellationCanvasProps {
  /** Constellation data (nodes and links) */
  data: ConstellationData;
  /** Currently selected node ID */
  selectedId?: string | null;
  /** Callback when a node is clicked */
  onNodeClick?: (nodeId: string) => void;
  /** Callback when a node is hovered */
  onNodeHover?: (nodeId: string | null) => void;
  /** Whether to use 3D or 2D layout */
  is3D?: boolean;
  /** Background color */
  backgroundColor?: string;
  /** Whether to show connection lines */
  showLinks?: boolean;
  /** Whether to animate */
  animated?: boolean;
  /** ARIA label for accessibility */
  ariaLabel?: string;
}

export interface NodePosition {
  id: string;
  x: number;
  y: number;
  z: number;
}

// Status colors matching the design system
export const STATUS_COLORS = {
  healthy: '#0d9488',  // teal-600
  attention: '#d97706', // amber-600
  alert: '#dc2626',    // red-600
} as const;

export const STATUS_GLOW_COLORS = {
  healthy: '#14b8a6',  // teal-500
  attention: '#f59e0b', // amber-500
  alert: '#ef4444',    // red-500
} as const;
