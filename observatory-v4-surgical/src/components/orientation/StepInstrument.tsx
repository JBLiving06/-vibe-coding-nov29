import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { signalFamilyNames } from '../../data/signals';
import { framingStatement } from '../../data/priorities';

interface StepInstrumentProps {
  onContinue: () => void;
}

export default function StepInstrument({ onContinue }: StepInstrumentProps) {
  return (
    <motion.div
      className="flex-1 flex items-center justify-center px-6 py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl mx-auto text-center space-y-10">
        {/* Headline */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-warm-800">
            The Observatory is an instrument, not a dashboard
          </h2>
          <p className="text-lg text-warm-500 font-light">
            {framingStatement}
          </p>
        </motion.div>

        {/* Signal Family Preview */}
        <motion.div
          className="relative py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {/* Constellation Preview */}
          <div className="flex flex-wrap justify-center gap-4 max-w-xl mx-auto">
            {signalFamilyNames.map((name, index) => (
              <motion.div
                key={name}
                className="px-4 py-2 rounded-full bg-white border border-warm-200 text-sm text-warm-700 shadow-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
              >
                {name}
              </motion.div>
            ))}
          </div>

          {/* Connection Lines (decorative) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            <motion.line
              x1="30%" y1="30%" x2="50%" y2="50%"
              stroke="currentColor"
              strokeWidth="1"
              className="text-warm-400"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            />
            <motion.line
              x1="70%" y1="30%" x2="50%" y2="50%"
              stroke="currentColor"
              strokeWidth="1"
              className="text-warm-400"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
            />
            <motion.line
              x1="50%" y1="50%" x2="50%" y2="80%"
              stroke="currentColor"
              strokeWidth="1"
              className="text-warm-400"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            />
          </svg>
        </motion.div>

        {/* Explanation */}
        <motion.p
          className="text-warm-600 text-base max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          Four solution priorities track whether market conditions support Foundation goals reaching scale.
        </motion.p>

        {/* Continue Button */}
        <motion.button
          onClick={onContinue}
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-warm-800 text-warm-50 font-medium text-sm tracking-wide hover:bg-warm-900 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
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
