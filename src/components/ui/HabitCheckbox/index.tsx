'use client';

import React from 'react';
import styles from './styles.module.scss';
import { CheckIcon } from '@heroicons/react/20/solid';
import cn from 'classnames';

type CheckboxProps = {
  needRepeat?: number;
  onChange?: () => void;
};

const HabitCheckbox = ({ needRepeat = 1, onChange }: CheckboxProps) => {
  return (
    <button className={cn(styles.checkbox, needRepeat === 0 && styles.checkbox_checked)} onClick={onChange}>
      {needRepeat > 1 ? (
        needRepeat
      ) : (
        <CheckIcon
          className={styles.icon}
        />
      )}
    </button>
  );
};

export default React.memo(HabitCheckbox);
