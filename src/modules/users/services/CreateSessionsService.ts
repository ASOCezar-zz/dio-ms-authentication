import auth from '@config/auth';
import AppError from '@shared/error/AppError';
import { Secret, sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import IUser from '../domain/models/IUser';
import { IUserRepository } from '../domain/repositories/IUserRepository';

type CreateSessionType = {
  username: string;
  password: string;
};

export type CreateSessionResponse = {
  user: IUser;
  token: string;
};

@injectable()
export default class CreateSessionService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    username,
    password,
  }: CreateSessionType): Promise<CreateSessionResponse> {
    const user = await this.userRepository.findByUsernameAndPassword({
      username,
      password,
    });

    if (!user) {
      throw new AppError('Invalid Credentials');
    }

    const token = sign({}, auth.jwt.secret as Secret, {
      subject: user.uuid,
      expiresIn: auth.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
