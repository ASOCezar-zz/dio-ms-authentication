import auth from '@config/auth';
import AppError from '@shared/error/AppError';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload, TokenExpiredError, verify } from 'jsonwebtoken';

export const isAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction,
): NextFunction | void => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is required', 403);
  }

  const [, token] = authHeader.split(' ');

  try {
    if (auth.jwt.secret === undefined) {
      throw new AppError('Authentication error', 403);
    }

    const decodedToken = verify(token, auth.jwt.secret);

    const { sub } = decodedToken as JwtPayload;

    if (sub === undefined) {
      throw new AppError('User Id invalid or Missing', 403);
    }

    request.user = {
      uuid: sub,
    };

    return next();
  } catch (err: any) {
    if (err instanceof TokenExpiredError) {
      throw new AppError('Unauthorized! Access Token was expired!', 401);
    }

    throw new Error(err);
  }
};
