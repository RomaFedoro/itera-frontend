import { TUser } from './user';

export type TLoginValues = {
  email: string;
  password: string;
};

export type TRegisterValues = TLoginValues & {
  name: string;
};

export type TAuth = {
  data: TUser;
  meta: {
    token: string;
    expires: number;
  };
};

export type TAuthError = {
  data?: {
    message?: string;
    errors?: Record<string, string[]>;
  };
};

