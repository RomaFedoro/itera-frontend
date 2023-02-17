'use client';

import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

type TInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string | undefined;
};

const IteraInput = React.forwardRef<HTMLInputElement, TInputProps>(
  ({ label, error, type = 'text', ...rest }, ref) => (
    <label className={cn(styles.container, error && styles.container_error)}>
      {label && <span className={styles.label}>{label}</span>}
      <input
        ref={ref}
        type={type}
        className={cn('form-element', styles.input)}
        {...rest}
      />
      {error && <span className={styles.error}>{error}</span>}
    </label>
  )
);
IteraInput.displayName = 'IteraInput';

export default IteraInput;
