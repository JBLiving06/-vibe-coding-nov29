export interface EquitySegment {
  id: string;
  name: string;
  adoption: number;
  access: number;
  costEquity: number;
  gapIndex: number;
  trend: 'improving' | 'stable' | 'widening';
}

export const getEquitySegments = (priorityId: string): EquitySegment[] => {
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
      adoption: priorityId === 'k12-curriculum' ? 45 : 38,
      access: 52,
      costEquity: 48,
      gapIndex: 33,
      trend: priorityId === 'k12-curriculum' ? 'improving' : 'widening',
    },
    {
      id: 'title1',
      name: 'Title I Schools',
      adoption: 62,
      access: 58,
      costEquity: 72,
      gapIndex: 16,
      trend: 'improving',
    },
    {
      id: 'ell',
      name: 'English Learners',
      adoption: 41,
      access: 45,
      costEquity: 55,
      gapIndex: 37,
      trend: 'stable',
    },
    {
      id: 'swd',
      name: 'Students w/ Disabilities',
      adoption: 38,
      access: 42,
      costEquity: 61,
      gapIndex: 40,
      trend: 'improving',
    },
  ];

  return baseSegments;
};

export const getEquitySummary = (priorityId: string) => {
  const segments = getEquitySegments(priorityId);
  const avgGapIndex = Math.round(segments.reduce((sum, s) => sum + s.gapIndex, 0) / segments.length);
  const improvingCount = segments.filter(s => s.trend === 'improving').length;
  const wideningCount = segments.filter(s => s.trend === 'widening').length;

  return {
    avgGapIndex,
    improvingCount,
    wideningCount,
    status: avgGapIndex > 25 ? 'alert' : avgGapIndex > 15 ? 'attention' : 'healthy',
    interpretation: avgGapIndex > 25
      ? 'Equity gaps require focused intervention. Aggregate progress masking uneven distribution.'
      : avgGapIndex > 15
      ? 'Equity gaps narrowing but persistent. Continued monitoring and targeted support needed.'
      : 'Equity metrics within acceptable range. Maintain disaggregated tracking.',
  };
};
