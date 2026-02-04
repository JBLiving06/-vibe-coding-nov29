// Trend and status types
export type TrendDirection = 'rising' | 'stable' | 'declining';
export type ConfidenceLevel = 'high' | 'medium' | 'low';
export type ThresholdStatus = 'crossed' | 'approaching' | 'not_met' | 'alert';
export type EquityTrend = 'improving' | 'stable' | 'widening';

// Priority structure aligned with USP 2030
export interface Priority {
  id: string;
  name: string;
  shortName: string;
  description: string;
  targets: {
    impact: string;
    scale: string;
  };
}

// Metric within a signal family
export interface Metric {
  name: string;
  value: number;
  unit?: string;
  trend: TrendDirection;
  trendValue: number;
  confidence: number;
  sourceNote: string; // "Illustrative" for demo
}

// Decision threshold
export interface Threshold {
  description: string;
  status: ThresholdStatus;
  response: string;
}

// Source architecture for transparency
export interface SignalSources {
  practitionerVoice: {
    signalCount: number;
    initiatives: string[];
  };
  institutionalData: {
    feedTypes: string[];
  };
  triangulationNote: string;
}

// Full signal family structure
export interface SignalFamily {
  id: string;
  name: string;
  shortName?: string;
  score: number;
  confidence: number;
  trend: TrendDirection;
  trendValue: number;
  status?: 'healthy' | 'attention' | 'alert';
  synthesis: string;
  summary?: string;
  definition: string;
  whyItMatters: string;
  sources: SignalSources;
  metrics: Metric[];
  connectedSignals: string[];
  relatedSignals?: string[];
  keyObservations?: string[];
  thresholds?: Threshold[];
}

// Infrastructure types (was Capital flow types)
export type CapitalFlowType = 'data-systems' | 'trust-frameworks' | 'integration';

export interface QuarterlyData {
  quarter: string;
  amount: number;
}

export interface CapitalFlow {
  id: CapitalFlowType;
  name: string;
  description: string;
  currentQuarter: number;
  ytd: number;
  trend: TrendDirection;
  trendValue: number;
  coInvestmentMultiplier?: number;
  keyMetric: string;
  keyMetricValue: string;
  quarterlyData: QuarterlyData[];
}

export interface CapitalSummary {
  totalCurrent: number;
  totalYtd: number;
  coInvestmentMultiplier: number;
  interpretation: string;
}

// Equity segment
export interface EquitySegment {
  id: string;
  name: string;
  adoption: number;
  access: number;
  costEquity: number;
  gapIndex: number;
  trend: EquityTrend;
}

// Equity indicator for sidebar
export interface EquityIndicator {
  id: string;
  dimension: string;
  status: 'positive' | 'neutral' | 'concern';
  observation: string;
  metric?: string;
  change?: string;
}

export interface EquitySummary {
  avgGapIndex: number;
  improvingCount: number;
  wideningCount: number;
  status: 'alert' | 'attention' | 'healthy';
  interpretation: string;
}

// Orientation step
export type OrientationStep = 'question' | 'instrument' | 'sources' | 'current-read';

// App state
export interface AppState {
  hasCompletedOrientation: boolean;
  currentOrientationStep: OrientationStep;
  selectedPriority: string;
  selectedSignal: SignalFamily | null;
  showDataArchitectureModal: boolean;
  showEnablementLens: boolean;
}
