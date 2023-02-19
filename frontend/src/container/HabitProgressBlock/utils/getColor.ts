import {
  FREE_DAY_COLOR,
  NEED_DONE_HABIT_COLOR,
  DONE_HABIT_COLOR,
} from '../constants/color';
import { TColor, TProgressRecord } from '../types';

const getColorRGB = (color: TColor) => `rgb(${color.join(', ')})`;

const getColor = ({ completedSteps, totalSteps }: TProgressRecord) => {
  if (totalSteps === 0) return getColorRGB(FREE_DAY_COLOR);

  const percent = completedSteps / totalSteps;
  const color: TColor = [0, 0, 0];

  for (let i = 0; i < 3; i++) {
    color[i] =
      NEED_DONE_HABIT_COLOR[i] +
      (DONE_HABIT_COLOR[i] - NEED_DONE_HABIT_COLOR[i]) * percent;
  }

  return getColorRGB(color);
};

export default getColor;
