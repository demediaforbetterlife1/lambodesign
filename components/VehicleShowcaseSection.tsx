'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { VehicleCard3D } from './VehicleCard3D';
import VehicleDetailModal from './VehicleDetailModal';
import { FEATURED_LAMBOS, VehicleData } from '@/lib/constants';

const NEON = {
  purple: '#8b5cf6',
  cyan: '#0ea5e9',
  gold: '#D4AF37',
};

export interface VehicleShowcaseSectionProps {
  vehicles?: VehicleData[];
}

/**
 * Vehicle showcase section with staggered 3D card reveals
 * Requirements: 3.1, 3.2, 3.3, 3.4 - Gallery with scroll animations and modal
 */
export function VehicleShowcaseSection({
  vehicles = FEATURED_LAMBOS,
}: VehicleShowcaseSectionProps) {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const handleVehicleSelect = (vehicle: VehicleData) => {
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVehicle(null);
  };

  return (
    <section
      ref={sectionRef}
      id="vehicles"
      className="relative min-h-screen py-32 px-6 overflow-hidden snap-start"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 30% 20%, ${NEON.purple}30 0%, transparent 50%),
              radial-gradient(ellipse at 70% 80%, ${NEON.cyan}30 0%, transparent 50%),
              linear-gradient(180deg, #000 0%, #0d0618 50%, #000 100%)
            `,
          }}
        />

        {/* Animated orbs */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{ background: `${NEON.purple}40`, left: '-10%', top: '20%' }}
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{ background: `${NEON.cyan}30`, right: '-5%', bottom: '30%' }}
          animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      {/* Header */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto text-center mb-20"
        style={{ y: headerY, opacity: headerOpacity }}
      >
        <motion.span
          className="inline-block px-8 py-3 rounded-full text-sm uppercase tracking-[0.4em] font-semibold mb-8"
          style={{
            background: `${NEON.purple}20`,
            border: `2px solid ${NEON.purple}60`,
            color: NEON.purple,
            textShadow: `0 0 20px ${NEON.purple}`,
            boxShadow: `0 0 40px ${NEON.purple}30`,
          }}
          whileHover={{ scale: 1.05, boxShadow: `0 0 60px ${NEON.purple}50` }}
        >
          The Collection
        </motion.span>

        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8">
          <span className="block">CHOOSE YOUR</span>
          <span
            className="block mt-2"
            style={{
              background: `linear-gradient(135deg, ${NEON.gold}, #fff, ${NEON.gold})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: `0 0 60px ${NEON.gold}50`,
            }}
          >
            LEGEND
          </span>
        </h2>

        <p className="text-xl text-white/60 max-w-2xl mx-auto">
          Select a legendary supercar to explore its specifications. Each model
          represents the pinnacle of Italian engineering excellence.
        </p>
      </motion.div>

      {/* Decorative line */}
      <motion.div
        className="absolute top-[35%] left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${NEON.purple}, ${NEON.cyan}, ${NEON.purple}, transparent)`,
          boxShadow: `0 0 30px ${NEON.purple}`,
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {/* Vehicle Cards Grid */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vehicles.map((vehicle, i) => (
            <VehicleCard3D
              key={vehicle.id}
              vehicle={vehicle}
              index={i}
              onClick={() => handleVehicleSelect(vehicle)}
              color={[NEON.purple, NEON.cyan, NEON.gold][i % 3]}
            />
          ))}
        </div>
      </div>

      {/* Bottom decorative line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${NEON.cyan}, ${NEON.gold}, ${NEON.cyan}, transparent)`,
          boxShadow: `0 0 30px ${NEON.cyan}`,
        }}
      />

      {/* Vehicle Detail Modal */}
      <VehicleDetailModal
        vehicle={selectedVehicle}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}

export default VehicleShowcaseSection;
