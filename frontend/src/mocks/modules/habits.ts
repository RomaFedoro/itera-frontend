import { faker } from '@faker-js/faker/locale/ru';

export type THabit = {
  id: number;
  title: string;
  totalSteps: number;
  description: string;
  days: number[];
  createdAt: Date;
};

const createHabit = (id: number): THabit => ({
  id,
  title: faker.lorem.words(),
  description: faker.lorem.sentence(),
  totalSteps: faker.datatype.number({ min: 1, max: 10 }),
  days: faker.helpers.arrayElements([0, 1, 2, 3, 4, 5, 6]),
  createdAt: faker.date.past(),
});

const createHabits = (num: number) => {
  const habits: THabit[] = [];

  for (let i = 0; i < num; i++) {
    habits.push(createHabit(i + 1));
  }

  return habits;
};

export default createHabits;
