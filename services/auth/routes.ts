import { checkRegisterBody } from '../../middleware/register';
import { checkLoginBody, withSession } from '../../middleware/login';
import { getAllUser, loginUser, logoutUser, registerUser } from '../../queries/auth';
import { getUser } from '../../queries/users';
import { NextFunction, Request, Response } from 'express';
export default [
  {
    path: '/register',
    method: 'post',
    handler: [withSession, checkRegisterBody, registerUser],
  },
  {
    path: '/allusers',
    method: 'get',
    handler: getAllUser,
  },
  {
    path: '/getuser',
    method: 'get',
    handler: getUser,
  },
  {
    path: '/login',
    method: 'post',
    handler: [withSession, checkLoginBody, loginUser],
  },
  {
    path: '/logout',
    method: 'post',
    handler: async (req: Request, res: Response, next: NextFunction) => {
      await logoutUser(req, res, next);
      res.json({ message: 'LOGOUT' });
    },
  },
];
