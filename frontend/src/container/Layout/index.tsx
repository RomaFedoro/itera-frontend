import React from 'react';
import styles from './styles.module.scss';
import { Manrope } from '@next/font/google';
import cn from 'classnames';
import Menu from '@/container/Menu';

const font = Manrope({
  weight: ['300', '500', '700'],
  subsets: ['latin', 'cyrillic'],
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cn(styles.wrapper, font.className)}>
      <header className={styles.header}>
        <Menu />
      </header>
      <main className={styles.container}>
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
};

export default Layout;
