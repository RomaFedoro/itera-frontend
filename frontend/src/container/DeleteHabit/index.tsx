'use client';

import React from 'react';
import IteraButton from '@/components/ui/IteraButton';
import useDeleteHabit from '@/hooks/useDeleteHabit';

const DeleteHabit = ({ id }: { id: number | string }) => {
  const { habit, closePage, deleteHabit } = useDeleteHabit(String(id));

  return (
    <>
      <div className="list">
        <h1>Удаление привычки</h1>
        <span className="description">
          Вы уверены, что хотите удалить{' '}
          {habit ? <b>{habit.data.name}</b> : 'привычку'}?
        </span>
      </div>
      <div className="list-row list_end">
        <IteraButton secondary fillContent onClick={deleteHabit}>
          Удалить
        </IteraButton>
        <IteraButton fillContent onClick={closePage}>
          Отменить
        </IteraButton>
      </div>
    </>
  );
};

export default DeleteHabit;
