'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { ANIMATION_CONFIG, NEON_COLORS } from '@/lib/animationUtils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ImageBloomProps {
  children: ReactNode;
  initialScale?: number;
  bloomColor?: string;
  bloomIntensity?: number;
  className?: string;
}

/**
 * ImageBloom Component
 * Scales images with luminosity bloom effect on reveal
 * Requirements: 1.5
 */
export function ImageBloom({
  children,
  initialScale = 0.8,
  bloomColor = NEON_COLORS.cyan,
  bloomIntensity = 0.6,
  className = '',
}: ImageBloomProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "100px"
  });
  const prefersReducedMotion = useReducedMotion();

  // Reduced motion: simple fade
  if (prefersReducedMotion) {
    return (
      <motion.div
        ref={ref}
        className={`relative ${className}`}
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
      className={`relative ${className}`}
      initial={{ 
        opacity: 0, 
        scale: initialScale,
        filter: 'blur(10px)',
      }}
      animate={isInView ? { 
        opacity: 1, 
        scale: 1,
        filter: 'blur(0px)',
      } : {}}
      transition={{
        duration: 0.8,
        ease: ANIMATION_CONFIG.ease.smooth,
      }}
    >
      {/* Bloom glow effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-lg"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={isInView ? {
          opacity: [0, bloomIntensity, 0],
          scale: [1.1, 1.05, 1],
        } : {}}
        transition={{
          duration: 1.2,
          ease: 'easeOut',
        }}
        style={{
          background: `radial-gradient(ellipse at center, ${bloomColor}40 0%, transparent 70%)`,
          filter: 'blur(30px)',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

export default ImageBloom;
