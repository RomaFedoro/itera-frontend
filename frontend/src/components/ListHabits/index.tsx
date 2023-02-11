import React from 'react';
import HabitItem from '@/components/HabitItem';
import styles from './styles.module.scss';
import { THabitList } from '@/types/habit';

type TListHabits = {
  habits: THabitList;
  onChange?: (id: number, completedSteps: number) => void;
  onlyRead?: boolean;
};

const ListHabits = ({ habits, onlyRead, onChange }: TListHabits) => {
  return (
    <ul className={styles.container}>
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
