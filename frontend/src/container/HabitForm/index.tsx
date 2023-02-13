'use client';

import React, { useEffect } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import IteraTextarea from '@/components/ui/IteraTextarea';
import IteraButton from '@/components/ui/IteraButton';
import DaysWeekField from './components/DaysWeekField';
import StepsField from './components/StepsField';

const HabitForm = () => {
  return (
    <form className="list content_fill">
      <div className={cn('content_fill', styles.form__container)}>
        <fieldset className="list">
          <IteraTextarea
            placeholder="Название привычки"
            id={styles.textarea__name}
          />
          <IteraTextarea
            placeholder="Описание"
            id={styles.textarea__description}
          />
        </fieldset>
        <fieldset className={styles.params}>
          <DaysWeekField />
          <StepsField />
        </fieldset>
      </div>
      <div className={styles.buttons}>
        <IteraButton fillContent secondary>
          Отменить
        </IteraButton>
        <IteraButton fillContent>Создать привычку</IteraButton>
      </div>
    </form>
  );
};

export default HabitForm;
