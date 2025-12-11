'use client';

import { motion } from 'framer-motion';
import { SPACE_COLORS } from '@/lib/constants';

interface LightRaysProps {
  rayCount?: number;
  color?: string;
  spread?: number;
  animated?: boolean;
  className?: string;
}

export default function LightRays({
  rayCount = 12,
  color = SPACE_COLORS.glowCyan,
  spread = 360,
  animated = true,
  className = ''
}: LightRaysProps) {
  const rays = Array.from({ length: rayCount }, (_, i) => ({
    id: i,
    angle: (spread / rayCount) * i,
    delay: i * 0.1
  }));

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={{ transformOrigin: 'center center' }}
        animate={animated ? { rotate: 360 } : {}}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        {rays.map((ray) => (
          <motion.div
            key={ray.id}
            className="absolute top-1/2 left-1/2 w-[200%] h-[2px]"
            style={{
              transform: `translate(-50%, -50%) rotate(${ray.angle}deg)`,
              background: `linear-gradient(90deg, transparent 0%, ${color} 30%, transparent 50%, ${color} 70%, transparent 100%)`,
              opacity: 0.3
            }}
            animate={animated ? {
              opacity: [0.2, 0.4, 0.2]
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: ray.delay,
              ease: 'easeInOut'
            }}
          />
        ))}
      </motion.div>
      
      {/* Central glow */}
      <div
        className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          opacity: 0.5
        }}
      />
    </div>
  );
}
