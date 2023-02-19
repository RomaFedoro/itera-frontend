import { addDays, eachDayOfInterval, formatISO, lastDayOfWeek } from 'date-fns';
import { CIRCLES_IN_RAY, TOTAL_RAYS } from '../constants/size';
import { THabitProgressProps, TProgressData } from '../types';

const getProgressData = ({
  history,
  totalSteps: totalStepsHabit,
  days,
}: THabitProgressProps) => {
  const progressData: TProgressData = {};

  const today = formatISO(new Date(), { representation: 'date' });
  const end = addDays(
    lastDayOfWeek(new Date(), { weekStartsOn: 1 }),
    CIRCLES_IN_RAY
  );
  const start = addDays(end, -(TOTAL_RAYS - 1) * CIRCLES_IN_RAY + 1);

  eachDayOfInterval({
    start,
    end,
  }).forEach((date) => {
    const currentDay = formatISO(date, {
      representation: 'date',
    });

    const isComingHabit = currentDay > today && days.includes(date.getDay() as Day);

    progressData[currentDay] = {
      totalSteps: isComingHabit ? totalStepsHabit : 0,
      completedSteps: 0,
      isComingHabit,
    };
  });

  history.forEach((record) => {
    const date = formatISO(new Date(record.date), { representation: 'date' });
    if (!progressData[date]) return;

    const { totalSteps, completedSteps } = record;

    progressData[date] = {
      ...progressData[date],
      totalSteps,
      completedSteps,
    };
  });

  return { progressData, today };
};

export default getProgressData;
