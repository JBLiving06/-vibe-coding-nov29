import type { Priority, MomentumPoint, InfrastructureLayer, EnablementItem, FrameworkItem, DataSource } from '../types';

// E-W Momentum Points - The learner journey
export const momentumPoints: MomentumPoint[] = [
  { id: 'algebra', label: 'Passed Algebra\nby 9th grade' },
  { id: 'gateway', label: 'Completed Gateway\nCourses' },
  { id: 'enrolled', label: 'Enrolled Immediately\nin Postsecondary' },
  { id: 'learning', label: 'Applied Recognized\nLearning' },
  { id: 'credential', label: 'Earned a Credential\nof Value', isEnd: true },
];

// Infrastructure Layer
export const infrastructureLayer: InfrastructureLayer = {
  number: '5',
  title: 'AI & Data Infrastructure',
  description: 'Shared data, evaluation, safety, and integration layer enabling high-quality AI learning at scale',
  metrics: [
    { label: 'Time-to-efficacy target', value: '30-50%' },
    { label: 'Learner reach via infrastructure', value: '40%' },
  ],
};

// Enablement items
export const enablementItems: EnablementItem[] = [
  {
    number: '6',
    title: 'Exemplars, Public Goods, State Policy, Funding, Communications & Engagement',
    status: 'Cross-cutting enablement',
  },
  {
    number: '7',
    title: 'Breakthrough Innovations to Prepare for Future Horizons',
    status: 'To 2045',
  },
];

