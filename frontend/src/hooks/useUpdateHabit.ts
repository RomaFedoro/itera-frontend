import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { THabitResponse, THabitsResponse } from '@/types/habit';

type TUseUpdateHabit = {
  defaultId?: number | string;
  mode?: 'add' | 'edit';
};

const useUpdateHabit = (
  { mode, defaultId }: TUseUpdateHabit = { mode: 'add' }
) => {
  const router = useRouter();
  const client = useQueryClient();

  return useCallback(
    ({ data: habit }: THabitResponse) => {
      const id = habit.id ?? defaultId;

      if (!id) router.push('/');
      console.log(id, habit);

      client.setQueriesData<THabitsResponse>(['habits', 'all'], (habitData) => {
        if (mode === 'add') {
          return { data: [...(habitData?.data ?? []), habit] };
        } else if (mode === 'edit') {
          return {
            data: habitData
              ? habitData?.data.map((oldHabit) =>
                  oldHabit.id === id ? { ...oldHabit, ...habit } : oldHabit
                )
              : [],
          };
        }
        return habitData;
      });
      client.invalidateQueries({
        queryKey: ['habits', 'all'],
        refetchType: 'none',
      });

      // client.setQueriesData<THabitResponse>(['habits', id], (oldHabit) => {
      //   console.log(oldHabit);

      //   return {
      //     data: {
      //       ...habit,
      //     },
      //   };
      // });
      client.invalidateQueries({
        queryKey: ['habits', id],
        // refetchType: 'none',
      });

      router.push('/habits/' + id);
    },
    [client, defaultId, mode, router]
  );
};

export default useUpdateHabit;
