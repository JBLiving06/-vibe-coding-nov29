import { motion } from 'framer-motion';
import { enablementItems } from '../data/priorities';

export default function EnablementRow() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
    >
      {enablementItems.map((item) => (
        <div
          key={item.number}
          className="bg-paper-warm border border-ink-200 rounded-lg p-4 flex items-center gap-4"
        >
          <span className="font-mono text-sm font-medium text-ink-500">
            {item.number}
          </span>
          <span className="text-sm font-medium text-ink-700 flex-1">
            {item.title}
          </span>
          <span className="text-xs text-ink-500 italic">{item.status}</span>
        </div>
      ))}
    </motion.div>
  );
}
