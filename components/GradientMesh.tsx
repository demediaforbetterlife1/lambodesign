'use client';

import { motion } from 'framer-motion';

interface GradientMeshProps {
  colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
  };
  animated?: boolean;
  className?: string;
}

export default function GradientMesh({
  colors = {
    primary: '#0a1628',
    secondary: '#1a0a2e',
    accent: '#0d0618'
  },
  animated = true,
  className = ''
}: GradientMeshProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Base dark gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, #0a0a0a, #000)'
        }}
      />
      
      {/* Primary gradient blob - top left */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)`,
          top: '-20%',
          left: '-10%',
          opacity: 0.8
        }}
        animate={animated ? {
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1]
        } : {}}
        transition={animated ? {
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut'
        } : {}}
      />
      
      {/* Secondary gradient blob - top right */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${colors.secondary} 0%, transparent 70%)`,
          top: '-10%',
          right: '-5%',
          opacity: 0.7
        }}
        animate={animated ? {
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1]
        } : {}}
        transition={animated ? {
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2
        } : {}}
      />
      
      {/* Accent gradient blob - bottom center */}
      <motion.div
        className="absolute w-[1000px] h-[500px] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(ellipse, ${colors.accent} 0%, transparent 60%)`,
          bottom: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: 0.6
        }}
        animate={animated ? {
          y: [0, -30, 0],
          scale: [1, 1.05, 1]
        } : {}}
        transition={animated ? {
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        } : {}}
      />
      
      {/* Subtle gold accent */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
          top: '30%',
          left: '60%',
          opacity: 0.5
        }}
        animate={animated ? {
          x: [0, -30, 0],
          y: [0, 20, 0]
        } : {}}
        transition={animated ? {
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3
        } : {}}
      />
      
      {/* Noise overlay for texture */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />
    </div>
  );
}
