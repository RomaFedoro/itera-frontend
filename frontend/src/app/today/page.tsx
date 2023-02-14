import TodayHabitList from '@/container/TodayHabitList';
import getToday from '@/utils/getToday';

export default function TodayPage() {
  const todayDate = getToday();

  return (
    <div className="content content_fill">
      <h1>{todayDate}</h1>
      <TodayHabitList />
    </div>
  );
}
