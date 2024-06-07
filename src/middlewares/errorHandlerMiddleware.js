import createHttpError from 'http-errors';

export const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof createHttpError) {
      res.status(err.status).json({
        status: err.status,
        message: err.name,
        data: err,
      });
      return;
    }
  
    res.status(400).json({
      message: 'Something went wrong',
      error: err.message,
    });
  };
  
