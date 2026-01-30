export type TrendDirection = 'rising' | 'stable' | 'declining';
export type ConfidenceLevel = 'high' | 'medium' | 'low';
export type ThresholdStatus = 'crossed' | 'approaching' | 'not_met' | 'alert';

export interface Metric {
  name: string;
  value: number;
  unit?: string;
  trend: TrendDirection;
  trendValue: number;
  confidence: number;
  source: string;
}

export interface Threshold {
  description: string;
  status: ThresholdStatus;
  response: string;
}

export interface SignalFamily {
  id: string;
  name: string;
  score: number;
  confidence: number;
  trend: TrendDirection;
  trendValue: number;
  synthesis: string;
  definition: string;
  whyItMatters: string;
  metrics: Metric[];
  sources: string[];
  connectedSignals: string[];
  thresholds?: Threshold[];
}

export interface SolutionPriority {
  id: string;
  name: string;
  shortName: string;
  description: string;
}

// Solution Priority Areas
export const solutionPriorities: SolutionPriority[] = [
  {
    id: 'k12-curriculum',
    name: 'K-12 Curriculum & Tutoring',
    shortName: 'K-12',
    description: 'Math and literacy instruction, high-dosage tutoring, curriculum adoption',
  },
  {
    id: 'postsecondary',
    name: 'Postsecondary Courseware & Navigation',
    shortName: 'Postsecondary',
    description: 'College readiness, transfer pathways, completion support',
  },
  {
    id: 'workforce',
    name: 'Workforce Pathways',
    shortName: 'Workforce',
    description: 'Career navigation, credential recognition, employer alignment',
  },
  {
    id: 'assessment',
    name: 'Assessment & Learning Science',
    shortName: 'Assessment',
    description: 'Formative assessment, learning analytics, evidence generation',
  },
];

