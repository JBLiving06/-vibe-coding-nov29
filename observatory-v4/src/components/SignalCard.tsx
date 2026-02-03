import { motion } from 'framer-motion';
import type { Signal, SignalState } from '../types';

interface SignalCardProps {
  signal: Signal;
}

const stateStyles: Record<SignalState, string> = {
  rising: 'bg-signal-rising-bg text-signal-rising',
  stable: 'bg-signal-stable-bg text-signal-stable',
  watch: 'bg-signal-watch-bg text-signal-watch',
  critical: 'bg-signal-critical-bg text-signal-critical',
};

export default function SignalCard({ signal }: SignalCardProps) {
  return (
    <motion.div
      className="bg-paper p-5 hover:bg-paper-warm transition-colors cursor-pointer"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <span className="font-semibold text-sm text-ink-800">
          {signal.name}
        </span>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded ${stateStyles[signal.state]}`}
        >
          {signal.stateLabel}
        </span>
      </div>

      {/* Headline */}
      <p className="text-sm text-ink-600 leading-relaxed mb-4">
        {signal.headline}
      </p>

      {/* Metrics */}
      <div className="flex gap-4 pt-4 border-t border-ink-100">
        {signal.metrics.map((metric, i) => (
          <div key={i} className="flex-1">
            <span className="font-mono text-sm font-medium text-ink-800 block">
              {metric.value}
            </span>
            <span className="text-[0.65rem] text-ink-500">{metric.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
