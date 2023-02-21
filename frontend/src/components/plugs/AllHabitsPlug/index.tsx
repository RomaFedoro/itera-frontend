import React from 'react';
import habitsSrc from '@@/public/illustrations/habits.svg';
import IteraPlug from '@/components/ui/IteraPlug';

const AllHabitsPlug = () => {
  return (
    <IteraPlug icon={habitsSrc} title="Создайте первую привычку" />
  );
};

export default AllHabitsPlug;
