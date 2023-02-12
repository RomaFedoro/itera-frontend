'use client';

import TodayHabitList from '@/container/TodayHabitList';
import Popup from '@/components/ui/Popup';
import { useState } from 'react';

export default function TodayPage() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="content content_fill">
      <Popup isOpen={isOpen} setIsOpen={setIsOpen} noCloseByOverlay></Popup>
      <h1>Сегодня</h1>
      <TodayHabitList />
    </div>
  );
}
