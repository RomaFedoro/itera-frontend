import Image from 'next/image';
import React from 'react';
import styles from './styles.module.scss';

type TIteraPlugProps = {
  children?: React.ReactNode;
  title?: string;
  icon?: string;
};

const IteraPlug = ({ title, icon, children }: TIteraPlugProps) => {
  return (
    <div className={styles.plug}>
      {icon && (
        <div className={styles.plug__icon}>
          <Image src={icon} alt={title ?? ''} fill={true} />
        </div>
      )}
      {title && <div className={styles.plug__title}>{title}</div>}
      {children}
    </div>
  );
};

export default IteraPlug;
