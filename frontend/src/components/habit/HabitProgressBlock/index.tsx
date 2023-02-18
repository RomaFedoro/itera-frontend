'use client';

import React, { memo, useState } from 'react';
import styles from './styles.module.scss';
import useProgress from './hooks/useProgress';
import { THabitProgressProps, TProgressRecord } from './types';
import getProgressData from './utils/getProgressData';
import getColor from './utils/getColor';
import cn from 'classnames';
import { formattingDate } from '@/utils/date';
import { pluralWithNum } from '@/utils/plural';

const HabitProgessBlock = (props: THabitProgressProps) => {
  const { progressData, today } = getProgressData(props);

  const [promptPosition, setPromtPosition] = useState<
    | ({
        date: Date;
        x: number;
        y: number;
      } & TProgressRecord)
    | null
  >(null);

  const { ref, center, circleRadius, radius, getPosition } = useProgress();

  return (
    <div className={styles.progress}>
      <div ref={ref} className={styles.progress__svg}>
        <svg>
          {center &&
            circleRadius &&
            radius &&
            Object.keys(progressData)
              .sort()
              .map((date, index) => {
                const pos = getPosition(index);
                if (!pos) return null;

                return (
                  <circle
                    key={date}
                    onMouseEnter={() =>
                      setPromtPosition(() => ({
                        date: new Date(date),
                        x: pos.cx,
                        y: pos.cy,
                        ...progressData[date],
                      }))
                    }
                    onMouseLeave={() => setPromtPosition(() => null)}
                    fill={getColor(progressData[date])}
                    className={cn(today === date && styles.progress__svg_today)}
                    {...pos}
                    r={circleRadius}
                  />
                );
              })}
        </svg>
        <div
          className={cn(
            styles.prompt,
            promptPosition === null && styles.prompt_hide
          )}
          style={{
            left: promptPosition?.x,
            top: promptPosition?.y,
          }}
        >
          {promptPosition && (
            <>
              <div className={styles.prompt__date}>
                {formattingDate(promptPosition.date, true)}
              </div>
              <div className={styles.prompt__description}>
                {promptPosition.isComingHabit
                  ? `Нужно выполнить ${pluralWithNum(
                      promptPosition.totalSteps,
                      ['повторение', 'повторения', 'повторений']
                    )}`
                  : `Выполнено ${
                      promptPosition.completedSteps
                    } из ${pluralWithNum(promptPosition.totalSteps, [
                      'повторение',
                      'повторения',
                      'повторений',
                    ])}`}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(HabitProgessBlock);
