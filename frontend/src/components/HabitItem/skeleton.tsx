import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

const HabitItemSkeleton = () => {
  return <div className={cn(styles.habit, styles.habit_loading)} />;
};

export default HabitItemSkeleton;
