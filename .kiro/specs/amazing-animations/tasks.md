# Implementation Plan

- [x] 1. Create animation utility functions and hooks




  - [ ] 1.1 Create animation utility functions in lib/animationUtils.ts
    - Implement `getRevealTransform(direction, distance)` for direction-based transforms
    - Implement `calculateStaggerDelay(index, baseDelay)` for cascade timing
    - Implement `calculateParallaxOffset(scrollPosition, speed)` for parallax
    - Implement `interpolateScale(progress, from, to)` for scale animations
    - Implement `calculateScrollProgress(scrollY, docHeight, viewportHeight)` for progress bar
    - Implement `calculateHeroFadeOpacity(progress, fadeStart, fadeEnd)` for hero fade
    - Implement `calculateTiltRotation(cursorX, cursorY, centerX, centerY, maxRotation)` for 3D tilt
    - Implement `calculateMagneticOffset(cursorX, cursorY, elementX, elementY, maxDistance)` for magnetic pull
    - Implement `interpolateCount(progress, target)` for counting animation
    - Implement `generateRandomDelay(maxDelay)` for masonry reveal


    - _Requirements: 1.1, 1.2, 1.3, 1.5, 3.1, 3.2, 4.1, 4.2, 5.3, 5.4_


  - [ ] 1.2 Write property test for reveal direction transform
    - **Property 1: Reveal animation direction produces correct transform**
    - **Validates: Requirements 1.1**


  - [ ] 1.3 Write property test for stagger delay calculation
    - **Property 2: Stagger delay calculation is linear**

    - **Validates: Requirements 1.2**

  - [x] 1.4 Write property test for parallax offset calculation

    - **Property 3: Parallax offset is proportional to scroll and speed**
    - **Validates: Requirements 1.3**


  - [ ] 1.5 Write property test for scale interpolation
    - **Property 5: Scale interpolation is bounded and monotonic**
    - **Validates: Requirements 1.5**


  - [ ] 1.6 Write property test for scroll progress calculation
    - **Property 6: Scroll progress is normalized between 0 and 1**

    - **Validates: Requirements 3.1**

  - [x] 1.7 Write property test for hero fade opacity

    - **Property 7: Hero fade opacity interpolation is correct**
    - **Validates: Requirements 3.2**


  - [ ] 1.8 Write property test for tilt rotation bounds
    - **Property 8: Tilt rotation is bounded by maximum**
    - **Validates: Requirements 4.1**



  - [ ] 1.9 Write property test for magnetic offset bounds
    - **Property 9: Magnetic offset is bounded by maximum distance**
    - **Validates: Requirements 4.2**



  - [ ] 1.10 Write property test for counting interpolation
    - **Property 10: Counting animation interpolates correctly**
    - **Validates: Requirements 5.3**

  - [x] 1.11 Write property test for random delay bounds




    - **Property 11: Random delay is within bounds**
    - **Validates: Requirements 5.4**

  - [ ] 1.12 Create useReducedMotion hook
    - Detect prefers-reduced-motion media query
    - Listen for changes and update state


    - Return boolean for reduced motion preference
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

  - [x] 1.13 Create useScrollProgress hook


    - Track scroll position and calculate progress 0-1
    - Track scroll direction (up/down)
    - Use spring physics for smooth values
    - _Requirements: 3.1, 3.3_



- [ ] 2. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 3. Create scroll animation components

  - [ ] 3.1 Create ScrollReveal component
    - Support direction prop (up, down, left, right)
    - Implement blur-to-sharp effect


    - Use Intersection Observer for viewport detection
    - Complete animation within 800ms
    - Respect reduced motion preference
    - _Requirements: 1.1, 6.1_



  - [ ] 3.2 Create StaggerReveal component
    - Animate children with cascade effect
    - Use 100ms delay between items
    - Support configurable direction
    - _Requirements: 1.2_

  - [ ] 3.3 Create ParallaxLayer component
    - Implement differential scroll speeds
    - Support 0.3x for background, 1.2x for foreground
    - Use spring physics for smooth movement
    - Disable when reduced motion preferred
    - _Requirements: 1.3, 3.3, 6.1_

  - [ ] 3.4 Create TextReveal3D component
    - Split text into characters or words
    - Implement 3D flip animation from below
    - Support configurable stagger delay
    - _Requirements: 1.4_

  - [ ] 3.5 Write property test for text splitting
    - **Property 4: Text splitting produces correct element count**
    - **Validates: Requirements 1.4**

  - [ ] 3.6 Create ImageBloom component
    - Scale from 0.8 to 1.0 on reveal
    - Add luminosity bloom/glow effect
    - Support auto or manual bloom color
    - _Requirements: 1.5_

  - [ ] 3.7 Create HeroParallaxFade component
    - Fade opacity from 1 to 0 as scroll progress goes 0 to 0.5
    - Apply parallax movement
    - Smooth spring physics
    - _Requirements: 3.2, 3.3_






