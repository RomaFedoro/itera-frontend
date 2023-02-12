import {User} from '@prisma/client';
import {StoreHabitRequestType, UpdateHabitRequestType} from '@/validators/habit';

export const getAllHabbits = async (userId: User['id']) => {
  return await prisma.habit.findMany({
    where: {userId},
  });
}

export const getHabitById = async (userId: User['id'], id: number) => {
  const habit = await prisma.habit.findMany({
    where: {id, userId},
  });

  if (habit.length === 0)
    throw NotFoundException('Habit not found');

  return habit[0];
}

export const storeHabit = async (userId: User['id'], habit: StoreHabitRequestType) => {
  return await prisma.habit.create({
    data: {
      userId,
      ...habit,
    },
  });
}

export const updateHabit = async (userId: User['id'], id: number, habit: UpdateHabitRequestType) => {
  const {count} = await prisma.habit.updateMany({
    where: {id, userId},
    data: habit,
  });

  if (count === 0)
    throw NotFoundException('Habit not found');

  return true;
}

export const deleteHabit = async (userId: User['id'], id: number) => {
  const {count} = await prisma.habit.deleteMany({
    where: {id, userId},
  });

  if (count === 0)
    throw NotFoundException('Habit not found');

  return true;
}