// Signal Families with full data by solution priority
export const getSignalFamilies = (priorityId: string): SignalFamily[] => {
  const baseSignals: SignalFamily[] = [
    {
      id: 'supply',
      name: 'Supply Maturity',
      score: priorityId === 'k12-curriculum' ? 80 : priorityId === 'postsecondary' ? 65 : priorityId === 'workforce' ? 52 : 71,
      confidence: 82,
      trend: priorityId === 'workforce' ? 'rising' : 'stable',
      trendValue: priorityId === 'workforce' ? 12 : 3,
      synthesis: priorityId === 'k12-curriculum'
        ? 'Supplier density sufficient for quality competition. Enablement focus can shift from development to adoption.'
        : priorityId === 'postsecondary'
        ? 'Emerging solutions gaining traction but interoperability remains a barrier to scale.'
        : priorityId === 'workforce'
        ? 'Rapid supplier entry creating market noise. Quality differentiation not yet visible to buyers.'
        : 'Assessment tools maturing but evidence base remains thin for newer entrants.',
      definition: 'Supply Maturity measures whether enough fit-for-purpose solutions exist at price points institutions can afford. It tracks the number of qualified vendors, price band distribution, evidence of efficacy, and technical interoperability.',
      whyItMatters: 'When supply maturity is low, demand-side investment is premature—there is nothing quality to buy. When high, the focus can shift to adoption acceleration and market-making.',
      metrics: [
        { name: 'Solution Count', value: priorityId === 'k12-curriculum' ? 56 : 34, trend: 'declining', trendValue: -11, confidence: 75, source: 'Vendor Registry' },
        { name: 'Price Band ($/learner)', value: priorityId === 'k12-curriculum' ? 42 : 67, unit: '$', trend: 'rising', trendValue: 9, confidence: 67, source: 'RFP Analysis' },
        { name: 'Evidence Score', value: 35, trend: 'rising', trendValue: 7, confidence: 63, source: 'WWC Database' },
        { name: 'Interoperability Index', value: 90, trend: 'stable', trendValue: 3, confidence: 95, source: 'Technical Audit' },
      ],
      sources: ['EdTech Vendor Registry', 'District RFP Database', 'What Works Clearinghouse', 'LTI Compliance Audits'],
      connectedSignals: ['demand', 'competition', 'capacity'],
    },
    {
      id: 'demand',
      name: 'Demand & Adoption',
      score: priorityId === 'k12-curriculum' ? 73 : priorityId === 'postsecondary' ? 58 : 45,
      confidence: 78,
      trend: priorityId === 'k12-curriculum' ? 'rising' : 'stable',
      trendValue: priorityId === 'k12-curriculum' ? 23 : 5,
      synthesis: priorityId === 'k12-curriculum'
        ? 'RFP volume up sharply with increased specificity around evidence requirements. Literacy leading math.'
        : priorityId === 'postsecondary'
        ? 'Steady procurement activity but implementation depth remains shallow across most institutions.'
        : 'Employer demand signals strong but translating to institutional procurement proving difficult.',
      definition: 'Demand & Adoption tracks the volume and sophistication of buyer activity—RFPs issued, procurement decisions made, implementation depth, and actual usage intensity.',
      whyItMatters: 'Strong demand signals validate that the field is moving. Weak signals suggest the need for demand cultivation before supply-side investment.',
      metrics: [
        { name: 'RFP Volume', value: priorityId === 'k12-curriculum' ? 847 : 312, trend: 'rising', trendValue: 23, confidence: 88, source: 'RFP Tracker' },
        { name: 'Procurement Wins', value: priorityId === 'k12-curriculum' ? 234 : 89, trend: 'rising', trendValue: 15, confidence: 72, source: 'Contract Database' },
        { name: 'Usage Intensity', value: 67, unit: '%', trend: 'stable', trendValue: 2, confidence: 65, source: 'Telemetry Panel' },
        { name: 'Satisfaction Score', value: 72, trend: 'rising', trendValue: 8, confidence: 71, source: 'Educator Survey' },
      ],
      sources: ['District RFP Aggregator', 'State Contract Database', 'Usage Telemetry Panel', 'Quarterly Educator Survey'],
      connectedSignals: ['supply', 'capacity', 'policy'],
    },
    {
      id: 'policy',
      name: 'Policy & Public Funding',
      score: priorityId === 'k12-curriculum' ? 68 : priorityId === 'postsecondary' ? 74 : 61,
      confidence: 85,
      trend: 'rising',
      trendValue: 18,
      synthesis: priorityId === 'k12-curriculum'
        ? 'Three states advancing aligned instructional materials policies. Federal appropriations committee markup favorable.'
        : priorityId === 'postsecondary'
        ? 'Transfer credit policies gaining momentum. Policy-to-procurement conversion rate improving.'
        : 'Credential transparency legislation advancing in 5 states but implementation guidance lacking.',
      definition: 'Policy & Public Funding monitors legislative and regulatory changes, appropriations, and the critical conversion rate from policy passage to actual procurement behavior.',
      whyItMatters: 'Policy can accelerate or constrain market development. Understanding the policy-to-procurement pipeline reveals whether legislative wins translate to field movement.',
      metrics: [
        { name: 'Policy Changes', value: 12, trend: 'rising', trendValue: 33, confidence: 90, source: 'Policy Tracker' },
        { name: 'Appropriations ($M)', value: priorityId === 'postsecondary' ? 847 : 523, unit: '$M', trend: 'rising', trendValue: 12, confidence: 95, source: 'Federal Budget' },
        { name: 'Conversion Rate', value: 42, unit: '%', trend: 'rising', trendValue: 8, confidence: 72, source: 'Implementation Study' },
        { name: 'State Progress', value: priorityId === 'k12-curriculum' ? 18 : 12, trend: 'rising', trendValue: 5, confidence: 88, source: 'State Scan' },
      ],
      sources: ['ECS Policy Tracker', 'Federal Appropriations Database', 'State Implementation Studies', '50-State Policy Scan'],
      connectedSignals: ['demand', 'capacity', 'equity'],
      thresholds: [
        { description: 'Policy-to-procurement conversion exceeds 40%', status: priorityId === 'postsecondary' ? 'crossed' : 'approaching', response: 'Shift investment from policy advocacy to implementation support' },
      ],
    },
    {
      id: 'capacity',
      name: 'Capacity to Implement',
      score: priorityId === 'k12-curriculum' ? 54 : priorityId === 'postsecondary' ? 61 : 48,
      confidence: 71,
      trend: 'declining',
      trendValue: -6,
      synthesis: priorityId === 'k12-curriculum'
        ? 'Implementation capacity remains the binding constraint. Staffing shortages and integration burden slowing adoption.'
        : priorityId === 'postsecondary'
        ? 'Registrar systems creating friction. Partner ecosystem strengthening but change management lagging.'
        : 'Employer-institution coordination mechanisms underdeveloped. Capacity building needed before scale.',
      definition: 'Capacity to Implement measures whether institutions have the staffing, technical infrastructure, and change-management resources to successfully adopt and sustain new solutions.',
      whyItMatters: 'Even with perfect supply and strong demand, adoption fails without implementation capacity. This signal identifies whether the system is ready to absorb new tools.',
      metrics: [
        { name: 'Readiness Score', value: 58, trend: 'stable', trendValue: 2, confidence: 68, source: 'District Survey' },
        { name: 'Staffing Index', value: 45, trend: 'declining', trendValue: -12, confidence: 82, source: 'HR Data' },
        { name: 'Integration Burden', value: 72, trend: 'rising', trendValue: 8, confidence: 75, source: 'Technical Audit' },
        { name: 'Partner Density', value: 34, trend: 'rising', trendValue: 15, confidence: 65, source: 'Partner Registry' },
      ],
      sources: ['District Readiness Survey', 'Education HR Data Collaborative', 'Technical Integration Audits', 'Implementation Partner Registry'],
      connectedSignals: ['supply', 'demand', 'cadence'],
    },
    {
      id: 'cadence',
      name: 'Cadence',
      score: priorityId === 'k12-curriculum' ? 62 : 55,
      confidence: 74,
      trend: 'stable',
      trendValue: -2,
      synthesis: priorityId === 'k12-curriculum'
        ? 'Adoption cycles shortening slightly but still driven by annual budget rhythms. Renewal rates healthy.'
        : 'Multi-year procurement cycles creating lag between signal and action. Patience required.',
      definition: 'Cadence tracks the timing dynamics of the market—how long adoption cycles take, seasonal patterns, and the renewal and churn behavior that indicates solution stickiness.',
      whyItMatters: 'Understanding cadence prevents mistaking timing for signal. A flat quarter in a seasonal market is not decline; a quick cycle in a long-cycle market may indicate shallow adoption.',
      metrics: [
        { name: 'Cycle Length (months)', value: 14, trend: 'declining', trendValue: -8, confidence: 78, source: 'Procurement Analysis' },
        { name: 'Renewal Rate', value: 78, unit: '%', trend: 'stable', trendValue: 2, confidence: 85, source: 'Contract Data' },
        { name: 'Churn Rate', value: 12, unit: '%', trend: 'declining', trendValue: -3, confidence: 80, source: 'Contract Data' },
        { name: 'Seasonality Index', value: 0.72, trend: 'stable', trendValue: 0, confidence: 92, source: 'Historical Analysis' },
      ],
      sources: ['Procurement Cycle Analysis', 'Contract Renewal Database', 'Historical Pattern Analysis'],
      connectedSignals: ['demand', 'capacity'],
    },
    {
      id: 'competition',
      name: 'Competition & Substitution',
      score: priorityId === 'k12-curriculum' ? 71 : priorityId === 'workforce' ? 45 : 58,
      confidence: 69,
      trend: priorityId === 'workforce' ? 'rising' : 'stable',
      trendValue: priorityId === 'workforce' ? 22 : 4,
      synthesis: priorityId === 'k12-curriculum'
        ? 'Healthy competition driving quality. Category consolidation beginning—watch for market power concentration.'
        : priorityId === 'workforce'
        ? 'New entrants disrupting incumbent approaches. Category definition still fluid—opportunity for standard-setting.'
        : 'Moderate competition with clear tier structure. Switching costs creating stickiness.',
      definition: 'Competition & Substitution examines market structure—the number of competitors, their relative strength, switching costs, and whether a clear category is forming.',
      whyItMatters: 'Healthy competition drives quality and price improvement. Too little suggests the need for market-making; too much consolidation risks capture.',
      metrics: [
        { name: 'Market Share (top 3)', value: 52, unit: '%', trend: 'rising', trendValue: 8, confidence: 72, source: 'Market Analysis' },
        { name: 'Switching Cost Index', value: 67, trend: 'stable', trendValue: 2, confidence: 65, source: 'Survey Data' },
        { name: 'Category Maturity', value: 74, trend: 'rising', trendValue: 6, confidence: 78, source: 'Analyst Reports' },
        { name: 'Competitor Count', value: priorityId === 'k12-curriculum' ? 23 : 45, trend: priorityId === 'workforce' ? 'rising' : 'declining', trendValue: priorityId === 'workforce' ? 15 : -4, confidence: 88, source: 'Vendor Registry' },
      ],
      sources: ['Market Share Analysis', 'Buyer Survey Data', 'Industry Analyst Reports', 'Vendor Registry'],
      connectedSignals: ['supply', 'demand'],
    },
    {
      id: 'equity',
      name: 'Equity & Access',
      score: priorityId === 'k12-curriculum' ? 48 : 42,
      confidence: 76,
      trend: 'stable',
      trendValue: 3,
      synthesis: priorityId === 'k12-curriculum'
        ? 'Persistent gaps between urban and rural adoption. Title I schools showing improved access but implementation depth lagging.'
        : 'Equity gaps widening in private market solutions. Public sector investment partially compensating.',
      definition: 'Equity & Access disaggregates all other signals by population—tracking whether gains are reaching historically underserved communities or concentrating among the already-advantaged.',
      whyItMatters: 'Aggregate improvement that masks deepening inequality is not success. This signal ensures the Foundation\'s equity commitment is reflected in market movement.',
      metrics: [
        { name: 'Access Gap Index', value: 28, trend: 'declining', trendValue: -4, confidence: 82, source: 'Equity Audit' },
        { name: 'Cost Equity Ratio', value: 0.72, trend: 'rising', trendValue: 5, confidence: 70, source: 'Price Analysis' },
        { name: 'Language Coverage', value: 67, unit: '%', trend: 'rising', trendValue: 12, confidence: 78, source: 'Product Audit' },
        { name: 'Accessibility Score', value: 71, trend: 'rising', trendValue: 8, confidence: 85, source: 'WCAG Audit' },
      ],
      sources: ['Equity Access Audit', 'Price Equity Analysis', 'Language Coverage Audit', 'WCAG Compliance Audit'],
      connectedSignals: ['supply', 'demand', 'policy', 'capacity'],
      thresholds: [
        { description: 'Equity gap index > 25 for 3 quarters', status: 'alert', response: 'Redesign intervention approach with targeted equity investments' },
      ],
    },
  ];

  return baseSignals;
};

