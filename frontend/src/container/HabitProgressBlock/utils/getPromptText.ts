import { pluralWithNum } from '@/utils/plural';
import { TProgressRecord } from '../types';

const repeatPlural = (num: number) =>
  pluralWithNum(num, ['повторение', 'повторения', 'повторений']);

export const getPromptText = ({
  totalSteps,
  completedSteps,
  isComingHabit,
}: TProgressRecord) => {
  if (totalSteps === 0) return 'День отдыха';
  if (isComingHabit) return `Нужно выполнить ${repeatPlural(totalSteps)}`;
  return `Выполнено ${completedSteps} из ${repeatPlural(totalSteps)}`;
};
