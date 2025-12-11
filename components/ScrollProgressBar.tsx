'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

const NEON = {
  purple: '#8b5cf6',
  cyan: '#0ea5e9',
  gold: '#D4AF37',
};

export interface ScrollProgressBarProps {
  height?: number;
  showGlow?: boolean;
  className?: string;
}

/**
 * Fixed horizontal scroll progress indicator
 * Requirements: 5.1 - Display scroll progress indicator
 */
export function ScrollProgressBar({
  height = 4,
  showGlow = true,
  className = '',
}: ScrollProgressBarProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 z-50 origin-left ${className}`}
      style={{
        height,
        scaleX,
        background: `linear-gradient(90deg, ${NEON.purple}, ${NEON.cyan}, ${NEON.gold})`,
        boxShadow: showGlow
          ? `0 0 20px ${NEON.cyan}, 0 0 40px ${NEON.purple}50`
          : 'none',
      }}
    />
  );
}

export default ScrollProgressBar;
