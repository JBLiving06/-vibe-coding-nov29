import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

/**
 * Demo Banner - This MUST remain prominent
 * The risk of someone mistaking demo data for real market intelligence is too high.
 * This banner cannot be subtle. It features an animated pulsing indicator.
 */
export default function DemoBanner() {
  return (
    <motion.div
      className="bg-gradient-to-r from-warm-800 via-warm-900 to-warm-800 text-white py-3 px-4 sm:px-6
                 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4
                 sticky top-0 z-50 shadow-lg"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Demo Badge with Pulsing Indicator */}
      <motion.div
        className="flex items-center gap-2 bg-amber-500/20 border border-amber-400/30
                   px-3 py-1.5 rounded-full text-xs font-mono font-medium uppercase tracking-widest"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* Pulsing Amber Dot */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
        </span>
        <span className="text-amber-200">Demonstration Mode</span>
      </motion.div>

      {/* Explanatory Text */}
      <div className="flex items-center gap-2 text-center sm:text-left">
        <AlertTriangle className="w-4 h-4 text-amber-400 hidden sm:block flex-shrink-0" />
        <span className="text-sm text-warm-200">
          All signals shown are{' '}
          <strong className="text-white font-semibold">illustrative</strong>
          , representing the intelligence architecture—not live market data.
        </span>
      </div>
    </motion.div>
  );
}
