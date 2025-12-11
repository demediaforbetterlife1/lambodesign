# Design Document: Lambo Cards with Space-Themed UI

## Overview

This design implements an interactive 3-card lambo showcase with a cosmic/space-themed visual overhaul for the gallery and about pages. The feature combines clickable vehicle cards with a stunning detail view that displays vehicle specifications in a premium, futuristic presentation.

The core visual elements include:
- Animated starfield backgrounds with parallax depth
- Nebula gradient effects with cosmic colors
- Glassmorphic UI components with glow effects
- Interactive 3D lambo cards with hover animations
- Full-screen vehicle detail view with animated properties

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Space-Themed Pages                          │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Starfield Layer                        │  │
│  │  (Canvas-based animated stars with parallax)              │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Nebula Layer                           │  │
│  │  (Gradient overlays with cosmic colors)                   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                  Page Content                              │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │              LamboCardGrid (3 cards)                │  │  │
│  │  │  ┌─────────┐ ┌─────────┐ ┌─────────┐               │  │  │
│  │  │  │LamboCard│ │LamboCard│ │LamboCard│               │  │  │
│  │  │  └─────────┘ └─────────┘ └─────────┘               │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              VehicleDetailModal (on click)                │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │  CosmicGlow + LightRays + StardustParticles        │  │  │
│  │  │  ┌─────────────────────────────────────────────┐   │  │  │
│  │  │  │         Vehicle Image (large)               │   │  │  │
│  │  │  └─────────────────────────────────────────────┘   │  │  │
│  │  │  ┌─────────────────────────────────────────────┐   │  │  │
│  │  │  │         PropertyCards (glassmorphic)        │   │  │  │
│  │  │  │  HP | Speed | 0-100 | Engine | Price        │   │  │  │
│  │  │  └─────────────────────────────────────────────┘   │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. Starfield Component
Creates an animated canvas-based starfield with depth layers.

```typescript
interface StarfieldProps {
  starCount?: number;        // Number of stars (default: 200)
  layers?: number;           // Depth layers (default: 3)
  speed?: number;            // Base animation speed
  className?: string;
}

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  layer: number;             // Determines parallax speed
  twinkleSpeed: number;
}
```

**Implementation Notes:**
- Canvas-based for performance with many stars
- Multiple layers for parallax depth effect
- Random twinkling animation per star
- Responds to scroll for parallax movement
- Respects prefers-reduced-motion

### 2. NebulaBackground Component
Creates cosmic nebula gradient effects.

```typescript
interface NebulaBackgroundProps {
  colors?: string[];         // Gradient colors (default: purple, blue, cyan)
  animated?: boolean;        // Subtle movement animation
  intensity?: number;        // Opacity/intensity 0-1
  className?: string;
}
```

**Implementation Notes:**
- Multiple overlapping radial gradients
- Soft blur for cloud-like appearance
- Optional slow drift animation
- CSS-based for simplicity

### 3. LamboCard Component
Interactive card displaying a single Lamborghini.

```typescript
interface LamboCardProps {
  vehicle: VehicleData;
  onClick: (vehicle: VehicleData) => void;
  index: number;             // For stagger animation
}

interface VehicleData {
  id: string;
  src: string;
  alt: string;
  title: string;
  tagline: string;
  specs: VehicleSpecs;
}

interface VehicleSpecs {
  horsepower: number;
  topSpeed: number;          // km/h
  acceleration: number;      // 0-100 km/h in seconds
  engine: string;            // e.g., "V12 6.5L"
  price: number;             // USD
}
```

**Implementation Notes:**
- 3D tilt effect on hover using mouse position
- Glowing border animation on hover
- Scale up animation on hover
- Reveals "View Details" button on hover
- Click triggers detail view

### 4. VehicleDetailModal Component
Full-screen modal showing vehicle with properties.

```typescript
interface VehicleDetailModalProps {
  vehicle: VehicleData | null;
  isOpen: boolean;
  onClose: () => void;
}
```

