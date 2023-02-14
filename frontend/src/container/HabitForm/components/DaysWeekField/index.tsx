import React, { useMemo, useState } from 'react';
import IteraDropdown from '@/components/ui/IteraDropdown';
import { CalendarIcon } from '@heroicons/react/20/solid';
import IteraDaysWeek from '@/container/form/IteraDaysWeek';
import { DAYS_OF_WEEK } from '@/constants/daysweek';
import { TDaysOfWeek, TDaysOfWeekOption } from '@/types/daysweek';
import getDaysOfWeek from '../../../../utils/getDaysOfWeek';

const DaysWeekField = () => {
  const [days, setDays] = useState(() => {
    const data: Partial<TDaysOfWeekOption> = {};
    DAYS_OF_WEEK.forEach(({ value }) => {
      data[value] = true;
    });
    return data as TDaysOfWeekOption;
  });

  const title = useMemo(() => getDaysOfWeek(days), [days]);

  const handleChange = (value: TDaysOfWeek) => {
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
