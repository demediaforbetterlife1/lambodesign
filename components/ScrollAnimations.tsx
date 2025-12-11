'use client';

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

const NEON = {
  purple: '#8b5cf6',
  cyan: '#0ea5e9',
  gold: '#D4AF37',
  pink: '#ec4899',
};

// Fade up on scroll
export function FadeUp({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, filter: 'blur(10px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Scale up on scroll
export function ScaleUp({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
      animate={isInView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Slide in from side
export function SlideIn({ children, direction = 'left', delay = 0 }: { 
  children: ReactNode; 
  direction?: 'left' | 'right';
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const x = direction === 'left' ? -100 : 100;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x, filter: 'blur(10px)' }}
      animate={isInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}


// Parallax scroll effect
export function Parallax({ children, speed = 0.5 }: { children: ReactNode; speed?: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div ref={ref} style={{ y: smoothY }}>
      {children}
    </motion.div>
  );
}

// Reveal with neon glow
export function NeonReveal({ children, color = NEON.cyan, delay = 0 }: { 
  children: ReactNode; 
  color?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={isInView ? { 
          opacity: [0, 0.8, 0],
          scale: [1.1, 1.05, 1]
        } : {}}
        transition={{ duration: 1, delay }}
        style={{ 
          background: `radial-gradient(ellipse, ${color}40 0%, transparent 70%)`,
          filter: 'blur(20px)'
        }}
      />
      {children}
    </motion.div>
  );
}

// Stagger children animation
export function StaggerContainer({ children, staggerDelay = 0.1 }: { 
  children: ReactNode; 
  staggerDelay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: staggerDelay }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
        visible: { 
          opacity: 1, 
          y: 0, 
          filter: 'blur(0px)',
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

// Text reveal character by character
export function TextReveal({ text, className = '', delay = 0 }: { 
  text: string; 
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <span ref={ref} className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ 
            duration: 0.5, 
            delay: delay + i * 0.03,
            ease: [0.22, 1, 0.36, 1]
          }}
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

// Magnetic hover effect wrapper
export function MagneticHover({ children, strength = 0.3 }: { 
  children: ReactNode; 
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0, 0)';
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)' }}
    >
      {children}
    </motion.div>
  );
}

// Scroll progress indicator
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[9999] origin-left"
      style={{ 
        scaleX,
        background: `linear-gradient(90deg, ${NEON.purple}, ${NEON.cyan}, ${NEON.gold})`,
        boxShadow: `0 0 20px ${NEON.cyan}`
      }}
    />
  );
}

// Rotating border animation
export function RotatingBorder({ children, className = '' }: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <div className={`relative p-[3px] rounded-2xl overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from 0deg, ${NEON.purple}, ${NEON.cyan}, ${NEON.gold}, ${NEON.pink}, ${NEON.purple})`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
      <div className="relative bg-black rounded-2xl">
        {children}
      </div>
    </div>
  );
}


// ============================================
// ENHANCED SCROLL ANIMATIONS - Amazing Effects
// ============================================

// Cinematic reveal with light sweep
export function CinematicReveal({ children, delay = 0 }: { 
  children: ReactNode; 
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      {/* Light sweep effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10"
        initial={{ x: '-100%', opacity: 0 }}
        animate={isInView ? { 
          x: ['−100%', '200%'],
          opacity: [0, 0.6, 0]
        } : {}}
        transition={{ duration: 1.2, delay: delay + 0.2, ease: 'easeInOut' }}
        style={{
          background: `linear-gradient(90deg, transparent, ${NEON.gold}50, transparent)`,
          width: '50%',
        }}
      />
      
      {/* Content with scale and blur */}
      <motion.div
        initial={{ scale: 0.9, filter: 'blur(20px)' }}
        animate={isInView ? { scale: 1, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// 3D Flip reveal for cards
export function FlipReveal({ children, delay = 0 }: { 
  children: ReactNode; 
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      style={{ perspective: '1000px' }}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      <motion.div
        initial={{ rotateY: -90, opacity: 0 }}
        animate={isInView ? { rotateY: 0, opacity: 1 } : {}}
        transition={{ 
          duration: 0.8, 
          delay, 
          ease: [0.22, 1, 0.36, 1] 
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// Zoom blur reveal
export function ZoomBlurReveal({ children, delay = 0 }: { 
  children: ReactNode; 
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        scale: 1.3, 
        filter: 'blur(30px)' 
      }}
      animate={isInView ? { 
        opacity: 1, 
        scale: 1, 
        filter: 'blur(0px)' 
      } : {}}
      transition={{ 
        duration: 1, 
        delay, 
        ease: [0.22, 1, 0.36, 1] 
      }}
    >
      {children}
    </motion.div>
  );
}

// Split reveal (content splits from center)
export function SplitReveal({ children, delay = 0 }: { 
  children: ReactNode; 
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div ref={ref} className="relative overflow-hidden">
      {/* Left curtain */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 z-10"
        style={{ background: NEON.purple }}
        initial={{ scaleX: 1, originX: 0 }}
        animate={isInView ? { scaleX: 0 } : {}}
        transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Right curtain */}
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 z-10"
        style={{ background: NEON.cyan }}
        initial={{ scaleX: 1, originX: 1 }}
        animate={isInView ? { scaleX: 0 } : {}}
        transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: delay + 0.3 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// Glitch reveal effect
export function GlitchReveal({ children, delay = 0 }: { 
  children: ReactNode; 
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.3, delay }}
    >
      {/* Glitch layers */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ x: 0, opacity: 0 }}
        animate={isInView ? { 
          x: [0, -5, 5, -3, 3, 0],
          opacity: [0, 0.8, 0.8, 0.8, 0.8, 0]
        } : {}}
        transition={{ duration: 0.4, delay: delay + 0.1 }}
        style={{ 
          color: NEON.cyan,
          mixBlendMode: 'screen',
        }}
      >
        {children}
      </motion.div>
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ x: 0, opacity: 0 }}
        animate={isInView ? { 
          x: [0, 5, -5, 3, -3, 0],
          opacity: [0, 0.8, 0.8, 0.8, 0.8, 0]
        } : {}}
        transition={{ duration: 0.4, delay: delay + 0.15 }}
        style={{ 
          color: NEON.pink,
          mixBlendMode: 'screen',
        }}
      >
        {children}
      </motion.div>
      
      {/* Main content */}
      <motion.div
        initial={{ y: 20, filter: 'blur(10px)' }}
        animate={isInView ? { y: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// Elastic bounce reveal
export function BounceReveal({ children, delay = 0 }: { 
  children: ReactNode; 
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.8, 
        delay,
        type: 'spring',
        stiffness: 200,
        damping: 15,
      }}
    >
      {children}
    </motion.div>
  );
}

// Morphing background section
export function MorphSection({ 
  children, 
  fromColor = NEON.purple, 
  toColor = NEON.cyan 
}: { 
  children: ReactNode; 
  fromColor?: string;
  toColor?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [`${fromColor}20`, `${toColor}30`, `${fromColor}20`]
  );

  return (
    <motion.div 
      ref={ref} 
      style={{ backgroundColor }}
      className="relative"
    >
      {children}
    </motion.div>
  );
}

// Floating animation (continuous)
export function Float({ children, duration = 3, distance = 10 }: { 
  children: ReactNode; 
  duration?: number;
  distance?: number;
}) {
  return (
    <motion.div
      animate={{ 
        y: [-distance, distance, -distance],
      }}
      transition={{ 
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}

// Pulse glow effect
export function PulseGlow({ children, color = NEON.gold }: { 
  children: ReactNode; 
  color?: string;
}) {
  return (
    <motion.div className="relative">
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        animate={{
          boxShadow: [
            `0 0 20px ${color}40`,
            `0 0 40px ${color}60`,
            `0 0 20px ${color}40`,
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {children}
    </motion.div>
  );
}
