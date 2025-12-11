'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import VehicleDetailModal from './VehicleDetailModal';
import { FEATURED_LAMBOS, VehicleData } from '@/lib/constants';

const NEON = {
  purple: '#8b5cf6',
  cyan: '#0ea5e9',
  gold: '#D4AF37',
  pink: '#ec4899',
  green: '#10b981',
};

export interface VehicleShowcaseSectionProps {
  vehicles?: VehicleData[];
}

/**
 * Vehicle showcase section with 3 amazing cards and space visuals
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

  const headerY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
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


  return (
    <section
      ref={sectionRef}
      id="vehicles"
      className="relative min-h-screen py-32 px-6 overflow-hidden snap-start"
    >
      {/* Space Background */}
      <div className="absolute inset-0">
        {/* Deep space gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 20% 20%, ${NEON.purple}25 0%, transparent 50%),
              radial-gradient(ellipse at 80% 80%, ${NEON.cyan}20 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, ${NEON.gold}10 0%, transparent 60%),
              linear-gradient(180deg, #000 0%, #050510 30%, #0a0a1a 50%, #050510 70%, #000 100%)
            `,
          }}
        />

        {/* Animated nebula orbs */}
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full blur-[150px]"
          style={{ background: `${NEON.purple}30`, left: '-15%', top: '10%' }}
          animate={{ 
            x: [0, 80, 0], 
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{ background: `${NEON.cyan}25`, right: '-10%', bottom: '20%' }}
          animate={{ 
            x: [0, -60, 0], 
            y: [0, -40, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{ background: `${NEON.gold}15`, left: '40%', top: '60%' }}
          animate={{ 
            x: [0, 40, 0], 
            y: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Stars */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              background: ['#fff', NEON.cyan, NEON.purple, NEON.gold][i % 4],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 ${Math.random() * 10 + 5}px ${['#fff', NEON.cyan, NEON.purple, NEON.gold][i % 4]}`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(${NEON.purple}20 1px, transparent 1px),
              linear-gradient(90deg, ${NEON.purple}20 1px, transparent 1px)
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
          ✦ The Collection ✦
        </motion.span>

        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8">
          <span className="block text-white">CHOOSE YOUR</span>
          <motion.span
            className="block mt-2"
            style={{
              background: `linear-gradient(135deg, ${NEON.gold}, #fff, ${NEON.gold})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            animate={{
              textShadow: [
                `0 0 40px ${NEON.gold}50`,
                `0 0 80px ${NEON.gold}80`,
                `0 0 40px ${NEON.gold}50`,
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            LEGEND
          </motion.span>
        </h2>

        <p className="text-xl text-white/60 max-w-2xl mx-auto">
          Select a legendary supercar to explore its specifications
        </p>
      </motion.div>

      {/* Decorative neon line */}
      <motion.div
        className="absolute top-[32%] left-0 right-0 h-[2px] z-0"
        style={{
          background: `linear-gradient(90deg, transparent, ${NEON.purple}, ${NEON.cyan}, ${NEON.gold}, ${NEON.cyan}, ${NEON.purple}, transparent)`,
          boxShadow: `0 0 30px ${NEON.purple}`,
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.3 }}
      />


      {/* Vehicle Cards Grid - 3 Cards */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {vehicles.slice(0, 3).map((vehicle, index) => {
            const cardColor = cardColors[index];
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={vehicle.id}
                className="relative cursor-pointer group"
                style={{ perspective: '1000px' }}
                initial={{ opacity: 0, y: 100, rotateY: -30 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => handleVehicleSelect(vehicle)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Card glow effect */}
                <motion.div
                  className="absolute -inset-4 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `${cardColor}40` }}
                />

                {/* Main card */}
                <motion.div
                  className="relative rounded-3xl overflow-hidden"
                  style={{
                    background: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(20px)',
                    border: `2px solid ${isHovered ? cardColor : cardColor + '40'}`,
                    boxShadow: isHovered
                      ? `0 0 60px ${cardColor}50, 0 30px 60px rgba(0,0,0,0.5), inset 0 0 60px ${cardColor}10`
                      : `0 0 20px ${cardColor}20, 0 20px 40px rgba(0,0,0,0.3)`,
                    transformStyle: 'preserve-3d',
                  }}
                  animate={{
                    rotateX: isHovered ? -5 : 0,
                    rotateY: isHovered ? 5 : 0,
                    scale: isHovered ? 1.05 : 1,
                    y: isHovered ? -10 : 0,
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  {/* Animated border */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, ${cardColor}, ${NEON.cyan}, ${cardColor})`,
                      backgroundSize: '200% 100%',
                      padding: '2px',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                    }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />

                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-16 h-16 z-20">
                    <div
                      className="absolute top-0 left-0 w-full h-[3px]"
                      style={{ background: cardColor, boxShadow: `0 0 15px ${cardColor}` }}
                    />
                    <div
                      className="absolute top-0 left-0 h-full w-[3px]"
                      style={{ background: cardColor, boxShadow: `0 0 15px ${cardColor}` }}
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 z-20">
                    <div
                      className="absolute bottom-0 right-0 w-full h-[3px]"
                      style={{ background: cardColor, boxShadow: `0 0 15px ${cardColor}` }}
                    />
                    <div
                      className="absolute bottom-0 right-0 h-full w-[3px]"
                      style={{ background: cardColor, boxShadow: `0 0 15px ${cardColor}` }}
                    />
                  </div>


                  {/* Image section */}
                  <div className="relative h-72 overflow-hidden">
                    {/* Image glow */}
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(ellipse at center, ${cardColor}30 0%, transparent 70%)`,
                      }}
                      animate={{
                        opacity: isHovered ? [0.3, 0.6, 0.3] : 0.2,
                        scale: isHovered ? [1, 1.1, 1] : 1,
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />

                    {/* Vehicle image */}
                    <motion.div
                      className="relative w-full h-full"
                      animate={{
                        scale: isHovered ? 1.1 : 1,
                        y: isHovered ? -10 : 0,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <Image
                        src={vehicle.src}
                        alt={vehicle.alt}
                        fill
                        className="object-contain p-6"
                        unoptimized
                      />
                    </motion.div>

                    {/* Floating particles on hover */}
                    {isHovered && [...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full"
                        style={{
                          background: cardColor,
                          boxShadow: `0 0 10px ${cardColor}`,
                          left: `${30 + Math.random() * 40}%`,
                          top: `${30 + Math.random() * 40}%`,
                        }}
                        animate={{
                          y: [0, -40, 0],
                          opacity: [0, 1, 0],
                          scale: [0, 1.5, 0],
                        }}
                        transition={{
                          duration: 1.5 + Math.random(),
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <motion.span
                      className="text-xs uppercase tracking-[0.3em] mb-3 block font-semibold"
                      style={{ color: cardColor, textShadow: `0 0 10px ${cardColor}` }}
                    >
                      {vehicle.specs.engine}
                    </motion.span>

                    <h3
                      className="text-3xl font-black mb-3 text-white"
                      style={{ textShadow: `0 0 30px ${cardColor}40` }}
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


                  {/* Hover overlay with CTA */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    style={{ background: 'rgba(0, 0, 0, 0.8)' }}
                  >
                    <motion.div
                      className="text-center"
                      initial={{ scale: 0.8, y: 20 }}
                      animate={{ 
                        scale: isHovered ? 1 : 0.8, 
                        y: isHovered ? 0 : 20 
                      }}
                    >
                      <motion.div
                        className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
                        style={{
                          border: `2px solid ${cardColor}`,
                          boxShadow: `0 0 30px ${cardColor}50`,
                        }}
                        animate={{
                          boxShadow: [
                            `0 0 30px ${cardColor}50`,
                            `0 0 50px ${cardColor}80`,
                            `0 0 30px ${cardColor}50`,
                          ],
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <span className="text-3xl">🔍</span>
                      </motion.div>
                      <motion.span
                        className="px-8 py-3 rounded-full font-bold uppercase tracking-wider text-sm inline-block"
                        style={{
                          border: `2px solid ${NEON.gold}`,
                          color: NEON.gold,
                          boxShadow: `0 0 30px ${NEON.gold}40`,
                        }}
                      >
                        View Details
                      </motion.span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom decorative elements */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${NEON.cyan}, ${NEON.gold}, ${NEON.cyan}, transparent)`,
          boxShadow: `0 0 30px ${NEON.cyan}`,
        }}
      />

      {/* Floating orbs decoration */}
      <motion.div
        className="absolute bottom-20 left-10 w-4 h-4 rounded-full"
        style={{ background: NEON.purple, boxShadow: `0 0 20px ${NEON.purple}` }}
        animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-32 right-20 w-3 h-3 rounded-full"
        style={{ background: NEON.cyan, boxShadow: `0 0 15px ${NEON.cyan}` }}
        animate={{ y: [0, -15, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      />
      <motion.div
        className="absolute bottom-40 left-1/4 w-2 h-2 rounded-full"
        style={{ background: NEON.gold, boxShadow: `0 0 10px ${NEON.gold}` }}
        animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
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
