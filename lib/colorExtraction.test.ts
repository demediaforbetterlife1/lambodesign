import * as fc from 'fast-check';
import { rgbToHex, rgbToRgba, isValidCssColor, createGlowColor } from './colorExtraction';

describe('rgbToHex', () => {
  /**
   * Feature: next-level-redesign, Property 6: Color extraction returns valid color
   * Validates: Requirements 5.4
   * 
   * For any image data input, the color extraction function SHALL return a valid 
   * CSS color string (hex format #RRGGBB or rgb format) that can be used for styling.
   */
  it('should return valid hex color for any RGB values', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 255 }),
        fc.integer({ min: 0, max: 255 }),
        fc.integer({ min: 0, max: 255 }),
        (r, g, b) => {
          const result = rgbToHex(r, g, b);
          return isValidCssColor(result);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should return hex string starting with #', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 255 }),
        fc.integer({ min: 0, max: 255 }),
        fc.integer({ min: 0, max: 255 }),
        (r, g, b) => {
          const result = rgbToHex(r, g, b);
          return result.startsWith('#') && result.length === 7;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should clamp values outside 0-255 range', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: -100, max: 400 }),
        fc.integer({ min: -100, max: 400 }),
        fc.integer({ min: -100, max: 400 }),
        (r, g, b) => {
          const result = rgbToHex(r, g, b);
          return isValidCssColor(result);
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('rgbToRgba', () => {
  it('should return valid rgba color for any RGB values and alpha', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 255 }),
        fc.integer({ min: 0, max: 255 }),
        fc.integer({ min: 0, max: 255 }),
        fc.float({ min: 0, max: 1, noNaN: true }),
        (r, g, b, a) => {
          const result = rgbToRgba(r, g, b, a);
          return isValidCssColor(result);
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('isValidCssColor', () => {
  it('should validate correct hex colors', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 6, maxLength: 6 }).filter((s: string) => /^[0-9A-Fa-f]{6}$/.test(s)),
        (hex: string) => {
          const color = `#${hex}`;
          return isValidCssColor(color) === true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should reject invalid color formats', () => {
    const invalidColors = [
      'red',
      '#fff',
      '#12345',
      'rgb(256, 0, 0)',
      'hsl(0, 100%, 50%)',
      'invalid'
    ];
    
    invalidColors.forEach(color => {
      expect(isValidCssColor(color)).toBe(false);
    });
  });
});

describe('createGlowColor', () => {
  it('should return valid rgba color for any hex input', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 255 }),
        fc.integer({ min: 0, max: 255 }),
        fc.integer({ min: 0, max: 255 }),
        fc.float({ min: 0, max: 1, noNaN: true }),
        (r, g, b, opacity) => {
          const hexColor = rgbToHex(r, g, b);
          const result = createGlowColor(hexColor, opacity);
          return isValidCssColor(result);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('should use default opacity of 0.5 when not specified', () => {
    const result = createGlowColor('#D4AF37');
    expect(result).toContain('0.5');
  });
});