- [ ] 4. Create interactive hover components
  - [ ] 4.1 Enhance TiltCard component with bounded rotation
    - Calculate tilt from cursor position

    - Bound rotation to 15 degrees maximum
    - Add perspective for 3D effect
    - Smooth reset on mouse leave with spring physics
    - Disable when reduced motion preferred
    - _Requirements: 4.1, 4.5, 6.3_


  - [ ] 4.2 Create MagneticPull component
    - Calculate offset toward cursor
    - Bound offset to 20px maximum
    - Use spring physics for smooth movement

    - Reset smoothly over 300ms on mouse leave
    - Disable when reduced motion preferred
    - _Requirements: 4.2, 4.5, 6.3_

  - [x] 4.3 Enhance GlowButton with pulsing effect

    - Add expanding glow on hover
    - Pulse at 2-second intervals
    - Smooth spring reset on mouse leave
    - _Requirements: 4.3, 4.5_

  - [ ] 4.4 Create HoverZoom component for images
    - Scale to 1.05x on hover
    - Add color-matched border glow
    - Smooth spring reset
    - _Requirements: 4.4, 4.5_

- [ ] 5. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Enhance page transitions in ClientLayout
  - [ ] 6.1 Implement multi-layer wipe transition
    - Three sequential layers (purple, cyan, black)
    - Each layer completes within 400ms
    - Staggered delays between layers
    - _Requirements: 2.1_

  - [ ] 6.2 Add animated logo during transition
    - Display LAMBO text with glow
    - Add pulsing rings expanding outward
    - Center in viewport during transition
    - _Requirements: 2.2_

  - [ ] 6.3 Implement page content reveal
    - Fade-in with upward movement
    - Blur-to-sharp effect
    - Trigger hero entrance animations after transition
    - _Requirements: 2.3, 2.4_



  - [x] 6.4 Add neon accent lines during transition

    - Vertical lines at 1/4 and 3/4 viewport width
    - Sweep animation during transition
    - Purple and cyan colors
    - _Requirements: 2.5_

  - [ ] 6.5 Implement reduced motion page transitions
    - Simple fade effect when reduced motion preferred
    - Complete within 200ms
    - _Requirements: 6.2_

- [ ] 7. Create section-specific animations
  - [ ] 7.1 Enhance hero section with light beam animation
    - Cinematic light beam from center
    - Pulsing intensity animation
    - Integrate with HeroParallaxFade
    - _Requirements: 5.1_

  - [ ] 7.2 Create vehicle card 3D entrance animation
    - Rotating entrance from off-screen
    - Staggered reveal for multiple cards
    - Use TiltCard for hover effects
    - _Requirements: 5.2_

  - [ ] 7.3 Enhance stats section with counting animation
    - Rapid count from 0 to final value
    - 2-second duration
    - Trigger on viewport entry
    - _Requirements: 5.3_

  - [ ] 7.4 Create MasonryReveal for gallery
    - Random delay offsets 0-300ms
    - Staggered reveal pattern
    - Integrate with ImageBloom
    - _Requirements: 5.4_

  - [ ] 7.5 Add footer glow effect
    - Upward-emanating glow
    - Visual separation from content
    - Subtle animation
    - _Requirements: 5.5_

- [ ] 8. Add scroll progress indicator
  - [ ] 8.1 Create ScrollProgressBar component
    - Gradient progress bar at top of viewport
    - Fill based on scroll position
    - Use spring physics for smooth updates
    - _Requirements: 3.1, 3.3_

- [ ] 9. Integrate animations into pages
  - [ ] 9.1 Update homepage with new animations
    - Wrap hero with HeroParallaxFade
    - Add ScrollReveal to content sections
    - Add StaggerReveal to card grids
    - Add TextReveal3D to headings
    - _Requirements: 1.1, 1.2, 1.4, 3.2_

  - [ ] 9.2 Update gallery page with new animations
    - Add MasonryReveal to gallery grid
    - Add ImageBloom to gallery images
    - Add HoverZoom to image cards
    - _Requirements: 1.5, 4.4, 5.4_

  - [ ] 9.3 Update about page with new animations
    - Add ScrollReveal to sections
    - Add ParallaxLayer for depth
    - Add TextReveal3D to headings
    - _Requirements: 1.1, 1.3, 1.4_

- [ ] 10. Final Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
