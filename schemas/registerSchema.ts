import Joi from '@hapi/joi';

const email = Joi.string()
  .email()
  .min(8)
  .max(254)
  .lowercase()
  .trim()
  .required();

const name = Joi.string()
  .min(3)
  .max(128)
  .trim()
  .required();

const password = Joi.string()
  .min(8)
  .max(72, 'utf8')
  .regex(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u)
  .message('"{#label}" must contain one uppercase letter, one lowercase letter, and one digit')
  .required();

const confirm = Joi.valid(Joi.ref('password'))
  .required()
  .error(new Error('Confirm should be equal to password'));
export const registerSchema = Joi.object({
  email,
  name,
  password,
  confirm,
});
