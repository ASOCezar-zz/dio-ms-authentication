import { CreateUserType } from '@modules/users/services/CreateUserService';
import { FindUserByUsernameAndPasswordResponse } from '@modules/users/services/FindUserByUsernameAndPasswordService';
import { UpdateUserType } from '@modules/users/services/UpdateUserService';
import IUser from '../models/IUser';

export interface IUserRepository {
  findAllUsers(): Promise<IUser[] | undefined>;
  findById(uuid: string): Promise<IUser | undefined>;
  findByUsernameAndPassword({
    username,
    password,
  }: CreateUserType): Promise<FindUserByUsernameAndPasswordResponse>;
  create({ username, password }: CreateUserType): Promise<IUser>;
  update({ username, password, uuid }: UpdateUserType): Promise<IUser>;
  remove(uuid: string): Promise<void>;
}
