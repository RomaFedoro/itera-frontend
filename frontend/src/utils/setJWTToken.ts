import { TMeta } from '@/types/auth';
import { setCookie } from 'cookies-next';

export const setJWTToken = ({ token, expires }: TMeta) => {
  setCookie('jwt', `Bearer ${token}`, { maxAge: expires });
};
