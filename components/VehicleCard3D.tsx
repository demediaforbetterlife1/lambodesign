'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { VehicleData } from '@/lib/constants';

const NEON = {
  purple: '#8b5cf6',
  cyan: '#0ea5e9',
  gold: '#D4AF37',
  pink: '#ec4899',
};

export interface VehicleCard3DProps {
  vehicle: VehicleData;
  index: number;
  onClick: () => void;
  color?: string;
}

/**
 * Vehicle card with 3D entrance animation
 * Requirements: 3.1, 3.2 - 3D rotation entrance and glow effects
 */
export function VehicleCard3D({
  vehicle,
  index,
  onClick,
  color,
}: VehicleCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const cardColor = color || [NEON.purple, NEON.cyan, NEON.gold][index % 3];

  // Handle mouse move for tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  // 3D entrance animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      rotateY: -90,
      scale: 0.8,
      x: -100,
    },
    visible: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative cursor-pointer"
      style={{ perspective: '1000px' }}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(20px)',
          border: `2px solid ${isHovered ? cardColor : cardColor + '30'}`,
          transformStyle: 'preserve-3d',
          boxShadow: isHovered
            ? `0 0 60px ${cardColor}40, 0 25px 50px rgba(0,0,0,0.5)`
            : `0 0 20px ${cardColor}20`,
        }}
        animate={{
          rotateX: isHovered ? -mousePos.y * 10 : 0,
          rotateY: isHovered ? mousePos.x * 10 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-12 h-12 z-20">
          <div
            className="absolute top-0 left-0 w-full h-[3px]"
            style={{ background: cardColor, boxShadow: `0 0 10px ${cardColor}` }}
          />
          <div
            className="absolute top-0 left-0 h-full w-[3px]"
            style={{ background: cardColor, boxShadow: `0 0 10px ${cardColor}` }}
          />
        </div>
        <div className="absolute bottom-0 right-0 w-12 h-12 z-20">
          <div
            className="absolute bottom-0 right-0 w-full h-[3px]"
            style={{ background: cardColor, boxShadow: `0 0 10px ${cardColor}` }}
          />
          <div
            className="absolute bottom-0 right-0 h-full w-[3px]"
            style={{ background: cardColor, boxShadow: `0 0 10px ${cardColor}` }}
          />
        </div>

        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-0"
            animate={{ opacity: isHovered ? 1 : 0 }}
            style={{
              background: `radial-gradient(circle, ${cardColor}30 0%, transparent 70%)`,
            }}
          />
          <Image
            src={vehicle.src}
            alt={vehicle.alt}
            fill
            className="object-contain p-6 transition-transform duration-700"
            style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
            unoptimized
          />
        </div>

        {/* Content */}
        <div className="p-8">
          <span
            className="text-xs uppercase tracking-[0.3em] mb-2 block"
            style={{ color: cardColor }}
          >
            {vehicle.specs.engine}
          </span>
          <h3
            className="text-3xl font-black mb-3"
            style={{ textShadow: `0 0 20px ${cardColor}50` }}
          >
            {vehicle.title}
          </h3>
          <p className="text-white/50 text-sm mb-6">{vehicle.tagline}</p>

          {/* Stats */}
          <div className="flex gap-6 pt-4 border-t border-white/10">
            <div>
              <div className="text-2xl font-bold" style={{ color: NEON.cyan }}>
                {vehicle.specs.horsepower}
              </div>
              <div className="text-xs text-white/40">HP</div>
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: NEON.purple }}>
                {vehicle.specs.acceleration}s
              </div>
              <div className="text-xs text-white/40">0-100</div>
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: NEON.gold }}>
                ${(vehicle.specs.price / 1000).toFixed(0)}K
              </div>
              <div className="text-xs text-white/40">PRICE</div>
            </div>
          </div>
        </div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          style={{ background: 'rgba(0, 0, 0, 0.7)' }}
        >
          <motion.span
            className="px-8 py-4 rounded-full font-bold uppercase tracking-wider"
            style={{
              border: `2px solid ${NEON.gold}`,
              color: NEON.gold,
              boxShadow: `0 0 30px ${NEON.gold}50`,
            }}
            initial={{ scale: 0.8 }}
            animate={{ scale: isHovered ? 1 : 0.8 }}
          >
            View Details
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default VehicleCard3D;
