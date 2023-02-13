'use client';

import React, { memo } from 'react';
import IteraCheckbox from '../IteraCheckbox';

type CheckboxProps = {
  needRepeat?: number;
  onChange?: () => void;
};

const HabitCheckbox = ({ needRepeat = 1, onChange }: CheckboxProps) => {
  return (
    <IteraCheckbox onChange={onChange} checked={needRepeat === 0}>
      {needRepeat > 1 && needRepeat}
    </IteraCheckbox>
  );
};

export default memo(HabitCheckbox);
