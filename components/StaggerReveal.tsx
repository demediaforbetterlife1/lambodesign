'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef, ReactNode, Children } from 'react';
import { getRevealTransform, ANIMATION_CONFIG } from '@/lib/animationUtils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export type RevealDirection = 'up' | 'down' | 'left' | 'right';

interface StaggerRevealProps {
  children: ReactNode;
  staggerDelay?: number;
  direction?: RevealDirection;
  containerDelay?: number;
  distance?: number;
  blur?: boolean;
  className?: string;
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

/**
 * StaggerReveal Component
 * Animates multiple children with cascade effect
 * Requirements: 1.2
 */
export function StaggerReveal({
  children,
  staggerDelay = ANIMATION_CONFIG.staggerDelay / 1000,
  direction = 'up',
  containerDelay = 0,
  distance = 40,
  blur = true,
  className = '',
}: StaggerRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: ANIMATION_CONFIG.viewportMargin 
  });
  const prefersReducedMotion = useReducedMotion();

  const transform = getRevealTransform(direction, distance);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
        delayChildren: containerDelay,
      },
    },
  };

  const itemVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { duration: 0.2 },
        },
      }
    : {
        hidden: {
          opacity: 0,
          x: transform.x,
          y: transform.y,
          filter: blur ? 'blur(10px)' : 'blur(0px)',
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          filter: 'blur(0px)',
          transition: {
            duration: 0.6,
            ease: ANIMATION_CONFIG.ease.smooth,
          },
        },
      };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

/**
 * StaggerItem Component
 * Individual item for use within StaggerReveal
 */
export function StaggerItem({ children, className = '' }: StaggerItemProps) {
  return <div className={className}>{children}</div>;
}

export default StaggerReveal;
