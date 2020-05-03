import { Request, Response, NextFunction, Router } from 'express';
import * as ErrorHandler from '../utils/errorHandler';

const handle401Error = (router: Router) => {
  router.use((req: Request, res: Response) => {
    console.log(req);
    ErrorHandler.notAuthorizedError();
  });
};
const handle404Error = (router: Router) => {
  router.use((req: Request, res: Response) => {
    console.log(req);
    ErrorHandler.notFoundError();
  });
};
const handle409Error = (router: Router) => {
  router.use((req: Request, res: Response) => {
    ErrorHandler.userExistsError();
  });
};

const handleClientError = (router: Router) => {
  router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    ErrorHandler.clientError(err, res, next);
  });
};

const handleServerError = (router: Router) => {
  router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    ErrorHandler.serverError(err, res, next);
  });
};

export default [handle401Error, handle404Error, handleClientError, handleServerError, handle409Error];
