'use client';

import { useState, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { FEATURED_LAMBOS, VehicleData } from '@/lib/constants';

const NEON = {
  purple: '#8b5cf6',
  cyan: '#0ea5e9',
  gold: '#D4AF37',
  pink: '#ec4899',
};

export interface VehicleShowcaseSectionProps {
  vehicles?: VehicleData[];
  onVehicleSelect?: (vehicle: VehicleData) => void;
}

/**
 * Vehicle showcase section - PERFORMANCE OPTIMIZED
 */
export function VehicleShowcaseSection({
  vehicles = FEATURED_LAMBOS,
  onVehicleSelect,
}: VehicleShowcaseSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [80, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const cardColors = [NEON.purple, NEON.cyan, NEON.gold];

  // Reduced stars count for better performance (20 instead of 60)
  const stars = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: 1 + (i % 3),
      color: ['#fff', NEON.cyan, NEON.purple, NEON.gold][i % 4],
      left: `${(i * 5) % 100}%`,
      top: `${(i * 7) % 100}%`,
    })), []
  );

  // Static planets - no animation for performance
  const planets = useMemo(() => [
    { size: 120, color: NEON.purple, left: '5%', top: '15%', glow: 60 },
    { size: 80, color: NEON.cyan, right: '8%', top: '25%', glow: 40 },
    { size: 60, color: NEON.pink, left: '15%', bottom: '20%', glow: 30 },
    { size: 40, color: NEON.gold, right: '20%', bottom: '30%', glow: 20 },
  ], []);


  return (
    <section
      ref={sectionRef}
      id="vehicles"
      className="relative min-h-screen py-32 px-6 overflow-hidden snap-start"
    >
      {/* Deep Space Background - OPTIMIZED */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 20% 20%, ${NEON.purple}15 0%, transparent 50%),
              radial-gradient(ellipse at 80% 80%, ${NEON.cyan}12 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, ${NEON.gold}08 0%, transparent 60%),
              linear-gradient(180deg, #000 0%, #030308 20%, #050510 50%, #030308 80%, #000 100%)
            `,
          }}
        />

        {/* Static Stars - no animation for performance */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full"
            style={{
              width: star.size,
              height: star.size,
              background: star.color,
              left: star.left,
              top: star.top,
              boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
              opacity: 0.7,
            }}
          />
        ))}

        {/* Static Planets - no animation for performance */}
        {planets.map((planet, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: planet.size,
              height: planet.size,
              background: `radial-gradient(circle at 30% 30%, ${planet.color}60, ${planet.color}20 50%, transparent 70%)`,
              boxShadow: `0 0 ${planet.glow}px ${planet.color}80, 0 0 ${planet.glow * 2}px ${planet.color}40`,
              left: planet.left,
              right: planet.right,
              top: planet.top,
              bottom: planet.bottom,
            }}
          >
            {/* Planet ring */}
            {i === 0 && (
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
                style={{
                  width: planet.size * 1.6,
                  height: planet.size * 0.4,
                  borderColor: `${planet.color}40`,
                  transform: 'translate(-50%, -50%) rotateX(70deg)',
                  boxShadow: `0 0 20px ${planet.color}30`,
                }}
              />
            )}
          </div>
        ))}

        {/* Static Nebula clouds - no animation */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${NEON.purple}20 0%, transparent 70%)`,
            filter: 'blur(100px)',
            left: '-20%',
            top: '10%',
            opacity: 0.5,
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${NEON.cyan}15 0%, transparent 70%)`,
            filter: 'blur(80px)',
            right: '-15%',
            bottom: '20%',
            opacity: 0.5,
          }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(${NEON.cyan}30 1px, transparent 1px),
              linear-gradient(90deg, ${NEON.cyan}30 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>


      {/* Header - OPTIMIZED */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto text-center mb-20"
        style={{ y: headerY, opacity: headerOpacity }}
      >
        <span
          className="inline-block px-8 py-3 rounded-full text-sm uppercase tracking-[0.4em] font-semibold mb-8"
          style={{
            background: `linear-gradient(135deg, ${NEON.purple}30, ${NEON.cyan}20)`,
            border: `2px solid ${NEON.purple}60`,
            color: NEON.purple,
            textShadow: `0 0 20px ${NEON.purple}`,
            boxShadow: `0 0 40px ${NEON.purple}30, inset 0 0 20px ${NEON.purple}10`,
          }}
        >
          ✦ The Collection ✦
        </span>

        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8">
          <span className="block text-white" style={{ textShadow: `0 0 40px ${NEON.cyan}30` }}>
            CHOOSE YOUR
          </span>
          <span
            className="block mt-2"
            style={{
              background: `linear-gradient(135deg, ${NEON.gold}, #fff, ${NEON.gold})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: `drop-shadow(0 0 30px ${NEON.gold}60)`,
            }}
          >
            LEGEND
          </span>
        </h2>

        <p className="text-xl text-white/60 max-w-2xl mx-auto">
          Select a legendary supercar to explore its specifications
        </p>
      </motion.div>

      {/* Decorative neon line - static */}
      <div
        className="absolute top-[30%] left-0 right-0 h-[2px] z-0"
        style={{
          background: `linear-gradient(90deg, transparent, ${NEON.purple}, ${NEON.cyan}, ${NEON.gold}, ${NEON.cyan}, ${NEON.purple}, transparent)`,
          boxShadow: `0 0 30px ${NEON.purple}`,
        }}
      />


      {/* Vehicle Cards Grid - OPTIMIZED */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {vehicles.slice(0, 3).map((vehicle, index) => {
            const cardColor = cardColors[index];
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={vehicle.id}
                className="relative cursor-pointer group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => onVehicleSelect?.(vehicle)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Card glow - simplified */}
                <div
                  className="absolute -inset-4 rounded-[2rem] blur-2xl transition-opacity duration-300"
                  style={{ 
                    background: cardColor,
                    opacity: isHovered ? 0.4 : 0,
                  }}
                />

                {/* Main card */}
                <div
                  className="relative rounded-3xl overflow-hidden transition-all duration-300"
                  style={{
                    background: 'rgba(5, 5, 20, 0.8)',
                    backdropFilter: 'blur(20px)',
                    border: `2px solid ${isHovered ? cardColor : cardColor + '40'}`,
                    boxShadow: isHovered
                      ? `0 0 40px ${cardColor}40, 0 20px 40px rgba(0,0,0,0.4)`
                      : `0 0 20px ${cardColor}20`,
                    transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                  }}
                >
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-16 h-16 z-20 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-[3px]" style={{ background: cardColor, boxShadow: `0 0 15px ${cardColor}` }} />
                    <div className="absolute top-0 left-0 h-full w-[3px]" style={{ background: cardColor, boxShadow: `0 0 15px ${cardColor}` }} />
                  </div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 z-20 pointer-events-none">
                    <div className="absolute bottom-0 right-0 w-full h-[3px]" style={{ background: cardColor, boxShadow: `0 0 15px ${cardColor}` }} />
                    <div className="absolute bottom-0 right-0 h-full w-[3px]" style={{ background: cardColor, boxShadow: `0 0 15px ${cardColor}` }} />
                  </div>

                  {/* Image section */}
                  <div className="relative h-72 overflow-hidden">
                    <div
                      className="absolute inset-0 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(ellipse at center, ${cardColor}40 0%, transparent 70%)`,
                        opacity: isHovered ? 0.8 : 0.3,
                      }}
                    />
                    <div
                      className="relative w-full h-full transition-transform duration-300"
                      style={{
                        transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                      }}
                    >
                      <Image src={vehicle.src} alt={vehicle.alt} fill className="object-contain p-6" unoptimized />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <span
                      className="text-xs uppercase tracking-[0.3em] mb-3 block font-semibold"
                      style={{ color: cardColor, textShadow: `0 0 15px ${cardColor}` }}
                    >
                      {vehicle.specs.engine}
                    </span>
                    <h3 className="text-3xl font-black mb-3 text-white" style={{ textShadow: `0 0 30px ${cardColor}40` }}>
                      {vehicle.title}
                    </h3>
                    <p className="text-white/50 text-sm mb-6 line-clamp-2">{vehicle.tagline}</p>

                    {/* Stats row */}
                    <div className="flex gap-6 pt-4 border-t border-white/10">
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: NEON.purple, textShadow: `0 0 15px ${NEON.purple}` }}>
                          {vehicle.specs.horsepower}
                        </div>
                        <div className="text-xs text-white/40 uppercase tracking-wider">HP</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: NEON.cyan, textShadow: `0 0 15px ${NEON.cyan}` }}>
                          {vehicle.specs.acceleration}s
                        </div>
                        <div className="text-xs text-white/40 uppercase tracking-wider">0-100</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: NEON.gold, textShadow: `0 0 15px ${NEON.gold}` }}>
                          ${(vehicle.specs.price / 1000).toFixed(0)}K
                        </div>
                        <div className="text-xs text-white/40 uppercase tracking-wider">Price</div>
                      </div>
                    </div>
                  </div>

                  {/* Hover overlay - click-through enabled */}
                  <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300"
                    style={{ 
                      background: 'rgba(0, 0, 0, 0.85)',
                      opacity: isHovered ? 1 : 0,
                    }}
                  >
                    <div className="text-center">
                      <div
                        className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
                        style={{ border: `2px solid ${cardColor}`, boxShadow: `0 0 30px ${cardColor}50` }}
                      >
                        <span className="text-3xl">🔍</span>
                      </div>
                      <span
                        className="px-8 py-3 rounded-full font-bold uppercase tracking-wider text-sm inline-block"
                        style={{ border: `2px solid ${NEON.gold}`, color: NEON.gold, boxShadow: `0 0 30px ${NEON.gold}40` }}
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

      {/* Bottom neon line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${NEON.cyan}, ${NEON.gold}, ${NEON.cyan}, transparent)`,
          boxShadow: `0 0 30px ${NEON.cyan}`,
        }}
      />
    </section>
  );
}

export default VehicleShowcaseSection;
