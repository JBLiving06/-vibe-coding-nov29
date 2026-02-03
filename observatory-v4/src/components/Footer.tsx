import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      className="border-t border-ink-200 px-6 lg:px-8 py-6 mt-12 flex items-center justify-between"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <div className="text-sm text-ink-600">
        <strong className="text-ink-800">EdSolutions</strong> · Market Intelligence for Mission-Driven Education
      </div>
      <div className="font-mono text-xs text-ink-400">
        Observatory v4.0 · February 2026
      </div>
    </motion.footer>
  );
}
