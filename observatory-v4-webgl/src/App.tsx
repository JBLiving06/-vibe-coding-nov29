import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { OrientationStep, SignalFamily } from './types';
import OrientationSequence from './components/orientation/OrientationSequence';
import Observatory from './components/Observatory';

function App() {
  // Orientation state
  const [hasCompletedOrientation, setHasCompletedOrientation] = useState(false);
  const [currentOrientationStep, setCurrentOrientationStep] = useState<OrientationStep>('question');

  // Observatory state
  const [selectedPriority, setSelectedPriority] = useState('core-instruction');
  const [_selectedSignal, _setSelectedSignal] = useState<SignalFamily | null>(null);

  // Handlers
  const handleOrientationContinue = useCallback(() => {
    const steps: OrientationStep[] = ['question', 'instrument', 'sources', 'current-read'];
    const currentIndex = steps.indexOf(currentOrientationStep);

    if (currentIndex < steps.length - 1) {
      setCurrentOrientationStep(steps[currentIndex + 1]);
    }
  }, [currentOrientationStep]);

  const handleEnterObservatory = useCallback(() => {
    setHasCompletedOrientation(true);
  }, []);

  const handlePriorityChange = useCallback((priority: string) => {
    setSelectedPriority(priority);
  }, []);

  return (
    <div className="min-h-screen bg-warm-50 ambient-gradient">
      <AnimatePresence mode="wait">
        {!hasCompletedOrientation ? (
          <OrientationSequence
            key="orientation"
            currentStep={currentOrientationStep}
            selectedPriority={selectedPriority}
            onPriorityChange={setSelectedPriority}
            onContinue={handleOrientationContinue}
            onEnter={handleEnterObservatory}
          />
        ) : (
          <Observatory
            key="observatory"
            selectedPriority={selectedPriority}
            onPriorityChange={handlePriorityChange}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
