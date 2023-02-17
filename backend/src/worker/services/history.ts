import {History} from '@prisma/client';
import prisma from '../../utils/prisma';
import {getHabitByDay} from './habit';

export const getLastHistoryRecord = async () => {
  const record = await prisma.history.findMany({
    orderBy: {date: 'desc'},
    take: 1,
  });

  return record[0] ?? null;
}

export const makeHistory = async (date: Date) => {
  const day = date.getDay();

  const habits = await getHabitByDay(day);

  if (habits.length === 0)
    return;

  const history = habits.map((h): Omit<History, 'id'> => ({
    habitId: h.id,
    totalSteps: h.totalSteps,
    completedSteps: 0,
    date,
  }));

  console.log(history);

  return prisma.history.createMany({
    data: history,
  });
}
