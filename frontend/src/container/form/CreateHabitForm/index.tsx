'use client';

import React from 'react';
import HabitForm from '@/container/HabitForm';
import { createHabitsFetch } from '@/services/habits';
import useCreateHabit from '@/hooks/useUpdateHabit';

const CreateHabitForm = () => {
  const onSuccess = useCreateHabit();

  return (
    <HabitForm
      mutationFn={createHabitsFetch}
      onSuccess={onSuccess}
      textSubmitButton="Создать привычку"
      cancelHref="/"
    />
  );
};

export default CreateHabitForm;
