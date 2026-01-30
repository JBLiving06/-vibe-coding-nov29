import { useState, useMemo, useCallback } from 'react';
import { getSignalFamilies, getSynthesis, type SignalFamily } from '../data/signals';
import { getCapitalFlows, getCapitalSummary } from '../data/capitalFlows';
import { getEquitySegments, getEquitySummary } from '../data/equity';

export function useObservatory(initialPriority: string = 'k12-curriculum') {
  const [selectedPriority, setSelectedPriority] = useState(initialPriority);
  const [selectedSignal, setSelectedSignal] = useState<SignalFamily | null>(null);

  // Memoized data based on selected priority
  const signals = useMemo(() => getSignalFamilies(selectedPriority), [selectedPriority]);
  const synthesis = useMemo(() => getSynthesis(selectedPriority), [selectedPriority]);
  const capitalFlows = useMemo(() => getCapitalFlows(selectedPriority), [selectedPriority]);
  const capitalSummary = useMemo(() => getCapitalSummary(selectedPriority), [selectedPriority]);
  const equitySegments = useMemo(() => getEquitySegments(selectedPriority), [selectedPriority]);
  const equitySummary = useMemo(() => getEquitySummary(selectedPriority), [selectedPriority]);

  // Actions
  const selectPriority = useCallback((priority: string) => {
    setSelectedPriority(priority);
    setSelectedSignal(null); // Close any open memo when changing priority
  }, []);

  const selectSignal = useCallback((signal: SignalFamily | null) => {
    setSelectedSignal(signal);
  }, []);

  const navigateToSignal = useCallback((signalId: string) => {
    const signal = signals.find(s => s.id === signalId);
    if (signal) {
      setSelectedSignal(signal);
    }
  }, [signals]);

  // Computed state
  const overallHealth = useMemo(() => {
    const avgScore = signals.reduce((sum, s) => sum + s.score, 0) / signals.length;
    if (avgScore >= 70) return 'healthy';
    if (avgScore >= 50) return 'attention';
    return 'alert';
  }, [signals]);

  return {
    // State
    selectedPriority,
    selectedSignal,
    signals,
    synthesis,
    capitalFlows,
    capitalSummary,
    equitySegments,
    equitySummary,
    overallHealth,

    // Actions
    selectPriority,
    selectSignal,
    navigateToSignal,
  };
}
