'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on client
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

  // GSAP animations
  useEffect(() => {
    if (!isClient || !titleRef.current) return;

    const ctx = gsap.context(() => {
      // Animate title characters
      const chars = titleRef.current?.querySelectorAll('.char');
      if (chars) {
        gsap.fromTo(chars,
          { opacity: 0, y: 100, rotationX: -90 },
          { 
            opacity: 1, 
            y: 0, 
            rotationX: 0,
            duration: 1.2,
            stagger: 0.05,
            ease: 'power4.out',
            delay: 0.5
          }
        );
      }

      // Animate floating orbs
      gsap.to('.orb', {
        y: 'random(-30, 30)',
        x: 'random(-30, 30)',
        duration: 'random(4, 8)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: { each: 0.5, from: 'random' }
      });

      // Animate neon lines
      gsap.to('.neon-line', {
        opacity: 'random(0.3, 1)',
        duration: 'random(1, 3)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: { each: 0.3, from: 'random' }
      });

      // Animate particles
      gsap.to('.particle', {
        y: 'random(-50, 50)',
        x: 'random(-50, 50)',
        opacity: 'random(0, 1)',
        scale: 'random(0.5, 1.5)',
        duration: 'random(2, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: { each: 0.1, from: 'random' }
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
        width: char === ' ' ? '0.3em' : 'auto'
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  // Calculate parallax offset
  const parallaxX = isClient ? (mousePos.x - window.innerWidth / 2) * 0.02 : 0;
  const parallaxY = isClient ? (mousePos.y - window.innerHeight / 2) * 0.02 : 0;

  if (!isClient) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* ========== HERO SECTION ========== */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ perspective: '1000px' }}
      >
        {/* Gradient Background */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 20% 20%, rgba(139, 92, 246, 0.4) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 80% 80%, rgba(14, 165, 233, 0.4) 0%, transparent 50%),
              radial-gradient(ellipse 50% 30% at 50% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 50%),
              linear-gradient(180deg, #000000 0%, #0d0618 30%, #0a1628 70%, #000000 100%)
            `
          }}
        />

        {/* Animated Orbs */}
        <div 
          className="orb absolute w-[700px] h-[700px] rounded-full blur-[100px]"
          style={{ 
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, transparent 70%)',
            left: '-15%',
            top: '5%',
            transform: `translate(${parallaxX * 2}px, ${parallaxY * 2}px)`
          }}
        />
        <div 
          className="orb absolute w-[500px] h-[500px] rounded-full blur-[80px]"
          style={{ 
            background: 'radial-gradient(circle, rgba(14, 165, 233, 0.5) 0%, transparent 70%)',
            right: '-10%',
            bottom: '10%',
            transform: `translate(${-parallaxX * 1.5}px, ${-parallaxY * 1.5}px)`
          }}
        />
        <div 
          className="orb absolute w-[400px] h-[400px] rounded-full blur-[60px]"
          style={{ 
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, transparent 70%)',
            left: '30%',
            bottom: '20%',
            transform: `translate(${parallaxX}px, ${parallaxY}px)`
          }}
        />

        {/* Neon Lines */}
        <div 
          className="neon-line absolute top-0 left-[25%] w-[2px] h-full"
          style={{ 
            background: 'linear-gradient(to bottom, transparent, #8b5cf6, transparent)',
            boxShadow: '0 0 20px #8b5cf6, 0 0 40px #8b5cf6'
          }}
        />
        <div 
          className="neon-line absolute top-0 right-[25%] w-[2px] h-full"
          style={{ 
            background: 'linear-gradient(to bottom, transparent, #0ea5e9, transparent)',
            boxShadow: '0 0 20px #0ea5e9, 0 0 40px #0ea5e9'
          }}
        />
        <div 
          className="neon-line absolute top-0 left-1/2 -translate-x-1/2 w-[4px] h-full"
          style={{ 
            background: 'linear-gradient(to bottom, transparent 10%, #D4AF37 50%, transparent 90%)',
            boxShadow: '0 0 30px #D4AF37, 0 0 60px #D4AF37'
          }}
        />

        {/* Particles */}
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="particle absolute rounded-full"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              background: ['#D4AF37', '#0ea5e9', '#8b5cf6', '#ec4899'][i % 4],
              left: `${5 + (i * 2.3) % 90}%`,
              top: `${5 + (i * 3.7) % 90}%`,
              boxShadow: `0 0 ${10 + Math.random() * 10}px ${['#D4AF37', '#0ea5e9', '#8b5cf6', '#ec4899'][i % 4]}`,
              opacity: 0.6
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(14, 165, 233, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(14, 165, 233, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />

        {/* Content */}
        <div 
          className="relative z-10 text-center px-6 max-w-6xl mx-auto"
          style={{ transform: `translate(${parallaxX * 0.5}px, ${parallaxY * 0.5}px)` }}
        >
          {/* Brand Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-10"
          >
            <span 
              className="inline-block px-8 py-3 rounded-full text-sm uppercase tracking-[0.4em] font-medium"
              style={{
                color: '#D4AF37',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                background: 'rgba(212, 175, 55, 0.1)',
                textShadow: '0 0 30px rgba(212, 175, 55, 0.8)',
                boxShadow: '0 0 30px rgba(212, 175, 55, 0.2), inset 0 0 20px rgba(212, 175, 55, 0.1)'
              }}
            >
              Automobili Lamborghini
            </span>
          </motion.div>

          {/* Main Title */}
          <h1 
            ref={titleRef}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tight"
            style={{
              textShadow: '0 0 80px rgba(14, 165, 233, 0.5), 0 0 120px rgba(139, 92, 246, 0.3)',
              lineHeight: 1.1
            }}
          >
            {titleChars}
          </h1>

          {/* Decorative Line */}
          <motion.div 
            className="flex items-center justify-center gap-4 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.div 
              className="h-[2px] w-24"
              style={{ background: 'linear-gradient(90deg, transparent, #0ea5e9)' }}
              initial={{ scaleX: 0, originX: 1 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.6, duration: 0.6 }}
            />
            <motion.div 
              className="w-4 h-4 rounded-full"
              style={{ 
                background: '#D4AF37',
                boxShadow: '0 0 20px #D4AF37, 0 0 40px #D4AF37'
              }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              className="h-[2px] w-24"
              style={{ background: 'linear-gradient(90deg, #0ea5e9, transparent)' }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.6, duration: 0.6 }}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-14 font-light leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            Experience the pinnacle of Italian automotive excellence. 
            Where raw power meets breathtaking design.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.8 }}
          >
            <Link href="/gallery">
              <motion.button
                className="px-12 py-5 rounded-full font-bold uppercase tracking-wider text-black cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37, #B8860B)',
                  boxShadow: '0 0 40px rgba(212, 175, 55, 0.5), 0 10px 40px rgba(0,0,0,0.3)'
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(212, 175, 55, 0.7)' }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Models
              </motion.button>
            </Link>
            <Link href="/about">
              <motion.button
                className="px-12 py-5 rounded-full font-bold uppercase tracking-wider cursor-pointer"
                style={{
                  background: 'transparent',
                  border: '2px solid #0ea5e9',
                  color: '#0ea5e9',
                  boxShadow: '0 0 30px rgba(14, 165, 233, 0.3), inset 0 0 30px rgba(14, 165, 233, 0.1)'
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(14, 165, 233, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                Our Legacy
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap justify-center gap-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.8 }}
          >
            {[
              { value: '1015', label: 'HORSEPOWER', suffix: ' HP', color: '#8b5cf6' },
              { value: '2.5', label: '0-100 KM/H', suffix: 's', color: '#0ea5e9' },
              { value: '350', label: 'TOP SPEED', suffix: ' KM/H', color: '#D4AF37' },
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.6 + i * 0.15 }}
              >
                <div 
                  className="text-5xl md:text-6xl font-black mb-2"
                  style={{ 
                    color: stat.color,
                    textShadow: `0 0 40px ${stat.color}`
                  }}
                >
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-xs text-white/50 tracking-[0.25em]">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs uppercase tracking-[0.3em]" style={{ color: '#0ea5e9' }}>Scroll</span>
            <div 
              className="w-7 h-12 rounded-full border-2 flex justify-center pt-3"
              style={{ 
                borderColor: '#0ea5e9',
                boxShadow: '0 0 15px rgba(14, 165, 233, 0.4), inset 0 0 15px rgba(14, 165, 233, 0.1)'
              }}
            >
              <motion.div
                className="w-2 h-2 rounded-full"
                style={{ 
                  background: '#D4AF37',
                  boxShadow: '0 0 15px #D4AF37'
                }}
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>

        {/* Bottom Neon Line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[3px]"
          style={{
            background: 'linear-gradient(90deg, transparent 5%, #8b5cf6 30%, #0ea5e9 50%, #8b5cf6 70%, transparent 95%)',
            boxShadow: '0 0 30px #0ea5e9, 0 0 60px #8b5cf6'
          }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </section>

      {/* ========== SPECS SECTION ========== */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Background Glow */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.15) 0%, transparent 60%)'
          }}
        />

        <div className="relative max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl md:text-8xl font-black text-center mb-20"
            style={{
              background: 'linear-gradient(135deg, #ffffff, #0ea5e9, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 60px rgba(14, 165, 233, 0.3)'
            }}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            RAW POWER
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '1015', label: 'HP', color: '#8b5cf6' },
              { value: '350', label: 'KM/H', color: '#0ea5e9' },
              { value: '2.5', label: 'SEC', color: '#ec4899' },
              { value: 'V12', label: 'ENGINE', color: '#D4AF37' },
            ].map((spec, i) => (
              <motion.div
                key={spec.label}
                className="p-8 rounded-3xl text-center"
                style={{
                  background: 'rgba(0, 0, 0, 0.6)',
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${spec.color}40`,
                  boxShadow: `0 0 40px ${spec.color}20, inset 0 0 40px ${spec.color}05`
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: `0 0 60px ${spec.color}40, inset 0 0 60px ${spec.color}10`
                }}
              >
                <div 
                  className="text-5xl md:text-7xl font-black mb-3"
                  style={{ 
                    color: spec.color,
                    textShadow: `0 0 40px ${spec.color}`
                  }}
                >
                  {spec.value}
                </div>
                <div className="text-white/50 text-sm tracking-[0.2em]">{spec.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="relative py-40 px-6 overflow-hidden">
        {/* Animated Background */}
        <motion.div
          className="absolute w-[1000px] h-[1000px] rounded-full blur-[150px]"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 60%)',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-6xl md:text-9xl font-black mb-10"
            style={{
              background: 'linear-gradient(180deg, #ffffff 0%, #0ea5e9 50%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            READY TO<br />DOMINATE?
          </motion.h2>

          <motion.p
            className="text-xl text-white/60 mb-14 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Experience the pinnacle of automotive engineering. 
            Step into a world where power meets perfection.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Link href="/gallery">
              <motion.button
                className="px-12 py-5 rounded-full font-bold uppercase tracking-wider text-black cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37, #B8860B)',
                  boxShadow: '0 0 40px rgba(212, 175, 55, 0.5)'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Gallery
              </motion.button>
            </Link>
            <Link href="/about">
              <motion.button
                className="px-12 py-5 rounded-full font-bold uppercase tracking-wider cursor-pointer"
                style={{
                  border: '2px solid #0ea5e9',
                  color: '#0ea5e9',
                  boxShadow: '0 0 30px rgba(14, 165, 233, 0.3)'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="relative py-16 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            className="text-3xl font-black mb-4"
            style={{ color: '#D4AF37' }}
            whileHover={{ scale: 1.05 }}
          >
            LAMBO
          </motion.div>
          <p className="text-white/40 text-sm">© 2024 Lamborghini Showcase. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
