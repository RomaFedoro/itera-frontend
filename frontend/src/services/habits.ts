import { THabit, THabitResponse, THabitValues } from '@/types/habit';
import getHeaders from '@/utils/getHeaders';
import { THistoryRecordResponse, TTodayHabitResponse } from '@/types/history';

const baseUrl = `${process.env.apiPath}/habits`;

export const allHabitsFetch = async (): Promise<{ data: THabit[] }> => {
  const response = await fetch(baseUrl, {
    method: 'GET',
    headers: getHeaders(),
  });

  return response.json();
};

export const getHabitFetch = async (
  id: number | string
): Promise<THabitResponse> => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'GET',
    headers: getHeaders(),
  });

  return response.json();
};

export const createHabitsFetch = async (
  body: THabitValues
): Promise<THabitResponse> => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(body),
  });

  return response.json();
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

  return response.json();
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

  return response.json();
};
