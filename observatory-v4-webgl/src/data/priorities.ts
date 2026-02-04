import type { Priority } from '../types';

export const priorities: Priority[] = [
  {
    id: 'core-instruction',
    name: 'Full-Stack Core Instruction & Tutoring',
    shortName: 'Core Instruction',
    description: 'HQIM, Tutoring, Modern Math targeting K-12 acceleration',
    targets: {
      impact: '1.6 grade levels gain in 1 year',
      scale: '7.4M elementary + 4.4M middle school students',
    }
  },
  {
    id: 'gateway-math',
    name: 'AI-Enabled Gateway Math Courses',
    shortName: 'Gateway Math',
    description: 'Courseware transforming postsecondary math success',
    targets: {
      impact: '80% pass rates (10pp increase), 50% equity gap reduction',
      scale: '355K students across 450 institutions',
    }
  },
  {
    id: 'personalized-advising',
    name: 'AI-Enabled Personalized Advising',
    shortName: 'Advising',
    description: 'Pathways, WSI, DHSS for enrollment and completion',
    targets: {
      impact: '+5pp college enrollment, +5-7pp completion rates',
      scale: '8.6M reached with LLM scale',
    }
  },
  {
    id: 'learning-mobility',
    name: 'AI-Enabled Learning Mobility',
    shortName: 'Learning Mobility',
    description: 'Credit mapping and transfer tools',
    targets: {
      impact: '37-45% credit applicability (from 32% baseline)',
      scale: '1.6M students impacted',
    }
  },
];

export const getPriorityById = (id: string): Priority | undefined => {
  return priorities.find(p => p.id === id);
};

// Synthesis statements for orientation "Current Read" by priority
export const prioritySyntheses: Record<string, string> = {
  'core-instruction': 'Strong momentum in HQIM adoption with evidence requirements tightening. Tutoring supply maturing but capacity constraints emerging as the binding factor. Capital alignment strengthening—peer philanthropy following Foundation signals within expected timeframe.',
  'gateway-math': 'Courseware market reaching inflection point. Early efficacy signals positive but institutional integration burden remains high. Private investment accelerating, suggesting market confidence in the category.',
  'personalized-advising': 'AI-enabled advising tools proliferating rapidly. Quality differentiation not yet visible to buyers—market noise high. Policy environment increasingly favorable but implementation capacity lagging.',
  'learning-mobility': 'Transfer pathway policies gaining traction in priority states. Registrar system interoperability emerging as the critical unlock. Equity gaps in credit recognition require targeted intervention.',
};

export const orientingQuestion = "Is the market moving toward Foundation priorities—and where is there more work to do?";

export const framingStatement = "Dashboards report. Instruments detect, calibrate, and trigger action.";
