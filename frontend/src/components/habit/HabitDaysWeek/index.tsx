import React, { memo } from 'react';
import getDaysOfWeek from '@/utils/getDaysOfWeek';
import styles from './styles.module.scss';

const HabitDaysWeek = ({ days }: { days: Day[] }) => {
  return <div className={styles.tag}>{getDaysOfWeek(days)}</div>;
};

export default memo(HabitDaysWeek);
