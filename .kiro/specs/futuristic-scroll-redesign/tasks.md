# Implementation Plan

- [-] 1. Set up scroll utilities and hooks



  - [ ] 1.1 Create useScrollProgress hook for section-based progress calculation
    - Implement progress calculation (0-1) based on element position in viewport
    - Return progress, isInView, and scrollDirection
    - Use Framer Motion's useScroll with target element
    - _Requirements: 2.4_
  - [x] 1.2 Write property test for scroll progress calculation


    - **Property 1: Scroll progress calculation is bounded and monotonic**
    - **Validates: Requirements 2.4**
  - [ ] 1.3 Create useActiveSection hook for detecting visible section
    - Use Intersection Observer to track section visibility
    - Return index of most visible section
    - Support configurable threshold (default 50%)


    - _Requirements: 5.2_
  - [ ] 1.4 Write property test for active section detection
    - **Property 4: Active section detection returns valid index**
    - **Validates: Requirements 5.2**
  - [ ] 1.5 Create useParallax hook for parallax offset calculations
    - Calculate offset based on scroll position and speed multiplier
    - Return offset value and ready-to-use style object



    - Bound results within viewport limits

    - _Requirements: 4.4_
  - [x] 1.6 Write property test for parallax offset calculation

    - **Property 3: Parallax offset is proportional to scroll and bounded**
    - **Validates: Requirements 4.4**

- [ ] 2. Create navigation overlay components
  - [ ] 2.1 Create ScrollProgressBar component
    - Fixed position at top of viewport
    - Neon gradient with glow effect
    - Scale based on overall page scroll progress
    - _Requirements: 5.1_
  - [ ] 2.2 Create SectionIndicators component
    - Fixed vertical dots on right side of viewport
    - Highlight active section with glow
    - Show labels on hover
    - Click to smooth scroll to section
    - _Requirements: 5.2, 5.3, 5.4_

- [ ] 3. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Create scroll section wrapper components
  - [ ] 4.1 Create ScrollSection wrapper component
    - Apply scroll-snap-align: start



    - Support onEnter/onLeave callbacks via Intersection Observer

    - Support pinned mode with GSAP ScrollTrigger
    - _Requirements: 1.2, 1.3, 1.4_
  - [x] 4.2 Update stagger animation utility for section reveals

    - Calculate stagger delays for arrays of any length
    - Use 150ms default delay between items
    - _Requirements: 4.3_



  - [ ] 4.3 Write property test for stagger delay calculation
    - **Property 2: Stagger delay calculation is correct for any array length**
    - **Validates: Requirements 4.3**

- [ ] 5. Build the Hero scroll section
  - [ ] 5.1 Create HeroScrollSection component
    - Integrate existing ParticleField and GradientMesh
    - Add 3D animated title with character stagger
    - Implement parallax fade-out starting at 30% scroll
    - Scale down content as user scrolls
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [ ] 5.2 Add scroll indicator at bottom of hero
    - Animated bounce effect
    - Neon styling matching theme
    - _Requirements: 2.1_

- [ ] 6. Build the Vehicle showcase section
  - [ ] 6.1 Create VehicleCard3D component with 3D entrance animation
    - 3D rotation (rotateY: -90 to 0) on scroll entrance
    - Glow border that intensifies on hover
    - Display vehicle image and basic info
    - _Requirements: 3.1, 3.2_
  - [ ] 6.2 Implement counting number animation for vehicle specs
    - Animate from 0 to target value
    - Use requestAnimationFrame for smooth animation
    - Trigger when card enters viewport
    - _Requirements: 3.5_

  - [x] 6.3 Write property test for counting animation interpolation

    - **Property 6: Counting animation interpolates correctly**
    - **Validates: Requirements 3.5**
  - [ ] 6.4 Create VehicleShowcaseSection with staggered card reveals
    - Grid layout for vehicle cards

    - Staggered entrance animations (150ms delay)
    - Pass vehicle data to modal on click
    - _Requirements: 3.1, 3.2, 3.3_
  - [x] 6.5 Write property test for modal data integrity

    - **Property 5: Modal receives correct vehicle data**
    - **Validates: Requirements 3.4**
  - [ ] 6.6 Enhance VehicleDetailModal with zoom transition
    - Smooth zoom-in from card position

    - Display full vehicle details and specs

    - Neon-styled close button
    - _Requirements: 3.4_

- [x] 7. Checkpoint - Ensure all tests pass

  - Ensure all tests pass, ask the user if questions arise.

- [ ] 8. Build the Legacy/About section
  - [x] 8.1 Create LegacySection component structure


    - Timeline layout for brand history
    - Value cards grid
    - Parallax images
    - _Requirements: 4.1, 4.2, 4.3, 4.4_
  - [ ] 8.2 Implement timeline with sequential scroll reveals
    - Each timeline item reveals as user scrolls
    - Horizontal slide animation for content


    - Year markers with glow effect


    - _Requirements: 4.1, 4.2_
  - [ ] 8.3 Implement value cards with stagger animation
    - Cards reveal with staggered timing

    - Glow border on hover
    - Icon with neon glow
    - _Requirements: 4.3_

- [ ] 9. Build the Contact/Footer section
  - [ ] 9.1 Create ContactSection component
    - Contact info cards with glow borders
    - Final CTA button with neon styling
    - Social links with hover effects
    - _Requirements: 6.4_
  - [ ] 9.2 Style footer with futuristic theme
    - Dark background with gradient
    - Neon accent lines
    - Consistent with overall theme
    - _Requirements: 6.1, 6.2_

- [ ] 10. Assemble the single-page layout
  - [ ] 10.1 Create new unified page component
    - Stack all sections vertically
    - Apply scroll-snap container styles
    - Integrate ScrollProgressBar and SectionIndicators
    - _Requirements: 1.1, 1.2_
  - [ ] 10.2 Update app/page.tsx to use new single-page layout
    - Replace existing multi-page structure
    - Ensure smooth transitions between sections
    - _Requirements: 1.1, 1.3, 1.4_
  - [ ] 10.3 Add gradient transitions between sections
    - Smooth color blending at section boundaries
    - Consistent dark theme throughout
    - _Requirements: 6.2_

- [ ] 11. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 12. Add reduced motion support
  - [ ] 12.1 Enhance useReducedMotion hook
    - Detect prefers-reduced-motion media query
    - Return boolean for preference state
    - _Requirements: 7.1_
  - [ ] 12.2 Write property test for reduced motion detection
    - **Property 7: Reduced motion hook returns correct preference**
    - **Validates: Requirements 7.1**
  - [ ] 12.3 Apply reduced motion throughout components
    - Disable scroll animations when preferred
    - Use instant transitions instead of animated
    - Ensure content visibility without animations
    - _Requirements: 7.1, 7.2, 7.3_
  - [ ] 12.4 Write property test for animation duration with reduced motion
    - **Property 8: Animation duration respects reduced motion**
    - **Validates: Requirements 7.2**

- [ ] 13. Polish and optimize
  - [ ] 13.1 Performance optimization pass
    - Throttle scroll handlers to 60fps
    - Audit will-change usage
    - Optimize particle count for mobile
    - _Requirements: All_
  - [ ] 13.2 Add hover glow effects to interactive elements
    - Buttons, cards, and links
    - Consistent neon styling
    - _Requirements: 6.3_
  - [ ] 13.3 Final visual polish
    - Ensure consistent spacing
    - Verify responsive behavior
    - Test on multiple browsers
    - _Requirements: All_

- [ ] 14. Final Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

