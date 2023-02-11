import React from 'react';
import styles from './styles.module.scss';

const HabitStatisticBlock = () => {
  return (
    <div className={styles.statistic}>
      <div className={styles.statistic__title}>12 дней</div>
      <div className={styles.statistic__description}>
        Время создания проекта
      </div>
    </div>
  );
};

export default HabitStatisticBlock;
