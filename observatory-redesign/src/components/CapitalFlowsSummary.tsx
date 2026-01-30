import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, DollarSign } from 'lucide-react';
import { getCapitalFlows, getCapitalSummary } from '../data/capitalFlows';
import { cn, formatCurrency } from '../lib/utils';

interface CapitalFlowsSummaryProps {
  priorityId: string;
}

export default function CapitalFlowsSummary({ priorityId }: CapitalFlowsSummaryProps) {
  const flows = getCapitalFlows(priorityId);
  const summary = getCapitalSummary(priorityId);

  const TrendIcon = ({ trend }: { trend: string }) => {
    if (trend === 'rising') return <TrendingUp className="w-3 h-3 text-signal-healthy" />;
    if (trend === 'declining') return <TrendingDown className="w-3 h-3 text-signal-alert" />;
    return <Minus className="w-3 h-3 text-signal-attention" />;
  };

  return (
    <motion.div
      className="bg-white rounded-xl border border-warm-200/50 p-5"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-accent-gold/10 flex items-center justify-center">
          <DollarSign className="w-4 h-4 text-accent-gold" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-warm-800">Capital Flows</h3>
          <p className="text-xs text-warm-500">Q1 2025</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mb-4 p-3 bg-warm-50 rounded-lg">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-xs text-warm-500">Co-investment Multiplier</span>
          <span className="text-lg font-bold text-accent-gold">{summary.coInvestmentMultiplier}x</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-warm-500">YTD Total</span>
          <span className="text-sm font-semibold text-warm-700">{formatCurrency(summary.totalYtd)}</span>
        </div>
      </div>

      {/* Flow Breakdown */}
      <div className="space-y-3">
        {flows.map((flow, index) => (
          <motion.div
            key={flow.id}
            className="flex items-center justify-between py-2 border-b border-warm-100 last:border-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <div className="flex items-center gap-2">
              <TrendIcon trend={flow.trend} />
              <span className="text-sm text-warm-700">{flow.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-warm-800 font-mono">
                ${flow.currentQuarter}M
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Interpretation */}
      <motion.p
        className="mt-4 text-xs text-warm-600 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {summary.interpretation}
      </motion.p>
    </motion.div>
  );
}
