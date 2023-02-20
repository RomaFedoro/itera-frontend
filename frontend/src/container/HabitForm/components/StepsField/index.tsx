'use client';

import React, { memo, useCallback } from 'react';
import IteraDropdown from '@/components/ui/IteraDropdown';
import { ArrowPathIcon } from '@heroicons/react/20/solid';
import IteraCounter from '@/components/ui/IteraCounter';
import plural from '@/utils/plural';

type TStepsField = {
  onChange: (newValue: number) => void;
  steps: number;
};

const StepsField = ({ steps = 1, onChange }: TStepsField) => {
  const title = `${steps} ${plural(steps, ['повтор', 'повтора', 'повторов'])}`;

  const handleSteps = useCallback(
    (value: number) => onChange(value),
    [onChange]
  );

  return (
    <IteraDropdown icon={<ArrowPathIcon />} title={title}>
      <IteraCounter min={1} max={10} value={steps} onChange={handleSteps} />
    </IteraDropdown>
  );
};

export default memo(StepsField);
