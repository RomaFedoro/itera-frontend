import { TRegisterValues } from '@/types/auth';
import { registerUser } from '@/services/auth';
import useAuth from './useAuth';
import { registerErrors } from '../constants';

const useRegister = () =>
  useAuth<TRegisterValues>(registerUser, registerErrors);

export default useRegister;
