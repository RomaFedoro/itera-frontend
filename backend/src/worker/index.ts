// Utils
import {getLastHistoryRecord, makeHistory} from './services/history';
import {getDatesInRange, now} from './utils/dates';

// TODO: remove this trash

(async () => {
  const lastRecord = await getLastHistoryRecord();

  if (!lastRecord)
    return;

  const startDate = lastRecord.date;
  const endDate = now();

  console.log(`${startDate} - ${endDate}`);

  getDatesInRange(startDate, endDate).forEach(makeHistory);
})();
