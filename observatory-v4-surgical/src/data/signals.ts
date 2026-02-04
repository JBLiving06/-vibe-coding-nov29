import type { SignalFamily } from '../types';

// Signal data - now representing the 4 solution priorities
export const getSignalFamilies = (priorityId: string): SignalFamily[] => {
  // Base configurations that vary by priority context
  const configs: Record<string, Record<string, Partial<SignalFamily>>> = {
    'core-instruction': {
      priority1: { score: 78, trend: 'rising', trendValue: 12, synthesis: 'Strong momentum in HQIM adoption with evidence requirements tightening. Tutoring supply maturing but capacity constraints emerging as the binding factor.' },
      priority2: { score: 62, trend: 'rising', trendValue: 18, synthesis: 'Courseware market maturing rapidly. AI-enabled solutions entering but evidence base still thin. Price compression beginning.' },
      priority3: { score: 61, trend: 'rising', trendValue: 19, synthesis: 'Strong institutional interest but procurement criteria underdeveloped. Early adopters piloting broadly.' },
      priority4: { score: 55, trend: 'rising', trendValue: 12, synthesis: 'Transfer student advocates driving demand. Institutions recognizing enrollment potential.' },
    },
    'gateway-math': {
      priority1: { score: 73, trend: 'rising', trendValue: 23, synthesis: 'RFP volume up sharply with increased specificity around evidence requirements. Literacy materials leading; math pathways following.' },
      priority2: { score: 74, trend: 'rising', trendValue: 22, synthesis: 'Corequisite remediation policies gaining momentum. State systems standardizing on placement reforms. Budget lines stabilizing.' },
      priority3: { score: 52, trend: 'rising', trendValue: 28, synthesis: 'Rapid supplier entry creating market noise. LLM-powered tools proliferating but quality differentiation not yet visible.' },
      priority4: { score: 48, trend: 'rising', trendValue: 15, synthesis: 'Credit mapping tools improving but interoperability limited. Registrar system vendors slow to open APIs.' },
    },
    'personalized-advising': {
      priority1: { score: 68, trend: 'rising', trendValue: 18, synthesis: 'Three states advancing aligned instructional materials policies. Federal appropriations committee markup favorable.' },
      priority2: { score: 55, trend: 'stable', trendValue: -2, synthesis: 'Faculty adoption mixed. LMS integration improving but instructor support remains a bottleneck.' },
      priority3: { score: 65, trend: 'rising', trendValue: 14, synthesis: 'FAFSA simplification creating tailwinds. State completion incentives increasing. Data sharing policies improving.' },
      priority4: { score: 71, trend: 'rising', trendValue: 25, synthesis: 'Transfer credit policies advancing in priority states. Common course numbering gaining traction.' },
    },
    'learning-mobility': {
      priority1: { score: 52, trend: 'declining', trendValue: -8, synthesis: 'Implementation capacity remains the binding constraint. Staffing shortages acute. Integration burden slowing adoption.' },
      priority2: { score: 58, trend: 'rising', trendValue: 15, synthesis: 'Institutional procurement accelerating. Math departments increasingly receptive to technology-mediated instruction.' },
      priority3: { score: 48, trend: 'declining', trendValue: -6, synthesis: 'Advisor-to-student ratios remain problematic. Technology adoption uneven. Training infrastructure lacking.' },
      priority4: { score: 44, trend: 'stable', trendValue: -3, synthesis: 'Registrar offices understaffed and change-resistant. Technical integration burden high.' },
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
      id: 'priority1',
      name: 'Full-Stack Core Instruction & Tutoring',
      shortName: 'Core Instruction',
      score: priorityConfig.priority1?.score || 70,
      confidence: 82,
      trend: priorityConfig.priority1?.trend || 'stable',
      trendValue: priorityConfig.priority1?.trendValue || 5,
      status: getStatus(priorityConfig.priority1?.score || 70),
      synthesis: priorityConfig.priority1?.synthesis || 'Signal conditions developing.',
      summary: priorityConfig.priority1?.synthesis || 'Signal conditions developing.',
      definition: 'AI-enabled instruction, integrated tutoring, and adaptive assessment creating personalized, feedback-driven learning for K-12 acceleration.',
      whyItMatters: 'Strong instructional core is foundational to all other priorities. When core instruction signals are strong, system capacity for additional interventions increases.',
      sources: {
        practitionerVoice: {
          signalCount: 312,
          initiatives: ['TNTP Implementation Reviews', 'TeachingWorks Quality Indicators', 'HQIQ Selection Criteria'],
        },
        institutionalData: {
          feedTypes: ['Procurement Records', 'Vendor Registry', 'Price Benchmarking'],
        },
        triangulationNote: 'Practitioner quality assessments align with procurement data patterns.',
      },
      metrics: [
        { name: 'Evidence-Rated Solutions', value: 47, trend: 'rising', trendValue: 12, confidence: 78, sourceNote: 'Illustrative' },
        { name: 'Students at Scale', value: 7.4, unit: 'M', trend: 'rising', trendValue: 15, confidence: 85, sourceNote: 'Illustrative' },
        { name: 'Implementation Depth', value: 68, unit: '%', trend: 'rising', trendValue: 8, confidence: 72, sourceNote: 'Illustrative' },
        { name: 'Cost per Learner', value: 18, unit: '$', trend: 'declining', trendValue: -12, confidence: 88, sourceNote: 'Illustrative' },
      ],
      connectedSignals: ['priority2', 'priority3', 'priority4'],
      relatedSignals: ['priority2', 'priority3', 'priority4'],
      keyObservations: [
        'HQIM marketplace maturing with clear quality tiers emerging',
        'Evidence-rated solutions now 47, up 12 YoY',
        'Implementation depth improving in early-adopter districts',
      ],
    },
    {
      id: 'priority2',
      name: 'AI-Enabled Gateway Math Courses',
      shortName: 'Gateway Math',
      score: priorityConfig.priority2?.score || 65,
      confidence: 78,
      trend: priorityConfig.priority2?.trend || 'rising',
      trendValue: priorityConfig.priority2?.trendValue || 12,
      status: getStatus(priorityConfig.priority2?.score || 65),
      synthesis: priorityConfig.priority2?.synthesis || 'Courseware signals strengthening.',
      summary: priorityConfig.priority2?.synthesis || 'Courseware signals strengthening.',
      definition: 'Courseware that transforms course design, elevates instruction, and personalizes student support for postsecondary math success.',
      whyItMatters: 'Gateway math is the critical bottleneck for credential completion. Success here unlocks downstream mobility.',
      sources: {
        practitionerVoice: {
          signalCount: 428,
          initiatives: ['Faculty Survey Panel', 'Implementation Partner Feedback', 'Student Success Interviews'],
        },
        institutionalData: {
          feedTypes: ['LMS Integration Data', 'Course Pass Rates', 'Enrollment Analytics'],
        },
        triangulationNote: 'Faculty adoption signals align with student outcome improvements.',
      },
      metrics: [
        { name: 'Institutions Active', value: 187, trend: 'rising', trendValue: 28, confidence: 88, sourceNote: 'Illustrative' },
        { name: 'Students Impacted', value: 355, unit: 'K', trend: 'rising', trendValue: 15, confidence: 75, sourceNote: 'Illustrative' },
        { name: 'Course Success Rate', value: 72, unit: '%', trend: 'rising', trendValue: 5, confidence: 82, sourceNote: 'Illustrative' },
        { name: 'Equity Gap', value: 16, unit: 'pp', trend: 'declining', trendValue: -2, confidence: 71, sourceNote: 'Illustrative' },
      ],
      connectedSignals: ['priority1', 'priority3', 'priority4'],
      relatedSignals: ['priority1', 'priority3', 'priority4'],
      keyObservations: [
        'Courseware proliferating but quality variance remains high',
        'Community college demand for modern math courseware rising',
        'Equity gaps in course success rates 13-19pp—goal is 50% reduction',
      ],
    },
    {
      id: 'priority3',
      name: 'AI-Enabled Personalized Advising',
      shortName: 'Advising',
      score: priorityConfig.priority3?.score || 58,
      confidence: 75,
      trend: priorityConfig.priority3?.trend || 'rising',
      trendValue: priorityConfig.priority3?.trendValue || 18,
      status: getStatus(priorityConfig.priority3?.score || 58),
      synthesis: priorityConfig.priority3?.synthesis || 'Advising market developing rapidly.',
      summary: priorityConfig.priority3?.synthesis || 'Advising market developing rapidly.',
      definition: 'Solutions integrating advising tech, data systems, and human-led models to improve FAFSA completion, enrollment, and credential completion.',
      whyItMatters: 'Advising is the connective tissue between enrollment and completion. AI-enabled approaches can dramatically expand reach while maintaining quality.',
      sources: {
        practitionerVoice: {
          signalCount: 267,
          initiatives: ['Advisor Workload Studies', 'Student Experience Surveys', 'FAFSA Completion Tracking'],
        },
        institutionalData: {
          feedTypes: ['SIS Integration Data', 'Completion Rates', 'Engagement Analytics'],
        },
        triangulationNote: 'Advisor capacity constraints confirmed by student engagement data.',
      },
      metrics: [
        { name: 'AI Tools in Market', value: 40, trend: 'rising', trendValue: 15, confidence: 72, sourceNote: 'Illustrative' },
        { name: 'Students Reachable', value: 8.6, unit: 'M', trend: 'rising', trendValue: 28, confidence: 68, sourceNote: 'Illustrative' },
        { name: 'FAFSA Completion', value: 61, unit: '%', trend: 'rising', trendValue: 5, confidence: 85, sourceNote: 'Illustrative' },
        { name: 'Advisor Ratio', value: 450, unit: ':1', trend: 'stable', trendValue: -2, confidence: 90, sourceNote: 'Illustrative' },
      ],
      connectedSignals: ['priority1', 'priority2', 'priority4'],
      relatedSignals: ['priority1', 'priority2', 'priority4'],
      keyObservations: [
        'AI advising tools proliferating rapidly—40+ in market',
        'Quality differentiation not yet visible to buyers',
        'Advisor-to-student ratios remain problematic at 450:1',
      ],
    },
    {
      id: 'priority4',
      name: 'AI-Enabled Learning Mobility',
      shortName: 'Learning Mobility',
      score: priorityConfig.priority4?.score || 52,
      confidence: 71,
      trend: priorityConfig.priority4?.trend || 'rising',
      trendValue: priorityConfig.priority4?.trendValue || 12,
      status: getStatus(priorityConfig.priority4?.score || 52),
      synthesis: priorityConfig.priority4?.synthesis || 'Mobility infrastructure emerging.',
      summary: priorityConfig.priority4?.synthesis || 'Mobility infrastructure emerging.',
      definition: 'Credit mapping and transfer tools helping institutions evaluate, align, and apply credits efficiently across programs and systems.',
      whyItMatters: 'Credit loss is a massive hidden tax on learners. Improving mobility directly increases credential completion rates.',
      sources: {
        practitionerVoice: {
          signalCount: 198,
          initiatives: ['Registrar Interviews', 'Transfer Student Studies', 'Policy Advocate Feedback'],
        },
        institutionalData: {
          feedTypes: ['Transfer Credit Data', 'Articulation Agreements', 'Registrar System Audits'],
        },
        triangulationNote: 'Credit loss patterns confirmed by registrar system data.',
      },
      metrics: [
        { name: 'Credit Applicability', value: 32, unit: '%', trend: 'rising', trendValue: 5, confidence: 82, sourceNote: 'Illustrative' },
        { name: 'Credits Lost Avg', value: 10.1, trend: 'declining', trendValue: -8, confidence: 78, sourceNote: 'Illustrative' },
        { name: 'Learners Impacted', value: 1.6, unit: 'M', trend: 'rising', trendValue: 12, confidence: 75, sourceNote: 'Illustrative' },
        { name: 'States Advancing', value: 6, trend: 'rising', trendValue: 2, confidence: 92, sourceNote: 'Illustrative' },
      ],
      connectedSignals: ['priority1', 'priority2', 'priority3'],
      relatedSignals: ['priority1', 'priority2', 'priority3'],
      keyObservations: [
        'Transfer pathway policies gaining traction in priority states',
        'Only ~32% of earned credits currently apply toward degrees',
        'Registrar system interoperability is the critical unlock',
      ],
    },
  ];

  return baseSignals;
};

// Signal family names for orientation preview - now 4 solution priorities
export const signalFamilyNames = [
  'Full-Stack Core Instruction & Tutoring',
  'AI-Enabled Gateway Math Courses',
  'AI-Enabled Personalized Advising',
  'AI-Enabled Learning Mobility',
];

// Future signals (gated)
export const futureSignals = [
  { id: 'talent', name: 'Talent Pipeline', availableDate: 'Q2 2025' },
  { id: 'research', name: 'Research Translation', availableDate: 'Q3 2025' },
  { id: 'infrastructure', name: 'Infrastructure Readiness', availableDate: 'Q4 2025' },
];
