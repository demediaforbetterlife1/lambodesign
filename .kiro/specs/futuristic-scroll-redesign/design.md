# Design Document: Futuristic Single-Page Scroll Redesign

## Overview

This design transforms the Lamborghini showcase website into a futuristic single-page scrolling experience. All existing pages (Home, About, Gallery) are consolidated into one continuous vertical scroll with stunning scroll-triggered animations, creating an immersive journey through the Lamborghini brand.

The core architecture leverages:
- GSAP ScrollTrigger for advanced scroll-based animations
- Framer Motion for component-level animations
- CSS scroll-snap for section-based navigation
- Intersection Observer for viewport detection
- Custom hooks for scroll progress and parallax calculations

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         Single Page Layout                               │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                    Fixed Navigation Overlay                        │  │
│  │  ┌─────────────────┐  ┌─────────────────────────────────────────┐ │  │
│  │  │ ScrollProgress  │  │        SectionIndicators                │ │  │
│  │  │ (horizontal bar)│  │  (vertical dots with labels)            │ │  │
│  │  └─────────────────┘  └─────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                    Scroll Container (snap-y)                       │  │
│  │                                                                    │  │
│  │  ┌─────────────────────────────────────────────────────────────┐  │  │
│  │  │  Section 1: HERO (100vh, pinned)                            │  │  │
│  │  │  - ParticleField background                                 │  │  │
│  │  │  - GradientMesh animated background                         │  │  │
│  │  │  - AnimatedTitle (3D character reveal)                      │  │  │
│  │  │  - Parallax fade-out on scroll                              │  │  │
│  │  └─────────────────────────────────────────────────────────────┘  │  │
│  │                                                                    │  │
│  │  ┌─────────────────────────────────────────────────────────────┐  │  │
│  │  │  Section 2: VEHICLE SHOWCASE (200vh+, horizontal scroll)    │  │  │
│  │  │  - VehicleCard components with 3D rotation                  │  │  │
│  │  │  - Staggered entrance animations                            │  │  │
│  │  │  - CountingNumber for specs                                 │  │  │
│  │  │  - Modal on click                                           │  │  │
│  │  └─────────────────────────────────────────────────────────────┘  │  │
│  │                                                                    │  │
│  │  ┌─────────────────────────────────────────────────────────────┐  │  │
│  │  │  Section 3: ABOUT/LEGACY (100vh)                            │  │  │
│  │  │  - Timeline with sequential reveals                         │  │  │
│  │  │  - Value cards with stagger animation                       │  │  │
│  │  │  - Parallax images                                          │  │  │
│  │  └─────────────────────────────────────────────────────────────┘  │  │
│  │                                                                    │  │
│  │  ┌─────────────────────────────────────────────────────────────┐  │  │
│  │  │  Section 4: CONTACT/FOOTER (100vh)                          │  │  │
│  │  │  - Contact cards with glow effects                          │  │  │
│  │  │  - Final CTA                                                │  │  │
│  │  └─────────────────────────────────────────────────────────────┘  │  │
│  │                                                                    │  │
│  └───────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. ScrollProgressBar Component
Fixed horizontal progress indicator at the top of the viewport.

```typescript
interface ScrollProgressBarProps {
  color?: string;           // Gradient colors for the bar
  height?: number;          // Bar height in pixels (default: 4)
  showGlow?: boolean;       // Enable glow effect (default: true)
}
```

**Implementation Notes:**
- Uses Framer Motion's useScroll and useTransform
- Scales from 0 to 100% based on document scroll
- Neon gradient with glow shadow

### 2. SectionIndicators Component
Fixed vertical navigation dots showing current section.

```typescript
interface SectionIndicatorsProps {
  sections: SectionConfig[];
  activeSection: number;
  onSectionClick: (index: number) => void;
}

interface SectionConfig {
  id: string;
  label: string;
  color: string;
}
```

**Implementation Notes:**
- Fixed position on right side of viewport
- Active section highlighted with glow
- Click triggers smooth scroll to section
- Labels appear on hover

### 3. ScrollSection Component
Wrapper for each major section with scroll-snap and animations.

