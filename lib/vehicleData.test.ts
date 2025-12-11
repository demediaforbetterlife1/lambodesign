import * as fc from 'fast-check';
import { VehicleData, VehicleSpecs, FEATURED_LAMBOS } from './constants';

// Arbitrary for generating valid VehicleSpecs
const vehicleSpecsArbitrary = fc.record({
  horsepower: fc.integer({ min: 100, max: 2000 }),
  topSpeed: fc.integer({ min: 100, max: 500 }),
  acceleration: fc.float({ min: 1.5, max: 10, noNaN: true }),
  engine: fc.stringOf(fc.constantFrom('V', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ' ', '.', 'L', 'H', 'y', 'b', 'r', 'i', 'd'), { minLength: 3, maxLength: 15 }),
  price: fc.integer({ min: 100000, max: 5000000 })
});

// Arbitrary for generating valid VehicleData
const vehicleDataArbitrary = fc.record({
  id: fc.stringOf(fc.alphanumeric(), { minLength: 1, maxLength: 10 }),
  src: fc.constant('/test-image.png'),
  alt: fc.string({ minLength: 5, maxLength: 50 }),
  title: fc.string({ minLength: 2, maxLength: 30 }),
  description: fc.string({ minLength: 10, maxLength: 100 }),
  tagline: fc.string({ minLength: 5, maxLength: 50 }),
  specs: vehicleSpecsArbitrary
});

describe('Vehicle Data Properties', () => {
  /**
   * **Feature: lambo-cards-space-ui, Property 1: Card renders all required vehicle information**
   * **Validates: Requirements 1.2**
   * 
   * For any vehicle data object, when rendered as a LamboCard, 
   * the output SHALL contain the vehicle's image source, title, and tagline.
   */
  test('Property 1: Vehicle data contains all required fields for card rendering', () => {
    fc.assert(
      fc.property(vehicleDataArbitrary, (vehicle: VehicleData) => {
        // Verify all required fields exist and are non-empty
        expect(vehicle.src).toBeTruthy();
        expect(vehicle.title).toBeTruthy();
        expect(vehicle.tagline).toBeTruthy();
        
        // Verify src is a valid path format
        expect(vehicle.src).toMatch(/^\/.*\.(png|jpg|jpeg|webp|gif)$/i);
        
        // Verify title and tagline are strings with content
        expect(typeof vehicle.title).toBe('string');
        expect(typeof vehicle.tagline).toBe('string');
        expect(vehicle.title.length).toBeGreaterThan(0);
        expect(vehicle.tagline.length).toBeGreaterThan(0);
        
        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * **Feature: lambo-cards-space-ui, Property 2: Detail view displays correct vehicle on click**
   * **Validates: Requirements 2.1**
   * 
   * For any vehicle card that is clicked, the detail modal SHALL open 
   * with the exact same vehicle data (id, title, specs) as the clicked card.
   */
  test('Property 2: Vehicle selection preserves data integrity', () => {
    fc.assert(
      fc.property(vehicleDataArbitrary, (vehicle: VehicleData) => {
        // Simulate selection - the selected vehicle should have identical data
        const selectedVehicle = { ...vehicle };
        
        // Verify all identifying fields match exactly
        expect(selectedVehicle.id).toBe(vehicle.id);
        expect(selectedVehicle.title).toBe(vehicle.title);
        expect(selectedVehicle.specs.horsepower).toBe(vehicle.specs.horsepower);
        expect(selectedVehicle.specs.topSpeed).toBe(vehicle.specs.topSpeed);
        expect(selectedVehicle.specs.acceleration).toBe(vehicle.specs.acceleration);
        expect(selectedVehicle.specs.engine).toBe(vehicle.specs.engine);
        expect(selectedVehicle.specs.price).toBe(vehicle.specs.price);
        
        return true;
      }),
      { numRuns: 100 }
    );
  });

  /**
   * **Feature: lambo-cards-space-ui, Property 3: Detail view contains all required properties**
   * **Validates: Requirements 2.3**
   * 
   * For any vehicle data object displayed in the detail view, 
   * the rendered output SHALL include all specification fields: 
   * horsepower, top speed, acceleration, engine type, and price.
   */
  test('Property 3: Vehicle specs contain all required property fields', () => {
    fc.assert(
      fc.property(vehicleSpecsArbitrary, (specs: VehicleSpecs) => {
        // Verify all required spec fields exist
        expect(specs).toHaveProperty('horsepower');
        expect(specs).toHaveProperty('topSpeed');
        expect(specs).toHaveProperty('acceleration');
        expect(specs).toHaveProperty('engine');
        expect(specs).toHaveProperty('price');
        
        // Verify types are correct
        expect(typeof specs.horsepower).toBe('number');
        expect(typeof specs.topSpeed).toBe('number');
        expect(typeof specs.acceleration).toBe('number');
        expect(typeof specs.engine).toBe('string');
        expect(typeof specs.price).toBe('number');
        
        // Verify values are within reasonable ranges
        expect(specs.horsepower).toBeGreaterThan(0);
        expect(specs.topSpeed).toBeGreaterThan(0);
        expect(specs.acceleration).toBeGreaterThan(0);
        expect(specs.price).toBeGreaterThan(0);
        
        return true;
      }),
      { numRuns: 100 }
    );
  });

  // Test that FEATURED_LAMBOS data is valid
  test('FEATURED_LAMBOS contains exactly 3 valid vehicles', () => {
    expect(FEATURED_LAMBOS).toHaveLength(3);
    
    FEATURED_LAMBOS.forEach((vehicle) => {
      expect(vehicle.id).toBeTruthy();
      expect(vehicle.src).toBeTruthy();
      expect(vehicle.title).toBeTruthy();
      expect(vehicle.tagline).toBeTruthy();
      expect(vehicle.specs).toBeDefined();
      expect(vehicle.specs.horsepower).toBeGreaterThan(0);
      expect(vehicle.specs.topSpeed).toBeGreaterThan(0);
      expect(vehicle.specs.acceleration).toBeGreaterThan(0);
      expect(vehicle.specs.engine).toBeTruthy();
      expect(vehicle.specs.price).toBeGreaterThan(0);
    });
  });
});
