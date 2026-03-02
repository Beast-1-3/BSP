import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function globalErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            error: 'Validation Error',
            details: (err as any).errors
        });
    }

    const statusCode = 500;
    const message = err.message || 'Internal Server Error';

    if (message.includes('not found')) {
        return res.status(404).json({ success: false, error: message });
    }

    res.status(statusCode).json({
        success: false,
        error: message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
}