// PRIORITIES - Names MUST match Gates USP 2030 language EXACTLY
export const priorities: Priority[] = [
  {
    id: 1,
    number: 'Priority 1',
    name: 'Full-Stack Core Instruction & Tutoring',
    title: 'Full-Stack Core Instruction & Tutoring',
    description: 'AI-enabled instruction, integrated tutoring, and adaptive assessment creating personalized, feedback-driven learning for K-12 acceleration.',
    signalState: '↑ Rising',
    status: 'healthy',
    trend: 'up',
    hyperscalerRelevance: true,
    metrics: [
      { label: 'Signal State', value: '↑ Rising' },
      { label: 'Students at Scale', value: '7.4M' },
    ],
    summary: 'Strong momentum in HQIM adoption with evidence requirements tightening. Tutoring supply maturing but capacity constraints emerging as the binding factor. Capital alignment strengthening—peer philanthropy following Foundation signals.',
    frameworkExplainer: 'The Observatory tracks seven signal families that together indicate whether market conditions support lasting change. Each signal synthesizes multiple data sources—practitioner interviews, institutional documents, capital tracking, and policy feeds.',
    signals: [
      {
        id: 'supply-1',
        name: 'Supply Maturity',
        state: 'rising',
        stateLabel: '↑ Rising',
        headline: 'HQIM marketplace maturing with clear quality tiers emerging. Evidence-rated solutions now 47, up 12 YoY.',
        metrics: [
          { label: 'Evidence-rated', value: '47' },
          { label: 'Median cost/learner', value: '$18' },
        ],
      },
      {
        id: 'demand-1',
        name: 'Demand & Adoption',
        state: 'rising',
        stateLabel: '↑ Strong',
        headline: 'RFPs increasingly specifying evidence requirements. Implementation depth improving in early-adopter districts.',
        metrics: [
          { label: 'RFPs cite evidence', value: '72%' },
          { label: 'Implementations YoY', value: '+34%' },
        ],
      },
      {
        id: 'policy-1',
        name: 'Policy & Funding',
        state: 'rising',
        stateLabel: '↑ Favorable',
        headline: '12 states now codify evidence requirements in curriculum adoption. State appropriations holding steady.',
        metrics: [
          { label: 'States w/ evidence reqs', value: '12' },
          { label: 'State appropriations', value: '$4.1B' },
        ],
      },
      {
        id: 'capacity-1',
        name: 'Capacity to Implement',
        state: 'watch',
        stateLabel: '⚠ Constrained',
        headline: 'Professional learning infrastructure insufficient for HQIM at scale. The binding constraint on adoption.',
        metrics: [
          { label: 'Adoption:capacity gap', value: '2.1×' },
          { label: 'Districts w/ PL plans', value: '38%' },
        ],
      },
      {
        id: 'cadence-1',
        name: 'Cadence',
        state: 'stable',
        stateLabel: '→ Predictable',
        headline: '3-5 year curriculum cycles create clear adoption windows. Decision cycles compressing in responsive districts.',
        metrics: [
          { label: 'Avg decision cycle', value: '5.2mo' },
          { label: 'Primary windows', value: 'Q1/Q3' },
        ],
      },
      {
        id: 'competition-1',
        name: 'Competition',
        state: 'watch',
        stateLabel: '⟳ Shifting',
        headline: 'Category boundaries blurring as AI platforms absorb point solutions. Incumbent publishers defending through integration.',
        metrics: [
          { label: 'Platform bundling', value: '42%' },
          { label: 'Bundling rate change', value: '+15pp' },
        ],
      },
      {
        id: 'equity-1',
        name: 'Equity & Access',
        state: 'watch',
        stateLabel: '↕ Mixed',
        headline: 'Implementation quality gap wider than adoption gap. Structured approaches showing equity gains when implemented with fidelity.',
        metrics: [
          { label: 'Quality gap', value: '3.1×' },
          { label: 'Rural access gap', value: '34%' },
        ],
      },
      {
        id: 'capital-1',
        name: 'Capital Flows',
        state: 'rising',
        stateLabel: '↑ Aligned',
        headline: 'Peer philanthropy following Foundation signals within expected timeframe. Public sector appropriations stable.',
        metrics: [
          { label: 'Philanthropy Q4', value: '$127M' },
          { label: 'YoY change', value: '+18%' },
        ],
      },
    ],
    institutionalScale: {
      description: '25-40 demonstration sites now active. Implementation reaching 14K-30K elementary and MS students with measurable learning acceleration. Evidence requirements in RFPs creating quality floor.',
      metric: '7.4M',
      metricLabel: 'students at 2030 scale target',
    },
    hyperscalerScale: {
      description: 'Per-student costs declining to $60-80 as platforms scale. Google Classroom and Canvas integrations in development. Platform delivery efficiency improving.',
      metric: '50-67%',
      metricLabel: 'of elementary students reachable via platforms',
    },
  },
  {
    id: 2,
    number: 'Priority 2',
    name: 'AI-Enabled Gateway Math Courses',
    title: 'AI-Enabled Gateway Math Courses',
    description: 'Courseware that transforms course design, elevates instruction, and personalizes student support for postsecondary math success.',
    signalState: '→ Emerging',
    status: 'attention',
    trend: 'stable',
    hyperscalerRelevance: true,
    metrics: [
      { label: 'Signal State', value: '→ Emerging' },
      { label: 'Students Impacted', value: '355K' },
    ],
    summary: 'Courseware solutions proliferating but quality variance high. Community college demand rising. Equity gaps in course success rates require targeted intervention—currently 13-19pp gap.',
    frameworkExplainer: 'Signal data for Gateway Math synthesizes courseware adoption patterns, institutional procurement signals, and student outcome trajectories across 450 target institutions.',
    signals: [
      {
        id: 'supply-2',
        name: 'Supply Maturity',
        state: 'watch',
        stateLabel: '→ Emerging',
        headline: 'Courseware proliferating but quality variance remains high. Few solutions with rigorous efficacy evidence at scale.',
        metrics: [
          { label: 'Active solutions', value: '23' },
          { label: 'Evidence-rated', value: '6' },
        ],
      },
      {
        id: 'demand-2',
        name: 'Demand & Adoption',
        state: 'rising',
        stateLabel: '↑ Growing',
        headline: 'Community college demand for modern math courseware rising. Focus institution adoption accelerating.',
        metrics: [
          { label: 'Institutions active', value: '187' },
          { label: 'YoY adoption', value: '+28%' },
        ],
      },
      {
        id: 'policy-2',
        name: 'Policy & Funding',
        state: 'rising',
        stateLabel: '↑ Supportive',
        headline: 'Gateway course reform gaining legislative momentum. Corequisite models increasingly mandated.',
        metrics: [
          { label: 'States w/ mandates', value: '8' },
          { label: 'State funding', value: '$89M' },
        ],
      },
      {
        id: 'capacity-2',
        name: 'Capacity to Implement',
        state: 'watch',
        stateLabel: '⚠ Limited',
        headline: 'Faculty capacity for courseware implementation lagging. Professional development infrastructure insufficient.',
        metrics: [
          { label: 'Faculty trained', value: '34%' },
          { label: 'Capacity gap', value: '2.3×' },
        ],
      },
      {
        id: 'cadence-2',
        name: 'Cadence',
        state: 'stable',
        stateLabel: '→ Seasonal',
        headline: 'Academic calendar drives predictable adoption rhythm. Fall semester primary decision window.',
        metrics: [
          { label: 'Primary window', value: 'Aug-Oct' },
          { label: 'Avg cycle', value: '6.8mo' },
        ],
      },
      {
        id: 'competition-2',
        name: 'Competition',
        state: 'stable',
        stateLabel: '→ Fragmented',
        headline: 'No dominant player yet. Publishers and ed-tech startups competing for positioning. LMS integration key differentiator.',
        metrics: [
          { label: 'Major players', value: '4' },
          { label: 'Market concentration', value: '38%' },
        ],
      },
      {
        id: 'equity-2',
        name: 'Equity & Access',
        state: 'critical',
        stateLabel: '↓ Critical',
        headline: 'Equity gaps in course success rates 13-19pp. Goal is 50% reduction. Current trajectory insufficient.',
        metrics: [
          { label: 'Current gap', value: '13-19pp' },
          { label: 'YoY change', value: '-2pp' },
        ],
      },
      {
        id: 'capital-2',
        name: 'Capital Flows',
        state: 'stable',
        stateLabel: '→ Moderate',
        headline: 'Development costs $2-3M per course. Student-facing costs trending toward $0. Philanthropic interest growing.',
        metrics: [
          { label: 'Dev cost/course', value: '$2-3M' },
          { label: 'Target student cost', value: '$0' },
        ],
      },
    ],
    institutionalScale: {
      description: '450 institutions targeted for adoption. Current baseline success rates 67-72% at focus institutions. Goal is 80% average course success (10pp increase) with 50% equity gap reduction.',
      metric: '355K',
      metricLabel: 'students impacted by 2030',
    },
    hyperscalerScale: {
      description: 'Learnvia-style transformation of course design at platform level. LMS-embedded adaptive pathways reaching beyond individual institutional adoptions.',
      metric: '450',
      metricLabel: 'institutions at platform scale',
    },
  },
  {
    id: 3,
    number: 'Priority 3',
    name: 'AI-Enabled Personalized Advising',
    title: 'AI-Enabled Personalized Advising',
    description: 'Solutions integrating advising tech, data systems, and human-led models to improve FAFSA completion, enrollment, and credential completion.',
    signalState: '↑ Accelerating',
    status: 'healthy',
    trend: 'up',
    hyperscalerRelevance: true,
    metrics: [
      { label: 'Signal State', value: '↑ Accelerating' },
      { label: 'Reached with LLM', value: '8.6M' },
    ],
    summary: 'AI advising tools proliferating rapidly. Quality differentiation not yet visible to buyers—market noise high. Policy environment increasingly favorable but implementation capacity lagging.',
    frameworkExplainer: 'Advising signals track Pathways, WSI, and DHSS integration patterns alongside LLM-embed adoption curves. Upper bound assumes Google Classroom or Open AI SDK integration.',
    signals: [
      {
        id: 'supply-3',
        name: 'Supply Maturity',
        state: 'watch',
        stateLabel: '→ Nascent',
        headline: 'AI advising tools in early stages. Few evidence-backed options. Quality differentiation not yet visible to buyers.',
        metrics: [
          { label: 'Tools in market', value: '40+' },
          { label: 'Evidence-rated', value: '3' },
        ],
      },
      {
        id: 'demand-3',
        name: 'Demand & Adoption',
        state: 'rising',
        stateLabel: '↑ Accelerating',
        headline: 'High trial rates for AI advising but sustained use uncertain. Institutions seeking FAFSA completion solutions urgently.',
        metrics: [
          { label: 'Trial rate', value: '67%' },
          { label: 'Sustained use', value: '31%' },
        ],
      },
      {
        id: 'policy-3',
        name: 'Policy & Funding',
        state: 'rising',
        stateLabel: '↑ Favorable',
        headline: 'FAFSA simplification creating urgency. State completion initiatives providing funding. Federal attention increasing.',
        metrics: [
          { label: 'States w/ initiatives', value: '14' },
          { label: 'Completion funding', value: '$156M' },
        ],
      },
      {
        id: 'capacity-3',
        name: 'Capacity to Implement',
        state: 'critical',
        stateLabel: '⚠ Severely Constrained',
        headline: 'Advising capacity severely constrained. Student-to-advisor ratios too high. AI seen as necessary force multiplier.',
        metrics: [
          { label: 'Avg ratio', value: '450:1' },
          { label: 'Target ratio', value: '250:1' },
        ],
      },
      {
        id: 'cadence-3',
        name: 'Cadence',
        state: 'watch',
        stateLabel: '⟳ Disrupted',
        headline: 'AI tools disrupting traditional episodic adoption. Continuous rollout expectations clashing with institutional procurement cycles.',
        metrics: [
          { label: 'AI release cadence', value: 'Continuous' },
          { label: 'Procurement cycle', value: '12-18mo' },
        ],
      },
      {
        id: 'competition-3',
        name: 'Competition',
        state: 'watch',
        stateLabel: '⟳ Rapid Entry',
        headline: 'Market noise high. Established SIS vendors adding AI features. Startups competing on LLM capabilities. Consolidation expected.',
        metrics: [
          { label: 'Competitors', value: '40+' },
          { label: 'New entrants YoY', value: '+15' },
        ],
      },
      {
        id: 'equity-3',
        name: 'Equity & Access',
        state: 'watch',
        stateLabel: '↕ Uneven',
        headline: 'Tool adoption concentrated at well-resourced institutions. Equity-focused intervention critical to avoid widening gaps.',
        metrics: [
          { label: 'Adoption gap', value: '2.4×' },
          { label: 'HS student reach', value: '24-59%' },
        ],
      },
      {
        id: 'capital-3',
        name: 'Capital Flows',
        state: 'rising',
        stateLabel: '↑ Strong',
        headline: 'Significant investment flowing to advising tech. $12-20 per student maintaining 20% affordability advantage over traditional.',
        metrics: [
          { label: 'Per student cost', value: '$12-20' },
          { label: 'Cost advantage', value: '20%' },
        ],
      },
    ],
    institutionalScale: {
      description: 'Pathways + WSI starting from 0, goal to reach 35K-8.6M HS students (24-59% of 14.5M). DHSS targeting 300K PS students for first-year retention and completion support.',
      metric: '+5-7pp',
      metricLabel: 'FAFSA completion target',
    },
    hyperscalerScale: {
      description: 'Upper bound assumes LLM embed with Google Classroom or Open AI SDK. 8.6M reach possible with hyperscaler integration (TBD on specific partnerships).',
      metric: '8.6M',
      metricLabel: 'students reachable via LLM scale',
    },
  },
  {
    id: 4,
    number: 'Priority 4',
    name: 'AI-Enabled Learning Mobility',
    title: 'AI-Enabled Learning Mobility',
    description: 'Credit mapping and transfer tools helping institutions evaluate, align, and apply credits efficiently across programs and systems.',
    signalState: '→ Nascent',
    status: 'alert',
    trend: 'stable',
    hyperscalerRelevance: false,
    metrics: [
      { label: 'Signal State', value: '→ Nascent' },
      { label: 'Learners Impacted', value: '1.6M' },
    ],
    summary: 'Transfer pathway policies gaining traction in priority states. Registrar system interoperability emerging as the critical unlock. Equity gaps in credit recognition require targeted intervention.',
    frameworkExplainer: 'Learning Mobility signals track credit mapping tool adoption, CMDT usage patterns, and transfer policy changes across state systems. Currently only ~32% of earned credits apply toward degrees.',
    signals: [
      {
        id: 'supply-4',
        name: 'Supply Maturity',
        state: 'watch',
        stateLabel: '→ Fragmented',
        headline: 'Credit mobility solutions scattered. No dominant model yet. Interoperability between systems remains the core challenge.',
        metrics: [
          { label: 'Active CMDTs', value: '12' },
          { label: 'At scale', value: '0' },
        ],
      },
      {
        id: 'demand-4',
        name: 'Demand & Adoption',
        state: 'stable',
        stateLabel: '→ Lagging',
        headline: 'Demand signals weak. Institutions not prioritizing mobility despite student need. Awareness gap significant.',
        metrics: [
          { label: 'Institutions engaged', value: '18%' },
          { label: 'Credit applicability', value: '32%' },
        ],
      },
      {
        id: 'policy-4',
        name: 'Policy & Funding',
        state: 'watch',
        stateLabel: '↕ Mixed',
        headline: 'Transfer policy progress uneven across states. Some advancing common course numbering; others stalled.',
        metrics: [
          { label: 'States advancing', value: '6' },
          { label: 'State funding', value: '$34M' },
        ],
      },
      {
        id: 'capacity-4',
        name: 'Capacity to Implement',
        state: 'critical',
        stateLabel: '⚠ Minimal',
        headline: 'Minimal infrastructure for mobility support. Registrar systems not designed for interoperability. Technical debt high.',
        metrics: [
          { label: 'Systems interoperable', value: '8%' },
          { label: 'Technical debt', value: 'High' },
        ],
      },
      {
        id: 'cadence-4',
        name: 'Cadence',
        state: 'stable',
        stateLabel: '→ Slow',
        headline: 'Transfer policy changes on multi-year legislative cycles. Institutional articulation agreements equally slow.',
        metrics: [
          { label: 'Policy cycle', value: '2-4yr' },
          { label: 'Articulation avg', value: '18mo' },
        ],
      },
      {
        id: 'competition-4',
        name: 'Competition',
        state: 'stable',
        stateLabel: '→ Open Field',
        headline: 'No dominant player. Space open for Foundation-backed solution to establish standard. First-mover advantage significant.',
        metrics: [
          { label: 'Competition', value: 'Low' },
          { label: 'First-mover value', value: 'High' },
        ],
      },
      {
        id: 'equity-4',
        name: 'Equity & Access',
        state: 'critical',
        stateLabel: '↓ Critical Gap',
        headline: 'Credit loss disproportionately affecting low-income transfer students. On average 10.1 of 31.3 credits don\'t apply toward degree.',
        metrics: [
          { label: 'Credits lost avg', value: '10.1' },
          { label: 'Low-income impact', value: '1.8×' },
        ],
      },
      {
        id: 'capital-4',
        name: 'Capital Flows',
        state: 'watch',
        stateLabel: '→ Insufficient',
        headline: 'Current investment insufficient for infrastructure needed. Costs declining as scale increases—targeting $8-9 per learner.',
        metrics: [
          { label: 'Current cost/learner', value: '$16' },
          { label: 'Target at scale', value: '$8-9' },
        ],
      },
    ],
    institutionalScale: {
      description: 'Starting from 0 CMDT users. Goal is 1.2-1.6M learners using credit mapping and transfer tools by 2030. Represents 8-10% of 15.8M total learners (undergrads + SCNC).',
      metric: '37-45%',
      metricLabel: 'credit applicability target (from 32%)',
    },
    hyperscalerScale: {
      description: 'Platform-embedded credit evaluation reaching beyond individual institutional adoptions. Ellucian, Workday Student, and emerging CLR standards as scaling vectors.',
      metric: '1.6M',
      metricLabel: 'learners impacted at scale',
    },
  },
];

