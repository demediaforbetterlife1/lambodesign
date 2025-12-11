'use client';

import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState, useEffect, createContext, useContext } from 'react';
import Navigation from './Navigation';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { NEON_COLORS, TRANSITION_LAYERS, ANIMATION_CONFIG } from '@/lib/animationUtils';

const NEON = NEON_COLORS;

// Context for page transition state
const TransitionContext = createContext({ isTransitioning: false });
export const useTransition = () => useContext(TransitionContext);

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState<'idle' | 'exit' | 'enter'>('idle');
  const prefersReducedMotion = useReducedMotion();

  // Scroll progress for the progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: ANIMATION_CONFIG.spring.stiffness,
    damping: ANIMATION_CONFIG.spring.damping,
  });

  useEffect(() => {
    if (children !== displayChildren) {
      setTransitionStage('exit');
      setIsTransitioning(true);
    }
  }, [children, displayChildren]);

  // Page variants for smooth transitions
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 30,
      scale: 0.98,
      filter: 'blur(8px)',
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 1.02,
      filter: 'blur(8px)',
      transition: {
        duration: 0.5,
        ease:"easeInOut",
      },
    },
  };


  // Overlay animation variants
  const overlayVariants = {
    hidden: { scaleY: 0 },
    visible: { 
      scaleY: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    },
    exit: { 
      scaleY: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }
    }
  };

  const handleExitComplete = () => {
    if (transitionStage === 'exit') {
      setDisplayChildren(children);
      setTransitionStage('enter');
    } else if (transitionStage === 'enter') {
      setTransitionStage('idle');
      setIsTransitioning(false);
    }
  };

  // Reduced motion: simple transitions
  if (prefersReducedMotion) {
    return (
      <TransitionContext.Provider value={{ isTransitioning }}>
        <Navigation />
        <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {displayChildren}
          </motion.div>
        </AnimatePresence>
      </TransitionContext.Provider>
    );
  }

  return (
    <TransitionContext.Provider value={{ isTransitioning }}>
      <Navigation />
      
      {/* Scroll Progress Bar - Requirements 3.1 */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-[9999] origin-left"
        style={{
          scaleX,
          background: `linear-gradient(90deg, ${NEON.purple}, ${NEON.cyan}, ${NEON.gold})`,
          boxShadow: `0 0 20px ${NEON.cyan}, 0 0 40px ${NEON.purple}`,
        }}
      />
      
      {/* Transition Overlay - Stunning multi-layer wipe effect */}
      <AnimatePresence>
        {isTransitioning && (
          <>
            {/* First layer - Purple wipe from bottom */}
            <motion.div
              className="fixed inset-0 z-[100] origin-bottom"
              style={{ background: NEON.purple }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0, originY: 0 }}
              transition={{ duration: 0.4, ease: ANIMATION_CONFIG.ease.smooth }}
            />
            
            {/* Second layer - Cyan wipe with delay */}
            <motion.div
              className="fixed inset-0 z-[101] origin-bottom"
              style={{ background: NEON.cyan }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0, originY: 0 }}
              transition={{ duration: 0.4, ease: ANIMATION_CONFIG.ease.smooth, delay: 0.1 }}
            />
            
            {/* Third layer - Dark wipe */}
            <motion.div
              className="fixed inset-0 z-[102] origin-bottom bg-black"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0, originY: 0 }}
              transition={{ duration: 0.4, ease: ANIMATION_CONFIG.ease.smooth, delay: 0.2 }}
            />

            {/* Diagonal light sweep effect */}
            <motion.div
              className="fixed inset-0 z-[102] pointer-events-none"
              initial={{ opacity: 0, x: '-100%' }}
              animate={{ opacity: [0, 0.5, 0], x: '100%' }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeInOut' }}
              style={{
                background: `linear-gradient(90deg, transparent, ${NEON.gold}40, transparent)`,
                width: '50%',
              }}
            />

            {/* Center Logo with enhanced effects */}
            <motion.div
              className="fixed inset-0 z-[103] flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <motion.div
                className="relative"
                initial={{ scale: 0.5, opacity: 0, rotateY: -30 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{ scale: 1.5, opacity: 0, rotateY: 30 }}
                transition={{ duration: 0.5, ease: ANIMATION_CONFIG.ease.smooth }}
                style={{ perspective: '1000px' }}
              >
                {/* Glow backdrop */}
                <motion.div
                  className="absolute inset-0 -m-20 rounded-full"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: [0, 0.8, 0.6], scale: [0.5, 1.2, 1] }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  style={{
                    background: `radial-gradient(circle, ${NEON.gold}30 0%, transparent 70%)`,
                    filter: 'blur(40px)',
                  }}
                />
                
                <div 
                  className="text-7xl md:text-8xl font-black tracking-tighter relative"
                  style={{ 
                    color: NEON.gold,
                    textShadow: `0 0 30px ${NEON.gold}, 0 0 60px ${NEON.gold}, 0 0 100px ${NEON.gold}, 0 0 150px ${NEON.gold}40`
                  }}
                >
                  LAMBO
                </div>
                
                {/* Multiple animated rings */}
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: [0.8, 2.5], opacity: [0.8, 0] }}
                    transition={{ 
                      duration: 1.2, 
                      delay: 0.4 + i * 0.2,
                      ease: 'easeOut',
                    }}
                  >
                    <div 
                      className="w-40 h-40 rounded-full border-2"
                      style={{ 
                        borderColor: i === 1 ? NEON.cyan : NEON.gold,
                        boxShadow: `0 0 20px ${i === 1 ? NEON.cyan : NEON.gold}`,
                      }}
                    />
                  </motion.div>
                ))}

                {/* Particle burst effect */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background: i % 2 === 0 ? NEON.gold : NEON.cyan,
                      boxShadow: `0 0 10px ${i % 2 === 0 ? NEON.gold : NEON.cyan}`,
                      left: '50%',
                      top: '50%',
                    }}
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                    animate={{
                      x: Math.cos((i * Math.PI) / 4) * 150,
                      y: Math.sin((i * Math.PI) / 4) * 150,
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 0.8,
                      delay: 0.5,
                      ease: 'easeOut',
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* Neon accent lines during transition */}
            <motion.div
              className="fixed top-0 left-1/4 w-[2px] h-full z-[104]"
              style={{ background: NEON.purple, boxShadow: `0 0 20px ${NEON.purple}, 0 0 40px ${NEON.purple}` }}
              initial={{ scaleY: 0, originY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0, originY: 1 }}
              transition={{ duration: 0.6, ease: ANIMATION_CONFIG.ease.smooth }}
            />
            <motion.div
              className="fixed top-0 right-1/4 w-[2px] h-full z-[104]"
              style={{ background: NEON.cyan, boxShadow: `0 0 20px ${NEON.cyan}, 0 0 40px ${NEON.cyan}` }}
              initial={{ scaleY: 0, originY: 1 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0, originY: 0 }}
              transition={{ duration: 0.6, ease: ANIMATION_CONFIG.ease.smooth, delay: 0.1 }}
            />
            
            {/* Additional diagonal accent lines */}
            <motion.div
              className="fixed top-0 left-0 w-[1px] h-[200%] z-[104] rotate-45 origin-top-left"
              style={{ background: `linear-gradient(to bottom, ${NEON.gold}, transparent)` }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.8, ease: ANIMATION_CONFIG.ease.smooth, delay: 0.15 }}
            />
            <motion.div
              className="fixed top-0 right-0 w-[1px] h-[200%] z-[104] -rotate-45 origin-top-right"
              style={{ background: `linear-gradient(to bottom, ${NEON.pink}, transparent)` }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.8, ease: ANIMATION_CONFIG.ease.smooth, delay: 0.2 }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Page Content with Animation */}
      <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
        <motion.div
          key={pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {displayChildren}
        </motion.div>
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}
