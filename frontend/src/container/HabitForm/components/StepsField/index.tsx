'use client';

import React, { useMemo, useState } from 'react';
import IteraDropdown from '@/components/ui/IteraDropdown';
import { ArrowPathIcon } from '@heroicons/react/20/solid';
import IteraCounter from '@/components/ui/IteraCounter';
import plural from '@/utils/plural';

const StepsField = () => {
  const [steps, setSteps] = useState(1);
  const title = useMemo(
    () => `${steps} ${plural(steps, ['повтор', 'повтора', 'повторов'])}`,
    [steps]
  );

  return (
    <IteraDropdown icon={<ArrowPathIcon />} title={title}>
      <IteraCounter min={1} max={10} value={steps} onChange={setSteps} />
    </IteraDropdown>
  );
};

export default StepsField;
