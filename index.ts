import http from 'http';
import express from 'express';
import { applyMiddleware, applyRoutes } from './utils';
import middleware from './middleware';
import errorHandlers from './middleware/errorHandler';
import handleSessionMiddleware from './middleware/session';
import sql from 'sql-template-strings';
import routes from './services';
import { Pool, Client } from 'pg';

process.on('uncaughtException', e => {
  console.log(e);
  process.exit(1);
});

process.on('unhandledRejection', e => {
  console.log(e);
  process.exit(1);
});

const router = express();
applyMiddleware(middleware, router);
applyMiddleware(handleSessionMiddleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router);

const connectionString = 'postgres://user:pass@localhost:5432/database';
const pool = new Pool({
  connectionString,
});
pool.query(`SELECT NOW()`, (err, res) => {
  // console.log(err, res);
  pool.end();
});
export const client = new Client({
  connectionString,
});

client.connect();
client.query(sql`DROP TABLE IF EXISTS USERS;`, (err, res) => {
  console.log(err, res);
  // client.end();
});
client.query(sql`CREATE TABLE USERS (id UUID, email text unique, name text, password text)`, (err, res) => {
  // client.end();
});
// client.query(
//   sql`INSERT INTO USERS (username,password,age) VALUES ('Mark','123123', 123)  RETURNING id, username`,
//   (err, res) => {
//     // console.log(err);
//     // console.log(res);
//   },
// );
client.query('SELECT * FROM USERS', (err, res) => {
  console.log(res);
  // client.end();
});

const { PORT = 3000 } = process.env;
const server = http.createServer(router);

server.listen(PORT, () => console.log(`Server is running http://localhost:${PORT}...`));
