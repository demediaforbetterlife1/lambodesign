'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { VehicleData, SPACE_COLORS } from '@/lib/constants';

interface LamboCardProps {
  vehicle: VehicleData;
  onClick: (vehicle: VehicleData) => void;
  index: number;
}

export default function LamboCard({ vehicle, onClick, index }: LamboCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0.5, y: 0.5 });
  };

  // Calculate 3D tilt based on mouse position
  const rotateX = isHovered ? (mousePos.y - 0.5) * -20 : 0;
  const rotateY = isHovered ? (mousePos.x - 0.5) * 20 : 0;

  return (
    <motion.div
      ref={cardRef}
      className="relative cursor-pointer group"
      onClick={() => onClick(vehicle)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        className="relative aspect-[3/4] rounded-3xl overflow-hidden"
        style={{
          transformStyle: 'preserve-3d',
          rotateX,
          rotateY
        }}
        animate={{
          scale: isHovered ? 1.05 : 1
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Animated glow border */}
        <motion.div
          className="absolute -inset-[2px] rounded-3xl pointer-events-none z-20"
          animate={{
            opacity: isHovered ? 1 : 0,
            boxShadow: isHovered 
              ? `0 0 60px ${SPACE_COLORS.glowPurple}, 0 0 120px ${SPACE_COLORS.glowCyan}, inset 0 0 40px ${SPACE_COLORS.glowPurple}` 
              : '0 0 0px transparent'
          }}
          style={{
            background: isHovered 
              ? `linear-gradient(${135 + (mousePos.x - 0.5) * 90}deg, ${SPACE_COLORS.glowPurple}, transparent 50%, ${SPACE_COLORS.glowCyan})`
              : 'transparent',
            border: `2px solid ${isHovered ? SPACE_COLORS.nebulaPurple : 'transparent'}`,
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Background with cosmic gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-br"
          style={{
            background: `linear-gradient(135deg, ${SPACE_COLORS.deepSpace} 0%, ${SPACE_COLORS.cosmicBlue} 100%)`
          }}
        />

        {/* Vehicle image */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: isHovered ? 1.15 : 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Image
            src={vehicle.src}
            alt={vehicle.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
            unoptimized
          />
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${SPACE_COLORS.nebulaPurple}40 0%, transparent 50%, ${SPACE_COLORS.nebulaCyan}40 100%)`
          }}
        />

        {/* Dynamic spotlight following mouse */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isHovered 
              ? `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, ${SPACE_COLORS.glowCyan} 0%, transparent 50%)`
              : 'transparent'
          }}
        />

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ x: '-100%', opacity: 0 }}
          animate={isHovered ? { x: '100%', opacity: 0.3 } : { x: '-100%', opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
            transform: 'skewX(-20deg)'
          }}
        />

        {/* Number badge */}
        <motion.div 
          className="absolute top-6 right-6 z-10"
          animate={{ scale: isHovered ? 1.2 : 1, rotate: isHovered ? 10 : 0 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <span 
            className="inline-flex items-center justify-center w-14 h-14 rounded-full text-2xl font-bold"
            style={{ 
              background: `${SPACE_COLORS.nebulaPurple}40`,
              border: `2px solid ${SPACE_COLORS.glowPurple}`,
              color: SPACE_COLORS.starWhite,
              textShadow: `0 0 15px ${SPACE_COLORS.glowPurple}`,
              boxShadow: `0 0 30px ${SPACE_COLORS.glowPurple}, inset 0 0 20px ${SPACE_COLORS.glowPurple}`
            }}
          >
            0{index + 1}
          </span>
        </motion.div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
          <motion.div
            animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <h3 
              className="text-3xl font-bold text-white mb-2"
              style={{ textShadow: `0 0 30px ${SPACE_COLORS.glowCyan}` }}
            >
              {vehicle.title}
            </h3>
            <p className="text-white/70 text-sm mb-4">{vehicle.tagline}</p>
            
            {/* View Details button - revealed on hover */}
            <motion.div
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <span 
                className="inline-flex items-center gap-3 px-5 py-2 rounded-full text-sm uppercase tracking-wider font-medium"
                style={{ 
                  background: `${SPACE_COLORS.nebulaCyan}30`,
                  border: `1px solid ${SPACE_COLORS.glowCyan}`,
                  color: SPACE_COLORS.starWhite,
                  textShadow: `0 0 10px ${SPACE_COLORS.glowCyan}`,
                  boxShadow: `0 0 20px ${SPACE_COLORS.glowCyan}`
                }}
              >
                View Details
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom accent line */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[3px] z-20"
          style={{ 
            background: `linear-gradient(90deg, ${SPACE_COLORS.nebulaPurple}, ${SPACE_COLORS.nebulaCyan})`,
            boxShadow: `0 0 20px ${SPACE_COLORS.glowPurple}, 0 0 40px ${SPACE_COLORS.glowCyan}`
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </motion.div>
  );
}
