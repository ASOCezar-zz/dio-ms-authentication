import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';

export type CreateUserType = {
  username: string;
  password: string;
};

export type FindUserByUsernameAndPasswordResponse = {
  username: string;
  uuid: string;
};

@injectable()
export default class FindUserByUsernameAndPasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    username,
    password,
  }: CreateUserType): Promise<FindUserByUsernameAndPasswordResponse> {
    const user = await this.userRepository.findByUsernameAndPassword({
      username,
      password,
    });

    if (!user) {
      throw new AppError('This user does not exists');
    }

    return user;
  }
}
