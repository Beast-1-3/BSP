import { PrismaClient } from '@prisma/client';
import { calculateDistance } from '../../utils/distance';

const prisma = new PrismaClient();

export class WarehouseService {
    static async findNearestWarehouse(sellerId: number, productId: number) {
        const seller = await prisma.seller.findUnique({
            where: { id: sellerId },
            include: { products: { where: { id: productId } } }
        });

        if (!seller) {
            throw new Error('Seller not found');
        }

        if (seller.products.length === 0) {
            throw new Error('Product not found for the given seller');
        }

        const product = seller.products[0];
        const warehouses = await prisma.warehouse.findMany();

        if (warehouses.length === 0) {
            throw new Error('No warehouses available');
        }

        let nearestWarehouse = null;
        let minDistance = Infinity;

        for (const warehouse of warehouses) {
            const distance = calculateDistance(
                seller.latitude,
                seller.longitude,
                warehouse.latitude,
                warehouse.longitude
            );

            if (distance < minDistance) {
                minDistance = distance;
                nearestWarehouse = warehouse;
            }
        }

        return {
            nearestWarehouse,
            distanceFromSeller: minDistance,
            product
        };
    }
}
