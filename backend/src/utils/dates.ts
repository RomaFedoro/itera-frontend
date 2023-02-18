import {zonedTimeToUtc} from 'date-fns-tz';
import {parse} from 'date-fns';

type DC = number | string | Date;

export const now = (arg?: DC) => {
  return zonedTimeToUtc(arg ? new Date(arg) : new Date(), 'UTC');
};

export const onlyDay = (arg?: DC) => {
  const date = arg ? new Date(arg) : new Date();
  date.setUTCHours(0, 0, 0, 0);

  return date;
}

export const today = () => {
  return onlyDay(now());
}

export const parseDateString = (value: string, originalValue: string) => {
  return parse(originalValue, "dd.MM.yyyy", today());
}
