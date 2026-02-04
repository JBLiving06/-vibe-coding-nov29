import { motion } from 'framer-motion';
import { X, HelpCircle, Sparkles } from 'lucide-react';
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
      id="signal-panel"
      className="glass-card overflow-hidden mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-br from-warm-50 to-white border-b border-warm-200 p-6 lg:p-8 flex flex-col sm:flex-row items-start justify-between gap-4">
        <div className="flex-1 max-w-2xl">
          <motion.span
            className="inline-flex items-center gap-2 font-mono text-[0.7rem] font-medium tracking-[0.1em] uppercase text-accent-primary mb-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Signal Profile
          </motion.span>
          <h2 className="font-display text-2xl font-semibold text-warm-800 mb-3">
            {priority.title}
          </h2>
          <p className="text-warm-600 leading-relaxed">
            {priority.summary}
          </p>
        </div>
        <motion.button
          onClick={onClose}
          className="px-4 py-2 border border-warm-300 rounded-lg text-sm text-warm-600
                     hover:bg-warm-100 hover:text-warm-800 hover:border-warm-400
                     transition-all duration-200 flex items-center gap-2 flex-shrink-0"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Close <X className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Framework Explainer - Teaching Layer */}
      <motion.div
        className="bg-accent-primary/5 border-b border-warm-200 px-6 lg:px-8 py-4 flex items-start gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="w-8 h-8 bg-accent-primary rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
          <HelpCircle className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-warm-800 text-sm mb-1">
            Reading This Signal Profile
          </h4>
          <p className="text-sm text-warm-700 leading-relaxed">
            {priority.frameworkExplainer}{' '}
            <button
              onClick={onOpenFramework}
              className="text-accent-primary underline hover:text-accent-primary/80 transition-colors"
            >
              Learn more about the framework →
            </button>
          </p>
        </div>
      </motion.div>

      {/* Signal Cards Grid - First 4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-warm-200 p-px">
        {priority.signals.slice(0, 4).map((signal, index) => (
          <motion.div
            key={signal.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <SignalCard signal={signal} />
          </motion.div>
        ))}
      </div>

      {/* Signal Cards Grid - Last 4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-warm-200 p-px">
        {priority.signals.slice(4, 8).map((signal, index) => (
          <motion.div
            key={signal.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.05 }}
          >
            <SignalCard signal={signal} />
          </motion.div>
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
