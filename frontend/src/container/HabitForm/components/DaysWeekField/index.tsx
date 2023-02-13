import React, { useMemo, useState } from 'react';
import IteraDropdown from '@/components/ui/IteraDropdown';
import { CalendarIcon } from '@heroicons/react/20/solid';
import IteraDaysWeek from '@/container/form/IteraDaysWeek';
import { DAYS_OF_WEEK } from '@/constants/daysweek';

const DaysWeekField = () => {
  const [days, setDays] = useState(() => {
    const data: Record<number, boolean> = {};
    DAYS_OF_WEEK.forEach(({ value }) => {
      data[value] = true;
    });
    return data;
  });
  
  const title = useMemo(() => {
    const daysOfWeek = DAYS_OF_WEEK.filter(({ value }) => days[value] === true);

    if (daysOfWeek.length === 7) return 'Каждый день';
    if (daysOfWeek.length === 0) return 'Никогда';

    if (daysOfWeek.length === 1) {
      if (daysOfWeek[0].value === 7) return `Каждое ${daysOfWeek[0].label}`;
      if ([3, 5, 6].includes(daysOfWeek[0].value))
        return `Каждую ${daysOfWeek[0].label}`;
      return `Каждый ${daysOfWeek[0].label}`;
    }

    return `Каждые ${daysOfWeek.map(({ label }) => label).join(', ')}`;
  }, [days]);

  const handleChange = (value: number) => {
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
