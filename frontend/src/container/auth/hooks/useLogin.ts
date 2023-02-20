import { loginUser } from '@/services/auth';
import { TLoginValues } from '@/types/auth';
import useAuth from './useAuth';

export const useLogin = () => useAuth<TLoginValues>(loginUser);
