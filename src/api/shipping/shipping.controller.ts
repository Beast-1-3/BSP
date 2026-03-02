import { Request, Response, NextFunction } from 'express';
import { ShippingService } from './shipping.service';
import z from 'zod';

const calcQuerySchema = z.object({
    warehouseId: z.string().regex(/^\d+$/).transform(Number),
    customerId: z.string().regex(/^\d+$/).transform(Number),
    deliverySpeed: z.enum(['standard', 'express']).optional().default('standard'),
    weight: z.string().regex(/^\d+(\.\d+)?$/).transform(Number).optional()
});

const calcBodySchema = z.object({
    sellerId: z.number(),
    customerId: z.number(),
    productId: z.number(),
    deliverySpeed: z.enum(['standard', 'express'])
});

export class ShippingController {
    static async getShippingCharge(req: Request, res: Response, next: NextFunction) {
        try {
            const validated = calcQuerySchema.parse(req.query);
            const result = await ShippingService.calculateCharge(
                validated.warehouseId,
                validated.customerId,
                validated.deliverySpeed,
                validated.weight
            );

            res.json({
                success: true,
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    static async calculateOrderShipping(req: Request, res: Response, next: NextFunction) {
        try {
            const validated = calcBodySchema.parse(req.body);

            const result = await ShippingService.calculateFullOrderShipping(
                validated.sellerId,
                validated.customerId,
                validated.productId,
                validated.deliverySpeed
            );

            res.json({
                success: true,
                data: result
            });
        } catch (error) {
            next(error);
        }
    }
}
