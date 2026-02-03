import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import DemoBanner from './components/DemoBanner';
import Header from './components/Header';
import ArchitectureView from './components/ArchitectureView';
import SignalPanel from './components/SignalPanel';
import Footer from './components/Footer';
import FrameworkModal from './components/FrameworkModal';
import DataSourcesModal from './components/DataSourcesModal';
import { priorities } from './data/priorities';

function App() {
  const [selectedPriorityId, setSelectedPriorityId] = useState<number | null>(null);
  const [showFrameworkModal, setShowFrameworkModal] = useState(false);
  const [showDataModal, setShowDataModal] = useState(false);

  const selectedPriority = priorities.find(p => p.id === selectedPriorityId);

  const handleSelectPriority = (id: number) => {
    setSelectedPriorityId(id);
    // Scroll to panel after a brief delay for animation
    setTimeout(() => {
      document.getElementById(`signal-panel-${id}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  };

  const handleClosePanel = () => {
    setSelectedPriorityId(null);
  };

  return (
    <div className="min-h-screen bg-paper ambient-gradient">
      {/* Demo Banner - MUST remain prominent */}
      <DemoBanner />

      {/* Header */}
      <Header
        onOpenFramework={() => setShowFrameworkModal(true)}
        onOpenDataSources={() => setShowDataModal(true)}
      />

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8 lg:py-12">
        {/* Architecture View - PRIMARY view */}
        <ArchitectureView
          selectedPriorityId={selectedPriorityId}
          onSelectPriority={handleSelectPriority}
        />

        {/* Signal Panel - appears when priority selected */}
        <AnimatePresence mode="wait">
          {selectedPriority && (
            <SignalPanel
              key={selectedPriority.id}
              priority={selectedPriority}
              onClose={handleClosePanel}
              onOpenFramework={() => setShowFrameworkModal(true)}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />

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
