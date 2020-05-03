import sql from 'sql-template-strings';
import { client } from '../index';
import { Request, Response, NextFunction } from 'express';
import * as httpErrors from '../utils/httpErrors';

export const getMyself = async (req: Request, res: Response, next: NextFunction) => {
  const { userID } = req.session as Express.Session;
  if (!userID) {
    next(new httpErrors.HTTP401Error());
    return;
  }

  await client.query(sql`SELECT id,email,name FROM USERS WHERE id = ${userID}`, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send({ err: err.message });
    } else {
      console.log(result);
      res.status(200).send(result.rows);
    }
  });
};

export const getUser = async (req: Request, res: Response) => {
  const { email } = req.query;
  console.log(req);
  await client.query(sql`SELECT id,email,name FROM USERS WHERE email = ${email}`, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send({ err: err.message });
    } else {
      console.log(result);
      res.status(200).send(result.rows);
    }
  });
};
