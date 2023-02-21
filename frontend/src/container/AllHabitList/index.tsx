'use client';

import React from 'react';
import ListHabits from '@/components/ListHabits';
import { useQuery } from '@tanstack/react-query';
import { allHabitsFetch } from '@/services/habits';
import AllHabitsPlug from '@/components/plugs/AllHabitsPlug';
import ErrorPlug from '@/components/plugs/ErrorPlug';

const AllHabitList = () => {
  const {
    isLoading,
    isError,
    data: habits,
  } = useQuery({
    queryKey: ['habits', 'all'],
    queryFn: allHabitsFetch,
  });

  if (isError) return <ErrorPlug />;
  if (!habits || isLoading) return <ListHabits loading />;
  if (habits.data.length === 0) return <AllHabitsPlug />;

  return <ListHabits habits={habits.data} onlyRead />;
};

export default AllHabitList;
