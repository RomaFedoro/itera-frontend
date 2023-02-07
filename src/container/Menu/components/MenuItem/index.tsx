'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import styles from './style.module.scss';
import cn from 'classnames';

type TMenuLinkProps = {
  link: string;
  children?: React.ReactNode;
};

const MenuItem = ({ link, children }: TMenuLinkProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={link}
      className={cn(
        styles.menu__item,
        pathname === link && styles.menu__item_active
      )}
    >
      {children}
    </Link>
  );
};

export default MenuItem;
