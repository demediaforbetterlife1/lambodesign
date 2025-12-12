'use client';

import { useState, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
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
 * Vehicle showcase section - OPTIMIZED for performance
 */
export function VehicleShowcaseSection({
  vehicles = FEATURED_LAMBOS,
}: VehicleShowcaseSectionProps) {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [80, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const handleVehicleSelect = (vehicle: VehicleData) => {
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedVehicle(null), 300);
  };

  const cardColors = [NEON.purple, NEON.cyan, NEON.gold];

  // Pre-generate stars (reduced to 15)
  const stars = useMemo(() => 
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: 1 + (i % 3),
      color: ['#fff', NEON.cyan, NEON.purple][i % 3],
      left: `${(i * 6.5) % 100}%`,
      top: `${(i * 7.3) % 100}%`,
      delay: i * 0.2,
    })), []
  );


  return (
    <section
      ref={sectionRef}
      id="vehicles"
      className="relative min-h-screen py-32 px-6 overflow-hidden snap-start"
    >
      {/* Static Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 20% 20%, ${NEON.purple}20 0%, transparent 50%),
              radial-gradient(ellipse at 80% 80%, ${NEON.cyan}15 0%, transparent 50%),
              linear-gradient(180deg, #000 0%, #050510 30%, #0a0a1a 50%, #050510 70%, #000 100%)
            `,
          }}
        />

        {/* Static nebula orbs with CSS animation */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full animate-pulse-slow"
          style={{
            background: `${NEON.purple}25`,
            filter: 'blur(120px)',
            left: '-10%',
            top: '15%',
            willChange: 'opacity',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full animate-pulse-slow"
          style={{
            background: `${NEON.cyan}20`,
            filter: 'blur(100px)',
            right: '-5%',
            bottom: '25%',
            animationDelay: '3s',
            willChange: 'opacity',
          }}
        />

        {/* Stars with CSS animation */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full animate-twinkle"
            style={{
              width: star.size,
              height: star.size,
              background: star.color,
              left: star.left,
              top: star.top,
              boxShadow: `0 0 6px ${star.color}`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}

        {/* Static grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(${NEON.purple}30 1px, transparent 1px),
              linear-gradient(90deg, ${NEON.purple}30 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
      </div>


      {/* Header */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto text-center mb-20"
        style={{ y: headerY, opacity: headerOpacity }}
      >
        <span
          className="inline-block px-8 py-3 rounded-full text-sm uppercase tracking-[0.4em] font-semibold mb-8"
          style={{
            background: `${NEON.purple}20`,
            border: `2px solid ${NEON.purple}60`,
            color: NEON.purple,
            textShadow: `0 0 20px ${NEON.purple}`,
            boxShadow: `0 0 30px ${NEON.purple}25`,
          }}
        >
          ✦ The Collection ✦
        </span>

        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8">
          <span className="block text-white">CHOOSE YOUR</span>
          <span
            className="block mt-2"
            style={{
              background: `linear-gradient(135deg, ${NEON.gold}, #fff, ${NEON.gold})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            LEGEND
          </span>
        </h2>

        <p className="text-xl text-white/60 max-w-2xl mx-auto">
          Select a legendary supercar to explore its specifications
        </p>
      </motion.div>

      {/* Decorative line */}
      <div
        className="absolute top-[32%] left-0 right-0 h-[2px] z-0"
        style={{
          background: `linear-gradient(90deg, transparent, ${NEON.purple}, ${NEON.cyan}, ${NEON.gold}, ${NEON.cyan}, ${NEON.purple}, transparent)`,
          boxShadow: `0 0 20px ${NEON.purple}`,
        }}
      />


      {/* Vehicle Cards Grid */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {vehicles.slice(0, 3).map((vehicle, index) => {
            const cardColor = cardColors[index];
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={vehicle.id}
                className="relative cursor-pointer group"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: 'easeOut',
                }}
                onClick={() => handleVehicleSelect(vehicle)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Card glow - only on hover */}
                <div
                  className={`absolute -inset-3 rounded-[2rem] blur-xl transition-opacity duration-300 ${isHovered ? 'opacity-60' : 'opacity-0'}`}
                  style={{ background: cardColor }}
                />

                {/* Main card */}
                <div
                  className="relative rounded-3xl overflow-hidden transition-all duration-300"
                  style={{
                    background: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(20px)',
                    border: `2px solid ${isHovered ? cardColor : cardColor + '40'}`,
                    boxShadow: isHovered
                      ? `0 0 40px ${cardColor}40, 0 20px 40px rgba(0,0,0,0.4)`
                      : `0 0 15px ${cardColor}15`,
                    transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                  }}
                >
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-14 h-14 z-20">
                    <div
                      className="absolute top-0 left-0 w-full h-[2px]"
                      style={{ background: cardColor, boxShadow: `0 0 10px ${cardColor}` }}
                    />
                    <div
                      className="absolute top-0 left-0 h-full w-[2px]"
                      style={{ background: cardColor, boxShadow: `0 0 10px ${cardColor}` }}
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 w-14 h-14 z-20">
                    <div
                      className="absolute bottom-0 right-0 w-full h-[2px]"
                      style={{ background: cardColor, boxShadow: `0 0 10px ${cardColor}` }}
                    />
                    <div
                      className="absolute bottom-0 right-0 h-full w-[2px]"
                      style={{ background: cardColor, boxShadow: `0 0 10px ${cardColor}` }}
                    />
                  </div>

                  {/* Image section */}
                  <div className="relative h-64 overflow-hidden">
                    <div
                      className={`absolute inset-0 transition-opacity duration-300 ${isHovered ? 'opacity-40' : 'opacity-20'}`}
                      style={{
                        background: `radial-gradient(ellipse at center, ${cardColor} 0%, transparent 70%)`,
                      }}
                    />
                    <div
                      className="relative w-full h-full transition-transform duration-500"
                      style={{ transform: isHovered ? 'scale(1.08)' : 'scale(1)' }}
                    >
                      <Image
                        src={vehicle.src}
                        alt={vehicle.alt}
                        fill
                        className="object-contain p-6"
                        unoptimized
                      />
                    </div>
                  </div>


                  {/* Content */}
                  <div className="p-8">
                    <span
                      className="text-xs uppercase tracking-[0.3em] mb-3 block font-semibold"
                      style={{ color: cardColor, textShadow: `0 0 10px ${cardColor}` }}
                    >
                      {vehicle.specs.engine}
                    </span>

                    <h3
                      className="text-3xl font-black mb-3 text-white"
                      style={{ textShadow: `0 0 20px ${cardColor}30` }}
                    >
                      {vehicle.title}
                    </h3>

                    <p className="text-white/50 text-sm mb-6 line-clamp-2">
                      {vehicle.tagline}
                    </p>

                    {/* Stats row */}
                    <div className="flex gap-6 pt-4 border-t border-white/10">
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: NEON.purple }}>
                          {vehicle.specs.horsepower}
                        </div>
                        <div className="text-xs text-white/40 uppercase tracking-wider">HP</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: NEON.cyan }}>
                          {vehicle.specs.acceleration}s
                        </div>
                        <div className="text-xs text-white/40 uppercase tracking-wider">0-100</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: NEON.gold }}>
                          ${(vehicle.specs.price / 1000).toFixed(0)}K
                        </div>
                        <div className="text-xs text-white/40 uppercase tracking-wider">Price</div>
                      </div>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                    style={{ background: 'rgba(0, 0, 0, 0.85)' }}
                  >
                    <div className="text-center">
                      <div
                        className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                        style={{
                          border: `2px solid ${cardColor}`,
                          boxShadow: `0 0 25px ${cardColor}50`,
                        }}
                      >
                        <span className="text-2xl">🔍</span>
                      </div>
                      <span
                        className="px-6 py-2 rounded-full font-bold uppercase tracking-wider text-sm inline-block"
                        style={{
                          border: `2px solid ${NEON.gold}`,
                          color: NEON.gold,
                          boxShadow: `0 0 20px ${NEON.gold}30`,
                        }}
                      >
                        View Details
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${NEON.cyan}, ${NEON.gold}, ${NEON.cyan}, transparent)`,
          boxShadow: `0 0 20px ${NEON.cyan}`,
        }}
      />

      {/* Modal */}
      <VehicleDetailModal
        vehicle={selectedVehicle}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}

export default VehicleShowcaseSection;
