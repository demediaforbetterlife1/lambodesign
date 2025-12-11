# Design Document: Amazing Animations

## Overview

This design document outlines the implementation of next-level scroll animations and page transitions for the Lamborghini showcase website. The system leverages Framer Motion and GSAP to create a cinematic, immersive experience with smooth, performant animations that respond to user interactions.

The animation system is built around three core principles:
1. **Layered Composition** - Complex effects built from simple, reusable animation primitives
2. **Physics-Based Motion** - Spring physics for natural, responsive feel
3. **Performance First** - 60fps target with graceful degradation

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         Animation System                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                    ClientLayout (Enhanced)                       │    │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │    │
│  │  │ TransitionLayer │  │ PageContent     │  │ ScrollProgress  │  │    │
│  │  │ (Multi-wipe)    │  │ (Animated)      │  │ (Gradient bar)  │  │    │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘  │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                    Scroll Animation Components                   │    │
│  │  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────────┐   │    │
│  │  │ ScrollReveal│ │ParallaxLayer│ │TextReveal │ │ImageBloom    │   │    │
│  │  │ (Direction) │ │(Depth)     │ │(3D Flip)  │ │(Scale+Glow)  │   │    │
│  │  └───────────┘ └───────────┘ └───────────┘ └───────────────┘   │    │
│  │  ┌───────────┐ ┌───────────┐ ┌───────────┐                     │    │
│  │  │StaggerReveal│ │HeroParallax│ │SectionGlow│                     │    │
│  │  │(Cascade)   │ │(Fade-out) │ │(Ambient)  │                     │    │
│  │  └───────────┘ └───────────┘ └───────────┘                     │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                    Interactive Components                        │    │
│  │  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────────┐   │    │
│  │  │ TiltCard3D │ │MagneticPull│ │GlowButton │ │HoverZoom     │   │    │
│  │  │ (15° max)  │ │(20px max) │ │(Pulsing)  │ │(1.05x+border)│   │    │
│  │  └───────────┘ └───────────┘ └───────────┘ └───────────────┘   │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                    Utility Hooks                                 │    │
│  │  ┌───────────────┐ ┌───────────────┐ ┌───────────────────────┐ │    │
│  │  │useScrollProgress│ │useReducedMotion│ │useSpringPhysics     │ │    │
│  │  └───────────────┘ └───────────────┘ └───────────────────────┘ │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. Enhanced ClientLayout Component
Orchestrates page transitions with multi-layer wipe effects.

```typescript
interface TransitionConfig {
  layers: TransitionLayer[];
  logo: LogoConfig;
  accentLines: AccentLineConfig[];
  duration: number;
}

interface TransitionLayer {
  color: string;
  delay: number;
  origin: 'top' | 'bottom';
}

interface LogoConfig {
  text: string;
  color: string;
  glowColor: string;
  ringCount: number;
}

interface AccentLineConfig {
  position: 'left' | 'right';
  color: string;
  delay: number;
}
```

### 2. ScrollReveal Component
Reveals content with configurable direction and blur effect.

```typescript
interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;        // Default: 800ms
  delay?: number;
  blur?: boolean;           // Default: true
  distance?: number;        // Pixels to travel
  once?: boolean;           // Animate only once
}
```

### 3. StaggerReveal Component
Animates multiple children with cascade effect.

```typescript
interface StaggerRevealProps {
  children: React.ReactNode;
  staggerDelay?: number;    // Default: 100ms
  direction?: 'up' | 'down' | 'left' | 'right';
  containerDelay?: number;
}
```

### 4. ParallaxLayer Component
Creates depth with differential scroll speeds.

```typescript
interface ParallaxLayerProps {
  children: React.ReactNode;
  speed: number;            // 0.3 for background, 1.2 for foreground
  direction?: 'vertical' | 'horizontal';
}
```

### 5. TextReveal3D Component
Animates text with 3D flip effect.

```typescript
interface TextReveal3DProps {
  text: string;
  mode?: 'character' | 'word';
  delay?: number;
  staggerDelay?: number;    // Default: 30ms for chars, 80ms for words
  className?: string;
}
```

