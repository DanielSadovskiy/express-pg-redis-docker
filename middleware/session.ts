import { NextFunction, Request, Response, Router } from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import redis from 'redis';
import { SESSION_OPTIONS, port, SESSION_ABSOLUTE_TIMEOUT } from '../config/session';
import { logoutUser } from '../queries/auth';
import { HTTP401Error } from '../utils/httpErrors';

const client = redis.createClient(port);

const redisStore = connectRedis(session);

const handleRedisSession = (router: Router) =>
  router.use(session({ ...SESSION_OPTIONS, store: new redisStore({ client }) }));

const handleSessionExpired = (router: Router) => {
  router.use(async (req: Request, res: Response, next: NextFunction) => {
    if (req.session!.userID) {
      const now = Date.now();
      const { createdAt } = req.session as Express.Session;
      if (now > createdAt + SESSION_ABSOLUTE_TIMEOUT) {
        await logoutUser(req, res, next);
        return next(new HTTP401Error('Session expired'));
      }
    }
    next();
  });
};

export default [handleRedisSession, handleSessionExpired];
