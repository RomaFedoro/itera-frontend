'use client';

import React, { createRef, useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';

const TOTAL_RAYS = 53;
const CIRCLES_IN_RAW = 7;
const INTERVAL_CIRCLE = 0.6;
const INTERVAL_RAY = 0.4;
const START_DEGREE = -90;

const HabitProgessBlock = () => {
  const ref = useRef();
  const [size, setSize] = useState<number | null>(null);
  const [circleRadius, setCircleRadius] = useState<number | null>(null);
  const [radius, setRadius] = useState<number | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const size = ref.current.clientHeight;
    setSize(() => size);

    const radiusSVG =
      size /
      (2 *
        (1 +
          (2 *
            Math.PI *
            (CIRCLES_IN_RAW + (CIRCLES_IN_RAW - 1) * INTERVAL_CIRCLE)) /
            (TOTAL_RAYS * (1 + INTERVAL_RAY))));
    setRadius(() => radiusSVG);

    const circleSize =
      (2 * Math.PI * radiusSVG) / (TOTAL_RAYS * (1 + INTERVAL_RAY));
    setCircleRadius(() => circleSize / 2);
  }, [ref]);

  return (
    <div className={styles.progress}>
      <svg id={styles.progress__svg} ref={ref}>
        {size &&
          circleRadius &&
          radius &&
          new Array(TOTAL_RAYS * CIRCLES_IN_RAW).fill(0).map((_, index) => {
            const ray = Math.floor(index / CIRCLES_IN_RAW);
            const circle = index % CIRCLES_IN_RAW;
            const angle = START_DEGREE - ray * (360 / TOTAL_RAYS);
            const lengthToCenter =
              radius +
              circleRadius +
              circle * (circleRadius * 2 + circleRadius * INTERVAL_CIRCLE);
            const x = lengthToCenter * Math.cos((angle * Math.PI) / 180);
            const y = lengthToCenter * Math.sin((angle * Math.PI) / 180);
            return (
              <circle
                key={index}
                cx={size / 2 + x}
                cy={size / 2 - y}
                r={circleRadius}
              />
            );
          })}
      </svg>
    </div>
  );
};

export default HabitProgessBlock;
