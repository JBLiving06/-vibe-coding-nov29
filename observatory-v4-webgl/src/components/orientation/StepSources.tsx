import { motion } from 'framer-motion';
import { ArrowRight, Users, Building2 } from 'lucide-react';

interface StepSourcesProps {
  onContinue: () => void;
}

export default function StepSources({ onContinue }: StepSourcesProps) {
  return (
    <motion.div
      className="flex-1 flex items-center justify-center px-6 py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto text-center space-y-10">
        {/* Headline */}
        <motion.h2
          className="text-2xl md:text-3xl font-semibold text-warm-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Signals triangulate multiple data sources
        </motion.h2>

        {/* Two-Column Sources */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* Practitioner Voice */}
          <motion.div
            className="bg-white rounded-2xl p-8 border border-warm-200 shadow-sm text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-accent-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-accent-primary" />
              </div>
              <h3 className="text-lg font-semibold text-warm-800">Practitioner Voice</h3>
            </div>
            <p className="text-warm-600 mb-4">
              Structured interviews capture leading indicators from educators and implementers on the ground.
            </p>
            <div className="space-y-2">
              <p className="text-xs font-medium text-warm-500 uppercase tracking-wider">Illustrative Sources</p>
              <div className="flex flex-wrap gap-2">
                {['TNTP', 'TeachingWorks', 'HQIQ Initiatives'].map((source) => (
                  <span key={source} className="px-3 py-1 bg-warm-100 rounded-full text-xs text-warm-600">
                    {source}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Institutional Data */}
          <motion.div
            className="bg-white rounded-2xl p-8 border border-warm-200 shadow-sm text-left"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-accent-gold/10 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-accent-gold" />
              </div>
              <h3 className="text-lg font-semibold text-warm-800">Institutional Data</h3>
            </div>
            <p className="text-warm-600 mb-4">
              Formal data feeds capture decisions and resource flows from institutions and systems.
            </p>
            <div className="space-y-2">
              <p className="text-xs font-medium text-warm-500 uppercase tracking-wider">Feed Types</p>
              <div className="flex flex-wrap gap-2">
                {['Governance', 'Procurement', 'Finance', 'Accountability'].map((feed) => (
                  <span key={feed} className="px-3 py-1 bg-warm-100 rounded-full text-xs text-warm-600">
                    {feed}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Triangulation Statement */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px bg-warm-300 flex-1" />
            <span className="text-sm font-medium text-warm-500 uppercase tracking-wider">Triangulation</span>
            <div className="h-px bg-warm-300 flex-1" />
          </div>
          <p className="text-warm-600">
            Triangulation between practitioner experience and institutional behavior reveals where stated priorities meet implementation reality.
          </p>
        </motion.div>

        {/* Continue Button */}
        <motion.button
          onClick={onContinue}
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-warm-800 text-warm-50 font-medium text-sm tracking-wide hover:bg-warm-900 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Continue
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </motion.button>
      </div>
    </motion.div>
  );
}
