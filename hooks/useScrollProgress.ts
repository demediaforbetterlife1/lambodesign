'use client';

import { useState, useEffect, useRef, useCallback, RefObject } from 'react';
import { useSpring, useMotionValue, useScroll, useTransform, MotionValue } from 'framer-motion';
import { calculateScrollProgress, ANIMATION_CONFIG } from '@/lib/animationUtils';

export interface ScrollState {
  progress: number;
  direction: 'up' | 'down';
  velocity: number;
  isScrolling: boolean;
  scrollY: number;
}

export interface SectionScrollState {
  progress: number;
  isInView: boolean;
  scrollDirection: 'up' | 'down';
}

/**
 * Calculate section-based scroll progress (0-1)
 * Property 1: Scroll progress calculation is bounded and monotonic
 * @param scrollY - Current scroll position
 * @param sectionTop - Section top offset
 * @param sectionHeight - Section height
 * @param viewportHeight - Viewport height
 * @returns Progress value between 0 and 1
 */
export function calculateSectionProgress(
  scrollY: number,
  sectionTop: number,
  sectionHeight: number,
  viewportHeight: number
): number {
  // Calculate when section starts entering viewport (bottom of viewport hits top of section)
  const startPoint = sectionTop - viewportHeight;
  // Calculate when section is fully scrolled past (top of viewport passes bottom of section)
  const endPoint = sectionTop + sectionHeight;
  
  // Total scroll distance for this section
  const totalDistance = endPoint - startPoint;
  
  if (totalDistance <= 0) return 0;
  
  // Current position relative to start
  const currentPosition = scrollY - startPoint;
  
  // Calculate progress and clamp to [0, 1]
  const progress = currentPosition / totalDistance;
  return Math.max(0, Math.min(1, progress));
}

/**
 * Hook to track scroll progress within a specific section
 * Requirements: 2.4 - Section-based progress calculation
 */
export function useSectionScrollProgress(
  targetRef: RefObject<HTMLElement | null>,
  options: { offset?: ['start end' | 'end start' | 'start start' | 'end end', 'start end' | 'end start' | 'start start' | 'end end'] } = {}
): SectionScrollState {
  const [state, setState] = useState<SectionScrollState>({
    progress: 0,
    isInView: false,
    scrollDirection: 'down',
  });
  
  const lastScrollY = useRef(0);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: options.offset ?? ['start end', 'end start'],
  });

  useEffect(() => {
    const handleChange = (latest: number) => {
      const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
      const direction: 'up' | 'down' = currentScrollY >= lastScrollY.current ? 'down' : 'up';
      lastScrollY.current = currentScrollY;
      
      setState({
        progress: Math.max(0, Math.min(1, latest)),
        isInView: latest > 0 && latest < 1,
        scrollDirection: direction,
      });
    };

    const unsubscribe = scrollYProgress.on('change', handleChange);
    return () => unsubscribe();
  }, [scrollYProgress]);

  return state;
}

/**
 * Hook to track overall page scroll progress with spring physics
 * Requirements: 3.1, 3.3
 */
export function useScrollProgress() {
  const [scrollState, setScrollState] = useState<ScrollState>({
    progress: 0,
    direction: 'down',
    velocity: 0,
    isScrolling: false,
    scrollY: 0,
  });

  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Motion values for spring physics
  const rawProgress = useMotionValue(0);
  const springProgress = useSpring(rawProgress, {
    stiffness: ANIMATION_CONFIG.spring.stiffness,
    damping: ANIMATION_CONFIG.spring.damping,
  });

  const handleScroll = useCallback(() => {
    if (typeof window === 'undefined') return;

    const currentScrollY = window.scrollY;
    const currentTime = Date.now();
    const timeDelta = currentTime - lastTime.current;

    // Calculate progress
    const docHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const progress = calculateScrollProgress(currentScrollY, docHeight, viewportHeight);

    // Calculate direction and velocity
    const scrollDelta = currentScrollY - lastScrollY.current;
    const direction: 'up' | 'down' = scrollDelta >= 0 ? 'down' : 'up';
    const velocity = timeDelta > 0 ? Math.abs(scrollDelta) / timeDelta : 0;

    // Update motion value for spring
    rawProgress.set(progress);

    // Update state
    setScrollState({
      progress,
      direction,
      velocity,
      isScrolling: true,
      scrollY: currentScrollY,
    });

    // Update refs
    lastScrollY.current = currentScrollY;
    lastTime.current = currentTime;

    // Clear existing timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    // Set scrolling to false after scroll stops
    scrollTimeout.current = setTimeout(() => {
      setScrollState(prev => ({ ...prev, isScrolling: false }));
    }, 150);
  }, [rawProgress]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Throttle scroll handler for performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [handleScroll]);

  return {
    ...scrollState,
    springProgress, // Framer Motion spring value for smooth animations
  };
}

export default useScrollProgress;
