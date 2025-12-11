'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';
import { splitText, ANIMATION_CONFIG } from '@/lib/animationUtils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface TextReveal3DProps {
  text: string;
  mode?: 'character' | 'word';
  delay?: number;
  staggerDelay?: number;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

/**
 * TextReveal3D Component
 * Animates text with 3D flip effect from below
 * Requirements: 1.4
 */
export function TextReveal3D({
  text,
  mode = 'character',
  delay = 0,
  staggerDelay,
  className = '',
  as: Tag = 'span',
}: TextReveal3DProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true
  });
  const prefersReducedMotion = useReducedMotion();

  // Default stagger delays based on mode
  const defaultStagger = mode === 'character' ? 0.03 : 0.08;
  const actualStagger = staggerDelay ?? defaultStagger;

  const elements = splitText(text, mode);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : actualStagger,
        delayChildren: delay,
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
          y: 50,
          rotateX: -90,
          filter: 'blur(4px)',
        },
        visible: {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: 'blur(0px)',
          transition: {
            duration: 0.5,
            ease: ANIMATION_CONFIG.ease.smooth,
          },
        },
      };

  return (
    <Tag ref={ref} className={className} style={{ perspective: '1000px' }}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{ display: 'inline-block' }}
      >
        {elements.map((element, index) => (
          <motion.span
            key={index}
            variants={itemVariants}
            style={{
              display: 'inline-block',
              transformStyle: 'preserve-3d',
              whiteSpace: element === ' ' ? 'pre' : 'normal',
            }}
          >
            {element === ' ' ? '\u00A0' : element}
            {mode === 'word' && index < elements.length - 1 && '\u00A0'}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}

export default TextReveal3D;