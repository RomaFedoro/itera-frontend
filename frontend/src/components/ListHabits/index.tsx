import React from 'react';
import HabitItem from '@/components/HabitItem';
import { THabitList } from '@/types/habit';

type TListHabits = {
  habits: THabitList;
  onChange?: (id: number | string, completedSteps: number) => void;
  onlyRead?: boolean;
};

const ListHabits = ({ habits, onlyRead, onChange }: TListHabits) => {
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
