import { motion } from 'framer-motion';
import { type SignalFamily } from '../data/signals';
import { cn, getTrendColor, getTrendIcon, getConfidenceLevel } from '../lib/utils';

interface SignalNodeProps {
  signal: SignalFamily;
  onClick: () => void;
  isSelected: boolean;
}

export default function SignalNode({ signal, onClick, isSelected }: SignalNodeProps) {
  const trendIcon = getTrendIcon(signal.trend);
  const trendColor = getTrendColor(signal.trend);
  const confidenceLevel = getConfidenceLevel(signal.confidence);

  // Color ring based on health
  const scoreColor = signal.score >= 70
    ? 'border-signal-healthy'
    : signal.score >= 50
    ? 'border-signal-attention'
    : 'border-signal-alert';

  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-center text-center focus:outline-none",
        isSelected && "z-10"
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      animate={{
        scale: isSelected ? 1.1 : 1,
      }}
    >
      {/* Main Circle */}
      <motion.div
        className={cn(
          "relative w-24 h-24 md:w-28 md:h-28 rounded-full",
          "bg-white shadow-lg shadow-warm-200/50",
          "border-2 transition-colors duration-300",
          scoreColor,
          isSelected && "ring-4 ring-accent-primary/20"
        )}
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Score */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl md:text-3xl font-semibold text-warm-800">
            {signal.score}
          </span>
          <span className={cn("text-lg font-medium", trendColor)}>
            {trendIcon}
          </span>
        </div>

        {/* Confidence Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="46%"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-warm-100"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r="46%"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className={cn(
              confidenceLevel === 'high' && "text-signal-healthy/40",
              confidenceLevel === 'medium' && "text-signal-attention/40",
              confidenceLevel === 'low' && "text-signal-alert/40"
            )}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: signal.confidence / 100 }}
            transition={{ duration: 1, delay: 0.5 }}
            strokeDasharray="100"
            style={{ strokeDashoffset: 0 }}
          />
        </svg>

        {/* Pulse Effect */}
        <motion.div
          className={cn(
            "absolute inset-0 rounded-full",
            scoreColor,
            "opacity-0"
          )}
          animate={{
            scale: [1, 1.3, 1.3],
            opacity: [0.3, 0, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      </motion.div>

      {/* Label */}
      <div className="mt-3 max-w-[140px]">
        <p className="text-sm font-medium text-warm-800 group-hover:text-warm-900 transition-colors">
          {signal.name}
        </p>
        <p className="text-xs text-warm-500 mt-1 line-clamp-2 leading-relaxed">
          {signal.synthesis}
        </p>
      </div>

      {/* Confidence Badge */}
      <motion.div
        className={cn(
          "absolute -top-1 -right-1 px-2 py-0.5 rounded-full text-[10px] font-mono",
          "bg-white shadow-sm border",
          confidenceLevel === 'high' && "text-signal-healthy border-signal-healthy/20",
          confidenceLevel === 'medium' && "text-signal-attention border-signal-attention/20",
          confidenceLevel === 'low' && "text-signal-alert border-signal-alert/20"
        )}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
      >
        {signal.confidence}%
      </motion.div>
    </motion.button>
  );
}
