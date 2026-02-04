import { motion } from 'framer-motion';
import { ChevronDown, Info } from 'lucide-react';
import { useState } from 'react';
import { priorities } from '../data/priorities';

interface HeaderProps {
  selectedPriority: string;
  onPriorityChange: (priority: string) => void;
  onOpenDataArchitecture: () => void;
}

export default function Header({
  selectedPriority,
  onPriorityChange,
  onOpenDataArchitecture,
}: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const currentPriority = priorities.find(p => p.id === selectedPriority);

  return (
    <header className="sticky top-0 z-40 bg-warm-50/80 backdrop-blur-md border-b border-warm-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <motion.div
              className="w-2 h-2 rounded-full bg-accent-primary"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-medium text-warm-700">Market Signals Observatory</span>
          </div>

          {/* Demo Mode Banner */}
          <motion.div
            className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-warm-100 rounded-full"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-medium text-warm-600">
              Demonstration Mode
            </span>
            <span className="text-xs text-warm-400">·</span>
            <span className="text-xs text-warm-500">Illustrative Data</span>
          </motion.div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Data Architecture Button */}
            <button
              onClick={onOpenDataArchitecture}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-warm-600 hover:text-warm-800 hover:bg-warm-100 rounded-lg transition-colors"
            >
              <Info className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Data Architecture</span>
            </button>

            {/* Priority Filter */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-warm-200 rounded-lg hover:border-warm-300 transition-colors"
              >
                <span className="text-sm font-medium text-warm-700">
                  {currentPriority?.shortName || 'Select Priority'}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-warm-500 transition-transform ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Dropdown */}
              {isDropdownOpen && (
                <motion.div
                  className="absolute top-full right-0 mt-2 w-64 bg-white border border-warm-200 rounded-lg shadow-lg overflow-hidden z-50"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {priorities.map((priority) => (
                    <button
                      key={priority.id}
                      onClick={() => {
                        onPriorityChange(priority.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left text-sm hover:bg-warm-50 transition-colors ${
                        priority.id === selectedPriority
                          ? 'bg-warm-100 text-warm-900'
                          : 'text-warm-700'
                      }`}
                    >
                      <div className="font-medium">{priority.shortName}</div>
                      <div className="text-xs text-warm-500 mt-0.5">{priority.description}</div>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
