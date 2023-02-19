import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';

export const getToday = () =>
  format(new Date(), 'd.MM, EEEEEE', {
    locale: ru,
  }).toLowerCase();
