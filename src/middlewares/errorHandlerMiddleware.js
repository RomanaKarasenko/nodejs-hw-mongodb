import createHttpError from 'http-errors';

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof createHttpError) {
      res.status(err.status).json({
        status: err.status,
        message: err.name,
        data: err,
      });
      return;
    }
  
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  };
  
  export default errorHandlerMiddleware;