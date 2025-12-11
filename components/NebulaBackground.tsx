'use client';

import { motion } from 'framer-motion';
import { SPACE_COLORS } from '@/lib/constants';

interface NebulaBackgroundProps {
  colors?: string[];
  animated?: boolean;
  intensity?: number;
  className?: string;
}

export default function NebulaBackground({
  colors = [SPACE_COLORS.nebulaPurple, SPACE_COLORS.nebulaBlue, SPACE_COLORS.nebulaCyan, SPACE_COLORS.nebulaPink],
  animated = true,
  intensity = 0.4,
  className = ''
}: NebulaBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} style={{ zIndex: 1 }}>
      {/* Base dark gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${SPACE_COLORS.voidBlack} 0%, ${SPACE_COLORS.deepSpace} 50%, ${SPACE_COLORS.cosmicBlue} 100%)`
        }}
      />
      
      {/* Nebula clouds */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${colors[0]}${Math.round(intensity * 255).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
          left: '-10%',
          top: '10%'
        }}
        animate={animated ? {
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1]
        } : {}}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${colors[1]}${Math.round(intensity * 255).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
          right: '-5%',
          top: '30%'
        }}
        animate={animated ? {
          x: [0, -40, 0],
          y: [0, 50, 0],
          scale: [1, 1.15, 1]
        } : {}}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${colors[2]}${Math.round(intensity * 255).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
          left: '20%',
          bottom: '5%'
        }}
        animate={animated ? {
          x: [0, 30, 0],
          y: [0, -40, 0],
          scale: [1, 1.08, 1]
        } : {}}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${colors[3]}${Math.round(intensity * 200).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
          right: '15%',
          bottom: '20%'
        }}
        animate={animated ? {
          x: [0, -20, 0],
          y: [0, 30, 0],
          scale: [1, 1.12, 1]
        } : {}}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Subtle noise overlay for texture */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay'
        }}
      />
    </div>
  );
}
