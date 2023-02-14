import { DAYS_OF_WEEK, EVERY_DAY_DATA } from '@/constants/daysweek';
import { TDaysOfWeekOption } from '@/types/daysweek';

const getDaysOfWeek = (days: TDaysOfWeekOption) => {
  const daysOfWeek = DAYS_OF_WEEK.filter(({ value }) => days[value] === true);

  if (daysOfWeek.length === 7) return 'Каждый день';
  if (daysOfWeek.length === 0) return 'Никогда';

  if (daysOfWeek.length === 1) {
    const { declensionCode, label } = daysOfWeek[0];
    return `${EVERY_DAY_DATA[declensionCode]} ${label}`;
  }

  return `Каждые ${daysOfWeek.map(({ label }) => label).join(', ')}`;
};

export default getDaysOfWeek;
