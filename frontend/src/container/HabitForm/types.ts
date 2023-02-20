import { THabitResponse, THabitValues } from '@/types/habit';

export type THabitForm = {
  mutationFn: (body: THabitValues) => Promise<THabitResponse>;
  onSuccess?: (body: THabitResponse) => void;
  defaultValues?: Partial<THabitValues>;
};
