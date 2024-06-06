import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import contactsRouter from './routers/contacts.js';
import createError from 'http-errors';

const PORT = env.PORT || 3000;

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(pino({ transport: { target: 'pino-pretty' } }));

  // Використання маршрутизації
  app.use('/', contactsRouter);

  // Middleware для обробки неіснуючих маршрутів
  app.use((req, res, next) => {
    if (req.url === '/favicon.ico') {
      // Ігноруємо запит на favicon.ico
      return res.status(204).end();
    }
    next(createError(404, 'Route not found'));
  });

  // Middleware для обробки помилок
  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      status: 'error',
      message: err.message || 'Something went wrong',
      data: null,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
