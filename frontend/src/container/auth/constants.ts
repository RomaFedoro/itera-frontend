import { TLoginValues, TRegisterValues } from '@/types/auth';
import { TField } from '@/types/form';

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
  ...(loginFields as unknown as TField<TRegisterValues>[]),
];

export const registerErrors = {
  '422': 'Пользователь с такой почтой уже существует',
};

export const loginErrors = {
  '422': 'Некорректная почта или пароль',
};
