import { RedisOptions } from 'ioredis';

const { REDIS_PORT = 6379 } = process.env;

export const REDIS_OPTIONS: RedisOptions = {
  port: +REDIS_PORT,
};
