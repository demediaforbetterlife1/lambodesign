'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import GradientMesh from './GradientMesh';
import LightBeam from './LightBeam';
import ParticleField from './ParticleField';
import AnimatedHeadline from './AnimatedHeadline';
import GlowButton from './GlowButton';

interface CinematicHeroProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}

export default function CinematicHero({
  title = 'BEYOND THE ORDINARY',
  subtitle = 'Experience the pinnacle of Italian automotive excellence',
  backgroundImage = '/redlambo.png'
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Smooth mouse tracking with springs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  // 3D transforms based on mouse position
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);
  const imageX = useTransform(smoothX, [-0.5, 0.5], [60, -60]);
  const imageY = useTransform(smoothY, [-0.5, 0.5], [40, -40]);
  const imageScale = useTransform(smoothY, [-0.5, 0.5], [1.15, 1.05]);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black"
      style={{ perspective: '1200px' }}
    >
      {/* Gradient Mesh Background */}
      <GradientMesh 
        colors={{
          primary: '#0a1628',
          secondary: '#1a0a2e',
          accent: '#0d0618'
        }}
        animated={true}
      />

      {/* Cyber grid overlay with 3D effect */}
      <motion.div 
        className="absolute inset-0 cyber-grid opacity-30 z-[1]"
        style={{ rotateX, rotateY }}
      />

      {/* Light Beam Effect - More intense */}
      <LightBeam 
        color="rgba(14, 165, 233, 0.9)"
        intensity={1.2}
        width={5}
        animated={true}
        position="center"
      />

      {/* Secondary light beams with animation */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <motion.div 
          className="absolute top-0 left-1/4 w-[2px] h-full"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(212, 175, 55, 0.4), transparent)',
            boxShadow: '0 0 15px rgba(212, 175, 55, 0.3)'
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-0 right-1/4 w-[2px] h-full"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(212, 175, 55, 0.4), transparent)',
            boxShadow: '0 0 15px rgba(212, 175, 55, 0.3)'
          }}
          animate={{ opacity: [0.6, 0.3, 0.6] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {/* Particle Field - More particles */}
      <ParticleField 
        count={100}
        color="rgba(212, 175, 55, 0.8)"
        speed={0.2}
        size={{ min: 1, max: 4 }}
      />

      {/* Additional cyan particles */}
      <ParticleField 
        count={50}
        color="rgba(14, 165, 233, 0.6)"
        speed={0.15}
        size={{ min: 1, max: 3 }}
      />

      {/* 3D Parallax Image Layer */}
      <motion.div 
        className="absolute inset-0 z-10"
        style={{
          x: imageX,
          y: imageY,
          scale: imageScale,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
      >
        <motion.div
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full h-full"
        >
          <Image
            src={backgroundImage}
            alt="Lamborghini"
            fill
            className="object-cover object-center"
            style={{ opacity: isLoaded ? 0.6 : 0 }}
            priority
            onLoad={() => setIsLoaded(true)}
          />
          {/* Dramatic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
          
          {/* Color tint overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/30 via-transparent to-[#1a0a2e]/30" />
        </motion.div>
      </motion.div>

      {/* Neon frame corners */}
      <div className="absolute inset-8 z-20 pointer-events-none">
        {/* Top left */}
        <div className="absolute top-0 left-0 w-20 h-20">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#D4AF37] to-transparent" 
               style={{ boxShadow: '0 0 10px #D4AF37, 0 0 20px rgba(212, 175, 55, 0.5)' }} />
          <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-[#D4AF37] to-transparent"
               style={{ boxShadow: '0 0 10px #D4AF37, 0 0 20px rgba(212, 175, 55, 0.5)' }} />
        </div>
        {/* Top right */}
        <div className="absolute top-0 right-0 w-20 h-20">
          <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-[#D4AF37] to-transparent"
               style={{ boxShadow: '0 0 10px #D4AF37, 0 0 20px rgba(212, 175, 55, 0.5)' }} />
          <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-[#D4AF37] to-transparent"
               style={{ boxShadow: '0 0 10px #D4AF37, 0 0 20px rgba(212, 175, 55, 0.5)' }} />
        </div>
        {/* Bottom left */}
        <div className="absolute bottom-0 left-0 w-20 h-20">
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#D4AF37] to-transparent"
               style={{ boxShadow: '0 0 10px #D4AF37, 0 0 20px rgba(212, 175, 55, 0.5)' }} />
          <div className="absolute bottom-0 left-0 h-full w-[2px] bg-gradient-to-t from-[#D4AF37] to-transparent"
               style={{ boxShadow: '0 0 10px #D4AF37, 0 0 20px rgba(212, 175, 55, 0.5)' }} />
        </div>
        {/* Bottom right */}
        <div className="absolute bottom-0 right-0 w-20 h-20">
          <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-[#D4AF37] to-transparent"
               style={{ boxShadow: '0 0 10px #D4AF37, 0 0 20px rgba(212, 175, 55, 0.5)' }} />
          <div className="absolute bottom-0 right-0 h-full w-[2px] bg-gradient-to-t from-[#D4AF37] to-transparent"
               style={{ boxShadow: '0 0 10px #D4AF37, 0 0 20px rgba(212, 175, 55, 0.5)' }} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 text-center">
        {/* Decorative top element */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="absolute top-32 left-1/2 -translate-x-1/2 w-40 h-[1px]"
          style={{
            background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
            boxShadow: '0 0 20px rgba(212, 175, 55, 0.5)'
          }}
        />

        {/* Brand tag with neon effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, type: "spring" }}
          className="mb-8"
        >
          <span 
            className="inline-block px-6 py-2 rounded-full text-sm md:text-base uppercase tracking-[0.3em] font-light relative overflow-hidden"
            style={{
              color: '#D4AF37',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              background: 'rgba(212, 175, 55, 0.05)',
              textShadow: '0 0 20px rgba(212, 175, 55, 0.8)'
            }}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
            />
            <span className="relative z-10">Automobili Lamborghini</span>
          </span>
        </motion.div>

        {/* Animated Headline with neon glow */}
        <AnimatedHeadline
          text={title}
          tag="h1"
          delay={500}
          className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tight mb-6"
        />

        {/* Decorative line under title */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="w-24 h-[2px] mb-8"
          style={{
            background: 'linear-gradient(90deg, #0ea5e9, #8b5cf6, #0ea5e9)',
            boxShadow: '0 0 20px rgba(14, 165, 233, 0.8)'
          }}
        />

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-lg md:text-xl text-white/80 max-w-2xl mb-12 font-light leading-relaxed"
        >
          {subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <GlowButton href="/gallery" variant="primary" size="lg">
            Explore Models
          </GlowButton>
          <GlowButton href="/about" variant="neon" size="lg">
            Our Legacy
          </GlowButton>
        </motion.div>

        {/* Stats bar at bottom of hero */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-12 md:gap-20"
        >
          {[
            { value: '1015', label: 'HP' },
            { value: '2.5', label: 'SEC' },
            { value: '350', label: 'KM/H' },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2 + i * 0.1 }}
            >
              <div 
                className="text-2xl md:text-4xl font-black"
                style={{ 
                  color: '#0ea5e9',
                  textShadow: '0 0 30px rgba(14, 165, 233, 0.8)'
                }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-white/50 tracking-widest mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator with neon effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[#0ea5e9] text-xs uppercase tracking-widest neon-blue">Scroll</span>
          <div 
            className="w-6 h-10 border-2 border-[#0ea5e9] rounded-full flex justify-center pt-2 relative overflow-hidden"
            style={{ boxShadow: '0 0 10px rgba(14, 165, 233, 0.5), inset 0 0 10px rgba(14, 165, 233, 0.2)' }}
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"
              style={{ boxShadow: '0 0 10px #D4AF37, 0 0 20px rgba(212, 175, 55, 0.5)' }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom neon line */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0ea5e9] to-transparent z-20"
        style={{ boxShadow: '0 0 20px rgba(14, 165, 233, 0.8), 0 0 40px rgba(14, 165, 233, 0.4)' }}
      />

      {/* Scanning line effect */}
      <div className="absolute inset-0 scan-line pointer-events-none z-30" />
    </section>
  );
}
