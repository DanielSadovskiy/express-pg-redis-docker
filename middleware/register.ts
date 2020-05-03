import { Request, Response, NextFunction } from 'express';
import { HTTP400Error } from '../utils/httpErrors';
import { registerSchema } from '../schemas/registerSchema';

export const checkRegisterBody = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.email || !req.body.name || !req.body.password || !req.body.confirm) {
    next(new HTTP400Error('Email, name, password, confirm is required!'));
  } else {
    try {
      await registerSchema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
};
