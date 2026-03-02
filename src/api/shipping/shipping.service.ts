import { PrismaClient } from '@prisma/client';
import { WarehouseService } from '../warehouse/warehouse.service';
import { calculateDistance } from '../../utils/distance';
import { TransportStrategyContext } from './strategies/transport.strategy';
import { DeliverySpeedFactory } from './factories/delivery.factory';

const prisma = new PrismaClient();

export class ShippingService {
    static async calculateCharge(
        warehouseId: number,
        customerId: number,
        deliverySpeed: 'standard' | 'express',
        weightOverride?: number, // Product weight passed for internal calculation
    ) {
        const warehouse = await prisma.warehouse.findUnique({ where: { id: warehouseId } });
        const customer = await prisma.customer.findUnique({ where: { id: customerId } });

        if (!warehouse) throw new Error('Warehouse not found');
        if (!customer) throw new Error('Customer not found');

        const distance = calculateDistance(
            warehouse.latitude,
            warehouse.longitude,
            customer.latitude,
            customer.longitude
        );

        const transportStrategy = TransportStrategyContext.getStrategy(distance);
        const deliveryStrategy = DeliverySpeedFactory.getDeliverySpeed(deliverySpeed);

        // If weight is not provided, this assumes 1kg or we fetch it. We'll default to 1kg if missing, 
        // but in realistic scenarios we need product weight. 
        // The requirement says: Calculate shipping charge using weight.
        const weight = weightOverride || 1;

        const baseCharge = deliveryStrategy.getBaseCharge();
        const extraSpeedCharge = deliveryStrategy.calculateExtraCharge(weight);
        const transportCharge = transportStrategy.calculateRatePerKg(distance) * weight;

        const totalCharge = baseCharge + extraSpeedCharge + transportCharge;

        return {
            distanceInfo: {
                distanceKm: distance,
                transportMode: transportStrategy.constructor.name
            },
            chargeInfo: {
                baseCharge,
                extraSpeedCharge,
                transportCharge,
                totalCharge
            }
        };
    }

    static async calculateFullOrderShipping(
        sellerId: number,
        customerId: number,
        productId: number,
        deliverySpeed: 'standard' | 'express'
    ) {
        // 1. Find nearest warehouse
        const nearestInfo = await WarehouseService.findNearestWarehouse(sellerId, productId);

        if (!nearestInfo.nearestWarehouse) {
            throw new Error('Could not determine nearest warehouse');
        }

        // 2. Calculate shipping
        const shippingInfo = await this.calculateCharge(
            nearestInfo.nearestWarehouse.id,
            customerId,
            deliverySpeed,
            nearestInfo.product.weight
        );

        return {
            warehouse: nearestInfo.nearestWarehouse,
            shippingCharge: shippingInfo
        };
    }
}
