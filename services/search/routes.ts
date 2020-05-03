import { Request, Response } from 'express';
import { getPlacesByName } from './SearchController';
import { checkSearchParams } from '../../middleware/checks';
import client from '../../redis-client';
export default [
  {
    path: '/store/getall',
    method: 'get',
    handler: [
      async (req: Request, res: Response) => {
        console.log(1);
        const rawData = await client.keysAsync('*');
        const result = [];
        for (const key of rawData) {
          const data = await client.getAsync(key);
          result.push({
            [key]: data,
          });
        }
        return res.json(result);
      },
    ],
  },
  {
    path: '/store/get/:key',
    method: 'get',
    handler: [
      async (req: Request, res: Response) => {
        const { key } = req.params;
        console.log(key);
        const rawData = await client.getAsync(key);
        console.log(rawData);
        return res.json({ [key]: rawData });
      },
    ],
  },
  {
    path: '/store/add/',
    method: 'post',
    handler: [
      async (req: Request, res: Response) => {
        const { key, value } = req.body;
        const rawData = await client.setAsync(key, value);
        console.log(rawData);
        return res.json({ [key]: rawData });
      },
    ],
  },
  {
    path: '/api/v1/search',
    method: 'get',
    handler: [
      checkSearchParams,
      async ({ query }: Request, res: Response) => {
        const result = await getPlacesByName(query.q.toString());
        res.status(200).send(result);
      },
    ],
  },
  {
    path: '/api/v1/test',
    method: 'get',
    handler: [
      async ({ query }: Request, res: Response) => {
        res.status(200).send({ Hello: 'hello' });
      },
    ],
  },
];
