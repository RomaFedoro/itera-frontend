import { THistoryHabit } from '@/types/habit';
import plural from '../utils/plural';

type TStatisticProps = {
  label: string;
  getValue: (history: THistoryHabit[]) => string;
};

const dayPlural = (num: number) =>
  `${num} ${plural(num, ['день', 'дня', 'дней'])}`;

const STATISTIC_BLOCKS: TStatisticProps[] = [
  {
    label: 'Продуктивность',
    getValue: (history) => {
      let totalCompletedSteps = 0;
      let totalSteps = 0;

      for (const day of history) {
        totalCompletedSteps += day.completedSteps;
        totalSteps += day.totalSteps;
      }

      return `${Math.round((totalCompletedSteps / totalSteps) * 100)}%`;
    },
  },
  {
    label: 'Начато выполнение',
    getValue: (history) => {
      let result = history.filter((day) => day.completedSteps > 0).length;
      return dayPlural(result);
    },
  },
  {
    label: 'Максимально подряд',
    getValue: (history) => {
      let maxStreak = 0;
      let currentStreak = 0;

      for (const day of history) {
        currentStreak = !day.completedSteps ? 0 : currentStreak + 1;
        maxStreak = Math.max(maxStreak, currentStreak);
      }

      return dayPlural(maxStreak);
    },
  },
];

export default STATISTIC_BLOCKS;
