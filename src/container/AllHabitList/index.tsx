import React from 'react';
import ListHabits from '@/components/ListHabits';
import { defaultHabitList } from '@/constants/list';

const AllHabitList = () => {
  return <ListHabits habits={defaultHabitList} onlyRead />;
};

export default AllHabitList;
