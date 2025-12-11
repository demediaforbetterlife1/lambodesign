'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const NEON = {
  purple: '#8b5cf6',
  cyan: '#0ea5e9',
  gold: '#D4AF37',
  pink: '#ec4899',
};

const CONTACT_INFO = [
  { label: 'Email', value: 'info@lamborghini.com', color: NEON.cyan },
  { label: 'Phone', value: '+39 051 6817611', color: NEON.gold },
  { label: 'Address', value: "Via Modena 12, Sant'Agata Bolognese, Italy", color: NEON.purple },
];

const SOCIAL_LINKS = [
  { name: 'Instagram', icon: '📸', color: NEON.pink },
  { name: 'Twitter', icon: '🐦', color: NEON.cyan },
  { name: 'YouTube', icon: '▶️', color: NEON.purple },
  { name: 'Facebook', icon: '👤', color: NEON.gold },
];

/**
 * Contact/Footer section with futuristic styling
 * Requirements: 6.4, 6.1, 6.2 - Contact info with glow effects
 */
export function ContactSection() {
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
      id="contact"
      className="relative min-h-screen py-32 px-6 overflow-hidden snap-start"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 50% 80%, ${NEON.cyan}20 0%, transparent 50%),
              linear-gradient(180deg, #000 0%, #0a1628 50%, #0d0618 100%)
            `,
          }}
        />

        {/* Upward glow effect */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[400px]"
          style={{
            background: `linear-gradient(to top, ${NEON.purple}20, transparent)`,
          }}
        />

        {/* Animated orbs */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[150px]"
          style={{
            background: `radial-gradient(circle, ${NEON.cyan}30 0%, transparent 70%)`,
            left: '20%',
            bottom: '10%',
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{
            background: `radial-gradient(circle, ${NEON.purple}30 0%, transparent 70%)`,
            right: '20%',
            bottom: '20%',
          }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
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
            background: `${NEON.cyan}20`,
            border: `2px solid ${NEON.cyan}60`,
            color: NEON.cyan,
            textShadow: `0 0 20px ${NEON.cyan}`,
            boxShadow: `0 0 40px ${NEON.cyan}30`,
          }}
        >
          Get in Touch
        </motion.span>

        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8">
          <span
            style={{
              background: `linear-gradient(135deg, #fff, ${NEON.cyan}, ${NEON.purple})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            CONTACT US
          </span>
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
                  className="flex items-center gap-4 p-6 rounded-2xl cursor-pointer transition-all duration-300"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{
                    x: 10,
                    borderColor: contact.color,
                    boxShadow: `0 0 30px ${contact.color}40`,
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold"
                    style={{
                      background: `${contact.color}20`,
                      boxShadow: `0 0 20px ${contact.color}40`,
                      color: contact.color,
                      textShadow: `0 0 10px ${contact.color}`,
                    }}
                  >
                    {contact.label[0]}
                  </div>
                  <div>
                    <div className="text-white/50 text-sm">{contact.label}</div>
                    <div className="text-white font-medium text-lg">{contact.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-12">
              <h3
                className="text-xl font-bold mb-6"
                style={{ color: NEON.gold, textShadow: `0 0 20px ${NEON.gold}` }}
              >
                Follow Us
              </h3>
              <div className="flex gap-4">
                {SOCIAL_LINKS.map((social, index) => (
                  <motion.button
                    key={social.name}
                    className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${social.color}40`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    whileHover={{
                      scale: 1.1,
                      borderColor: social.color,
                      boxShadow: `0 0 30px ${social.color}50`,
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
              className="mt-12 px-12 py-5 rounded-full font-bold uppercase tracking-widest text-black"
              style={{
                background: `linear-gradient(135deg, ${NEON.gold}, #B8860B)`,
                boxShadow: `0 0 50px ${NEON.gold}60`,
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{
                scale: 1.05,
                boxShadow: `0 0 80px ${NEON.gold}80`,
              }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </motion.div>

          {/* Image Card */}
          <motion.div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              border: `2px solid ${NEON.cyan}30`,
            }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{
              borderColor: NEON.cyan,
              boxShadow: `0 0 60px ${NEON.cyan}40`,
            }}
          >
            <div className="relative aspect-[4/3]">
              <Image
                src="/walkinglabo.png"
                alt="Lamborghini Showroom"
                fill
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 50%)`,
                }}
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3
                className="text-2xl font-bold"
                style={{
                  color: '#fff',
                  textShadow: `0 0 20px ${NEON.cyan}`,
                }}
              >
                Visit Our Showroom
              </h3>
              <p className="text-white/70 mt-2">
                Experience Lamborghini in person at our headquarters in Italy.
              </p>
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
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Cookie Settings</span>
          </div>
        </div>
      </motion.div>

      {/* Bottom neon line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[4px]"
        style={{
          background: `linear-gradient(90deg, ${NEON.purple}, ${NEON.cyan}, ${NEON.gold}, ${NEON.cyan}, ${NEON.purple})`,
          boxShadow: `0 0 40px ${NEON.cyan}, 0 0 80px ${NEON.purple}`,
        }}
        animate={{
          opacity: [0.7, 1, 0.7],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </section>
  );
}

export default ContactSection;
