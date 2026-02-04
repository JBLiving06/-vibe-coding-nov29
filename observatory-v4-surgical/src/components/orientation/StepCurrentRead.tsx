import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { priorities, prioritySyntheses } from '../../data/priorities';

interface StepCurrentReadProps {
  selectedPriority: string;
  onPriorityChange: (priority: string) => void;
  onEnter: () => void;
}

export default function StepCurrentRead({
  selectedPriority,
  onPriorityChange,
  onEnter,
}: StepCurrentReadProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const currentPriority = priorities.find(p => p.id === selectedPriority);
  const synthesis = prioritySyntheses[selectedPriority];

  return (
    <motion.div
      className="flex-1 flex items-center justify-center px-6 py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Label */}
        <motion.p
          className="text-xs font-semibold tracking-widest text-warm-500 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Current Read
        </motion.p>

        {/* Priority Selector */}
        <motion.div
          className="relative inline-block"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-warm-200 rounded-lg hover:border-warm-300 transition-colors"
          >
            <span className="text-sm font-medium text-warm-700">
              {currentPriority?.shortName || 'Select Priority'}
            </span>
            <ChevronDown className={`w-4 h-4 text-warm-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown */}
          {isDropdownOpen && (
            <motion.div
              className="absolute top-full left-0 right-0 mt-2 bg-white border border-warm-200 rounded-lg shadow-lg overflow-hidden z-50"
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
                    priority.id === selectedPriority ? 'bg-warm-100 text-warm-900' : 'text-warm-700'
                  }`}
                >
                  <div className="font-medium">{priority.shortName}</div>
                  <div className="text-xs text-warm-500 mt-0.5">{priority.description}</div>
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Synthesis */}
        <motion.div
          className="bg-white rounded-xl p-6 border border-warm-200 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          key={selectedPriority}
        >
          <p className="text-lg text-warm-700 leading-relaxed">
            {synthesis}
          </p>
        </motion.div>

        {/* Demo Framing */}
        <motion.p
          className="text-sm text-warm-500 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          This demonstration shows how the Observatory presents market intelligence. All data shown is illustrative, representing the types of signals and presentation format—not live market data.
        </motion.p>

        {/* Enter Button */}
        <motion.button
          onClick={onEnter}
          className="group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-warm-800 text-warm-50 font-semibold text-base tracking-wide hover:bg-warm-900 transition-all duration-300 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Enter the Observatory
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </motion.button>

        {/* Timestamp */}
        <motion.p
          className="text-xs text-warm-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          Demonstration · Last updated: {new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </motion.p>
      </div>
    </motion.div>
  );
}
