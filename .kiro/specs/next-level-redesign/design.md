# Design Document: Next-Level Redesign

## Overview

This design transforms the Lamborghini showcase website into a premium, next-level experience inspired by modern tech aesthetics like Huly. The redesign leverages the existing tech stack (Next.js, Framer Motion, GSAP, Three.js) while adding dramatic lighting effects, glassmorphism, sophisticated scroll animations, and immersive visual elements.

The core visual identity shifts from a simple dark theme to a rich, cinematic aesthetic featuring:
- Animated light beams and glow effects
- Deep blue/purple gradient backgrounds with gold accents
- Glassmorphic UI elements with backdrop blur
- Particle systems and ambient animations
- Advanced cursor interactions

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        App Layout                                │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                  GlassmorphicNav                          │  │
│  │  (scroll-aware, magnetic links, glow effects)             │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Page Content                            │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │              CinematicHero                          │  │  │
│  │  │  ┌─────────┐ ┌─────────┐ ┌─────────────────────┐   │  │  │
│  │  │  │LightBeam│ │Particles│ │  GradientMesh       │   │  │  │
│  │  │  └─────────┘ └─────────┘ └─────────────────────┘   │  │  │
│  │  │  ┌─────────────────────────────────────────────┐   │  │  │
│  │  │  │         AnimatedHeadline                    │   │  │  │
│  │  │  └─────────────────────────────────────────────┘   │  │  │
│  │  │  ┌─────────────────────────────────────────────┐   │  │  │
│  │  │  │         GlowButton                          │   │  │  │
│  │  │  └─────────────────────────────────────────────┘   │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │                                                            │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │              ScrollSection (wrapper)                │  │  │
│  │  │  - Intersection Observer based                      │  │  │
│  │  │  - Configurable animations                          │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │                                                            │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │              TiltCard (3D hover effect)             │  │  │
│  │  │  - Mouse position tracking                          │  │  │
│  │  │  - Glow border on hover                             │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │                                                            │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │              CountingStats                          │  │  │
│  │  │  - Animated number counting                         │  │  │
│  │  │  - Viewport-triggered                               │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    GlowFooter                             │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. LightBeam Component
Creates the dramatic vertical light beam effect seen in the Huly reference.

```typescript
interface LightBeamProps {
  color?: string;           // Primary beam color (default: white/blue)
  intensity?: number;       // Glow intensity 0-1
  width?: number;           // Beam width in pixels
  animated?: boolean;       // Enable pulse animation
  position?: 'center' | 'left' | 'right';
}
```

**Implementation Notes:**
- Uses CSS gradients with multiple layers for depth
- Radial gradient at base for "source" glow
- Linear gradient for the beam itself
- Subtle animation for pulsing effect
- Blur filters for soft edges

### 2. GradientMesh Component
Creates rich, multi-color gradient backgrounds.

```typescript
interface GradientMeshProps {
  colors?: string[];        // Array of gradient colors
  animated?: boolean;       // Subtle movement animation
  className?: string;
}
```

**Implementation Notes:**
- Multiple overlapping radial gradients
- CSS custom properties for color control
- Optional slow animation for living feel
- Performance-optimized with will-change

### 3. ParticleField Component
Floating ambient particles for depth.

```typescript
interface ParticleFieldProps {
  count?: number;           // Number of particles (default: 50)
  color?: string;           // Particle color
  speed?: number;           // Movement speed multiplier
  size?: { min: number; max: number };
}
```

**Implementation Notes:**
- Canvas-based for performance
- Random initial positions and velocities
- Subtle opacity variations
- Respects reduced-motion preferences

### 4. AnimatedHeadline Component
Staggered character reveal animation.

```typescript
interface AnimatedHeadlineProps {
  text: string;
  tag?: 'h1' | 'h2' | 'h3';
  delay?: number;           // Initial delay in ms
  staggerDelay?: number;    // Delay between characters
  className?: string;
}
```

**Implementation Notes:**
- Splits text into individual span elements
- GSAP timeline for precise control
- 3D transform for depth effect
- Total animation completes within 1.5s

### 5. GlowButton Component
Button with pulsing glow and ripple effects.

```typescript
interface GlowButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  glowColor?: string;
  href?: string;
  onClick?: () => void;
}
```

**Implementation Notes:**
- Pseudo-element for glow layer
- CSS animation for pulse
- Ripple effect on hover using mouse position
- Scale animation on click

### 6. GlassmorphicNav Component
Enhanced navigation with glassmorphism and scroll awareness.

```typescript
interface NavState {
  isScrolled: boolean;      // True when scrolled past threshold
  isCompact: boolean;       // Compact mode when scrolled
  opacity: number;          // Dynamic opacity based on scroll
}
```

**Implementation Notes:**
- backdrop-filter: blur() for glass effect
- Scroll listener updates state
- Smooth transitions between states
- Magnetic effect on nav links using existing GSAP logic

### 7. TiltCard Component
3D tilt effect on hover with glow border.

```typescript
interface TiltCardProps {
  children: React.ReactNode;
  maxTilt?: number;         // Maximum tilt angle in degrees
  glowColor?: string;
  className?: string;
}
```

