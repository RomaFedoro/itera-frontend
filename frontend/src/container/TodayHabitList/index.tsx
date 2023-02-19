'use client';

import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import ListHabits from '@/components/ListHabits';
import styles from './styles.module.scss';
import { THabitList } from '@/types/habit';

const TodayHabitList = () => {
  const [habitList, setHabitList] = useState<THabitList>([]);

  const habitListUnfinished = useMemo(
    () => habitList.filter((habit) => habit.completedSteps < habit.totalSteps),
    [habitList]
  );
  const habitListCompleted = useMemo(
    () => habitList.filter((habit) => habit.completedSteps >= habit.totalSteps),
    [habitList]
  );

  const completedOneStepHabit = useCallback(
    (id: number | string, completedSteps: number) => {
      setHabitList((prevHabits) =>
        prevHabits.map((habit) => {
          if (habit.id !== id) {
            return habit;
          }

          return { ...habit, completedSteps };
        })
      );
    },
    [setHabitList]
  );

  useEffect(() => {
    setHabitList([]);
  }, []);

  return (
    <div className={styles.list}>
      {habitListUnfinished.length > 0 && (
        <ListHabits
          onChange={completedOneStepHabit}
          habits={habitListUnfinished}
        />
      )}
      {habitListCompleted.length > 0 && (
        <ListHabits
          onChange={completedOneStepHabit}
          habits={habitListCompleted}
        />
      )}
    </div>
  );
};

export default memo(TodayHabitList);
