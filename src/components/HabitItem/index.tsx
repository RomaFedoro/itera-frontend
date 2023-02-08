import React from 'react';
import HabitCheckbox from '@/components/ui/HabitCheckbox';
import styles from './styles.module.scss';
import { THabitItem } from '@/types/habit';
import cn from 'classnames';
import Link from 'next/link';

type THabitItemProps = {
  onChange?: (id: number, completedSteps: number) => void;
  onlyRead?: boolean;
} & THabitItem;

const HabitItem = ({
  id,
  title,
  totalSteps,
  completedSteps,
  onlyRead,
  onChange,
}: THabitItemProps) => {
  const needRepeat = totalSteps - completedSteps;

  const handleCheckboxChange = () => {
    if (onChange)
      onChange(
        id,
        totalSteps > completedSteps ? completedSteps + 1 : completedSteps - 1
      );
  };

  return (
    <div
      className={cn(
        styles.habit,
        needRepeat <= 0 && !onlyRead && styles.habit_completed
      )}
    >
      {!onlyRead && (
        <HabitCheckbox
          onChange={handleCheckboxChange}
          needRepeat={needRepeat}
        />
      )}
      <Link href={`/habits/${id}`} className={styles.habit__title}>
        {title}
      </Link>
    </div>
  );
};

export default HabitItem;
