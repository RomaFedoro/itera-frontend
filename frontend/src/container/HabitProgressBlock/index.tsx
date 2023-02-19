'use client';

import React, { memo, useMemo } from 'react';
import styles from './styles.module.scss';
import useProgress from './hooks/useProgress';
import { THabitProgressProps } from './types';
import getProgressData from './utils/getProgressData';
import getColor from './utils/getColor';
import cn from 'classnames';
import usePrompt from './hooks/usePrompt';
import HabitPromptProgress from './components/HabitPromptProgress';

const HabitProgessBlock = (props: THabitProgressProps) => {
  const { progressData, today } = useMemo(() => getProgressData(props), [props]);

  const { onEnterCircle, onLeaveCircle, ...paramsPrompt } =
    usePrompt(progressData);
  const { ref, center, circleRadius, radius, getPosition } = useProgress();

  return (
    <div className={styles.progress}>
      <div ref={ref} className={styles.progress__svg}>
        {center && circleRadius && radius && (
          <svg>
            {Object.keys(progressData)
              .sort()
              .map((date, index) => {
                const pos = getPosition(index);
                if (!pos) return null;

                return (
                  <circle
                    key={date}
                    onMouseEnter={() => onEnterCircle(date, pos)}
                    onMouseLeave={onLeaveCircle}
                    fill={getColor(progressData[date])}
                    className={cn(today === date && styles.progress__svg_today)}
                    r={circleRadius}
                    {...pos}
                  />
                );
              })}
          </svg>
        )}
        <HabitPromptProgress {...paramsPrompt} />
      </div>
    </div>
  );
};

export default memo(HabitProgessBlock);
