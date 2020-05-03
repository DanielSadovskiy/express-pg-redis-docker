import { SessionOptions } from 'express-session';
import { IN_PROD } from './app';
import { ClientOpts } from 'redis';

const ONE_HOUR = 1000 * 60 * 60;

const THIRTY_MINUTES = ONE_HOUR / 2;

// const SIX_HOURS = ONE_HOUR * 6;

const { env } = process;

export const {
  SESSION_SECRET = 'please keep this secret, mate',
  SESSION_NAME = 'sid',
  SESSION_IDLE_TIMEOUT = THIRTY_MINUTES,
} = env;

export const { port = 6379 }: ClientOpts = process.env;
export const SESSION_ABSOLUTE_TIMEOUT = 5000;

export const SESSION_OPTIONS: SessionOptions = {
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  unset: 'destroy',
  cookie: {
    maxAge: +SESSION_IDLE_TIMEOUT,
    secure: IN_PROD,
    sameSite: true,
  },
  rolling: true,
  resave: false,
  saveUninitialized: true,
};
