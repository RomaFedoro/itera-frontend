import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import HabitDaysWeek from '@/components/habit/HabitDaysWeek';

const HabitInfo = () => {
  return (
    <div className={cn(styles.inform, 'content')}>
      <div className={styles.inform__container}>
        <h1>Название привычки</h1>
      </div>
      <div className={styles.inform__container}>
        <HabitDaysWeek />
      </div>
    </div>
  );
};

export default HabitInfo;
