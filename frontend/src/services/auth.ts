import { TAuth, TLoginValues, TRegisterValues } from '@/types/auth';

const baseUrl = `${process.env.apiPath}/auth`;

const authFetch =
  <T>(url: string) =>
  async (body: T): Promise<TAuth> => {
    const response = await fetch(`${baseUrl}/${url}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });

    return response.json();
  };

export const registerUser = authFetch<TRegisterValues>('register');
export const loginUser = authFetch<TLoginValues>('login');
