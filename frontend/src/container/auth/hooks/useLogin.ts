import { loginUser } from '@/services/auth';
import { TLoginValues } from '@/types/auth';
import { loginErrors } from '../constants';
import useAuth from './useAuth';

export const useLogin = () => useAuth<TLoginValues>(loginUser, loginErrors);
