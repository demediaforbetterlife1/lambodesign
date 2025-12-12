'use client';

import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const NEON = {
  purple: '#8b5cf6',
  cyan: '#0ea5e9',
  gold: '#D4AF37',
  pink: '#ec4899',
  green: '#10b981',
};

const CONTACT_INFO = [
  { label: 'Email', value: 'info@lamborghini.com', color: NEON.cyan, icon: '📧' },
  { label: 'Phone', value: '+39 051 6817611', color: NEON.gold, icon: '📞' },
  { label: 'Address', value: "Via Modena 12, Sant'Agata Bolognese, Italy", color: NEON.purple, icon: '📍' },
];

const SOCIAL_LINKS = [
  { name: 'Instagram', icon: '📸', color: NEON.pink },
  { name: 'Twitter', icon: '🐦', color: NEON.cyan },
  { name: 'YouTube', icon: '▶️', color: NEON.purple },
  { name: 'Facebook', icon: '👤', color: NEON.gold },
];

/**
 * Contact section with space background, stars, and neon planets
 */
export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  // Pre-generate stars
  const stars = useMemo(() => 
    Array.from({ length: 45 }, (_, i) => ({
      id: i,
      size: 1 + Math.random() * 2,
      color: ['#fff', NEON.cyan, NEON.purple, NEON.pink][i % 4],
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 2,
    })), []
  );

  // Planets for this section
  const planets = useMemo(() => [
    { size: 90, color: NEON.cyan, left: '5%', bottom: '15%', glow: 45, duration: 20 },
    { size: 60, color: NEON.pink, right: '10%', top: '20%', glow: 30, duration: 16 },
    { size: 45, color: NEON.gold, left: '20%', top: '15%', glow: 22, duration: 24 },
  ], []);


  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen py-32 px-6 overflow-hidden snap-start"
    >
      {/* Deep Space Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 50% 80%, ${NEON.cyan}15 0%, transparent 50%),
              radial-gradient(ellipse at 20% 30%, ${NEON.pink}10 0%, transparent 50%),
              linear-gradient(180deg, #000 0%, #030308 20%, #0a1628 50%, #0d0618 80%, #000 100%)
            `,
          }}
        />

        {/* Animated Stars */}
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
              boxShadow: `0 0 ${star.size * 3}px ${star.color}`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}

        {/* Neon Animated Planets */}
        {planets.map((planet, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: planet.size,
              height: planet.size,
              background: `radial-gradient(circle at 30% 30%, ${planet.color}60, ${planet.color}20 50%, transparent 70%)`,
              boxShadow: `
                0 0 ${planet.glow}px ${planet.color}80,
                0 0 ${planet.glow * 2}px ${planet.color}40,
                inset 0 0 ${planet.glow / 2}px ${planet.color}60
              `,
              left: planet.left,
              right: planet.right,
              top: planet.top,
              bottom: planet.bottom,
            }}
            animate={{
              y: [0, -15, 0],
              scale: [1, 1.06, 1],
              boxShadow: [
                `0 0 ${planet.glow}px ${planet.color}80, 0 0 ${planet.glow * 2}px ${planet.color}40`,
                `0 0 ${planet.glow * 1.5}px ${planet.color}95, 0 0 ${planet.glow * 3}px ${planet.color}60`,
                `0 0 ${planet.glow}px ${planet.color}80, 0 0 ${planet.glow * 2}px ${planet.color}40`,
              ],
            }}
            transition={{ duration: planet.duration, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* Nebula clouds */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full animate-pulse-slow"
          style={{
            background: `radial-gradient(circle, ${NEON.cyan}18 0%, transparent 70%)`,
            filter: 'blur(100px)',
            left: '20%',
            bottom: '10%',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full animate-pulse-slow"
          style={{
            background: `radial-gradient(circle, ${NEON.purple}15 0%, transparent 70%)`,
            filter: 'blur(80px)',
            right: '15%',
            top: '20%',
            animationDelay: '4s',
          }}
        />

        {/* Upward glow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[500px]"
          style={{
            background: `linear-gradient(to top, ${NEON.purple}15, transparent)`,
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
            background: `linear-gradient(135deg, ${NEON.cyan}30, ${NEON.pink}20)`,
            border: `2px solid ${NEON.cyan}60`,
            color: NEON.cyan,
            textShadow: `0 0 20px ${NEON.cyan}`,
            boxShadow: `0 0 40px ${NEON.cyan}30`,
          }}
          whileHover={{ scale: 1.05, boxShadow: `0 0 60px ${NEON.cyan}50` }}
        >
          Get in Touch
        </motion.span>

        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8">
          <motion.span
            style={{
              background: `linear-gradient(135deg, #fff, ${NEON.cyan}, ${NEON.purple})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: `drop-shadow(0 0 30px ${NEON.cyan}60)`,
            }}
            animate={{
              filter: [
                `drop-shadow(0 0 30px ${NEON.cyan}60)`,
                `drop-shadow(0 0 50px ${NEON.pink}80)`,
                `drop-shadow(0 0 30px ${NEON.cyan}60)`,
              ],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            CONTACT US
          </motion.span>
        </h2>

        <p className="text-xl text-white/60 max-w-2xl mx-auto">
          Interested in experiencing the Lamborghini lifestyle? Our team is ready
          to assist you on your journey.
        </p>
      </motion.div>

      {/* Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              {CONTACT_INFO.map((contact, index) => (
                <motion.div
                  key={contact.label}
                  className="flex items-center gap-4 p-6 rounded-2xl cursor-pointer group"
                  style={{
                    background: 'rgba(5, 5, 20, 0.7)',
                    backdropFilter: 'blur(20px)',
                    border: `2px solid ${contact.color}30`,
                  }}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{
                    x: 10,
                    borderColor: contact.color,
                    boxShadow: `0 0 40px ${contact.color}40, inset 0 0 30px ${contact.color}10`,
                  }}
                >
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                    style={{
                      background: `${contact.color}20`,
                      boxShadow: `0 0 25px ${contact.color}40`,
                    }}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    {contact.icon}
                  </motion.div>
                  <div>
                    <div className="text-white/50 text-sm uppercase tracking-wider">{contact.label}</div>
                    <div className="text-white font-medium text-lg" style={{ textShadow: `0 0 10px ${contact.color}30` }}>
                      {contact.value}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>


            {/* Social Links */}
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-6" style={{ color: NEON.gold, textShadow: `0 0 25px ${NEON.gold}` }}>
                Follow Us
              </h3>
              <div className="flex gap-4">
                {SOCIAL_LINKS.map((social, index) => (
                  <motion.button
                    key={social.name}
                    className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                    style={{
                      background: 'rgba(5, 5, 20, 0.7)',
                      border: `2px solid ${social.color}40`,
                      boxShadow: `0 0 20px ${social.color}20`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    whileHover={{
                      scale: 1.15,
                      borderColor: social.color,
                      boxShadow: `0 0 40px ${social.color}60`,
                      rotate: 10,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <motion.button
              className="mt-12 px-12 py-5 rounded-full font-bold uppercase tracking-widest text-black relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${NEON.gold}, #B8860B)`,
                boxShadow: `0 0 50px ${NEON.gold}60`,
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ scale: 1.05, boxShadow: `0 0 80px ${NEON.gold}80` }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
              <span className="relative z-10">Send Message</span>
            </motion.button>
          </motion.div>

          {/* Image Card */}
          <motion.div
            className="relative rounded-3xl overflow-hidden group"
            style={{
              background: 'rgba(5, 5, 20, 0.6)',
              border: `2px solid ${NEON.cyan}30`,
            }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{
              borderColor: NEON.cyan,
              boxShadow: `0 0 60px ${NEON.cyan}40, inset 0 0 40px ${NEON.cyan}10`,
            }}
          >
            <div className="relative aspect-[4/3]">
              <Image src="/walkinglabo.png" alt="Lamborghini Showroom" fill className="object-cover" unoptimized />
              <motion.div
                className="absolute inset-0"
                style={{ background: `radial-gradient(circle at center, ${NEON.cyan}20 0%, transparent 70%)` }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 50%)` }} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3 className="text-2xl font-bold" style={{ color: '#fff', textShadow: `0 0 25px ${NEON.cyan}` }}>
                Visit Our Showroom
              </h3>
              <p className="text-white/70 mt-2">Experience Lamborghini in person at our headquarters in Italy.</p>
            </div>
          </motion.div>
        </div>
      </div>


      {/* Footer */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto mt-32 pt-12 border-t border-white/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white/40 text-sm">
            © 2024 Automobili Lamborghini S.p.A. All rights reserved.
          </div>
          <div className="flex gap-8 text-white/40 text-sm">
            <motion.span className="cursor-pointer" whileHover={{ color: NEON.cyan }}>Privacy Policy</motion.span>
            <motion.span className="cursor-pointer" whileHover={{ color: NEON.gold }}>Terms of Service</motion.span>
            <motion.span className="cursor-pointer" whileHover={{ color: NEON.purple }}>Cookie Settings</motion.span>
          </div>
        </div>
      </motion.div>

      {/* Bottom neon line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[4px]"
        style={{
          background: `linear-gradient(90deg, ${NEON.purple}, ${NEON.cyan}, ${NEON.gold}, ${NEON.pink}, ${NEON.cyan}, ${NEON.purple})`,
          boxShadow: `0 0 40px ${NEON.cyan}, 0 0 80px ${NEON.purple}`,
        }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </section>
  );
}

export default ContactSection;
