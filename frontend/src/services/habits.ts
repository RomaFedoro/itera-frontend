import { getCookie } from 'cookies-next';
import { THabit } from '@/types/habit';

const baseUrl = `${process.env.apiPath}/habits`;

export const allHabitsFetch = async (): Promise<{ data: THabit[] }> => {
  const response = await fetch(baseUrl, {
    method: 'GET',
    headers: {
      Authorization: String(getCookie('jwt')),
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};
