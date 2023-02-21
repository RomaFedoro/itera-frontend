import React from 'react';
import IteraLoader from '@/components/ui/IteraLoader';
import cn from 'classnames';

const LoadingPage = ({ dark = false }: { dark?: boolean }) => {
  return (
    <div className={cn('content', 'content_fill', dark && 'content_dark')}>
      <IteraLoader />
    </div>
  );
};

export default LoadingPage;
