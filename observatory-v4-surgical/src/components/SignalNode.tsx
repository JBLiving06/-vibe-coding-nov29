import { motion } from 'framer-motion';
import { Users, Database, TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react';
import type { SignalFamily } from '../types';

interface SignalNodeProps {
  signal: SignalFamily;
  onClick: () => void;
  isSelected: boolean;
}

const trendIcons = {
  rising: TrendingUp,
  stable: Minus,
  declining: TrendingDown,
};

const trendColors = {
  rising: 'text-signal-healthy',
  stable: 'text-signal-attention',
  declining: 'text-signal-alert',
};

const statusColors = {
  healthy: 'border-signal-healthy bg-signal-healthy/10',
  attention: 'border-signal-attention bg-signal-attention/10',
  alert: 'border-signal-alert bg-signal-alert/10',
};

const statusDotColors = {
  healthy: 'bg-signal-healthy',
  attention: 'bg-signal-attention',
  alert: 'bg-signal-alert',
};

export default function SignalNode({ signal, onClick, isSelected }: SignalNodeProps) {
  const TrendIcon = trendIcons[signal.trend];
  const status = signal.status || 'healthy';
  const hasPractitioner = signal.sources.practitionerVoice.signalCount > 0;
  const hasInstitutional = signal.sources.institutionalData.feedTypes.length > 0;

  return (
    <motion.button
      onClick={onClick}
      className={`group relative flex flex-col items-center gap-3 p-4 rounded-2xl transition-all duration-300 ${
        isSelected
          ? 'bg-white shadow-lg ring-2 ring-accent-primary/30'
          : 'hover:bg-white/80 hover:shadow-md'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Main Node Circle */}
      <div
        className={`relative w-20 h-20 rounded-full border-2 flex items-center justify-center transition-colors ${
          statusColors[status]
        }`}
      >
        {/* Status Dot */}
        <motion.div
          className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${statusDotColors[status]}`}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Trend Icon */}
        <TrendIcon className={`w-8 h-8 ${trendColors[signal.trend]}`} />

        {/* Attention Badge */}
        {status === 'attention' && (
          <motion.div
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-signal-attention text-white px-2 py-0.5 rounded-full"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertTriangle className="w-3 h-3" />
          </motion.div>
        )}
      </div>

      {/* Signal Name */}
      <div className="text-center max-w-[140px]">
        <p className="text-sm font-medium text-warm-700 leading-tight">
          {signal.shortName}
        </p>
      </div>

      {/* Source Type Indicators */}
      <div className="flex items-center gap-2">
        {hasPractitioner && (
          <motion.div
            className="flex items-center gap-1 px-2 py-1 bg-teal-100 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            title="Practitioner Voice"
          >
            <Users className="w-3 h-3 text-teal-600" />
            <span className="text-[10px] font-medium text-teal-700">
              {signal.sources.practitionerVoice.signalCount}
            </span>
          </motion.div>
        )}
        {hasInstitutional && (
          <motion.div
            className="flex items-center gap-1 px-2 py-1 bg-amber-100 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            title="Institutional Data"
          >
            <Database className="w-3 h-3 text-amber-600" />
            <span className="text-[10px] font-medium text-amber-700">
              {signal.sources.institutionalData.feedTypes.length}
            </span>
          </motion.div>
        )}
      </div>

      {/* Hover Tooltip */}
      <motion.div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
        initial={false}
      >
        <div className="bg-warm-800 text-warm-50 text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
          <p className="font-medium">{signal.name}</p>
          <p className="text-warm-300 mt-1">Click to explore</p>
        </div>
      </motion.div>
    </motion.button>
  );
}
