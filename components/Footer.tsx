'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SPACE_COLORS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: SPACE_COLORS.voidBlack }}>
      {/* Animated top glow line */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${SPACE_COLORS.glowPurple}, ${SPACE_COLORS.glowCyan}, ${SPACE_COLORS.glowPurple}, transparent)`,
          boxShadow: `0 0 30px ${SPACE_COLORS.glowPurple}, 0 0 60px ${SPACE_COLORS.glowCyan}`
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      {/* Gradient glow spreading upward */}
      <div 
        className="absolute top-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, ${SPACE_COLORS.glowPurple}20, transparent)`
        }}
      />
      
      {/* Central glow orb */}
      <motion.div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center top, ${SPACE_COLORS.glowPurple}30 0%, transparent 70%)`
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block">
              <motion.span 
                className="text-5xl font-black tracking-tighter"
                style={{
                  background: `linear-gradient(135deg, ${SPACE_COLORS.starWhite}, ${SPACE_COLORS.starGold})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: `0 0 40px ${SPACE_COLORS.glowPurple}`
                }}
                whileHover={{ scale: 1.05 }}
              >
                LAMBO
              </motion.span>
            </Link>
            <p className="mt-6 text-white/50 max-w-md text-lg leading-relaxed">
              Experience the pinnacle of Italian automotive excellence. 
              Where innovation meets passion, and dreams become reality.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4 mt-8">
              {['IG', 'TW', 'YT', 'FB'].map((social, index) => (
                <motion.a
                  key={social}
                  href="#"
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: `1px solid ${SPACE_COLORS.glowPurple}40`,
                    color: SPACE_COLORS.starWhite
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    boxShadow: `0 0 30px ${SPACE_COLORS.glowCyan}`,
                    borderColor: SPACE_COLORS.glowCyan
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 
              className="text-sm uppercase tracking-[0.3em] mb-6 font-bold"
              style={{ color: SPACE_COLORS.glowCyan }}
            >
              Explore
            </h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', href: '/' },
                { name: 'Gallery', href: '/gallery' },
                { name: 'About', href: '/about' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <motion.span
                      className="text-white/60 hover:text-white transition-colors inline-block"
                      whileHover={{ x: 10, color: SPACE_COLORS.starWhite }}
                    >
                      {item.name}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 
              className="text-sm uppercase tracking-[0.3em] mb-6 font-bold"
              style={{ color: SPACE_COLORS.glowPurple }}
            >
              Contact
            </h4>
            <ul className="space-y-4 text-white/60">
              <li>info@lamborghini.com</li>
              <li>+39 051 6817611</li>
              <li>Sant&apos;Agata Bolognese, Italy</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: `1px solid ${SPACE_COLORS.glowPurple}20` }}
        >
          <p className="text-white/30 text-sm">
            © 2024 Lamborghini. All rights reserved.
          </p>
          <p className="text-white/30 text-sm">
            Crafted with 
            <span style={{ color: SPACE_COLORS.glowPurple }}> ♥ </span>
            for automotive excellence
          </p>
        </div>
      </div>
    </footer>
  );
}
