import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Constellation from './Constellation';
import SignalMemo from './SignalMemo';
import SolutionFilter from './SolutionFilter';
import CapitalFlowsSummary from './CapitalFlowsSummary';
import EquityLens from './EquityLens';
import { getSignalFamilies, futureSignals, type SignalFamily } from '../data/signals';

interface ObservatoryProps {
  selectedPriority: string;
  onPriorityChange: (priority: string) => void;
}

export default function Observatory({ selectedPriority, onPriorityChange }: ObservatoryProps) {
  const [selectedSignal, setSelectedSignal] = useState<SignalFamily | null>(null);
  const signals = getSignalFamilies(selectedPriority);

  const handleSignalSelect = (signal: SignalFamily) => {
    setSelectedSignal(signal);
  };

  const handleCloseMemo = () => {
    setSelectedSignal(null);
  };

  return (
    <motion.div
      className="min-h-screen bg-warm-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <header className="sticky top-0 z-40 bg-warm-50/80 backdrop-blur-md border-b border-warm-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <motion.div
                className="w-2 h-2 rounded-full bg-accent-primary"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="font-medium text-warm-700">Market Signals Observatory</span>
            </div>

            {/* Solution Priority Filter */}
            <SolutionFilter
              selectedPriority={selectedPriority}
              onPriorityChange={onPriorityChange}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Capital Flows & Equity */}
          <aside className="lg:col-span-3 space-y-6">
            <CapitalFlowsSummary priorityId={selectedPriority} />
            <EquityLens priorityId={selectedPriority} />
          </aside>

          {/* Main Constellation Area */}
          <div className="lg:col-span-9">
            <Constellation
              signals={signals}
              futureSignals={futureSignals}
              onSignalSelect={handleSignalSelect}
              selectedSignalId={selectedSignal?.id || null}
            />
          </div>
        </div>
      </main>

      {/* Signal Memo Overlay */}
      <AnimatePresence>
        {selectedSignal && (
          <SignalMemo
            signal={selectedSignal}
            allSignals={signals}
            onClose={handleCloseMemo}
            onNavigateToSignal={handleSignalSelect}
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-warm-200/50 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-warm-500">
            <div className="flex items-center gap-2">
              <span>EdSolutions</span>
              <span className="text-warm-300">•</span>
              <span>Market Intelligence for Education Transformation</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-warm-400">USLT 2030→2045</span>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
