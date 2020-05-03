import { Response, NextFunction } from 'express';
import { HTTPClientError, HTTP404Error, HTTP409Error, HTTP401Error } from './httpErrors';

export const notFoundError = () => {
  throw new HTTP404Error('Method not found.');
};
export const userExistsError = () => {
  throw new HTTP409Error('User Exists');
};
export const notAuthorizedError = () => {
  throw new HTTP401Error('You are not authorized');
};

export const clientError = (err: Error, res: Response, next: NextFunction) => {
  if (err instanceof HTTPClientError) {
    console.warn(err);
    res.status(err.statusCode).send(err.message);
  } else {
    next(err);
  }
};

export const serverError = (err: Error, res: Response, next: NextFunction) => {
  console.error(err);
  if (process.env.NODE_ENV === 'production') {
    res.status(500).send('Internal Server Error');
  } else {
    res.status(500).send(err.stack);
  }
};
