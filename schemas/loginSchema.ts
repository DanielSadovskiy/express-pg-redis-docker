import Joi from '@hapi/joi';

const email = Joi.string()
  .email()
  .min(8)
  .max(254)
  .lowercase()
  .trim()
  .required();

const password = Joi.string()
  .min(8)
  .max(72, 'utf8')
  .regex(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u)
  .message('"{#label}" must contain one uppercase letter, one lowercase letter, and one digit')
  .required();

export const loginSchema = Joi.object({
  email,
  password,
});
