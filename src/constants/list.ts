import { THabitList } from '@/types/habit';

export const defaultHabitList: THabitList = [
  {
    id: 1,
    title: 'Пить воду 1',
    totalSteps: 10,
    completedSteps: 5,
  },
  {
    id: 2,
    title: 'Пить воду 2',
    totalSteps: 10,
    completedSteps: 10,
  },
  {
    id: 3,
    title: 'Пить воду 3',
    totalSteps: 10,
    completedSteps: 1,
  },
].sort((a, b) => a.id - b.id);
