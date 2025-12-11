import * as fc from 'fast-check';
import { 
  interpolateCount, 
  calculateStaggerDelay, 
  calculateMagneticOffset,
  getNavScrollState 
} from './constants';

describe('interpolateCount', () => {
  /**
   * Feature: next-level-redesign, Property 3: Counting animation interpolates correctly
   * Validates: Requirements 3.4
   * 
   * For any target number value and animation progress (0-1), the counting function 
   * SHALL return a value that starts at 0 when progress is 0 and reaches the exact 
   * target value when progress is 1, with monotonically increasing values in between.
   */
  it('should return 0 when progress is 0', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 10000 }),
        (target) => {
          const result = interpolateCount(0, target);
          return result === 0;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should return exact target when progress is 1', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 10000 }),
        (target) => {
          const result = interpolateCount(1, target);
          return result === target;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should return values between 0 and target for progress between 0 and 1', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 10000 }),
        fc.float({ min: 0.01, max: 0.99, noNaN: true }),
        (target, progress) => {
          const result = interpolateCount(progress, target);
          return result >= 0 && result <= target;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should produce monotonically increasing values as progress increases', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 10, max: 10000 }),
        fc.float({ min: 0, max: 0.5, noNaN: true }),
        fc.float({ min: 0.01, max: 0.49, noNaN: true }),
        (target, progress1, delta) => {
          const progress2 = progress1 + delta;
          const result1 = interpolateCount(progress1, target);
          const result2 = interpolateCount(progress2, target);
          return result2 >= result1;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should handle edge cases with progress outside 0-1 range', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 10000 }),
        fc.float({ min: -10, max: 0, noNaN: true }),
        (target, negativeProgress) => {
          const result = interpolateCount(negativeProgress, target);
          return result === 0;
        }
      ),
      { numRuns: 100 }
    );

    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 10000 }),
        fc.float({ min: 1, max: 10, noNaN: true }),
        (target, overProgress) => {
          const result = interpolateCount(overProgress, target);
          return result === target;
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('calculateStaggerDelay', () => {
  /**
   * Feature: next-level-redesign, Property 2: Stagger delay calculation is correct
   * Validates: Requirements 3.2
   * 
   * For any array of items with length N, the stagger animation delay for item 
   * at index i SHALL equal i * staggerDelay (100ms), ensuring consistent timing 
   * across any number of items.
   */
  it('should return index * baseDelay for any index', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 100 }),
        fc.integer({ min: 1, max: 500 }),
        (index, baseDelay) => {
          const result = calculateStaggerDelay(index, baseDelay);
          return result === index * baseDelay;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should return 0 for index 0', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 500 }),
        (baseDelay) => {
          const result = calculateStaggerDelay(0, baseDelay);
          return result === 0;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should use default baseDelay of 100 when not specified', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 100 }),
        (index) => {
          const result = calculateStaggerDelay(index);
          return result === index * 100;
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('calculateMagneticOffset', () => {
  /**
   * Feature: next-level-redesign, Property 4: Magnetic offset calculation is bounded
   * Validates: Requirements 4.1
   * 
   * For any cursor position relative to an element's bounds, the magnetic offset 
   * calculation SHALL return x and y values that are proportional to the cursor 
   * distance from center and bounded by a maximum offset value.
   */
  it('should return bounded offset values', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 2000 }),
        fc.integer({ min: 0, max: 2000 }),
        fc.record({
          left: fc.integer({ min: 0, max: 1000 }),
          top: fc.integer({ min: 0, max: 1000 }),
          width: fc.integer({ min: 50, max: 500 }),
          height: fc.integer({ min: 50, max: 500 })
        }),
        fc.float({ min: 0.1, max: 0.5, noNaN: true }),
        (cursorX, cursorY, rect, maxOffset) => {
          const result = calculateMagneticOffset(cursorX, cursorY, rect, maxOffset);
          const maxX = maxOffset * rect.width;
          const maxY = maxOffset * rect.height;
          return Math.abs(result.x) <= maxX && Math.abs(result.y) <= maxY;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should return zero offset when cursor is at element center', () => {
    fc.assert(
      fc.property(
        fc.record({
          left: fc.integer({ min: 0, max: 1000 }),
          top: fc.integer({ min: 0, max: 1000 }),
          width: fc.integer({ min: 50, max: 500 }),
          height: fc.integer({ min: 50, max: 500 })
        }),
        (rect) => {
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const result = calculateMagneticOffset(centerX, centerY, rect);
          return result.x === 0 && result.y === 0;
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('getNavScrollState', () => {
  /**
   * Feature: next-level-redesign, Property 1: Navigation scroll state transitions correctly
   * Validates: Requirements 2.3
   * 
   * For any scroll position value, when the scroll position exceeds the threshold (100px), 
   * the navigation state SHALL transition to compact mode with increased opacity, and when 
   * below the threshold, it SHALL return to the default expanded state.
   */
  it('should return compact state when scrolled past threshold', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 101, max: 10000 }),
        fc.integer({ min: 1, max: 100 }),
        (scrollY, threshold) => {
          const result = getNavScrollState(scrollY, threshold);
          return result.isScrolled === true && 
                 result.isCompact === true && 
                 result.opacity === 0.95;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should return expanded state when below threshold', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 99 }),
        (scrollY) => {
          const result = getNavScrollState(scrollY, 100);
          return result.isScrolled === false && 
                 result.isCompact === false && 
                 result.opacity === 0.3;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should use default threshold of 100 when not specified', () => {
    const belowThreshold = getNavScrollState(50);
    const aboveThreshold = getNavScrollState(150);
    
    expect(belowThreshold.isScrolled).toBe(false);
    expect(aboveThreshold.isScrolled).toBe(true);
  });
});
