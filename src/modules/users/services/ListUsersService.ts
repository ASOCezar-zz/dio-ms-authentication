import { inject, injectable } from 'tsyringe';
import IUser from '../domain/models/IUser';
import { IUserRepository } from '../domain/repositories/IUserRepository';

@injectable()
export default class ListUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(): Promise<IUser[] | undefined> {
    const users = await this.userRepository.findAllUsers();

    return users;
  }
}
