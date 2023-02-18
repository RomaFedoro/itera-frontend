import React from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import HabitStatisticBlock from '@/components/habit/HabitStatisticBlock';
import STATISTIC_BLOCKS from '@/constants/statistic';
import { createMockHistory } from '@/mocks/history';
import HabitProgessBlock from '../HabitProgressBlock';

const HabitStatistics = () => {
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
      <HabitProgessBlock totalSteps={6} days={[1, 3, 5, 0]} history={historyData} />
    </div>
  );
};

export default HabitStatistics;
