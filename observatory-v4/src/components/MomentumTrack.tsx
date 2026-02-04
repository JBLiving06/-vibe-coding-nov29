import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Trophy } from 'lucide-react';

const milestones = [
  { id: 1, label: 'Passed Algebra by 9th Grade', short: 'Algebra' },
  { id: 2, label: 'Completed Gateway Courses', short: 'Gateway' },
  { id: 3, label: 'Enrolled Immediately in Postsecondary', short: 'Enrolled' },
  { id: 4, label: 'Applied Recognized Learning', short: 'Applied' },
  { id: 5, label: 'Earned a Credential of Value', short: 'Credential', isGoal: true },
];

/**
 * MomentumTrack - E→W Milestone Progression
 * Shows the Gates Foundation's outcome milestones as a connected journey
 */
export default function MomentumTrack() {
  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* Section Label */}
      <div className="flex items-center gap-2 mb-6">
        <span className="font-mono text-xs text-warm-500 uppercase tracking-widest">
          E→W Momentum
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-warm-300 to-transparent" />
      </div>

      {/* Track Container */}
      <div className="glass-card p-6 lg:p-8">
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-warm-200 hidden sm:block" />
          <motion.div
            className="absolute top-6 left-0 h-0.5 bg-gradient-to-r from-accent-primary to-accent-gold hidden sm:block"
            initial={{ width: '0%' }}
            animate={{ width: '80%' }}
            transition={{ delay: 0.8, duration: 1.5, ease: 'easeOut' }}
          />

          {/* Milestones */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-2">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.id}
                className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-2 flex-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                {/* Milestone Node */}
                <div className={`
                  relative z-10 flex items-center justify-center
                  ${milestone.isGoal
                    ? 'w-12 h-12 rounded-full bg-gradient-to-br from-accent-gold to-amber-500 shadow-lg shadow-amber-200'
                    : 'w-10 h-10 rounded-full bg-white border-2 border-accent-primary shadow-sm'
                  }
                `}>
                  {milestone.isGoal ? (
                    <Trophy className="w-5 h-5 text-white" />
                  ) : index < 4 ? (
                    <CheckCircle2 className="w-5 h-5 text-accent-primary" />
                  ) : (
                    <Circle className="w-5 h-5 text-warm-400" />
                  )}

                  {/* Pulse ring for goal */}
                  {milestone.isGoal && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-accent-gold"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  )}
                </div>

                {/* Label */}
                <div className="sm:text-center sm:mt-2">
                  <p className={`
                    text-sm font-medium leading-tight
                    ${milestone.isGoal ? 'text-accent-gold' : 'text-warm-700'}
                  `}>
                    <span className="sm:hidden">{milestone.label}</span>
                    <span className="hidden sm:inline lg:hidden">{milestone.short}</span>
                    <span className="hidden lg:inline">{milestone.label}</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Track Legend */}
        <div className="mt-6 pt-4 border-t border-warm-200 flex items-center justify-center gap-6 text-xs text-warm-500">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent-primary" />
            <span>Progress tracked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-accent-gold to-amber-500" />
            <span>USP 2030 Goal</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
