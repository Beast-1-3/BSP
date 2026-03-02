import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import 'dotenv/config';

import warehouseRoutes from './api/warehouse/warehouse.routes';
import shippingRoutes from './api/shipping/shipping.routes';
import { globalErrorHandler } from './middlewares/error.middleware';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'B2B E-Commerce Shipping Charge Estimator API',
            version: '1.0.0',
            description: 'API for calculating shipping costs from warehouses to customers',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./src/api/**/*.routes.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// API Routes
app.use('/api/v1/warehouse', warehouseRoutes);
app.use('/api/v1/shipping-charge', shippingRoutes);

// Error Handling Middleware
app.use(globalErrorHandler);

export default app;
