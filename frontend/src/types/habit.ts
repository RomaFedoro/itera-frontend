export type THabit = {
  id: number;
  title: string;
  description: string;
  totalSteps: number;
  days: number[];
};

export type THabitItem = {
  completedSteps: number;
} & Omit<THabit, 'days'>;

export type THabitList = THabitItem[];