// Future signal families (visible but gated)
export const futureSignals = [
  { id: 'hyperscaler', name: 'Hyperscaler Dynamics', availableDate: 'Q2 2025' },
  { id: 'policy-pipeline', name: 'Policy Pipeline', availableDate: 'Q2 2025' },
  { id: 'standards', name: 'Standards Convergence', availableDate: 'Q3 2025' },
];

// Global synthesis by priority
export const getSynthesis = (priorityId: string): string => {
  const syntheses: Record<string, string> = {
    'k12-curriculum': 'Momentum building in literacy adoption. Capacity to implement remains the binding constraint. Capital alignment strengthening.',
    'postsecondary': 'Transfer pathway policies gaining traction. Registrar system interoperability emerging as the unlock. Private investment following public signals.',
    'workforce': 'Employer demand strong but institutional response fragmented. Supply maturing rapidly—quality differentiation needed. Equity gaps require attention.',
    'assessment': 'Evidence infrastructure improving but adoption lagging policy intent. Interoperability standards stabilizing.',
  };
  return syntheses[priorityId] || syntheses['k12-curriculum'];
};

export const orientingQuestion = "Is there evidence from the market that the ecosystem is moving toward Foundation priorities—and where is there more work to do?";

export const framingStatement = "Dashboards report. Instruments detect, calibrate, and trigger action.";
