import auth from '@config/auth';
import AppError from '@shared/error/AppError';
import { decode, JwtPayload, Secret, sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';

type RefreshTokenResponse = {
  token: string;
};

@injectable()
export default class RefreshTokenService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public execute(token: string): RefreshTokenResponse {
    const decodedToken = decode(token, { complete: true });

    const {
      payload: { sub },
    } = decodedToken as JwtPayload;

    if (sub === undefined) {
      throw new AppError('User Id invalid or Missing', 403);
    }

    const refreshedToken = sign({}, auth.jwt.secret as Secret, {
      subject: sub,
      expiresIn: auth.jwt.expiresIn,
    });

    return { token: refreshedToken };
  }
}
