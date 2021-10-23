import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';
import IUser from '../domain/models/IUser';
import { IUserRepository } from '../domain/repositories/IUserRepository';

type QueryUserType = {
  uuid: string;
};

@injectable()
export default class QueryUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ uuid }: QueryUserType): Promise<IUser | undefined> {
    const user = await this.userRepository.findById(uuid);

    if (!user) {
      throw new AppError('This user does not exists');
    }

    return user;
  }
}
