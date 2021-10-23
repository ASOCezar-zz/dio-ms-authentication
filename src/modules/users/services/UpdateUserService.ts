import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import IUser from '../domain/models/IUser';
import { IUserRepository } from '../domain/repositories/IUserRepository';

export type UpdateUserType = {
  uuid: string;
  username?: string;
  password?: string;
};

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    username,
    password,
    uuid,
  }: UpdateUserType): Promise<IUser> {
    const user = await this.userRepository.findById(uuid);

    if (!user) {
      throw new AppError('This user does not exists');
    }

    const updatedUser = await this.userRepository.update({
      username,
      password,
      uuid,
    });

    return updatedUser;
  }
}
