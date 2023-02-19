'use client';

import React from 'react';
import ListHabits from '@/components/ListHabits';
import { useQuery } from '@tanstack/react-query';
import { allHabitsFetch } from '@/services/habits';

const AllHabitList = () => {
  // const {
  //   isLoading,
  //   isError,
  //   data: habits,
  // } = useQuery({
  //   queryKey: ['todos', 'all'],
  //   queryFn: allHabitsFetch,
  // });

  // if (!habits) return null;

  return <ListHabits habits={[]} onlyRead />;
};

export default AllHabitList;
