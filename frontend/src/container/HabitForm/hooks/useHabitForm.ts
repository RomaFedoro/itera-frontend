import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { THabitResponse, THabitValues } from '@/types/habit';
import useMutationForm from '../../../hooks/useForm';

const useHabitForm = (
  mutationFn: (body: THabitValues) => Promise<THabitResponse>
) => {
  const router = useRouter();
  const client = useQueryClient();

  const { mutate } = useMutation({
    mutationFn,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return useMutationForm<THabitValues, THabitResponse>(mutate, {
    defaultValues: {
      days: [0, 1, 2, 3, 4, 5, 6],
      totalSteps: 1,
    },
  });
};

export default useHabitForm;
