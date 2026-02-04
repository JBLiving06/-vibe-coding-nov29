import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import DemoBanner from './DemoBanner';
import MomentumTrack from './MomentumTrack';
import PriorityConstellation from './PriorityConstellation';
import InfrastructureSection from './InfrastructureSection';
import EnablementRow from './EnablementRow';
import SignalPanel from './SignalPanel';
import Footer from './Footer';
import { priorities } from '../data/priorities';
import type { Priority } from '../types';

interface ObservatoryProps {
  onOpenFramework: () => void;
  onOpenDataSources: () => void;
}

export default function Observatory({
  onOpenFramework,
  onOpenDataSources,
}: ObservatoryProps) {
  const [selectedPriority, setSelectedPriority] = useState<Priority | null>(null);

  const handleSelectPriority = (priority: Priority) => {
    setSelectedPriority(priority);
    // Scroll to panel after animation
    setTimeout(() => {
      document.getElementById('signal-panel')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  };

  const handleClosePanel = () => {
    setSelectedPriority(null);
  };

  return (
    <motion.div
      className="min-h-screen relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Demo Banner - MUST remain prominent */}
      <DemoBanner />

      {/* Header */}
      <Header
        onOpenFramework={onOpenFramework}
        onOpenDataSources={onOpenDataSources}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Hero Section */}
        <motion.header
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.span
            className="inline-block text-sm font-medium text-accent-primary tracking-wide uppercase mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            USP 2030 Goal Architecture
          </motion.span>
          <motion.h1
            className="font-display text-4xl lg:text-5xl font-semibold text-warm-800 leading-tight mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Translating Ambition to Action
          </motion.h1>
          <motion.p
            className="text-lg text-warm-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Market signal profile across the Foundation's four solution priorities,
            infrastructure investments, and cross-cutting enablement.
          </motion.p>
        </motion.header>

        {/* E→W Momentum Track */}
        <MomentumTrack />

        {/* Priority Constellation */}
        <PriorityConstellation
          priorities={priorities}
          selectedPriority={selectedPriority}
          onSelectPriority={handleSelectPriority}
        />

        {/* Infrastructure Layer - with glowing border effect */}
        <InfrastructureSection />

        {/* Enablement Row */}
        <EnablementRow />

        {/* Signal Panel - appears when priority selected */}
        <AnimatePresence mode="wait">
          {selectedPriority && (
            <SignalPanel
              key={selectedPriority.id}
              priority={selectedPriority}
              onClose={handleClosePanel}
              onOpenFramework={onOpenFramework}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
}
