import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

type TButtonProps = React.ButtonHTMLAttributes<HTMLElement> & {
  fillContent?: boolean;
  secondary?: boolean;
  small?: boolean;
  active?: boolean;
};

const IteraButton = ({
  children,
  fillContent = false,
  secondary = false,
  small = false,
  active = false,
  type = 'button',
  ...rest
}: TButtonProps) => {
  return (
    <button
      className={cn(
        styles.button,
        fillContent && styles.button_fill,
        secondary && styles.button_secondary,
        small && styles.button_small,
        active && styles.button_active,
        'form-element'
      )}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};

export default IteraButton;
