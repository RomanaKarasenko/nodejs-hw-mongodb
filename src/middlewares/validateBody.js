import createHttpError from 'http-errors';

const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    const errorDetails = err.details.map(detail => detail.message);
    const error = createHttpError(400, 'Bad Request', { errors: errorDetails });
    console.log('Validation Error:', errorDetails);
    next(error);
  }
};

export default validateBody;
