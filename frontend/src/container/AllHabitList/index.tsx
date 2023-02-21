'use client';

import React from 'react';
import ListHabits from '@/components/ListHabits';
import { useQuery } from '@tanstack/react-query';
import { allHabitsFetch } from '@/services/habits';

const AllHabitList = () => {
  const {
    isLoading,
    isError,
    data: habits,
  } = useQuery({
    queryKey: ['habits', 'all'],
    queryFn: allHabitsFetch,
  });

  if (!habits || isLoading) return <ListHabits loading />;

  return <ListHabits habits={habits.data} onlyRead />;
};

export default AllHabitList;
