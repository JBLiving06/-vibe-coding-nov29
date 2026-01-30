import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { orientingQuestion, framingStatement, getSynthesis } from '../data/signals';

interface WelcomeScreenProps {
  onEnter: () => void;
  selectedPriority: string;
}

export default function WelcomeScreen({ onEnter, selectedPriority }: WelcomeScreenProps) {
  const synthesis = getSynthesis(selectedPriority);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-2xl mx-auto text-center space-y-12">
        {/* Logo / Brand Mark */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center justify-center gap-3"
        >
          <div className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
          <span className="text-sm font-medium tracking-wide text-warm-500 uppercase">
            EdSolutions
          </span>
          <div className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
        </motion.div>

        {/* The Orienting Question */}
        <motion.h1
          className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-warm-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span className="italic text-warm-600">"</span>
          {orientingQuestion}
          <span className="italic text-warm-600">"</span>
        </motion.h1>

        {/* The Synthesized Answer */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <p className="text-xs font-medium tracking-widest text-warm-400 uppercase">
            Current Read
          </p>
          <p className="text-lg md:text-xl text-warm-700 leading-relaxed font-light">
            {synthesis}
          </p>
        </motion.div>

        {/* The Framing Statement */}
        <motion.p
          className="text-sm text-warm-500 font-light tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          {framingStatement}
        </motion.p>

        {/* Enter Button */}
        <motion.button
          onClick={onEnter}
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-warm-800 text-warm-50 font-medium text-sm tracking-wide hover:bg-warm-900 transition-all duration-300 hover:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Enter the Observatory
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </motion.button>

        {/* Subtle timestamp */}
        <motion.p
          className="text-xs text-warm-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.6 }}
        >
          Last updated: {new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
          })}
        </motion.p>
      </div>

      {/* Ambient background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent-primary/5 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent-gold/5 blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  );
}
