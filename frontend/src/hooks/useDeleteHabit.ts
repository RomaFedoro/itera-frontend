import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { THabitResponse, THabitsResponse } from '@/types/habit';
import { deleteHabitFetch, getHabitFetch } from '@/services/habits';

const useDeleteHabit = (id: string) => {
  const router = useRouter();
  const client = useQueryClient();

  const { data: habit } = useQuery({
    queryKey: ['habits', id],
    queryFn: () => getHabitFetch(id),
  });

  const closePage = () => {
    router.push('/habits/' + id);
  };

  const onSuccess = () => {
    client.setQueriesData<THabitsResponse>(['habits', 'all'], (habitData) => ({
      data: habitData
        ? habitData?.data.filter((habit) => String(habit.id) !== id)
        : [],
    }));
    client.invalidateQueries({
      queryKey: ['habits', 'all'],
      refetchType: 'none',
    });

    client.setQueriesData<THabitResponse>(['habits', id], () => undefined);

    client.invalidateQueries({
      queryKey: ['habits', id],
      refetchType: 'none',
    });

    router.push('/');
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => deleteHabitFetch(id),
    onSuccess,
  });

  return { habit, closePage, deleteHabit: () => mutate(), isLoading };
};

export default useDeleteHabit;
