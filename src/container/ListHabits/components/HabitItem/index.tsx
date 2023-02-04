import React from 'react';
import HabitCheckbox from '@/components/ui/HabitCheckbox';
import styles from './styles.module.scss';

const HabitItem = () => {
  return (
    <div className={styles.habit}>
      <HabitCheckbox />
      <div className={styles.habit__title}>Сделать проект</div>
    </div>
  );
};

export default HabitItem;
