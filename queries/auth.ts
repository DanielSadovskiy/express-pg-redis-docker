import sql from 'sql-template-strings';
import { client } from '../index';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import * as httpErrors from '../utils/httpErrors';
import { generateToken } from '../utils/token';
import { SESSION_NAME } from '../config/session';

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, name, password } = req.body;
  const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  await client.query(
    sql`INSERT INTO USERS (id, email,name,password) VALUES (${uuidv4()},${email}, ${name}, ${hashPass}) returning id,email,name `,
    (err: Error, result) => {
      if (err) {
        next(new httpErrors.HTTP409Error('User is exists'));
      } else {
        res.status(200).send({ result: 'OK', data: result.rows });
      }
    },
  );
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const { rows } = await client.query(sql`SELECT * FROM USERS WHERE email = ${email} `);
    if (!rows.length) {
      next(new httpErrors.HTTP409Error('There is no user with such email'));
      return;
    }
    if (!bcrypt.compareSync(password, rows[0].password)) {
      next(new httpErrors.HTTP409Error('The password is wrong'));
      return;
    }
    const token = generateToken(rows[0].id);

    req.session!.userID = rows[0].id;
    req.session!.createdAt = Date.now();
    res.status(200).send({ accessToken: token });
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  return new Promise((resolve, reject) => {
    if (!req.session!.userID) {
      next(new httpErrors.HTTP401Error());
      return;
    }

    req.session!.destroy((err: Error) => {
      if (err) {
        next(new httpErrors.HTTP401Error());
        reject();
      }

      res.clearCookie(SESSION_NAME);
      resolve();
    });
  });
};
export const getAllUser = async (req: Request, res: Response) => {
  await client.query(sql`SELECT * FROM USERS`, (err, result) => {
    if (err) {
      res.status(400).send({ err: err.message });
    } else {
      res.status(200).send(result.rows);
    }
  });
};
