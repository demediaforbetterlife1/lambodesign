'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SpaceBackground from '@/components/SpaceBackground';
import LamboCardGrid from '@/components/LamboCardGrid';
import VehicleDetailModal from '@/components/VehicleDetailModal';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import AnimatedHeadline from '@/components/AnimatedHeadline';
import { FEATURED_LAMBOS, VehicleData, SPACE_COLORS } from '@/lib/constants';

export default function GalleryPage() {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVehicleSelect = (vehicle: VehicleData) => {
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVehicle(null);
  };

  return (
    <PageTransition>
      <main className="min-h-screen relative">
        {/* Space background */}
        <SpaceBackground starCount={250} nebulaIntensity={0.5} />

        {/* Content */}
        <div className="relative z-10 pt-24">
          {/* Header section */}
          <section className="relative px-6 py-16 overflow-hidden">
            <div className="relative max-w-7xl mx-auto text-center">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-block px-6 py-2 rounded-full text-sm uppercase tracking-[0.3em] font-medium mb-6"
                style={{
                  background: `${SPACE_COLORS.nebulaPurple}30`,
                  border: `1px solid ${SPACE_COLORS.glowPurple}`,
                  color: SPACE_COLORS.starWhite,
                  textShadow: `0 0 20px ${SPACE_COLORS.glowPurple}`,
                  boxShadow: `0 0 30px ${SPACE_COLORS.glowPurple}`
                }}
              >
                The Collection
              </motion.span>
              
              <AnimatedHeadline
                text="Choose Your Legend"
                tag="h1"
                delay={100}
                className="text-5xl md:text-7xl font-bold"
                style={{ 
                  color: SPACE_COLORS.starWhite,
                  textShadow: `0 0 40px ${SPACE_COLORS.glowCyan}, 0 0 80px ${SPACE_COLORS.glowPurple}`
                }}
              />
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-white/60 mt-6 max-w-2xl mx-auto text-lg"
              >
                Select a legendary supercar to explore its specifications. 
                Each model represents the pinnacle of Italian engineering excellence.
              </motion.p>
            </div>
            
            {/* Bottom glow line */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-[2px]"
              style={{ 
                background: `linear-gradient(90deg, transparent, ${SPACE_COLORS.glowPurple}, ${SPACE_COLORS.glowCyan}, transparent)`,
                boxShadow: `0 0 30px ${SPACE_COLORS.glowPurple}`
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </section>

          {/* Lambo Cards Grid - 3 cards */}
          <section className="relative py-12">
            <LamboCardGrid 
              vehicles={FEATURED_LAMBOS} 
              onVehicleSelect={handleVehicleSelect} 
            />
          </section>
        </div>

        {/* Vehicle Detail Modal */}
        <VehicleDetailModal
          vehicle={selectedVehicle}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />

        <Footer />
      </main>
    </PageTransition>
  );
}
