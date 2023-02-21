import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FieldValues } from 'react-hook-form';
import useMutationForm from '@/hooks/useForm';
import { TAuth } from '@/types/auth';
import { setJWTToken } from '@/utils/setJWTToken';

const useAuth = <T extends FieldValues>(
  mutationFn: (body: T) => Promise<TAuth>
) => {
  const router = useRouter();
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

  return useMutationForm<T, TAuth>(mutate);
};

export default useAuth;
