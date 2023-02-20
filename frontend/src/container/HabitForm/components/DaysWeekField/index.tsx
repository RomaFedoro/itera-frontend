import React, { memo } from 'react';
import IteraDropdown from '@/components/ui/IteraDropdown';
import { CalendarIcon } from '@heroicons/react/20/solid';
import IteraDaysWeek from '@/container/form/IteraDaysWeek';
import getDaysOfWeek from '@/utils/getDaysOfWeek';

type TDaysWeekField = {
  onChange: (newValue: Day[]) => void;
  days: Day[];
};

const DaysWeekField = ({ days = [], onChange }: TDaysWeekField) => {
  const title = getDaysOfWeek(Array.from(days));

  const handleChange = (value: Day) => {
    onChange(
      days.includes(value)
        ? Array.from(days).filter((day) => day !== value)
        : [...Array.from(days), value]
    );
  };

  return (
    <IteraDropdown icon={<CalendarIcon />} title={title}>
      <IteraDaysWeek defaultValues={days} onChange={handleChange} />
    </IteraDropdown>
  );
};

export default memo(DaysWeekField);
