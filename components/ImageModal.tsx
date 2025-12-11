'use client';

import { useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { LamboImage } from '@/lib/constants';
import { extractDominantColor, createGlowColor } from '@/lib/colorExtraction';

interface ImageModalProps {
  image: LamboImage | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageModal({ image, isOpen, onClose }: ImageModalProps) {
  const [dominantColor, setDominantColor] = useState('#D4AF37');
  const [glowColor, setGlowColor] = useState('rgba(212, 175, 55, 0.5)');
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  // Extract dominant color when image changes
  useEffect(() => {
    if (image?.src) {
      extractDominantColor(image.src).then((color) => {
        setDominantColor(color);
        setGlowColor(createGlowColor(color, 0.4));
      });
    }
  }, [image?.src]);

  // Handle ESC key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
  };

  return (
    <AnimatePresence>
      {isOpen && image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
          onMouseMove={handleMouseMove}
        >
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/95"
            style={{ backdropFilter: 'blur(30px)' }}
          />

          {/* Animated ambient glow based on dominant color */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute inset-0 pointer-events-none"
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                background: `radial-gradient(ellipse at ${mousePos.x * 100}% ${mousePos.y * 100}%, ${glowColor} 0%, transparent 50%)`
              }}
              transition={{ type: 'spring', stiffness: 100, damping: 30 }}
            />
            {/* Secondary glow */}
            <div 
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at 30% 70%, ${createGlowColor(dominantColor, 0.2)} 0%, transparent 40%),
                             radial-gradient(ellipse at 70% 30%, rgba(14, 165, 233, 0.15) 0%, transparent 40%)`
              }}
            />
          </motion.div>

          {/* Particle effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background: i % 2 === 0 ? dominantColor : '#0ea5e9',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  boxShadow: `0 0 10px ${i % 2 === 0 ? dominantColor : '#0ea5e9'}`
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 60, rotateX: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative z-10 w-full max-w-6xl"
            style={{ perspective: '1200px' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button with glow */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.3 }}
              onClick={onClose}
              className="absolute -top-14 right-0 md:-top-4 md:-right-4 z-20 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 group"
              style={{
                background: 'rgba(0, 0, 0, 0.5)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)'
              }}
              whileHover={{ 
                scale: 1.1,
                boxShadow: `0 0 30px ${glowColor}`,
                borderColor: dominantColor
              }}
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6 text-white group-hover:text-[#D4AF37] transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>

            {/* Image Container with enhanced glow */}
            <motion.div 
              className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-zinc-900"
              style={{
                boxShadow: `0 0 80px ${glowColor}, 0 0 150px ${createGlowColor(dominantColor, 0.3)}, 0 25px 50px rgba(0, 0, 0, 0.5)`
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              {/* Animated glow border */}
              <motion.div 
                className="absolute -inset-[2px] rounded-3xl pointer-events-none z-10"
                style={{
                  background: `linear-gradient(${135 + (mousePos.x - 0.5) * 60}deg, ${dominantColor}60, transparent 40%, rgba(14, 165, 233, 0.4) 60%, ${dominantColor}60)`,
                  padding: '2px'
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              
              {/* Inner glow */}
              <div 
                className="absolute inset-0 rounded-3xl pointer-events-none z-10"
                style={{
                  boxShadow: `inset 0 0 60px ${createGlowColor(dominantColor, 0.2)}`
                }}
              />
              
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
              
              {/* Cinematic vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />
              
              {/* Spotlight following mouse */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255, 255, 255, 0.1) 0%, transparent 30%)`
                }}
              />
            </motion.div>

            {/* Image Details with enhanced styling */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 text-center"
            >
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-white mb-3"
                style={{ 
                  textShadow: `0 0 40px ${glowColor}, 0 0 80px ${createGlowColor(dominantColor, 0.3)}` 
                }}
                animate={{ textShadow: [`0 0 40px ${glowColor}`, `0 0 60px ${glowColor}`, `0 0 40px ${glowColor}`] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {image.title}
              </motion.h2>
              {image.description && (
                <p className="text-white/70 text-lg md:text-xl">{image.description}</p>
              )}
              <motion.div 
                className="mt-6 flex justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span 
                  className="px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider"
                  style={{ 
                    background: `linear-gradient(135deg, ${createGlowColor(dominantColor, 0.3)}, rgba(14, 165, 233, 0.2))`,
                    color: dominantColor,
                    border: `2px solid ${dominantColor}60`,
                    boxShadow: `0 0 30px ${createGlowColor(dominantColor, 0.3)}, inset 0 0 20px ${createGlowColor(dominantColor, 0.1)}`,
                    textShadow: `0 0 10px ${dominantColor}`
                  }}
                >
                  Lamborghini
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
