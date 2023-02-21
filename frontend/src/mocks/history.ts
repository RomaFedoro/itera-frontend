import { THistoryRecord } from '@/types/history';
import { eachDayOfInterval, formatISO, subDays } from 'date-fns';

const MAX_TOTAL_DAYS = 365;
const DAYS_OF_WEEK = [1, 2, 3, 4, 5, 6, 0];
const totalSteps = 6;

export const createMockHistory = () => {
  const history: THistoryRecord[] = [];
  const totalDays = Math.floor(MAX_TOTAL_DAYS * Math.random());
  let i = 0;

  eachDayOfInterval({
    start: subDays(new Date(), totalDays),
    end: new Date(),
  }).forEach((currentDate) => {
    if (DAYS_OF_WEEK.includes(currentDate.getDay())) {
      const completedSteps = Math.round(totalSteps * Math.random());
      history.push({
        id: ++i,
        habitId: 1,
        date: formatISO(currentDate, { representation: 'date' }),
        completedSteps,
        totalSteps,
      });
    }
  });

  return history;
};
