import EditHabitForm from '@/container/form/EditHabitForm';

export default function HabitEditPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <div className="content content_fill">
      <EditHabitForm id={id} />
    </div>
  );
}
