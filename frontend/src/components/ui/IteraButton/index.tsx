'use client';

import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import IteraLoader from '../IteraLoader';

type TButtonProps = React.ButtonHTMLAttributes<HTMLElement> & {
  fillContent?: boolean;
  secondary?: boolean;
  small?: boolean;
  active?: boolean;
  className?: string;
  loading?: boolean;
};

const IteraButton = ({
  children,
  loading = false,
  fillContent = false,
  secondary = false,
  small = false,
  active = false,
  type = 'button',
  className,
  ...rest
}: TButtonProps) => {
  const classnames = cn(
    'form-element',
    styles.button,
    fillContent && styles.button_fill,
    secondary && styles.button_secondary,
    small && styles.button_small,
    active && styles.button_active,
    loading && styles.button_loading,
    className
  );

  return (
    <button className={classnames} type={type} {...rest}>
      <div className={styles.button__content}>{children}</div>
      <div className={styles.button__loader}>
        <IteraLoader />
      </div>
    </button>
  );
};

export default IteraButton;
