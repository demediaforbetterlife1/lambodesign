'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { SPACE_COLORS } from '@/lib/constants';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  layer: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface StarfieldProps {
  starCount?: number;
  layers?: number;
  speed?: number;
  className?: string;
}

export default function Starfield({
  starCount = 200,
  layers = 3,
  speed = 1,
  className = ''
}: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>();
  const scrollRef = useRef(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Initialize stars
  const initStars = useCallback((width: number, height: number) => {
    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      const layer = Math.floor(Math.random() * layers) + 1;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: (Math.random() * 2 + 0.5) * (layer / layers),
        opacity: Math.random() * 0.5 + 0.3,
        layer,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2
      });
    }
    starsRef.current = stars;
  }, [starCount, layers]);


  // Draw stars on canvas
  const drawStars = useCallback((ctx: CanvasRenderingContext2D, time: number) => {
    const { width, height } = ctx.canvas;
    ctx.clearRect(0, 0, width, height);

    starsRef.current.forEach((star) => {
      // Calculate parallax offset based on scroll
      const parallaxFactor = star.layer / layers;
      const yOffset = (scrollRef.current * parallaxFactor * 0.3) % height;
      
      // Calculate twinkle effect
      const twinkle = prefersReducedMotion 
        ? 1 
        : Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7;
      
      const y = (star.y + yOffset) % height;
      
      // Draw star with glow
      ctx.beginPath();
      ctx.arc(star.x, y, star.size, 0, Math.PI * 2);
      
      // Star color based on layer
      const colors = [SPACE_COLORS.starWhite, SPACE_COLORS.starBlue, SPACE_COLORS.starGold];
      const colorIndex = star.layer % colors.length;
      
      ctx.fillStyle = colors[colorIndex];
      ctx.globalAlpha = star.opacity * twinkle;
      ctx.fill();
      
      // Add glow effect for larger stars
      if (star.size > 1.5) {
        ctx.beginPath();
        ctx.arc(star.x, y, star.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = colors[colorIndex];
        ctx.globalAlpha = star.opacity * twinkle * 0.2;
        ctx.fill();
      }
    });
    
    ctx.globalAlpha = 1;
  }, [layers, prefersReducedMotion]);

  // Animation loop
  const animate = useCallback((time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    drawStars(ctx, time * 0.001);
    
    if (!prefersReducedMotion) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [drawStars, prefersReducedMotion]);

  // Handle scroll for parallax
  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Initialize and start animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars(canvas.width, canvas.height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    if (!prefersReducedMotion) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      // Draw once for reduced motion
      const ctx = canvas.getContext('2d');
      if (ctx) drawStars(ctx, 0);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initStars, animate, drawStars, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}
