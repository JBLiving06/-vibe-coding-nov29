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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink-200 border-t border-ink-200">
      {/* Institutional Column */}
      <motion.div
        className="bg-paper p-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-md bg-accent-pale flex items-center justify-center">
            <Building2 className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h4 className="font-semibold text-ink-800">Institutional Adoption</h4>
            <p className="text-xs text-ink-500">
              Vertical scaling through districts and schools
            </p>
          </div>
        </div>
        <p className="text-sm text-ink-700 leading-relaxed mb-4">
          {institutionalScale.description}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-2xl font-medium text-ink-900">
            {institutionalScale.metric}
          </span>
          <span className="text-sm text-ink-600">
            {institutionalScale.metricLabel}
          </span>
        </div>
      </motion.div>

      {/* Hyperscaler Column */}
      <motion.div
        className="bg-hyperscaler-bg p-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-md bg-hyperscaler flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-ink-800">
              Hyperscaler Native Version
            </h4>
            <p className="text-xs text-ink-500">
              Horizontal scaling through platform embedding
            </p>
          </div>
        </div>
        <p className="text-sm text-ink-700 leading-relaxed mb-4">
          {hyperscalerScale.description}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-2xl font-medium text-ink-900">
            {hyperscalerScale.metric}
          </span>
          <span className="text-sm text-ink-600">
            {hyperscalerScale.metricLabel}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
