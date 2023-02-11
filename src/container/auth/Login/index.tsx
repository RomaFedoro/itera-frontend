import React from 'react';
import IteraInput from '@/components/ui/IteraInput';
import IteraButton from '@/components/ui/IteraButton';
import IteraLink from '@/components/ui/IteraLink';

const Login = () => {
  return (
    <form className="list">
      <IteraInput placeholder="Введите почту" />
      <IteraInput placeholder="Введите пароль" type="password" />
      <IteraButton disabled>Войти</IteraButton>
      <IteraLink href="/auth/register">
        Ещё нет аккаунта? <b>Создайте его</b>
      </IteraLink>
    </form>
  );
};

export default Login;
