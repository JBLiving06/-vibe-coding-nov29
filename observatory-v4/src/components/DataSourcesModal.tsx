import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { dataSources } from '../data/priorities';

interface DataSourcesModalProps {
  onClose: () => void;
}

export default function DataSourcesModal({ onClose }: DataSourcesModalProps) {
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
              Data Architecture
            </h2>
            <p className="text-sm text-ink-600">
              How the Observatory synthesizes market intelligence
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
            The Observatory integrates multiple sensing channels into unified signal families.
            This multi-source architecture ensures signals are triangulated across practitioner
            experience, institutional behavior, capital movements, and policy developments.
          </p>

          <div className="space-y-4">
            {dataSources.map((source, index) => (
              <motion.div
                key={source.name}
                className="flex gap-4 p-4 bg-paper-warm rounded-lg"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <span className="text-accent text-lg flex-shrink-0">{source.icon}</span>
                <div>
                  <h4 className="font-semibold text-ink-800 mb-1">{source.name}</h4>
                  <p className="text-sm text-ink-600 leading-relaxed">
                    {source.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800 italic">
              In this demonstration, Practitioner Voice is the only live data channel.
              Production deployment would integrate all sensing channels into real-time signal synthesis.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
