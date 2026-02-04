import { forwardRef, ReactNode, useEffect, useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { supportsBackdropFilter, getDeviceProfile } from '../../lib/deviceProfile';
import './glass.css';

export interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  /** Intensity of the blur effect (1-3, default 2) */
  blur?: 1 | 2 | 3;
  /** Whether to show the glow border effect */
  glow?: boolean;
  /** Whether the card has hover effects */
  hoverable?: boolean;
  /** Semantic HTML tag to use */
  as?: 'div' | 'section' | 'article' | 'aside';
}

/**
 * GlassCard - Glassmorphism card with proper fallbacks
 *
 * Features:
 * - backdrop-filter blur on supported browsers
 * - Solid fallback background on unsupported browsers
 * - Reduced blur on low-end devices
 * - Animated glow border option
 * - Respects prefers-reduced-motion
 */
const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      children,
      blur = 2,
      glow = false,
      hoverable = false,
      as = 'div',
      className = '',
      ...props
    },
    ref
  ) => {
    const [supportsBlur, setSupportsBlur] = useState(true);
    const [isLowEnd, setIsLowEnd] = useState(false);

    useEffect(() => {
      setSupportsBlur(supportsBackdropFilter());
      setIsLowEnd(getDeviceProfile() === 'low');
    }, []);

    // Determine effective blur level
    const effectiveBlur = isLowEnd ? 1 : blur;
    const showBlur = supportsBlur && !isLowEnd;

    const blurClass = showBlur ? `glass-blur-${effectiveBlur}` : 'glass-solid';
    const glowClass = glow ? 'glass-glow' : '';
    const hoverClass = hoverable ? 'glass-hoverable' : '';

    const MotionComponent = motion[as] as typeof motion.div;

    return (
      <MotionComponent
        ref={ref}
        className={`glass-card ${blurClass} ${glowClass} ${hoverClass} ${className}`}
        {...props}
      >
        {children}
      </MotionComponent>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;

/**
 * GlassPanel - A larger glass container for sections
 */
export interface GlassPanelProps extends GlassCardProps {
  /** Panel title */
  title?: string;
  /** Panel subtitle */
  subtitle?: string;
}

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ title, subtitle, children, ...props }, ref) => {
    return (
      <GlassCard ref={ref} as="section" {...props}>
        {(title || subtitle) && (
          <div className="glass-panel-header">
            {title && <h3 className="glass-panel-title">{title}</h3>}
            {subtitle && <p className="glass-panel-subtitle">{subtitle}</p>}
          </div>
        )}
        <div className="glass-panel-content">{children}</div>
      </GlassCard>
    );
  }
);

GlassPanel.displayName = 'GlassPanel';

/**
 * GlassOverlay - Overlay with blur effect for modals/dialogs
 */
export interface GlassOverlayProps {
  visible: boolean;
  onClose?: () => void;
  children: ReactNode;
}

export function GlassOverlay({ visible, onClose, children }: GlassOverlayProps) {
  if (!visible) return null;

  return (
    <motion.div
      className="glass-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="glass-overlay-content"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
