import { motion } from 'framer-motion';

interface HeaderProps {
  onOpenFramework: () => void;
  onOpenDataSources: () => void;
}

export default function Header({ onOpenFramework, onOpenDataSources }: HeaderProps) {
  return (
    <motion.header
      className="bg-paper border-b border-ink-200 px-6 lg:px-8 py-4 flex items-center justify-between"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      <div className="flex flex-col gap-0.5">
        <span className="font-mono text-[0.65rem] font-medium tracking-[0.15em] uppercase text-accent">
          EdSolutions
        </span>
        <span className="font-display text-xl font-semibold text-ink-900">
          Market Signals Observatory
        </span>
      </div>

      <nav className="flex items-center gap-6">
        <button
          onClick={() => {}}
          className="text-sm text-accent font-medium hover:text-accent-light transition-colors"
        >
          Architecture View
        </button>
        <button
          onClick={onOpenFramework}
          className="text-sm text-ink-600 hover:text-ink-900 transition-colors"
        >
          Signal Framework
        </button>
        <button
          onClick={onOpenDataSources}
          className="text-sm text-ink-600 hover:text-ink-900 transition-colors"
        >
          Data Sources
        </button>
      </nav>
    </motion.header>
  );
}
