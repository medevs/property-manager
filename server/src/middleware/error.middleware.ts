import { Request, Response } from 'express';
import { CustomError } from '@/utils/custom-error';

export const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response
) => {
  const statusCode = err.statusCode || 500;
  
  res.status(statusCode).json({
    status: err.status || 'error',
    statusCode,
    message: err.message || 'Internal Server Error',
    errors: err.errors,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};