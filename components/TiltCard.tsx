'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  maxTilt?: number;
  glowColor?: string;
  className?: string;
}

export default function TiltCard({
  children,
  maxTilt = 15,
  glowColor = 'rgba(14, 165, 233, 0.5)',
  className = ''
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const normalizedX = mouseX / (rect.width / 2);
    const normalizedY = mouseY / (rect.height / 2);
    
    setTilt({
      x: -normalizedY * maxTilt,
      y: normalizedX * maxTilt
    });
    
    const glowX = ((e.clientX - rect.left) / rect.width) * 100;
    const glowY = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPosition({ x: glowX, y: glowY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlowPosition({ x: 50, y: 50 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
    >
      {/* Outer neon glow */}
      <motion.div
        className="absolute -inset-[2px] rounded-3xl pointer-events-none"
        animate={{
          opacity: isHovered ? 1 : 0,
          boxShadow: isHovered 
            ? `0 0 20px ${glowColor}, 0 0 40px ${glowColor}, 0 0 60px ${glowColor}`
            : '0 0 0px transparent'
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Moving glow effect following cursor */}
      <motion.div
        className="absolute -inset-[1px] rounded-3xl pointer-events-none overflow-hidden"
        style={{
          opacity: isHovered ? 1 : 0
        }}
      >
        <motion.div
          className="absolute w-40 h-40 rounded-full blur-xl"
          style={{
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            left: `${glowPosition.x}%`,
            top: `${glowPosition.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      </motion.div>
      
      {/* Neon border */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          border: isHovered ? `2px solid ${glowColor}` : '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: isHovered 
            ? `inset 0 0 30px ${glowColor}30`
            : 'none'
        }}
        animate={{
          borderColor: isHovered ? glowColor : 'rgba(255, 255, 255, 0.1)'
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Scanning line effect on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="absolute left-0 right-0 h-[2px]"
            style={{
              background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)`,
              boxShadow: `0 0 10px ${glowColor}`
            }}
            animate={{
              top: ['0%', '100%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        </motion.div>
      )}
      
      {/* Content */}
      <div 
        className="relative z-10"
        style={{ transform: 'translateZ(30px)' }}
      >
        {children}
      </div>
    </motion.div>
  );
}
