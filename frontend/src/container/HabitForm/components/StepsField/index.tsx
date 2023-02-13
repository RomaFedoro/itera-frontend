'use client';

import React, { useState } from 'react';
import IteraDropdown from '@/components/ui/IteraDropdown';
import { ArrowPathIcon } from '@heroicons/react/20/solid';
import IteraCounter from '@/components/ui/IteraCounter';

const StepsField = () => {
  const [steps, setSteps] = useState(1);

  return (
    <IteraDropdown icon={<ArrowPathIcon />} title="Количество повторов">
      <IteraCounter min={1} max={10} value={steps} onChange={setSteps} />
    </IteraDropdown>
  );
};

export default StepsField;
