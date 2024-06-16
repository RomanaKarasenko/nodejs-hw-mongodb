import { isHttpError } from 'http-errors';
import { MongooseError } from 'mongoose';

export const errorHandlerMiddleware = (err, req, res, next) => {
  if (isHttpError(err)) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
      data: err.errors || err.data, // Передаємо деталі помилок
    });
    return;
  }

  if (err instanceof MongooseError) {
    res.status(500).json({
      status: 500,
      message: 'Mongoose error',
      data: null,
    });
    return;
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
};
