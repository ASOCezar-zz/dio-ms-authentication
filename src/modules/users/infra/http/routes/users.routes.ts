import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import UserController from '@modules/users/infra/http/controllers/UserController';
import { isAuthenticated } from '@shared/infra/http/middlewares/isAuthenticated';

const userController = new UserController();

const usersRoutes = Router();

usersRoutes.get('/', isAuthenticated, userController.index);

usersRoutes.get(
  '/:uuid',
  celebrate({
    [Segments.PARAMS]: {
      uuid: Joi.string().uuid().required(),
    },
  }),
  userController.query,
);

usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      username: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create,
);

usersRoutes.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      username: Joi.string(),
      password: Joi.string(),
    },
  }),
  isAuthenticated,
  userController.update,
);

usersRoutes.delete('/', isAuthenticated, userController.delete);

export default usersRoutes;
