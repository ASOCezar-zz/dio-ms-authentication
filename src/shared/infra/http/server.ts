import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import '@shared/container';
import { errors } from 'celebrate';
import { handlingError } from './middlewares/handlingError';

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);
app.use(errors());

app.use(handlingError);

app.listen(process.env.APP_PORT, () =>
  console.log(`Server running on ${process.env.APP_HOST}:${3333}`),
);
