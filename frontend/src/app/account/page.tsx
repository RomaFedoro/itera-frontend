'use client';

import IteraButton from '@/components/ui/IteraButton';
import { useQuery } from '@tanstack/react-query';
import { currentUserFetch } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';

export default function AccountPage() {
  const {
    isLoading,
    isError,
    isSuccess,
    data: user,
  } = useQuery({
    queryKey: ['user'],
    queryFn: currentUserFetch,
  });

  const router = useRouter();

  const onLogout = () => {
    deleteCookie('jwt');
    router.push('/auth/login');
  };

  return (
    <div className="content content_fill content_between">
      <div className="list">
        {isSuccess && (
          <>
            <h1>{user.data.name}</h1>
            <span className="description">{user.data.email}</span>
          </>
        )}
      </div>
      <IteraButton secondary onClick={onLogout}>
        Выйти
      </IteraButton>
    </div>
  );
}
