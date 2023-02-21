'use client';

import React, { useState } from 'react';
import IteraButton from '@/components/ui/IteraButton';
import { useRouter } from 'next/navigation';

type TDeleteHabitProps = {
  id: number | string;
  name?: string;
};

const DeleteHabit = ({ name, id }: TDeleteHabitProps) => {
  const router = useRouter();

  const closePopup = () => {
    router.push('/habits/' + id);
  };
  const deleteHabit = () => {
    // Here code
    router.push('/');
  };

  return (
    <>
      <div className="list">
        <h1>Удаление привычки</h1>
        <span className="description">
          Вы уверены, что хотите удалить {name ? <b>{name}</b> : 'привычку'}?
        </span>
      </div>
      <div className="list-row list_end">
        <IteraButton small secondary fillContent onClick={deleteHabit}>
          Удалить
        </IteraButton>
        <IteraButton small fillContent onClick={closePopup}>
          Отменить
        </IteraButton>
      </div>
    </>
  );
};

export default DeleteHabit;
