'use client';

import React, { memo } from 'react';
import styles from './styles.module.scss';

type CheckboxProps = {
  checked: boolean;
  onChange: () => void;
};

export const Checkbox = memo(function Checkbox({
  checked,
  onChange,
}: CheckboxProps) {
  return (
    <label className={styles.checkbox}>
      <input type="checkbox" checked={checked} />
      <span className={styles.checkmark}></span>
    </label>
  );
});
