'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

// Neon color palette
const NEON = {
  purple: '#8b5cf6',
  cyan: '#0ea5e9', 
  gold: '#D4AF37',
  pink: '#ec4899',
  blue: '#3b82f6',
  green: '#10b981',
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  const [activeSection, setActiveSection] = useState(0);

  // Scroll progress
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  // Parallax transforms
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -150]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.3], [1, 0.9]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Custom cursor tracking
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    
    // GSAP cursor animation for smoother movement
    if (cursorRef.current && cursorGlowRef.current) {
      gsap.to(cursorRef.current, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.1,
        ease: 'power2.out'
      });
      gsap.to(cursorGlowRef.current, {
        x: e.clientX - 150,
        y: e.clientY - 150,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }, []);


  useEffect(() => {
    if (!isClient) return;
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isClient, handleMouseMove]);

  // Advanced GSAP animations
  useEffect(() => {
    if (!isClient) return;

    const ctx = gsap.context(() => {
      // Title character animation with 3D effect
      const chars = titleRef.current?.querySelectorAll('.char');
      if (chars) {
        gsap.fromTo(chars,
          { 
            opacity: 0, 
            y: 120, 
            rotationX: -90,
            scale: 0.5,
            filter: 'blur(10px)'
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
            delay: 0.3
          }
        );
      }

      // Floating orbs with complex motion
      gsap.to('.orb', {
        y: 'random(-60, 60)',
        x: 'random(-60, 60)',
        scale: 'random(0.8, 1.2)',
        duration: 'random(6, 12)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: { each: 1, from: 'random' }
      });

      // Neon lines pulsing
      gsap.to('.neon-line', {
        opacity: 'random(0.2, 1)',
        scaleY: 'random(0.95, 1.05)',
        duration: 'random(1.5, 4)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: { each: 0.5, from: 'random' }
      });

      // Particles floating
      gsap.to('.particle', {
        y: 'random(-80, 80)',
        x: 'random(-80, 80)',
        opacity: 'random(0.1, 1)',
        scale: 'random(0.3, 2)',
        rotation: 'random(-180, 180)',
        duration: 'random(3, 8)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: { each: 0.05, from: 'random' }
      });

      // Scan line effect
      gsap.to('.scan-line', {
        y: '100vh',
        duration: 4,
        repeat: -1,
        ease: 'none'
      });

      // Grid pulse
      gsap.to('.grid-overlay', {
        opacity: 'random(0.03, 0.12)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });

    return () => ctx.revert();
  }, [isClient]);

  // Split title into characters
  const title = "BEYOND LIMITS";
  const titleChars = title.split('').map((char, i) => (
    <span 
      key={i} 
      className="char inline-block"
      style={{ 
        opacity: 0,
        display: char === ' ' ? 'inline' : 'inline-block',
        width: char === ' ' ? '0.4em' : 'auto',
        transformStyle: 'preserve-3d'
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  // Parallax calculations
  const parallaxX = isClient ? (mousePos.x - window.innerWidth / 2) * 0.015 : 0;
  const parallaxY = isClient ? (mousePos.y - window.innerHeight / 2) * 0.015 : 0;

  if (!isClient) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div 
          className="text-white text-3xl font-bold"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading...
        </motion.div>
      </div>
    );
  }


  return (
    <main ref={containerRef} className="min-h-screen bg-black text-white overflow-x-hidden cursor-none">
      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className="fixed w-5 h-5 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ background: NEON.gold }}
      />
      <div 
        ref={cursorGlowRef}
        className="fixed w-[300px] h-[300px] rounded-full pointer-events-none z-[9998]"
        style={{ 
          background: `radial-gradient(circle, ${NEON.purple}20 0%, transparent 70%)`,
          filter: 'blur(20px)'
        }}
      />

      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
        style={{ 
          scaleX: smoothProgress,
          background: `linear-gradient(90deg, ${NEON.purple}, ${NEON.cyan}, ${NEON.gold})`,
          boxShadow: `0 0 20px ${NEON.cyan}`
        }}
      />

      {/* ========== HERO SECTION ========== */}
      <motion.section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ 
          perspective: '1500px',
          y: heroY,
          opacity: heroOpacity,
          scale: heroScale
        }}
      >
        {/* Animated Gradient Background */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(ellipse 80% 50% at 20% 20%, rgba(139, 92, 246, 0.5) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(14, 165, 233, 0.5) 0%, transparent 50%), linear-gradient(180deg, #000000 0%, #0d0618 50%, #000000 100%)',
              'radial-gradient(ellipse 80% 50% at 80% 80%, rgba(139, 92, 246, 0.5) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 20% 20%, rgba(14, 165, 233, 0.5) 0%, transparent 50%), linear-gradient(180deg, #000000 0%, #0a1628 50%, #000000 100%)',
              'radial-gradient(ellipse 80% 50% at 20% 20%, rgba(139, 92, 246, 0.5) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(14, 165, 233, 0.5) 0%, transparent 50%), linear-gradient(180deg, #000000 0%, #0d0618 50%, #000000 100%)'
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />

        {/* Scan Line Effect */}
        <div 
          className="scan-line absolute left-0 right-0 h-[2px] pointer-events-none z-30"
          style={{ 
            top: '-100%',
            background: `linear-gradient(90deg, transparent, ${NEON.cyan}80, transparent)`,
            boxShadow: `0 0 30px ${NEON.cyan}`
          }}
        />

        {/* Animated Orbs */}
        {[
          { size: 800, color: NEON.purple, left: '-20%', top: '0%', blur: 120 },
          { size: 600, color: NEON.cyan, right: '-15%', bottom: '5%', blur: 100 },
          { size: 500, color: NEON.gold, left: '25%', bottom: '10%', blur: 80 },
          { size: 400, color: NEON.pink, right: '30%', top: '20%', blur: 90 },
        ].map((orb, i) => (
          <div 
            key={i}
            className="orb absolute rounded-full"
            style={{ 
              width: orb.size,
              height: orb.size,
              background: `radial-gradient(circle, ${orb.color}50 0%, transparent 70%)`,
              filter: `blur(${orb.blur}px)`,
              left: orb.left,
              right: orb.right,
              top: orb.top,
              bottom: orb.bottom,
              transform: `translate(${parallaxX * (i + 1) * 0.5}px, ${parallaxY * (i + 1) * 0.5}px)`
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
          <div 
            key={i}
            className="neon-line absolute top-0 h-full"
            style={{ 
              left: line.left,
              width: line.width,
              background: `linear-gradient(to bottom, transparent 5%, ${line.color} 50%, transparent 95%)`,
              boxShadow: `0 0 ${20 + line.width * 5}px ${line.color}, 0 0 ${40 + line.width * 10}px ${line.color}`,
              transform: 'translateX(-50%)'
            }}
          />
        ))}

        {/* Particles */}
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="particle absolute rounded-full"
            style={{
              width: 2 + Math.random() * 6,
              height: 2 + Math.random() * 6,
              background: [NEON.gold, NEON.cyan, NEON.purple, NEON.pink, NEON.blue][i % 5],
              left: `${3 + (i * 1.6) % 94}%`,
              top: `${3 + (i * 2.3) % 94}%`,
              boxShadow: `0 0 ${8 + Math.random() * 15}px ${[NEON.gold, NEON.cyan, NEON.purple, NEON.pink, NEON.blue][i % 5]}`,
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div 
          className="grid-overlay absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(${NEON.cyan}15 1px, transparent 1px),
              linear-gradient(90deg, ${NEON.cyan}15 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
        />


        {/* Content */}
        <div 
          className="relative z-10 text-center px-6 max-w-7xl mx-auto"
          style={{ transform: `translate(${parallaxX}px, ${parallaxY}px)` }}
        >
          {/* Brand Badge with Glow */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <motion.span 
              className="inline-block px-10 py-4 rounded-full text-sm uppercase tracking-[0.5em] font-semibold relative overflow-hidden"
              style={{
                color: NEON.gold,
                border: `2px solid ${NEON.gold}60`,
                background: `linear-gradient(135deg, ${NEON.gold}15, transparent)`,
                textShadow: `0 0 30px ${NEON.gold}`,
                boxShadow: `0 0 40px ${NEON.gold}30, inset 0 0 30px ${NEON.gold}10`
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: `0 0 60px ${NEON.gold}50, inset 0 0 40px ${NEON.gold}20`
              }}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              {/* Shine effect */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              />
              <span className="relative z-10">Automobili Lamborghini</span>
            </motion.span>
          </motion.div>

          {/* Main Title with Neon Glow */}
          <h1 
            ref={titleRef}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black mb-10 tracking-tighter"
            style={{
              textShadow: `
                0 0 10px ${NEON.cyan}80,
                0 0 30px ${NEON.cyan}60,
                0 0 60px ${NEON.purple}40,
                0 0 100px ${NEON.purple}30,
                0 0 150px ${NEON.cyan}20
              `,
              lineHeight: 0.95,
              perspective: '1000px'
            }}
          >
            {titleChars}
          </h1>

          {/* Animated Decorative Line */}
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
                boxShadow: `0 0 15px ${NEON.cyan}`
              }}
              initial={{ scaleX: 0, originX: 1 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div 
              className="w-5 h-5 rounded-full relative"
              style={{ 
                background: NEON.gold,
                boxShadow: `0 0 30px ${NEON.gold}, 0 0 60px ${NEON.gold}`
              }}
              animate={{ 
                scale: [1, 1.4, 1], 
                boxShadow: [
                  `0 0 30px ${NEON.gold}, 0 0 60px ${NEON.gold}`,
                  `0 0 50px ${NEON.gold}, 0 0 100px ${NEON.gold}`,
                  `0 0 30px ${NEON.gold}, 0 0 60px ${NEON.gold}`
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div 
                className="absolute inset-0 rounded-full"
                style={{ background: NEON.gold }}
                animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <motion.div 
              className="h-[3px] w-32"
              style={{ 
                background: `linear-gradient(90deg, ${NEON.cyan}, transparent)`,
                boxShadow: `0 0 15px ${NEON.cyan}`
              }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-white/70 max-w-3xl mx-auto mb-16 font-light leading-relaxed"
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 2.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            Experience the pinnacle of Italian automotive excellence. 
            Where raw power meets breathtaking design.
          </motion.p>

          {/* CTA Buttons with Advanced Hover */}
          <motion.div
            className="flex flex-col sm:flex-row gap-8 justify-center mb-24"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
          >
            <Link href="/gallery">
              <motion.button
                className="group relative px-14 py-6 rounded-full font-bold uppercase tracking-widest text-black overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${NEON.gold}, #B8860B)`,
                  boxShadow: `0 0 50px ${NEON.gold}60, 0 15px 50px rgba(0,0,0,0.4)`
                }}
                whileHover={{ 
                  scale: 1.08,
                  boxShadow: `0 0 80px ${NEON.gold}80, 0 20px 60px rgba(0,0,0,0.5)`
                }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                <motion.span
                  className="absolute inset-0 bg-white/30"
                  initial={{ x: '-100%', skewX: '-20deg' }}
                  whileHover={{ x: '200%' }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">Explore Models</span>
              </motion.button>
            </Link>
            <Link href="/about">
              <motion.button
                className="group relative px-14 py-6 rounded-full font-bold uppercase tracking-widest overflow-hidden"
                style={{
                  background: 'transparent',
                  border: `3px solid ${NEON.cyan}`,
                  color: NEON.cyan,
                  boxShadow: `0 0 40px ${NEON.cyan}40, inset 0 0 40px ${NEON.cyan}15`
                }}
                whileHover={{ 
                  scale: 1.08,
                  boxShadow: `0 0 60px ${NEON.cyan}60, inset 0 0 60px ${NEON.cyan}25`,
                  background: `${NEON.cyan}15`
                }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                <span className="relative z-10">Our Legacy</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats with Neon Glow */}
          <motion.div
            className="flex flex-wrap justify-center gap-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 0.8 }}
          >
            {[
              { value: '1015', label: 'HORSEPOWER', suffix: ' HP', color: NEON.purple },
              { value: '2.5', label: '0-100 KM/H', suffix: 's', color: NEON.cyan },
              { value: '350', label: 'TOP SPEED', suffix: ' KM/H', color: NEON.gold },
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 3 + i * 0.2, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.1 }}
              >
                <motion.div 
                  className="text-5xl md:text-7xl font-black mb-3"
                  style={{ 
                    color: stat.color,
                    textShadow: `0 0 20px ${stat.color}, 0 0 40px ${stat.color}, 0 0 60px ${stat.color}80`
                  }}
                  animate={{
                    textShadow: [
                      `0 0 20px ${stat.color}, 0 0 40px ${stat.color}, 0 0 60px ${stat.color}80`,
                      `0 0 30px ${stat.color}, 0 0 60px ${stat.color}, 0 0 90px ${stat.color}`,
                      `0 0 20px ${stat.color}, 0 0 40px ${stat.color}, 0 0 60px ${stat.color}80`
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  {stat.value}{stat.suffix}
                </motion.div>
                <div className="text-xs text-white/50 tracking-[0.3em] uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-14 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5 }}
        >
          <motion.div 
            className="flex flex-col items-center gap-4"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xs uppercase tracking-[0.4em]" style={{ color: NEON.cyan }}>Scroll</span>
            <div 
              className="w-8 h-14 rounded-full border-2 flex justify-center pt-4"
              style={{ 
                borderColor: NEON.cyan,
                boxShadow: `0 0 20px ${NEON.cyan}50, inset 0 0 20px ${NEON.cyan}20`
              }}
            >
              <motion.div
                className="w-2.5 h-2.5 rounded-full"
                style={{ 
                  background: NEON.gold,
                  boxShadow: `0 0 20px ${NEON.gold}`
                }}
                animate={{ y: [0, 20, 0], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Neon Line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[4px]"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${NEON.purple} 20%, ${NEON.cyan} 40%, ${NEON.gold} 60%, ${NEON.cyan} 80%, ${NEON.purple} 100%, transparent 100%)`,
            boxShadow: `0 0 40px ${NEON.cyan}, 0 0 80px ${NEON.purple}`
          }}
          animate={{ 
            opacity: [0.7, 1, 0.7],
            boxShadow: [
              `0 0 40px ${NEON.cyan}, 0 0 80px ${NEON.purple}`,
              `0 0 60px ${NEON.cyan}, 0 0 120px ${NEON.purple}`,
              `0 0 40px ${NEON.cyan}, 0 0 80px ${NEON.purple}`
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.section>


      {/* ========== SPECS SECTION ========== */}
      <section className="relative py-40 px-6 overflow-hidden">
        {/* Background Effects */}
        <motion.div 
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse at center, ${NEON.purple}20 0%, transparent 60%)` }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        
        {/* Horizontal Neon Lines */}
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${NEON.purple}, transparent)`, boxShadow: `0 0 30px ${NEON.purple}` }} />
        <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${NEON.cyan}, transparent)`, boxShadow: `0 0 30px ${NEON.cyan}` }} />

        <div className="relative max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl md:text-8xl lg:text-9xl font-black text-center mb-24"
            style={{
              background: `linear-gradient(135deg, #ffffff, ${NEON.cyan}, ${NEON.purple})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: `0 0 80px ${NEON.cyan}40`
            }}
            initial={{ opacity: 0, y: 80, filter: 'blur(20px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            RAW POWER
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '1015', label: 'HP', color: NEON.purple },
              { value: '350', label: 'KM/H', color: NEON.cyan },
              { value: '2.5', label: 'SEC', color: NEON.pink },
              { value: 'V12', label: 'ENGINE', color: NEON.gold },
            ].map((spec, i) => (
              <motion.div
                key={spec.label}
                className="relative p-10 rounded-3xl text-center group"
                style={{
                  background: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(30px)',
                  border: `2px solid ${spec.color}40`,
                  boxShadow: `0 0 50px ${spec.color}20, inset 0 0 50px ${spec.color}05`
                }}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ 
                  scale: 1.08, 
                  boxShadow: `0 0 80px ${spec.color}50, inset 0 0 80px ${spec.color}15`,
                  borderColor: spec.color
                }}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-10 h-10">
                  <div className="absolute top-0 left-0 w-full h-[3px]" style={{ background: spec.color, boxShadow: `0 0 10px ${spec.color}` }} />
                  <div className="absolute top-0 left-0 h-full w-[3px]" style={{ background: spec.color, boxShadow: `0 0 10px ${spec.color}` }} />
                </div>
                <div className="absolute bottom-0 right-0 w-10 h-10">
                  <div className="absolute bottom-0 right-0 w-full h-[3px]" style={{ background: spec.color, boxShadow: `0 0 10px ${spec.color}` }} />
                  <div className="absolute bottom-0 right-0 h-full w-[3px]" style={{ background: spec.color, boxShadow: `0 0 10px ${spec.color}` }} />
                </div>
                
                <motion.div 
                  className="text-6xl md:text-8xl font-black mb-4"
                  style={{ 
                    color: spec.color,
                    textShadow: `0 0 30px ${spec.color}, 0 0 60px ${spec.color}80`
                  }}
                  animate={{
                    textShadow: [
                      `0 0 30px ${spec.color}, 0 0 60px ${spec.color}80`,
                      `0 0 50px ${spec.color}, 0 0 100px ${spec.color}`,
                      `0 0 30px ${spec.color}, 0 0 60px ${spec.color}80`
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                >
                  {spec.value}
                </motion.div>
                <div className="text-white/60 text-sm tracking-[0.3em] uppercase">{spec.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="relative py-48 px-6 overflow-hidden">
        {/* Animated Background Orbs */}
        <motion.div
          className="absolute w-[1200px] h-[1200px] rounded-full blur-[200px]"
          style={{
            background: `radial-gradient(circle, ${NEON.purple}50 0%, transparent 60%)`,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full blur-[150px]"
          style={{
            background: `radial-gradient(circle, ${NEON.cyan}40 0%, transparent 60%)`,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
          animate={{ scale: [1.3, 1, 1.3], opacity: [0.4, 0.2, 0.4] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        {/* Radiating Lines */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-[3px] h-[60%] origin-bottom"
            style={{
              background: `linear-gradient(to top, ${NEON.purple}60, transparent)`,
              transform: `rotate(${i * 45}deg)`,
              boxShadow: `0 0 20px ${NEON.purple}`
            }}
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.h2
            className="text-6xl md:text-9xl lg:text-[12rem] font-black mb-12 leading-none"
            style={{
              background: `linear-gradient(180deg, #ffffff 0%, ${NEON.cyan} 40%, ${NEON.purple} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            READY TO<br />DOMINATE?
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-white/60 mb-16 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Experience the pinnacle of automotive engineering. 
            Step into a world where power meets perfection.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-8 justify-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Link href="/gallery">
              <motion.button
                className="px-14 py-6 rounded-full font-bold uppercase tracking-widest text-black"
                style={{
                  background: `linear-gradient(135deg, ${NEON.gold}, #B8860B)`,
                  boxShadow: `0 0 60px ${NEON.gold}60`
                }}
                whileHover={{ scale: 1.08, boxShadow: `0 0 100px ${NEON.gold}80` }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Gallery
              </motion.button>
            </Link>
            <Link href="/about">
              <motion.button
                className="px-14 py-6 rounded-full font-bold uppercase tracking-widest"
                style={{
                  border: `3px solid ${NEON.cyan}`,
                  color: NEON.cyan,
                  boxShadow: `0 0 40px ${NEON.cyan}40`
                }}
                whileHover={{ scale: 1.08, boxShadow: `0 0 80px ${NEON.cyan}60` }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="relative py-20 px-6 border-t-2" style={{ borderColor: `${NEON.purple}30` }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${NEON.purple}, ${NEON.cyan}, ${NEON.purple}, transparent)`, boxShadow: `0 0 30px ${NEON.purple}` }} />
        
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            className="text-4xl font-black mb-6"
            style={{ 
              color: NEON.gold,
              textShadow: `0 0 30px ${NEON.gold}`
            }}
            whileHover={{ scale: 1.1, textShadow: `0 0 50px ${NEON.gold}` }}
          >
            LAMBO
          </motion.div>
          <p className="text-white/40 text-sm tracking-wider">© 2024 Lamborghini Showcase. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
