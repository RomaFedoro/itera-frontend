import getHeaders from '@/utils/getHeaders';
import { TTodayHabitResponse } from '@/types/history';

const baseUrl = `${process.env.apiPath}/history`;

export const todayHabitFetch = async (): Promise<TTodayHabitResponse> => {
  const response = await fetch(baseUrl, {
    method: 'GET',
    headers: getHeaders(),
  });

  return response.json();
};
