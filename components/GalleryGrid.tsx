'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LamboImage } from '@/lib/constants';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface GalleryGridProps {
  images: LamboImage[];
  onImageSelect: (image: LamboImage) => void;
}

function GalleryItem({ 
  image, 
  index, 
  onSelect 
}: { 
  image: LamboImage; 
  index: number; 
  onSelect: (image: LamboImage) => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  
  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);

  // 3D tilt based on mouse position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  const rotateX = isHovered ? (mousePos.y - 0.5) * -20 : 0;
  const rotateY = isHovered ? (mousePos.x - 0.5) * 20 : 0;

  return (
    <motion.div
      ref={itemRef}
      className="relative aspect-[4/3] cursor-pointer overflow-visible group"
      onClick={() => onSelect(image)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0.5, y: 0.5 }); }}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 80, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
    >
      <motion.div
        className="relative w-full h-full rounded-2xl overflow-hidden bg-zinc-900"
        style={{ 
          y, 
          scale,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Animated glow border */}
        <motion.div
          className="absolute -inset-[2px] rounded-2xl pointer-events-none z-20"
          animate={{
            opacity: isHovered ? 1 : 0,
            boxShadow: isHovered 
              ? `0 0 40px rgba(212, 175, 55, 0.5), 0 0 80px rgba(212, 175, 55, 0.3), inset 0 0 30px rgba(212, 175, 55, 0.1)` 
              : '0 0 0px transparent'
          }}
          style={{
            background: isHovered 
              ? `linear-gradient(${135 + (mousePos.x - 0.5) * 90}deg, rgba(212, 175, 55, 0.6), transparent 50%, rgba(14, 165, 233, 0.4))`
              : 'transparent',
            border: '2px solid rgba(212, 175, 55, 0.5)',
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Image with 3D depth */}
        <motion.div
          className="relative w-full h-full"
          animate={{
            scale: isHovered ? 1.1 : 1,
            z: isHovered ? 20 : 0
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Multi-layer gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/40 via-transparent to-[#1a0a2e]/40" />
          
          {/* Dynamic spotlight effect following mouse */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isHovered 
                ? `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(212, 175, 55, 0.3) 0%, transparent 50%)`
                : 'transparent'
            }}
          />
          
          {/* Reflection/shine effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: isHovered 
                ? `linear-gradient(${105 + (mousePos.x - 0.5) * 30}deg, transparent 40%, rgba(255, 255, 255, 0.1) 50%, transparent 60%)`
                : 'transparent'
            }}
          />
        </motion.div>
        
        {/* Content with 3D pop effect */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-6 z-10"
          style={{ transform: 'translateZ(40px)' }}
          animate={{
            y: isHovered ? 0 : 10,
            opacity: isHovered ? 1 : 0.9
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Neon number badge */}
          <motion.span 
            className="inline-block px-3 py-1 rounded-full text-xs uppercase tracking-wider mb-3 font-bold"
            style={{
              background: 'rgba(212, 175, 55, 0.2)',
              border: '1px solid rgba(212, 175, 55, 0.5)',
              color: '#D4AF37',
              textShadow: '0 0 10px rgba(212, 175, 55, 0.8)',
              boxShadow: '0 0 15px rgba(212, 175, 55, 0.3)'
            }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          >
            0{index + 1}
          </motion.span>
          
          <h3 
            className="text-2xl font-bold text-white mb-2"
            style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.3), 0 2px 10px rgba(0, 0, 0, 0.8)' }}
          >
            {image.title}
          </h3>
          
          <motion.p 
            className="text-white/70 text-sm"
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {image.description}
          </motion.p>
          
          {/* View button */}
          <motion.div
            className="mt-4"
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <span 
              className="inline-flex items-center gap-2 text-[#0ea5e9] text-sm uppercase tracking-wider font-medium"
              style={{ textShadow: '0 0 10px rgba(14, 165, 233, 0.8)' }}
            >
              View Details
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>→</motion.span>
            </span>
          </motion.div>
        </motion.div>

        {/* Animated bottom accent lines */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[3px] z-20"
          style={{ 
            background: 'linear-gradient(90deg, #D4AF37, #0ea5e9)',
            boxShadow: '0 0 20px rgba(212, 175, 55, 0.8), 0 0 40px rgba(14, 165, 233, 0.5)'
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function GalleryGrid({ images, onImageSelect }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {images.map((image, index) => (
        <GalleryItem
          key={image.id}
          image={image}
          index={index}
          onSelect={onImageSelect}
        />
      ))}
    </div>
  );
}
