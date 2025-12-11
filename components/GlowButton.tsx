'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface GlowButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'neon';
  glowColor?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function GlowButton({
  children,
  variant = 'primary',
  glowColor,
  href,
  onClick,
  className = '',
  size = 'md'
}: GlowButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [ripplePosition, setRipplePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [showRipple, setShowRipple] = useState(false);

  const colors = {
    primary: {
      bg: 'bg-[#D4AF37]',
      text: 'text-black',
      glow: 'rgba(212, 175, 55, 0.6)',
      border: 'border-[#D4AF37]',
      hoverBg: 'hover:bg-[#B8860B]'
    },
    secondary: {
      bg: 'bg-transparent',
      text: 'text-white',
      glow: 'rgba(255, 255, 255, 0.4)',
      border: 'border-white/30',
      hoverBg: 'hover:bg-white/10'
    },
    neon: {
      bg: 'bg-transparent',
      text: 'text-[#0ea5e9]',
      glow: 'rgba(14, 165, 233, 0.6)',
      border: 'border-[#0ea5e9]',
      hoverBg: 'hover:bg-[#0ea5e9]/10'
    }
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-8 py-4 text-sm',
    lg: 'px-10 py-5 text-base'
  };

  const activeColors = colors[variant];
  const activeGlowColor = glowColor || activeColors.glow;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setRipplePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setRipplePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setShowRipple(true);
    setTimeout(() => setShowRipple(false), 600);
    onClick?.();
  };

  const content = (
    <>
      {/* Intense pulsing neon glow behind button */}
      <motion.div
        className="absolute -inset-1 rounded-full blur-xl -z-10"
        style={{ backgroundColor: activeGlowColor }}
        animate={{
          scale: isHovered ? [1, 1.3, 1.2] : [1, 1.15, 1],
          opacity: isHovered ? [0.5, 0.8, 0.6] : [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      
      {/* Secondary glow layer for depth */}
      <motion.div
        className="absolute -inset-2 rounded-full blur-2xl -z-20"
        style={{ backgroundColor: activeGlowColor }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5
        }}
      />
      
      {/* Ripple effect on hover */}
      {isHovered && (
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripplePosition.x,
            top: ripplePosition.y,
            background: `radial-gradient(circle, ${activeGlowColor} 0%, transparent 70%)`,
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ width: 0, height: 0, opacity: 0.8 }}
          animate={{ width: 250, height: 250, opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          key={`${ripplePosition.x}-${ripplePosition.y}`}
        />
      )}

      {/* Click ripple */}
      {showRipple && (
        <motion.div
          className="absolute rounded-full pointer-events-none z-20"
          style={{
            left: ripplePosition.x,
            top: ripplePosition.y,
            backgroundColor: variant === 'primary' ? 'rgba(0,0,0,0.3)' : activeGlowColor,
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{ width: 300, height: 300, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      )}

      {/* Neon border glow for neon variant */}
      {variant === 'neon' && (
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: isHovered 
              ? `0 0 5px ${activeGlowColor}, 0 0 20px ${activeGlowColor}, 0 0 40px ${activeGlowColor}, inset 0 0 20px ${activeGlowColor}`
              : `0 0 5px ${activeGlowColor}, 0 0 10px ${activeGlowColor}`
          }}
          animate={{
            boxShadow: isHovered 
              ? [
                  `0 0 5px ${activeGlowColor}, 0 0 20px ${activeGlowColor}, 0 0 40px ${activeGlowColor}`,
                  `0 0 10px ${activeGlowColor}, 0 0 30px ${activeGlowColor}, 0 0 60px ${activeGlowColor}`,
                  `0 0 5px ${activeGlowColor}, 0 0 20px ${activeGlowColor}, 0 0 40px ${activeGlowColor}`
                ]
              : undefined
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      
      {/* Button content */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  const baseClassName = `relative overflow-hidden ${sizes[size]} font-semibold uppercase tracking-wider rounded-full transition-all duration-300 border ${activeColors.bg} ${activeColors.text} ${activeColors.border} ${activeColors.hoverBg} ${className}`;

  const springTransition = { type: 'spring' as const, stiffness: 400, damping: 17 };

  if (href) {
    return (
      <Link href={href} className={baseClassName}>
        <motion.span
          className="relative block w-full h-full"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={springTransition}
          onClick={handleClick}
        >
          {content}
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.button 
      className={baseClassName}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={springTransition}
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      onClick={handleClick}
    >
      {content}
    </motion.button>
  );
}
