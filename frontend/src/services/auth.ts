import { TAuth, TLoginValues, TRegisterValues } from '@/types/auth';
import { getCookie } from 'cookies-next';
import { TUser } from '@/types/user';

const baseUrl = `${process.env.apiPath}/auth`;

const authFetch =
  <T>(url: string) =>
  async (body: T): Promise<TAuth> => {
    const response = await fetch(`${baseUrl}/${url}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.json();
  };

export const registerUser = authFetch<TRegisterValues>('register');
export const loginUser = authFetch<TLoginValues>('login');

export const currentUserFetch = async (): Promise<{ data: TUser }> => {
  const response = await fetch(`${baseUrl}/me`, {
    method: 'GET',
    headers: {
      Authorization: String(getCookie('jwt')),
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};
