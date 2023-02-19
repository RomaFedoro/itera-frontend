import React from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import HabitStatisticBlock from '@/components/habit/HabitStatisticBlock';
import STATISTIC_BLOCKS from '@/constants/statistic';
import { createMockHistory } from '@/mocks/history';
import HabitProgessBlock from '@/container/HabitProgressBlock';
import { THabit } from '@/types/habit';

const HabitStatistics = ({ totalSteps, days }: THabit) => {
  const historyData = createMockHistory();

  return (
    <div className={cn('content', ' content_fill', styles.statistics)}>
      {STATISTIC_BLOCKS.map(({ label, getValue }) => (
        <HabitStatisticBlock
          key={label}
          label={label}
          value={getValue(historyData)}
        />
      ))}
      <HabitProgessBlock
        totalSteps={totalSteps}
        days={days}
        history={historyData}
      />
    </div>
  );
};

export default HabitStatistics;
