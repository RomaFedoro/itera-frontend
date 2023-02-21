import React from 'react';
import todaySrc from '@@/public/illustrations/today.svg';
import IteraPlug from '@/components/ui/IteraPlug';

const TodayPlug = () => {
  return (
    <IteraPlug icon={todaySrc} title="На сегодня задач нет. Можно отдохнуть" />
  );
};

export default TodayPlug;
