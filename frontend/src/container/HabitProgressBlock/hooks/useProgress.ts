import { createRef, useCallback, useEffect, useState } from 'react';
import {
  CIRCLES_IN_RAY,
  INTERVAL_CIRCLE,
  INTERVAL_RAY,
  START_DEGREE,
  TOTAL_RAYS,
} from '../constants/size';
import { TPosition } from '../types';

const getPostionCircle = (
  center: number,
  circleRadius: number,
  radius: number,
  index: number
): TPosition => {
  const rayIndex = Math.floor(index / CIRCLES_IN_RAY);
  const circleIndex = index % CIRCLES_IN_RAY;
  const angle =
    ((START_DEGREE + rayIndex * (360 / TOTAL_RAYS)) * Math.PI) / 180;
  const lengthToCenter =
    radius +
    circleRadius +
    circleIndex * (circleRadius * 2 + circleRadius * INTERVAL_CIRCLE);
  const x = lengthToCenter * Math.cos(angle);
  const y = lengthToCenter * Math.sin(angle);

  return {
    cx: center + x,
    cy: center + y,
  };
};

const useProgress = () => {
  const ref = createRef<HTMLDivElement>();
  const [center, setCenter] = useState<number | null>(null);
  const [circleRadius, setCircleRadius] = useState<number | null>(null);
  const [radius, setRadius] = useState<number | null>(null);

  const getPosition = useCallback(
    (index: number) => {
      if (!center || !circleRadius || !radius) return null;
      return getPostionCircle(center, circleRadius, radius, index);
    },
    [center, circleRadius, radius]
  );

  useEffect(() => {
    if (!ref.current) return;
    const centerSVG = ref.current.clientHeight / 2;
    setCenter(() => centerSVG);

    const radiusSVG =
      centerSVG /
      (1 +
        (2 *
          Math.PI *
          (CIRCLES_IN_RAY + (CIRCLES_IN_RAY - 1) * INTERVAL_CIRCLE)) /
          (TOTAL_RAYS * (1 + INTERVAL_RAY)));
    setRadius(() => radiusSVG);

    const circlecenter =
      (2 * Math.PI * radiusSVG) / (TOTAL_RAYS * (1 + INTERVAL_RAY));
    setCircleRadius(() => circlecenter / 2);
  }, [ref, ref.current?.clientHeight]);

  return {
    ref,
    center,
    circleRadius,
    radius,
    getPosition,
  };
};

export default useProgress;
