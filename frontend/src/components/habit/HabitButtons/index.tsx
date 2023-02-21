'use client';

import React from 'react';
import IteraButton from '@/components/ui/IteraButton';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

const HabitButtons = ({ id }: { id: string | number }) => {
  const router = useRouter();
  const habitPath = '/habits/' + id;

  return (
    <>
      <IteraButton
        secondary
        small
        onClick={() => router.push(`${habitPath}/edit`)}
      >
        <PencilIcon />
      </IteraButton>
      <IteraButton
        secondary
        small
        onClick={() => router.push(`${habitPath}/delete`)}
      >
        <TrashIcon />
      </IteraButton>
    </>
  );
};

export default HabitButtons;
