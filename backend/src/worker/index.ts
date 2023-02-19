import {makeHistory} from './services/history';
import {today} from '../utils/dates';

// TODO: remove this trash

(async () => {

  const t = today();

  console.log(t);

  await makeHistory(t);

})();
