import { XMarkIcon } from '@heroicons/react/20/solid';
import React, { useRef } from 'react';
import { useClickAway } from 'react-use';
import styles from './styles.module.scss';
import cn from 'classnames';

type TModelProps = {
  title?: string;
  children?: React.ReactNode;
  noCloseByOverlay?: boolean;
  className?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const IteraPopup = ({
  title,
  isOpen,
  noCloseByOverlay = false,
  className,
  children,
  setIsOpen,
}: TModelProps) => {
  const ref = useRef(null);

  useClickAway(ref, () => {
    setIsOpen(noCloseByOverlay);
  });

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div ref={ref} className={cn(styles.popup, className)}>
        <div className={styles.popup__content}>
          <div className={styles.popup__header}>
            <h3 className={styles.popup__title}>{title}</h3>
            <button
              onClick={() => setIsOpen(false)}
              className={styles.popup__close}
            >
              <XMarkIcon />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default IteraPopup;
