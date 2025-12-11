'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { ANIMATION_CONFIG } from '@/lib/animationUtils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  direction?: 'vertical' | 'horizontal';
  className?: string;
}

/**
 * ParallaxLayer Component
 * Creates depth with differential scroll speeds
 * Requirements: 1.3, 3.3, 6.1
 * 
 * Speed guide:
 * - 0.3 for background elements (moves slower)
 * - 1.0 for normal scroll
 * - 1.2 for foreground elements (moves faster)
 */
export function ParallaxLayer({
  children,
  speed = 0.5,
  direction = 'vertical',
  className = '',
}: ParallaxLayerProps) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Calculate parallax offset based on speed
  // Positive speed = element moves in same direction as scroll but slower/faster
  const range = 200 * speed;
  
  const rawY = useTransform(scrollYProgress, [0, 1], [range, -range]);
  const rawX = useTransform(scrollYProgress, [0, 1], [range, -range]);

  // Apply spring physics for smooth movement
  const smoothY = useSpring(rawY, {
    stiffness: ANIMATION_CONFIG.spring.stiffness,
    damping: ANIMATION_CONFIG.spring.damping,
  });

  const smoothX = useSpring(rawX, {
    stiffness: ANIMATION_CONFIG.spring.stiffness,
    damping: ANIMATION_CONFIG.spring.damping,
  });

  // Disable parallax for reduced motion
  if (prefersReducedMotion) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y: direction === 'vertical' ? smoothY : 0,
        x: direction === 'horizontal' ? smoothX : 0,
      }}
    >
      {children}
    </motion.div>
  );
}

export default ParallaxLayer;
