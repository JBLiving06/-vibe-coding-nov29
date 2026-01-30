# Market Signals Observatory - Redesign

A living intelligence surface for education market dynamics. Built for the Gates Foundation's USLT 2030→2045 initiative.

## Design Philosophy

> "The interface must appear to be thinking."

This is not a dashboard. It's an instrument that detects, calibrates, and triggers action.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **TypeScript** - Type safety

## Architecture

```
src/
├── components/
│   ├── WelcomeScreen.tsx      # Opening moment with orienting question
│   ├── Observatory.tsx        # Main view orchestrator
│   ├── Constellation.tsx      # Living network of signal families
│   ├── SignalNode.tsx         # Individual signal node
│   ├── SignalMemo.tsx         # Expanded signal intelligence memo
│   ├── SolutionFilter.tsx     # Priority area tabs
│   ├── CapitalFlowsSummary.tsx # Capital flows sidebar
│   └── EquityLens.tsx         # Equity disaggregation panel
├── data/
│   ├── signals.ts             # Signal families and metrics
│   ├── capitalFlows.ts        # Capital flow data
│   └── equity.ts              # Equity segment data
├── hooks/
│   └── useObservatory.ts      # State management hook
├── lib/
│   └── utils.ts               # Utility functions
├── App.tsx                    # Root component
├── main.tsx                   # Entry point
└── index.css                  # Global styles
```

## Features

### The User Journey (Three Moments)

1. **The Orientation (0-10 seconds)**
   - Orienting question and synthesized answer
   - Clean, warm white aesthetic
   - "Enter the Observatory" call to action

2. **The Living Constellation (10-45 seconds)**
   - Seven signal families as interconnected nodes
   - Breathing animations suggesting continuous sensing
   - Connection lines showing relationships
   - Future signals visible but gated

3. **The Intelligence Memo**
   - Expand any node to see full analysis
   - Synthesis, why it matters, data basis
   - Key metrics with confidence scores
   - Decision thresholds and connected signals

### Signal Families

- Supply Maturity
- Demand & Adoption
- Policy & Public Funding
- Capacity to Implement
- Cadence
- Competition & Substitution
- Equity & Access

### Solution Priority Areas

- K-12 Curriculum & Tutoring
- Postsecondary Courseware & Navigation
- Workforce Pathways
- Assessment & Learning Science

## Deployment

Build the project:

```bash
npm run build
```

The `dist/` folder can be deployed to any static hosting service:
- Netlify (drag and drop)
- Vercel (git integration)
- GitHub Pages
- Any CDN

## Design System

### Colors

- **Background**: Warm whites (`stone-50`, `warm-50`)
- **Text**: Dark warm grays (not pure black)
- **Accent**: Teal for healthy signals, amber for attention
- **Subtle borders**: Nearly invisible, just enough for structure

### Typography

- **Font**: Inter (sans-serif)
- **Monospace**: JetBrains Mono (for data)
- **Hierarchy**: Question → Synthesis → Details

### Animation

- Spring physics for organic feel
- Breathing effects on nodes
- Smooth transitions (200-400ms)
- Pulse effects on connection lines

---

Built by EdSolutions for the Gates Foundation.
