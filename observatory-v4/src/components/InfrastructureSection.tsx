import { motion } from 'framer-motion';
import { Database, Shield, Network, Layers } from 'lucide-react';

const infrastructureItems = [
  {
    id: 'data-systems',
    icon: Database,
    label: 'Data Systems',
    description: 'Interoperable learning records and data portability standards',
  },
  {
    id: 'trust-frameworks',
    icon: Shield,
    label: 'Trust Frameworks',
    description: 'Credential verification and quality assurance mechanisms',
  },
  {
    id: 'integration',
    icon: Network,
    label: 'Integration Layer',
    description: 'API standards and system interconnection protocols',
  },
  {
    id: 'governance',
    icon: Layers,
    label: 'Governance',
    description: 'Multi-stakeholder coordination and shared ownership models',
  },
];

/**
 * InfrastructureSection - The "plumbing" layer of USP 2030
 * Features a glowing animated border to emphasize its foundational importance
 * Similar treatment to Capital Flows in v3
 */
export default function InfrastructureSection() {
  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      {/* Section Label */}
      <div className="flex items-center gap-2 mb-6">
        <span className="font-mono text-xs text-warm-500 uppercase tracking-widest">
          Infrastructure Investment
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-warm-300 to-transparent" />
      </div>

      {/* Glowing Card Container */}
      <div className="glow-card rounded-2xl p-1">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="font-display text-xl font-semibold text-warm-800 mb-1">
                Shared Infrastructure
              </h3>
              <p className="text-sm text-warm-600">
                Cross-cutting investments that enable all solution priorities
              </p>
            </div>

            {/* Animated Status Badge */}
            <motion.div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-primary/10"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-accent-primary"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs font-medium text-accent-primary">Foundation Layer</span>
            </motion.div>
          </div>

          {/* Infrastructure Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {infrastructureItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  className="group p-4 rounded-xl bg-gradient-to-br from-warm-50 to-warm-100/50
                             border border-warm-200/50 hover:border-accent-primary/30
                             hover:shadow-md transition-all duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-white shadow-sm border border-warm-200/50
                                  flex items-center justify-center mb-3
                                  group-hover:border-accent-primary/30 group-hover:shadow-md
                                  transition-all duration-300">
                    <Icon className="w-5 h-5 text-accent-primary" />
                  </div>

                  {/* Label */}
                  <h4 className="font-semibold text-warm-800 mb-1">
                    {item.label}
                  </h4>

                  {/* Description */}
                  <p className="text-xs text-warm-600 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Connection Visualization */}
          <motion.div
            className="mt-6 pt-6 border-t border-warm-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <div className="flex items-center justify-center gap-4">
              <span className="text-xs text-warm-500">Enables</span>
              <div className="flex items-center gap-2">
                {['Core Instruction', 'Gateway Math', 'Advising', 'Mobility'].map((priority, i) => (
                  <motion.div
                    key={priority}
                    className="px-2 py-1 rounded bg-warm-100 text-xs text-warm-600"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4 + i * 0.1 }}
                  >
                    {priority}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Connecting lines to priorities (visual flourish) */}
      <div className="flex justify-center mt-4">
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-accent-primary/30 to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        />
      </div>
    </motion.section>
  );
}
