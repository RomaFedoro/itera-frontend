import { TLoginValues, TRegisterValues } from './types';
import { RegisterOptions, FieldPath } from 'react-hook-form';

type TField<T extends Record<string, unknown>> = {
  name: keyof T;
  placeholder?: string;
  type?: string;
  label?: string;
  options?: RegisterOptions<T, FieldPath<T>>;
};

export const loginFields: TField<TLoginValues>[] = [
  {
    name: 'email',
    placeholder: 'Введите почту',
    options: {
      required: 'Это поле должно быть заполнено',
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: 'Неверный формат почты',
      },
    },
  },
  {
    name: 'password',
    placeholder: 'Введите пароль',
    type: 'password',
    options: {
      required: 'Это поле должно быть заполнено',
      minLength: {
        value: 6,
        message: 'Пароль должен быть больше 6 символов',
      },
    },
  },
];

export const registerFields: TField<TRegisterValues>[] = [
  {
    name: 'name',
    placeholder: 'Введите имя',
    options: {
      required: 'Это поле должно быть заполнено',
    },
  },
  ...loginFields,
];