**Implementation Notes:**
- Smooth zoom-in transition from card position
- Cosmic glow effect around vehicle image
- Stardust particle effects
- Light rays emanating from behind vehicle
- Glassmorphic property cards
- Close on backdrop click or Escape key
- Animated counting for numeric properties

### 5. PropertyCard Component
Glassmorphic card displaying a single vehicle property.

```typescript
interface PropertyCardProps {
  label: string;
  value: number;
  suffix?: string;           // e.g., "HP", "km/h", "s"
  prefix?: string;           // e.g., "$"
  icon?: React.ReactNode;
  color?: string;            // Accent color for glow
  delay?: number;            // Animation delay
}
```

**Implementation Notes:**
- Glassmorphism with backdrop blur
- Subtle glow effect matching accent color
- Animated counting effect for value
- Staggered reveal animation

### 6. CosmicGlow Component
Creates a radial glow effect for the vehicle image.

```typescript
interface CosmicGlowProps {
  color?: string;            // Primary glow color
  intensity?: number;        // Glow strength 0-1
  animated?: boolean;        // Pulsing animation
  className?: string;
}
```

### 7. LightRays Component
Animated light rays emanating from a center point.

```typescript
interface LightRaysProps {
  rayCount?: number;         // Number of rays (default: 8)
  color?: string;            // Ray color
  spread?: number;           // Spread angle in degrees
  animated?: boolean;        // Rotation animation
}
```

## Data Models

### Extended Vehicle Data
```typescript
// Extend existing LAMBO_IMAGES with specs
export const FEATURED_LAMBOS: VehicleData[] = [
  {
    id: '1',
    src: '/2nalambo.png',
    alt: 'Lamborghini Aventador',
    title: 'Aventador',
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
```

### Space Theme Colors
```typescript
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
  
  // Star colors
  starWhite: '#ffffff',
  starBlue: '#93c5fd',
  starGold: '#fcd34d',
  
  // Glow effects
  glowPurple: 'rgba(139, 92, 246, 0.6)',
  glowCyan: 'rgba(6, 182, 212, 0.6)',
  glowPink: 'rgba(236, 72, 153, 0.6)'
};
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Card renders all required vehicle information
*For any* vehicle data object, when rendered as a LamboCard, the output SHALL contain the vehicle's image source, title, and tagline.
**Validates: Requirements 1.2**

### Property 2: Detail view displays correct vehicle on click
*For any* vehicle card that is clicked, the detail modal SHALL open with the exact same vehicle data (id, title, specs) as the clicked card.
**Validates: Requirements 2.1**

### Property 3: Detail view contains all required properties
*For any* vehicle data object displayed in the detail view, the rendered output SHALL include all specification fields: horsepower, top speed, acceleration, engine type, and price.
**Validates: Requirements 2.3**

## Error Handling

### Canvas Fallbacks
- Detect canvas support before rendering Starfield
- Provide CSS-only fallback with static gradient background
- Graceful degradation for older browsers

### Image Loading
- Skeleton loaders during vehicle image load
- Error boundaries for failed image loads
- Fallback placeholder image

### Animation Performance
- Use `will-change` sparingly
- Throttle scroll handlers for parallax
- Reduce star count on mobile devices
- Respect `prefers-reduced-motion` media query

### Modal Accessibility
- Focus trap when modal is open
- Escape key closes modal
- Click outside closes modal
- Proper ARIA attributes

## Testing Strategy

### Unit Testing
- Test vehicle data structure validation
- Test property card value formatting
- Test modal open/close state management

### Property-Based Testing
Using `fast-check` library for property-based tests:

1. **Card Content Property**: Generate random vehicle data and verify card contains required fields
2. **Modal Data Integrity Property**: Generate random vehicle selections and verify modal displays correct data
3. **Property Display Property**: Generate random vehicle specs and verify all properties are rendered

Each property test will run minimum 100 iterations.

### Integration Testing
- Test card click opens modal with correct vehicle
- Test modal close on backdrop click
- Test modal close on Escape key
- Test parallax scroll behavior

### Visual Testing
- Snapshot tests for card hover states
- Cross-browser visual comparison for space theme
