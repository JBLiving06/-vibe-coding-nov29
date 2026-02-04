import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Zap } from 'lucide-react';
import type { Priority } from '../types';

interface PriorityConstellationProps {
  priorities: Priority[];
  selectedPriority: Priority | null;
  onSelectPriority: (priority: Priority) => void;
}

const statusColors = {
  healthy: 'bg-signal-healthy',
  attention: 'bg-signal-attention',
  alert: 'bg-signal-alert',
};

const statusLabels = {
  healthy: 'Strong Signal',
  attention: 'Watch',
  alert: 'Urgent',
};

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
};

/**
 * PriorityConstellation - The four USP 2030 Solution Priorities
 * Displayed as interactive glass cards with hyperscaler indicators
 */
export default function PriorityConstellation({
  priorities,
  selectedPriority,
  onSelectPriority,
}: PriorityConstellationProps) {
  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      {/* Section Label */}
      <div className="flex items-center gap-2 mb-6">
        <span className="font-mono text-xs text-warm-500 uppercase tracking-widest">
          Solution Priorities
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-warm-300 to-transparent" />
      </div>

      {/* Priority Grid with connecting lines */}
      <div className="relative">
        {/* SVG Connection Lines - visible on larger screens */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
          style={{ zIndex: 0 }}
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(13, 148, 136, 0.3)" />
              <stop offset="50%" stopColor="rgba(217, 119, 6, 0.2)" />
              <stop offset="100%" stopColor="rgba(13, 148, 136, 0.3)" />
            </linearGradient>
          </defs>
          {/* Horizontal connections */}
          <motion.line
            x1="25%" y1="25%" x2="75%" y2="25%"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          />
          <motion.line
            x1="25%" y1="75%" x2="75%" y2="75%"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
          />
          {/* Vertical connections */}
          <motion.line
            x1="25%" y1="25%" x2="25%" y2="75%"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.0, duration: 1 }}
          />
          <motion.line
            x1="75%" y1="25%" x2="75%" y2="75%"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.1, duration: 1 }}
          />
          {/* Diagonal connections */}
          <motion.line
            x1="25%" y1="25%" x2="75%" y2="75%"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          />
          <motion.line
            x1="75%" y1="25%" x2="25%" y2="75%"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.3, duration: 1 }}
          />
        </svg>

        {/* Priority Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {priorities.map((priority, index) => {
            const TrendIcon = trendIcons[priority.trend];
            const isSelected = selectedPriority?.id === priority.id;

            return (
              <motion.button
                key={priority.id}
                onClick={() => onSelectPriority(priority)}
                className={`
                  glass-card p-6 text-left relative overflow-hidden group
                  ${isSelected ? 'ring-2 ring-accent-primary shadow-lg' : ''}
                `}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Hyperscaler Indicator Bar */}
                {priority.hyperscalerRelevance && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-hyperscaler via-hyperscaler-light to-hyperscaler">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                  </div>
                )}

                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {/* Status Indicator */}
                    <div className="relative">
                      <div className={`w-3 h-3 rounded-full ${statusColors[priority.status]}`} />
                      <motion.div
                        className={`absolute inset-0 rounded-full ${statusColors[priority.status]}`}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    <span className="text-xs font-medium text-warm-500 uppercase tracking-wide">
                      {statusLabels[priority.status]}
                    </span>
                  </div>

                  {/* Trend Icon */}
                  <div className={`
                    p-1.5 rounded-full
                    ${priority.trend === 'up' ? 'bg-signal-healthy/10 text-signal-healthy' :
                      priority.trend === 'down' ? 'bg-signal-alert/10 text-signal-alert' :
                      'bg-warm-200 text-warm-500'}
                  `}>
                    <TrendIcon className="w-4 h-4" />
                  </div>
                </div>

                {/* Priority Name */}
                <h3 className="font-display text-xl font-semibold text-warm-800 mb-2 leading-tight">
                  {priority.name}
                </h3>

                {/* Brief Description */}
                <p className="text-sm text-warm-600 mb-4 line-clamp-2">
                  {priority.description}
                </p>

                {/* Hyperscaler Badge */}
                {priority.hyperscalerRelevance && (
                  <div className="flex items-center gap-2 text-xs">
                    <Zap className="w-3.5 h-3.5 text-hyperscaler" />
                    <span className="text-hyperscaler font-medium">Hyperscaler Active</span>
                  </div>
                )}

                {/* Hover Indicator */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs text-accent-primary font-medium">
                    View Signals →
                  </span>
                </div>

                {/* Selection Glow Effect */}
                {isSelected && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-accent-gold/5" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <motion.div
        className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-warm-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-signal-healthy" />
          <span>Strong momentum</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-signal-attention" />
          <span>Needs attention</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-signal-alert" />
          <span>Urgent signals</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-1 bg-gradient-to-r from-hyperscaler to-hyperscaler-light rounded" />
          <span>Hyperscaler activity</span>
        </div>
      </motion.div>
    </motion.section>
  );
}
