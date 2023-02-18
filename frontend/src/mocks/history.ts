import { THistoryHabit } from '@/types/habit';
import { ONE_DAY } from '../utils/date';

const MAX_TOTAL_DAYS = 365;
const DAYS_OF_WEEK = [1, 2, 3, 4, 5, 6, 0];
const totalSteps = 6;

export const createMockHistory = () => {
  const history: THistoryHabit[] = [];

  const endDay = Math.floor(Date.now() / ONE_DAY) * ONE_DAY;
  const totalDays = Math.floor(MAX_TOTAL_DAYS * Math.random()) * ONE_DAY;

  let currentDate = new Date(endDay - totalDays);

  while (+currentDate <= endDay) {
    if (DAYS_OF_WEEK.includes(currentDate.getDay())) {
      const completedSteps = Math.round(totalSteps * Math.random());
      history.push({
        date: currentDate.toISOString(),
        completedSteps,
        totalSteps,
      });
    }

    currentDate = new Date(currentDate.getTime() + ONE_DAY);
  }

  return history;
};
