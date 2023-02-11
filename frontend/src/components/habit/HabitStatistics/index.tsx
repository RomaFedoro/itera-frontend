import React from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import HabitStatisticBlock from '@/components/habit/HabitStatisticBlock';

const HabitStatistics = () => {
  return (
    <div className={cn('content', styles.statistics)}>
      <HabitStatisticBlock />
      <HabitStatisticBlock />
      <HabitStatisticBlock />
    </div>
  );
};

export default HabitStatistics;
