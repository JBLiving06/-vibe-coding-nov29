import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { frameworkItems } from '../data/priorities';

interface FrameworkModalProps {
  onClose: () => void;
}

/**
 * Framework Modal - Explains the seven signal families
 * This is EdSolutions' proprietary methodology.
 * It should be positioned as expertise we bring to the partnership.
 */
export default function FrameworkModal({ onClose }: FrameworkModalProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-ink-900/50 modal-backdrop flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-paper rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-ink-200 flex items-start justify-between sticky top-0 bg-paper z-10">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink-900 mb-1">
              The Signal Framework
            </h2>
            <p className="text-sm text-ink-600">
              EdSolutions' methodology for market sensing
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-ink-100 rounded transition-colors"
          >
            <X className="w-6 h-6 text-ink-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-ink-700 leading-relaxed mb-8">
            The Observatory tracks seven signal families that together indicate whether market
            conditions support lasting change. Each family synthesizes multiple data sources—
            practitioner interviews, institutional documents, capital tracking, and policy feeds—
            into actionable intelligence. This framework was developed through EdSolutions'
            decade of experience in education market dynamics.
          </p>

          <div className="space-y-4">
            {frameworkItems.map((item) => (
              <motion.div
                key={item.number}
                className="flex gap-4 p-4 bg-paper-warm rounded-lg"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: parseInt(item.number) * 0.05 }}
              >
                <span className="font-mono text-sm font-medium text-accent w-6 flex-shrink-0">
                  {item.number}
                </span>
                <div>
                  <h4 className="font-semibold text-ink-800 mb-1">{item.name}</h4>
                  <p className="text-sm text-ink-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-ink-700 leading-relaxed mt-8">
            <strong>Capital Flows</strong> operates as a keystone signal that cuts across all families,
            tracking philanthropic alignment, public appropriations, and private investment as leading
            indicators of market trajectory.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
