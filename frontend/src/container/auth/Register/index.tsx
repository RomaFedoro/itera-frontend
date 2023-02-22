'use client';

import React from 'react';
import IteraInput from '@/components/ui/IteraInput';
import IteraButton from '@/components/ui/IteraButton';
import IteraLink from '@/components/ui/IteraLink';
import { registerFields } from '../constants';
import useRegister from '../hooks/useRegister';
import IteraError from '@/components/ui/IteraError';

const Register = () => {
  const {
    register,
    hasMounted,
    isValidForm,
    errors,
    onSubmit,
    isLoading,
    responseError,
    isTouched,
  } = useRegister();

  if (!hasMounted) return null;

  return (
    <form method="POST" className="list" onSubmit={onSubmit}>
      {registerFields.map((field) => (
        <IteraInput
          key={field.name}
          error={errors[field.name]?.message}
          {...register(field.name, field.options)}
          {...field}
        />
      ))}
      {responseError && !isTouched && <IteraError>{responseError}</IteraError>}
      <IteraButton type="submit" disabled={!isValidForm} loading={isLoading}>
        Зарегистрироваться
      </IteraButton>
      <IteraLink href="/auth/login">
        Уже есть аккаунта? <b>Войдите в него</b>
      </IteraLink>
    </form>
  );
};

export default Register;
