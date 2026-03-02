import { calculateDistance } from '../../src/utils/distance';

describe('Distance Utility', () => {
    it('should calculate the correct distance between two known points', () => {
        // Bangalore to Mumbai
        const lat1 = 12.9716;
        const lon1 = 77.5946;
        const lat2 = 19.0760;
        const lon2 = 72.8777;

        const distance = calculateDistance(lat1, lon1, lat2, lon2);
        // distance should be approx 845 km
        expect(distance).toBeGreaterThan(800);
        expect(distance).toBeLessThan(900);
    });
});
