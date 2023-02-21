import React from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import HabitStatisticBlock from '@/components/habit/HabitStatisticBlock';
import STATISTIC_BLOCKS from '@/constants/statistic';
import HabitProgessBlock from '@/container/HabitProgressBlock';
import { THabit } from '@/types/habit';
import { useQuery } from '@tanstack/react-query';
import { historyHabitsFetch } from '@/services/habits';
import LoadingPage from '@/container/LoadingPage';

const HabitStatistics = ({ id, totalSteps, days }: THabit) => {
  const {
    isLoading,
    data: historyData,
  } = useQuery({
    queryKey: ['history', String(id)],
    queryFn: () => historyHabitsFetch(id),
  });

  if (!historyData || isLoading) return <LoadingPage dark />;

  return (
    <div className={cn('content', ' content_fill', styles.statistics)}>
      {STATISTIC_BLOCKS.map(({ label, getValue }) => (
        <HabitStatisticBlock
          key={label}
          label={label}
          value={getValue(historyData.data)}
        />
      ))}
      <HabitProgessBlock
        totalSteps={totalSteps}
        days={days}
        history={historyData.data}
      />
    </div>
  );
};

export default HabitStatistics;
