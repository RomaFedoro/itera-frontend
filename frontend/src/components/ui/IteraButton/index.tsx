import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

type TButtonProps = React.ButtonHTMLAttributes<HTMLElement> & {};

const IteraButton = ({ children, type = 'button', ...rest }: TButtonProps) => {
  return (
    <button className={cn(styles.button, 'form-element')} type={type} {...rest}>
      {children}
    </button>
  );
};

export default IteraButton;
