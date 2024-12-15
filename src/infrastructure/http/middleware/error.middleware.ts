import { ErrorRequestHandler } from 'express';
import { AppError } from '../../../core/errors/app-error';
import { ZodError } from 'zod';

export const errorHandler: ErrorRequestHandler = (
  error: Error | AppError,
  req,
  res,
  next
): void => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
    return;
  }

  if (error instanceof ZodError) {
    res.status(400).json({
      status: 'error',
      message: 'Validation error',
      errors: error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }))
    });
    return;
  }

  console.error('Unexpected error:', error);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
};