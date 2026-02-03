import { motion } from 'framer-motion';

/**
 * Demo Banner - This MUST remain prominent
 * The risk of someone mistaking demo data for real market intelligence is too high.
 * This banner cannot be subtle.
 */
export default function DemoBanner() {
  return (
    <motion.div
      className="bg-gradient-to-r from-ink-800 to-ink-700 text-white py-3 px-6 flex items-center justify-center gap-4 sticky top-0 z-50"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2 bg-white/15 px-3 py-1 rounded text-xs font-mono font-medium uppercase tracking-widest">
        <span className="w-2 h-2 bg-yellow-400 rounded-full demo-pulse" />
        Demonstration Mode
      </div>
      <span className="text-sm text-white/90">
        All signals shown are <strong className="text-white">illustrative</strong>, representing the intelligence architecture—not live market data.
      </span>
    </motion.div>
  );
}
