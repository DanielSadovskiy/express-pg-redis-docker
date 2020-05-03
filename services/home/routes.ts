import { getMyself } from '../../queries/users';

export default [
  {
    path: '/home',
    method: 'get',
    handler: getMyself,
  },
];
