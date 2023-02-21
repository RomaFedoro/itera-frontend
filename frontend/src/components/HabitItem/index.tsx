import React from 'react';
import HabitCheckbox from '@/components/ui/HabitCheckbox';
import styles from './styles.module.scss';
import { THabitItem, THabitItemProps } from '@/types/habit';
import cn from 'classnames';
import Link from 'next/link';

const HabitItem = ({
  id,
  name,
  onlyRead = false,
  ...habit
}: THabitItemProps) => {
  if (onlyRead)
    return (
      <div className={styles.habit}>
        <Link href={`/habits/${id}`} className={styles.habit__title}>
          {name}
        </Link>
      </div>
    );

  const { totalSteps, completedSteps, onChange } = habit as THabitItem;
  const needRepeat = totalSteps - completedSteps;
  const handleCheckboxChange = () =>
    onChange(
      totalSteps > completedSteps ? completedSteps + 1 : completedSteps - 1
    );

  return (
    <div
      className={cn(styles.habit, needRepeat! <= 0 && styles.habit_completed)}
    >
      <HabitCheckbox onChange={handleCheckboxChange} needRepeat={needRepeat!} />
      <Link href={`/habits/${id}`} className={styles.habit__title}>
        {name}
      </Link>
    </div>
  );
};

export default HabitItem;
