import { Day } from 'date-fns';

export type THabit = {
  id: number | string;
  name: string;
  description?: string;
  totalSteps: number;
  days: Day[];
};

export type THabitValues = Omit<THabit, 'id'>;

export type TListHabitsProps =
  | {
      habits: THabitItemReadOnly[];
      onlyRead?: true;
    }
  | {
      habits: THabitItem[];
      onlyRead?: false;
    };

export type THabitItemProps =
  | ({ onlyRead: false } & THabitItem)
  | ({ onlyRead: boolean } & THabitItemReadOnly);

export type THabitItemReadOnly = {
  id: number | string;
  name: string;
};

export type THabitItem = THabitItemReadOnly & {
  totalSteps: number;
  completedSteps: number;
  onChange: ({ completedSteps, habitId }: TUpdateCompletedSteps) => void;
};

export type TUpdateCompletedSteps = {
  completedSteps: number;
  habitId: number | string;
};

export type THabitResponse = { data: THabit };
export type THabitsResponse = { data: THabit[] };
