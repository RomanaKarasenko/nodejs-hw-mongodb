import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import router from './routers/index.js';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';


const PORT = env.PORT || 3000;

export const setupServer = () => {
  const app = express();
  app.use(cookieParser());
  app.use(express.json());
  app.use(cors());
  app.use(pino({ transport: { target: 'pino-pretty' } }));
  app.use(router);
  app.use(notFoundMiddleware);
  app.use(errorHandlerMiddleware);
  app.use('/uploads', express.static(UPLOAD_DIR));
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
