import { motion } from 'framer-motion';
import type { Priority } from '../types';

interface PriorityCardProps {
  priority: Priority;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

/**
 * Priority Card
 * Each card represents one of the four USP 2030 priorities.
 * The hyperscaler bar on the right edge is NOT decorative - it represents
 * the dual scaling model (institutional + platform embedding).
 */
export default function PriorityCard({
  priority,
  isSelected,
  onClick,
  index,
}: PriorityCardProps) {
  return (
    <motion.div
      className={`group relative bg-paper border rounded-lg overflow-hidden cursor-pointer card-hover flex ${
        isSelected
          ? 'border-accent shadow-lg shadow-accent/10'
          : 'border-ink-200 hover:border-accent'
      }`}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.1 }}
      whileHover={{ y: -2 }}
    >
      {/* Content */}
      <div className="flex-1 p-5">
        <span className="font-mono text-[0.7rem] font-medium text-accent mb-1 block">
          {priority.number}
        </span>
        <h3 className="font-display text-lg font-semibold text-ink-900 leading-tight mb-2">
          {priority.title}
        </h3>
        <p className="text-sm text-ink-600 leading-relaxed mb-4">
          {priority.description}
        </p>

        {/* Metrics */}
        <div className="flex gap-4">
          {priority.metrics.map((metric, i) => (
            <div key={i} className="flex flex-col gap-0.5">
              <span className="font-mono text-sm font-medium text-ink-800">
                {metric.value}
              </span>
              <span className="text-[0.7rem] text-ink-500">{metric.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hyperscaler Bar - NOT decorative */}
      <div
        className="w-2 hyperscaler-bar relative"
        title="Hyperscaler Native Version"
      >
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-[0.55rem] font-medium tracking-[0.1em] uppercase text-white opacity-0 group-hover:opacity-100 transition-opacity">
          Platform Scale
        </span>
      </div>
    </motion.div>
  );
}
