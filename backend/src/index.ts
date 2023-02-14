import * as jsonServer from 'json-server';

import createHabits from './modules/habits';
import createHistory from './modules/history';


const createDB = () => {
  const habits = createHabits(10);
  const history = createHistory(habits);

  return {
    habits,
  };
};

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router(createDB());
const port = 3001;

server.use(middlewares);
server.use(router);
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
