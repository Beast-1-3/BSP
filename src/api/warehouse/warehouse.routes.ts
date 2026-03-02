import { Router } from 'express';
import { WarehouseController } from './warehouse.controller';

const router = Router();

/**
 * @swagger
 * /api/v1/warehouse/nearest:
 *   get:
 *     summary: Find nearest warehouse from seller location
 *     tags: [Warehouse]
 *     parameters:
 *       - in: query
 *         name: sellerId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully found nearest warehouse
 */
router.get('/nearest', WarehouseController.getNearestWarehouse);

export default router;
