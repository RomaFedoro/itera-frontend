import {History} from '@prisma/client';
import prisma from '../../utils/prisma';
import {getHabitByDay} from './habit';

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

  for (const h of history) {
    await prisma.history.upsert({
      where: {
        habitId_date: {habitId: h.habitId, date: h.date}
      },
      update: {},
      create: h,
    });
  }
}
