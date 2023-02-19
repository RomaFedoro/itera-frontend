import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useMemo, useState } from 'react';
import { TPosition, TProgressData, TProgressRecord } from '../types';
import { getPromptText } from '../utils/getPromptText';

const usePrompt = (progressData: TProgressData) => {
  const [promptData, setPromtPosition] = useState<
    | ({
        date: Date;
        x: number;
        y: number;
      } & TProgressRecord)
    | null
  >(null);

  const paramsPrompt = useMemo(() => {
    const isPromptHidden = promptData === null;
    if (isPromptHidden) return { isPromptHidden };

    const promptPosition = {
      left: promptData!.x,
      top: promptData!.y,
    };

    const promptDate = format(promptData!.date, 'd.MM.yyyy, EEEEEE', {
      locale: ru,
    }).toLowerCase();
    const promptText = getPromptText(promptData!);

    return { isPromptHidden, promptPosition, promptDate, promptText };
  }, [promptData]);

  const onEnterCircle = (date: string, { cx, cy }: TPosition) =>
    setPromtPosition(() => ({
      date: new Date(date),
      x: cx,
      y: cy,
      ...progressData[date],
    }));

  const onLeaveCircle = () => setPromtPosition(() => null);

  return {
    onEnterCircle,
    onLeaveCircle,
    ...paramsPrompt,
  };
};

export default usePrompt;
