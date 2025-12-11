'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SPACE_COLORS } from '@/lib/constants';

interface PropertyCardProps {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon?: React.ReactNode;
  color?: string;
  delay?: number;
  decimals?: number;
}

export default function PropertyCard({
  label,
  value,
  suffix = '',
  prefix = '',
  icon,
  color = SPACE_COLORS.glowCyan,
  delay = 0,
  decimals = 0
}: PropertyCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const startTime = Date.now();
    const startDelay = delay * 1000;

    const timer = setTimeout(() => {
      const animate = () => {
        const elapsed = Date.now() - startTime - startDelay;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out cubic
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const current = easedProgress * value;
        
        setDisplayValue(current);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }, startDelay);

    return () => clearTimeout(timer);
  }, [isInView, value, delay]);

  const formattedValue = decimals > 0 
    ? displayValue.toFixed(decimals) 
    : Math.round(displayValue).toLocaleString();

  return (
    <motion.div
      ref={ref}
      className="relative p-6 rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        border: `1px solid rgba(255, 255, 255, 0.1)`,
        boxShadow: `0 0 30px ${color}20, inset 0 0 30px ${color}05`
      }}
    >
      {/* Glow accent */}
      <div 
        className="absolute top-0 left-1/4 right-1/4 h-[2px] rounded-full"
        style={{ 
          background: color,
          boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`
        }}
      />
      
      {/* Icon */}
      {icon && (
        <div 
          className="text-3xl mb-3"
          style={{ filter: `drop-shadow(0 0 10px ${color})` }}
        >
          {icon}
        </div>
      )}
      
      {/* Value */}
      <div 
        className="text-4xl md:text-5xl font-bold mb-2"
        style={{ 
          color: SPACE_COLORS.starWhite,
          textShadow: `0 0 20px ${color}`
        }}
      >
        {prefix}{formattedValue}{suffix}
      </div>
      
      {/* Label */}
      <div className="text-white/60 text-sm uppercase tracking-wider">
        {label}
      </div>
      
      {/* Bottom glow line */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: delay + 0.5 }}
      />
    </motion.div>
  );
}
