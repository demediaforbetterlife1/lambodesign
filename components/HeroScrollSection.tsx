'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const NEON = {
  purple: '#8b5cf6',
  cyan: '#0ea5e9',
  gold: '#D4AF37',
  pink: '#ec4899',
};

export interface HeroScrollSectionProps {
  title?: string;
  subtitle?: string;
  onScrollToNext?: () => void;
}

/**
 * Hero section with parallax fade-out effects - OPTIMIZED
 */
export function HeroScrollSection({
  title = 'BEYOND LIMITS',
  subtitle = 'Experience the pinnacle of Italian automotive excellence. Where raw power meets breathtaking design.',
  onScrollToNext,
}: HeroScrollSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isClient, setIsClient] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Pre-generate static particle positions (only 12 particles)
  const particles = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      size: 2 + (i % 3) * 2,
      color: [NEON.gold, NEON.cyan, NEON.purple][i % 3],
      left: `${10 + (i * 7) % 80}%`,
      top: `${10 + (i * 8) % 80}%`,
      duration: 4 + (i % 3) * 2,
      delay: i * 0.3,
    })), []
  );


  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden snap-start"
    >
      {/* Static Gradient Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 20%, ${NEON.purple}40 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 80%, ${NEON.cyan}40 0%, transparent 50%),
            linear-gradient(180deg, #000 0%, #0d0618 50%, #000 100%)
          `,
        }}
      />

      {/* Static Orbs with CSS animations instead of Framer Motion */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full animate-pulse-slow"
        style={{
          background: `radial-gradient(circle, ${NEON.purple}40 0%, transparent 70%)`,
          filter: 'blur(100px)',
          left: '-15%',
          top: '5%',
          willChange: 'transform',
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full animate-pulse-slow"
        style={{
          background: `radial-gradient(circle, ${NEON.cyan}35 0%, transparent 70%)`,
          filter: 'blur(80px)',
          right: '-10%',
          bottom: '10%',
          willChange: 'transform',
          animationDelay: '2s',
        }}
      />

      {/* Static Neon Lines - no animation */}
      {[15, 50, 85].map((left, i) => (
        <div
          key={i}
          className="absolute top-0 h-full opacity-30"
          style={{
            left: `${left}%`,
            width: i === 1 ? 3 : 1,
            background: `linear-gradient(to bottom, transparent 10%, ${[NEON.purple, NEON.gold, NEON.cyan][i]} 50%, transparent 90%)`,
            boxShadow: `0 0 20px ${[NEON.purple, NEON.gold, NEON.cyan][i]}`,
          }}
        />
      ))}

      {/* Minimal Particles - CSS animation */}
      {isClient && particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-float"
          style={{
            width: p.size,
            height: p.size,
            background: p.color,
            left: p.left,
            top: p.top,
            boxShadow: `0 0 10px ${p.color}`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* Grid Pattern - static */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(${NEON.cyan}30 1px, transparent 1px),
            linear-gradient(90deg, ${NEON.cyan}30 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />


      {/* Content with parallax */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-7xl mx-auto"
        style={{ opacity, y }}
      >
        {/* Brand Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <span
            className="inline-block px-10 py-4 rounded-full text-sm uppercase tracking-[0.5em] font-semibold"
            style={{
              color: NEON.gold,
              border: `2px solid ${NEON.gold}60`,
              background: `linear-gradient(135deg, ${NEON.gold}15, transparent)`,
              textShadow: `0 0 30px ${NEON.gold}`,
              boxShadow: `0 0 40px ${NEON.gold}30`,
            }}
          >
            Automobili Lamborghini
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black mb-10 tracking-tighter"
          style={{
            textShadow: `0 0 20px ${NEON.cyan}60, 0 0 60px ${NEON.purple}40`,
            lineHeight: 0.95,
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {title}
        </motion.h1>

        {/* Decorative Line */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div
            className="h-[3px] w-32"
            style={{
              background: `linear-gradient(90deg, transparent, ${NEON.cyan})`,
              boxShadow: `0 0 15px ${NEON.cyan}`,
            }}
          />
          <div
            className="w-5 h-5 rounded-full animate-pulse"
            style={{
              background: NEON.gold,
              boxShadow: `0 0 30px ${NEON.gold}`,
            }}
          />
          <div
            className="h-[3px] w-32"
            style={{
              background: `linear-gradient(90deg, ${NEON.cyan}, transparent)`,
              boxShadow: `0 0 15px ${NEON.cyan}`,
            }}
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-16 font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {subtitle}
        </motion.p>

        {/* Stats - simplified animations */}
        <motion.div
          className="flex flex-wrap justify-center gap-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {[
            { value: '1015', label: 'HORSEPOWER', suffix: ' HP', color: NEON.purple },
            { value: '2.5', label: '0-100 KM/H', suffix: 's', color: NEON.cyan },
            { value: '350', label: 'TOP SPEED', suffix: ' KM/H', color: NEON.gold },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-5xl md:text-7xl font-black mb-3"
                style={{
                  color: stat.color,
                  textShadow: `0 0 30px ${stat.color}`,
                }}
              >
                {stat.value}{stat.suffix}
              </div>
              <div className="text-xs text-white/50 tracking-[0.3em] uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>


      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-14 left-1/2 -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={onScrollToNext}
      >
        <div className="flex flex-col items-center gap-4 animate-bounce-slow">
          <span className="text-xs uppercase tracking-[0.4em]" style={{ color: NEON.cyan }}>
            Scroll
          </span>
          <div
            className="w-8 h-14 rounded-full border-2 flex justify-center pt-4"
            style={{
              borderColor: NEON.cyan,
              boxShadow: `0 0 20px ${NEON.cyan}40`,
            }}
          >
            <div
              className="w-2.5 h-2.5 rounded-full animate-scroll-dot"
              style={{
                background: NEON.gold,
                boxShadow: `0 0 15px ${NEON.gold}`,
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Bottom Neon Line - static glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${NEON.purple}, ${NEON.cyan}, ${NEON.gold}, ${NEON.cyan}, ${NEON.purple}, transparent)`,
          boxShadow: `0 0 30px ${NEON.cyan}`,
        }}
      />
    </section>
  );
}

export default HeroScrollSection;
