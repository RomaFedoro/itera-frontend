import React from 'react';
import IteraInput from '@/components/ui/IteraInput';
import IteraButton from '@/components/ui/IteraButton';
import IteraLink from '@/components/ui/IteraLink';
import { registerFields } from '../constants';

const Register = () => {
  return (
    <form className="list">
      {registerFields.map((field) => (
        <IteraInput key={field.name} {...field} />
      ))}
      <IteraButton disabled>Зарегистрироваться</IteraButton>
      <IteraLink href="/auth/login">
        Уже есть аккаунта? <b>Войдите в него</b>
      </IteraLink>
    </form>
  );
};

export default Register;
