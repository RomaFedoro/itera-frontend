import React from 'react';
import styles from './styles.module.scss';
import { PT_Sans } from '@next/font/google';
import cn from 'classnames';

const font = PT_Sans({
  weight: ['400', '700'],
  subsets: ['latin', 'cyrillic'],
});

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cn(styles.wrapper, font.className)}>
      <header className={styles.header}></header>
      <main className={styles.content}>{children}</main>
    </div>
  );
};
