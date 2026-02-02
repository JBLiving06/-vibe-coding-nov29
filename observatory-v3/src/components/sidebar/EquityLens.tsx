import { motion } from 'framer-motion';
import { Users, AlertTriangle, CheckCircle, MinusCircle, type LucideIcon } from 'lucide-react';
import { getEquityIndicators } from '../../data/equity';
import type { EquityIndicator } from '../../types';

interface EquityLensProps {
  priorityId: string;
}

type IndicatorStatus = 'positive' | 'neutral' | 'concern';

const statusIcons: Record<IndicatorStatus, LucideIcon> = {
  positive: CheckCircle,
  neutral: MinusCircle,
  concern: AlertTriangle,
};

const statusColors: Record<IndicatorStatus, string> = {
  positive: 'text-signal-healthy bg-signal-healthy/10',
  neutral: 'text-signal-attention bg-signal-attention/10',
  concern: 'text-signal-alert bg-signal-alert/10',
};

export default function EquityLens({ priorityId }: EquityLensProps) {
  const indicators = getEquityIndicators(priorityId);

  return (
    <motion.div
      className="bg-white rounded-xl border border-warm-200 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-warm-100">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-accent-primary" />
          <h3 className="text-sm font-semibold text-warm-800">Equity Lens</h3>
        </div>
        <p className="text-xs text-warm-500 mt-0.5">Access & opportunity patterns</p>
      </div>

      {/* Indicators List */}
      <div className="p-3 space-y-2">
        {indicators.map((indicator: EquityIndicator, index: number) => {
          const StatusIcon = statusIcons[indicator.status as IndicatorStatus];
          return (
            <motion.div
              key={indicator.id}
              className="p-3 bg-warm-50 rounded-lg"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="flex items-start gap-3">
                <div className={`p-1.5 rounded-full ${statusColors[indicator.status]}`}>
                  <StatusIcon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-warm-700">{indicator.dimension}</h4>
                  <p className="text-xs text-warm-500 mt-0.5 leading-relaxed">
                    {indicator.observation}
                  </p>
                  {indicator.metric && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs font-semibold text-warm-700">{indicator.metric}</span>
                      {indicator.change && (
                        <span className={`text-xs ${
                          indicator.change.startsWith('+') ? 'text-signal-healthy' :
                          indicator.change.startsWith('-') ? 'text-signal-alert' : 'text-warm-500'
                        }`}>
                          {indicator.change}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Demo Indicator */}
      <div className="px-4 py-2 bg-warm-50 border-t border-warm-100">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-[10px] text-warm-400">Illustrative data</span>
        </div>
      </div>
    </motion.div>
  );
}
