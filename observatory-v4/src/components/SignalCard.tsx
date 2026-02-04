import { motion } from 'framer-motion';
import type { Signal, SignalState } from '../types';

interface SignalCardProps {
  signal: Signal;
}

const stateStyles: Record<SignalState, { bg: string; text: string; border: string }> = {
  rising: {
    bg: 'bg-signal-healthy/10',
    text: 'text-signal-healthy',
    border: 'border-signal-healthy/20',
  },
  stable: {
    bg: 'bg-warm-100',
    text: 'text-warm-600',
    border: 'border-warm-200',
  },
  watch: {
    bg: 'bg-signal-attention/10',
    text: 'text-signal-attention',
    border: 'border-signal-attention/20',
  },
  critical: {
    bg: 'bg-signal-alert/10',
    text: 'text-signal-alert',
    border: 'border-signal-alert/20',
  },
};

/**
 * SignalCard - Individual signal family display
 * Shows the signal state, headline, and key metrics
 */
export default function SignalCard({ signal }: SignalCardProps) {
  const styles = stateStyles[signal.state];

  return (
    <motion.div
      className="bg-white/80 backdrop-blur-sm p-5 hover:bg-white transition-all duration-300 cursor-pointer group"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <span className="font-semibold text-sm text-warm-800 group-hover:text-accent-primary transition-colors">
          {signal.name}
        </span>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full border ${styles.bg} ${styles.text} ${styles.border}`}
        >
          {signal.stateLabel}
        </span>
      </div>

      {/* Headline */}
      <p className="text-sm text-warm-600 leading-relaxed mb-4 line-clamp-3">
        {signal.headline}
      </p>

      {/* Metrics */}
      <div className="flex gap-4 pt-4 border-t border-warm-200/50">
        {signal.metrics.map((metric, i) => (
          <div key={i} className="flex-1">
            <span className="font-mono text-sm font-semibold text-warm-800 block">
              {metric.value}
            </span>
            <span className="text-[0.65rem] text-warm-500 leading-tight block">
              {metric.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
