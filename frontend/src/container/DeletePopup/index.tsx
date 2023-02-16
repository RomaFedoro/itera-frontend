'use client';

import React, { useState } from 'react';
import IteraPopup from '@/components/ui/IteraPopup';
import IteraButton from '@/components/ui/IteraButton';
import { useRouter } from 'next/navigation';

type TDeletePopupProps = {
  id: number;
  name?: string;
};

const DeletePopup = ({ name, id }: TDeletePopupProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const closePopup = () => setIsOpen(() => false);
  const deleteHabit = () => {
    // Here code
    setIsOpen(() => false);
    router.push('/');
  };

  return (
    <IteraPopup isOpen={isOpen} setIsOpen={setIsOpen}>
      <span>
        Вы уверены, что хотите удалить {name ? <b>{name}</b> : 'привычку'}?
      </span>
      <div className="list-row list_end">
        <IteraButton small secondary fillContent onClick={deleteHabit}>
          Удалить
        </IteraButton>
        <IteraButton small fillContent onClick={closePopup}>
          Отменить
        </IteraButton>
      </div>
    </IteraPopup>
  );
};

export default DeletePopup;
