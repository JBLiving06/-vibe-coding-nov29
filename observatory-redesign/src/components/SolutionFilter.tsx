import { motion } from 'framer-motion';
import { solutionPriorities } from '../data/signals';
import { cn } from '../lib/utils';

interface SolutionFilterProps {
  selectedPriority: string;
  onPriorityChange: (priority: string) => void;
}

export default function SolutionFilter({ selectedPriority, onPriorityChange }: SolutionFilterProps) {
  return (
    <div className="flex items-center gap-1 p-1 rounded-full bg-warm-100">
      {solutionPriorities.map((priority) => (
        <motion.button
          key={priority.id}
          onClick={() => onPriorityChange(priority.id)}
          className={cn(
            "relative px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
            selectedPriority === priority.id
              ? "text-warm-900"
              : "text-warm-500 hover:text-warm-700"
          )}
          whileTap={{ scale: 0.95 }}
        >
          {selectedPriority === priority.id && (
            <motion.div
              className="absolute inset-0 bg-white rounded-full shadow-sm"
              layoutId="activePriority"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{priority.shortName}</span>
        </motion.button>
      ))}
    </div>
  );
}
