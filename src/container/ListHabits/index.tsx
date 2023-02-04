import React from 'react';
import HabitItem from './components/HabitItem';
import styles from './styles.module.scss';

const ListHabits = () => {
  return (
    <div className={styles.list}>
      <ul className={styles.container}>
        <HabitItem />
        <HabitItem />
      </ul>
      <ul className={styles.container}>
        <HabitItem />
      </ul>
    </div>
  );
};

export default ListHabits;
