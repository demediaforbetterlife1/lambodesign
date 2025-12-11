'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AnimatedHeadlineProps {
  text: string;
  tag?: 'h1' | 'h2' | 'h3';
  delay?: number;
  staggerDelay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function AnimatedHeadline({
  text,
  tag: Tag = 'h1',
  delay = 0,
  staggerDelay = 0.03,
  className = '',
  style = {}
}: AnimatedHeadlineProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Just show the text without animation
      const chars = containerRef.current.querySelectorAll('.char');
      gsap.set(chars, { opacity: 1, y: 0, rotateX: 0 });
      return;
    }

    hasAnimated.current = true;
    const chars = containerRef.current.querySelectorAll('.char');
    
    // Calculate total animation time to stay within 1.5s
    const totalChars = chars.length;
    const maxDuration = 1.5;
    const charDuration = 0.6;
    const adjustedStagger = Math.min(staggerDelay, (maxDuration - charDuration) / totalChars);

    gsap.fromTo(
      chars,
      { 
        opacity: 0, 
        y: 80, 
        rotateX: -90,
        transformOrigin: 'center bottom'
      },
      { 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        duration: charDuration,
        stagger: adjustedStagger,
        delay: delay / 1000,
        ease: 'power3.out'
      }
    );

    return () => {
      gsap.killTweensOf(chars);
    };
  }, [delay, staggerDelay]);

  // Split text into words and characters
  const words = text.split(' ');
  
  return (
    <Tag 
      ref={containerRef}
      className={`heading-shadow ${className}`}
      style={{ perspective: '1000px', ...style }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block">
          {word.split('').map((char, charIndex) => (
            <span
              key={`${wordIndex}-${charIndex}`}
              className="char inline-block opacity-0"
              style={{ 
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity'
              }}
            >
              {char}
            </span>
          ))}
          {wordIndex < words.length - 1 && (
            <span className="char inline-block opacity-0">&nbsp;</span>
          )}
        </span>
      ))}
    </Tag>
  );
}
