'use client';

import React, { memo } from 'react';
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import styles from './styles.module.scss';

type TCounterProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
};

const IteraCounter = ({ value, min, max, onChange }: TCounterProps) => {
  const decrement = () => {
    if (min !== undefined && min >= value) return;
    onChange(value - 1);
  };

  const increment = () => {
    if (max !== undefined && max <= value) return;
    onChange(value + 1);
  };

  return (
    <div className="list-row">
      <button
        type="button"
        className={styles.button}
        disabled={min !== undefined && min >= value}
        onClick={decrement}
      >
        <MinusIcon className={styles.icon} />
      </button>
      <div className={styles.value}>{value}</div>
      <button
        type="button"
        className={styles.button}
        disabled={max !== undefined && max <= value}
        onClick={increment}
      >
        <PlusIcon className={styles.icon} />
      </button>
    </div>
  );
};

export default memo(IteraCounter);
