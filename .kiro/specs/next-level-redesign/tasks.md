# Implementation Plan

- [x] 1. Set up foundation and extend theme

  - [x] 1.1 Install fast-check for property-based testing and extend theme colors


    - Add fast-check as dev dependency
    - Extend `lib/constants.ts` with new gradient colors (deepBlue, purple, cyan, glow variants)
    - Add animation presets to constants


    - _Requirements: 6.1_
  - [ ] 1.2 Update globals.css with new gradient utilities and glow effects
    - Add CSS custom properties for new colors
    - Create utility classes for glassmorphism (backdrop-blur, border-glow)

    - Add gradient mesh background utilities


    - Add text-shadow utilities for headings
    - _Requirements: 6.1, 6.4_

- [x] 2. Create core visual effect components


  - [ ] 2.1 Create LightBeam component
    - Implement vertical light beam with CSS gradients
    - Add radial gradient at base for "source" glow


    - Add pulse animation option
    - Support position variants (center, left, right)
    - _Requirements: 1.1_

  - [x] 2.2 Create GradientMesh component


    - Implement multi-layer radial gradients
    - Add subtle animation for living feel
    - Use CSS custom properties for color control
    - _Requirements: 1.2, 6.1_


  - [ ] 2.3 Create ParticleField component
    - Canvas-based particle system
    - Random positions and slow movement
    - Respect prefers-reduced-motion


    - _Requirements: 1.4_

- [ ] 3. Create animation utility components
  - [x] 3.1 Create AnimatedHeadline component


    - Split text into character spans

    - GSAP staggered reveal animation


    - 3D transform effect (rotateX)
    - Complete within 1.5 seconds
    - _Requirements: 1.3_
  - [x] 3.2 Create GlowButton component

    - Pulsing glow effect behind button

    - Ripple effect on hover
    - Scale animation on click

    - Support primary/secondary variants
    - _Requirements: 1.5, 4.2, 4.3_

  - [ ] 3.3 Create CountingNumber component with animation logic
    - Implement counting interpolation function
    - Use requestAnimationFrame for smooth animation

    - Trigger on viewport entry
    - Handle suffixes and formatting

    - _Requirements: 3.4_
  - [x] 3.4 Write property test for counting animation interpolation

    - **Property 3: Counting animation interpolates correctly**


    - **Validates: Requirements 3.4**

- [ ] 4. Create interactive components
  - [x] 4.1 Create TiltCard component with 3D hover effect

    - Track mouse position relative to card
    - Calculate tilt angles from mouse position

    - Add glow border effect on hover
    - Smooth reset on mouse leave
    - _Requirements: 3.3_

  - [ ] 4.2 Create magnetic effect utility hook (useMagnetic)
    - Calculate offset based on cursor position
    - Bound offset to maximum value

    - Apply with GSAP for smooth movement


    - _Requirements: 4.1_
  - [ ] 4.3 Write property test for magnetic offset calculation
    - **Property 4: Magnetic offset calculation is bounded**
    - **Validates: Requirements 4.1**
  - [x] 4.4 Create stagger animation utility with delay calculation

    - Function to calculate stagger delays for arrays

    - Configurable base delay (100ms default)

    - _Requirements: 3.2_

  - [ ] 4.5 Write property test for stagger delay calculation
    - **Property 2: Stagger delay calculation is correct**
    - **Validates: Requirements 3.2**


- [ ] 5. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Upgrade Navigation component

  - [ ] 6.1 Enhance Navigation with glassmorphism and scroll awareness
    - Add backdrop-blur and border-glow styles
    - Implement scroll listener for state changes

    - Transition to compact mode when scrolled past 100px
    - Increase opacity when scrolled
    - _Requirements: 2.1, 2.3_
  - [ ] 6.2 Write property test for navigation scroll state
    - **Property 1: Navigation scroll state transitions correctly**
    - **Validates: Requirements 2.3**
  - [x] 6.3 Add glow underline effect to nav links


    - Animated underline on hover
    - Subtle glow effect

    - _Requirements: 2.2_

  - [ ] 6.4 Enhance mobile menu with improved animations
    - Slide-in with backdrop blur transition
    - Staggered link reveal
    - _Requirements: 2.4_

- [ ] 7. Build the cinematic hero section
  - [x] 7.1 Create CinematicHero component combining all effects


    - Integrate LightBeam at center


    - Add GradientMesh background
    - Add ParticleField layer
    - Use AnimatedHeadline for title
    - Use GlowButton for CTAs





    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_
  - [ ] 7.2 Update homepage to use CinematicHero
    - Replace existing HeroSection with CinematicHero
    - Ensure smooth integration with rest of page

    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ] 8. Enhance content sections
  - [ ] 8.1 Update featured cars section with TiltCards


    - Replace current cards with TiltCard component
    - Add staggered reveal animation
    - Add glow borders on hover

    - _Requirements: 3.2, 3.3_
  - [ ] 8.2 Update stats section with CountingNumber
    - Replace static numbers with CountingNumber


    - Trigger on viewport entry
    - Add appropriate suffixes
    - _Requirements: 3.4_
  - [ ] 8.3 Add scroll-triggered animations to sections
    - Fade-in with upward movement
    - Use intersection observer
    - _Requirements: 3.1_
  - [ ] 8.4 Add gradient transitions between sections
    - Smooth color transitions
    - Consistent dark theme
    - _Requirements: 6.2_

- [ ] 9. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Enhance gallery page
  - [ ] 10.1 Create color extraction utility function
    - Extract dominant color from image
    - Return valid CSS color string
    - _Requirements: 5.4_
  - [ ] 10.2 Write property test for color extraction
    - **Property 6: Color extraction returns valid color**
    - **Validates: Requirements 5.4**
  - [x] 10.3 Update gallery grid with parallax effect

    - Subtle parallax on scroll
    - Masonry-style layout adjustments
    - _Requirements: 5.1_

  - [ ] 10.4 Add hover overlay with glow border to gallery images
    - Show vehicle details on hover
    - Glowing border effect

    - _Requirements: 5.2_
  - [ ] 10.5 Enhance ImageModal with zoom transition and color-matched glow
    - Smooth zoom-in from thumbnail
    - Ambient glow using extracted dominant color

    - Backdrop blur
    - _Requirements: 5.3, 5.4_
  - [x] 10.6 Write property test for modal data integrity


    - **Property 5: Modal opens with correct image data**

    - **Validates: Requirements 5.3**


- [x] 11. Polish and finalize

  - [ ] 11.1 Update Footer with upward glow effect
    - Subtle glow creating visual separation
    - Consistent with overall theme

    - _Requirements: 6.3_
  - [ ] 11.2 Add reduced-motion support throughout
    - Check prefers-reduced-motion
    - Disable or simplify animations accordingly
    - _Requirements: 1.4, 3.1_
  - [ ] 11.3 Performance optimization pass
    - Audit will-change usage
    - Throttle scroll handlers
    - Optimize particle count for mobile
    - _Requirements: All_

- [ ] 12. Final Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
