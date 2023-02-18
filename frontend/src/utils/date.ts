import { DAYS_OF_WEEK } from '@/constants/daysweek';

export const ONE_DAY = 1000 * 60 * 60 * 24;

export const getOnlyDate = (dateWithTime: Date = new Date()) =>
  new Date(Math.ceil(+dateWithTime / ONE_DAY) * ONE_DAY);

export const addDays = (date: Date, numberDays: number) =>
  new Date(+getOnlyDate(date) + numberDays * ONE_DAY);

export const getSundayThisWeek = (date: Date = new Date()) =>
  addDays(date, (7 - date.getDay()) % 7);

export const formattingDate = (date: Date = new Date(), showYear: boolean = false) => {
  const day = date.getDate();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');

  const dayOfWeek = DAYS_OF_WEEK.filter((day) => day.value === date.getDay())[0]
    .label;

  const formattedDate = [day, month];
  if (showYear) formattedDate.push(date.getFullYear());

  return `${formattedDate.join('.')}, ${dayOfWeek}`;
};
