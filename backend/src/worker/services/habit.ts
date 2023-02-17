import prisma from '../../utils/prisma';

export const getHabitByDay = async (day: number) => {
  return prisma.habit.findMany({
    where: {
      days: { has: day },
    },
  });
}
