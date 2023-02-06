import React from 'react';
import HabitCheckbox from '@/components/ui/HabitCheckbox';
import styles from './styles.module.scss';
import { THabitItem } from '@/types/habit';
import cn from 'classnames';

type THabitItemProps = {
  onChange: (id: number, completedSteps: number) => void;
} & THabitItem;

const HabitItem = ({
  id,
  title,
  totalSteps,
  completedSteps,
  onChange,
}: THabitItemProps) => {
  const needRepeat = totalSteps - completedSteps;

  const handleCheckboxChange = () => {
    onChange(
      id,
      totalSteps > completedSteps ? completedSteps + 1 : completedSteps - 1
    );
  };

  return (
    <div
      className={cn(styles.habit, needRepeat <= 0 && styles.habit_completed)}
    >
      <HabitCheckbox onChange={handleCheckboxChange} needRepeat={needRepeat} />
      <div className={styles.habit__title}>{title}</div>
    </div>
  );
};

export default HabitItem;
