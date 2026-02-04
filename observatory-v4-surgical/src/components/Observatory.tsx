import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import Constellation from './Constellation';
import SignalMemo from './SignalMemo';
import CapitalFlowsSummary from './sidebar/CapitalFlowsSummary';
import EquityLens from './sidebar/EquityLens';
import DataArchitectureModal from './DataArchitectureModal';
import { getSignalFamilies } from '../data/signals';
import type { SignalFamily } from '../types';

interface ObservatoryProps {
  selectedPriority: string;
  onPriorityChange: (priority: string) => void;
}

export default function Observatory({ selectedPriority, onPriorityChange }: ObservatoryProps) {
  const [selectedSignal, setSelectedSignal] = useState<SignalFamily | null>(null);
  const [isDataArchitectureOpen, setIsDataArchitectureOpen] = useState(false);
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
      <Header
        selectedPriority={selectedPriority}
        onPriorityChange={onPriorityChange}
        onOpenDataArchitecture={() => setIsDataArchitectureOpen(true)}
      />

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

      {/* Data Architecture Modal */}
      <DataArchitectureModal
        isOpen={isDataArchitectureOpen}
        onClose={() => setIsDataArchitectureOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </motion.div>
  );
}
