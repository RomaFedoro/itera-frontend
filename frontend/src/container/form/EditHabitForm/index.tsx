'use client';

import React, { memo, useCallback } from 'react';
import HabitForm from '@/container/HabitForm';
import { getHabitFetch, updateHabitsFetch } from '@/services/habits';
import useUpdateHabit from '@/hooks/useUpdateHabit';
import { useQuery } from '@tanstack/react-query';
import { THabitValues } from '@/types/habit';

const EditHabitForm = ({ id }: { id: number | string }) => {
  const { isError, data: habit } = useQuery({
    queryKey: ['habits', id],
    queryFn: () => getHabitFetch(id),
  });

  const onSuccess = useUpdateHabit({ defaultId: id, mode: 'edit' });

  const editHabitHandle = useCallback(
    (body: THabitValues) => updateHabitsFetch(id, body),
    [id]
  );

  if (!habit) return null;

  return (
    <HabitForm
      mutationFn={editHabitHandle}
      onSuccess={onSuccess}
      defaultValues={habit.data}
      textSubmitButton="Изменить привычку"
      cancelHref={`/habits/${id}`}
    />
  );
};

export default memo(EditHabitForm);
