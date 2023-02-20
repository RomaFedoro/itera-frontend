'use client';

import React from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import IteraTextarea from '@/components/ui/IteraTextarea';
import IteraButton from '@/components/ui/IteraButton';
import DaysWeekField from './components/DaysWeekField';
import StepsField from './components/StepsField';
import useHabitForm from './hooks/useHabitForm';
import { habitsOptions } from './constants';
import { Controller, RegisterOptions } from 'react-hook-form';
import { THabitValues } from '@/types/habit';
import { THabitForm } from './types';

const HabitForm = ({
  textSubmitButton,
  ...props
}: THabitForm & { textSubmitButton: string }) => {
  const { register, hasMounted, isValidForm, control, errors, onSubmit } =
    useHabitForm(props);

  if (!hasMounted) return null;

  return (
    <form className="list content_fill" onSubmit={onSubmit}>
      <div className={cn('content_fill', styles.form__container)}>
        <fieldset className="list">
          <IteraTextarea
            placeholder="Название привычки"
            id={styles.textarea__name}
            {...register(
              'name',
              habitsOptions.name as RegisterOptions<THabitValues, 'name'>
            )}
          />
          <IteraTextarea
            placeholder="Описание"
            id={styles.textarea__description}
            {...register(
              'description',
              habitsOptions.description as RegisterOptions<
                THabitValues,
                'description'
              >
            )}
          />
        </fieldset>
        <fieldset className={styles.params}>
          <Controller
            control={control}
            name="days"
            render={({ field: { onChange, value } }) => (
              <DaysWeekField onChange={onChange} days={value} />
            )}
          />
          <Controller
            control={control}
            name="totalSteps"
            render={({ field: { onChange, value } }) => (
              <StepsField onChange={onChange} steps={value} />
            )}
          />
        </fieldset>
      </div>
      <div className={styles.buttons}>
        <IteraButton fillContent secondary>
          Отменить
        </IteraButton>
        <IteraButton type="submit" disabled={!isValidForm} fillContent>
          {textSubmitButton}
        </IteraButton>
      </div>
    </form>
  );
};

export default HabitForm;
