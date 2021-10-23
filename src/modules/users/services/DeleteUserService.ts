import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';

@injectable()
export default class DeleteUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(uuid: string): Promise<void> {
    const user = await this.userRepository.findById(uuid);

    if (!user) {
      throw new AppError('This user does not exists');
    }

    await this.userRepository.remove(uuid);
  }
}
