/**
 * Color extraction utility for extracting dominant colors from images
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

/**
 * Converts RGB values to a hex color string
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.max(0, Math.min(255, Math.round(n))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Converts RGB values to an rgba color string
 */
export function rgbToRgba(r: number, g: number, b: number, alpha: number = 1): string {
  return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${alpha})`;
}

/**
 * Validates if a string is a valid CSS color
 */
export function isValidCssColor(color: string): boolean {
  // Check hex format
  if (/^#[0-9A-Fa-f]{6}$/.test(color)) return true;
  // Check rgb format
  if (/^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/.test(color)) return true;
  // Check rgba format
  if (/^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)$/.test(color)) return true;
  return false;
}

/**
 * Extracts the dominant color from an image element
 * Returns a valid CSS color string (hex format)
 */
export async function extractDominantColor(imageSrc: string): Promise<string> {
  return new Promise((resolve) => {
    // Default fallback color (gold)
    const fallbackColor = '#D4AF37';
    
    if (typeof window === 'undefined') {
      resolve(fallbackColor);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          resolve(fallbackColor);
          return;
        }

        // Use a small sample size for performance
        const sampleSize = 50;
        canvas.width = sampleSize;
        canvas.height = sampleSize;
        
        ctx.drawImage(img, 0, 0, sampleSize, sampleSize);
        
        const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize);
        const data = imageData.data;
        
        // Calculate average color
        let r = 0, g = 0, b = 0;
        let count = 0;
        
        for (let i = 0; i < data.length; i += 4) {
          // Skip very dark or very light pixels
          const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
          if (brightness > 30 && brightness < 225) {
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
            count++;
          }
        }
        
        if (count === 0) {
          resolve(fallbackColor);
          return;
        }
        
        r = Math.round(r / count);
        g = Math.round(g / count);
        b = Math.round(b / count);
        
        // Boost saturation slightly for more vibrant glow
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const saturationBoost = 1.2;
        
        if (max !== min) {
          const mid = (max + min) / 2;
          r = Math.min(255, mid + (r - mid) * saturationBoost);
          g = Math.min(255, mid + (g - mid) * saturationBoost);
          b = Math.min(255, mid + (b - mid) * saturationBoost);
        }
        
        const hexColor = rgbToHex(r, g, b);
        resolve(hexColor);
      } catch {
        resolve(fallbackColor);
      }
    };
    
    img.onerror = () => {
      resolve(fallbackColor);
    };
    
    img.src = imageSrc;
  });
}

/**
 * Creates a glow color from a base color with specified opacity
 */
export function createGlowColor(hexColor: string, opacity: number = 0.5): string {
  // Parse hex color
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return rgbToRgba(r, g, b, opacity);
}
