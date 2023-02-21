import React from 'react';
import HabitItem from '@/components/HabitItem';
import { THabit, THabitList } from '@/types/habit';
import HabitItemSkeleton from '../HabitItem/skeleton';

type TListHabits =
  | {
      habits: THabit[];
      onlyRead: true;
      loading?: false;
      onChange?: never;
    }
  | {
      habits: THabitList;
      loading?: false;
      onlyRead: false;
      onChange: (id: number | string, completedSteps: number) => void;
    }
  | {
      loading: true;
      habits?: never;
      onlyRead?: never;
      onChange?: never;
    };

const ListHabits = ({
  habits,
  loading,
  onlyRead = false,
  onChange,
}: TListHabits) => {

  if (loading)
    return (
      <ul className="list">
        {Array(3).fill(0).map((_, index) => (
          <li key={index}>
            <HabitItemSkeleton />
          </li>
        ))}
      </ul>
    );

  return (
    <ul className="list">
      {habits.map((habit) => (
        <li key={habit.id}>
          <HabitItem onChange={onChange} onlyRead={onlyRead} {...habit} />
        </li>
      ))}
    </ul>
  );
};

export default ListHabits;
