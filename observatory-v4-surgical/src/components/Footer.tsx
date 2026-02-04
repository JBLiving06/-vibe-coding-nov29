import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="border-t border-warm-200/50 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-warm-500">
          <div className="flex items-center gap-2">
            <span className="font-medium text-warm-600">EdSolutions</span>
            <span className="text-warm-300">·</span>
            <span>Market Intelligence for Education Transformation</span>
          </div>
          <div className="flex items-center gap-4">
            <motion.div
              className="flex items-center gap-2 px-3 py-1 bg-warm-100 rounded-full"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="text-xs text-warm-500">Demo Mode</span>
            </motion.div>
            <span className="text-warm-400">USLT 2030→2045</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
