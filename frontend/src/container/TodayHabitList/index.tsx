'use client';

import React, { memo, useCallback, useMemo } from 'react';
import ListHabits from '@/components/ListHabits';
import styles from './styles.module.scss';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { todayHabitFetch, updateCompletedStepsFetch } from '@/services/history';
import ErrorPlug from '@/components/plugs/ErrorPlug';
import TodayPlug from '@/components/plugs/TodayPlug';
import ListHabitsSkeleton from '@/components/ListHabits/skeleton';
import { THabitItem, TUpdateCompletedSteps } from '@/types/habit';
import { THistoryRecordResponse, TTodayHabitResponse } from '@/types/history';

const TodayHabitList = () => {
  const {
    isLoading,
    isError,
    data: historyData,
  } = useQuery({
    queryKey: ['today'],
    queryFn: todayHabitFetch,
  });

  const client = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateCompletedStepsFetch,
    onSuccess: ({ data: { completedSteps } }, { id, habitId }) => {
      client.setQueriesData<TTodayHabitResponse>(['today'], (todayData) => ({
        data:
          todayData?.data.map((todayHabit) =>
            String(todayHabit.id) === String(id)
              ? { ...todayHabit, completedSteps }
              : todayHabit
          ) ?? [],
      }));
      client.invalidateQueries({
        queryKey: ['today'],
        refetchType: 'none',
      });

      client.setQueriesData<THistoryRecordResponse>(
        ['today'],
        (historyData) => ({
          data:
            historyData?.data.map((historyRecord) =>
              String(historyRecord.id) === String(id)
                ? { ...historyRecord, completedSteps }
                : historyRecord
            ) ?? [],
        })
      );
      client.invalidateQueries({
        queryKey: ['history', String(habitId)],
        refetchType: 'none',
      });
    },
  });

  const changeTodayHabit = useCallback(
    (id: number | string) =>
      ({ completedSteps, habitId }: TUpdateCompletedSteps) => {
        mutate({ id, habitId, completedSteps });
      },
    [mutate]
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
