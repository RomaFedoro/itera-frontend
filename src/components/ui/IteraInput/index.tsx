import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

type TInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const IteraInput = ({ label, error, ...rest }: TInputProps) => {
  return (
    <label className={cn(styles.container, error && styles.container_error)}>
      {label && <span className={styles.label}>{label}</span>}
      <input
        type="text"
        className={cn('form-element', styles.input)}
        {...rest}
      />
      {error && <span className={styles.error}>{error}</span>}
    </label>
  );
};

export default IteraInput;
