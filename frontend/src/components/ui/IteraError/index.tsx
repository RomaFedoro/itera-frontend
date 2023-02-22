import React from 'react';
import styles from './styles.module.scss';

const IteraError = ({ children }: { children?: React.ReactNode }) => {
  return <div className={styles.error}>{children}</div>;
};

export default IteraError;
