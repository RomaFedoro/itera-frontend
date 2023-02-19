'use client';

import React, { memo } from 'react';
import { DAYS_OF_WEEK } from '@/constants/daysweek';
import IteraCheckbox from '@/components/ui/IteraCheckbox';

type TIteraDaysWeekProps = {
  onChange: (value: Day) => void;
  defaultValues: Record<number, boolean>;
};

const IteraDaysWeek = ({ defaultValues, onChange }: TIteraDaysWeekProps) => {
  return (
    <div className="list-row">
      {DAYS_OF_WEEK.map(({ value, label }) => {
        return (
          <IteraCheckbox
            key={value}
            onChange={() => onChange(value)}
            checked={defaultValues[value]}
          >
            {label.toUpperCase()}
          </IteraCheckbox>
        );
      })}
    </div>
  );
};

export default memo(IteraDaysWeek);
