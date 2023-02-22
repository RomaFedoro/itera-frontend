import { TAuth, TLoginValues, TRegisterValues } from '@/types/auth';
import { TUser } from '@/types/user';
import responseHandle from '@/utils/responseHandle';
import getHeaders from '@/utils/getHeaders';

const baseUrl = `${process.env.apiPath}/auth`;

const authFetch =
  <T>(url: string) =>
  async (body: T): Promise<TAuth> => {
    const response = await fetch(`${baseUrl}/${url}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: getHeaders({ includeJWT: false }),
    });

    return responseHandle(response);
  };

export const registerUser = authFetch<TRegisterValues>('register');
export const loginUser = authFetch<TLoginValues>('login');

export const currentUserFetch = async (): Promise<{ data: TUser }> => {
  const response = await fetch(`${baseUrl}/me`, {
    method: 'GET',
    headers: getHeaders(),
  });

  return responseHandle(response);
};
