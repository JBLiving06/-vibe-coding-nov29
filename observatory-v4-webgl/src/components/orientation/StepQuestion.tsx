import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { orientingQuestion } from '../../data/priorities';

interface StepQuestionProps {
  onContinue: () => void;
}

export default function StepQuestion({ onContinue }: StepQuestionProps) {
  return (
    <motion.div
      className="flex-1 flex items-center justify-center px-6 py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-2xl mx-auto text-center space-y-12">
        {/* The Question */}
        <motion.h1
          className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-warm-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className="italic text-warm-500">"</span>
          {orientingQuestion}
          <span className="italic text-warm-500">"</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-warm-500 text-lg font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          This is the question the Observatory helps answer.
        </motion.p>

        {/* Continue Button */}
        <motion.button
          onClick={onContinue}
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-warm-800 text-warm-50 font-medium text-sm tracking-wide hover:bg-warm-900 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Continue
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </motion.button>
      </div>
    </motion.div>
  );
}
