import React from 'react';
import styles from './styles.module.scss';

type TStatisticBlockProps = {
  value: string;
  label: string;
};

const HabitStatisticBlock = ({ value, label }: TStatisticBlockProps) => {
  return (
    <div className={styles.statistic}>
      <div className={styles.statistic__title}>{value}</div>
      <div className={styles.statistic__description}>{label}</div>
    </div>
  );
};

export default HabitStatisticBlock;
