'use client';

import React, { useEffect, useState } from 'react';
import IteraInput from '@/components/ui/IteraInput';
import IteraButton from '@/components/ui/IteraButton';
import IteraLink from '@/components/ui/IteraLink';
import { registerFields } from '../constants';
import { useForm } from 'react-hook-form';
import { TRegisterValues } from '../types';

const Register = () => {
  const [hasMounted, setHasMounted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm<TRegisterValues>({
    mode: 'onTouched',
  });
  const onSubmit = handleSubmit((data) => console.log(data));

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <form className="list" onSubmit={onSubmit}>
      {registerFields.map((field) => (
        <IteraInput
          key={field.name}
          error={errors[field.name]?.message}
          {...register(field.name, field.options)}
          {...field}
        />
      ))}
      <IteraButton disabled={!isDirty || !isValid}>
        Зарегистрироваться
      </IteraButton>
      <IteraLink href="/auth/login">
        Уже есть аккаунта? <b>Войдите в него</b>
      </IteraLink>
    </form>
  );
};

export default Register;
