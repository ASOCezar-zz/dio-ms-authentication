import { inject, injectable } from 'tsyringe';
import IUser from '../domain/models/IUser';
import { IUserRepository } from '../domain/repositories/IUserRepository';

export type CreateUserType = {
  username: string;
  password: string;
};

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    username,
    password,
  }: CreateUserType): Promise<IUser | undefined> {
    const user = await this.userRepository.create({ username, password });

    return user;
  }
}
