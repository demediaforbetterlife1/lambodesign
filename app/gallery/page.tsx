'use client';

import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import VehicleDetailModal from '@/components/VehicleDetailModal';
import Footer from '@/components/Footer';
import { FadeUp, ScaleUp, StaggerContainer, StaggerItem, TextReveal, NeonReveal, Parallax } from '@/components/ScrollAnimations';
import { FEATURED_LAMBOS, VehicleData } from '@/lib/constants';
import Image from 'next/image';

const NEON = {
  purple: '#8b5cf6',
  cyan: '#0ea5e9',
  gold: '#D4AF37',
  pink: '#ec4899',
};

export default function GalleryPage() {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const handleVehicleSelect = (vehicle: VehicleData) => {
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVehicle(null);
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background - OPTIMIZED */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse at 30% 20%, ${NEON.purple}30 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, ${NEON.cyan}30 0%, transparent 50%),
            linear-gradient(180deg, #000 0%, #0d0618 50%, #000 100%)
          `
        }} />
        
        {/* Static orbs - no animation for performance */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{ background: `${NEON.purple}40`, left: '-10%', top: '20%' }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{ background: `${NEON.cyan}30`, right: '-5%', bottom: '30%' }}
        />
      </div>


      {/* Header Section */}
      <motion.section 
        className="relative z-10 pt-32 pb-20 px-6"
        style={{ y: headerY, opacity: headerOpacity }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <FadeUp>
            <motion.span
              className="inline-block px-8 py-3 rounded-full text-sm uppercase tracking-[0.4em] font-semibold mb-8"
              style={{
                background: `${NEON.purple}20`,
                border: `2px solid ${NEON.purple}60`,
                color: NEON.purple,
                textShadow: `0 0 20px ${NEON.purple}`,
                boxShadow: `0 0 40px ${NEON.purple}30`
              }}
              whileHover={{ scale: 1.05, boxShadow: `0 0 60px ${NEON.purple}50` }}
            >
              The Collection
            </motion.span>
          </FadeUp>
          
          <FadeUp delay={0.2}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8">
              <TextReveal 
                text="CHOOSE YOUR" 
                className="block"
                delay={0.3}
              />
              <span 
                className="block mt-2"
                style={{
                  background: `linear-gradient(135deg, ${NEON.gold}, #fff, ${NEON.gold})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: `0 0 60px ${NEON.gold}50`
                }}
              >
                <TextReveal text="LEGEND" delay={0.6} />
              </span>
            </h1>
          </FadeUp>
          
          <FadeUp delay={0.4}>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Select a legendary supercar to explore its specifications. 
              Each model represents the pinnacle of Italian engineering excellence.
            </p>
          </FadeUp>
        </div>
        
        {/* Decorative line */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{ 
            background: `linear-gradient(90deg, transparent, ${NEON.purple}, ${NEON.cyan}, ${NEON.purple}, transparent)`,
            boxShadow: `0 0 30px ${NEON.purple}`
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        />
      </motion.section>

      {/* Vehicle Cards Grid */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <StaggerContainer staggerDelay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {FEATURED_LAMBOS.map((vehicle, i) => (
                <StaggerItem key={vehicle.id}>
                  <NeonReveal color={[NEON.purple, NEON.cyan, NEON.gold][i % 3]} delay={i * 0.1}>
                    <motion.div
                      className="relative group cursor-pointer rounded-3xl overflow-hidden"
                      style={{
                        background: 'rgba(0,0,0,0.6)',
                        backdropFilter: 'blur(20px)',
                        border: `2px solid ${[NEON.purple, NEON.cyan, NEON.gold][i % 3]}30`,
                      }}
                      onClick={() => handleVehicleSelect(vehicle)}
                      whileHover={{ 
                        scale: 1.03,
                        borderColor: [NEON.purple, NEON.cyan, NEON.gold][i % 3],
                        boxShadow: `0 0 60px ${[NEON.purple, NEON.cyan, NEON.gold][i % 3]}40`
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Corner accents */}
                      <div className="absolute top-0 left-0 w-12 h-12 z-20">
                        <div className="absolute top-0 left-0 w-full h-[3px]" style={{ background: [NEON.purple, NEON.cyan, NEON.gold][i % 3] }} />
                        <div className="absolute top-0 left-0 h-full w-[3px]" style={{ background: [NEON.purple, NEON.cyan, NEON.gold][i % 3] }} />
                      </div>
                      <div className="absolute bottom-0 right-0 w-12 h-12 z-20">
                        <div className="absolute bottom-0 right-0 w-full h-[3px]" style={{ background: [NEON.purple, NEON.cyan, NEON.gold][i % 3] }} />
                        <div className="absolute bottom-0 right-0 h-full w-[3px]" style={{ background: [NEON.purple, NEON.cyan, NEON.gold][i % 3] }} />
                      </div>

                      {/* Image */}
                      <div className="relative h-64 overflow-hidden">
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{ background: `radial-gradient(circle, ${[NEON.purple, NEON.cyan, NEON.gold][i % 3]}30 0%, transparent 70%)` }}
                        />
                        <Image
                          src={vehicle.src}
                          alt={vehicle.alt}
                          fill
                          className="object-contain p-6 transition-transform duration-700 group-hover:scale-110"
                          unoptimized
                        />
                      </div>

                      {/* Content */}
                      <div className="p-8">
                        <span 
                          className="text-xs uppercase tracking-[0.3em] mb-2 block"
                          style={{ color: [NEON.purple, NEON.cyan, NEON.gold][i % 3] }}
                        >
                          {vehicle.specs.engine}
                        </span>
                        <h3 
                          className="text-3xl font-black mb-3"
                          style={{ textShadow: `0 0 20px ${[NEON.purple, NEON.cyan, NEON.gold][i % 3]}50` }}
                        >
                          {vehicle.title}
                        </h3>
                        <p className="text-white/50 text-sm mb-6">{vehicle.tagline}</p>
                        
                        {/* Stats */}
                        <div className="flex gap-6 pt-4 border-t border-white/10">
                          <div>
                            <div className="text-2xl font-bold" style={{ color: NEON.cyan }}>{vehicle.specs.horsepower}</div>
                            <div className="text-xs text-white/40">HP</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold" style={{ color: NEON.purple }}>{vehicle.specs.acceleration}s</div>
                            <div className="text-xs text-white/40">0-100</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold" style={{ color: NEON.gold }}>${(vehicle.specs.price / 1000).toFixed(0)}K</div>
                            <div className="text-xs text-white/40">PRICE</div>
                          </div>
                        </div>
                      </div>

                      {/* Hover overlay - pointer-events-none to allow clicks through */}
                      <div
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{ background: 'rgba(0,0,0,0.7)' }}
                      >
                        <span
                          className="px-8 py-4 rounded-full font-bold uppercase tracking-wider"
                          style={{
                            border: `2px solid ${NEON.gold}`,
                            color: NEON.gold,
                            boxShadow: `0 0 30px ${NEON.gold}50`
                          }}
                        >
                          View Details
                        </span>
                      </div>
                    </motion.div>
                  </NeonReveal>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Vehicle Detail Modal */}
      <VehicleDetailModal
        vehicle={selectedVehicle}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <Footer />
    </main>
  );
}
