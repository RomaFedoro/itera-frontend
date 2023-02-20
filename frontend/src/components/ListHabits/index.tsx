import React from 'react';
import HabitItem from '@/components/HabitItem';
import { THabit, THabitList } from '@/types/habit';

type TListHabits =
  | {
      habits: THabit[];
      onlyRead: true;
      onChange?: never;
    }
  | {
      habits: THabitList;
      onlyRead: false;
      onChange: (id: number | string, completedSteps: number) => void;
    };

const ListHabits = ({ habits, onlyRead = false, onChange }: TListHabits) => {
  return (
    <ul className="list">
      {habits.map((habit) => (
        <HabitItem
          key={habit.id}
          onChange={onChange}
          onlyRead={onlyRead}
          {...habit}
        />
      ))}
    </ul>
  );
};

export default ListHabits;
