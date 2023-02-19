'use client';

import HabitInfo from '@/components/habit/HabitInfo';
import HabitStatistics from '@/components/habit/HabitStatistics';
import { THabit } from '@/types/habit';

export default function HabitPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const habitData: THabit = {
    id,
    name: 'Тестовая привычка',
    description: 'Тесовое описание привычки',
    days: [1, 3, 5, 0],
    totalSteps: 6,
  };

  return (
    <>
      <HabitInfo {...habitData} />
      <HabitStatistics {...habitData} />
    </>
  );
}