```typescript
interface ScrollSectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  onEnter?: () => void;
  onLeave?: () => void;
  pinned?: boolean;         // Keep section fixed during scroll
  pinnedDuration?: number;  // How long to pin (in scroll distance)
}
```

**Implementation Notes:**
- Uses GSAP ScrollTrigger for pinning
- Intersection Observer for enter/leave callbacks
- CSS scroll-snap-align: start

### 4. HeroScrollSection Component
The hero section with parallax fade-out effects.

```typescript
interface HeroScrollSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
}
```

**Implementation Notes:**
- Content fades and scales down as user scrolls
- Parallax layers move at different speeds
- Particles and gradient mesh in background
- 30% scroll threshold for fade-out start

### 5. VehicleShowcaseSection Component
Gallery section with 3D card reveals.

```typescript
interface VehicleShowcaseSectionProps {
  vehicles: VehicleData[];
  onVehicleSelect: (vehicle: VehicleData) => void;
}
```

**Implementation Notes:**
- Cards animate in with 3D rotation (rotateY)
- Staggered entrance with 150ms delay between cards
- Hover expands card with spec details
- Click opens modal

### 6. VehicleCard3D Component
Individual vehicle card with 3D effects.

```typescript
interface VehicleCard3DProps {
  vehicle: VehicleData;
  index: number;
  onClick: () => void;
  isInView: boolean;
}
```

**Implementation Notes:**
- 3D rotation on scroll entrance (rotateY: -90 to 0)
- Glow border intensifies on hover
- Specs animate with counting numbers
- Scale up slightly on hover

### 7. LegacySection Component
About section with timeline and value cards.

```typescript
interface LegacySectionProps {
  timeline: TimelineItem[];
  values: ValueItem[];
}

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  image?: string;
}

interface ValueItem {
  icon: string;
  title: string;
  description: string;
  color: string;
}
```

**Implementation Notes:**
- Timeline items reveal sequentially on scroll
- Value cards use stagger animation
- Images have parallax movement

### 8. useScrollProgress Hook
Custom hook for calculating scroll progress within a section.

```typescript
interface UseScrollProgressOptions {
  target?: RefObject<HTMLElement>;
  offset?: [string, string];  // Start and end offsets
}

interface ScrollProgressResult {
  progress: number;           // 0-1 normalized progress
  isInView: boolean;
  scrollDirection: 'up' | 'down';
}
```

### 9. useActiveSection Hook
Custom hook for determining which section is currently active.

```typescript
interface UseActiveSectionOptions {
  sectionIds: string[];
  threshold?: number;         // Viewport percentage to consider "active"
}

function useActiveSection(options: UseActiveSectionOptions): number;
```

**Implementation Notes:**
- Uses Intersection Observer
- Returns index of most visible section
- Threshold determines activation point (default: 50%)

### 10. useParallax Hook
Custom hook for parallax offset calculations.

```typescript
interface UseParallaxOptions {
  speed?: number;             // Parallax speed multiplier (default: 0.5)
  direction?: 'vertical' | 'horizontal';
}

function useParallax(options: UseParallaxOptions): {
  offset: number;
  style: CSSProperties;
};
```

## Data Models

### Section Configuration
```typescript
const SECTIONS: SectionConfig[] = [
  { id: 'hero', label: 'Home', color: NEON.gold },
  { id: 'vehicles', label: 'Models', color: NEON.cyan },
  { id: 'legacy', label: 'Legacy', color: NEON.purple },
  { id: 'contact', label: 'Contact', color: NEON.pink },
];
```

### Neon Color Palette
```typescript
const NEON = {
  purple: '#8b5cf6',
  cyan: '#0ea5e9',
  gold: '#D4AF37',
  pink: '#ec4899',
  blue: '#3b82f6',
  green: '#10b981',
};
```

