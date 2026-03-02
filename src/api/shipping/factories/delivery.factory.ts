export interface DeliverySpeedStrategy {
    calculateExtraCharge(weight: number): number;
    getBaseCharge(): number;
}

export class StandardDelivery implements DeliverySpeedStrategy {
    getBaseCharge(): number {
        return 10;
    }

    calculateExtraCharge(weight: number): number {
        return 0;
    }
}

export class ExpressDelivery implements DeliverySpeedStrategy {
    getBaseCharge(): number {
        return 10;
    }

    calculateExtraCharge(weight: number): number {
        return 1.2 * weight;
    }
}

export class DeliverySpeedFactory {
    static getDeliverySpeed(speedType: 'standard' | 'express'): DeliverySpeedStrategy {
        if (speedType === 'express') {
            return new ExpressDelivery();
        }
        return new StandardDelivery(); // default to standard
    }
}
