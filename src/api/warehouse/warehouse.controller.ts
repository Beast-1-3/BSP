import { Request, Response, NextFunction } from 'express';
import { WarehouseService } from './warehouse.service';
import z from 'zod';

const nearestWarehouseSchema = z.object({
    sellerId: z.string().regex(/^\d+$/).transform(Number),
    productId: z.string().regex(/^\d+$/).transform(Number),
});

export class WarehouseController {
    static async getNearestWarehouse(req: Request, res: Response, next: NextFunction) {
        try {
            const validated = nearestWarehouseSchema.parse(req.query);
            const result = await WarehouseService.findNearestWarehouse(validated.sellerId, validated.productId);

            res.json({
                success: true,
                data: result
            });
        } catch (error) {
            next(error);
        }
    }
}
