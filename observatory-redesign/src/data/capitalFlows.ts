export type CapitalFlowType = 'philanthropy' | 'public' | 'private';
export type TrendDirection = 'rising' | 'stable' | 'declining';

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
  coInvestmentMultiplier: number;
  keyMetric: string;
  keyMetricValue: string;
  quarterlyData: QuarterlyData[];
}

export const getCapitalFlows = (priorityId: string): CapitalFlow[] => {
  const multipliers: Record<string, number> = {
    'k12-curriculum': 2.8,
    'postsecondary': 2.1,
    'workforce': 1.6,
    'assessment': 1.9,
  };

  return [
    {
      id: 'philanthropy',
      name: 'Philanthropy',
      description: 'Peer commitments, co-funding density, time-to-follow-on',
      currentQuarter: priorityId === 'k12-curriculum' ? 127 : priorityId === 'postsecondary' ? 89 : 54,
      ytd: priorityId === 'k12-curriculum' ? 412 : priorityId === 'postsecondary' ? 298 : 178,
      trend: 'rising',
      trendValue: 18,
      coInvestmentMultiplier: multipliers[priorityId] || 2.0,
      keyMetric: 'Time-to-follow-on',
      keyMetricValue: '4.2 months',
      quarterlyData: [
        { quarter: 'Q1 2024', amount: 92 },
        { quarter: 'Q2 2024', amount: 98 },
        { quarter: 'Q3 2024', amount: 95 },
        { quarter: 'Q4 2024', amount: 112 },
        { quarter: 'Q1 2025', amount: 127 },
      ],
    },
    {
      id: 'public',
      name: 'Public Sector',
      description: 'Budget lines, implementation grants, regulatory enables',
      currentQuarter: priorityId === 'k12-curriculum' ? 234 : priorityId === 'postsecondary' ? 312 : 145,
      ytd: priorityId === 'k12-curriculum' ? 847 : priorityId === 'postsecondary' ? 923 : 412,
      trend: priorityId === 'postsecondary' ? 'rising' : 'stable',
      trendValue: priorityId === 'postsecondary' ? 22 : 5,
      coInvestmentMultiplier: 1.0, // Public doesn't have co-investment multiplier
      keyMetric: 'Policy-to-procurement',
      keyMetricValue: '42%',
      quarterlyData: [
        { quarter: 'Q1 2024', amount: 198 },
        { quarter: 'Q2 2024', amount: 212 },
        { quarter: 'Q3 2024', amount: 203 },
        { quarter: 'Q4 2024', amount: 245 },
        { quarter: 'Q1 2025', amount: 234 },
      ],
    },
    {
      id: 'private',
      name: 'Private Markets',
      description: 'Venture/growth investment, M&A, category capitalization',
      currentQuarter: priorityId === 'k12-curriculum' ? 89 : priorityId === 'workforce' ? 156 : 67,
      ytd: priorityId === 'k12-curriculum' ? 312 : priorityId === 'workforce' ? 489 : 234,
      trend: priorityId === 'workforce' ? 'rising' : 'declining',
      trendValue: priorityId === 'workforce' ? 34 : -8,
      coInvestmentMultiplier: 0, // Different metric for private
      keyMetric: 'Price compression',
      keyMetricValue: '-12% YoY',
      quarterlyData: [
        { quarter: 'Q1 2024', amount: 78 },
        { quarter: 'Q2 2024', amount: 82 },
        { quarter: 'Q3 2024', amount: 63 },
        { quarter: 'Q4 2024', amount: 71 },
        { quarter: 'Q1 2025', amount: 89 },
      ],
    },
  ];
};

export const getCapitalSummary = (priorityId: string) => {
  const flows = getCapitalFlows(priorityId);
  const totalCurrent = flows.reduce((sum, f) => sum + f.currentQuarter, 0);
  const totalYtd = flows.reduce((sum, f) => sum + f.ytd, 0);
  const philanthropy = flows.find(f => f.id === 'philanthropy');

  return {
    totalCurrent,
    totalYtd,
    coInvestmentMultiplier: philanthropy?.coInvestmentMultiplier || 2.0,
    interpretation: priorityId === 'k12-curriculum'
      ? 'Capital alignment strengthening. Peer philanthropy following Foundation signals within expected timeframe.'
      : priorityId === 'workforce'
      ? 'Private markets leading public investment. Monitor for quality signals before doubling down.'
      : 'Mixed signals. Public sector steady but private caution suggests market uncertainty.',
  };
};
