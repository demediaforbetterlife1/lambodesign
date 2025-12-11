/**
 * Animation Utility Functions
 * Core functions for scroll animations and page transitions
 */

export type RevealDirection = 'up' | 'down' | 'left' | 'right';

export interface RevealTransform {
  x: number;
  y: number;
  axis: 'x' | 'y';
}

/**
 * Get the initial transform for a reveal animation based on direction
 * Property 1: Reveal animation direction produces correct transform
 * @param direction - The direction the element reveals from
 * @param distance - The distance in pixels to travel
 * @returns Transform object with x, y values and axis
 */
export function getRevealTransform(direction: RevealDirection, distance: number): RevealTransform {
  switch (direction) {
    case 'up':
      return { x: 0, y: distance, axis: 'y' };
    case 'down':
      return { x: 0, y: -distance, axis: 'y' };
    case 'left':
      return { x: distance, y: 0, axis: 'x' };
    case 'right':
      return { x: -distance, y: 0, axis: 'x' };
    default:
      return { x: 0, y: distance, axis: 'y' };
  }
}

/**
 * Calculate stagger delay for cascade animations
 * Property 2: Stagger delay calculation is linear
 * @param index - The index of the item in the sequence
 * @param baseDelay - The base delay between items in ms (default: 100)
 * @returns The delay in milliseconds for this item
 */
export function calculateStaggerDelay(index: number, baseDelay: number = 100): number {
  return index * baseDelay;
}

/**
 * Calculate parallax offset based on scroll position and speed
 * Property 3: Parallax offset is proportional to scroll and speed
 * @param scrollPosition - Current scroll position in pixels
 * @param speed - Speed multiplier (0.3 for background, 1.2 for foreground)
 * @returns The offset in pixels
 */
export function calculateParallaxOffset(scrollPosition: number, speed: number): number {
  return scrollPosition * speed;
}

/**
 * Interpolate scale value based on animation progress
 * Property 5: Scale interpolation is bounded and monotonic
 * @param progress - Animation progress from 0 to 1
 * @param from - Starting scale value (default: 0.8)
 * @param to - Ending scale value (default: 1.0)
 * @returns The interpolated scale value
 */
export function interpolateScale(progress: number, from: number = 0.8, to: number = 1.0): number {
  // Clamp progress to [0, 1]
  const clampedProgress = Math.max(0, Math.min(1, progress));
  // Linear interpolation
  return from + (to - from) * clampedProgress;
}


/**
 * Calculate scroll progress as a normalized value between 0 and 1
 * Property 6: Scroll progress is normalized between 0 and 1
 * @param scrollY - Current scroll position
 * @param docHeight - Total document height
 * @param viewportHeight - Viewport height
 * @returns Progress value between 0 and 1
 */
export function calculateScrollProgress(
  scrollY: number,
  docHeight: number,
  viewportHeight: number
): number {
  const maxScroll = docHeight - viewportHeight;
  if (maxScroll <= 0) return 0;
  const progress = scrollY / maxScroll;
  return Math.max(0, Math.min(1, progress));
}

/**
 * Calculate hero fade opacity based on scroll progress
 * Property 7: Hero fade opacity interpolation is correct
 * @param progress - Scroll progress (0 to 1)
 * @param fadeStart - Progress value where fade starts (default: 0)
 * @param fadeEnd - Progress value where fade ends (default: 0.5)
 * @returns Opacity value between 0 and 1
 */
export function calculateHeroFadeOpacity(
  progress: number,
  fadeStart: number = 0,
  fadeEnd: number = 0.5
): number {
  if (progress <= fadeStart) return 1;
  if (progress >= fadeEnd) return 0;
  
  const fadeRange = fadeEnd - fadeStart;
  const fadeProgress = (progress - fadeStart) / fadeRange;
  return 1 - fadeProgress;
}

/**
 * Calculate 3D tilt rotation based on cursor position
 * Property 8: Tilt rotation is bounded by maximum
 * @param cursorX - Cursor X position
 * @param cursorY - Cursor Y position
 * @param centerX - Element center X
 * @param centerY - Element center Y
 * @param width - Element width
 * @param height - Element height
 * @param maxRotation - Maximum rotation in degrees (default: 15)
 * @returns Object with rotateX and rotateY values
 */
export function calculateTiltRotation(
  cursorX: number,
  cursorY: number,
  centerX: number,
  centerY: number,
  width: number,
  height: number,
  maxRotation: number = 15
): { rotateX: number; rotateY: number } {
  // Calculate relative position from center (-1 to 1)
  const relativeX = (cursorX - centerX) / (width / 2);
  const relativeY = (cursorY - centerY) / (height / 2);
  
  // Calculate rotation (inverted for natural feel)
  // rotateY is based on X position, rotateX is based on Y position (inverted)
  let rotateY = relativeX * maxRotation;
  let rotateX = -relativeY * maxRotation;
  
  // Clamp to max rotation
  rotateX = Math.max(-maxRotation, Math.min(maxRotation, rotateX));
  rotateY = Math.max(-maxRotation, Math.min(maxRotation, rotateY));
  
  return { rotateX, rotateY };
}

