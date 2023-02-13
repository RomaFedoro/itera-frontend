'use client';

import React, { memo } from 'react';
import styles from './styles.module.scss';
import { CheckIcon } from '@heroicons/react/20/solid';
import cn from 'classnames';

type CheckboxProps = {
  children?: React.ReactNode;
  checked?: boolean;
  onChange?: () => void;
};

const IteraCheckbox = ({ children, checked, onChange }: CheckboxProps) => {
  return (
    <button
      type="button"
      className={cn(styles.checkbox, checked && styles.checkbox_checked)}
      onClick={onChange}
    >
      {children ? children : <CheckIcon className={styles.icon} />}
    </button>
  );
};

export default memo(IteraCheckbox);
