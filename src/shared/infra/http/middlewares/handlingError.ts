import AppError from '@shared/error/AppError';
import { NextFunction, Request, Response } from 'express';

export const handlingError = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
): Response => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  }

  return response.status(500).json({
    status: 500,
    message: error.message,
  });
};
