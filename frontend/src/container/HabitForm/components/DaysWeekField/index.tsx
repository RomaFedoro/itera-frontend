import React, { useMemo, useState } from 'react';
import IteraDropdown from '@/components/ui/IteraDropdown';
import { CalendarIcon } from '@heroicons/react/20/solid';
import IteraDaysWeek from '@/container/form/IteraDaysWeek';
import { DAYS_OF_WEEK } from '@/constants/daysweek';
import getDaysOfWeek from '@/utils/getDaysOfWeek';

const DaysWeekField = () => {
  const [days, setDays] = useState(() => {
    const data = {} as Record<Day, boolean>;
    DAYS_OF_WEEK.forEach(({ value }) => {
      data[value] = true;
    });
    return data;
  });

  const title = useMemo(() => getDaysOfWeek(days), [days]);

  const handleChange = (value: Day) => {
    setDays((days) => {
      return {
        ...days,
        [value]: !days[value],
      };
    });
  };

  return (
    <IteraDropdown icon={<CalendarIcon />} title={title}>
      <IteraDaysWeek defaultValues={days} onChange={handleChange} />
    </IteraDropdown>
  );
};

export default DaysWeekField;
