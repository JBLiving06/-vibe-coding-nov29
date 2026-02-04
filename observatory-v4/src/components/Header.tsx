import { motion } from 'framer-motion';
import { Layers, BookOpen, Database } from 'lucide-react';

interface HeaderProps {
  onOpenFramework: () => void;
  onOpenDataSources: () => void;
}

/**
 * Header - Main navigation bar
 * Features glass morphism and warm color palette
 */
export default function Header({ onOpenFramework, onOpenDataSources }: HeaderProps) {
  return (
    <motion.header
      className="glass sticky top-[52px] z-40 px-4 sm:px-6 lg:px-8 py-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="flex flex-col gap-0.5">
          <motion.span
            className="font-mono text-[0.65rem] font-medium tracking-[0.15em] uppercase text-accent-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            EdSolutions
          </motion.span>
          <motion.span
            className="font-display text-lg sm:text-xl font-semibold text-warm-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Market Signals Observatory
          </motion.span>
        </div>

        {/* Navigation */}
        <nav className="hidden sm:flex items-center gap-2">
          {/* Active View Indicator */}
          <motion.button
            className="flex items-center gap-2 px-3 py-2 rounded-lg
                       bg-accent-primary/10 text-accent-primary
                       text-sm font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Layers className="w-4 h-4" />
            <span>Architecture View</span>
          </motion.button>

          {/* Framework Button */}
          <motion.button
            onClick={onOpenFramework}
            className="flex items-center gap-2 px-3 py-2 rounded-lg
                       text-warm-600 hover:text-warm-800 hover:bg-warm-100
                       text-sm font-medium transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <BookOpen className="w-4 h-4" />
            <span>Signal Framework</span>
          </motion.button>

          {/* Data Sources Button */}
          <motion.button
            onClick={onOpenDataSources}
            className="flex items-center gap-2 px-3 py-2 rounded-lg
                       text-warm-600 hover:text-warm-800 hover:bg-warm-100
                       text-sm font-medium transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Database className="w-4 h-4" />
            <span>Data Sources</span>
          </motion.button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="sm:hidden p-2 text-warm-600 hover:text-warm-800">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </motion.header>
  );
}
