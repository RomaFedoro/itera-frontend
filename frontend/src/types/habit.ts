import { Day } from 'date-fns';

export type THabit = {
  id: number | string;
  title: string;
  description?: string;
  totalSteps: number;
  days: Day[];
};

export type THistoryHabit = {
  date: string;
  completedSteps: number;
  totalSteps: number;
};

export type THabitItem = {
  completedSteps: number;
} & Omit<THabit, 'days'>;

export type THabitList = THabitItem[];
