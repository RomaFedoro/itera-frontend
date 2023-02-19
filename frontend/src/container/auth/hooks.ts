import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { loginUser, registerUser } from '@/services/auth';
import { TAuth, TLoginValues, TRegisterValues } from '@/types/auth';
import { setJWTToken } from '@/utils/setJWTToken';
import { useRouter } from 'next/navigation';

const useAuth = <T extends FieldValues>(
  mutationFn: (body: T) => Promise<TAuth>
) => {
  const [hasMounted, setHasMounted] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm<T>({
    mode: 'onTouched',
  });

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const client = useQueryClient();

  const { mutate } = useMutation({
    mutationFn,
    onSuccess: ({ data, meta }) => {
      client.setQueriesData(['user'], () => ({
        data,
      }));
      client.invalidateQueries({
        queryKey: ['user'],
        refetchType: 'none',
      });
      setJWTToken(meta);
      router.push('/');
    },
  });

  const onSubmit = handleSubmit((body) => {
    mutate(body);
  });
  const isValidForm = isDirty && isValid;

  return {
    register,
    onSubmit,
    errors,
    isValidForm,
    hasMounted,
  };
};

export const useRegister = () => useAuth<TRegisterValues>(registerUser);
export const useLogin = () => useAuth<TLoginValues>(loginUser);
