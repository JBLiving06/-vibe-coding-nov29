import { motion } from 'framer-motion';
import { Users, Briefcase, GraduationCap, Building2 } from 'lucide-react';

const enablementItems = [
  {
    id: 'practitioner-capacity',
    icon: Users,
    title: 'Practitioner Capacity Building',
    description: 'Developing skills and mindsets for AI-augmented practice',
    status: 'Active signals',
  },
  {
    id: 'employer-engagement',
    icon: Briefcase,
    title: 'Employer Engagement',
    description: 'Building bridges between learning and employment',
    status: 'Growing',
  },
  {
    id: 'learner-agency',
    icon: GraduationCap,
    title: 'Learner Agency',
    description: 'Tools and approaches that center learner ownership',
    status: 'Emerging',
  },
  {
    id: 'institutional-transformation',
    icon: Building2,
    title: 'Institutional Transformation',
    description: 'Organizational change for new learning models',
    status: 'Watch',
  },
];

/**
 * EnablementRow - Cross-cutting enablers that support all priorities
 * Presented as a horizontal band of interconnected themes
 */
export default function EnablementRow() {
  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0 }}
    >
      {/* Section Label */}
      <div className="flex items-center gap-2 mb-6">
        <span className="font-mono text-xs text-warm-500 uppercase tracking-widest">
          Cross-Cutting Enablement
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-warm-300 to-transparent" />
      </div>

      {/* Enablement Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {enablementItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              className="glass-card p-4 group"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-primary/10 to-accent-gold/10
                                flex items-center justify-center flex-shrink-0
                                group-hover:from-accent-primary/20 group-hover:to-accent-gold/20
                                transition-all duration-300">
                  <Icon className="w-4 h-4 text-accent-primary" />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Title */}
                  <h4 className="font-semibold text-sm text-warm-800 mb-1 leading-tight">
                    {item.title}
                  </h4>

                  {/* Description */}
                  <p className="text-xs text-warm-600 mb-2 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Status Badge */}
                  <span className="inline-flex items-center gap-1.5 text-xs text-warm-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-primary/50" />
                    {item.status}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
