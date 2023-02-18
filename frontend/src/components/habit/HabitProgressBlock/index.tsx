'use client';

import React, { memo } from 'react';
import styles from './styles.module.scss';
import useProgress from './hooks/useProgress';
import { THabitProgressProps } from './types';
import getProgressData from './utils/getProgressData';
import getColor from './utils/getColor';

const HabitProgessBlock = (props: THabitProgressProps) => {
  const progressData = getProgressData(props);

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
                    fill={getColor(progressData[date])}
                    {...pos}
                    r={circleRadius}
                  />
                );
              })}
        </svg>
      </div>
    </div>
  );
};

export default memo(HabitProgessBlock);
