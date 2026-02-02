import type { SignalFamily } from '../types';

// Signal data generator by priority
export const getSignalFamilies = (priorityId: string): SignalFamily[] => {
  // Base configurations that vary by priority
  const configs: Record<string, Record<string, Partial<SignalFamily>>> = {
    'core-instruction': {
      supply: { score: 78, trend: 'rising', trendValue: 12, synthesis: 'HQIM supplier ecosystem has reached critical mass. Evidence-rated options now available at competitive price points. Focus can shift from supplier development to adoption acceleration.' },
      demand: { score: 73, trend: 'rising', trendValue: 23, synthesis: 'RFP volume up sharply with increased specificity around evidence requirements. Literacy materials leading; math pathways following. District sophistication improving.' },
      policy: { score: 68, trend: 'rising', trendValue: 18, synthesis: 'Three states advancing aligned instructional materials policies. Federal appropriations committee markup favorable. Policy-to-procurement conversion improving.' },
      capacity: { score: 52, trend: 'declining', trendValue: -8, synthesis: 'Implementation capacity remains the binding constraint. Staffing shortages acute. Integration burden and change-management friction slowing adoption despite strong supply and demand.' },
      cadence: { score: 65, trend: 'stable', trendValue: 2, synthesis: 'Adoption cycles shortening slightly but still anchored to annual budget rhythms. Renewal rates healthy at 78%, suggesting solution stickiness.' },
      competition: { score: 71, trend: 'stable', trendValue: 4, synthesis: 'Healthy competition driving quality improvement. Category consolidation beginning—monitoring for market power concentration.' },
      equity: { score: 48, trend: 'stable', trendValue: 3, synthesis: 'Persistent gaps between urban and rural adoption. Title I schools showing improved access but implementation depth lagging. Targeted intervention needed.' },
    },
    'gateway-math': {
      supply: { score: 62, trend: 'rising', trendValue: 18, synthesis: 'Courseware market maturing rapidly. AI-enabled solutions entering but evidence base still thin. Price compression beginning as competition intensifies.' },
      demand: { score: 58, trend: 'rising', trendValue: 15, synthesis: 'Institutional procurement accelerating. Math departments increasingly receptive to technology-mediated instruction. Implementation depth variable.' },
      policy: { score: 74, trend: 'rising', trendValue: 22, synthesis: 'Corequisite remediation policies gaining momentum. State systems standardizing on placement reforms. Budget lines stabilizing.' },
      capacity: { score: 55, trend: 'stable', trendValue: -2, synthesis: 'Faculty adoption mixed. LMS integration improving but instructor support remains a bottleneck. Professional development investments showing returns.' },
      cadence: { score: 52, trend: 'stable', trendValue: -4, synthesis: 'Multi-year adoption cycles typical for courseware. Semester-based evaluation windows create implementation lag.' },
      competition: { score: 58, trend: 'rising', trendValue: 22, synthesis: 'New AI-native entrants disrupting incumbent publishers. Category definition still fluid—opportunity for quality standard-setting.' },
      equity: { score: 45, trend: 'rising', trendValue: 8, synthesis: 'Corequisite models showing equity gains. Gaps narrowing in pass rates. Continued monitoring of completion outcomes needed.' },
    },
    'personalized-advising': {
      supply: { score: 52, trend: 'rising', trendValue: 28, synthesis: 'Rapid supplier entry creating market noise. LLM-powered tools proliferating but quality differentiation not yet visible to buyers. Evaluation frameworks needed.' },
      demand: { score: 61, trend: 'rising', trendValue: 19, synthesis: 'Strong institutional interest but procurement criteria underdeveloped. Early adopters piloting broadly. Evidence requirements emerging.' },
      policy: { score: 65, trend: 'rising', trendValue: 14, synthesis: 'FAFSA simplification creating tailwinds. State completion incentives increasing. Data sharing policies improving but still fragmented.' },
      capacity: { score: 48, trend: 'declining', trendValue: -6, synthesis: 'Advisor-to-student ratios remain problematic. Technology adoption uneven. Training infrastructure for AI-augmented advising lacking.' },
      cadence: { score: 58, trend: 'rising', trendValue: 8, synthesis: 'Faster iteration cycles possible with SaaS models. Annual contracting still dominant. Pilot-to-scale conversion improving.' },
      competition: { score: 45, trend: 'rising', trendValue: 32, synthesis: 'Highly fragmented market with many new entrants. Incumbent SIS vendors adding advising features. Consolidation likely within 24 months.' },
      equity: { score: 42, trend: 'stable', trendValue: 2, synthesis: 'AI advising reaching more students but quality varies. Low-income and first-gen students benefiting from scaled outreach. Human touchpoint gaps emerging.' },
    },
    'learning-mobility': {
      supply: { score: 48, trend: 'rising', trendValue: 15, synthesis: 'Credit mapping tools improving but interoperability limited. Registrar system vendors slow to open APIs. Credential transparency infrastructure developing.' },
      demand: { score: 55, trend: 'rising', trendValue: 12, synthesis: 'Transfer student advocates driving demand. Institutions recognizing enrollment potential. Procurement pathways unclear for many tools.' },
      policy: { score: 71, trend: 'rising', trendValue: 25, synthesis: 'Transfer credit policies advancing in priority states. Common course numbering gaining traction. Implementation guidance still thin.' },
      capacity: { score: 44, trend: 'stable', trendValue: -3, synthesis: 'Registrar offices understaffed and change-resistant. Technical integration burden high. Champions emerging but institutional inertia significant.' },
      cadence: { score: 50, trend: 'stable', trendValue: 0, synthesis: 'Long adoption cycles driven by registrar system contracts. Academic calendar creates evaluation windows. Multi-year horizons required.' },
      competition: { score: 51, trend: 'rising', trendValue: 18, synthesis: 'Emerging category with unclear boundaries. SIS vendors, startups, and consortia all active. Standards convergence needed.' },
      equity: { score: 38, trend: 'declining', trendValue: -5, synthesis: 'Credit loss disproportionately affecting low-income transfer students. Tool adoption concentrated at well-resourced institutions. Equity-focused intervention critical.' },
    },
  };

  const priorityConfig = configs[priorityId] || configs['core-instruction'];

  // Helper to get status from score
  const getStatus = (score: number): 'healthy' | 'attention' | 'alert' => {
    if (score >= 65) return 'healthy';
    if (score >= 50) return 'attention';
    return 'alert';
  };

  const baseSignals: SignalFamily[] = [
    {
      id: 'supply',
      name: 'Supply Maturity',
      shortName: 'Supply',
      score: priorityConfig.supply?.score || 70,
      confidence: 82,
      trend: priorityConfig.supply?.trend || 'stable',
      trendValue: priorityConfig.supply?.trendValue || 5,
      status: getStatus(priorityConfig.supply?.score || 70),
      synthesis: priorityConfig.supply?.synthesis || 'Supply conditions developing.',
      summary: priorityConfig.supply?.synthesis || 'Supply conditions developing.',
      definition: 'Supply Maturity measures whether enough fit-for-purpose solutions exist at price points institutions can afford. It tracks qualified vendor count, price distribution, evidence of efficacy, and technical interoperability.',
      whyItMatters: 'When supply maturity is low, demand-side investment is premature—there is nothing quality to buy. When high, focus shifts to adoption acceleration and market-making.',
      sources: {
        practitionerVoice: {
          signalCount: 312,
          initiatives: ['TNTP Implementation Reviews', 'TeachingWorks Quality Indicators', 'HQIQ Selection Criteria'],
        },
        institutionalData: {
          feedTypes: ['Procurement Records', 'Vendor Registry', 'Price Benchmarking'],
        },
        triangulationNote: 'Practitioner quality assessments align with procurement data patterns. Price signals corroborated by vendor disclosure.',
      },
      metrics: [
        { name: 'Qualified Solution Count', value: 56, trend: 'rising', trendValue: 8, confidence: 78, sourceNote: 'Illustrative' },
        { name: 'Median Price ($/learner)', value: 42, unit: '$', trend: 'declining', trendValue: -12, confidence: 72, sourceNote: 'Illustrative' },
        { name: 'Evidence-Rated Solutions', value: 23, trend: 'rising', trendValue: 15, confidence: 85, sourceNote: 'Illustrative' },
        { name: 'Interoperability Index', value: 78, trend: 'rising', trendValue: 6, confidence: 88, sourceNote: 'Illustrative' },
      ],
      connectedSignals: ['demand', 'competition', 'capacity'],
      relatedSignals: ['demand', 'competition', 'capacity'],
      keyObservations: [
        'Evidence-rated solutions now available at competitive price points',
        'Category maturity enabling shift from development to adoption focus',
        'Interoperability improvements reducing integration burden',
      ],
    },
    {
      id: 'demand',
      name: 'Demand & Adoption',
      shortName: 'Demand',
      score: priorityConfig.demand?.score || 65,
      confidence: 78,
      trend: priorityConfig.demand?.trend || 'rising',
      trendValue: priorityConfig.demand?.trendValue || 12,
      status: getStatus(priorityConfig.demand?.score || 65),
      synthesis: priorityConfig.demand?.synthesis || 'Demand signals strengthening.',
      summary: priorityConfig.demand?.synthesis || 'Demand signals strengthening.',
      definition: 'Demand & Adoption tracks the volume and sophistication of buyer activity—RFPs issued, procurement decisions made, implementation depth, and actual usage intensity.',
      whyItMatters: 'Strong demand signals validate field movement. Weak signals suggest demand cultivation before supply-side investment.',
      sources: {
        practitionerVoice: {
          signalCount: 428,
          initiatives: ['Educator Survey Panel', 'Implementation Partner Feedback', 'Usage Telemetry Interviews'],
        },
        institutionalData: {
          feedTypes: ['RFP Aggregator', 'Contract Database', 'Usage Analytics'],
        },
        triangulationNote: 'Procurement wins tracking with practitioner satisfaction. Usage intensity gaps suggest implementation support needs.',
      },
      metrics: [
        { name: 'RFP Volume (quarterly)', value: 847, trend: 'rising', trendValue: 23, confidence: 88, sourceNote: 'Illustrative' },
        { name: 'Procurement Wins', value: 234, trend: 'rising', trendValue: 15, confidence: 75, sourceNote: 'Illustrative' },
        { name: 'Usage Intensity', value: 67, unit: '%', trend: 'stable', trendValue: 2, confidence: 65, sourceNote: 'Illustrative' },
        { name: 'Educator Satisfaction', value: 72, trend: 'rising', trendValue: 8, confidence: 71, sourceNote: 'Illustrative' },
      ],
      connectedSignals: ['supply', 'capacity', 'policy'],
      relatedSignals: ['supply', 'capacity', 'policy'],
      keyObservations: [
        'RFP volume up sharply with increased specificity',
        'District sophistication improving in procurement criteria',
        'Usage intensity gaps suggest implementation support needs',
      ],
    },
    {
      id: 'policy',
      name: 'Policy & Public Funding',
      shortName: 'Policy',
      score: priorityConfig.policy?.score || 68,
      confidence: 85,
      trend: priorityConfig.policy?.trend || 'rising',
      trendValue: priorityConfig.policy?.trendValue || 18,
      status: getStatus(priorityConfig.policy?.score || 68),
      synthesis: priorityConfig.policy?.synthesis || 'Policy environment favorable.',
      summary: priorityConfig.policy?.synthesis || 'Policy environment favorable.',
      definition: 'Policy & Public Funding monitors legislative and regulatory changes, appropriations, and the critical conversion rate from policy passage to actual procurement behavior.',
      whyItMatters: 'Policy can accelerate or constrain market development. Understanding policy-to-procurement conversion reveals whether legislative wins translate to field movement.',
      sources: {
        practitionerVoice: {
          signalCount: 156,
          initiatives: ['Policy Advocate Interviews', 'State Lead Convenings', 'Implementation Case Studies'],
        },
        institutionalData: {
          feedTypes: ['ECS Policy Tracker', 'Federal Appropriations', 'State Budget Analysis'],
        },
        triangulationNote: 'Policy advocate optimism validated by budget line growth. Conversion rate data reveals implementation gaps.',
      },
      metrics: [
        { name: 'Aligned Policy Changes', value: 12, trend: 'rising', trendValue: 33, confidence: 90, sourceNote: 'Illustrative' },
        { name: 'Appropriations ($M)', value: 523, unit: '$M', trend: 'rising', trendValue: 12, confidence: 95, sourceNote: 'Illustrative' },
        { name: 'Policy-to-Procurement Rate', value: 42, unit: '%', trend: 'rising', trendValue: 8, confidence: 72, sourceNote: 'Illustrative' },
        { name: 'States with Aligned Policy', value: 18, trend: 'rising', trendValue: 5, confidence: 88, sourceNote: 'Illustrative' },
      ],
      connectedSignals: ['demand', 'capacity', 'equity'],
      relatedSignals: ['demand', 'capacity', 'equity'],
      keyObservations: [
        'Multiple states advancing aligned instructional materials policies',
        'Federal appropriations committee markup favorable',
        'Policy-to-procurement conversion rate improving steadily',
      ],
      thresholds: [
        { description: 'Policy-to-procurement conversion exceeds 50%', status: 'approaching', response: 'Shift investment from policy advocacy to implementation support' },
      ],
    },
    {
      id: 'capacity',
      name: 'Capacity to Implement',
      shortName: 'Capacity',
      score: priorityConfig.capacity?.score || 52,
      confidence: 71,
      trend: priorityConfig.capacity?.trend || 'declining',
      trendValue: priorityConfig.capacity?.trendValue || -6,
      status: getStatus(priorityConfig.capacity?.score || 52),
      synthesis: priorityConfig.capacity?.synthesis || 'Implementation capacity constrained.',
      summary: priorityConfig.capacity?.synthesis || 'Implementation capacity constrained.',
      definition: 'Capacity to Implement measures whether institutions have the staffing, technical infrastructure, and change-management resources to successfully adopt and sustain new solutions.',
      whyItMatters: 'Even with perfect supply and strong demand, adoption fails without implementation capacity. This signal identifies whether the system is ready to absorb new tools.',
      sources: {
        practitionerVoice: {
          signalCount: 387,
          initiatives: ['District Readiness Assessments', 'Implementation Partner Reports', 'Change Management Surveys'],
        },
        institutionalData: {
          feedTypes: ['HR Data Collaborative', 'Technical Audit Results', 'Partner Registry'],
        },
        triangulationNote: 'Practitioner strain reports confirmed by staffing data. Integration burden metrics align with implementation timeline slippage.',
      },
      metrics: [
        { name: 'Readiness Score', value: 58, trend: 'stable', trendValue: 2, confidence: 68, sourceNote: 'Illustrative' },
        { name: 'Staffing Index', value: 45, trend: 'declining', trendValue: -12, confidence: 82, sourceNote: 'Illustrative' },
        { name: 'Integration Burden', value: 72, trend: 'rising', trendValue: 8, confidence: 75, sourceNote: 'Illustrative' },
        { name: 'Implementation Partner Density', value: 34, trend: 'rising', trendValue: 15, confidence: 65, sourceNote: 'Illustrative' },
      ],
      connectedSignals: ['supply', 'demand', 'cadence'],
      relatedSignals: ['supply', 'demand', 'cadence'],
      keyObservations: [
        'Staffing shortages remain the binding constraint',
        'Integration burden slowing adoption despite strong supply',
        'Implementation partner density improving in key markets',
      ],
      thresholds: [
        { description: 'Staffing Index below 40 for 2 quarters', status: 'alert', response: 'Prioritize capacity-building investments before scaling adoption' },
      ],
    },
    {
      id: 'cadence',
      name: 'Cadence',
      shortName: 'Cadence',
      score: priorityConfig.cadence?.score || 60,
      confidence: 74,
      trend: priorityConfig.cadence?.trend || 'stable',
      trendValue: priorityConfig.cadence?.trendValue || -2,
      status: getStatus(priorityConfig.cadence?.score || 60),
      synthesis: priorityConfig.cadence?.synthesis || 'Market rhythms stable.',
      summary: priorityConfig.cadence?.synthesis || 'Market rhythms stable.',
      definition: 'Cadence tracks the timing dynamics of the market—how long adoption cycles take, seasonal patterns, and the renewal and churn behavior that indicates solution stickiness.',
      whyItMatters: 'Understanding cadence prevents mistaking timing for signal. A flat quarter in a seasonal market is not decline; a quick cycle in a long-cycle market may indicate shallow adoption.',
      sources: {
        practitionerVoice: {
          signalCount: 145,
          initiatives: ['Procurement Officer Interviews', 'Budget Cycle Analysis', 'Renewal Decision Studies'],
        },
        institutionalData: {
          feedTypes: ['Procurement Cycle Database', 'Contract Renewal Records', 'Historical Pattern Analysis'],
        },
        triangulationNote: 'Practitioner timeline expectations match historical procurement patterns. Renewal decisions align with satisfaction signals.',
      },
      metrics: [
        { name: 'Avg Cycle Length (months)', value: 14, trend: 'declining', trendValue: -8, confidence: 78, sourceNote: 'Illustrative' },
        { name: 'Renewal Rate', value: 78, unit: '%', trend: 'stable', trendValue: 2, confidence: 85, sourceNote: 'Illustrative' },
        { name: 'Churn Rate', value: 12, unit: '%', trend: 'declining', trendValue: -3, confidence: 80, sourceNote: 'Illustrative' },
        { name: 'Seasonality Index', value: 0.72, trend: 'stable', trendValue: 0, confidence: 92, sourceNote: 'Illustrative' },
      ],
      connectedSignals: ['demand', 'capacity'],
      relatedSignals: ['demand', 'capacity'],
      keyObservations: [
        'Adoption cycles shortening slightly but still anchored to budget rhythms',
        'Renewal rates healthy indicating solution stickiness',
        'Seasonality patterns predictable enabling strategic timing',
      ],
    },
    {
      id: 'competition',
      name: 'Competition & Substitution',
      shortName: 'Competition',
      score: priorityConfig.competition?.score || 65,
      confidence: 69,
      trend: priorityConfig.competition?.trend || 'stable',
      trendValue: priorityConfig.competition?.trendValue || 5,
      status: getStatus(priorityConfig.competition?.score || 65),
      synthesis: priorityConfig.competition?.synthesis || 'Competitive dynamics healthy.',
      summary: priorityConfig.competition?.synthesis || 'Competitive dynamics healthy.',
      definition: 'Competition & Substitution examines market structure—the number of competitors, relative strength, switching costs, and whether a clear category is forming.',
      whyItMatters: 'Healthy competition drives quality and price improvement. Too little suggests market-making need; too much consolidation risks capture.',
      sources: {
        practitionerVoice: {
          signalCount: 198,
          initiatives: ['Buyer Perception Studies', 'Switching Cost Surveys', 'Category Definition Research'],
        },
        institutionalData: {
          feedTypes: ['Market Share Analysis', 'M&A Tracker', 'Vendor Registry'],
        },
        triangulationNote: 'Buyer perceptions of switching costs match contract analysis. Market share shifts corroborated by RFP win patterns.',
      },
      metrics: [
        { name: 'Top 3 Market Share', value: 52, unit: '%', trend: 'rising', trendValue: 8, confidence: 72, sourceNote: 'Illustrative' },
        { name: 'Switching Cost Index', value: 67, trend: 'stable', trendValue: 2, confidence: 65, sourceNote: 'Illustrative' },
        { name: 'Category Maturity', value: 74, trend: 'rising', trendValue: 6, confidence: 78, sourceNote: 'Illustrative' },
        { name: 'Active Competitors', value: 23, trend: 'declining', trendValue: -4, confidence: 88, sourceNote: 'Illustrative' },
      ],
      connectedSignals: ['supply', 'demand'],
      relatedSignals: ['supply', 'demand'],
      keyObservations: [
        'Healthy competition driving quality improvement',
        'Category consolidation beginning—monitoring for market power',
        'Switching costs moderate enabling buyer choice',
      ],
    },
    {
      id: 'equity',
      name: 'Equity & Access',
      shortName: 'Equity',
      score: priorityConfig.equity?.score || 48,
      confidence: 76,
      trend: priorityConfig.equity?.trend || 'stable',
      trendValue: priorityConfig.equity?.trendValue || 3,
      status: getStatus(priorityConfig.equity?.score || 48),
      synthesis: priorityConfig.equity?.synthesis || 'Equity gaps require attention.',
      summary: priorityConfig.equity?.synthesis || 'Equity gaps require attention.',
      definition: 'Equity & Access disaggregates all other signals by population—tracking whether gains reach historically underserved communities or concentrate among the already-advantaged.',
      whyItMatters: 'Aggregate improvement that masks deepening inequality is not success. This signal ensures the Foundation\'s equity commitment is reflected in market movement.',
      sources: {
        practitionerVoice: {
          signalCount: 267,
          initiatives: ['Equity-Focused Site Visits', 'Community Voice Panels', 'Access Barrier Studies'],
        },
        institutionalData: {
          feedTypes: ['Disaggregated Adoption Data', 'Price Equity Analysis', 'Accessibility Audits'],
        },
        triangulationNote: 'Community voice signals align with disaggregated adoption data. Price accessibility confirmed by cost-per-learner analysis.',
      },
      metrics: [
        { name: 'Access Gap Index', value: 28, trend: 'declining', trendValue: -4, confidence: 82, sourceNote: 'Illustrative' },
        { name: 'Cost Equity Ratio', value: 0.72, trend: 'rising', trendValue: 5, confidence: 70, sourceNote: 'Illustrative' },
        { name: 'Language Coverage', value: 67, unit: '%', trend: 'rising', trendValue: 12, confidence: 78, sourceNote: 'Illustrative' },
        { name: 'Accessibility Score', value: 71, trend: 'rising', trendValue: 8, confidence: 85, sourceNote: 'Illustrative' },
      ],
      connectedSignals: ['supply', 'demand', 'policy', 'capacity'],
      relatedSignals: ['supply', 'demand', 'policy', 'capacity'],
      keyObservations: [
        'Persistent gaps between urban and rural adoption',
        'Title I schools showing improved access but implementation depth lagging',
        'Language coverage improving but accessibility requires continued focus',
      ],
      thresholds: [
        { description: 'Access Gap Index above 25 for 3 quarters', status: 'alert', response: 'Redesign intervention approach with targeted equity investments' },
      ],
    },
  ];

  return baseSignals;
};

// Signal family names for orientation preview
export const signalFamilyNames = [
  'Supply Maturity',
  'Demand & Adoption',
  'Policy & Public Funding',
  'Capacity to Implement',
  'Cadence',
  'Competition & Substitution',
  'Equity & Access',
];

// Future signals (gated)
export const futureSignals = [
  { id: 'talent', name: 'Talent Pipeline', availableDate: 'Q2 2025' },
  { id: 'research', name: 'Research Translation', availableDate: 'Q3 2025' },
  { id: 'infrastructure', name: 'Infrastructure Readiness', availableDate: 'Q4 2025' },
];
