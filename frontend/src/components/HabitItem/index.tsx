import React from 'react';
import HabitCheckbox from '@/components/ui/HabitCheckbox';
import styles from './styles.module.scss';
import { THabit, THabitItem } from '@/types/habit';
import cn from 'classnames';
import Link from 'next/link';

type THabitItemProps =
  | ({
      onlyRead: false;
      onChange: (id: number | string, completedSteps: number) => void;
    } & THabitItem)
  | ({ onlyRead: true; onChange?: never; completedSteps?: never } & THabit);

const HabitItem = ({
  id,
  name,
  totalSteps,
  completedSteps,
  onlyRead = false,
  onChange,
}: THabitItemProps) => {
  const needRepeat = !onlyRead ? totalSteps - completedSteps! : null;

  const handleCheckboxChange = () => {
    if (!onlyRead && completedSteps !== undefined && onChange)
      onChange(
        id,
        totalSteps > completedSteps ? completedSteps + 1 : completedSteps - 1
      );
  };

  return (
    <div
      className={cn(
        styles.habit,
        !onlyRead && needRepeat! <= 0 && styles.habit_completed
      )}
    >
      {!onlyRead && (
        <HabitCheckbox
          onChange={handleCheckboxChange}
          needRepeat={needRepeat!}
        />
      )}
      <Link href={`/habits/${id}`} className={styles.habit__title}>
        {name}
      </Link>
    </div>
  );
};

export default HabitItem;
