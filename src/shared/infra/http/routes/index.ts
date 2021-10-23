import sessionsRoutes from '@modules/users/infra/http/routes/session.routes';
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import { NextFunction, Request, Response, Router } from 'express';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/session', sessionsRoutes);

routes.get(
  '/status',
  (request: Request, response: Response, next: NextFunction) => {
    response.status(200).send({ foo: 'teste' });
  },
);

export default routes;
