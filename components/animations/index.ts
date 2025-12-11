/**
 * Amazing Animations - Export all animation components
 * Use these for stunning scroll and page transition effects
 */

// Scroll reveal components
export { ScrollReveal } from '../ScrollReveal';
export { StaggerReveal, StaggerItem } from '../StaggerReveal';
export { ParallaxLayer } from '../ParallaxLayer';
export { TextReveal3D } from '../TextReveal3D';
export { ImageBloom } from '../ImageBloom';
export { HeroParallaxFade } from '../HeroParallaxFade';

// Enhanced scroll animations from ScrollAnimations.tsx
export {
  FadeUp,
  ScaleUp,
  SlideIn,
  Parallax,
  NeonReveal,
  StaggerContainer,
  StaggerItem as StaggerItemLegacy,
  TextReveal,
  MagneticHover,
  ScrollProgress,
  RotatingBorder,
  CinematicReveal,
  FlipReveal,
  ZoomBlurReveal,
  SplitReveal,
  GlitchReveal,
  BounceReveal,
  MorphSection,
  Float,
  PulseGlow,
} from '../ScrollAnimations';

// Hooks
export { useReducedMotion } from '../../hooks/useReducedMotion';
export { useScrollProgress } from '../../hooks/useScrollProgress';

// Utility functions
export {
  getRevealTransform,
  calculateStaggerDelay,
  calculateParallaxOffset,
  interpolateScale,
  calculateScrollProgress,
  calculateHeroFadeOpacity,
  calculateTiltRotation,
  calculateMagneticOffset,
  interpolateCount,
  generateRandomDelay,
  splitText,
  ANIMATION_CONFIG,
  NEON_COLORS,
  TRANSITION_LAYERS,
} from '../../lib/animationUtils';
