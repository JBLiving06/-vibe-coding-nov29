import { motion } from 'framer-motion';
import { Building2, Zap } from 'lucide-react';

interface ScaleData {
  description: string;
  metric: string;
  metricLabel: string;
}

interface DualScaleViewProps {
  institutionalScale: ScaleData;
  hyperscalerScale: ScaleData;
}

/**
 * Dual Scale View - Institutional vs Hyperscaler
 * This is NOT decorative. It represents the dual scaling model
 * that is central to the Gates strategy.
 */
export default function DualScaleView({
  institutionalScale,
  hyperscalerScale,
}: DualScaleViewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 border-t border-warm-200">
      {/* Institutional Column */}
      <motion.div
        className="bg-gradient-to-br from-warm-50 to-white p-6 lg:p-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-accent-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-warm-800">Institutional Adoption</h4>
            <p className="text-xs text-warm-500">
              Vertical scaling through districts and schools
            </p>
          </div>
        </div>
        <p className="text-sm text-warm-600 leading-relaxed mb-4">
          {institutionalScale.description}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-3xl font-semibold text-accent-primary">
            {institutionalScale.metric}
          </span>
          <span className="text-sm text-warm-600">
            {institutionalScale.metricLabel}
          </span>
        </div>
      </motion.div>

      {/* Hyperscaler Column */}
      <motion.div
        className="bg-gradient-to-br from-hyperscaler-bg to-amber-50 p-6 lg:p-8 border-l border-warm-200"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-hyperscaler flex items-center justify-center shadow-md">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-warm-800">
              Hyperscaler Native Version
            </h4>
            <p className="text-xs text-warm-500">
              Horizontal scaling through platform embedding
            </p>
          </div>
        </div>
        <p className="text-sm text-warm-600 leading-relaxed mb-4">
          {hyperscalerScale.description}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-3xl font-semibold text-hyperscaler">
            {hyperscalerScale.metric}
          </span>
          <span className="text-sm text-warm-600">
            {hyperscalerScale.metricLabel}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
