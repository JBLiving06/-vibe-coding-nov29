import { motion } from 'framer-motion';
import MomentumBar from './MomentumBar';
import PriorityCard from './PriorityCard';
import InfrastructureLayer from './InfrastructureLayer';
import EnablementRow from './EnablementRow';
import { priorities } from '../data/priorities';

interface ArchitectureViewProps {
  selectedPriorityId: number | null;
  onSelectPriority: (id: number) => void;
}

/**
 * Architecture View - This is the PRIMARY view
 * It mirrors the Gates USP 2030 Goal Architecture.
 * The viewer should immediately recognize their own strategy reflected back.
 */
export default function ArchitectureView({
  selectedPriorityId,
  onSelectPriority,
}: ArchitectureViewProps) {
  return (
    <section className="mb-12">
      {/* Header */}
      <motion.header
        className="text-center mb-10 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <span className="font-mono text-xs font-medium tracking-[0.15em] uppercase text-accent mb-2 block">
          USP 2030 Goal Architecture
        </span>
        <h1 className="font-display text-4xl font-semibold text-ink-900 leading-tight mb-4">
          Translating Ambition to Action
        </h1>
        <p className="text-lg text-ink-600 leading-relaxed">
          Market signal profile across the Foundation's four solution priorities,
          infrastructure investments, and cross-cutting enablement.
        </p>
      </motion.header>

      {/* E-W Momentum Points */}
      <MomentumBar />

      {/* Four Priorities Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {priorities.map((priority, index) => (
          <PriorityCard
            key={priority.id}
            priority={priority}
            isSelected={selectedPriorityId === priority.id}
            onClick={() => onSelectPriority(priority.id)}
            index={index}
          />
        ))}
      </motion.div>

      {/* Infrastructure Layer */}
      <InfrastructureLayer />

      {/* Enablement Row */}
      <EnablementRow />
    </section>
  );
}
