import { Request, Response, NextFunction } from 'express';
import { HTTP400Error } from '../utils/httpErrors';
import { loginSchema } from '../schemas/loginSchema';

export const checkLoginBody = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.email || !req.body.password) {
    throw new HTTP400Error('Email, password,is required!');
  } else {
    try {
      await loginSchema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
};
export const withSession = async (req: Request, res: Response, next: NextFunction) => {
  if (!!req.session!.userID) res.redirect('home');
  next();
};
