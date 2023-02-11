type TField = {
  name: string;
  placeholder?: string;
  type?: string;
  label?: string;
};

export const loginFields: TField[] = [
  {
    name: 'email',
    placeholder: 'Введите почту',
  },
  {
    name: 'password',
    placeholder: 'Введите пароль',
    type: 'password',
  },
];

export const registerFields: TField[] = [
  {
    name: 'name',
    placeholder: 'Введите имя',
  },
  ...loginFields,
];
