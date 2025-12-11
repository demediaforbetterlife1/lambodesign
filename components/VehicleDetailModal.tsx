'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { VehicleData, SPACE_COLORS } from '@/lib/constants';
import CosmicGlow from './CosmicGlow';
import LightRays from './LightRays';
import StardustParticles from './StardustParticles';
import PropertyCard from './PropertyCard';

interface VehicleDetailModalProps {
  vehicle: VehicleData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function VehicleDetailModal({ vehicle, isOpen, onClose }: VehicleDetailModalProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!vehicle) return null;

  const properties = [
    { label: 'Horsepower', value: vehicle.specs.horsepower, suffix: ' HP', icon: '⚡', color: SPACE_COLORS.glowPurple },
    { label: 'Top Speed', value: vehicle.specs.topSpeed, suffix: ' km/h', icon: '🏎️', color: SPACE_COLORS.glowCyan },
    { label: '0-100 km/h', value: vehicle.specs.acceleration, suffix: 's', icon: '⏱️', color: SPACE_COLORS.glowPink, decimals: 1 },
    { label: 'Engine', value: 0, prefix: vehicle.specs.engine, icon: '🔧', color: SPACE_COLORS.glowBlue },
    { label: 'Price', value: vehicle.specs.price, prefix: '$', icon: '💎', color: SPACE_COLORS.glowViolet },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{ 
              background: `linear-gradient(135deg, ${SPACE_COLORS.voidBlack} 0%, ${SPACE_COLORS.deepSpace} 50%, ${SPACE_COLORS.cosmicBlue} 100%)`,
              backdropFilter: 'blur(20px)'
            }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.95 }}
            exit={{ opacity: 0 }}
          />

          <LightRays color={SPACE_COLORS.glowPurple} rayCount={16} />
          <StardustParticles count={40} />

          {/* Modal content */}
          <motion.div
            className="relative z-10 w-full max-w-6xl mx-4 max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <motion.button
              className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${SPACE_COLORS.glowCyan}`,
                color: SPACE_COLORS.starWhite
              }}
              onClick={onClose}
              whileHover={{ scale: 1.1, boxShadow: `0 0 20px ${SPACE_COLORS.glowCyan}` }}
              whileTap={{ scale: 0.95 }}
            >
              ✕
            </motion.button>

            {/* Vehicle image section */}
            <div className="relative aspect-video rounded-3xl overflow-hidden mb-8">
              <CosmicGlow color={SPACE_COLORS.glowPurple} intensity={0.6} />
              
              <motion.div
                className="relative w-full h-full"
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <Image
                  src={vehicle.src}
                  alt={vehicle.alt}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              </motion.div>

              <div 
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top, ${SPACE_COLORS.voidBlack} 0%, transparent 50%)`
                }}
              />

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <motion.h2
                  className="text-5xl md:text-7xl font-bold"
                  style={{ 
                    color: SPACE_COLORS.starWhite,
                    textShadow: `0 0 40px ${SPACE_COLORS.glowCyan}, 0 0 80px ${SPACE_COLORS.glowPurple}`
                  }}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  {vehicle.title}
                </motion.h2>
                <motion.p
                  className="text-xl text-white/70 mt-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  {vehicle.tagline}
                </motion.p>
              </div>
            </div>

            {/* Properties grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 px-4 pb-8">
              {properties.map((prop, index) => (
                <PropertyCard
                  key={prop.label}
                  label={prop.label}
                  value={prop.value}
                  suffix={prop.suffix}
                  prefix={prop.prefix}
                  icon={prop.icon}
                  color={prop.color}
                  delay={0.5 + index * 0.1}
                  decimals={prop.decimals}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