### 6. ImageBloom Component
Scales images with luminosity bloom effect.

```typescript
interface ImageBloomProps {
  children: React.ReactNode;
  initialScale?: number;    // Default: 0.8
  bloomColor?: string;      // Auto-extracted or specified
  bloomIntensity?: number;  // 0-1
}
```

### 7. HeroParallaxFade Component
Hero-specific parallax with opacity fade.

```typescript
interface HeroParallaxFadeProps {
  children: React.ReactNode;
  fadeStart?: number;       // Scroll progress to start fade (default: 0)
  fadeEnd?: number;         // Scroll progress to end fade (default: 0.5)
}
```

### 8. TiltCard3D Component (Enhanced)
3D tilt with configurable max rotation.

```typescript
interface TiltCard3DProps {
  children: React.ReactNode;
  maxRotation?: number;     // Default: 15 degrees
  perspective?: number;     // Default: 1000px
  glowOnHover?: boolean;
  glowColor?: string;
}
```

### 9. MagneticPull Component
Magnetic attraction toward cursor.

```typescript
interface MagneticPullProps {
  children: React.ReactNode;
  maxDistance?: number;     // Default: 20px
  strength?: number;        // 0-1, default: 0.5
  springConfig?: SpringConfig;
}

interface SpringConfig {
  stiffness: number;        // Default: 100
  damping: number;          // Default: 30
}
```

### 10. GlowButtonEnhanced Component
Button with pulsing glow effect.

```typescript
interface GlowButtonEnhancedProps {
  children: React.ReactNode;
  glowColor?: string;
  pulseInterval?: number;   // Default: 2000ms
  expandOnHover?: boolean;
  onClick?: () => void;
  href?: string;
}
```

### 11. CountingNumber Component (Enhanced)
Rapid counting animation for stats.

```typescript
interface CountingNumberProps {
  value: number;
  duration?: number;        // Default: 2000ms
  prefix?: string;
  suffix?: string;
  decimals?: number;
  easing?: 'linear' | 'easeOut' | 'easeInOut';
}
```

### 12. MasonryReveal Component
Gallery reveal with random delay offsets.

```typescript
interface MasonryRevealProps {
  children: React.ReactNode[];
  maxRandomDelay?: number;  // Default: 300ms
  baseDelay?: number;
}
```

## Data Models

### Animation Constants
```typescript
const ANIMATION_CONFIG = {
  // Timing
  revealDuration: 800,
  transitionDuration: 400,
  staggerDelay: 100,
  
  // Physics
  spring: {
    stiffness: 100,
    damping: 30,
  },
  
  // Easing
  ease: {
    smooth: [0.22, 1, 0.36, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
  },
  
  // Thresholds
  viewportMargin: '-100px',
  scrollThrottle: 16, // ~60fps
};

const NEON_COLORS = {
  purple: '#8b5cf6',
  cyan: '#0ea5e9',
  gold: '#D4AF37',
  pink: '#ec4899',
};

const TRANSITION_LAYERS = [
  { color: NEON_COLORS.purple, delay: 0, origin: 'bottom' },
  { color: NEON_COLORS.cyan, delay: 0.1, origin: 'bottom' },
  { color: '#000000', delay: 0.2, origin: 'bottom' },
];
```

### Scroll State
```typescript
interface ScrollState {
  progress: number;         // 0-1 page progress
  direction: 'up' | 'down';
  velocity: number;
  isScrolling: boolean;
}
```

### Reduced Motion State
```typescript
interface MotionPreference {
  prefersReducedMotion: boolean;
  animationLevel: 'full' | 'reduced' | 'minimal';
}
```



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Reveal animation direction produces correct transform
*For any* direction value ('up', 'down', 'left', 'right') and distance value, the reveal animation initial state SHALL produce a transform with the correct axis (Y for up/down, X for left/right) and correct sign (negative for up/left, positive for down/right).
**Validates: Requirements 1.1**

### Property 2: Stagger delay calculation is linear
*For any* array of N items and stagger delay D, the delay for item at index i SHALL equal i * D, ensuring consistent timing across any number of items.
**Validates: Requirements 1.2**

