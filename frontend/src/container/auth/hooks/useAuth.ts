import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FieldValues } from 'react-hook-form';
import useMutationForm from '@/hooks/useForm';
import { TAuth } from '@/types/auth';
import { setJWTToken } from '@/utils/setJWTToken';
import { useState } from 'react';

const useAuth = <T extends FieldValues>(
  mutationFn: (body: T) => Promise<TAuth>,
  responseErrors?: Record<string, string>
) => {
  const router = useRouter();
  const client = useQueryClient();
  const [responseError, setResponseError] = useState('');

  const { mutate, isLoading } = useMutation({
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
    onError: (err) => {
      setResponseError(
        () =>
          responseErrors?.[(err as Error).message] ??
          'Произошла неизвестная ошибка. Повторите попытку'
      );
    },
  });

  return { ...useMutationForm<T, TAuth>(mutate), responseError, isLoading };
};

export default useAuth;
