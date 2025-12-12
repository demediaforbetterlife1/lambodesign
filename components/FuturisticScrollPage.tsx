'use client';

import { useRef, useCallback, useState, useEffect } from 'react';
import { ScrollProgressBar } from './ScrollProgressBar';
import { SectionIndicators, SectionConfig } from './SectionIndicators';
import { HeroScrollSection } from './HeroScrollSection';
import { VehicleShowcaseSection } from './VehicleShowcaseSection';
import { LegacySection } from './LegacySection';
import { ContactSection } from './ContactSection';
import VehicleDetailModal from './VehicleDetailModal';
import { useActiveSection } from '@/hooks/useActiveSection';
import { VehicleData } from '@/lib/constants';

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
 * Main single-page scroll layout - OPTIMIZED for performance
 */
export function FuturisticScrollPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { activeIndex } = useActiveSection({
    sectionIds: SECTIONS.map((s) => s.id),
    threshold: 0.5,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  const handleVehicleSelect = useCallback((vehicle: VehicleData) => {
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedVehicle(null), 300);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-3xl font-bold animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black text-white overflow-x-hidden"
      style={{
        scrollSnapType: 'y proximity',
        overflowY: 'auto',
      }}
    >
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
      <VehicleShowcaseSection onVehicleSelect={handleVehicleSelect} />
      <LegacySection />
      <ContactSection />

      {/* Modal rendered at root level to avoid overflow clipping */}
      <VehicleDetailModal 
        vehicle={selectedVehicle} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
}

export default FuturisticScrollPage;
