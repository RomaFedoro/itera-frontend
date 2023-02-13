'use client';

import React, { useState } from 'react';
import { DAYS_OF_WEEK } from '@/constants/daysweek';
import IteraCheckbox from '@/components/ui/IteraCheckbox';

const IteraDaysWeek = () => {
  const [days, setDays] = useState(() => {
    const data: Record<number, boolean> = {};
    DAYS_OF_WEEK.forEach(({ value }) => {
      data[value] = true;
    });
    return data;
  });

  const handleChange = (value: number) => {
    setDays((prev) => ({ ...prev, [value]: !prev[value] }));
  };

  return (
    <div className="list-row">
      {DAYS_OF_WEEK.map(({ value, label }) => {
        return (
          <IteraCheckbox
            key={value}
            onChange={() => handleChange(value)}
            checked={days[value]}
          >
            {label.toUpperCase()}
          </IteraCheckbox>
        );
      })}
    </div>
  );
};

export default IteraDaysWeek;
