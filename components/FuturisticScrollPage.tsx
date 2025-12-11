'use client';

import { useRef, useCallback, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScrollProgressBar } from './ScrollProgressBar';
import { SectionIndicators, SectionConfig } from './SectionIndicators';
import { HeroScrollSection } from './HeroScrollSection';
import { VehicleShowcaseSection } from './VehicleShowcaseSection';
import { LegacySection } from './LegacySection';
import { ContactSection } from './ContactSection';
import { useActiveSection } from '@/hooks/useActiveSection';

const NEON = {
  purple: '#8b5cf6',
  cyan: '#0ea5e9',
  gold: '#D4AF37',
  pink: '#ec4899',
};

const SECTIONS: SectionConfig[] = [
  { id: 'hero', label: 'Home', color: NEON.gold },
  { id: 'vehicles', label: 'Models', color: NEON.cyan },
  { id: 'legacy', label: 'Legacy', color: NEON.purple },
  { id: 'contact', label: 'Contact', color: NEON.pink },
];

/**
 * Main single-page scroll layout combining all sections
 * Requirements: 1.1, 1.2 - All content in single scrollable page with snap behavior
 */
export function FuturisticScrollPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  const { activeIndex } = useActiveSection({
    sectionIds: SECTIONS.map((s) => s.id),
    threshold: 0.5,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Custom cursor tracking
  useEffect(() => {
    if (!isClient) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
      }
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isClient]);

  const handleSectionClick = useCallback((index: number) => {
    const section = SECTIONS[index];
    if (section) {
      const element = document.getElementById(section.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const scrollToNext = useCallback(() => {
    const vehiclesSection = document.getElementById('vehicles');
    if (vehiclesSection) {
      vehiclesSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

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
    <div
      ref={containerRef}
      className="min-h-screen bg-black text-white overflow-x-hidden cursor-none"
      style={{
        scrollSnapType: 'y proximity',
        overflowY: 'auto',
      }}
    >
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed w-5 h-5 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ background: NEON.gold, willChange: 'transform' }}
      />
      <div
        ref={cursorGlowRef}
        className="fixed w-[300px] h-[300px] rounded-full pointer-events-none z-[9998]"
        style={{
          background: `radial-gradient(circle, ${NEON.purple}20 0%, transparent 70%)`,
          filter: 'blur(20px)',
          willChange: 'transform',
        }}
      />

      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Section Indicators */}
      <SectionIndicators
        sections={SECTIONS}
        activeSection={activeIndex}
        onSectionClick={handleSectionClick}
      />

      {/* Sections */}
      <HeroScrollSection onScrollToNext={scrollToNext} />
      <VehicleShowcaseSection />
      <LegacySection />
      <ContactSection />
    </div>
  );
}

export default FuturisticScrollPage;