**Implementation Notes:**
- Mouse position relative to card center
- CSS transform: perspective() rotateX() rotateY()
- Dynamic border glow based on mouse position
- Smooth reset on mouse leave

### 8. CountingNumber Component
Animated number counting effect.

```typescript
interface CountingNumberProps {
  value: number;
  duration?: number;        // Animation duration in ms
  suffix?: string;          // e.g., '+', 's', 'KM/H'
  prefix?: string;
}
```

**Implementation Notes:**
- Uses requestAnimationFrame for smooth counting
- Easing function for natural feel
- Triggers on viewport entry
- Handles decimals and formatting

### 9. ImageModal Component (Enhanced)
Full-screen modal with color-matched glow.

```typescript
interface ImageModalProps {
  image: LamboImage;
  isOpen: boolean;
  onClose: () => void;
  dominantColor?: string;   // Extracted from image
}
```

**Implementation Notes:**
- Zoom-in transition from thumbnail position
- Ambient glow using dominant color
- Backdrop blur
- Keyboard navigation support

## Data Models

### Animation Configuration
```typescript
interface AnimationConfig {
  duration: number;
  ease: string;
  delay?: number;
  stagger?: number;
}

const ANIMATION_PRESETS = {
  fast: { duration: 0.3, ease: 'power2.out' },
  normal: { duration: 0.6, ease: 'power3.out' },
  slow: { duration: 1.0, ease: 'power3.inOut' },
  bounce: { duration: 0.5, ease: 'elastic.out(1, 0.5)' }
};
```

### Theme Colors (Extended)
```typescript
const THEME_COLORS = {
  // Existing
  gold: '#D4AF37',
  darkGold: '#B8860B',
  
  // New gradient colors
  deepBlue: '#0a1628',
  purple: '#1a0a2e',
  cyan: '#0ea5e9',
  
  // Glow colors
  glowBlue: 'rgba(14, 165, 233, 0.5)',
  glowPurple: 'rgba(139, 92, 246, 0.5)',
  glowGold: 'rgba(212, 175, 55, 0.5)'
};
```

### Scroll State
```typescript
interface ScrollState {
  scrollY: number;
  scrollProgress: number;   // 0-1 based on page height
  direction: 'up' | 'down';
  velocity: number;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Navigation scroll state transitions correctly
*For any* scroll position value, when the scroll position exceeds the threshold (100px), the navigation state SHALL transition to compact mode with increased opacity, and when below the threshold, it SHALL return to the default expanded state.
**Validates: Requirements 2.3**

### Property 2: Stagger delay calculation is correct
*For any* array of items with length N, the stagger animation delay for item at index i SHALL equal i * staggerDelay (100ms), ensuring consistent timing across any number of items.
**Validates: Requirements 3.2**

### Property 3: Counting animation interpolates correctly
*For any* target number value and animation progress (0-1), the counting function SHALL return a value that starts at 0 when progress is 0 and reaches the exact target value when progress is 1, with monotonically increasing values in between.
**Validates: Requirements 3.4**

### Property 4: Magnetic offset calculation is bounded
*For any* cursor position relative to an element's bounds, the magnetic offset calculation SHALL return x and y values that are proportional to the cursor distance from center and bounded by a maximum offset value (e.g., 30% of element size).
**Validates: Requirements 4.1**

### Property 5: Modal opens with correct image data
*For any* image in the gallery, when clicked, the modal SHALL open with the exact same image data (id, src, title, description) as the clicked item.
**Validates: Requirements 5.3**

### Property 6: Color extraction returns valid color
*For any* image data input, the color extraction function SHALL return a valid CSS color string (hex format #RRGGBB or rgb format) that can be used for styling.
**Validates: Requirements 5.4**

## Error Handling

### WebGL Fallbacks
- Detect WebGL support before rendering 3D elements
- Provide CSS-only fallbacks for particle effects
- Graceful degradation for older browsers

### Animation Performance
- Use `will-change` sparingly and remove after animations
- Throttle scroll handlers to 60fps
- Use `requestAnimationFrame` for smooth animations
- Respect `prefers-reduced-motion` media query

### Image Loading
- Skeleton loaders during image load
- Error boundaries for failed image loads
- Blur-up placeholder technique

## Testing Strategy

### Unit Testing
- Test utility functions (color extraction, offset calculations)
- Test animation configuration generators
- Test scroll state calculations

### Property-Based Testing
Using `fast-check` library for property-based tests:

1. **Navigation State Property**: Generate random scroll positions and verify state transitions
2. **Stagger Delay Property**: Generate arrays of varying lengths and verify delay calculations
3. **Counting Animation Property**: Generate random target values and progress points
4. **Magnetic Offset Property**: Generate random cursor positions and element bounds
5. **Modal Data Property**: Generate random image selections and verify data integrity
6. **Color Extraction Property**: Generate valid image data and verify output format

Each property test will run minimum 100 iterations.

### Integration Testing
- Test scroll-triggered animations fire correctly
- Test modal open/close lifecycle
- Test navigation state changes on scroll

### Visual Regression Testing
- Snapshot tests for key visual states
- Cross-browser visual comparison