// Signal Framework - EdSolutions' methodology
export const frameworkItems: FrameworkItem[] = [
  {
    number: '01',
    name: 'Supply Maturity',
    description: 'Measures whether enough fit-for-purpose solutions exist at price points institutions can afford. Tracks qualified vendor count, price distribution, evidence of efficacy, and technical interoperability.',
  },
  {
    number: '02',
    name: 'Demand & Adoption',
    description: 'Tracks the volume and sophistication of buyer activity—RFPs issued, procurement decisions made, implementation depth, and actual usage intensity versus stated intent.',
  },
  {
    number: '03',
    name: 'Policy & Public Funding',
    description: 'Monitors legislative and regulatory changes, appropriations levels, and the critical conversion rate from policy passage to actual procurement behavior.',
  },
  {
    number: '04',
    name: 'Capacity to Implement',
    description: 'Assesses whether institutions have the infrastructure, expertise, and change management capability to implement solutions effectively. Often the binding constraint.',
  },
  {
    number: '05',
    name: 'Cadence',
    description: 'Maps the timing patterns of procurement cycles, adoption windows, and decision rhythms. Understanding cadence reveals when markets are receptive to intervention.',
  },
  {
    number: '06',
    name: 'Competition & Substitution',
    description: 'Tracks category dynamics, market concentration, switching costs, and the threat of adjacent solutions or platform bundling displacing targeted interventions.',
  },
  {
    number: '07',
    name: 'Equity & Access',
    description: 'Measures whether market benefits are reaching historically underserved populations. Tracks adoption gaps, implementation quality variance, and outcome disparities.',
  },
];

// Data sources
export const dataSources: DataSource[] = [
  {
    icon: '◉',
    name: 'Practitioner Voice',
    description: 'AI-mediated interviews capturing ground-level market intelligence from educators, administrators, and implementation specialists. Currently: 847 signals across TNTP, TeachingWorks, HQIQ, and direct district partners.',
  },
  {
    icon: '◉',
    name: 'Institutional Documents',
    description: 'RFP analysis, procurement patterns, strategic plans, and implementation reports. Reveals stated priorities and actual purchasing behavior.',
  },
  {
    icon: '◉',
    name: 'Capital Tracking',
    description: 'Philanthropic commitments, public appropriations, and private investment flows. Leading indicator of market trajectory and peer alignment.',
  },
  {
    icon: '◉',
    name: 'Policy Feeds',
    description: 'Legislative tracking, regulatory changes, and state education agency signals. Monitors policy-to-procurement conversion rates.',
  },
  {
    icon: '◉',
    name: 'Market Structure',
    description: 'Vendor landscape analysis, pricing trends, evidence ratings, and interoperability assessments. Tracks supply-side evolution.',
  },
];
