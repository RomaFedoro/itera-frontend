import React from 'react';
import HabitItem from '@/components/HabitItem';
import styles from './styles.module.scss';
import { THabitList } from '@/types/habit';

type TListHabits = {
  habits: THabitList;
  onChange: (id: number, completedSteps: number) => void;
};

const ListHabits = ({ habits, onChange }: TListHabits) => {
  return (
    <ul className={styles.container}>
      {habits.map((habit) => (
        <HabitItem key={habit.id} onChange={onChange} {...habit} />
      ))}
    </ul>
  );
};

export default ListHabits;
