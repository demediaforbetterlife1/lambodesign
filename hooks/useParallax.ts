'use client';

import { useState, useEffect, useRef, CSSProperties } from 'react';
import { useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

export interface UseParallaxOptions {
  speed?: number; // Parallax speed multiplier (default: 0.5)
  direction?: 'vertical' | 'horizontal';
  maxOffset?: number; // Maximum offset in pixels (default: 200)
  springConfig?: { stiffness: number; damping: number };
}

export interface ParallaxResult {
  offset: number;
  style: CSSProperties;
  motionValue: MotionValue<number>;
}

/**
 * Calculate parallax offset based on scroll position
 * Property 3: Parallax offset is proportional to scroll and bounded
 * @param scrollPosition - Current scroll position (0-1 progress)
 * @param speed - Speed multiplier
 * @param maxOffset - Maximum offset in pixels
 * @returns Bounded offset value
 */
export function calculateParallaxOffset(
  scrollPosition: number,
  speed: number,
  maxOffset: number
): number {
  // Calculate raw offset (centered around 0.5 progress)
  const centeredProgress = scrollPosition - 0.5;
  const rawOffset = centeredProgress * speed * maxOffset * 2;
  
  // Bound the offset
  return Math.max(-maxOffset, Math.min(maxOffset, rawOffset));
}

/**
 * Hook for parallax scroll effects
 * Requirements: 4.4 - Parallax movement relative to scroll position
 */
export function useParallax(options: UseParallaxOptions = {}): ParallaxResult {
  const {
    speed = 0.5,
    direction = 'vertical',
    maxOffset = 200,
    springConfig = { stiffness: 100, damping: 30 },
  } = options;

  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress to parallax offset
  const rawOffset = useTransform(
    scrollYProgress,
    [0, 1],
    [-maxOffset * speed, maxOffset * speed]
  );
  
  // Apply spring physics for smooth movement
  const smoothOffset = useSpring(rawOffset, springConfig);
  
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    const unsubscribe = smoothOffset.on('change', (value) => {
      // Bound the value
      const boundedValue = Math.max(-maxOffset, Math.min(maxOffset, value));
      setOffset(boundedValue);
    });
    
    return () => unsubscribe();
  }, [smoothOffset, maxOffset]);

  // Generate CSS style based on direction
  const style: CSSProperties = direction === 'vertical'
    ? { transform: `translateY(${offset}px)` }
    : { transform: `translateX(${offset}px)` };

  return {
    offset,
    style,
    motionValue: smoothOffset,
  };
}

/**
 * Hook for element-specific parallax (relative to element position)
 */
export function useElementParallax(
  targetRef: React.RefObject<HTMLElement>,
  options: UseParallaxOptions = {}
): ParallaxResult {
  const {
    speed = 0.5,
    direction = 'vertical',
    maxOffset = 200,
    springConfig = { stiffness: 100, damping: 30 },
  } = options;

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });
  
  // Transform scroll progress to parallax offset
  const rawOffset = useTransform(
    scrollYProgress,
    [0, 1],
    [-maxOffset * speed, maxOffset * speed]
  );
  
  // Apply spring physics
  const smoothOffset = useSpring(rawOffset, springConfig);
  
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    const unsubscribe = smoothOffset.on('change', (value) => {
      const boundedValue = Math.max(-maxOffset, Math.min(maxOffset, value));
      setOffset(boundedValue);
    });
    
    return () => unsubscribe();
  }, [smoothOffset, maxOffset]);

  const style: CSSProperties = direction === 'vertical'
    ? { transform: `translateY(${offset}px)` }
    : { transform: `translateX(${offset}px)` };

  return {
    offset,
    style,
    motionValue: smoothOffset,
  };
}

export default useParallax;
