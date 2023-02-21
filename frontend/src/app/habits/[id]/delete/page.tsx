import DeleteHabit from '@/container/DeleteHabit';

export default function HabitDeletePage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <div className="content content_fill content_between">
      <DeleteHabit id={id} />
    </div>
  );
}
