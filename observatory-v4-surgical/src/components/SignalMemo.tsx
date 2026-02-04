import { motion } from 'framer-motion';
import { X, Users, Database, GitMerge, TrendingUp, TrendingDown, Minus, ChevronRight } from 'lucide-react';
import type { SignalFamily } from '../types';

interface SignalMemoProps {
  signal: SignalFamily;
  allSignals: SignalFamily[];
  onClose: () => void;
  onNavigateToSignal: (signal: SignalFamily) => void;
}

const trendIcons = {
  rising: TrendingUp,
  stable: Minus,
  declining: TrendingDown,
};

const trendLabels = {
  rising: 'Rising',
  stable: 'Stable',
  declining: 'Declining',
};

const trendColors = {
  rising: 'text-signal-healthy bg-signal-healthy/10',
  stable: 'text-signal-attention bg-signal-attention/10',
  declining: 'text-signal-alert bg-signal-alert/10',
};

const statusLabels = {
  healthy: 'Healthy',
  attention: 'Needs Attention',
  alert: 'Alert',
};

const statusColors = {
  healthy: 'text-signal-healthy',
  attention: 'text-signal-attention',
  alert: 'text-signal-alert',
};

export default function SignalMemo({
  signal,
  allSignals,
  onClose,
  onNavigateToSignal,
}: SignalMemoProps) {
  const TrendIcon = trendIcons[signal.trend];
  const status = signal.status || 'healthy';
  const relatedSignals = allSignals.filter(
    (s) => signal.relatedSignals?.includes(s.id) && s.id !== signal.id
  );

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-start justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-warm-900/10 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Memo Panel */}
      <motion.div
        className="relative w-full max-w-xl h-full bg-white shadow-2xl overflow-y-auto"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-warm-200 px-6 py-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xs font-medium text-warm-500 uppercase tracking-wide mb-1">
                Signal Memo
              </p>
              <h2 className="text-xl font-semibold text-warm-800">{signal.name}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-warm-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-warm-500" />
            </button>
          </div>

          {/* Status & Trend */}
          <div className="flex items-center gap-3 mt-4">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${trendColors[signal.trend]}`}>
              <TrendIcon className="w-4 h-4" />
              <span className="text-sm font-medium">{trendLabels[signal.trend]}</span>
            </div>
            <span className={`text-sm font-medium ${statusColors[status]}`}>
              {statusLabels[status]}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Summary */}
          <section>
            <p className="text-warm-700 leading-relaxed">{signal.summary}</p>
          </section>

          {/* Source Architecture */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-warm-800 uppercase tracking-wide">
              Source Architecture
            </h3>

            {/* Practitioner Voice */}
            <motion.div
              className="p-4 bg-teal-50 rounded-xl border border-teal-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-teal-600" />
                <h4 className="font-medium text-teal-800">Practitioner Voice</h4>
                <span className="ml-auto text-sm font-semibold text-teal-600">
                  {signal.sources.practitionerVoice.signalCount} signals
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium text-teal-600 uppercase tracking-wide">
                  Active Initiatives
                </p>
                <ul className="text-sm text-teal-700 space-y-1">
                  {signal.sources.practitionerVoice.initiatives.map((initiative, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-teal-400" />
                      {initiative}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Institutional Data */}
            <motion.div
              className="p-4 bg-amber-50 rounded-xl border border-amber-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Database className="w-5 h-5 text-amber-600" />
                <h4 className="font-medium text-amber-800">Institutional Data</h4>
                <span className="ml-auto text-sm font-semibold text-amber-600">
                  {signal.sources.institutionalData.feedTypes.length} feed types
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium text-amber-600 uppercase tracking-wide">
                  Data Feeds
                </p>
                <ul className="text-sm text-amber-700 space-y-1">
                  {signal.sources.institutionalData.feedTypes.map((feed, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-amber-400" />
                      {feed}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Triangulation Note */}
            <motion.div
              className="p-4 bg-warm-100 rounded-xl border border-warm-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <GitMerge className="w-5 h-5 text-warm-600" />
                <h4 className="font-medium text-warm-800">Triangulation</h4>
              </div>
              <p className="text-sm text-warm-700 leading-relaxed">
                {signal.sources.triangulationNote}
              </p>
            </motion.div>
          </section>

          {/* Key Observations */}
          {signal.keyObservations && signal.keyObservations.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-sm font-semibold text-warm-800 uppercase tracking-wide">
                Key Observations
              </h3>
              <ul className="space-y-3">
                {signal.keyObservations.map((observation, idx) => (
                  <motion.li
                    key={idx}
                    className="flex gap-3 p-3 bg-warm-50 rounded-lg"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                  >
                    <span className="text-accent-primary font-semibold">{idx + 1}</span>
                    <p className="text-sm text-warm-700">{observation}</p>
                  </motion.li>
                ))}
              </ul>
            </section>
          )}

          {/* Related Signals */}
          {relatedSignals.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-sm font-semibold text-warm-800 uppercase tracking-wide">
                Related Signals
              </h3>
              <div className="space-y-2">
                {relatedSignals.map((related) => {
                  const relatedStatus = related.status || 'healthy';
                  return (
                    <button
                      key={related.id}
                      onClick={() => onNavigateToSignal(related)}
                      className="w-full flex items-center justify-between p-3 bg-warm-50 hover:bg-warm-100 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          relatedStatus === 'healthy' ? 'bg-signal-healthy' :
                          relatedStatus === 'attention' ? 'bg-signal-attention' : 'bg-signal-alert'
                        }`} />
                        <span className="text-sm font-medium text-warm-700">{related.shortName || related.name}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-warm-400 group-hover:text-warm-600 transition-colors" />
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {/* Demo Notice */}
          <motion.div
            className="flex items-center gap-3 p-4 bg-warm-50 rounded-lg border border-warm-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <p className="text-xs text-warm-500">
              <span className="font-medium">Demo Mode:</span> This memo contains illustrative content representing the format and depth of production intelligence.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
