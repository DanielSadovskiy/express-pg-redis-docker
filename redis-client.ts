import redis from 'redis';
import { promisify } from 'util';
const { REDIS_URL = 6379 } = process.env;
// @ts-ignore
const client = redis.createClient(REDIS_URL);
export default {
  ...client,
  getAsync: promisify(client.get).bind(client),
  setAsync: promisify(client.set).bind(client),
  keysAsync: promisify(client.keys).bind(client),
};
