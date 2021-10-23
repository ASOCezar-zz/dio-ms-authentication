import IUser from '@modules/users/domain/models/IUser';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import db from '@shared/infra/pg';
import config from '@config/auth';
import { CreateUserType } from '@modules/users/services/CreateUserService';
import { UpdateUserType } from '@modules/users/services/UpdateUserService';
import { FindUserByUsernameAndPasswordResponse } from '@modules/users/services/FindUserByUsernameAndPasswordService';

class UserRepository implements IUserRepository {
  async findAllUsers(): Promise<IUser[]> {
    const query = `
      SELECT uuid, username
      FROM dio_application_user
    `;

    const { rows } = await db.query<IUser>(query);

    return rows || [];
  }

  async findById(uuid: string): Promise<IUser> {
    const query = `
      SELECT uuid, username
      FROM dio_application_user
      WHERE uuid=$1
      `;

    const values = [uuid];

    const { rows } = await db.query<IUser>(query, values);
    const [user] = rows;

    return user || undefined;
  }

  async findByUsernameAndPassword({
    username,
    password,
  }: CreateUserType): Promise<FindUserByUsernameAndPasswordResponse> {
    const script = `
      SELECT uuid, username
      FROM dio_application_user
      WHERE username = $1
      AND password = crypt($2, $3)
    `;

    const values = [username, password, process.env.MY_SALT_POSTGRES];

    const result = await db.query<FindUserByUsernameAndPasswordResponse>(
      script,
      values,
    );

    const { rows } = result;

    const [user] = rows;

    return user;
  }

  async create({ username, password }: CreateUserType): Promise<IUser> {
    const script = `
    INSERT INTO dio_application_user (
      username, password
    )
    VALUES ($1, crypt($2, $3))
    RETURNING uuid, username
    `;

    const values = [username, password, process.env.MY_SALT_POSTGRES];

    const { rows } = await db.query(script, values);

    const [user] = rows;

    return user;
  }

  async update({ username, password, uuid }: UpdateUserType): Promise<IUser> {
    if (username && !password) {
      const script = `
        UPDATE dio_application_user
        SET
          username = $1
        WHERE uuid = $2
        RETURNING uuid, username
      `;

      const values = [username, uuid];

      const { rows } = await db.query(script, values);

      const [user] = rows;

      return user;
    } else if (password && !username) {
      const script = `
      UPDATE dio_application_user
      SET
        password = crypt($1, $2)
      WHERE uuid = $3
      RETURNING uuid, username
    `;

      const values = [password, config.jwt.secret, uuid];

      const { rows } = await db.query(script, values);

      const [user] = rows;

      return user;
    } else {
      const script = `
      UPDATE dio_application_user
      SET
        username = $1,
        password = crypt($2, $3)
      WHERE uuid = $4
      RETURNING uuid, username
    `;

      const values = [username, password, config.jwt.secret, uuid];

      const { rows } = await db.query(script, values);

      const [user] = rows;

      return user;
    }
  }

  async remove(uuid: string): Promise<void> {
    const script = `
      DELETE FROM dio_application_user
      WHERE uuid = $1
    `;

    const values = [uuid];

    await db.query(script, values);
  }
}

export default UserRepository;
