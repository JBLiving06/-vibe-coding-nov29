import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import SignalNode from './SignalNode';
import type { SignalFamily } from '../types';
import { futureSignals } from '../data/signals';

interface ConstellationProps {
  signals: SignalFamily[];
  onSignalSelect: (signal: SignalFamily) => void;
  selectedSignalId: string | null;
}

// Define positions for constellation layout
const nodePositions = [
  { x: 50, y: 12, scale: 1 },     // Supply Maturity (top center)
  { x: 18, y: 32, scale: 0.95 },  // Demand & Adoption (left upper)
  { x: 82, y: 28, scale: 0.95 },  // Policy & Public Funding (right upper)
  { x: 35, y: 52, scale: 1 },     // Capacity to Implement (center left)
  { x: 68, y: 48, scale: 0.9 },   // Cadence (center right)
  { x: 12, y: 72, scale: 0.85 },  // Competition (bottom left)
  { x: 88, y: 70, scale: 1 },     // Equity & Access (bottom right)
];

const futurePositions = [
  { x: 50, y: 92, scale: 0.7 },
  { x: 25, y: 90, scale: 0.65 },
  { x: 75, y: 94, scale: 0.65 },
];

// Connection lines between related signals
const connections = [
  { from: 0, to: 1 }, // Supply -> Demand
  { from: 0, to: 2 }, // Supply -> Policy
  { from: 0, to: 3 }, // Supply -> Capacity
  { from: 1, to: 2 }, // Demand -> Policy
  { from: 1, to: 3 }, // Demand -> Capacity
  { from: 2, to: 6 }, // Policy -> Equity
  { from: 3, to: 4 }, // Capacity -> Cadence
  { from: 5, to: 0 }, // Competition -> Supply
  { from: 6, to: 3 }, // Equity -> Capacity
];

export default function Constellation({
  signals,
  onSignalSelect,
  selectedSignalId,
}: ConstellationProps) {
  // Memoize position calculations
  const signalPositions = useMemo(() => {
    return signals.map((signal, index) => ({
      signal,
      position: nodePositions[index] || { x: 50, y: 50, scale: 1 },
    }));
  }, [signals]);

  return (
    <div className="relative w-full min-h-[600px] lg:min-h-[700px]">
      {/* Connection Lines SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(168 162 158)" stopOpacity="0.2" />
            <stop offset="50%" stopColor="rgb(168 162 158)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="rgb(168 162 158)" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {connections.map((conn, index) => {
          const from = nodePositions[conn.from];
          const to = nodePositions[conn.to];
          if (!from || !to) return null;
          return (
            <motion.line
              key={`connection-${index}`}
              x1={`${from.x}%`}
              y1={`${from.y}%`}
              x2={`${to.x}%`}
              y2={`${to.y}%`}
              stroke="url(#lineGradient)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                pathLength: { duration: 1.5, delay: index * 0.1 },
                opacity: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
              }}
            />
          );
        })}
      </svg>

      {/* Signal Nodes */}
      {signalPositions.map(({ signal, position }, index) => (
        <motion.div
          key={signal.id}
          className="absolute"
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: position.scale,
          }}
          transition={{
            delay: 0.3 + index * 0.1,
            duration: 0.5,
            type: 'spring',
            stiffness: 100,
          }}
        >
          <SignalNode
            signal={signal}
            onClick={() => onSignalSelect(signal)}
            isSelected={selectedSignalId === signal.id}
          />
        </motion.div>
      ))}

      {/* Future Signals (Gated) */}
      {futureSignals.map((future, index) => {
        const position = futurePositions[index];
        if (!position) return null;
        return (
          <motion.div
            key={future.id}
            className="absolute"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 + index * 0.2, duration: 0.5 }}
          >
            <div className="flex flex-col items-center gap-2 opacity-40 hover:opacity-60 transition-opacity cursor-not-allowed">
              <div className="w-16 h-16 rounded-full border border-dashed border-warm-300 flex items-center justify-center bg-warm-100/50">
                <Lock className="w-4 h-4 text-warm-400" />
              </div>
              <div className="text-center">
                <p className="text-xs font-medium text-warm-500">{future.name}</p>
                <p className="text-[10px] text-warm-400">{future.availableDate}</p>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Legend */}
      <motion.div
        className="absolute bottom-4 left-4 flex flex-wrap items-center gap-4 text-xs text-warm-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <div className="flex items-center gap-2">
          <span className="text-signal-healthy">↑</span>
          <span>Rising</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-signal-attention">→</span>
          <span>Stable</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-signal-alert">↓</span>
          <span>Declining</span>
        </div>
        <div className="h-4 w-px bg-warm-300" />
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-teal-500" />
          <span>Practitioner</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-500" />
          <span>Institutional</span>
        </div>
      </motion.div>
    </div>
  );
}
