import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import OnboardingSequence from './components/OnboardingSequence';
import Observatory from './components/Observatory';
import FrameworkModal from './components/FrameworkModal';
import DataSourcesModal from './components/DataSourcesModal';
import AmbientBackground from './components/AmbientBackground';

function App() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [showFrameworkModal, setShowFrameworkModal] = useState(false);
  const [showDataModal, setShowDataModal] = useState(false);

  return (
    <div className="min-h-screen bg-warm-50 relative overflow-hidden">
      {/* Ambient Animated Background - key v3 visual element */}
      <AmbientBackground />

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {!hasCompletedOnboarding ? (
          <OnboardingSequence
            key="onboarding"
            onComplete={() => setHasCompletedOnboarding(true)}
          />
        ) : (
          <Observatory
            key="observatory"
            onOpenFramework={() => setShowFrameworkModal(true)}
            onOpenDataSources={() => setShowDataModal(true)}
          />
        )}
      </AnimatePresence>

      {/* Modals */}
      <AnimatePresence>
        {showFrameworkModal && (
          <FrameworkModal onClose={() => setShowFrameworkModal(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDataModal && (
          <DataSourcesModal onClose={() => setShowDataModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