/**
 * Calculate magnetic pull offset toward cursor
 * Property 9: Magnetic offset is bounded by maximum distance
 * @param cursorX - Cursor X position
 * @param cursorY - Cursor Y position
 * @param elementX - Element center X
 * @param elementY - Element center Y
 * @param maxDistance - Maximum offset in pixels (default: 20)
 * @param strength - Pull strength 0-1 (default: 0.5)
 * @returns Object with x and y offset values
 */
export function calculateMagneticOffset(
  cursorX: number,
  cursorY: number,
  elementX: number,
  elementY: number,
  maxDistance: number = 20,
  strength: number = 0.5
): { x: number; y: number } {
  const deltaX = cursorX - elementX;
  const deltaY = cursorY - elementY;
  
  // Calculate raw offset based on strength
  let offsetX = deltaX * strength;
  let offsetY = deltaY * strength;
  
  // Calculate magnitude
  const magnitude = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
  
  // If magnitude exceeds max, normalize and scale to max
  if (magnitude > maxDistance) {
    const scale = maxDistance / magnitude;
    offsetX *= scale;
    offsetY *= scale;
  }
  
  return { x: offsetX, y: offsetY };
}

/**
 * Interpolate counting animation value
 * Property 10: Counting animation interpolates correctly
 * @param progress - Animation progress from 0 to 1
 * @param target - Target number to count to
 * @param easing - Easing type (default: 'easeOut')
 * @returns The current count value
 */
export function interpolateCount(
  progress: number,
  target: number,
  easing: 'linear' | 'easeOut' | 'easeInOut' = 'easeOut'
): number {
  // Clamp progress
  const clampedProgress = Math.max(0, Math.min(1, progress));
  
  // Apply easing
  let easedProgress: number;
  switch (easing) {
    case 'easeOut':
      easedProgress = 1 - Math.pow(1 - clampedProgress, 3);
      break;
    case 'easeInOut':
      easedProgress = clampedProgress < 0.5
        ? 4 * clampedProgress * clampedProgress * clampedProgress
        : 1 - Math.pow(-2 * clampedProgress + 2, 3) / 2;
      break;
    case 'linear':
    default:
      easedProgress = clampedProgress;
  }
  
  return target * easedProgress;
}

/**
 * Generate random delay within bounds for masonry reveal
 * Property 11: Random delay is within bounds
 * @param maxDelay - Maximum delay in ms (default: 300)
 * @returns Random delay between 0 and maxDelay
 */
export function generateRandomDelay(maxDelay: number = 300): number {
  return Math.random() * maxDelay;
}

/**
 * Split text into characters or words for animation
 * Property 4: Text splitting produces correct element count
 * @param text - The text to split
 * @param mode - Split by 'character' or 'word'
 * @returns Array of strings
 */
export function splitText(text: string, mode: 'character' | 'word' = 'character'): string[] {
  if (mode === 'word') {
    return text.split(/\s+/).filter(word => word.length > 0);
  }
  return text.split('');
}

/**
 * Animation configuration constants
 */
export const ANIMATION_CONFIG = {
  // Timing (in ms)
  revealDuration: 800,
  transitionDuration: 400,
  staggerDelay: 100,
  resetDuration: 300,
  
  // Physics
  spring: {
    stiffness: 100,
    damping: 30,
  },
  
  // Easing curves
  ease: {
    smooth: [0.22, 1, 0.36, 1] as const,
    bounce: [0.68, -0.55, 0.265, 1.55] as const,
  },
  
  // Thresholds
  viewportMargin: '-100px',
  scrollThrottle: 16, // ~60fps
  
  // Bounds
  maxTiltRotation: 15,
  maxMagneticOffset: 20,
  maxRandomDelay: 300,
};

/**
 * Neon color palette
 */
export const NEON_COLORS = {
  purple: '#8b5cf6',
  cyan: '#0ea5e9',
  gold: '#D4AF37',
  pink: '#ec4899',
};

/**
 * Page transition layer configuration
 */
export const TRANSITION_LAYERS = [
  { color: NEON_COLORS.purple, delay: 0, origin: 'bottom' as const },
  { color: NEON_COLORS.cyan, delay: 0.1, origin: 'bottom' as const },
  { color: '#000000', delay: 0.2, origin: 'bottom' as const },
];
