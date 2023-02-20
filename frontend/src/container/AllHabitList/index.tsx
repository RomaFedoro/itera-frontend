'use client';

import React from 'react';
import ListHabits from '@/components/ListHabits';
import { useQuery } from '@tanstack/react-query';
import { getHabitsFetch } from '@/services/habits';

const AllHabitList = () => {
  const {
    isLoading,
    isError,
    data: habits,
  } = useQuery({
    queryKey: ['habits', 'all'],
    queryFn: () => getHabitsFetch(),
  });

  if (!habits) return null;

  return <ListHabits habits={habits.data} onlyRead />;
};

export default AllHabitList;
