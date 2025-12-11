'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollSectionProps {
  children: ReactNode;
  animation?: 'fade' | 'slide' | 'reveal' | 'parallax';
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  delay?: number;
}

const animationVariants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  slide: {
    up: { initial: { opacity: 0, y: 80 }, animate: { opacity: 1, y: 0 } },
    down: { initial: { opacity: 0, y: -80 }, animate: { opacity: 1, y: 0 } },
    left: { initial: { opacity: 0, x: 80 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: -80 }, animate: { opacity: 1, x: 0 } },
  },
  reveal: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
  },
  parallax: {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
  },
};

export default function ScrollSection({
  children,
  animation = 'fade',
  direction = 'up',
  className = '',
  delay = 0,
}: ScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const getVariants = () => {
    if (animation === 'slide') {
      return animationVariants.slide[direction];
    }
    return animationVariants[animation];
  };

  const variants = getVariants();

  return (
    <motion.div
      ref={ref}
      initial={variants.initial}
      animate={isInView ? variants.animate : variants.initial}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Horizontal scroll gallery component
interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
}

export function HorizontalScroll({ children, className = '' }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;

    const scrollWidth = scrollRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;

    const tween = gsap.to(scrollRef.current, {
      x: -(scrollWidth - viewportWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${scrollWidth - viewportWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={scrollRef} className="flex">
        {children}
      </div>
    </div>
  );
}
