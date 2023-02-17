import { THistoryHabit } from '@/types/habit';

const ONE_DAY = 1000 * 60 * 60 * 24;
const MAX_TOTAL_DAYS = 365;
const DAYS_OF_WEEK = [1, 3, 5];
const totalSteps = 6;

export const createMockHistory = () => {
  const history: THistoryHabit[] = [];

  const endDay = new Date();
  const totalDays = Math.floor(MAX_TOTAL_DAYS * Math.random());

  let currentDate = new Date(endDay.getTime() - totalDays * ONE_DAY);

  while (currentDate < endDay) {
    if (DAYS_OF_WEEK.includes(currentDate.getDay())) {
      const completedSteps = Math.round(totalSteps * Math.random());
      history.push({
        date: currentDate,
        completedSteps,
        totalSteps,
      });
    }

    currentDate = new Date(currentDate.getTime() + ONE_DAY);
  }

  return history;
};
