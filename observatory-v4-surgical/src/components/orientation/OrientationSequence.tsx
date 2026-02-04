import { motion, AnimatePresence } from 'framer-motion';
import type { OrientationStep } from '../../types';
import StepQuestion from './StepQuestion';
import StepInstrument from './StepInstrument';
import StepSources from './StepSources';
import StepCurrentRead from './StepCurrentRead';

interface OrientationSequenceProps {
  currentStep: OrientationStep;
  selectedPriority: string;
  onPriorityChange: (priority: string) => void;
  onContinue: () => void;
  onEnter: () => void;
}

export default function OrientationSequence({
  currentStep,
  selectedPriority,
  onPriorityChange,
  onContinue,
  onEnter,
}: OrientationSequenceProps) {
  // Progress indicator
  const steps: OrientationStep[] = ['question', 'instrument', 'sources', 'current-read'];
  const currentIndex = steps.indexOf(currentStep);

  return (
    <motion.div
      className="min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Progress Dots */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
        {steps.map((step, index) => (
          <motion.div
            key={step}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index <= currentIndex ? 'bg-warm-800' : 'bg-warm-300'
            }`}
            animate={{
              scale: index === currentIndex ? [1, 1.2, 1] : 1,
            }}
            transition={{
              scale: { duration: 2, repeat: Infinity },
            }}
          />
        ))}
      </div>

      {/* EdSolutions Logo - Top Left */}
      <motion.div
        className="fixed top-6 left-6 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-sm font-medium text-warm-500 tracking-wide">EdSolutions</span>
      </motion.div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {currentStep === 'question' && (
          <StepQuestion key="question" onContinue={onContinue} />
        )}
        {currentStep === 'instrument' && (
          <StepInstrument key="instrument" onContinue={onContinue} />
        )}
        {currentStep === 'sources' && (
          <StepSources key="sources" onContinue={onContinue} />
        )}
        {currentStep === 'current-read' && (
          <StepCurrentRead
            key="current-read"
            selectedPriority={selectedPriority}
            onPriorityChange={onPriorityChange}
            onEnter={onEnter}
          />
        )}
      </AnimatePresence>

      {/* Ambient Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent-primary/5 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent-gold/5 blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  );
}
