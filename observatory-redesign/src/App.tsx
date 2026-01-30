import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import WelcomeScreen from './components/WelcomeScreen';
import Observatory from './components/Observatory';

function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState('k12-curriculum');

  return (
    <div className="min-h-screen bg-warm-50">
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <WelcomeScreen
            key="welcome"
            onEnter={() => setHasEntered(true)}
            selectedPriority={selectedPriority}
          />
        ) : (
          <Observatory
            key="observatory"
            selectedPriority={selectedPriority}
            onPriorityChange={setSelectedPriority}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
