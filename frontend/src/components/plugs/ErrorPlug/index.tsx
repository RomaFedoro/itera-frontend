import React from 'react';
import errorSrc from '@@/public/illustrations/error.svg';
import IteraPlug from '@/components/ui/IteraPlug';

const ErrorPlug = () => {
  return (
    <IteraPlug icon={errorSrc} title="Что-то пошло не так. Повторите попытку позже" />
  );
};

export default ErrorPlug;
