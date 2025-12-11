'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const NEON = {
  purple: '#8b5cf6',
  cyan: '#0ea5e9',
  gold: '#D4AF37',
  pink: '#ec4899',
};

const TIMELINE_ITEMS = [
  {
    year: '1963',
    title: 'The Beginning',
    description: 'Ferruccio Lamborghini founded Automobili Lamborghini in Sant\'Agata Bolognese, Italy.',
  },
  {
    year: '1966',
    title: 'The Miura',
    description: 'The revolutionary Miura set the template for all future supercars with its mid-engine layout.',
  },
  {
    year: '1974',
    title: 'Countach Era',
    description: 'The iconic Countach defined the supercar aesthetic for generations to come.',
  },
  {
    year: '2011',
    title: 'Aventador Launch',
    description: 'The Aventador continued the V12 legacy with groundbreaking technology.',
  },
  {
    year: '2023',
    title: 'Revuelto',
    description: 'The first HPEV (High Performance Electrified Vehicle) marks a new era.',
  },
];

const VALUES = [
  {
    icon: '⚡',
    title: 'Innovation',
    description: 'Pushing the boundaries of automotive technology with every new model.',
    color: NEON.cyan,
  },
  {
    icon: '✨',
    title: 'Craftsmanship',
    description: 'Every detail meticulously crafted by skilled Italian artisans.',
    color: NEON.gold,
  },
  {
    icon: '🏎️',
    title: 'Performance',
    description: 'Uncompromising power and precision in every driving experience.',
    color: NEON.purple,
  },
];

/**
 * Legacy/About section with timeline and value cards
 * Requirements: 4.1, 4.2, 4.3, 4.4 - Scroll-driven storytelling
 */
export function LegacySection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="legacy"
      className="relative min-h-screen py-32 px-6 overflow-hidden snap-start"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 50% 30%, ${NEON.purple}20 0%, transparent 50%),
              linear-gradient(180deg, #0d0618 0%, #000 50%, #0a1628 100%)
            `,
          }}
        />
        
        {/* Nebula accent */}
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full blur-[150px]"
          style={{
            background: `radial-gradient(circle, ${NEON.purple}30 0%, transparent 70%)`,
            left: '50%',
            top: '30%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
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
            background: `${NEON.gold}20`,
            border: `2px solid ${NEON.gold}60`,
            color: NEON.gold,
            textShadow: `0 0 20px ${NEON.gold}`,
            boxShadow: `0 0 40px ${NEON.gold}30`,
          }}
        >
          Since 1963
        </motion.span>

        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8">
          <span
            style={{
              background: `linear-gradient(135deg, #fff, ${NEON.purple}, ${NEON.cyan})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
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
        <div
          className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2"
          style={{
            background: `linear-gradient(to bottom, transparent, ${NEON.purple}, ${NEON.cyan}, ${NEON.gold}, transparent)`,
            boxShadow: `0 0 20px ${NEON.purple}50`,
          }}
        />

        {TIMELINE_ITEMS.map((item, index) => (
          <motion.div
            key={item.year}
            className={`relative flex items-center gap-8 mb-16 ${
              index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            }`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
          >
            {/* Content */}
            <div
              className={`flex-1 p-6 rounded-2xl ${
                index % 2 === 0 ? 'text-right' : 'text-left'
              }`}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <span
                className="text-4xl font-black"
                style={{
                  color: [NEON.purple, NEON.cyan, NEON.gold, NEON.pink, NEON.cyan][index % 5],
                  textShadow: `0 0 20px ${[NEON.purple, NEON.cyan, NEON.gold, NEON.pink, NEON.cyan][index % 5]}`,
                }}
              >
                {item.year}
              </span>
              <h3 className="text-2xl font-bold mt-2 text-white">{item.title}</h3>
              <p className="text-white/60 mt-2">{item.description}</p>
            </div>

            {/* Center dot */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10"
              style={{
                background: [NEON.purple, NEON.cyan, NEON.gold, NEON.pink, NEON.cyan][index % 5],
                boxShadow: `0 0 20px ${[NEON.purple, NEON.cyan, NEON.gold, NEON.pink, NEON.cyan][index % 5]}`,
              }}
              whileInView={{
                scale: [1, 1.5, 1],
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            />

            {/* Spacer */}
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
          style={{
            color: NEON.cyan,
            textShadow: `0 0 30px ${NEON.cyan}`,
          }}
        >
          What Drives Us
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VALUES.map((value, index) => (
            <motion.div
              key={value.title}
              className="relative p-8 rounded-3xl overflow-hidden group"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{
                borderColor: value.color,
                boxShadow: `0 0 40px ${value.color}40, inset 0 0 40px ${value.color}10`,
              }}
            >
              <div
                className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ filter: `drop-shadow(0 0 15px ${value.color})` }}
              >
                {value.icon}
              </div>
              <h4
                className="text-2xl font-bold mb-4"
                style={{ color: value.color, textShadow: `0 0 15px ${value.color}` }}
              >
                {value.title}
              </h4>
              <p className="text-white/60">{value.description}</p>

              {/* Accent line */}
              <motion.div
                className="absolute bottom-0 left-1/4 right-1/4 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: value.color,
                  boxShadow: `0 0 15px ${value.color}`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${NEON.gold}, ${NEON.purple}, ${NEON.gold}, transparent)`,
          boxShadow: `0 0 30px ${NEON.gold}`,
        }}
      />
    </section>
  );
}

export default LegacySection;
