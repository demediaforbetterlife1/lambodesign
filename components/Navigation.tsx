'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { NAV_ITEMS, getNavScrollState, SPACE_COLORS } from '@/lib/constants';
import { staggerContainer, staggerItem } from '@/lib/animations';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollState, setScrollState] = useState({ isScrolled: false, isCompact: false, opacity: 0.3 });
  const pathname = usePathname();
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const newState = getNavScrollState(window.scrollY, 100);
      setScrollState(newState);
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  useEffect(() => {
    navRefs.current.forEach((el) => {
      if (!el) return;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(el, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)',
        });
      };

      el.addEventListener('mousemove', handleMouseMove);
      el.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        el.removeEventListener('mousemove', handleMouseMove);
        el.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      >
        <motion.nav 
          className="max-w-7xl mx-auto flex items-center justify-between rounded-full px-8 transition-all duration-500"
          animate={{
            backgroundColor: scrollState.isScrolled 
              ? 'rgba(0, 0, 0, 0.8)' 
              : 'rgba(0, 0, 0, 0.2)',
            paddingTop: scrollState.isCompact ? '12px' : '16px',
            paddingBottom: scrollState.isCompact ? '12px' : '16px',
          }}
          style={{
            backdropFilter: 'blur(20px)',
            border: `1px solid ${scrollState.isScrolled ? SPACE_COLORS.glowPurple + '40' : 'rgba(255, 255, 255, 0.1)'}`,
            boxShadow: scrollState.isScrolled 
              ? `0 0 40px ${SPACE_COLORS.glowPurple}30, inset 0 0 30px ${SPACE_COLORS.glowPurple}10` 
              : 'none'
          }}
        >
          {/* Logo */}
          <Link href="/" className="group">
            <motion.span 
              className="text-3xl font-black tracking-tighter"
              style={{
                background: `linear-gradient(135deg, ${SPACE_COLORS.starWhite}, ${SPACE_COLORS.starGold})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
              whileHover={{ scale: 1.05 }}
            >
              LAMBO
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <motion.ul
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="hidden md:flex items-center gap-10"
          >
            {NAV_ITEMS.map((item, index) => (
              <motion.li key={item.href} variants={staggerItem}>
                <Link
                  href={item.href}
                  ref={(el) => { navRefs.current[index] = el; }}
                  className="relative text-sm uppercase tracking-[0.2em] font-medium group"
                  style={{
                    color: pathname === item.href ? SPACE_COLORS.glowCyan : 'rgba(255,255,255,0.7)'
                  }}
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                    {item.label}
                  </span>
                  
                  {/* Animated underline */}
                  <motion.span 
                    className="absolute -bottom-1 left-0 right-0 h-[2px] origin-left"
                    style={{ 
                      background: `linear-gradient(90deg, ${SPACE_COLORS.glowPurple}, ${SPACE_COLORS.glowCyan})`,
                      boxShadow: `0 0 10px ${SPACE_COLORS.glowCyan}`
                    }}
                    initial={{ scaleX: pathname === item.href ? 1 : 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Glow dot */}
                  {pathname === item.href && (
                    <motion.span
                      className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ 
                        background: SPACE_COLORS.glowCyan,
                        boxShadow: `0 0 10px ${SPACE_COLORS.glowCyan}`
                      }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </Link>
              </motion.li>
            ))}
          </motion.ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center rounded-full"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: `1px solid ${SPACE_COLORS.glowPurple}40`
            }}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
              className="w-5 h-0.5 absolute"
              style={{ background: SPACE_COLORS.glowCyan }}
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-5 h-0.5 absolute"
              style={{ background: SPACE_COLORS.glowCyan }}
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
              className="w-5 h-0.5 absolute"
              style={{ background: SPACE_COLORS.glowCyan }}
            />
          </button>
        </motion.nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
              style={{ 
                background: `linear-gradient(135deg, ${SPACE_COLORS.voidBlack}f0, ${SPACE_COLORS.deepSpace}f0)`,
                backdropFilter: 'blur(30px)'
              }}
              onClick={() => setIsOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-4/5 p-8 pt-24"
              style={{
                background: `linear-gradient(135deg, ${SPACE_COLORS.deepSpace}, ${SPACE_COLORS.voidBlack})`,
                borderLeft: `1px solid ${SPACE_COLORS.glowPurple}40`
              }}
            >
              {/* Decorative glow line */}
              <div 
                className="absolute top-0 left-0 w-[2px] h-full"
                style={{
                  background: `linear-gradient(to bottom, ${SPACE_COLORS.glowPurple}, ${SPACE_COLORS.glowCyan}, ${SPACE_COLORS.glowPurple})`,
                  boxShadow: `0 0 20px ${SPACE_COLORS.glowPurple}`
                }}
              />
              
              <motion.ul
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="flex flex-col gap-8"
              >
                {NAV_ITEMS.map((item) => (
                  <motion.li key={item.href} variants={staggerItem}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-4xl font-bold tracking-wider block py-2 transition-all duration-300"
                      style={{
                        color: pathname === item.href ? SPACE_COLORS.glowCyan : 'rgba(255,255,255,0.6)',
                        textShadow: pathname === item.href ? `0 0 30px ${SPACE_COLORS.glowCyan}` : 'none'
                      }}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
