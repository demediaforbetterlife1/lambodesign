export interface LamboImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  description?: string;
}

// Vehicle specifications for detailed view
export interface VehicleSpecs {
  horsepower: number;
  topSpeed: number;          // km/h
  acceleration: number;      // 0-100 km/h in seconds
  engine: string;            // e.g., "V12 6.5L"
  price: number;             // USD
}

// Extended vehicle data with specs
export interface VehicleData extends LamboImage {
  tagline: string;
  specs: VehicleSpecs;
}

export const LAMBO_IMAGES: LamboImage[] = [
  { id: '1', src: '/2nalambo.png', alt: 'Lamborghini Aventador', title: 'Aventador', description: 'The ultimate expression of power and design' },
  { id: '2', src: '/amalambo.png', alt: 'Lamborghini Huracán', title: 'Huracán', description: 'Pure performance, refined elegance' },
  { id: '3', src: '/dmalambo.png', alt: 'Lamborghini Urus', title: 'Urus', description: 'The world\'s first Super SUV' },
  { id: '4', src: '/lastlambo.png', alt: 'Lamborghini Revuelto', title: 'Revuelto', description: 'The future of supercars' },
  { id: '5', src: '/redlambo.png', alt: 'Lamborghini Countach', title: 'Countach', description: 'An icon reborn' },
  { id: '6', src: '/walkinglabo.png', alt: 'Lamborghini Sián', title: 'Sián', description: 'Hybrid hypercar excellence' }
];

// Featured lambos with full specifications for the 3-card showcase
export const FEATURED_LAMBOS: VehicleData[] = [
  {
    id: '1',
    src: '/2nalambo.png',
    alt: 'Lamborghini Aventador',
    title: 'Aventador',
    description: 'The ultimate expression of power and design',
    tagline: 'The ultimate expression of power',
    specs: {
      horsepower: 770,
      topSpeed: 350,
      acceleration: 2.8,
      engine: 'V12 6.5L',
      price: 507353
    }
  },
  {
    id: '2',
    src: '/amalambo.png',
    alt: 'Lamborghini Huracán',
    title: 'Huracán',
    description: 'Pure performance, refined elegance',
    tagline: 'Pure performance, refined elegance',
    specs: {
      horsepower: 640,
      topSpeed: 325,
      acceleration: 2.9,
      engine: 'V10 5.2L',
      price: 261274
    }
  },
  {
    id: '3',
    src: '/redlambo.png',
    alt: 'Lamborghini Revuelto',
    title: 'Revuelto',
    description: 'The future of supercars',
    tagline: 'The future of supercars',
    specs: {
      horsepower: 1015,
      topSpeed: 350,
      acceleration: 2.5,
      engine: 'V12 Hybrid',
      price: 608358
    }
  }
];

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' }
];

// GSAP Animation Defaults
export const ANIMATION_DEFAULTS = {
  duration: 0.8,
  ease: 'power3.out',
  delay: 0
};

// Brand Colors
export const COLORS = {
  gold: '#D4AF37',
  darkGold: '#B8860B',
  black: '#0a0a0a',
  darkGray: '#1a1a1a',
  white: '#ffffff',
  lightGray: '#ededed',
  
  // New gradient colors for next-level design
  deepBlue: '#0a1628',
  purple: '#1a0a2e',
  darkPurple: '#0d0618',
  cyan: '#0ea5e9',
  
  // Glow colors (with alpha)
  glowBlue: 'rgba(14, 165, 233, 0.5)',
  glowPurple: 'rgba(139, 92, 246, 0.5)',
  glowGold: 'rgba(212, 175, 55, 0.5)',
  glowCyan: 'rgba(14, 165, 233, 0.3)',
  glowWhite: 'rgba(255, 255, 255, 0.2)'
};

// Space Theme Colors for cosmic UI
export const SPACE_COLORS = {
  // Deep space backgrounds
  voidBlack: '#000000',
  deepSpace: '#0a0a1a',
  cosmicBlue: '#0d1b2a',
  
  // Nebula colors
  nebulaPurple: '#4c1d95',
  nebulaPink: '#831843',
  nebulaCyan: '#0891b2',
  nebulaBlue: '#1e40af',
  nebulaViolet: '#5b21b6',
  
  // Star colors
  starWhite: '#ffffff',
  starBlue: '#93c5fd',
  starGold: '#fcd34d',
  starPink: '#f9a8d4',
  
  // Glow effects
  glowPurple: 'rgba(139, 92, 246, 0.6)',
  glowCyan: 'rgba(6, 182, 212, 0.6)',
  glowPink: 'rgba(236, 72, 153, 0.6)',
  glowBlue: 'rgba(59, 130, 246, 0.6)',
  glowViolet: 'rgba(124, 58, 237, 0.6)'
};

// Animation Presets
export const ANIMATION_PRESETS = {
  fast: { duration: 0.3, ease: 'power2.out' },
  normal: { duration: 0.6, ease: 'power3.out' },
  slow: { duration: 1.0, ease: 'power3.inOut' },
  bounce: { duration: 0.5, ease: 'elastic.out(1, 0.5)' },
  smooth: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

// Stagger delay calculation
export function calculateStaggerDelay(index: number, baseDelay: number = 100): number {
  return index * baseDelay;
}

// Counting animation interpolation
export function interpolateCount(progress: number, target: number): number {
  // Ensure progress is clamped between 0 and 1
  const clampedProgress = Math.max(0, Math.min(1, progress));
  // Ease out cubic for natural feel
  const easedProgress = 1 - Math.pow(1 - clampedProgress, 3);
  return Math.round(easedProgress * target);
}

// Magnetic offset calculation
export function calculateMagneticOffset(
  cursorX: number,
  cursorY: number,
  elementRect: { left: number; top: number; width: number; height: number },
  maxOffset: number = 0.3
): { x: number; y: number } {
  const centerX = elementRect.left + elementRect.width / 2;
  const centerY = elementRect.top + elementRect.height / 2;
  
  const deltaX = cursorX - centerX;
  const deltaY = cursorY - centerY;
  
  // Normalize by element size and bound by maxOffset
  const boundedX = Math.max(-maxOffset, Math.min(maxOffset, deltaX / elementRect.width)) * elementRect.width;
  const boundedY = Math.max(-maxOffset, Math.min(maxOffset, deltaY / elementRect.height)) * elementRect.height;
  
  return { x: boundedX, y: boundedY };
}

// Navigation scroll state
export function getNavScrollState(scrollY: number, threshold: number = 100): {
  isScrolled: boolean;
  isCompact: boolean;
  opacity: number;
} {
  const isScrolled = scrollY > threshold;
  return {
    isScrolled,
    isCompact: isScrolled,
    opacity: isScrolled ? 0.95 : 0.3
  };
}
