import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Search, Layers, Target, Sparkles } from 'lucide-react';

interface OnboardingSequenceProps {
  onComplete: () => void;
}

type Step = 'welcome' | 'architecture' | 'priorities' | 'ready';

const steps: Step[] = ['welcome', 'architecture', 'priorities', 'ready'];

export default function OnboardingSequence({ onComplete }: OnboardingSequenceProps) {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const currentIndex = steps.indexOf(currentStep);

  const handleContinue = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex]);
    } else {
      onComplete();
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Progress Dots */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3">
        {steps.map((step, index) => (
          <motion.div
            key={step}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index <= currentIndex ? 'bg-warm-800' : 'bg-warm-300'
            }`}
            animate={{
              scale: index === currentIndex ? [1, 1.3, 1] : 1,
            }}
            transition={{
              scale: { duration: 2, repeat: Infinity },
            }}
          />
        ))}
      </div>

      {/* EdSolutions Logo */}
      <motion.div
        className="fixed top-8 left-8 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-sm font-medium text-warm-500 tracking-wide">EdSolutions</span>
      </motion.div>

      {/* Demo Mode Indicator */}
      <motion.div
        className="fixed top-8 right-8 z-50 flex items-center gap-2 bg-warm-800 text-warm-100 px-3 py-1.5 rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="w-2 h-2 rounded-full bg-amber-400 demo-pulse" />
        <span className="text-xs font-medium tracking-wide">DEMO MODE</span>
      </motion.div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {currentStep === 'welcome' && (
          <StepContent
            key="welcome"
            icon={<Search className="w-12 h-12" />}
            kicker="Market Signals Observatory"
            title="What is the current state of the market for AI in education?"
            description="This Observatory surfaces real-time intelligence on the conditions that enable or constrain progress toward the Foundation's 2030 goals."
            onContinue={handleContinue}
          />
        )}

        {currentStep === 'architecture' && (
          <StepContent
            key="architecture"
            icon={<Layers className="w-12 h-12" />}
            kicker="USP 2030 Goal Architecture"
            title="Four solution priorities. One infrastructure layer. Cross-cutting enablement."
            description="The Observatory mirrors the Foundation's strategy architecture—tracking market signals across each priority area and the infrastructure that enables them all."
            onContinue={handleContinue}
          />
        )}

        {currentStep === 'priorities' && (
          <StepContent
            key="priorities"
            icon={<Target className="w-12 h-12" />}
            kicker="Signal Framework"
            title="Seven signal families reveal market readiness."
            description="Each priority is analyzed through supply maturity, demand patterns, policy alignment, implementation capacity, competitive dynamics, equity access, and capital flows."
            onContinue={handleContinue}
          />
        )}

        {currentStep === 'ready' && (
          <StepContent
            key="ready"
            icon={<Sparkles className="w-12 h-12" />}
            kicker="Ready to Explore"
            title="Translating Ambition to Action"
            description="This demonstration shows how the Observatory synthesizes market intelligence to surface conditions that matter for strategic decision-making."
            buttonText="Enter the Observatory"
            onContinue={handleContinue}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface StepContentProps {
  icon: React.ReactNode;
  kicker: string;
  title: string;
  description: string;
  buttonText?: string;
  onContinue: () => void;
}

function StepContent({
  icon,
  kicker,
  title,
  description,
  buttonText = 'Continue',
  onContinue,
}: StepContentProps) {
  return (
    <motion.div
      className="max-w-2xl mx-auto px-8 text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      {/* Icon */}
      <motion.div
        className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/80 backdrop-blur-sm border border-warm-200/50 text-accent-primary mb-8 shadow-lg"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
      >
        {icon}
      </motion.div>

      {/* Kicker */}
      <motion.p
        className="text-sm font-medium text-accent-primary tracking-wide uppercase mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {kicker}
      </motion.p>

      {/* Title */}
      <motion.h1
        className="font-display text-4xl lg:text-5xl font-semibold text-warm-800 leading-tight mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {title}
      </motion.h1>

      {/* Description */}
      <motion.p
        className="text-lg text-warm-600 leading-relaxed mb-10 max-w-xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {description}
      </motion.p>

      {/* Continue Button */}
      <motion.button
        onClick={onContinue}
        className="group inline-flex items-center gap-3 px-8 py-4 bg-warm-800 text-warm-50 rounded-xl font-medium shadow-lg hover:bg-warm-900 hover:shadow-xl transition-all duration-300"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {buttonText}
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </motion.div>
  );
}
