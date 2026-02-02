import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Database, GitMerge } from 'lucide-react';

interface DataArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DataArchitectureModal({ isOpen, onClose }: DataArchitectureModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-warm-900/20 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-warm-200">
              <div>
                <h2 className="text-lg font-semibold text-warm-800">Data Architecture</h2>
                <p className="text-sm text-warm-500 mt-0.5">How intelligence is triangulated</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-warm-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-warm-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto">
              {/* Visual Diagram */}
              <div className="flex items-center justify-center gap-4 py-8">
                <motion.div
                  className="flex flex-col items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center">
                    <Users className="w-8 h-8 text-teal-600" />
                  </div>
                  <span className="text-xs font-medium text-warm-600">Practitioner Voice</span>
                </motion.div>

                <motion.div
                  className="flex-1 max-w-[100px] h-px bg-gradient-to-r from-teal-300 via-warm-300 to-amber-300"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />

                <motion.div
                  className="flex flex-col items-center gap-2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="w-20 h-20 rounded-full bg-accent-primary/10 border-2 border-accent-primary flex items-center justify-center">
                    <GitMerge className="w-10 h-10 text-accent-primary" />
                  </div>
                  <span className="text-xs font-semibold text-warm-700">Triangulation</span>
                </motion.div>

                <motion.div
                  className="flex-1 max-w-[100px] h-px bg-gradient-to-r from-amber-300 via-warm-300 to-teal-300"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />

                <motion.div
                  className="flex flex-col items-center gap-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
                    <Database className="w-8 h-8 text-amber-600" />
                  </div>
                  <span className="text-xs font-medium text-warm-600">Institutional Data</span>
                </motion.div>
              </div>

              {/* Source Descriptions */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Practitioner Voice */}
                <motion.div
                  className="p-5 bg-teal-50 rounded-xl border border-teal-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-5 h-5 text-teal-600" />
                    <h3 className="font-semibold text-teal-800">Practitioner Voice</h3>
                  </div>
                  <p className="text-sm text-teal-700 mb-4">
                    First-hand insights from educators, administrators, and implementation partners working directly with solutions.
                  </p>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-teal-600 uppercase tracking-wide">Includes</p>
                    <ul className="text-sm text-teal-700 space-y-1">
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-teal-400" />
                        Implementation team interviews
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-teal-400" />
                        Educator sentiment surveys
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-teal-400" />
                        Quality indicator assessments
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-teal-400" />
                        Usage pattern observations
                      </li>
                    </ul>
                  </div>
                </motion.div>

                {/* Institutional Data */}
                <motion.div
                  className="p-5 bg-amber-50 rounded-xl border border-amber-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Database className="w-5 h-5 text-amber-600" />
                    <h3 className="font-semibold text-amber-800">Institutional Data</h3>
                  </div>
                  <p className="text-sm text-amber-700 mb-4">
                    Structured data feeds from institutions, vendors, and public sources tracking market activity.
                  </p>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-amber-600 uppercase tracking-wide">Includes</p>
                    <ul className="text-sm text-amber-700 space-y-1">
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-amber-400" />
                        Procurement records
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-amber-400" />
                        Vendor registry data
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-amber-400" />
                        Policy and funding databases
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-amber-400" />
                        Market benchmark indices
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>

              {/* Triangulation Note */}
              <motion.div
                className="p-5 bg-warm-100 rounded-xl border border-warm-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <GitMerge className="w-5 h-5 text-warm-600" />
                  <h3 className="font-semibold text-warm-800">Triangulation</h3>
                </div>
                <p className="text-sm text-warm-700">
                  Each signal family synthesizes both source types. When practitioner observations align with
                  institutional patterns, confidence increases. Divergence between sources prompts deeper
                  investigation and nuanced interpretation.
                </p>
              </motion.div>

              {/* Demo Notice */}
              <motion.div
                className="flex items-center gap-3 p-4 bg-warm-50 rounded-lg border border-warm-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <p className="text-xs text-warm-500">
                  <span className="font-medium">Demonstration Mode:</span> All data sources and counts shown
                  are illustrative, representing the types of intelligence the production Observatory will surface.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
