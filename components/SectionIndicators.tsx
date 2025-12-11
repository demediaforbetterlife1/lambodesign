'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const NEON = {
  purple: '#8b5cf6',
  cyan: '#0ea5e9',
  gold: '#D4AF37',
  pink: '#ec4899',
};

export interface SectionConfig {
  id: string;
  label: string;
  color: string;
}

export interface SectionIndicatorsProps {
  sections: SectionConfig[];
  activeSection: number;
  onSectionClick: (index: number) => void;
  className?: string;
}

/**
 * Fixed vertical navigation dots showing current section
 * Requirements: 5.2, 5.3, 5.4 - Section indicators with highlighting and click navigation
 */
export function SectionIndicators({
  sections,
  activeSection,
  onSectionClick,
  className = '',
}: SectionIndicatorsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    const section = sections[index];
    if (section) {
      const element = document.getElementById(section.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      onSectionClick(index);
    }
  };

  return (
    <div
      className={`fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 ${className}`}
    >
      {sections.map((section, index) => {
        const isActive = index === activeSection;
        const isHovered = index === hoveredIndex;
        const color = section.color || NEON.cyan;

        return (
          <motion.button
            key={section.id}
            onClick={() => handleClick(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative flex items-center justify-end group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Label (shows on hover) */}
            <motion.span
              className="absolute right-8 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap"
              initial={{ opacity: 0, x: 10 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                x: isHovered ? 0 : 10,
              }}
              transition={{ duration: 0.2 }}
              style={{
                background: `${color}20`,
                color: color,
                border: `1px solid ${color}50`,
                textShadow: `0 0 10px ${color}`,
              }}
            >
              {section.label}
            </motion.span>

            {/* Dot */}
            <motion.div
              className="relative w-3 h-3 rounded-full cursor-pointer"
              animate={{
                scale: isActive ? 1.3 : 1,
                backgroundColor: isActive ? color : 'rgba(255, 255, 255, 0.3)',
              }}
              transition={{ duration: 0.3 }}
              style={{
                boxShadow: isActive
                  ? `0 0 15px ${color}, 0 0 30px ${color}50`
                  : 'none',
              }}
            >
              {/* Pulse ring for active */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ border: `2px solid ${color}` }}
                  animate={{
                    scale: [1, 1.8, 1],
                    opacity: [0.8, 0, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              )}
            </motion.div>

            {/* Connecting line to next dot */}
            {index < sections.length - 1 && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 w-[1px] h-4"
                style={{
                  background: `linear-gradient(to bottom, ${
                    isActive ? color : 'rgba(255, 255, 255, 0.2)'
                  }, transparent)`,
                }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

export default SectionIndicators;
