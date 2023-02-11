import React from 'react';
import IteraInput from '@/components/ui/IteraInput';
import IteraButton from '@/components/ui/IteraButton';
import IteraLink from '@/components/ui/IteraLink';
import { loginFields } from '../constants';

const Login = () => {
  return (
    <form className="list">
      {loginFields.map((field) => (
        <IteraInput key={field.name} {...field} />
      ))}
      <IteraButton disabled>Войти</IteraButton>
      <IteraLink href="/auth/register">
        Ещё нет аккаунта? <b>Создайте его</b>
      </IteraLink>
    </form>
  );
};

export default Login;