### Animation Timing
```typescript
const SCROLL_ANIMATION = {
  heroFadeStart: 0.3,         // Start fading at 30% scroll
  heroFadeEnd: 0.7,           // Fully faded at 70% scroll
  cardStaggerDelay: 150,      // ms between card animations
  countingDuration: 1500,     // ms for number counting
  sectionTransition: 0.8,     // seconds for section transitions
};
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Scroll progress calculation is bounded and monotonic
*For any* scroll position within a section, the scroll progress value SHALL be between 0 and 1 inclusive, where 0 represents the start of the section and 1 represents the end, with values increasing monotonically as scroll position increases.
**Validates: Requirements 2.4**

### Property 2: Stagger delay calculation is correct for any array length
*For any* array of items with length N, the stagger animation delay for item at index i SHALL equal i * staggerDelay (150ms), ensuring consistent timing across any number of items.
**Validates: Requirements 4.3**

### Property 3: Parallax offset is proportional to scroll and bounded
*For any* scroll position and parallax speed multiplier, the parallax offset SHALL be calculated as scrollPosition * speed, and the result SHALL be bounded within reasonable viewport limits.
**Validates: Requirements 4.4**

### Property 4: Active section detection returns valid index
*For any* scroll position on the page, the active section detection SHALL return an index between 0 and (number of sections - 1) inclusive, corresponding to the section most visible in the viewport.
**Validates: Requirements 5.2**

### Property 5: Modal receives correct vehicle data
*For any* vehicle in the gallery, when clicked, the modal SHALL receive the exact same vehicle data object (id, title, specs, image) as the clicked card.
**Validates: Requirements 3.4**

### Property 6: Counting animation interpolates correctly
*For any* target number value and animation progress (0-1), the counting function SHALL return a value that starts at 0 when progress is 0 and reaches the exact target value when progress is 1, with monotonically increasing values in between.
**Validates: Requirements 3.5**

### Property 7: Reduced motion hook returns correct preference
*For any* system preference state, the useReducedMotion hook SHALL return true when prefers-reduced-motion is set to 'reduce' and false otherwise.
**Validates: Requirements 7.1**

### Property 8: Animation duration respects reduced motion
*For any* animation configuration, when reduced motion is preferred, the animation duration SHALL be 0 or the animation SHALL be disabled entirely.
**Validates: Requirements 7.2**

## Error Handling

### Scroll Performance
- Throttle scroll event handlers to 60fps using requestAnimationFrame
- Use CSS will-change sparingly and remove after animations complete
- Implement passive event listeners for scroll events
- Debounce resize handlers

### Animation Fallbacks
- Check for GSAP ScrollTrigger support before initializing
- Provide CSS-only fallbacks for critical animations
- Gracefully degrade particle effects on low-performance devices

### Reduced Motion Support
- Check prefers-reduced-motion media query on mount
- Disable or simplify all scroll-triggered animations
- Use instant transitions instead of animated ones
- Ensure all content is visible without animation dependencies

### Image Loading
- Use Next.js Image component with priority for above-fold images
- Implement blur-up placeholder technique
- Show skeleton loaders during image load

## Testing Strategy

### Unit Testing
- Test scroll progress calculation functions
- Test stagger delay calculations
- Test parallax offset calculations
- Test active section detection logic
- Test counting animation interpolation
- Test reduced motion detection

### Property-Based Testing
Using `fast-check` library for property-based tests:

1. **Scroll Progress Property**: Generate random scroll positions and section bounds, verify progress is always 0-1
2. **Stagger Delay Property**: Generate arrays of varying lengths, verify delay calculations
3. **Parallax Offset Property**: Generate random scroll positions and speed multipliers, verify bounded results
4. **Active Section Property**: Generate random scroll positions, verify valid section index returned
5. **Modal Data Property**: Generate random vehicle selections, verify data integrity
6. **Counting Animation Property**: Generate random target values and progress points, verify interpolation
7. **Reduced Motion Property**: Test hook with different preference states
8. **Animation Duration Property**: Test that durations are 0 when reduced motion is enabled

Each property test will run minimum 100 iterations.

### Integration Testing
- Test scroll-snap behavior between sections
- Test section indicator click navigation
- Test modal open/close lifecycle
- Test animation triggers on scroll

### Visual Regression Testing
- Snapshot tests for each section at key scroll positions
- Cross-browser visual comparison
- Mobile responsive layout verification

