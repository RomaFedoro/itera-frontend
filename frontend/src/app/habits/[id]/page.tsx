'use client';

import HabitInfo from '@/components/habit/HabitInfo';
import HabitStatistics from '@/components/habit/HabitStatistics';
import { useQuery } from '@tanstack/react-query';
import { getHabitFetch } from '@/services/habits';

export default function HabitPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const {
    isLoading,
    isError,
    data: habit,
  } = useQuery({
    queryKey: ['habits', id],
    queryFn: () => getHabitFetch(id),
  });

  if (!habit) return null;

  return (
    <>
      <HabitInfo {...habit.data} />
      <HabitStatistics {...habit.data} />
    </>
  );
}
