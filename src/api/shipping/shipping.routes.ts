import { Router } from 'express';
import { ShippingController } from './shipping.controller';

const router = Router();

/**
 * @swagger
 * /api/v1/shipping-charge:
 *   get:
 *     summary: Calculate shipping charge
 *     tags: [Shipping]
 *     parameters:
 *       - in: query
 *         name: warehouseId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: customerId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: deliverySpeed
 *         required: false
 *         schema:
 *           type: string
 *           enum: [standard, express]
 *       - in: query
 *         name: weight
 *         required: false
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Successfully calculated shipping charge
 */
router.get('/', ShippingController.getShippingCharge);

/**
 * @swagger
 * /api/v1/shipping-charge/calculate:
 *   post:
 *     summary: Calculate order shipping charge directly from seller to customer
 *     tags: [Shipping]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sellerId
 *               - customerId
 *               - productId
 *               - deliverySpeed
 *             properties:
 *               sellerId:
 *                 type: integer
 *               customerId:
 *                 type: integer
 *               productId:
 *                 type: integer
 *               deliverySpeed:
 *                 type: string
 *                 enum: [standard, express]
 *     responses:
 *       200:
 *         description: Successfully calculated
 */
router.post('/calculate', ShippingController.calculateOrderShipping);

export default router;
