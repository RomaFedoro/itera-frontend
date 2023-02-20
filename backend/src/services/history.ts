import {Habit, History, User} from '@prisma/client';
import {max, min} from 'date-fns';
import {UpdateHistoryRequestType} from '@/validators/history';

export const getAllHistory = async (userId: User['id'], interval: Date[]) => {
  return await prisma.history.findMany({
    where: {
      habit: {userId},
      date: {gte: min(interval), lte: max(interval)},
    },
    include: {
      habit: {
        select: {name: true},
      },
    },
  });
}

export const getAllHistoryByHabit = async (userId: User['id'], habitId: Habit['id'], interval: Date[]) => {
  const history = await prisma.history.findMany({
    where: {
      habit: {userId},
      date: {gte: min(interval), lte: max(interval)},
      habitId,
    },
  });

  if (history.length === 0)
    throw NotFoundException('Habit history not found');

  return history;
}

export const updateHistory = async (userId: User['id'], id: History['id'], history: UpdateHistoryRequestType) => {
  const found = await prisma.history.findMany({
    where: {
      id,
      habit: {userId},
    },
  });

  if (found.length === 0)
    throw NotFoundException('History not found');

  if (history.completedSteps > found[0].totalSteps)
    throw ValidationException();

  await prisma.history.update({
    where: {id},
    data: history,
  });

  return true;
}


export const insertHistory = async (habit: Habit) => {
  const t = today();
  const day = t.getDay();

  if (!habit.days.includes(day))
    return;

  return await prisma.history.upsert({
    where: {
      habitId_date: {
        date: t,
        habitId: habit.id,
      },
    },
    update: {},
    create: {
      habitId: habit.id,
      totalSteps: habit.totalSteps,
      completedSteps: 0,
      date: t,
    },
  });
}

export const insertHistoryByHabitId = async (habitId: Habit['id']) => {
  const habit = await prisma.habit.findUnique({where: {id: habitId}});

  if (!habit)
    return;

  return await insertHistory(habit);
}
