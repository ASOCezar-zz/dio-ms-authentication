import CreateUserService from '@modules/users/services/CreateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import ListUserService from '@modules/users/services/ListUsersService';
import QueryUserService from '@modules/users/services/QueryUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UserController {
  public async index(request: Request, response: Response) {
    const listUsersService = container.resolve(ListUserService);

    const users = await listUsersService.execute();

    return response.status(200).send(users);
  }

  public async query(request: Request, response: Response) {
    const { uuid } = request.params;

    const queryUserService = container.resolve(QueryUserService);

    const user = await queryUserService.execute({ uuid });

    return response.status(200).json(user);
  }

  public async create(request: Request, response: Response) {
    const { username, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const newUser = await createUserService.execute({ username, password });

    return response.status(201).json(newUser);
  }

  public async update(request: Request, response: Response) {
    const { username, password } = request.body;
    const { uuid } = request.user;

    const updateUserService = container.resolve(UpdateUserService);

    const newUser = await updateUserService.execute({
      username,
      password,
      uuid,
    });

    return response.status(201).json(newUser);
  }

  public async delete(request: Request, response: Response) {
    const { uuid } = request.user;

    const deleteUserService = container.resolve(DeleteUserService);

    await deleteUserService.execute(uuid);

    return response.sendStatus(204);
  }
}
