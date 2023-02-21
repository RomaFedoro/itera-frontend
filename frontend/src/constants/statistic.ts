import { THistoryRecord } from '@/types/history';
import { pluralWithNum } from '../utils/plural';

type TStatisticProps = {
  label: string;
  getValue: (history: THistoryRecord[]) => string;
};

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

      if (totalSteps === 0) return '—%';

      return `${Math.round((totalCompletedSteps / totalSteps) * 100)}%`;
    },
  },
  {
    label: 'Начато выполнение',
    getValue: (history) => {
      const result = history.filter((day) => day.completedSteps > 0).length;
      return pluralWithNum(result, ['раз', 'раза', 'раз']);
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

      return pluralWithNum(maxStreak, ['день', 'дня', 'дней']);
    },
  },
];

export default STATISTIC_BLOCKS;
