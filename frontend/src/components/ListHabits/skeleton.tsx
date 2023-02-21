import React from 'react';
import HabitItemSkeleton from '../HabitItem/skeleton';

const ListHabitsSkeleton = () => {
  return (
    <ul className="list">
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <li key={index}>
            <HabitItemSkeleton />
          </li>
        ))}
    </ul>
  );
};

export default ListHabitsSkeleton;
