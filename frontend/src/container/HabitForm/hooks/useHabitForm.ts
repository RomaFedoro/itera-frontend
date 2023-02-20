import { useMutation } from '@tanstack/react-query';
import { THabitResponse, THabitValues } from '@/types/habit';
import useMutationForm from '@/hooks/useForm';
import { DEFAULT_HABIT_FORM } from '../constants';
import { THabitForm } from '../types';

const useHabitForm = ({
  mutationFn,
  onSuccess,
  defaultValues = DEFAULT_HABIT_FORM,
}: THabitForm) => {
  const { mutate } = useMutation({
    mutationFn,
    onSuccess,
  });

  return useMutationForm<THabitValues, THabitResponse>(mutate, {
    defaultValues,
  });
};

export default useHabitForm;
