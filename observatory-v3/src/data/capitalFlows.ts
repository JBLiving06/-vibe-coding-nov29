import type { CapitalFlow, CapitalSummary } from '../types';

export const getCapitalFlows = (priorityId: string): CapitalFlow[] => {
  const multipliers: Record<string, number> = {
    'core-instruction': 2.8,
    'gateway-math': 2.1,
    'personalized-advising': 1.6,
    'learning-mobility': 1.9,
  };

  const baseFlows: CapitalFlow[] = [
    {
      id: 'philanthropy',
      name: 'Philanthropy',
      description: 'Peer foundation commitments, co-funding density, time-to-follow-on',
      currentQuarter: priorityId === 'core-instruction' ? 127 : priorityId === 'gateway-math' ? 89 : priorityId === 'personalized-advising' ? 78 : 54,
      ytd: priorityId === 'core-instruction' ? 412 : priorityId === 'gateway-math' ? 298 : priorityId === 'personalized-advising' ? 245 : 178,
      trend: 'rising',
      trendValue: priorityId === 'core-instruction' ? 18 : 12,
      coInvestmentMultiplier: multipliers[priorityId] || 2.0,
      keyMetric: 'Time-to-follow-on',
      keyMetricValue: priorityId === 'core-instruction' ? '4.2 months' : '6.1 months',
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
      description: 'Federal and state appropriations, implementation grants, regulatory enables',
      currentQuarter: priorityId === 'core-instruction' ? 234 : priorityId === 'gateway-math' ? 312 : priorityId === 'personalized-advising' ? 189 : 145,
      ytd: priorityId === 'core-instruction' ? 847 : priorityId === 'gateway-math' ? 923 : priorityId === 'personalized-advising' ? 567 : 412,
      trend: priorityId === 'gateway-math' ? 'rising' : 'stable',
      trendValue: priorityId === 'gateway-math' ? 22 : 5,
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
      description: 'Venture/growth investment, M&A activity, category capitalization curves',
      currentQuarter: priorityId === 'core-instruction' ? 89 : priorityId === 'personalized-advising' ? 156 : priorityId === 'gateway-math' ? 112 : 67,
      ytd: priorityId === 'core-instruction' ? 312 : priorityId === 'personalized-advising' ? 489 : priorityId === 'gateway-math' ? 378 : 234,
      trend: priorityId === 'personalized-advising' ? 'rising' : priorityId === 'core-instruction' ? 'declining' : 'stable',
      trendValue: priorityId === 'personalized-advising' ? 34 : priorityId === 'core-instruction' ? -8 : 5,
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

  return baseFlows;
};

export const getCapitalSummary = (priorityId: string): CapitalSummary => {
  const flows = getCapitalFlows(priorityId);
  const totalCurrent = flows.reduce((sum, f) => sum + f.currentQuarter, 0);
  const totalYtd = flows.reduce((sum, f) => sum + f.ytd, 0);
  const philanthropy = flows.find(f => f.id === 'philanthropy');

  const interpretations: Record<string, string> = {
    'core-instruction': 'Capital alignment strengthening. Peer philanthropy following Foundation signals within expected timeframe. Public sector steady. Private caution reflects mature market dynamics.',
    'gateway-math': 'Public investment leading private in this emerging category. Strong policy signals creating follow-on confidence. Monitor for quality differentiation before scaling.',
    'personalized-advising': 'Private markets leading—high conviction in AI-enabled category. Philanthropy following more cautiously. Quality signals needed to sustain investment pace.',
    'learning-mobility': 'Mixed signals across capital types. Public policy momentum not yet translating to private conviction. Philanthropy providing patient capital for infrastructure.',
  };

  return {
    totalCurrent,
    totalYtd,
    coInvestmentMultiplier: philanthropy?.coInvestmentMultiplier || 2.0,
    interpretation: interpretations[priorityId] || interpretations['core-instruction'],
  };
};
