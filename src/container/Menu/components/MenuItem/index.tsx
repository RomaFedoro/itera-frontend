import Link from 'next/link';
import React from 'react';
import { TMenuLink } from '../../types';
import styles from './style.module.scss';

const MenuItem = ({ title, link }: TMenuLink) => {
  return (
    <Link href={link} className={styles.menu__item}>
      {title}
    </Link>
  );
};

export default MenuItem;
