'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { ANIMATION_CONFIG } from '@/lib/animationUtils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface HeroParallaxFadeProps {
  children: ReactNode;
  fadeStart?: number;
  fadeEnd?: number;
  parallaxSpeed?: number;
  className?: string;
}

/**
 * HeroParallaxFade Component
 * Hero-specific parallax with opacity fade based on scroll
 * Requirements: 3.2, 3.3
 */
export function HeroParallaxFade({
  children,
  fadeStart = 0,
  fadeEnd = 0.5,
  parallaxSpeed = 0.5,
  className = '',
}: HeroParallaxFadeProps) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Opacity fades from 1 to 0 as scroll progress goes from fadeStart to fadeEnd
  const rawOpacity = useTransform(
    scrollYProgress,
    [fadeStart, fadeEnd],
    [1, 0]
  );

  // Parallax movement
  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 300 * parallaxSpeed]
  );

  // Scale slightly as it fades
  const rawScale = useTransform(
    scrollYProgress,
    [fadeStart, fadeEnd],
    [1, 0.95]
  );

  // Apply spring physics for smooth movement
  const smoothOpacity = useSpring(rawOpacity, {
    stiffness: ANIMATION_CONFIG.spring.stiffness,
    damping: ANIMATION_CONFIG.spring.damping,
  });

  const smoothY = useSpring(rawY, {
    stiffness: ANIMATION_CONFIG.spring.stiffness,
    damping: ANIMATION_CONFIG.spring.damping,
  });

  const smoothScale = useSpring(rawScale, {
    stiffness: ANIMATION_CONFIG.spring.stiffness,
    damping: ANIMATION_CONFIG.spring.damping,
  });

  // Disable effects for reduced motion
  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        opacity: smoothOpacity,
        y: smoothY,
        scale: smoothScale,
      }}
    >
      {children}
    </motion.div>
  );
}

export default HeroParallaxFade;
