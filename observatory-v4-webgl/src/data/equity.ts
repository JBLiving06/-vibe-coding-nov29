import type { EquitySegment, EquitySummary, EquityIndicator } from '../types';

export const getEquitySegments = (priorityId: string): EquitySegment[] => {
  const adjustments: Record<string, Partial<Record<string, Partial<EquitySegment>>>> = {
    'core-instruction': {
      rural: { adoption: 45, trend: 'improving' },
      title1: { adoption: 62, trend: 'improving' },
    },
    'gateway-math': {
      rural: { adoption: 38, trend: 'stable' },
      ell: { adoption: 35, trend: 'improving' },
    },
    'personalized-advising': {
      rural: { adoption: 42, trend: 'improving' },
      swd: { adoption: 32, trend: 'stable' },
    },
    'learning-mobility': {
      rural: { adoption: 28, trend: 'widening' },
      title1: { adoption: 45, trend: 'stable' },
    },
  };

  const priorityAdjust = adjustments[priorityId] || {};

  const baseSegments: EquitySegment[] = [
    {
      id: 'urban',
      name: 'Urban Districts',
      adoption: 78,
      access: 82,
      costEquity: 65,
      gapIndex: 0,
      trend: 'stable',
    },
    {
      id: 'rural',
      name: 'Rural Districts',
      adoption: priorityAdjust.rural?.adoption || 45,
      access: 52,
      costEquity: 48,
      gapIndex: 33,
      trend: priorityAdjust.rural?.trend || 'stable',
    },
    {
      id: 'title1',
      name: 'Title I Schools',
      adoption: priorityAdjust.title1?.adoption || 62,
      access: 58,
      costEquity: 72,
      gapIndex: 16,
      trend: priorityAdjust.title1?.trend || 'improving',
    },
    {
      id: 'ell',
      name: 'English Learners',
      adoption: priorityAdjust.ell?.adoption || 41,
      access: 45,
      costEquity: 55,
      gapIndex: 37,
      trend: priorityAdjust.ell?.trend || 'stable',
    },
    {
      id: 'swd',
      name: 'Students w/ Disabilities',
      adoption: priorityAdjust.swd?.adoption || 38,
      access: 42,
      costEquity: 61,
      gapIndex: 40,
      trend: priorityAdjust.swd?.trend || 'improving',
    },
  ];

  return baseSegments;
};

export const getEquitySummary = (priorityId: string): EquitySummary => {
  const segments = getEquitySegments(priorityId);
  const avgGapIndex = Math.round(segments.reduce((sum, s) => sum + s.gapIndex, 0) / segments.length);
  const improvingCount = segments.filter(s => s.trend === 'improving').length;
  const wideningCount = segments.filter(s => s.trend === 'widening').length;

  const interpretations: Record<string, string> = {
    'core-instruction': 'Persistent gaps between urban and rural adoption. Title I schools showing improved access. Implementation depth varies by locale. Targeted capacity support needed.',
    'gateway-math': 'Equity gaps narrowing for corequisite models. English learner outcomes improving. Accessibility of AI-enabled tools requires continued monitoring.',
    'personalized-advising': 'AI advising reaching more students but quality varies. Low-income and first-gen students benefiting from scaled outreach. Human touchpoint gaps emerging.',
    'learning-mobility': 'Credit loss disproportionately affecting low-income transfer students. Tool adoption concentrated at well-resourced institutions. Equity-focused intervention critical.',
  };

  let status: 'alert' | 'attention' | 'healthy';
  if (avgGapIndex > 25 || wideningCount > 0) {
    status = 'alert';
  } else if (avgGapIndex > 15) {
    status = 'attention';
  } else {
    status = 'healthy';
  }

  return {
    avgGapIndex,
    improvingCount,
    wideningCount,
    status,
    interpretation: interpretations[priorityId] || interpretations['core-instruction'],
  };
};

// Get equity indicators for sidebar display
export const getEquityIndicators = (priorityId: string): EquityIndicator[] => {
  const baseIndicators: Record<string, EquityIndicator[]> = {
    'core-instruction': [
      {
        id: 'urban-rural',
        dimension: 'Urban vs Rural',
        status: 'concern',
        observation: 'Persistent 33-point adoption gap between urban and rural districts',
        metric: '45% rural vs 78% urban',
        change: '-2%',
      },
      {
        id: 'title1',
        dimension: 'Title I Schools',
        status: 'positive',
        observation: 'Access improving, implementation depth following',
        metric: '62% adoption',
        change: '+8%',
      },
      {
        id: 'ell',
        dimension: 'English Learners',
        status: 'neutral',
        observation: 'Language coverage expanding but quality uneven',
        metric: '67% coverage',
        change: '+12%',
      },
    ],
    'gateway-math': [
      {
        id: 'corequisite',
        dimension: 'Corequisite Models',
        status: 'positive',
        observation: 'Equity gains visible in pass rate parity',
        metric: '0.89 parity index',
        change: '+0.12',
      },
      {
        id: 'ell',
        dimension: 'English Learners',
        status: 'positive',
        observation: 'AI-enabled supports improving outcomes',
        metric: '35% adoption',
        change: '+15%',
      },
      {
        id: 'access',
        dimension: 'Device Access',
        status: 'neutral',
        observation: 'Courseware accessibility varies by institution type',
        metric: '72% full access',
      },
    ],
    'personalized-advising': [
      {
        id: 'first-gen',
        dimension: 'First-Gen Students',
        status: 'positive',
        observation: 'Scaled outreach reaching more students',
        metric: '45% contact rate',
        change: '+22%',
      },
      {
        id: 'human-touch',
        dimension: 'Human Touchpoints',
        status: 'concern',
        observation: 'AI augmentation creating gaps in high-touch needs',
        metric: '12min avg advisor time',
        change: '-8%',
      },
      {
        id: 'low-income',
        dimension: 'Low-Income Students',
        status: 'neutral',
        observation: 'FAFSA simplification benefits reaching target population',
        metric: '58% completion',
        change: '+5%',
      },
    ],
    'learning-mobility': [
      {
        id: 'credit-loss',
        dimension: 'Credit Loss',
        status: 'concern',
        observation: 'Low-income transfer students losing disproportionate credits',
        metric: '23 avg credits lost',
        change: '+2',
      },
      {
        id: 'tool-access',
        dimension: 'Tool Availability',
        status: 'concern',
        observation: 'Adoption concentrated at well-resourced institutions',
        metric: '28% at target schools',
        change: '-3%',
      },
      {
        id: 'articulation',
        dimension: 'Articulation Coverage',
        status: 'neutral',
        observation: 'Pathway mapping improving but gaps remain',
        metric: '45% coverage',
        change: '+8%',
      },
    ],
  };

  return baseIndicators[priorityId] || baseIndicators['core-instruction'];
};
