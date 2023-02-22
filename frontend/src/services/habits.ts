import { THabit, THabitResponse, THabitValues } from '@/types/habit';
import getHeaders from '@/utils/getHeaders';
import { THistoryRecordResponse } from '@/types/history';
import responseHandle from '@/utils/responseHandle';

const baseUrl = `${process.env.apiPath}/habits`;

export const allHabitsFetch = async (): Promise<{ data: THabit[] }> => {
  const response = await fetch(baseUrl, {
    method: 'GET',
    headers: getHeaders(),
  });

  return responseHandle(response);
};

export const getHabitFetch = async (
  id: number | string
): Promise<THabitResponse> => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'GET',
    headers: getHeaders(),
  });

  return responseHandle(response);
};

export const createHabitsFetch = async (
  body: THabitValues
): Promise<THabitResponse> => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(body),
  });

  return responseHandle(response);
};

export const updateHabitsFetch = async (
  id: string | number,
  body: Partial<THabit>
): Promise<THabitResponse> => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify(body),
  });

  return responseHandle(response);
};

export const deleteHabitFetch = async (id: number | string): Promise<null> => {
  await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });

  return null;
};

export const historyHabitsFetch = async (
  id: number | string
): Promise<THistoryRecordResponse> => {
  const response = await fetch(`${baseUrl}/${id}/history`, {
    method: 'GET',
    headers: getHeaders(),
  });

  return responseHandle(response);
};
