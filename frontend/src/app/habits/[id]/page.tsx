import Habit from '@/container/Habit';

export default function HabitPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return <Habit id={id} />;
}
