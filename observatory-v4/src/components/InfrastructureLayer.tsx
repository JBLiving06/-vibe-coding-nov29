import { motion } from 'framer-motion';
import { infrastructureLayer } from '../data/priorities';

export default function InfrastructureLayer() {
  return (
    <motion.div
      className="bg-ink-800 rounded-lg p-5 lg:p-6 mb-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <div className="flex items-center gap-4">
        <span className="font-mono text-sm font-medium text-accent-light">
          {infrastructureLayer.number}
        </span>
        <div>
          <h3 className="font-display text-lg font-semibold text-white">
            {infrastructureLayer.title}
          </h3>
          <p className="text-sm text-ink-300">
            {infrastructureLayer.description}
          </p>
        </div>
      </div>

      <div className="flex gap-8">
        {infrastructureLayer.metrics.map((metric, i) => (
          <div key={i} className="text-right">
            <span className="font-mono text-lg font-medium text-white block">
              {metric.value}
            </span>
            <span className="text-[0.7rem] text-ink-400">{metric.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
