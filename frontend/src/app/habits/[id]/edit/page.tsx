
import HabitForm from '@/container/HabitForm';

export default function HabitEditPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <div className="content content_fill">
      <HabitForm />
    </div>
  );
}
