import {User} from '@prisma/client';
import {StoreHabitRequestType, UpdateHabitRequestType} from '@/validators/habit';

export const getAllHabbits = async (userId: User['id']) => {
  return prisma.habit.findMany({
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
  const habitEntity = await prisma.habit.create({
    data: {
      userId,
      ...habit,
    },
  });

  await insertHistory(habitEntity);

  return habitEntity;
}

export const updateHabit = async (userId: User['id'], id: number, habit: UpdateHabitRequestType) => {
  const [{count}] = await prisma.$transaction([
    prisma.habit.updateMany({
      where: {id, userId},
      data: habit,
    }),
    prisma.history.updateMany({
      where: {habitId: id},
      data: {totalSteps: habit.totalSteps},
    }),
    prisma.$executeRaw`UPDATE "public"."History" SET "completedSteps" = "totalSteps" WHERE "habitId" = ${id} AND "completedSteps" > "totalSteps";`,
  ]);

  if (count === 0)
    throw NotFoundException('Habit not found');

  await insertHistoryByHabitId(id);

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
