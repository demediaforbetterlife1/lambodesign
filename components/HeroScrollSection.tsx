'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';

const NEON = {
  purple: '#8b5cf6',
  cyan: '#0ea5e9',
  gold: '#D4AF37',
  pink: '#ec4899',
  blue: '#3b82f6',
};

export interface HeroScrollSectionProps {
  title?: string;
  subtitle?: string;
  onScrollToNext?: () => void;
}

/**
 * Hero section with parallax fade-out effects
 * Requirements: 2.1, 2.2, 2.3, 2.4
 */
export function HeroScrollSection({
  title = 'BEYOND LIMITS',
  subtitle = 'Experience the pinnacle of Italian automotive excellence. Where raw power meets breathtaking design.',
  onScrollToNext,
}: HeroScrollSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transforms - fade out starting at 30%
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7], [1, 1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.7], [0, -150]);

  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Mouse tracking for parallax
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    if (!isClient) return;
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isClient, handleMouseMove]);

  // GSAP title animation
  useEffect(() => {
    if (!isClient || !titleRef.current) return;

    const chars = titleRef.current.querySelectorAll('.char');
    if (chars.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: 120,
          rotationX: -90,
          scale: 0.5,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.5,
          stagger: 0.04,
          ease: 'power4.out',
          delay: 0.3,
        }
      );
    });

    return () => ctx.revert();
  }, [isClient]);

  // Split title into characters
  const titleChars = title.split('').map((char, i) => (
    <span
      key={i}
      className="char inline-block"
      style={{
        opacity: 0,
        display: char === ' ' ? 'inline' : 'inline-block',
        width: char === ' ' ? '0.4em' : 'auto',
        transformStyle: 'preserve-3d',
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  // Parallax calculations
  const parallaxX = isClient ? (mousePos.x - window.innerWidth / 2) * 0.015 : 0;
  const parallaxY = isClient ? (mousePos.y - window.innerHeight / 2) * 0.015 : 0;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden snap-start"
      style={{ perspective: '1500px' }}
    >
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            `radial-gradient(ellipse 80% 50% at 20% 20%, ${NEON.purple}50 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 80% 80%, ${NEON.cyan}50 0%, transparent 50%), linear-gradient(180deg, #000000 0%, #0d0618 50%, #000000 100%)`,
            `radial-gradient(ellipse 80% 50% at 80% 80%, ${NEON.purple}50 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 20% 20%, ${NEON.cyan}50 0%, transparent 50%), linear-gradient(180deg, #000000 0%, #0a1628 50%, #000000 100%)`,
            `radial-gradient(ellipse 80% 50% at 20% 20%, ${NEON.purple}50 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 80% 80%, ${NEON.cyan}50 0%, transparent 50%), linear-gradient(180deg, #000000 0%, #0d0618 50%, #000000 100%)`,
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />

      {/* Animated Orbs */}
      {[
        { size: 800, color: NEON.purple, left: '-20%', top: '0%', blur: 120 },
        { size: 600, color: NEON.cyan, right: '-15%', bottom: '5%', blur: 100 },
        { size: 500, color: NEON.gold, left: '25%', bottom: '10%', blur: 80 },
        { size: 400, color: NEON.pink, right: '30%', top: '20%', blur: 90 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color}50 0%, transparent 70%)`,
            filter: `blur(${orb.blur}px)`,
            left: orb.left,
            right: orb.right,
            top: orb.top,
            bottom: orb.bottom,
            transform: `translate(${parallaxX * (i + 1) * 0.5}px, ${parallaxY * (i + 1) * 0.5}px)`,
          }}
          animate={{
            y: ['0%', '5%', '0%'],
            x: ['0%', '3%', '0%'],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Neon Lines */}
      {[
        { left: '15%', color: NEON.purple, width: 2 },
        { left: '30%', color: NEON.cyan, width: 1 },
        { left: '50%', color: NEON.gold, width: 4 },
        { left: '70%', color: NEON.cyan, width: 1 },
        { left: '85%', color: NEON.purple, width: 2 },
      ].map((line, i) => (
        <motion.div
          key={i}
          className="absolute top-0 h-full"
          style={{
            left: line.left,
            width: line.width,
            background: `linear-gradient(to bottom, transparent 5%, ${line.color} 50%, transparent 95%)`,
            boxShadow: `0 0 ${20 + line.width * 5}px ${line.color}`,
            transform: 'translateX(-50%)',
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Particles */}
      {isClient &&
        [...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 2 + (i % 4) * 2,
              height: 2 + (i % 4) * 2,
              background: [NEON.gold, NEON.cyan, NEON.purple, NEON.pink][i % 4],
              left: `${5 + (i * 2.3) % 90}%`,
              top: `${5 + (i * 3.1) % 90}%`,
              boxShadow: `0 0 ${10 + (i % 5) * 3}px ${[NEON.gold, NEON.cyan, NEON.purple, NEON.pink][i % 4]}`,
            }}
            animate={{
              y: ['0%', `${-20 + (i % 40)}%`, '0%'],
              x: ['0%', `${-10 + (i % 20)}%`, '0%'],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 5 + (i % 5),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.1,
            }}
          />
        ))}

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(${NEON.cyan}20 1px, transparent 1px),
            linear-gradient(90deg, ${NEON.cyan}20 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Content with parallax fade */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-7xl mx-auto"
        style={{
          opacity: smoothOpacity,
          scale: smoothScale,
          y: smoothY,
          transform: `translate(${parallaxX}px, ${parallaxY}px)`,
        }}
      >
        {/* Brand Badge */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="mb-12"
        >
          <motion.span
            className="inline-block px-10 py-4 rounded-full text-sm uppercase tracking-[0.5em] font-semibold relative overflow-hidden"
            style={{
              color: NEON.gold,
              border: `2px solid ${NEON.gold}60`,
              background: `linear-gradient(135deg, ${NEON.gold}15, transparent)`,
              textShadow: `0 0 30px ${NEON.gold}`,
              boxShadow: `0 0 40px ${NEON.gold}30, inset 0 0 30px ${NEON.gold}10`,
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: `0 0 60px ${NEON.gold}50, inset 0 0 40px ${NEON.gold}20`,
            }}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            />
            <span className="relative z-10">Automobili Lamborghini</span>
          </motion.span>
        </motion.div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black mb-10 tracking-tighter"
          style={{
            textShadow: `
              0 0 10px ${NEON.cyan}80,
              0 0 30px ${NEON.cyan}60,
              0 0 60px ${NEON.purple}40,
              0 0 100px ${NEON.purple}30
            `,
            lineHeight: 0.95,
            perspective: '1000px',
          }}
        >
          {titleChars}
        </h1>

        {/* Decorative Line */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <motion.div
            className="h-[3px] w-32"
            style={{
              background: `linear-gradient(90deg, transparent, ${NEON.cyan})`,
              boxShadow: `0 0 15px ${NEON.cyan}`,
            }}
            initial={{ scaleX: 0, originX: 1 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
          />
          <motion.div
            className="w-5 h-5 rounded-full relative"
            style={{
              background: NEON.gold,
              boxShadow: `0 0 30px ${NEON.gold}, 0 0 60px ${NEON.gold}`,
            }}
            animate={{
              scale: [1, 1.4, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="h-[3px] w-32"
            style={{
              background: `linear-gradient(90deg, ${NEON.cyan}, transparent)`,
              boxShadow: `0 0 15px ${NEON.cyan}`,
            }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl lg:text-3xl text-white/70 max-w-3xl mx-auto mb-16 font-light leading-relaxed"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 1 }}
        >
          {subtitle}
        </motion.p>

        {/* Stats */}
        <motion.div
          className="flex flex-wrap justify-center gap-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          {[
            { value: '1015', label: 'HORSEPOWER', suffix: ' HP', color: NEON.purple },
            { value: '2.5', label: '0-100 KM/H', suffix: 's', color: NEON.cyan },
            { value: '350', label: 'TOP SPEED', suffix: ' KM/H', color: NEON.gold },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.8 + i * 0.2, type: 'spring' }}
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                className="text-5xl md:text-7xl font-black mb-3"
                style={{
                  color: stat.color,
                  textShadow: `0 0 20px ${stat.color}, 0 0 40px ${stat.color}`,
                }}
                animate={{
                  textShadow: [
                    `0 0 20px ${stat.color}, 0 0 40px ${stat.color}`,
                    `0 0 30px ${stat.color}, 0 0 60px ${stat.color}`,
                    `0 0 20px ${stat.color}, 0 0 40px ${stat.color}`,
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              >
                {stat.value}
                {stat.suffix}
              </motion.div>
              <div className="text-xs text-white/50 tracking-[0.3em] uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-14 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.5 }}
        onClick={onScrollToNext}
        style={{ cursor: 'pointer' }}
      >
        <motion.div
          className="flex flex-col items-center gap-4"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span
            className="text-xs uppercase tracking-[0.4em]"
            style={{ color: NEON.cyan }}
          >
            Scroll
          </span>
          <div
            className="w-8 h-14 rounded-full border-2 flex justify-center pt-4"
            style={{
              borderColor: NEON.cyan,
              boxShadow: `0 0 20px ${NEON.cyan}50, inset 0 0 20px ${NEON.cyan}20`,
            }}
          >
            <motion.div
              className="w-2.5 h-2.5 rounded-full"
              style={{
                background: NEON.gold,
                boxShadow: `0 0 20px ${NEON.gold}`,
              }}
              animate={{ y: [0, 20, 0], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Neon Line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[4px]"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${NEON.purple} 20%, ${NEON.cyan} 40%, ${NEON.gold} 60%, ${NEON.cyan} 80%, ${NEON.purple} 100%, transparent 100%)`,
          boxShadow: `0 0 40px ${NEON.cyan}, 0 0 80px ${NEON.purple}`,
        }}
        animate={{
          opacity: [0.7, 1, 0.7],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </section>
  );
}

export default HeroScrollSection;
