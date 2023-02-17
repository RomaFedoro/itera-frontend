export type TLoginValues = {
  email: string;
  password: string;
};

export type TRegisterValues = TLoginValues & {
  name: string;
};

export type TLoginFieldsName = keyof TLoginValues;
export type TRegisterFieldsName = keyof TLoginValues;