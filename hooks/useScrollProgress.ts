'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSpring, useMotionValue } from 'framer-motion';
import { calculateScrollProgress, ANIMATION_CONFIG } from '@/lib/animationUtils';

export interface ScrollState {
  progress: number;
  direction: 'up' | 'down';
  velocity: number;
  isScrolling: boolean;
  scrollY: number;
}

/**
 * Hook to track scroll progress with spring physics
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
