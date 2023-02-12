import React from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import IteraTextarea from '@/components/ui/IteraTextarea';

const HabitForm = () => {
  return (
    <form className="list content_fill">
      <div className={cn('content_fill', styles.form__container)}>
        <IteraTextarea
          placeholder="Название привычки"
          id={styles.textarea__name}
        />
        <IteraTextarea
          placeholder="Описание"
          id={styles.textarea__description}
        />
      </div>
      <div className={styles.buttons}></div>
    </form>
  );
};

export default HabitForm;
