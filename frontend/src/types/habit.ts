export type THabit = {
  id: number;
  title: string;
  totalSteps: number;
  days: number[];
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
