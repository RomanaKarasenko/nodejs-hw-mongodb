import Joi from 'joi';
export const createContactsSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Contact should be a string', // Кастомізація повідомлення для типу "string"
    'string.min': 'Contact should have at least 3 characters',
    'string.max': 'Contact should have at most 20 characters',
    'any.required': 'Contact is required',
  }),
  phoneNumber: Joi.string()
    .pattern(/^[0-9+\-() ]+$/)
    .required(),
  email: Joi.string().email().required(),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .default('personal'),
});

