'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { getRevealTransform, ANIMATION_CONFIG } from '@/lib/animationUtils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export type RevealDirection = 'up' | 'down' | 'left' | 'right';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  duration?: number;
  delay?: number;
  blur?: boolean;
  distance?: number;
  once?: boolean;
  className?: string;
}

/**
 * ScrollReveal Component
 * Reveals content with configurable direction and blur effect
 * Requirements: 1.1, 6.1
 */
export function ScrollReveal({
  children,
  direction = 'up',
  duration = ANIMATION_CONFIG.revealDuration / 1000,
  delay = 0,
  blur = true,
  distance = 80,
  once = true,
  className = '',
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once, 
    margin: ANIMATION_CONFIG.viewportMargin as string
  });
  const prefersReducedMotion = useReducedMotion();

  // Get transform based on direction
  const transform = getRevealTransform(direction, distance);

  // Reduced motion: simple fade only
  if (prefersReducedMotion) {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        x: transform.x,
        y: transform.y,
        filter: blur ? 'blur(10px)' : 'blur(0px)',
      }}
      animate={isInView ? {
        opacity: 1,
        x: 0,
        y: 0,
        filter: 'blur(0px)',
      } : {}}
      transition={{
        duration,
        delay,
        ease: ANIMATION_CONFIG.ease.smooth,
      }}
    >
      {children}
    </motion.div>
  );
}

export default ScrollReveal;