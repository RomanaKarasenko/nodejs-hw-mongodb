import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import contactsRouter from './routers/contacts.js';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';

const PORT = env.PORT || 3000;

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(pino({ transport: { target: 'pino-pretty' } }));
  app.get('/', (req, res) => {
    res.json({
      message: 'Hello!',
    });
  });
  app.use(contactsRouter);
  app.use(notFoundMiddleware);
  app.use(errorHandlerMiddleware);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
