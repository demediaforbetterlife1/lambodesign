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
 * Futuristic vehicle detail modal with amazing neon animations
 * Requirements: 3.4 - Modal with smooth zoom transition and vehicle details
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


  // Staggered animation for specs
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Animated backdrop with neon glow */}
          <motion.div
            className="absolute inset-0"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Deep space background */}
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse at 30% 30%, ${NEON.purple}40 0%, transparent 50%),
                  radial-gradient(ellipse at 70% 70%, ${NEON.cyan}30 0%, transparent 50%),
                  radial-gradient(ellipse at 50% 50%, ${NEON.gold}20 0%, transparent 60%),
                  linear-gradient(180deg, #000 0%, #0a0a1a 50%, #000 100%)
                `,
              }}
            />

            {/* Animated neon orbs */}
            <motion.div
              className="absolute w-[800px] h-[800px] rounded-full blur-[150px]"
              style={{ background: `${NEON.purple}30`, left: '-20%', top: '-20%' }}
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute w-[600px] h-[600px] rounded-full blur-[120px]"
              style={{ background: `${NEON.cyan}25`, right: '-10%', bottom: '-10%' }}
              animate={{
                x: [0, -80, 0],
                y: [0, -60, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute w-[400px] h-[400px] rounded-full blur-[100px]"
              style={{ background: `${NEON.gold}20`, left: '40%', top: '60%' }}
              animate={{
                x: [0, 60, 0],
                y: [0, -40, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Scan lines effect */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
              }}
            />
          </motion.div>


          {/* Modal content */}
          <motion.div
            className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl"
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(40px)',
              border: `2px solid ${NEON.gold}40`,
              boxShadow: `
                0 0 100px ${NEON.gold}30,
                0 0 200px ${NEON.purple}20,
                inset 0 0 100px rgba(0,0,0,0.5)
              `,
            }}
            initial={{ scale: 0.5, opacity: 0, rotateX: -15 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotateX: 15 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Neon border glow animation */}
            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background: `linear-gradient(90deg, ${NEON.purple}, ${NEON.cyan}, ${NEON.gold}, ${NEON.pink}, ${NEON.purple})`,
                backgroundSize: '400% 100%',
                padding: '2px',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 z-20">
              <motion.div
                className="absolute top-0 left-0 w-full h-[3px]"
                style={{ background: NEON.gold, boxShadow: `0 0 20px ${NEON.gold}` }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />
              <motion.div
                className="absolute top-0 left-0 h-full w-[3px]"
                style={{ background: NEON.gold, boxShadow: `0 0 20px ${NEON.gold}` }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />
            </div>
            <div className="absolute bottom-0 right-0 w-20 h-20 z-20">
              <motion.div
                className="absolute bottom-0 right-0 w-full h-[3px]"
                style={{ background: NEON.gold, boxShadow: `0 0 20px ${NEON.gold}` }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              />
              <motion.div
                className="absolute bottom-0 right-0 h-full w-[3px]"
                style={{ background: NEON.gold, boxShadow: `0 0 20px ${NEON.gold}` }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              />
            </div>


            {/* Close button */}
            <motion.button
              className="absolute top-6 right-6 z-30 w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold"
              style={{
                background: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(10px)',
                border: `2px solid ${NEON.pink}60`,
                color: NEON.pink,
                boxShadow: `0 0 30px ${NEON.pink}30`,
              }}
              onClick={onClose}
              whileHover={{
                scale: 1.1,
                boxShadow: `0 0 50px ${NEON.pink}60`,
                borderColor: NEON.pink,
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              ✕
            </motion.button>

            {/* Vehicle image section */}
            <div className="relative h-[400px] md:h-[500px] overflow-hidden">
              {/* Image glow effect */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse at center, ${NEON.gold}30 0%, transparent 70%)`,
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Vehicle image with zoom animation */}
              <motion.div
                className="relative w-full h-full"
                initial={{ scale: 1.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.3) 100%)`,
                }}
              />

              {/* Floating particles around the car */}
              {imageLoaded && [...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    background: [NEON.gold, NEON.cyan, NEON.purple][i % 3],
                    boxShadow: `0 0 10px ${[NEON.gold, NEON.cyan, NEON.purple][i % 3]}`,
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    x: [0, Math.random() * 20 - 10, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>


            {/* Content section */}
            <div className="p-8 md:p-12">
              {/* Title with neon glow */}
              <motion.div
                className="text-center mb-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <motion.span
                  className="inline-block px-6 py-2 rounded-full text-xs uppercase tracking-[0.4em] font-semibold mb-4"
                  style={{
                    background: `${NEON.purple}20`,
                    border: `1px solid ${NEON.purple}60`,
                    color: NEON.purple,
                    textShadow: `0 0 10px ${NEON.purple}`,
                  }}
                >
                  {vehicle.specs.engine}
                </motion.span>

                <h2
                  className="text-5xl md:text-7xl font-black mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${NEON.gold}, #fff, ${NEON.gold})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: `0 0 80px ${NEON.gold}50`,
                  }}
                >
                  {vehicle.title}
                </h2>

                <p className="text-xl text-white/60 max-w-xl mx-auto">
                  {vehicle.tagline}
                </p>
              </motion.div>

              {/* Decorative line */}
              <motion.div
                className="h-[2px] mb-10"
                style={{
                  background: `linear-gradient(90deg, transparent, ${NEON.cyan}, ${NEON.gold}, ${NEON.cyan}, transparent)`,
                  boxShadow: `0 0 20px ${NEON.cyan}`,
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              />

              {/* Specs grid */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {specs.map((spec) => (
                  <motion.div
                    key={spec.label}
                    className="relative group"
                    variants={itemVariants}
                  >
                    <div
                      className="relative p-6 rounded-2xl text-center overflow-hidden"
                      style={{
                        background: 'rgba(0, 0, 0, 0.4)',
                        border: `1px solid ${spec.color}40`,
                      }}
                    >
                      {/* Hover glow effect */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `radial-gradient(circle at center, ${spec.color}30 0%, transparent 70%)`,
                        }}
                      />

                      {/* Icon */}
                      <motion.div
                        className="text-3xl mb-3"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                      >
                        {spec.icon}
                      </motion.div>

                      {/* Value */}
                      <div
                        className="text-3xl md:text-4xl font-black mb-1"
                        style={{
                          color: spec.color,
                          textShadow: `0 0 30px ${spec.color}`,
                        }}
                      >
                        {spec.isText ? spec.value : (
                          <CountUp target={Number(spec.value)} duration={1.5} />
                        )}
                      </div>

                      {/* Suffix */}
                      {spec.suffix && (
                        <div className="text-xs uppercase tracking-wider text-white/40">
                          {spec.suffix}
                        </div>
                      )}

                      {/* Label */}
                      <div className="text-xs uppercase tracking-wider text-white/60 mt-2">
                        {spec.label}
                      </div>

                      {/* Bottom accent line */}
                      <motion.div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                        style={{
                          background: spec.color,
                          boxShadow: `0 0 10px ${spec.color}`,
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>


              {/* Price section */}
              <motion.div
                className="mt-10 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="inline-block p-8 rounded-2xl relative overflow-hidden"
                  style={{
                    background: 'rgba(0, 0, 0, 0.6)',
                    border: `2px solid ${NEON.gold}40`,
                  }}
                >
                  {/* Animated border */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: `linear-gradient(90deg, ${NEON.gold}, ${NEON.purple}, ${NEON.cyan}, ${NEON.gold})`,
                      backgroundSize: '300% 100%',
                      padding: '2px',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                    }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  />

                  <div className="text-sm uppercase tracking-[0.3em] text-white/50 mb-2">
                    Starting From
                  </div>
                  <div
                    className="text-4xl md:text-5xl font-black"
                    style={{
                      background: `linear-gradient(135deg, ${NEON.gold}, #fff, ${NEON.gold})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textShadow: `0 0 40px ${NEON.gold}50`,
                    }}
                  >
                    ${vehicle.specs.price.toLocaleString()}
                  </div>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                className="mt-10 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <motion.button
                  className="px-12 py-5 rounded-full text-lg font-bold uppercase tracking-wider relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${NEON.gold}, ${NEON.gold}cc)`,
                    color: '#000',
                    boxShadow: `0 0 40px ${NEON.gold}50`,
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0 0 60px ${NEON.gold}80`,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                    }}
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
                  <span className="relative z-10">Configure Your Dream</span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Animated count-up component for spec values
 */
function CountUp({ target, duration = 1.5 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(easedProgress * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return <>{count}</>;
}
