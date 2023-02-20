import { Day } from 'date-fns';

export type THabit = {
  id: number | string;
  name: string;
  description?: string;
  totalSteps: number;
  days: Day[];
};

export type THabitValues = Omit<THabit, 'id'>;

export type THistoryHabit = {
  date: string;
  completedSteps: number;
  totalSteps: number;
};

export type THabitItem = {
  completedSteps: number;
} & Omit<THabit, 'days'>;

export type THabitList = THabitItem[];

export type THabitResponse = { data: THabit };
