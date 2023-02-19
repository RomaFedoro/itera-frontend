import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import HabitDaysWeek from '@/components/habit/HabitDaysWeek';
import { THabit } from '@/types/habit';
import IteraButton from '@/components/ui/IteraButton';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

const HabitInfo = ({ id, title, description, days }: THabit) => {
  return (
    <div className={cn(styles.container, 'content-row')}>
      <div className={cn(styles.inform, 'list')}>
        <div className="list">
          <h1>{title}</h1>
          {description && (
            <span className={styles.description}>{description}</span>
          )}
        </div>
        <div className={styles.inform__container}>
          {days && <HabitDaysWeek days={days} />}
        </div>
      </div>
      <div className={cn(styles.buttons, 'list-row')}>
        <IteraButton secondary small>
          <PencilIcon />
        </IteraButton>
        <IteraButton secondary small>
          <TrashIcon />
        </IteraButton>
      </div>
    </div>
  );
};

export default HabitInfo;
