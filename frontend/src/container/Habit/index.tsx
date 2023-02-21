'use client';

import HabitInfo from '@/components/habit/HabitInfo';
import HabitStatistics from '@/components/habit/HabitStatistics';
import { useQuery } from '@tanstack/react-query';
import { getHabitFetch } from '@/services/habits';
import LoadingPage from '../LoadingPage';

const Habit = ({ id }: { id: string }) => {
  const {
    isLoading,
    isError,
    data: habit,
  } = useQuery({
    queryKey: ['habits', id],
    queryFn: () => getHabitFetch(id),
  });

  if (!habit || isLoading) return <LoadingPage />;

  return (
    <>
      <HabitInfo {...habit.data} />
      <HabitStatistics {...habit.data} />
    </>
  );
};

export default Habit;
