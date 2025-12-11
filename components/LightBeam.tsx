'use client';

import { motion } from 'framer-motion';

interface LightBeamProps {
  color?: string;
  intensity?: number;
  width?: number;
  animated?: boolean;
  position?: 'center' | 'left' | 'right';
  className?: string;
}

export default function LightBeam({
  color = 'rgba(14, 165, 233, 0.9)',
  intensity = 1,
  width = 4,
  animated = true,
  position = 'center',
  className = ''
}: LightBeamProps) {
  const positionStyles = {
    center: 'left-1/2 -translate-x-1/2',
    left: 'left-1/4 -translate-x-1/2',
    right: 'right-1/4 translate-x-1/2'
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Main intense beam */}
      <motion.div
        className={`absolute top-0 h-full ${positionStyles[position]}`}
        style={{ width: `${width}px` }}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ 
          opacity: 0.8 * intensity, 
          scaleY: 1 
        }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Core beam line - brightest */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, 
              transparent 0%, 
              ${color} 5%, 
              ${color} 50%, 
              ${color} 95%,
              transparent 100%)`,
            boxShadow: `0 0 ${10 * intensity}px ${color}, 0 0 ${20 * intensity}px ${color}`
          }}
          animate={animated ? {
            opacity: [0.7, 1, 0.7],
            scaleY: [1, 1.01, 1]
          } : {}}
          transition={animated ? {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          } : {}}
        />
        
        {/* Inner glow layer */}
        <div
          className="absolute inset-0 blur-[2px]"
          style={{
            background: `linear-gradient(to bottom, 
              transparent 0%, 
              ${color} 10%, 
              ${color} 50%, 
              transparent 100%)`,
            width: `${width * 2}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: 0.8 * intensity
          }}
        />

        {/* Outer glow layer */}
        <div
          className="absolute inset-0 blur-md"
          style={{
            background: `linear-gradient(to bottom, 
              transparent 0%, 
              ${color} 20%, 
              ${color} 50%, 
              transparent 100%)`,
            width: `${width * 6}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: 0.5 * intensity
          }}
        />

        {/* Wide ambient glow */}
        <div
          className="absolute inset-0 blur-2xl"
          style={{
            background: `linear-gradient(to bottom, 
              transparent 0%, 
              ${color} 30%, 
              ${color} 50%, 
              transparent 100%)`,
            width: `${width * 15}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: 0.3 * intensity
          }}
        />
      </motion.div>

      {/* Source glow at bottom - intense neon effect */}
      <motion.div
        className={`absolute bottom-0 ${positionStyles[position]}`}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.div
          className="relative"
          animate={animated ? {
            scale: [1, 1.3, 1],
            opacity: [0.8, 1, 0.8]
          } : {}}
          transition={animated ? {
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          } : {}}
        >
          {/* Core glow */}
          <div
            className="w-8 h-8 rounded-full"
            style={{
              background: color,
              boxShadow: `
                0 0 10px ${color},
                0 0 20px ${color},
                0 0 40px ${color},
                0 0 80px ${color}
              `,
              opacity: intensity
            }}
          />
          {/* Inner glow */}
          <div
            className="absolute inset-0 w-40 h-40 -left-16 -top-16 rounded-full blur-xl"
            style={{
              background: `radial-gradient(circle, ${color} 0%, transparent 60%)`,
              opacity: 0.8 * intensity
            }}
          />
          {/* Outer glow */}
          <div
            className="absolute inset-0 w-64 h-64 -left-28 -top-28 rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, ${color} 0%, transparent 50%)`,
              opacity: 0.5 * intensity
            }}
          />
          {/* Wide ambient */}
          <div
            className="absolute inset-0 w-96 h-96 -left-44 -top-44 rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, ${color} 0%, transparent 40%)`,
              opacity: 0.3 * intensity
            }}
          />
        </motion.div>
      </motion.div>

      {/* Ambient light spread across bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2"
        style={{
          background: `radial-gradient(ellipse at bottom center, ${color} 0%, transparent 50%)`,
          opacity: 0.2 * intensity
        }}
      />

      {/* Horizontal glow line at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{
          background: `linear-gradient(90deg, transparent 20%, ${color} 50%, transparent 80%)`,
          boxShadow: `0 0 20px ${color}, 0 0 40px ${color}`
        }}
        animate={animated ? {
          opacity: [0.5, 1, 0.5]
        } : {}}
        transition={animated ? {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        } : {}}
      />
    </div>
  );
}
