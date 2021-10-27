import CreateSessionService from '@modules/users/services/CreateSessionsService';
import RefreshTokenService from '@modules/users/services/RefreshTokenService';
import AppError from '@shared/error/AppError';
import decodeBasicTokens from '@shared/utils/decodeBasicTokens';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const authorizationHeader = request.headers['authorization'];

    if (!authorizationHeader) {
      throw new AppError('Credentials are Necessary Here');
    }

    const { username, password } = decodeBasicTokens(authorizationHeader);

    const createSessionService = container.resolve(CreateSessionService);

    const result = await createSessionService.execute({ username, password });

    return response.status(200).json(result);
  }

  public async refresh(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError('JWT Token is required', 403);
    }

    const [, token] = authHeader.split(' ');

    const refreshTokenService = container.resolve(RefreshTokenService);

    const result = refreshTokenService.execute(token);

    return response.status(200).json(result);
  }
}
