'use client';

import React, { memo, useCallback, useMemo } from 'react';
import ListHabits from '@/components/ListHabits';
import styles from './styles.module.scss';
import { useQuery } from '@tanstack/react-query';
import { todayHabitFetch } from '@/services/history';
import ErrorPlug from '@/components/plugs/ErrorPlug';
import TodayPlug from '@/components/plugs/TodayPlug';
import ListHabitsSkeleton from '@/components/ListHabits/skeleton';
import { THabitItem } from '@/types/habit';

const TodayHabitList = () => {
  const {
    isLoading,
    isError,
    data: historyData,
  } = useQuery({
    queryKey: ['today'],
    queryFn: todayHabitFetch,
  });

  const changeTodayHabit = useCallback(
    (recordId: number | string) => (completedSteps: number) => {
      // setHabitList((prevHabits) =>
      //   prevHabits.map((habit) => {
      //     if (habit.id !== id) {
      //       return habit;
      //     }
      //     return { ...habit, completedSteps };
      //   })
      // );
    },
    []
  );

  const todayData: THabitItem[] = useMemo(
    () =>
      historyData?.data.map(({ id, habitId, habit: { name }, ...rest }) => ({
        id: habitId,
        name,
        onChange: changeTodayHabit(id),
        ...rest,
      })) ?? [],
    [changeTodayHabit, historyData?.data]
  );

  const habitListUnfinished = useMemo(
    () => todayData.filter((habit) => habit.completedSteps < habit.totalSteps),
    [todayData]
  );
  const habitListCompleted = useMemo(
    () => todayData.filter((habit) => habit.completedSteps >= habit.totalSteps),
    [todayData]
  );

  if (isError) return <ErrorPlug />;
  if (!historyData || isLoading) return <ListHabitsSkeleton />;
  if (todayData.length === 0) return <TodayPlug />;

  return (
    <div className={styles.list}>
      {habitListUnfinished.length > 0 && (
        <ListHabits habits={habitListUnfinished} />
      )}
      {habitListCompleted.length > 0 && (
        <ListHabits habits={habitListCompleted} />
      )}
    </div>
  );
};

export default memo(TodayHabitList);
