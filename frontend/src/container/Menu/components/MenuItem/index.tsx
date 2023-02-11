import Link from 'next/link';
import React from 'react';
import styles from './style.module.scss';
import cn from 'classnames';

type TMenuLinkProps = {
  link: string;
  isActive?: boolean;
  children?: React.ReactNode;
};

const MenuItem = ({ link, isActive, children }: TMenuLinkProps) => {
  return (
    <Link
      href={link}
      className={cn(styles.menu__item, isActive && styles.menu__item_active)}
    >
      {children}
    </Link>
  );
};

export default MenuItem;
