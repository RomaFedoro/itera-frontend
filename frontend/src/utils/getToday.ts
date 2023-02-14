import { DAYS_OF_WEEK } from '@/constants/daysweek';

const getToday = () => {
  const today = new Date();

  const day = today.getDate();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const dayOfWeek = DAYS_OF_WEEK.filter(
    (day) => day.value === today.getDay()
  )[0].label;

  return `${day}.${month}, ${dayOfWeek}`;
};

export default getToday;
