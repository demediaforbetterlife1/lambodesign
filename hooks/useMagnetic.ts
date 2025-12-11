'use client';

import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { calculateMagneticOffset } from '@/lib/constants';

interface UseMagneticOptions {
  maxOffset?: number;
  duration?: number;
  ease?: string;
}

export function useMagnetic<T extends HTMLElement>(options: UseMagneticOptions = {}) {
  const {
    maxOffset = 0.3,
    duration = 0.3,
    ease = 'power2.out'
  } = options;
  
  const elementRef = useRef<T>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!elementRef.current) return;
    
    const rect = elementRef.current.getBoundingClientRect();
    const offset = calculateMagneticOffset(
      e.clientX,
      e.clientY,
      { left: rect.left, top: rect.top, width: rect.width, height: rect.height },
      maxOffset
    );

    gsap.to(elementRef.current, {
      x: offset.x,
      y: offset.y,
      duration,
      ease
    });
  }, [maxOffset, duration, ease]);

  const handleMouseLeave = useCallback(() => {
    if (!elementRef.current) return;
    
    gsap.to(elementRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)'
    });
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return elementRef;
}

export default useMagnetic;
