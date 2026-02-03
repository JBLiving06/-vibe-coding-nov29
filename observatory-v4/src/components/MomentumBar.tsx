import { motion } from 'framer-motion';
import { momentumPoints } from '../data/priorities';

/**
 * E-W Momentum Points - The learner journey across the top
 */
export default function MomentumBar() {
  return (
    <motion.div
      className="relative bg-paper-warm border border-ink-200 rounded-lg p-4 lg:p-5 mb-6 flex items-center justify-between"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* Label */}
      <span className="absolute -top-2.5 left-6 bg-paper-warm px-2 font-mono text-[0.65rem] font-medium tracking-[0.1em] uppercase text-ink-500">
        Prioritized E-W Momentum Points
      </span>

      {/* Connection Line */}
      <div className="absolute top-1/2 left-6 right-6 h-0.5 bg-gradient-to-r from-ink-300 to-accent -translate-y-1/2 z-0" />

      {/* Momentum Points */}
      {momentumPoints.map((point, index) => (
        <motion.div
          key={point.id}
          className={`relative z-10 px-3 py-2 rounded-md border text-center max-w-[140px] ${
            point.isEnd
              ? 'bg-accent border-accent text-white'
              : 'bg-paper border-ink-200 text-ink-700'
          }`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 + index * 0.1 }}
        >
          <span className={`text-xs leading-tight whitespace-pre-line ${point.isEnd ? 'font-medium' : ''}`}>
            {point.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
