import { TRegisterValues } from '@/types/auth';
import { registerUser } from '@/services/auth';
import useAuth from './useAuth';

const useRegister = () => useAuth<TRegisterValues>(registerUser);

export default useRegister;
