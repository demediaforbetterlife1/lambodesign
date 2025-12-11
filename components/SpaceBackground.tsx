'use client';

import { useEffect, useState } from 'react';
import Starfield from './Starfield';
import NebulaBackground from './NebulaBackground';

interface SpaceBackgroundProps {
  starCount?: number;
  nebulaIntensity?: number;
  animated?: boolean;
  className?: string;
}

export default function SpaceBackground({
  starCount = 200,
  nebulaIntensity = 0.4,
  animated = true,
  className = ''
}: SpaceBackgroundProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const shouldAnimate = animated && !prefersReducedMotion;

  return (
    <div className={`fixed inset-0 ${className}`} style={{ zIndex: 0 }}>
      {/* Nebula layer (bottom) */}
      <NebulaBackground 
        animated={shouldAnimate} 
        intensity={nebulaIntensity}
      />
      
      {/* Starfield layer (top) */}
      <Starfield 
        starCount={starCount}
        layers={3}
        speed={1}
      />
    </div>
  );
}
