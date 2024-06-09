import createHttpError from 'http-errors';

export const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof createHttpError.HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
      data: { message: err.message },
    });
    return;
  }

  res.status(500).json({
    status: 500,
    message: 'Internal Server Error',
    data: { message: err.message },
  });
};
