import { addDays, getOnlyDate, getSundayThisWeek } from '@/utils/date';
import { CIRCLES_IN_RAY, TOTAL_RAYS } from '../constants/size';
import { THabitProgressProps, TProgressData } from '../types';

const getProgressData = ({
  history,
  totalSteps: totalStepsHabit,
  days,
}: THabitProgressProps) => {
  const today = getOnlyDate();
  const endDay = addDays(getSundayThisWeek(), CIRCLES_IN_RAY);
  const startDay = addDays(endDay, -(TOTAL_RAYS - 1) * CIRCLES_IN_RAY + 1);
  const progressData: TProgressData = {};

  for (
    let currentDay = new Date(startDay);
    currentDay <= endDay;
    currentDay = addDays(currentDay, 1)
  ) {
    const isComingHabit =
      currentDay >= today && days.includes(currentDay.getDay());

    progressData[currentDay.toISOString()] = {
      totalSteps: isComingHabit ? totalStepsHabit : 0,
      completedSteps: 0,
      isComingHabit,
    };
  }

  for (const record of history) {
    if (!progressData[record.date]) continue;

    const { date, totalSteps, completedSteps } = record;

    progressData[date] = {
      ...progressData[date],
      totalSteps,
      completedSteps,
    };
  }

  return { progressData, today: today.toISOString() };
};

export default getProgressData;
