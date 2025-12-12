'use client';

import { useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { VehicleData } from '@/lib/constants';

const NEON = {
  purple: '#8b5cf6',
  cyan: '#0ea5e9',
  gold: '#D4AF37',
  pink: '#ec4899',
  green: '#10b981',
};

interface VehicleDetailModalProps {
  vehicle: VehicleData | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Futuristic vehicle detail modal - OPTIMIZED for performance
 */
export default function VehicleDetailModal({ vehicle, isOpen, onClose }: VehicleDetailModalProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setImageLoaded(false);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!vehicle) return null;

  const specs = [
    { label: 'HORSEPOWER', value: vehicle.specs.horsepower, suffix: 'HP', color: NEON.purple, icon: '⚡' },
    { label: 'TOP SPEED', value: vehicle.specs.topSpeed, suffix: 'KM/H', color: NEON.cyan, icon: '🏎️' },
    { label: '0-100 KM/H', value: vehicle.specs.acceleration, suffix: 'SEC', color: NEON.pink, icon: '⏱️' },
    { label: 'ENGINE', value: vehicle.specs.engine, suffix: '', color: NEON.green, icon: '🔧', isText: true },
  ];


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse at 30% 30%, ${NEON.purple}30 0%, transparent 50%),
                  radial-gradient(ellipse at 70% 70%, ${NEON.cyan}25 0%, transparent 50%),
                  linear-gradient(180deg, #000 0%, #0a0a1a 50%, #000 100%)
                `,
              }}
            />
            {/* Static orbs - no animation */}
            <div
              className="absolute w-[600px] h-[600px] rounded-full"
              style={{
                background: `${NEON.purple}20`,
                filter: 'blur(120px)',
                left: '-15%',
                top: '-15%',
              }}
            />
            <div
              className="absolute w-[500px] h-[500px] rounded-full"
              style={{
                background: `${NEON.cyan}15`,
                filter: 'blur(100px)',
                right: '-10%',
                bottom: '-10%',
              }}
            />
          </motion.div>

          {/* Modal content */}
          <motion.div
            className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl"
            style={{
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(30px)',
              border: `2px solid ${NEON.gold}40`,
              boxShadow: `0 0 80px ${NEON.gold}25, 0 0 150px ${NEON.purple}15`,
            }}
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Corner accents - static */}
            <div className="absolute top-0 left-0 w-16 h-16 z-20">
              <div className="absolute top-0 left-0 w-full h-[2px]" style={{ background: NEON.gold, boxShadow: `0 0 15px ${NEON.gold}` }} />
              <div className="absolute top-0 left-0 h-full w-[2px]" style={{ background: NEON.gold, boxShadow: `0 0 15px ${NEON.gold}` }} />
            </div>
            <div className="absolute bottom-0 right-0 w-16 h-16 z-20">
              <div className="absolute bottom-0 right-0 w-full h-[2px]" style={{ background: NEON.gold, boxShadow: `0 0 15px ${NEON.gold}` }} />
              <div className="absolute bottom-0 right-0 h-full w-[2px]" style={{ background: NEON.gold, boxShadow: `0 0 15px ${NEON.gold}` }} />
            </div>


            {/* Close button */}
            <button
              className="absolute top-6 right-6 z-30 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-300 hover:scale-110"
              style={{
                background: 'rgba(0, 0, 0, 0.6)',
                border: `2px solid ${NEON.pink}60`,
                color: NEON.pink,
                boxShadow: `0 0 20px ${NEON.pink}25`,
              }}
              onClick={onClose}
            >
              ✕
            </button>

            {/* Vehicle image section */}
            <div className="relative h-[350px] md:h-[450px] overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse at center, ${NEON.gold}20 0%, transparent 70%)`,
                }}
              />
              <motion.div
                className="relative w-full h-full"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={vehicle.src}
                  alt={vehicle.alt}
                  fill
                  className="object-contain p-8"
                  priority
                  unoptimized
                  onLoad={() => setImageLoaded(true)}
                />
              </motion.div>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 40%)`,
                }}
              />
            </div>

            {/* Content section */}
            <div className="p-8 md:p-10">
              {/* Title */}
              <div className="text-center mb-8">
                <span
                  className="inline-block px-5 py-2 rounded-full text-xs uppercase tracking-[0.4em] font-semibold mb-4"
                  style={{
                    background: `${NEON.purple}20`,
                    border: `1px solid ${NEON.purple}50`,
                    color: NEON.purple,
                  }}
                >
                  {vehicle.specs.engine}
                </span>
                <h2
                  className="text-5xl md:text-6xl font-black mb-3"
                  style={{
                    background: `linear-gradient(135deg, ${NEON.gold}, #fff, ${NEON.gold})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {vehicle.title}
                </h2>
                <p className="text-lg text-white/60">{vehicle.tagline}</p>
              </div>

              {/* Decorative line */}
              <div
                className="h-[2px] mb-8"
                style={{
                  background: `linear-gradient(90deg, transparent, ${NEON.cyan}, ${NEON.gold}, ${NEON.cyan}, transparent)`,
                  boxShadow: `0 0 15px ${NEON.cyan}`,
                }}
              />


              {/* Specs grid - simplified, no stagger animation */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="p-5 rounded-xl text-center transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'rgba(0, 0, 0, 0.4)',
                      border: `1px solid ${spec.color}30`,
                    }}
                  >
                    <div className="text-2xl mb-2">{spec.icon}</div>
                    <div
                      className="text-3xl font-black mb-1"
                      style={{ color: spec.color, textShadow: `0 0 20px ${spec.color}` }}
                    >
                      {spec.isText ? spec.value : spec.value}
                    </div>
                    {spec.suffix && (
                      <div className="text-xs uppercase tracking-wider text-white/40">{spec.suffix}</div>
                    )}
                    <div className="text-xs uppercase tracking-wider text-white/50 mt-1">{spec.label}</div>
                  </div>
                ))}
              </div>

              {/* Price section */}
              <div className="text-center mb-8">
                <div
                  className="inline-block p-6 rounded-xl"
                  style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: `2px solid ${NEON.gold}30`,
                  }}
                >
                  <div className="text-sm uppercase tracking-[0.3em] text-white/50 mb-2">Starting From</div>
                  <div
                    className="text-4xl md:text-5xl font-black"
                    style={{
                      background: `linear-gradient(135deg, ${NEON.gold}, #fff, ${NEON.gold})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    ${vehicle.specs.price.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="text-center">
                <button
                  className="px-10 py-4 rounded-full text-lg font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${NEON.gold}, ${NEON.gold}cc)`,
                    color: '#000',
                    boxShadow: `0 0 30px ${NEON.gold}40`,
                  }}
                >
                  Configure Your Dream
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
