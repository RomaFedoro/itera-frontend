import React from 'react';
import styles from './styles.module.scss';
import Menu from '@/container/Menu';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.wrapper}>
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
