'use client';

import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const NEON = {
  purple: '#8b5cf6',
  cyan: '#0ea5e9',
  gold: '#D4AF37',
  pink: '#ec4899',
  green: '#10b981',
};

const TIMELINE_ITEMS = [
  { year: '1963', title: 'The Beginning', description: 'Ferruccio Lamborghini founded Automobili Lamborghini in Sant\'Agata Bolognese, Italy.', color: NEON.gold },
  { year: '1966', title: 'The Miura', description: 'The revolutionary Miura set the template for all future supercars with its mid-engine layout.', color: NEON.cyan },
  { year: '1974', title: 'Countach Era', description: 'The iconic Countach defined the supercar aesthetic for generations to come.', color: NEON.purple },
  { year: '2011', title: 'Aventador Launch', description: 'The Aventador continued the V12 legacy with groundbreaking technology.', color: NEON.pink },
  { year: '2023', title: 'Revuelto', description: 'The first HPEV (High Performance Electrified Vehicle) marks a new era.', color: NEON.green },
];

const VALUES = [
  { icon: '⚡', title: 'Innovation', description: 'Pushing the boundaries of automotive technology with every new model.', color: NEON.cyan },
  { icon: '✨', title: 'Craftsmanship', description: 'Every detail meticulously crafted by skilled Italian artisans.', color: NEON.gold },
  { icon: '🏎️', title: 'Performance', description: 'Uncompromising power and precision in every driving experience.', color: NEON.purple },
];

/**
 * Legacy section with space background, stars, and neon planets
 */
export function LegacySection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  // Pre-generate stars - REDUCED for performance (15 instead of 50)
  const stars = useMemo(() => 
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: 1 + (i % 3),
      color: ['#fff', NEON.cyan, NEON.purple, NEON.gold][i % 4],
      left: `${(i * 7) % 100}%`,
      top: `${(i * 6) % 100}%`,
    })), []
  );

  // Static planets - no animation for performance
  const planets = useMemo(() => [
    { size: 100, color: NEON.gold, right: '5%', top: '10%', glow: 50 },
    { size: 70, color: NEON.purple, left: '8%', top: '30%', glow: 35 },
    { size: 50, color: NEON.cyan, right: '15%', bottom: '25%', glow: 25 },
  ], []);


  return (
    <section
      ref={sectionRef}
      id="legacy"
      className="relative min-h-screen py-32 px-6 overflow-hidden snap-start"
    >
      {/* Deep Space Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 30% 20%, ${NEON.purple}12 0%, transparent 50%),
              radial-gradient(ellipse at 70% 70%, ${NEON.gold}10 0%, transparent 50%),
              linear-gradient(180deg, #000 0%, #030308 20%, #0d0618 50%, #030308 80%, #000 100%)
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
          />
        ))}

        {/* Static Nebula clouds - no animation */}
        <div
          className="absolute w-[700px] h-[700px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${NEON.purple}18 0%, transparent 70%)`,
            filter: 'blur(100px)',
            left: '50%',
            top: '30%',
            transform: 'translate(-50%, -50%)',
            opacity: 0.5,
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${NEON.gold}12 0%, transparent 70%)`,
            filter: 'blur(80px)',
            right: '-10%',
            bottom: '10%',
            opacity: 0.5,
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
            background: `linear-gradient(135deg, ${NEON.gold}30, ${NEON.purple}20)`,
            border: `2px solid ${NEON.gold}60`,
            color: NEON.gold,
            textShadow: `0 0 20px ${NEON.gold}`,
            boxShadow: `0 0 40px ${NEON.gold}30`,
          }}
          whileHover={{ scale: 1.05, boxShadow: `0 0 60px ${NEON.gold}50` }}
        >
          Since 1963
        </motion.span>

        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8">
          <span
            style={{
              background: `linear-gradient(135deg, #fff, ${NEON.purple}, ${NEON.cyan})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: `drop-shadow(0 0 30px ${NEON.purple}60)`,
            }}
          >
            OUR LEGACY
          </span>
        </h2>

        <p className="text-xl text-white/60 max-w-2xl mx-auto">
          Six decades of pushing boundaries, breaking records, and creating
          automotive masterpieces that define the supercar experience.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative z-10 max-w-4xl mx-auto mb-32">
        {/* Timeline line */}
        <motion.div
          className="absolute left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2"
          style={{
            background: `linear-gradient(to bottom, transparent, ${NEON.purple}, ${NEON.cyan}, ${NEON.gold}, ${NEON.pink}, ${NEON.green}, transparent)`,
            boxShadow: `0 0 20px ${NEON.purple}50`,
          }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        />

        {TIMELINE_ITEMS.map((item, index) => (
          <motion.div
            key={item.year}
            className={`relative flex items-center gap-8 mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
          >
            {/* Content card */}
            <motion.div
              className={`flex-1 p-6 rounded-2xl ${index % 2 === 0 ? 'text-right' : 'text-left'}`}
              style={{
                background: 'rgba(5, 5, 20, 0.7)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${item.color}40`,
                boxShadow: `0 0 30px ${item.color}15`,
              }}
              whileHover={{
                borderColor: item.color,
                boxShadow: `0 0 50px ${item.color}40, inset 0 0 30px ${item.color}10`,
              }}
            >
              <span
                className="text-4xl font-black"
                style={{ color: item.color, textShadow: `0 0 25px ${item.color}` }}
              >
                {item.year}
              </span>
              <h3 className="text-2xl font-bold mt-2 text-white">{item.title}</h3>
              <p className="text-white/60 mt-2">{item.description}</p>
            </motion.div>

            {/* Center dot */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full z-10"
              style={{
                background: item.color,
                boxShadow: `0 0 25px ${item.color}, 0 0 50px ${item.color}50`,
              }}
              whileInView={{ scale: [0, 1.5, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            />

            <div className="flex-1" />
          </motion.div>
        ))}
      </div>


      {/* Values Section */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h3
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ color: NEON.cyan, textShadow: `0 0 40px ${NEON.cyan}` }}
        >
          What Drives Us
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VALUES.map((value, index) => (
            <motion.div
              key={value.title}
              className="relative p-8 rounded-3xl overflow-hidden group"
              style={{
                background: 'rgba(5, 5, 20, 0.7)',
                backdropFilter: 'blur(20px)',
                border: `2px solid ${value.color}30`,
              }}
              initial={{ opacity: 0, y: 60, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              whileHover={{
                borderColor: value.color,
                boxShadow: `0 0 60px ${value.color}40, inset 0 0 40px ${value.color}10`,
                y: -10,
              }}
            >
              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${value.color}20 0%, transparent 70%)`,
                }}
              />

              <motion.div
                className="text-6xl mb-6"
                style={{ filter: `drop-shadow(0 0 20px ${value.color})` }}
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                {value.icon}
              </motion.div>

              <h4
                className="text-2xl font-bold mb-4 relative z-10"
                style={{ color: value.color, textShadow: `0 0 20px ${value.color}` }}
              >
                {value.title}
              </h4>

              <p className="text-white/60 relative z-10">{value.description}</p>

              {/* Bottom accent line */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[3px]"
                style={{ background: value.color, boxShadow: `0 0 20px ${value.color}` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom neon line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${NEON.gold}, ${NEON.purple}, ${NEON.gold}, transparent)`,
          boxShadow: `0 0 30px ${NEON.gold}`,
        }}
      />
    </section>
  );
}

export default LegacySection;
