export interface TransportStrategy {
    calculateRatePerKg(distance: number): number;
}

export class MiniVanStrategy implements TransportStrategy {
    calculateRatePerKg(distance: number): number {
        // 0–100 km -> ₹3 per km per kg
        return 3 * distance;
    }
}

export class TruckStrategy implements TransportStrategy {
    calculateRatePerKg(distance: number): number {
        // 100–500 km -> ₹2 per km per kg
        return 2 * distance;
    }
}

export class AeroplaneStrategy implements TransportStrategy {
    calculateRatePerKg(distance: number): number {
        // 500+ km -> ₹1 per km per kg
        return 1 * distance;
    }
}

export class TransportStrategyContext {
    static getStrategy(distance: number): TransportStrategy {
        if (distance <= 100) {
            return new MiniVanStrategy();
        } else if (distance <= 500) {
            return new TruckStrategy();
        } else {
            return new AeroplaneStrategy();
        }
    }
}
