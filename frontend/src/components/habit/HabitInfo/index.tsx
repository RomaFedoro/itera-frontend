import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import HabitDaysWeek from '@/components/habit/HabitDaysWeek';
import { THabit } from '@/types/habit';
import HabitButtons from '@/components/habit/HabitButtons';

const HabitInfo = ({ id, name, description, days }: THabit) => {
  console.log(id, name, description, days);

  return (
    <div className={cn(styles.container, 'content-row')}>
      <div className={cn(styles.inform, 'list')}>
        <div className={cn(styles.inform__name, 'list')}>
          <h1>{name}</h1>
          {description && <span className="description">{description}</span>}
        </div>
        <div className={styles.inform__container}>
          {days && <HabitDaysWeek days={days} />}
        </div>
      </div>
      <div className={cn(styles.buttons, 'list-row')}>
        <HabitButtons id={id} />
      </div>
    </div>
  );
};

export default HabitInfo;
