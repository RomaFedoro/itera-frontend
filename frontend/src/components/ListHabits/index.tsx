import React from 'react';
import HabitItem from '@/components/HabitItem';
import { TListHabitsProps } from '@/types/habit';

const ListHabits = ({ habits, onlyRead = false }: TListHabitsProps) => {
  return (
    <ul className="list">
      {habits.map(({ name, id, ...rest }) => (
        <li key={id}>
          <HabitItem id={id} name={name} onlyRead={onlyRead} {...rest} />
        </li>
      ))}
    </ul>
  );
};

export default ListHabits;
