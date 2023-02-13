import React from 'react';
import IteraDropdown from '@/components/ui/IteraDropdown';
import { CalendarIcon } from '@heroicons/react/20/solid';
import IteraDaysWeek from '@/container/form/IteraDaysWeek';

const DaysWeekField = () => {
  return (
    <IteraDropdown icon={<CalendarIcon />} title="Дни недели">
      <IteraDaysWeek />
    </IteraDropdown>
  );
};

export default DaysWeekField;
