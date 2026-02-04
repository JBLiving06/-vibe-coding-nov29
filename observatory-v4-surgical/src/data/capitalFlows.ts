import type { CapitalFlow, CapitalSummary } from '../types';

// Now represents Infrastructure Investment rather than Capital Flows
export const getCapitalFlows = (priorityId: string): CapitalFlow[] => {
  const multipliers: Record<string, number> = {
    'core-instruction': 2.8,
    'gateway-math': 2.1,
    'personalized-advising': 1.6,
    'learning-mobility': 1.9,
  };

  const baseFlows: CapitalFlow[] = [
    {
      id: 'data-systems',
      name: 'Data Systems',
      description: 'Interoperable learning records and data portability standards',
      currentQuarter: priorityId === 'core-instruction' ? 127 : priorityId === 'gateway-math' ? 89 : priorityId === 'personalized-advising' ? 78 : 54,
      ytd: priorityId === 'core-instruction' ? 412 : priorityId === 'gateway-math' ? 298 : priorityId === 'personalized-advising' ? 245 : 178,
      trend: 'rising',
      trendValue: priorityId === 'core-instruction' ? 18 : 12,
      coInvestmentMultiplier: multipliers[priorityId] || 2.0,
      keyMetric: 'Interoperability Index',
      keyMetricValue: '68%',
      quarterlyData: [
        { quarter: 'Q1 2024', amount: 92 },
        { quarter: 'Q2 2024', amount: 98 },
        { quarter: 'Q3 2024', amount: 95 },
        { quarter: 'Q4 2024', amount: 112 },
        { quarter: 'Q1 2025', amount: 127 },
      ],
    },
    {
      id: 'trust-frameworks',
      name: 'Trust Frameworks',
      description: 'Credential verification and quality assurance mechanisms',
      currentQuarter: priorityId === 'core-instruction' ? 234 : priorityId === 'gateway-math' ? 312 : priorityId === 'personalized-advising' ? 189 : 145,
      ytd: priorityId === 'core-instruction' ? 847 : priorityId === 'gateway-math' ? 923 : priorityId === 'personalized-advising' ? 567 : 412,
      trend: priorityId === 'gateway-math' ? 'rising' : 'stable',
      trendValue: priorityId === 'gateway-math' ? 22 : 5,
      keyMetric: 'Verification Coverage',
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
      id: 'integration',
      name: 'Integration Layer',
      description: 'API standards and system interconnection protocols',
      currentQuarter: priorityId === 'core-instruction' ? 89 : priorityId === 'personalized-advising' ? 156 : priorityId === 'gateway-math' ? 112 : 67,
      ytd: priorityId === 'core-instruction' ? 312 : priorityId === 'personalized-advising' ? 489 : priorityId === 'gateway-math' ? 378 : 234,
      trend: priorityId === 'personalized-advising' ? 'rising' : priorityId === 'core-instruction' ? 'stable' : 'stable',
      trendValue: priorityId === 'personalized-advising' ? 34 : 5,
      keyMetric: 'API Adoption',
      keyMetricValue: '56%',
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
  const dataSystem = flows.find(f => f.id === 'data-systems');

  const interpretations: Record<string, string> = {
    'core-instruction': 'Infrastructure investment enabling all solution priorities. Data interoperability improving. Integration standards gaining adoption across vendors.',
    'gateway-math': 'LMS integration layer maturing. Courseware interoperability improving with open standards. Trust frameworks for efficacy claims developing.',
    'personalized-advising': 'API standards accelerating in advising tech. Data sharing agreements improving. Student data portability gaining policy support.',
    'learning-mobility': 'Critical infrastructure gap. Registrar system interoperability remains the binding constraint. Credential transparency standards needed.',
  };

  return {
    totalCurrent,
    totalYtd,
    coInvestmentMultiplier: dataSystem?.coInvestmentMultiplier || 2.0,
    interpretation: interpretations[priorityId] || interpretations['core-instruction'],
  };
};
