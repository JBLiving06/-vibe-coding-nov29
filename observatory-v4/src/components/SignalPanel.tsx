import { motion } from 'framer-motion';
import { X, HelpCircle } from 'lucide-react';
import SignalCard from './SignalCard';
import DualScaleView from './DualScaleView';
import type { Priority } from '../types';

interface SignalPanelProps {
  priority: Priority;
  onClose: () => void;
  onOpenFramework: () => void;
}

/**
 * Signal Detail Panel
 * This appears when a priority is selected. It shows the signal framework
 * applied to that specific priority. The framework is EdSolutions' proprietary
 * methodology - it should be explained, not hidden.
 */
export default function SignalPanel({
  priority,
  onClose,
  onOpenFramework,
}: SignalPanelProps) {
  return (
    <motion.section
      id={`signal-panel-${priority.id}`}
      className="bg-paper border border-ink-200 rounded-xl overflow-hidden mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="bg-paper-warm border-b border-ink-200 p-6 lg:p-8 flex items-start justify-between">
        <div className="flex-1 max-w-2xl">
          <span className="font-mono text-[0.7rem] font-medium tracking-[0.1em] uppercase text-accent mb-1 block">
            Signal Profile
          </span>
          <h2 className="font-display text-2xl font-semibold text-ink-900 mb-3">
            {priority.title}
          </h2>
          <p className="text-ink-600 leading-relaxed">
            {priority.summary}
          </p>
        </div>
        <button
          onClick={onClose}
          className="ml-4 px-4 py-2 border border-ink-300 rounded-md text-sm text-ink-600 hover:bg-ink-100 hover:text-ink-800 transition-colors flex items-center gap-2"
        >
          Close <X className="w-4 h-4" />
        </button>
      </div>

      {/* Framework Explainer - Teaching Layer */}
      <div className="bg-accent-pale border-b border-ink-200 px-6 lg:px-8 py-4 flex items-start gap-4">
        <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <HelpCircle className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-ink-800 text-sm mb-1">
            Reading This Signal Profile
          </h4>
          <p className="text-sm text-ink-700 leading-relaxed">
            {priority.frameworkExplainer}{' '}
            <button
              onClick={onOpenFramework}
              className="text-accent underline hover:text-accent-light"
            >
              Learn more about the framework →
            </button>
          </p>
        </div>
      </div>

      {/* Signal Cards Grid - First 4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink-200 p-px">
        {priority.signals.slice(0, 4).map((signal) => (
          <SignalCard key={signal.id} signal={signal} />
        ))}
      </div>

      {/* Signal Cards Grid - Last 4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink-200 p-px">
        {priority.signals.slice(4, 8).map((signal) => (
          <SignalCard key={signal.id} signal={signal} />
        ))}
      </div>

      {/* Dual Scale View - Institutional vs Hyperscaler */}
      <DualScaleView
        institutionalScale={priority.institutionalScale}
        hyperscalerScale={priority.hyperscalerScale}
      />
    </motion.section>
  );
}
