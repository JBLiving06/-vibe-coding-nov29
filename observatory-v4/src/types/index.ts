// Signal states matching v4 spec
export type SignalState = 'rising' | 'stable' | 'watch' | 'critical';

// Trend direction for visual display
export type TrendDirection = 'up' | 'down' | 'stable';

// Status for visual indicators
export type PriorityStatus = 'healthy' | 'attention' | 'alert';

// Signal family from the framework
export interface Signal {
  id: string;
  name: string;
  state: SignalState;
  stateLabel: string;
  headline: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

// Priority matching Gates USP 2030 exactly
export interface Priority {
  id: number;
  number: string;
  name: string; // Display name for cards (same as title)
  title: string; // MUST match Gates language exactly
  description: string;
  signalState: string;
  // Visual properties
  status: PriorityStatus;
  trend: TrendDirection;
  hyperscalerRelevance: boolean;
  // Metrics
  metrics: {
    label: string;
    value: string;
  }[];
  signals: Signal[];
  summary: string;
  frameworkExplainer: string;
  institutionalScale: {
    description: string;
    metric: string;
    metricLabel: string;
  };
  hyperscalerScale: {
    description: string;
    metric: string;
    metricLabel: string;
  };
}

// Momentum point on the E-W journey
export interface MomentumPoint {
  id: string;
  label: string;
  isEnd?: boolean;
}

// Infrastructure layer
export interface InfrastructureLayer {
  number: string;
  title: string;
  description: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

// Enablement item
export interface EnablementItem {
  number: string;
  title: string;
  status: string;
}

// Framework item for modal
export interface FrameworkItem {
  number: string;
  name: string;
  description: string;
}

// Data source for modal
export interface DataSource {
  icon: string;
  name: string;
  description: string;
}
