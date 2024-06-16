import Joi from 'joi';

export const createContactsSchema = Joi.object({
  name: Joi.string().pattern(/^[A-Za-z\s]+$/).min(3).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.pattern.base': 'Name should only contain letters and spaces',
    'string.min': 'Name should have at least 3 characters',
    'string.max': 'Name should have at most 20 characters',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string()
    .pattern(/^[0-9+\-() ]+$/)
    .required().messages({
      'string.pattern.base': 'Phone number must be in a valid format',
      'any.required': 'Phone number is required'
    }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required'
  }),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .default('personal').messages({
      'any.only': 'Contact type must be one of work, home, or personal',
      'any.required': 'Contact type is required'
    }),
});
