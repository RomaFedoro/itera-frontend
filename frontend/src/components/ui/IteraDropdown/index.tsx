'use client';

import React, { memo, useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import IteraButton from '../IteraButton';
import styles from './styles.module.scss';

type TDropdownProps = {
  icon?: React.ReactNode;
  title?: string;
  children?: React.ReactNode;
};

const IteraDropdown = ({ title, icon, children }: TDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef(null);

  useClickAway(ref, () => {
    setIsOpen(() => false);
  });

  const toggleDropdown = () => {
    setIsOpen((value) => !value);
  };

  return (
    <div className={styles.dropdown}>
      <IteraButton
        fillContent
        secondary
        small
        onClick={toggleDropdown}
        active={isOpen}
      >
        {icon && <div className={styles.icon}>{icon}</div>}
        {title}
      </IteraButton>
      {isOpen && (
        <div ref={ref} className={styles.dropdown__body}>
          {children}
        </div>
      )}
    </div>
  );
};

export default memo(IteraDropdown);
