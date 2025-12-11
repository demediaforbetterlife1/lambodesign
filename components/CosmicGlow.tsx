'use client';

import { motion } from 'framer-motion';
import { SPACE_COLORS } from '@/lib/constants';

interface CosmicGlowProps {
  color?: string;
  intensity?: number;
  animated?: boolean;
  className?: string;
}

export default function CosmicGlow({
  color = SPACE_COLORS.glowPurple,
  intensity = 0.8,
  animated = true,
  className = ''
}: CosmicGlowProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Primary glow */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, ${color} 0%, transparent 70%)`,
          opacity: intensity
        }}
        animate={animated ? {
          scale: [1, 1.1, 1],
          opacity: [intensity * 0.8, intensity, intensity * 0.8]
        } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Secondary glow ring */}
      <motion.div
        className="absolute inset-[-20%]"
        style={{
          background: `radial-gradient(ellipse at center, transparent 40%, ${color} 50%, transparent 60%)`,
          opacity: intensity * 0.5
        }}
        animate={animated ? {
          scale: [1, 1.15, 1],
          rotate: [0, 180, 360]
        } : {}}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Inner bright core */}
      <motion.div
        className="absolute inset-[30%]"
        style={{
          background: `radial-gradient(circle at center, ${SPACE_COLORS.starWhite}40 0%, transparent 70%)`,
          opacity: intensity * 0.6
        }}
        animate={animated ? {
          scale: [1, 1.2, 1],
          opacity: [intensity * 0.4, intensity * 0.6, intensity * 0.4]
        } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
