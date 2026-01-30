import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronDown, ChevronRight, ArrowRight } from 'lucide-react';
import { type SignalFamily } from '../data/signals';
import { cn, getTrendIcon, getTrendColor, getConfidenceLevel, getStatusColor, formatPercentage } from '../lib/utils';

interface SignalMemoProps {
  signal: SignalFamily;
  allSignals: SignalFamily[];
  onClose: () => void;
  onNavigateToSignal: (signal: SignalFamily) => void;
}

export default function SignalMemo({
  signal,
  allSignals,
  onClose,
  onNavigateToSignal,
}: SignalMemoProps) {
  const [showBasis, setShowBasis] = useState(false);

  const trendIcon = getTrendIcon(signal.trend);
  const trendColor = getTrendColor(signal.trend);
  const confidenceLevel = getConfidenceLevel(signal.confidence);

  const connectedSignals = signal.connectedSignals
    .map(id => allSignals.find(s => s.id === id))
    .filter(Boolean) as SignalFamily[];

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-warm-900/20 backdrop-blur-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Memo Panel */}
      <motion.div
        className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[85vh] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-warm-100">
          <div className="flex items-center gap-4">
            {/* Score Circle */}
            <div className={cn(
              "w-16 h-16 rounded-full flex flex-col items-center justify-center",
              "bg-warm-50 border-2",
              signal.score >= 70 ? "border-signal-healthy" :
              signal.score >= 50 ? "border-signal-attention" : "border-signal-alert"
            )}>
              <span className="text-xl font-bold text-warm-800">{signal.score}</span>
              <span className={cn("text-sm", trendColor)}>{trendIcon}</span>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-warm-900">{signal.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className={cn(
                  "text-xs font-mono px-2 py-0.5 rounded-full",
                  confidenceLevel === 'high' && "bg-signal-healthy/10 text-signal-healthy",
                  confidenceLevel === 'medium' && "bg-signal-attention/10 text-signal-attention",
                  confidenceLevel === 'low' && "bg-signal-alert/10 text-signal-alert"
                )}>
                  {signal.confidence}% confidence
                </span>
                <span className={cn("text-xs", trendColor)}>
                  {formatPercentage(signal.trendValue)} this quarter
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-warm-100 transition-colors"
          >
            <X className="w-5 h-5 text-warm-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Section 1: The Synthesis */}
          <section>
            <p className="text-lg text-warm-700 leading-relaxed">
              {signal.synthesis}
            </p>
          </section>

          {/* Section 2: Why This Matters */}
          <section>
            <h3 className="text-xs font-semibold tracking-widest text-warm-500 uppercase mb-3">
              Why This Matters
            </h3>
            <p className="text-sm text-warm-600 leading-relaxed">
              {signal.whyItMatters}
            </p>
          </section>

          {/* Section 3: The Basis (Expandable) */}
          <section>
            <button
              onClick={() => setShowBasis(!showBasis)}
              className="flex items-center gap-2 text-xs font-semibold tracking-widest text-warm-500 uppercase hover:text-warm-700 transition-colors"
            >
              {showBasis ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              Show Basis
            </button>

            {showBasis && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 bg-warm-50 rounded-lg space-y-4"
              >
                <div>
                  <p className="text-xs font-medium text-warm-500 mb-2">Data Sources</p>
                  <ul className="text-sm text-warm-600 space-y-1">
                    {signal.sources.map((source, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-warm-400" />
                        {source}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-medium text-warm-500 mb-2">Definition</p>
                  <p className="text-sm text-warm-600 leading-relaxed">
                    {signal.definition}
                  </p>
                </div>
              </motion.div>
            )}
          </section>

          {/* Section 4: Key Metrics */}
          <section>
            <h3 className="text-xs font-semibold tracking-widest text-warm-500 uppercase mb-4">
              Key Metrics
            </h3>
            <div className="space-y-3">
              {signal.metrics.map((metric) => (
                <div
                  key={metric.name}
                  className="flex items-center justify-between py-3 border-b border-warm-100 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-warm-800">{metric.name}</p>
                    <p className="text-xs text-warm-500">Source: {metric.source}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-semibold text-warm-800 font-mono">
                      {metric.unit && metric.unit !== '%' && metric.unit !== '$' ? '' : metric.unit === '$' ? '$' : ''}
                      {metric.value}
                      {metric.unit === '%' ? '%' : ''}
                    </span>
                    <span className={cn("text-sm font-mono", getTrendColor(metric.trend))}>
                      {getTrendIcon(metric.trend)} {formatPercentage(metric.trendValue)}
                    </span>
                    <span className={cn(
                      "text-xs font-mono px-2 py-0.5 rounded",
                      getConfidenceLevel(metric.confidence) === 'high' && "bg-signal-healthy/10 text-signal-healthy",
                      getConfidenceLevel(metric.confidence) === 'medium' && "bg-signal-attention/10 text-signal-attention",
                      getConfidenceLevel(metric.confidence) === 'low' && "bg-signal-alert/10 text-signal-alert"
                    )}>
                      {metric.confidence}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Decision Thresholds */}
          {signal.thresholds && signal.thresholds.length > 0 && (
            <section>
              <h3 className="text-xs font-semibold tracking-widest text-warm-500 uppercase mb-4">
                Decision Thresholds
              </h3>
              <div className="space-y-3">
                {signal.thresholds.map((threshold, i) => (
                  <div
                    key={i}
                    className={cn(
                      "p-4 rounded-lg border",
                      getStatusColor(threshold.status)
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium">{threshold.description}</p>
                        <p className="text-xs mt-1 opacity-80">
                          Recommended: {threshold.response}
                        </p>
                      </div>
                      <span className="text-xs font-semibold uppercase px-2 py-1 rounded">
                        {threshold.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 6: Connected Signals */}
          {connectedSignals.length > 0 && (
            <section>
              <h3 className="text-xs font-semibold tracking-widest text-warm-500 uppercase mb-4">
                Connected Signals
              </h3>
              <div className="flex flex-wrap gap-2">
                {connectedSignals.map((connected) => (
                  <button
                    key={connected.id}
                    onClick={() => onNavigateToSignal(connected)}
                    className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-warm-50 hover:bg-warm-100 transition-colors"
                  >
                    <span className="text-sm text-warm-700">{connected.name}</span>
                    <span className="text-sm font-semibold text-warm-800">{connected.score}</span>
                    <ArrowRight className="w-3 h-3 text-warm-400 group-hover:text-warm-600 transition-colors" />
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
      </motion.div>
    </>
  );
}
