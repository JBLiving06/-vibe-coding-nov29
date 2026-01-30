import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, ChevronDown, ChevronUp, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { getEquitySegments, getEquitySummary } from '../data/equity';
import { cn } from '../lib/utils';

interface EquityLensProps {
  priorityId: string;
}

export default function EquityLens({ priorityId }: EquityLensProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const segments = getEquitySegments(priorityId);
  const summary = getEquitySummary(priorityId);

  const statusColors: Record<string, string> = {
    alert: 'bg-signal-alert/10 border-signal-alert/20 text-signal-alert',
    attention: 'bg-signal-attention/10 border-signal-attention/20 text-signal-attention',
    healthy: 'bg-signal-healthy/10 border-signal-healthy/20 text-signal-healthy',
  };

  const TrendIcon = ({ trend }: { trend: string }) => {
    if (trend === 'improving') return <TrendingUp className="w-3 h-3 text-signal-healthy" />;
    if (trend === 'widening') return <TrendingDown className="w-3 h-3 text-signal-alert" />;
    return <Minus className="w-3 h-3 text-signal-attention" />;
  };

  return (
    <motion.div
      className="bg-white rounded-xl border border-warm-200/50 overflow-hidden"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
    >
      {/* Header - Always Visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 flex items-center justify-between hover:bg-warm-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center border",
            statusColors[summary.status]
          )}>
            <Scale className="w-4 h-4" />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-semibold text-warm-800">Equity Lens</h3>
            <p className="text-xs text-warm-500">
              Gap Index: <span className={cn(
                "font-semibold",
                summary.status === 'alert' && "text-signal-alert",
                summary.status === 'attention' && "text-signal-attention",
                summary.status === 'healthy' && "text-signal-healthy"
              )}>{summary.avgGapIndex}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn(
            "text-xs px-2 py-0.5 rounded-full border",
            statusColors[summary.status]
          )}>
            {summary.improvingCount} improving
          </span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-warm-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-warm-400" />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-warm-100"
          >
            <div className="p-5 space-y-4">
              {/* Interpretation */}
              <p className="text-xs text-warm-600 leading-relaxed">
                {summary.interpretation}
              </p>

              {/* Segments */}
              <div className="space-y-3">
                {segments.map((segment, index) => (
                  <motion.div
                    key={segment.id}
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendIcon trend={segment.trend} />
                        <span className="text-sm text-warm-700">{segment.name}</span>
                      </div>
                      <span className={cn(
                        "text-xs font-mono",
                        segment.gapIndex > 30 && "text-signal-alert",
                        segment.gapIndex > 15 && segment.gapIndex <= 30 && "text-signal-attention",
                        segment.gapIndex <= 15 && "text-signal-healthy"
                      )}>
                        Gap: {segment.gapIndex}
                      </span>
                    </div>

                    {/* Mini Progress Bars */}
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <div className="h-1.5 bg-warm-100 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-blue-400 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${segment.adoption}%` }}
                            transition={{ delay: 0.2 + index * 0.05, duration: 0.5 }}
                          />
                        </div>
                        <p className="text-[10px] text-warm-500 mt-1">Adoption {segment.adoption}%</p>
                      </div>
                      <div>
                        <div className="h-1.5 bg-warm-100 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-green-400 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${segment.access}%` }}
                            transition={{ delay: 0.25 + index * 0.05, duration: 0.5 }}
                          />
                        </div>
                        <p className="text-[10px] text-warm-500 mt-1">Access {segment.access}%</p>
                      </div>
                      <div>
                        <div className="h-1.5 bg-warm-100 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-purple-400 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${segment.costEquity}%` }}
                            transition={{ delay: 0.3 + index * 0.05, duration: 0.5 }}
                          />
                        </div>
                        <p className="text-[10px] text-warm-500 mt-1">Cost Eq. {segment.costEquity}%</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