### Property 3: Parallax offset is proportional to scroll and speed
*For any* scroll position S and speed multiplier M, the parallax offset SHALL equal S * M, maintaining proportional relationship between scroll and movement.
**Validates: Requirements 1.3**

### Property 4: Text splitting produces correct element count
*For any* input text string, splitting by character SHALL produce exactly text.length elements, and splitting by word SHALL produce exactly the number of whitespace-separated words.
**Validates: Requirements 1.4**

### Property 5: Scale interpolation is bounded and monotonic
*For any* animation progress value P in [0, 1], the scale interpolation from 0.8 to 1.0 SHALL return a value that is >= 0.8, <= 1.0, and monotonically increasing as P increases.
**Validates: Requirements 1.5**

### Property 6: Scroll progress is normalized between 0 and 1
*For any* scroll position and document height, the scroll progress calculation SHALL return a value >= 0 and <= 1, where 0 represents top of page and 1 represents bottom.
**Validates: Requirements 3.1**

### Property 7: Hero fade opacity interpolation is correct
*For any* scroll progress P in [0, 0.5], the opacity SHALL equal 1 - (P * 2), resulting in opacity 1 at P=0 and opacity 0 at P=0.5.
**Validates: Requirements 3.2**

### Property 8: Tilt rotation is bounded by maximum
*For any* cursor position relative to element center, the calculated tilt rotation SHALL have absolute value <= maxRotation (15 degrees), regardless of how far the cursor is from center.
**Validates: Requirements 4.1**

### Property 9: Magnetic offset is bounded by maximum distance
*For any* cursor position relative to element, the magnetic pull offset SHALL have magnitude <= maxDistance (20px), regardless of cursor distance.
**Validates: Requirements 4.2**

### Property 10: Counting animation interpolates correctly
*For any* target number value V and animation progress P in [0, 1], the counting function SHALL return 0 when P=0, V when P=1, and monotonically increasing values in between.
**Validates: Requirements 5.3**

### Property 11: Random delay is within bounds
*For any* generated random delay for masonry reveal, the value SHALL be >= 0 and <= maxRandomDelay (300ms).
**Validates: Requirements 5.4**

## Error Handling

### Animation Failures
- Graceful fallback to instant state changes if animation fails
- Console warnings for invalid animation configurations
- Default values for missing props

### Performance Degradation
- Automatic reduction of particle count on low-end devices
- Throttling of scroll handlers to maintain 60fps
- Disable complex effects when frame rate drops below 30fps

### Reduced Motion
- Check `prefers-reduced-motion` media query on mount
- Listen for changes to preference
- Provide simplified animation alternatives

## Testing Strategy

### Unit Testing
- Test utility functions (interpolation, offset calculations, text splitting)
- Test animation configuration generators
- Test scroll progress calculations

### Property-Based Testing
Using `fast-check` library for property-based tests:

1. **Direction Transform Property**: Generate random directions and verify transform axis/sign
2. **Stagger Delay Property**: Generate arrays of varying lengths and verify delay calculations
3. **Parallax Offset Property**: Generate random scroll positions and speed multipliers
4. **Text Split Property**: Generate random strings and verify element counts
5. **Scale Interpolation Property**: Generate random progress values and verify bounds
6. **Scroll Progress Property**: Generate random scroll/height combinations
7. **Hero Fade Property**: Generate progress values in [0, 0.5] and verify opacity
8. **Tilt Bounds Property**: Generate random cursor positions and verify rotation bounds
9. **Magnetic Bounds Property**: Generate random cursor positions and verify offset bounds
10. **Counting Interpolation Property**: Generate random target values and progress
11. **Random Delay Bounds Property**: Generate multiple delays and verify all within bounds

Each property test will run minimum 100 iterations.

### Integration Testing
- Test page transitions complete correctly
- Test scroll-triggered animations fire at correct scroll positions
- Test reduced motion preference is respected

### Visual Regression Testing
- Snapshot tests for key animation states
- Cross-browser visual comparison for transitions
