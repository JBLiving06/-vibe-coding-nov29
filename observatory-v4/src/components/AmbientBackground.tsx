import { motion } from 'framer-motion';

/**
 * Ambient Background - Key v3 visual element
 * Creates the floating, blurred, slowly-moving color blobs that give depth and atmosphere
 */
export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Primary teal blob */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-accent-primary/5 blur-3xl"
        style={{ top: '10%', left: '20%' }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.1, 0.95, 1],
          opacity: [0.3, 0.5, 0.4, 0.3],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Secondary gold blob */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-accent-gold/5 blur-3xl"
        style={{ bottom: '20%', right: '15%' }}
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 30, -20, 0],
          scale: [1, 0.9, 1.1, 1],
          opacity: [0.3, 0.4, 0.5, 0.3],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Tertiary teal blob */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-accent-primary/4 blur-3xl"
        style={{ top: '50%', right: '30%' }}
        animate={{
          x: [0, 30, -50, 0],
          y: [0, -50, 40, 0],
          scale: [1, 1.15, 0.9, 1],
          opacity: [0.2, 0.4, 0.3, 0.2],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Small accent blob */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full bg-accent-gold/4 blur-3xl"
        style={{ top: '70%', left: '10%' }}
        animate={{
          x: [0, 60, -20, 0],
          y: [0, -30, 50, 0],
          scale: [1, 0.85, 1.05, 1],
          opacity: [0.25, 0.35, 0.3, 0.25],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Static gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-warm-50/80 via-transparent to-warm-50/90" />
    </div>
  );
}
