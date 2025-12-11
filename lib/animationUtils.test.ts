/**
 * Property-Based Tests for Animation Utilities
 * Using fast-check for comprehensive testing
 */
import * as fc from 'fast-check';
import {
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
} from './animationUtils';

describe('Animation Utilities - Property Based Tests', () => {
  /**
   * Feature: amazing-animations, Property 1: Reveal animation direction produces correct transform
   * Validates: Requirements 1.1
   */
  describe('getRevealTransform', () => {
    it('should produce correct axis for vertical directions (up/down)', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('up', 'down') as fc.Arbitrary<'up' | 'down'>,
          fc.float({ min: 1, max: 500, noNaN: true }),
          (direction, distance) => {
            const result = getRevealTransform(direction, distance);
            expect(result.axis).toBe('y');
            expect(result.x).toBe(0);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should produce correct axis for horizontal directions (left/right)', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('left', 'right') as fc.Arbitrary<'left' | 'right'>,
          fc.float({ min: 1, max: 500, noNaN: true }),
          (direction, distance) => {
            const result = getRevealTransform(direction, distance);
            expect(result.axis).toBe('x');
            expect(result.y).toBe(0);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should produce positive Y for up direction (element starts below)', () => {
      fc.assert(
        fc.property(fc.float({ min: 1, max: 500, noNaN: true }), (distance) => {
          const result = getRevealTransform('up', distance);
          expect(result.y).toBe(distance);
          expect(result.y).toBeGreaterThan(0);
        }),
        { numRuns: 100 }
      );
    });

    it('should produce negative Y for down direction (element starts above)', () => {
      fc.assert(
        fc.property(fc.float({ min: 1, max: 500, noNaN: true }), (distance) => {
          const result = getRevealTransform('down', distance);
          expect(result.y).toBe(-distance);
          expect(result.y).toBeLessThan(0);
        }),
        { numRuns: 100 }
      );
    });

    it('should produce positive X for left direction (element starts right)', () => {
      fc.assert(
        fc.property(fc.float({ min: 1, max: 500, noNaN: true }), (distance) => {
          const result = getRevealTransform('left', distance);
          expect(result.x).toBe(distance);
          expect(result.x).toBeGreaterThan(0);
        }),
        { numRuns: 100 }
      );
    });

    it('should produce negative X for right direction (element starts left)', () => {
      fc.assert(
        fc.property(fc.float({ min: 1, max: 500, noNaN: true }), (distance) => {
          const result = getRevealTransform('right', distance);
          expect(result.x).toBe(-distance);
          expect(result.x).toBeLessThan(0);
        }),
        { numRuns: 100 }
      );
    });
  });

  /**
   * Feature: amazing-animations, Property 2: Stagger delay calculation is linear
   * Validates: Requirements 1.2
   */
  describe('calculateStaggerDelay', () => {
    it('should return index * baseDelay for any index and delay', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: 100 }),
          fc.integer({ min: 1, max: 500 }),
          (index, baseDelay) => {
            const result = calculateStaggerDelay(index, baseDelay);
            expect(result).toBe(index * baseDelay);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return 0 for index 0', () => {
      fc.assert(
        fc.property(fc.integer({ min: 1, max: 500 }), (baseDelay) => {
          const result = calculateStaggerDelay(0, baseDelay);
          expect(result).toBe(0);
        }),
        { numRuns: 100 }
      );
    });

    it('should be monotonically increasing with index', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: 99 }),
          fc.integer({ min: 1, max: 500 }),
          (index, baseDelay) => {
            const current = calculateStaggerDelay(index, baseDelay);
            const next = calculateStaggerDelay(index + 1, baseDelay);
            expect(next).toBeGreaterThan(current);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * Feature: amazing-animations, Property 3: Parallax offset is proportional to scroll and speed
   * Validates: Requirements 1.3
   */
  describe('calculateParallaxOffset', () => {
    it('should return scrollPosition * speed', () => {
      fc.assert(
        fc.property(
          fc.float({ min: 0, max: 10000, noNaN: true }),
          fc.float({ min: 0.1, max: 2, noNaN: true }),
          (scrollPosition, speed) => {
            const result = calculateParallaxOffset(scrollPosition, speed);
            expect(result).toBeCloseTo(scrollPosition * speed, 5);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return 0 when scroll is 0', () => {
      fc.assert(
        fc.property(fc.float({ min: 0.1, max: 2, noNaN: true }), (speed) => {
          const result = calculateParallaxOffset(0, speed);
          expect(result).toBe(0);
        }),
        { numRuns: 100 }
      );
    });
  });


  /**
   * Feature: amazing-animations, Property 5: Scale interpolation is bounded and monotonic
   * Validates: Requirements 1.5
   */
  describe('interpolateScale', () => {
    it('should return value between from and to for any progress in [0,1]', () => {
      fc.assert(
        fc.property(
          fc.float({ min: 0, max: 1, noNaN: true }),
          fc.float({ min: 0.1, max: 0.9, noNaN: true }),
          fc.float({ min: 0.91, max: 2, noNaN: true }),
          (progress, from, to) => {
            const result = interpolateScale(progress, from, to);
            expect(result).toBeGreaterThanOrEqual(from);
            expect(result).toBeLessThanOrEqual(to);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return from when progress is 0', () => {
      fc.assert(
        fc.property(
          fc.float({ min: 0.1, max: 0.9, noNaN: true }),
          fc.float({ min: 0.91, max: 2, noNaN: true }),
          (from, to) => {
            const result = interpolateScale(0, from, to);
            expect(result).toBeCloseTo(from, 5);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return to when progress is 1', () => {
      fc.assert(
        fc.property(
          fc.float({ min: 0.1, max: 0.9, noNaN: true }),
          fc.float({ min: 0.91, max: 2, noNaN: true }),
          (from, to) => {
            const result = interpolateScale(1, from, to);
            expect(result).toBeCloseTo(to, 5);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should be monotonically increasing as progress increases', () => {
      fc.assert(
        fc.property(
          fc.float({ min: 0, max: 0.9, noNaN: true }),
          fc.float({ min: 0.1, max: 0.9, noNaN: true }),
          fc.float({ min: 0.91, max: 2, noNaN: true }),
          (progress1, from, to) => {
            const progress2 = Math.min(progress1 + 0.1, 1);
            const result1 = interpolateScale(progress1, from, to);
            const result2 = interpolateScale(progress2, from, to);
            expect(result2).toBeGreaterThanOrEqual(result1);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should clamp progress values outside [0,1]', () => {
      fc.assert(
        fc.property(
          fc.float({ min: -10, max: -0.01, noNaN: true }),
          (negativeProgress) => {
            const result = interpolateScale(negativeProgress, 0.8, 1.0);
            expect(result).toBeCloseTo(0.8, 5);
          }
        ),
        { numRuns: 100 }
      );

      fc.assert(
        fc.property(
          fc.float({ min: 1.01, max: 10, noNaN: true }),
          (overProgress) => {
            const result = interpolateScale(overProgress, 0.8, 1.0);
            expect(result).toBeCloseTo(1.0, 5);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * Feature: amazing-animations, Property 6: Scroll progress is normalized between 0 and 1
   * Validates: Requirements 3.1
   */
  describe('calculateScrollProgress', () => {
    it('should return value between 0 and 1 for any valid inputs', () => {
      fc.assert(
        fc.property(
          fc.float({ min: 0, max: 10000, noNaN: true }),
          fc.float({ min: 1000, max: 20000, noNaN: true }),
          fc.float({ min: 100, max: 999, noNaN: true }),
          (scrollY, docHeight, viewportHeight) => {
            const result = calculateScrollProgress(scrollY, docHeight, viewportHeight);
            expect(result).toBeGreaterThanOrEqual(0);
            expect(result).toBeLessThanOrEqual(1);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return 0 when scrollY is 0', () => {
      fc.assert(
        fc.property(
          fc.float({ min: 1000, max: 20000, noNaN: true }),
          fc.float({ min: 100, max: 999, noNaN: true }),
          (docHeight, viewportHeight) => {
            const result = calculateScrollProgress(0, docHeight, viewportHeight);
            expect(result).toBe(0);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return 1 when scrolled to bottom', () => {
      fc.assert(
        fc.property(
          fc.float({ min: 1000, max: 20000, noNaN: true }),
          fc.float({ min: 100, max: 999, noNaN: true }),
          (docHeight, viewportHeight) => {
            const maxScroll = docHeight - viewportHeight;
            const result = calculateScrollProgress(maxScroll, docHeight, viewportHeight);
            expect(result).toBeCloseTo(1, 5);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * Feature: amazing-animations, Property 7: Hero fade opacity interpolation is correct
   * Validates: Requirements 3.2
   */
  describe('calculateHeroFadeOpacity', () => {
    it('should return 1 when progress is at fadeStart', () => {
      fc.assert(
        fc.property(
          fc.float({ min: 0, max: 0.3, noNaN: true }),
          fc.float({ min: 0.4, max: 1, noNaN: true }),
          (fadeStart, fadeEnd) => {
            const result = calculateHeroFadeOpacity(fadeStart, fadeStart, fadeEnd);
            expect(result).toBeCloseTo(1, 5);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return 0 when progress is at fadeEnd', () => {
      fc.assert(
        fc.property(
          fc.float({ min: 0, max: 0.3, noNaN: true }),
          fc.float({ min: 0.4, max: 1, noNaN: true }),
          (fadeStart, fadeEnd) => {
            const result = calculateHeroFadeOpacity(fadeEnd, fadeStart, fadeEnd);
            expect(result).toBeCloseTo(0, 5);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return value between 0 and 1 for progress between fadeStart and fadeEnd', () => {
      fc.assert(
        fc.property(
          fc.float({ min: 0, max: 0.2, noNaN: true }),
          fc.float({ min: 0.5, max: 1, noNaN: true }),
          (fadeStart, fadeEnd) => {
            const midProgress = (fadeStart + fadeEnd) / 2;
            const result = calculateHeroFadeOpacity(midProgress, fadeStart, fadeEnd);
            expect(result).toBeGreaterThanOrEqual(0);
            expect(result).toBeLessThanOrEqual(1);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should follow formula: 1 - (progress * 2) for default fadeStart=0, fadeEnd=0.5', () => {
      fc.assert(
        fc.property(fc.float({ min: 0, max: 0.5, noNaN: true }), (progress) => {
          const result = calculateHeroFadeOpacity(progress, 0, 0.5);
          const expected = 1 - progress * 2;
          expect(result).toBeCloseTo(expected, 5);
        }),
        { numRuns: 100 }
      );
    });
  });


  /**
   * Feature: amazing-animations, Property 8: Tilt rotation is bounded by maximum
   * Validates: Requirements 4.1
   */
  describe('calculateTiltRotation', () => {
    it('should return rotations bounded by maxRotation', () => {
      fc.assert(
        fc.property(
          fc.float({ min: -1000, max: 1000, noNaN: true }),
          fc.float({ min: -1000, max: 1000, noNaN: true }),
          fc.float({ min: 0, max: 500, noNaN: true }),
          fc.float({ min: 0, max: 500, noNaN: true }),
          fc.float({ min: 50, max: 500, noNaN: true }),
          fc.float({ min: 50, max: 500, noNaN: true }),
          fc.float({ min: 1, max: 45, noNaN: true }),
          (cursorX, cursorY, centerX, centerY, width, height, maxRotation) => {
            const result = calculateTiltRotation(
              cursorX, cursorY, centerX, centerY, width, height, maxRotation
            );
            expect(Math.abs(result.rotateX)).toBeLessThanOrEqual(maxRotation);
            expect(Math.abs(result.rotateY)).toBeLessThanOrEqual(maxRotation);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return 0 rotation when cursor is at center', () => {
      fc.assert(
        fc.property(
          fc.float({ min: 0, max: 500, noNaN: true }),
          fc.float({ min: 0, max: 500, noNaN: true }),
          fc.float({ min: 50, max: 500, noNaN: true }),
          fc.float({ min: 50, max: 500, noNaN: true }),
          (centerX, centerY, width, height) => {
            const result = calculateTiltRotation(
              centerX, centerY, centerX, centerY, width, height, 15
            );
            expect(result.rotateX).toBeCloseTo(0, 5);
            expect(result.rotateY).toBeCloseTo(0, 5);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should use default maxRotation of 15 degrees', () => {
      const result = calculateTiltRotation(1000, 1000, 0, 0, 100, 100);
      expect(Math.abs(result.rotateX)).toBeLessThanOrEqual(15);
      expect(Math.abs(result.rotateY)).toBeLessThanOrEqual(15);
    });
  });

  /**
   * Feature: amazing-animations, Property 9: Magnetic offset is bounded by maximum distance
   * Validates: Requirements 4.2
   */
  describe('calculateMagneticOffset', () => {
    it('should return offset with magnitude bounded by maxDistance', () => {
      fc.assert(
        fc.property(
          fc.float({ min: -1000, max: 1000, noNaN: true }),
          fc.float({ min: -1000, max: 1000, noNaN: true }),
          fc.float({ min: 0, max: 500, noNaN: true }),
          fc.float({ min: 0, max: 500, noNaN: true }),
          fc.float({ min: 1, max: 100, noNaN: true }),
          fc.float({ min: 0.1, max: 1, noNaN: true }),
          (cursorX, cursorY, elementX, elementY, maxDistance, strength) => {
            const result = calculateMagneticOffset(
              cursorX, cursorY, elementX, elementY, maxDistance, strength
            );
            const magnitude = Math.sqrt(result.x * result.x + result.y * result.y);
            expect(magnitude).toBeLessThanOrEqual(maxDistance + 0.0001); // Small epsilon for floating point
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return 0 offset when cursor is at element center', () => {
      fc.assert(
        fc.property(
          fc.float({ min: 0, max: 500, noNaN: true }),
          fc.float({ min: 0, max: 500, noNaN: true }),
          (elementX, elementY) => {
            const result = calculateMagneticOffset(elementX, elementY, elementX, elementY, 20, 0.5);
            expect(result.x).toBeCloseTo(0, 5);
            expect(result.y).toBeCloseTo(0, 5);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should use default maxDistance of 20px', () => {
      const result = calculateMagneticOffset(1000, 1000, 0, 0);
      const magnitude = Math.sqrt(result.x * result.x + result.y * result.y);
      expect(magnitude).toBeLessThanOrEqual(20 + 0.0001);
    });
  });

  /**
   * Feature: amazing-animations, Property 10: Counting animation interpolates correctly
   * Validates: Requirements 5.3
   */
  describe('interpolateCount', () => {
    it('should return 0 when progress is 0', () => {
      fc.assert(
        fc.property(fc.float({ min: 1, max: 10000, noNaN: true }), (target) => {
          const result = interpolateCount(0, target);
          expect(result).toBeCloseTo(0, 5);
        }),
        { numRuns: 100 }
      );
    });

    it('should return target when progress is 1', () => {
      fc.assert(
        fc.property(fc.float({ min: 1, max: 10000, noNaN: true }), (target) => {
          const result = interpolateCount(1, target);
          expect(result).toBeCloseTo(target, 5);
        }),
        { numRuns: 100 }
      );
    });

    it('should return value between 0 and target for progress in (0,1)', () => {
      fc.assert(
        fc.property(
          fc.float({ min: 0.01, max: 0.99, noNaN: true }),
          fc.float({ min: 1, max: 10000, noNaN: true }),
          (progress, target) => {
            const result = interpolateCount(progress, target);
            expect(result).toBeGreaterThanOrEqual(0);
            expect(result).toBeLessThanOrEqual(target);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should be monotonically increasing with linear easing', () => {
      fc.assert(
        fc.property(
          fc.float({ min: 0, max: 0.9, noNaN: true }),
          fc.float({ min: 1, max: 10000, noNaN: true }),
          (progress1, target) => {
            const progress2 = Math.min(progress1 + 0.1, 1);
            const result1 = interpolateCount(progress1, target, 'linear');
            const result2 = interpolateCount(progress2, target, 'linear');
            expect(result2).toBeGreaterThanOrEqual(result1);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * Feature: amazing-animations, Property 11: Random delay is within bounds
   * Validates: Requirements 5.4
   */
  describe('generateRandomDelay', () => {
    it('should return value between 0 and maxDelay', () => {
      fc.assert(
        fc.property(fc.float({ min: 1, max: 1000, noNaN: true }), (maxDelay) => {
          // Run multiple times since it's random
          for (let i = 0; i < 10; i++) {
            const result = generateRandomDelay(maxDelay);
            expect(result).toBeGreaterThanOrEqual(0);
            expect(result).toBeLessThanOrEqual(maxDelay);
          }
        }),
        { numRuns: 100 }
      );
    });

    it('should use default maxDelay of 300ms', () => {
      for (let i = 0; i < 100; i++) {
        const result = generateRandomDelay();
        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThanOrEqual(300);
      }
    });
  });

  /**
   * Feature: amazing-animations, Property 4: Text splitting produces correct element count
   * Validates: Requirements 1.4
   */
  describe('splitText', () => {
    it('should produce exactly text.length elements when splitting by character', () => {
      fc.assert(
        fc.property(fc.string({ minLength: 1, maxLength: 100 }), (text) => {
          const result = splitText(text, 'character');
          expect(result.length).toBe(text.length);
        }),
        { numRuns: 100 }
      );
    });

    it('should produce correct word count when splitting by word', () => {
      fc.assert(
        fc.property(
          fc.array(fc.string({ minLength: 1, maxLength: 10 }), { minLength: 1, maxLength: 20 }),
          (words) => {
            const text = words.join(' ');
            const result = splitText(text, 'word');
            expect(result.length).toBe(words.length);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return empty array for empty string in character mode', () => {
      const result = splitText('', 'character');
      expect(result).toEqual(['']);
    });

    it('should return empty array for whitespace-only string in word mode', () => {
      const result = splitText('   ', 'word');
      expect(result.length).toBe(0);
    });
  });
});
