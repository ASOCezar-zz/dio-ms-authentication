import sessionsRoutes from '@modules/users/infra/http/routes/session.routes';
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/session', sessionsRoutes);

export default routes;
