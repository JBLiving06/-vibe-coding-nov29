import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, DollarSign } from 'lucide-react';
import { getCapitalFlows } from '../../data/capitalFlows';
import type { TrendDirection } from '../../types';

interface CapitalFlowsSummaryProps {
  priorityId: string;
}

const trendIcons: Record<TrendDirection, typeof TrendingUp> = {
  rising: TrendingUp,
  stable: Minus,
  declining: TrendingDown,
};

const trendColors: Record<TrendDirection, string> = {
  rising: 'text-signal-healthy',
  stable: 'text-signal-attention',
  declining: 'text-signal-alert',
};

export default function CapitalFlowsSummary({ priorityId }: CapitalFlowsSummaryProps) {
  const flows = getCapitalFlows(priorityId);

  return (
    <motion.div
      className="bg-white rounded-xl border border-warm-200 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-warm-100">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-accent-primary" />
          <h3 className="text-sm font-semibold text-warm-800">Capital Flows</h3>
        </div>
        <p className="text-xs text-warm-500 mt-0.5">Investment patterns & signals</p>
      </div>

      {/* Flows List */}
      <div className="p-3 space-y-2">
        {flows.map((flow, index) => {
          const TrendIcon = trendIcons[flow.trend];
          const trendPercent = flow.trendValue > 0 ? `+${flow.trendValue}%` : `${flow.trendValue}%`;
          return (
            <motion.div
              key={flow.id}
              className="p-3 bg-warm-50 rounded-lg hover:bg-warm-100 transition-colors cursor-pointer"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-warm-700">{flow.name}</span>
                <div className={`flex items-center gap-1 ${trendColors[flow.trend]}`}>
                  <TrendIcon className="w-3 h-3" />
                  <span className="text-xs font-medium">{trendPercent}</span>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-semibold text-warm-800">${flow.currentQuarter}M</span>
                <span className="text-xs text-warm-500">this quarter</span>
              </div>
              <p className="text-xs text-warm-500 mt-1 line-clamp-1">{flow.description}</p>
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
